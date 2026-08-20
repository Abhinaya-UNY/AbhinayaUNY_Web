/**
 * Tier 4: Real-World Scenarios - User Journey 2: Historical Archive & Scoring Simulation
 */

const { describe, test, it, expect } = require('../helpers/test-framework');
const { CompetitionScoring } = require('../helpers/math-oracle');
const DomInspector = require('../helpers/dom-inspector');

function runUserJourneyArchiveTests() {
  const KRTMI_EDITIONS = DomInspector.getKrtmiEditions();
  const krtmiPage = DomInspector.readFile('app/krtmi/page.tsx');

  describe('Tier 4: Scenario 2 - Visitor Explores Historical Archive & Runs Match Scoring', () => {
    test('T4.2.1: Visitor navigates to /krtmi and page renders comprehensive multi-year documentation', () => {
      expect(krtmiPage).toContain('Evolusi Regulasi');
      expect(krtmiPage).toContain('DOKUMENTASI LENGKAP');
    });

    test('T4.2.2: Visitor inspects 2024 edition and confirms Dual Feeder & Sorter robot collaboration rules', () => {
      const e2024 = KRTMI_EDITIONS.find(e => e.year === '2024');
      const missionText = e2024.missionFlow.join(' ');
      expect(missionText).toContain('Pengumpan');
      expect(missionText).toContain('YOLO');
      expect(missionText).toContain('Mecanum');
      expect(e2024.technicalChallenges[0]).toContain('YOLO');
      expect(e2024.instantWinCondition.name).toBe('BERSIH');
    });

    test('T4.2.3: Visitor runs interactive 2024 match scoring simulator for a championship run (18 sorted, 0 drops, 5 boxes)', () => {
      const sim = CompetitionScoring.score2024({
        correctSort: 18,
        dropped: 0,
        fouls: 0,
        boxesCompleted: 5,
      });
      expect(sim.isBersih).toBe(true);
      expect(sim.totalScore).toBe(54); // 18 * 3 = 54
      expect(sim.verdict).toContain('BERSIH');
    });

    test('T4.2.4: Visitor inspects 2019 debut edition and confirms Panen Raya agricultural scoring formulas', () => {
      const e2019 = KRTMI_EDITIONS.find(e => e.year === '2019');
      const missionText = e2019.missionFlow.join(' ');
      expect(missionText).toContain('bibit');
      expect(missionText).toContain('tanam');
      expect(e2019.instantWinCondition.name).toBe('PANEN RAYA');

      const sim2019 = CompetitionScoring.score2019({
        ricePlanted: 3,
        weedsRemoved: 2,
        harvested: true,
      });
      expect(sim2019.isPanenRaya).toBe(true);
      expect(sim2019.totalScore).toBe(90);
    });

    test('T4.2.5: Visitor navigates to Technocorner 2026 section and inspects Transporter payload specifications', () => {
      const e2026 = KRTMI_EDITIONS.find(e => e.year === '2026');
      expect(e2026.title).toContain('TECHNOCORNER 2026');
      expect(e2026.robotArchitecture.controller).toContain('FreeRTOS');
    });

    test('T4.2.6: Every competition year in the archive has full 5-pillar technical specification data', () => {
      for (const edition of KRTMI_EDITIONS) {
        expect(edition.year).toBeDefined();
        expect(edition.title).toBeDefined();
        expect(edition.theme).toBeDefined();
        expect(edition.organizer).toBeDefined();
        expect(edition.missionFlow.length).toBeGreaterThanOrEqual(3);
        expect(edition.technicalChallenges.length).toBeGreaterThanOrEqual(3);
        expect(edition.robotArchitecture.drivetrain).toBeDefined();
        expect(edition.robotArchitecture.controller).toBeDefined();
        expect(edition.robotArchitecture.sensors.length).toBeGreaterThan(0);
        expect(edition.robotArchitecture.algorithm).toBeDefined();
        expect(edition.achievements).toBeDefined();
      }
    });
  });
}

module.exports = runUserJourneyArchiveTests;

if (require.main === module) {
  runUserJourneyArchiveTests();
  const { reporter } = require('../helpers/test-framework');
  reporter.summary();
}
