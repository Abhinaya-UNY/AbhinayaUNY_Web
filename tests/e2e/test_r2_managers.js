/**
 * E2E Test Suite — Feature 3: All-Era Managers Showcase (2020–2025) (ORIGINAL_REQUEST §R2)
 * Validates complete historical team managers across 2020-2025, co-management eras, operational specializations, and emerald theme styling.
 */

const fs = require('fs');
const path = require('path');
const { describe, test, expect } = require('../helpers/test-framework');

const PROJECT_ROOT = path.resolve(__dirname, '../..');
const CATALOG_PATH = path.join(PROJECT_ROOT, 'scripts/full_catalog_with_renaming.json');
const TEAM_DATA_PATH = path.join(PROJECT_ROOT, 'data/teamData.ts');
const ROSTER_COMPONENT_PATH = path.join(PROJECT_ROOT, 'components/TeamRosterSection.tsx');

function runR2ManagersTests() {
  describe('Tier 1 - Feature 3: All-Era Managers Showcase (2020–2025) (R2)', () => {
    
    test('R2M-01: Manager era coverage across all 6 years (2020-2025)', () => {
      const catalog = JSON.parse(fs.readFileSync(CATALOG_PATH, 'utf8'));
      const managerItems = catalog.filter(x => x.division === 'manager' || (x.role && x.role.toLowerCase().includes('manager')));

      expect(managerItems.length).toBeGreaterThanOrEqual(6);

      const managerYears = [...new Set(managerItems.map(x => x.year))].sort();
      expect(managerYears).toContain(2020);
      expect(managerYears).toContain(2021);
      expect(managerYears).toContain(2022);
      expect(managerYears).toContain(2023);
      expect(managerYears).toContain(2024);
      expect(managerYears).toContain(2025);
    });

    test('R2M-02: Authentic manager identity verification across historical eras', () => {
      const catalog = JSON.parse(fs.readFileSync(CATALOG_PATH, 'utf8'));
      const names = catalog
        .filter(x => x.member_name)
        .map(x => x.member_name.toLowerCase());

      // 2020-2021: Yuli Dwi Saputri
      expect(names.some(n => n.includes('yuli dwi saputri'))).toBe(true);
      // 2022-2024: Mustika Wahyu Aprilia
      expect(names.some(n => n.includes('mustika wahyu aprilia'))).toBe(true);
      // 2024-2025: Rose Pita Nur Afifah
      expect(names.some(n => n.includes('rose pita'))).toBe(true);
      // 2025: Zelfa Nafisah Zalna
      expect(names.some(n => n.includes('zelfa'))).toBe(true);
    });

    test('R2M-03: Dual / Co-Management representation in multi-manager eras', () => {
      const catalog = JSON.parse(fs.readFileSync(CATALOG_PATH, 'utf8'));
      
      // Era 2024: Mustika Wahyu Aprilia & Rose Pita Nur Afifah
      const managers2024 = catalog.filter(x => x.year === 2024 && x.division === 'manager' && x.member_name);
      const names2024 = managers2024.map(x => x.member_name.toLowerCase());
      expect(names2024.some(n => n.includes('mustika'))).toBe(true);
      expect(names2024.some(n => n.includes('rose pita'))).toBe(true);

      // Era 2025: Rose Pita & Zelfa Nafisah Zalna
      const managers2025 = catalog.filter(x => x.year === 2025 && x.division === 'manager' && x.member_name);
      const names2025 = managers2025.map(x => x.member_name.toLowerCase());
      expect(names2025.some(n => n.includes('rose pita') || n.includes('zelfa'))).toBe(true);
    });

    test('R2M-04: Manager operational responsibilities & specializations cataloging', () => {
      const teamDataContent = fs.readFileSync(TEAM_DATA_PATH, 'utf8');

      // Check management responsibilities
      expect(teamDataContent).toContain('Manager');
      expect(teamDataContent).toContain('Mustika Wahyu Aprilia');
      expect(teamDataContent).toContain('Rose Pita Nur Afifah');
      expect(teamDataContent).toContain('Administrasi');
    });

    test('R2M-05: Dedicated emerald/teal theme styling for Managers Showcase', () => {
      const teamDataContent = fs.readFileSync(TEAM_DATA_PATH, 'utf8');
      const rosterContent = fs.readFileSync(ROSTER_COMPONENT_PATH, 'utf8');

      // Check DIVISION_BADGES for Manager emerald accent
      expect(teamDataContent).toContain("'Manager'");
      expect(teamDataContent).toContain('#10B981'); // Emerald accent
      expect(teamDataContent).toContain('text-emerald-300');

      // Check Roster component uses briefcase icon
      expect(rosterContent).toContain('Briefcase');
      expect(rosterContent).toContain('Manager');
    });

    test('R2M-06: Manager academic study programs and badge consistency', () => {
      const teamDataContent = fs.readFileSync(TEAM_DATA_PATH, 'utf8');

      // Mustika: S1 Fisika (FMIPA)
      expect(teamDataContent).toContain('Fisika');
      // Rose Pita: S1 Pendidikan Teknik Mekatronika (FT)
      expect(teamDataContent).toContain('Mekatronika');
    });

  });
}

module.exports = runR2ManagersTests;
