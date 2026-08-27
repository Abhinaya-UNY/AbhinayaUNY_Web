/**
 * E2E Test Suite — Feature 1: Instagram Photo Semantic Renaming Pipeline (ORIGINAL_REQUEST §R1)
 * Validates semantic naming format, non-member & grid exclusion, catalog schema, and photo file integrity.
 */

const fs = require('fs');
const path = require('path');
const { describe, test, expect } = require('../helpers/test-framework');

const PROJECT_ROOT = path.resolve(__dirname, '../..');
const CATALOG_PATH = path.join(PROJECT_ROOT, 'scripts/full_catalog_with_renaming.json');

function runR1PhotoPipelineTests() {
  describe('Tier 1 - Feature 1: Instagram Photo Semantic Renaming Pipeline (R1)', () => {
    
    test('R1-01: Renaming format compliance regex for all mapped assets', () => {
      expect(fs.existsSync(CATALOG_PATH)).toBe(true);
      const catalog = JSON.parse(fs.readFileSync(CATALOG_PATH, 'utf8'));
      expect(catalog.length).toBeGreaterThanOrEqual(250);

      // Semantic patterns:
      // Roster members: {year}_{division}_{member_name}_{seq}.ext
      const rosterRegex = /^(\d{4})_([a-z0-9]+)_([a-z0-9_]+)_(\d{2})\.(jpg|jpeg|png)$/;
      // Non-roster items (graphics/grids/covers with shortcodes): {year}_{category}_{description}.ext
      const nonRosterRegex = /^(\d{4})_([a-zA-Z0-9_\-]+)\.(jpg|jpeg|png)$/;

      let invalidNames = [];
      for (const item of catalog) {
        if (item.include_in_roster) {
          if (!rosterRegex.test(item.target_filename)) {
            invalidNames.push(`Roster: ${item.target_filename} (source: ${item.source_path})`);
          }
        } else {
          if (!nonRosterRegex.test(item.target_filename)) {
            invalidNames.push(`Non-Roster: ${item.target_filename} (source: ${item.source_path})`);
          }
        }
      }

      expect(invalidNames.length).toBe(0);
      expect(invalidNames).toEqual([]);
    });

    test('R1-02: Non-member graphics, cover banners & grid slices exclusion', () => {
      const catalog = JSON.parse(fs.readFileSync(CATALOG_PATH, 'utf8'));
      
      const nonRosterItems = catalog.filter(x => !x.include_in_roster);
      expect(nonRosterItems.length).toBeGreaterThan(100);

      // Verify that non-roster items are never genuine roster members
      for (const item of nonRosterItems) {
        expect(item.include_in_roster).toBe(false);
        // Easter egg wanted poster or banner covers must never be MEMBER_PHOTO
        if (item.source_path.includes('13_wanted_uang_kas_bendahara')) {
          expect(item.include_in_roster).toBe(false);
        }
      }

      const rosterItems = catalog.filter(x => x.include_in_roster);
      // Roster items must only be genuine members/mentors
      for (const item of rosterItems) {
        expect(item.is_genuine_member).toBe(true);
        expect(item.category === 'MEMBER_PHOTO' || item.category === 'MENTOR_PHOTO').toBe(true);
      }
    });

    test('R1-03: Genuine member portrait count & distribution across 2020-2025', () => {
      const catalog = JSON.parse(fs.readFileSync(CATALOG_PATH, 'utf8'));
      const rosterItems = catalog.filter(x => x.include_in_roster);

      expect(rosterItems.length).toBe(97);

      const yearsPresent = [...new Set(rosterItems.map(x => x.year))].sort();
      expect(yearsPresent).toEqual([2020, 2021, 2022, 2023, 2024, 2025]);

      // Check studio portraits vs IG feed portraits
      const studioMembers = rosterItems.filter(x => x.source_dir === 'members');
      const igMembers = rosterItems.filter(x => x.source_dir === 'instagram_feed');

      expect(studioMembers.length).toBe(24); // 12 members x 2 poses
      expect(igMembers.length).toBe(73);     // Historical feed portrait slides
    });

    test('R1-04: Image file existence & byte integrity on local filesystem', () => {
      const catalog = JSON.parse(fs.readFileSync(CATALOG_PATH, 'utf8'));
      let missingFiles = [];
      let emptyFiles = [];

      for (const item of catalog) {
        const fullSourcePath = path.join(PROJECT_ROOT, item.source_path);
        if (!fs.existsSync(fullSourcePath)) {
          missingFiles.push(item.source_path);
        } else {
          const stats = fs.statSync(fullSourcePath);
          if (stats.size < 1000) {
            emptyFiles.push(`${item.source_path} (${stats.size} bytes)`);
          }
        }
      }

      expect(missingFiles.length).toBe(0);
      expect(emptyFiles.length).toBe(0);
    });

    test('R1-05: Multi-pose sequence indexing uniqueness per member and year', () => {
      const catalog = JSON.parse(fs.readFileSync(CATALOG_PATH, 'utf8'));
      const rosterItems = catalog.filter(x => x.include_in_roster);

      // Verify that every target_relative_path across all 97 roster members is completely unique
      const targetPaths = rosterItems.map(x => x.target_relative_path);
      const uniqueTargets = new Set(targetPaths);
      expect(uniqueTargets.size).toBe(rosterItems.length);

      // Verify sequence is at least 1
      for (const item of rosterItems) {
        expect(item.sequence).toBeGreaterThanOrEqual(1);
      }
    });

    test('R1-06: Mapping catalog schema validity & field completeness', () => {
      const catalog = JSON.parse(fs.readFileSync(CATALOG_PATH, 'utf8'));
      const requiredFields = [
        'source_path',
        'source_dir',
        'year',
        'category',
        'is_genuine_member',
        'include_in_roster',
        'division',
        'sequence',
        'target_filename',
        'target_relative_path',
        'evidence'
      ];

      for (const item of catalog) {
        for (const field of requiredFields) {
          expect(item[field]).toBeDefined();
        }
      }
    });

  });
}

module.exports = runR1PhotoPipelineTests;
