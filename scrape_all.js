const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ 
    headless: "new",
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  try {
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36');
    await page.goto('https://www.club-birman.ch/', { waitUntil: 'domcontentloaded', timeout: 30000 });
    
    // Extract menu items
    const navItems = await page.evaluate(() => {
      const links = Array.from(document.querySelectorAll('nav a, .navigation a, .j-nav a, ul li a'));
      const uniqueLinks = [];
      const seen = new Set();
      
      links.forEach(a => {
        if (a.href && a.href.startsWith('https://www.club-birman.ch/') && !seen.has(a.href)) {
          seen.add(a.href);
          uniqueLinks.push({ title: a.innerText.trim(), url: a.href });
        }
      });
      return uniqueLinks.filter(item => item.title.length > 0);
    });
    
    console.log("NAVIGATION ITEMS:");
    console.log(JSON.stringify(navItems, null, 2));
    
  } catch(e) {
    console.log("Error:", e.message);
  } finally {
    await browser.close();
  }
})();
