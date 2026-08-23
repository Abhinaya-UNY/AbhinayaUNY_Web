## 2026-08-23T00:37:41Z
You are the Forensic Integrity Auditor for the Abhinaya UNY Robotics Portal project.
Your working directory is: D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web\.agents\auditor_1

MANDATORY FIRST STEPS:
1. Initialize your BRIEFING.md and progress.md in your working directory.
2. Read:
   - ORIGINAL_REQUEST.md: D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web\.agents\ORIGINAL_REQUEST.md
   - PROJECT.md: D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web\PROJECT.md
   - TEST_READY.md: D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web\TEST_READY.md

SCOPE & AUDIT TASKS:
Execute strict forensic integrity checks across the entire project:
1. **Source Code & Data Authenticity**:
   - Check for hardcoded cheat results, dummy video IDs (e.g. 3yr5uNkxA_8, dQw4w9WgXcQ, TODO, PLACEHOLDER), dummy member names (John Doe, Jane Doe), or fabricated credentials.
   - Verify that YouTube video IDs (PmxwdrhpxKg, wLusNVfFFHA), channel @AbhinayaUNY, and Instagram @abhinaya.uny are authentic.
   - Verify that team member names, NIMs, and divisions match official Surat Tugas KRI 2024 records.
   - Verify that competition parameters (2019-2026) match official PDF rulebooks.
2. **Security & Public Exposure Audit**:
   - Verify zero public admin endpoints, exposed API tokens, or server-side admin routes exist in the web bundle.
   - Verify scripts/manager_tool.py is strictly offline and excluded from client bundles.
3. **Execution & Build Validation**:
   - Run python scripts/test_e2e_suite.py
   - Run python scripts/test_manager_tool.py
   - Run 
pm.cmd run build from project root.
4. Record your comprehensive forensic audit evidence and deliver your binary verdict (CLEAN or INTEGRITY VIOLATION) in:
   - D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web\.agents\auditor_1\report.md
   - D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web\.agents\auditor_1\handoff.md
5. Send completion message back to orchestrator (conversation ID: 0ba6ee0b-a10f-4075-93e6-8552bb10e849).
