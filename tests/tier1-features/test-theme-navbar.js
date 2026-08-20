/**
 * Tier 1: Feature Coverage - Theme Styling & Telemetry Navbar
 * Features 1 & 2
 */

const { describe, test, it, expect } = require('../helpers/test-framework');
const DomInspector = require('../helpers/dom-inspector');

function runThemeNavbarTests() {
  describe('Tier 1: Feature 1 - Signature Emerald Green & Dark Industrial Theme Styling', () => {
    const tailwindConfig = DomInspector.readFile('tailwind.config.js');
    const globalsCss = DomInspector.readFile('app/globals.css');
    const layoutTsx = DomInspector.readFile('app/layout.tsx');

    test('T1.1.1: Tailwind configuration contains brand palette tokens (#00F5D4, #2563EB, #050811, #1E293B)', () => {
      expect(tailwindConfig).toContain('#00F5D4'); // brand-cyan / Emerald neon
      expect(tailwindConfig).toContain('#2563EB'); // brand-blue
      expect(tailwindConfig).toContain('#050811'); // brand-dark / carbon-950
      expect(tailwindConfig).toContain('#1E293B'); // brand-border
      expect(tailwindConfig).toContain('#F59E0B'); // brand-gold
    });

    test('T1.1.2: Global CSS defines dark void background and custom gradient', () => {
      expect(globalsCss).toContain('radial-gradient');
      expect(globalsCss).toContain('#050811');
      expect(globalsCss).toContain('#020408');
      expect(globalsCss).toContain('--foreground-rgb');
    });

    test('T1.1.3: Global CSS defines high-tech glowing neon utility classes', () => {
      expect(globalsCss).toContain('.glow-cyan');
      expect(globalsCss).toContain('.glow-gold');
      expect(globalsCss).toContain('.box-glow-cyan');
      expect(globalsCss).toContain('.box-glow-blue');
    });

    test('T1.1.4: Custom webkit scrollbar styled with cyber theme colors (#050811, #00F5D4)', () => {
      expect(globalsCss).toContain('::-webkit-scrollbar');
      expect(globalsCss).toContain('#050811');
      expect(globalsCss).toContain('#1E293B');
      expect(globalsCss).toContain('#00F5D4');
    });

    test('T1.1.5: Root Layout imports globals.css and applies clean dark container layout', () => {
      expect(layoutTsx).toContain("import './globals.css'");
      expect(layoutTsx).toContain('<Navbar');
      expect(layoutTsx).toContain('<Footer');
      expect(layoutTsx).toContain('min-h-');
    });
  });

  describe('Tier 1: Feature 2 - Sticky Telemetry Navbar & Navigation State', () => {
    const navbarTsx = DomInspector.readFile('components/Navbar.tsx');

    test('T1.2.1: Navbar uses sticky top positioning with backdrop-blur and high z-index', () => {
      expect(navbarTsx).toContain('sticky top-0');
      expect(navbarTsx).toContain('z-50');
      expect(navbarTsx).toContain('backdrop-blur');
    });

    test('T1.2.2: Navbar brand badge includes ABHINAYA.UNY and ROBOTICS telemetry tags', () => {
      expect(navbarTsx).toContain('ABHINAYA');
      expect(navbarTsx).toContain('.UNY');
      expect(navbarTsx).toContain('ROBOTICS');
      expect(navbarTsx).toContain('Kontes Robot Tematik Indonesia • UNY');
    });

    test('T1.2.3: Navbar contains all required navigation links (Beranda, KRTMI, Teknis, Prestasi)', () => {
      expect(navbarTsx).toContain("href: '/'");
      expect(navbarTsx).toContain("href: '/krtmi'");
      expect(navbarTsx).toContain("href: '/teknis'");
      expect(navbarTsx).toContain("href: '/prestasi'");
      expect(navbarTsx).toContain('Perjalanan KRTMI (2019-2026)');
      expect(navbarTsx).toContain('Spesifikasi & Kinematika');
    });

    test('T1.2.4: Active route detection highlights current tab with glowing cyan border', () => {
      expect(navbarTsx).toContain('usePathname');
      expect(navbarTsx).toContain('isActive');
      expect(navbarTsx).toContain('bg-brand-cyan/15 text-brand-cyan');
      expect(navbarTsx).toContain('border-brand-cyan/40');
    });

    test('T1.2.5: Responsive mobile hamburger toggle with open/close state machine', () => {
      expect(navbarTsx).toContain('useState(false)');
      expect(navbarTsx).toContain('setIsOpen');
      expect(navbarTsx).toContain('<Menu');
      expect(navbarTsx).toContain('<X');
      expect(navbarTsx).toContain('lg:hidden');
    });
  });
}

module.exports = runThemeNavbarTests;

if (require.main === module) {
  runThemeNavbarTests();
  const { reporter } = require('../helpers/test-framework');
  reporter.summary();
}
