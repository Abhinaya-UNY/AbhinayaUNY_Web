const fs = require("fs");
const file = "data/teamData.ts";
const content = fs.readFileSync(file, "utf8");

// Extract LEADERS_HALL_OF_FAME or ACTIVE_LEADERS_LIST
const leadersMatch = content.match(/export const (?:ACTIVE_LEADERS_LIST|LEADERS_HALL_OF_FAME)[^=]*=\s*(\[[\s\S]*?\n\];)/);
if (leadersMatch) {
  console.log("Found Leaders list!");
  const lRegex = /year:\s*(\d+)[\s\S]*?name:\s*['"]([^'"]+)['"][\s\S]*?nim:\s*['"]([^'"]+)['"][\s\S]*?studyProgram:\s*['"]([^'"]+)['"]/g;
  let m;
  while ((m = lRegex.exec(leadersMatch[1])) !== null) {
    console.log(`LEADER ${m[1]}: ${m[2]} | NIM: ${m[3]} | Prodi: ${m[4]}`);
  }
}

// Extract MANAGERS_SHOWCASE or ACTIVE_MANAGERS_LIST
const managersMatch = content.match(/export const (?:ACTIVE_MANAGERS_LIST|MANAGERS_SHOWCASE)[^=]*=\s*(\[[\s\S]*?\n\];)/);
if (managersMatch) {
  console.log("\nFound Managers list!");
  const mRegex = /year:\s*(\d+)[\s\S]*?name:\s*['"]([^'"]+)['"][\s\S]*?nim:\s*['"]([^'"]+)['"][\s\S]*?studyProgram:\s*['"]([^'"]+)['"]/g;
  let m;
  while ((m = mRegex.exec(managersMatch[1])) !== null) {
    console.log(`MANAGER ${m[1]}: ${m[2]} | NIM: ${m[3]} | Prodi: ${m[4]}`);
  }
}
