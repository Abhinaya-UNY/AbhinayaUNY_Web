# Project: Abhinaya UNY Web — Team Roster & Historical Archive Upgrade

## Architecture
- **Framework**: Next.js 14.2.35 (App Router, Static Export `output: 'export'`), React 18.3.1, TypeScript 5.4.5, Tailwind CSS 3.4.3, Lucide React.
- **Data Layer**: TypeScript data models (`data/teamData.ts`) providing structured records for Leaders (2020-2025), Managers (2020-2025), Active Technical Squad (Program, Elektronik, Mekanik), Advisors, and Alumni Generations (2020-2025).
- **Asset Pipeline**: Semantic photo naming standard `{tahun}_{divisi}_{nama_anggota}_{urutan}.{jpg|png}` stored in `public/images/members/` and `public/images/instagram_feed/`, with full exclusion of grid slices and non-member covers.
- **UI & Presentation Layer**:
  - `MemberPhotoFadeEngine`: Lightweight, GPU-accelerated CSS crossfade engine with auto-interval offset, hover pause, slide counter, navigation arrows, pagination dots, and fallback avatar.
  - `LeadersHallOfFame`: Gold/amber-themed showcase row for Leaders 2020-2025.
  - `ManagersShowcase`: Emerald/teal-themed showcase row for Managers 2020-2025.
  - `ActiveTechnicalSquad`: High-tech division cards with role badges, skill tags, and multi-photo crossfade.
  - `AlumniGenerationExplorer`: Interactive year tabs (2020-2025) rendering generation-specific contingent rosters, roles, and achievements.
  - `MemberProfileModal`: High-res image lightbox, member background, achievements, and social links.

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | Instagram Photo Semantic Renaming Pipeline (R1) | Systematically rename and structure member photos into `{tahun}_{divisi}_{nama_anggota}_{urutan}.ext` excluding non-member/grid graphics | M1 | ORIGINAL_REQUEST §R1 |
| 2 | All-Era Leaders Hall of Fame (2020–2025) (R2) | Dedicated gold-themed showcase row for team leaders across 2020-2025 with badges, prodi, and crossfade | M2, M4 | ORIGINAL_REQUEST §R2 |
| 3 | All-Era Managers Showcase (2020–2025) (R2) | Dedicated emerald-themed showcase row for managers across 2020-2025 with leadership badges and crossfade | M2, M4 | ORIGINAL_REQUEST §R2 |
| 4 | Current Active Technical Squad (R3) | Active squad cards for Program, Elektronik, Mekanik with specific roles, skills, and multi-photo crossfade | M2, M4 | ORIGINAL_REQUEST §R3 |
| 5 | Interactive Alumni & Generation Explorer (R4) | Interactive tab/filter for years 2020-2025 displaying contingent members, roles, and division per generation | M2, M4 | ORIGINAL_REQUEST §R4 |
| 6 | Ultra-Smooth Crossfade Photo Engine (R5) | GPU-accelerated crossfade transitions across cards and modal with slide indicators and navigation controls | M3 | ORIGINAL_REQUEST §R5 |
| 7 | Full Build & Forensic Verification | `npm run build` with 0 errors, full E2E test verification, clean audit, and Git sync | M5 | ORIGINAL_REQUEST §Acceptance Criteria |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| M1 | Photo Renaming & Asset Standardization | Execute semantic renaming pipeline based on catalog mapping, creating clean semantic asset structure in `public/images/members/` and verified mapping dictionary | none | COMPLETED |
| M2 | Data Layer & Member Models Implementation | Update `data/teamData.ts` with complete historical data (Leaders 2020-2025, Managers 2020-2025, Active Squad 2025, Alumni Generations 2020-2025) using semantic photo paths | M1 | COMPLETED |
| M3 | Ultra-Smooth Crossfade Engine | Implement standalone/reusable `MemberPhotoFadeEngine` component with seamless crossfade, slide indicators, and manual controls | none | COMPLETED |
| M4 | Team Roster UI & Alumni Explorer Integration | Refactor and assemble `components/TeamRosterSection.tsx` into modular sections: Leaders Hall of Fame, Managers Showcase, Active Squad, Alumni Explorer, and Detail Modal | M2, M3 | COMPLETED |
| M5 | E2E Testing, Build Verification, Forensic Audit & Git Sync | Execute E2E test validation, `npm run build` verification (0 errors), Forensic Integrity Audit, and clean Git commit & push | M4 | COMPLETED |

## Interface Contracts
### `TeamMember` Data Contract (`data/teamData.ts`)
```typescript
export interface TeamMember {
  id: string;
  name: string;
  nickname?: string;
  role: string;
  division: 'program' | 'elektronik' | 'mekanik' | 'manager' | 'leader' | 'pembimbing' | 'official';
  subRole?: string;
  generation: number; // e.g. 2020, 2021, 2022, 2023, 2024, 2025
  yearsActive: number[]; // e.g. [2023, 2024, 2025]
  prodi?: string;
  faculty?: string;
  photos: string[]; // paths to semantic photo files
  skills?: string[];
  achievements?: string[];
  leadershipEra?: string; // e.g. "Ketua Tim 2023" or "Manager 2024"
  quote?: string;
  socials?: {
    instagram?: string;
    linkedin?: string;
    github?: string;
    email?: string;
  };
  isLeader?: boolean;
  isManager?: boolean;
  isActive?: boolean;
}

export interface GenerationArchive {
  year: number;
  theme?: string;
  contingentName?: string;
  leader: TeamMember;
  managers: TeamMember[];
  members: TeamMember[];
  achievements: string[];
  groupPhoto?: string;
}
```

### `MemberPhotoFadeEngine` Props Contract (`components/MemberPhotoFadeEngine.tsx` / `components/TeamRosterSection.tsx`)
```typescript
export interface MemberPhotoFadeEngineProps {
  photos: string[];
  name: string;
  aspectRatio?: string; // e.g. "aspect-[3/4]" or "aspect-square"
  autoPlayInterval?: number; // default ~3500ms with stagger offset
  showControls?: boolean;
  showIndicators?: boolean;
  priority?: boolean;
  className?: string;
  onClick?: () => void;
}
```

## Code Layout
- `data/teamData.ts`: Core data structures and datasets for all leaders, managers, active members, advisors, and generation archives.
- `components/TeamRosterSection.tsx`: Main roster section containing Leaders Hall of Fame, Managers Showcase, Active Squad, Alumni Explorer, and modal.
- `components/MemberPhotoFadeEngine.tsx` (or embedded): Ultra-smooth crossfade image transition engine.
- `public/images/members/`: Semantic high-resolution and archived member portraits (`{tahun}_{divisi}_{nama}_{urutan}.ext`).
- `public/images/instagram_feed/`: Original Instagram archive assets and raw feeds.
- `scripts/`: Helper scripts for asset renaming and verification.
