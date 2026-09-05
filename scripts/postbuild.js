/**
 * Postbuild Script for Abhinaya UNY Robotics Web
 * Ensures:
 * 1. out/500.html exists (copied from out/500/index.html for static hosting like GitHub Pages)
 * 2. out/404.html and out/404/index.html parity
 * 3. All public/ static assets (including public/assets/logo_abhinaya.png) are reliably mirrored to out/
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const OUT_DIR = path.join(ROOT_DIR, 'out');
const PUBLIC_DIR = path.join(ROOT_DIR, 'public');

console.log('\n[postbuild] Executing post-build export synchronization...');

if (!fs.existsSync(OUT_DIR)) {
  console.warn('[postbuild] Warning: out directory does not exist. Skipping postbuild.');
  process.exit(0);
}

// 1. Ensure 500.html exists
const out500Index = path.join(OUT_DIR, '500', 'index.html');
const out500Root = path.join(OUT_DIR, '500.html');

if (fs.existsSync(out500Index)) {
  fs.copyFileSync(out500Index, out500Root);
  console.log(`[postbuild] Synced out/500.html from ${out500Index} (${fs.statSync(out500Root).size} bytes)`);
} else if (fs.existsSync(out500Root)) {
  const out500Dir = path.join(OUT_DIR, '500');
  if (!fs.existsSync(out500Dir)) fs.mkdirSync(out500Dir, { recursive: true });
  fs.copyFileSync(out500Root, out500Index);
  console.log(`[postbuild] Synced out/500/index.html from ${out500Root}`);
}

// 2. Ensure 404 parity
const out404Root = path.join(OUT_DIR, '404.html');
const out404Index = path.join(OUT_DIR, '404', 'index.html');

if (fs.existsSync(out404Root) && !fs.existsSync(out404Index)) {
  const out404Dir = path.join(OUT_DIR, '404');
  if (!fs.existsSync(out404Dir)) fs.mkdirSync(out404Dir, { recursive: true });
  fs.copyFileSync(out404Root, out404Index);
  console.log(`[postbuild] Synced out/404/index.html from ${out404Root}`);
} else if (fs.existsSync(out404Index) && !fs.existsSync(out404Root)) {
  fs.copyFileSync(out404Index, out404Root);
  console.log(`[postbuild] Synced out/404.html from ${out404Index}`);
}

// 3. Mirror public/ directory into out/ if missing
function mirrorDir(srcDir, destDir) {
  if (!fs.existsSync(srcDir)) return 0;
  if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });

  let copied = 0;
  const entries = fs.readdirSync(srcDir, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(srcDir, entry.name);
    const destPath = path.join(destDir, entry.name);

    if (entry.isDirectory()) {
      copied += mirrorDir(srcPath, destPath);
    } else if (entry.isFile()) {
      if (!fs.existsSync(destPath)) {
        fs.copyFileSync(srcPath, destPath);
        copied++;
      }
    }
  }
  return copied;
}

const assetsMirrored = mirrorDir(PUBLIC_DIR, OUT_DIR);
console.log(`[postbuild] Public assets mirror check complete (missing assets copied: ${assetsMirrored})`);

// 4. Sanity check key files
const keyFiles = [
  path.join(OUT_DIR, 'index.html'),
  path.join(OUT_DIR, '404.html'),
  path.join(OUT_DIR, '500.html'),
  path.join(OUT_DIR, '500', 'index.html'),
  path.join(OUT_DIR, 'assets', 'logo_abhinaya.png')
];

let allKeysExist = true;
for (const kf of keyFiles) {
  const exists = fs.existsSync(kf);
  if (!exists) {
    console.error(`[postbuild] ❌ Missing expected file: ${path.relative(OUT_DIR, kf)}`);
    allKeysExist = false;
  } else {
    console.log(`[postbuild] ✓ Verified ${path.relative(OUT_DIR, kf)} (${fs.statSync(kf).size} bytes)`);
  }
}

if (!allKeysExist) {
  process.exit(1);
}

console.log('[postbuild] ✓ Postbuild export verification successfully completed.\n');
