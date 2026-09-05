# Execution Plan: Abhinaya UNY Robotics Portal Redesign (orchestrator_5)

## Objective
Redesign the portal from the ground up with high-end minimalist dark aesthetic (Deep Obsidian `#0B0B0E`, cards `#121216` / `#18181B`, delicate 1px `#27272A` borders, Emerald Green `#10B981` glow accents), eliminating all visual noise, and integrating fluid react-bits motion components while preserving 100% PDDikti data and passing all test suites.

## Phased Milestones

### Phase 0: Survey & Scope Mapping (M0)
- **Explorer 1 (Visual & Palette Survey)**: Inspect `tailwind.config.js`, global CSS (`app/globals.css`), existing color variables, current background and card implementations across all components.
- **Explorer 2 (Component Structure & React Bits Survey)**: Survey `components/react-bits/`, `components/sections/`, `app/` pages, navigation, headers, footers, typography usage (Outfit & Plus Jakarta Sans), and photo unblocking constraints.
- **Spec Miner 3 (Data & Test Suite Survey)**: Survey all test files (`scripts/test_empirical_html_output.js`, `scripts/stress_test_edge_cases.js`, `scripts/test_reactbits_suite.js`), and data models (`data/teamData.ts`, `data/krtmiData.ts`, `STRUKTUR_TIM_ABHINAYA.md`) to extract invariants and test assertions.

### Phase 1: Minimalist Deep Obsidian & Emerald Glow Design System + Fluid Canvas (M1)
- Worker M1:
  - Update Tailwind config and CSS variables to establish Deep Obsidian (`#0B0B0E`), card surfaces (`#121216` / `#18181B`), border lines (`#27272A` / `rgba(255,255,255,0.06)`), and Emerald Green (`#10B981` / `#059669`).
  - Implement/enhance react-bits background canvas: subtle Aurora / Mesh gradient glow in hero and header zones + interactive grid / particle dust with 30/60 FPS throttle and `IntersectionObserver` / `prefers-reduced-motion` pause.
  - Verify zero third-party dependency additions (pure React/Tailwind/Web APIs).

### Phase 2: Component Overhaul & Kinetic Motion Integration (M2)
- Worker M2:
  - Overhaul Hero Stage: clean expansive layout, unblocked team photography, floating status telemetry pills, refined CTA buttons with Emerald accents.
  - Overhaul Leaders & Managers: minimalist horizontal timeline cards with smooth crossfades and authentic badges.
  - Overhaul Active Technical Squad: division filter tabs (Program, Elektronik, Mekanik) with high-density readable member cards and SpotlightCard border glow.
  - Overhaul Rulebook & Tournament Archives (2019-2026): clean interactive tabs, arena diagrams, scoring breakdowns.
  - Overhaul Preloader & Navigation: minimalist top navbar with blur backdrop, smooth scroll-spy.
  - Integrate kinetic typography (BlurText, DecryptedText) on headings and viewport entrance.
  - Run Next.js static export (`npm.cmd run build`) and verify 11 static pages.

### Phase 3: Multi-Stage Verification & Forensic Audit Gate (M3)
- Reviewer 1 (Design & Code Quality)
- Reviewer 2 (Responsive UX & Accessibility)
- Challenger 1 (Static Export DOM & Assertion Stress)
- Challenger 2 (Empirical HTML Output & Edge Cases Harness)
- Forensic Auditor (Authenticity, Zero Hardcoded Cheats, PDDikti verification)

### Phase 4: Git Sync & Final Handoff (M4)
- Worker M4: Clean git status, semantic commit, push to GitHub `origin main`.
- Orchestrator 5: Compile final handoff and notify parent sentinel.
