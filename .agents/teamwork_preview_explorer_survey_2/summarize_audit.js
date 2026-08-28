const fs = require('fs');

const audit = JSON.parse(fs.readFileSync('.agents/teamwork_preview_explorer_survey_2/audit_members.json', 'utf8'));

console.log('=== SUMMARY AUDIT TABLE ===');
console.log('Total entries:', audit.length);

console.log('\n--- Missing Quotes ---');
const missingQuotes = audit.filter(a => a.quote === '[MISSING]');
console.log(`Count: ${missingQuotes.length}`);
missingQuotes.forEach(m => console.log(`- ${m.id} (${m.name})`));

console.log('\n--- Missing SubRoles ---');
const missingSubRoles = audit.filter(a => a.subRole === '[MISSING]');
console.log(`Count: ${missingSubRoles.length}`);
missingSubRoles.forEach(m => console.log(`- ${m.id} (${m.name})`));

console.log('\n--- Socials Breakdown ---');
const noSocials = audit.filter(a => a.socials === '[NO_SOCIALS]');
console.log(`Count with NO socials: ${noSocials.length}`);
noSocials.forEach(m => console.log(`- ${m.id} (${m.name})`));

console.log('\n--- Generic LinkedIn placeholders ---');
const genericLinkedIn = audit.filter(a => a.socialsDetail && a.socialsDetail.linkedin === 'https://linkedin.com');
console.log(`Count: ${genericLinkedIn.length}`);
genericLinkedIn.forEach(m => console.log(`- ${m.id} (${m.name})`));

console.log('\n--- Generic Instagram placeholders ---');
const genericIG = audit.filter(a => a.socialsDetail && a.socialsDetail.instagram === 'https://instagram.com/abhinaya.uny');
console.log(`Count: ${genericIG.length}`);
genericIG.forEach(m => console.log(`- ${m.id} (${m.name})`));
