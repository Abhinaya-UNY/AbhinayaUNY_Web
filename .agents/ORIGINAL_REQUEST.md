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

## 2026-09-05T07:14:50Z

Revamp and elevate the official Abhinaya UNY Robotics Portal (https://abhinaya-uny.github.io/AbhinayaUNY_Web/) by resolving all critical design flaws and team feedback: eliminate all text overlays obscuring team photos, correct competition timelines (UNLIMITED UNDIP is 2026), replace robotic/generic AI-generated copywriting with authentic robotics team narratives, and modernize the UI components with bespoke, high-caliber interactions (inspired by reactbits.dev standards) to eradicate the "generic AI template" look.

Working directory: D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web
Integrity mode: development

## Requirements

### R1. Photo Unblocking & Layout Refinement (Zero Text Covering Faces/Photos)
- Overhaul photo showcase sections (especially `AboutTeamSection.tsx`, `HeroSection.tsx`, `InstagramFeedShowcase.tsx`, and `DocumentationGallerySection.tsx`) so that text overlays, dark heavy gradients, and badge containers no longer block or obscure team members' faces, trophies, or robots.
- Move captions, descriptions, and metadata cleanly below the images or into dedicated non-intrusive container cards with clean spacing across all mobile and desktop viewports.
- Ensure all photos maintain natural aspect ratios with clear, unobstructed framing.

### R2. Factual Timeline & UNDIP Competition Year Correction (2026)
- Correct all occurrences and data records of the UNLIMITED UNDIP Robotics Competition (Universitas Diponegoro) to **2026** (in `data/newsData.ts`, `components/Achievements.tsx`, `ARSIP_BERITA_DAN_MEDIA_ABHINAYA.md`, and any related components).
- Ensure consistency across the historical chronicles, achievement badges, and news archives.

### R3. Natural & Authentic Robotics Copywriting (Anti-AI Slop)
- Rewrite and refine website copy, subtitles, and descriptions across the entire site to remove repetitive, pretentious, or disconnected AI-generated phrasing ("tulisan gak nyambung / keliatan AI").
- Adopt an authentic, sharp, engaging Indonesian engineering tone reflecting the true identity of Tim Robotika Abhinaya - UKM Rekayasa Teknologi UNY (KRTMI Division).

### R4. Bespoke Modern UI & React Bits-Inspired Component Design
- Eliminate the "template grok / AI generic" aesthetic by introducing bespoke, polished UI components and animations inspired by modern component libraries (e.g. `reactbits.dev` style):
  - Fluid micro-interactions and smooth hover states.
  - Elegant glassmorphism and refined borders replacing heavy, clunky drop-shadows.
  - Cohesive dark-theme palette with Abhinaya's signature Emerald/Neon accents and refined typography hierarchy.
  - Interactive, fluid tab transitions and gallery viewports.

### R5. Build Integrity & GitHub Deployment
- Verify that `npm run build` succeeds cleanly with zero TypeScript, lint, or static export errors.
- Ensure all relative paths respect the production base path (`/AbhinayaUNY_Web`).
- Commit all changes and prepare them for seamless push to `https://github.com/Abhinaya-UNY/AbhinayaUNY_Web`.

## Acceptance Criteria

### Visual & Functional Checks
- [ ] No text captions, badges, or heavy gradient overlays obscure people's faces or robots in team photo banners (`AboutTeamSection`, `HeroSection`, `DocumentationGallerySection`).
- [ ] UNLIMITED UNDIP is accurately documented and displayed as year **2026** across all data files and UI components.
- [ ] Website text reads naturally and cohesively without stiff, disconnective AI-generated copy.
- [ ] Visual UI components present a bespoke, high-craft aesthetic (inspired by reactbits.dev) rather than a generic AI template look.
- [ ] `npm run build` exits with code 0 without any errors.
- [ ] Changes are cleanly committed to the local git repository.
