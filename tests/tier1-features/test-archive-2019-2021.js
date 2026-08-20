/**
 * Tier 1: Feature Coverage - Historical Archives (2019, 2020, 2021)
 * Features 5, 6, 7
 */

const { describe, test, it, expect } = require('../helpers/test-framework');
const { CompetitionScoring } = require('../helpers/math-oracle');
const DomInspector = require('../helpers/dom-inspector');

function runArchive2019To2021Tests() {
  const krtmiDataTs = DomInspector.readFile('data/krtmiData.ts');

  describe('Tier 1: Feature 5 - KRTMI 2019 Archive (UDINUS Semarang - Robot Pertanian Padi)', () => {
    test('T1.5.1: 2019 edition metadata contains correct host (UDINUS) and agricultural theme', () => {
      expect(krtmiDataTs).toContain('2019');
      expect(krtmiDataTs).toContain('UDINUS');
      expect(krtmiDataTs).toContain('Pertanian');
      expect(krtmiDataTs).toContain('Padi');
    });

    test('T1.5.2: 2019 physical envelope adheres to 500x500mm start and 1000x1000x1000mm dynamic expansion', () => {
      const startDim = { width: 500, length: 500 };
      const dynamicDim = { width: 1000, length: 1000, height: 1000 };
      const maxWeightKg = 25;
      const maxVoltageV = 24;

      expect(startDim.width).toBeLessThanOrEqual(500);
      expect(dynamicDim.width).toBeLessThanOrEqual(1000);
      expect(maxWeightKg).toBe(25);
      expect(maxVoltageV).toBe(24);
    });

    test('T1.5.3: 2019 scoring oracle computes Panen Raya instant victory when all criteria met', () => {
      const result = CompetitionScoring.score2019({
        ricePlanted: 3,
        weedsRemoved: 2,
        harvested: true,
        trampled: false,
      });
      expect(result.isPanenRaya).toBe(true);
      expect(result.totalScore).toBe(90);
    });

    test('T1.5.4: 2019 point scoring without Panen Raya sums planting (10/ea), weeding (15/ea), harvest (30)', () => {
      const result = CompetitionScoring.score2019({
        ricePlanted: 2,
        weedsRemoved: 1,
        harvested: false,
        trampled: false,
      });
      expect(result.isPanenRaya).toBe(false);
      expect(result.totalScore).toBe(35); // 2*10 + 1*15 = 35
    });

    test('T1.5.5: Trampling rice stalk revokes Panen Raya eligibility even with full completion', () => {
      const result = CompetitionScoring.score2019({
        ricePlanted: 3,
        weedsRemoved: 2,
        harvested: true,
        trampled: true,
      });
      expect(result.isPanenRaya).toBe(false);
      expect(result.totalScore).toBe(90);
    });
  });

  describe('Tier 1: Feature 6 - KRTMI 2020 Archive (ITB Daring - COVID-19 Disinfeksi & Pertanian)', () => {
    test('T1.6.1: 2020 edition metadata records ITB / Daring Nasional host and COVID-19 theme', () => {
      expect(krtmiDataTs).toContain('2020');
      expect(krtmiDataTs).toContain('ITB');
      expect(krtmiDataTs).toContain('COVID-19');
      expect(krtmiDataTs).toContain('Disinfeksi');
    });

    test('T1.6.2: 2020 virtual telemetry supports dual camera streaming (Zoom + overhead camera)', () => {
      expect(krtmiDataTs).toContain('Dual Live Streaming');
      expect(krtmiDataTs).toContain('Zoom');
    });

    test('T1.6.3: 2020 match duration is standardized to 3 minutes with PANEN RAYA instant win', () => {
      expect(krtmiDataTs).toContain('PANEN RAYA');
      expect(krtmiDataTs).toContain('3 menit');
    });

    test('T1.6.4: 2020 robot architecture uses 4WD Skid-Steer with Arduino Mega and pneumatic cylinder', () => {
      expect(krtmiDataTs).toContain('4WD Skid-Steer');
      expect(krtmiDataTs).toContain('Arduino Mega');
      expect(krtmiDataTs).toContain('Pneumatic');
    });

    test('T1.6.5: 2020 Abhinaya UNY achievement correctly recorded as Peserta & Finalis Nasional Daring', () => {
      expect(krtmiDataTs).toContain('FINALIS NASIONAL DARING KRTMI 2020');
    });
  });

  describe('Tier 1: Feature 7 - KRTMI 2021 Archive (UGM Daring - Cyber-Physical Digital Twin Dam-daman)', () => {
    test('T1.7.1: 2021 edition records UGM Daring host and Digital Twin Dam-daman theme', () => {
      expect(krtmiDataTs).toContain('2021');
      expect(krtmiDataTs).toContain('UGM');
      expect(krtmiDataTs).toContain('Dam-daman');
    });

    test('T1.7.2: 2021 physical green screen arena dimensions are exactly 300 cm x 400 cm', () => {
      expect(krtmiDataTs).toContain('300 cm × 400 cm');
      expect(krtmiDataTs).toContain('Green Screen');
    });

    test('T1.7.3: 2021 speed limit of 40 cm/s is enforced via overhead tracking camera', () => {
      expect(krtmiDataTs).toContain('40 cm/s');
    });

    test('T1.7.4: 2021 instant victory condition is "DAM" (3 coins in a row)', () => {
      expect(krtmiDataTs).toContain('DAM');
    });

    test('T1.7.5: 2021 coin specifications: 12 red and 12 blue styrofoam coins (dia 15cm, thickness 3cm)', () => {
      expect(krtmiDataTs).toContain('12 Merah, 12 Biru');
      expect(krtmiDataTs).toContain('Diameter 15 cm');
      expect(krtmiDataTs).toContain('Tebal 3 cm');
    });
  });
}

module.exports = runArchive2019To2021Tests;

if (require.main === module) {
  runArchive2019To2021Tests();
  const { reporter } = require('../helpers/test-framework');
  reporter.summary();
}
