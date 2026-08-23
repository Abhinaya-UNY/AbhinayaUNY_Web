# Handoff Report: Web Codebase Architecture Survey

**Agent Folder:** `.agents/explorer_survey_codebase`  
**Date:** 2026-08-23  
**Status:** Complete  

---

## 1. Observation

- **Core Tech Stack:** Next.js `14.2.35` (App Router) configured for static export (`output: 'export'`) in `next.config.js`, React `18.3.1`, TypeScript `5.4.5`, Tailwind CSS `3.4.3`, and `lucide-react` `0.378.0`.
- **Build & CI/CD Pipeline:** The project builds cleanly with zero errors via `npm.cmd run build`. GitHub Actions workflow (`.github/workflows/deploy.yml`) is configured to deploy the `./out` static build to GitHub Pages (`https://abhinaya-uny.github.io/AbhinayaUNY_Web/`) with `basePath: '/AbhinayaUNY_Web'`.
- **Hero Section (`components/HeroSection.tsx`):** The CTA buttons ("EXPLORE TEAM & GUIDEBOOKS" and "WATCH ROBOT IN ACTION") are placed in a dedicated container below the photo stage (lines 70–88), ensuring no button overlays the team photo. On mobile viewports, the stage fixed height (`h-[48vh]`) with `bg-cover` can cause side cropping of the team stage panoramic photo.
- **YouTube Multimedia Showcase (`components/YouTubeVideoShowcase.tsx`):** The component currently embeds an unrelated video ID (`3yr5uNkxA_8`) at line 31, rather than the official Abhinaya UNY YouTube videos (`PmxwdrhpxKg` for Main Action and `wLusNVfFFHA` for Official Shorts, plus channel `https://www.youtube.com/@AbhinayaUNY`).
- **Team Roster & Division Cards:** `AboutTeamSection.tsx` and `app/divisi/page.tsx` display generic division overviews (`TEAM_DIVISIONS` in `data/krtmiData.ts`), but no individual member cards exist. Authentic records extracted from official documents (`Surat Tugas KRI Wilayah 2024.pdf`, `Sertifikat Juara KRI 2024 & 2023`) catalog 13 core team members, lead roles, and advisor Prof. Dr. Moh. Khairudin. There is no `data/teamData.ts` in the repository.
- **Guidebooks & Chronicles (`components/KrtmiChronicles.tsx` & `data/krtmiData.ts`):** 7 competition editions (2019–2026) are present with exact PDF rulebooks in `public/guidebooks/` matching official BPTI and Technocorner UGM specifications.
- **Manager Tool:** No offline manager tool currently exists (only a 9-line `build_script.py`).

---

## 2. Logic Chain

1. **R1 (Hero Proportions & Button Placement):** Placing buttons in a separate container below the photo stage eliminates vertical obstruction of the team photo, trophies, and UNY flags. To prevent horizontal side cropping on narrow mobile screens (360px–420px), responsive height and background positioning should be optimized (`min-h-[46vh]` to `min-h-[78vh]` with center alignment).
2. **R2 (YouTube & Multimedia):** Replacing the placeholder video with a tabbed / modal video player containing `PmxwdrhpxKg` (16:9 widescreen match action) and `wLusNVfFFHA` (9:16 vertical shorts) satisfies the official multimedia integration requirement with responsive aspect ratios.
3. **R3 (Team Roster):** Creating `data/teamData.ts` using verified official names, NIMs, study programs, roles, and division badges (Mekanik, Elektrik, Programming/AI, Manajerial/Media, Dosen Pembimbing) allows building a dedicated, interactive `TeamRosterSection.tsx` with filter tabs.
4. **R4 (Guidebook Alignment):** Verified that `public/guidebooks/` contains all 7 PDF files and `data/krtmiData.ts` accurately represents the arena, robot constraints, and scoring rules from local rulebooks.
5. **R5 (Offline Local Manager Tool):** Implementing `scripts/manager_tool.py` outside the public web bundle gives the team manager a standalone CLI/TUI to safely update `data/krtmiData.ts`, `data/galleryData.ts`, and `data/teamData.ts` with automated TypeScript generation and zero public admin endpoint exposure.

---

## 3. Caveats

- In PowerShell environments on Windows, `npm` must be executed as `npm.cmd` due to execution policy restrictions on `.ps1` files.
- All internal asset URLs must maintain the `basePath` prefix (`process.env.NODE_ENV === 'production' ? '/AbhinayaUNY_Web' : ''`) to prevent 404s when deployed on GitHub Pages.
- Large local PDF files (e.g., `Panduan_Technocorner_2026.pdf` at 40.83 MB) are already committed in `public/guidebooks/`; ensure no oversized binary duplicates are generated in the `.agents/` folder.

---

## 4. Conclusion

The Abhinaya UNY Robotics Portal codebase is in an excellent, stable state (`npm.cmd run build` passes with zero errors). To fulfill all requirements from `ORIGINAL_REQUEST.md`, subsequent agents should:
1. Refine `HeroSection.tsx` for optimal mobile panoramic aspect ratio.
2. Upgrade `YouTubeVideoShowcase.tsx` to feature official YouTube videos (`PmxwdrhpxKg`, `wLusNVfFFHA`) and channel links with modal playback.
3. Create `data/teamData.ts` with authentic member records and implement `TeamRosterSection.tsx`.
4. Create `scripts/manager_tool.py` as an offline CLI management tool.
5. Build and verify the static export before deployment.

---

## 5. Verification Method

To independently verify the codebase and build integrity:

```powershell
# Navigate to project directory
cd "D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web"

# Run production static build
npm.cmd run build

# Verify build outputs in ./out directory
dir out
```
Expected result: Build completes with status code 0, and all static pages (`index.html`, `krtmi/index.html`, `divisi/index.html`, `prestasi/index.html`) are exported into `./out/`.
