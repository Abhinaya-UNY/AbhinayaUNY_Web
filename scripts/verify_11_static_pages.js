const fs = require('fs');
const path = require('path');

const outDir = path.resolve('out');

console.log('======================================================================');
console.log('        CHALLENGER 1: 11 STATIC PAGES & EXPORTS INTEGRITY            ');
console.log('======================================================================\n');

const staticTargets = [
  { name: 'Root Home Page', path: 'index.html', minBytes: 500 },
  { name: 'Divisi Showcase', path: path.join('divisi', 'index.html'), minBytes: 500 },
  { name: 'Prestasi Showcase', path: path.join('prestasi', 'index.html'), minBytes: 500 },
  { name: 'KRTMI Division Detail', path: path.join('krtmi', 'index.html'), minBytes: 500 },
  { name: 'Pertandingan / Schedule', path: path.join('pertandingan', 'index.html'), minBytes: 500 },
  { name: '404 Standalone Root', path: '404.html', minBytes: 500 },
  { name: '404 Directory Page', path: path.join('404', 'index.html'), minBytes: 500 },
  { name: '500 Standalone Root', path: '500.html', minBytes: 500 },
  { name: '500 Directory Page', path: path.join('500', 'index.html'), minBytes: 500 },
  { name: 'Apple Touch Icon', path: 'apple-icon.png', minBytes: 500 },
  { name: 'Favicon Icon PNG', path: 'icon.png', minBytes: 500 }
];

let allPassed = true;
staticTargets.forEach((target, idx) => {
  const fullPath = path.join(outDir, target.path);
  const exists = fs.existsSync(fullPath);
  if (!exists) {
    console.error(`❌ [FAIL] [${idx + 1}/${staticTargets.length}] Missing: ${target.path}`);
    allPassed = false;
    return;
  }
  const stat = fs.statSync(fullPath);
  const passSize = stat.size > target.minBytes;
  if (!passSize) {
    console.error(`❌ [FAIL] [${idx + 1}/${staticTargets.length}] Size too small (${stat.size} B <= ${target.minBytes} B): ${target.path}`);
    allPassed = false;
    return;
  }
  console.log(`✔ [PASS] [${idx + 1}/${staticTargets.length}] ${target.name.padEnd(25)} | ${target.path.padEnd(28)} | ${stat.size.toLocaleString()} bytes`);
});

console.log('\n======================================================================');
if (allPassed) {
  console.log('  ALL 11 STATIC EXPORT TARGETS CONFIRMED EXIST AND ARE > 500 BYTES!   ');
  console.log('======================================================================\n');
  process.exit(0);
} else {
  console.error('  SOME STATIC TARGETS FAILED INTEGRITY VERIFICATION!                 ');
  console.log('======================================================================\n');
  process.exit(1);
}
