# Milestone 3 Implementation Changes: Ultra-Smooth Crossfade Photo Engine

## 1. Overview
Implemented `components/MemberPhotoFadeEngine.tsx` as a high-performance, GPU-accelerated, reusable React component for multi-photo member showcasing. It delivers seamless crossfade transitions, staggered desynchronized auto-play timing, touch/hover navigation controls, fallback avatar generation, and Next.js static export / `basePath` compatibility.

## 2. File Created
- `components/MemberPhotoFadeEngine.tsx`:
  - **Component**: `MemberPhotoFadeEngine`
  - **Interfaces**: `MemberPhotoFadeEngineProps`, `BadgeStyle`
  - **Exports**: Named export `MemberPhotoFadeEngine` and `default export MemberPhotoFadeEngine`

## 3. Detailed Feature Implementations

### A. GPU-Accelerated CSS Crossfade & Ken-Burns Zoom
- **Transitions**: Stacked layers with `transition-all duration-1000 ease-in-out` and explicit `transform-gpu` / `will-change-[opacity,transform]` / `backface-visibility: hidden`.
- **Active Layer**: `opacity-100 scale-100 z-10 brightness-95 contrast-105`.
- **Inactive Layer**: `opacity-0 scale-105 pointer-events-none z-0`.
- **Ken-Burns Support**: Optional `enableKenBurns` prop triggering smooth 7s scale expansion (`scale-105 duration-7000 ease-out`).
- **Ambient Lighting**: Smooth bottom gradient overlay (`from-[#0B0F19] via-[#0B0F19]/25 to-transparent`) for seamless integration with dark cyber/amber aesthetic.

### B. Desynchronized Auto-Play Timer Intervals
- **Deterministic Stagger**: Employs `getDeterministicOffset(seedIdentifier, 1400)` algorithm based on member ID / name hash.
- **Visual Stability**: Prevents grid cards from flipping synchronously, resulting in a lively, organic roster appearance.
- **Hover/Touch Pause**: Automatically pauses slideshow when user hovers (`isHovered`) or touches the card, resuming cleanly upon leave/release.

### C. Interactive Controls & Slide Indicators
- **Slide Pill Badge**: Top-right glassmorphic pill (`Images` icon + `{currentIdx + 1}/{total}`) with orange border and amber typography.
- **Navigation Chevrons**: Left and right circular buttons (`ChevronLeft`, `ChevronRight`) with glass backdrop and orange hover glow. Visible on hover or modal view.
- **Pagination Dots**: Bottom center dots indicator with expanding active pill (`w-6 bg-brand-orange shadow-[0_0_10px_rgba(255,107,0,0.9)]`).
- **Event Isolation**: `e.stopPropagation()` on all controls to prevent triggering parent card clicks or modal openers.

### D. Smart Fallback Avatar with Initials Extraction
- **Title Filtering**: `getMemberInitials(name)` intelligently filters out academic and honorific prefixes (`Prof.`, `Ir.`, `Dr.`, `M.T.`, `Ph.D.`, `S.T.`, `M.Cs.`, `M.Sc.`, `S.Pd.`, `M.Pd.`, `D4`, `S1`).
- **Error Handling**: Tracks failed image indices via `failedIndices` state. Seamlessly fails over to next valid photo, or renders the initials avatar if all photos fail.
- **Avatar Styling**: Themed container with geometric ambient glow, uppercase initials, role tag, and division badge.

### E. Next.js Static Export & `basePath` Support
- **Dynamic Resolution**: `resolveImagePath(src, basePath)` automatically detects production environment (`/AbhinayaUNY_Web`) or custom prop, preventing duplicate prefixes while handling external URLs (`http`, `https`, `data:`, `blob:`).

## 4. Verification & Quality
- **TypeScript Check**: `npx tsc --noEmit` exited with code 0 (0 errors).
- **Next.js Production Build**: `npm run build` exited with code 0, generating all 11 static pages in `out/`.
- **Integrity Compliance**: Zero modification to `data/teamData.ts` and `components/TeamRosterSection.tsx` as mandated for Milestone 3.
