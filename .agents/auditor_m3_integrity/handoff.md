# Forensic Integrity Audit Report — Milestone 3: Animations & Component Integration

**Work Product**: Abhinaya UNY Robotics Website (`components/animations/*`, `components/ui/*`, integrated components, `app/pertandingan/page.tsx`, and test suites)  
**Profile**: General Project  
**Integrity Mode**: Development (per `ORIGINAL_REQUEST.md`)  
**Verdict**: **CLEAN**

---

## 1. Observation

### 1.1 Source Code & Implementation Analysis
1. **`components/animations/DecryptedText.tsx` (172 lines)**:
   - Genuine kinetic scrambler using standard React hooks (`useState`, `useEffect`, `useRef`, `useCallback`) and `setInterval` / `clearInterval`.
   - Lines 34-35:
     ```tsx
     // SSR Invariant: Must initialize with literal target text so static export HTML contains target string
     const [displayText, setDisplayText] = useState<string>(text);
     ```
   - Lines 52-60: Genuine `window.matchMedia('(prefers-reduced-motion: reduce)')` accessibility check gracefully bypassing scrambling when reduced motion is preferred.
   - Lines 73-120: Real scrambling calculation splitting characters into target vs randomized characters from glyph pool, resolving sequentially or by direction (`start`, `end`, `center`).
   - Line 156: `aria-label={text}` maintains full accessibility.
   - Zero hardcoded test bypasses or dummy constant returns.

2. **`components/animations/ShinyText.tsx` (69 lines)**:
   - Genuine GPU-composited CSS keyframe sweep animation using Tailwind utility classes:
     `bg-clip-text text-transparent bg-gradient-to-r from-brand-orange via-amber-200 to-brand-orange bg-[length:250%_100%] animate-shimmer`.
   - Lines 23-39: Media query listener tracking `prefers-reduced-motion`.
   - Line 63: Renders `{text}` directly, guaranteeing 100% literal text rendering in SSR and static HTML DOM.

3. **`components/animations/BlurText.tsx` (107 lines)**:
   - Real staggered reveal using native `IntersectionObserver` (lines 44-61) and inline CSS transitions with `will-change-[transform,opacity,filter]`.
   - Lines 86-95: Computes dynamic transform, opacity, and blur filter:
     ```tsx
     transform: inView ? 'translateY(0)' : direction === 'top' ? 'translateY(-14px)' : 'translateY(14px)',
     opacity: inView ? 1 : 0,
     filter: inView ? 'blur(0px)' : 'blur(8px)',
     transitionDuration: prefersReducedMotion ? '0ms' : '700ms',
     transitionDelay: prefersReducedMotion ? '0ms' : `${i * delay}ms`,
     ```
   - Line 77: Semantic accessibility preserved with `aria-label={text}`.

4. **`components/animations/SpotlightCard.tsx` (99 lines) & `components/ui/SpotlightCard.tsx` (5 lines)**:
   - Zero React state re-renders during mouse move: lines 42-47 update CSS custom properties `--mouse-x`, `--mouse-y`, and `--spotlight-opacity` directly on the container DOM element via `localRef.current.style.setProperty`.
   - Lines 80-86: Radial glow overlay has `pointer-events-none absolute -inset-px` and uses `radial-gradient(${spotlightSize}px circle at var(--mouse-x, -999px) var(--mouse-y, -999px), ${spotlightColor}, transparent 70%)`.
   - Line 89: Card contents are wrapped in `<div className="relative z-20 w-full h-full">`, keeping all underlying links, buttons, and photos interactive with 0% obscuration.
   - `components/ui/SpotlightCard.tsx` cleanly re-exports `components/animations/SpotlightCard.tsx`.

5. **`components/animations/CountUp.tsx` (122 lines)**:
   - Genuine numerical interpolation using native `requestAnimationFrame` and exponential easing function:
     ```ts
     const easeOutExpo = (t: number): number => {
       return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
     };
     ```
   - Lines 63-98: `IntersectionObserver` triggers animation only when element enters the viewport.
   - Lines 43-52: `formatNumber` handles custom separators, decimal precision, and symbols.
   - Lines 54-61: Reduced motion immediately resolves target number without animation.

6. **`components/animations/AmbientGrid.tsx` (112 lines)**:
   - Pure SVG coordinate pattern (`<pattern id="abhinaya-grid-pattern">`) with subtle lines and intersection dots, overlaid with radial amber glow and scan line.
   - Non-interactive, accessible background layer with `pointer-events-none`, `aria-hidden="true"`, and reduced-motion detection.

7. **`components/animations/index.ts` (7 lines)**:
   - Clean barrel export exporting all 6 animation primitives.

---

### 1.2 Integration Inspection
1. **`components/HeroSection.tsx`**:
   - Lines 60-72: `BlurText` applied to "ABHINAYA" and "UNY" with `title="ABHINAYA UNY"` and `aria-label="ABHINAYA UNY"`.
   - Line 85: `ShinyText` applied to "JUARA 1 WILAYAH I & JUARA 2 NASIONAL KRTMI 2024".
   - Line 50: `DecryptedText` applied to team category pill.
   - Line 29: `AmbientGrid` placed in background.
   - Lines 136-156: Dedicated photo stage with metadata strip strictly below the photo. Zero text overlays obscuring faces or robots.

2. **`components/TeamRosterSection.tsx`**:
   - Line 68: Imports `SpotlightCard` and `DecryptedText`.
   - Line 506: Member cards wrapped in `SpotlightCard` with orange glow (`rgba(255, 107, 0, 0.16)`).
   - Lines 532-566: Card top header bar houses division badges and multi-photo counter.
   - Lines 568-582: Pristine unblocked photo viewport with `MemberPhotoFadeShowcase` (0% dark gradients, 0% overlay badges).
   - Lines 584-666: Card body below photo houses all member metadata, quotes, prodi, and specialization tags.

3. **`components/Achievements.tsx`**:
   - Lines 80-84: `ShinyText` on cabinet title.
   - Line 94: `SpotlightCard` wrapping each trophy card.
   - Lines 107, 116: `DecryptedText` on award year and badge.
   - Lines 10-16: UNLIMITED UNDIP competition is authentically documented as **2026**:
     `year: '2026', title: 'Finalis Lomba Robot Kreatif Nasional', event: 'UNLIMITED Robotics Competition UNDIP 2026'`.

4. **`components/NewsMediaSection.tsx`**:
   - Lines 42-55: `SpotlightCard as="a"` wrapping each news card.
   - Lines 81, 85: `DecryptedText` on badge and portal name.
   - Lines 64-74: Thumbnail image viewport decoupled from article metadata; 0% text over thumbnails.

5. **`components/AboutTeamSection.tsx`**:
   - Lines 49-55: Pristine photo viewport for team photo at UMS 2024.
   - Lines 57-76: Dedicated caption and story panel cleanly below the photo.
   - Lines 94, 104, 114: `SpotlightCard` with `CountUp` numbers (7+ Periode, 100% Otonom).

6. **`components/KrtmiChronicles.tsx`**:
   - Lines 195, 205: `CountUp` on match duration and power voltage.
   - Lines 220, 234: `DecryptedText` on victory condition and autonomy mode.
   - Line 35: Default active year initialized to `'2026'` (Technocorner 2026).

7. **`components/KRIOverview.tsx`**:
   - Lines 140, 194: `SpotlightCard` on 4 KRTMI pillars and division cards.
   - Line 211: `DecryptedText` on division codes.
   - Line 176: Chronology explicitly lists `2026: Technocorner & UNDIP`.

8. **`app/pertandingan/page.tsx`**:
   - Lines 298-345: Four `SpotlightCard` telemetry badges with `CountUp` counters (100% Otonom, 1.4 m/s, <12 Detik, 98.4% Precision).

---

### 1.3 Dependency Integrity Analysis
- `package.json`:
  ```json
  "dependencies": {
    "clsx": "^2.1.1",
    "lucide-react": "^0.378.0",
    "next": "14.2.35",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-icons": "^5.7.0",
    "tailwind-merge": "^2.3.0"
  }
  ```
- Grep across entire codebase confirmed:
  - **framer-motion**: ZERO imports (only referenced in `scripts/test_reactbits_suite.js` assertion line ensuring absence).
  - **@react-spring**: ZERO imports.
  - **gsap / animejs**: ZERO imports.
  - All bespoke React Bits components use native React 18 hooks and Web APIs.

---

### 1.4 Hardcoded Bypass & Environment Sniffing Check
- Grep for `NODE_ENV` confirmed it is exclusively used for Next.js static export `basePath` resolution (`process.env.NODE_ENV === 'production' ? '/AbhinayaUNY_Web' : ''`).
- ZERO occurrences of `NODE_ENV === 'test'` or test runner detection.
- ZERO mock facade methods or pre-computed constant test returns.
- ZERO pre-existing `.log` files in workspace before audit.

---

### 1.5 Empirical Test Execution Results

1. **React Bits Suite Primitives Verification (`node scripts/test_reactbits_suite.js`)**:
   ```
   ======================================================================
          REACT BITS SUITE PRIMITIVES INTEGRITY VERIFICATION            
   ======================================================================
   • Testing File exists: components\animations\DecryptedText.tsx ... ✅ PASS
   • Testing File exists: components\animations\ShinyText.tsx ... ✅ PASS
   • Testing File exists: components\animations\BlurText.tsx ... ✅ PASS
   • Testing File exists: components\animations\SpotlightCard.tsx ... ✅ PASS
   • Testing File exists: components\animations\CountUp.tsx ... ✅ PASS
   • Testing File exists: components\animations\AmbientGrid.tsx ... ✅ PASS
   • Testing File exists: components\animations\index.ts ... ✅ PASS
   • Testing File exists: components\ui\SpotlightCard.tsx ... ✅ PASS
   • Testing Has 'use client' directive: DecryptedText.tsx ... ✅ PASS
   • Testing Has 'use client' directive: ShinyText.tsx ... ✅ PASS
   • Testing Has 'use client' directive: BlurText.tsx ... ✅ PASS
   • Testing Has 'use client' directive: SpotlightCard.tsx ... ✅ PASS
   • Testing Has 'use client' directive: CountUp.tsx ... ✅ PASS
   • Testing Has 'use client' directive: AmbientGrid.tsx ... ✅ PASS
   • Testing Has 'use client' directive: SpotlightCard.tsx ... ✅ PASS
   • Testing Zero framer-motion dependency in: DecryptedText.tsx ... ✅ PASS
   • Testing Zero framer-motion dependency in: ShinyText.tsx ... ✅ PASS
   • Testing Zero framer-motion dependency in: BlurText.tsx ... ✅ PASS
   • Testing Zero framer-motion dependency in: SpotlightCard.tsx ... ✅ PASS
   • Testing Zero framer-motion dependency in: CountUp.tsx ... ✅ PASS
   • Testing Zero framer-motion dependency in: AmbientGrid.tsx ... ✅ PASS
   • Testing Zero framer-motion dependency in: index.ts ... ✅ PASS
   • Testing Zero framer-motion dependency in: SpotlightCard.tsx ... ✅ PASS
   • Testing DecryptedText: genuine scramble, SSR-safe initial state & reduced-motion check ... ✅ PASS
   • Testing ShinyText: metallic sweep, animate-shimmer & literal text rendering ... ✅ PASS
   • Testing BlurText: IntersectionObserver, staggered reveal & a11y label ... ✅ PASS
   • Testing SpotlightCard: CSS custom properties, pointer-events-none & direct DOM manipulation ... ✅ PASS
   • Testing CountUp: requestAnimationFrame, easeOutExpo & formatting ... ✅ PASS
   • Testing AmbientGrid: SVG pattern, micro-grid coordinates & scanline ... ✅ PASS
   • Testing index.ts and ui/SpotlightCard.tsx barrel exports ... ✅ PASS
   ======================================================================
   Passed: 30, Failed: 0
   ======================================================================
   ALL REACT BITS PRIMITIVES VERIFICATION TESTS PASSED!
   ```

2. **Empirical Edge Case & Stress Testing (`node scripts/stress_test_edge_cases.js`)**:
   ```
   ======================================================================
      EMPIRICAL CHALLENGER 1 — EDGE CASE & ROSTER STRESS TEST HARNESS   
   ======================================================================
   --- SECTION 1: EMPTY ROSTER SEARCHES & QUERY BOUNDARIES ---
   • Testing Extracted member dataset is substantial (>15 members) ... ✅ PASS
   • Testing Empty search string ("") returns 100% of roster members ... ✅ PASS
   • Testing Whitespace-only search string ("   \t\n  ") returns 100% of roster members ... ✅ PASS
   • Testing Nonexistent search query ("zzzz_nonexistent_xyz_999") returns 0 members ... ✅ PASS
   • Testing Component contains graceful Empty State UI with Reset button ... ✅ PASS
   • Testing Adversarial regex metacharacters do NOT crash or throw syntax errors ... ✅ PASS
   • Testing Adversarial XSS and SQL injection payloads execute safely as literal strings ... ✅ PASS
   • Testing Search is case-insensitive across uppercase, lowercase, and mixed-case ... ✅ PASS

   --- SECTION 2: DIVISION FILTERING ACROSS ALL DIVISIONS ---
   • Testing DIVISION_CATEGORIES includes all required division tabs ... ✅ PASS
   • Testing Division icon mapper handles Mekanik, Elektronik/Elektrik, Program, Manager/Manajerial ... ✅ PASS
   • Testing Every division in DIVISION_ORDER has members in teamData.ts ... ✅ PASS
   • Testing Division category buttons in UI reset search query on click ... ✅ PASS
   • Testing Single division view provides "Tampilkan Semua Divisi" escape hatch button ... ✅ PASS

   --- SECTION 3: RESPONSIVE GRID CLASSES & LAYOUT ADAPTABILITY ---
   • Testing Roster cards grid employs full 4-tier responsive breakpoint scale ... ✅ PASS
   • Testing Container sets maximum width constraint to prevent ultrawide distortion ... ✅ PASS
   • Testing Dual view layout mode toggle (Grid vs Carousel) is fully implemented ... ✅ PASS
   • Testing Carousel mode uses snap scrolling and touch momentum ... ✅ PASS

   --- SECTION 4: UNLIMITED UNDIP 2026 TIMELINE VERIFICATION ---
   • Testing newsData.ts: UNLIMITED UNDIP competition has date "2026" ... ✅ PASS
   • Testing Achievements.tsx: UNLIMITED UNDIP competition year is 2026 ... ✅ PASS

   --- SECTION 5: PHOTO UNBLOCKING ARCHITECTURE ---
   • Testing AboutTeamSection.tsx: Zero dark gradients or text captions over photo stage ... ✅ PASS
   • Testing HeroSection.tsx: Decoupled header zone from cinematic photo stage ... ✅ PASS
   • Testing TeamRosterSection.tsx: Division badges placed in top meta bar above photo viewport ... ✅ PASS

   ======================================================================
      EMPIRICAL CHALLENGER 1 — STRESS TEST SUMMARY MATRIX                
   ======================================================================
     Tests Passed:   22
     Tests Failed:   0
     Total Tests:    22
     Success Rate:   100.0%
   ======================================================================
   VERDICT: APPROVE (100% test assertions passed)
   ```

3. **Production Static Export Build (`cmd.exe /c npm.cmd run build`)**:
   ```
   > abhinaya-uny-web@1.0.0 build
   > next build

     ▲ Next.js 14.2.35
      Creating an optimized production build ...
    ✓ Compiled successfully
      Linting and checking validity of types ...
      Collecting page data ...
      Generating static pages (0/11) ...
      Generating static pages (11/11)
    ✓ Generating static pages (11/11)
      Finalizing page optimization ...

   Route (app)                               Size     First Load JS
   ┌ ○ /                                     32.7 kB         168 kB
   ├ ○ /_not-found                           142 B          87.6 kB
   ├ ○ /apple-icon.png                       0 B                0 B
   ├ ○ /divisi                               188 B           127 kB
   ├ ○ /icon.png                             0 B                0 B
   ├ ○ /krtmi                                142 B          87.6 kB
   ├ ○ /pertandingan                         7.68 kB         107 kB
   └ ○ /prestasi                             2.6 kB         93.2 kB
   + First Load JS shared by all             87.5 kB

   Route (pages)                             Size     First Load JS
   ┌   /_app                                 0 B              81 kB
   └ ○ /500                                  5.56 kB        86.6 kB
   + First Load JS shared by all             93.7 kB

   ○  (Static)  prerendered as static content

   > abhinaya-uny-web@1.0.0 postbuild
   > node scripts/postbuild.js

   [postbuild] Executing post-build export synchronization...
   [postbuild] Synced out/500.html from out\500\index.html (8872 bytes)
   [postbuild] Public assets mirror check complete (missing assets copied: 0)
   [postbuild] ✓ Verified index.html (930068 bytes)
   [postbuild] ✓ Verified 404.html (57796 bytes)
   [postbuild] ✓ Verified 500.html (8872 bytes)
   [postbuild] ✓ Verified 500\index.html (8872 bytes)
   [postbuild] ✓ Verified assets\logo_abhinaya.png (1328441 bytes)
   [postbuild] ✓ Postbuild export verification successfully completed.
   ```
   - Exit Code: **0**.

4. **Empirical Static HTML Output Verification (`node scripts/test_empirical_html_output.js`)**:
   ```
   ======================================================================
       EMPIRICAL CHALLENGER 2: STATIC HTML OUTPUT VERIFICATION HARNESS
   ======================================================================

   [TEST 1] Exported HTML Pages Integrity...
     ✔ [PASS] index.html                     (930.068 bytes)
     ✔ [PASS] divisi\index.html              (810.162 bytes)
     ✔ [PASS] prestasi\index.html            (69.506 bytes)
     ✔ [PASS] krtmi\index.html               (385.508 bytes)
     ✔ [PASS] pertandingan\index.html        (71.777 bytes)
     ✔ [PASS] 404.html                       (57.796 bytes)

   [TEST 2] Leaders Hall of Fame (2020-2025) in Static DOM (out/index.html)...
     ✔ [PASS] Leader in static DOM: Nurcholis                 [2020]
     ✔ [PASS] Leader in static DOM: Afif Aiman Saputra        [2021]
     ✔ [PASS] Leader in static DOM: Muhammad Iqbal Rasyid     [2022]
     ✔ [PASS] Leader in static DOM: Salsabila Azzahra         [2023]
     ✔ [PASS] Leader in static DOM: Ilham Widyo Nugroho       [2024]
     ✔ [PASS] Leader in static DOM: Farhan Yuda Mahendra      [2025]

   [TEST 3] Managers Showcase (2020-2025) in Static DOM (out/index.html)...
     ✔ [PASS] Manager in static DOM: Yuli Dwi Saputri          [2020]
     ✔ [PASS] Manager in static DOM: Mustika Wahyu Aprilia     [2023]
     ✔ [PASS] Manager in static DOM: Rose Pita Nur Afifah      [2024-2025]
     ✔ [PASS] Manager in static DOM: Zelfa Nafisah Zalna       [2025]

   [TEST 4] Active Technical Squad & Student Credentials in Static DOM...
     ✔ [PASS] Tri Wahyu Handoyo         | NIM: 22518241023 | Autonomous Navigation
     ✔ [PASS] Ikhsan Nurrohman          | NIM: 22538141004 | Embedded Systems
     ✔ [PASS] Agus Bagaskoro            | NIM: 21501244039 | Power Distribution
     ✔ [PASS] Muhamad Ilham Sony        | NIM: 20539144016 | Mechanical Structure
     ✔ [PASS] Caesar Sokma Langgeng     | NIM: 21539144005 | Mechanism & 3D CAD
     ✔ [PASS] Rionaldi Nugroho          | NIM: 23090620088 | Rapid Prototyping

   [TEST 5] Alumni & Generation Explorer in Static DOM...
     ✔ [PASS] Generation Era: 2020 [VERIFIED]
     ✔ [PASS] Generation Era: 2021 [VERIFIED]
     ✔ [PASS] Generation Era: 2022 [VERIFIED]
     ✔ [PASS] Generation Era: 2023 [VERIFIED]
     ✔ [PASS] Generation Era: 2024 [VERIFIED]
     ✔ [PASS] Generation Era: 2025 [VERIFIED]

   [TEST 6] Deep Static Asset URLs, Scripts, CSS & BasePath Validation...
     ✔ [PASS] Total asset and navigation URLs checked: 1359
     ✔ [PASS] Broken asset links count: 0 (100% Valid)

   [TEST 7] CSS Bundle Integrity & Tailwind Styling Classes...
     ✔ [PASS] Utility class: bg-brand-orange           [COMPILED]
     ✔ [PASS] Utility class: text-brand-orange         [COMPILED]
     ✔ [PASS] Utility class: text-amber-300            [COMPILED]
     ✔ [PASS] Utility class: text-emerald-300          [COMPILED]
     ✔ [PASS] Utility class: grid-cols-1               [COMPILED]
     ✔ [PASS] Utility class: duration-1000             [COMPILED]
     ✔ [PASS] Compiled CSS bundle size: 79.678 bytes

   [TEST 8] Hydration Safety, OpenGraph & Meta Tag Verification...
     ✔ [PASS] Responsive Viewport, Charset, Title, and OpenGraph tags verified

   [TEST 9] Performance & Bundle Size Budgets...
     ✔ [PASS] Total JS Chunks Count: 26
     ✔ [PASS] Total JS Static Size: 1048.1 kB

   ======================================================================
     ALL EMPIRICAL TESTS PASSED! (9 suites, 57 assertions)
   ======================================================================
   ```

5. **E2E Integration & Data Integrity Verification (`node scripts/run_e2e_tests.js`)**:
   - Total Tests: **57 passed, 57 total**
   - Assertions: **3477 passed, 3477 total**
   - Exit Code: **0**.

---

## 2. Logic Chain

1. **From Observation 1.1**: Direct code inspection confirms that `DecryptedText`, `ShinyText`, `BlurText`, `SpotlightCard`, `CountUp`, and `AmbientGrid` contain authentic, algorithmic implementations (state machines, intervals, `IntersectionObserver`, `requestAnimationFrame`, CSS variable DOM mutation, SVG patterns). None are placeholder facades or constant-returning dummies.
2. **From Observation 1.2**: Direct inspection of integrated components (`HeroSection`, `TeamRosterSection`, `Achievements`, `NewsMediaSection`, `AboutTeamSection`, `KrtmiChronicles`, `KRIOverview`, `app/pertandingan/page.tsx`) confirms that all React Bits primitives are meaningfully integrated into active user flows. Photo containers preserve 100% unobstructed viewports with zero text or heavy gradient overlays over people's faces or robots.
3. **From Observation 1.3**: Package inspection and codebase-wide grep prove that zero unapproved heavy dependencies (e.g. `framer-motion`, `gsap`, `@react-spring`) were installed. The implementation is 100% lightweight and bespoke.
4. **From Observation 1.4**: Codebase search confirms zero test runner sniffing (`NODE_ENV === 'test'`) and zero hardcoded test pass strings. Tests verify genuine DOM nodes and filesystem assets.
5. **From Observation 1.5**: Independent execution of `npm.cmd run build` produced 11/11 static pages with exit code 0. Subsequent empirical test harnesses (`test_empirical_html_output.js`, `stress_test_edge_cases.js`, `test_reactbits_suite.js`, `run_e2e_tests.js`) passed with 100% success rate across 3,500+ assertions.
6. **Synthesis**: The codebase adheres to all requirements from `ORIGINAL_REQUEST.md` and `SCOPE.md` with zero integrity violations.

---

## 3. Caveats

- **No caveats**: All 8 animation primitive files, 8 integrated component files, 4 independent test suites, `package.json`, and the complete Next.js static build export (`out/`) were comprehensively inspected and tested.

---

## 4. Conclusion

- Final Assessment: The Milestone 3 implementation of React Bits animation components and section integrations is authentic, performant, accessible, and free of any dummy facades, hardcoded test tricks, or unapproved dependencies.
- **Definitive Binary Verdict**: **CLEAN**

---

## 5. Verification Method

To independently verify the audit conclusions:

1. **Execute React Bits Test Suite**:
   ```powershell
   node scripts/test_reactbits_suite.js
   ```
   *Expected*: 30 tests pass, exit code 0.

2. **Execute Edge Case Stress Test**:
   ```powershell
   node scripts/stress_test_edge_cases.js
   ```
   *Expected*: 22 tests pass, exit code 0.

3. **Execute Production Static Build**:
   ```powershell
   cmd.exe /c npm.cmd run build
   ```
   *Expected*: 11/11 static pages generated, `out/` exported, exit code 0.

4. **Execute Empirical HTML Output Verification**:
   ```powershell
   node scripts/test_empirical_html_output.js
   ```
   *Expected*: 9 suites, 57 assertions pass, exit code 0.

5. **Inspect Dependencies**:
   ```powershell
   git grep "framer-motion"
   ```
   *Expected*: Referenced only inside `scripts/test_reactbits_suite.js` as an assertion target.
