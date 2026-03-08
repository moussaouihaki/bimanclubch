const puppeteer = require('puppeteer');
const fs = require('fs');

const URLS = [
    'https://www.club-birman.ch/',
    'https://www.club-birman.ch/die-birmakatze/geschichte/',
    'https://www.club-birman.ch/die-birmakatze/standard/',
    'https://www.club-birman.ch/die-birmakatze/charakter/',
    'https://www.club-birman.ch/die-birmakatze/farben/',
    'https://www.club-birman.ch/vorstand/',
];

(async () => {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

    let extractedData = {};

    for (let url of URLS) {
        try {
            console.log(`Navigating to ${url}...`);
            await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });

            const content = await page.evaluate(() => {
                // Jimdo stores main content in .j-module classes usually, or we can just grab the main container
                const main = document.querySelector('.j-page') || document.querySelector('body');
                if (!main) return '';

                // Remove scripts, styles, nav, footer
                const elementsToRemove = main.querySelectorAll('script, style, nav, footer, header, .cc-window');
                elementsToRemove.forEach(el => el.remove());

                return main.innerText.trim();
            });

            extractedData[url] = content;
        } catch (e) {
            console.error(`Failed to scrape ${url}:`, e);
            extractedData[url] = `ERROR: ${e.message}`;
        }
    }

    fs.writeFileSync('extracted_content.json', JSON.stringify(extractedData, null, 2));
    console.log("Extraction complete. Saved to extracted_content.json");
    await browser.close();
})();
