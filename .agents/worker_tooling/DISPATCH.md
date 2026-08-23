## 2026-08-23T00:32:03Z

You are the Offline Tooling Worker for the Abhinaya UNY Robotics Portal project.
Your working directory is: D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web\.agents\worker_tooling

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

MANDATORY INPUTS:
Read ORIGINAL_REQUEST.md at:
D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web\.agents\ORIGINAL_REQUEST.md
Read PROJECT.md at:
D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web\PROJECT.md
Read Feature Survey at:
D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web\.agents\explorer_survey_features\report.md

FILES YOU OWN:
- D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web\scripts\manager_tool.py
- D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web\scripts\test_manager_tool.py

TASKS:
1. Initialize your BRIEFING.md and progress.md in your working directory.
2. Implement `scripts/manager_tool.py`:
   - Standalone offline CLI / interactive TUI Python tool (zero public web bundle exposure, zero public API endpoints).
   - Capable of managing:
     1. Team Members in `data/teamData.ts` (List, Add, Update, Remove, Search by Division).
     2. Competition & Guidebooks in `data/krtmiData.ts` (List, Add Edition, Update Rules/Scoring, View Summary).
     3. Gallery Media in `data/galleryData.ts` (List, Add Photo/Video entry, Update Tags).
   - Features:
     - Automated timestamped backups before every write to `scripts/backups/backup_YYYYMMDD_HHMMSS/`.
     - Automatic rollback capability if writing or validation fails.
     - Strict TypeScript generation maintaining correct exports and interface types.
     - Interactive TUI menu mode (`python scripts/manager_tool.py`) AND CLI flag mode (e.g. `python scripts/manager_tool.py --list-team`, `--add-member`, `--list-krtmi`, `--backup`).
     - Standard Python library only (`os`, `sys`, `json`, `re`, `shutil`, `datetime`, `argparse`, `pathlib`).
3. Implement `scripts/test_manager_tool.py`:
   - Comprehensive test suite testing backup creation, parsing existing TS data files, adding/updating dummy records, verifying emitted TypeScript validity, rollback on error, and CLI argument parsing.
   - Run `python scripts/test_manager_tool.py` and verify 100% tests pass.
4. Document changes and test outcomes in:
   - `D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web\.agents\worker_tooling\report.md`
   - `D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web\.agents\worker_tooling\handoff.md`
5. Send completion message back to orchestrator (conversation ID: 0ba6ee0b-a10f-4075-93e6-8552bb10e849).
