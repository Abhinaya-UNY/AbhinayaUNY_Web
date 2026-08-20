/**
 * Tier 2: Boundary & Corner Cases - Archive Scoring Boundaries & Edge Year Selections
 */

const { describe, test, it, expect } = require('../helpers/test-framework');
const { CompetitionScoring } = require('../helpers/math-oracle');
const DomInspector = require('../helpers/dom-inspector');

function runArchiveScoringBoundariesTests() {
  const KRTMI_EDITIONS = DomInspector.getKrtmiEditions();

  describe('Tier 2: Boundary Cases - Scoring Limits & Archive Edge Selections', () => {
    test('T2.4.1: KRTMI 2024 scoring with 0 items and 0 drops produces exactly 0 points', () => {
      const res = CompetitionScoring.score2024({ correctSort: 0, dropped: 0, fouls: 0, boxesCompleted: 0 });
      expect(res.totalScore).toBe(0);
      expect(res.isBersih).toBe(false);
    });

    test('T2.4.2: KRTMI 2024 with excessive drops/fouls calculates net negative raw score', () => {
      const res = CompetitionScoring.score2024({ correctSort: 1, dropped: 5, fouls: 2, boxesCompleted: 1 });
      // 1*3 - 5 - 2 = -4
      expect(res.totalScore).toBe(-4);
      expect(res.isBersih).toBe(false);
    });

    test('T2.4.3: KRTMI 2019 with 0 plants, 0 weeds, and no harvest yields 0 points', () => {
      const res = CompetitionScoring.score2019({ ricePlanted: 0, weedsRemoved: 0, harvested: false, trampled: false });
      expect(res.totalScore).toBe(0);
      expect(res.isPanenRaya).toBe(false);
    });

    test('T2.4.4: KRTMI 2019 planting points are capped at maximum 3 stalks (30 pts) even if input is higher', () => {
      const res = CompetitionScoring.score2019({ ricePlanted: 10, weedsRemoved: 0, harvested: false, trampled: false });
      expect(res.totalScore).toBe(30); // Math.min(3, 10) * 10
    });

    test('T2.4.5: Technocorner 2026 battery voltage boundary at exactly 13.00V passes, 13.01V disqualifies', () => {
      const passRun = CompetitionScoring.scoreTechnocorner2026({ batteryVoltage: 13.0 });
      const failRun = CompetitionScoring.scoreTechnocorner2026({ batteryVoltage: 13.01 });
      expect(passRun.disqualified).toBe(false);
      expect(failRun.disqualified).toBe(true);
    });

    test('T2.4.6: History Timeline edition finder safely falls back to default when year is invalid/not found', () => {
      const findEdition = (year) => KRTMI_EDITIONS.find(e => e.year === year) || KRTMI_EDITIONS[0];
      const valid = findEdition('2024');
      const invalid = findEdition('1999');
      const future = findEdition('2099');

      expect(valid.year).toBe('2024');
      expect(invalid.year).toBe('2024'); // Falls back to default (index 0)
      expect(future.year).toBe('2024');
    });

    test('T2.4.7: KRTMI editions array contains exactly 7 distinct historical editions (2019-2026)', () => {
      const years = KRTMI_EDITIONS.map(e => e.year);
      const uniqueYears = [...new Set(years)];
      expect(KRTMI_EDITIONS.length).toBe(7);
      expect(uniqueYears.length).toBe(7);
      expect(years).toContain('2019');
      expect(years).toContain('2020');
      expect(years).toContain('2021');
      expect(years).toContain('2022');
      expect(years).toContain('2023');
      expect(years).toContain('2024');
      expect(years).toContain('2026');
    });
  });
}

module.exports = runArchiveScoringBoundariesTests;

if (require.main === module) {
  runArchiveScoringBoundariesTests();
  const { reporter } = require('../helpers/test-framework');
  reporter.summary();
}
