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

// Collect all unique member objects
const allMembersMap = new Map();

function addMember(m, source) {
  if (!m || !m.id) return;
  if (!allMembersMap.has(m.id)) {
    allMembersMap.set(m.id, { member: m, sources: [source] });
  } else {
    allMembersMap.get(m.id).sources.push(source);
  }
}

teamData.DOSEN_PEMBIMBING_LIST.forEach(m => addMember(m, 'DOSEN_PEMBIMBING_LIST'));
teamData.LEADERS_HALL_OF_FAME.forEach(m => addMember(m, 'LEADERS_HALL_OF_FAME'));
teamData.MANAGERS_SHOWCASE.forEach(m => addMember(m, 'MANAGERS_SHOWCASE'));
teamData.ACTIVE_TECHNICAL_SQUAD.program.forEach(m => addMember(m, 'ACTIVE_TECHNICAL_SQUAD.program'));
teamData.ACTIVE_TECHNICAL_SQUAD.elektronik.forEach(m => addMember(m, 'ACTIVE_TECHNICAL_SQUAD.elektronik'));
teamData.ACTIVE_TECHNICAL_SQUAD.mekanik.forEach(m => addMember(m, 'ACTIVE_TECHNICAL_SQUAD.mekanik'));
teamData.ALUMNI_GENERATIONS.forEach(g => {
  if (g.leader) addMember(g.leader, `ALUMNI_${g.year}_leader`);
  if (g.managers) g.managers.forEach(m => addMember(m, `ALUMNI_${g.year}_manager`));
  if (g.divisions.program) g.divisions.program.forEach(m => addMember(m, `ALUMNI_${g.year}_program`));
  if (g.divisions.elektronik) g.divisions.elektronik.forEach(m => addMember(m, `ALUMNI_${g.year}_elektronik`));
  if (g.divisions.mekanik) g.divisions.mekanik.forEach(m => addMember(m, `ALUMNI_${g.year}_mekanik`));
  if (g.divisions.desain) g.divisions.desain.forEach(m => addMember(m, `ALUMNI_${g.year}_desain`));
  if (g.divisions.pembimbing) g.divisions.pembimbing.forEach(m => addMember(m, `ALUMNI_${g.year}_pembimbing`));
});

console.log('Total unique members extracted across all data structures:', allMembersMap.size);

const fields = [
  'id', 'name', 'nickname', 'nim', 'studyProgram', 'prodi', 'faculty',
  'division', 'divisionSlug', 'role', 'subRole', 'generation', 'generationYear',
  'yearsActive', 'specialization', 'skills', 'bio', 'quote', 'image', 'images',
  'photos', 'badge', 'leadershipEra', 'achievements', 'isLeader', 'isManager',
  'isActive', 'socials'
];

const auditResults = [];

for (const [id, { member, sources }] of allMembersMap.entries()) {
  const result = {
    id,
    name: member.name,
    nim: member.nim,
    division: member.division,
    studyProgram: member.studyProgram,
    faculty: member.faculty,
    role: member.role,
    subRole: member.subRole || '[MISSING]',
    quote: member.quote || '[MISSING]',
    imagesCount: (member.images || []).length,
    photosCount: (member.photos || []).length,
    socials: member.socials ? Object.keys(member.socials).join(', ') : '[NO_SOCIALS]',
    socialsDetail: member.socials || {},
    sources: sources.join(', ')
  };
  auditResults.push(result);
}

fs.writeFileSync('.agents/teamwork_preview_explorer_survey_2/audit_members.json', JSON.stringify(auditResults, null, 2));
console.log('Saved audit to .agents/teamwork_preview_explorer_survey_2/audit_members.json');
