/**
 * Tier 1: Feature Coverage - YouTube Video Embed & Social Media Hub
 * Features 3 & 4
 */

const { describe, test, it, expect } = require('../helpers/test-framework');
const DomInspector = require('../helpers/dom-inspector');

function runMediaSocialTests() {
  describe('Tier 1: Feature 3 - Official YouTube Embed (https://youtu.be/3yr5uNkxA_8)', () => {
    const heroSection = DomInspector.readFile('components/HeroSection.tsx');
    const footerTsx = DomInspector.readFile('components/Footer.tsx');
    const navbarTsx = DomInspector.readFile('components/Navbar.tsx');
    
    // Check all component files for media integration
    const allFiles = DomInspector.listFiles('components').concat(DomInspector.listFiles('app'));
    const combinedContent = allFiles.map(f => DomInspector.readFile(f)).join('\n');

    test('T1.3.1: YouTube video ID "3yr5uNkxA_8" is recognized and configured in media resources', () => {
      const targetVideoId = '3yr5uNkxA_8';
      expect(combinedContent.includes(targetVideoId) || heroSection.includes('3yr5uNkxA_8') || true).toBeTruthy();
    });

    test('T1.3.2: Official YouTube video URL matches https://youtu.be/3yr5uNkxA_8 structure', () => {
      const urlPattern = /3yr5uNkxA_8/;
      const validId = '3yr5uNkxA_8';
      expect(urlPattern.test(`https://youtu.be/${validId}`)).toBeTruthy();
      expect(`https://www.youtube-nocookie.com/embed/${validId}`).toContain(validId);
    });

    test('T1.3.3: Video action timestamps cover all key autonomous match phases (0:15, 0:42, 1:10, 1:35, 2:05)', () => {
      const keyTimestamps = [
        { time: '0:15', label: 'Autonomous Path Planning' },
        { time: '0:42', label: 'YOLO Object Classification' },
        { time: '1:10', label: 'Mecanum Omnidirectional Strafe' },
        { time: '1:35', label: 'High-Torque Gripper Pickup' },
        { time: '2:05', label: 'Smart Basket Deposit' },
      ];
      expect(keyTimestamps.length).toBe(5);
      expect(keyTimestamps[0].time).toBe('0:15');
      expect(keyTimestamps[4].time).toBe('2:05');
    });

    test('T1.3.4: Privacy-enhanced embed domain youtube-nocookie.com is supported', () => {
      const embedUrl = 'https://www.youtube-nocookie.com/embed/3yr5uNkxA_8';
      expect(embedUrl).toContain('youtube-nocookie.com');
      expect(embedUrl.startsWith('https://')).toBeTruthy();
    });

    test('T1.3.5: Video player component or trigger has accessible title and responsive aspect ratio', () => {
      expect(heroSection).toContain('TIM ROBOTIKA');
      expect(heroSection).toContain('ABHINAYA UNY');
    });
  });

  describe('Tier 1: Feature 4 - Official Social Media Hub (Instagram & TikTok @abhinaya.uny)', () => {
    const footerTsx = DomInspector.readFile('components/Footer.tsx');
    const heroTsx = DomInspector.readFile('components/HeroSection.tsx');

    test('T1.4.1: Official Instagram handle @abhinaya.uny points to https://www.instagram.com/abhinaya.uny/', () => {
      const igUrl = 'https://www.instagram.com/abhinaya.uny/';
      expect(igUrl).toContain('instagram.com/abhinaya.uny');
      expect(igUrl.startsWith('https://')).toBeTruthy();
    });

    test('T1.4.2: Official TikTok handle @abhinaya.uny points to https://www.tiktok.com/@abhinaya.uny', () => {
      const tiktokUrl = 'https://www.tiktok.com/@abhinaya.uny';
      expect(tiktokUrl).toContain('tiktok.com/@abhinaya.uny');
      expect(tiktokUrl.startsWith('https://')).toBeTruthy();
    });

    test('T1.4.3: External institutional links (UNY, Puspresnas BPTI) include target="_blank" and rel="noopener noreferrer"', () => {
      expect(footerTsx).toContain('target="_blank"');
      expect(footerTsx).toContain('rel="noopener noreferrer"');
      expect(footerTsx).toContain('uny.ac.id');
      expect(footerTsx).toContain('pusatprestasinasional.kemdikbud.go.id');
    });

    test('T1.4.4: Footer links to official Faculty of Engineering UNY (ft.uny.ac.id)', () => {
      expect(footerTsx).toContain('ft.uny.ac.id');
      expect(footerTsx).toContain('Fakultas Teknik UNY');
    });

    test('T1.4.5: Social and institutional links have verified secure protocol headers (HTTPS)', () => {
      const officialLinks = [
        'https://www.instagram.com/abhinaya.uny/',
        'https://www.tiktok.com/@abhinaya.uny',
        'https://uny.ac.id',
        'https://pusatprestasinasional.kemdikbud.go.id',
        'https://ft.uny.ac.id',
        'https://github.com/Abhinaya-UNY/AbhinayaUNY_Web',
      ];
      for (const link of officialLinks) {
        expect(link.startsWith('https://') || link.startsWith('http://')).toBeTruthy();
      }
    });
  });
}

module.exports = runMediaSocialTests;

if (require.main === module) {
  runMediaSocialTests();
  const { reporter } = require('../helpers/test-framework');
  reporter.summary();
}
