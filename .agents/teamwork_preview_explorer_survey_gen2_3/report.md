# Comprehensive Technical Investigation Report: Bespoke Modern UI & Build Architecture

**Agent**: Explorer Survey 3  
**Working Directory**: `D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web\.agents\teamwork_preview_explorer_survey_gen2_3`  
**Date**: 2026-09-05  
**Mission**: Investigate design system, Tailwind configuration, glassmorphism, animations, micro-interactions, React Bits-inspired component design, photo unblocking, authentic robotics copywriting, UNDIP 2026 timeline correction, and Next.js static export / test build architecture.

---

## 1. Executive Summary

The Abhinaya UNY Robotics Portal is currently built on **Next.js 14 (App Router) + React 18 + Tailwind CSS 3.4**. While the portal contains rich historical data (2019–2026) and verified PDDikti member records, its visual presentation and build pipeline suffer from several critical shortcomings:

1. **Aesthetic Misalignment ("Generic AI Template" Look)**:
   - The current styling uses a muddy, warm-brown/burnt-orange palette (`#171008`, `#140E09`, `#070503`, `#FF6B00`) with heavy, blurry drop-shadows (`shadow-[0_0_35px_rgba(255,107,0,0.5)]`).
   - The theme feels like a generic AI-generated template rather than a bespoke, high-precision dark-emerald robotics command portal.
   - Text overlays, heavy dark gradient fades, and floating badges obscure members' faces and robots in `AboutTeamSection.tsx`, `HeroSection.tsx`, and `InstagramFeedShowcase.tsx`.
2. **Factual Inconsistencies**:
   - The UNLIMITED UNDIP Robotics Competition is mistakenly recorded as **2024** in `data/newsData.ts` (line 80) and `components/Achievements.tsx` (lines 39, 41), whereas team feedback and historical truth require **2026**.
3. **Build & Export Failures**:
   - Running `npm run build` directly in Windows PowerShell triggers a `PSSecurityException` due to Windows script execution policies blocking `npm.ps1`. The command must be run as `npm.cmd run build`.
   - Next.js static export fails with:
     ```
     ENOENT: no such file or directory, rename '.next\export\500.html' -> '.next\server\pages\500.html'
     ```
     This is a known Next.js 14.2 bug caused by the combination of App Router, `output: 'export'`, and `trailingSlash: true` in `next.config.js`. Next.js generates `.next/export/500/index.html` due to trailing slash rules, but `moveExportedPage` in `next/dist/build/index.js` hardcodes looking for `.next/export/500.html`.
4. **Test Suite Status**:
   - The primary E2E suite (`node tests/e2e/run_all.js`) executes 57 tests across 10 suites (3477 assertions).
   - **56 passed, 1 failed**: `T4-03: Scenario 3 — Responsive Multi-Device CSS Grid Layout` failed because `TeamRosterSection.tsx` was converted to a horizontal carousel (`flex flex-shrink-0 w-[285px]`) instead of maintaining a multi-column CSS grid (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`).

---

## 2. Design System Elevation: Dark-Emerald High-Tech Architecture

### 2.1 Current Design System Deficiencies
| Asset / Token | Current State | Defect & AI-Slop Symptom |
|---|---|---|
| `tailwind.config.js` | Brand colors: orange `#FF6B00`, amber `#F97316`, dark `#070B12`, card `#0D1322` | Lacks cohesive emerald/neon tokens; feels like an industrial construction warning page rather than high-tech robotics. |
| `app/globals.css` | `radial-gradient(circle at 50% 0%, #171008 0%, #0c0905 40%, #06070a 100%)` | Muddy brown/orange vignette looks washed out and dirty on OLED/IPS displays. |
| `app/globals.css` | `.glow-orange`, `.box-glow-orange` (25-30px rgba orange blur) | Heavy, unrefined neon drop-shadows that scream "generic AI cyberpunk template". |
| `app/layout.tsx` | `theme-color: #FF6B00`, `selection:bg-brand-orange selection:text-black bg-[#070503]` | Dark-brownish backdrop; clashes with Abhinaya's verified signature emerald/cyan telemetry branding. |
| Typography | Standard system sans-serif without monospace engineering telemetry hierarchy | Missing the crisp typography hierarchy that characterizes high-craft interfaces (e.g. Linear, Vercel, React Bits). |

### 2.2 Proposed Bespoke Dark-Emerald Palette & Design Tokens
To eradicate the generic AI look, the portal should transition to a **Deep Obsidian & Signature Emerald/Neon Cyber Palette**:

```typescript
// Proposed tailwind.config.js color tokens:
theme: {
  extend: {
    colors: {
      void: {
        950: '#030605', // Ultra-deep obsidian base
        900: '#050B08', // Deep card background
        850: '#08110D', // Elevated card / modal background
        800: '#0D1A14', // Interactive hover card
        border: 'rgba(16, 185, 129, 0.15)', // Refined subtle emerald border
        'border-strong': 'rgba(16, 185, 129, 0.35)',
      },
      emerald: {
        glow: '#10B981',
        neon: '#00F5D4', // Signature Cyber Mint / Emerald Neon (matches test-theme-navbar)
        dim: '#064E3B',
        dark: '#022C22',
      },
      amber: {
        gold: '#F59E0B', // Reserved exclusively for trophies, 1st place badges, and leader crowns
      },
    },
  },
}
```

### 2.3 Proposed CSS Variables & Global Utilities (`app/globals.css`)
Replace muddy brown backgrounds with a deep obsidian grid and subtle emerald aura:

```css
:root {
  --foreground-rgb: 241, 245, 249;
  --background-void: #030605;
  --color-emerald-neon: #00F5D4;
  --color-emerald-core: #10B981;
}

body {
  color: rgb(var(--foreground-rgb));
  background-color: #030605;
  background-image: 
    radial-gradient(ellipse 80% 50% at 50% -20%, rgba(16, 185, 129, 0.15), transparent),
    radial-gradient(circle at 1px 1px, rgba(16, 185, 129, 0.05) 1px, transparent 0);
  background-size: 100% 100%, 28px 28px;
  min-height: 100vh;
  overflow-x: hidden;
}

/* Bespoke Glassmorphism */
.glass-panel {
  background: rgba(8, 17, 13, 0.75);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(16, 185, 129, 0.18);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06), 0 8px 32px rgba(0, 0, 0, 0.4);
}

.glass-panel-hover {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.glass-panel-hover:hover {
  border-color: rgba(0, 245, 212, 0.4);
  box-shadow: inset 0 1px 0 rgba(0, 245, 212, 0.15), 0 12px 40px rgba(0, 245, 212, 0.08);
  transform: translateY(-2px);
}

/* High-Tech Telemetry Neon Utilities */
.glow-cyan {
  text-shadow: 0 0 14px rgba(0, 245, 212, 0.6);
}
.box-glow-cyan {
  box-shadow: 0 0 24px rgba(0, 245, 212, 0.18);
}
.glow-gold {
  text-shadow: 0 0 14px rgba(245, 158, 11, 0.6);
}
```

---

## 3. React Bits-Inspired Component Architecture

To elevate the portal from an amateur AI template to a polished, high-craft engineering portal, we identified four signature component patterns inspired by `reactbits.dev`:

### 3.1 Spotlight Card / Mouse-Follow Radial Border
- **Inspiration**: React Bits "SpotlightCard"
- **Application**: Member cards in `TeamRosterSection.tsx`, tournament cards in `Achievements.tsx`, video cards in `YouTubeVideoShowcase.tsx`.
- **Mechanism**: Instead of static borders or jarring solid hover outlines, the card tracks cursor coordinates via lightweight `onMouseMove` to project a soft radial highlight (`radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0, 245, 212, 0.12), transparent 40%)`).
- **Performance**: Pure CSS or lightweight inline styles without heavy external physics engines.

### 3.2 Border Beam / Telemetry Active Indicator
- **Inspiration**: React Bits "BorderBeam"
- **Application**: Featured 2024 National 2nd Place trophy in `Achievements.tsx`, KRTMI 2026 spotlight in `KrtmiChronicles.tsx`, and Lead Advisor / Leader badges in `TeamRosterSection.tsx`.
- **Mechanism**: A subtle, continuous laser light sweep around the border perimeter (`border-beam` keyframe) highlighting active milestones without distracting flashing animations.

### 3.3 Fluid Animated Capsule Tabs
- **Inspiration**: React Bits "AnimatedTabs"
- **Application**: Category filters in `DocumentationGallerySection.tsx`, Year selection in `KrtmiChronicles.tsx`, and Generation Switcher in `TeamRosterSection.tsx`.
- **Current Defect**: Tabs toggle instantly with abrupt background color switches (`bg-brand-orange` vs `bg-[#140E09]`).
- **Proposed Enhancement**: Smooth pill transitions with subtle spring easing, active indicator sliding capsule, and monospace counter badges (e.g., `Mekanik (8)`).

### 3.4 Decrypted / Scramble Text Telemetry
- **Inspiration**: React Bits "DecryptedText"
- **Application**: Top section headers, HUD tags (e.g. `[SYS.READY // KRTMI.2026]`, `[MECANUM_4WD // OTONOM]`).
- **Impact**: Provides instant tactile high-tech character to section introductions, grounding the engineering theme.

---

## 4. Photo Unblocking Architecture (Zero Text Obscuring Faces/Robots)

Requirement R1 in `ORIGINAL_REQUEST.md` specifically mandates:
> "Overhaul photo showcase sections (especially `AboutTeamSection.tsx`, `HeroSection.tsx`, `InstagramFeedShowcase.tsx`, and `DocumentationGallerySection.tsx`) so that text overlays, dark heavy gradients, and badge containers no longer block or obscure team members' faces, trophies, or robots. Move captions, descriptions, and metadata cleanly below the images or into dedicated non-intrusive container cards with clean spacing across all mobile and desktop viewports."

### 4.1 Component-by-Component Audit & Remedy

#### 1. `components/AboutTeamSection.tsx` (Lines 27–64)
- **Current Flaw**: The UMS 2024 contingent photo banner has `aspect-[16/9] sm:aspect-[21/9]` with:
  - `div className="absolute inset-0 bg-gradient-to-t from-[#0A0704] via-[#0A0704]/40 to-transparent"` covering the lower 50% of the photo in black shadow.
  - `div className="absolute bottom-4 inset-x-4 ..."` placing a two-line title and lengthy caption directly over members' bodies, shirts, and faces.
- **Architectural Remedy**:
  - Keep the photo completely clean: unmasked, 100% natural contrast, no gradient overlay.
  - Extract the title, caption, location tag ("Paddock UMS 2024"), and competition badge into a dedicated **Glassmorphic Metadata Card below the image**.
  - Provide a subtle zoom/lightbox trigger icon in the corner that does not obstruct faces.

#### 2. `components/HeroSection.tsx` (Lines 26–38)
- **Current Flaw**: Heavy dark top and bottom gradient vignettes (`h-32 sm:h-44 bg-gradient-to-b from-[#070503]/95` and `h-36 sm:h-48 bg-gradient-to-t`) mask the hero banner.
- **Architectural Remedy**:
  - Use a subtle, uniform 15% dark backdrop tint (`bg-black/20`) rather than deep vertical gradient cutoffs.
  - Keep headline and CTA buttons positioned cleanly in the viewport above the fold so the robot and team members in the hero photo remain crisp and visible.

#### 3. `components/InstagramFeedShowcase.tsx` (Lines 182–219)
- **Current Flaw**:
  - `absolute inset-0 bg-gradient-to-t from-[#130E09] via-transparent to-black/40`
  - Floating badges at `top-3.5` and pagination dots at `bottom-3` overlap the photo content.
- **Architectural Remedy**:
  - Move the `@abhinaya.uny` handle and image counter badge into a **card header strip situated directly above the image frame**.
  - Place pagination dots in the card footer alongside post dates, leaving the photo completely clean.

#### 4. `components/TeamRosterSection.tsx` (Lines 515–552)
- **Current Flaw**:
  - Floating division badges (`top-3.5 left-3.5`) and era tags cover the top-left portion of member portraits, frequently clipping hair, foreheads, or faces.
- **Architectural Remedy**:
  - Relocate division badges and role chips into the card header/body area immediately below the photo frame, preserving an unobstructed 1:1 portrait viewport.

---

## 5. Authentic Robotics Copywriting Guidelines (Anti-AI Slop)

### 5.1 Cliche Audit & Replacement Matrix
| Current AI-Generated Copy | Why It Fails | Authentic Engineering Replacement |
|---|---|---|
| *"Mengenal Tim Robotika Abhinaya UNY 🛠️"* (`AboutTeamSection.tsx:20`) | Generic blog post headline with informal emoji. | **"Profil Divisi Robotika Tematik — UKM Rekayasa Teknologi UNY"** |
| *"Buah dari kerja keras, dedikasi riset larut malam di lab, dan semangat inovasi..."* (`Achievements.tsx:70`) | Melodramatic AI cliche formula. | **"Rekam jejak kompetisi resmi Puspresnas BPTI dan kejuaraan nasional robotika mahasiswa."** |
| *"Wadah Riset, Belajar dari Nol, & Meraih Prestasi Bersama"* (`AboutTeamSection.tsx:71`) | Generic student recruitment slogan. | **"Rancang Bangun Robotika Otonom Lintas Disiplin (FT, FMIPA, FV)"** |
| *"Solidaritas seluruh kontingen UKM Rekayasa Teknologi UNY divisi Mekanik, Elektrik, Programming & AI..."* (`AboutTeamSection.tsx:56`) | Repetitive run-on sentence. | **"Kontingen resmi Abhinaya UNY pada Kontes Robot Tematik Indonesia (KRTMI) 2024 di Universitas Muhammadiyah Surakarta."** |
| *"EXPLORE TEAM & GUIDEBOOKS"* (`HeroSection.tsx:72`) | Generic all-caps CTA. | **"Pelajari Regulasi & Riset Robot"** |

### 5.2 Voice & Tone Standard
- **Technical Rigor**: Use accurate robotics terminology (e.g. *kinematika invers mecanum 4WD*, *closed-loop PID controller*, *YOLO computer vision segmentation*, *BPTI Kemendikbudristek*).
- **Institutional Clarity**: Tim Abhinaya is an active division under **UKM Rekayasa Teknologi (Restek) UNY**, representing UNY at the national KRTMI level. Avoid generic corporate or marketing jargon.

---

## 6. Factual Timeline Correction: UNLIMITED UNDIP Year (2026)

The UNLIMITED Robotics Competition organized by Universitas Diponegoro (UNDIP) is confirmed to take place in **2026**. The codebase currently contains several outdated records listing it as 2024:

1. **`data/newsData.ts` (Line 80)**:
   ```typescript
   // BEFORE:
   "id": "undip-unlimited-robot-finalist",
   "title": "Abhinaya Lolos Sebagai Finalis Lomba Robot Kreatif Nasional UNLIMITED UNDIP",
   "date": "2024",
   
   // AFTER:
   "id": "undip-unlimited-robot-finalist",
   "title": "Abhinaya Lolos Sebagai Finalis Lomba Robot Kreatif Nasional UNLIMITED UNDIP",
   "date": "2026",
   ```
2. **`components/Achievements.tsx` (Lines 39–45)**:
   ```typescript
   // BEFORE:
   {
     year: '2024',
     title: 'Finalis Lomba Robot Kreatif Nasional',
     event: 'UNLIMITED Robotics Competition UNDIP 2024',
     organizer: 'Departemen Teknik Elektro Universitas Diponegoro',
     badge: '💡 FINALIS ROBOT KREATIF',
     highlight: true,
   }
   
   // AFTER:
   {
     year: '2026',
     title: 'Finalis Lomba Robot Kreatif Nasional',
     event: 'UNLIMITED Robotics Competition UNDIP 2026',
     organizer: 'Departemen Teknik Elektro Universitas Diponegoro',
     badge: '💡 FINALIS ROBOT KREATIF',
     highlight: true,
   }
   ```
3. **`ARSIP_BERITA_DAN_MEDIA_ABHINAYA.md` (Lines 43–52)**:
   - Header and event description must state **2026** as the competition year.

---

## 7. Build Architecture & Verification Protocol

### 7.1 Windows PowerShell Script Execution Policy Issue
Running `npm run build` directly in PowerShell fails with:
```
npm : File C:\Program Files\nodejs\npm.ps1 cannot be loaded because running scripts is disabled on this system.
```
**Remedy**: Always execute build and package commands using the `.cmd` executable:
```powershell
npm.cmd run build
npm.cmd test
```

### 7.2 Next.js 14 Static Export Rename Failure: Forensic Analysis
During `npm.cmd run build`, the compilation and page generation succeed completely (11 of 11 static pages generated). However, the build aborts during the static export file movement phase with:
```
Error: ENOENT: no such file or directory, rename 
  'D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web\.next\export\500.html' 
  -> 'D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web\.next\server\pages\500.html'
```

#### Exact Root Cause Chain:
1. In `next.config.js`, `trailingSlash: true` is enabled.
2. The project uses Next.js App Router (`app/`) and does not possess a Pages Router directory (`pages/`).
3. In `node_modules/next/dist/build/index.js` (line 1533):
   ```javascript
   const hasPages500 = usedStaticStatusPages.includes("/500");
   const useDefaultStatic500 = !hasPages500 && !hasNonStaticErrorPage && !customAppGetInitialProps;
   ```
   Because there is no custom `pages/500.tsx`, `useDefaultStatic500` is set to `true`.
4. Next.js invokes `exportApp`, which prerenders the default static 500 error page.
5. In `node_modules/next/dist/export/worker.js` (line 129):
   ```javascript
   const getHtmlFilename = (p) => subFolders ? `${p}${_path.sep}index.html` : `${p}.html`;
   ```
   Because `trailingSlash: true` sets `subFolders = true`, the file is exported to disk as:
   `.next\export\500\index.html`.
6. After export completes, `node_modules/next/dist/build/index.js` (line 1924) executes:
   ```javascript
   if (useDefaultStatic500) {
       await moveExportedPage("/_error", "/500", "/500", false, "html");
   }
   ```
   Inside `moveExportedPage` (line 1854):
   ```javascript
   file = `${file}.${ext}`; // "/500.html"
   const orig = _path.default.join(exportOptions.outdir, file); // ".next\export\500.html"
   await _fs.promises.rename(orig, dest);
   ```
   `orig` expects `.next\export\500.html`, but the file was written to `.next\export\500\index.html`!
   This triggers an immediate `ENOENT` error, failing the build.

#### Proposed Solution:
Create a dedicated `pages/500.tsx`:
```tsx
// pages/500.tsx
import React from 'react';

export default function Custom500() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#030605] text-slate-200 p-6 text-center">
      <h1 className="text-4xl font-black text-emerald-400 font-mono mb-2">500 — Server Error</h1>
      <p className="text-sm text-slate-400 max-w-md">Terjadi kendala pada sistem. Silakan muat ulang halaman.</p>
      <a href="/AbhinayaUNY_Web/" className="mt-6 px-5 py-2 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold font-mono">
        Kembali ke Beranda
      </a>
    </div>
  );
}
```
**Why this works**: When `pages/500.tsx` exists, `hasPages500` becomes `true`, `useDefaultStatic500` evaluates to `false`, and `moveExportedPage("/_error", "/500", ...)` is completely bypassed. The static export finishes cleanly with code 0!

### 7.3 Base Path & Asset Safety Audit
- `next.config.js` sets:
  ```javascript
  basePath: process.env.NODE_ENV === 'production' ? '/AbhinayaUNY_Web' : '',
  ```
- All image elements and static asset references across `components/` and `app/` properly use `${basePath}/...` or Next.js `Link`/`Image`.
- Static export correctly targets GitHub Pages root directory `/AbhinayaUNY_Web/`.

### 7.4 Test Suites & Test Command Analysis
There are three test systems currently in the repository:

1. **Official E2E Suite (`tests/e2e/run_all.js` / `scripts/run_e2e_tests.js`)**:
   - **Command**: `node tests/e2e/run_all.js`
   - **Coverage**: 10 test files testing R1 photo pipeline, R2 leaders, R2 managers, R3 active squad, R4 alumni, R5 crossfade, boundaries, combinations, scenarios, and integrity.
   - **Current Results**: **56 Passed, 1 Failed** (3476 passed assertions).
   - **The single failing assertion**:
     `T4-03: Scenario 3 — Responsive Multi-Device CSS Grid Layout`:
     `Expected container to include "lg:grid-cols-3"`.
     In `TeamRosterSection.tsx`, the member cards container was modified to a horizontal carousel with `flex flex-shrink-0 w-[285px]`. Re-introducing the responsive grid `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` resolves this test immediately.

2. **Legacy Tier 1 Runner (`tests/run-all-tests.js`)**:
   - Fails due to missing `app/teknis/page.tsx` (a legacy route that was refactored into `app/divisi` and `app/pertandingan`). Not part of the official R1–R5 requirement pipeline.

3. **Legacy Kinematics Oracle (`test_adversarial_oracle.py`)**:
   - Fails on Oracle 6 because it flags legitimate student NIMs as PII violations, despite the user explicitly requiring real PDDikti NIMs in R2. Also obsolete.

### 7.5 Recommended `package.json` Scripts Update
Add the test scripts to `package.json` to establish standardized verification:
```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint",
  "test": "node tests/e2e/run_all.js",
  "test:e2e": "node scripts/run_e2e_tests.js"
}
```

---

## 8. Prioritized Recommendations for Implementer

1. **Fix Next.js Static Export Bug**:
   - Add `pages/500.tsx` with a styled dark-emerald error view.
   - Verify `npm.cmd run build` exits with code 0 and populates `out/` with zero errors.
2. **Fix Test Failure T4-03**:
   - In `components/TeamRosterSection.tsx`, restore the multi-column responsive grid classes (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`) for the active squad roster.
   - Verify `node tests/e2e/run_all.js` passes 57/57 tests (100% PASS).
3. **Correct UNDIP Competition Year to 2026**:
   - Update `data/newsData.ts:80` (`date: "2026"`).
   - Update `components/Achievements.tsx:39,41` (`year: '2026'`, `event: 'UNLIMITED Robotics Competition UNDIP 2026'`).
   - Update `ARSIP_BERITA_DAN_MEDIA_ABHINAYA.md:43-52`.
4. **Implement Photo Unblocking & Layout Refinement (Requirement R1)**:
   - In `AboutTeamSection.tsx`: move the caption card cleanly below the UMS 2024 photo banner; remove the heavy bottom gradient overlay.
   - In `HeroSection.tsx`: reduce heavy top/bottom vignette masking.
   - In `InstagramFeedShowcase.tsx`: move floating handle badges and pagination dots out of the photo area into the card header/footer.
   - In `TeamRosterSection.tsx`: move badges from the top-left of portraits to the card metadata area below the image.
5. **Elevate Portal to Bespoke Dark-Emerald UI (Requirement R4)**:
   - Update `tailwind.config.js` and `app/globals.css` with the deep obsidian & emerald neon palette.
   - Upgrade card borders to refined glass panels with subtle hover spotlights.
   - Replace generic button styles with sleek high-tech pill buttons and glowing border beams.
6. **Polish Copywriting (Requirement R3)**:
   - Replace generic AI phrasing with authentic robotics engineering copy across all major section headers and descriptions.
