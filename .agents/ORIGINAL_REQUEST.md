# Original User Request

## Initial Request — 2026-08-23T00:25:25Z

Refine and elevate the official Abhinaya UNY Robotics Portal (https://abhinaya-uny.github.io/AbhinayaUNY_Web/) with proportional button positioning below the hero photo, comprehensive guidebook alignment, YouTube & Instagram media integrations, dedicated team roster cards extracted from official team records, and an offline local management tool for the team manager to update competitions and team members without exposing admin access on the public web.

Working directory: D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web
Integrity mode: development

## Reference Materials
- Official Live Website: https://abhinaya-uny.github.io/AbhinayaUNY_Web/
- YouTube Channel & Showcase:
  - Channel: https://www.youtube.com/@AbhinayaUNY
  - Video 1 (Main Action): https://www.youtube.com/watch?v=PmxwdrhpxKg
  - Video 2 (Official Shorts): https://www.youtube.com/shorts/wLusNVfFFHA
- Instagram Profile & Archives: https://www.instagram.com/abhinaya.uny/
- Local Official Rulebooks & Guidebooks:
  - D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\Restek\Abhinaya 2024\Bedah Rules\BUKU 7 Kontes Robot Tematik Indonesia (KRTMI).pdf
  - D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\Restek\Abhinaya 2024\Bedah Rules\Buku Pedoman KRI 2024 fix.pdf
  - D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\Restek\Abhinaya KRTMI 2023\BukuPedomanKRI2023.pdf
  - D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\Lomba Technocorner UGM\02_Transporter\GUIDEBOOK TRANSPORTER TC26.pdf

## Requirements

### R1. Hero Layout & Button Proportions
- Position the two CTA buttons (EXPLORE TEAM & GUIDEBOOKS and WATCH ROBOT IN ACTION) strictly and comfortably below the hero photo container across all viewport sizes (mobile, tablet, desktop) so the team photo, trophies, and UNY flags remain 100% visible and unblocked.
- Ensure the hero background photo maintains proper aspect ratio on mobile screens without over-zooming or cropping out team members on the sides.

### R2. Official Multimedia & YouTube Showcase Integration
- Embed and feature official Abhinaya UNY YouTube videos (https://www.youtube.com/watch?v=PmxwdrhpxKg, https://www.youtube.com/shorts/wLusNVfFFHA, and channel https://www.youtube.com/@AbhinayaUNY).
- Incorporate interactive video showcases and seamless modals with fluid playback and responsive sizing.

### R3. Team Roster & Division Member Showcase
- Build a dedicated, interactive Team Member Roster section categorizing members by official divisions (Mekanik, Elektrik, Programming/AI, and Manajerial/Media).
- Design high-tech member cards with division badges, roles, and profile imagery derived from authentic team documentation.

### R4. Comprehensive Guidebook Alignment (2019 – 2026)
- Cross-verify and present accurate competition rules, arena dimensions, scoring criteria, and robot mechanical/electronic constraints extracted directly from the local PDF guidebooks (KRTMI 2019–2024 and Technocorner UGM 2026).

### R5. Offline Local Manager Tool (Zero Public Admin Exposure)
- Provide a standalone, local CLI / GUI management tool (Python/Node.js script located in scripts/manager_tool.py outside the public web bundle) allowing the team manager to effortlessly add new competition archives, guidebooks, or team members into the data layer (data/krtmiData.ts, data/galleryData.ts, data/teamData.ts).
- Keep the public website 100% read-only, informational, and optimized for prospective members/maba with zero public admin endpoints or exposed credentials.

## Acceptance Criteria

### Verification & Performance Checks
- [ ] npm run build succeeds with zero TypeScript, lint, or static export errors.
- [ ] CTA buttons in the hero section are verified below the photo stage on both mobile (390px) and desktop (1920px) viewports with zero overlap on team flags.
- [ ] All YouTube videos (PmxwdrhpxKg, wLusNVfFFHA) render and play responsively.
- [ ] Team Member section renders division cards with verified team roles.
- [ ] Standalone local manager tool (scripts/manager_tool.py) successfully creates/updates competition and team member records in the local data files.
- [ ] Website is committed and deployed cleanly to GitHub Pages (https://abhinaya-uny.github.io/AbhinayaUNY_Web/).
