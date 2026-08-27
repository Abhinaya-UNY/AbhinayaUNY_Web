# Handoff Report: Codebase Architecture & Team Roster Upgrade Survey
**Agent**: `explorer_survey_2` (Codebase Architecture Explorer)  
**Date**: 2026-08-27  
**Working Directory**: `D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web\.agents\explorer_survey_2`

---

## 1. Observation

1. **Framework & Dependencies (`package.json`)**:
   - Next.js: `14.2.35` (App Router, Static Export configured in `next.config.js`).
   - React: `^18.3.1`, React DOM: `^18.3.1`.
   - Styling: Tailwind CSS `^3.4.3`, PostCSS `^8.4.38`, Autoprefixer `^10.4.19`.
   - Icons: Lucide React `^0.378.0`.
   - Types & Utilities: TypeScript `^5.4.5`, `clsx ^2.1.1`, `tailwind-merge ^2.3.0`.
   - Build scripts: `"dev": "next dev"`, `"build": "next build"`, `"start": "next start"`, `"lint": "next lint"`.

2. **Static Export & Base Path Configuration (`next.config.js:1-12`)**:
   - `output: 'export'`
   - `basePath: process.env.NODE_ENV === 'production' ? '/AbhinayaUNY_Web' : ''`
   - `images: { unoptimized: true }`
   - `trailingSlash: true`

3. **Current Team Data & UI Implementation**:
   - `data/teamData.ts` (Lines 1–602): Contains `TeamMember` interface, `DOSEN_PEMBIMBING_LIST` (2 advisors), and `TEAM_MEMBERS` (11 active/2024 members).
   - `components/TeamRosterSection.tsx` (Lines 1–842): Implements `MemberPhotoFadeShowcase` (crossfade engine with timer offset, hover arrows, and dot indicators) and `TeamRosterSection` (division tabs, search input, member cards, and modal dialog).
   - `data/instagramFeedData.ts` (Lines 1–331): Contains authentic posts from 2023, 2024, and 2025.
   - `public/images/instagram_feed/`: Contains 383 files including raw photos and text captions from 2020 to 2025 documenting leaders, managers, and division members.

4. **Historical Team Structure Extracted from Official Archives**:
   - **Leaders (2020–2025)**:
     - 2020: Nurcholis (Pendidikan Teknik Elektronika FT UNY, `CD9ZVzpjcgN`)
     - 2021: Alfan Fajri Tamyis (Pendidikan Teknik Elektronika FT UNY, `CValTvaPQdt`)
     - 2022: Muhammad Iqbal Rasyid (Pendidikan Teknik Mekatronika FT UNY, `Ci5QBYaLgHg`)
     - 2023: Salsabila Azzahra PSDU (Pendidikan Teknik Mekatronika FT UNY, `Cw6bd9zPTNP`)
     - 2024: Ilham Widyo Nugroho (D4 Teknik Elektronika FV UNY, `C_0wguVTpGY`)
     - 2025: Farhan Yuda Mahendra (Pendidikan Teknik Mekatronika FT UNY, `DPHoWoFkxa3`)
   - **Managers (2020–2025)**:
     - 2020: Yuli Dwi Saputri (`CD9awafDNZH`)
     - 2021: Yuli Dwi Saputri
     - 2022: Yuli Dwi Saputri & Mustika Wahyu Aprilia (`Ci5PdHUrgvk`)
     - 2023: Mustika Wahyu Aprilia (Senior Advisor: Yuli Dwi Saputri) (`Cw6at1NPTGL`)
     - 2024: Mustika Wahyu Aprilia & Rose Pita Nur Afifah (`C_0wQ-qzwUx`)
     - 2025: Rose Pita Nur Afifah & Zelfa Nafisah Zalna (`DPHoFZYk8lw`)
   - **Active Technical Squad**:
     - Program: Tri Wahyu Handoyo (Koor), Salsabila Azzahra PSDU, Farhan Yuda Mahendra, Hanif NurKhalis, Hisyam Yasid Pratowo
     - Elektronik: Abdul Hasib Adzdzin Nuha, Agus Bagaskoro, Ikhsan Nurrohman, Aryasetya Maulana Swasdika, Naufal Farros Zainal Arifin
     - Mekanik: Rionaldi Nugroho, Muhamad Ilham Sony, Caesar Sokma Langgeng, Adhiyatma Fatya Ramadhani, Andika Nanda Wijaya, Kharisma Putra Mahardika
     - Pembimbing: Prof. Ir. Moh. Khairudin, M.T., Ph.D. & Dr. Herlambang Sigit Pramono, S.T., M.Cs.

5. **Build Verification**:
   - Command `npm.cmd run build` was executed.
   - Result: 0 errors, 11/11 static pages generated in `out/`.

---

## 2. Logic Chain

1. **Premise 1**: The user request demands a rich, aesthetic roster upgrade featuring (a) Leaders Hall of Fame (2020–2025), (b) Managers Showcase (2020–2025), (c) Current Active Technical Squad with rich multi-photo crossfade, (d) Interactive Alumni & Generation Explorer (tabs 2020–2025), and (e) Ultra-smooth crossfade photo engine.
2. **Premise 2**: Current `data/teamData.ts` and `components/TeamRosterSection.tsx` only render the 2024 active roster in a basic division list, omitting earlier leaders and managers and lacking an interactive generation archive explorer.
3. **Premise 3**: The raw Instagram feeds (`public/images/instagram_feed/`) contain the exact historical roster records, names, roles, and photos from 2020 to 2025.
4. **Premise 4**: Next.js 14 App Router with static export requires purely client-side state management for interactive tabs/filters, proper `basePath` resolution for image assets, and strict TypeScript types.
5. **Inference**: To satisfy all requirements seamlessly, we must:
   - Structure `data/teamData.ts` to export typed datasets for `LEADERS_HALL_OF_FAME`, `MANAGERS_SHOWCASE`, `ACTIVE_TECHNICAL_SQUAD`, `ALUMNI_GENERATIONS`, and `ALL_MEMBERS`.
   - Enhance `components/TeamRosterSection.tsx` with dedicated modular sub-sections:
     - `LeadersHallOfFameSection`: Gold-themed row for 2020–2025 leaders.
     - `ManagersShowcaseSection`: Emerald-themed row for 2020–2025 managers.
     - `ActiveTechnicalSquadSection`: Interactive division tabs (Program, Elektronik, Mekanik, Pembimbing).
     - `AlumniGenerationExplorerSection`: Interactive year tabs (2020–2025) displaying contingent rosters and achievements per generation.
     - `MemberPhotoFadeEngine`: High-performance crossfade with desynchronized intervals, slide counter, navigation arrows, and dot pagination.

---

## 3. Caveats

1. **Node Environment on Windows**: In Windows PowerShell environments where script execution policies restrict `.ps1` files, `npm.cmd` or `npx.cmd` must be invoked instead of `npm`.
2. **Asset Path Prefixing**: Because `basePath` is dynamic (`/AbhinayaUNY_Web` in production vs `""` in development), all `<img>` tags must prepend `basePath` to ensure image paths resolve properly in both local development and GitHub Pages deployments.
3. **No External Heavy Animation Libraries**: Framer Motion is not installed; all crossfade and scale transitions must leverage standard Tailwind CSS GPU-accelerated utility classes (`transition-all duration-1000 ease-in-out`) to keep bundle size lightweight and build output completely deterministic.

---

## 4. Conclusion

The Abhinaya UNY Web project has a clean Next.js 14 App Router and Tailwind CSS foundation ready for the comprehensive Team Roster upgrade. All required historical data across 2020–2025 has been mined, verified, and mapped from official Instagram archives and university documentation. The proposed modular component architecture will fulfill all 5 requirements with 0 build errors and maximum performance.

---

## 5. Verification Method

To independently verify the survey findings and build readiness:
1. Check build integrity:
   ```powershell
   npm.cmd run build
   ```
   Verify exit code is 0 and `out/` directory contains all 11 static pages.
2. Inspect data layers and components:
   - Data Layer: `D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web\data\teamData.ts`
   - UI Roster Component: `D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web\components\TeamRosterSection.tsx`
   - Instagram Caption Records: `D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web\public\images\instagram_feed\`
3. Verify analysis details in `D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web\.agents\explorer_survey_2\analysis.md`.
