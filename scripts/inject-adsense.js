const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'out');
const snippet = '<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1539854412273273" crossorigin="anonymous"></script><meta name="google-adsense-account" content="ca-pub-1539854412273273">';

function processDir(dir) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      processDir(fullPath);
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      if (!content.includes('<head>' + snippet)) {
        content = content.replace('<head>', `<head>${snippet}`);
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Placed exact AdSense script right after <head> in: ${fullPath}`);
      }
    }
  }
}

processDir(outDir);
console.log('AdSense verification tags confirmed right after <head>.');
