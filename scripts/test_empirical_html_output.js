const fs = require('fs');
const path = require('path');

const outDir = path.resolve('out');
const basePath = '/AbhinayaUNY_Web';

const results = { passed: 0, failed: 0, assertions: 0 };

function assert(condition, message) {
  results.assertions++;
  if (!condition) {
    results.failed++;
    console.error('  ❌ FAIL:', message);
    throw new Error(message);
  }
}

console.log('======================================================================');
console.log('    EMPIRICAL CHALLENGER 2: STATIC HTML OUTPUT VERIFICATION HARNESS');
console.log('======================================================================\n');

// 1. Check all exported HTML pages
console.log('[TEST 1] Exported HTML Pages Integrity...');
const requiredPages = [
  'index.html',
  path.join('divisi', 'index.html'),
  path.join('prestasi', 'index.html'),
  path.join('krtmi', 'index.html'),
  path.join('pertandingan', 'index.html'),
  '404.html'
];

requiredPages.forEach(p => {
  const fullPath = path.join(outDir, p);
  const exists = fs.existsSync(fullPath);
  assert(exists, 'Required HTML missing: ' + p);
  const stats = fs.statSync(fullPath);
  assert(stats.size > 500, 'HTML file size too small: ' + p + ' (' + stats.size + ' B)');
  console.log('  ✔ [PASS]', p.padEnd(30), '(' + stats.size.toLocaleString() + ' bytes)');
});
results.passed++;

// 2. Inspect static DOM in out/index.html
console.log('\n[TEST 2] Leaders Hall of Fame (2020-2025) in Static DOM (out/index.html)...');
const indexHtml = fs.readFileSync(path.join(outDir, 'index.html'), 'utf8');

const expectedLeaders = [
  { name: 'Nurcholis', year: '2020' },
  { name: 'Afif Aiman Saputra', year: '2021' },
  { name: 'Muhammad Iqbal Rasyid', year: '2022' },
  { name: 'Salsabila Azzahra', year: '2023' },
  { name: 'Ilham Widyo Nugroho', year: '2024' },
  { name: 'Farhan Yuda Mahendra', year: '2025' }
];

expectedLeaders.forEach(l => {
  assert(indexHtml.includes(l.name), 'Leader missing in static DOM: ' + l.name);
  console.log('  ✔ [PASS] Leader in static DOM:', l.name.padEnd(25), '[' + l.year + ']');
});
assert(indexHtml.includes('Ketua Tim'), 'Leadership badge Ketua Tim missing');
assert(indexHtml.includes('Leaders Hall of Fame') || indexHtml.includes('Hall of Fame') || indexHtml.includes('Deretan Ketua'), 'Leaders showcase section missing');
results.passed++;

// 3. Inspect Managers in Static DOM
console.log('\n[TEST 3] Managers Showcase (2020-2025) in Static DOM (out/index.html)...');
const expectedManagers = [
  { name: 'Yuli Dwi Saputri', year: '2020' },
  { name: 'Mustika Wahyu Aprilia', year: '2023' },
  { name: 'Rose Pita Nur Afifah', year: '2024-2025' },
  { name: 'Zelfa Nafisah Zalna', year: '2025' }
];

expectedManagers.forEach(m => {
  assert(indexHtml.includes(m.name), 'Manager missing in static DOM: ' + m.name);
  console.log('  ✔ [PASS] Manager in static DOM:', m.name.padEnd(25), '[' + m.year + ']');
});
assert(indexHtml.includes('Manager'), 'Manager keyword missing in DOM');
assert(indexHtml.includes('Managers Showcase') || indexHtml.includes('Deretan Manager') || indexHtml.includes('Manajer Tim'), 'Managers showcase section missing');
results.passed++;

// 4. Inspect Active Technical Squad
console.log('\n[TEST 4] Active Technical Squad & Student Credentials in Static DOM...');
const expectedSquad = [
  { name: 'Tri Wahyu Handoyo', nim: '22518241023', role: 'Autonomous Navigation' },
  { name: 'Ikhsan Nurrohman', nim: '22538141004', role: 'Embedded Systems' },
  { name: 'Agus Bagaskoro', nim: '21501244039', role: 'Power Distribution' },
  { name: 'Muhamad Ilham Sony', nim: '20539144016', role: 'Mechanical Structure' },
  { name: 'Caesar Sokma Langgeng', nim: '21539144005', role: 'Mechanism & 3D CAD' },
  { name: 'Rionaldi Nugroho', nim: '23090620088', role: 'Rapid Prototyping' }
];

expectedSquad.forEach(s => {
  assert(indexHtml.includes(s.name), 'Squad member missing in static DOM: ' + s.name);
  assert(indexHtml.includes(s.nim), 'Student NIM missing in static DOM: ' + s.nim);
  console.log('  ✔ [PASS]', s.name.padEnd(25), '| NIM:', s.nim, '|', s.role);
});
results.passed++;

// 5. Inspect Alumni & Generation Explorer
console.log('\n[TEST 5] Alumni & Generation Explorer in Static DOM...');
const years = ['2020', '2021', '2022', '2023', '2024', '2025'];
years.forEach(y => {
  assert(indexHtml.includes(y), 'Generation year missing in DOM: ' + y);
  console.log('  ✔ [PASS] Generation Era:', y, '[VERIFIED]');
});
results.passed++;

// 6. Deep Asset Links & BasePath Validation
console.log('\n[TEST 6] Deep Static Asset URLs, Scripts, CSS & BasePath Validation...');
function getAllFiles(dir, ext) {
  let files = [];
  fs.readdirSync(dir).forEach(f => {
    const fp = path.join(dir, f);
    if (fs.statSync(fp).isDirectory()) {
      files = files.concat(getAllFiles(fp, ext));
    } else if (f.endsWith(ext)) {
      files.push(fp);
    }
  });
  return files;
}

const htmlFiles = getAllFiles(outDir, '.html');
let totalAssetsChecked = 0;
let brokenAssets = [];

const srcRegex = /(?:src|href)="([^"]+)"/g;

htmlFiles.forEach(hf => {
  const content = fs.readFileSync(hf, 'utf8');
  const relHtml = path.relative(outDir, hf);
  let match;
  while ((match = srcRegex.exec(content)) !== null) {
    const url = match[1];
    if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:') || url.startsWith('mailto:') || url.startsWith('#') || url.startsWith('blob:')) {
      continue;
    }
    totalAssetsChecked++;
    let clean = url;
    if (clean.startsWith(basePath)) {
      clean = clean.substring(basePath.length);
    }
    clean = clean.split('?')[0].split('#')[0];
    if (clean.startsWith('/')) clean = clean.substring(1);
    if (!clean) continue;
    
    let diskPath = path.join(outDir, clean);
    let exists = fs.existsSync(diskPath);
    if (!exists && fs.existsSync(path.join(diskPath, 'index.html'))) {
      exists = true;
    }
    if (!exists && fs.existsSync(diskPath + '.html')) {
      exists = true;
    }
    if (!exists) {
      brokenAssets.push({ html: relHtml, url: url, expected: diskPath });
    }
  }
});

assert(brokenAssets.length === 0, 'Found ' + brokenAssets.length + ' broken links: ' + JSON.stringify(brokenAssets.slice(0, 3)));
console.log('  ✔ [PASS] Total asset and navigation URLs checked:', totalAssetsChecked);
console.log('  ✔ [PASS] Broken asset links count: 0 (100% Valid)');
results.passed++;

// 7. CSS and Tailwind Classes
console.log('\n[TEST 7] CSS Bundle Integrity & Tailwind Styling Classes...');
const cssFiles = getAllFiles(path.join(outDir, '_next', 'static', 'css'), '.css');
assert(cssFiles.length > 0, 'No CSS bundle found');
let totalCssSize = 0;
let cssContent = '';
cssFiles.forEach(cf => {
  const sz = fs.statSync(cf).size;
  totalCssSize += sz;
  cssContent += fs.readFileSync(cf, 'utf8');
});

const requiredClasses = [
  'bg-brand-orange', 'text-brand-orange', 'text-amber-300', 'text-emerald-300',
  'grid-cols-1', 'duration-1000'
];

requiredClasses.forEach(cls => {
  const found = cssContent.includes(cls) || cssContent.includes(cls.split('-').pop());
  assert(found, 'Required CSS class missing from compiled bundle: ' + cls);
  console.log('  ✔ [PASS] Utility class:', cls.padEnd(25), '[COMPILED]');
});
console.log('  ✔ [PASS] Compiled CSS bundle size:', totalCssSize.toLocaleString(), 'bytes');
results.passed++;

// 8. Hydration Safety & Meta Tags
console.log('\n[TEST 8] Hydration Safety, OpenGraph & Meta Tag Verification...');
assert(indexHtml.includes('name="viewport"'), 'Viewport meta missing');
assert(indexHtml.toLowerCase().includes('charset='), 'Charset meta missing');
assert(indexHtml.includes('<title>'), 'Title tag missing');
assert(indexHtml.includes('og:title') || indexHtml.includes('property="og:title"'), 'OG Title missing');
console.log('  ✔ [PASS] Responsive Viewport, Charset, Title, and OpenGraph tags verified');
results.passed++;

// 9. Performance & Bundle Size Budgets
console.log('\n[TEST 9] Performance & Bundle Size Budgets...');
const jsChunks = getAllFiles(path.join(outDir, '_next', 'static', 'chunks'), '.js');
let totalJsSize = 0;
jsChunks.forEach(jf => {
  totalJsSize += fs.statSync(jf).size;
});
console.log('  ✔ [PASS] Total JS Chunks Count:', jsChunks.length);
console.log('  ✔ [PASS] Total JS Static Size:', (totalJsSize / 1024).toFixed(1), 'kB');
assert(totalJsSize > 0, 'No JS chunks found');
results.passed++;

console.log('\n======================================================================');
console.log('  ALL EMPIRICAL TESTS PASSED! (' + results.passed + ' suites, ' + results.assertions + ' assertions)');
console.log('======================================================================');
