# Independent Review & Adversarial Quality Assessment Report

**Reviewer**: Reviewer 1 (`teamwork_preview_reviewer_revamp_1`)  
**Mission**: Verify R1 (Photo Unblocking), R2 (UNDIP 2026 factual accuracy), and R3 (authentic engineering copywriting), run build and tests, and issue an evidence-based verdict.  
**Target Repository**: `D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web`  
**Date**: 2026-09-05  

---

## Review Summary

**Verdict**: **REQUEST_CHANGES**

### Executive Assessment
The revamp implementation has achieved outstanding visual and content quality across Requirements R1, R2, and R3:
- **R1 (Photo Unblocking)**: Flawlessly executed. Text overlays, dark heavy gradients, and floating badge containers have been completely eradicated from photo viewports across `AboutTeamSection.tsx`, `HeroSection.tsx`, `InstagramFeedShowcase.tsx`, `DocumentationGallerySection.tsx`, `TeamRosterSection.tsx`, and `MemberPhotoFadeEngine.tsx`. Photos retain pristine, unblocked natural aspect ratios with metadata decoupled into dedicated header bars and bottom story panels.
- **R2 (UNDIP 2026 Factual Accuracy)**: 100% verified across all 5 mandatory targets (`data/newsData.ts`, `components/Achievements.tsx`, `ARSIP_BERITA_DAN_MEDIA_ABHINAYA.md`, `app/prestasi/page.tsx`, `components/KRIOverview.tsx`). Zero stale 2024/2025 references remain in the active codebase.
- **R3 (Authentic Engineering Copywriting)**: Highly authentic Indonesian mechatronics terminology (4WD Mecanum, closed-loop PID, YOLOv8/HSV segmentation, LiFePO4 power distribution, CAD/CAM 3D printing) replaces all generic AI buzzwords.
- **E2E Automated Tests**: 57/57 tests passed cleanly in `node tests/e2e/run_all.js` (3477 assertions) and 55/55 tests passed in `python scripts/test_e2e_suite.py`.

**Reason for REQUEST_CHANGES**:
The production build pipeline (`npm.cmd run build`) fails reproducibly with exit code 1 due to `ENOENT` errors during Next.js static export trace collection (`collectBuildTraces` looking for `.next/server/pages/_app.js.nft.json` / `pages-manifest.json` / `_ssgManifest.js`). This regression was introduced in Milestone M4 by creating a standalone `pages/500.tsx` inside an App Router Next.js project to bypass a trailing-slash export bug. Because `npm.cmd run build` fails, Acceptance Criterion §R5 ("npm run build succeeds cleanly with zero TypeScript, lint, or static export errors") is not satisfied.

---

## Findings

### [Critical] Finding 1: Production Static Build (`npm.cmd run build`) Fails with ENOENT in `collectBuildTraces`

- **What**: Executing `npm.cmd run build` fails with exit code 1. The build crashes during the static export and trace collection phase with errors such as:
  ```
  Error: ENOENT: no such file or directory, open '...\.next\server\pages\_app.js.nft.json'
      at async collectBuildTraces (node_modules\next\dist\build\collect-build-traces.js:164:5)
  ```
  or on clean builds:
  ```
  Error: ENOENT: no such file or directory, open '...\.next\server\pages-manifest.json'
  Error: ENOENT: no such file or directory, open '...\.next\static\<buildId>\_ssgManifest.js'
  ```
- **Where**: `pages/500.tsx`, `next.config.js`, and `node_modules/next/dist/build/collect-build-traces.js`.
- **Why**: In Milestone M4, Worker M4 created `pages/500.tsx` in an attempt to circumvent an issue where Next.js 14 with `trailingSlash: true` outputs `/500/index.html` and tries to rename `/500.html`. However, placing `pages/500.tsx` into a Next.js 14 project whose architecture is pure App Router (`app/`) causes Next.js to activate the legacy Pages Router compilation pipeline. Because the project does not have Pages Router scaffolding (`pages/_app.tsx`, `pages/_document.tsx`), Next.js's trace collector fails when it attempts to trace `_app.js` and SSG manifests for Pages Router.
- **Impact**: Static export output is not generated, blocking automated deployment to GitHub Pages.
- **Suggested Fix**:
  1. Remove `pages/500.tsx` or replace the error handling mechanism with App Router-native `app/error.tsx` / `app/global-error.tsx` or a custom export script.
  2. If the original issue was `trailingSlash: true` renaming in Next.js 14 static export, evaluate removing `trailingSlash: true` (or setting `trailingSlash: false`), which produces clean static files without the rename crash.
  3. Alternatively, if a static 500 page is required by GitHub Pages, generate `out/500.html` via a post-build node script (e.g. copying `out/index.html` or rendering a dedicated 500 template) rather than creating a broken Pages Router route.

---

## Detailed Requirement Verification

### 1. Requirement R1: Photo Unblocking & Layout Refinement (Zero Overlays on Faces/Robots)

| Target Component | Observation | Status | Evidence |
|---|---|---|---|
| `components/AboutTeamSection.tsx` | Decoupled 3-part card architecture. Top metadata header bar (lines 31–45) placed above photo; pristine 16:10 photo viewport (lines 48–55) with 0% dark gradient and 0% text; dedicated bottom story card (lines 57–75). | **PASS** | Lines 48–55: `<img src=".../team_ums_2024_web.jpg" className="w-full h-full object-cover object-top sm:object-center brightness-100 contrast-105" />` |
| `components/HeroSection.tsx` | Decoupled into Header Zone (lines 31–106) containing branding, typography, badges, and action buttons; followed by framed cinematic photo stage (lines 109–129) with dedicated bottom metadata strip. Zero text obscuring faces/robots. | **PASS** | Lines 111–117: `<div className="aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-black"><img src=".../hero_abhinaya.jpg" .../></div>` |
| `components/InstagramFeedShowcase.tsx` | Cards feature dedicated mini-header bar (lines 167–187) above photo canvas; square photo canvas (lines 189–210) has no corner text overlays or heavy gradients; slide indicator placed outside canvas; card body cleanly placed below photo. | **PASS** | Lines 189–210: Clean stacked images with zero overlay tags covering member portraits. |
| `components/DocumentationGallerySection.tsx` | Pristine 4:3 natural aspect ratio viewports (lines 69–75) with zero badges or text over images. Category and year tags positioned in the card body below the photo. Lightbox modal cleanly separates image from caption. | **PASS** | Lines 69–75: `<div className="relative aspect-[4/3] w-full overflow-hidden bg-black"><img src="..." /></div>` |
| `components/TeamRosterSection.tsx` | Division and generation badges moved to top header bar (lines 563–592) above photo. Headshot container (lines 595–608) has 0% dark gradient and 0% badge overlay. Responsive grid classes `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4` verified (lines 914, 968, 1043). | **PASS** | Verified in card renderer lines 563–608 and grid definitions. |
| `components/MemberPhotoFadeEngine.tsx` | Line 405 explicitly documents `0% Dark Gradient Haze - 100% Crisp Natural Photo Viewport`. Counter badge placed unobtrusively at bottom-left without covering faces. | **PASS** | Verified lines 352–468. |
| `components/NewsMediaSection.tsx` | 16:9 thumbnails (lines 61–70) are 100% unblocked with metadata, titles, and summaries positioned strictly below. | **PASS** | Verified lines 61–108. |
| `components/YouTubeVideoShowcase.tsx` | 16:9 player and 9:16 shorts grid feature unblocked viewports with centered play button; zero text overlays on video footage. | **PASS** | Verified lines 250–320. |

---

### 2. Requirement R2: Factual Timeline & UNDIP Year Correction (2026)

| Target File | Expected Content | Actual Verified Content | Status |
|---|---|---|---|
| `data/newsData.ts` | Item `undip-unlimited-robot-finalist` with `date: "2026"`, title with `2026`, stats `UNLIMITED Robot 2026 • UNDIP` | Lines 80, 83, 88: `"date": "2026"`, `"title": "Abhinaya Lolos Sebagai Finalis Lomba Robot Kreatif Nasional UNLIMITED UNDIP 2026"`, `"stats": "UNLIMITED Robot 2026 • UNDIP"` | **PASS** |
| `components/Achievements.tsx` | `year: '2026'`, `event: 'UNLIMITED Robotics Competition UNDIP 2026'`, organizer label | Lines 7–13: `year: '2026'`, `event: 'UNLIMITED Robotics Competition UNDIP 2026'`, line 58: returns `'Penghargaan Resmi Teknik Elektro UNDIP'` | **PASS** |
| `ARSIP_BERITA_DAN_MEDIA_ABHINAYA.md` | Section 3 header & TOC reflect 2026 | Line 10: `3. [Prestasi Lomba Robot Kreatif Nasional UNLIMITED UNDIP 2026](#3-prestasi-lomba-robot-kreatif-nasional-unlimited-undip-2026)`, Line 43: `## 3. PRESTASI LOMBA ROBOT KREATIF NASIONAL UNLIMITED UNDIP 2026`, Line 46: `- **Tahun**: 2026` | **PASS** |
| `app/prestasi/page.tsx` | Mentions UNLIMITED UNDIP 2026 in metadata & body | Line 7: `UNLIMITED UNDIP 2026`, Line 24: `UNLIMITED Robotics Competition UNDIP 2026` | **PASS** |
| `components/KRIOverview.tsx` | Chronological timeline item for 2026 | Line 171: `<span className="px-2 py-0.5 rounded-lg bg-[#20140A] text-cyan-400 font-bold border border-cyan-400/40">2026: Technocorner &amp; UNDIP</span>` | **PASS** |
| Repository-wide Sweep | Zero occurrences of `UNDIP 2024` or `UNDIP 2025` in active source code | Grep returned 0 occurrences in active application code. | **PASS** |

---

### 3. Requirement R3: Natural & Authentic Robotics Copywriting (Anti-AI Slop)

- **Terminology Audit**:
  - `HeroSection.tsx`: Clear institutional identity: `"TIM ROBOTIKA • UKM REKAYASA TEKNOLOGI UNY"`, `"Divisi Kontes Robot Tematik Indonesia (KRTMI)"`, `"JUARA 1 WILAYAH I & JUARA 2 NASIONAL KRTMI 2024"`.
  - `AboutTeamSection.tsx`: Accurate organizational scope: explains that Tim Abhinaya operates under UKM Restek UNY at university level, open to all faculties.
  - `KRIOverview.tsx`: Grounded in genuine mechatronics engineering:
    - `"Algoritma deteksi YOLOv8 dan segmentasi HSV mengekstrak koordinat objek dalam hitungan milidetik guna memandu mekanisme gripper/feeder."`
    - `"Sasis berpenggerak empat roda Mecanum independen memungkinkan translasi omni-directional dan rotasi simultan. Kendali Closed-Loop PID dengan encoder optik presisi tinggi menjaga stabilitas manuver di atas karpet arena."`
    - `"Integrasi 4 pilar mekatronika: rancang bangun sasis mekanik (CAD/CAM & 3D print), keandalan distribusi daya elektrik (PCB & baterai LiFePO4), ketangguhan firmware embedded sistem, dan ketertiban tata kelola manajerial."`
  - Zero presence of stereotypical generative AI fluff ("in an era where innovation meets passion", "redefining the paradigm of tomorrow").
- **Verdict for R3**: **PASS**.

---

### 4. Build & Test Verification

| Test Suite / Command | Command Executed | Assertions | Result | Notes |
|---|---|---|---|---|
| Node.js E2E Test Runner | `node tests/e2e/run_all.js` | 3477 assertions across 10 suites | **PASS (57/57)** | All 5 tiers passed in 86ms |
| Python E2E Test Suite | `python scripts/test_e2e_suite.py` | 55 unit/integration test cases | **PASS (55/55)** | All 5 tiers passed in 1.38s |
| TypeScript Compiler Check | `npx.cmd tsc --noEmit` | N/A | **PASS** | Exit code 0, zero type errors |
| Production Static Build | `npm.cmd run build` | 11 static pages | **FAIL** | Exit code 1 (`ENOENT: ...\_app.js.nft.json` / `pages-manifest.json` in `collectBuildTraces`) |

---

## Adversarial Stress-Test Findings

1. **Clean Build vs Cached Build Anomaly**:
   - When run with an already-populated `.next` cache, `next build` intermittently completes, giving a false sense of success.
   - However, when run from a clean state (`Remove-Item -Recurse -Force .next; npm.cmd run build`) or repeatedly, it crashes consistently with `ENOENT` on `_app.js.nft.json`, `pages-manifest.json`, or `_ssgManifest.js`.
   - In CI/CD pipelines (such as GitHub Actions for GitHub Pages), builds run in clean virtual environments without cached `.next` folders. Therefore, the repository in its current state would fail deployment in GitHub Actions.

2. **Integrity Violation Check**:
   - No hardcoded test cheats or facade implementations were detected in R1, R2, or R3.
   - The test suites genuinely inspect DOM classes, data structures, and file assets on disk.
   - The build failure is a technical architectural conflict (App Router vs Pages Router collision) rather than an intentional shortcut or fabricated test.

---

## Coverage Gaps & Unverified Items

- **Live GitHub Actions Deployment**: Could not be verified end-to-end on GitHub Pages due to local build failure blocking deployment push.
- **Recommendation**: Resolve Finding 1 before pushing to remote `origin/main`.
