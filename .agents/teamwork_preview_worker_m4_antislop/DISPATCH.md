## 2026-09-07T02:53:03Z

<USER_REQUEST>
You are teamwork_preview_worker (Worker 2: Anti-Slop Copywriting, Palette Cleanse & Test Suite Alignment).
Working directory: D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web\.agents\teamwork_preview_worker_m4_antislop
Project Root: D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Context & Reference Files:
- ORIGINAL_REQUEST: D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web\.agents\ORIGINAL_REQUEST.md
- Survey Synthesis: D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web\.agents\orchestrator_7\m0_survey.md
- Explorer Copy Report: D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web\.agents\teamwork_preview_explorer_m0_copy\handoff.md
- Spec Miner Report: D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web\.agents\teamwork_preview_spec_miner_m0_specs\handoff.md

EXCLUSIVE FILE WRITE OWNERSHIP (You own ONLY these files; do not touch any other files):
1. components/AboutTeamSection.tsx
2. components/Footer.tsx
3. components/Navbar.tsx
4. components/TeamRosterSection.tsx
5. app/500/page.tsx
6. app/divisi/page.tsx
7. app/krtmi/page.tsx
8. app/layout.tsx
9. app/not-found.tsx
10. app/prestasi/page.tsx
11. data/instagramFeedData.ts
12. data/krtmiData.ts
13. data/teamData.ts
14. public/sitemap.xml
15. tests/e2e/test_r2_managers.js
16. scripts/test_e2e_roster.py
17. scripts/test_empirical_html_output.js
18. scripts/test_empirical_html_output.py

Your implementation tasks:
1. Enforce Rule R-02 (Anti-Slop Zero Em Dashes):
   - Replace all 63 occurrences of em dashes (`—`, \u2014) across the owned files with colons, commas, periods, hyphens, or parentheses per the survey report:
     * components/AboutTeamSection.tsx
     * components/Footer.tsx
     * components/Navbar.tsx
     * app/500/page.tsx
     * app/divisi/page.tsx
     * app/krtmi/page.tsx
     * app/layout.tsx
     * app/not-found.tsx
     * app/prestasi/page.tsx
     * data/instagramFeedData.ts
     * data/krtmiData.ts
     * public/sitemap.xml
   - Verify zero unicode emojis in UI copy.
2. Refine Generic AI Copywriting:
   - In data/instagramFeedData.ts: Refine the repetitive boilerplate motivational captions into authentic, sharp Indonesian engineering narratives reflecting Tim Robotika Abhinaya UNY (KRTMI division).
3. Chromatic Palette Alignment (Emerald to Amber Cleanse):
   - In data/teamData.ts (lines 2006-2011) and components/TeamRosterSection.tsx: Update Manager division badge from emerald to Warm Amber:
     `accent: '#F59E0B'`, `bg: 'bg-amber-950/40'`, `text: 'text-amber-300'`, `border: 'border-amber-500/40'`.
4. Preserve 100% PDDikti Ground Truth (Rule R-17):
   - Farhan Yuda Mahendra: strictly `22518244007`
   - Zelfa Nafisah Zalna: `23030730048` (FMIPA)
   - Hisyam Yasid Pratowo: `24090620010` (FV)
   - UNLIMITED UNDIP Robotics Competition: strictly year `2026`.
5. Align Test Suites & Add Automated Anti-Slop Checks:
   - In tests/e2e/test_r2_managers.js (lines 80-81) and scripts/test_e2e_roster.py (lines 217-218): Update assertions for Manager badge to check `#F59E0B` and `text-amber-300`.
   - In scripts/test_empirical_html_output.js and scripts/test_empirical_html_output.py: Ensure required CSS classes list includes `text-amber-300` / `text-brand-orange`.
   - In scripts/test_empirical_html_output.js & scripts/test_empirical_html_output.py: Add an automated Anti-Slop check that scans all exported HTML files in `out/` asserting 0 em dashes (`—` / `\u2014`) and 0 unicode emojis in visible text nodes.
6. Verification:
   - Run `python scripts/test_challenger1_nim_faculty_oracle.py` (must pass 4/4).
   - Run `node scripts/stress_test_edge_cases.js` (must pass 22/22).
   - Run `node tests/e2e/run_all.js` (must pass 57/57).
7. Write your detailed handoff report to D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web\.agents\teamwork_preview_worker_m4_antislop\handoff.md.
8. Notify parent orchestrator via send_message when complete.
</USER_REQUEST>
