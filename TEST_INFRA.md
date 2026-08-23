# E2E Test Infra: Abhinaya UNY Robotics Portal

## Test Philosophy
- Opaque-box, requirement-driven testing directly derived from `ORIGINAL_REQUEST.md`.
- Comprehensive multi-tier test methodology:
  - **Tier 1**: Feature Coverage (Isolated happy-path verification of all 6 core features).
  - **Tier 2**: Boundary & Corner Cases (Mobile 360px-420px viewports, ultra-wide 4K, video thumbnail fallback handling, offline manager corrupted data rejection, missing fields).
  - **Tier 3**: Cross-Feature Combinations (Pairwise interactions: Hero CTA navigation to Guidebooks/Showcase, division filter with modal details, manager tool output leading to clean static build).
  - **Tier 4**: Real-World Application Scenarios (Prospective member/maba user journey, competition researcher inspecting 2024 vs 2026 rules, team manager adding 2026 Technocorner update offline).
  - **Tier 5**: Adversarial Coverage & Code Integrity (Zero dummy stubs, zero hardcoded cheat results, accurate data types, strict SSG zero-error compilation).

## Feature Inventory & Tier Mapping
| # | Feature | Source (Requirement) | Tier 1 | Tier 2 | Tier 3 | Tier 4 |
|---|---------|----------------------|:------:|:------:|:------:|:------:|
| 1 | Hero Layout & Button Proportions | ORIGINAL_REQUEST §R1 | 5 | 5 | ✓ | ✓ |
| 2 | YouTube Multimedia Showcase | ORIGINAL_REQUEST §R2 | 5 | 5 | ✓ | ✓ |
| 3 | Team Roster & Division Cards | ORIGINAL_REQUEST §R3 | 5 | 5 | ✓ | ✓ |
| 4 | Guidebook Alignment 2019-2026 | ORIGINAL_REQUEST §R4 | 5 | 5 | ✓ | ✓ |
| 5 | Standalone Offline Manager Tool | ORIGINAL_REQUEST §R5 | 5 | 5 | ✓ | ✓ |
| 6 | Static Build & Deployment | ORIGINAL_REQUEST §Verification | 5 | 5 | ✓ | ✓ |

## Test Architecture
- **Test Runner**: Node.js / Python test runner executing automated DOM / AST / static export / CLI verification scripts.
- **Pass / Fail Semantics**: Zero tolerance for build errors, zero broken links, zero overlapping CTA buttons, 100% test tier pass rate.

## Real-World Application Scenarios (Tier 4)
| # | Scenario | Features Exercised | Complexity |
|---|----------|--------------------|------------|
| 1 | Prospective Student Discovery Flow (Hero -> Watch Action -> Explore Divisions & Members) | F1, F2, F3 | Medium |
| 2 | Competition Rulebook Research Flow (Explore 2024 KRTMI Dual-Robot Rules & 2026 Technocorner Transporter constraints) | F1, F4 | Medium |
| 3 | Offline Team Data Management Flow (Team Manager adds member/competition via `manager_tool.py` and triggers clean SSG export) | F5, F6, F3, F4 | High |
| 4 | Responsive Multi-Device Inspection (Mobile 390px, Tablet 768px, Desktop 1920px rendering) | F1, F2, F3, F4 | High |
| 5 | Official Media & Shorts Playback (Modal opening, 16:9 widescreen vs 9:16 vertical Shorts aspect ratio verification) | F2 | Medium |
