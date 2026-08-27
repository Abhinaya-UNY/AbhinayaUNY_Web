const fs = require('fs');

const content = fs.readFileSync('data/teamData.ts', 'utf8');
const photoRegex = /['"](\/(?:images|assets)\/[^'"]+\.(?:png|jpg|jpeg|webp))['"]/gi;
let match;
const photos = new Set();
while ((match = photoRegex.exec(content)) !== null) {
  photos.add(match[1]);
}

const standardPattern = /^\/(?:images\/members\/(202[0-5])_(leader|manager|program|elektronik|mekanik|pembimbing|desain)_[a-z0-9_]+_\d{2}\.(?:jpg|png)|assets\/logo_abhinaya_solid\.png)$/;

let standardCount = 0;
let nonStandard = [];
photos.forEach(p => {
  if (standardPattern.test(p)) {
    standardCount++;
  } else {
    nonStandard.push(p);
  }
});

console.log('Standard Compliant Member Photos:', standardCount);
console.log('Non-Standard Member Photos:      ', nonStandard.length);
if (nonStandard.length > 0) {
  console.log('Non-standard list:', nonStandard);
}
