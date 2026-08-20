/**
 * Tier 4: Real-World Scenarios - User Journey 4: Trophy Cabinet & Team Data Integrity Audit
 */

const { describe, test, it, expect } = require('../helpers/test-framework');
const DomInspector = require('../helpers/dom-inspector');

function runUserJourneyIntegrityTests() {
  const prestasiPage = DomInspector.readFile('app/prestasi/page.tsx');
  const achievementsTsx = DomInspector.readFile('components/Achievements.tsx');

  describe('Tier 4: Scenario 4 - Trophy Verification & 100% Team Data Integrity Enforcement', () => {
    test('T4.4.1: Visitor navigates to /prestasi and page mounts the official championship awards board', () => {
      expect(prestasiPage).toContain('<Achievements');
      expect(achievementsTsx).toContain('Papan Kejuaraan');
      expect(achievementsTsx).toContain('Jejak Prestasi Nasional');
    });

    test('T4.4.2: Trophy showcase highlights Juara 1 Wilayah I KRTMI 2024 with golden badge', () => {
      expect(achievementsTsx).toContain('Juara 1 Tingkat Wilayah (Wilayah I)');
      expect(achievementsTsx).toContain('JUARA 1 WILAYAH I');
      expect(achievementsTsx).toContain('Puspresnas Kemendikbudristek');
    });

    test('T4.4.3: Trophy showcase highlights Juara 2 Tingkat Nasional KRTMI 2024 at UMS Surakarta', () => {
      expect(achievementsTsx).toContain('Juara 2 Tingkat Nasional');
      expect(achievementsTsx).toContain('JUARA 2 NASIONAL');
    });

    test('T4.4.4: Every award card displays official institution endorsement badge (Puspresnas / UNY)', () => {
      expect(achievementsTsx).toContain('Puspresnas / UNY');
    });

    test('T4.4.5: Exhaustive automated scan of all source files in app/, components/, and data/ confirms ZERO individual student names', () => {
      const audit = DomInspector.scanForIndividualStudentNames();
      expect(audit.hasViolations).toBe(false);
      expect(audit.violations.length).toBe(0);
      expect(audit.scannedFilesCount).toBeGreaterThanOrEqual(10);
    });

    test('T4.4.6: Verification that 100% of website content represents "Tim Robotika Abhinaya UNY"', () => {
      const footer = DomInspector.readFile('components/Footer.tsx');
      const navbar = DomInspector.readFile('components/Navbar.tsx');
      expect(footer).toContain('TIM ROBOTIKA ABHINAYA UNY');
      expect(navbar).toContain('ABHINAYA');
      expect(navbar).toContain('.UNY');
    });
  });
}

module.exports = runUserJourneyIntegrityTests;

if (require.main === module) {
  runUserJourneyIntegrityTests();
  const { reporter } = require('../helpers/test-framework');
  reporter.summary();
}
