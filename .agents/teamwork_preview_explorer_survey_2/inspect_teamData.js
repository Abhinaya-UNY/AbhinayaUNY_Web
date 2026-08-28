const fs = require('fs');
const ts = require('typescript');

const tsSource = fs.readFileSync('data/teamData.ts', 'utf8');
const jsSource = ts.transpileModule(tsSource, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 }
}).outputText;

const mod = { exports: {} };
const fn = new Function('module', 'exports', 'require', jsSource);
fn(mod, mod.exports, require);

const teamData = mod.exports;

console.log('=== 1. DOSEN PEMBIMBING LIST ===');
console.log('Count:', teamData.DOSEN_PEMBIMBING_LIST.length);
teamData.DOSEN_PEMBIMBING_LIST.forEach((d, i) => {
  console.log(`[${i+1}] ${d.name} | NIM/NIP: ${d.nim} | Prodi: ${d.studyProgram} | Faculty: ${d.faculty} | Role: ${d.role} | SubRole: ${d.subRole} | Badge: ${d.badge}`);
});

console.log('\n=== 2. LEADERS HALL OF FAME ===');
console.log('Count:', teamData.LEADERS_HALL_OF_FAME.length);
teamData.LEADERS_HALL_OF_FAME.forEach((l) => {
  console.log(`[Year ${l.year}] ${l.name} | NIM: ${l.nim} | Prodi: ${l.studyProgram} | Faculty: ${l.faculty} | Role: ${l.role} | SubRole: ${l.subRole} | Badge: ${l.badge} | Active: ${l.yearsActive ? l.yearsActive.join(',') : ''}`);
});

console.log('\n=== 3. MANAGERS SHOWCASE ===');
console.log('Count:', teamData.MANAGERS_SHOWCASE.length);
teamData.MANAGERS_SHOWCASE.forEach((m) => {
  console.log(`[Year ${m.year}] ${m.name} | NIM: ${m.nim} | Prodi: ${m.studyProgram} | Faculty: ${m.faculty} | Role: ${m.role} | SubRole: ${m.subRole} | Era: ${m.leadershipEra} | Active: ${m.yearsActive ? m.yearsActive.join(',') : ''}`);
});

console.log('\n=== 4. ACTIVE TECHNICAL SQUAD ===');
console.log('-- Program (' + teamData.ACTIVE_TECHNICAL_SQUAD.program.length + ') --');
teamData.ACTIVE_TECHNICAL_SQUAD.program.forEach((p, i) => {
  console.log(`[${i+1}] ${p.name} | NIM: ${p.nim} | Prodi: ${p.studyProgram} | Role: ${p.role} | SubRole: ${p.subRole} | Badge: ${p.badge} | Active: ${p.isActive}`);
});

console.log('-- Elektronik (' + teamData.ACTIVE_TECHNICAL_SQUAD.elektronik.length + ') --');
teamData.ACTIVE_TECHNICAL_SQUAD.elektronik.forEach((e, i) => {
  console.log(`[${i+1}] ${e.name} | NIM: ${e.nim} | Prodi: ${e.studyProgram} | Role: ${e.role} | SubRole: ${e.subRole} | Badge: ${e.badge} | Active: ${e.isActive}`);
});

console.log('-- Mekanik (' + teamData.ACTIVE_TECHNICAL_SQUAD.mekanik.length + ') --');
teamData.ACTIVE_TECHNICAL_SQUAD.mekanik.forEach((m, i) => {
  console.log(`[${i+1}] ${m.name} | NIM: ${m.nim} | Prodi: ${m.studyProgram} | Role: ${m.role} | SubRole: ${m.subRole} | Badge: ${m.badge} | Active: ${m.isActive}`);
});

console.log('\n=== 5. 2025 ACTIVE TEAM_MEMBERS ROSTER ===');
console.log('Count:', teamData.TEAM_MEMBERS.length);
teamData.TEAM_MEMBERS.forEach((t, i) => {
  console.log(`[${i+1}] Div: ${t.division.padEnd(12)} | ${t.name.padEnd(30)} | NIM: ${t.nim} | Prodi: ${t.studyProgram} | Role: ${t.role}`);
});

console.log('\n=== 6. ALL_ROSTER_MEMBERS ===');
console.log('Count:', teamData.ALL_ROSTER_MEMBERS.length);

console.log('\n=== 7. ALUMNI GENERATIONS ARCHIVE ===');
teamData.ALUMNI_GENERATIONS.forEach((g) => {
  console.log(`\n--- Generasi ${g.year}: ${g.contingentName} ---`);
  console.log(`Theme: ${g.theme}`);
  console.log(`Tournament: ${g.tournament}`);
  console.log(`Leader: ${g.leader ? g.leader.name + ' (' + g.leader.nim + ')' : 'None'}`);
  console.log(`Managers (${g.managers ? g.managers.length : 0}): ${g.managers ? g.managers.map(m => m.name + ' (' + m.nim + ')').join('; ') : 'None'}`);
  console.log(`Divisions:`);
  console.log(`  - Program (${g.divisions.program ? g.divisions.program.length : 0}): ${g.divisions.program ? g.divisions.program.map(p => p.name).join(', ') : 'None'}`);
  console.log(`  - Elektronik (${g.divisions.elektronik ? g.divisions.elektronik.length : 0}): ${g.divisions.elektronik ? g.divisions.elektronik.map(e => e.name).join(', ') : 'None'}`);
  console.log(`  - Mekanik (${g.divisions.mekanik ? g.divisions.mekanik.length : 0}): ${g.divisions.mekanik ? g.divisions.mekanik.map(m => m.name).join(', ') : 'None'}`);
  if (g.divisions.desain) {
    console.log(`  - Desain (${g.divisions.desain.length}): ${g.divisions.desain.map(d => d.name).join(', ')}`);
  }
  console.log(`Total unique members: ${g.members.length}`);
  console.log(`Achievements: ${g.achievements.join(' | ')}`);
});
