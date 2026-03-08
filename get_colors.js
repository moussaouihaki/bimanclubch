const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.goto('https://web.archive.org/web/20230601000000*/https://www.club-birman.ch/', { waitUntil: 'domcontentloaded' });
  
  // Let's just grab the most recent snapshot URL from the page
  const snapshotUrl = await page.evaluate(() => {
     const links = Array.from(document.querySelectorAll('a'));
     const latest = links.reverse().find(a => a.href.includes('/web/202') && a.href.includes('club-birman.ch'));
     return latest ? latest.href : null;
  });
  
  if (snapshotUrl) {
    console.log("Navigating to", snapshotUrl);
    await page.goto(snapshotUrl, { waitUntil: 'networkidle0', timeout: 60000 });
    const colors = await page.evaluate(() => {
       const elements = document.querySelectorAll('*');
       const bgColors = {};
       const textColors = {};
       elements.forEach(el => {
         const style = window.getComputedStyle(el);
         bgColors[style.backgroundColor] = (bgColors[style.backgroundColor] || 0) + 1;
         textColors[style.color] = (textColors[style.color] || 0) + 1;
       });
       return { bgColors, textColors };
    });
    console.log(JSON.stringify(colors, null, 2));
  } else {
    console.log("No snapshot found");
  }
  await browser.close();
})();
