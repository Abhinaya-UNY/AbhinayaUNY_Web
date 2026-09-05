## 2026-09-05T14:48:03Z

You are the React Bits Suite Builder worker for the Abhinaya UNY Robotics website project.
Working Directory: D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web\.agents\teamwork_preview_worker_m1_reactbits
Project Root: D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web
Mandatory: Read ORIGINAL_REQUEST.md at D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web\.agents\ORIGINAL_REQUEST.md (especially section ## 2026-09-05T14:40:41Z) before doing anything else.
Read the architectural blueprint and component specifications in Explorer 1's handoff report at:
D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web\.agents\teamwork_preview_explorer_survey_reactbits_1\handoff.md
Read SCOPE.md at:
D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web\.agents\orchestrator_4\SCOPE.md

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Scope & File Ownership:
You exclusively own and will create:
1. `components/animations/DecryptedText.tsx`:
   - Binary/ASCII hacker scramble effect revealing real text on hover/in-view.
   - SSR/Static Export safe: MUST render literal target text during SSR/initial render so static DOM assertions in test_empirical_html_output.js pass.
   - Reduced-motion safe fallback.
2. `components/animations/ShinyText.tsx`:
   - Golden-orange metallic sweep gradient using GPU-composited CSS keyframes (`animate-shimmer` from tailwind.config.js).
   - SSR-safe literal text.
3. `components/animations/BlurText.tsx`:
   - Staggered word/character reveal with subtle blur and translateY easing triggered via IntersectionObserver.
   - Semantic accessibility: container has `aria-label={text}`.
4. `components/animations/SpotlightCard.tsx`:
   - Fluid pointer-tracking radial glow (`rgba(255, 107, 0, 0.15)`) using CSS variables `--mouse-x`, `--mouse-y`.
   - Direct DOM ref style manipulation to eliminate parent component re-renders (120 FPS performance).
   - Overlay has `pointer-events-none` with semi-transparent illumination ensuring ZERO face or robot photo obscuration.
5. `components/animations/CountUp.tsx`:
   - Viewport-triggered smooth numeric easing counter using `requestAnimationFrame` and `easeOutExpo` easing.
   - Graceful fallback for prefers-reduced-motion.
6. `components/animations/AmbientGrid.tsx`:
   - Low-GPU, battery-friendly ambient robotics coordinate grid and scan micro-motion with WCAG contrast safety.
7. `components/animations/index.ts`:
   - Clean barrel export for all animation components.
8. `components/ui/SpotlightCard.tsx`:
   - Alias re-export pointing to `components/animations/SpotlightCard.tsx`.

Requirements & Constraints:
- Zero-dependency: pure React + Tailwind CSS + Web APIs (`requestAnimationFrame`, `IntersectionObserver`, CSS custom variables). Do NOT attempt to install framer-motion.
- All components must have `'use client';` directive.
- Run build command (`cmd.exe /c npm.cmd run build`) to verify that all components compile cleanly with TypeScript and static export succeeds.
- Write your completion report to `D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web\.agents\teamwork_preview_worker_m1_reactbits\handoff.md` and update `progress.md`.
- Send a message back when complete.
