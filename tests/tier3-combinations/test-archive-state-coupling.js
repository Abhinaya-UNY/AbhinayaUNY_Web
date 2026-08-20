/**
 * Tier 3: Cross-Feature Combinations - Archive Year Switcher, Rules & Scoring State Coupling
 */

const { describe, test, it, expect } = require('../helpers/test-framework');
const { CompetitionScoring } = require('../helpers/math-oracle');
const DomInspector = require('../helpers/dom-inspector');

function runArchiveStateCouplingTests() {
  const KRTMI_EDITIONS = DomInspector.getKrtmiEditions();
  const historyTimelineTsx = DomInspector.readFile('components/HistoryTimeline.tsx');

  describe('Tier 3: Pairwise Combination - Archive Year Switcher to Engine State Mapping', () => {
    test('T3.3.1: Switching year to 2019 configures agricultural rules, 90 max points, and Panen Raya trigger', () => {
      const edition2019 = KRTMI_EDITIONS.find(e => e.year === '2019');
      expect(edition2019.organizer).toContain('UDINUS');
      expect(edition2019.robotArchitecture.drivetrain).toContain('Lugged');

      const maxScore = CompetitionScoring.score2019({ ricePlanted: 3, weedsRemoved: 2, harvested: true });
      expect(maxScore.isPanenRaya).toBe(true);
      expect(maxScore.totalScore).toBe(90);
    });

    test('T3.3.2: Switching year to 2023 configures 3-wheel Kiwi Omni drivetrain and USM host', () => {
      const edition2023 = KRTMI_EDITIONS.find(e => e.year === '2023');
      expect(edition2023.organizer).toContain('USM');
      expect(edition2023.robotArchitecture.drivetrain).toContain('Kiwi Omni');
    });

    test('T3.3.3: Switching year to 2024 reconfigures 4WD Mecanum drivetrain, Dual ESP32/STM32, and +3/-1 scoring', () => {
      const edition2024 = KRTMI_EDITIONS.find(e => e.year === '2024');
      expect(edition2024.organizer).toContain('UMS');
      expect(edition2024.robotArchitecture.drivetrain).toContain('Mecanum');
      expect(edition2024.robotArchitecture.controller).toContain('ESP32-S3');

      const score2024 = CompetitionScoring.score2024({ correctSort: 5, dropped: 1, fouls: 0, boxesCompleted: 2 });
      expect(score2024.totalScore).toBe(14); // 5*3 - 1 = 14
    });

    test('T3.3.4: Switching year to 2026 reconfigures Technocorner Transporter arena (3x3m) and 13.0V limit', () => {
      const edition2026 = KRTMI_EDITIONS.find(e => e.year === '2026');
      expect(edition2026.division).toContain('Transporter');
      expect(edition2026.organizer).toContain('UGM');

      const tcScore = CompetitionScoring.scoreTechnocorner2026({ boxesInDropZone: 3, batteryVoltage: 12.4 });
      expect(tcScore.disqualified).toBe(false);
      expect(tcScore.totalScore).toBe(50); // 3*10 + 20 (finish) = 50
    });

    test('T3.3.5: HistoryTimeline component state binds selectedYear to render the correct edition card dynamically', () => {
      expect(historyTimelineTsx).toContain("const [selectedYear, setSelectedYear] = useState<string>('2024')");
      expect(historyTimelineTsx).toContain("KRTMI_EDITIONS.find((e) => e.year === selectedYear)");
      expect(historyTimelineTsx).toContain("onClick={() => setSelectedYear(edition.year)}");
    });
  });
}

module.exports = runArchiveStateCouplingTests;

if (require.main === module) {
  runArchiveStateCouplingTests();
  const { reporter } = require('../helpers/test-framework');
  reporter.summary();
}
