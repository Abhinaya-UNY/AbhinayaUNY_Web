# Handoff Report: Animation & Preloader Timing, Background Dynamism, and Hero Layout Architecture

**Agent**: `teamwork_preview_explorer` (Animation & Preloader Timing Explorer)  
**Milestone**: M0_motion  
**Target Project**: Abhinaya UNY Robotics Portal (`AbhinayaUNY_Web`)  
**Working Directory**: `D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web\.agents\teamwork_preview_explorer_m0_motion`  
**Date**: 2026-09-07T02:47:04Z  

---

## 1. Observation

### 1.1 Preloader Lifecycle & Execution Timing
* **File**: `components/Preloader.tsx` (lines 5–38, 49–94)
* **Code Observation**:
  ```tsx
  5: export const Preloader: React.FC = () => {
  6:   const [progress, setProgress] = useState(0);
  7:   const [isLoaded, setIsLoaded] = useState(false);
  8:   const [opacity, setOpacity] = useState(1);
  ...
  11:   useEffect(() => {
  12:     const hasLoaded = sessionStorage.getItem('abhinaya_preloader_loaded');
  13:     if (hasLoaded) {
  14:       setIsLoaded(true);
  15:       return;
  16:     }
  17: 
  18:     // Dynamic loading progression from 0 to 100%
  19:     const interval = setInterval(() => {
  20:       setProgress((prev) => {
  21:         if (prev >= 100) {
  22:           clearInterval(interval);
  23:           setTimeout(() => {
  24:             setOpacity(0);
  25:             setTimeout(() => {
  26:               setIsLoaded(true);
  27:               sessionStorage.setItem('abhinaya_preloader_loaded', 'true');
  28:             }, 500);
  29:           }, 200);
  30:           return 100;
  31:         }
  32:         const increment = Math.floor(Math.random() * 9) + 4;
  33:         return Math.min(prev + increment, 100);
  34:       });
  35:     }, 45);
  ...
  50:   return (
  51:     <div
  52:       className="fixed inset-0 z-[9999] bg-[#0B0B0E] flex flex-col items-center justify-center transition-opacity duration-500 select-none"
  53:       style={{ opacity }}
  54:     >
  ```
* **Timing Calculation**:
  * Increment steps: $100 / 8 \approx 12$ intervals $\times 45\text{ ms} \approx 540\text{ ms}$.
  * Pause at 100%: $+200\text{ ms}$.
  * CSS opacity fade transition: $+500\text{ ms}$.
  * Total time the viewport is covered by the opaque `#0B0B0E` curtain: **$1240\text{ ms} \sim 1400\text{ ms}$**.
* **Critical Missing Component**:
  * `Preloader.tsx` has **zero external communication**: no `window.dispatchEvent`, no callback, no React Context, and no DOM attribute is set when the preloader starts fading or finishes.

### 1.2 Hero Text Entrance Execution Behind Curtain
* **File**: `components/HeroSection.tsx` (lines 65–78) & `components/animations/BlurText.tsx` (lines 44–61, 85–96)
* **Code Observation**:
  ```tsx
  // HeroSection.tsx:65-78
  <h1 className="text-4xl sm:text-6xl md:text-7xl font-heading font-black text-white tracking-tight uppercase flex items-center gap-2 sm:gap-3 whitespace-nowrap">
    <BlurText text="ABHINAYA" delay={60} animateBy="letters" className="text-white" />
    <BlurText text="UNY" delay={60} animateBy="letters" className="text-orange-400" />
  </h1>

  // BlurText.tsx:44-61
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        if (containerRef.current) {
          observer.unobserve(containerRef.current);
        }
      }
    },
    { threshold, rootMargin }
  );
  if (containerRef.current) {
    observer.observe(containerRef.current);
  }
  ```
* **Consequence**:
  * `HeroSection` is located at the top of the viewport (`scrollY = 0`).
  * `IntersectionObserver` triggers `entry.isIntersecting === true` on initial mount (at $t = 0 \sim 50\text{ ms}$).
  * `setInView(true)` fires immediately, initiating CSS transitions:
    `transitionDuration: 700ms`, `transitionDelay: ${i * delay}ms`.
  * For "ABHINAYA" (8 letters $\times 60\text{ ms} = 420\text{ ms}$ delay $+ 700\text{ ms}$ transition $= 1120\text{ ms}$), the animation completes around $t \approx 1150\text{ ms}$.
  * **Direct Defect**: The entire kinetic blur reveal completes *while hidden completely beneath the opaque preloader screen*. When the preloader curtain fades away at $t \approx 1300\text{ ms}$, the user sees completely static text. The animation is 100% wasted.
  * In addition, other HeroSection elements (subtitle, trophy pill with `ShinyText`, description, CTAs, and telemetry cards) have no staggered entrance sequence; they are all statically visible the moment the preloader vanishes.

### 1.3 Background Visual Dynamism
* **Files**: `components/animations/Aurora.tsx`, `components/animations/InteractiveCanvasDust.tsx`, `components/animations/AmbientGrid.tsx`
* **Observations**:
  1. `InteractiveCanvasDust.tsx` is fully implemented and tested in `test_reactbits_suite.js` (lines 49, 73, 170–178), featuring:
     - 60 FPS cap on desktop, 30 FPS on touch.
     - `IntersectionObserver` auto-pause when off-screen.
     - `document.visibilitychange` auto-pause when browser tab is inactive.
     - `prefers-reduced-motion` detection rendering a static frame.
     - Fluid cursor proximity repulsion within 140px.
     - **Discovery**: `InteractiveCanvasDust` is **never imported or rendered** in `HeroSection.tsx` or anywhere in the application!
  2. `Aurora.tsx` (lines 40–58) contains two moving orbs and one static orb using basic CSS keyframe translation (`auroraDrift1`, `auroraDrift2`). It lacks multi-frequency organic breathing (scale pulsation between 0.96 and 1.08) and mouse-reactive ambient drift.
  3. `AmbientGrid.tsx` (lines 98–106) renders an SVG grid with a static scanline at `top: 25%` with `animate-pulse-glow`.
  4. In `HeroSection.tsx:158–160`, the telemetry pill for Kinematika uses `text-cyan-400` and `text-cyan-300`, violating the 100% Cyber Orange (`#FF6B00`) & Warm Amber (`#F59E0B`) chromatic palette requirement.

### 1.4 HeroSection Layout Architecture
* **File**: `components/HeroSection.tsx` (lines 26–198)
* **Observations across Viewports**:
  * **390px (Mobile)**:
    - Line 65: `whitespace-nowrap flex items-center gap-2 sm:gap-3`. On narrow mobile screens ($360\text{ px} \sim 390\text{ px}$), `whitespace-nowrap` on a 36px font-black headline risks horizontal overflow when combined with `px-4` container padding.
    - Subtitle tracking (`tracking-[0.2em]`) on the 42-character division badge text can cause awkward word wrapping.
  * **768px (Tablet)**:
    - `grid-cols-1 lg:grid-cols-12` causes Left and Right columns to stack vertically.
    - The 4 telemetry pills in the Right column use `grid-cols-2`, creating an unnecessarily tall block before the photo card.
  * **1280px & 1920px (Desktop / Ultrawide)**:
    - Left column spans 7 cols, Right spans 5 cols (`lg:grid-cols-12`).
    - The Studio Photo Card (`aspect-[4/3]`) and Floating Telemetry Dock sit cleanly unblocked, but can be heightened in tactile density and visual integration.

---

## 2. Logic Chain

1. **Premise 1 (Preloader Opacity)**: `Preloader.tsx` renders a `fixed inset-0 z-[9999] bg-[#0B0B0E]` overlay that remains opaque until `setProgress` reaches 100%, after which a 200ms delay and 500ms CSS fade transition occur (total duration $\approx 1250\text{ ms} \sim 1400\text{ ms}$).
2. **Premise 2 (IntersectionObserver Immediate Trigger)**: `BlurText.tsx` observes its container via `IntersectionObserver`. Because `HeroSection` is at `top: 0`, `isIntersecting` is `true` immediately upon component mount ($t \approx 0\text{ ms}$).
3. **Deduction 1 (Hidden Animation Defect)**: Since the BlurText letter transitions run between $t = 0\text{ ms}$ and $t = 1120\text{ ms}$, they execute completely while obscured by the preloader curtain.
4. **Premise 3 (Event-Driven Synchronization)**: By emitting a custom event (`abhinaya:preloader-dismiss`) and setting a global flag (`window.__ABHINAYA_PRELOADER_DONE = true`) at the moment `setOpacity(0)` is invoked in `Preloader.tsx`, downstream components can synchronize their entrance animations to the exact moment the curtain dissolves.
5. **Premise 4 (Race Condition & Fallback Prevention)**:
   - If a visitor returns to the page within the same session, `sessionStorage.getItem('abhinaya_preloader_loaded')` is `'true'`.
   - If a test harness or subpage mounts `HeroSection` without `Preloader`, a safety timeout ensures animations are never blocked.
   - Adding an optional prop `ready?: boolean` to `BlurText` (defaulting to `true`) maintains 100% backward compatibility for all existing tests in `test_reactbits_suite.js`.
6. **Premise 5 (Atmospheric Dynamism)**:
   - `InteractiveCanvasDust` already has 60 FPS delta-time clamping, touch 30 FPS clamping, `IntersectionObserver` pause, and mouse proximity interaction. Layering it into `HeroSection` with Cyber Orange particles (`255, 107, 0`) and zero layout shift (`pointer-events-none absolute inset-0`) immediately fulfills R3.
   - Enhancing `Aurora.tsx` with multi-frequency breathing keyframes (translation + scale + opacity cycle) and a 3rd floating accent orb gives rich depth without CPU/GPU overload.
7. **Premise 6 (Layout & Chromatic Discipline)**:
   - Replacing `whitespace-nowrap` with `flex-wrap sm:flex-nowrap whitespace-normal sm:whitespace-nowrap` guarantees zero horizontal overflow on 390px screens.
   - Adjusting telemetry grid from `grid-cols-2` to `grid-cols-2 sm:grid-cols-4 lg:grid-cols-2` compresses the tablet (768px) layout into a sleek 1-row telemetry bar.
   - Replacing `text-cyan-400` / `text-cyan-300` in the Kinematika telemetry pill with `text-orange-400` / `text-orange-300` enforces 100% Cyber Orange / Warm Amber integrity.

---

## 3. Caveats

1. **No External Animation Libraries**: The project has strict constraints against importing `framer-motion` or `@react-spring` (enforced by `scripts/test_reactbits_suite.js:88-93`). All solutions must use standard CSS transitions, HTML5 Canvas, SVG, or native GSAP 3 (which is already installed in `package.json`).
2. **SSR & Static Export Integrity**: All animations must render static literal text during Next.js static export (`npm run build` $\to$ `out/`). Components must never hide content from search engine crawlers or accessibility screen readers. `aria-label` attributes and semantic DOM elements must remain intact.
3. **SessionStorage Scope**: `sessionStorage` clears when the browser tab closes. This is the intended behavior: returning visits within a session skip the preloader, while fresh visits experience the full cinematic sequence.
4. **No Other Caveats**: No other constraints were identified.

---

## 4. Conclusion & Concrete Implementation Blueprints

### 4.1 Architecture 1: Dual-Channel Preloader-to-Hero Synchronization

#### A. In `components/Preloader.tsx`
Add event dispatching and global window flag assignment at the exact moment opacity fade begins and when session skip occurs:

```tsx
// components/Preloader.tsx
useEffect(() => {
  const hasLoaded = sessionStorage.getItem('abhinaya_preloader_loaded');
  if (hasLoaded) {
    setIsLoaded(true);
    if (typeof window !== 'undefined') {
      (window as any).__ABHINAYA_PRELOADER_DONE = true;
      window.dispatchEvent(new CustomEvent('abhinaya:preloader-dismiss'));
    }
    return;
  }

  const interval = setInterval(() => {
    setProgress((prev) => {
      if (prev >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          // Trigger signal right as curtain begins to dissolve
          if (typeof window !== 'undefined') {
            (window as any).__ABHINAYA_PRELOADER_DONE = true;
            window.dispatchEvent(new CustomEvent('abhinaya:preloader-dismiss'));
            sessionStorage.setItem('abhinaya_preloader_loaded', 'true');
          }
          setOpacity(0);
          setTimeout(() => {
            setIsLoaded(true);
          }, 500);
        }, 200);
        return 100;
      }
      const increment = Math.floor(Math.random() * 9) + 4;
      return Math.min(prev + increment, 100);
    });
  }, 45);

  return () => clearInterval(interval);
}, []);
```

#### B. Reusable Hook: `hooks/usePreloaderComplete.ts` (or inline in `HeroSection.tsx`)
```tsx
export function usePreloaderComplete(): boolean {
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Fast-path: already dismissed in this session
    if (
      (window as any).__ABHINAYA_PRELOADER_DONE ||
      sessionStorage.getItem('abhinaya_preloader_loaded')
    ) {
      setIsComplete(true);
      return;
    }

    // Event listener for active preloader dismissal
    const handleDismiss = () => {
      setIsComplete(true);
    };
    window.addEventListener('abhinaya:preloader-dismiss', handleDismiss, { once: true });

    // Safety fallback timeout: never block UI if preloader is absent
    const fallbackTimer = setTimeout(() => {
      setIsComplete(true);
    }, 2000);

    return () => {
      window.removeEventListener('abhinaya:preloader-dismiss', handleDismiss);
      clearTimeout(fallbackTimer);
    };
  }, []);

  return isComplete;
}
```

#### C. In `components/animations/BlurText.tsx`
Add an optional `ready?: boolean` prop (default `true`):
```tsx
export interface BlurTextProps {
  text: string;
  delay?: number;
  className?: string;
  animateBy?: 'words' | 'letters';
  direction?: 'top' | 'bottom';
  threshold?: number;
  rootMargin?: string;
  ready?: boolean; // NEW: optional gate for preloader synchronization (default: true)
  onAnimationComplete?: () => void;
}

export const BlurText: React.FC<BlurTextProps> = ({
  text,
  delay = 60,
  className = '',
  animateBy = 'words',
  direction = 'top',
  threshold = 0.1,
  rootMargin = '0px',
  ready = true,
  onAnimationComplete,
}) => {
  const [inView, setInView] = useState<boolean>(false);
  const [isIntersected, setIsIntersected] = useState<boolean>(false);
  ...
  useEffect(() => {
    ...
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsIntersected(true);
        if (containerRef.current) observer.unobserve(containerRef.current);
      }
    }, { threshold, rootMargin });

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  // Trigger animation only when BOTH intersected AND ready
  useEffect(() => {
    if (isIntersected && ready) {
      setInView(true);
    }
  }, [isIntersected, ready]);
```
*Note*: If `ready` is not specified, it defaults to `true`, maintaining 100% backward compatibility for all other sections and all existing tests in `test_reactbits_suite.js`.

---

### 4.2 Architecture 2: HeroSection Purposeful Master Stagger Sequence

When `isPreloaderDone` flips to `true`:
| Timeline | Element | Animation Effect |
|---|---|---|
| **$T + 0\text{ ms}$** | Preloader Veil | Dissolves with `opacity: 1 \to 0` (500ms CSS duration) |
| **$T + 50\text{ ms}$** | Top Category Lockup | Logo badge & `DecryptedText` fade-in with slide-down |
| **$T + 150\text{ ms}$** | "ABHINAYA UNY" Title | Letter-by-letter `BlurText` unblurs and glides up (60ms stagger) |
| **$T + 350\text{ ms}$** | Subtitle Copy | Divisi KRTMI subtitle glides into position |
| **$T + 500\text{ ms}$** | National Trophy Badge | Amber award pill with `ShinyText` sweep glides in |
| **$T + 650\text{ ms}$** | Editorial Description | Research narrative text fades in |
| **$T + 800\text{ ms}$** | Magnetic CTA Buttons | Dual action buttons glide up with hover readiness |
| **$T + 950\text{ ms}$** | Quick Link Navigation | Sub-page link pills glide in |
| **$T + 200\text{ ms}$** | Telemetry Dock (Right) | 4 telemetry pills cascade in with 50ms stagger |
| **$T + 400\text{ ms}$** | Studio Frame (Right) | Photo card glides into focus with Cyber Orange glow border |

Implementation via Tailwind transition classes:
```tsx
const isReady = usePreloaderComplete();

// Stagger helper
const getEntranceClass = (delayMs: number) => `
  transition-all duration-700 ease-out motion-reduce:transition-none motion-reduce:transform-none motion-reduce:opacity-100
  ${isReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3.5'}
`;
```

---

### 4.3 Architecture 3: Dynamic Background Atmosphere

#### A. Render `InteractiveCanvasDust` in `HeroSection.tsx`
Import and mount `InteractiveCanvasDust` directly behind content:
```tsx
import { BlurText, ShinyText, DecryptedText, AmbientGrid, Aurora, Magnet, InteractiveCanvasDust } from '@/components/animations';

// In HeroSection.tsx:
{/* 1. Ambient Background Layer */}
<Aurora intensity="subtle" showVignette={true} className="pointer-events-none" />
<InteractiveCanvasDust
  particleCount={28}
  gridSize={48}
  showGrid={false}
  particleColor="255, 107, 0"
  maxFps={60}
  className="pointer-events-none z-0 opacity-75"
/>
<AmbientGrid className="pointer-events-none z-0" opacity={0.16} />
```

#### B. Enhance `Aurora.tsx` with Organic Breathing
In `tailwind.config.js`, enhance `auroraDrift1` and `auroraDrift2` with subtle scale breathing and opacity modulation:
```js
auroraDrift1: {
  '0%, 100%': { transform: 'translate(0, 0) scale(1)', opacity: '0.12' },
  '50%': { transform: 'translate(45px, 25px) scale(1.09)', opacity: '0.18' },
},
auroraDrift2: {
  '0%, 100%': { transform: 'translate(0, 0) scale(1.05)', opacity: '0.08' },
  '50%': { transform: 'translate(-35px, 30px) scale(0.96)', opacity: '0.14' },
},
```
Add a 3rd floating accent orb in `Aurora.tsx` positioned strategically behind the right-column media dock:
```tsx
{/* Aurora Orb 3: Right Media Dock Accentuation */}
<div
  className={`absolute top-1/4 right-10 w-[380px] h-[380px] rounded-full bg-orange-600/10 blur-[120px] transition-transform duration-1000 ${
    reducedMotion ? '' : 'animate-pulse-glow'
  }`}
/>
```

---

### 4.4 Architecture 4: Responsive Asymmetric 2-Column Layout

#### A. Mobile (390px) Viewport Fixes
* In `HeroSection.tsx`:
  ```tsx
  // BEFORE (causes horizontal overflow on narrow mobile screens):
  <h1 className="text-4xl sm:text-6xl md:text-7xl font-heading font-black text-white tracking-tight uppercase flex items-center gap-2 sm:gap-3 whitespace-nowrap">

  // AFTER (responsive wrap on mobile, whitespace-nowrap on sm+):
  <h1 className="text-4xl sm:text-6xl md:text-7xl font-heading font-black text-white tracking-tight uppercase flex flex-wrap sm:flex-nowrap items-center gap-2 sm:gap-3 whitespace-normal sm:whitespace-nowrap">
  ```
* Tighten badge tracking: `tracking-[0.12em] sm:tracking-[0.2em]`.

#### B. Tablet (768px) Telemetry Dock Refinement
* Change telemetry grid from:
  `className="grid grid-cols-2 gap-2.5"`
  to:
  `className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-2.5"`
  * **Result**:
    - Mobile (390px): 2x2 grid.
    - Tablet (768px): 1x4 horizontal telemetry ribbon across the width.
    - Desktop (1280px+): 2x2 grid sitting neatly above the studio photo frame.

#### C. Strict Chromatic Discipline (Eliminating Cyan)
* In `HeroSection.tsx:158–160`:
  ```tsx
  // BEFORE:
  <Cpu className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
  <span className="text-[10px] text-slate-400">KINEMATIKA:</span>
  <span className="text-cyan-300 font-bold truncate">4WD MECANUM</span>

  // AFTER:
  <Cpu className="w-3.5 h-3.5 text-orange-400 flex-shrink-0" />
  <span className="text-[10px] text-slate-400">KINEMATIKA:</span>
  <span className="text-orange-300 font-bold truncate">4WD MECANUM</span>
  ```

---

## 5. Verification Method

To independently verify these findings and implementations:

1. **Verify Animation Suite Integrity**:
   ```bash
   node scripts/test_reactbits_suite.js
   ```
   *Expected*: 46/46 tests pass. Validates zero `framer-motion` dependency, genuine implementations, and client directives.

2. **Verify Edge Cases & UI Constraints**:
   ```bash
   node scripts/stress_test_edge_cases.js
   ```
   *Expected*: 22/22 tests pass. Validates roster searches, division mappers, responsive grids, and photo unblocking.

3. **Verify Ground Truth Credential Integrity**:
   ```bash
   python scripts/test_challenger1_nim_faculty_oracle.py
   ```
   *Expected*: 100% PASS across all PDDikti records.

4. **Verify Static Build & Output Export**:
   ```bash
   npm run build
   node scripts/test_empirical_html_output.js
   ```
   *Expected*: Compiles all 11 static pages cleanly with 0 TypeScript/ESLint errors, and static HTML assertions pass.

5. **Visual Timing Inspection**:
   * Inspect in browser: On initial load, verify the preloader counts up $0 \to 100\%$. As the curtain fades out, the headline "ABHINAYA UNY" kinetic unblur begins visibly, cascading into subtitles and CTAs.
   * On refresh or internal navigation, verify `sessionStorage` causes the page to render immediately without delay or animation stall.
   * Inspect background canvas: Verify `InteractiveCanvasDust` particles react gently to cursor motion and pause when scrolled out of view.
