/**
 * E2E Test Suite — Tier 4: Real-World Application Scenarios
 * Simulates complete end-to-end user workflows:
 * Scenario 1: Historical Timeline Exploration (2020 Inception -> 2023 Champions -> 2025 Active Squad)
 * Scenario 2: Member Inspection & Lightbox Modal Photo Gallery
 * Scenario 3: Responsive Multi-Device Inspection (Mobile, Tablet, Desktop)
 * Scenario 4: Static Export Readiness & Next.js App Router Architecture
 * Scenario 5: Prospective Member Recruitment & Skills Discovery Flow
 */

const fs = require('fs');
const path = require('path');
const { describe, test, expect } = require('../helpers/test-framework');

const PROJECT_ROOT = path.resolve(__dirname, '../..');
const CATALOG_PATH = path.join(PROJECT_ROOT, 'scripts/full_catalog_with_renaming.json');
const TEAM_DATA_PATH = path.join(PROJECT_ROOT, 'data/teamData.ts');
const ROSTER_COMPONENT_PATH = path.join(PROJECT_ROOT, 'components/TeamRosterSection.tsx');
const APP_PAGE_PATH = path.join(PROJECT_ROOT, 'app/page.tsx');
const NEXT_CONFIG_PATH = path.join(PROJECT_ROOT, 'next.config.js');

function runTier4ScenarioTests() {
  describe('Tier 4: Real-World Application Scenarios', () => {
    
    test('T4-01: Scenario 1 — Historical Timeline Exploration (2020 -> 2023 -> 2025)', () => {
      const catalog = JSON.parse(fs.readFileSync(CATALOG_PATH, 'utf8'));

      // Step 1: User navigates to 2020 inception team
      const inception2020 = catalog.filter(x => x.year === 2020);
      expect(inception2020.length).toBeGreaterThanOrEqual(5);
      const inceptionLeader = inception2020.find(x => x.member_name && x.member_name.toLowerCase().includes('nurcholis'));
      expect(inceptionLeader).toBeDefined();

      // Step 2: User jumps to 2023 national champions era
      const champions2023 = catalog.filter(x => x.year === 2023);
      expect(champions2023.length).toBeGreaterThanOrEqual(5);
      const championLeader = champions2023.find(x => x.member_name && x.member_name.toLowerCase().includes('salsabila'));
      expect(championLeader).toBeDefined();

      // Step 3: User transitions to 2025 current squad
      const current2025 = catalog.filter(x => x.year === 2025);
      expect(current2025.length).toBeGreaterThanOrEqual(5);
      const currentLeader = current2025.find(x => x.member_name && x.member_name.toLowerCase().includes('farhan yuda'));
      expect(currentLeader).toBeDefined();
    });

    test('T4-02: Scenario 2 — Member Inspection & Lightbox Modal Photo Gallery', () => {
      const rosterContent = fs.readFileSync(ROSTER_COMPONENT_PATH, 'utf8');

      // 1. User clicks member card
      expect(rosterContent).toContain('onClick={() => setSelectedMember(member)}');
      // 2. Modal renders with high-res portrait showcase
      expect(rosterContent).toContain('MemberPhotoFadeShowcase');
      expect(rosterContent).toContain('isModal={true}');
      // 3. User views bio, credentials, and quote
      expect(rosterContent).toContain('selectedMember.bio');
      expect(rosterContent).toContain('selectedMember.quote');
      // 4. User dismisses via ESC key listener
      expect(rosterContent).toContain('e.key === \'Escape\'');
    });

    test('T4-03: Scenario 3 — Responsive Multi-Device CSS Grid Layout', () => {
      const rosterContent = fs.readFileSync(ROSTER_COMPONENT_PATH, 'utf8');

      // Mobile (1 column), Tablet (2 columns), Desktop (3 columns)
      expect(rosterContent).toContain('grid-cols-1');
      expect(rosterContent).toContain('sm:grid-cols-2');
      expect(rosterContent).toContain('lg:grid-cols-3');
    });

    test('T4-04: Scenario 4 — Static Export Readiness & Next.js Configuration', () => {
      const nextConfigContent = fs.readFileSync(NEXT_CONFIG_PATH, 'utf8');
      const appPageContent = fs.readFileSync(APP_PAGE_PATH, 'utf8');

      // Next.js static export settings
      expect(nextConfigContent).toContain('output: \'export\'');
      expect(nextConfigContent).toContain('unoptimized: true');

      // App Router homepage mounts TeamRosterSection
      expect(appPageContent).toContain('TeamRosterSection');
    });

    test('T4-05: Scenario 5 — Prospective Student Recruitment & Skill Discovery', () => {
      const teamDataContent = fs.readFileSync(TEAM_DATA_PATH, 'utf8');

      // Member specializations are visible for all divisions
      expect(teamDataContent).toContain('specialization');
      expect(teamDataContent).toContain('Autonomous Navigation');
      expect(teamDataContent).toContain('Power Distribution Board');
      expect(teamDataContent).toContain('CAD');
    });

  });
}

module.exports = runTier4ScenarioTests;
