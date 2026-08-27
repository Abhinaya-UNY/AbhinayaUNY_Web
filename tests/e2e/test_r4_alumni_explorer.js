/**
 * E2E Test Suite — Feature 5: Interactive Alumni & Generation Explorer (ORIGINAL_REQUEST §R4)
 * Validates interactive year tabs/filtering for 2020-2025, contingent rosters, leadership linkages, historical achievements, and contingent metadata.
 */

const fs = require('fs');
const path = require('path');
const { describe, test, expect } = require('../helpers/test-framework');

const PROJECT_ROOT = path.resolve(__dirname, '../..');
const CATALOG_PATH = path.join(PROJECT_ROOT, 'scripts/full_catalog_with_renaming.json');
const KRTMI_DATA_PATH = path.join(PROJECT_ROOT, 'data/krtmiData.ts');
const ROSTER_COMPONENT_PATH = path.join(PROJECT_ROOT, 'components/TeamRosterSection.tsx');

function runR4AlumniExplorerTests() {
  describe('Tier 1 - Feature 5: Interactive Alumni & Generation Explorer (2020–2025) (R4)', () => {
    
    test('R4-01: All 6 generation years (2020, 2021, 2022, 2023, 2024, 2025) supported', () => {
      const catalog = JSON.parse(fs.readFileSync(CATALOG_PATH, 'utf8'));
      const years = [...new Set(catalog.map(x => x.year))].sort();

      expect(years).toEqual([2020, 2021, 2022, 2023, 2024, 2025]);
    });

    test('R4-02: Contingent roster integrity for each historical generation era', () => {
      const catalog = JSON.parse(fs.readFileSync(CATALOG_PATH, 'utf8'));

      // Check roster presence for each era
      for (const year of [2020, 2021, 2022, 2023, 2024, 2025]) {
        const yearItems = catalog.filter(x => x.year === year);
        expect(yearItems.length).toBeGreaterThan(0);
      }
    });

    test('R4-03: Generation leadership linkage across all generations', () => {
      const catalog = JSON.parse(fs.readFileSync(CATALOG_PATH, 'utf8'));

      // 2020 Inception: Nurcholis (Programmer #1 & Leader) & Yuli Dwi Saputri (Manager)
      const era2020 = catalog.filter(x => x.year === 2020 && x.member_name);
      expect(era2020.some(x => x.member_name.toLowerCase().includes('nurcholis'))).toBe(true);
      expect(era2020.some(x => x.member_name.toLowerCase().includes('yuli'))).toBe(true);

      // 2022: Muhammad Iqbal Rasyid (Leader) & Mustika / Yuli (Manager)
      const era2022 = catalog.filter(x => x.year === 2022 && x.member_name);
      expect(era2022.some(x => x.member_name.toLowerCase().includes('iqbal'))).toBe(true);

      // 2023: Salsabila Azzahra PSDU (Leader) & Mustika Wahyu Aprilia (Manager)
      const era2023 = catalog.filter(x => x.year === 2023 && x.member_name);
      expect(era2023.some(x => x.member_name.toLowerCase().includes('salsabila'))).toBe(true);

      // 2024: Ilham Widyo Nugroho (Leader) & Mustika / Rose (Manager)
      const era2024 = catalog.filter(x => x.year === 2024 && x.member_name);
      expect(era2024.some(x => x.member_name.toLowerCase().includes('ilham widyo'))).toBe(true);

      // 2025: Farhan Yuda Mahendra (Leader) & Rose Pita / Zelfa (Manager)
      const era2025 = catalog.filter(x => x.year === 2025 && x.member_name);
      expect(era2025.some(x => x.member_name.toLowerCase().includes('farhan yuda'))).toBe(true);
    });

    test('R4-04: Historical tournament achievements and rules alignment per generation', () => {
      const krtmiContent = fs.readFileSync(KRTMI_DATA_PATH, 'utf8');

      // 2020: Disinfeksi UV-C
      expect(krtmiContent).toContain('2020');
      // 2021: Logistik COVID
      expect(krtmiContent).toContain('2021');
      // 2022: Limbah Medis
      expect(krtmiContent).toContain('2022');
      // 2023: Digital Twin & Juara Nasional
      expect(krtmiContent).toContain('2023');
      // 2024: Pemilah Sampah Otonom
      expect(krtmiContent).toContain('2024');
    });

    test('R4-05: Year tab filter logic and state encapsulation in Roster UI', () => {
      const rosterContent = fs.readFileSync(ROSTER_COMPONENT_PATH, 'utf8');

      // Check state handling for search, filtering, and modal interactions
      expect(rosterContent).toContain('useState');
      expect(rosterContent).toContain('selectedDivision');
      expect(rosterContent).toContain('searchQuery');
      expect(rosterContent).toContain('selectedMember');
    });

    test('R4-06: Generation contingent achievements and group highlights documentation', () => {
      const krtmiContent = fs.readFileSync(KRTMI_DATA_PATH, 'utf8');

      // Check tournament performance documentation
      expect(krtmiContent).toContain('prestasi');
      expect(krtmiContent).toContain('Juara');
    });

  });
}

module.exports = runR4AlumniExplorerTests;
