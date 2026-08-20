/**
 * Tier 4: Real-World Scenarios - User Journey 1: Landing, Telemetry & Social Channels
 */

const { describe, test, it, expect } = require('../helpers/test-framework');
const DomInspector = require('../helpers/dom-inspector');

function runUserJourneyLandingTests() {
  const homePage = DomInspector.readFile('app/page.tsx');
  const heroSection = DomInspector.readFile('components/HeroSection.tsx');
  const navbarTsx = DomInspector.readFile('components/Navbar.tsx');
  const footerTsx = DomInspector.readFile('components/Footer.tsx');
  const kriOverview = DomInspector.readFile('components/KRIOverview.tsx');

  describe('Tier 4: Scenario 1 - Visitor Lands on Homepage, Explores Telemetry & Social Hub', () => {
    test('T4.1.1: Visitor lands on root URL and homepage mounts core overview sections', () => {
      expect(homePage).toContain('<HeroSection');
      expect(homePage).toContain('<HistoryTimeline');
      expect(homePage).toContain('<KRIOverview');
      expect(homePage).toContain('<RobotTechSpecs');
      expect(homePage).toContain('<Achievements');
    });

    test('T4.1.2: Hero section greets visitor with official team branding and championship highlight badge', () => {
      expect(heroSection).toContain('TIM ROBOTIKA');
      expect(heroSection).toContain('ABHINAYA UNY');
      expect(heroSection).toContain('JUARA 1 WILAYAH I &amp; JUARA 2 NASIONAL KRTMI 2024');
    });

    test('T4.1.3: Hero section presents quick navigation CTAs to explore KRTMI archive and Technical Specs', () => {
      expect(heroSection).toContain('/krtmi');
      expect(heroSection).toContain('/teknis');
      expect(heroSection).toContain('Jelajahi Arsip');
      expect(heroSection).toContain('Laboratorium Kinematika');
    });

    test('T4.1.4: KRI Overview highlights KRTMI division as Abhinaya UNY specialized research division', () => {
      expect(kriOverview).toContain('Kontes Robot Tematik Indonesia');
      expect(kriOverview).toContain('Fokus Tim Abhinaya');
      expect(kriOverview).toContain('KRAI');
      expect(kriOverview).toContain('KRSTI');
      expect(kriOverview).toContain('KRSBI');
    });

    test('T4.1.5: Navbar sticky HUD allows instant jump to all top-level sections', () => {
      expect(navbarTsx).toContain("href: '/'");
      expect(navbarTsx).toContain("href: '/krtmi'");
      expect(navbarTsx).toContain("href: '/teknis'");
      expect(navbarTsx).toContain("href: '/prestasi'");
    });

    test('T4.1.6: Footer presents institutional affiliation links (UNY, Puspresnas Kemdikbudristek, FT UNY)', () => {
      expect(footerTsx).toContain('Universitas Negeri Yogyakarta');
      expect(footerTsx).toContain('Puspresnas / BPTI Kemdikbudristek');
      expect(footerTsx).toContain('Fakultas Teknik UNY');
      expect(footerTsx).toContain('Tim Robotika Abhinaya UNY');
    });
  });
}

module.exports = runUserJourneyLandingTests;

if (require.main === module) {
  runUserJourneyLandingTests();
  const { reporter } = require('../helpers/test-framework');
  reporter.summary();
}
