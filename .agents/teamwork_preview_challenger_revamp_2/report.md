# Empirical Challenge Report — Challenger 2
**Mission**: Static Build, Export Integrity & Code-Level Visual Audit  
**Date**: 2026-09-05  
**Verdict**: **REJECT**  

---

## 1. Executive Summary

| Verification Target | Expected | Observed | Status |
|---------------------|----------|----------|--------|
| `npm.cmd run build` | Exit code 0, clean export | Exit code 1 (ENOENT / Next.js export build ID failure) | **FAIL** |
| Static Export Pages (11/11) | 11 static pages generated in `out/` including `500.html` | Build aborts; `500.html` missing at root of `out/` (only `500/index.html` created in partial run); static files deleted/incomplete | **FAIL** |
| Base Path Compliance (`/AbhinayaUNY_Web`) | All `<img src>`, `<a href>`, `<script>`, `<link>` resolve to valid disk files under `/AbhinayaUNY_Web` | `python scripts/test_empirical_html_output.py` fails: `out/assets/logo_abhinaya.png` missing from static export | **FAIL** |
| Visual Audit: `AboutTeamSection.tsx` | Zero text/badges covering faces | Decoupled 3-part layout (Top Meta Bar, Pristine Viewport, Bottom Story Card) | **PASS** |
| Visual Audit: `HeroSection.tsx` | Zero text/badges covering faces | Decoupled header zone, unblocked 16:9 photo stage, bottom metadata strip | **PASS** |
| Visual Audit: `InstagramFeedShowcase.tsx` | Zero text/badges covering faces | Header bar above photo, clean square canvas, bottom caption/details | **PASS** |
| Visual Audit: `DocumentationGallerySection.tsx` | Zero text/badges covering faces | Pristine 4:3 photo viewport, all badges & descriptions below photo | **PASS** |
| Visual Audit: `TeamRosterSection.tsx` | Zero text/badges covering faces; responsive grid | Division badges moved to top strip above headshot; responsive CSS grid (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`) | **PASS** |
| Automated E2E Test Suite | 57/57 E2E tests passing | 57/57 E2E tests pass (`node tests/e2e/run_all.js`) and 55/55 Python tests pass (`python scripts/test_e2e_suite.py`) | **PASS** |

---

## 2. Empirical Verification Findings

### Finding 1: Production Build Fails with Exit Code 1 (CRITICAL)

#### Observation
Multiple direct executions of `npm.cmd run build` repeatedly failed with exit code 1.

**Failure Mode A (Next Export Build ID missing):**
```
> abhinaya-uny-web@1.0.0 build
> next build

  ▲ Next.js 14.2.35

   Creating an optimized production build ...
 ✓ Compiled successfully
   Linting and checking validity of types ...
   Collecting page data ...
   Generating static pages (0/11) ...
   Generating static pages (2/11) 
   Generating static pages (5/11) 
   Generating static pages (8/11) 
 ✓ Generating static pages (11/11)
   Finalizing page optimization ...
   Collecting build traces ...

> Could not find a production build in the 'D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web\.next' directory. Try building your app with 'next build' before starting the static export. https://nextjs.org/docs/messages/next-export-no-build-id
```

**Failure Mode B (ENOENT during export cleanup of pages/500.js):**
```
Error: ENOENT: no such file or directory, unlink 'D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web\.next\server\pages\500.js'
    at async Object.unlink (node:internal/fs/promises:1064:10)
    at async D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web\node_modules\next\dist\build\index.js:1713:25
```

**Failure Mode C (ENOENT during manifest read):**
```
Error: ENOENT: no such file or directory, open 'D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web\.next\build-manifest.json'
    at async open (node:internal/fs/promises:638:25)
    at async Object.readFile (node:internal/fs/promises:1242:14)
    at async readManifest (D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web\node_modules\next\dist\build\index.js:165:23)
    at async D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web\node_modules\next\dist\build\index.js:1044:35
```

#### Root Cause Analysis
1. `pages/500.tsx` was introduced in an attempt to bypass a Next.js trailing slash export issue, but Next.js App Router + Pages Router hybrid static export on Windows attempts to delete `.next/server/pages/500.js` at line 1713 of `node_modules/next/dist/build/index.js`. Because `pages/500.tsx` is prerendered directly to HTML, `500.js` does not exist, causing Next.js to crash with unhandled ENOENT.
2. In other build runs, `output: 'export'` in `next.config.js` triggers static export before or during `.next` finalization, resulting in `next-export-no-build-id`.

---

### Finding 2: Static Export Missing `500.html` and Broken Asset References (HIGH)

#### Observation
1. Inspection of `out/` shows that `500.html` is not generated at the root of `out/`. Only `out/500/index.html` was generated during the partial export attempt.
2. Running `python scripts/test_empirical_html_output.py` fails with:
```
Traceback (most recent call last):
  File "D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web\scripts\test_empirical_html_output.py", line 268, in <module>
    run_all_empirical_tests()
  File "D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web\scripts\test_empirical_html_output.py", line 253, in run_all_empirical_tests
    assets = test_static_asset_paths_and_basepath()
  File "D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web\scripts\test_empirical_html_output.py", line 188, in test_static_asset_paths_and_basepath
    assert len(broken_assets) == 0, f"Found {len(broken_assets)} broken asset references: {broken_assets[:5]}"
AssertionError: Found 3 broken asset references: [{'source_html': 'krtmi\\index.html', 'asset_src': '/AbhinayaUNY_Web/assets/logo_abhinaya.png', 'expected_disk_path': 'D:\\Data_Lokal\\Kuliah\\Tri Wahyu (22518241023)\\AbhinayaUNY_Web\\out\\assets\\logo_abhinaya.png'}]
```
3. `public/assets/logo_abhinaya.png` exists in the repository, but due to build failures or incomplete export copying, `out/assets/logo_abhinaya.png` was missing on disk in `out/`.

---

### Finding 3: Code-Level Visual Audit of 5 Showcase Components (PASSED)

Detailed line-by-line inspection confirms that the workers successfully unblocked all photos:

1. **`components/AboutTeamSection.tsx`**:
   - Lines 30-45: Metadata header bar (`KONTINGEN RESMI KRTMI 2024`, `Edutorium UMS Surakarta`) is placed cleanly ABOVE the photo.
   - Lines 48-54: Pristine photo viewport (`aspect-[16/10] sm:aspect-[16/9]`) contains only the `<img>` tag with `brightness-100 contrast-105`. Zero overlay text, zero badges, zero dark gradient overlays.
   - Lines 57-75: Caption and narrative card are placed strictly BELOW the photo.
   - Lines 109-130: Laboratory collage photos are framed cleanly with no text blocking faces or robots.

2. **`components/HeroSection.tsx`**:
   - Lines 31-106: All titles, subtitles, category badges, and action buttons are housed in a dedicated top header zone.
   - Lines 108-129: Framed cinematic team showcase (`aspect-[16/10] sm:aspect-[16/9]`) displays `hero_abhinaya.jpg` without any gradient overlay or floating badges over faces.
   - Lines 119-127: Metadata strip is positioned below the photo with `border-t border-emerald-950/70`.

3. **`components/InstagramFeedShowcase.tsx`**:
   - Lines 166-187: Account badge (`@abhinaya.uny`), category pill, and multi-photo count are in a dedicated card header bar ABOVE the image.
   - Lines 189-209: Pristine square photo canvas. Zero dark gradient and zero text covering faces. The only overlay is an expand icon in the bottom-right corner that is hidden by default (`opacity-0`) and only appears on hover.
   - Lines 212-225: Slide indicator strip is located below the photo canvas.
   - Lines 227-259: Caption, date, and navigation are housed below the photo.
   - Lines 286-335: Lightbox modal cleanly separates the photo carousel into the left column and metadata/caption into the right column.

4. **`components/DocumentationGallerySection.tsx`**:
   - Lines 68-75: Pristine photo viewport with natural 4:3 aspect ratio (`aspect-[4/3] w-full overflow-hidden bg-black`). Zero overlay badges or text covering the photo.
   - Lines 77-105: Category badge, year badge, title, and caption are placed in the card body below the photo.
   - Lines 129-153: Modal presents the photo with `object-contain` and all text details below it.

5. **`components/TeamRosterSection.tsx`**:
   - Lines 562-592: Division badge, era badge, and photo count are positioned in the card top header bar ABOVE the headshot photo.
   - Lines 594-608: Member headshot viewport (`aspect-[4/3] sm:aspect-square`) is 100% unblocked with zero badges over the face.
   - Lines 162-245: `MemberPhotoFadeShowcase` has 0% dark gradient haze over faces.
   - Lines 914, 968, 1043: Responsive CSS grid (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`) is properly implemented, passing test T4-03.

---

## 3. Verdict & Recommended Remediation

### Verdict: **REJECT**
While the visual layout unblocking, copywriting revamp, and E2E unit test suites pass, the core deployment requirement (`npm.cmd run build` exiting with code 0 with 11/11 static pages generated in `out/`) is currently broken.

### Required Actions for Worker/Orchestrator:
1. Fix the `next build` failure by addressing the `pages/500.tsx` static export bug (e.g. migrate 500 error handling to App Router `app/global-error.tsx` / `app/not-found.tsx`, or supply `export async function getStaticProps() { return { props: {} }; }` in `pages/500.tsx`, or investigate Next.js 14 `output: 'export'` trailing slash handling).
2. Ensure `out/500.html` is generated at the root of `out/` as requested in the acceptance criteria.
3. Ensure all static assets in `public/assets/` (specifically `logo_abhinaya.png`) are reliably copied to `out/assets/` so that `python scripts/test_empirical_html_output.py` passes with 0 broken asset references.
4. Re-run `npm.cmd run build` and verify that it exits with code 0 cleanly.
