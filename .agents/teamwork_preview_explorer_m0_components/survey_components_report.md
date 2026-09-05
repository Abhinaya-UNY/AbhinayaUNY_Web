# Comprehensive Survey Report: UI Components, Sections, and Motion Integrations
**Abhinaya UNY Robotics Portal Redesign**

- **Date:** 2026-09-06
- **Auditor:** `explorer_m0_components` (teamwork_preview_explorer)
- **Project Root:** `D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web`
- **Reference Document:** `.agents/ORIGINAL_REQUEST.md` (Header `## 2026-09-05T17:57:00Z`)

---

## 1. Executive Summary

This survey provides an exhaustive technical and aesthetic audit of all UI components, sections, pages, motion primitives, and styling architectures in the Abhinaya UNY Robotics Portal codebase.

### Core Survey Findings:
1. **R4 Adherence Gaps**:
   - **Hero Stage**: Clean framing for team photography is implemented, but **floating status telemetry pills** (e.g., active telemetry, battery voltage, division status) and **refined minimalist CTA buttons** are missing.
   - **Leaders & Managers Showcase**: Has horizontal scroll and auto-crossfade via `MemberPhotoFadeShowcase`, but lacks an explicit chronological timeline visual (e.g. connected year markers) and currently overlays badge pills directly inside the headshot viewport.
   - **Active Technical Squad (2025)**: Roster cards are rich in detail, but division tabs currently include 7 categories (All, Ketua Tim, Manager, Program, Elektronik, Mekanik, Pembimbing). Streamlining to primary engineering divisions (**Program, Elektronik, Mekanik**) with high-density, readable member cards is needed to fulfill R4.
   - **Rulebook & Tournament Archives (2019–2026)**: Tabbed structure and specs exist in `KrtmiChronicles.tsx`, but **arena diagrams** are currently only accessible via cover image previews rather than dedicated visual arena layout graphics.
   - **Preloader & Navigation**: Navbar features sticky positioning and blur backdrop, but lacks **smooth scroll-spy indicators** (active link does not dynamically track scroll position through `#about-tim`, `#prestasi`, `#kri-overview`, `#krtmi-story`, `#berita-media`, `#team-roster`).
2. **Motion & Interaction Suite (`react-bits` Inspiration)**:
   - Implemented primitives: `BlurText`, `DecryptedText`, `ShinyText`, `SpotlightCard`, `CountUp`, `AmbientGrid`, `CyberBento`, `GsapReveal`.
   - Missing required primitives:
     - **`Aurora`**: Fluid, ambient mesh gradient background for Hero and header stages.
     - **`TiltedCard`**: Subtle 3D perspective hover feedback for roster and gallery cards.
     - **`Magnet`**: Magnetic cursor-pull physics for CTA buttons.
3. **Photo Unblocking Invariant (`Top Bar -> Photo Viewport -> Card Body`)**:
   - Followed perfectly in `InstagramFeedShowcase.tsx` and `AboutTeamSection.tsx`.
   - **Partial violation in `TeamRosterSection.tsx`**: Floating division pills and era badges are placed using `absolute top-2.5 left-2.5` directly inside the photo viewport. They must be decoupled into an independent top meta bar above the photo.
4. **Color Palette & Design System**:
   - The current codebase is heavily styled with legacy Electric Orange (`#FF6B00`, `text-brand-orange`, `bg-brand-orange`) and Amber accents.
   - It requires transition to the specified **Deep Obsidian (`#0B0B0E` / `#121216`) base canvas with subtle Emerald Green (`#10B981` / `#059669`) glow accents**, replacing garish orange gradients with calm industrial minimalism inspired by `virose.team`.

---

## 2. Exhaustive Survey of UI Components & Sections

### 2.1. Hero Stage (`components/HeroSection.tsx`)
- **File Location:** `components/HeroSection.tsx` (160 lines)
- **Current Layout & Architecture:**
  - Background: `bg-[#050507]` with `AmbientGrid` (`opacity={0.25}`) and a single static radial glow (`bg-brand-orange/8 blur-[120px]`).
  - Header Zone: White logo container (`w-12 h-12 rounded-2xl bg-white p-1.5`), category line with `DecryptedText` ("TIM ROBOTIKA • UKM REKAYASA TEKNOLOGI UNY").
  - Typography: Main title "ABHINAYA UNY" with staggered letter-by-letter `BlurText`, subtitle with word-by-word `BlurText`, and championship achievement badge with `ShinyText`.
  - Action Buttons: Two large rounded-full buttons:
    1. Primary CTA: `bg-brand-orange text-black font-bold shadow-lg shadow-brand-orange/20` ("JELAJAHI TIM & BUKU PANDUAN").
    2. Secondary CTA: `border border-white/10 bg-white/[0.02] text-slate-300` ("SAKSIKAN AKSI ROBOT DI ARENA").
  - Quick Links: Pill links to `/krtmi` and `/pertandingan`.
  - Photo Stage: Cinematic studio frame housing `assets/hero_abhinaya.jpg` in `aspect-[16/10] sm:aspect-[16/9]` with a bottom meta strip.
- **R4 Evaluation & Observations:**
  - *Unblocked Photography*: 100% unblocked; zero text overlays over faces.
  - *Floating Status Telemetry Pills*: **Missing**. Only has a static bottom strip and an achievement pill in the header. Lacks floating telemetry capsules (e.g. Robot Status: Autonomous, Power: 13.0V DC, Division: KRTMI).
  - *Palette*: Orange-heavy (`brand-orange`, `amber-400`); needs transition to Deep Obsidian + Emerald Green (`#10B981`).
  - *Motion Integration*: Has `BlurText`, `DecryptedText`, `ShinyText`. Could be upgraded with an ambient `Aurora` canvas behind the title and `Magnet` physics on the CTA buttons.

### 2.2. Leaders & Managers Showcase (`components/TeamRosterSection.tsx`)
- **File Location:** `components/TeamRosterSection.tsx` (Lines 987–1088)
- **Current Layout & Architecture:**
  - Two dedicated horizontal scroll tracks (`HorizontalScrollMemberTrack`):
    1. **Leaders Hall of Fame (2020–2025)**: 6 official team leaders (`LEADERS_HALL_OF_FAME`) with `Crown` icons and chronological leadership timeline.
    2. **Managers Showcase (2020–2025)**: 4 official team managers (`MANAGERS_SHOWCASE`) with `Briefcase` icons and operational badges.
  - Interactive Card: Built with `SpotlightCard` and `MemberPhotoFadeShowcase` for smooth multi-photo crossfades.
- **R4 Evaluation & Observations:**
  - *Timeline Presentation*: Currently displayed as a horizontal card track with left/right chevrons. It lacks a visible horizontal timeline connecting line/nodes to convey the chronological progression visually.
  - *Photo Viewport Invariant*: Cards place floating division pills (`absolute top-2.5 left-2.5`) inside the photo viewport. While semi-transparent, this should be moved above the photo into a decoupled bar.
  - *Color Palette*: Leaders track uses Amber (`#EAB308`), Managers track uses Emerald (`#10B981`). Overall card spotlights remain orange (`rgba(255, 107, 0, 0.12)`).

### 2.3. Active Technical Squad (2025) (`components/TeamRosterSection.tsx`)
- **File Location:** `components/TeamRosterSection.tsx` (Lines 701–985)
- **Current Layout & Architecture:**
  - Top Filter Bar: Tabs for `All`, `Ketua Tim`, `Manager`, `Program`, `Elektronik`, `Mekanik`, `Pembimbing`.
  - Layout Mode Toggle: Supports both 4-tier CSS Grid (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`) and Carousel Track (`Columns`).
  - Search Engine: Case-insensitive instant filtering matching name, NIM, skills, specializations, roles, and quotes. Includes an adversarial-safe empty state with a reset button.
  - Member Card: Displays photo, name, role, authentic PDDikti NIM, study program, up to 2 specialization tags with overflow indicator, and profile link opening a comprehensive lightbox modal.
- **R4 Evaluation & Observations:**
  - *Streamlined Division Filter Tabs*: The current 7 tabs include leadership roles that duplicate the dedicated showcases below. R4 calls for streamlined division tabs focused on technical engineering squads: **Program, Elektronik, Mekanik**.
  - *Information Density & Readability*: The card body layout is crisp, legible, and compact.
  - *Photo Viewport Invariant*: Badges should be moved out of the photo container into a top bar.

### 2.4. Rulebook & Tournament Archives (2019–2026) (`components/KrtmiChronicles.tsx`)
- **File Location:** `components/KrtmiChronicles.tsx` (500 lines)
- **Current Layout & Architecture:**
  - Year Navigation: Ordered 2026 (Technocorner) down to 2019 (KRTMI Pioneer) with champion trophy indicators.
  - Tournament Header: Cover thumbnail preview with zoom modal, title, location, slogan, and achievement banner.
  - Telemetry Bar: 4 metric cards (Match Duration, Power Cap, Victory Condition, Autonomy Mode) using `CountUp` and `DecryptedText`.
  - 6 Subtabs:
    1. *Ringkasan*: Story summary, mission rules, team role facts.
    2. *Arena*: Text specs for dimensions, surface, zones, obstacles, lighting.
    3. *Robot*: Robot count, start dimensions, expanded dimensions, weight.
    4. *Objek*: Game objects, physical properties, match procedure.
    5. *Skor*: Scoring breakdown list.
    6. *Penalti*: Penalties, retries, disqualification rules.
  - Download Bar: Direct download link to official guidebook PDF.
- **R4 Evaluation & Observations:**
  - *Arena Diagrams*: Subtab 2 ("Spesifikasi Arena") currently provides only text specifications. There is no dedicated arena layout diagram or vector arena schematic embedded.
  - *Interactive Tabs*: Fast, responsive, clean.
  - *Color Palette*: Buttons and borders use orange and gold; needs Obsidian + Emerald styling.

### 2.5. Preloader & Navigation (`components/Preloader.tsx` & `components/Navbar.tsx`)
- **Preloader (`components/Preloader.tsx`):**
  - Displays logo, telemetry status messages ("INITIALIZING CORE TELEMETRY", "SYNCHRONIZING KRTMI DATA ARCHIVES", "CALIBRATING MECANUM KINEMATICS", "ALL SYSTEMS READY"), and a 0–100% linear progress bar.
  - Stored in `sessionStorage` (`abhinaya_preloader_loaded`) to avoid annoying returning users.
  - Styling: Progress bar uses orange/amber gradient (`from-brand-orange to-amber-400`); should be updated to Emerald Green (`#10B981`).
- **Navbar (`components/Navbar.tsx`):**
  - Sticky header (`h-16 sm:h-18`) with blur backdrop (`bg-[#050507]/90 backdrop-blur-md border-b border-white/5`).
  - Navigation links: HOME, ABOUT, PRESTASI, KRI, KRTMI, BERITA, LAGA, ROSTER.
  - Smooth scroll behavior with 70px offset compensation for in-page anchors.
  - Social media icons (Instagram, TikTok, YouTube).
  - Mobile slide-out drawer menu with touch-friendly navigation items.
- **R4 Evaluation & Observations:**
  - *Scroll-Spy Indicators*: **Missing**. The active nav link currently evaluates `pathname === link.href`. When scrolling through section anchors on the home page, the active indicator does not dynamically update to highlight the section currently in viewport.
  - *Styling*: Active state uses `bg-brand-orange/10 text-brand-orange`. Needs subtle Emerald glow indicators.

### 2.6. Achievements Cabinet (`components/Achievements.tsx`)
- **File Location:** `components/Achievements.tsx` (148 lines)
- **Current Data & Layout:**
  - Contains 6 official tournament accolades from 2023 to 2026.
  - Accurately includes UNLIMITED UNDIP 2026 (Finalis Lomba Robot Kreatif Nasional) and Technocorner UGM 2026.
  - Implements `SpotlightCard` with hover radial lighting and `ShinyText` on section headline.
- **R4 Evaluation & Observations:**
  - Data integrity is 100% aligned with verified records.
  - Card spotlight color currently hardcoded to orange/amber (`rgba(245, 158, 11, 0.14)` and `rgba(234, 88, 12, 0.10)`). Needs Emerald Green (`rgba(16, 185, 129, 0.15)`).

### 2.7. News & Media Section (`components/NewsMediaSection.tsx`)
- **File Location:** `components/NewsMediaSection.tsx` (122 lines)
- **Current Layout:**
  - Grid of articles from UNY Humas, ANTARA News, and Puspresnas.
  - Structure:
    1. Pristine 16:9 thumbnail viewport (100% unblocked).
    2. Dedicated meta strip below thumbnail (Badge, Portal, Date, Stats, Title, Summary).
    3. Action link footer with hover arrow animation.
- **R4 Evaluation & Observations:**
  - Follows photo unblocking invariants cleanly.
  - Uses `SpotlightCard` and `DecryptedText`.
  - Palette needs emerald accent update.

### 2.8. About Team Section (`components/AboutTeamSection.tsx`)
- **File Location:** `components/AboutTeamSection.tsx` (150 lines)
- **Current Layout:**
  - 3-tier decoupled layout:
    - Tier 1: Top meta bar (`px-5 py-3.5 bg-[#0E0E12] border-b border-white/5` with official contingent badge and venue info).
    - Tier 2: Unblocked photo viewport (`aspect-[16/10] sm:aspect-[16/9]` with `team_ums_2024_web.jpg`).
    - Tier 3: Caption box below (`p-5 sm:p-7 bg-[#0E0E12] border-t border-white/5` with narrative description).
  - 2-column secondary section: Workshop narrative with 3 `SpotlightCard` metric counters (`CountUp`) and 2 unblocked workshop photos.
- **R4 Evaluation & Observations:**
  - Exemplary adherence to photo unblocking rules. Zero text overlays on team photos.
  - Palette needs emerald refinement.

### 2.9. KRI Overview (`components/KRIOverview.tsx`)
- **File Location:** `components/KRIOverview.tsx` (232 lines)
- **Current Layout:**
  - Detailed explanation of KRI and KRTMI division specialization.
  - 4 Pillars of KRTMI Mechatronics (Dynamic Thematic Mission, AI Computer Vision, Holonomic 4WD Mecanum Kinematics, Integrated Mechatronics) with `SpotlightCard`.
  - Comparative cards for other KRI divisions (KRAI, KRSTI, KRSBI-B, KRSBI-H, KRSRI).
- **R4 Evaluation & Observations:**
  - Strong authentic robotics copywriting; clear technical explanations.
  - Currently styled with orange spotlights; needs emerald styling.

### 2.10. Supporting Media Components
- **`components/InstagramFeedShowcase.tsx`**:
  - Full 3-tier decoupled structure: dedicated mini-header above photo, 1:1 unblocked photo viewport with auto-crossfade, indicator dots outside photo, dedicated card content below.
  - Category filters and modal lightbox.
- **`components/DocumentationGallerySection.tsx`**:
  - 4:3 natural aspect ratio cards with meta placed below the photo.
  - Category filter pills and image zoom lightbox.
- **`components/YouTubeVideoShowcase.tsx`**:
  - Tabbed video player for 16:9 full matches and 9:16 vertical shorts.
  - Modal video player with smooth keyboard ESC trap.
- **`components/SocialMediaHub.tsx`**:
  - Direct portal cards for Instagram, TikTok, and YouTube channels.
- **`components/Footer.tsx`**:
  - Official brand logo, university affiliation, navigation links, and copyright statement.

---

## 3. App Pages Survey

| Page Path | Title / Function | Current Status & Components Used | Recommendations |
| :--- | :--- | :--- | :--- |
| `app/page.tsx` | Main Landing Portal | Assembles all 11 sections sequentially in single-page flow. | Inject `Aurora` background canvas at the root. |
| `app/layout.tsx` | Global Shell & Metadata | Configures SEO meta, favicon, OpenGraph, JSON-LD schema, Navbar, Preloader, Footer. | Update `theme-color` from `#FF6B00` to `#10B981`, update selection classes to emerald. |
| `app/pertandingan/page.tsx` | Matches & YouTube Arena | Dedicated match history breakdown (3 rounds) + full YouTube video showcase & shorts. | Align card styling and glow effects to Deep Obsidian / Emerald. |
| `app/divisi/page.tsx` | Division & Culture Hub | 4 division deep dives, Instagram feed showcase, Team Roster Section, Freshman FAQ. | Unify division badge styling and ensure consistent card borders. |
| `app/prestasi/page.tsx` | Accolades & Press Releases | Cabinet of achievements + 3 verified press release links (UNY Humas & BPTI). | Ensure consistent SpotlightCard emerald theme. |
| `app/krtmi/page.tsx` | Chronicles & Guidebooks | Complete vertical archive list from 2026 down to 2019. | Ensure guidebook download buttons use emerald styling. |
| `app/galeri/page.tsx` | Dedicated Gallery Page | *Currently not present as standalone page*; gallery is embedded in home page. | If standalone route is desired, create clean wrapper around `DocumentationGallerySection.tsx`. |
| `app/tim/page.tsx` | Dedicated Team Page | *Currently not present as standalone page*; team roster is embedded in home page and `/divisi`. | If standalone route is desired, create clean wrapper around `TeamRosterSection.tsx`. |

---

## 4. Evaluation Against R4 Component Overhaul Requirements

| Component Feature | R4 Requirement Specification | Current Implementation Status | Compliance Score | Detailed Gap & Remediation |
| :--- | :--- | :--- | :---: | :--- |
| **Hero Stage** | Clean, expansive layout with unblocked high-res team photography, floating status telemetry pills, refined CTA buttons. | Unblocked photo frame with bottom caption strip is present. | **70%** | **Missing floating telemetry pills** (e.g., active telemetry, voltage, division indicator). CTA buttons need refined obsidian/emerald styling and `Magnet` physics. |
| **Leaders & Managers Showcase** | Minimalist horizontal timeline cards with smooth crossfades and authentic leadership badges. | Horizontal scroll track with multi-photo crossfades and leadership badges is present. | **75%** | Lacks an explicit chronological timeline visual connector. Floating pills are currently placed inside photo viewport instead of decoupled bar. |
| **Active Technical Squad (2025)** | Streamlined division filter tabs (Program, Elektronik, Mekanik) with high-density, readable member cards. | 7 division tabs (All, Ketua, Manager, Program, Elektronik, Mekanik, Pembimbing) with grid/carousel modes. | **75%** | Need to streamline tabs to primary technical divisions (**Program, Elektronik, Mekanik**) and decouple photo badge pills. |
| **Rulebook & Tournament Archives (2019–2026)** | Clean interactive tabs with clear arena diagrams, technical specs, and scoring breakdowns. | 7 tournament years with 6 subtabs (Ringkasan, Arena, Robot, Objek, Skor, Penalti) and PDF download. | **80%** | **Missing dedicated arena diagrams** in the "Spesifikasi Arena" subtab. Only text specs and cover previews are present. |
| **Preloader & Navigation** | Elegant minimalist top navbar with blur backdrop and smooth scroll-spy indicators. | Sticky top navbar with blur backdrop and linear telemetry preloader is present. | **70%** | **Missing smooth scroll-spy indicators** in navbar to dynamically highlight in-viewport sections during scroll. Preloader uses orange accents. |

---

## 5. Kinetic Typography & React Bits Motion Evaluation

### 5.1. Implemented Primitives

| Component | File Path | Mechanism & Dependencies | SSR & A11y Status | Assessment |
| :--- | :--- | :--- | :--- | :--- |
| **`BlurText`** | `components/animations/BlurText.tsx` | CSS transform/filter transition + `IntersectionObserver`. Supports word/letter split. | Full `prefers-reduced-motion` check. Preserves `aria-label={text}`. | **Excellent**. Zero hydration mismatch, lightweight, zero framer-motion dependency. |
| **`DecryptedText`** | `components/animations/DecryptedText.tsx` | Custom interval character scrambler with glyph pool. Supports sequential/radial reveal. | Initial state set to literal target text for static HTML integrity. `prefers-reduced-motion` safe. | **Excellent**. Fully SSR-safe; works on hover and viewport entry. |
| **`ShinyText`** | `components/animations/ShinyText.tsx` | CSS `background-clip: text` with animated shimmer sweep. | Falls back to static text when reduced-motion is requested. | **Good**. Current gradient is orange/amber; update to emerald/gold shine. |
| **`SpotlightCard`** | `components/animations/SpotlightCard.tsx` | Fluid cursor tracking updating CSS variables `--mouse-x`, `--mouse-y`. Pointer-events-none overlay. | Zero re-renders on mousemove (pure DOM style mutation). Fully interactive children. | **Excellent**. Industry-standard implementation. Change default spotlight color to Emerald (`rgba(16, 185, 129, 0.15)`). |
| **`CountUp`** | `components/animations/CountUp.tsx` | `requestAnimationFrame` + `easeOutExpo` easing. Viewport triggered. | Falls back immediately to target number if reduced-motion is active. Tabular nums. | **Excellent**. Clean number formatting with custom decimals and suffixes. |
| **`AmbientGrid`** | `components/animations/AmbientGrid.tsx` | SVG coordinate grid with pulse scanline and vignette mask. | Reduced-motion stops scanline animation. | **Good**. Lightweight background. |
| **`CyberBentoCard`** | `components/animations/CyberBento.tsx` | Technical corner crosshairs and structured card container. | Clean semantic HTML. | **Good**. Useful for technical telemetry cards. |
| **`GsapReveal`** | `components/animations/GsapReveal.tsx` | GSAP `from()` animation for staggered reveals. | Reduced-motion safe. | **Good**. Integrates smoothly with `@gsap/react`. |

### 5.2. Missing React Bits Primitives & Recommended Implementations

1. **`Aurora` Ambient Canvas**:
   - *Requirement*: Fluid, eye-friendly mesh ambient gradient glow in Hero and header zones (Deep Obsidian `#0B0B0E` canvas with subtle shifting `#10B981` / `#059669` emerald ribbons).
   - *Implementation Strategy*: Lightweight CSS/Canvas or CSS keyframe animation with hardware acceleration (`transform: translate3d`), throttled to low GPU overhead and paused when out of viewport via `IntersectionObserver`.
2. **`TiltedCard` (3D Perspective Hover)**:
   - *Requirement*: Subtle 3D tilting effect on roster and gallery cards reacting to cursor position without layout shift or jitter.
   - *Implementation Strategy*: Transform perspective (`rotateX`, `rotateY`, `scale3d(1.02)`) driven by cursor offset with smooth transition release on `mouseLeave`.
3. **`Magnet` (Magnetic Button Physics)**:
   - *Requirement*: Refined interactive button feedback that gently pulls toward the cursor within a bounding radius.
   - *Implementation Strategy*: Spring physics or easing calculation on `mousemove` translating button element by a dampening factor (e.g. 0.35x offset).

---

## 6. Photo Unblocking & Architectural Invariant Audit

### The Architectural Invariant:
```
┌─────────────────────────────────────────────────────────────┐
│  Tier 1: Dedicated Top Meta Bar (Badges, Era, Division)    │
├─────────────────────────────────────────────────────────────┤
│  Tier 2: 100% Pristine Photo Viewport                      │
│          (Natural aspect ratio, ZERO text/gradient overlay) │
├─────────────────────────────────────────────────────────────┤
│  Tier 3: Dedicated Card Body Content                        │
│          (Name, Role, NIM, Prodi, Skills, Actions)          │
└─────────────────────────────────────────────────────────────┘
```

### Component Audit Matrix:

| Component | Photo Viewport Aspect Ratio | Text / Badges Covering Faces? | Structure Pattern | Invariant Compliance |
| :--- | :--- | :--- | :--- | :---: |
| `HeroSection.tsx` | `aspect-[16/10] sm:aspect-[16/9]` | **None**. Photo is completely clear with caption in bottom strip. | 2-Tier (Photo frame -> bottom strip) | **COMPLIANT** |
| `AboutTeamSection.tsx` | `aspect-[16/10] sm:aspect-[16/9]` | **None**. Clear photo with separate top bar and bottom caption. | 3-Tier (Top bar -> Photo -> Caption) | **COMPLIANT** |
| `InstagramFeedShowcase.tsx` | `aspect-square (1:1)` | **None**. Header placed above photo; indicator strip and text below. | 4-Tier (Top header -> Photo -> Dots -> Body) | **COMPLIANT** |
| `DocumentationGallerySection.tsx`| `aspect-[4/3]` | **None**. Natural 4:3 photo with meta strip cleanly below. | 2-Tier (Photo -> Card Body) | **COMPLIANT** |
| `NewsMediaSection.tsx` | `aspect-[16/9]` | **None**. Thumbnail is 100% clear; metadata below thumbnail. | 2-Tier (Thumbnail -> Card Body) | **COMPLIANT** |
| `TeamRosterSection.tsx` | `aspect-[4/5] sm:aspect-square` | **PARTIAL ISSUE**: Floating division pill (`absolute top-2.5 left-2.5`) and era badge (`absolute top-2.5 right-2.5`) sit inside the photo viewport. | Floating Overlays (Inside Photo) | **NEEDS REMEDIATION** |

### Remediation Action for `TeamRosterSection.tsx`:
Move lines 525–546 in `TeamRosterSection.tsx` out of the photo container into a dedicated top meta bar above the photo viewport, identical to the pattern used in `InstagramFeedShowcase.tsx`.

---

## 7. Design System & Aesthetic Alignment

### 7.1. Color Palette Comparison

| Token | Current Palette | Target Redesign Palette | Purpose |
| :--- | :--- | :--- | :--- |
| **Base Canvas** | `#050507` / `#070B12` | Deep Obsidian `#0B0B0E` / `#121216` | Eye-friendly dark background with zero harsh contrast. |
| **Card Surface** | `#0B0B0E` / `#0E0E12` | `#121216` / `#18181B` | Tactile depth with calm surfaces. |
| **Card Borders** | `border-white/8` / `border-brand-orange/30` | 1px subtle `#27272A` / `rgba(255, 255, 255, 0.06)` | Elegant, minimalist hairline borders replacing heavy glow. |
| **Primary Accent** | Electric Orange `#FF6B00` / `#EA580C` | Refined Emerald Green `#10B981` / `#059669` | Calming high-tech robotics aesthetic inspired by `virose.team`. |
| **Accent Glow** | `rgba(255, 107, 0, 0.15)` | `rgba(16, 185, 129, 0.15)` | Soft ambient radial glow on hover. |
| **Secondary Accent**| Amber `#F59E0B` | Warm Gold `#F59E0B` (Accolades only) | Preserved specifically for trophies and championship podiums. |
| **Typography** | Generic system fonts / mono | **Outfit** (Headings) & **Plus Jakarta Sans** (Body) | Clear typographic hierarchy with industrial character. |

---

## 8. Prioritized Implementation Recommendations

### Phase 1: Design System & Primitive Foundations
1. **Palette Tokens**: Update `tailwind.config.js` and `app/globals.css` with Deep Obsidian (`#0B0B0E`, `#121216`, `#18181B`) and Emerald Green (`#10B981`, `#059669`).
2. **Missing React Bits**:
   - Implement `Aurora.tsx` for ambient header glow.
   - Implement `TiltedCard.tsx` for 3D card tilt.
   - Implement `Magnet.tsx` for magnetic button interaction.
3. **Typography**: Configure font declarations for Outfit and Plus Jakarta Sans.

### Phase 2: Core Section Enhancements (R4 Compliance)
1. **Hero Stage (`HeroSection.tsx`)**:
   - Embed `Aurora` background canvas.
   - Add floating status telemetry pills (e.g., *Status: Otonom*, *Kinematika: 4WD Mecanum*, *Target: Technocorner 2026*).
   - Refine CTA buttons with `Magnet` interaction and Emerald styling.
2. **Navbar (`Navbar.tsx`)**:
   - Implement IntersectionObserver-driven **smooth scroll-spy** tracking active sections (`#about-tim`, `#prestasi`, `#kri-overview`, `#krtmi-story`, `#berita-media`, `#team-roster`).
   - Add subtle emerald active indicators.
3. **Team Roster Section (`TeamRosterSection.tsx`)**:
   - Decouple photo badges into a top meta bar above the headshot container.
   - Streamline technical division filter tabs to **Program, Elektronik, Mekanik**.
   - Enhance the Leaders & Managers horizontal tracks with connected chronological timeline markers.
4. **Rulebook & Tournament Chronicles (`KrtmiChronicles.tsx`)**:
   - Embed clear vector arena diagrams in the "Spesifikasi Arena" subtab.
   - Update buttons and tabs to Obsidian/Emerald theme.
5. **Achievements & News Sections (`Achievements.tsx`, `NewsMediaSection.tsx`)**:
   - Update SpotlightCard radial glow to Emerald Green (`rgba(16, 185, 129, 0.15)`).

### Phase 3: Build Verification & Regression Testing
1. Run static export build: `npm run build` (ensure 0 errors, 11 static pages generated).
2. Execute existing test harnesses:
   - `node scripts/stress_test_edge_cases.js`
   - `node scripts/test_challenger2_m3_stress_oracle.js`
   - `node scripts/test_reactbits_suite.js`
   - `node scripts/test_empirical_html_output.js`
3. Verify zero regressions on verified PDDikti data (all 33 members intact).

---
*Report compiled by explorer_m0_components.*
