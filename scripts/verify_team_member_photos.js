const fs = require('fs');
const path = require('path');

const outDir = path.resolve('out');
const basePath = '/AbhinayaUNY_Web';

const teamDataPath = path.resolve('data/teamData.ts');
const teamDataContent = fs.readFileSync(teamDataPath, 'utf8');

// Extract all image/photo strings from teamData.ts
const photoRegex = /['"](\/(?:images|assets)\/[^'"]+\.(?:png|jpg|jpeg|webp))['"]/gi;
let match;
const photos = new Set();
while ((match = photoRegex.exec(teamDataContent)) !== null) {
  photos.add(match[1]);
}

console.log('======================================================================');
console.log('  EMPIRICAL MEMBER PHOTO & ASSET VERIFICATION (teamData.ts -> out/)');
console.log('======================================================================\n');
console.log('Total unique member photo paths declared in teamData.ts: ' + photos.size);

let missingCount = 0;
let presentCount = 0;
const missingList = [];

photos.forEach(p => {
  const cleanPath = p.replace(/^\//, '').replace(/\//g, path.sep);
  const outPath = path.join(outDir, cleanPath);
  const publicPath = path.join('public', cleanPath);

  const inOut = fs.existsSync(outPath);
  const inPub = fs.existsSync(publicPath);

  if (inOut && inPub) {
    presentCount++;
  } else {
    missingCount++;
    missingList.push({ declared: p, out: inOut, pub: inPub });
  }
});

console.log('Verified Present in out/ and public/: ' + presentCount);
console.log('Missing Photos Count:                 ' + missingCount);

if (missingCount > 0) {
  console.log('\n--- MISSING ASSETS ---');
  missingList.forEach(m => {
    console.log('Missing: ' + m.declared + ' [out=' + m.out + ', pub=' + m.pub + ']');
  });
} else {
  console.log('\n✔ 100% of all photo and asset paths in teamData.ts exist on disk in both public/ and out/!');
}
