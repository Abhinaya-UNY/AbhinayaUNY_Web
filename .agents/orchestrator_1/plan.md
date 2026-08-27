# Project Orchestration Plan: Abhinaya UNY Web Enhancement

## Objective
Deliver complete implementation of all requirements in ORIGINAL_REQUEST.md:
1. Instagram Member Photo Analysis & Semantic Renaming Pipeline
2. All-Era Leaders & Managers Showcase (2020-2025)
3. Current Active Technical Squad (Programmer, Elektronik, Mekanik)
4. Interactive Alumni & Generation Explorer
5. Ultra-Smooth Crossfade Photo Transition Engine
6. Build & Functionality Verification (`npm run build`, clean git commit & push)

## Phased Execution Strategy
- **Phase 0: Survey & Scope Mapping (3 Explorers in parallel)**
  - Explorer 1: Inspect `public/images/instagram_feed/`, `public/images/members/`, identify all Instagram photos, captions/posts, metadata, and mapping to {tahun}_{divisi}_{nama_anggota}_{urutan}.
  - Explorer 2: Inspect existing frontend structure, components, data models (`src/data/`, `src/components/`, `src/pages/`, member roster, leaders, managers, alumni).
  - Explorer 3 / Spec Miner: Extract exact requirements, leaders (2020-2025), managers (2020-2025), active technical squad, crossfade specifications, and build pipeline.
- **Phase 1: Architecture & Decomposition (PROJECT.md)**
  - Synthesize explorer findings into comprehensive PROJECT.md.
  - Define Feature Inventory, Milestones, and Interface Contracts.
- **Phase 2: Milestone Execution (Sub-orchestrators / Worker-Reviewer Loops)**
  - Milestone 1: Photo Renaming Pipeline & Asset Standardization (`public/images/members/`)
  - Milestone 2: Data Architecture & Member/Leader/Manager/Alumni Data Models (`src/data/...`)
  - Milestone 3: Ultra-Smooth Crossfade Transition Component & UI Components
  - Milestone 4: Roster UI Integration (Leaders Showcase, Managers Showcase, Active Squad, Alumni Explorer)
- **Phase 3: E2E Verification, Forensic Audit & Git Sync**
  - Challenger testing & cross-browser/responsive verification
  - Forensic Integrity Audit (`teamwork_preview_auditor`)
  - Build validation (`npm run build` = 0 errors)
  - Git commit and push verification
