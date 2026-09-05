# Plan: Abhinaya UNY Robotics Portal Redesign (orchestrator_6)

## Overview
Successor orchestrator (orchestrator_6) executing the remaining lifecycle:
1. M2 Verification & Component Review: Ensure all required items from M2 (Hero, Leaders & Managers, Active Technical Squad 2025, Rulebook & Tournament Archives, Preloader & Navigation) are complete and adhere to Deep Obsidian/Emerald aesthetic and photo unblocking invariant.
2. M3 Verification Gate: Dispatch parallel Reviewers, Challengers, and Forensic Auditor to independently test:
   - Full build (`npm run build` static export of 11/11 pages)
   - `node scripts/test_empirical_html_output.js`
   - `node scripts/stress_test_edge_cases.js`
   - `node scripts/test_reactbits_suite.js`
   - `python scripts/test_challenger1_nim_faculty_oracle.py`
   - Zero dark overlays on team faces/robots/trophies
   - Authentic PDDikti invariants across all 33 members (Farhan Yuda Mahendra: 22518244007)
   - UNLIMITED UNDIP year: 2026
3. M4 Production Git Sync: Dispatch git worker to perform clean semantic commit and push to remote (`origin main`).
4. Final Victory Audit & Handoff: Synthesize verdicts, write handoff.md, and report victory via send_message.

## Verification Steps
- Step 1: Initialize metadata & start heartbeat cron.
- Step 2: Spawn M3 Verification swarm:
  - Reviewer 1 (Code, Components, & Aesthetics): Inspect components, typography, layout, photo unblocking, and React Bits integration.
  - Reviewer 2 (Data Integrity, Timeline, & Copywriting): Inspect PDDikti data, UNDIP 2026 timeline, and authentic technical copywriting.
  - Challenger 1 (Build & Static Export Oracle): Execute `npm run build`, `python scripts/test_challenger1_nim_faculty_oracle.py`, and link integrity.
  - Challenger 2 (Empirical HTML, Stress Tests, & ReactBits): Execute `node scripts/test_empirical_html_output.js`, `node scripts/stress_test_edge_cases.js`, `node scripts/test_reactbits_suite.js`.
  - Auditor (Forensic Anti-Cheating & Integrity Verifier): Verify authentic implementation, absence of hardcoded dummy facades, and structural integrity.
- Step 3: Evaluate Gate Status (ALL must approve/clean). If any issue found, dispatch remediation worker.
- Step 4: Dispatch Git Sync Worker (M4) to stage, commit, and push to `origin main`.
- Step 5: Complete handoff and report to parent.
