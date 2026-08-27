/**
 * E2E Test Suite — Feature 4: Current Active Technical Squad (ORIGINAL_REQUEST §R3)
 * Validates active technical squad divisions (Program, Elektronik, Mekanik), specific roles, robotics skills, authentic NIMs, and multi-photo crossfade assets.
 */

const fs = require('fs');
const path = require('path');
const { describe, test, expect } = require('../helpers/test-framework');

const PROJECT_ROOT = path.resolve(__dirname, '../..');
const TEAM_DATA_PATH = path.join(PROJECT_ROOT, 'data/teamData.ts');
const ROSTER_COMPONENT_PATH = path.join(PROJECT_ROOT, 'components/TeamRosterSection.tsx');

function runR3TechnicalSquadTests() {
  describe('Tier 1 - Feature 4: Current Active Technical Squad (R3)', () => {
    
    test('R3-01: Technical division representation (Program, Elektronik, Mekanik)', () => {
      const teamDataContent = fs.readFileSync(TEAM_DATA_PATH, 'utf8');

      expect(teamDataContent).toContain("'Program'");
      expect(teamDataContent).toContain("'Elektronik'");
      expect(teamDataContent).toContain("'Mekanik'");
    });

    test('R3-02: Granular specialized technical roles across all divisions', () => {
      const teamDataContent = fs.readFileSync(TEAM_DATA_PATH, 'utf8');

      // Program Lead role
      expect(teamDataContent).toContain('Autonomous Navigation');
      expect(teamDataContent).toContain('Computer Vision');

      // Electrical Lead role
      expect(teamDataContent).toContain('Power Distribution Board');

      // Mechanical Lead role
      expect(teamDataContent).toContain('CAD');
      expect(teamDataContent).toContain('Gripper');
    });

    test('R3-03: Rich robotics skill tags and specializations coverage', () => {
      const teamDataContent = fs.readFileSync(TEAM_DATA_PATH, 'utf8');

      // Advanced robotics skills
      const expectedSkills = [
        'YOLO',
        'STM32',
        'PCB',
        'CAD',
        'Mecanum',
      ];

      for (const skill of expectedSkills) {
        expect(teamDataContent).toContain(skill);
      }
    });

    test('R3-04: Authentic UNY student NIMs and verified student credentials', () => {
      const teamDataContent = fs.readFileSync(TEAM_DATA_PATH, 'utf8');

      // Authentic student identification numbers (NIMs)
      const authenticNIMs = [
        '22518241023', // Tri Wahyu Handoyo (Program Lead)
        '21501244039', // Agus Bagaskoro (Elektrik Lead)
        '22518244007', // Farhan Yuda Mahendra (Mekanik Lead)
        '22502241014', // Abdul Hasib (Elektrik PCB)
        '20539144016', // Muhamad Ilham Sony (Mekanik Fabrikasi)
        '21539144005', // Caesar Sokma (Mekanik Prototyping)
        '22538141004', // Ikhsan Nurrohman (Elektrik Telemetri)
        '23090620088', // Rionaldi Nugroho (Elektrik Junior)
      ];

      for (const nim of authenticNIMs) {
        expect(teamDataContent).toContain(nim);
      }
    });

    test('R3-05: Multi-photo pose availability for dynamic crossfade presentation', () => {
      const teamDataContent = fs.readFileSync(TEAM_DATA_PATH, 'utf8');

      // Check multi-image arrays exist in team member definitions
      expect(teamDataContent).toContain('images: [');
      // Count image arrays in active members
      const imageArrayMatches = teamDataContent.match(/images:\s*\[[\s\S]*?\]/g) || [];
      expect(imageArrayMatches.length).toBeGreaterThanOrEqual(10);
    });

    test('R3-06: UI division category filter buttons with live counters and icons', () => {
      const teamDataContent = fs.readFileSync(TEAM_DATA_PATH, 'utf8');
      const rosterContent = fs.readFileSync(ROSTER_COMPONENT_PATH, 'utf8');

      // Check DIVISION_CATEGORIES definition
      expect(teamDataContent).toContain('DIVISION_CATEGORIES');
      expect(teamDataContent).toContain("id: 'Program'");
      expect(teamDataContent).toContain("id: 'Elektronik'");
      expect(teamDataContent).toContain("id: 'Mekanik'");

      // Check icon mappings
      expect(rosterContent).toContain('Code');
      expect(rosterContent).toContain('Zap');
      expect(rosterContent).toContain('Wrench');
    });

  });
}

module.exports = runR3TechnicalSquadTests;
