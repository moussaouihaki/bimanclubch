const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
    const browser = await puppeteer.launch({ headless: 'new' });
    try {
        const page = await browser.newPage();
        const url = 'https://web.archive.org/web/20230601000000*/https://www.club-birman.ch/deutsch/';

        // First, find the latest snapshot URL
        await page.goto(url, { waitUntil: 'domcontentloaded' });
        const snapshotUrl = await page.evaluate(() => {
            const links = Array.from(document.querySelectorAll('a'));
            const latest = links.reverse().find(a => a.href.includes('/web/202') && a.href.includes('club-birman.ch/deutsch'));
            return latest ? latest.href : null;
        });

        if (snapshotUrl) {
            console.log("Found snapshot:", snapshotUrl);
            await page.goto(snapshotUrl, { waitUntil: 'networkidle2' });

            const links = await page.evaluate(() => {
                const anchors = Array.from(document.querySelectorAll('.cc-nav-current li a, .j-nav li a, nav a, ul.cc-nav-level-1 a'));
                return anchors.map(a => ({
                    text: a.innerText.trim(),
                    href: a.href.replace(/https:\/\/web\.archive\.org\/web\/[0-9]+\//, '')
                })).filter(l => l.text.length > 0 && l.href.includes('club-birman.ch'));
            });
            console.log(JSON.stringify(links, null, 2));
            fs.writeFileSync('nav_links.json', JSON.stringify(links, null, 2));
        }
    } catch (err) {
        console.error(err);
    } finally {
        await browser.close();
    }
})();
