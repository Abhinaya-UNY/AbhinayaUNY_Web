# DISPATCH

## Objective
Execute the M3 Verification Remediation plan formulated by Explorer Remediation, achieving 100% test pass and static build clean compilation.

## Context & Inputs
- Working Directory: D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web\.agents\teamwork_preview_worker_m3_remediation
- Authoritative User Request: D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web\.agents\ORIGINAL_REQUEST.md
- Project Scope: D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web\PROJECT.md
- Explorer Remediation Report: D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web\.agents\teamwork_preview_explorer_m3_remediation\handoff.md
- Auditor Full Report: D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web\.agents\teamwork_preview_auditor_m3_integrity\handoff.md

## Mandatory Integrity Warning
> DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

## Ground Truth Invariants (DO NOT MODIFY DATA LAYER)
1. Farhan Yuda Mahendra authentic PDDikti NIM is strictly **22518244007** across `data/teamData.ts` and `STRUKTUR_TIM_ABHINAYA.md`. Do NOT touch or revert this!
2. Zelfa Nafisah Zalna is S1 Fisika (FMIPA) with NIM **23030730048**.
3. Hisyam Yasid Pratowo is D4 Teknik Elektronika (Fakultas Vokasi / FV) with NIM **24090620010**.
4. UNLIMITED UNDIP competition year is strictly **2026**.

## Execution Steps (from Explorer Report)
1. In `tests/e2e/test_r3_technical_squad.js` (line 64):
   Change `'22518241040'` to `'22518244007'`.
2. In `tests/e2e/test_tier5_integrity.js` (line 46):
   Change `'22518241040'` to `'22518244007'`.
3. In `scripts/test_e2e_roster.py` (lines 250 & 521):
   Change `'22518241040'` to `'22518244007'`.
4. In `scripts/test_empirical_html_output.py` (line 124):
   Change `'22518241040'` to `'22518244007'`.
5. In `scripts/test_challenger1_nim_faculty_oracle.py`:
   - Synchronize `UNY_PRODI_MAP` and `EXPECTED_MEMBERS` with authentic verified PDDikti records.
   - Update placeholder checks so `22518244007` is recognized as authentic.
   - Support UNY 2023+ 2-digit faculty prefix codes (`03`, `05`, `09`).
   - Align line 593 assertion with Aryasetya's verified NIM `24051030016`.
6. Pure App Router 500 error page migration:
   - Create `app/500/page.tsx` importing and rendering `Custom500Content`.
   - Remove `pages/500.tsx` and `pages/_app.tsx` and remove the `pages/` directory.
7. In `components/HeroSection.tsx`:
   - Enhance primary CTA button styling with `bg-gradient-to-r from-emerald-500 to-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.35)] shadow-emerald-glow` to satisfy `test_e2e_suite.py`.
8. Auxiliary script sync:
   - Update `scripts/challenger1_dom_and_nim_test.js`, `scripts/manager_tool.py`, and `TEST_READY.md`.

## Verification
Run and verify exit code 0 on:
- `node tests/e2e/run_all.js` (57/57 pass)
- `python scripts/test_e2e_roster.py` (57/57 pass)
- `python scripts/test_challenger1_nim_faculty_oracle.py` (all 4 tests pass)
- `python scripts/test_e2e_suite.py` (55/55 pass)
- `npm.cmd run build` (code 0, all 11 pages compiled)
- `node scripts/test_empirical_html_output.js`
- `node scripts/stress_test_edge_cases.js`
- `node scripts/test_reactbits_suite.js`

Document all commands, results, and write handoff.md in your working directory, then notify your parent via send_message.
