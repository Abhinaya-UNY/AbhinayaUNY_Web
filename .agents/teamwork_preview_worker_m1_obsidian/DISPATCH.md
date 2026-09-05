## 2026-09-05T18:03:02Z
You are worker_m1_obsidian, a teamwork_preview_worker.
Your Working Directory: D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web\.agents\teamwork_preview_worker_m1_obsidian
Project Root: D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web
Authoritative User Request: D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web\.agents\ORIGINAL_REQUEST.md (MUST read this file first under header ## 2026-09-05T17:57:00Z).
Project Specification & Plan: D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web\.agents\orchestrator_5\PROJECT.md
Survey Reports to Read:
- D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web\.agents\teamwork_preview_explorer_m0_palette\survey_palette_report.md
- D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web\.agents\teamwork_preview_spec_miner_m0_tests\spec_mining_report.md

DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Your Mission (Milestone M1):
Implement the Minimalist Deep Obsidian & Emerald Glow Design System tokens, fluid background canvas primitives, kinetic motion primitives, and data credential synchronization:

1. Design System & Tokens:
   - In `tailwind.config.js`:
     - Update base canvas to Deep Obsidian `#0B0B0E`.
     - Update card surfaces to `#121216` (primary card) and `#18181B` (secondary card).
     - Update border colors to `#27272A` / `rgba(255, 255, 255, 0.06)`.
     - Update primary accent to Refined Emerald Green `#10B981` / `#059669` (with subtle glow values).
     - Keep backward-compatible class aliases for test suites (e.g. `brand-orange` mapping to `#10B981` or existing aliases so test scripts checking classes don't break, while introducing `emerald-glow`, `obsidian-card`, etc.).
   - In `app/globals.css`:
     - Update background to `#0B0B0E`.
     - Replace harsh orange radial background gradients with subtle Emerald glow ambient gradients (`rgba(16, 185, 129, 0.06)` / `rgba(16, 185, 129, 0.03)`).
     - Configure scrollbar styling to fit dark obsidian theme.
   - In `app/layout.tsx`:
     - Import Google Fonts Outfit (Display/Headings) and Plus Jakarta Sans (Body/UI) via `@next/font/google` and attach to font variables / body.
     - Update `<meta name="theme-color" content="#0B0B0E" />`.

2. Fluid Background Canvas & Motion Primitives (`components/animations/`):
   - Implement `Aurora.tsx`: subtle Aurora / Mesh gradient glow that gently shifts in background without causing eye strain. Supports `prefers-reduced-motion` and throttled animation.
   - Implement `InteractiveCanvasDust.tsx`: interactive grid and subtle particle dust reacting to cursor hover/scroll, clamped to 30/60 FPS, and auto-paused when out of view via `IntersectionObserver` or when `prefers-reduced-motion` is enabled.
   - Implement `TiltedCard.tsx`: subtle 3D hover feedback without layout shift or jitter.
   - Implement `Magnet.tsx`: smooth magnetic cursor-following physics for CTA buttons.
   - Update `SpotlightCard.tsx`: update default `spotlightColor` to subtle Emerald `rgba(16, 185, 129, 0.12)` and background to `#121216`.
   - Update `ShinyText.tsx`: update default gradient shine to Emerald gradient.
   - Update `DecryptedText.tsx`: update default scrambling style to Emerald font-mono.
   - Export all from `components/animations/index.ts`.
   - Ensure ZERO third-party animation dependencies added (NO `framer-motion`, NO `@react-spring`; pure React hooks, CSS transitions/keyframes, standard Web APIs).

3. Data Credential Synchronization:
   - In `data/teamData.ts`: Synchronize Farhan Yuda Mahendra's NIM to authentic PDDikti `22518241040` (check lines 419 and 725), preserving all other 33+ member credentials.

4. Verification & Testing:
   - Run `node scripts/test_reactbits_suite.js` and verify 100% pass (expand suite or add assertions for new primitives if applicable).
   - Run `node scripts/stress_test_edge_cases.js` to ensure no edge case regressions.
   - Document commands executed and exact outputs in your `handoff.md`.

5. Write a comprehensive `handoff.md` in `D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web\.agents\teamwork_preview_worker_m1_obsidian\handoff.md` and send a completion message to orchestrator_5.
