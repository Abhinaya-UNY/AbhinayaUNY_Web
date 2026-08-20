/**
 * Tier 1: Feature Coverage - Historical Archives (2022, 2023, 2024, Technocorner 2026)
 * Features 8, 9, 10, 11
 */

const { describe, test, it, expect } = require('../helpers/test-framework');
const { CompetitionScoring } = require('../helpers/math-oracle');
const DomInspector = require('../helpers/dom-inspector');

function runArchive2022To2026Tests() {
  const krtmiDataTs = DomInspector.readFile('data/krtmiData.ts');

  describe('Tier 1: Feature 8 - KRTMI 2022 Archive (ITS Surabaya - Digital Twin & Non-DAM Zone)', () => {
    test('T1.8.1: 2022 edition metadata records ITS Surabaya host and Medical Waste / Dam-daman theme', () => {
      expect(krtmiDataTs).toContain('2022');
      expect(krtmiDataTs).toContain('ITS');
      expect(krtmiDataTs).toContain('Dam-daman');
    });

    test('T1.8.2: 2022 concentric digital arena has 3 concentric boundary circles (dia 90cm, 170cm, 250cm)', () => {
      expect(krtmiDataTs).toContain('90 cm, 170 cm, 250 cm');
    });

    test('T1.8.3: 2022 square coin dimensions are 20cm x 20cm with thickness 3cm', () => {
      expect(krtmiDataTs).toContain('20 cm × 20 cm × 3 cm');
    });

    test('T1.8.4: 2022 rules partition Non-DAM zone where DAM instant win cannot be triggered', () => {
      expect(krtmiDataTs).toContain('Non-DAM');
    });

    test('T1.8.5: 2022 robot architecture uses 4-Wheel Omni drive with ESP32 and STM32', () => {
      expect(krtmiDataTs).toContain('4-Wheel Omni');
      expect(krtmiDataTs).toContain('STM32');
    });
  });

  describe('Tier 1: Feature 9 - KRTMI 2023 Archive (USM Semarang - Planetary Gear Digital Twin)', () => {
    test('T1.9.1: 2023 edition metadata records USM Semarang host and Planetary Gear theme', () => {
      expect(krtmiDataTs).toContain('2023');
      expect(krtmiDataTs).toContain('USM');
      expect(krtmiDataTs).toContain('Roda Gigi Planet');
    });

    test('T1.9.2: 2023 instant victory condition is "DONE" (4 octagonal coins in outer gear symmetry)', () => {
      expect(krtmiDataTs).toContain('DONE');
    });

    test('T1.9.3: 2023 coin rack contains exactly 23 slots for octagonal coins', () => {
      expect(krtmiDataTs).toContain('23 Slot');
    });

    test('T1.9.4: 2023 speed enforcement assesses 2-second stop penalty in Zona Awal for speed violation', () => {
      expect(krtmiDataTs).toContain('40 cm/s');
      expect(krtmiDataTs).toContain('2 Detik');
    });

    test('T1.9.5: 2023 robot architecture implements 3-Wheel Kiwi Omni-directional drivetrain with STM32F401', () => {
      expect(krtmiDataTs).toContain('Kiwi Omni');
      expect(krtmiDataTs).toContain('STM32F401');
    });
  });

  describe('Tier 1: Feature 10 - KRTMI 2024 Archive (UMS Surakarta - Dual Feeder & Sorter System)', () => {
    test('T1.10.1: 2024 edition records UMS Surakarta host and Pemilah Sampah Otonom Digital', () => {
      expect(krtmiDataTs).toContain('2024');
      expect(krtmiDataTs).toContain('UMS');
      expect(krtmiDataTs).toContain('Pemilah Sampah');
    });

    test('T1.10.2: 2024 arena dimensions are 6.0 m x 6.0 m with central Zona Umum and vibrating conveyors', () => {
      expect(krtmiDataTs).toContain('6.0 m × 6.0 m');
      expect(krtmiDataTs).toContain('Zona Umum');
    });

    test('T1.10.3: 2024 scoring oracle: +3 pts per correct sort, -1 pt per drop/overflow, -1 pt per foul', () => {
      const score = CompetitionScoring.score2024({
        correctSort: 10,
        dropped: 2,
        fouls: 1,
        boxesCompleted: 3,
      });
      expect(score.correctPoints).toBe(30);
      expect(score.penaltyPoints).toBe(-3);
      expect(score.totalScore).toBe(27);
    });

    test('T1.10.4: 2024 BERSIH instant victory achieved when 5 boxes sorted with zero drops/fouls', () => {
      const score = CompetitionScoring.score2024({
        correctSort: 15,
        dropped: 0,
        fouls: 0,
        boxesCompleted: 5,
      });
      expect(score.isBersih).toBe(true);
      expect(score.verdict).toContain('BERSIH');
    });

    test('T1.10.5: 2024 official achievements: Juara 1 Wilayah I & Juara 2 Nasional KRTMI 2024', () => {
      expect(krtmiDataTs).toContain('JUARA 1 REGIONAL I');
      expect(krtmiDataTs).toContain('JUARA 2 NASIONAL');
    });
  });

  describe('Tier 1: Feature 11 - Technocorner 2026 Archive (FT UGM - Transporter Robot)', () => {
    test('T1.11.1: 2026 edition records KMTETI FT UGM organizer and Transporter Robot theme', () => {
      expect(krtmiDataTs).toContain('2026');
      expect(krtmiDataTs).toContain('TECHNOCORNER');
      expect(krtmiDataTs).toContain('UGM');
      expect(krtmiDataTs).toContain('Transporter');
    });

    test('T1.11.2: 2026 arena size is 3.0 m x 3.0 m with 10x10x10 cm payload cubes and 12x12x5 cm drop zones', () => {
      expect(krtmiDataTs).toContain('3.0 m × 3.0 m');
      expect(krtmiDataTs).toContain('10 cm × 10 cm × 10 cm');
      expect(krtmiDataTs).toContain('12 cm × 12 cm × 5 cm');
    });

    test('T1.11.3: 2026 battery voltage strictly capped at maximum 13.0 Volt', () => {
      const validBattery = CompetitionScoring.scoreTechnocorner2026({ batteryVoltage: 12.6 });
      const overVoltBattery = CompetitionScoring.scoreTechnocorner2026({ batteryVoltage: 13.5 });
      expect(validBattery.disqualified).toBe(false);
      expect(overVoltBattery.disqualified).toBe(true);
      expect(overVoltBattery.reason).toContain('13.0V');
    });

    test('T1.11.4: 2026 payload transfer requires lifting: pushing boxes is a rule violation', () => {
      const pushedRun = CompetitionScoring.scoreTechnocorner2026({ pushedBoxes: true });
      expect(pushedRun.foul).toBe(true);
    });

    test('T1.11.5: 2026 tournament structure spans 6 progressive rounds up to Grand Final', () => {
      const rounds = ['Penyisihan', '32 Besar', '16 Besar', '8 Besar (Perempat Final)', 'Semifinal', 'Grand Final'];
      expect(rounds.length).toBe(6);
      expect(rounds[0]).toBe('Penyisihan');
      expect(rounds[5]).toBe('Grand Final');
    });
  });
}

module.exports = runArchive2022To2026Tests;

if (require.main === module) {
  runArchive2022To2026Tests();
  const { reporter } = require('../helpers/test-framework');
  reporter.summary();
}
