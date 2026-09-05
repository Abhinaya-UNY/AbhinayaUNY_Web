# DISPATCH — Worker M2 (Photo Unblocking & Layout Refinement)

## Mission
Implement Milestone 2: Photo Unblocking & Layout Refinement (Zero Text Covering Faces/Photos) across key photo showcase components.

## Exclusive File Ownership
You exclusively own and modify:
- `components/AboutTeamSection.tsx`
- `components/HeroSection.tsx`
- `components/InstagramFeedShowcase.tsx`
- `components/DocumentationGallerySection.tsx`
- `components/NewsMediaSection.tsx`
- `components/YouTubeVideoShowcase.tsx`

Do NOT modify any files owned by Milestone 1 or Milestone 3.

## Exact Tasks
1. **`AboutTeamSection.tsx`**:
   - Overhaul the UMS 2024 team photo banner.
   - Decouple into a 3-part card:
     1) Header Meta Bar (above photo): Official badges ("KONTINGEN RESMI KRTMI 2024", "Edutorium UMS Surakarta", "Dokumentasi Resmi Paddock Nasional").
     2) Clean Photo Viewport: Natural aspect ratio (`aspect-[16/10]` or `aspect-[16/9]`), 0% dark gradient covering faces/robots/trophies, no text overlays.
     3) Dedicated Caption & Story Panel (below photo): Clean title, badges for divisions/personnel, authentic narrative about KRTMI 2024 UMS runner-up.
2. **`HeroSection.tsx`**:
   - Decouple hero text from the photo stage.
   - Clean Header Zone: Team logo badge, "ABHINAYA UNY", authentic engineering subtitle and tagline.
   - Indonesian action buttons: "JELAJAHI TIM & BUKU PANDUAN" and "SAKSIKAN AKSI ROBOT DI ARENA".
   - Framed Cinematic Photo Stage: Elegant border glow, natural aspect ratio (`aspect-[16/10]` or `aspect-[16/9]`), 0% vignette over faces or robots, dedicated bottom metadata strip.
3. **`InstagramFeedShowcase.tsx`**:
   - Move `@abhinaya.uny` handle, category badge, and `1/X` slide counter out of the photo canvas into a dedicated Card Mini-Header above the photo.
   - Remove dark gradient haze (`bg-gradient-to-t`) from the photo.
   - Move slide dots/controls cleanly outside the photo canvas.
4. **`DocumentationGallerySection.tsx`**:
   - Replace fixed `h-44 sm:h-48` crop with natural `aspect-[4/3]`.
   - Remove floating corner badges (`item.category`, `item.year`) from inside the photo frame.
   - Place category and year metadata cleanly in the card body below the photo.
5. **`NewsMediaSection.tsx` & `YouTubeVideoShowcase.tsx`**:
   - Remove heavy overlays from thumbnails, moving titles and tags below the media viewport.
6. **Aesthetic Consistency**:
   - Align styling with modern high-craft design (bespoke dark-emerald accents, elegant borders, subtle glassmorphism).
7. **Verification**:
   - Run `npm.cmd run build` to ensure 0 compile/lint errors.
   - Run `node tests/e2e/run_all.js` to ensure no regressions.
   - Write `report.md` and `handoff.md` in your working directory.

## Mandatory Inputs
- `D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web\.agents\ORIGINAL_REQUEST.md`
- `D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web\.agents\teamwork_preview_explorer_survey_gen2_1\report.md`
- `D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web\.agents\orchestrator_2\PROJECT.md`

## 2026-09-05T07:28:09Z
You are Worker M2. Read your mission and file boundaries in D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web\.agents\teamwork_preview_worker_m2_gen2\DISPATCH.md.

MANDATORY: First read D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web\.agents\ORIGINAL_REQUEST.md.
Also read D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web\.agents\teamwork_preview_explorer_survey_gen2_1\report.md.

Your working directory is D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web\.agents\teamwork_preview_worker_m2_gen2.

Scope & Tasks:
You exclusively own and modify:
- components/AboutTeamSection.tsx
- components/HeroSection.tsx
- components/InstagramFeedShowcase.tsx
- components/DocumentationGallerySection.tsx
- components/NewsMediaSection.tsx
- components/YouTubeVideoShowcase.tsx

Implement the complete Photo Unblocking & Layout Refinement (Requirement R1):
1. Zero text/gradient overlays covering faces, robots, or trophies.
2. Decoupled layout architecture: clean top header bars + unblocked natural aspect ratio photo viewports + dedicated bottom caption/story panels.
3. Apply authentic copywriting and bespoke dark-emerald high-tech styling.
4. Verify changes by running build and tests.
Write report to report.md and handoff.md in your working directory, then send_message back to parent.

