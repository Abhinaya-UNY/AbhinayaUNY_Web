# Scope: React Bits Animation Elevation & High-Craft Micro-Interactions

## Architecture
- **Framework**: Next.js 14.2.35 (App Router, `output: 'export'`, `basePath: '/AbhinayaUNY_Web'`, `trailingSlash: true`, `images: { unoptimized: true }`)
- **Language & Styling**: TypeScript, React 18.3.1, Tailwind CSS 3.4.3, Lucide React
- **Design & Animation Engine**: Zero-dependency bespoke React Bits components leveraging native React hooks (`useState`, `useEffect`, `useRef`), Tailwind CSS keyframes (`shimmer`, `fadeIn`), and Web APIs (`requestAnimationFrame`, `IntersectionObserver`, CSS custom variables `--mouse-x`, `--mouse-y`)
- **Theme Tokens**: Signature Electric Orange (`#FF6B00`), Warm Amber (`#F97316`, `#F59E0B`), Warm Carbon Black (`#070503`, `#120D08`, `#140E09`), Emerald accents (`#10B981`)
- **Zero-Obscuration Invariant**: Member photos, robot hardware, and trophies strictly decoupled from metadata; spotlight radial illumination is semi-transparent (`rgba(255, 107, 0, 0.15)`) with `pointer-events-none`
- **SSR/Static Export Invariant**: Text components render literal target strings during SSR/static export to guarantee all DOM assertions in `test_empirical_html_output.js` pass with 100% integrity

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | DecryptedText Primitive | Binary/ASCII character scramble revealing real text on hover/in-view; SSR-safe literal text fallback; reduced-motion safe | M1 | ORIGINAL_REQUEST §R1 |
| 2 | ShinyText Primitive | Golden-orange metallic sweep gradient using GPU-composited CSS keyframes (`animate-shimmer`) | M1 | ORIGINAL_REQUEST §R1 |
| 3 | BlurText Primitive | Staggered word/character reveal with subtle blur and translateY easing triggered via IntersectionObserver | M1 | ORIGINAL_REQUEST §R1 |
| 4 | SpotlightCard Engine | Fluid pointer-tracking radial glow (`rgba(255, 107, 0, 0.15)`) using CSS variables `--mouse-x`, `--mouse-y`; zero parent re-renders; pointer-events-none | M1 | ORIGINAL_REQUEST §R2 |
| 5 | CountUp Statistics Primitive | Viewport-triggered smooth numeric easing counter using `requestAnimationFrame` and `easeOutExpo` | M1 | ORIGINAL_REQUEST §R3 |
| 6 | AmbientGrid Primitive | Low-GPU subtle robotics coordinate grid and scan micro-motion with WCAG contrast safety | M1 | ORIGINAL_REQUEST §R4 |
| 7 | Hero Section Kinetic Elevation | BlurText on headline & tagline; ShinyText on championship badge; DecryptedText on category pill; AmbientGrid backdrop | M2 | ORIGINAL_REQUEST §R1, R4 |
| 8 | Roster Cards Spotlight & Badges | Integrate SpotlightCard into member cards replacing parent-state `spotlightPos`; DecryptedText on division pills; zero face obscuration | M2 | ORIGINAL_REQUEST §R2 |
| 9 | Achievements & News Spotlight Lighting | Wrap 6 trophy cards and news articles with SpotlightCard orange lighting; ShinyText on cabinet title; DecryptedText on award badges | M2 | ORIGINAL_REQUEST §R1, R2 |
| 10 | Dynamic Telemetry Statistics | CountUp on statistics in `AboutTeamSection`, `KrtmiChronicles`, and `app/pertandingan/page.tsx` | M2 | ORIGINAL_REQUEST §R3 |
| 11 | Static Export & Build Verification | Verify `npm.cmd run build` generates 11/11 static pages without TypeScript or hydration errors | M3 | ORIGINAL_REQUEST §R5 |
| 12 | Empirical HTML & Edge Cases Test Pass | Pass `node scripts/test_empirical_html_output.js` (9 suites, 57 assertions) and `node scripts/stress_test_edge_cases.js` (22 tests) | M3 | ORIGINAL_REQUEST §R5 |
| 13 | Forensic Integrity Audit & Review Gates | Two Reviewers, two Challengers, and Forensic Auditor verification ensuring genuine implementations | M3 | ORIGINAL_REQUEST §R5 |
| 14 | Git Sync & Production Deployment | Commit all changes cleanly to Git and push to GitHub `origin main` | M4 | ORIGINAL_REQUEST §R5 |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| M1 | React Bits Core Animation Primitives | `components/animations/DecryptedText.tsx`, `ShinyText.tsx`, `BlurText.tsx`, `SpotlightCard.tsx`, `CountUp.tsx`, `AmbientGrid.tsx`, `index.ts`, `components/ui/SpotlightCard.tsx` | Survey | DONE |
| M2 | Section Integrations & Micro-Interactions | `components/HeroSection.tsx`, `components/TeamRosterSection.tsx`, `components/Achievements.tsx`, `components/NewsMediaSection.tsx`, `components/AboutTeamSection.tsx`, `components/KrtmiChronicles.tsx`, `components/KRIOverview.tsx`, `app/pertandingan/page.tsx` | M1 | DONE |
| M3 | Comprehensive Verification, Test Suite & Forensic Audit Gate | `scripts/test_empirical_html_output.js`, `scripts/stress_test_edge_cases.js`, `scripts/run_e2e_tests.js`, `npm.cmd run build` | M2 | DONE |
| M4 | Production Git Sync & Sentinel Delivery | Clean git commit, push to `origin main`, write `handoff.md`, notify Sentinel | M3 | IN_PROGRESS |

## Interface Contracts
### `components/animations/DecryptedText.tsx`
- Props: `text: string`, `speed?: number`, `maxIterations?: number`, `sequential?: boolean`, `revealDirection?: 'start'|'end'|'center'`, `useOriginalCharsOnly?: boolean`, `characters?: string`, `animateOn?: 'view'|'hover'|'both'`, `className?: string`, `parentClassName?: string`, `encryptedClassName?: string`
- SSR Contract: Initial state must be `text` (literal string) to satisfy static export HTML assertions.

### `components/animations/ShinyText.tsx`
- Props: `text: string`, `disabled?: boolean`, `speed?: number`, `className?: string`, `shimmerColor?: string`
- Styling Contract: Uses `bg-clip-text text-transparent bg-gradient-to-r from-brand-orange via-amber-200 to-brand-orange bg-[length:250%_100%] animate-shimmer`.

### `components/animations/BlurText.tsx`
- Props: `text: string`, `delay?: number`, `className?: string`, `animateBy?: 'words'|'letters'`, `direction?: 'top'|'bottom'`, `threshold?: number`, `rootMargin?: string`
- A11y Contract: Container has `aria-label={text}`, inner spans render words/letters with blur/opacity transition upon `IntersectionObserver`.

### `components/animations/SpotlightCard.tsx`
- Props: `children: React.ReactNode`, `className?: string`, `spotlightColor?: string` (default: `'rgba(255, 107, 0, 0.15)'`), `spotlightSize?: number` (default: `350`), `borderColor?: string`, `hoverBorderColor?: string`, `as?: React.ElementType`
- Performance Contract: Mousemove updates CSS variables `--mouse-x` and `--mouse-y` via direct ref; 0 parent re-renders; overlay has `pointer-events-none`.

### `components/animations/CountUp.tsx`
- Props: `to: number`, `from?: number`, `duration?: number`, `delay?: number`, `separator?: string`, `decimals?: number`, `decimal?: string`, `prefix?: string`, `suffix?: string`, `className?: string`
- Viewport Contract: Animates when scrolled into view using `IntersectionObserver` and `requestAnimationFrame`.

### `components/animations/AmbientGrid.tsx`
- Props: `className?: string`, `gridSize?: number`, `scanSpeed?: number`, `opacity?: number`
- Performance Contract: Pure SVG / CSS radial mask, GPU-composited, low battery/CPU overhead, 100% contrast safe.
