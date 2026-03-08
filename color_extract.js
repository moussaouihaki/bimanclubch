const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--allow-file-access-from-files'] });
  const page = await browser.newPage();
  const html = `
    <html><body>
      <img id="img" src="file:///Users/hakim/.gemini/antigravity/brain/8e06c3da-d026-485a-b93b-978a65297aff/club_birman_analysis_1772876744351.webp" crossorigin="anonymous" />
      <canvas id="c"></canvas>
    </body></html>
  `;
  await page.setContent(html);
  
  const colors = await page.evaluate(() => {
    return new Promise(resolve => {
      const img = document.getElementById('img');
      img.onload = () => {
        const c = document.getElementById('c');
        const ctx = c.getContext('2d');
        c.width = img.width;
        c.height = img.height;
        ctx.drawImage(img, 0, 0);
        
        const data = ctx.getImageData(0, 0, c.width, c.height).data;
        const colorCounts = {};
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i], g = data[i+1], b = data[i+2], a = data[i+3];
          if (a > 200) {
            const hex = '#' + ((1<<24) + (r<<16) + (g<<8) + b).toString(16).slice(1);
            colorCounts[hex] = (colorCounts[hex] || 0) + 1;
          }
        }
        
        const sorted = Object.entries(colorCounts)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 100);
        resolve(sorted);
      };
      
      // if already loaded
      if (img.complete) img.onload();
    });
  });
  
  console.log(colors);
  await browser.close();
})();
