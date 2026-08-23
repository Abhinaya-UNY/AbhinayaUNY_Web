# Comprehensive Codebase Architecture Survey & Gap Analysis Report
**Project:** Portal Resmi Tim Robotika Abhinaya UNY (Kontes Robot Tematik Indonesia)  
**Live URL:** [https://abhinaya-uny.github.io/AbhinayaUNY_Web/](https://abhinaya-uny.github.io/AbhinayaUNY_Web/)  
**Surveyor:** Web Codebase Explorer Agent  
**Date:** 2026-08-23  

---

## 1. Executive Summary

A comprehensive architectural and technical survey of the Abhinaya UNY Robotics Portal codebase (`D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web`) was conducted. The application is built with **Next.js 14.2.35 (App Router)** in **Static Export mode (`output: 'export'`)**, paired with **React 18.3.1**, **TypeScript 5.4.5**, and **Tailwind CSS 3.4.3**. It is automated for continuous deployment to **GitHub Pages** under the `/AbhinayaUNY_Web` base path.

The existing portal establishes a strong foundation with an interactive KRTMI historical chronicle (2019–2026), photo documentation gallery with modal zoom, and responsive navigation. However, critical gaps exist relative to the requirements specified in `ORIGINAL_REQUEST.md`:
1. **Hero Stage & Button Layout (R1):** On mobile viewports, the hero photo stage fixed viewport height (`h-[48vh]`) crops the team stage panorama on the edges where trophies and UNY flags reside. The CTA button block needs explicit proportional alignment below the stage container.
2. **Multimedia & YouTube Showcase (R2):** The current `YouTubeVideoShowcase.tsx` uses a placeholder video ID (`3yr5uNkxA_8`) rather than official Abhinaya UNY channel media (`https://www.youtube.com/watch?v=PmxwdrhpxKg`, `https://www.youtube.com/shorts/wLusNVfFFHA`, and channel `https://www.youtube.com/@AbhinayaUNY`).
3. **Team Roster & Division Cards (R3):** `AboutTeamSection.tsx` and `app/divisi/page.tsx` only provide generic division summaries without individual team member cards. Authentic member records extracted from official `Surat Tugas KRI 2024` and certificates need to be structured into a new `data/teamData.ts` data layer and rendered into high-tech division cards.
4. **Guidebook Alignment (R4):** 7 official PDF guidebooks (2019 to 2026) are present in `public/guidebooks/` and accurately summarized in `data/krtmiData.ts`. Seamless download routing via basePath needs preservation.
5. **Offline Local Manager Tool (R5):** No manager script currently exists in `scripts/`. A standalone local Python CLI tool (`scripts/manager_tool.py`) is required for offline updates to competitions, gallery items, and team rosters without exposing any public web admin endpoints.

---

## 2. Technical Stack & Build Configuration

| Layer / Concern | Technology & Version | Configuration File / Notes |
| :--- | :--- | :--- |
| **Framework** | Next.js `14.2.35` (App Router) | `next.config.js` (`output: 'export'`, `trailingSlash: true`) |
| **Runtime / UI** | React `18.3.1`, React DOM `18.3.1` | Functional Components, Hooks (`useState`, `useEffect`) |
| **Language** | TypeScript `5.4.5` | `tsconfig.json` with `@/*` aliases mapping to `./*` |
| **Styling** | Tailwind CSS `3.4.3`, PostCSS `8.4.38` | `tailwind.config.js`, `app/globals.css` |
| **Color Tokens** | Custom Brand Palette | `brand.orange` (`#FF6B00`), `brand.amber` (`#F97316`), `brand.gold` (`#F59E0B`), `brand.dark` (`#070B12`), `brand.card` (`#0D1322`) |
| **Icons** | Lucide React `0.378.0` | Feather-style SVG icons |
| **Static Deployment** | GitHub Pages (`gh-pages` pipeline) | `.github/workflows/deploy.yml` on push to `main` branch |
| **Base URL** | `/AbhinayaUNY_Web` (Production) | Dynamic ternary in `next.config.js`: `process.env.NODE_ENV === 'production' ? '/AbhinayaUNY_Web' : ''` |
| **Image Optimization** | Unoptimized static pass-through | `images: { unoptimized: true }` in `next.config.js` |

---

## 3. Directory Layout & File Inventory

```
AbhinayaUNY_Web/
├── .github/
│   └── workflows/
│       └── deploy.yml              # CI/CD: Automated build & GitHub Pages deployment
├── app/
│   ├── divisi/
│   │   └── page.tsx                # Subpage: Divisi Tim & Kultur Riset (FAQ Mahasiswa Baru)
│   ├── krtmi/
│   │   └── page.tsx                # Subpage: Bedah Regulasi & Arsip Lengkap KRTMI (2019-2026)
│   ├── prestasi/
│   │   └── page.tsx                # Subpage: Kabinet Prestasi & Tautan Rilis Pers UNY
│   ├── globals.css                 # Global CSS variables, scrollbar styling, animations
│   ├── layout.tsx                  # Root layout, OpenGraph SEO tags, Navbar, Preloader, Footer
│   ├── page.tsx                    # Landing Home Page assembling all visual sections
│   ├── apple-icon.png, favicon.ico # Favicon assets
├── components/
│   ├── AboutTeamSection.tsx        # Overview of team divisions & lab culture
│   ├── Achievements.tsx            # Kejuaraan awards cards grid
│   ├── DocumentationGallerySection.tsx # Filterable photo gallery with modal zoom
│   ├── Footer.tsx                  # Footer branding, social links, institutional affiliations
│   ├── HeroSection.tsx             # Hero photo stage, emblem, title, and CTA buttons
│   ├── KRIOverview.tsx             # Overview of 6 KRI competition divisions
│   ├── KrtmiChronicles.tsx         # Tabbed competition breakdown (2019-2026) + PDF downloads
│   ├── Navbar.tsx                  # Sticky header with white emblem badge & floating pills
│   ├── Preloader.tsx               # Animated loader splash screen with session caching
│   ├── SocialMediaHub.tsx          # Instagram & TikTok community cards
│   └── YouTubeVideoShowcase.tsx    # Video action embed section
├── data/
│   ├── galleryData.ts              # Gallery items & category definitions
│   ├── krtmiData.ts                # KRTMI 2019-2026 rules, arena specs, robot specs, scoring
│   └── [MISSING: teamData.ts]      # Required: Team member roster data model
├── public/
│   ├── assets/                     # Team stage photo, robot action shots, UNY logos
│   │   ├── hero_abhinaya.jpg       # Main team stage hero photo
│   │   ├── logo_abhinaya.png       # Official logo with flame & shield motif
│   │   ├── WEB_5721.jpg            # Authentic robot action shot in arena
│   │   ├── robot_action_1.jpg      # Lab testing and pit action
│   │   └── team_podium_1.jpg       # Podium award ceremony
│   ├── gallery/                    # 11 gallery images across categories
│   ├── guidebooks/                 # 7 Official PDF rulebooks (2019-2026)
│   │   ├── Panduan_Technocorner_2026.pdf (40.83 MB)
│   │   ├── Panduan_KRTMI_2024.pdf (0.56 MB)
│   │   ├── Panduan_KRI_2023.pdf (6.06 MB)
│   │   ├── Panduan_KRI_2022.pdf (4.41 MB)
│   │   ├── Panduan_KRI_2021.pdf (18.41 MB)
│   │   ├── Panduan_KRI_2020.pdf (5.08 MB)
│   │   └── Panduan_KRTMI_2019.pdf (0.24 MB)
│   └── og-image-v4.jpg             # Social share card (1200x630)
├── next.config.js                  # Next.js static export & basePath config
├── package.json                    # Dependencies & build scripts
├── tailwind.config.js              # Theme extension & brand colors
└── tsconfig.json                   # TypeScript compiler options
```

---

## 4. In-Depth Component Analysis & Defect Identification

### 4.1 Hero Section (`components/HeroSection.tsx`)
- **Current Layout Structure:**
  - Container: `relative w-full flex flex-col items-center bg-[#070503]` (Line 24).
  - Photo Stage: `section className="relative w-full h-[48vh] sm:h-[62vh] md:h-[75vh] lg:h-[82vh] flex flex-col items-center justify-start overflow-hidden px-4 pt-4 sm:pt-8"` (Line 27).
  - Background styling: `absolute inset-0 bg-cover bg-[center_top] sm:bg-center bg-no-repeat sm:bg-fixed` with image `/assets/hero_abhinaya.jpg` (Line 31).
  - Button Container: `div className="relative z-20 w-full pt-4 pb-8 sm:py-7 px-4 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5 bg-[#070503]"` (Line 70).
- **Identified Issues & Findings:**
  1. On mobile screens (e.g. 360px–420px), `bg-cover` with `h-[48vh]` causes horizontal cropping on wide team stage photos, cutting off team members and the UNY flags on the far left and right edges.
  2. The button container is positioned below the stage (which resolves vertical overlap on the photo), but the height ratios on mobile/tablet need finer aspect-ratio balancing so that the hero photo maintains panoramic clarity without excessive top/bottom letterboxing or side clipping.
  3. Anchor href for button 1 points to `#krtmi-story` while button label is `EXPLORE TEAM & GUIDEBOOKS`. Linking smoothly or providing direct access to the team showcase improves user exploration.

### 4.2 Official Multimedia & YouTube Showcase (`components/YouTubeVideoShowcase.tsx`)
- **Current Layout Structure:**
  - Header: YouTube badge + title ("Lihat Robot Abhinaya UNY Beraksi di Arena! 🎬").
  - Card: 16:9 iframe embed containing video ID `3yr5uNkxA_8`.
- **Identified Gaps:**
  1. Does not feature the official Abhinaya UNY videos specified in `ORIGINAL_REQUEST.md`:
     - Video 1 (Main Action): `https://www.youtube.com/watch?v=PmxwdrhpxKg` (ID: `PmxwdrhpxKg`)
     - Video 2 (Official Shorts): `https://www.youtube.com/shorts/wLusNVfFFHA` (ID: `wLusNVfFFHA`)
     - Official Channel: `https://www.youtube.com/@AbhinayaUNY`
  2. Lacks a multi-video tab switcher or dual layout (e.g. Main 16:9 Action Video alongside vertical 9:16 Shorts player with responsive modal playback).

### 4.3 Team Roster & Division Showcase (`components/AboutTeamSection.tsx` & `app/divisi/page.tsx`)
- **Current Layout Structure:**
  - `AboutTeamSection.tsx` displays 2-column team introduction and 4 division cards summarizing generic responsibilities and skill tags (`TEAM_DIVISIONS` in `data/krtmiData.ts`).
  - `app/divisi/page.tsx` repeats division skills and provides a Freshmen FAQ.
- **Identified Gaps:**
  1. There are **no individual team member profiles or roster cards** anywhere in the portal.
  2. Missing `data/teamData.ts` representing verified team members from official documentation.
  3. No interactive filterable roster tabs (e.g., Filter by Divisi: "Semua", "Mekanik", "Elektrik", "Programming / AI", "Manajerial & Media", "Dosen Pembimbing").

### 4.4 Guidebook Alignment & Rulebook Verification (`data/krtmiData.ts` & `components/KrtmiChronicles.tsx`)
- **Current Implementation:**
  - 7 historical editions (2019 to 2026) are fully cataloged in `KRTMI_STORIES`.
  - Specs for Arena Dimensions, Robot Constraints, and Scoring Systems match the official BPTI Kemendikbud & Technocorner UGM rulebooks.
  - Download buttons link directly to `/guidebooks/Panduan_*.pdf`.
- **Identified Gaps:**
  - Ensure all PDF asset filenames and sizes match the exact files in `public/guidebooks/`.

### 4.5 Offline Manager Tool (`scripts/manager_tool.py`)
- **Current State:**
  - The `scripts/` directory is missing (only `build_script.py` in root).
- **Identified Gaps:**
  - Need a comprehensive, stand-alone Python script (`scripts/manager_tool.py`) with an interactive CLI/TUI menu allowing team managers to:
    1. Add / Edit KRTMI Competition Editions (`data/krtmiData.ts`)
    2. Add / Edit Team Members & Roles (`data/teamData.ts`)
    3. Add / Edit Gallery Documentation Items (`data/galleryData.ts`)
    4. Validate TypeScript syntax integrity and create automatic backups (`.bak`).
    5. Run completely offline on local machines with zero public web endpoint exposure.

---

## 5. Authentic Team Roster Data Extracted from Official Records

From primary source records (`Surat Tugas KRI Wilayah 2024.pdf`, `Sertifikat Juara KRI 2024 & 2023`, `Proposal Program 2024.docx`, and studio archives), the authentic team hierarchy and roster is cataloged as follows:

### Dosen Pembimbing / Advisor
- **Prof. Dr. Moh. Khairudin, M.T., Ph.D.** — *Dosen Pembimbing Tim Robotika UNY* (NIP: 197904122002121002, FT UNY)

### Divisi Manajerial & Kepemimpinan
- **Salsabila Azzahra Putri Shopia Dewi Utami** (NIM: 20518241012, S1-Pendidikan Teknik Mekatronika) — *Ketua Tim Abhinaya 2024*
- **Mustika Wahyu Aprilia** (NIM: 21306141050, S1-Fisika) — *Manajerial & Hubungan Eksternal*
- **Rose Pita Nur Afifah** (NIM: 22518241042, S1-Pendidikan Teknik Mekatronika) — *Administrasi & Keuangan Tim*

### Divisi Pemrograman & AI (Computer Vision & Kinematics)
- **Tri Wahyu Handoyo** (NIM: 22518241023, S1-Pendidikan Teknik Mekatronika) — *Lead Programmer & Computer Vision / Kinematics Specialist*
- **Farhan Yuda Mahendra** (NIM: 22518244007, S1-Pendidikan Teknik Mekatronika) — *Embedded Firmware & Sensor Fusion Programmer*

### Divisi Mekanik & Manufaktur
- **Muhamad Ilham Sony** (NIM: 20539144016, S1-Teknik Manufaktur) — *Lead Mechanical Engineer & Machining*
- **Caesar Sokma Langgeng** (NIM: 21539144005, S1-Teknik Manufaktur) — *CAD Design & 3D Prototyping*
- **Edo Raja Saputra Siahaan** (NIM: 22508334033, D4-Teknik Mesin) — *CNC Fabrication & Chassis Assembly*

### Divisi Elektrik & Manajemen Daya
- **Agus Bagaskoro** (NIM: 21501244039, S1-Pendidikan Teknik Elektro) — *Lead Hardware & Power Management*
- **Ilham Widyo Nugroho** (NIM: 21507334002, D4-Teknik Elektronika) — *PCB Design & Circuit Routing*
- **Abdul Hasib Adzdzin Nuha** (NIM: 22502241014, S1-Pendidikan Teknik Elektronika) — *Sensor Wiring & Signal Conditioning*
- **Ikhsan Nurrohman** (NIM: 22538141004, S1-Teknik Elektro) — *Motor Driver & Power Distribution*
- **Rionaldi Nugroho** (NIM: 23090620088, D4-Teknik Elektronika) — *Hardware Testing & Telemetry Wiring*

---

## 6. Gap Matrix & Actionable Roadmap

| Requirement | Current Status | Defect / Missing Feature | Recommended Action |
| :--- | :--- | :--- | :--- |
| **R1. Hero Layout & Buttons** | Buttons separated below stage; stage uses fixed `vh` | Mobile view crops team stage photo sides (trophy/flags) | Refine Hero responsive height and aspect ratio styling (`min-h-[46vh]` to `min-h-[78vh]` with optimized background position); maintain clear button placement below stage with high-contrast glowing CTAs. |
| **R2. Official YouTube Integration** | Embedded placeholder video `3yr5uNkxA_8` | Missing official videos (`PmxwdrhpxKg`, `wLusNVfFFHA`) & channel integration | Upgrade `YouTubeVideoShowcase.tsx` to support tabbed video playback (Main Action 16:9 + Official Shorts 9:16 + Channel Hub), including an interactive video modal. |
| **R3. Team Member Roster** | Generic division descriptions only | No individual member cards, roles, or photo badges; no `teamData.ts` | Create `data/teamData.ts` with verified roster data and build a dedicated `TeamRosterSection.tsx` component with division filter tabs and high-tech cards. |
| **R4. Guidebook Alignment** | 7 editions documented | Verification of rulebook specifications and download links | Ensure all 7 guidebooks in `public/guidebooks/` are verified against local PDFs and render with working static export links. |
| **R5. Offline Manager Tool** | Script does not exist | No local CLI/GUI to manage data files offline | Implement `scripts/manager_tool.py` providing an interactive terminal UI for adding/updating competitions, team members, and gallery items with automatic TypeScript generation and backup protection. |

---

## 7. Build Verification Method

To verify the codebase build integrity:
```powershell
# From project root: D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web
npm.cmd run build
```
Expected output: Zero TypeScript compilation errors, zero ESLint errors, and full static HTML page generation into the `./out` directory.
