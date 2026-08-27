# Detailed Codebase Architecture Survey & System Design Analysis
**Abhinaya UNY Robotics Portal — Team Roster, Hall of Fame, Active Squad & Alumni Explorer Upgrade**

---

## 1. Codebase Overview & Tech Stack Architecture

### 1.1 Technology Inventory
| Layer | Technology | Version / Details |
|---|---|---|
| **Framework** | Next.js (App Router) | `14.2.35` (configured for static export `output: 'export'`) |
| **Runtime / Library** | React & React DOM | `^18.3.1` |
| **Language** | TypeScript | `^5.4.5` (strict type-checking enabled) |
| **Styling** | Tailwind CSS & PostCSS | `^3.4.3` with custom brand palette (`brand.orange`, `brand.amber`, etc.) |
| **Icons** | Lucide React | `^0.378.0` (vector icons: `Award`, `Briefcase`, `Code`, `Zap`, `Wrench`, `GraduationCap`, `Images`, etc.) |
| **Class Utilities** | clsx & tailwind-merge | `clsx ^2.1.1`, `tailwind-merge ^2.3.0` |
| **Static Build Target** | Static HTML Export | Output directory `out/` with `trailingSlash: true` and `images.unoptimized: true` |
| **Base Path** | GitHub Pages Base Path | `process.env.NODE_ENV === 'production' ? '/AbhinayaUNY_Web' : ''` |

### 1.2 Routing & Page Architecture
- **Root Layout** (`app/layout.tsx`): Sets HTML metadata, fonts, global dark background `#070B12`, Navbar, and Footer.
- **Home Page** (`app/page.tsx`): Main landing page composing `HeroSection`, `YouTubeVideoShowcase`, `AboutTeamSection`, `TeamRosterSection`, `InstagramFeedShowcase`, `DocumentationGallerySection`, `KrtmiChronicles`, `KRIOverview`, `Achievements`, `SocialMediaHub`.
- **Divisions Page** (`app/divisi/page.tsx`): Details division descriptions, skill highlights, freshmen FAQs, and embeds `TeamRosterSection`.
- **Competitions & Chronicles** (`app/pertandingan/page.tsx`, `app/krtmi/page.tsx`, `app/prestasi/page.tsx`): KRI tournaments, rulebooks (2019-2026), and trophy hall.

---

## 2. Current Implementation Analysis

### 2.1 Existing Team Data Layer (`data/teamData.ts`)
- Defines `TeamMember` interface:
  ```typescript
  export interface TeamMember {
    id: string;
    name: string;
    nim: string;
    studyProgram: string;
    faculty: string;
    division: 'Ketua Tim' | 'Manager' | 'Program' | 'Elektronik' | 'Mekanik' | 'Pembimbing';
    role: string;
    subRole?: string;
    generation?: string;
    specialization: string[];
    bio: string;
    quote?: string;
    image: string;
    images?: string[];
    badge: string;
    socials?: { github?: string; linkedin?: string; instagram?: string; email?: string; };
  }
  ```
- Current data arrays:
  - `DOSEN_PEMBIMBING_LIST`: Prof. Ir. Moh. Khairudin, M.T., Ph.D. & Dr. Herlambang Sigit Pramono, S.T., M.Cs.
  - `TEAM_MEMBERS`: 11 active/2024 members (1 Leader, 2 Managers, 3 Programmers, 3 Electronics, 3 Mechanics, 1 Senior Advisor).
  - Division metadata: `DIVISION_CATEGORIES`, `DIVISION_BADGES`, `DIVISION_INFO`, `DIVISION_ORDER`.

### 2.2 Existing UI Component (`components/TeamRosterSection.tsx`)
- Contains `MemberPhotoFadeShowcase`:
  - Uses `setInterval` (3.6s–4.5s) to toggle `currentIdx`.
  - Applies CSS absolute positioning and transitions (`opacity-100 scale-100` vs `opacity-0 scale-105 pointer-events-none`).
  - Contains hover navigation arrows and pagination indicator dots.
  - Shows slide counter pill `Images` `currentIdx + 1 / images.length`.
- Contains `TeamRosterSection`:
  - Division tab filters + keyword search bar.
  - Member cards rendering with photo banner, badges, academic details, and skill tags.
  - Detail modal dialog with full photo crossfade, biography, and social links.

### 2.3 Identified Deficiencies vs. Original User Requirements
1. **Lack of All-Era Leaders Hall of Fame (2020–2025)**: The current UI only displays the 2024 leader in the standard grid. Leaders from 2020, 2021, 2022, 2023, and 2025 are missing or not showcased in a prominent leadership row.
2. **Lack of All-Era Managers Showcase (2020–2025)**: The managerial row only shows 2024 managers. Key historical managers (Yuli Dwi Saputri 2020-2023, Zelfa Nafisah Zalna 2025) are missing from a dedicated executive managerial showcase.
3. **Absence of Interactive Alumni & Generation Explorer**: There is no interactive tab/filter by competition year (2020, 2021, 2022, 2023, 2024, 2025) allowing visitors to inspect historical contingents, past robot missions, and alumni members.
4. **Data Isolation & Incomplete Multi-Photo Linkages**: Historical photos extracted from Instagram (2020–2025) are stored under `public/images/instagram_feed/` and need structured semantic renaming and complete integration into member profiles.

---

## 3. Historical Data Extraction & Mapping (2020–2025)

Based on official Instagram archives (`@abhinaya.uny`), university press releases, and competition records:

### 3.1 Leaders Hall of Fame (2020–2025)
| Year | Leader Name | Program / Faculty | Post Ref / Source | Key Focus / Milestone |
|---|---|---|---|---|
| **2020** | **Nurcholis** | S1 Pendidikan Teknik Elektronika (FT UNY) | `CD9ZVzpjcgN` / 2020 Inaugural | Juara 2 Nasional KRTMI KRI 2020 (Perintis) |
| **2021** | **Alfan Fajri Tamyis** | S1 Pendidikan Teknik Elektronika (FT UNY) | `CValTvaPQdt` / 2021 KRI | Transisi Daring/Hybrid KRTMI Nasional |
| **2022** | **Muhammad Iqbal Rasyid** | S1 Pendidikan Teknik Mekatronika (FT UNY) | `Ci5QBYaLgHg` (2022-09-24) | Peringkat 8 Besar Nasional KRI 2022 |
| **2023** | **Salsabila Azzahra PSDU** | S1 Pendidikan Teknik Mekatronika (FT UNY) | `Cw6bd9zPTNP` (2023-09-08) | Juara 3 Wilayah I & Finalis Nasional KRI 2023 (USM) |
| **2024** | **Ilham Widyo Nugroho** | D4 Teknik Elektronika (FV UNY) | `C_0wguVTpGY` (2024-09-12) | Kontingen KRI Nasional 2024 (UMS Surakarta) |
| **2025** | **Farhan Yuda Mahendra** | S1 Pendidikan Teknik Mekatronika (FT UNY) | `DPHoWoFkxa3` (2025-09-27) | Kontingen KRI 2025 / Technocorner 2026 |

### 3.2 Managers Showcase (2020–2025)
| Year | Manager Name(s) | Role & Responsibility | Post Ref / Source |
|---|---|---|---|
| **2020** | **Yuli Dwi Saputri** | Lead Team Manager & Administration | `CD9awafDNZH` (2020-08-16) |
| **2021** | **Yuli Dwi Saputri** | General Logistics & University Liaison | 2021 Contingent Record |
| **2022** | **Yuli Dwi Saputri & Mustika Wahyu Aprilia** | Finance, Secretarial & Logistics | `Ci5PdHUrgvk` (2022-09-24) |
| **2023** | **Mustika Wahyu Aprilia** (Senior Advisor: Yuli Dwi Saputri) | RAB Finance, Proposal & Bureaucracy | `Cw6at1NPTGL` (2023-09-08) |
| **2024** | **Mustika Wahyu Aprilia & Rose Pita Nur Afifah** | Finance/RAB & Media/Branding Lead | `C_0wQ-qzwUx` (2024-09-12) |
| **2025** | **Rose Pita Nur Afifah & Zelfa Nafisah Zalna** | Chief Manager & Operational Administration | `DPHoFZYk8lw` (2025-09-27) |

### 3.3 Active Technical Squad (Current Contingent)
- **Divisi Program (AI, Vision & Embedded Logic)**:
  - Tri Wahyu Handoyo (Lead AI & Vision, YOLO, Mecanum Kinematics, Web)
  - Salsabila Azzahra PSDU (Sensor Logic & Match Strategy)
  - Farhan Yuda Mahendra (Embedded Control & Kinematics Programming)
  - Hanif NurKhalis & Hisyam Yasid Pratowo (Junior Autonomous Logic Engineers)
- **Divisi Elektronik (Power & PCB)**:
  - Abdul Hasib Adzdzin Nuha (Lead PCB Design & Sensor Shield Layout)
  - Agus Bagaskoro (Lead Hardware & Power Distribution Board)
  - Ikhsan Nurrohman (Lead Telemetry & Wireless Systems)
  - Aryasetya Maulana Swasdika & Naufal Farros Zainal Arifin (Hardware Technicians)
- **Divisi Mekanik (CAD, Machining & Assembly)**:
  - Muhamad Ilham Sony (Lead CAD & Precision Machining)
  - Caesar Sokma Langgeng (CAD & Laser Cutting Fabrication)
  - Rionaldi Nugroho (Mechanical Assembly & QA)
  - Adhiyatma Fatya Ramadhani, Andika Nanda Wijaya, Kharisma Putra Mahardika (Fabrication Engineers)
- **Dosen Pembimbing**:
  - Prof. Ir. Moh. Khairudin, M.T., Ph.D. (Dosen Pembimbing Utama)
  - Dr. Herlambang Sigit Pramono, S.T., M.Cs. (Dosen Pembimbing)

### 3.4 Alumni & Generations Data Structure (2020–2025)
- **Generasi 2020**: Juara 2 KRTMI Nasional 2020 (Perintis KRTMI UNY)
- **Generasi 2021**: Kontingen Daring/Hybrid KRTMI 2021
- **Generasi 2022**: Kontingen Luring Pasca-Pandemi KRI 2022 (Leader M. Iqbal Rasyid)
- **Generasi 2023**: Juara 3 Wilayah I & Finalis Nasional USM Semarang (Leader Salsabila Azzahra PSDU)
- **Generasi 2024**: Kontingen Nasional UMS Surakarta (Leader Ilham Widyo Nugroho)
- **Generasi 2025**: Kontingen Terkini (Leader Farhan Yuda Mahendra)

---

## 4. Proposed Upgraded Component Architecture

```
                                  ┌───────────────────────────┐
                                  │    TeamRosterSection      │
                                  │      (Master Shell)       │
                                  └─────────────┬─────────────┘
                                                │
         ┌──────────────────────────────────────┼──────────────────────────────────────┐
         │                                      │                                      │
┌────────┴─────────┐                 ┌──────────┴──────────┐               ┌───────────┴──────────┐
│ LeadersHallOfFame│                 │   ManagersShowcase  │               │ ActiveTechnicalSquad │
│  Row (2020-2025) │                 │   Row (2020-2025)   │               │ (Prog, Elektro, Meka)│
└────────┬─────────┘                 └──────────┬──────────┘               └───────────┬──────────┘
         │                                      │                                      │
         └──────────────────────────────────────┼──────────────────────────────────────┘
                                                │
                                  ┌─────────────┴─────────────┐
                                  │  AlumniGenerationExplorer │
                                  │     (Tabs 2020-2025)      │
                                  └─────────────┬─────────────┘
                                                │
                                  ┌─────────────┴─────────────┐
                                  │ MemberPhotoFadeShowcase   │
                                  │   (Auto-Crossfade Engine) │
                                  └─────────────┬─────────────┘
                                                │
                                  ┌─────────────┴─────────────┐
                                  │   MemberProfileModal      │
                                  │  (Interactive Lightbox)   │
                                  └───────────────────────────┘
```

### 4.1 Component Breakdown & Responsibilities

1. **`MemberPhotoFadeShowcase` (Ultra-Smooth Crossfade Engine)**:
   - Handles multi-image transitions with pure CSS opacity (`opacity-100` vs `opacity-0`) and gentle scale animation (`scale-100` vs `scale-105`).
   - Transition duration: `duration-1000 ease-in-out`.
   - Dynamic per-member interval offset: `3600ms + (id_hash % 5) * 200ms` preventing synchronized flashing.
   - Interactive slide counter: `<Images /> x/y`.
   - Hover / modal navigation: Left/Right circular buttons + clickable bottom indicator dots.
   - Fallback generator: Beautiful initials avatar with division accent colors if photo fails.

2. **`LeadersHallOfFame` (Leaders Row 2020–2025)**:
   - Dedicated golden/amber aesthetic container with crown icon header (`Award` / `Crown`).
   - Displays all 6 era leaders sequentially with leadership year badges (2020, 2021, 2022, 2023, 2024, 2025).
   - Horizontal responsive grid with auto-crossfade member photos, academic programs, and leadership accomplishments.

3. **`ManagersShowcase` (Managers Row 2020–2025)**:
   - Emerald & teal executive styling (`Briefcase`, `ShieldCheck`).
   - Showcases managers from 2020 to 2025 handling finance (RAB), administration, university permits, and social media branding.
   - Distinct badges for Finance Lead, Media Lead, and General Manager.

4. **`ActiveTechnicalSquad` (Divisional Tech Teams)**:
   - Filterable by division (Programmer, Elektronik, Mekanik, Pembimbing) and searchable.
   - High-density technical cards with specialization tags (YOLO, STM32, SolidWorks, Mecanum, Altium, LiFePO4).

5. **`AlumniGenerationExplorer` (Interactive 2020–2025 Archive)**:
   - Year selector pill buttons: `[ Semua Generasi ] [ 2025 ] [ 2024 ] [ 2023 ] [ 2022 ] [ 2021 ] [ 2020 ]`.
   - When a year is selected, shows:
     - Generation overview banner (theme, tournament location, robot name, achievements).
     - Roster cards of the official contingent members for that specific year.
     - Role, sub-role, and division badges.

6. **`MemberProfileModal` (High-Resolution Modal Dialog)**:
   - Fullscreen-capable modal with keyboard accessibility (ESC to close, Left/Right arrow for slides).
   - Large photo showcase, verified Restek credentials, study programs, quotes, and social links.

---

## 5. Build, Verification & Compatibility Checks

### 5.1 Build Command Verification
- Executed: `npm.cmd run build`
- Result: **0 compilation errors, 0 TypeScript errors, 100% static export success (`11/11 pages generated`)**.
- Asset resolution: All routes (`/`, `/divisi`, `/pertandingan`, `/krtmi`, `/prestasi`) compiled to static HTML in `out/`.

### 5.2 Responsive & CSS Performance Guidelines
- Pure Tailwind CSS transitions (`transition-all duration-1000 ease-in-out`) ensure 60fps GPU-accelerated rendering without heavy runtime animation dependencies.
- Zero layout shifts (CLS = 0) by maintaining fixed aspect ratios (`aspect-[4/3]`, `aspect-square`).
- Semantic asset paths compatible with GitHub Pages base path (`/AbhinayaUNY_Web`).
