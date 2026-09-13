const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '../..');
const scanDirs = ['components', 'app', 'data', 'public'];
const emRegex = /\u2014/;

const emList = [];

function scan(dir) {
  const fullDir = path.join(rootDir, dir);
  if (!fs.existsSync(fullDir)) return;
  for (const item of fs.readdirSync(fullDir, { withFileTypes: true })) {
    const full = path.join(fullDir, item.name);
    if (item.isDirectory()) {
      if (!['node_modules', '.next', '.git'].includes(item.name)) {
        scan(path.relative(rootDir, full));
      }
    } else if (/\.(tsx|ts|js|jsx|json|xml|html)$/.test(item.name)) {
      const content = fs.readFileSync(full, 'utf8');
      const lines = content.split(/\r?\n/);
      lines.forEach((line, idx) => {
        if (emRegex.test(line)) {
          emList.push({
            file: path.relative(rootDir, full).replace(/\\/g, '/'),
            line: idx + 1,
            content: line.trim()
          });
        }
      });
    }
  }
}

scanDirs.forEach(scan);

console.log(`Total em-dash occurrences: ${emList.length}`);

// Group by file
const grouped = {};
for (const item of emList) {
  if (!grouped[item.file]) grouped[item.file] = [];
  grouped[item.file].push(item);
}

fs.writeFileSync(
  path.join(__dirname, 'em_dashes_audit.json'),
  JSON.stringify(grouped, null, 2),
  'utf8'
);

console.log('Grouped files count:', Object.keys(grouped).length);
for (const [file, items] of Object.entries(grouped)) {
  console.log(`- ${file}: ${items.length} occurrences`);
}
