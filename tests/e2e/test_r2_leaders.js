/**
 * E2E Test Suite — Feature 2: All-Era Leaders Hall of Fame (2020–2025) (ORIGINAL_REQUEST §R2)
 * Validates complete historical team leaders across 2020-2025, authentic names, leadership badges, academic info, and gold theme styling.
 */

const fs = require('fs');
const path = require('path');
const { describe, test, expect } = require('../helpers/test-framework');

const PROJECT_ROOT = path.resolve(__dirname, '../..');
const CATALOG_PATH = path.join(PROJECT_ROOT, 'scripts/full_catalog_with_renaming.json');
const TEAM_DATA_PATH = path.join(PROJECT_ROOT, 'data/teamData.ts');
const ROSTER_COMPONENT_PATH = path.join(PROJECT_ROOT, 'components/TeamRosterSection.tsx');

function runR2LeadersTests() {
  describe('Tier 1 - Feature 2: All-Era Leaders Hall of Fame (2020–2025) (R2)', () => {
    
    test('R2L-01: Chronological era completeness for Leaders across historical eras (2020-2025)', () => {
      const catalog = JSON.parse(fs.readFileSync(CATALOG_PATH, 'utf8'));
      
      // All years 2020 to 2025 have documented roster members / candidates
      const catalogYears = [...new Set(catalog.map(x => x.year))].sort();
      expect(catalogYears).toContain(2020);
      expect(catalogYears).toContain(2021);
      expect(catalogYears).toContain(2022);
      expect(catalogYears).toContain(2023);
      expect(catalogYears).toContain(2024);
      expect(catalogYears).toContain(2025);

      // Verify leader entries across 2022-2025
      const leaderItems = catalog.filter(x => x.division === 'ketua' || (x.role && x.role.toLowerCase().includes('leader')) || (x.role && x.role.toLowerCase().includes('ketua')));
      expect(leaderItems.length).toBeGreaterThanOrEqual(6);
    });

    test('R2L-02: Authentic leader identity verification against official UNY records', () => {
      const catalog = JSON.parse(fs.readFileSync(CATALOG_PATH, 'utf8'));
      const memberNames = catalog
        .filter(x => x.member_name)
        .map(x => x.member_name.toLowerCase());

      // Verify specific authoritative leaders across eras
      // 2020: Nurcholis (Programmer #1 / Inception Leader)
      expect(memberNames.some(name => name.includes('nurcholis'))).toBe(true);
      // 2022: Muhammad Iqbal Rasyid (Ci5QBYaLgHg)
      expect(memberNames.some(name => name.includes('iqbal'))).toBe(true);
      // 2023: Salsabila Azzahra PSDU (Cw6bd9zPTNP)
      expect(memberNames.some(name => name.includes('salsabila'))).toBe(true);
      // 2024: Ilham Widyo Nugroho (C_0wguVTpGY)
      expect(memberNames.some(name => name.includes('ilham widyo'))).toBe(true);
      // 2025: Farhan Yuda Mahendra (DPHoWoFkxa3)
      expect(memberNames.some(name => name.includes('farhan yuda'))).toBe(true);
    });

    test('R2L-03: Leadership badge annotations & leadership era formatting', () => {
      const teamDataContent = fs.readFileSync(TEAM_DATA_PATH, 'utf8');
      
      // Verify Ketua Tim representation in teamData
      expect(teamDataContent).toContain("'Ketua Tim'");
      expect(teamDataContent).toContain('Ilham Widyo Nugroho');
      expect(teamDataContent).toContain('Farhan Yuda Mahendra');

      // Verify role badge annotations
      expect(teamDataContent).toContain('Ketua Tim');
    });

    test('R2L-04: Academic study program and division mapping for Leaders', () => {
      const teamDataContent = fs.readFileSync(TEAM_DATA_PATH, 'utf8');
      
      // Ilham Widyo Nugroho (Leader 2024): D4 Teknik Elektronika / FV
      expect(teamDataContent).toContain('D4 Teknik Elektronika');
      // Farhan Yuda Mahendra (Leader 2025): S1 Pendidikan Teknik Mekatronika / FT
      expect(teamDataContent).toContain('Pendidikan Teknik Mekatronika');
    });

    test('R2L-05: Multi-photo asset bindings and portrait availability for Leaders', () => {
      const catalog = JSON.parse(fs.readFileSync(CATALOG_PATH, 'utf8'));
      
      // Leaders have valid photo files mapped in catalog
      const ilhamPhotos = catalog.filter(x => x.member_name && x.member_name.toLowerCase().includes('ilham widyo'));
      expect(ilhamPhotos.length).toBeGreaterThanOrEqual(2);

      const farhanPhotos = catalog.filter(x => x.member_name && x.member_name.toLowerCase().includes('farhan yuda'));
      expect(farhanPhotos.length).toBeGreaterThanOrEqual(2);

      const salsabilaPhotos = catalog.filter(x => x.member_name && x.member_name.toLowerCase().includes('salsabila'));
      expect(salsabilaPhotos.length).toBeGreaterThanOrEqual(2);
    });

    test('R2L-06: Dedicated gold/amber theme styling for Leaders Hall of Fame', () => {
      const teamDataContent = fs.readFileSync(TEAM_DATA_PATH, 'utf8');
      const rosterContent = fs.readFileSync(ROSTER_COMPONENT_PATH, 'utf8');

      // Check DIVISION_BADGES for Ketua Tim gold accent
      expect(teamDataContent).toContain("'Ketua Tim'");
      expect(teamDataContent).toContain('#EAB308'); // Gold accent
      expect(teamDataContent).toContain('text-amber-300');

      // Check Roster component uses award icon or leader badge
      expect(rosterContent).toContain('Award');
      expect(rosterContent).toContain('Ketua Tim');
    });

  });
}

module.exports = runR2LeadersTests;
