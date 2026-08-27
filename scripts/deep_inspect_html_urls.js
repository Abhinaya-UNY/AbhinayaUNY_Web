const fs = require('fs');
const path = require('path');

const outDir = path.resolve('out');
const basePath = '/AbhinayaUNY_Web';

function getAllFiles(dir, ext) {
  let files = [];
  fs.readdirSync(dir).forEach(f => {
    const fp = path.join(dir, f);
    if (fs.statSync(fp).isDirectory()) files = files.concat(getAllFiles(fp, ext));
    else if (f.endsWith(ext)) files.push(fp);
  });
  return files;
}

const htmlFiles = getAllFiles(outDir, '.html');
console.log('Inspecting ' + htmlFiles.length + ' HTML files in out/...\n');

const broken = [];
const valid = [];

htmlFiles.forEach(hf => {
  const rel = path.relative(outDir, hf);
  const content = fs.readFileSync(hf, 'utf8');
  const tagRegex = /<(?:img|script|link|a)\s+[^>]*?(?:src|href)="([^"]+)"[^>]*>/gi;
  let match;
  while ((match = tagRegex.exec(content)) !== null) {
    const url = match[1];
    if (
      url.startsWith('http://') ||
      url.startsWith('https://') ||
      url.startsWith('data:') ||
      url.startsWith('mailto:') ||
      url.startsWith('tel:') ||
      url.startsWith('#') ||
      url.startsWith('blob:')
    ) {
      continue;
    }
    let clean = url;
    if (clean.startsWith(basePath)) clean = clean.substring(basePath.length);
    clean = clean.split('?')[0].split('#')[0];
    if (clean.startsWith('/')) clean = clean.substring(1);
    if (!clean) {
      valid.push({ file: rel, url: url, target: 'index.html' });
      continue;
    }
    let diskPath = path.join(outDir, clean);
    let ok = fs.existsSync(diskPath) || fs.existsSync(path.join(diskPath, 'index.html')) || fs.existsSync(diskPath + '.html');
    if (ok) {
      valid.push({ file: rel, url: url, target: clean });
    } else {
      broken.push({ file: rel, url: url, expected: diskPath });
    }
  }
});

console.log('Total Internal URLs Verified: ' + (valid.length + broken.length));
console.log('Valid Internal URLs:          ' + valid.length);
console.log('Broken Internal URLs:         ' + broken.length);
if (broken.length > 0) {
  console.log('\n--- DETAILED BROKEN URLS ---');
  broken.forEach((b, i) => {
    console.log((i + 1) + '. In ' + b.file + ' -> URL: "' + b.url + '" (Expected at: ' + b.expected + ')');
  });
}
