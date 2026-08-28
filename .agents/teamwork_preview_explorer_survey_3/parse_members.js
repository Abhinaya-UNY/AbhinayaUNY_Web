const fs = require("fs");
const file = "data/teamData.ts";
const content = fs.readFileSync(file, "utf8");

function extractField(block, field) {
  const m = block.match(new RegExp(field + ":\\s*['\"`]([\\s\\S]*?)['\"`]"));
  return m ? m[1] : "";
}

const rawBlocks = content.split(/id:\s*['"]/);
console.log("Found raw blocks:", rawBlocks.length - 1);

const results = [];
for (let i = 1; i < rawBlocks.length; i++) {
  const block = "id: '" + rawBlocks[i];
  const idMatch = block.match(/^id:\s*['"]([^'"]+)['"]/);
  const id = idMatch ? idMatch[1] : "unknown";
  const name = extractField(block, "name");
  const nim = extractField(block, "nim");
  const studyProgram = extractField(block, "studyProgram");
  const prodi = extractField(block, "prodi");
  const faculty = extractField(block, "faculty");
  const division = extractField(block, "division");
  const role = extractField(block, "role");
  const generation = extractField(block, "generation");
  const badge = extractField(block, "badge");
  const image = extractField(block, "image");
  
  if (name) {
    results.push({ id, name, nim, studyProgram, prodi, faculty, division, role, generation, badge, image });
  }
}

console.log("Parsed members count:", results.length);
fs.writeFileSync(".agents/teamwork_preview_explorer_survey_3/parsed_members.json", JSON.stringify(results, null, 2));
console.log("Wrote parsed_members.json");
