# BRIEFING — 2026-08-23T00:31:00Z

## Mission
Discover and extract accurate specifications from official local rulebooks and historical guides (KRTMI 2019-2026, Technocorner Transporter 2026) for the Abhinaya UNY Robotics Portal project, and design the complete TypeScript data schema and content for data/krtmiData.ts.

## 🔒 My Identity
- Archetype: Specification Miner
- Roles: Guidebook Spec Miner, Robotics Rules & Arena Specialist
- Working directory: D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web\.agents\spec_miner_guidebooks
- Original parent: 0ba6ee0b-a10f-4075-93e6-8552bb10e849
- Milestone: Feature & Rulebook Specification Mining

## 🔒 Key Constraints
- Read-only on existing codebase/documents; discover and extract exhaustive specifications from local PDF rulebooks and historical archives.
- Extract competition name, year, official theme/motto, arena dimensions, field layout, zones, surface, obstacles, robot specs (dimensions start/expanded, weight, power/voltage, comms, sensors, actuators), game rules, match duration, phases, objects, loading, target zones, scoring formulas, points breakdown, bonus points, penalties, disqualification, and Abhinaya UNY historical context.
- Output detailed report.md and handoff.md in working directory.
- Design complete TypeScript data schema for data/krtmiData.ts.

## Current Parent
- Conversation ID: 0ba6ee0b-a10f-4075-93e6-8552bb10e849
- Updated: 2026-08-23T00:31:00Z

## Task Summary
- **What was built/mined**: Authoritative specifications across all KRTMI editions (2019-2026) and Technocorner Transporter 2026 from local PDFs and archives.
- **Success criteria**: Exhaustive extraction covering all rules, arena layouts, robot constraints, scoring equations, and historical achievements.
- **Interface contracts**: TypeScript interfaces for `data/krtmiData.ts` provided in `report.md`.

## Key Decisions Made
- Extracted and verified primary source text from all 6 local PDF guidebooks (2020, 2021, 2022, 2023, 2024, 2026).
- Documented exact dimensions, voltages (max 13V for TC26, max 24V for KRTMI), scoring multipliers, and victory states ("BERSIH" for 2024, "DAM" for 2021-2023).
- Designed backwards-compatible extended TypeScript schema for `data/krtmiData.ts`.

## Artifact Index
- `report.md` — Comprehensive guidebook extraction report
- `handoff.md` — 5-component hard handoff report
- `extracted_all_guidebooks.json` — Consolidated JSON extraction of rulebooks
