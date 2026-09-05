# Project: Abhinaya UNY Robotics Portal Revamp (Orchestrator 2)

## Architecture
- **Framework**: Next.js 14 (App Router) + React 18 + Tailwind CSS + Lucide Icons
- **Design System**: Bespoke Dark-Emerald High-Tech (#030605 Obsidian Carbon, #10B981 Emerald, #00F5D4 Cyan/Neon, sleek glassmorphism, fluid micro-interactions)
- **Data & Content Layer**: `data/newsData.ts`, `data/galleryData.ts`, `data/teamData.ts`, `ARSIP_BERITA_DAN_MEDIA_ABHINAYA.md`
- **Presentation Layer**:
  - `components/HeroSection.tsx`: Unblocked cinematic stage with dedicated typography & action zone
  - `components/AboutTeamSection.tsx`: Unblocked UMS 2024 showcase with header meta bar, natural 16:10 photo, dedicated bottom story card
  - `components/Achievements.tsx`: UNLIMITED UNDIP corrected to 2026, dynamic institution badges, polished cards
  - `components/InstagramFeedShowcase.tsx`: Clean photo canvas without top-corner text/gradient clutter
  - `components/DocumentationGallerySection.tsx`: Aspect ratio cards with bottom metadata
  - `components/TeamRosterSection.tsx` & `MemberPhotoFadeEngine.tsx`: Unblocked portraits, restored responsive grid (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` passing T4-03)
  - `components/KRIOverview.tsx`, `components/NewsMediaSection.tsx`, `components/SocialMediaHub.tsx`, `components/Footer.tsx`: Authentic Indonesian robotics copywriting (anti-AI slop)
- **Build & Export Pipeline**:
  - `pages/500.tsx`: Custom static 500 error page bypassing Next.js 14 trailingSlash rename bug
  - `tests/e2e/run_all.js`: 57 automated E2E test cases across 4 tiers
  - Static export ready for GitHub Pages under base path `/AbhinayaUNY_Web`

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | UNLIMITED UNDIP 2026 Year Correction | Update competition year to 2026 across `newsData.ts`, `Achievements.tsx`, `ARSIP_BERITA_DAN_MEDIA_ABHINAYA.md`, `app/prestasi/page.tsx`, `KRIOverview.tsx` | M1 | ORIGINAL_REQUEST §R2 |
| 2 | Authentic Robotics Copywriting | Eradicate AI buzzwords, replace with sharp Indonesian engineering tone across all components and pages | M1 | ORIGINAL_REQUEST §R3 |
| 3 | Hero Section Photo Unblocking | Decouple hero text from photo stage into clean header zone + framed cinematic unblocked photo stage | M2 | ORIGINAL_REQUEST §R1, R4 |
| 4 | About Team Section Photo Unblocking | Restructure UMS 2024 banner to 3-part card (top meta bar, natural 16:10 photo with 0% dark gradient, bottom story card) | M2 | ORIGINAL_REQUEST §R1 |
| 5 | Feed & Gallery Photo Unblocking | Move floating tags & badges out of image viewports in Instagram Feed & Documentation Gallery | M2 | ORIGINAL_REQUEST §R1 |
| 6 | Team Roster Photo Unblocking & Grid Fix | Move division badges away from member heads in roster cards, restore responsive grid layout for test T4-03 | M3 | ORIGINAL_REQUEST §R1, R4 |
| 7 | Bespoke UI Polish & Micro-interactions | Elevate dark-emerald cyber palette, fluid tabs, subtle border glows, glassmorphism | M3 | ORIGINAL_REQUEST §R4 |
| 8 | Next.js 500 Export Bug Resolution | Add `pages/500.tsx` to fix ENOENT rename failure during `npm.cmd run build` | M4 | ORIGINAL_REQUEST §R5 |
| 9 | Full E2E Test Suite Pass | Verify 57/57 tests pass cleanly via `node tests/e2e/run_all.js` and `python scripts/test_e2e_suite.py` | M4 | ORIGINAL_REQUEST §R5 |
| 10 | Production Build & Git Synchronization | Verify `npm.cmd run build` code 0 with 11 static pages, commit all changes cleanly | M4 | ORIGINAL_REQUEST §R5 |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| M1 | Factual Timeline (UNDIP 2026) & Authentic Copywriting | `data/newsData.ts`, `data/galleryData.ts`, `components/Achievements.tsx`, `components/KRIOverview.tsx`, `components/SocialMediaHub.tsx`, `components/Footer.tsx`, `app/prestasi/page.tsx`, `app/divisi/page.tsx`, `ARSIP_BERITA_DAN_MEDIA_ABHINAYA.md` | Survey | DONE |
| M2 | Photo Unblocking (Hero, About, Feed, Gallery) | `components/HeroSection.tsx`, `components/AboutTeamSection.tsx`, `components/InstagramFeedShowcase.tsx`, `components/DocumentationGallerySection.tsx`, `components/NewsMediaSection.tsx`, `components/YouTubeVideoShowcase.tsx` | M1 | DONE |
| M3 | Roster Unblocking, Bespoke UI & Grid Fix | `components/TeamRosterSection.tsx`, `components/MemberPhotoFadeEngine.tsx`, UI styling & micro-interactions | M2 | DONE |
| M4 | Build Integrity (pages/500.tsx), E2E Tests & Git Sync | `pages/500.tsx`, `PROJECT.md` root sync, run `node tests/e2e/run_all.js`, `npm.cmd run build`, git commit | M1, M2, M3 | DONE |

## Interface Contracts
- `newsData.ts`: item `undip-unlimited-robot-finalist` must have `date: "2026"`, title with `2026`.
- `Achievements.tsx`: UNDIP item must have `year: '2026'`, `event: 'UNLIMITED Robotics Competition UNDIP 2026'`.
- `AboutTeamSection.tsx`: Team banner must NOT have overlay text/badges covering faces or robots; image must use natural aspect ratio with 0% dark gradient.
- `TeamRosterSection.tsx`: Division badge must not overlay faces; roster cards must use responsive grid classes (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`).
- `pages/500.tsx`: React component exporting default custom 500 error page matching portal dark-emerald aesthetic.

## Code Layout
- `data/newsData.ts`, `data/galleryData.ts`, `data/teamData.ts` — Data models & archives
- `components/` — Next.js/React presentation components
- `pages/500.tsx` — Custom static 500 export page
- `tests/e2e/` — Automated test harness (57 tests)
- `.agents/` — Coordination, logs, briefing, and milestone handoffs
