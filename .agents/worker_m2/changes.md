# Changes Log — Milestone 2: Data Layer Architecture & Historical Datasets

**Author:** worker_m2 (Implementer / QA / Specialist)  
**Date:** 2026-08-27  
**Status:** COMPLETED & FULLY VERIFIED  

---

## Summary of Changes

Upgraded `data/teamData.ts` into a comprehensive, strongly-typed data layer containing full historical archives from 2020 through 2025. All member photos have been standardized and bound to semantic assets under `/images/members/`, cross-verified with `data/photoManifest.json`.

---

## Detailed File Modifications

### 1. `data/teamData.ts`
- **TypeScript Interfaces**:
  - Enhanced `TeamMember` interface with complete metadata fields: `id`, `name`, `nickname`, `nim`, `studyProgram`, `prodi`, `faculty`, `division`, `divisionSlug`, `role`, `subRole`, `generation`, `generationYear`, `yearsActive`, `specialization`, `skills`, `bio`, `quote`, `image`, `images`, `photos`, `badge`, `leadershipEra`, `achievements`, `isLeader`, `isManager`, `isActive`, `socials`.
  - Added `LeaderHistoryItem` interface extending `TeamMember` with `year`, `badge`, and `leadershipEra`.
  - Added `ManagerHistoryItem` interface extending `TeamMember` with `year`, `badge`, and `leadershipEra`.
  - Added `GenerationArchive` interface modeling `year`, `contingentName`, `theme`, `tournament`, `rules`, `leader`, `managers`, `divisions` (program, elektronik, mekanik, desain, pembimbing, advisors), `members`, `achievements`, `highlights`, and `groupPhoto`.

- **Datasets Implemented**:
  1. `DOSEN_PEMBIMBING_LIST`:
     - Prof. Ir. Moh. Khairudin, M.T., Ph.D., IPU. (Chief Advisor & Guru Besar Robotika UNY)
     - Dr. Herlambang Sigit Pramono, S.T., M.Cs. (Dosen Pembimbing & Embedded Systems Advisor)
  2. `LEADERS_HALL_OF_FAME`:
     - 2020: Nurcholis (S1 Pendidikan Teknik Elektronika FT UNY)
     - 2021: Afif Aiman Saputra (S1 Pendidikan Teknik Mesin FT UNY)
     - 2022: Muhammad Iqbal Rasyid (S1 Pendidikan Teknik Mekatronika FT UNY)
     - 2023: Salsabila Azzahra Putri Sophia Dewi Utami (S1 Pendidikan Teknik Mekatronika FT UNY)
     - 2024: Ilham Widyo Nugroho (D4 Teknik Elektronika FV UNY)
     - 2025: Farhan Yuda Mahendra (S1 Pendidikan Teknik Mekatronika FT UNY)
  3. `MANAGERS_SHOWCASE`:
     - 2020: Yuli Dwi Saputri (S1 Pendidikan Teknik Elektro FT UNY)
     - 2021: Yuli Dwi Saputri (S1 Pendidikan Teknik Elektro FT UNY)
     - 2022: Yuli Dwi Saputri & Mustika Wahyu Aprilia (S1 Pend. Teknik Elektro & S1 Fisika)
     - 2023: Mustika Wahyu Aprilia (S1 Fisika FMIPA UNY)
     - 2024: Mustika Wahyu Aprilia & Rose Pita Nur Afifah (S1 Fisika & S1 Pend. Teknik Mekatronika)
     - 2025: Rose Pita Nur Afifah & Zelfa Nafisah Zalna (S1 Pend. Teknik Mekatronika & S1 Pend. Teknik Elektro)
  4. `ACTIVE_TECHNICAL_SQUAD`:
     - **Program**: Tri Wahyu Handoyo (Koor / Autonomous Navigation & AI Lead), Farhan Yuda Mahendra (Team Leader 2025 & Embedded Kinematics Lead), Hanif NurKhalis, Hisyam Yasid Pratowo.
     - **Elektronik**: Ikhsan Nurrohman (Koor / Hardware & Power Lead), Abdul Hasib Adzdzin Nuha, Agus Bagaskoro, Aryasetya Maulana Swasdika, Naufal Farros Zainal Arifin.
     - **Mekanik**: Rionaldi Nugroho (Koor / Chassis & Actuator Lead), Caesar Sokma Langgeng, Adhiyatma Fatya Ramadhani, Andika Nanda Wijaya, Kharisma Putra Mahardika, Muhamad Ilham Sony.
     - **Advisors**: Prof. Ir. Moh. Khairudin, M.T., Ph.D., IPU. & Dr. Herlambang Sigit Pramono, S.T., M.Cs.
  5. `ALUMNI_GENERATIONS`:
     - 2020: Inaugural UV-C Disinfection Era
     - 2021: Golden Region Champion Era (Juara 1 Wilayah I & Strategi Terbaik)
     - 2022: Medical Waste Sorting Era (Finalis Nasional ITS Surabaya)
     - 2023: National Podium Era (Juara 3 Wilayah I & Finalis Nasional USM)
     - 2024: Autonomous Waste Sorter AI Vision Era (Finalis Nasional UMS Surakarta)
     - 2025: Active Next-Gen AI Vision Autonomous Squad Era
  6. **Backward Compatibility Exports**:
     - `TEAM_MEMBERS`, `ALL_ROSTER_MEMBERS`, `DIVISION_CATEGORIES`, `DIVISION_ORDER`, `DIVISION_INFO`, `DIVISION_BADGES`.
  7. **Helper Query Functions**:
     - `getMembersByGeneration(year)`
     - `getLeaderByYear(year)`
     - `getManagersByYear(year)`
     - `getActiveSquadByDivision(division)`
     - `getGenerationArchive(year)`
     - `getAllGenerations()`

---

## Verification Results

1. **TypeScript Typecheck (`npx.cmd tsc --noEmit`)**:
   - Exit code: `0` (Zero type errors).
2. **E2E Test Suite (`node scripts/run_e2e_tests.js`)**:
   - 10/10 test suites passed.
   - 57/57 tests passed (3,477 assertions, 100% success).
   - Real disk asset existence verification passed (T3-05).
3. **Next.js Production Build (`npm run build`)**:
   - Static export generated (11/11 static pages generated with 0 errors).
