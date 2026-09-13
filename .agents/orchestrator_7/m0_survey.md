# Milestone 0 Baseline Architecture & Anti-Slop Survey Synthesis

## 1. Executive Summary
Milestone 0 exploration was conducted by 3 specialized subagents:
- `explorer_m0_copy` (`23b5fbd6-c932-40d5-905a-45eabd3665bf`)
- `explorer_m0_motion` (`fd78aff6-9709-4fb7-98eb-15c2a73f0968`)
- `spec_miner_m0_specs` (`84bac6fe-24a1-4b72-9221-690f214578e5`)

All 3 reports converged with 100% consensus on the current architectural state, defects, and concrete implementation paths.

---

## 2. Key Survey Discoveries & Directives

### 2.1 Copywriting & Anti-Slop (Rule R-02 & R-17)
1. **Em Dashes (`—`)**: Exactly 63 occurrences in source code across 13 files, expanding to 332 instances in static HTML output `out/`.
   - Complete replacement map ready: replace with `:`, `,`, `.`, or `(` `)`.
2. **Unicode Emojis**: 0 in UI code; UI strictly uses Lucide SVG icons.
3. **Generic AI Copywriting**: 15 boilerplate motivational captions in `data/instagramFeedData.ts` to be refined into authentic KRTMI robotics engineering narratives.
4. **PDDikti Ground Truth**: 100% verified authentic:
   - Farhan Yuda Mahendra: `22518244007`
   - Zelfa Nafisah Zalna: `23030730048`
   - Hisyam Yasid Pratowo: `24090620010`
   - UNLIMITED UNDIP Competition: strictly `2026`.

### 2.2 Color System & Visual Design
1. **Strict Palette Alignment**:
   - Primary accents: Cyber Orange (`#FF6B00`, `#FB923C`, `#EA580C`) and Warm Amber (`#F59E0B`, `#FDE68A`).
   - Canvas & surfaces: Deep Obsidian (`#0B0B0E`, `#121216`, `#18181B`).
2. **Elimination of Emerald Remnants**:
   - Manager badge in `data/teamData.ts` and `TeamRosterSection.tsx` mapped from emerald to Warm Amber (`#F59E0B`, `text-amber-300`, `border-amber-500/40`).
   - Kinematika telemetry pill in `HeroSection.tsx` mapped from cyan (`text-cyan-400`) to Cyber Orange (`text-orange-400`).

### 2.3 Kinetic Animation & Preloader Synchronization
1. **Preloader-to-Hero Desync**: Preloader curtain masks the screen for ~1350ms, while `BlurText` starts at mount ($t=0$ms) and finishes in ~1120ms behind the curtain.
2. **Synchronization Architecture**:
   - `Preloader.tsx`: emit `abhinaya:preloader-dismiss` CustomEvent and set `window.__ABHINAYA_PRELOADER_DONE = true` when fade starts.
   - `BlurText.tsx`: add `ready?: boolean = true` prop to gate animation start on `isIntersected && ready`.
   - `HeroSection.tsx`: hook `usePreloaderComplete()` to trigger master stagger entrance (Title -> Subtitle -> Trophy Pill -> Description -> CTAs -> Telemetry Dock -> Studio Frame).

### 2.4 Alive Background Atmosphere & Motion
1. **Interactive Canvas Dust**: Already implemented and tested in `InteractiveCanvasDust.tsx`, but unmounted. Mount in `HeroSection.tsx` with Cyber Orange particles (`255, 107, 0`).
2. **Aurora Organic Breathing**: Enhance keyframes in `tailwind.config.js` with scale pulsation (0.96 to 1.09) and add a 3rd floating accent orb behind the right-column media dock.

### 2.5 Responsive 2-Column Layout
1. **Mobile (390px)**: Replace `whitespace-nowrap` on headline with `flex-wrap sm:flex-nowrap` to prevent horizontal overflow.
2. **Tablet (768px)**: Refactor telemetry grid to `grid-cols-2 sm:grid-cols-4 lg:grid-cols-2` for a 1-row horizontal ribbon.
3. **Desktop (1280px/1920px)**: 7:5 asymmetric split with high visual density and zero awkward margins.

### 2.6 Test Suite Alignment
1. `tests/e2e/test_r2_managers.js:80-81` and `scripts/test_e2e_roster.py:217-218`: update emerald badge assertions to Warm Amber (`#F59E0B` / `text-amber-300`).
2. `scripts/test_empirical_html_output.js:179` and `scripts/test_empirical_html_output.py:202`: update required CSS classes to include amber/orange tokens.
3. Add automated Anti-Slop checks to `scripts/test_empirical_html_output.js` and `scripts/test_empirical_html_output.py` asserting zero em dashes (`—`) and zero unicode emojis in `out/**/*.html`.
