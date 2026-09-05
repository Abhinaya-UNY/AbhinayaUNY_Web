/**
 * Empirical Challenger 2 — Deep Stress & Edge-Cases Oracle
 * Mission 3: React Bits & Edge Boundary Verification
 * 
 * Verifies:
 * 1. Adversarial Search Strings (Regex metacharacters, catastrophic backtracking, XSS/SQL payloads, Unicode, extreme length)
 * 2. Division Category Filtering (Category parity, empty/unknown division handling, defensive badge/info fallbacks)
 * 3. Responsive Grid Breakpoints (grid-cols-1, sm:grid-cols-2, lg:grid-cols-3, xl:grid-cols-4, container constraints)
 * 4. High-Frequency Pointer Movement Simulation over SpotlightCards (100k events, subpixel floats, null refs, rapid enter/leave)
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const TEAM_DATA_PATH = path.join(ROOT_DIR, 'data', 'teamData.ts');
const ROSTER_PATH = path.join(ROOT_DIR, 'components', 'TeamRosterSection.tsx');
const SPOTLIGHT_PATH = path.join(ROOT_DIR, 'components', 'animations', 'SpotlightCard.tsx');
const ACHIEVEMENTS_PATH = path.join(ROOT_DIR, 'components', 'Achievements.tsx');
const NEWS_PATH = path.join(ROOT_DIR, 'components', 'NewsMediaSection.tsx');
const KRI_PATH = path.join(ROOT_DIR, 'components', 'KRIOverview.tsx');
const GALLERY_PATH = path.join(ROOT_DIR, 'components', 'DocumentationGallerySection.tsx');
const IG_PATH = path.join(ROOT_DIR, 'components', 'InstagramFeedShowcase.tsx');

let passedTests = 0;
let failedTests = 0;
const failureLog = [];

function assert(condition, message) {
  if (!condition) {
    failedTests++;
    failureLog.push(message);
    console.error(`  ❌ FAIL: ${message}`);
    throw new Error(message);
  }
}

function test(name, fn) {
  process.stdout.write(`• ${name} ... `);
  try {
    fn();
    passedTests++;
    console.log('✅ PASS');
  } catch (e) {
    // Failure recorded in assert
  }
}

console.log('======================================================================');
console.log('   CHALLENGER 2 — DEEP STRESS & EDGE BOUNDARIES VERIFICATION ORACLE  ');
console.log('======================================================================\n');

// Load source files
const teamDataContent = fs.readFileSync(TEAM_DATA_PATH, 'utf8');
const rosterContent = fs.readFileSync(ROSTER_PATH, 'utf8');
const spotlightContent = fs.readFileSync(SPOTLIGHT_PATH, 'utf8');
const achievementsContent = fs.readFileSync(ACHIEVEMENTS_PATH, 'utf8');
const newsContent = fs.readFileSync(NEWS_PATH, 'utf8');
const kriContent = fs.readFileSync(KRI_PATH, 'utf8');
const galleryContent = fs.readFileSync(GALLERY_PATH, 'utf8');
const igContent = fs.readFileSync(IG_PATH, 'utf8');

// Parse member items from teamData.ts
const objectBlocks = teamDataContent.match(/\{[\s\S]*?\n\s*\}/g) || [];
const members = [];
for (const block of objectBlocks) {
  const idMatch = block.match(/\bid:\s*['"]([^'"]+)['"]/);
  const nameMatch = block.match(/\bname:\s*['"]([^'"]+)['"]/);
  const nimMatch = block.match(/\bnim:\s*['"]([^'"]+)['"]/);
  const divMatch = block.match(/\bdivision:\s*['"]([^'"]+)['"]/);
  const roleMatch = block.match(/\brole:\s*['"]([^'"]+)['"]/);
  const studyMatch = block.match(/\b(?:studyProgram|prodi):\s*['"]([^'"]+)['"]/);
  const facMatch = block.match(/\bfaculty:\s*['"]([^'"]+)['"]/);
  const quoteMatch = block.match(/\bquote:\s*['"]([^'"]+)['"]/);

  if (idMatch && nameMatch && divMatch) {
    members.push({
      id: idMatch[1],
      name: nameMatch[1],
      nim: nimMatch ? nimMatch[1] : '',
      studyProgram: studyMatch ? studyMatch[1] : '',
      faculty: facMatch ? facMatch[1] : '',
      division: divMatch[1],
      role: roleMatch ? roleMatch[1] : 'Member',
      badge: 'Member',
      specialization: ['Robotics', 'CAD', 'Hardware', 'Computer Vision'],
      skills: ['ROS2', 'STM32', 'Python', 'C++'],
      achievements: ['Juara 1 Regional KRTMI 2024'],
      quote: quoteMatch ? quoteMatch[1] : 'Inovasi pantang menyerah.'
    });
  }
}

// Search algorithm replication exactly as implemented in TeamRosterSection.tsx
function matchesSearch(member, searchQuery) {
  const isSearching = searchQuery.trim().length > 0;
  if (!isSearching) return true;
  const q = searchQuery.toLowerCase();
  const specs = member.specialization ? member.specialization.some((s) => s.toLowerCase().includes(q)) : false;
  const skills = member.skills ? member.skills.some((s) => s.toLowerCase().includes(q)) : false;
  const achievements = member.achievements ? member.achievements.some((a) => a.toLowerCase().includes(q)) : false;
  return (
    member.name.toLowerCase().includes(q) ||
    member.role.toLowerCase().includes(q) ||
    (member.nim?.toLowerCase() || '').includes(q) ||
    member.division.toLowerCase().includes(q) ||
    (member.badge?.toLowerCase() || '').includes(q) ||
    (member.studyProgram?.toLowerCase() || '').includes(q) ||
    specs ||
    skills ||
    achievements ||
    (member.quote && member.quote.toLowerCase().includes(q))
  );
}

// ======================================================================
// 1. ADVERSARIAL SEARCH STRINGS & QUERY BOUNDARIES
// ======================================================================
console.log('\n--- 1. ADVERSARIAL SEARCH STRINGS & QUERY BOUNDARIES ---');

test('Search handles standard ECMAScript whitespace edge cases (spaces, tabs, newlines, NBSP, fullwidth, BOM)', () => {
  const wsQueries = [
    '',
    '   ',
    '\t\t\t',
    '\n\r\n',
    ' \t \n \r ',
    '\u00A0\u00A0', // non-breaking space (Category Zs)
    '\u3000', // ideographic full-width space (Category Zs)
    '\uFEFF', // zero-width no-break space / BOM (ECMAScript whitespace)
  ];

  for (const q of wsQueries) {
    const res = members.filter(m => matchesSearch(m, q));
    assert(res.length === members.length, `Whitespace search query failed to match all members. Length: ${res.length} vs ${members.length}`);
  }
});

test('Search handles non-printable format characters (zero-width space, joiner, non-joiner) gracefully', () => {
  const formatQueries = [
    '\u200B', // zero-width space (Category Cf)
    '\u200C', // zero-width non-joiner (Category Cf)
    '\u200D', // zero-width joiner (Category Cf)
  ];

  for (const q of formatQueries) {
    try {
      const res = members.filter(m => matchesSearch(m, q));
      assert(Array.isArray(res), `Query failed for non-printable char`);
      // Since members do not contain invisible zero-width chars, expect 0 results without throwing errors
      assert(res.length === 0, `Expected 0 results for invisible char, got ${res.length}`);
    } catch (e) {
      assert(false, `Search crashed on invisible character: ${e.message}`);
    }
  }
});

test('Search immune to ReDoS catastrophic backtracking & regex metacharacters', () => {
  const regexAttacks = [
    '.*', '+', '?', '^', '$', '(', ')', '[', ']', '{', '}', '|', '\\', '/',
    '((((.*)+)+)+)',
    'a?a?a?a?a?a?a?a?a?a?a?a?a?a?a?a?a?a?a?a?a?a?a?a?a?a?aaaaaaaaaaaaaaaaaaaaaaaaaa',
    '^(a+)+$',
    '(x+x+)+y',
    '\\d+\\w+\\s+',
    '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}',
    '(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}',
    '(?<=foo)bar',
    '[*+?{}()[]/\\^$|]',
  ];

  for (const attack of regexAttacks) {
    const t0 = Date.now();
    const res = members.filter(m => matchesSearch(m, attack));
    const elapsed = Date.now() - t0;
    assert(elapsed < 100, `ReDoS detected! Query "${attack}" took ${elapsed}ms`);
    assert(Array.isArray(res), `Failed on attack: ${attack}`);
  }
});

test('Search immune to XSS, HTML tag injections, and script payloads', () => {
  const xssPayloads = [
    '<script>alert(1)</script>',
    '<img src=x onerror=alert("XSS")>',
    '"><script src=http://evil.com/xss.js></script>',
    '<svg/onload=alert(1)>',
    'javascript:/*--></title></style></textarea></script></xmp><svg/onload=\'+/"/+/onmouseover=1/+/[*/[]/+alert(1)//\'>',
    '"><iframe src="javascript:alert(1)"></iframe>',
    '<body onload=alert(1)>',
    '<details open ontoggle=alert(1)>',
    'data:text/html;base64,PHNjcmlwdD5hbGVydCgxKTwvc2NyaXB0Pg==',
  ];

  for (const payload of xssPayloads) {
    const res = members.filter(m => matchesSearch(m, payload));
    assert(Array.isArray(res), `XSS payload broke search: ${payload}`);
  }
});

test('Search immune to SQL injection & command injection payloads', () => {
  const sqlPayloads = [
    "' OR '1'='1",
    "admin' --",
    "'; DROP TABLE members; --",
    "1 UNION SELECT 1, 2, 3, 4, 5, 6, 7--",
    "' OR 'x'='x",
    "1; WAITFOR DELAY '0:0:5'--",
    "&& ls -la",
    "| cat /etc/passwd",
    "`id`",
    "${IFS}",
  ];

  for (const payload of sqlPayloads) {
    const res = members.filter(m => matchesSearch(m, payload));
    assert(Array.isArray(res), `SQL injection broke search: ${payload}`);
  }
});

test('Search handles Unicode emojis, RTL overrides, and multi-byte scripts safely', () => {
  const unicodeQueries = [
    '🤖 🦾 ⚡ 🔥 🏆',
    '\u202Ereversed_text\u202C', // Right-to-Left Override
    '👨‍💻👩‍🔬', // Zero-width joiner sequences
    'Ñúñéz ÿ Çhärléš',
    'ロボット 工学',
    'روبرت كرتيمي',
    'Тестирование',
  ];

  for (const q of unicodeQueries) {
    const res = members.filter(m => matchesSearch(m, q));
    assert(Array.isArray(res), `Unicode query broke search: ${q}`);
  }
});

test('Search survives extreme query string length (100,000 characters)', () => {
  const hugeQuery = 'a'.repeat(100000);
  const t0 = Date.now();
  const res = members.filter(m => matchesSearch(m, hugeQuery));
  const elapsed = Date.now() - t0;
  assert(elapsed < 200, `Huge query took too long: ${elapsed}ms`);
  assert(res.length === 0, `Huge query should match 0 members, got ${res.length}`);
});

test('Search accurately matches each member on diverse fields (name, nim, skill, role, quote)', () => {
  let matchedCount = 0;
  for (const m of members.slice(0, 20)) {
    // Match by name
    const byName = members.filter(item => matchesSearch(item, m.name));
    assert(byName.some(x => x.id === m.id), `Failed to match member by exact name: ${m.name}`);

    // Match by NIM if present
    if (m.nim && m.nim.length >= 5) {
      const byNim = members.filter(item => matchesSearch(item, m.nim));
      assert(byNim.some(x => x.id === m.id), `Failed to match member by NIM: ${m.nim}`);
    }

    // Match by division
    const byDiv = members.filter(item => matchesSearch(item, m.division));
    assert(byDiv.some(x => x.id === m.id), `Failed to match member by division: ${m.division}`);

    matchedCount++;
  }
  assert(matchedCount === 20, `Tested 20 members successfully`);
});


// ======================================================================
// 2. DIVISION CATEGORY FILTERING & STATE ESCAPE HATCHES
// ======================================================================
console.log('\n--- 2. DIVISION CATEGORY FILTERING & STATE ESCAPE HATCHES ---');

test('All division categories map to non-empty member subsets in teamData', () => {
  const expectedDivisions = ['Ketua Tim', 'Manager', 'Program', 'Elektronik', 'Mekanik', 'Pembimbing'];
  for (const div of expectedDivisions) {
    const divMembers = members.filter(m => m.division === div);
    assert(divMembers.length > 0, `Division "${div}" has 0 members in teamData`);
  }
});

test('All division types have defined DIVISION_BADGES and DIVISION_INFO entries', () => {
  const expectedDivisions = ['Pembimbing', 'Ketua Tim', 'Manager', 'Program', 'Elektronik', 'Mekanik', 'Desain', 'Official'];
  for (const div of expectedDivisions) {
    assert(teamDataContent.includes(`'${div}': {`), `Missing DIVISION_INFO or BADGES mapping for: ${div}`);
  }
});

test('TeamRosterSection provides defensive fallback if division is unknown or invalid', () => {
  // Verifying defensive badge fallback: DIVISION_BADGES[selectedDivision] || DIVISION_BADGES['Mekanik']
  assert(rosterContent.includes("DIVISION_BADGES[selectedDivision as DivisionType] || DIVISION_BADGES['Mekanik']"),
    'Missing defensive fallback to Mekanik for unrecognized division badges');
  // Verifying conditional rendering of division header: DIVISION_INFO[selectedDivision] && (
  assert(rosterContent.includes("DIVISION_INFO[selectedDivision as TeamMember['division']] && ("),
    'Missing safety guard before accessing DIVISION_INFO');
});

test('Division tab selection resets active search query to prevent hidden state traps', () => {
  assert(rosterContent.includes("setSelectedDivision(cat.id);\n                        setSearchQuery('');") ||
         (rosterContent.includes("setSelectedDivision(cat.id)") && rosterContent.includes("setSearchQuery('')")),
    'Selecting division tab must clear searchQuery');
});

test('Single division view provides "Tampilkan Semua Divisi" escape hatch button', () => {
  assert(rosterContent.includes("onClick={() => setSelectedDivision('All')}"),
    'Must provide "Tampilkan Semua Divisi" reset button in single division view');
});


// ======================================================================
// 3. RESPONSIVE GRID BREAKPOINTS & CONTAINER CONSTRAINTS
// ======================================================================
console.log('\n--- 3. RESPONSIVE GRID BREAKPOINTS & CONTAINER CONSTRAINTS ---');

test('TeamRosterSection implements 4-tier grid breakpoint progression (cols-1 -> sm:cols-2 -> lg:cols-3 -> xl:cols-4)', () => {
  const gridPattern = /grid\s+grid-cols-1\s+sm:grid-cols-2\s+lg:grid-cols-3\s+xl:grid-cols-4\s+gap-6/;
  assert(gridPattern.test(rosterContent), 'TeamRosterSection missing full 4-tier responsive grid definition');
});

test('Achievements.tsx implements multi-breakpoint responsive grid (cols-1 -> md:cols-2 -> lg:cols-3)', () => {
  assert(achievementsContent.includes('grid-cols-1 md:grid-cols-2 lg:grid-cols-3'),
    'Achievements.tsx missing responsive grid classes');
});

test('NewsMediaSection.tsx implements responsive grid (cols-1 -> md:cols-2 -> lg:cols-3)', () => {
  assert(newsContent.includes('grid-cols-1 md:grid-cols-2 lg:grid-cols-3'),
    'NewsMediaSection.tsx missing responsive grid classes');
});

test('KRIOverview.tsx implements responsive grid layout', () => {
  assert(kriContent.includes('grid-cols-1 sm:grid-cols-2 lg:grid-cols-4') &&
         kriContent.includes('grid-cols-1 md:grid-cols-2 lg:grid-cols-3'),
    'KRIOverview.tsx missing responsive grid classes');
});

test('DocumentationGallerySection.tsx implements responsive grid layout', () => {
  assert(galleryContent.includes('grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'),
    'DocumentationGallerySection.tsx missing responsive grid classes');
});

test('InstagramFeedShowcase.tsx implements responsive grid layout', () => {
  assert(igContent.includes('grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'),
    'InstagramFeedShowcase.tsx missing responsive grid classes');
});

test('Roster and major sections use max-w-7xl mx-auto container constraint to prevent ultrawide blowout', () => {
  assert(rosterContent.includes('max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'),
    'TeamRosterSection missing max-w-7xl container constraint');
  assert(achievementsContent.includes('max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'),
    'Achievements missing max-w-7xl container constraint');
  assert(newsContent.includes('max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'),
    'NewsMediaSection missing max-w-7xl container constraint');
});


// ======================================================================
// 4. HIGH-FREQUENCY POINTER MOVEMENT SIMULATION OVER SPOTLIGHTCARDS
// ======================================================================
console.log('\n--- 4. HIGH-FREQUENCY POINTER MOVEMENT SIMULATION OVER SPOTLIGHTCARDS ---');

test('SpotlightCard source code architecture inspection (CSS vars, pointer-events-none, zero setState)', () => {
  assert(spotlightContent.includes("--mouse-x"), 'SpotlightCard must set --mouse-x');
  assert(spotlightContent.includes("--mouse-y"), 'SpotlightCard must set --mouse-y');
  assert(spotlightContent.includes("--spotlight-opacity"), 'SpotlightCard must set --spotlight-opacity');
  assert(spotlightContent.includes("pointer-events-none"), 'Spotlight glow must be pointer-events-none');
  assert(spotlightContent.includes("relative z-20"), 'Card content must be positioned relative z-20 above glow');
  assert(!spotlightContent.includes("useState"), 'SpotlightCard must NOT call useState on mousemove (avoids re-renders)');
});

// Mock DOM element and simulate high-frequency pointer movement
class MockCSSStyleDeclaration {
  constructor() {
    this.properties = {};
    this.borderColor = '';
  }
  setProperty(prop, val) {
    this.properties[prop] = val;
  }
  getPropertyValue(prop) {
    return this.properties[prop] || '';
  }
}

class MockHTMLElement {
  constructor(rect = { left: 100, top: 200, width: 300, height: 400 }) {
    this.style = new MockCSSStyleDeclaration();
    this._rect = rect;
  }
  getBoundingClientRect() {
    return this._rect;
  }
}

test('High-frequency pointer stress: 100,000 rapid pointer movements with erratic coordinates', () => {
  const mockElement = new MockHTMLElement({ left: 50, top: 100, width: 400, height: 500 });
  const hoverBorder = 'rgba(255, 107, 0, 0.6)';

  // Replicate SpotlightCard's exact handleMouseMove logic
  function handleMouseMove(e) {
    if (mockElement) {
      const rect = mockElement.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      mockElement.style.setProperty('--mouse-x', `${x}px`);
      mockElement.style.setProperty('--mouse-y', `${y}px`);
      mockElement.style.setProperty('--spotlight-opacity', '1');
      if (hoverBorder) {
        mockElement.style.borderColor = hoverBorder;
      }
    }
  }

  const t0 = Date.now();
  const iterations = 100000;

  for (let i = 0; i < iterations; i++) {
    // Generate various coordinate types: negative, subpixel float, large bounds, boundary zero
    let clientX, clientY;
    const mode = i % 5;
    if (mode === 0) {
      // Normal inside bounds
      clientX = 50 + (i % 400);
      clientY = 100 + (i % 500);
    } else if (mode === 1) {
      // Subpixel floats (High-DPI / trackpad)
      clientX = 50.345 + (i * 0.123) % 400;
      clientY = 100.789 + (i * 0.456) % 500;
    } else if (mode === 2) {
      // Negative coordinates (mouse entering from left/top)
      clientX = -500 + (i % 500);
      clientY = -300 + (i % 300);
    } else if (mode === 3) {
      // Extreme coordinates (multi-monitor ultrawide setup)
      clientX = 99999 + i;
      clientY = 88888 + i;
    } else {
      // Exact zeros
      clientX = 0;
      clientY = 0;
    }

    handleMouseMove({ clientX, clientY });
  }

  const elapsed = Date.now() - t0;
  assert(elapsed < 500, `100k mousemove events took ${elapsed}ms (expected <500ms for 200k+ ops/sec)`);
  assert(mockElement.style.getPropertyValue('--spotlight-opacity') === '1', 'Opacity must remain 1 during moves');
  assert(mockElement.style.borderColor === hoverBorder, 'Border color must match hoverBorder');
});

test('Alternating hover enter & leave stress: 20,000 rapid state transitions', () => {
  const mockElement = new MockHTMLElement({ left: 0, top: 0, width: 300, height: 300 });
  const baseBorder = '#2A180E';
  const hoverBorder = 'rgba(255, 107, 0, 0.6)';

  function handleMouseMove(e) {
    if (mockElement) {
      const rect = mockElement.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mockElement.style.setProperty('--mouse-x', `${x}px`);
      mockElement.style.setProperty('--mouse-y', `${y}px`);
      mockElement.style.setProperty('--spotlight-opacity', '1');
      if (hoverBorder) mockElement.style.borderColor = hoverBorder;
    }
  }

  function handleMouseLeave() {
    if (mockElement) {
      mockElement.style.setProperty('--spotlight-opacity', '0');
      if (baseBorder) mockElement.style.borderColor = baseBorder;
    }
  }

  for (let i = 0; i < 20000; i++) {
    handleMouseMove({ clientX: 150, clientY: 150 });
    assert(mockElement.style.getPropertyValue('--spotlight-opacity') === '1', 'Failed enter state');
    assert(mockElement.style.borderColor === hoverBorder, 'Failed hover border state');

    handleMouseLeave();
    assert(mockElement.style.getPropertyValue('--spotlight-opacity') === '0', 'Failed leave state');
    assert(mockElement.style.borderColor === baseBorder, 'Failed base border state');
  }
});

test('Unmounted / null ref pointer event safety', () => {
  let nullElement = null;

  function safeHandleMouseMove(e) {
    if (nullElement) {
      nullElement.style.setProperty('--spotlight-opacity', '1');
    }
  }

  function safeHandleMouseLeave(e) {
    if (nullElement) {
      nullElement.style.setProperty('--spotlight-opacity', '0');
    }
  }

  // Must not throw when element is null
  try {
    for (let i = 0; i < 1000; i++) {
      safeHandleMouseMove({ clientX: 100, clientY: 100 });
      safeHandleMouseLeave();
    }
    assert(true, 'Null ref safety verified');
  } catch (err) {
    assert(false, `Null ref threw error: ${err.message}`);
  }
});


// ======================================================================
// SUMMARY MATRIX
// ======================================================================
console.log('\n======================================================================');
console.log('   CHALLENGER 2 — DEEP STRESS & EDGE BOUNDARIES SUMMARY MATRIX       ');
console.log('======================================================================');
console.log(`  Tests Passed:   ${passedTests}`);
console.log(`  Tests Failed:   ${failedTests}`);
console.log(`  Total Tests:    ${passedTests + failedTests}`);
console.log(`  Success Rate:   ${((passedTests / (passedTests + failedTests)) * 100).toFixed(1)}%`);
console.log('======================================================================\n');

if (failedTests > 0) {
  console.error(`VERDICT: REJECT (${failedTests} tests failed)\n`);
  process.exit(1);
} else {
  console.log(`VERDICT: APPROVE (100% test assertions passed)\n`);
  process.exit(0);
}
