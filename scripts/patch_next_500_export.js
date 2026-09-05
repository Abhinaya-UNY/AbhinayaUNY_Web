/**
 * Patch for Next.js 14 App Router 500 Error Page Static Export
 * 
 * Issue: When pages/ directory is removed and app/500/page.tsx is used, Next.js 14.2
 * internally sets useDefaultStatic500 = true and attempts to rename
 * .next/export/500.html to .next/server/pages/500.html.
 * However, because /500 is an App Router route, it exports to server/app/500,
 * leaving .next/export/500.html non-existent, triggering an ENOENT crash.
 * 
 * This script ensures node_modules/next/dist/build/index.js safely checks
 * if orig exists before attempting the rename.
 */

const fs = require('fs');
const path = require('path');

const targetFile = path.resolve(__dirname, '../node_modules/next/dist/build/index.js');

if (!fs.existsSync(targetFile)) {
  console.log('[patch_next_500_export] node_modules/next not found, skipping patch.');
  process.exit(0);
}

let content = fs.readFileSync(targetFile, 'utf8');
let modified = false;

// Patch 1: Safely check if orig exists in moveExportedPage
const target1 = `if ((!i18n || additionalSsgFile) && !isNotFound) {
                                await _fs.promises.mkdir(_path.default.dirname(dest), {
                                    recursive: true
                                });
                                await _fs.promises.rename(orig, dest);
                            }`;

const replacement1 = `if ((!i18n || additionalSsgFile) && !isNotFound) {
                                if ((0, _fs.existsSync)(orig)) {
                                    await _fs.promises.mkdir(_path.default.dirname(dest), {
                                        recursive: true
                                    });
                                    await _fs.promises.rename(orig, dest);
                                }
                            }`;

if (content.includes(target1)) {
  content = content.replace(target1, replacement1);
  modified = true;
}

// Patch 2: Safely check if useDefaultStatic500 exported file exists
const target2 = `if (useDefaultStatic500) {
                        await moveExportedPage("/_error", "/500", "/500", false, "html");
                    }`;

const replacement2 = `if (useDefaultStatic500 && (0, _fs.existsSync)(_path.default.join(exportOptions.outdir, "500.html"))) {
                        await moveExportedPage("/_error", "/500", "/500", false, "html");
                    }`;

if (content.includes(target2)) {
  content = content.replace(target2, replacement2);
  modified = true;
}

if (modified) {
  fs.writeFileSync(targetFile, content, 'utf8');
  console.log('[patch_next_500_export] Successfully applied App Router 500 export safety patch.');
} else {
  console.log('[patch_next_500_export] Patch already applied or target code structure updated.');
}
