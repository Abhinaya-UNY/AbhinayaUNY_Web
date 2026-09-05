## 2026-09-05T14:51:38Z
You are the React Bits Integration Specialist worker for the Abhinaya UNY Robotics website project.
Working Directory: D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web\.agents\teamwork_preview_worker_m2_integrations
Project Root: D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web
Mandatory: Read ORIGINAL_REQUEST.md at D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web\.agents\ORIGINAL_REQUEST.md (especially section ## 2026-09-05T14:40:41Z) before doing anything else.
Read Explorer 2 handoff report at:
D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web\.agents\teamwork_preview_explorer_survey_codebase_2\handoff.md
Read Worker M1 handoff report at:
D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web\.agents\teamwork_preview_worker_m1_reactbits\handoff.md
Read SCOPE.md at:
D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web\.agents\orchestrator_4\SCOPE.md

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Scope & File Ownership:
You exclusively own and will edit:
- `components/HeroSection.tsx`
- `components/TeamRosterSection.tsx`
- `components/Achievements.tsx`
- `components/NewsMediaSection.tsx`
- `components/AboutTeamSection.tsx`
- `components/KrtmiChronicles.tsx`
- `components/KRIOverview.tsx`
- `app/pertandingan/page.tsx`

Integration Requirements:
1. `components/HeroSection.tsx`:
   - Import `BlurText`, `ShinyText`, `DecryptedText`, `AmbientGrid` from `@/components/animations`.
   - Wrap main headline "ABHINAYA UNY" with `BlurText` (or split with `BlurText`). Ensure semantic `aria-label="ABHINAYA UNY"` is preserved.
   - Wrap tagline "Divisi Kontes Robot Tematik Indonesia (KRTMI)" with `BlurText`.
   - Wrap achievement badge "JUARA 1 WILAYAH I & JUARA 2 NASIONAL KRTMI 2024" with `ShinyText`.
   - Wrap category pill "TIM ROBOTIKA • UKM REKAYASA TEKNOLOGI UNY" with `DecryptedText`.
   - Add `<AmbientGrid />` as a subtle background layer (`pointer-events-none z-0`).
2. `components/TeamRosterSection.tsx`:
   - Replace the parent-level state `spotlightPos` and inline spotlight div with `SpotlightCard` from `@/components/animations`.
   - Use `DecryptedText` on division badges (`member.division`) or role pills with `animateOn="hover"`.
   - STRICT INVARIANT: Preserve the exact layout classes required by `scripts/stress_test_edge_cases.js`:
     - Meta bar: `px-3.5 py-2.5 bg-[#180F09] border-b border-[#2A180E] flex items-center justify-between`
     - Photo container: `aspect-[4/3] sm:aspect-square overflow-hidden bg-[#0A0704]`
     - Grid classes: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`, `gap-6`, `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`.
     - Zero face obscuration: Photos remain 100% visible and interactive.
3. `components/Achievements.tsx`:
   - Wrap all 6 trophy cards in `SpotlightCard` with orange ambient glow (`rgba(255, 107, 0, 0.18)`).
   - Wrap cabinet title "Kabinet Prestasi & Jejak Podium Nasional 🏆" with `ShinyText`.
   - Apply `DecryptedText` to award pills (`🥇 JUARA 1 REGIONAL`, etc.) and year badges.
   - STRICT INVARIANT: Keep UNLIMITED UNDIP year as **2026** (`year: '2026'`). Never 2025!
4. `components/NewsMediaSection.tsx`:
   - Wrap news article cards in `SpotlightCard` (as `a` or wrapping container).
   - Apply `DecryptedText` to portal badges (`Humas UNY`, `ANTARA News`, `Puspresnas`).
5. `components/AboutTeamSection.tsx`:
   - Apply `CountUp` to "7" in "7+ Periode" and "100" in "100% Otonom".
   - Wrap stat card containers in `SpotlightCard`.
   - Ensure UMS 2024 team photo remains 100% unblocked with 0% dark gradient.
6. `components/KrtmiChronicles.tsx`:
   - Apply `CountUp` to match duration ("3 Menit"), voltage caps ("13.0V", "24.0V").
   - Apply `DecryptedText` to victory condition and robot system status.
   - Retain `${basePath}/guidebooks/${story.pdfFile}` and download attribute.
7. `components/KRIOverview.tsx`:
   - Wrap 4 Pillars / division cards in `SpotlightCard`.
   - Apply `DecryptedText` to division codes (`KRAI`, `KRSTI`, `KRSBI-B`, `KRSBI-H`, `KRSRI`, `KRTMI`).
8. `app/pertandingan/page.tsx`:
   - Apply `CountUp` to telemetry metrics: 1.4 m/s (`to={1.4}` `decimals={1}`), < 12 Detik (`to={12}`), 98.4% Precision (`to={98.4}` `decimals={1}`).
   - Wrap telemetry cards in `SpotlightCard`.
   - Ensure YouTube player iframe integrity is preserved.

Verification:
- Run `cmd.exe /c npm.cmd run build` (must compile with code 0 and generate 11 static pages in out/).
- Run `node scripts/test_empirical_html_output.js` (must pass 100%).
- Run `node scripts/stress_test_edge_cases.js` (must pass 100%).
- Run `node scripts/test_reactbits_suite.js` (must pass 100%).
- Write your completion report to `D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web\.agents\teamwork_preview_worker_m2_integrations\handoff.md` and update `progress.md`.
- Send a message back when complete.
