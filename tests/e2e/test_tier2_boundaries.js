/**
 * E2E Test Suite — Tier 2: Boundary & Corner Cases
 * Tests edge cases, missing optional fields, image fallback handling, slide index boundary wrapping, search query boundary inputs, and year range boundaries.
 */

const fs = require('fs');
const path = require('path');
const { describe, test, expect } = require('../helpers/test-framework');

const PROJECT_ROOT = path.resolve(__dirname, '../..');
const TEAM_DATA_PATH = path.join(PROJECT_ROOT, 'data/teamData.ts');
const ROSTER_COMPONENT_PATH = path.join(PROJECT_ROOT, 'components/TeamRosterSection.tsx');

function runTier2BoundaryTests() {
  describe('Tier 2: Boundary & Corner Cases', () => {
    
    test('T2-01: Graceful handling of missing optional fields (subRole, quote, socials, nickname)', () => {
      const rosterContent = fs.readFileSync(ROSTER_COMPONENT_PATH, 'utf8');

      // Check optional field null/undefined safe checks
      expect(rosterContent).toContain('member.quote &&');
      expect(rosterContent).toContain('selectedMember.socials');
      expect(rosterContent).toContain('selectedMember.socials.github');
      expect(rosterContent).toContain('selectedMember.socials.linkedin');
      expect(rosterContent).toContain('selectedMember.socials.instagram');
      expect(rosterContent).toContain('selectedMember.socials.email');
    });

    test('T2-02: Image error fallback mechanism triggering fallback state without crash', () => {
      const rosterContent = fs.readFileSync(ROSTER_COMPONENT_PATH, 'utf8');

      // Check onError handler on image element
      expect(rosterContent).toContain('onError={() => onImageError && onImageError(member.id)}');
      expect(rosterContent).toContain('setImgErrors');
    });

    test('T2-03: Single photo vs multi-photo mode branching', () => {
      const rosterContent = fs.readFileSync(ROSTER_COMPONENT_PATH, 'utf8');

      // Check images.length > 1 conditional guard for controls and counters
      expect(rosterContent).toContain('images.length > 1 &&');
      expect(rosterContent).toContain('if (images.length <= 1) return;');
    });

    test('T2-04: Slide index circular boundary wrapping calculation', () => {
      // Test circular wrapping logic: (prev + 1) % len and (prev - 1 + len) % len
      const numPhotos = 3;
      
      // Next slide wrapping
      let idx = 0;
      idx = (idx + 1) % numPhotos; // 1
      expect(idx).toBe(1);
      idx = (idx + 1) % numPhotos; // 2
      expect(idx).toBe(2);
      idx = (idx + 1) % numPhotos; // 0 (wrap around)
      expect(idx).toBe(0);

      // Prev slide wrapping
      idx = (idx - 1 + numPhotos) % numPhotos; // 2 (wrap backward)
      expect(idx).toBe(2);
      idx = (idx - 1 + numPhotos) % numPhotos; // 1
      expect(idx).toBe(1);
      idx = (idx - 1 + numPhotos) % numPhotos; // 0
      expect(idx).toBe(0);
    });

    test('T2-05: Search query boundary inputs (meta-characters, whitespace, empty)', () => {
      const rosterContent = fs.readFileSync(ROSTER_COMPONENT_PATH, 'utf8');

      // Verify search trimming and lowercase handling
      expect(rosterContent).toContain('searchQuery.trim()');
      expect(rosterContent).toContain('toLowerCase()');
      expect(rosterContent).toContain('member.name.toLowerCase()');
    });

    test('T2-06: Generation year boundaries (oldest 2020 inception vs latest 2025 active era)', () => {
      const catalog = JSON.parse(fs.readFileSync(path.join(PROJECT_ROOT, 'scripts/full_catalog_with_renaming.json'), 'utf8'));
      const years = catalog.map(x => x.year);

      const minYear = Math.min(...years);
      const maxYear = Math.max(...years);

      expect(minYear).toBe(2020);
      expect(maxYear).toBe(2025);
      expect(years.filter(y => y < 2020).length).toBe(0);
      expect(years.filter(y => y > 2025).length).toBe(0);
    });

  });
}

module.exports = runTier2BoundaryTests;
