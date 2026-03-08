const fs = require('fs');
const path = require('path');
const axios = require('axios');
const cheerio = require('cheerio');
const TurndownService = require('turndown');

const turndownService = new TurndownService({
    headingStyle: 'atx',
    codeBlockStyle: 'fenced'
});

const OUTPUT_DIR = path.join(__dirname, 'scraped_content');
const PAGES_DIR = path.join(OUTPUT_DIR, 'pages');
const IMAGES_DIR = path.join(OUTPUT_DIR, 'images');
const FILES_DIR = path.join(OUTPUT_DIR, 'files');

// Create directories
[OUTPUT_DIR, PAGES_DIR, IMAGES_DIR, FILES_DIR].forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
});

// Load URLs
const urlsData = JSON.parse(fs.readFileSync('urls.json', 'utf-8'));
urlsData.shift(); // Remove header ["original", "mimetype", "timestamp"]

// Keep latest snapshot for each original URL
const latestSnapshots = new Map();

urlsData.forEach(([original, mimetype, timestamp]) => {
    // Exclude some useless mimetypes if needed
    if (mimetype === 'warc/revisit') return;

    // Some basic normalization
    const cleanOriginal = original.replace(/^https?:\/\//, '').replace(/:80\//, '/');

    if (!latestSnapshots.has(cleanOriginal) || latestSnapshots.get(cleanOriginal).timestamp < timestamp) {
        latestSnapshots.set(cleanOriginal, { original, mimetype, timestamp });
    }
});

const getArchiveUrl = (timestamp, original) => `http://web.archive.org/web/${timestamp}id_/${original}`;

// Queue for media to download
const mediaQueue = new Set();
let htmlProcessed = 0;
let htmlErrors = 0;

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchWithRetry(url, retries = 3) {
    for (let i = 0; i < retries; i++) {
        try {
            const response = await axios.get(url, {
                timeout: 15000,
                headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' },
                responseType: 'arraybuffer'
            });
            return response;
        } catch (error) {
            console.error(`Attempt ${i + 1} failed for ${url}: ${error.message}`);
            if (i === retries - 1) throw error;
            await sleep(2000); // Backoff
        }
    }
}

async function processHtml(snapshot) {
    const archiveUrl = getArchiveUrl(snapshot.timestamp, snapshot.original);
    console.log(`\n📄 Scraping page: ${snapshot.original}`);
    try {
        const response = await fetchWithRetry(archiveUrl);
        const html = response.data.toString('utf-8');
        const $ = cheerio.load(html);

        // Remove Jimdo UI elements
        $('.j-header, .j-footer, #cc-matrix-login, script, style, nav, aside').remove();

        // Extract content - fallback to body if main content wrapper is not found
        const contentArea = $('#cc-matrix-body, main, .j-main-content, body').first();

        // Find all images within text to add them to download queue
        $('img', contentArea).each((i, el) => {
            let src = $(el).attr('src');
            if (src) {
                // Handle relative paths
                if (!src.startsWith('http')) {
                    if (src.startsWith('/')) {
                        src = `https://www.club-birman.ch${src}`;
                    } else {
                        const baseUrl = new URL(snapshot.original).origin;
                        src = `${baseUrl}/${src}`;
                    }
                }
                // Convert to archive URL for downloading
                // We just use the raw latest snapshot for the image if we don't have it in DB, 
                // but actually it's better to fetch via wayback machine without specific id_ if not found
                mediaQueue.add(src);
            }
        });

        // Convert to markdown
        let markdown = turndownService.turndown(contentArea.html() || '');

        // Cleanup markdown
        markdown = markdown.replace(/\n{3,}/g, '\n\n').trim();

        // Safe filename
        let filename = snapshot.original
            .replace(/^https?:\/\/(www\.)?club-birman\.ch/, '')
            .replace(/[^a-z0-9]/gi, '_')
            .replace(/^_+|_+$/g, '');

        if (!filename) filename = 'index';
        filename += '.md';

        fs.writeFileSync(path.join(PAGES_DIR, filename), `# Source: ${snapshot.original}\n\n${markdown}`);
        htmlProcessed++;
        console.log(`✅ Saved ${filename}`);

    } catch (error) {
        console.error(`❌ Failed to scrape ${snapshot.original}:`, error.message);
        htmlErrors++;
    }
}

async function downloadMedia(url, type = 'image') {
    const dir = type === 'pdf' ? FILES_DIR : IMAGES_DIR;
    // Extract a nice filename
    const urlObj = new URL(url);
    let filename = decodeURIComponent(urlObj.pathname.split('/').pop() || '').replace(/[^a-z0-9.-]/gi, '_');
    if (!filename || filename === '_') {
        filename = `file_${Date.now()}`;
    }

    const filepath = path.join(dir, filename);
    if (fs.existsSync(filepath)) return; // Already downloaded

    console.log(`🖼️ Downloading media: ${filename}`);

    // We try to get through Wayback Machine using a latest wildcard if we don't know the timestamp
    const archiveUrl = `http://web.archive.org/web/20240000000000id_/${url}`;

    try {
        const response = await fetchWithRetry(archiveUrl);
        fs.writeFileSync(filepath, response.data);
        console.log(`✅ Saved ${filename}`);
    } catch (e) {
        try { // Try without Wayback Machine just in case it's still live
            const response = await fetchWithRetry(url);
            fs.writeFileSync(filepath, response.data);
            console.log(`✅ Saved ${filename} (live)`);
        } catch (e2) {
            console.error(`❌ Failed to download ${filename}:`, e2.message);
        }
    }
}

async function run() {
    console.log(`🚀 Starting Ultimate Scraper Bot...`);
    console.log(`Found ${latestSnapshots.size} unique URLs in history.`);

    // 1. Process all HTML pages
    const htmlSnapshots = Array.from(latestSnapshots.values()).filter(s => s.mimetype === 'text/html');
    console.log(`\n--- Phase 1: Scraping ${htmlSnapshots.length} HTML pages ---`);

    for (const snapshot of htmlSnapshots) {
        await processHtml(snapshot);
        await sleep(500); // Polite delay
    }

    // 2. Add direct media from CDX to queue
    Array.from(latestSnapshots.values()).forEach(s => {
        if (s.mimetype.startsWith('image/')) mediaQueue.add(s.original);
        if (s.mimetype === 'application/pdf') mediaQueue.add(s.original);
    });

    // 3. Download all media
    const mediaArray = Array.from(mediaQueue);
    console.log(`\n--- Phase 2: Downloading ${mediaArray.length} media files (Images/PDFs) ---`);

    for (const mediaUrl of mediaArray) {
        const isPdf = mediaUrl.toLowerCase().endsWith('.pdf');
        await downloadMedia(mediaUrl, isPdf ? 'pdf' : 'image');
        await sleep(500);
    }

    console.log(`\n🎉 Scrape Complete!`);
    console.log(`Pages processed: ${htmlProcessed}`);
    console.log(`Pages failed: ${htmlErrors}`);
    console.log(`Check the 'scraped_content' folder.`);
}

run();
