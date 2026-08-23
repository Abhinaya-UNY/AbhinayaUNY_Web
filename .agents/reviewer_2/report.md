# Quality Review & Adversarial Challenge Report — Reviewer 2

**Target Scope**: Data Layer, Guidebook Alignment & Offline Management Tooling  
**Evaluator**: Reviewer 2 (Data, Guidebook & Tooling Reviewer & Adversarial Critic)  
**Date**: 2026-08-23T07:40:00+07:00  
**Gate Verdict**: **REQUEST_CHANGES** ⚠️

---

## 1. Executive Summary

A comprehensive, evidence-based quality and adversarial review was conducted on the data layer (`data/teamData.ts`, `data/krtmiData.ts`), competition & guidebook presentation components (`components/KrtmiChronicles.tsx`, `app/krtmi/page.tsx`), offline local manager tooling (`scripts/manager_tool.py`, `scripts/test_manager_tool.py`), and end-to-end static export verification (`npm run build`, `scripts/test_e2e_suite.py`).

### Verification Scorecard
| Dimension / Component | Status | Evidence / Verification Method |
|:---|:---:|:---|
| **Authentic Team Roster Data** (`data/teamData.ts`) | 🟢 **PASS** | 14 verified student members + 1 Dosen Pembimbing (Prof. Dr. Ir. Moh. Khairudin) across 4 divisions with authentic NIMs from Surat Tugas KRI 2024. |
| **Guidebook Alignment (2019–2026)** (`data/krtmiData.ts`, `public/guidebooks/`) | 🟢 **PASS** | All 7 competition editions cataloged with authentic arena dimensions, robot constraints, scoring formulas, and verified PDF assets (0.24 MB to 42.81 MB). |
| **Offline Local Manager Tool** (`scripts/manager_tool.py`) | 🟢 **PASS** | Standalone CLI/TUI utility with zero public web footprint, pure Python standard library, automated timestamped backups, AST/token-level JS/TS parsing, and atomic rollback. |
| **Manager Tool Test Suite** (`scripts/test_manager_tool.py`) | 🟢 **PASS** | 26/26 unit/integration tests passing (2.54s). |
| **E2E Test Suite** (`scripts/test_e2e_suite.py`) | 🟢 **PASS** | 55/55 multi-tier tests passing across Tiers 1–5 (1.72s). |
| **Static Build Export** (`npm run build`) | 🔴 **FAIL** | Failed with TypeScript error (`./components/TeamRosterSection.tsx:79:7: Type error: 'member.nim' is possibly 'undefined'`). |

---

## 2. Findings & Actionable Issues

### [Critical] Finding 1: TypeScript Build Failure Due to Optional `nim` in Roster Search Filter

- **What**: Production static compilation (`npm run build` / `next build`) fails with Exit Code 1.
- **Where**:
  - `components/TeamRosterSection.tsx`, Line 79
  - `data/teamData.ts`, Line 9
  - `scripts/manager_tool.py`, Line 473
- **Why**:
  In `data/teamData.ts`, the `TeamMember` interface declares `nim?: string;` as an optional property (generated identically by `scripts/manager_tool.py` at line 473). However, in `components/TeamRosterSection.tsx` line 79:
  ```typescript
  member.nim.toLowerCase().includes(searchQuery.toLowerCase())
  ```
  `member.nim` is invoked directly without optional chaining. Under Next.js / TypeScript strict null checks (`"strict": true` in `tsconfig.json`), TypeScript raises:
  ```
  ./components/TeamRosterSection.tsx:79:7
  Type error: 'member.nim' is possibly 'undefined'.
  ```
- **Blast Radius**: Blocks static production build (`npm run build`) and subsequent GitHub Pages deployment.
- **Suggested Fix**:
  1. In `components/TeamRosterSection.tsx:79`, apply safe optional chaining:
     ```typescript
     (member.nim?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false) ||
     ```
  2. In `data/teamData.ts` and `scripts/manager_tool.py:473`, ensure `nim: string;` strictly reflects the `PROJECT.md` interface contract, as every roster member in the dataset has a defined string identifier (e.g. NIM for active students, `'Senior Member'` for alumni, `'NIDN: 0012047901'` for Dosen Pembimbing).

---

## 3. Verified Claims

### 3.1 Team Roster Authenticity (`data/teamData.ts`)
- **Verified Roster Structure**:
  - **Dosen Pembimbing**: Prof. Ir. Moh. Khairudin, M.T., Ph.D. (NIDN: `0012047901`, Guru Besar Robotika FT UNY)
  - **Manajerial & Media (4 members)**:
    - Ilham Widyo Nugroho (`21507334002`, D4 Teknik Elektronika FV UNY) — Team Leader
    - Salsabila Azzahra Putri Sophia Dewi Utami (`20518241012`, S1 Pendidikan Teknik Mekatronika FT UNY) — Team Manager
    - Mustika Wahyu Aprilia (`21306141050`, S1 Fisika FMIPA UNY) — Finance & Secretary
    - Rose Pita Nur Afifah (`22518241042`, S1 Pendidikan Teknik Mekatronika FT UNY) — Media & Documentation
  - **Programming & AI (1 member)**:
    - Tri Wahyu Handoyo (`22518241023`, S1 Pendidikan Teknik Mekatronika FT UNY) — Lead Programmer
  - **Mekanik (4 members)**:
    - Muhamad Ilham Sony (`20539144016`, S1 Teknik Manufaktur FT UNY) — Mechanical Lead
    - Farhan Yuda Mahendra (`22518244007`, S1 Pendidikan Teknik Mekatronika FT UNY) — Gripper & Kinematics
    - Caesar Sokma Langgeng (`21539144005`, S1 Teknik Manufaktur FT UNY) — CAD & Laser Fabrication
    - Edo Raja Saputra Siahaan (`22508334033`, D4 Teknik Mesin FV UNY) — Actuation & Dynamics
  - **Elektrik (5 members)**:
    - Agus Bagaskoro (`21501244039`, S1 Pendidikan Teknik Elektro FT UNY) — Electrical Lead
    - Abdul Hasib Adzdzin Nuha (`22502241014`, S1 Pendidikan Teknik Elektronika FT UNY) — PCB Design
    - Ikhsan Nurrohman (`22538141004`, S1 Teknik Elektro FT UNY) — Telemetry Specialist
    - Rionaldi Nugroho (`23090620088`, D4 Teknik Elektronika FV UNY) — Embedded Hardware
    - Yusron Nur Latief (`Senior Member`, Teknik Elektro FT UNY) — Senior Advisor
- **Array Integrity**: `ALL_ROSTER_MEMBERS` contains exactly 15 members (1 Pembimbing + 14 team members), matching `DIVISION_CATEGORIES` counters.
- **Integrity Check**: Zero dummy/placeholder names ("John Doe", "Jane Doe") detected.

### 3.2 Guidebook Alignment & Rulebook Specifications (2019–2026)
- **7 Editions Cataloged in `data/krtmiData.ts`**:
  1. **2026 (Technocorner Transporter FT UGM)**: 300x300 cm arena, 20° slope, teeter-totter, speed bumps 15 mm, 20x20 cm starting footprint, <= 13.0V DC battery cap, colored box payload transfer (10x10x10 cm).
  2. **2024 (KRTMI Waste Sorting UMS / BPTI)**: 600x400 cm arena, dual robot system (100% autonomous Sorter with YOLO vision + Feeder), 24.0V DC limit, 5 waste categories (Daun, Kertas, Plastik, Logam, Botol 300ml), "BERSIH" victory condition. Juara 1 Regional I & Juara 2 Nasional.
  3. **2023 (KRTMI Digital Twin USM / BPTI)**: 600x400 cm green screen arena, planetary gear coin assembly, <= 40 cm/s speed limit, "DONE" / "DAM" victory condition. Juara 3 Wilayah & Finalis Nasional.
  4. **2022 (KRTMI Medical Waste ITS / Puspresnas)**: 500x400 cm arena, hazardous B3 & infectious waste sorting, barcode scanner, incinerator docking.
  5. **2021 (KRTMI COVID-19 Aid UGM / Daring)**: 500x350 cm arena, contactless medicine box delivery to isolation rooms 1–6.
  6. **2020 (KRTMI UV-C Sterilization ITB / Daring)**: 3000x2000 mm elevated stage (500 mm), UV-C germicidal radiation >= 5s, aerosol disinfection, PIR safety fail-safe.
  7. **2019 (KRTMI Paddy Harvest UDINUS / Belmawa)**: 500x300 cm terraced paddy field, rotary crop cutter, grain hopper conveyor.
- **Physical PDF Files in `public/guidebooks/`**:
  - `Panduan_Technocorner_2026.pdf` (42,811,529 bytes) — Present & Valid
  - `Panduan_KRTMI_2024.pdf` (582,931 bytes) — Present & Valid
  - `Panduan_KRI_2023.pdf` (6,359,295 bytes) — Present & Valid
  - `Panduan_KRI_2022.pdf` (4,621,772 bytes) — Present & Valid
  - `Panduan_KRI_2021.pdf` (19,303,154 bytes) — Present & Valid
  - `Panduan_KRI_2020.pdf` (5,325,678 bytes) — Present & Valid
  - `Panduan_KRTMI_2019.pdf` (248,190 bytes) — Present & Valid

### 3.3 Offline Local Management Tooling (`scripts/manager_tool.py`)
- **Zero Public Admin Exposure**: Tool resides in `scripts/manager_tool.py` outside Next.js App Router; no public admin routes (`/admin`, `/api/admin`) or exposed credentials exist in the web bundle.
- **Zero Third-Party Dependencies**: Pure Python 3 standard library (`os`, `sys`, `json`, `re`, `shutil`, `datetime`, `argparse`, `pathlib`, `tempfile`, `unittest`).
- **Automated Backup & Atomic Rollback**: `BackupManager` creates timestamped snapshot directories in `scripts/backups/backup_YYYYMMDD_HHMMSS_microseconds/` containing copies of data files and `manifest.json` prior to any write. If validation fails, changes are rejected and data remains untainted.
- **Recursive-Descent JS/TS Tokenizer & Parser**: Capable of reading complex TypeScript files, object literals, arrays, strings with escape sequences, trailing commas, and block comments (`/* ... */`).
- **CLI & TUI Operations**: Supports `--list-team`, `--search-team`, `--add-team`, `--delete-team`, `--list-krtmi`, `--view-krtmi`, `--add-krtmi`, `--delete-krtmi`, `--list-gallery`, `--add-gallery`, `--delete-gallery`, `--backup`, `--list-backups`, `--restore`, `--validate`, `--json`.

---

## 4. Adversarial Stress-Testing & Integrity Checks

### 4.1 Integrity Violation Checks
| Check Category | Evaluation | Result |
|---|---|:---:|
| Hardcoded test results / facade implementations | Evaluated `manager_tool.py`, `teamData.ts`, `krtmiData.ts`. Actual recursive descent parser and real data structures implemented. | 🟢 No Violation |
| Dummy or placeholder media/data | Checked for placeholder strings (`John Doe`, `TODO`, `PLACEHOLDER`, `3yr5uNkxA_8`, `dQw4w9WgXcQ`). Zero placeholders found. | 🟢 Authentic |
| Shortcuts bypassing requirements | Guidebook specs match genuine BPTI / UGM technical numbers (voltages, dimensions, scoring formulas). | 🟢 Genuine |
| Fabrication of test logs | Subprocess tests independently executed and verified directly in terminal. | 🟢 Genuine |

### 4.2 Edge Case & Stress Testing
- **Malformed Input Rejection**: Tested passing empty names and invalid divisions to `manager_tool.py`. Tool correctly threw validation errors without modifying data files or corrupting syntax.
- **Backup Snapshot Restoration**: Tested adding temporary data, creating a snapshot, mutating data, and restoring the snapshot. State was restored cleanly.
- **Parser Robustness**: Tested parsing nested objects with escaped single quotes (`\'`), multi-line comments, and trailing commas. Parser parsed tokens with 100% precision.

---

## 5. Verification Commands & Outputs

### 1. `python scripts/test_manager_tool.py`
```
Ran 26 tests in 2.541s
OK (Exit Code: 0)
```

### 2. `python scripts/manager_tool.py --validate`
```json
{
  "valid": true,
  "details": {
    "teamData": {
      "count": 15,
      "errors": [],
      "status": "PASS"
    },
    "krtmiData": {
      "count": 7,
      "errors": [],
      "status": "PASS"
    },
    "galleryData": {
      "count": 4,
      "errors": [],
      "status": "PASS"
    }
  }
}
(Exit Code: 0)
```

### 3. `python scripts/test_e2e_suite.py`
```
Ran 55 tests in 1.725s
OK (Exit Code: 0)
All 5 Tiers Passed (55/55)
```

### 4. `npm.cmd run build`
```
> abhinaya-uny-web@1.0.0 build
> next build

  ▲ Next.js 14.2.35
   Creating an optimized production build ...
 ✓ Compiled successfully
   Linting and checking validity of types ...
Failed to compile.

./components/TeamRosterSection.tsx:79:7
Type error: 'member.nim' is possibly 'undefined'.
(Exit Code: 1)
```

---

## 6. Verdict & Required Action

**Verdict**: **REQUEST_CHANGES** ⚠️

**Required Fix**:
1. Fix the TypeScript compile error in `components/TeamRosterSection.tsx:79` by utilizing optional chaining `member.nim?.toLowerCase().includes(...)`.
2. Ensure consistency between `TeamMember` interface definitions in `data/teamData.ts`, `PROJECT.md`, and `scripts/manager_tool.py:473` (`nim: string;`).
3. Verify that `npm.cmd run build` completes with exit code 0 and produces a clean static export in `out/`.
