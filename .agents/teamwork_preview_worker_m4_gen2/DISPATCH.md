# DISPATCH — Worker M4 (Build Integrity, Root PROJECT.md Sync & Git Synchronization)

## Mission
Implement Milestone 4: Verify build integrity, ensure `pages/500.tsx` is present and styled, synchronize root `PROJECT.md` with Orchestrator 2's master plan, verify all E2E test suites (100% pass), and cleanly commit all changes to the git repository.

## Exclusive File Ownership
You exclusively own:
- `pages/500.tsx`
- `PROJECT.md` (at project root)
- Git synchronization and staging

## Exact Tasks
1. Check `pages/500.tsx`:
   - If not yet present or incomplete, create `pages/500.tsx` with a sleek, bespoke dark-emerald 500 error page adhering to Abhinaya's branding, preventing any Next.js static export rename issues.
2. Synchronize root `PROJECT.md`:
   - Update `D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web\PROJECT.md` with the full content of `D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web\.agents\orchestrator_2\PROJECT.md`, marking M1, M2, M3 as DONE, and M4 as DONE once verified.
3. Test & Build Execution:
   - Run `node tests/e2e/run_all.js` and ensure all 57/57 tests PASS.
   - Run `python scripts/test_e2e_suite.py` and ensure all tests PASS.
   - Run `npm.cmd run build` and ensure exit code 0, 11/11 static pages exported.
4. Git Synchronization:
   - Check `git status`.
   - Stage all modified and new project files (source code, data, assets, docs).
   - Commit with a descriptive commit message:
     `feat: revamp Abhinaya UNY portal - photo unblocking, UNDIP 2026 correction, authentic copywriting, bespoke UI and E2E test pass`
   - Verify `git status` shows working tree clean.
5. Report:
   - Write `report.md` and `handoff.md` in your working directory and send_message back to parent.

## Mandatory Inputs
- `D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web\.agents\ORIGINAL_REQUEST.md`
- `D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web\.agents\orchestrator_2\PROJECT.md`

## 2026-09-05T07:43:30Z
You are Worker M4. Read your mission and file boundaries in D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web\.agents\teamwork_preview_worker_m4_gen2\DISPATCH.md.

MANDATORY: First read D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web\.agents\ORIGINAL_REQUEST.md.
Also read D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web\.agents\orchestrator_2\PROJECT.md.

Your working directory is D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web\.agents\teamwork_preview_worker_m4_gen2.

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Scope & Tasks:
1. Ensure pages/500.tsx is present and styled (bespoke dark-emerald 500 error page).
2. Synchronize root PROJECT.md with .agents/orchestrator_2/PROJECT.md, updating status of milestones M1..M4.
3. Execute tests: node tests/e2e/run_all.js and python scripts/test_e2e_suite.py, verifying 100% pass.
4. Execute npm.cmd run build and verify code 0.
5. Execute git status, stage changes, commit cleanly: "feat: revamp Abhinaya UNY portal - photo unblocking, UNDIP 2026 correction, authentic copywriting, bespoke UI and E2E test pass".
6. Write report to report.md and handoff.md in your working directory, then send_message back to parent.
