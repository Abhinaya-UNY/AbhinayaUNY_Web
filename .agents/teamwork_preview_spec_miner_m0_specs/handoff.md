# Specification Mining & Test Suite Audit Report: Cyber Orange & Anti-Slop Elevation

**Agent**: teamwork_preview_spec_miner (Anti-Slop & Test Suite Spec Miner)  
**Date**: 2026-09-07  
**Working Directory**: `D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web\.agents\teamwork_preview_spec_miner_m0_specs`  
**Project Root**: `D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web`  

---

## Features Discovered

| # | Category | Feature | Description | Inputs | Outputs | Error Behavior | Discovered Via |
|---|----------|---------|-------------|--------|---------|----------------|----------------|
| 1 | Anti-Slop / Copywriting | Rule R-02: Zero Em Dashes (`—`) | Strictly zero em dashes in UI headlines, descriptions, badges, meta tags, and captions across all 11 static pages. Must be replaced with colons, commas, periods, or parentheses. | Raw HTML string / DOM text nodes | Clean text free of `\u2014` | Currently 332 em dashes exist across 9 exported HTML pages in `out/`. Zero automated check exists to enforce this. | `ORIGINAL_REQUEST.md` (§2026-09-07T02:45:16Z R1) & empirical regex scan of `out/*.html` |
| 2 | Anti-Slop / Visuals | Zero Unicode Emojis in UI Copy | All headings, badges, buttons, and descriptions must use SVG iconography (Lucide) rather than unicode emojis (🤖, 🏆, 🔥, etc.). | Exported HTML pages & React components | Zero emoji glyphs in UI text | Verified 0 unicode emojis currently in code/DOM; automated check needs adding to test harness. | `ORIGINAL_REQUEST.md` (§2026-09-07T02:45:16Z R1) & unicode range scan |
| 3 | Brand Palette / Styling | Cyber Orange & Warm Amber Primary Palette | Elevated palette: Cyber Orange (`#FF6B00`, `#FB923C`, `#EA580C`), Warm Amber (`#F59E0B`, `#FDE68A`), Deep Obsidian (`#0B0B0E`, `#121216`, `#18181B`). | Tailwind classes & inline CSS variables | Compiled CSS bundle & static DOM styling | `test_r2_managers.js`, `test_e2e_roster.py`, `test_empirical_html_output.js`, and `test_empirical_html_output.py` assert legacy emerald tokens (`#10B981`, `text-emerald-300`). | `ORIGINAL_REQUEST.md`, `tests/e2e/test_r2_managers.js:80-81`, `scripts/test_empirical_html_output.js:179` |
| 4 | Motion & Interaction | Preloader-Synchronized Kinetic Hero Entrance | Hero headline text animations (`BlurText`, `DecryptedText`, `ShinyText`) must delay execution until `Preloader` curtain finishes and dismisses. | Preloader dismissal event / delay timing (~1200ms) | Visibly animated text entrance on first load | Currently `BlurText` fires on mount via `IntersectionObserver`, running behind the opacity: 1 `z-[9999]` curtain before dismissal. | `ORIGINAL_REQUEST.md` (§2026-09-07T02:45:16Z R2), `components/HeroSection.tsx:66-78`, `components/Preloader.tsx:18-38` |
| 5 | Atmosphere / Background | Dynamic Organic Atmospheric Motion | Continuous, fluid organic drift via animated glowing orbs (`Aurora`) and interactive canvas dust without GPU overload or layout shifts. | Canvas delta time, CSS keyframes (`animate-aurora-drift-1`, `animate-aurora-drift-2`) | Smooth 60 FPS ambient background motion | Throttled frame interval, paused when off-screen via `IntersectionObserver` or under `prefers-reduced-motion`. | `ORIGINAL_REQUEST.md` (§2026-09-07T02:45:16Z R3), `components/animations/Aurora.tsx`, `scripts/test_reactbits_suite.js` |
| 6 | Layout & Structure | Dense Asymmetric 2-Column Split | 7:5 asymmetric desktop grid (`lg:grid-cols-12`: 7 cols text/CTA, 5 cols studio photo card + 2x2 telemetry dock) with zero awkward margins. | Viewport widths 390px to 1920px | Responsive, dense, unblocked layout with 0 horizontal overflow | Verified: photo stage 100% unblocked; needs automated responsive margin and layout checks. | `ORIGINAL_REQUEST.md` (§2026-09-07T02:45:16Z R4), `components/HeroSection.tsx:34-199`, `scripts/stress_test_edge_cases.js:297-300` |
| 7 | Data Ground Truth | Authentic PDDikti NIM Schema & Integrity | 100% verified 11-digit UNY NIM schema for all 35 members across 2020-2025. Farhan Yuda Mahendra authentic NIM is `22518244007` (never `22518241040`). Zelfa Nafisah Zalna `23030730048` (FMIPA). Hisyam Yasid Pratowo `24090620010` (FV). | `data/teamData.ts`, `STRUKTUR_TIM_ABHINAYA.md`, `ARSIP_ANALISIS_FOTO_DAN_DATA_ANGGOTA.md` | Match across all files & university schemas | Fails if dummy strings or stale placeholder `22518241040` detected. | `scripts/test_challenger1_nim_faculty_oracle.py:60-308`, `tests/e2e/test_r3_technical_squad.js:61-75` |
| 8 | Tournament Archives | UNLIMITED UNDIP 2026 Timeline Invariant | All historical records, news articles, and achievement badges for UNLIMITED UNDIP Robotics Competition must cite **2026** (never 2025). | `data/newsData.ts`, `components/Achievements.tsx` | Validated '2026' date string | Stale references to 'UNLIMITED UNDIP 2025' or 'UNLIMITED Robotics Competition UNDIP 2025' cause hard test failure. | `scripts/stress_test_edge_cases.js:272-282`, `data/newsData.ts:76-90`, `components/Achievements.tsx:9-16` |
| 9 | Static Export Readiness | 11 Static Export Targets Integrity | Next.js SSG build exports 11 verified static targets (`index.html`, `divisi/index.html`, `prestasi/index.html`, `krtmi/index.html`, `pertandingan/index.html`, `404.html`, `404/index.html`, `500.html`, `500/index.html`, `apple-icon.png`, `icon.png`). | Next.js export bundle in `out/` | All targets exist and exceed 500 bytes | Fails if any HTML file is missing or suspiciously truncated (< 500 B). | `scripts/verify_11_static_pages.js`, `scripts/test_empirical_html_output.js:24-40`, `scripts/test_empirical_html_output.py:41-59` |

---

## Edge Cases

| # | Feature | Input | Observed Behavior |
|---|---------|-------|-------------------|
| 1 | Em Dash Anti-Slop Audit | `out/**/*.html` scan | 332 em dashes (`—` / `\u2014`) found across 9 HTML files (e.g. `og:title`, `og:description`, `title`, `<header>`, `<footer>`, `krtmiData.ts`, `instagramFeedData.ts`). |
| 2 | Unicode Emoji Audit | Unicode ranges `\U0001F300-\U0001FAFF`, `\u2700-\u27BF`, `\u2600-\u26FF` | 0 unicode emojis detected across source files and static DOM. All icons are Lucide SVG. |
| 3 | Color Token Assertion (Managers) | Replacing `#10B981` / `text-emerald-300` in `data/teamData.ts` with Amber/Orange | `tests/e2e/test_r2_managers.js` (line 80-81) and `scripts/test_e2e_roster.py` (line 217-218) will immediately FAIL if strict equality is enforced without updating assertions. |
| 4 | CSS Utility Class Check | Compiled CSS bundle without `text-emerald-300` | `scripts/test_empirical_html_output.js` (line 179) and `scripts/test_empirical_html_output.py` (line 202) fail if `text-emerald-300` is removed from CSS bundle unless tests are updated. |
| 5 | Hero Text Reveal vs Preloader | First-time visitor (empty `sessionStorage`) | Preloader renders for ~1200ms. `BlurText` starts after 60ms delay on mount; animation finishes behind preloader curtain. User sees static text when preloader dismisses. |
| 6 | Hero Text Reveal on Navigation | Returning visitor (`sessionStorage.getItem('abhinaya_preloader_loaded') === 'true'`) | Preloader is immediately bypassed (`isLoaded: true`). `BlurText` animation is visible upon page load. |
| 7 | Reduced Motion Setting | `prefers-reduced-motion: reduce` | `BlurText`, `ShinyText`, `Aurora`, `CountUp`, `InteractiveCanvasDust`, `TiltedCard`, and `Magnet` all cleanly bypass animations, setting opacity: 1 and transform: none with 0ms transition. |
| 8 | Empty/Adversarial Roster Search | Search strings `""`, `"   "`, `".*"`, `' OR '1'='1`, `zzzz_nonexistent_xyz_999` | Roster gracefully filters without crashing. Empty query returns 100% of members; nonexistent query shows empty state with "Reset Pencarian" button. |

---

# 5-Component Handoff Report

## 1. Observation

Direct examination of the project repository, test suites, and source files revealed the following exact facts:

### A. Existing Test Suites & Current Status
1. **`tests/e2e/run_all.js`** (runs 10 suites across 5 tiers):
   - Exit code: `0` (57 tests passed, 3,477 assertions passed).
   - In `tests/e2e/test_r2_managers.js`:
     - Line 74: `test('R2M-05: Dedicated emerald/teal theme styling for Managers Showcase', () => { ... })`
     - Line 80: `expect(teamDataContent).toContain('#10B981'); // Emerald accent`
     - Line 81: `expect(teamDataContent).toContain('text-emerald-300');`
   - In `tests/e2e/test_r5_crossfade_engine.js`:
     - Line 41: `expect(rosterContent).toContain('bg-brand-orange');`
     - Line 42: `expect(rosterContent).toContain('shadow-[0_0_10px_rgba(255,107,0,0.9)]');`
2. **`scripts/test_empirical_html_output.js`**:
   - Exit code: `0` (9 suites, 57 assertions passed).
   - Line 178-181:
     ```javascript
     const requiredClasses = [
       'bg-brand-orange', 'text-brand-orange', 'text-amber-300', 'text-emerald-300',
       'grid-cols-1', 'duration-1000'
     ];
     ```
     Tests `text-emerald-300` in compiled CSS bundle `out/_next/static/css/*.css`.
3. **`scripts/test_empirical_html_output.py`**:
   - Exit code: `0` (All 7 test groups passed).
   - Line 201-204:
     ```python
     key_classes = [
         'bg-brand-orange', 'text-brand-orange', 'text-amber-300', 'text-emerald-300',
         'grid-cols-1', 'sm:grid-cols-2', 'lg:grid-cols-3', 'duration-1000'
     ]
     ```
     Also asserts `text-emerald-300` in compiled CSS.
4. **`scripts/test_reactbits_suite.js`**:
   - Exit code: `0` (46 assertions passed).
   - Lines 102, 113, 134, 163: Already supports both Emerald and Cyber Orange (`'text-emerald-400' || 'text-orange-400'`, `'emerald' || 'orange' || 'FED7AA' || 'FB923C'`, `'16, 185, 129' || '255, 107, 0'`, `'emerald-500' || 'orange-500'`).
5. **`scripts/stress_test_edge_cases.js`**:
   - Exit code: `0` (22 tests passed).
   - Lines 272-282: Strictly verifies UNLIMITED UNDIP 2026 in `data/newsData.ts` and `components/Achievements.tsx`.
   - Lines 304-307: Supports warm amber/carbon `bg-[#180F09]` and `border-[#2A180E]`.
6. **`scripts/test_challenger1_nim_faculty_oracle.py`**:
   - Exit code: `0` (4/4 tests passed).
   - 34 student NIMs + 2 advisor NIPs verified against authentic UNY PDDikti format.
   - Farhan Yuda Mahendra NIM is verified as `22518244007` (NOT `22518241040`).
7. **`scripts/verify_11_static_pages.js`**:
   - Exit code: `0` (11/11 targets confirmed > 500 bytes).

### B. Anti-Slop Audit Findings
- **Em dashes (`—` / `\u2014`)**: Exactly **332 instances** exist across 9 exported HTML files in `out/`:
  - `out/index.html`: 47
  - `out/divisi/index.html`: 46
  - `out/krtmi/index.html`: 75
  - `out/pertandingan/index.html`: 29
  - `out/prestasi/index.html`: 27
  - `out/404.html` & `out/404/index.html`: 27 each
  - `out/500.html` & `out/500/index.html`: 27 each
- **Unicode Emojis**: **0 instances** found across all source code and HTML files.
- **Automated Anti-Slop Testing**: Currently **0 automated tests exist** in any test runner checking for em dashes or unicode emojis.

### C. Hero Entrance Animation Timing
- In `components/Preloader.tsx`: Preloader runs for ~1200ms on first load (`opacity: 1`, `z-[9999]`).
- In `components/HeroSection.tsx`: `BlurText` starts immediately on mount (`delay={60}`) because `IntersectionObserver` triggers immediately for the hero.
- Consequence: The entrance animation executes and finishes behind the preloader curtain, so first-time users miss the animation entirely.

---

## 2. Logic Chain

1. **Color Token Compatibility & Elevation**:
   - The user request (§2026-09-07T02:45:16Z R4) specifies: *"Verify 100% Cyber Orange (`#FF6B00`, `#FB923C`, `#EA580C`) and Warm Amber accenting across all glowing borders, highlights, badges, and text."*
   - In `data/teamData.ts`, `DIVISION_BADGES` currently maps `Manager` to `accent: '#10B981'`, `bg: 'bg-emerald-950/40'`, `text: 'text-emerald-300'`, `border: 'border-emerald-500/40'`.
   - If the implementation elevates the Manager division badge to Warm Amber (`#F59E0B` / `text-amber-300`) or Cyber Orange (`#FF6B00` / `text-orange-300`), the following 4 tests will break:
     - `tests/e2e/test_r2_managers.js:80-81`
     - `scripts/test_e2e_roster.py:217-218`
     - `scripts/test_empirical_html_output.js:179`
     - `scripts/test_empirical_html_output.py:202`
   - Therefore, the test suites must be updated either to accept Cyber Orange/Amber or assert Cyber Orange/Amber explicitly.
   - Alternatively, if divisional color taxonomy (where divisions retain their dedicated sub-role colors: Program=cyan, Elektronik=blue, Mekanik=orange, Ketua=amber, Manager=emerald/teal) is maintained while global theme elements (Hero, buttons, glowing cards, navbar accents) use pure Cyber Orange, the tests will continue to pass without regression. However, the spec requirement explicitly calls for pure Orange & Warm Amber. The test harness should allow both or be aligned with the elevated Cyber Orange/Warm Amber palette.

2. **Anti-Slop Enforcement Architecture**:
   - The prompt requires: *"Automated anti-slop audit confirms zero em dashes ('—') and zero unicode emojis in UI copy."*
   - Because 332 em dashes currently exist in `out/`, any newly added anti-slop assertion will immediately fail until the source files are cleaned.
   - The source locations generating em dashes are:
     - `app/layout.tsx` (meta titles, og:title, og:description, twitter:title, twitter:description, schema.org JSON-LD description)
     - `app/500/page.tsx` & `app/not-found.tsx` & `app/prestasi/page.tsx` & `app/krtmi/page.tsx` & `app/divisi/page.tsx` (page metadata titles and body copy)
     - `components/Navbar.tsx` (`KRTMI — UKM Restek UNY`)
     - `components/AboutTeamSection.tsx`
     - `components/Footer.tsx` (`Tim Robotika Abhinaya — UKM Rekayasa Teknologi...`)
     - `data/krtmiData.ts` (competition titles, drop zone descriptions, pdfTitles)
     - `data/instagramFeedData.ts` (captions)
   - Replacing every `—` with `:`, `,`, `.`, or `(` `)` per Anti-Slop Rule R-02 and adding an automated test to `scripts/test_empirical_html_output.js` and `scripts/test_empirical_html_output.py` will guarantee zero regressions.

3. **Hero Entrance Synchronization**:
   - To make Hero text reveals visible after preloader dismissal (§R2), `HeroSection.tsx` must decouple its animation trigger from immediate initial mount.
   - Mechanism: `HeroSection` can listen for a `preloader-dismissed` event dispatched by `Preloader.tsx` (or read `sessionStorage.getItem('abhinaya_preloader_loaded')` and apply an initial delay of ~1200ms on first load, or 100ms for returning visits).
   - Test requirement: `scripts/stress_test_edge_cases.js` or `tests/e2e/` should assert that `HeroSection.tsx` coordinates with the preloader state and that kinetic primitives (`BlurText`, `DecryptedText`, `ShinyText`) are mounted with asymmetric layout classes (`lg:grid-cols-12`, `lg:col-span-7`, `lg:col-span-5`).

---

## 3. Caveats

1. **Scope of Specification Miner**: As a specification miner, this agent does NOT modify implementation files or test files. All findings, exact line numbers, and update specifications are documented here for the implementation and QA agents.
2. **Division Role Colors vs Global Brand Theme**: In `data/teamData.ts`, division badges distinguish roles (Ketua Tim=Amber, Program=Cyan, Elektronik=Blue, Mekanik=Orange, Manager=Emerald). If the orchestrator decides to keep division-specific role colors while elevating the global portal theme to 100% Cyber Orange/Warm Amber, `tests/e2e/test_r2_managers.js` will remain valid. If the orchestrator decides that Manager badges must also become Cyber Orange/Warm Amber, then `test_r2_managers.js`, `test_e2e_roster.py`, `test_empirical_html_output.js`, and `test_empirical_html_output.py` MUST be updated simultaneously.
3. **Instagram Feed Captions**: Some em dashes are located inside historical Instagram feed captions in `data/instagramFeedData.ts`. If these are included in exported HTML, they must also be sanitized (e.g. replaced with regular hyphens or commas) to achieve strict 0 em dashes in `out/*.html`.

---

## 4. Conclusion

1. **Color Tokens**: Legacy emerald assertions exist in 4 test files (`test_r2_managers.js:80-81`, `test_e2e_roster.py:217-218`, `test_empirical_html_output.js:179`, `test_empirical_html_output.py:202`). Updating the palette to strict Cyber Orange/Amber requires making these assertions accept Cyber Orange/Amber tokens (`#FF6B00`, `text-brand-orange`, `#F59E0B`, `text-amber-300`).
2. **Anti-Slop**: Currently 0 automated checks exist for anti-slop copy rules. 332 em dashes currently exist across all 9 exported HTML pages. An automated Anti-Slop Audit check must be added to `test_empirical_html_output.js` and `test_empirical_html_output.py` to assert 0 em dashes and 0 unicode emojis.
3. **PDDikti & UNDIP Ground Truth**: The existing fixtures in `scripts/test_challenger1_nim_faculty_oracle.py` (34 student NIMs + 2 advisor NIPs, Farhan Yuda `22518244007`) and `scripts/stress_test_edge_cases.js` (UNLIMITED UNDIP 2026) are 100% verified, robust, and must remain completely intact.
4. **Hero Entrance**: Hero entrance timing is currently decoupled from Preloader dismissal, resulting in invisible animations on first load. The implementation must synchronize Hero animation triggers with Preloader dismissal, and test suites must verify this coordination.

---

## 5. Verification Method

To verify these findings and test suite behaviors independently:

1. **Run All 6 Primary Test Suites (currently passing 100%)**:
   ```bash
   node tests/e2e/run_all.js
   node scripts/test_empirical_html_output.js
   python scripts/test_empirical_html_output.py
   node scripts/test_reactbits_suite.js
   node scripts/stress_test_edge_cases.js
   python scripts/test_challenger1_nim_faculty_oracle.py
   node scripts/verify_11_static_pages.js
   ```

2. **Verify Current Em Dash Count (332 instances)**:
   ```bash
   python -c "import os; print(sum(open(os.path.join(r, f), encoding='utf-8').read().count('\u2014') for r, _, fs in os.walk('out') for f in fs if f.endswith('.html')))"
   ```

3. **Verify Zero Unicode Emojis in Output**:
   ```bash
   python -c "import os, re; p = re.compile(r'[\U0001F300-\U0001FAFF\u2700-\u27BF\u2600-\u26FF]'); print(sum(len(p.findall(open(os.path.join(r, f), encoding='utf-8').read())) for r, _, fs in os.walk('out') for f in fs if f.endswith('.html')))"
   ```

4. **Inspect Emerald Assertions**:
   - `tests/e2e/test_r2_managers.js:80-81`
   - `scripts/test_empirical_html_output.js:179`
   - `scripts/test_empirical_html_output.py:202`
   - `scripts/test_e2e_roster.py:217-218`
