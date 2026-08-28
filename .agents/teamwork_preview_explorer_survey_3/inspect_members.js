const fs = require("fs");
const members = JSON.parse(fs.readFileSync(".agents/teamwork_preview_explorer_survey_3/parsed_members.json", "utf8"));

console.log("=== ALL PARSED MEMBERS ===");
members.forEach((m, idx) => {
  console.log(`${idx+1}. ID: ${m.id.padEnd(25)} | Name: ${m.name.padEnd(35)} | NIM: ${m.nim.padEnd(25)} | Prodi: ${m.prodi || m.studyProgram}`);
});
