const fs = require("fs");

const file = "data/teamData.ts";
const content = fs.readFileSync(file, "utf8");

// Parse all objects inside DOSEN_PEMBIMBING_LIST, ACTIVE_LEADERS_LIST, ACTIVE_MANAGERS_LIST, ACTIVE_TECHNICAL_SQUAD, GENERATION_ARCHIVES, etc.
// Let us inspect the actual structures in data/teamData.ts

console.log("File length:", content.length);

// Let us find all occurrences of { ... id: '...', name: '...' }
const regex = /{\s*id:\s*['"]([^'"]+)['"][\s\S]*?name:\s*['"]([^'"]+)['"][\s\S]*?nim:\s*['"]([^'"]+)['"][\s\S]*?(?:studyProgram|prodi):\s*['"]([^'"]+)['"][\s\S]*?faculty:\s*['"]([^'"]+)['"]/g;

let match;
const allMembers = [];
while ((match = regex.exec(content)) !== null) {
  allMembers.push({
    id: match[1],
    name: match[2],
    nim: match[3],
    prodi: match[4],
    faculty: match[5]
  });
}

console.log("Matched members with regex:", allMembers.length);
allMembers.forEach((m, idx) => {
  console.log(`${idx + 1}. [${m.id}] ${m.name} | NIM: ${m.nim} | Prodi: ${m.prodi} | Fac: ${m.faculty}`);
});
