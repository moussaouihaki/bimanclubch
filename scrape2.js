const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

    let extractedData = {};

    try {
        console.log(`Navigating to https://www.club-birman.ch/ ...`);
        await page.goto('https://www.club-birman.ch/', { waitUntil: 'domcontentloaded', timeout: 30000 });

        // Extract all navigation links
        const links = await page.evaluate(() => {
            const navLinks = Array.from(document.querySelectorAll('nav a, .j-nav a'));
            return navLinks.map(a => a.href).filter(href => href && href.startsWith('https://www.club-birman.ch/'));
        });

        // Deduplicate
        const uniqueLinks = [...new Set(links)];
        console.log("Found links:", uniqueLinks);

        // Fallback if no nav links found
        const urlsToVisit = uniqueLinks.length > 0 ? uniqueLinks : [
            'https://www.club-birman.ch/die-birmakatze/',
            'https://www.club-birman.ch/z%C3%BCchterliste/',
            'https://www.club-birman.ch/club/',
            'https://www.club-birman.ch/vorstand/',
            'https://www.club-birman.ch/tiervermittlung/',
            'https://www.club-birman.ch/formulare/',
            'https://www.club-birman.ch/fr-it/',
            'https://www.club-birman.ch/zuchtplaner/'
        ];

        for (let url of urlsToVisit) {
            console.log(`Navigating to ${url}...`);
            await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });

            const content = await page.evaluate(() => {
                const main = document.querySelector('.j-page') || document.querySelector('body');
                if (!main) return '';

                // Remove noise
                const elementsToRemove = main.querySelectorAll('script, style, nav, footer, header, .cc-window, .j-header');
                elementsToRemove.forEach(el => el.remove());

                return main.innerText.trim();
            });

            extractedData[url] = content;
        }
    } catch (e) {
        console.error(`Failed to scrape:`, e);
    }

    fs.writeFileSync('extracted_content_links.json', JSON.stringify(extractedData, null, 2));
    console.log("Extraction complete. Saved to extracted_content_links.json");
    await browser.close();
})();
