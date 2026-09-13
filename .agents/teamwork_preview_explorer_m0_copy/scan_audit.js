const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '../..');
const scanDirs = ['components', 'app', 'data', 'public'];

const emDashRegex = /\u2014/;
// Regex to catch unicode emojis (excluding standard punctuation and basic symbols)
// Common emoji ranges
const emojiRegex = /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/;

// Specific AI slop phrases to detect
const aiSlopPhrases = [
  'delve', 'testament', 'tapestry', 'revolutionize', 'groundbreaking',
  'cutting-edge', 'spearhead', 'beacon', 'realm', 'multifaceted',
  'pinnacle', 'leverage', 'seamless', 'game-changer', 'game changer',
  'furthermore', 'moreover', 'in conclusion', 'it is important to note',
  'paramount', 'holistic', 'fostering', 'dynamic interplay',
  'unwavering commitment', 'testament to'
];

const results = {
  emDashes: [],
  emojis: [],
  aiSlop: [],
  emeraldGreen: []
};

function scanFile(filePath) {
  const relPath = path.relative(rootDir, filePath).replace(/\\/g, '/');
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split(/\r?\n/);

  lines.forEach((line, idx) => {
    const lineNum = idx + 1;
    const trimmed = line.trim();

    // Em Dash Check
    if (emDashRegex.test(line)) {
      results.emDashes.push({
        file: relPath,
        line: lineNum,
        content: trimmed
      });
    }

    // Emoji Check (only for UI copy files, skip binary/assets/docs if desired, but check tsx/ts)
    // Avoid false positives on copyright/registered symbols if needed, let's detect specific high-surrogate emojis
    const strictEmojiRegex = /([\uD800-\uDBFF][\uDC00-\uDFFF]|[\u2600-\u27BF])/;
    if (strictEmojiRegex.test(line)) {
      results.emojis.push({
        file: relPath,
        line: lineNum,
        content: trimmed
      });
    }

    // AI slop check (case-insensitive)
    const lower = line.toLowerCase();
    for (const phrase of aiSlopPhrases) {
      if (lower.includes(phrase)) {
        // filter out comments or node_modules if any
        results.aiSlop.push({
          phrase,
          file: relPath,
          line: lineNum,
          content: trimmed
        });
      }
    }

    // Emerald Green check
    // #10B981, #059669, emerald-, #34D399, etc.
    const emeraldPattern = /#10B981|#059669|#34D399|#047857|#065F46|#064E3B|#6EE7B7|#A7F3D0|emerald-/i;
    if (emeraldPattern.test(line)) {
      results.emeraldGreen.push({
        file: relPath,
        line: lineNum,
        content: trimmed
      });
    }
  });
}

function traverse(dir) {
  const fullDir = path.join(rootDir, dir);
  if (!fs.existsSync(fullDir)) return;
  const entries = fs.readdirSync(fullDir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(fullDir, entry.name);
    if (entry.isDirectory()) {
      if (!['node_modules', '.next', '.git'].includes(entry.name)) {
        traverse(path.relative(rootDir, fullPath));
      }
    } else if (/\.(tsx|ts|js|jsx|json|css)$/.test(entry.name)) {
      scanFile(fullPath);
    }
  }
}

for (const d of scanDirs) {
  traverse(d);
}

// Also scan tailwind.config.ts and app/globals.css
if (fs.existsSync(path.join(rootDir, 'tailwind.config.ts'))) {
  scanFile(path.join(rootDir, 'tailwind.config.ts'));
}

console.log(`TOTAL EM DASHES FOUND: ${results.emDashes.length}`);
console.log(`TOTAL EMOJIS FOUND: ${results.emojis.length}`);
console.log(`TOTAL AI SLOP FOUND: ${results.aiSlop.length}`);
console.log(`TOTAL EMERALD GREEN FOUND: ${results.emeraldGreen.length}`);

fs.writeFileSync(
  path.join(__dirname, 'audit_raw_results.json'),
  JSON.stringify(results, null, 2),
  'utf8'
);
console.log('Saved raw audit results to audit_raw_results.json');
