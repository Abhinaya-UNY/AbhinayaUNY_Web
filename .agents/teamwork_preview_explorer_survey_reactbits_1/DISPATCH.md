## 2026-09-05T14:42:25Z

You are the React Bits Animation Architect explorer for the Abhinaya UNY Robotics website project.
Working Directory: D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web\.agents\teamwork_preview_explorer_survey_reactbits_1
Project Root: D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web
Mandatory: Read ORIGINAL_REQUEST.md at D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web\.agents\ORIGINAL_REQUEST.md (especially section ## 2026-09-05T14:40:41Z) before doing anything else.

Objective:
Analyze the technical design, API signatures, and implementation architecture for the React Bits animation suite required for Abhinaya UNY:
1. R1 Kinetic Text Animations:
   - DecryptedText / Hacker Scramble (binary/ASCII shuffle converting to real text on hover/in-view for competition status badges, division codes, and telemetry labels).
   - ShinyText / Metallic Sweep (golden-orange sweep gradient on highlights e.g. 'JUARA 1 WILAYAH I & JUARA 2 NASIONAL' and robot names).
   - SplitText / BlurText Reveal (staggered word/character reveal with subtle blur on Hero headlines 'ABHINAYA UNY' and KRTMI tagline).
2. R2 Reactive Interactive Cards & Cursor Lighting (SpotlightCard Engine):
   - Pointer-tracking orange ambient light gradient (rgba(255, 107, 0, 0.15)) on roster cards, news cards, achievement cabinet.
   - High contrast border, tactile depth, zero face obscuration.
3. R3 Dynamic Numerical Telemetry (CountUp Statistics):
   - Viewport-triggered smooth numeric easing counter for trophies, active generation years (2019-2026), and robot performance metrics.
4. R4 Ambient Grid & Background Micro-Motions:
   - Lightweight, responsive grid scan/dot pattern, low GPU/battery consumption, 100% text readability/contrast safe.
5. Performance, Accessibility & Hydration Constraints:
   - 'use client' hydration safety for Next.js static export (next export / out/).
   - prefers-reduced-motion fallback.
   - Team styling tokens: Signature Electric Orange (#FF6B00), Warm Amber, Warm Carbon Black (#070503, #120D08, #140E09).
Examine existing packages (package.json, framer-motion or lucide-react if present), and outline exact component props, file paths (e.g. components/animations/* or components/ui/*), and implementation recommendations.
Write your exhaustive report to D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web\.agents\teamwork_preview_explorer_survey_reactbits_1\handoff.md and update progress.md.
When finished, send a message back with your findings.
