## 2026-09-07T02:53:03Z

You are teamwork_preview_worker (Worker 1: Motion, Preloader Sync, Atmosphere & 2-Column Hero Architecture).
Working directory: D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web\.agents\teamwork_preview_worker_m1_m2_m3
Project Root: D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Context & Reference Files:
- ORIGINAL_REQUEST: D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web\.agents\ORIGINAL_REQUEST.md
- Survey Synthesis: D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web\.agents\orchestrator_7\m0_survey.md
- Explorer Motion Report: D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web\.agents\teamwork_preview_explorer_m0_motion\handoff.md

EXCLUSIVE FILE WRITE OWNERSHIP (You own ONLY these files; do not touch any other files):
1. components/Preloader.tsx
2. components/animations/BlurText.tsx
3. components/animations/Aurora.tsx
4. components/HeroSection.tsx
5. tailwind.config.js

Your implementation tasks:
1. Preloader-to-Hero Kinetic Text Synchronization:
   - In components/Preloader.tsx: Dispatch CustomEvent('abhinaya:preloader-dismiss') and set (window as any).__ABHINAYA_PRELOADER_DONE = true at the exact moment opacity fade begins (line 24, when setOpacity(0) is scheduled) AND on session skip (line 13).
   - In components/animations/BlurText.tsx: Add optional prop eady?: boolean = true. Only trigger setInView(true) when isIntersected && ready. Maintain 100% backward compatibility when ready is omitted or true.
   - In components/HeroSection.tsx: Add usePreloaderComplete() hook or state listener. Pass eady={isPreloaderDone} to BlurText for ABHINAYA and UNY.
2. HeroSection Purposeful Master Stagger Entrance:
   - Synchronize entrance transitions using CSS opacity/translate classes gated on isPreloaderDone:
     * Headline: BlurText unblur and glide up
     * Subtitle: Divisi KRTMI badge glide in
     * Trophy Pill: Juara 1 Wilayah I & Juara 2 Nasional with ShinyText glide in
     * Editorial Description: Research narrative glide in
     * CTAs: Dual magnetic action buttons glide in
     * Telemetry Dock: 4 pills glide in with 50ms stagger
     * Studio Photo Frame: Photo card with Cyber Orange glow border glides into focus
3. Alive Background Atmosphere & Fluid Motion:
   - In components/HeroSection.tsx: Mount InteractiveCanvasDust directly behind content with particleCount={28}, gridSize={48}, particleColor=255, 107, 0, maxFps={60}, className=pointer-events-none z-0 opacity-75.
   - In tailwind.config.js & components/animations/Aurora.tsx: Enhance uroraDrift1 and uroraDrift2 with subtle organic breathing scale (0.96 to 1.09) and opacity modulation. Add the 3rd floating accent orb in Aurora.tsx positioned behind the right-column media dock.
4. Dense Asymmetric 2-Column Hero Layout & Chromatic Cleanse:
   - Fix mobile 390px overflow: change whitespace-nowrap on headline to lex-wrap sm:flex-nowrap whitespace-normal sm:whitespace-nowrap.
   - Optimize tablet 768px telemetry layout: change grid-cols-2 to grid-cols-2 sm:grid-cols-4 lg:grid-cols-2.
   - Eliminate cyan text in Kinematika telemetry pill: change 	ext-cyan-400/	ext-cyan-300 to 	ext-orange-400/	ext-orange-300.
   - Ensure zero awkward empty margins and dense composition across 1920px, 1280px, 768px, and 390px.
5. Verification:
   - Run 
ode scripts/test_reactbits_suite.js to confirm all 46 tests pass.
6. Write your detailed handoff report to D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web\.agents\teamwork_preview_worker_m1_m2_m3\handoff.md.
7. Notify parent orchestrator via send_message when complete.
