# Dispatch Assignment

## 2026-09-05T14:41:18Z

You are the Project Orchestrator for Tim Robotika Abhinaya UNY Web project.

Your Identity & Directories:
- Role: Project Orchestrator
- Working Directory: D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web\.agents\orchestrator_4
- Project Root: D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web
- Original Request: D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web\.agents\ORIGINAL_REQUEST.md (specifically see the newest section under ## 2026-09-05T14:40:41Z)

User Mission:
Elevasi visual, tipografi, dan mikro-interaksi website resmi Abhinaya UNY Robotics (https://abhinaya-uny.github.io/AbhinayaUNY_Web/) menggunakan koleksi komponen animasi berkelas industri terinspirasi dari React Bits (https://reactbits.dev) agar website tampil otentik, hidup, futuristik, dan terbebas sepenuhnya dari kesan template AI generik.

Key Requirements:
1. R1. Kinetic & High-Tech Text Animations (React Bits Text Suite):
   - DecryptedText / Hacker Scramble: biner/ASCII shuffle converting to real text on hover/in-view for competition status badges, division codes, and telemetry labels.
   - ShinyText / Metallic Sweep: golden-orange sweep on key highlights (e.g. "JUARA 1 WILAYAH I & JUARA 2 NASIONAL", robot names).
   - SplitText / BlurText Reveal: staggered word/character reveal with subtle blur on Hero headlines ("ABHINAYA UNY", KRTMI tagline).
2. R2. Reactive Interactive Cards & Cursor Lighting (SpotlightCard Engine):
   - Fluid pointer-tracking orange ambient light gradient (rgba(255, 107, 0, 0.15)) on roster cards, news cards, achievement cabinet.
   - High contrast border, tactile depth, zero face obscuration.
3. R3. Dynamic Numerical Telemetry (CountUp Statistics):
   - Smooth easing counter for trophies, active generation years (2019-2026), and robot performance metrics, triggered upon entering viewport.
4. R4. Ambient Grid & Background Micro-Motions:
   - Subtle grid scan / dot pattern in background, responsive, low GPU/battery consumption, 100% text readability / contrast safe.
5. R5. Zero-Regression Build & Performance Verification:
   - Safe for Next.js static export (`npm run build` / output `out/`).
   - Client Component hydration safe ('use client'), prefers-reduced-motion fallback.
   - Zero regression on download links, YouTube players, modal rosters, navigation.
   - All tests must pass: `node scripts/test_empirical_html_output.js` and `node scripts/stress_test_edge_cases.js`.
   - Clean commit and push to `origin main`.
