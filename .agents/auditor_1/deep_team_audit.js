const fs = require('fs');
const path = require('path');

// Let's transpile/read teamData
const teamDataPath = path.join(__dirname, '../../data/teamData.ts');
const teamDataContent = fs.readFileSync(teamDataPath, 'utf8');

console.log("=== FORENSIC DEEP-DIVE: teamData.ts ===");

// Check Leaders Hall of Fame
console.log("\n--- Leaders Hall of Fame (2020-2025) ---");
const leaderMatches = [...teamDataContent.matchAll(/{\s*year:\s*(\d{4}),\s*id:\s*['"]([^'"]+)['"],\s*name:\s*['"]([^'"]+)['"],/g)];
console.log(`Found ${leaderMatches.length} leaders in Hall of Fame:`);
leaderMatches.forEach(m => {
  console.log(`  - Year ${m[1]}: ${m[3]} (id: ${m[2]})`);
});

// Check Managers Showcase
console.log("\n--- Managers Showcase (2020-2025) ---");
const managerMatches = [...teamDataContent.matchAll(/{\s*year:\s*(\d{4}),\s*id:\s*['"]([^'"]+)['"],\s*name:\s*['"]([^'"]+)['"],/g)];
// Let's filter managers by matching MANAGERS_SHOWCASE block
const mgrBlockMatch = teamDataContent.match(/export const MANAGERS_SHOWCASE: ManagerHistoryItem\[\] = \[([\s\S]*?)\];/);
if (mgrBlockMatch) {
  const mgrMatches = [...mgrBlockMatch[1].matchAll(/{\s*year:\s*(\d{4}),\s*id:\s*['"]([^'"]+)['"],\s*name:\s*['"]([^'"]+)['"],/g)];
  console.log(`Found ${mgrMatches.length} manager entries in Showcase:`);
  mgrMatches.forEach(m => {
    console.log(`  - Year ${m[1]}: ${m[3]} (id: ${m[2]})`);
  });
}

// Check Active Squad
console.log("\n--- Active Technical Squad (2025) ---");
const activeBlockMatch = teamDataContent.match(/export const ACTIVE_TECHNICAL_SQUAD: TeamMember\[\] = \[([\s\S]*?)\];/);
if (activeBlockMatch) {
  const squadMatches = [...activeBlockMatch[1].matchAll(/id:\s*['"]([^'"]+)['"],\s*name:\s*['"]([^'"]+)['"],[\s\S]*?division:\s*['"]([^'"]+)['"],[\s\S]*?role:\s*['"]([^'"]+)['"],/g)];
  console.log(`Found ${squadMatches.length} active squad members:`);
  squadMatches.forEach(m => {
    console.log(`  - [${m[3]}] ${m[2]} - ${m[4]} (id: ${m[1]})`);
  });
}

// Check Alumni Generations
console.log("\n--- Alumni Generations Archive (2020-2025) ---");
const alumniBlockMatch = teamDataContent.match(/export const ALUMNI_GENERATIONS: GenerationArchive\[\] = \[([\s\S]*?)\];\s*export const/);
if (alumniBlockMatch) {
  const genMatches = [...alumniBlockMatch[1].matchAll(/year:\s*(\d{4}),\s*contingentName:\s*['"]([^'"]+)['"],\s*theme:\s*['"]([^'"]+)['"],\s*tournament:\s*['"]([^'"]+)['"],/g)];
  console.log(`Found ${genMatches.length} alumni generation archives:`);
  genMatches.forEach(m => {
    console.log(`  - Year ${m[1]}: "${m[2]}" | Theme: ${m[3]} | Tournament: ${m[4]}`);
  });
}
