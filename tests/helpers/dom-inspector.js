/**
 * Codebase & DOM Inspector Helper for E2E Tests
 * Abhinaya UNY Robotics Platform
 */

const fs = require('fs');
const path = require('path');

const PROJECT_ROOT = path.resolve(__dirname, '../../');

class DomInspector {
  static getProjectRoot() {
    return PROJECT_ROOT;
  }

  static readFile(relativePath) {
    const fullPath = path.isAbsolute(relativePath) ? relativePath : path.join(PROJECT_ROOT, relativePath);
    if (!fs.existsSync(fullPath)) {
      throw new Error(`File not found: ${fullPath}`);
    }
    return fs.readFileSync(fullPath, 'utf8');
  }

  static fileExists(relativePath) {
    const fullPath = path.isAbsolute(relativePath) ? relativePath : path.join(PROJECT_ROOT, relativePath);
    return fs.existsSync(fullPath);
  }

  static listFiles(dirPath, extensionFilter = null) {
    const fullDir = path.isAbsolute(dirPath) ? dirPath : path.join(PROJECT_ROOT, dirPath);
    if (!fs.existsSync(fullDir)) return [];

    let results = [];
    const entries = fs.readdirSync(fullDir, { withFileTypes: true });

    for (const entry of entries) {
      const entryPath = path.join(fullDir, entry.name);
      if (entry.isDirectory()) {
        if (entry.name !== 'node_modules' && entry.name !== '.next' && entry.name !== '.git') {
          results = results.concat(DomInspector.listFiles(entryPath, extensionFilter));
        }
      } else {
        if (!extensionFilter || entry.name.endsWith(extensionFilter)) {
          results.push(entryPath);
        }
      }
    }
    return results;
  }

  /**
   * Safely loads and parses typed data store data/krtmiData.ts into a JavaScript Object Array
   */
  static getKrtmiEditions() {
    const tsContent = DomInspector.readFile('data/krtmiData.ts');
    // Extract array definition after "export const KRTMI_EDITIONS: KrtmiEdition[] ="
    const arrayMatch = tsContent.match(/export\s+const\s+KRTMI_EDITIONS[^=]*=\s*(\[[\s\S]*?\]);/);
    if (arrayMatch && arrayMatch[1]) {
      const cleanJson = arrayMatch[1]
        .replace(/(\w+):/g, '"$1":') // quote unquoted keys
        .replace(/'/g, '"')          // replace single quotes with double quotes
        .replace(/,\s*([\]}])/g, '$1'); // remove trailing commas
      try {
        return JSON.parse(cleanJson);
      } catch (e) {
        // fallback to Function evaluation
        const fn = new Function(`return ${arrayMatch[1]};`);
        return fn();
      }
    }
    throw new Error('Could not parse KRTMI_EDITIONS from data/krtmiData.ts');
  }

  /**
   * Scans all application source files (.ts, .tsx, .js, .jsx, .css, .md) to ensure
   * 100% Team Data Integrity (Zero individual student names/profiles).
   */
  static scanForIndividualStudentNames() {
    const forbiddenPatterns = [
      /\bTri\s+Wahyu\b/i,
      /\bNIM\b/i,
      /\b22518241023\b/,
      /\bKetua\s+Tim\s*:\s*[A-Z][a-z]+/i,
      /\bAnggota\s+Tim\s*:\s*[A-Z][a-z]+/i,
      /\bProfil\s+Mahasiswa\b/i,
      /\bBiodata\s+Mahasiswa\b/i,
    ];

    const sourceDirs = ['app', 'components', 'data'];
    const matches = [];

    for (const dir of sourceDirs) {
      const files = DomInspector.listFiles(dir);
      for (const file of files) {
        const content = fs.readFileSync(file, 'utf8');
        for (const pattern of forbiddenPatterns) {
          if (pattern.test(content)) {
            matches.push({
              file: path.relative(PROJECT_ROOT, file),
              pattern: pattern.toString(),
            });
          }
        }
      }
    }

    return {
      hasViolations: matches.length > 0,
      violations: matches,
      scannedFilesCount: sourceDirs.reduce((acc, dir) => acc + DomInspector.listFiles(dir).length, 0),
    };
  }

  /**
   * Validates official external links across all components
   */
  static verifyOfficialLinks() {
    const expectedLinks = {
      youtubeEmbed: '3yr5uNkxA_8',
      instagram: 'https://www.instagram.com/abhinaya.uny/',
      tiktok: 'https://www.tiktok.com/@abhinaya.uny',
      github: 'https://github.com/Abhinaya-UNY/AbhinayaUNY_Web',
      unyPress1: 'https://www.uny.ac.id/index.php/id/berita/robot-abhinaya-uny-sabet-juara-pertama-kontes-robot-tematik-indonesia',
      unyPress2: 'http://www.uny.ac.id/index.php/id/berita/abhinaya-raih-juara-1-di-konteks-robot-tematik-indonesia-wilayah-i-tahun-2024',
      unyPress3: 'https://www.uny.ac.id/index.php/id/berita/abhinaya-meraih-juara-2-nasional-di-kompetisi-kri-divisi-krtmi-2024',
    };

    const files = DomInspector.listFiles('app').concat(DomInspector.listFiles('components'));
    const allContent = files.map(f => fs.readFileSync(f, 'utf8')).join('\n');

    return {
      youtubeFound: allContent.includes(expectedLinks.youtubeEmbed) || allContent.includes('3yr5uNkxA_8'),
      instagramFound: allContent.includes(expectedLinks.instagram) || allContent.includes('instagram.com/abhinaya.uny'),
      tiktokFound: allContent.includes(expectedLinks.tiktok) || allContent.includes('tiktok.com/@abhinaya.uny'),
      githubFound: allContent.includes(expectedLinks.github) || allContent.includes('github.com/Abhinaya-UNY'),
    };
  }
}

module.exports = DomInspector;
