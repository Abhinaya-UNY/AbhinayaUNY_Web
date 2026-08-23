# Media & Manager Tooling Exploration Report
**Project:** Portal Tim Robotika Abhinaya UNY (KRTMI)  
**Date:** 2026-08-23  
**Status:** COMPLETED  
**Author:** Media & Manager Tooling Explorer  

---

## 1. Executive Summary

This report documents the exhaustive exploration and technical specifications for three critical pillars of the **Abhinaya UNY Robotics Portal** enhancement:
1. **Authentic Team Member Records & Organizational Structure**: Complete extraction of verified team rosters, leadership roles, division mappings (Mekanik, Elektrik, Programming/AI, Manajerial & Media, and Dosen Pembimbing), academic credentials (NIM, Prodi, Fakultas), and individual technical specializations from primary local sources (Surat Tugas KRI 2024 UMS, Surat Tugas KRI Wilayah 2024, Proposal KRTMI 2024, and PAB archives).
2. **Official Multimedia & YouTube Showcase Integration**: Design of interactive, responsive multimedia players embedding official Abhinaya UNY YouTube assets (`@AbhinayaUNY`), including standard 16:9 widescreen match action (`PmxwdrhpxKg`), vertical 9:16 Shorts (`wLusNVfFFHA`), and Instagram channel integration (`@abhinaya.uny`) with fluid modals, thumbnail previews, and responsive layouts.
3. **Standalone Offline Local Manager Tool (`scripts/manager_tool.py`)**: Full architectural specification for a developer/manager Python TUI/CLI utility that enables frictionless CRUD operations on `data/krtmiData.ts`, `data/galleryData.ts`, and `data/teamData.ts` with strict zero-public-exposure, automated timestamped backups (`.bak`), TypeScript syntax formatting, and pre-commit validation.

---

## 2. Authentic Team Member Roster & Organizational Structure

### 2.1 Organizational Hierarchy Overview

```
                        ┌───────────────────────────────────────────────┐
                        │              Dosen Pembimbing                 │
                        │    Prof. Ir. Moh. Khairudin, M.T., Ph.D.      │
                        │        (Guru Besar Robotika FT UNY)          │
                        └───────────────────────┬───────────────────────┘
                                                │
                        ┌───────────────────────┴───────────────────────┐
                        │             Ketua Tim (Team Leader)           │
                        │               Ilham Widyo Nugroho             │
                        │             (D4 Teknik Elektronika)           │
                        └───────────────────────┬───────────────────────┘
                                                │
         ┌───────────────────┬──────────────────┴────────────────┬───────────────────┐
         │                   │                                   │                   │
┌────────┴────────┐ ┌────────┴────────┐                 ┌────────┴────────┐ ┌────────┴────────┐
│     Mekanik     │ │    Elektrik     │                 │ Programming/AI  │ │ Manajerial &    │
│                 │ │                 │                 │                 │   Media           │
│ • M. Ilham Sony │ │ • Agus Bagas.   │                 │ • Tri Wahyu H.  │ │ • Salsabila A.  │
│ • Farhan Yuda M.│ │ • Abdul Hasib   │                 │ • Ilham Widyo N.│ │ • Mustika W. A. │
│ • Caesar Sokma  │ │ • Ikhsan Nurr.  │                 │                 │ • Rose Pita N. A. │
│ • Edo Raja S.   │ │ • Rionaldi N.   │                 │                 │                   │
│                 │ │ • Yusron N. L.  │                 │                 │                   │
└─────────────────┘ └─────────────────┘                 └─────────────────┘ └─────────────────┘
```

### 2.2 Complete Verified Team Member Database

| No | Full Name | NIM | Program Studi / Fakultas | Official Division | Team Role & Specialization | Key Contributions & Projects |
|:---|:---|:---|:---|:---|:---|:---|
| **AD** | **Prof. Ir. Moh. Khairudin, M.T., Ph.D.** | NIDN: 0012047901 | Dosen / Guru Besar FT UNY | **Pembimbing / Advisor** | Dosen Pembimbing Utama (Chief Advisor) | Pengarah strategi riset robotika, kontrol sistem adaptif, pembimbingan teknis KRI Wilayah & Nasional |
| **01** | **Ilham Widyo Nugroho** | 21507334002 | D4 Teknik Elektronika (FV) | **Manajerial / Elektrik** | Ketua Tim (Team Leader) & Firmware Lead | Koordinasi umum tim, arsitektur firmware STM32F407, integrasi komunikasi serial Mini PC & ESP32 |
| **02** | **Tri Wahyu Handoyo** | 22518241023 | S1 Pendidikan Teknik Mekatronika (FT) | **Programming & AI** | Autonomous Navigation & Computer Vision Lead | Algoritma computer vision YOLO pengenal sampah, invers kinematika roda mecanum, perancangan portal web |
| **03** | **Agus Bagaskoro** | 21501244039 | S1 Pendidikan Teknik Elektro (FT) | **Elektrik** | Electrical Hardware & Power Management Lead | Desain power distribution board (PDB), sistem proteksi darurat (E-Stop), isolasi driver motor BTS7960 |
| **04** | **Farhan Yuda Mahendra** | 22518244007 | S1 Pendidikan Teknik Mekatronika (FT) | **Mekanik** | Mechanical Design & Gripper Mechanism Specialist | Desain 3D CAD mekanisme gripper presisi dua tingkat, suspensi sasis mecanum, transmisi lead-screw |
| **05** | **Muhamad Ilham Sony** | 20539144016 | S1 Teknik Manufaktur (FT) | **Mekanik** | Manufacturing & Fabrication Lead | Fabrikasi presisi plat aluminium 6061, pemesinan bubut & milling, perakitan sasis utama |
| **06** | **Salsabila Azzahra Putri Sophia Dewi Utami** | 20518241012 | S1 Pendidikan Teknik Mekatronika (FT) | **Manajerial & Media** | Managerial Lead & Match Strategy Coordinator | Manajemen operasional tim, analisis aturan pertandingan BPTI Puspresnas, koordinasi paddock lomba |
| **07** | **Mustika Wahyu Aprilia** | 21306141050 | S1 Fisika (FMIPA) | **Manajerial & Media** | Secretariat, Finance & Public Relations Lead | Penyusunan anggaran biaya (RAB), surat-menyurat resmi universitas & kementerian, humas dan PAB |
| **08** | **Abdul Hasib Adzdzin Nuha** | 22502241014 | S1 Pendidikan Teknik Elektronika (FT) | **Elektrik** | PCB Designer & Sensor Interface Engineer | Desain skematik & layout custom PCB shield STM32, pengkondisi sinyal rotary encoder dan proximity |
| **09** | **Rose Pita Nur Afifah** | 22518241042 | S1 Pendidikan Teknik Mekatronika (FT) | **Manajerial & Media** | Media, UI/UX & Documentation Specialist | Pengelolaan media sosial resmi (@abhinaya.uny), kurasi visual foto/video dokumentasi lomba, branding tim |
| **10** | **Caesar Sokma Langgeng** | 21539144005 | S1 Teknik Manufaktur (FT) | **Mekanik** | Fabrication & Rapid Prototyping Engineer | Pemotongan laser akrilik presisi, manufaktur bracket motor planetary, optimasi kekakuan struktural |
| **11** | **Ikhsan Nurrohman** | 22538141004 | S1 Teknik Elektro (FT) | **Elektrik** | Telemetry & Wireless Systems Specialist | Integrasi modul ESP32 Bluetooth DualShock 4, telemetri nirkabel arena, filtering derau catu daya |
| **12** | **Edo Raja Saputra Siahaan** | 22508334033 | D4 Teknik Mesin (FV) | **Mekanik** | Actuator & Mechanical Dynamics Engineer | Perakitan aktuator gripper, pengujian getaran sasis saat melintasi rintangan, kalibrasi mekanik |
| **13** | **Rionaldi Nugroho** | 23090620088 | D4 Teknik Elektronika (FV) | **Elektrik** | Junior Embedded Hardware Engineer | Pengujian kabel harness, monitoring charging baterai LiPo/LiFePO4, pemeliharaan lab elektrik |
| **14** | **Yusron Nur Latief** | Senior Member | Teknik UNY | **Elektrik (Alumni)** | Senior Electrical & Hardware Advisor | Konsultasi arsitektur perangkat keras robotika generasi pendahulu, transfer teknologi KRTMI |

### 2.3 Proposed TypeScript Data Model (`data/teamData.ts`)

To support modular rendering, division filtering, high-tech member cards, and CLI management, the data structure is designed as follows:

```typescript
export type DivisionType = 
  | 'Semua'
  | 'Pembimbing'
  | 'Manajerial & Media'
  | 'Programming & AI'
  | 'Elektrik'
  | 'Mekanik';

export interface TeamMember {
  id: string;
  name: string;
  nim?: string;
  prodi: string;
  faculty: string;
  division: 'Pembimbing' | 'Manajerial & Media' | 'Programming & AI' | 'Elektrik' | 'Mekanik';
  subDivision?: string;
  role: string;
  year: string;
  specialization: string;
  bio: string;
  skills: string[];
  achievements?: string[];
  photo?: string;
  socials?: {
    linkedin?: string;
    github?: string;
    instagram?: string;
    email?: string;
  };
  featured?: boolean;
}
```

---

## 3. Official Multimedia & YouTube Integration Specification

### 3.1 Official Media Asset Index

| Platform | Handle / Identifier | URL / Resource | Content Description | Aspect Ratio |
|:---|:---|:---|:---|:---|
| **YouTube Channel** | `@AbhinayaUNY` | https://www.youtube.com/@AbhinayaUNY | Kanal video resmi dokumentasi riset, uji coba lab, dan laga nasional | Profile / Channel |
| **YouTube Video 1** | `PmxwdrhpxKg` | https://www.youtube.com/watch?v=PmxwdrhpxKg | **Main Action Video**: Laga Robot Otonom Abhinaya KRTMI Nasional 2024 di UMS | **16:9 Widescreen** |
| **YouTube Video 2** | `wLusNVfFFHA` | https://www.youtube.com/shorts/wLusNVfFFHA | **Official Shorts**: Behind the scenes paddock tuning, tes gerak cepat sasis | **9:16 Vertical** |
| **Instagram** | `@abhinaya.uny` | https://www.instagram.com/abhinaya.uny/ | Feed foto resmi prestasi, info open recruitment (PAB), recap laga | Grid / Feed |

### 3.2 YouTube Embed & Player Architecture

#### Key Capabilities:
1. **Adaptive Video Cards**:
   - Tab switch between **"Aksi Laga Robot (16:9 Full Action)"** and **"Shorts & Behind The Scenes (9:16 Vertical)"**.
   - Custom thumbnail poster using YouTube's High-Resolution CDN (`https://img.youtube.com/vi/{videoId}/maxresdefault.jpg` with fallback to `hqdefault.jpg`).
   - Cyber-themed animated play button with radial glow.
2. **Modal Lightbox / In-Place Fluid Player**:
   - Click to play loads lightweight responsive iframe with `youtube-nocookie.com` to optimize privacy and page performance.
   - 16:9 Container uses `relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl`.
   - 9:16 Container uses `relative max-w-[340px] mx-auto aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl`.
   - Smooth backdrop overlay with ESC key dismiss and click-outside handler.
3. **Channel Call-to-Action**:
   - One-click subscribe button to `@AbhinayaUNY` and follow `@abhinaya.uny`.

---

## 4. Standalone Offline Local Manager Tool (`scripts/manager_tool.py`) Specification

### 4.1 Architecture & Zero Public Exposure Guarantee

```
[ Local Developer Environment ]
  │
  ├── scripts/manager_tool.py  <--- Pure Python 3 CLI / TUI tool (Offline execution only)
  ├── scripts/backups/         <--- Automated timestamped backups (.bak)
  │
  ├── Reads & Writes:
  │    ├── data/teamData.ts     (Team Roster, Divisions, Roles)
  │    ├── data/krtmiData.ts    (Competition Chronicles, Arena Specs, Rules)
  │    └── data/galleryData.ts  (Photo & Media Gallery Archives)
  │
  └── Triggers (Optional):
       └── npm run build        (Static Site Generation Verification)
  │
[ Public Web / GitHub Pages ]
  ├── Static HTML/CSS/JS (Out Dir)
  ├── ZERO public admin routes (/admin, /api/auth)
  └── ZERO runtime backend databases or credentials exposed
```

### 4.2 Core Functional Modules

```python
# scripts/manager_tool.py Architectural Blueprint

class BackupManager:
    """Manages atomic backups in scripts/backups/ before any write operation."""
    def create_backup(self, filepath: str) -> str: ...
    def list_backups(self) -> list: ...
    def restore_backup(self, backup_path: str, target_path: str) -> bool: ...

class TypeScriptDataHandler:
    """Safely extracts JSON-like data from TS files and re-serializes with formatting."""
    def load_krtmi_data(self) -> list: ...
    def save_krtmi_data(self, data: list) -> bool: ...
    def load_team_data(self) -> list: ...
    def save_team_data(self, data: list) -> bool: ...
    def load_gallery_data(self) -> list: ...
    def save_gallery_data(self, data: list) -> bool: ...

class ValidationEngine:
    """Validates schemas and triggers compiler check."""
    def validate_team_member(self, member: dict) -> tuple[bool, str]: ...
    def validate_krtmi_edition(self, edition: dict) -> tuple[bool, str]: ...
    def validate_gallery_item(self, item: dict) -> tuple[bool, str]: ...
    def run_typecheck(self) -> bool: ...

class InteractiveTUI:
    """Colorized interactive terminal menu."""
    def main_menu(self): ...
    def menu_competitions(self): ...
    def menu_team(self): ...
    def menu_gallery(self): ...
    def menu_backup_restore(self): ...
```

### 4.3 Command-Line Interface (CLI) Commands

The script supports both interactive TUI mode and scriptable non-interactive CLI flags:

| Command | Purpose | Example |
|:---|:---|:---|
| `python scripts/manager_tool.py` | Launches interactive colorized TUI menu | `python scripts/manager_tool.py` |
| `python scripts/manager_tool.py --list-team` | Prints formatted team roster table | `python scripts/manager_tool.py --list-team` |
| `python scripts/manager_tool.py --list-competitions` | Lists all KRTMI competition editions | `python scripts/manager_tool.py --list-competitions` |
| `python scripts/manager_tool.py --list-gallery` | Lists all gallery items | `python scripts/manager_tool.py --list-gallery` |
| `python scripts/manager_tool.py --backup` | Creates immediate backup of all `data/*.ts` files | `python scripts/manager_tool.py --backup` |
| `python scripts/manager_tool.py --restore <id>` | Restores data files from a backup snapshot | `python scripts/manager_tool.py --restore 20260823_073000` |
| `python scripts/manager_tool.py --validate` | Checks schema integrity and executes build check | `python scripts/manager_tool.py --validate` |

---

## 5. Next Steps for Implementation

1. **Create `data/teamData.ts`**: Populate complete authenticated team data (14 members across 4 divisions + Dosen Pembimbing) with rich metadata.
2. **Create `components/TeamRosterSection.tsx`**: High-tech interactive member showcase with division filter tabs, modal details, and role badges.
3. **Upgrade `components/YouTubeVideoShowcase.tsx`**: Add tabs for Main Action (`PmxwdrhpxKg`) and Shorts (`wLusNVfFFHA`), high-res thumbnails, responsive 16:9 and 9:16 containers, and direct channel links.
4. **Implement `scripts/manager_tool.py`**: Provide complete, error-tolerant Python CLI/TUI script with backups, data validation, and AST formatting.
5. **Integrate into `app/page.tsx` & Verify Build**: Ensure seamless visual flow, proportional hero layout, zero build errors (`npm run build`), and clean deployment readiness.
