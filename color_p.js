const getPixels = require('get-pixels');

getPixels("/Users/hakim/.gemini/antigravity/brain/8e06c3da-d026-485a-b93b-978a65297aff/club_birman_analysis_1772876744351.webp", function(err, pixels) {
  if(err) {
    console.log("Bad image path", err);
    return;
  }
  const colorCounts = {};
  for(let i = 0; i < pixels.data.length; i += 4) {
    const r = pixels.data[i];
    const g = pixels.data[i+1];
    const b = pixels.data[i+2];
    const hex = '#' + ((1<<24) + (r<<16) + (g<<8) + b).toString(16).slice(1);
    colorCounts[hex] = (colorCounts[hex] || 0) + 1;
  }
  const sorted = Object.entries(colorCounts).sort((a,b) => b[1]-a[1]).slice(0, 30);
  console.log(sorted);
});
