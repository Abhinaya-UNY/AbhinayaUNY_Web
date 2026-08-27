const fs = require('fs');
const path = require('path');

const tsxPath = path.join(__dirname, '../../components/TeamRosterSection.tsx');
const code = fs.readFileSync(tsxPath, 'utf8');

console.log("=== FORENSIC COMPONENT AUDIT: TeamRosterSection.tsx ===");

// 1. Check Hook Usages
console.log("\n1. React Hooks & State Management:");
const stateDeclarations = [...code.matchAll(/const\s+\[([a-zA-Z0-9_]+),\s*([a-zA-Z0-9_]+)\]\s*=\s*useState<[^>]*>\(([^)]*)\);/g)];
console.log(`Found ${stateDeclarations.length} useState instances:`);
stateDeclarations.forEach(s => {
  console.log(`  - State: ${s[1]}, Setter: ${s[2]}, Default: ${s[3]}`);
});

// 2. Check useEffect for crossfade / autoplay / keyboard handlers
console.log("\n2. useEffect Lifecycles:");
const effectMatches = [...code.matchAll(/useEffect\(\s*\(\)\s*=>\s*\{([\s\S]*?)\},\s*\[([^\]]*)\]\)/g)];
console.log(`Found ${effectMatches.length} useEffect instances:`);
effectMatches.forEach((e, idx) => {
  const deps = e[2].trim() || 'mount-only / empty';
  const summary = e[1].includes('setInterval') ? 'Autoplay photo slideshow interval' :
                  e[1].includes('keydown') || e[1].includes('Escape') ? 'Keyboard navigation / Escape listener' :
                  e[1].includes('overflow') ? 'Modal body scroll lock' : 'Other effect';
  console.log(`  - Effect #${idx + 1}: ${summary} (deps: [${deps}])`);
});

// 3. Check Sub-Components in File
console.log("\n3. Architectural Sub-Components in File:");
const funcComponents = [...code.matchAll(/(?:export\s+)?function\s+([A-Z][a-zA-Z0-9_]+)\s*\(([^)]*)\)/g)];
funcComponents.forEach(c => {
  console.log(`  - Component: <${c[1]}> (props: ${c[2]})`);
});
const constComponents = [...code.matchAll(/const\s+([A-Z][a-zA-Z0-9_]+)\s*:\s*React\.FC<[^>]*>\s*=\s*\(([^)]*)\)/g)];
constComponents.forEach(c => {
  console.log(`  - Component: <${c[1]}> (props: ${c[2]})`);
});

// 4. Check Filtering & Search Logic
console.log("\n4. Search & Filtering Logic Integrity:");
const hasFilterCode = code.includes('.filter(');
console.log(`  - Uses Array.prototype.filter: ${hasFilterCode}`);
const filterInstances = [...code.matchAll(/([a-zA-Z0-9_]+)\.filter\(([^)]+)\)/g)];
filterInstances.forEach(f => {
  console.log(`    - Filtering: ${f[1]}.filter(${f[2]})`);
});

// 5. Check CSS Transitions & Animations
console.log("\n5. CSS Transition Classes:");
const transitions = [...new Set(code.match(/transition-[a-z0-9-]+|duration-[0-9]+|ease-[a-z0-9-]+/g) || [])];
console.log(`  - Transition classes present: ${transitions.join(', ')}`);

// 6. Check for dummy or hardcoded cheat flags
console.log("\n6. Cheat / Mock Flags Detection:");
const suspiciousPatterns = ['__MOCK__', 'TEST_BYPASS', 'isTesting', 'fakeData', 'dummy', 'PLACEHOLDER', 'TODO'];
suspiciousPatterns.forEach(p => {
  const matches = [...code.matchAll(new RegExp(p, 'gi'))];
  console.log(`  - Pattern '${p}': ${matches.length} occurrences`);
});

console.log("\nComponent static analysis complete.");
