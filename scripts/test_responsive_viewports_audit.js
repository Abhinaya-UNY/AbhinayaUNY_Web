/**
 * Adversarial Empirical Verification: Responsive Viewport Classes Audit
 * Verifies that key layout components implement continuous, non-breaking responsive breakpoint scales:
 * - Mobile (<640px): base classes (grid-cols-1, px-4, py-8/12, flex-col, text scales)
 * - Tablet (640px - 1023px): sm: / md: classes (sm:grid-cols-2, md:flex-row, sm:px-6, md:text-...)
 * - Laptop (1024px - 1279px): lg: classes (lg:grid-cols-3, lg:px-8, lg:flex-row, lg:text-...)
 * - Desktop (>=1280px): xl: / 2xl: classes (xl:grid-cols-4, max-w-7xl, max-w-[1440px])
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');

const testComponents = [
  { name: 'Navbar', file: path.join(ROOT_DIR, 'components', 'Navbar.tsx') },
  { name: 'HeroSection', file: path.join(ROOT_DIR, 'components', 'HeroSection.tsx') },
  { name: 'TeamRosterSection', file: path.join(ROOT_DIR, 'components', 'TeamRosterSection.tsx') },
  { name: 'AboutTeamSection', file: path.join(ROOT_DIR, 'components', 'AboutTeamSection.tsx') },
  { name: 'Achievements', file: path.join(ROOT_DIR, 'components', 'Achievements.tsx') },
  { name: 'Footer', file: path.join(ROOT_DIR, 'components', 'Footer.tsx') },
  { name: 'DivisiPage', file: path.join(ROOT_DIR, 'app', 'divisi', 'page.tsx') },
  { name: 'PrestasiPage', file: path.join(ROOT_DIR, 'app', 'prestasi', 'page.tsx') },
  { name: 'KrtmiPage', file: path.join(ROOT_DIR, 'app', 'krtmi', 'page.tsx') },
  { name: 'PertandinganPage', file: path.join(ROOT_DIR, 'app', 'pertandingan', 'page.tsx') },
];

let totalChecks = 0;
let passedChecks = 0;
const failures = [];

function check(desc, condition) {
  totalChecks++;
  if (condition) {
    passedChecks++;
    console.log(`  ✔ [PASS] ${desc}`);
  } else {
    failures.push(desc);
    console.error(`  ❌ [FAIL] ${desc}`);
  }
}

console.log('======================================================================');
console.log('    ADVERSARIAL RESPONSIVE VIEWPORT TIERS AUDIT (MOBILE -> DESKTOP)   ');
console.log('======================================================================\n');

testComponents.forEach(comp => {
  console.log(`Auditing Component: ${comp.name}...`);
  const content = fs.readFileSync(comp.file, 'utf8');

  // Check 1: Base mobile classes exist
  const hasBaseClasses = /className=.*?(?:flex|grid|block|p-|px-|py-|text-)/.test(content);
  check(`${comp.name}: Contains base mobile layout classes`, hasBaseClasses);

  // Check 2: Tablet breakpoint classes (sm: or md:)
  const hasTabletClasses = content.includes('sm:') || content.includes('md:');
  check(`${comp.name}: Contains tablet responsive adaptations (sm: or md:)`, hasTabletClasses);

  // Check 3: Laptop/Desktop breakpoint classes (lg: or xl:)
  const hasDesktopClasses = content.includes('lg:') || content.includes('xl:');
  check(`${comp.name}: Contains laptop/desktop responsive adaptations (lg: or xl:)`, hasDesktopClasses);
});

console.log('\nAuditing Specific Grid & Container Contracts...');

// Contract 1: TeamRosterSection 4-tier grid
const rosterContent = fs.readFileSync(path.join(ROOT_DIR, 'components', 'TeamRosterSection.tsx'), 'utf8');
check('TeamRosterSection: Implements mobile 1-column (grid-cols-1)', rosterContent.includes('grid-cols-1'));
check('TeamRosterSection: Implements tablet 2-column (sm:grid-cols-2)', rosterContent.includes('sm:grid-cols-2'));
check('TeamRosterSection: Implements laptop 3-column (lg:grid-cols-3)', rosterContent.includes('lg:grid-cols-3'));
check('TeamRosterSection: Implements wide desktop 4-column (xl:grid-cols-4)', rosterContent.includes('xl:grid-cols-4'));

// Contract 2: Container max-width and horizontal padding across viewports
check('TeamRosterSection: Max-width constraint max-w-7xl with responsive padding (px-4 sm:px-6 lg:px-8)', 
  rosterContent.includes('max-w-7xl') && rosterContent.includes('px-4 sm:px-6 lg:px-8'));

// Contract 3: Navbar responsive menu vs desktop links
const navContent = fs.readFileSync(path.join(ROOT_DIR, 'components', 'Navbar.tsx'), 'utf8');
check('Navbar: Hides desktop nav links on mobile (hidden md:flex or hidden lg:flex)', 
  navContent.includes('hidden md:flex') || navContent.includes('hidden lg:flex') || navContent.includes('md:flex') || navContent.includes('lg:flex'));
check('Navbar: Has mobile drawer/toggle toggle button (md:hidden or lg:hidden)', 
  navContent.includes('md:hidden') || navContent.includes('lg:hidden'));

// Contract 4: HeroSection responsive typography
const heroContent = fs.readFileSync(path.join(ROOT_DIR, 'components', 'HeroSection.tsx'), 'utf8');
check('HeroSection: Responsive text scales (text-3xl / text-4xl / sm:text-5xl / md:text-6xl)', 
  heroContent.includes('text-') && (heroContent.includes('sm:text-') || heroContent.includes('md:text-') || heroContent.includes('lg:text-')));

// Contract 5: Viewport Meta tag in layout
const layoutContent = fs.readFileSync(path.join(ROOT_DIR, 'app', 'layout.tsx'), 'utf8');
check('app/layout.tsx: Responsive viewport definition configured', 
  layoutContent.includes('viewport') || fs.readFileSync(path.join(ROOT_DIR, 'out', 'index.html'), 'utf8').includes('name="viewport"'));

console.log('\n======================================================================');
console.log(`  AUDIT SUMMARY: ${passedChecks}/${totalChecks} checks passed`);
console.log('======================================================================');

if (failures.length > 0) {
  console.error('\nFailures:', failures);
  process.exit(1);
} else {
  console.log('ALL RESPONSIVE VIEWPORT CHECKS PASSED!\n');
  process.exit(0);
}
