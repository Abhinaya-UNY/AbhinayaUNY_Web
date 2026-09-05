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

## 2026-09-05T14:40:41Z

Elevasi visual, tipografi, dan mikro-interaksi website resmi Abhinaya UNY Robotics (https://abhinaya-uny.github.io/AbhinayaUNY_Web/) menggunakan koleksi komponen animasi berkelas industri terinspirasi dari React Bits (https://reactbits.dev) agar website tampil otentik, hidup, futuristik, dan terbebas sepenuhnya dari kesan template AI generik.

Working directory: D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web
Integrity mode: development

## Reference Materials
- React Bits Documentation & Components: https://reactbits.dev (Text Animations, SpotlightCard, TrueFocus, CountUp, DecryptedText, ShinyText, GridScan)
- Official Website: https://abhinaya-uny.github.io/AbhinayaUNY_Web/
- Team Identity: Signature Electric Orange (`#FF6B00`), Warm Amber, Warm Carbon Black (`#070503`, `#120D08`, `#140E09`), dan tema robotika KRTMI.

## Requirements

### R1. Kinetic & High-Tech Text Animations (React Bits Text Suite)
Implementasikan rangkaian komponen animasi teks modular ala React Bits yang dapat digunakan secara luwes pada judul dan label penting:
- **DecryptedText / Hacker Scramble**: Efek pengacak karakter biner/ASCII yang bertransformasi menjadi teks asli saat hover atau in-view, diterapkan pada badge status kompetisi, kode divisi teknis, dan label telemetry.
- **ShinyText / Metallic Sweep**: Sapuan pantulan kilau cahaya oranye-keemasan yang bergerak melintasi teks penting seperti headline penghargaan (*"JUARA 1 WILAYAH I & JUARA 2 NASIONAL"*) dan nama robot.
- **SplitText / BlurText Reveal**: Animasi kemunculan teks bertahap (per-kata atau per-karakter dengan blur halus dan stagger timing) pada headline utama Hero Section (*"ABHINAYA UNY"* dan tagline KRTMI).

### R2. Reactive Interactive Cards & Cursor Lighting (SpotlightCard Engine)
Tingkatkan kartu roster anggota, kartu berita, dan kabinet prestasi dengan komponen kartu reaktif ala React Bits SpotlightCard:
- Menghadirkan pantulan ambient light gradient radial oranye (`rgba(255, 107, 0, 0.15)`) yang mengikuti pergerakan kursor mouse secara halus (*fluid pointer-tracking*).
- Mempertahankan border kontras tinggi dan efek depth (*tactile depth*), tanpa mengaburkan atau menutupi foto profil dan detail anggota.

### R3. Dynamic Numerical Telemetry (CountUp Statistics)
Sematkan komponen animasi perhitungan angka dinamis (*smooth counter / CountUp with easing*) pada bagian statistik:
- Jumlah piala dan penghargaan yang diraih.
- Tahun aktif generasi dan rekor pencapaian kompetisi (2019 – 2026).
- Indikator metriks performa robot (siklus pemilahan, kecepatan mecanum, dsb.) saat kartu masuk ke viewport pengguna (*viewport-triggered*).

### R4. Ambient Grid & Background Micro-Motions
Tambahkan aksen visual latar belakang bertema riset robotika tingkat lanjut:
- Ambient subtle grid scan / dot pattern yang responsif dan elegan di belakang hero atau section teknis tanpa membebani GPU atau menurunkan FPS perangkat mobile.
- Tetap menjaga kontras keterbacaan teks 100% prima (*accessibility & contrast ratio safe*).

### R5. Zero-Regression Build & Performance Verification
Seluruh animasi harus dibangun dengan arsitektur yang aman untuk Next.js Static Export (`next export` / output `out/`):
- Kompatibel penuh dengan Server-Side Rendering / Client Component hydration (`'use client'`).
- Memiliki fallback graceful untuk browser dengan preferensi `prefers-reduced-motion` atau perangkat mobile berdaya rendah.
- Tidak merusak fungsionalitas unduh panduan lomba, pemutar video YouTube, modal roster, maupun link navigasi yang sudah ada.

## Acceptance Criteria

### Verification & Performance Checks
- [ ] `npm run build` sukses 100% tanpa error TypeScript, lint, atau export statis (11/11 halaman statis terbentuk).
- [ ] Komponen animasi teks (DecryptedText, ShinyText, SplitText/BlurText) terpasang aktif pada Hero dan bagian penting website.
- [ ] SpotlightCard aktif bereaksi terhadap pergerakan mouse pada kartu roster / prestasi dengan pencahayaan oranye khas Abhinaya.
- [ ] CountUp animasi angka berjalan mulus saat section statistik di-scroll masuk ke viewport.
- [ ] Seluruh foto anggota, piala, dan robot tetap 100% terlihat jelas tanpa terhalang teks maupun efek visual yang berlebihan.
- [ ] Harness pengujian otomatis (`node scripts/test_empirical_html_output.js` & `node scripts/stress_test_edge_cases.js`) lulus 100% dengan exit code 0.
- [ ] Perubahan tersimpan, ter-commit, dan ter-push bersih ke repository GitHub `origin main`.

## 2026-09-05T17:57:00Z

Redesign the official Abhinaya UNY Robotics Portal from the ground up with an eye-friendly, high-end minimalist dark aesthetic (Deep Obsidian `#0B0B0E` / `#121216` paired with subtle Emerald Green `#10B981` glow accents), eliminating all visual noise and garish contrasts while integrating smooth, tasteful interactive motion design inspired by DavidHDev/react-bits.

Working directory: D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web
Integrity mode: development

## Reference Materials
- Animation & Motion Library Inspiration: https://github.com/DavidHDev/react-bits (Aurora ambient background, BlurText / DecryptedText, SpotlightCard, TiltedCard, Magnet buttons)
- Benchmark Aesthetic: https://www.virose.team/ (Clean industrial minimalism, calm dark palettes, refined typography, zero clutter)
- Data Ground Truth: `data/teamData.ts`, `data/krtmiData.ts`, `STRUKTUR_TIM_ABHINAYA.md` (100% authentic PDDikti records & official rulebooks must be fully preserved)

## Requirements

### R1. Minimalist Deep Obsidian & Emerald Glow Design System
- Unify the entire website around a calm, eye-friendly minimalist dark palette:
  - Base canvas: Deep Obsidian (`#0B0B0E`), Card surfaces: `#121216` / `#18181B` with delicate 1px border lines (`#27272A` / `rgba(255,255,255,0.06)`).
  - Primary accent: Refined Emerald Green (`#10B981` / `#059669`) with subtle ambient glow, replacing noisy multi-color gradients.
  - Generous whitespace, disciplined 8px spacing rhythm, and clear typographic hierarchy (Outfit & Plus Jakarta Sans).

### R2. Ambient & Fluid Background Canvas (react-bits Inspired)
- Implement smooth, eye-friendly animated background effects:
  - Hero & header zones: Subtle Aurora / Mesh ambient gradient glow that gently shifts in the background without causing eye strain or distraction.
  - Interactive grid / subtle particle dust: Gentle motion that reacts smoothly to cursor hover or scroll.
  - Automatically throttle frame rates to 30/60 FPS and pause off-screen rendering via `IntersectionObserver` or when `prefers-reduced-motion` is enabled to conserve GPU/CPU resources.

### R3. Kinetic Typography & Media Entrance Motion
- Section headings & hero titles: Implement smooth text reveal animations (BlurText / DecryptedText / SplitText) that trigger cleanly on viewport entry.
- Visual asset entrances: Staggered, smooth fade-and-slide reveals for imagery, robot specifications, and timeline blocks.
- Member Roster & Gallery Cards: Integrate SpotlightCard (cursor-following border glow) and subtle 3D hover feedback (TiltedCard / Magnet effect) without layout shift or jitter.

### R4. Component Overhaul Across All Sections
- **Hero Stage**: Clean, expansive layout featuring unblocked high-res team photography, floating status telemetry pills, and refined CTA buttons.
- **Leaders & Managers Showcase**: Minimalist horizontal timeline cards with smooth crossfades and authentic leadership badges.
- **Active Technical Squad (2025)**: Streamlined division filter tabs (Program, Elektronik, Mekanik) with high-density, readable member cards.
- **Rulebook & Tournament Archives (2019–2026)**: Clean interactive tabs with clear arena diagrams, technical specs, and scoring breakdowns.
- **Preloader & Navigation**: Elegant, minimalist top navbar with blur backdrop and smooth scroll-spy indicators.

### R5. Rigorous Build & Data Integrity
- Preserve 100% of the verified PDDikti student credentials (NIM, Prodi, Faculty, Angkatan) across all 33 team members.
- Next.js static export (`npm run build`) must compile cleanly with 0 TypeScript, ESLint, or runtime hydration warnings.

## Acceptance Criteria

### Verification & Performance Checks
- [ ] `npm run build` succeeds with zero errors, exporting all 11 static pages.
- [ ] Automated HTML testing harness (`node scripts/test_empirical_html_output.js`) passes 100% of assertions.
- [ ] Edge cases stress test (`node scripts/stress_test_edge_cases.js`) passes 100% of assertions.
- [ ] Visual aesthetic verified: Deep Obsidian `#0B0B0E` background, subtle `#10B981` Emerald glow accents, zero harsh/garish gradients, comfortable for long-duration viewing.
- [ ] Background Aurora/canvas runs fluidly at 60 FPS with zero memory leaks, pausing when out of view.
- [ ] Typography reveal (BlurText/DecryptedText) and Spotlight/Hover effects render smoothly across both mobile and desktop viewports.
- [ ] All 33 team members retain verified authentic PDDikti records with zero data regressions.
- [ ] All changes committed and pushed cleanly to remote repository.

## 2026-09-05T18:09:01Z

Important guidance regarding PDDikti Ground Truth:
Farhan Yuda Mahendra's authentic PDDikti NIM is 22518244007 (verified directly via PDDikti API). Do not revert it to 22518241040.
Zelfa Nafisah Zalna is S1 Fisika (FMIPA) with NIM 23030730048.
Hisyam Yasid Pratowo is D4 Teknik Elektronika (Fakultas Vokasi / FV) with NIM 24090620010.
scripts/test_challenger1_nim_faculty_oracle.py has been aligned with these verified authentic PDDikti records.
Please continue with M2 overhaul while preserving these verified records.
