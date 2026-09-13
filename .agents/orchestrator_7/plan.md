# Comprehensive Execution Plan — Orchestrator 7
Elevating Abhinaya UNY Robotics Portal (https://abhinaya-uny.github.io/AbhinayaUNY_Web/)

## Objective
Implement anti-slop design principles (from miqdadbadjuber/anti-slop), dynamic alive background atmospheric motion, visible kinetic text reveals triggered post-preloader, strict Cyber Orange & Warm Amber palette on Deep Obsidian, dense asymmetric 2-column layout, and preserve authentic PDDikti ground truth across all modules.

---

## Milestone Breakdown

### Milestone 0: Exploration, Anti-Slop Audit & Palette Baseline
- **Goal**: Deep architectural survey and baseline anti-slop analysis.
- **Tasks**:
  1. Map existing components, styles, animations, and typography (`tailwind.config.ts`, `globals.css`, `HeroSection.tsx`, `Preloader.tsx`, `components/animations/*`).
  2. Scan for em dashes (`—`), unicode emojis, and generic AI copywriting.
  3. Audit color tokens: identify all remnants of Emerald/other accents and define precise mapping to Cyber Orange (`#FF6B00`, `#FB923C`, `#EA580C`) and Warm Amber (`#F59E0B`, `#FDE68A`) on Deep Obsidian (`#0B0B0E`).
  4. Inspect preloader dismissal lifecycle and hero animation trigger mechanism.
- **Dispatched Agents**:
  - Explorer 1 (Anti-slop copy & token survey)
  - Explorer 2 (Component animation & preloader timing survey)
  - Spec Miner / Explorer 3 (Test suite, oracle & verification harness audit)
- **Output**: Comprehensive baseline audit report in `.agents/orchestrator_7/m0_survey.md`.

### Milestone 1: Alive Background Atmosphere & Fluid Motion
- **Goal**: Implement dynamic, organic background atmosphere without layout shift.
- **Tasks**:
  1. Refactor or create animated organic glow orbs with breathing and subtle ambient drift.
  2. Implement interactive canvas dust and responsive ambient grid overlays.
  3. Ensure smooth frame rates (throttling, `prefers-reduced-motion` compliance, pausing off-screen).
- **Dispatched Agents**:
  - Worker (Background motion & atmospheric canvas implementation)
  - Reviewer (Performance, layout stability, visual fidelity)

### Milestone 2: Kinetic Animations & Text Reveal Timing Fix
- **Goal**: Synchronize hero entrance animations with preloader dismissal.
- **Tasks**:
  1. Ensure hero entrance animations (`BlurText`, `DecryptedText`, `ShinyText`, fade-ins) execute VISIBLY after preloader has fully dismissed.
  2. Implement smooth, purposeful stagger effects across headings, subheadings, badges, and action buttons.
  3. Eliminate any race condition where animations finish while preloader is still covering the viewport.
- **Dispatched Agents**:
  - Worker (Animation timing & preloader event dispatch/hook integration)
  - Reviewer (Visual verification of entrance flow)

### Milestone 3: Dense Cohesive Layout Architecture
- **Goal**: Re-architect hero and core section layouts for dense, purposeful composition.
- **Tasks**:
  1. Implement asymmetric 2-column split in Hero:
     - Left: Bold headline, single-line/tight subtitle, trophy badge, concise description, magnetic CTA buttons.
     - Right: Studio photo card with floating telemetry dock (`AUTONOMOUS`, `4WD MECANUM`, `KRI 2026 READY`, `ACTIVE 5.8GHz`).
  2. Eliminate awkward empty margins and whitespace gaps.
  3. Ensure seamless responsiveness across 1920px, 1280px, 768px, and 390px viewports.
- **Dispatched Agents**:
  - Worker (Hero & core section layout refactoring)
  - Reviewer (Layout density & responsive inspection)

### Milestone 4: Anti-Slop Copywriting & Authentic Ground Truth Preservation
- **Goal**: Cleanse all UI copy of em dashes and emojis; guarantee 100% verified student and competition data.
- **Tasks**:
  1. Enforce Rule R-02: Strictly 0 em dashes (`—`) across all UI headlines, descriptions, badges, and captions (replace with colon, comma, period, or parentheses).
  2. Enforce zero unicode emojis in UI copy.
  3. Enforce Rule R-17: 100% PDDikti verified data (Farhan Yuda Mahendra: `22518244007`, Zelfa Nafisah Zalna: `23030730048`, Hisyam Yasid Pratowo: `24090620010`, UNDIP: `2026`).
  4. Ensure natural, sharp Indonesian engineering narrative.
- **Dispatched Agents**:
  - Worker (Copywriting refinement & data integrity alignment)
  - Reviewer (Textual and factual consistency review)

### Milestone 5: Rigorous Verification & Multi-Suite Testing
- **Goal**: Multi-tier testing, empirical test suite execution, and forensic audit.
- **Tasks**:
  1. Run `npm.cmd run build` — 100% clean Next.js static export with 0 errors across all 11 static pages.
  2. Run `node scripts/test_empirical_html_output.js` — 100% pass.
  3. Run `node scripts/test_reactbits_suite.js` — 100% pass.
  4. Run `node scripts/stress_test_edge_cases.js` — 100% pass.
  5. Run `python scripts/test_challenger1_nim_faculty_oracle.py` — 100% pass.
  6. Run responsive layout audit across 1920px, 1280px, 768px, 390px.
  7. Automated anti-slop audit confirming zero em dashes and zero emojis.
  8. Forensic Auditor check for genuine implementations (Zero Cheating, CLEAN verdict).
- **Dispatched Agents**:
  - Challenger 1 (Build & test harness execution)
  - Challenger 2 (Anti-slop & responsive layout testing)
  - Forensic Auditor (Authenticity and anti-cheating audit)
  - Reviewers (Final sign-off)

---

## Completion & Handoff
- Produce comprehensive `handoff.md` in `.agents/orchestrator_7/`.
- Send completion message to parent sentinel (`0c9bdb03-1a08-40f1-bb1c-2c11504484f2`).
