# Handoff Report: Codebase Component Survey & React Bits Integration Blueprint

## 1. Observation

### 1.1 Project Structure & Build Configuration
- **Project Root**: `D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web`
- **Next.js & React Version** (`package.json:15-17`): Next.js `14.2.35`, React `18.3.1`, React-DOM `18.3.1`, TailwindCSS `3.4.3`. Note: Framer Motion is currently NOT installed; React Bits animations should either use lightweight CSS/standard React hooks or vanilla Web APIs to keep bundle sizes lean.
- **Export Target** (`next.config.js:2-10`):
  ```javascript
  const nextConfig = {
    output: 'export',
    outputFileTracing: false,
    basePath: process.env.NODE_ENV === 'production' ? '/AbhinayaUNY_Web' : '',
    images: { unoptimized: true },
    trailingSlash: true,
  };
  ```
  *Constraint*: All dynamic components must be fully safe for static export (`output: 'export'`), Client Component hydration (`'use client'`), and prefix all internal assets with `basePath`.

- **Existing Automated Test Suites**:
  - `node scripts/stress_test_edge_cases.js` (22 assertions across 5 sections, exits code 0).
  - `node scripts/test_empirical_html_output.js` (9 test suites, 57 assertions, exits code 0).
  *Critical Finding from Test 2, 3, 4, 5 of `test_empirical_html_output.js`*: The test inspects the raw static HTML string (`out/index.html`) for exact member names (`Nurcholis`, `Afif Aiman Saputra`, `Tri Wahyu Handoyo`, etc.), student NIMs (`22518241023`, `22538141004`, etc.), and generation years (`2020` through `2025`). **If `DecryptedText` modifies the initial server-rendered HTML string to scrambled characters, static DOM validation will fail.** Therefore, `DecryptedText` MUST output authentic text during SSR/initial static render, and only trigger scrambles on client interaction / mount!

---

### 1.2 Component Tree & Layout Map

The application has 5 core routes in `app/`:
1. `app/page.tsx`: Main landing page composed of:
   - `<HeroSection />`
   - `<YouTubeVideoShowcase />`
   - `<AboutTeamSection />`
   - `<Achievements />`
   - `<KRIOverview />`
   - `<KrtmiChronicles />`
   - `<NewsMediaSection />`
   - `<InstagramFeedShowcase />`
   - `<DocumentationGallerySection />`
   - `<TeamRosterSection showAllLink={true} />`
   - `<SocialMediaHub />`
2. `app/divisi/page.tsx`: Structure of 4 divisions, FAQ, and embedded `<TeamRosterSection showHeader={true} showAllLink={false} />`
3. `app/prestasi/page.tsx`: Cabinet of trophies, press release links, and embedded `<Achievements />`
4. `app/krtmi/page.tsx`: Detailed rulebook deep-dive from 2026 to 2019 with PDF downloads
5. `app/pertandingan/page.tsx`: Match history, telemetry metrics, match analysis, and YouTube video stage

---

### 1.3 Detailed Component Survey & React Bits Integration Points

#### A. HeroSection (`components/HeroSection.tsx`)
- **Current DOM Structure**:
  - Lines 25-30: Background glow overlays (`bg-brand-orange/15 blur-[130px]`).
  - Lines 35-48: Emblem (`assets/logo_abhinaya.png`) + Category pill (`TIM ROBOTIKA • UKM REKAYASA TEKNOLOGI UNY`).
  - Lines 52-65: Title `<h1>` ("ABHINAYA UNY"), tagline ("Divisi Kontes Robot Tematik Indonesia (KRTMI)"), and achievement pill ("JUARA 1 WILAYAH I & JUARA 2 NASIONAL KRTMI 2024").
  - Lines 68-86: Dual CTAs (`#about-tim` and `#video-aksi`).
  - Lines 109-129: Unblocked photo stage (`aspect-[16/10] sm:aspect-[16/9]`, `assets/hero_abhinaya.jpg`), with dedicated caption container below the image.
- **Integration Blueprint**:
  1. **`AmbientGrid`**: Add as absolute background layer (`inset-0 pointer-events-none z-0`) with subtle radial-masked grid lines (`rgba(255, 107, 0, 0.06)`).
  2. **`SplitText` / `BlurText`**: Wrap `<h1>` `"ABHINAYA UNY"` and the subtitle. Maintain `aria-label="ABHINAYA UNY"` on the container for screen readers and SEO.
  3. **`ShinyText`**: Wrap achievement badge `"JUARA 1 WILAYAH I & JUARA 2 NASIONAL KRTMI 2024"`, adding an animated golden-orange metallic sweep.
  4. **`DecryptedText`**: Wrap category pill `"TIM ROBOTIKA • UKM REKAYASA TEKNOLOGI UNY"`.

#### B. TeamRosterSection (`components/TeamRosterSection.tsx`)
- **Current Architecture**:
  - Contains `LEADERS_HALL_OF_FAME`, `MANAGERS_SHOWCASE`, `ACTIVE_TECHNICAL_SQUAD`, and `ALUMNI_GENERATIONS`.
  - Member Card (`renderMemberCard` at lines 504-650):
    - Current card has an inline experimental spotlight at lines 546-554 driven by `spotlightPos[member.id]` in top-level state:
      ```tsx
      {spotlightPos[member.id]?.opacity ? (
        <div
          className="pointer-events-none absolute -inset-px rounded-3xl transition-opacity duration-300 z-30"
          style={{
            opacity: spotlightPos[member.id].opacity,
            background: `radial-gradient(360px circle at ${spotlightPos[member.id].x}px ${spotlightPos[member.id].y}px, rgba(255, 107, 0, 0.16), transparent 70%)`,
          }}
        />
      ) : null}
      ```
    - **Issue Identified**: Component-level state update on every `onMouseMove` forces continuous re-renders of the large roster tree.
    - **Card Layout**:
      - Section 1 (Top Bar, lines 563-592): `px-3.5 py-2.5 bg-[#180F09] border-b border-[#2A180E] flex items-center justify-between` containing Division badge and Era badge ABOVE the headshot.
      - Section 2 (Photo Viewport, lines 595-608): `aspect-[4/3] sm:aspect-square overflow-hidden bg-[#0A0704] border-b border-[#2A180E]`, containing `MemberPhotoFadeShowcase`. 0% dark gradient, 0% overlay badge covering face.
      - Section 3 (Card Body, lines 611-648): Name, role, NIM, quote bubble BELOW the photo.
    - Modal (lines 1302-1420): Two-column layout with photo on left and details on right.
- **Integration Blueprint**:
  1. **`SpotlightCard`**: Replace the component-level `spotlightPos` state with a self-contained `SpotlightCard` wrapper using CSS custom properties (`--mouse-x`, `--mouse-y`) or local ref-based pointer tracking. Preserves 60 FPS performance without re-rendering parent components.
  2. **`DecryptedText`**: Apply to division badges (`member.division`), era tags, or role pills. Must preserve SSR plain-text output to satisfy `scripts/test_empirical_html_output.js` assertions.
  3. **Zero Face Obscuration**: The existing decoupling (Bar Above -> Photo Viewport -> Body Below) must be strictly maintained. Spotlight radial illumination must be semi-transparent (`rgba(255, 107, 0, 0.12)`) and pointer-events-none so photos remain crisp and clickable.

#### C. Achievements (`components/Achievements.tsx`)
- **Current Architecture**:
  - Lines 5-54: Array of 6 trophies (2026 UNDIP Finalis, 2026 Technocorner UGM, 2024 Juara 1 Regional, 2024 Juara 2 Nasional, 2023 Juara 3 Wilayah, 2023 Finalis Nasional).
  - Lines 85-124: Grid layout (`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`). Cards have dark warm amber styling (`bg-[#120D08] border-[#2B1B10]`).
- **Integration Blueprint**:
  1. **`SpotlightCard`**: Wrap all 6 award cards with orange spotlight glow (`rgba(255, 107, 0, 0.18)`), creating interactive tactile depth on hover.
  2. **`ShinyText`**: Apply to the section title `"Kabinet Prestasi & Jejak Podium Nasional 🏆"` and the national champion titles.
  3. **`DecryptedText`**: Apply to the year badges (`2026`, `2024`, `2023`) and award pills (`🥇 JUARA 1 REGIONAL`, etc.).

#### D. News & Articles (`components/NewsMediaSection.tsx`)
- **Current Architecture**:
  - Lines 34-121: Iterates over `OFFICIAL_NEWS_ARTICLES`. Each item is an `<a>` tag with `aspect-[16/9]` thumbnail at top, badges + date + title + summary in the middle, and "Baca Artikel Asli" link at bottom.
- **Integration Blueprint**:
  1. **`SpotlightCard`**: Wrap each news card (or use `as="a"` in SpotlightCard) with cursor lighting tracking pointer movement across the card.
  2. **`DecryptedText`**: Apply to media portal badges (`Humas UNY`, `ANTARA News`, `Puspresnas`).
  3. **`ShinyText`**: Apply to headline or first featured news title.

#### E. Technical & Telemetry Sections
- **`AboutTeamSection.tsx` (lines 93-105)**:
  - 3 Stat badges:
    - `"7+ Periode"` (Riset KRTMI Sejak 2019)
    - `"100% Otonom"` (Teknologi Kamera AI)
    - `"UKM Restek UNY"` (Tingkat Universitas & BPTI)
  - **Integration**: Apply `CountUp` to `"7"` and `"100"`. Wrap stat containers in `SpotlightCard`.
- **`KrtmiChronicles.tsx` (lines 186-226)**:
  - 4 Telemetry quick-spec cards:
    - Durasi Match: `3 Menit` (`Clock`)
    - Batas Voltase: `Maksimal 13.0V DC` / `24.0V DC` (`Zap`)
    - Kondisi Menang: `”BERSIH” Mutlak` (`Award`)
    - Sistem Robot: `100% Otonom` (`Cpu`)
  - **Integration**: `CountUp` on match duration (`3`) and voltage limits (`13.0`, `24.0`); `DecryptedText` on victory condition and robot system status.
- **`app/pertandingan/page.tsx` (lines 296-317)**:
  - Match Tech Telemetry specs:
    - Kecepatan Sasis: `1.4 m/s Max`
    - Waktu Siklus Sortir: `< 12 Detik`
    - Akurasi Deteksi AI: `98.4% Precision`
  - **Integration**: Viewport-triggered `CountUp` with decimals for `1.4`, `12`, and `98.4%`.

#### F. Non-Regression Safeguards
- **PDF Guidebook Download Links** (`KrtmiChronicles.tsx:450-459`, `app/krtmi/page.tsx:342-351`):
  - Must retain `${basePath}/guidebooks/${story.pdfFile}`, `download` attribute, and standard click events.
- **YouTube Video Showcase** (`components/YouTubeVideoShowcase.tsx` & `app/pertandingan/page.tsx`):
  - Must preserve inline iframe player (`https://www.youtube-nocookie.com/embed/${id}`), fullscreen modal lightbox, and video selector tabs.
- **Navigation Bar** (`components/Navbar.tsx`):
  - Must maintain sticky position (`z-50`), smooth scrolling anchor offsets, and mobile drawer toggling. Background grid must never obscure or intercept navbar events.

---

## 2. Logic Chain

1. **Static Export & Hydration Consistency**:
   - *Observation*: `next.config.js` sets `output: 'export'` and tests in `test_empirical_html_output.js` directly read `out/index.html` to assert that strings like `Tri Wahyu Handoyo` and `22518241023` exist verbatim in the static output.
   - *Logic*: Any text animation component (e.g. `DecryptedText`) that randomizes or replaces text during initial render will cause static export output to contain scrambled text, breaking static verification and SEO.
   - *Remediation*: All text animations must render the target string synchronously during SSR/static export, and only initiate animation effects upon client mounting (`useEffect`) or interaction (`onMouseEnter`).

2. **Performance Isolation in SpotlightCard**:
   - *Observation*: `TeamRosterSection.tsx` currently updates a top-level React state object `spotlightPos` on every `onMouseMove` over 30+ member cards.
   - *Logic*: Updating parent component state at 60Hz causes re-evaluation and potential DOM reconciliation of the entire roster tree, leading to jank on low-spec laptops and mobile devices.
   - *Remediation*: `SpotlightCard` must be encapsulated as a standalone component where mouse tracking is handled locally via CSS custom properties (`--mouse-x`, `--mouse-y`) or local ref updates without triggering parent re-renders.

3. **Photo Visibility & Face Preservation**:
   - *Observation*: Requirements R1 of 2026-09-05T07:14:50Z and R2 of 2026-09-05T14:40:41Z strictly require zero text or dark gradients obscuring faces or robot hardware.
   - *Logic*: The existing components already separate the visual hierarchy into three clean layers: Top meta bar -> Photo viewport -> Card body below.
   - *Remediation*: React Bits animations (Spotlight lighting, DecryptedText badges) must wrap or sit within these existing decoupled containers. Spotlight illumination must use `pointer-events-none` with low opacity (`rgba(255, 107, 0, 0.15)`), ensuring that faces and robot mechanisms remain 100% visible and unblocked.

4. **Reduced-Motion & Accessibility**:
   - *Observation*: User requirements mandate graceful degradation for `prefers-reduced-motion` and low-power devices.
   - *Logic*: High-frequency animations (SplitText blur, DecryptedText scrambles) can be disorienting or sluggish for users with vestibular disorders or older hardware.
   - *Remediation*: All React Bits components should include `@media (prefers-reduced-motion: reduce)` checks (or standard media query hooks) to fall back immediately to static, fully-rendered states.

---

## 3. Caveats

1. **No Source Code Modifications Made**: This investigation strictly complied with the explorer read-only policy. No project source files in `components/`, `app/`, or `data/` were modified.
2. **Framer Motion Absence**: Framer Motion is not in `package.json`. The proposed React Bits component implementations should be built using native React hooks (`useState`, `useEffect`, `useRef`), Tailwind CSS keyframes, and the IntersectionObserver API rather than introducing heavy third-party animation dependencies.
3. **Static DOM Regex Constraints**: The test `scripts/stress_test_edge_cases.js` checks for specific CSS class substrings (e.g. `grid-cols-1`, `sm:grid-cols-2`, `lg:grid-cols-3`, `xl:grid-cols-4`, `px-3.5 py-2.5 bg-[#180F09]`). When wrapping cards in `SpotlightCard`, these classes must either remain directly on the container or be passed transparently via `className`.

---

## 4. Conclusion

The existing codebase is clean, well-architected, and adheres to the decoupled layout model (badges above -> photo viewport -> body below). 
The exact integration points for the 6 React Bits components are mapped out as follows:
- **`SpotlightCard`**:
  - `components/TeamRosterSection.tsx`: Member cards (replace parent-state `spotlightPos`).
  - `components/Achievements.tsx`: 6 Award cards.
  - `components/NewsMediaSection.tsx`: News article cards.
  - `components/KRIOverview.tsx`: 6 KRI Division cards.
- **`DecryptedText`**:
  - `components/HeroSection.tsx`: Category pill (`TIM ROBOTIKA • UKM REKAYASA TEKNOLOGI UNY`).
  - `components/Achievements.tsx`: Award badges (`🥇 JUARA 1 REGIONAL`, etc.).
  - `components/KrtmiChronicles.tsx`: Victory conditions and robot system status.
  - `components/KRIOverview.tsx`: Division codes (`KRTMI`, `KRAI`, `KRSTI`, etc.).
  *Rule*: Must render authentic plain text in initial SSR output.
- **`ShinyText`**:
  - `components/HeroSection.tsx`: Achievement headline `"JUARA 1 WILAYAH I & JUARA 2 NASIONAL KRTMI 2024"`.
  - `components/Achievements.tsx`: Cabinet title `"Kabinet Prestasi & Jejak Podium Nasional 🏆"`.
- **`SplitText` / `BlurText`**:
  - `components/HeroSection.tsx`: Headline `"ABHINAYA UNY"` and KRTMI tagline.
- **`CountUp`**:
  - `components/AboutTeamSection.tsx`: Stats numbers (`7+ Periode`, `100% Otonom`).
  - `components/KrtmiChronicles.tsx`: Match duration (`3 Menit`), voltage caps (`13.0V`, `24.0V`).
  - `app/pertandingan/page.tsx`: Telemetry metrics (`1.4 m/s`, `< 12 Detik`, `98.4% Precision`).
- **`AmbientGrid`**:
  - `components/HeroSection.tsx` & technical overview backgrounds: Low-GPU subtle orange grid overlay (`rgba(255,107,0,0.06)`).

---

## 5. Verification Method

To independently verify this codebase survey and the upcoming implementations:

1. **Verify Static Build Integrity**:
   ```powershell
   npm run build
   ```
   *Expected*: Succeeds with exit code 0, generating 11 static pages in `out/`.

2. **Verify Edge Cases & UI Constraints**:
   ```powershell
   node scripts/stress_test_edge_cases.js
   ```
   *Expected*: Passes 22/22 assertions (100% success rate, exit code 0).

3. **Verify Empirical Static HTML Output**:
   ```powershell
   node scripts/test_empirical_html_output.js
   ```
   *Expected*: Passes all 9 suites and 57 assertions (exit code 0), verifying that all leaders, managers, active squad NIMs, and assets remain present in static DOM.
