# E2E Test Infrastructure: Abhinaya UNY Web — Team Roster & Historical Archive Upgrade

## 1. Test Philosophy & Principles
- **Opaque-box & Requirement-Driven**: Tests are designed directly from the core specifications and acceptance criteria in `ORIGINAL_REQUEST.md` and `PROJECT.md` without implementation coupling or tautological assertions.
- **Multi-Tier Verification**: Strict 5-tier architecture ensuring comprehensive coverage from isolated feature units to end-to-end real-world user journeys.
- **Zero External Dependencies**: Standalone test harnesses in pure Node.js (`scripts/run_e2e_tests.js`) and Python standard library unittest (`scripts/test_e2e_roster.py`), ensuring deterministic, lightweight execution in CI/CD and offline local environments.
- **Forensic Integrity & Zero Cheating**: Strict zero-tolerance for dummy tokens (`John Doe`, `TODO`), hardcoded mocks, or facade tests. All assertions dynamically inspect live code ASTs, TypeScript contracts, catalog schemas, and disk image assets.

---

## 2. Multi-Tier Test Architecture & Matrix

| Tier | Focus / Scope | Core Test Target | Test Modules | Tests |
|:---|:---|:---|:---|:---:|
| **Tier 1** | **Feature Coverage** | Isolated verification of all 6 core features (>=5 tests per feature) | `tests/e2e/test_r1_photo_pipeline.js`<br>`tests/e2e/test_r2_leaders.js`<br>`tests/e2e/test_r2_managers.js`<br>`tests/e2e/test_r3_technical_squad.js`<br>`tests/e2e/test_r4_alumni_explorer.js`<br>`tests/e2e/test_r5_crossfade_engine.js` | **36** |
| **Tier 2** | **Boundary & Corner Cases** | Extreme inputs, missing optional fields, image fallback handling, slide wrapping, regex search safety | `tests/e2e/test_tier2_boundaries.js` | **6** |
| **Tier 3** | **Cross-Feature Combinations** | Pairwise interactions: division + search filter, modal + crossfade engine, leader/manager timeline sync | `tests/e2e/test_tier3_combinations.js` | **5** |
| **Tier 4** | **Real-World Application Scenarios** | 5 complete end-to-end user workflows (historical timeline exploration, lightbox modal inspection, mobile responsive grid, SSG export) | `tests/e2e/test_tier4_scenarios.js` | **5** |
| **Tier 5** | **Adversarial & Code Integrity** | Authentic student NIMs, zero dummy stubs, clean TypeScript interfaces, zero unauthorized admin routes | `tests/e2e/test_tier5_integrity.js` | **5** |
| **TOTAL** | **Comprehensive Multi-Tier Suite** | **All 5 Core Requirements (§R1–§R5)** | **10 Test Suites** | **57** |

---

## 3. Feature Inventory & Coverage Mapping

| # | Feature / Requirement | Source | Scope & Verifications | Tests |
|---|-----------------------|--------|----------------------|:-----:|
| 1 | **Instagram Photo Semantic Renaming Pipeline** | `ORIGINAL_REQUEST §R1` | Format compliance regex (`{tahun}_{divisi}_{nama}_{urutan}.ext`), non-member/grid graphic exclusion, 97 genuine member portraits, byte size integrity (>1KB), schema completeness. | 6 |
| 2 | **All-Era Leaders Hall of Fame (2020–2025)** | `ORIGINAL_REQUEST §R2` | Chronological era completeness (2020-2025), authentic leader identities (Nurcholis, Iqbal, Salsabila, Ilham, Farhan), gold/amber theme styling (`#EAB308`), academic credentials, photo bindings. | 6 |
| 3 | **All-Era Managers Showcase (2020–2025)** | `ORIGINAL_REQUEST §R2` | Chronological era coverage (2020-2025), authentic managers (Yuli, Mustika, Rose Pita, Zelfa), dual co-management eras (2024, 2025), operational specializations, emerald theme styling (`#10B981`). | 6 |
| 4 | **Current Active Technical Squad** | `ORIGINAL_REQUEST §R3` | Program, Elektronik, Mekanik divisions, granular roles (CV Lead, PDB Lead, CAD Lead), robotics skill tags (YOLO, STM32, PCB, Mecanum), authentic student NIMs, multi-photo pose arrays. | 6 |
| 5 | **Interactive Alumni & Generation Explorer** | `ORIGINAL_REQUEST §R4` | 6 generation eras (2020–2025), contingent member rosters, leadership linkages, historical competition milestones (UV-C 2020, Logistics 2021, Medical 2022, Digital Twin 2023, Waste Sorting 2024), tab filter state encapsulation. | 6 |
| 6 | **Ultra-Smooth Crossfade Photo Engine** | `ORIGINAL_REQUEST §R5` | GPU-accelerated CSS transitions (`duration-1000 ease-in-out`), slide counter indicator (`1/N`), interactive dot pagination (`w-6 bg-brand-orange`), manual navigation arrows with `stopPropagation`, staggered interval timer offset, fallback monogram avatar. | 6 |

---

## 4. Test Harness Execution Commands

### Primary Node.js Test Runner (Zero Dependencies)
```powershell
# Run entire 57-test suite
node scripts/run_e2e_tests.js

# Run specific tiers
node scripts/run_e2e_tests.js --tier 1
node scripts/run_e2e_tests.js --tier 2
node scripts/run_e2e_tests.js --tier 3
node scripts/run_e2e_tests.js --tier 4
node scripts/run_e2e_tests.js --tier 5
```

### Alternative Python Test Runner (unittest Framework)
```powershell
# Run entire test suite
python scripts/test_e2e_roster.py

# Run specific tiers
python scripts/test_e2e_roster.py --tier 1
python scripts/test_e2e_roster.py --tier 4
```

### Static Site Generation Verification
```powershell
npm.cmd run build
```
