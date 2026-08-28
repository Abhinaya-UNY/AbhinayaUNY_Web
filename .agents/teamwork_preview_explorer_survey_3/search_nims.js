const fs = require("fs");
const path = require("path");

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    if (isDirectory) {
      if (!dirPath.includes("node_modules") && !dirPath.includes(".git") && !dirPath.includes(".next")) {
        walkDir(dirPath, callback);
      }
    } else {
      callback(dirPath);
    }
  });
}

const nimPattern = /\b(1[789]\d{9}|2[0-5]\d{9})\b/g;
const findings = {};

walkDir(".", (filePath) => {
  if (filePath.endsWith(".ts") || filePath.endsWith(".tsx") || filePath.endsWith(".md") || filePath.endsWith(".json")) {
    const text = fs.readFileSync(filePath, "utf8");
    const matches = text.match(nimPattern);
    if (matches) {
      matches.forEach(nim => {
        if (!findings[nim]) findings[nim] = new Set();
        findings[nim].add(filePath);
      });
    }
  }
});

console.log("=== UNIQUE NIMs FOUND IN CODEBASE ===");
Object.keys(findings).sort().forEach(nim => {
  console.log(`${nim}: in ${Array.from(findings[nim]).join(", ")}`);
});
