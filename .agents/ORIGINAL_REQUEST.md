# Original User Request

## 2026-08-28T14:01:16Z

Perform an exhaustive, deep computer vision and text analysis of all Instagram feed photos and member imagery of Tim Robotika Abhinaya UNY (@abhinaya.uny) from 2020 to present. Accurately map each photo to its verified member name, authentic PDDikti NIM, verified study program (jurusan), faculty, and exact team role. Document the complete findings in an exhaustive markdown archive and ensure 100% data integrity across the web dataset.

Working directory: D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web
Integrity mode: development

## Reference Sources & Data Inputs
- Instagram Archives: public/images/instagram_feed/, public/images/members/, and https://www.instagram.com/abhinaya.uny/
- PDDikti UNY Database: Validated NIM, Student Names, and Study Programs across FT, FMIPA, and FV UNY
- Official UNY Faculty & News Portals: https://pendidikan-teknik-mekatronika.ft.uny.ac.id/id/dosen-meka & UNY Humas press releases
- Local Codebase: data/teamData.ts, components/TeamRosterSection.tsx, and STRUKTUR_TIM_ABHINAYA.md

## Requirements

### R1. Deep Instagram Photo & Member Visual Audit (2020 – 2025)
- Conduct an in-depth scan of every photo in public/images/instagram_feed/ and public/images/members/ from 2020 to present.
- Identify the exact visual content of each photo: the person featured, the competition/event context (KRTMI 2020, 2021, 2022, 2023, 2024, 2025), and their respective role (Leader, Manager, Program, Elektronik, Mekanik, Desain, Pembimbing).
- Ensure all photos are cleanly named semantically according to {tahun}_{divisi}_{nama_anggota}_{urutan}.{ext} without any mismatched or misplaced images.

### R2. PDDikti-Aligned NIM, Study Program & Data Verification
- Cross-verify every single member's NIM, full legal name, study program (e.g. S1 Pendidikan Teknik Elektro, S1 Pendidikan Teknik Mekatronika, S1 Fisika, D4 Teknik Elektronika, S1 Teknik Manufaktur), and faculty.
- Eliminate all fabricated, placeholder, or incorrect NIMs across all eras (2020–2025). Every NIM must strictly correspond to the real PDDikti UNY record for that student.

### R3. Exhaustive Markdown Documentation (ARSIP_ANALISIS_FOTO_DAN_DATA_ANGGOTA.md)
- Create a comprehensive, well-structured markdown document compiling:
  1. Detailed photo catalogue by year (2020, 2021, 2022, 2023, 2024, 2025) with file path, featured person, role, and visual description.
  2. Complete verified member table per generation with Full Name, NIM, Study Program, Faculty, Sub-Role, and Photo Reference.
  3. Chronological Leaders & Managers audit table.
  4. Data verification audit log cross-referenced against PDDikti.

### R4. Web Roster & Data Synchronization
- Synchronize data/teamData.ts and STRUKTUR_TIM_ABHINAYA.md with the verified data so that:
  - Active 2025 squad displays accurate 2025 members with correct photos and verified details.
  - Leaders Hall of Fame (2020–2025) and Managers Showcase (2020–2025) feature authentic portraits and verified bios.
  - Alumni generations (2020–2024) retain accurate historical rosters when explored.

## Acceptance Criteria

### Verification & Performance Checks
- [ ] ARSIP_ANALISIS_FOTO_DAN_DATA_ANGGOTA.md is created with 100% complete, non-truncated analysis of all photos and members from 2020 to 2025.
- [ ] All student NIMs across data/teamData.ts and documentation match authentic UNY PDDikti records (e.g. Yuli Dwi Saputri 19501241019, Mustika Wahyu Aprilia 21306141050, Rose Pita Nur Afifah 22518241042, Zelfa Nafisah Zalna 23501241001, Tri Wahyu Handoyo 22518241023, Farhan Yuda Mahendra 22518241040, dll.).
- [ ] Every member's profile photo correctly displays that exact person without mismatched headshots or placeholder logos.
- [ ] 
pm run build succeeds with 0 errors, and all changes are committed and pushed to GitHub.
