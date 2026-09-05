# Plan — React Bits Elevation & Kinetic Micro-Interactions

## Goal
Elevate the visual design, kinetic typography, and interactive tactile micro-motions of Abhinaya UNY Web using industrial-grade React Bits inspired components (DecryptedText, ShinyText, SplitText/BlurText, SpotlightCard, CountUp, AmbientGrid) while guaranteeing zero regressions, 100% Next.js static export compatibility, and passing all automated test suites.

## Phased Strategy

### Phase 0: Survey & Codebase Investigation
- Spawn 3 Explorers / Spec Miners to survey:
  1. Explorer 1: Current component structure, HeroSection, TeamRosterSection, Achievements, News, documentation/video links, styling setup (Tailwind, Framer Motion / Lucide icons).
  2. Explorer 2: Existing automated test suites (`scripts/test_empirical_html_output.js`, `scripts/stress_test_edge_cases.js`), next.config.js, package.json dependencies, static export build configurations.
  3. Spec Miner / Explorer 3: Precise requirements mapping for R1-R5: DecryptedText, ShinyText, SplitText/BlurText, SpotlightCard, CountUp, AmbientGrid, reduced motion fallbacks, and color/theme tokens (`#FF6B00`, Warm Amber, Warm Carbon Black).
- Merge findings into `PROJECT.md` at project root with Feature Inventory, Architecture, and Milestone contracts.

### Phase 1: Core Animation Components Suite (React Bits)
- Worker builds bespoke, lightweight, dependency-safe React Bits animation primitives under `components/animations/` or `components/ui/`:
  - `DecryptedText.tsx`: Hacker scramble with binary/ASCII shuffle, customizable speed, hover/in-view trigger, reduced motion fallback.
  - `ShinyText.tsx`: Metallic golden-orange sweep gradient animation across headline text.
  - `SplitText.tsx` / `BlurText.tsx`: Word/char level staggered reveal with soft blur and spring/ease transition.
  - `SpotlightCard.tsx`: Pointer tracking radial glow (`rgba(255, 107, 0, 0.15)`), contrast border, tactile depth, zero face obscuration.
  - `CountUp.tsx`: Viewport-triggered smooth numeric easing counter.
  - `GridScan.tsx` / `AmbientGrid.tsx`: Lightweight, battery/GPU-friendly ambient grid / dot micro-motion.
- Review and verify unit functionality and hydration safety.

### Phase 2: Page & Section Integration
- Worker integrates the new React Bits components into the target sections:
  - HeroSection: SplitText / BlurText on "ABHINAYA UNY" & KRTMI tagline; ShinyText on robot names / key headlines; AmbientGrid in background.
  - Badges & Telemetry: DecryptedText on competition status, division codes, and telemetry labels.
  - Achievements / Cabinet & News: ShinyText on "JUARA 1 WILAYAH I & JUARA 2 NASIONAL", SpotlightCard on achievement cards and news items.
  - TeamRosterSection: SpotlightCard on member cards ensuring photos remain 100% visible and unblocked.
  - Statistics / Numbers: CountUp on trophies, active years (2019-2026), and robot performance metrics.

### Phase 3: Comprehensive Verification & Audit Gate
- Reviewers evaluate code quality, accessibility, reduced motion, zero face obscuration, and component layout.
- Challengers empirically run:
  - `npm run build` (Next.js static export to `out/`).
  - `node scripts/test_empirical_html_output.js`.
  - `node scripts/stress_test_edge_cases.js`.
- Forensic Auditor verifies genuine implementation, absence of hardcoded hacks, and true React Bits-inspired animations.

### Phase 4: Git Sync & Delivery
- Worker cleanly commits and pushes changes to `origin main`.
- Orchestrator prepares `handoff.md` and signals completion to the Sentinel.
