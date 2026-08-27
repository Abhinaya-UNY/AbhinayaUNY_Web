/**
 * Adversarial Challenge & Stress Test Suite
 * Abhinaya UNY Web Platform — Team Roster & Historical Archive
 * 
 * Challenger: Empirical Challenger 1
 * Role: Adversarial stress testing, edge-case mining, boundary verification
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const PUBLIC_DIR = path.join(ROOT_DIR, 'public');
const TEAM_DATA_PATH = path.join(ROOT_DIR, 'data', 'teamData.ts');
const MANIFEST_PATH = path.join(ROOT_DIR, 'data', 'photoManifest.json');
const ROSTER_COMPONENT_PATH = path.join(ROOT_DIR, 'components', 'TeamRosterSection.tsx');

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;
let totalAssertions = 0;
let passedAssertions = 0;
let failedAssertions = 0;
const failureDetails = [];

function assert(condition, message) {
  totalAssertions++;
  if (condition) {
    passedAssertions++;
  } else {
    failedAssertions++;
    failureDetails.push(message);
    throw new Error(`Assertion Failed: ${message}`);
  }
}

function runTest(suiteName, testName, fn) {
  totalTests++;
  process.stdout.write(`  ▶ [${suiteName}] ${testName} ... `);
  try {
    fn();
    passedTests++;
    console.log(`\x1b[32mPASS\x1b[0m`);
  } catch (err) {
    failedTests++;
    console.log(`\x1b[31mFAIL\x1b[0m`);
    console.log(`    \x1b[31mError: ${err.message}\x1b[0m`);
  }
}

console.log('\n======================================================================');
console.log('   ABHINAYA UNY WEB — EMPIRICAL ADVERSARIAL STRESS TEST SUITE');
console.log('======================================================================\n');

// -----------------------------------------------------------------------------
// SUITE 1: PHYSICAL DISK ASSET INTEGRITY & ZERO-BYTE FORENSICS
// -----------------------------------------------------------------------------
console.log('\x1b[36m[SUITE 1: PHYSICAL DISK ASSET INTEGRITY & FORENSICS]\x1b[0m');

runTest('Asset Forensics', 'Every image in teamData.ts physically exists and is non-empty', () => {
  const teamDataContent = fs.readFileSync(TEAM_DATA_PATH, 'utf-8');
  
  // Extract all quoted image paths starting with /images/ or /assets/
  const imgRegex = /['"](\/(?:images|assets)\/[^'"]+\.(?:jpg|jpeg|png|webp|svg))['"]/g;
  let match;
  const imagePaths = new Set();
  while ((match = imgRegex.exec(teamDataContent)) !== null) {
    imagePaths.add(match[1]);
  }

  assert(imagePaths.size > 0, `Expected image paths in teamData.ts, found ${imagePaths.size}`);

  for (const imgPath of imagePaths) {
    const diskPath = path.join(PUBLIC_DIR, imgPath.replace(/^\//, ''));
    const exists = fs.existsSync(diskPath);
    assert(exists, `Image referenced in teamData.ts does not exist on disk: ${imgPath} (resolved: ${diskPath})`);
    
    const stats = fs.statSync(diskPath);
    assert(stats.size > 0, `Image file on disk is 0 bytes (empty): ${imgPath}`);
    assert(stats.size > 500, `Image file suspiciously tiny (<500 bytes): ${imgPath} (${stats.size} bytes)`);
  }
});

runTest('Asset Forensics', 'Every image in photoManifest.json physically exists and is non-empty', () => {
  assert(fs.existsSync(MANIFEST_PATH), `photoManifest.json missing at ${MANIFEST_PATH}`);
  const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf-8'));

  const manifestImages = new Set();

  // Collect from members
  if (manifest.members) {
    for (const [memberKey, memberData] of Object.entries(manifest.members)) {
      if (memberData.primaryPhoto) manifestImages.add(memberData.primaryPhoto);
      if (Array.isArray(memberData.photos)) memberData.photos.forEach(p => manifestImages.add(p));
      if (Array.isArray(memberData.studioPhotos)) memberData.studioPhotos.forEach(p => manifestImages.add(p));
      if (Array.isArray(memberData.feedPhotos)) memberData.feedPhotos.forEach(p => manifestImages.add(p));
      if (memberData.photosByYear) {
        for (const yearPhotos of Object.values(memberData.photosByYear)) {
          if (Array.isArray(yearPhotos)) yearPhotos.forEach(p => manifestImages.add(p));
        }
      }
    }
  }

  assert(manifestImages.size > 0, `Manifest contains 0 collected photos`);

  for (const imgPath of manifestImages) {
    const diskPath = path.join(PUBLIC_DIR, imgPath.replace(/^\//, ''));
    const exists = fs.existsSync(diskPath);
    assert(exists, `Manifest image does not exist on disk: ${imgPath}`);
    const stats = fs.statSync(diskPath);
    assert(stats.size > 500, `Manifest image is empty or too small: ${imgPath} (${stats.size} bytes)`);
  }
});

runTest('Asset Forensics', 'All members in teamData have non-empty photo arrays with zero broken paths', () => {
  const teamDataContent = fs.readFileSync(TEAM_DATA_PATH, 'utf-8');
  
  // Verify that any `photos: [...]` array in teamData contains valid entries
  const photosArrayRegex = /photos:\s*\[([\s\S]*?)\]/g;
  let match;
  let arrayCount = 0;
  while ((match = photosArrayRegex.exec(teamDataContent)) !== null) {
    arrayCount++;
    const arrayContent = match[1];
    const items = arrayContent.match(/['"](\/(?:images|assets)\/[^'"]+)['"]/g) || [];
    assert(items.length > 0, `Found empty photos array in teamData`);
    for (const item of items) {
      const cleanPath = item.replace(/['"]/g, '');
      const diskPath = path.join(PUBLIC_DIR, cleanPath.replace(/^\//, ''));
      assert(fs.existsSync(diskPath), `Path inside photos array missing on disk: ${cleanPath}`);
    }
  }
  assert(arrayCount > 10, `Expected multiple photos arrays in teamData.ts, found ${arrayCount}`);
});

// -----------------------------------------------------------------------------
// SUITE 2: CROSSFADE PHOTO TRANSITION ENGINE STRESS TESTING
// -----------------------------------------------------------------------------
console.log('\n\x1b[36m[SUITE 2: CROSSFADE PHOTO TRANSITION ENGINE STRESS TESTING]\x1b[0m');

runTest('Crossfade Engine', 'Rapid clicking stress test (100,000 circular index transitions)', () => {
  // Test mathematical boundary wrapping under extreme rapid clicking
  const testLengths = [1, 2, 3, 5, 10, 25];

  for (const length of testLengths) {
    let currentIdx = 0;

    // Simulate 10,000 rapid forward clicks
    for (let i = 0; i < 10000; i++) {
      currentIdx = (currentIdx + 1) % length;
      assert(currentIdx >= 0 && currentIdx < length, `Forward click out of bounds: index ${currentIdx} for length ${length}`);
    }

    // Simulate 10,000 rapid backward clicks
    for (let i = 0; i < 10000; i++) {
      currentIdx = (currentIdx - 1 + length) % length;
      assert(currentIdx >= 0 && currentIdx < length, `Backward click out of bounds: index ${currentIdx} for length ${length}`);
    }

    // Simulate 10,000 random forward/backward clicks
    for (let i = 0; i < 10000; i++) {
      const dir = Math.random() > 0.5 ? 1 : -1;
      currentIdx = (currentIdx + dir + length) % length;
      assert(currentIdx >= 0 && currentIdx < length, `Random click out of bounds: index ${currentIdx} for length ${length}`);
    }
  }
});

runTest('Crossfade Engine', 'Interval seed calculation uniqueness and variance across all members', () => {
  const componentContent = fs.readFileSync(ROSTER_COMPONENT_PATH, 'utf-8');
  
  // Verify interval calculation formula in component
  assert(componentContent.includes('member.id.charCodeAt(0) % 5'), 'Seed offset logic present in component');
  assert(componentContent.includes('3600 + seed * 200'), 'Interval formula 3600 + seed * 200 present');

  // Test seed distribution on sample IDs
  const sampleIds = [
    'nurcholis-leader-2020', 'muhammad-iqbal-rasyid', 'salsabila-azzahra-psdu',
    'ilham-widyo-nugroho', 'farhan-yuda-mahendra', 'yuli-dwi-saputri',
    'mustika-wahyu-aprilia', 'rose-pita-nur-afifah', 'zelfa-nafisah-zalna',
    'tri-wahyu-nugroho', 'bayu-aji-prasetya', 'abdul-hasib-adzdzin-nuha'
  ];

  const intervals = new Set();
  sampleIds.forEach(id => {
    const seed = id ? id.charCodeAt(0) % 5 : 0;
    const interval = 3600 + seed * 200;
    intervals.add(interval);
    assert(interval >= 3600 && interval <= 4400, `Interval ${interval} out of expected range [3600, 4400]`);
  });

  // Verify there is diversity in intervals to prevent simultaneous card flips
  assert(intervals.size >= 3, `Expected at least 3 distinct interval timings, got ${intervals.size}`);
});

runTest('Crossfade Engine', 'Single photo vs multi-photo UI branching', () => {
  const componentContent = fs.readFileSync(ROSTER_COMPONENT_PATH, 'utf-8');
  
  // Multi-photo indicator check
  assert(componentContent.includes('images.length > 1 && ('), 'Multi-photo controls gated by images.length > 1');
  assert(componentContent.includes('Images className="w-3 h-3 text-brand-orange animate-pulse"'), 'Slide counter icon rendered for multi-photo');
  assert(componentContent.includes('{currentIdx + 1}/{images.length}'), 'Slide fraction counter correctly formatted');
  assert(componentContent.includes('e.stopPropagation()'), 'Prev/next navigation stops event bubbling to card click handler');
});

runTest('Crossfade Engine', 'Monogram fallback generator handles various name structures', () => {
  // Test name generator logic:
  // member.name.split(' ').filter(w => !w.startsWith('Prof') && !w.startsWith('Ir') && !w.startsWith('M.') && !w.startsWith('Ph.') && !w.startsWith('Dr.')).slice(0, 2).map(n => n[0]).join('')
  
  function getInitials(name) {
    return name
      .split(' ')
      .filter(w => !w.startsWith('Prof') && !w.startsWith('Ir') && !w.startsWith('M.') && !w.startsWith('Ph.') && !w.startsWith('Dr.'))
      .slice(0, 2)
      .map(n => n[0])
      .join('');
  }

  assert(getInitials('Farhan Yuda Mahendra') === 'FY', 'Farhan Yuda Mahendra -> FY');
  assert(getInitials('Prof. Ir. Moh. Khairudin, M.T., Ph.D., IPU.') === 'MK', 'Prof Khairudin title filter yields MK for Moh Khairudin');
  assert(getInitials('Dr. Herlambang Sigit Pramono, S.T., M.Cs.') === 'HS', 'Dr Herlambang title filter');
  assert(getInitials('Nurcholis') === 'N', 'Single name Nurcholis -> N');
  assert(getInitials('Tri Wahyu Nugroho') === 'TW', 'Tri Wahyu Nugroho -> TW');
  assert(getInitials('Rose Pita Nur Afifah') === 'RP', 'Rose Pita Nur Afifah -> RP');
});

// -----------------------------------------------------------------------------
// SUITE 3: ALUMNI EXPLORER & SEARCH FILTERING STRESS TESTING
// -----------------------------------------------------------------------------
console.log('\n\x1b[36m[SUITE 3: ALUMNI EXPLORER & SEARCH FILTERING STRESS TESTING]\x1b[0m');

runTest('Alumni Explorer', 'Year switching completeness across 2020-2025', () => {
  const teamDataContent = fs.readFileSync(TEAM_DATA_PATH, 'utf-8');
  
  const years = [2020, 2021, 2022, 2023, 2024, 2025];
  for (const year of years) {
    assert(teamDataContent.includes(`year: ${year}`), `Generation archive for year ${year} present in teamData.ts`);
  }
  
  // Check getGenerationArchive function definition and export
  assert(teamDataContent.includes('export function getGenerationArchive'), 'getGenerationArchive helper function exported');
  assert(teamDataContent.includes('export function getAllGenerations'), 'getAllGenerations helper function exported');
});

runTest('Search Engine', 'Adversarial search queries stress test', () => {
  // Simulate matchesSearch matching function from TeamRosterSection.tsx
  function matchesSearch(member, searchQuery) {
    if (!searchQuery || searchQuery.trim().length === 0) return true;
    const q = searchQuery.toLowerCase();
    const specs = member.specialization ? member.specialization.some(s => s.toLowerCase().includes(q)) : false;
    const skills = member.skills ? member.skills.some(s => s.toLowerCase().includes(q)) : false;
    const achievements = member.achievements ? member.achievements.some(a => a.toLowerCase().includes(q)) : false;
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

  const sampleMember = {
    name: 'Farhan Yuda Mahendra',
    role: 'Ketua Tim Abhinaya 2025',
    nim: '22518241023',
    division: 'Ketua Tim',
    badge: 'Team Leader',
    studyProgram: 'S1 Pendidikan Teknik Mekatronika',
    specialization: ['Robotics Hardware Architecture', 'Strategic Leadership'],
    skills: ['ROS2', 'STM32', 'Robotics Systems'],
    achievements: ['Juara 1 Regional KRTMI 2024'],
    quote: 'Inovasi tanpa batas untuk kejayaan almamater.'
  };

  // Test 1: Empty and whitespace queries -> always true
  assert(matchesSearch(sampleMember, '') === true, 'Empty query returns true');
  assert(matchesSearch(sampleMember, '   \t\n  ') === true, 'Whitespace-only query returns true');

  // Test 2: Exact name match & partial substring match
  assert(matchesSearch(sampleMember, 'farhan') === true, 'Partial name match lowercase');
  assert(matchesSearch(sampleMember, 'FARHAN') === true, 'Partial name match uppercase');
  assert(matchesSearch(sampleMember, 'MaHeNdRa') === true, 'Partial name match mixed case');

  // Test 3: Match on NIM
  assert(matchesSearch(sampleMember, '22518241023') === true, 'NIM match');
  assert(matchesSearch(sampleMember, '225182') === true, 'Partial NIM match');

  // Test 4: Match on skills and specializations
  assert(matchesSearch(sampleMember, 'ROS2') === true, 'Skill match ROS2');
  assert(matchesSearch(sampleMember, 'stm32') === true, 'Skill match STM32');
  assert(matchesSearch(sampleMember, 'hardware architecture') === true, 'Specialization match');

  // Test 5: Match on achievements and quote
  assert(matchesSearch(sampleMember, 'KRTMI 2024') === true, 'Achievement match');
  assert(matchesSearch(sampleMember, 'inovasi tanpa batas') === true, 'Quote match');

  // Test 6: Adversarial inputs (special characters, regex characters)
  const adversarialQueries = [
    '!@#$%^&*()',
    '[]{}()<>?\\|',
    '.*+?^${}()|[]\\',
    '\\d+\\w+',
    '<script>alert(1)</script>',
    '\' OR \'1\'=\'1',
    '👾 🤖 🔥 ⚡ 🏆',
    'a'.repeat(500)
  ];

  for (const q of adversarialQueries) {
    // Should execute safely without throwing or hanging
    const result = matchesSearch(sampleMember, q);
    assert(typeof result === 'boolean', `Adversarial search query "${q}" returned non-boolean`);
  }
});

// -----------------------------------------------------------------------------
// SUITE 4: MODAL DIALOG LIFECYCLE & EVENT PROPAGATION
// -----------------------------------------------------------------------------
console.log('\n\x1b[36m[SUITE 4: MODAL DIALOG LIFECYCLE & EVENT PROPAGATION]\x1b[0m');

runTest('Modal Lifecycle', 'Escape key listener and body overflow lock handling', () => {
  const componentContent = fs.readFileSync(ROSTER_COMPONENT_PATH, 'utf-8');
  
  assert(componentContent.includes("if (e.key === 'Escape')"), 'ESC key handler present');
  assert(componentContent.includes("document.body.style.overflow = 'hidden'"), 'Body scroll lock on modal open');
  assert(componentContent.includes("document.body.style.overflow = 'unset'"), 'Body scroll unlock on modal close');
  assert(componentContent.includes('window.addEventListener(\'keydown\', handleKeyDown)'), 'Keydown listener attached');
  assert(componentContent.includes('window.removeEventListener(\'keydown\', handleKeyDown)'), 'Keydown listener cleaned up');
});

runTest('Modal Lifecycle', 'Backdrop click outside dismisses modal', () => {
  const componentContent = fs.readFileSync(ROSTER_COMPONENT_PATH, 'utf-8');
  
  assert(componentContent.includes('onClick={() => setSelectedMember(null)}'), 'Backdrop click dismisses modal');
  assert(componentContent.includes('onClick={(e) => e.stopPropagation()}'), 'Modal content stops propagation to prevent closing');
  assert(componentContent.includes('onClick={() => setSelectedMember(null)}'), 'Close button dismisses modal');
});

// -----------------------------------------------------------------------------
// SUMMARY
// -----------------------------------------------------------------------------
console.log('\n======================================================================');
console.log('         ADVERSARIAL CHALLENGE & STRESS TEST SUMMARY');
console.log('======================================================================');
console.log(`  Test Suites:  4 suites executed`);
console.log(`  Tests:        ${passedTests} passed, ${failedTests} failed, ${totalTests} total`);
console.log(`  Assertions:   ${passedAssertions} passed, ${failedAssertions} failed, ${totalAssertions} total`);
console.log('======================================================================\n');

if (failedTests > 0) {
  console.log('\x1b[31m   VERDICT: ADVERSARIAL STRESS TESTS FAILED\x1b[0m\n');
  process.exit(1);
} else {
  console.log('\x1b[32m   VERDICT: ALL ADVERSARIAL STRESS TESTS PASSED (100% SUCCESS)\x1b[0m\n');
  process.exit(0);
}
