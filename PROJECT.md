# Project: Abhinaya UNY Robotics Portal Refinement

## Architecture
- **Framework**: Next.js 14.2.35 (App Router) with Static Site Generation (`output: 'export'`)
- **Language**: TypeScript 5.4.5, React 18.3.1
- **Styling**: Tailwind CSS 3.4.3 with custom cyan/blue/slate futuristic theme and Lucide React 0.378.0 icons
- **Data Layer**: TypeScript static typed data files (`data/krtmiData.ts`, `data/galleryData.ts`, `data/teamData.ts`)
- **Offline Tooling**: Standalone Python CLI/TUI script (`scripts/manager_tool.py`) with zero public web footprint, automated timestamped backups, and syntax validation
- **Hosting & CI/CD**: GitHub Pages deployment at `https://abhinaya-uny.github.io/AbhinayaUNY_Web/` with configured `basePath: '/AbhinayaUNY_Web'`

## Feature Inventory
| # | Feature | Description | Milestone / Track | Source |
|---|---------|-------------|-------------------|--------|
| 1 | Hero Layout & Button Proportions | CTA buttons placed strictly below hero photo container across viewports; responsive aspect ratio on mobile without cropping flags/members | Track 1 (M1) | ORIGINAL_REQUEST §R1 |
| 2 | Official Multimedia & YouTube Integration | Embed official videos (Main action `PmxwdrhpxKg` 16:9, Shorts `wLusNVfFFHA` 9:16), channel `@AbhinayaUNY`, Instagram `@abhinaya.uny`, interactive fluid modals & tabs | Track 1 (M2) | ORIGINAL_REQUEST §R2 |
| 3 | Team Roster & Division Member Showcase | Interactive division roster (Mekanik, Elektrik, Programming/AI, Manajerial/Media, Dosen Pembimbing) with verified team records and high-tech cards | Track 2 (M3) | ORIGINAL_REQUEST §R3 |
| 4 | Comprehensive Guidebook Alignment (2019-2026) | Complete competition specifications, arena dimensions, scoring criteria, robot constraints from local PDFs (KRTMI 2019-2024, TC UGM 2026) | Track 2 (M4) | ORIGINAL_REQUEST §R4 |
| 5 | Standalone Offline Local Manager Tool | Python CLI/TUI script (`scripts/manager_tool.py`) for managing competitions, gallery, and team members offline with automated backups and AST validation | Track 3 (M5) | ORIGINAL_REQUEST §R5 |
| 6 | E2E Testing, Build Verification & Static Export | End-to-end multi-tier testing, zero-error static export (`npm.cmd run build`), asset path verification for GitHub Pages deployment | Track 4 (M6) | ORIGINAL_REQUEST §Verification |

## Milestones & Tracks
| # | Track / Name | Sub-orchestrator Scope | File Ownership | Status |
|---|--------------|------------------------|----------------|--------|
| T1 | UI & Media Track | M1 (Hero Layout) & M2 (YouTube Showcase) | `components/HeroSection.tsx`, `components/YouTubeVideoShowcase.tsx` | DONE |
| T2 | Data & Content Track | M3 (Team Roster) & M4 (Guidebook Alignment) | `data/teamData.ts`, `data/krtmiData.ts`, `components/TeamRosterSection.tsx`, `components/KrtmiChronicles.tsx`, `app/page.tsx`, `app/divisi/page.tsx` | DONE |
| T3 | Tooling Track | M5 (Offline Local Manager Tool) | `scripts/manager_tool.py`, `scripts/test_manager_tool.py` | DONE |
| T4 | E2E Testing & Quality Gate | M6 (E2E Test Suite Tiers 1-5, `TEST_READY.md`) | `scripts/test_e2e_suite.py`, `TEST_READY.md` | DONE |

## Interface Contracts

### `data/teamData.ts` ↔ Frontend Components
```typescript
export interface TeamMember {
  id: string;
  name: string;
  nim: string;
  studyProgram: string;
  faculty: string;
  division: 'Mekanik' | 'Elektrik' | 'Programming & AI' | 'Manajerial & Media' | 'Pembimbing';
  role: string;
  subRole?: string;
  generation?: string;
  specialization: string[];
  bio: string;
  image: string;
  badge: string;
  socials?: {
    github?: string;
    linkedin?: string;
    instagram?: string;
    email?: string;
  };
}

export const TEAM_MEMBERS: TeamMember[];
export const DOSEN_PEMBIMBING: TeamMember;
export const ALL_ROSTER_MEMBERS: TeamMember[];
```

### `data/krtmiData.ts` ↔ Guidebook Viewer Components
```typescript
export interface KrtmiStory {
  year: string;
  theme: string;
  slogan: string;
  arena: ArenaSpecs;
  robot: RobotSpecs;
  objects: GameObjects;
  procedure: MatchProcedure;
  scoring: string[];
  penalties: string[];
  achievements: string[];
  pdfFile: string;
}
```

### `scripts/manager_tool.py` ↔ Data Layer
- **Input**: Interactive ANSI color TUI menu or CLI flags (`--add-member`, `--list-team`, `--add-krtmi`, `--list-krtmi`, `--add-gallery`, `--list-gallery`, `--backup`, `--restore`, `--validate`).
- **Output**: Formatted TypeScript exports in `data/teamData.ts`, `data/krtmiData.ts`, `data/galleryData.ts`.
- **Safety**: Automated backup creation in `scripts/backups/backup_YYYYMMDD_HHMMSS/` prior to any write; atomic rollback on validation failure.

## Code Layout
```
AbhinayaUNY_Web/
├── .agents/                    # Agent metadata (BRIEFING.md, progress.md, GATE_STATUS.md, etc.)
├── .github/workflows/          # GitHub Actions CI/CD (deploy.yml)
├── app/                        # Next.js App Router pages
│   ├── divisi/page.tsx         # Divisions & Team Roster page
│   ├── gallery/page.tsx        # Media & Gallery page
│   ├── krtmi/page.tsx          # KRTMI & Guidebooks page
│   ├── layout.tsx              # Root Layout with Nav and Footer
│   ├── page.tsx                # Homepage (Hero, About, Showcase, Roster, Chronicles)
│   └── prestasi/page.tsx       # Achievements & Milestones page
├── components/                 # React UI Components
│   ├── HeroSection.tsx         # Hero section with button positioning below stage
│   ├── YouTubeVideoShowcase.tsx# Official YouTube video & Shorts player
│   ├── TeamRosterSection.tsx   # Team member division cards & filter tabs
│   ├── KrtmiChronicles.tsx     # Guidebook and rules explorer
│   ├── GallerySection.tsx      # Photo & Video gallery
│   └── ...
├── data/                       # Static typed data files
│   ├── galleryData.ts          # Gallery images and media entries
│   ├── krtmiData.ts            # Detailed competition rulebooks 2019-2026
│   └── teamData.ts             # Authentic team roster & divisions
├── public/                     # Static public assets
│   ├── assets/                 # Team photos, logos, badges
│   └── guidebooks/             # Official PDF rulebooks (2019-2026)
├── scripts/                    # Offline local tooling & test suites
│   ├── manager_tool.py         # Standalone CLI/TUI manager utility
│   ├── test_manager_tool.py    # Test suite for manager tool (29 tests)
│   └── test_e2e_suite.py       # E2E Multi-Tier test suite (55 tests)
├── TEST_READY.md               # Master Test Suite Report (100% PASS)
└── PROJECT.md                  # Project index & specifications
```
