const fs = require('fs');

const teamData = fs.readFileSync('data/teamData.ts', 'utf8');
const nimMatches = [...teamData.matchAll(/nim:\s*['"]([^'"]+)['"]/g)].map(m => m[1]);
console.log('Total NIM fields in teamData.ts:', nimMatches.length);
const uniqueNims = [...new Set(nimMatches)];
console.log('Unique NIMs in teamData.ts:', uniqueNims);

const indexHtml = fs.readFileSync('out/index.html', 'utf8');
console.log('\nChecking presence of these NIMs in out/index.html:');
uniqueNims.forEach(nim => {
  console.log(`  NIM ${nim}: ${indexHtml.includes(nim) ? 'FOUND in out/index.html' : 'NOT in out/index.html'}`);
});
