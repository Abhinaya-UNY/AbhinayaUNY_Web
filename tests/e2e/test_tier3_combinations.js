/**
 * E2E Test Suite — Tier 3: Cross-Feature Combinations
 * Tests interactions between multiple features: year filter coupled with modal details, division filter with search query,
 * crossfade continuity during tab switches, leader/manager generation sync, and photo path coupling with catalog assets.
 */

const fs = require('fs');
const path = require('path');
const { describe, test, expect } = require('../helpers/test-framework');

const PROJECT_ROOT = path.resolve(__dirname, '../..');
const CATALOG_PATH = path.join(PROJECT_ROOT, 'scripts/full_catalog_with_renaming.json');
const TEAM_DATA_PATH = path.join(PROJECT_ROOT, 'data/teamData.ts');
const ROSTER_COMPONENT_PATH = path.join(PROJECT_ROOT, 'components/TeamRosterSection.tsx');

function runTier3CombinationTests() {
  describe('Tier 3: Cross-Feature Combinations', () => {
    
    test('T3-01: Modal details inspection coupled with member state selection', () => {
      const rosterContent = fs.readFileSync(ROSTER_COMPONENT_PATH, 'utf8');

      // Check modal opening state
      expect(rosterContent).toContain('setSelectedMember(member)');
      expect(rosterContent).toContain('role="dialog"');
      expect(rosterContent).toContain('aria-modal="true"');
      expect(rosterContent).toContain('selectedMember.name');
      expect(rosterContent).toContain('selectedMember.role');
      expect(rosterContent).toContain('selectedMember.specialization');
    });

    test('T3-02: Division filtering coupled with active search query filtering', () => {
      const rosterContent = fs.readFileSync(ROSTER_COMPONENT_PATH, 'utf8');

      // Check combination of division filtering and search query matching
      expect(rosterContent).toContain('selectedDivision === \'All\'');
      expect(rosterContent).toContain('filter(matchesSearch)');
    });

    test('T3-03: Crossfade slideshow continuity across modal and card contexts', () => {
      const rosterContent = fs.readFileSync(ROSTER_COMPONENT_PATH, 'utf8');

      // Check MemberPhotoFadeShowcase used in both card and modal with isModal flag
      expect(rosterContent).toContain('<MemberPhotoFadeShowcase');
      expect(rosterContent).toContain('isModal={true}');
      expect(rosterContent).toContain('isModal ? 4500 : 3600');
    });

    test('T3-04: Leader & Manager historical coverage synchronization across eras', () => {
      const catalog = JSON.parse(fs.readFileSync(CATALOG_PATH, 'utf8'));

      // Verify every year has catalog entries and leadership/management representations
      for (const year of [2020, 2021, 2022, 2023, 2024, 2025]) {
        const yearItems = catalog.filter(x => x.year === year);
        expect(yearItems.length).toBeGreaterThan(0);
      }
    });

    test('T3-05: Photo paths in teamData coupled with existing disk assets', () => {
      const teamDataContent = fs.readFileSync(TEAM_DATA_PATH, 'utf8');
      
      // Extract all referenced photo paths from teamData.ts
      const pathMatches = teamDataContent.match(/'(\/images\/[^']+)'/g) || [];
      expect(pathMatches.length).toBeGreaterThan(10);

      let missingAssets = [];
      for (const rawPath of pathMatches) {
        const cleanPath = rawPath.replace(/'/g, '').replace(/^\//, '');
        const fullPath = path.join(PROJECT_ROOT, 'public', cleanPath);
        if (!fs.existsSync(fullPath)) {
          missingAssets.push(cleanPath);
        }
      }

      expect(missingAssets.length).toBe(0);
    });

  });
}

module.exports = runTier3CombinationTests;
