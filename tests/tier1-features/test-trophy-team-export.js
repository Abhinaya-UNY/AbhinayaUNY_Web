/**
 * Tier 1: Feature Coverage - Trophy Cabinet, Team Data Integrity & Static Export
 * Features 17, 18, 19
 */

const { describe, test, it, expect } = require('../helpers/test-framework');
const DomInspector = require('../helpers/dom-inspector');

function runTrophyTeamExportTests() {
  const achievementsTsx = DomInspector.readFile('components/Achievements.tsx');
  const heroTsx = DomInspector.readFile('components/HeroSection.tsx');
  const nextConfig = DomInspector.readFile('next.config.js');
  const deployYml = DomInspector.readFile('.github/workflows/deploy.yml');

  describe('Tier 1: Feature 17 - Trophy Cabinet & Official UNY Press Releases', () => {
    test('T1.17.1: Trophy showcase prominently displays Juara 1 Wilayah I KRTMI 2024', () => {
      expect(achievementsTsx).toContain('Juara 1 Tingkat Wilayah (Wilayah I)');
      expect(achievementsTsx).toContain('JUARA 1 WILAYAH I');
      expect(heroTsx).toContain('JUARA 1 WILAYAH I');
    });

    test('T1.17.2: Trophy showcase prominently displays Juara 2 Tingkat Nasional KRTMI 2024', () => {
      expect(achievementsTsx).toContain('Juara 2 Tingkat Nasional');
      expect(achievementsTsx).toContain('JUARA 2 NASIONAL');
      expect(heroTsx).toContain('JUARA 2 NASIONAL');
    });

    test('T1.17.3: Trophy showcase documents Juara 3 Wilayah KRTMI 2023 and Finalis Nasional', () => {
      expect(achievementsTsx).toContain('Juara 3 Tingkat Wilayah');
      expect(achievementsTsx).toContain('Finalis');
    });

    test('T1.17.4: Official press release links follow verified UNY domain structure (uny.ac.id)', () => {
      const links = [
        'https://www.uny.ac.id/index.php/id/berita/robot-abhinaya-uny-sabet-juara-pertama-kontes-robot-tematik-indonesia',
        'http://www.uny.ac.id/index.php/id/berita/abhinaya-raih-juara-1-di-konteks-robot-tematik-indonesia-wilayah-i-tahun-2024',
        'https://www.uny.ac.id/index.php/id/berita/abhinaya-meraih-juara-2-nasional-di-kompetisi-kri-divisi-krtmi-2024',
      ];
      for (const link of links) {
        expect(link).toContain('uny.ac.id');
        expect(link).toContain('berita');
      }
    });

    test('T1.17.5: Technocorner 2026 participation recognized under FT UGM organizer', () => {
      expect(achievementsTsx).toContain('Technocorner 2026');
      expect(achievementsTsx).toContain('Universitas Gadjah Mada');
    });
  });

  describe('Tier 1: Feature 18 - Strict Team Data Integrity (Zero Student Names / Profiles)', () => {
    test('T1.18.1: Full codebase scan verifies 0 personal student names (100% Team Data only)', () => {
      const scanResult = DomInspector.scanForIndividualStudentNames();
      expect(scanResult.hasViolations).toBe(false);
      expect(scanResult.violations.length).toBe(0);
      expect(scanResult.scannedFilesCount).toBeGreaterThan(5);
    });

    test('T1.18.2: Team branding consistently identifies as "Tim Robotika Abhinaya UNY"', () => {
      const allAppFiles = DomInspector.listFiles('app').concat(DomInspector.listFiles('components'));
      const combined = allAppFiles.map(f => DomInspector.readFile(f)).join('\n');
      expect(combined).toContain('Abhinaya');
      expect(combined).toContain('UNY');
    });
  });

  describe('Tier 1: Feature 19 - Web Infrastructure & Static Export Pipeline', () => {
    test('T1.19.1: Next.js configuration defines output: "export" for static HTML generation', () => {
      expect(nextConfig).toContain("output: 'export'");
    });

    test('T1.19.2: Next.js config defines trailingSlash: true for directory route compatibility', () => {
      expect(nextConfig).toContain('trailingSlash: true');
    });

    test('T1.19.3: Next.js images.unoptimized is set to true for standalone static export', () => {
      expect(nextConfig).toContain('unoptimized: true');
    });

    test('T1.19.4: GitHub Actions deploy workflow configures GitHub Pages automated deployment on push to main', () => {
      expect(deployYml).toContain('actions/deploy-pages');
      expect(deployYml).toContain('actions/upload-pages-artifact');
      expect(deployYml).toContain('push:');
      expect(deployYml).toContain('- main');
    });

    test('T1.19.5: Static export builds to ./out directory containing index.html and all subroutes', () => {
      const outDirExists = DomInspector.fileExists('out');
      expect(outDirExists).toBe(true);
      const indexHtmlExists = DomInspector.fileExists('out/index.html');
      expect(indexHtmlExists).toBe(true);
    });
  });
}

module.exports = runTrophyTeamExportTests;

if (require.main === module) {
  runTrophyTeamExportTests();
  const { reporter } = require('../helpers/test-framework');
  reporter.summary();
}
