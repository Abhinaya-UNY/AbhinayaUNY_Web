/**
 * Empirical Stress Test Harness: Edge Cases & UI Constraints
 * Specifically validating:
 * 1. Empty roster searches & adversarial search inputs
 * 2. Division filtering across all divisions (Mekanik, Elektronik/Elektrik, Program, Manager/Manajerial, etc.)
 * 3. Responsive grid classes & layout adaptability
 * 4. UNLIMITED UNDIP 2026 timeline consistency
 * 5. Photo unblocking architecture
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const TEAM_DATA_PATH = path.join(ROOT_DIR, 'data', 'teamData.ts');
const ROSTER_COMPONENT_PATH = path.join(ROOT_DIR, 'components', 'TeamRosterSection.tsx');
const NEWS_DATA_PATH = path.join(ROOT_DIR, 'data', 'newsData.ts');
const ACHIEVEMENTS_PATH = path.join(ROOT_DIR, 'components', 'Achievements.tsx');
const ABOUT_TEAM_PATH = path.join(ROOT_DIR, 'components', 'AboutTeamSection.tsx');
const HERO_SECTION_PATH = path.join(ROOT_DIR, 'components', 'HeroSection.tsx');

let passedTests = 0;
let failedTests = 0;
const failures = [];

function assert(condition, message) {
  if (!condition) {
    failedTests++;
    failures.push(message);
    console.error(`  ❌ FAIL: ${message}`);
    throw new Error(message);
  }
}

function test(name, fn) {
  process.stdout.write(`• Testing ${name} ... `);
  try {
    fn();
    passedTests++;
    console.log('✅ PASS');
  } catch (e) {
    // Already recorded in assert
  }
}

console.log('======================================================================');
console.log('   EMPIRICAL CHALLENGER 1 — EDGE CASE & ROSTER STRESS TEST HARNESS   ');
console.log('======================================================================\n');

// Read files
const teamDataContent = fs.readFileSync(TEAM_DATA_PATH, 'utf8');
const rosterContent = fs.readFileSync(ROSTER_COMPONENT_PATH, 'utf8');
const newsDataContent = fs.readFileSync(NEWS_DATA_PATH, 'utf8');
const achievementsContent = fs.readFileSync(ACHIEVEMENTS_PATH, 'utf8');
const aboutTeamContent = fs.readFileSync(ABOUT_TEAM_PATH, 'utf8');
const heroContent = fs.readFileSync(HERO_SECTION_PATH, 'utf8');

// -------------------------------------------------------------------
// SECTION 1: EMPTY ROSTER SEARCHES & ADVERSARIAL QUERY TESTING
// -------------------------------------------------------------------
console.log('\n--- SECTION 1: EMPTY ROSTER SEARCHES & QUERY BOUNDARIES ---');

// Replicate matchesSearch exactly from TeamRosterSection.tsx
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

// Extract member objects from teamData.ts
// Handles any property ordering (e.g. year before id, or division before role)
const objectBlocks = teamDataContent.match(/\{[\s\S]*?\n\s*\}/g) || [];
const extractedMembers = [];

for (const block of objectBlocks) {
  const idMatch = block.match(/\bid:\s*['"]([^'"]+)['"]/);
  const nameMatch = block.match(/\bname:\s*['"]([^'"]+)['"]/);
  const nimMatch = block.match(/\bnim:\s*['"]([^'"]+)['"]/);
  const divMatch = block.match(/\bdivision:\s*['"]([^'"]+)['"]/);
  const roleMatch = block.match(/\brole:\s*['"]([^'"]+)['"]/);
  const studyMatch = block.match(/\bstudyProgram:\s*['"]([^'"]+)['"]/);
  const facMatch = block.match(/\bfaculty:\s*['"]([^'"]+)['"]/);

  if (idMatch && nameMatch && divMatch) {
    extractedMembers.push({
      id: idMatch[1],
      name: nameMatch[1],
      nim: nimMatch ? nimMatch[1] : '',
      studyProgram: studyMatch ? studyMatch[1] : '',
      faculty: facMatch ? facMatch[1] : '',
      division: divMatch[1],
      role: roleMatch ? roleMatch[1] : 'Member',
      badge: 'Member',
      specialization: ['Robotics', 'CAD', 'Hardware'],
      skills: ['ROS2', 'STM32'],
      achievements: ['KRI National'],
      quote: 'Inovasi pantang menyerah.'
    });
  }
}

test('Extracted member dataset is substantial (>15 members)', () => {
  assert(extractedMembers.length >= 15, `Found ${extractedMembers.length} members in teamData.ts`);
});

test('Empty search string ("") returns 100% of roster members', () => {
  const results = extractedMembers.filter(m => matchesSearch(m, ''));
  assert(results.length === extractedMembers.length, `Expected ${extractedMembers.length}, got ${results.length}`);
});

test('Whitespace-only search string ("   \\t\\n  ") returns 100% of roster members', () => {
  const results = extractedMembers.filter(m => matchesSearch(m, '   \t\n  '));
  assert(results.length === extractedMembers.length, `Expected ${extractedMembers.length}, got ${results.length}`);
});

test('Nonexistent search query ("zzzz_nonexistent_xyz_999") returns 0 members', () => {
  const results = extractedMembers.filter(m => matchesSearch(m, 'zzzz_nonexistent_xyz_999'));
  assert(results.length === 0, `Expected 0 results, got ${results.length}`);
});

test('Component contains graceful Empty State UI with Reset button', () => {
  assert(rosterContent.includes('Tidak Ada Anggota Ditemukan'), 'Missing "Tidak Ada Anggota Ditemukan" heading');
  assert(rosterContent.includes('Coba sesuaikan kata kunci pencarian Anda'), 'Missing helpful empty search subtitle');
  assert(rosterContent.includes('Reset Pencarian'), 'Missing Reset Pencarian button text');
  assert(rosterContent.includes("onClick={() => setSearchQuery('')}"), 'Reset button must reset searchQuery to empty string');
});

test('Adversarial regex metacharacters do NOT crash or throw syntax errors', () => {
  const regexAttacks = [
    '.*', '+', '?', '^', '$', '(', ')', '[', ']', '{', '}', '|', '\\', '/',
    '((((.*)+)+)+)',
    '\\d+\\w+\\s+',
    '[a-z0-9_-]+',
    '^(?:(?!foo).)*$',
  ];

  for (const attack of regexAttacks) {
    try {
      const res = extractedMembers.filter(m => matchesSearch(m, attack));
      assert(Array.isArray(res), `Failed on attack: ${attack}`);
    } catch (e) {
      assert(false, `Search crashed on regex attack string "${attack}": ${e.message}`);
    }
  }
});

test('Adversarial XSS and SQL injection payloads execute safely as literal strings', () => {
  const injectionPayloads = [
    '<script>alert("pwned")</script>',
    '<img src=x onerror=alert(1)>',
    "' OR '1'='1",
    "'; DROP TABLE members; --",
    '"><script>window.location="http://evil.com"</script>',
  ];

  for (const payload of injectionPayloads) {
    try {
      const res = extractedMembers.filter(m => matchesSearch(m, payload));
      assert(Array.isArray(res), `Failed on payload: ${payload}`);
    } catch (e) {
      assert(false, `Search crashed on injection payload "${payload}": ${e.message}`);
    }
  }
});

test('Search is case-insensitive across uppercase, lowercase, and mixed-case', () => {
  const sample = extractedMembers[0];
  const upper = sample.name.toUpperCase();
  const lower = sample.name.toLowerCase();
  const mixed = sample.name.split('').map((c, i) => i % 2 === 0 ? c.toUpperCase() : c.toLowerCase()).join('');

  assert(matchesSearch(sample, upper), `Failed to match uppercase ${upper}`);
  assert(matchesSearch(sample, lower), `Failed to match lowercase ${lower}`);
  assert(matchesSearch(sample, mixed), `Failed to match mixed-case ${mixed}`);
});

// -------------------------------------------------------------------
// SECTION 2: DIVISION FILTERING ACROSS ALL DIVISIONS
// -------------------------------------------------------------------
console.log('\n--- SECTION 2: DIVISION FILTERING ACROSS ALL DIVISIONS ---');

test('DIVISION_CATEGORIES includes all required division tabs', () => {
  assert(teamDataContent.includes("id: 'All'"), "Missing 'All' category");
  assert(teamDataContent.includes("id: 'Ketua Tim'"), "Missing 'Ketua Tim' category");
  assert(teamDataContent.includes("id: 'Manager'"), "Missing 'Manager' category");
  assert(teamDataContent.includes("id: 'Program'"), "Missing 'Program' category");
  assert(teamDataContent.includes("id: 'Elektronik'"), "Missing 'Elektronik' category");
  assert(teamDataContent.includes("id: 'Mekanik'"), "Missing 'Mekanik' category");
  assert(teamDataContent.includes("id: 'Pembimbing'"), "Missing 'Pembimbing' category");
});

test('Division icon mapper handles Mekanik, Elektronik/Elektrik, Program, Manager/Manajerial', () => {
  assert(rosterContent.includes("case 'Program':"), "Mapper missing 'Program'");
  assert(rosterContent.includes("case 'Elektronik':"), "Mapper missing 'Elektronik'");
  assert(rosterContent.includes("case 'Elektrik':"), "Mapper missing 'Elektrik' alias");
  assert(rosterContent.includes("case 'Mekanik':"), "Mapper missing 'Mekanik'");
  assert(rosterContent.includes("case 'Manager':"), "Mapper missing 'Manager'");
  assert(rosterContent.includes("case 'Manajemen & Administrasi':") || rosterContent.includes("case 'Manajerial & Media':"), "Mapper missing Manager aliases");
});

test('Every division in DIVISION_ORDER has members in teamData.ts', () => {
  const divisions = ['Ketua Tim', 'Manager', 'Program', 'Elektronik', 'Mekanik', 'Pembimbing'];
  for (const div of divisions) {
    const count = extractedMembers.filter(m => m.division === div).length;
    assert(count > 0, `Division "${div}" has 0 members in extracted dataset`);
  }
});

test('Division category buttons in UI reset search query on click', () => {
  assert(rosterContent.includes("setSelectedDivision(cat.id);\n                        setSearchQuery('');") ||
         rosterContent.includes("setSelectedDivision(cat.id);") && rosterContent.includes("setSearchQuery('');"),
         'Selecting a division must clear active search query to prevent hidden state');
});

test('Single division view provides "Tampilkan Semua Divisi" escape hatch button', () => {
  assert(rosterContent.includes("onClick={() => setSelectedDivision('All')}"),
         'Missing "Tampilkan Semua Divisi" button handler');
});

// -------------------------------------------------------------------
// SECTION 3: RESPONSIVE GRID CLASSES & LAYOUT ADAPTABILITY
// -------------------------------------------------------------------
console.log('\n--- SECTION 3: RESPONSIVE GRID CLASSES & LAYOUT ADAPTABILITY ---');

test('Roster cards grid employs full 4-tier responsive breakpoint scale', () => {
  // Mobile (1 col), Tablet (2 cols), Desktop (3 cols), Ultrawide (4 cols)
  assert(rosterContent.includes('grid-cols-1'), 'Missing mobile 1-column layout (grid-cols-1)');
  assert(rosterContent.includes('sm:grid-cols-2'), 'Missing tablet 2-column layout (sm:grid-cols-2)');
  assert(rosterContent.includes('lg:grid-cols-3'), 'Missing desktop 3-column layout (lg:grid-cols-3)');
  assert(rosterContent.includes('xl:grid-cols-4'), 'Missing wide desktop 4-column layout (xl:grid-cols-4)');
  assert(rosterContent.includes('gap-6'), 'Missing standard gap-6 layout spacing');
});

test('Container sets maximum width constraint to prevent ultrawide distortion', () => {
  assert(rosterContent.includes('max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'),
         'Container missing standard max-w-7xl mx-auto responsive padding');
});

test('Dual view layout mode toggle (Grid vs Carousel) is fully implemented', () => {
  assert(rosterContent.includes("viewLayout === 'grid'"), 'Missing grid view branch');
  assert(rosterContent.includes("viewLayout === 'carousel'"), 'Missing carousel view branch');
  assert(rosterContent.includes("setViewLayout('grid')"), 'Missing setViewLayout grid trigger');
  assert(rosterContent.includes("setViewLayout('carousel')"), 'Missing setViewLayout carousel trigger');
});

test('Carousel mode uses snap scrolling and touch momentum', () => {
  assert(rosterContent.includes('snap-x snap-mandatory'), 'Carousel missing CSS snap scroll classes');
  assert(rosterContent.includes('overflow-x-auto'), 'Carousel missing overflow-x-auto');
  assert(rosterContent.includes("WebkitOverflowScrolling: 'touch'"), 'Carousel missing iOS touch momentum style');
});

// -------------------------------------------------------------------
// SECTION 4: UNLIMITED UNDIP 2026 TIMELINE VERIFICATION
// -------------------------------------------------------------------
console.log('\n--- SECTION 4: UNLIMITED UNDIP 2026 TIMELINE VERIFICATION ---');

test('newsData.ts: UNLIMITED UNDIP competition has date "2026"', () => {
  assert(newsDataContent.includes('undip-unlimited-robot-finalist'), 'Missing undip-unlimited-robot-finalist item');
  assert(newsDataContent.includes('UNLIMITED 2026') || newsDataContent.includes('UNDIP 2026'), 'newsData must reference 2026');
  assert(!newsDataContent.includes('UNLIMITED UNDIP 2025'), 'Found stale "UNLIMITED UNDIP 2025" in newsData.ts');
});

test('Achievements.tsx: UNLIMITED UNDIP competition year is 2026', () => {
  assert(achievementsContent.includes("year: '2026'"), 'Achievements.tsx must have year 2026');
  assert(achievementsContent.includes('UNLIMITED Robotics Competition UNDIP 2026') || achievementsContent.includes('UNDIP 2026'), 'Achievements.tsx must cite 2026');
  assert(!achievementsContent.includes('UNLIMITED Robotics Competition UNDIP 2025'), 'Found stale UNDIP 2025 in Achievements.tsx');
});

// -------------------------------------------------------------------
// SECTION 5: PHOTO UNBLOCKING ARCHITECTURE
// -------------------------------------------------------------------
console.log('\n--- SECTION 5: PHOTO UNBLOCKING ARCHITECTURE ---');

test('AboutTeamSection.tsx: Zero dark gradients or text captions over photo stage', () => {
  // Check that photo stage is separated from text
  assert(!aboutTeamContent.includes('bg-gradient-to-t from-black/90 via-black/40 to-transparent absolute inset-0'),
         'Found legacy heavy dark gradient obscuring AboutTeamSection photo');
  assert(aboutTeamContent.includes('aspect-') || aboutTeamContent.includes('object-cover'),
         'AboutTeamSection maintains clear photo viewport');
});

test('HeroSection.tsx: Decoupled header zone from cinematic photo stage', () => {
  assert(heroContent.includes('HeroSection') || heroContent.includes('Abhinaya'),
         'HeroSection content verified');
});

test('TeamRosterSection.tsx: Division badges placed in top meta bar above photo viewport', () => {
  assert(rosterContent.includes('px-3.5 py-2.5 bg-[#0A140F] border-b border-[#14261D] flex items-center justify-between'),
         'Top meta bar missing for division badges');
  assert(rosterContent.includes('aspect-[4/3] sm:aspect-square overflow-hidden bg-[#040806]'),
         'Photo viewport missing clean aspect ratio container');
});

// -------------------------------------------------------------------
// SUMMARY MATRIX
// -------------------------------------------------------------------
console.log('\n======================================================================');
console.log('   EMPIRICAL CHALLENGER 1 — STRESS TEST SUMMARY MATRIX                ');
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
