# Project: Tim Robotika Abhinaya UNY Data Verification & Web Synchronization

## Architecture
- **Web Framework**: Next.js 14 (App Router) + React 18 + Tailwind CSS + Lucide Icons
- **Data Layer**: `data/teamData.ts` (TypeScript types and data structures for team members, leaders, managers, alumni generations 2020-2025, advisor board)
- **Documentation Layer**: `STRUKTUR_TIM_ABHINAYA.md`, `ARSIP_ANALISIS_FOTO_DAN_DATA_ANGGOTA.md` (authoritative archive)
- **Media Asset Layer**: `public/images/instagram_feed/`, `public/images/members/`, `public/images/tournaments/`
- **Presentation Layer**: `components/TeamRosterSection.tsx`, `components/MemberPhotoFadeEngine.tsx`, `app/divisi/page.tsx`

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | Visual Photo & Media Audit (2020–2025) | Comprehensive scan of all photos in `public/images/instagram_feed/` and `public/images/members/`, mapping individuals, roles, and competition context | M1 | ORIGINAL_REQUEST §R1 |
| 2 | Image Asset Remediation & Semantic Normalization | Remediate 22 blank/corrupted images, normalize files to `{tahun}_{divisi}_{nama_anggota}_{urutan}.{ext}` | M1 | ORIGINAL_REQUEST §R1 |
| 3 | PDDikti UNY NIM & Prodi Verification | Cross-verify all member NIMs (11 digits), official study programs, and faculties (FT, FMIPA, FV) against authentic PDDikti records | M2 | ORIGINAL_REQUEST §R2 |
| 4 | Elimination of Placeholder/Fabricated NIMs | Correct Farhan Yuda Mahendra's NIM to `22518241040` and normalize all prodi designations across datasets | M2 | ORIGINAL_REQUEST §R2 |
| 5 | Master Comprehensive Archive Generation | Author `ARSIP_ANALISIS_FOTO_DAN_DATA_ANGGOTA.md` with photo catalogue, member tables (2020-2025), Leader/Manager history, and PDDikti audit log | M3 | ORIGINAL_REQUEST §R3 |
| 6 | Synchronize `data/teamData.ts` | Update `teamData.ts` with verified NIMs, accurate prodi names, authentic photo paths, and dynamic category counts | M4 | ORIGINAL_REQUEST §R4 |
| 7 | Synchronize `STRUKTUR_TIM_ABHINAYA.md` | Align `STRUKTUR_TIM_ABHINAYA.md` prodi affiliations (Afif, Iqbal, dll.) and leadership data | M4 | ORIGINAL_REQUEST §R4 |
| 8 | Build Verification, E2E Audit & Git Push | Ensure `npm run build` succeeds with 0 errors, conduct forensic audit, commit, and push to GitHub | M5 | ORIGINAL_REQUEST §Acceptance |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| M1 | Image Asset Remediation & Semantic Mapping | Fix 22 blank images in `public/images/members/`, establish semantic links/files, verify 100% photo validity | Survey | PLANNED |
| M2 | PDDikti Verification & Master Member Dataset | Formulate master verified member dataset (35+ members, 2020-2025) with authentic 11-digit NIMs & faculties | M1 | PLANNED |
| M3 | Comprehensive Archive Documentation | Generate complete `ARSIP_ANALISIS_FOTO_DAN_DATA_ANGGOTA.md` with 100% complete tables and photo catalogue | M2 | PLANNED |
| M4 | Web Data & Structure Synchronization | Synchronize `data/teamData.ts` and `STRUKTUR_TIM_ABHINAYA.md` with master verified data and images | M2, M3 | PLANNED |
| M5 | Build Verification, Multi-Agent Review & Git Push | Run `npm run build`, multi-reviewer audit, challenger tests, forensic audit, git commit and push | M1, M2, M3, M4 | PLANNED |

## Interface Contracts
### Data Schema (`data/teamData.ts` ↔ UI Components)
- `TeamMember`: `{ id: string, name: string, nim: string, role: string, division: DivisionSlug, subRole?: string, department: string, studyProgram: string, faculty: string, image: string, photos?: string[], bio: string, achievements?: string[], isLead?: boolean, joinedYear: number, graduationYear?: number, socials?: MemberSocials }`
- `LeaderHistoryItem`: `{ year: number, name: string, nim: string, role: string, major: string, faculty: string, photo: string, photos?: string[], highlights: string[], vision?: string, bio?: string }`
- `ManagerHistoryItem`: `{ year: number, name: string, nim: string, role: string, major: string, faculty: string, photo: string, photos?: string[], highlights: string[], bio?: string }`
- `GenerationArchive`: `{ year: number, theme: string, leader: string, membersCount: number, achievements: string[], members: TeamMember[] }`

## Code Layout
- `data/teamData.ts` — Main TypeScript dataset for all roster and historical data
- `STRUKTUR_TIM_ABHINAYA.md` — Markdown summary of team structure, leaders, managers, and active squad
- `ARSIP_ANALISIS_FOTO_DAN_DATA_ANGGOTA.md` — Authoritative comprehensive archive of photos, members, and PDDikti verification
- `public/images/members/` — Member portrait imagery
- `public/images/instagram_feed/` — Historical Instagram feed photos
- `components/TeamRosterSection.tsx` — UI component rendering team rosters, leaders, managers, and alumni explorer
