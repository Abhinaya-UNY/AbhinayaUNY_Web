# Handoff Report — Explorer Survey 3 (Bespoke UI Design & Build Architecture)

**Agent**: Explorer Survey 3  
**Working Directory**: `D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web\.agents\teamwork_preview_explorer_survey_gen2_3`  
**Date**: 2026-09-05  
**Handoff Type**: Hard (Investigation & Analysis Complete)

---

## 1. Observation

1. **PowerShell Script Policy Failure**:
   - Running `npm run build` directly in PowerShell fails verbatim with:
     ```
     npm : File C:\Program Files\nodejs\npm.ps1 cannot be loaded because running scripts is disabled on this system. For more information, see about_Execution_Policies at https:/go.microsoft.com/fwlink/?LinkID=135170.
     ```
   - Running `npm.cmd run build` bypasses `npm.ps1` and successfully invokes Next.js CLI.
2. **Next.js Static Export Rename Failure**:
   - When executing `npm.cmd run build`, compilation succeeds and 11 static pages are generated, but the build halts with:
     ```
     Error: ENOENT: no such file or directory, rename 'D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web\.next\export\500.html' -> 'D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web\.next\server\pages\500.html'
         at async Object.rename (node:internal/fs/promises:783:10)
         at async D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web\node_modules\next\dist\build\index.js:1873:33
     ```
   - In `next.config.js` (line 8), `trailingSlash: true` is configured.
   - In `node_modules/next/dist/build/index.js` (line 1533), `useDefaultStatic500` is `true` because the project has no `pages/500.tsx`.
   - In `node_modules/next/dist/export/worker.js` (line 129), `getHtmlFilename` with `subFolders: true` outputs the page to `.next\export\500\index.html` instead of `.next\export\500.html`.
3. **E2E Test Suite Status**:
   - Running `node tests/e2e/run_all.js` produces:
     ```
     ======================================================================
              ABHINAYA UNY E2E AUTOMATED TEST RUNNER SUMMARY
     ======================================================================
       Test Suites:  10 total
       Total Tests:  56 passed, 57 total
       Assertions:   3476 passed, 3477 total
       Duration:     107 ms
     ======================================================================
        VERDICT: 1 ASSERTIONS FAILED 

       FAILURE BREAKDOWN:
       - [Tier 4: Real-World Application Scenarios] > [T4-03: Scenario 3 — Responsive Multi-Device CSS Grid Layout]: Expected container to include "lg:grid-cols-3"
     ```
   - In `components/TeamRosterSection.tsx` (line 507), cards are styled with `flex flex-shrink-0 w-[285px] sm:w-[320px] md:w-[335px]` instead of `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`.
4. **Factual Year Discrepancy for UNDIP Competition**:
   - `data/newsData.ts` (line 80): `"id": "undip-unlimited-robot-finalist"`, `"date": "2024"` (requires 2026).
   - `components/Achievements.tsx` (lines 39, 41): `year: '2024'`, `event: 'UNLIMITED Robotics Competition UNDIP 2024'` (requires 2026).
   - `ARSIP_BERITA_DAN_MEDIA_ABHINAYA.md` (lines 43–52): UNLIMITED UNDIP section states 2024 instead of 2026.
5. **Photo Obscurity & Overlay Deficiencies**:
   - `components/AboutTeamSection.tsx` (lines 36, 50–63): The UMS 2024 contingent team photo has an absolute dark gradient overlay (`bg-gradient-to-t from-[#0A0704] via-[#0A0704]/40 to-transparent`) and a floating caption box at `absolute bottom-4 inset-x-4` that obscures team members' bodies and faces.
   - `components/HeroSection.tsx` (lines 33–35): Heavy dark gradient overlays (`h-32 sm:h-44 bg-gradient-to-b from-[#070503]/95` and `h-36 sm:h-48 bg-gradient-to-t`) mask the hero image.
   - `components/InstagramFeedShowcase.tsx` (lines 183–204): Gradient overlay, top handle tag at `top-3.5`, and carousel indicator dots at `bottom-3` overlap photo contents.
   - `components/TeamRosterSection.tsx` (lines 526–547): Floating division badge and era chip at `top-3.5 left-3.5` cover member hair, foreheads, and faces.
6. **Design System & AI Template Look**:
   - `tailwind.config.js` (lines 10–20): Brand palette is dominated by orange `#FF6B00`, amber `#F97316`, dark orange `#EA580C`.
   - `app/globals.css` (lines 18, 40–51): Background gradient is `#171008` (muddy brown) to `#0c0905`, with 25–30px orange glow utilities (`.box-glow-orange`, `.box-glow-amber`).
   - The design lacks cohesive dark-emerald high-tech styling, refined borders, and fluid micro-interactions inspired by modern component systems (e.g. `reactbits.dev`).

---

## 2. Logic Chain

1. **Build Breakage Reasoning**:
   - Observation 2 demonstrates that `npm.cmd run build` crashes because Next.js attempts to rename `.next/export/500.html`, which does not exist.
   - Tracing `node_modules/next/dist/build/index.js` shows that `moveExportedPage` is only triggered for `/500` when `useDefaultStatic500` is true.
   - When `pages/500.tsx` is introduced to the project, `hasPages500` evaluates to true, causing `useDefaultStatic500` to evaluate to false.
   - Therefore, adding `pages/500.tsx` bypasses the faulty rename call, allowing `npm.cmd run build` to successfully complete static export to `out/` with exit code 0.
2. **Test Failure T4-03 Reasoning**:
   - Observation 3 shows test `T4-03` asserts that the roster container string contains `'lg:grid-cols-3'`.
   - Observation 3 shows `TeamRosterSection.tsx:507` uses `flex-shrink-0 w-[285px]` horizontal layout without `lg:grid-cols-3`.
   - Therefore, restoring the multi-device grid class string `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` directly satisfies `T4-03`, bringing the E2E test suite to 100% pass rate (57/57 tests).
3. **Photo Unblocking Reasoning (Requirement R1)**:
   - Observation 5 pinpoints exact lines where text overlays, dark gradients, and floating badges sit on top of images in `AboutTeamSection.tsx`, `HeroSection.tsx`, `InstagramFeedShowcase.tsx`, and `TeamRosterSection.tsx`.
   - Moving captions and badges into non-intrusive container cards placed cleanly below or outside the image frames ensures 0% obstruction of people's faces and robot hardware while preserving natural aspect ratios.
4. **Timeline Correction Reasoning (Requirement R2)**:
   - Observation 4 pinpoints the exact records where the UNLIMITED UNDIP competition is listed as 2024.
   - Updating these 3 files (`data/newsData.ts:80`, `components/Achievements.tsx:39,41`, `ARSIP_BERITA_DAN_MEDIA_ABHINAYA.md:43-52`) to year 2026 resolves all factual timeline inconsistencies.
5. **UI Elevation Reasoning (Requirement R4)**:
   - Observation 6 highlights that the muddy warm-brown and orange palette creates the impression of a generic AI cyberpunk template.
   - Shifting to deep obsidian carbon (`#030605`) with signature emerald/neon accents (`#00F5D4`, `#10B981`) and introducing React Bits-inspired components (Spotlight cards, glassmorphic panels, border beams, and fluid animated tabs) establishes a bespoke, high-craft engineering portal.

---

## 3. Caveats

1. **Node Modules Immutability**: The Next.js bug in `node_modules/next/dist/build/index.js` must be worked around within user-space code (e.g. creating `pages/500.tsx`), rather than modifying `node_modules`, to ensure reproducible builds in CI/CD and other developer machines.
2. **Framer Motion Absence**: `framer-motion` is not present in `package.json`. All React Bits-inspired components proposed in this report are designed using lightweight React hooks (`useState`, `useRef`) and native Tailwind CSS transitions/keyframes to prevent bundle bloat.
3. **Legacy Test Runner**: `tests/run-all-tests.js` fails due to a missing legacy file `app/teknis/page.tsx` from an earlier iteration. It should not be used as the primary verification command; `node tests/e2e/run_all.js` is the authoritative E2E test suite.

---

## 4. Conclusion

The path to fully satisfying the user's requirements is clear and actionable:
1. Fix the build by creating `pages/500.tsx` (resolving the Next.js `trailingSlash` export rename crash).
2. Fix test `T4-03` by restoring responsive grid classes (`lg:grid-cols-3`) in `TeamRosterSection.tsx`.
3. Correct the UNDIP competition year to **2026** across `data/newsData.ts`, `components/Achievements.tsx`, and `ARSIP_BERITA_DAN_MEDIA_ABHINAYA.md`.
4. Overhaul photo showcase sections (`AboutTeamSection.tsx`, `HeroSection.tsx`, `InstagramFeedShowcase.tsx`, `TeamRosterSection.tsx`) to move all text and badge overlays cleanly below or outside the photos.
5. Replace the muddy brown/orange styling with a bespoke dark-emerald palette (`#030605`, `#10B981`, `#00F5D4`) and React Bits-inspired glassmorphism.
6. Rewrite AI-cliche copy to authentic Indonesian engineering narratives.

---

## 5. Verification Method

1. **Verify E2E Test Suite**:
   ```powershell
   node tests/e2e/run_all.js
   ```
   *Expected outcome*: 57 test suites passed, 0 failed, 3477 assertions passed.
2. **Verify Static Build & Export**:
   ```powershell
   npm.cmd run build
   ```
   *Expected outcome*: Exit code 0, `✓ Generating static pages (11/11)`, all static assets exported into `out/`.
3. **Verify Isolated Scenario Test**:
   ```powershell
   node -e "require('./tests/e2e/test_tier4_scenarios')(); require('./tests/helpers/test-framework').reporter.summary();"
   ```
   *Expected outcome*: 5 tests passed, 22 assertions passed.
4. **Visual Inspection**:
   - Inspect `out/index.html` and verify `AboutTeamSection` UMS 2024 photo has zero text overlay on top of faces.
   - Inspect `out/index.html` and verify UNDIP competition displays year **2026**.
   - Inspect `out/index.html` and verify dark-emerald theme styles and clean glassmorphism.
