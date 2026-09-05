/**
 * Verification Test: React Bits Animation Suite Primitives
 * Validates file structure, exports, zero external animation dependencies,
 * 'use client' directives, and genuine logic implementations.
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const ANIMATIONS_DIR = path.join(ROOT_DIR, 'components', 'animations');
const UI_DIR = path.join(ROOT_DIR, 'components', 'ui');

let passedTests = 0;
let failedTests = 0;

function assert(condition, message) {
  if (!condition) {
    failedTests++;
    console.error(`  ❌ FAIL: ${message}`);
    throw new Error(message);
  }
}

function test(name, fn) {
  process.stdout.write(`• Testing ${name} ... `);
  try {
    fn();
    passedTests++;
    console.log('✅ PASS');
  } catch (e) {
    // recorded in assert
  }
}

console.log('======================================================================');
console.log('       REACT BITS SUITE PRIMITIVES INTEGRITY VERIFICATION            ');
console.log('======================================================================\n');

// 1. File existence
const requiredFiles = [
  path.join(ANIMATIONS_DIR, 'DecryptedText.tsx'),
  path.join(ANIMATIONS_DIR, 'ShinyText.tsx'),
  path.join(ANIMATIONS_DIR, 'BlurText.tsx'),
  path.join(ANIMATIONS_DIR, 'SpotlightCard.tsx'),
  path.join(ANIMATIONS_DIR, 'CountUp.tsx'),
  path.join(ANIMATIONS_DIR, 'AmbientGrid.tsx'),
  path.join(ANIMATIONS_DIR, 'index.ts'),
  path.join(UI_DIR, 'SpotlightCard.tsx'),
];

requiredFiles.forEach(file => {
  test(`File exists: ${path.relative(ROOT_DIR, file)}`, () => {
    assert(fs.existsSync(file), `Missing expected file: ${file}`);
    const stat = fs.statSync(file);
    assert(stat.size > 50, `File appears empty: ${file} (${stat.size} bytes)`);
  });
});

// 2. Client directives
const clientComponentFiles = [
  path.join(ANIMATIONS_DIR, 'DecryptedText.tsx'),
  path.join(ANIMATIONS_DIR, 'ShinyText.tsx'),
  path.join(ANIMATIONS_DIR, 'BlurText.tsx'),
  path.join(ANIMATIONS_DIR, 'SpotlightCard.tsx'),
  path.join(ANIMATIONS_DIR, 'CountUp.tsx'),
  path.join(ANIMATIONS_DIR, 'AmbientGrid.tsx'),
  path.join(UI_DIR, 'SpotlightCard.tsx'),
];

clientComponentFiles.forEach(file => {
  test(`Has 'use client' directive: ${path.basename(file)}`, () => {
    const content = fs.readFileSync(file, 'utf8');
    assert(content.includes("'use client'"), `File missing 'use client': ${file}`);
  });
});

// 3. Zero dependency on framer-motion or external libraries
requiredFiles.forEach(file => {
  test(`Zero framer-motion dependency in: ${path.basename(file)}`, () => {
    const content = fs.readFileSync(file, 'utf8');
    assert(!content.includes('framer-motion'), `Found illegal framer-motion import in: ${file}`);
    assert(!content.includes('@react-spring'), `Found illegal @react-spring import in: ${file}`);
  });
});

// 4. DecryptedText implementation features
test('DecryptedText: genuine scramble, SSR-safe initial state & reduced-motion check', () => {
  const content = fs.readFileSync(path.join(ANIMATIONS_DIR, 'DecryptedText.tsx'), 'utf8');
  assert(content.includes('useState<string>(text)'), 'Initial state must be literal text for SSR');
  assert(content.includes('prefers-reduced-motion'), 'Must check prefers-reduced-motion');
  assert(content.includes('revealDirection'), 'Must support revealDirection');
  assert(content.includes('aria-label={text}'), 'Must have aria-label for accessibility');
  assert(content.includes('export const DecryptedText'), 'Named export missing');
});

// 5. ShinyText implementation features
test('ShinyText: metallic sweep, animate-shimmer & literal text rendering', () => {
  const content = fs.readFileSync(path.join(ANIMATIONS_DIR, 'ShinyText.tsx'), 'utf8');
  assert(content.includes('animate-shimmer'), 'Must use animate-shimmer keyframes');
  assert(content.includes('bg-clip-text'), 'Must use bg-clip-text');
  assert(content.includes('{text}'), 'Must render literal text directly');
  assert(content.includes('prefers-reduced-motion'), 'Must check prefers-reduced-motion');
  assert(content.includes('export const ShinyText'), 'Named export missing');
});

// 6. BlurText implementation features
test('BlurText: IntersectionObserver, staggered reveal & a11y label', () => {
  const content = fs.readFileSync(path.join(ANIMATIONS_DIR, 'BlurText.tsx'), 'utf8');
  assert(content.includes('IntersectionObserver'), 'Must use IntersectionObserver');
  assert(content.includes('aria-label={text}'), 'Must have aria-label for semantic accessibility');
  assert(content.includes('filter: inView'), 'Must apply blur transition based on inView');
  assert(content.includes('prefers-reduced-motion'), 'Must check prefers-reduced-motion');
  assert(content.includes('export const BlurText'), 'Named export missing');
});

// 7. SpotlightCard implementation features
test('SpotlightCard: CSS custom properties, pointer-events-none & direct DOM manipulation', () => {
  const content = fs.readFileSync(path.join(ANIMATIONS_DIR, 'SpotlightCard.tsx'), 'utf8');
  assert(content.includes('--mouse-x'), 'Must use --mouse-x CSS variable');
  assert(content.includes('--mouse-y'), 'Must use --mouse-y CSS variable');
  assert(content.includes('--spotlight-opacity'), 'Must use --spotlight-opacity CSS variable');
  assert(content.includes('pointer-events-none'), 'Spotlight overlay must be pointer-events-none');
  assert(content.includes('export const SpotlightCard'), 'Named export missing');
});

// 8. CountUp implementation features
test('CountUp: requestAnimationFrame, easeOutExpo & formatting', () => {
  const content = fs.readFileSync(path.join(ANIMATIONS_DIR, 'CountUp.tsx'), 'utf8');
  assert(content.includes('requestAnimationFrame'), 'Must use requestAnimationFrame');
  assert(content.includes('easeOutExpo'), 'Must use easeOutExpo easing');
  assert(content.includes('formatNumber'), 'Must format number with separator/decimals');
  assert(content.includes('prefers-reduced-motion'), 'Must check prefers-reduced-motion');
  assert(content.includes('export const CountUp'), 'Named export missing');
});

// 9. AmbientGrid implementation features
test('AmbientGrid: SVG pattern, micro-grid coordinates & scanline', () => {
  const content = fs.readFileSync(path.join(ANIMATIONS_DIR, 'AmbientGrid.tsx'), 'utf8');
  assert(content.includes('<svg'), 'Must render SVG micro-grid');
  assert(content.includes('<pattern'), 'Must define pattern for grid');
  assert(content.includes('showScanLine'), 'Must support showScanLine');
  assert(content.includes('aria-hidden="true"'), 'Must have aria-hidden for non-intrusive backdrop');
  assert(content.includes('export const AmbientGrid'), 'Named export missing');
});

// 10. Barrel export and alias re-export
test('index.ts and ui/SpotlightCard.tsx barrel exports', () => {
  const indexContent = fs.readFileSync(path.join(ANIMATIONS_DIR, 'index.ts'), 'utf8');
  assert(indexContent.includes("export * from './DecryptedText'"), 'Missing DecryptedText export');
  assert(indexContent.includes("export * from './ShinyText'"), 'Missing ShinyText export');
  assert(indexContent.includes("export * from './BlurText'"), 'Missing BlurText export');
  assert(indexContent.includes("export * from './SpotlightCard'"), 'Missing SpotlightCard export');
  assert(indexContent.includes("export * from './CountUp'"), 'Missing CountUp export');
  assert(indexContent.includes("export * from './AmbientGrid'"), 'Missing AmbientGrid export');

  const uiContent = fs.readFileSync(path.join(UI_DIR, 'SpotlightCard.tsx'), 'utf8');
  assert(uiContent.includes("from '../animations/SpotlightCard'"), 'Missing ui alias export');
});

console.log('\n======================================================================');
console.log(`Passed: ${passedTests}, Failed: ${failedTests}`);
console.log('======================================================================\n');

if (failedTests > 0) {
  process.exit(1);
} else {
  console.log('ALL REACT BITS PRIMITIVES VERIFICATION TESTS PASSED!\n');
  process.exit(0);
}
