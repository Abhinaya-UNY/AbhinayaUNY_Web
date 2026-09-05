# Project: Abhinaya UNY Robotics Portal Redesign (orchestrator_5)

## Architecture
- **Framework**: Next.js 14.2 (Static HTML Export `output: 'export'`) + React 18 + Tailwind CSS + Lucide Icons + GSAP (`@gsap/react`).
- **Design System**: High-End Minimalist Dark Architecture
  - Base Canvas: Deep Obsidian (`#0B0B0E`)
  - Elevated Card Surfaces: `#121216` (primary cards/modals), `#18181B` (secondary/nested cards)
  - Delicate 1px Borders: `#27272A` / `rgba(255, 255, 255, 0.06)`
  - Primary Accent: Refined Emerald Green (`#10B981` / `#059669`) with subtle ambient glow (`rgba(16, 185, 129, 0.12)`)
  - Typography Hierarchy: Outfit (display/headings) & Plus Jakarta Sans (body/UI) via `@next/font/google`
- **Fluid Motion Suite (react-bits Inspired, Zero External Animation Dependencies)**:
  - Background Canvas: `Aurora.tsx` / `AuroraMeshGlow` (subtle shifting mesh gradient) + `InteractiveCanvasDust.tsx` (particle dust & interactive grid with 30/60 FPS throttle, `IntersectionObserver` pause, `prefers-reduced-motion` compliance).
  - Kinetic Typography: `BlurText.tsx`, `DecryptedText.tsx`, `ShinyText.tsx`, `CountUp.tsx`.
  - Reactive Lighting & Interactions: `SpotlightCard.tsx` (GPU-accelerated mouse tracking), `TiltedCard.tsx` (subtle 3D hover feedback), `Magnet.tsx` (magnetic physics on CTA buttons).
- **Core Sections**:
  - `components/HeroSection.tsx`: Clean expansive stage, unblocked high-res team photography, floating status telemetry pills, magnetic emerald CTA buttons.
  - `components/TeamRosterSection.tsx`: Decoupled 3-tier structure (Top Bar -> Photo Viewport -> Card Body), 6 Leaders & 4 Managers horizontal timeline cards, streamlined 2025 technical squad division tabs (Program, Elektronik, Mekanik).
  - `components/KrtmiChronicles.tsx`: Interactive tournament archives (2019-2026), dedicated vector arena diagrams, scoring breakdowns, technical specs.
  - `components/Navbar.tsx` & `components/Preloader.tsx`: Minimalist glassmorphic navbar with dynamic scroll-spy tracking, emerald preloader.
  - `components/Achievements.tsx`, `AboutTeamSection.tsx`, `NewsMediaSection.tsx`, `KRIOverview.tsx`, `Footer.tsx`: Obsidian + Emerald theme unification, photo unblocking invariants preserved.
- **Data & Verification Pipeline**:
  - 100% PDDikti verified student credentials for all 33+ team members (`data/teamData.ts`, `data/krtmiData.ts`, `STRUKTUR_TIM_ABHINAYA.md`):
    - Farhan Yuda Mahendra: NIM `22518244007` (S1 Pendidikan Teknik Mekatronika, FT)
    - Zelfa Nafisah Zalna: NIM `23030730048` (S1 Fisika, FMIPA)
    - Hisyam Yasid Pratowo: NIM `24090620010` (D4 Teknik Elektronika, FV)
  - Next.js static export: 11 static pages in `out/`.
  - Automated test harnesses: `test_empirical_html_output.js`, `stress_test_edge_cases.js`, `test_reactbits_suite.js`.

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | Deep Obsidian & Emerald Design System Tokens | Configure Tailwind & CSS variables for `#0B0B0E`, `#121216`, `#18181B`, `#27272A`, `#10B981`, `#059669`, Outfit & Plus Jakarta Sans | M1 | ORIGINAL_REQUEST §R1 |
| 2 | Fluid Background Canvas (Aurora & Dust) | Create `Aurora.tsx` and `InteractiveCanvasDust.tsx` with 30/60 FPS throttle, `IntersectionObserver` pause, and `prefers-reduced-motion` | M1 | ORIGINAL_REQUEST §R2 |
| 3 | React Bits Motion Primitives Expansion | Implement `TiltedCard.tsx`, `Magnet.tsx`, and re-theme `SpotlightCard.tsx`, `ShinyText.tsx`, `DecryptedText.tsx` to Emerald glow | M1 | ORIGINAL_REQUEST §R3 |
| 4 | Hero Stage Overhaul & Telemetry Pills | Unblocked team photo stage, floating status telemetry pills, kinetic title reveal, magnetic CTA buttons | M2 | ORIGINAL_REQUEST §R4 |
| 5 | Leaders & Managers Horizontal Showcase | Minimalist horizontal timeline cards with smooth crossfades and authentic leadership badges | M2 | ORIGINAL_REQUEST §R4 |
| 6 | Active Technical Squad Streamlining | Streamlined division filter tabs (`Program`, `Elektronik`, `Mekanik`) with high-density member cards | M2 | ORIGINAL_REQUEST §R4 |
| 7 | Member Card Photo Unblocking Decoupling | Decouple top division and era badges into dedicated top bar above photo viewport (`Top Bar -> Photo Viewport -> Card Body`) | M2 | ORIGINAL_REQUEST §R4 |
| 8 | Tournament Archives & Arena Diagrams | Interactive tabs (2019-2026), dedicated vector arena diagrams, scoring breakdowns, technical specs | M2 | ORIGINAL_REQUEST §R4 |
| 9 | Minimalist Navbar Scroll-Spy & Preloader | Top navbar with blur backdrop and dynamic viewport scroll-spy tracking, refined emerald preloader | M2 | ORIGINAL_REQUEST §R4 |
| 10 | Global Section Aesthetic Unification | Update `Achievements`, `AboutTeamSection`, `NewsMediaSection`, `KRIOverview`, `Footer`, and subpages to Obsidian-Emerald palette | M2 | ORIGINAL_REQUEST §R1 |
| 11 | Data Credential Synchronization | Verify 100% PDDikti credentials across all 33 team members; synchronize Farhan Yuda Mahendra NIM to `22518241040` | M1 | ORIGINAL_REQUEST §R5 |
| 12 | Multi-Tier Verification & Gate Approval | Run static export build (11 pages), HTML output harness, edge cases stress tests, React Bits suite, and forensic audit | M3 | ORIGINAL_REQUEST §R5 |
| 13 | Production Git Commit & Push | Semantic git commit, clean working tree, push to GitHub `origin main` | M4 | ORIGINAL_REQUEST §R5 |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| M0 | Survey & Specification Mining | Full codebase exploration, visual palette audit, test assertion mining | none | DONE |
| M1 | Design System Tokens, Fluid Canvas Primitives & Data Sync | `tailwind.config.js`, `app/globals.css`, `app/layout.tsx`, `data/teamData.ts`, `components/animations/Aurora.tsx`, `InteractiveCanvasDust.tsx`, `TiltedCard.tsx`, `Magnet.tsx`, `SpotlightCard.tsx`, `ShinyText.tsx`, `DecryptedText.tsx` | M0 | PLANNED |
| M2 | Component Overhauls & Section Integrations | `HeroSection.tsx`, `TeamRosterSection.tsx`, `KrtmiChronicles.tsx`, `Navbar.tsx`, `Preloader.tsx`, `Achievements.tsx`, `AboutTeamSection.tsx`, `NewsMediaSection.tsx`, `KRIOverview.tsx`, `Footer.tsx`, subpages | M1 | PLANNED |
| M3 | Multi-Tier Verification Gate | Next.js build (`npm.cmd run build`), `test_empirical_html_output.js`, `stress_test_edge_cases.js`, `test_reactbits_suite.js`, Reviewers, Challengers, Forensic Auditor | M2 | PLANNED |
| M4 | Remote Git Sync & Delivery Handoff | Git add, semantic commit, push to GitHub `origin main`, final orchestrator handoff to parent | M3 | PLANNED |

## Interface Contracts
- **Palette**: Base canvas `#0B0B0E`, cards `#121216` & `#18181B`, borders `#27272A`, primary accent `#10B981` / `#059669`.
- **Typography**: Display: Outfit, Body: Plus Jakarta Sans via Next.js `@next/font/google`.
- **Photo Unblocking**: Member cards decouple badges into a separate bar above the photo (`Top Bar -> Photo Viewport -> Card Body`). No floating tags covering faces.
- **Data Schema**: All 33 team members retain verified 11-digit PDDikti NIMs, Prodi, Faculty, Angkatan. Farhan Yuda Mahendra NIM is `22518244007`.
- **Static Export**: 11 target files in `out/` with zero broken asset links.
- **Zero Heavy Dependencies**: Pure React hooks, CSS animations, Web APIs (`IntersectionObserver`, `requestAnimationFrame`), GSAP (`@gsap/react`). Prohibited: `framer-motion`, `@react-spring`.

## Code Layout
- `tailwind.config.js`, `app/globals.css`, `app/layout.tsx` — Design system tokens & typography
- `components/animations/` — Zero-dependency motion primitives (`Aurora.tsx`, `InteractiveCanvasDust.tsx`, `SpotlightCard.tsx`, `TiltedCard.tsx`, `Magnet.tsx`, `BlurText.tsx`, `DecryptedText.tsx`, `ShinyText.tsx`, `CountUp.tsx`, `AmbientGrid.tsx`)
- `components/sections/` — Main website sections (`HeroSection.tsx`, `TeamRosterSection.tsx`, `KrtmiChronicles.tsx`, etc.)
- `components/` — Shared UI (`Navbar.tsx`, `Preloader.tsx`, `Footer.tsx`)
- `data/` — Authentic data sources (`teamData.ts`, `krtmiData.ts`, `newsData.ts`)
- `scripts/` — Empirical test harnesses & postbuild scripts
