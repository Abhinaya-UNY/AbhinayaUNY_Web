# TEST & VERIFICATION SPECIFICATION REPORT (SURVEY TESTS 3)

**Project:** Tim Robotika Abhinaya UNY — Official Web Platform  
**Target Workspace:** `D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web`  
**Role:** Test & Verification Spec Miner  
**Specification Date:** 2026-09-05T14:46:00Z  
**Primary References:** `ORIGINAL_REQUEST.md` (§2026-08-28T14:01:16Z, §2026-09-05T07:14:50Z, §2026-09-05T14:40:41Z), `TEST_INFRA.md`, `TEST_READY.md`, `next.config.js`, `package.json`, and all active test suites.

---

## 1. Executive Summary

This specification mining report provides an exhaustive, forensic breakdown of the build pipeline, automated test suites, static export validators, DOM assertions, edge-case evaluators, and zero-regression acceptance criteria for the Tim Robotika Abhinaya UNY web platform.

The testing ecosystem comprises a **multi-tiered test harness** spanning pure Node.js zero-dependency runners, empirical HTML static export verifiers, AST and DOM inspectors, Python unittest suites, and an automated post-build export synchronization daemon. All assertions, expected HTML tags, data contracts, and strict pass/fail gates are systematically inventoried below.

---

## 2. Features Discovered

| # | Category | Feature | Description | Inputs | Outputs | Error Behavior | Discovered Via |
|---|----------|---------|-------------|--------|---------|----------------|----------------|
| 1 | Test Harness | `scripts/test_empirical_html_output.js` | Forensic static export DOM inspector. Scans `out/` for required pages, leader/manager presence, squad credentials, deep asset URLs, CSS classes, hydration tags, and JS bundles. | Path to `out/` directory, compiled static HTML files | Formatted console pass/fail logs, exit code 0 on success | Throws Error, increments `results.failed`, exits with non-zero code if any page, member, NIM, or asset is missing | `scripts/test_empirical_html_output.js` |
| 2 | Test Harness | `scripts/stress_test_edge_cases.js` | Adversarial edge-case & UI constraint stress runner. Evaluates empty/whitespace searches, regex attacks, XSS/SQL payloads, division filtering, responsive grids, carousel snap, UNDIP 2026 timeline, and photo unblocking. | Live component code & TS data (`teamData.ts`, `TeamRosterSection.tsx`, `newsData.ts`, `Achievements.tsx`, `AboutTeamSection.tsx`, `HeroSection.tsx`) | Pass/fail test logs, 22-assertion summary matrix | Throws Error on failed assertion, displays `VERDICT: REJECT`, exits code 1 | `scripts/stress_test_edge_cases.js` |
| 3 | Test Harness | `scripts/run_e2e_tests.js` | Comprehensive 5-Tier E2E test runner (57 tests, 3,477 assertions) covering photo pipeline, leaders, managers, technical squad, alumni explorer, crossfade engine, boundaries, combinations, user scenarios, and adversarial integrity. | Node CLI with optional `--tier [1-5]` filter | Colorized ANSI test report, total duration, tier-by-tier pass status | Calls `reporter.fail()`, outputs failure trace, exits code 1 if any assertion fails | `scripts/run_e2e_tests.js` & `tests/e2e/*` |
| 4 | Test Harness | `scripts/test_e2e_roster.py` | Python 3 `unittest` mirror of the 57-test multi-tier E2E test suite. Ensures cross-language reproducibility in CI/CD without Node module dependencies. | CLI arguments, optional `--tier` flag | Standard unittest test runner output with verbose test case descriptions | Unittest assertion failures (`AssertionError`), non-zero exit code | `scripts/test_e2e_roster.py` |
| 5 | Build Daemon | `scripts/postbuild.js` | Automatic Next.js static export post-processor executed via npm `"postbuild"` script. Guarantees 500/404 parity, mirrors `public/` into `out/`, and sanity-checks critical static files. | `out/` folder and `public/` assets | Console log of synced files, file byte sizes | Logs `❌ Missing expected file`, exits with code 1 | `scripts/postbuild.js` & `package.json` |
| 6 | Asset Validator | `scripts/verify_team_member_photos.js` | Verifies that 100% of image paths declared in `data/teamData.ts` resolve to existing, non-empty files on disk in both `public/` and `out/`. | Regex scan of `data/teamData.ts` | Count of verified vs missing disk assets | Lists missing assets with `[out=false, pub=false]`, logs failure | `scripts/verify_team_member_photos.js` |
| 7 | Naming Validator | `scripts/test_photo_naming_standard.js` | Regex compliance validator for member portrait image filenames according to `{tahun}_{divisi}_{nama}_{urutan}.{ext}` schema. | Member photo paths from `data/teamData.ts` | Count of compliant vs non-standard images | Lists all non-standard filenames if nonStandard.length > 0 | `scripts/test_photo_naming_standard.js` |
| 8 | Link Crawler | `scripts/deep_inspect_html_urls.js` | Recursive DOM link and asset crawler. Inspects all `src` and `href` in all exported `.html` files in `out/`, strips basePath `/AbhinayaUNY_Web`, and verifies on-disk targets. | Exported HTML files in `out/` | Total URLs checked, valid count, broken count | Lists detailed broken URLs with file path, offending URL, and expected disk location | `scripts/deep_inspect_html_urls.js` |
| 9 | Adversarial Test | `scripts/adversarial_stress_test.js` | Stress-tests physical disk asset forensics, crossfade engine circular boundary math (100,000 transitions), interval seed variance, monogram initials fallback, and modal lifecycle scroll-lock. | Component code & filesystem assets | 4 test suites summary, assertion counts | Throws Error on assertion failure, exits code 1 | `scripts/adversarial_stress_test.js` |
| 10 | Data Oracle | `scripts/test_challenger1_nim_faculty_oracle.py` | Adversarial data oracle testing UNY 11-digit NIM regex, PDDikti prodi code mappings, absence of placeholder `22518244007`, and cross-file triangulation (`teamData.ts` vs `STRUKTUR.md` vs `ARSIP.md`). | Python regex scanner & AST parser | Detailed 4-test audit matrix | Emits `[VIOLATION]`, prints missing members, exits code 1 | `scripts/test_challenger1_nim_faculty_oracle.py` |
| 11 | Tooling Stress | `scripts/test_adversarial_challenger2.py` | Unittest suite for `manager_tool.py`, testing corrupted JSON rejection, schema enforcement, Unicode/emoji handling, AST roundtrip idempotency, and live mutation build safety. | CLI payloads, mock and live `teamData.ts` | Unittest results across 11 test cases | `AssertionError` if mutation breaks build or fails rollback | `scripts/test_adversarial_challenger2.py` |
| 12 | Math & PII Oracle | `test_adversarial_oracle.py` | Mathematical verification oracle for 4WD Mecanum kinematics, Kiwi Omni torque balance, PID anti-windup clamping, 7 competition scoring calculators, repository PII scan, and static links. | Kinematics equations, simulation models, repository code | Mathematical error margins (<1e-12), pass status | Asserts failure if error margin exceeded or static link broken | `test_adversarial_oracle.py` |

---

## 3. Detailed Assertions & Verification Catalog

### 3.1 Static DOM & Export Page Assertions (`scripts/test_empirical_html_output.js`)

`test_empirical_html_output.js` validates that Next.js static export generates functional, self-contained HTML pages:

1. **Required Exported Pages & File Size Integrity:**
   - Pages verified: `index.html`, `divisi/index.html`, `prestasi/index.html`, `krtmi/index.html`, `pertandingan/index.html`, `404.html`.
   - Assertion: `fs.existsSync(fullPath)` AND `fs.statSync(fullPath).size > 500` bytes.
2. **Leaders Hall of Fame (2020–2025) in `out/index.html`:**
   - Verifies exact substring match in static DOM for:
     - Nurcholis (2020)
     - Afif Aiman Saputra (2021)
     - Muhammad Iqbal Rasyid (2022)
     - Salsabila Azzahra (2023)
     - Ilham Widyo Nugroho (2024)
     - Farhan Yuda Mahendra (2025)
   - Badge assertions: `indexHtml.includes('Ketua Tim')`.
   - Section header assertion: `indexHtml.includes('Leaders Hall of Fame') || indexHtml.includes('Hall of Fame') || indexHtml.includes('Deretan Ketua')`.
3. **Managers Showcase (2020–2025) in `out/index.html`:**
   - Verifies exact substring match for:
     - Yuli Dwi Saputri (2020)
     - Mustika Wahyu Aprilia (2023)
     - Rose Pita Nur Afifah (2024-2025)
     - Zelfa Nafisah Zalna (2025)
   - Badge assertions: `indexHtml.includes('Manager')`.
   - Section header assertion: `indexHtml.includes('Managers Showcase') || indexHtml.includes('Deretan Manager') || indexHtml.includes('Manajer Tim')`.
4. **Active Technical Squad & Student Credentials:**
   - Verifies simultaneous presence of member name AND authentic student NIM:
     - `Tri Wahyu Handoyo` (`22518241023`)
     - `Ikhsan Nurrohman` (`22538141004`)
     - `Agus Bagaskoro` (`21501244039`)
     - `Muhamad Ilham Sony` (`20539144016`)
     - `Caesar Sokma Langgeng` (`21539144005`)
     - `Rionaldi Nugroho` (`23090620088`)
5. **Alumni & Generation Explorer:**
   - Asserts generation years `'2020'`, `'2021'`, `'2022'`, `'2023'`, `'2024'`, `'2025'` exist in DOM.
6. **Deep Asset Links & BasePath Validation:**
   - Scans all `.html` in `out/` with regex `/(?:src|href)="([^"]+)"/g`.
   - Ignores external schemes (`http://`, `https://`, `data:`, `mailto:`, `blob:`, `#`).
   - Normalizes paths starting with `basePath` (`/AbhinayaUNY_Web`), strips `?` and `#`.
   - Resolves against disk: `path.join(outDir, clean)`. Must exist directly or as `index.html` or `.html`.
   - Asserts `brokenAssets.length === 0`.
7. **CSS Bundle Integrity & Tailwind Utility Classes:**
   - Locates `out/_next/static/css/*.css`.
   - Asserts presence of required compiled CSS classes:
     - `bg-brand-orange`
     - `text-brand-orange`
     - `text-amber-300`
     - `text-emerald-300`
     - `grid-cols-1`
     - `duration-1000`
8. **Hydration Safety & Meta Tags:**
   - `name="viewport"`
   - `charset=`
   - `<title>`
   - `og:title` or `property="og:title"`
9. **Performance Budgets:**
   - Locates `out/_next/static/chunks/*.js`.
   - Asserts JS chunk count > 0 and `totalJsSize > 0`.

---

### 3.2 UI Edge Cases & Stress Assertions (`scripts/stress_test_edge_cases.js`)

1. **Roster Search & Adversarial Queries:**
   - Dataset threshold: `extractedMembers.length >= 15`.
   - Empty query `""` returns 100% of members.
   - Whitespace query `"   \t\n  "` returns 100% of members.
   - Nonexistent query `"zzzz_nonexistent_xyz_999"` returns 0 members.
   - Graceful Empty State UI:
     - Heading: `"Tidak Ada Anggota Ditemukan"`
     - Subtitle: `"Coba sesuaikan kata kunci pencarian Anda"`
     - Reset button text: `"Reset Pencarian"`
     - Click handler: `onClick={() => setSearchQuery('')}`
   - Adversarial Regex Metacharacters:
     - Search query must safely evaluate `.*`, `+`, `?`, `^`, `$`, `(`, `)`, `[`, `]`, `{`, `}`, `|`, `\`, `/`, `((((.*)+)+)+)`, `\d+\w+\s+`, `[a-z0-9_-]+`, `^(?:(?!foo).)*$` without crashing or throwing SyntaxError.
   - Injection Payloads:
     - Must safely evaluate `<script>alert("pwned")</script>`, `<img src=x onerror=alert(1)>`, `' OR '1'='1`, `'; DROP TABLE members; --`, `"><script>window.location="http://evil.com"</script>` as literal string matches.
   - Case-Insensitivity:
     - Verifies identical matching across uppercase, lowercase, and mixed-case queries.
2. **Division Filtering:**
   - `DIVISION_CATEGORIES` contains tabs: `'All'`, `'Ketua Tim'`, `'Manager'`, `'Program'`, `'Elektronik'`, `'Mekanik'`, `'Pembimbing'`.
   - Division icon mapper handles `'Program'`, `'Elektronik'`, `'Elektrik'` alias, `'Mekanik'`, `'Manager'`, and `'Manajemen & Administrasi'` / `'Manajerial & Media'` aliases.
   - Every division in `DIVISION_ORDER` has >0 members.
   - Division tab click clears active search: `setSelectedDivision(cat.id); setSearchQuery('');`.
   - Single division view escape hatch: `onClick={() => setSelectedDivision('All')}`.
3. **Responsive Grid & Layout Adaptability:**
   - 4-Tier Breakpoint Scale: `grid-cols-1`, `sm:grid-cols-2`, `lg:grid-cols-3`, `xl:grid-cols-4`, and spacing `gap-6`.
   - Container max width: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`.
   - Dual View Layout Toggle: `viewLayout === 'grid'`, `viewLayout === 'carousel'`, `setViewLayout('grid')`, `setViewLayout('carousel')`.
   - Carousel Touch Momentum: `snap-x snap-mandatory`, `overflow-x-auto`, `WebkitOverflowScrolling: 'touch'`.
4. **UNLIMITED UNDIP 2026 Timeline Verification:**
   - `data/newsData.ts`: contains `undip-unlimited-robot-finalist`, references `UNLIMITED 2026` / `UNDIP 2026`, and STRICTLY DOES NOT CONTAIN `"UNLIMITED UNDIP 2025"`.
   - `components/Achievements.tsx`: contains `year: '2026'`, `UNLIMITED Robotics Competition UNDIP 2026` / `UNDIP 2026`, and STRICTLY DOES NOT CONTAIN `"UNLIMITED Robotics Competition UNDIP 2025"`.
5. **Photo Unblocking Architecture:**
   - `AboutTeamSection.tsx`: MUST NOT contain legacy heavy gradient `bg-gradient-to-t from-black/90 via-black/40 to-transparent absolute inset-0`. Must employ clean aspect container (`aspect-` or `object-cover`).
   - `HeroSection.tsx`: Header typography decoupled from photo viewport (`HeroSection` / `Abhinaya`).
   - `TeamRosterSection.tsx`:
     - Division badge bar: `px-3.5 py-2.5 bg-[#180F09] border-b border-[#2A180E] flex items-center justify-between` or `bg-[#0A140F]`.
     - Photo container: `aspect-[4/3] sm:aspect-square overflow-hidden bg-[#0A0704]` or `bg-[#040806]`.

---

### 3.3 Multi-Tier E2E Suites (`scripts/run_e2e_tests.js` & `scripts/test_e2e_roster.py`)

1. **Tier 1 — Feature Coverage (36 tests):**
   - **R1 Photo Pipeline**: Semantic regex `{tahun}_{divisi}_{nama}_{urutan}.ext`, exclusion of memes/banners (`wanted_uang_kas_bendahara`), 97 genuine member portraits, non-zero file sizes (>1KB), sequential pose indexing, valid schema.
   - **R2 Leaders**: 6 chronological eras (2020–2025), authentic leader names (Nurcholis, Afif, Iqbal, Salsabila, Ilham, Farhan), gold/amber theme (`#EAB308`, `text-amber-300`), academic study programs (D4 Teknik Elektronika FV, S1 Pendidikan Teknik Mekatronika FT), photo bindings.
   - **R2 Managers**: Coverage across 2020–2025, authentic managers (Yuli, Mustika, Rose Pita, Zelfa), co-management in 2024 & 2025, emerald theme (`#10B981`, `text-emerald-300`).
   - **R3 Active Squad**: Program, Elektronik, Mekanik representation, granular roles (Autonomous Navigation Lead, PDB Lead, CAD Lead), skill tags (ROS2, YOLO, STM32, PCB, Mecanum), authentic student NIMs (`22518241023`, etc.).
   - **R4 Alumni Explorer**: 6 generation years (2020–2025), contingent rosters, leadership linkage, competition milestones (UV-C 2020, Logistics 2021, Medical 2022, Digital Twin 2023, Waste Sorting 2024).
   - **R5 Crossfade Engine**: CSS transitions `duration-1000 ease-in-out`, slide counter `{currentIdx + 1}/{images.length}`, dot pagination `w-6 bg-brand-orange`, navigation arrows with `stopPropagation()`, staggered interval timer seed `3600 + (id.charCodeAt(0) % 5) * 200` ms, monogram initials generator.
2. **Tier 2 — Boundary & Corner Cases (6 tests):**
   - Safe optional chaining for missing fields (`quote`, `socials.github`, `socials.linkedin`, `socials.instagram`, `socials.email`).
   - Image fallback on error: `onError` handler transitioning to monogram fallback without crashing.
   - Single-photo cards: omit carousel controls (`images.length > 1 && ...`).
   - Circular index wrapping: `(idx + 1) % len` and `(idx - 1 + len) % len`.
   - Extreme search inputs & year boundaries (2020 inception vs 2025 active).
3. **Tier 3 — Combinations (5 tests):**
   - Modal inspection coupled with member state.
   - Division filter + active search query combined filtering.
   - Crossfade slideshow continuity across card and modal contexts (`isModal` flag).
   - Leader & manager timeline sync.
   - Photo paths in `teamData.ts` matching existing disk assets.
4. **Tier 4 — Real-World Application Scenarios (5 tests):**
   - Timeline exploration (2020 -> 2023 -> 2025).
   - Lightbox modal inspection & keyboard navigation (ESC key closes modal).
   - Responsive multi-device CSS grid layout (`grid-cols-1`, `sm:grid-cols-2`, `lg:grid-cols-3`).
   - Static export readiness (`output: 'export'`, `unoptimized: true`).
   - Prospective student recruitment skill discovery.
5. **Tier 5 — Adversarial & Code Integrity (5 tests):**
   - Zero placeholder names (`John Doe`, `Jane Doe`, `Lorem Ipsum`).
   - Authentic student NIMs verified against UNY registry patterns.
   - Zero hardcoded cheat assertions (live AST and filesystem validation).
   - Clean TypeScript contracts (`TeamMember`, `DivisionType`, etc.).
   - Zero unauthorized admin endpoints (`/admin`, `/api/admin`).

---

### 3.4 YouTube Video Showcase & Media Assertions

Documented in `scripts/test_e2e_suite.py` and `components/YouTubeVideoShowcase.tsx`:
- **Privacy-Enhanced Domain**: All YouTube iframes MUST embed via `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`.
- **Iframe Attributes**: `allowFullScreen`, `allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"`.
- **High-Res Thumbnail CDN & Fallback**:
  - Primary: `https://img.youtube.com/vi/${id}/maxresdefault.jpg`
  - Fallback: `https://img.youtube.com/vi/${id}/hqdefault.jpg` triggered via `onError={(e) => { (e.target as HTMLImageElement).src = ... }}`.
- **Official Channel Linkage**:
  - URL: `https://www.youtube.com/@AbhinayaUNY`
  - Attributes: `target="_blank"`, `rel="noopener noreferrer"`.
- **Modal Lightbox Playback**: Controlled via `isModalOpen` and `modalVideo` state, body scroll lock, ESC dismiss, and backdrop click dismiss with `stopPropagation`.

---

## 4. Next.js Build Configuration & Pipeline Architecture

### 4.1 `next.config.js` Analysis

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  outputFileTracing: false,
  basePath: process.env.NODE_ENV === 'production' ? '/AbhinayaUNY_Web' : '',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

module.exports = nextConfig;
```

**Key Configuration Rationale & Behavior:**
1. `output: 'export'`: Configures Next.js to produce a completely static HTML/CSS/JS export in `out/`, enabling hosting on GitHub Pages.
2. `outputFileTracing: false`: **Critical setting on Windows.** In Next.js 14, hybrid App Router + Pages Router structures (`pages/500.tsx`) invoke `collectBuildTraces` during static export. When tracing is enabled, Next.js attempts to open `.next/server/pages/_app.js.nft.json` or `pages-manifest.json`. Disabling file tracing bypasses this trace pass and eliminates intermittent/reproducible fatal `ENOENT` build crashes.
3. `basePath: process.env.NODE_ENV === 'production' ? '/AbhinayaUNY_Web' : ''`: In production builds, prefixes all assets and routes with `/AbhinayaUNY_Web` to align with GitHub Pages project URL (`https://abhinaya-uny.github.io/AbhinayaUNY_Web/`). In development, stays empty `''` for localhost root routing.
4. `images: { unoptimized: true }`: Static export does not run Node image optimization server (`/_next/image`). Images are served directly as static files.
5. `trailingSlash: true`: Emits `/divisi/index.html` instead of `/divisi.html`, providing clean URL resolution on GitHub Pages without server-side rewrite rules.

---

### 4.2 `package.json` Dependencies & Constraints

```json
{
  "name": "abhinaya-uny-web",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "postbuild": "node scripts/postbuild.js",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "clsx": "^2.1.1",
    "lucide-react": "^0.378.0",
    "next": "14.2.35",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-icons": "^5.7.0",
    "tailwind-merge": "^2.3.0"
  },
  "devDependencies": {
    "@types/node": "^20.12.12",
    "@types/react": "^18.3.2",
    "@types/react-dom": "^18.3.0",
    "autoprefixer": "^10.4.19",
    "postcss": "^8.4.38",
    "tailwindcss": "^3.4.3",
    "typescript": "^5.4.5"
  }
}
```

**Critical Technical Insights:**
- **No Framer Motion Installed:** `framer-motion` is **NOT** listed in `dependencies`. Any React Bits animations (such as `DecryptedText`, `ShinyText`, `SpotlightCard`, `CountUp`, `SplitText`/`BlurText`) must be implemented using **pure CSS, Tailwind CSS keyframes, and native React hooks** (`useState`, `useEffect`, `useRef`, `requestAnimationFrame`). Introducing uninstalled imports will cause fatal compilation errors during `next build`.
- **Windows CLI Command:** Running `npm run build` in Windows PowerShell can fail with `UnauthorizedAccess` due to PowerShell script execution policy on `npm.ps1`. **Always execute via `npm.cmd run build`**.

---

### 4.3 Static Page Export Output (11/11 Pages)

Executing `npm.cmd run build` compiles and exports exactly 11 static pages:
1. `/` (App Router — Home / Landing)
2. `/_not-found` (App Router — 404 handler)
3. `/apple-icon.png` (App Router metadata route)
4. `/divisi` (App Router — Division Roster page)
5. `/icon.png` (App Router metadata route)
6. `/krtmi` (App Router — KRTMI History & Rules archive)
7. `/pertandingan` (App Router — Match Showcase & YouTube Hub)
8. `/prestasi` (App Router — Achievements & Trophies showcase)
9. `/_app` (Pages Router entry wrapper)
10. `/500` (Pages Router — 500 error fallback)
11. `/404` (Pages Router fallback)

---

## 5. Edge Cases Discovered

| # | Feature | Input | Observed Behavior |
|---|---------|-------|-------------------|
| 1 | Roster Search | Adversarial regex string: `.*+?^${}()|[]\` | Safely processed as literal substring via `toLowerCase().includes()`; returns false without SyntaxError or crash |
| 2 | Roster Search | XSS / SQL payloads: `<script>alert("pwned")</script>`, `' OR '1'='1` | Evaluated safely as plain text; returns 0 matches without DOM execution |
| 3 | Roster Search | Whitespace query: `"   \t\n  "` | Recognized as empty search via `searchQuery.trim().length === 0`; displays 100% of roster members |
| 4 | Roster Search | Unknown query: `"zzzz_nonexistent_xyz_999"` | Renders empty state card: "Tidak Ada Anggota Ditemukan" with "Reset Pencarian" button |
| 5 | Crossfade Slideshow | Member card rapid forward/backward clicking (100,000 clicks) | Circular wrapping `(idx + dir + len) % len` confines index strictly to `[0, len - 1]` |
| 6 | Crossfade Slideshow | Member with single photo (`images.length === 1`) | Prev/next arrows, slide counter badge (`1/N`), and dot pagination are completely hidden |
| 7 | Crossfade Interval | Staggered auto-play timer calculation | Interval is offset by member ID hash: `3600 + (id.charCodeAt(0) % 5) * 200` ms, preventing cards from flipping simultaneously |
| 8 | Monogram Avatar | Member photo missing or `onError` event fired | Generates initials from name: e.g. "Farhan Yuda Mahendra" -> "FY", ignoring titles ("Prof.", "Dr.", "Ir.") |
| 9 | Division Filter | Category button clicked while search query active | Resets search query to empty string: `setSelectedDivision(cat.id); setSearchQuery('');` |
| 10 | Modal Dialog | ESC key press or backdrop click | Dismisses modal (`setSelectedMember(null)`); stops propagation on modal card click |
| 11 | Modal Dialog | Modal open / close lifecycle | Sets `document.body.style.overflow = 'hidden'` on open and resets to `'unset'` on close |
| 12 | YouTube Embed | Video thumbnail 404 on `maxresdefault.jpg` | `onError` event handler seamlessly switches image source to `hqdefault.jpg` |
| 13 | Windows Build Trace | Hybrid Pages (`pages/500.tsx`) + App router export | `outputFileTracing: false` in `next.config.js` avoids ENOENT on `_app.js.nft.json` / `pages-manifest.json` |
| 14 | PowerShell Execution | Direct invocation of `npm` in PowerShell | Script execution policy blocks `npm.ps1`; resolved by calling `npm.cmd` explicitly |
| 15 | `manager_tool.py` Mutation | Re-emitting `data/teamData.ts` via CLI | `manager_tool.py` must retain all TypeScript type exports (`DivisionType`, `LEADERS_HALL_OF_FAME`, `MANAGERS_SHOWCASE`, `getGenerationArchive`, `ALUMNI_GENERATIONS`, `DIVISION_ORDER`, `DIVISION_INFO`) or compilation fails |

---

## 6. Exact Criteria for Passing All Tests, Build Verification, Zero Regression, and Git Push

To pass all stages of verification and approve the release for `git push`, the build and codebase must satisfy **10 mandatory criteria**:

### Criterion 1: Static HTML Output Verification Harness (100% Pass)
- Command: `node scripts/test_empirical_html_output.js`
- Required result: Exit code 0, 9 suites passed, 57 assertions passed.
- All required pages exist in `out/` (>500 bytes each).
- Leaders, managers, squad members, and authentic NIMs present in `out/index.html`.
- 0 broken internal links among all asset and navigation URLs.
- Compiled CSS bundle contains required utility classes.

### Criterion 2: Edge Case & Roster Stress Test Harness (100% Pass)
- Command: `node scripts/stress_test_edge_cases.js`
- Required result: Exit code 0, 22 tests passed, 0 failures (`VERDICT: APPROVE`).
- Empty search, regex attack, and XSS payload handling verified.
- Division category tabs and icon mappers verified.
- 4-tier responsive grid (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`) verified.
- UNLIMITED UNDIP competition timeline verified as `2026` across all files.
- Photo unblocking architecture verified (zero dark gradients over faces/robots).

### Criterion 3: Primary Multi-Tier E2E Test Runner (100% Pass)
- Command: `node scripts/run_e2e_tests.js`
- Required result: Exit code 0, 10 suites passed, 57 tests passed, 3,477 assertions passed.
- Full coverage across Tiers 1 through 5.

### Criterion 4: Python E2E Unittest Mirror (100% Pass)
- Command: `python scripts/test_e2e_roster.py`
- Required result: Exit code 0, 57 tests passed (`OK`).

### Criterion 5: Member Photo Disk Existence (100% Pass)
- Command: `node scripts/verify_team_member_photos.js`
- Required result: 0 missing photos. 100% of image paths declared in `data/teamData.ts` exist in both `public/` and `out/`.

### Criterion 6: Member Photo Semantic Naming Standard (100% Pass)
- Command: `node scripts/test_photo_naming_standard.js`
- Required result: 0 non-standard photos. All filenames match `^\/(?:images\/members\/(202[0-5])_(leader|manager|program|elektronik|mekanik|pembimbing|desain)_[a-z0-9_]+_\d{2}\.(?:jpg|png)|assets\/logo_abhinaya_solid\.png)$`.

### Criterion 7: Deep Static Link Crawler (100% Pass)
- Command: `node scripts/deep_inspect_html_urls.js`
- Required result: Broken internal URLs count = 0 across all exported `.html` pages.

### Criterion 8: Next.js Static Export & Postbuild Sync (100% Pass)
- Command: `npm.cmd run build`
- Required result: Exit code 0.
- TypeScript compiler passes with 0 errors (`tsc`).
- Next.js exports exactly 11/11 static pages.
- `scripts/postbuild.js` executes automatically:
  - `out/500.html` and `out/500/index.html` synced.
  - `out/404.html` and `out/404/index.html` synced.
  - Public assets mirrored.
  - `index.html`, `404.html`, `500.html`, `500/index.html`, and `assets/logo_abhinaya.png` verified present.

### Criterion 9: Zero Visual & Copywriting Regression
- No text overlays, badges, or heavy dark gradients (`from-black/90...`) obscuring faces, trophies, or robots in photo viewports (`AboutTeamSection`, `HeroSection`, `DocumentationGallerySection`, `TeamRosterSection`).
- UNLIMITED UNDIP is year **2026** in all data records and components; never 2025.
- Real PDDikti 11-digit student NIMs; zero placeholder NIMs (`22518244007`) or dummy names.
- React Bits animations (DecryptedText, ShinyText, SpotlightCard, CountUp, SplitText/BlurText) implemented with pure React/CSS/Tailwind, fully compatible with static export and SSR hydration (`'use client'`).

### Criterion 10: Git Cleanliness & Push Verification
- Working tree clean: `git status` reports no untracked or unstaged application source code files.
- Remote repository configured: `https://github.com/Abhinaya-UNY/AbhinayaUNY_Web`.
- Branch `main` ready for `git push origin main`.

---

## 7. 5-Component Handoff Report

### 1. Observation
- Inspected `scripts/test_empirical_html_output.js` (lines 1–215): verifies 6 HTML pages, 6 Leaders, 4 Managers, 6 Active Squad members with NIMs, 6 generation years, deep asset URLs (1,354 checked), compiled Tailwind classes (`bg-brand-orange`, `text-brand-orange`, `text-amber-300`, `text-emerald-300`, `grid-cols-1`, `duration-1000`), viewport/title/OG meta tags, and JS chunks size.
- Inspected `scripts/stress_test_edge_cases.js` (lines 1–330): verifies empty/whitespace search, regex metacharacters, XSS/SQL payloads, case insensitivity, `DIVISION_CATEGORIES`, responsive grid classes (`grid-cols-1`, `sm:grid-cols-2`, `lg:grid-cols-3`, `xl:grid-cols-4`, `gap-6`, `max-w-7xl`), UNDIP year 2026, and photo unblocking.
- Inspected `scripts/run_e2e_tests.js` and `scripts/test_e2e_roster.py`: 57 tests across 10 suites (3,477 assertions) covering features R1 to R5, boundary cases, cross-feature combinations, and adversarial integrity.
- Executed `node scripts/test_empirical_html_output.js`: exited code 0, 9 suites passed, 57 assertions passed.
- Executed `node scripts/stress_test_edge_cases.js`: exited code 0, 22 tests passed, 0 failed.
- Executed `node scripts/run_e2e_tests.js`: exited code 0, 57 tests passed in 70 ms.
- Executed `python scripts/test_e2e_roster.py`: exited code 0, 57 tests passed in 0.157s.
- Executed `npm.cmd run build`: exited code 0, compiled successfully, generated 11/11 static pages, and completed `postbuild.js` export validation.
- Inspected `package.json`: Next.js `14.2.35`, React `18.3.1`, Tailwind `3.4.3`. `framer-motion` is **not installed**.
- Inspected `next.config.js`: `output: 'export'`, `outputFileTracing: false`, `basePath: process.env.NODE_ENV === 'production' ? '/AbhinayaUNY_Web' : ''`, `images: { unoptimized: true }`, `trailingSlash: true`.
- Executed `node tests/run-all-tests.js`: failed because `app/teknis/page.tsx` does not exist (that legacy test suite expects an older page route).
- Executed `python scripts/test_adversarial_challenger2.py`: revealed that mutating `teamData.ts` via `manager_tool.py` must retain all exported TypeScript types and helpers (`DivisionType`, `LEADERS_HALL_OF_FAME`, etc.) to prevent Next build failure. Git state was verified and restored.

### 2. Logic Chain
1. *From Observation 1 & 4*: `test_empirical_html_output.js` directly inspects the `out/` directory generated by `next build`. Because it checks exact text in `out/index.html` (e.g. member names and NIMs), any change to team rosters or copywriting must preserve these exact substrings in the rendered HTML to maintain test pass status.
2. *From Observation 2 & 5*: `stress_test_edge_cases.js` parses component source code files directly (regex & AST-like inspections). Any refactor or styling upgrade must preserve critical CSS classes (`grid-cols-1`, `sm:grid-cols-2`, `lg:grid-cols-3`, `xl:grid-cols-4`, `gap-6`, `max-w-7xl`), specific UI strings (`Tidak Ada Anggota Ditemukan`, `Reset Pencarian`), and event handlers (`onClick={() => setSearchQuery('')}`).
3. *From Observation 8 & 9*: `npm.cmd run build` relies on `outputFileTracing: false` to avoid Windows filesystem ENOENT crashes during static export of hybrid Pages/App router files (`pages/500.tsx`). Because `package.json` does not include `framer-motion`, all React Bits animation components must be written with CSS keyframes, Tailwind, or React hooks.
4. *From Observation 11*: `tests/run-all-tests.js` tests `app/teknis/page.tsx` which is not part of the active App Router routes (`app/`, `app/divisi`, `app/krtmi`, `app/pertandingan`, `app/prestasi`). The canonical, project-approved test suites are `scripts/test_empirical_html_output.js`, `scripts/stress_test_edge_cases.js`, `scripts/run_e2e_tests.js`, and `scripts/test_e2e_roster.py`.

### 3. Caveats
- `tests/run-all-tests.js` is an older 4-tier suite designed when `app/teknis/page.tsx` existed. It currently fails on missing `app/teknis/page.tsx`. The official test suites cited in `ORIGINAL_REQUEST.md` (§2026-09-05T14:40:41Z line 143) are `scripts/test_empirical_html_output.js` and `scripts/stress_test_edge_cases.js`.
- `test_challenger1_nim_faculty_oracle.py` looks for 10 historical alumni members in `teamData.ts` who are documented in `STRUKTUR_TIM_ABHINAYA.md` and `ARSIP_ANALISIS_FOTO_DAN_DATA_ANGGOTA.md`.
- No code or component modifications were performed, strictly upholding the read-only spec miner mandate.

### 4. Conclusion
The testing infrastructure and acceptance criteria are thoroughly probed, verified, and mapped. All active official test runners (`test_empirical_html_output.js`, `stress_test_edge_cases.js`, `run_e2e_tests.js`, `test_e2e_roster.py`) currently pass with 100% success rate, and `npm.cmd run build` successfully compiles and generates 11/11 static pages. Downstream implementation agents must adhere strictly to the 10 enumerated criteria, author animations without external packages (`framer-motion`), maintain the decoupled photo unblocking structure, preserve UNDIP 2026 timeline citations, and retain all existing DOM text, NIMs, and CSS layout classes.

### 5. Verification Method
To independently verify all findings:
```powershell
# 1. Verify Empirical Static HTML Output Test Harness (9 suites, 57 assertions)
node scripts/test_empirical_html_output.js

# 2. Verify Edge Cases & UI Constraints Stress Test Harness (22 tests)
node scripts/stress_test_edge_cases.js

# 3. Verify Multi-Tier E2E Test Suite (57 tests, 3,477 assertions)
node scripts/run_e2e_tests.js

# 4. Verify Python E2E Test Suite (57 tests)
python scripts/test_e2e_roster.py

# 5. Verify Member Photo Disk Existence (0 missing)
node scripts/verify_team_member_photos.js

# 6. Verify Semantic Photo Naming Regex (0 non-standard)
node scripts/test_photo_naming_standard.js

# 7. Verify Deep Internal URLs (0 broken links)
node scripts/deep_inspect_html_urls.js

# 8. Verify Next.js Production Static Export & Postbuild Sync (11/11 pages)
npm.cmd run build

# 9. Verify Git Status & Clean Working Tree
git status
```
Invalidation condition: If any of commands 1–8 exits with a non-zero code or reports failed assertions, the verification fails.
