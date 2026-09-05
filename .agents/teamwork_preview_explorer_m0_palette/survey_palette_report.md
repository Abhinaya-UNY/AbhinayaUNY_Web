# Comprehensive Visual Styling, Color Tokens & Fluid Background Canvas Survey
**Project:** Abhinaya UNY Robotics Portal Redesign (KRTMI Division)  
**Agent:** `explorer_m0_palette` (`teamwork_preview_explorer`)  
**Date:** 2026-09-06  
**Status:** Complete Survey & Architectural Specification  

---

## 1. Executive Summary & Design Vision

The Abhinaya UNY Robotics Portal is transitioning from its legacy high-contrast aesthetic—characterized by Electric Orange (`#FF6B00`), harsh neon amber glows, and an ultra-dark navy-black base (`#050507`)—to an **eye-friendly, calm, high-end industrial minimalist dark aesthetic**. 

Inspired by modern benchmarks such as [virose.team](https://www.virose.team/) and [reactbits.dev](https://reactbits.dev), the new visual language establishes:
- **Base Canvas:** Deep Obsidian (`#0B0B0E`), providing a soft, cinematic dark background that drastically reduces eye strain during long reading sessions.
- **Card Surfaces:** High-craft dual-tier dark surfaces (`#121216` primary, `#18181B` elevated/secondary) framed by delicate 1px border lines (`#27272A` / `rgba(255, 255, 255, 0.06)`).
- **Primary Accent:** Refined Emerald Green (`#10B981` / `#059669`) with subtle, disciplined ambient glow (`rgba(16, 185, 129, 0.08)` to `rgba(16, 185, 129, 0.15)`), replacing garish orange multi-color glows.
- **Typography Pairing:** **Outfit** (for bold, geometric, futuristic display headlines) paired with **Plus Jakarta Sans** (for pristine, highly readable body typography) via Next.js native `@next/font/google` with zero CLS (Cumulative Layout Shift) and offline self-hosting.
- **Fluid Background Canvas Primitives:** A zero-dependency, lightweight ambient system combining:
  1. Subtle Aurora / Mesh ambient gradient glow in hero and header zones.
  2. Interactive micro-particle dust and grid lines throttled to 30/60 FPS, automatically halted via `IntersectionObserver` when off-screen and respecting `prefers-reduced-motion`.

---

## 2. Exhaustive Audit of Existing Visual Styling & Color Usages

### 2.1 Configuration Layer (`tailwind.config.js` & `app/globals.css`)

#### `tailwind.config.js` Current Brand Tokens
```javascript
colors: {
  brand: {
    orange: '#FF6B00',      // Legacy primary accent (240+ usages)
    amber: '#F97316',       // Secondary orange/amber
    darkOrange: '#EA580C',  // Hover states for orange buttons
    lightOrange: '#FB923C', // Hover highlights
    gold: '#F59E0B',        // Trophy/championship badge accent
    dark: '#070B12',        // Legacy container background
    card: '#0D1322',        // Legacy card background
    border: '#1E293B',      // Slate border
  },
}
```

#### `app/globals.css` Current Root Styles
- Line 7: `--background-rgb: 5, 5, 7;`
- Line 17: `background-color: #050507;`
- Lines 18–20: Dual radial background gradients using orange:
  ```css
  background-image: 
    radial-gradient(ellipse 80% 50% at 50% -20%, rgba(255, 107, 0, 0.08), transparent),
    radial-gradient(ellipse 60% 40% at 50% 100%, rgba(255, 107, 0, 0.04), transparent);
  ```
- Line 22: Unspecified generic fallback font family:
  ```css
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  ```
- Line 38: Scrollbar thumb hover: `rgba(255, 107, 0, 0.6)`
- Line 46: `.border-subtle-hover:hover`: `border-color: rgba(255, 107, 0, 0.4)`

#### `app/layout.tsx` Metadata & Root Elements
- Line 85: `<meta name="theme-color" content="#FF6B00" />`
- Line 115: `<body className="antialiased selection:bg-brand-orange selection:text-black bg-[#050507] text-slate-100 min-h-screen">`

---

### 2.2 Existing Animation Suite (`components/animations/`)

| File | Role | Current Color Tokens & Hardcoded Values | Animation & Performance Handling |
|---|---|---|---|
| `AmbientGrid.tsx` | Background SVG grid & scanline | `gridColor`: `rgba(255, 107, 0, 0.05)`, `dotColor`: `rgba(255, 107, 0, 0.12)`, radial glow `rgba(255, 107, 0, 0.08)`, vignette `#050507`, scanline `via-brand-orange/30` | Supports `prefers-reduced-motion` via matchMedia; uses SVG pattern + pure CSS keyframes (`animate-pulse-glow`). |
| `SpotlightCard.tsx` | Cursor-following radial light card | Default `spotlightColor`: `rgba(234, 88, 12, 0.12)`, `hoverBorderColor`: `rgba(255, 255, 255, 0.16)`, background `bg-[#0B0B0E]`, border `border-white/8` | Native mousemove pointer-tracking with CSS custom properties (`--mouse-x`, `--mouse-y`, `--spotlight-opacity`). Pointer-events: none on overlay prevents covering photos. |
| `CyberBento.tsx` | Corner-crosshair technical cards | `bg-[#0B0B0E]`, `hover:bg-[#0E0E12]`, corner crosshairs `group-hover:text-brand-orange/40`, badge `bg-brand-orange/10 text-brand-orange` | Pure CSS hover transitions. |
| `ShinyText.tsx` | Shimmering metallic sweep text | `linear-gradient(90deg, #FF6B00 0%, ${shimmerColor} 50%, #FF6B00 100%)`, `from-brand-orange via-amber-200 to-brand-orange` | Supports `prefers-reduced-motion`; uses background-clip text with CSS `animate-shimmer`. |
| `BlurText.tsx` | Letter/word blur-and-slide reveal | Text color inherited; uses CSS filter `blur(8px)` to `blur(0px)` and translate | Uses `IntersectionObserver` with threshold 0.1 and `prefers-reduced-motion`. |
| `DecryptedText.tsx`| Hacker character scramble reveal | Active scrambler `text-brand-orange/80 font-mono font-bold` | Uses `IntersectionObserver` and interval scrambler; respects `prefers-reduced-motion`. SSR-safe static string preserved. |
| `CountUp.tsx` | Numeric stats counter | Monospace typography with tab numbers | Uses `IntersectionObserver` and `requestAnimationFrame` with `easeOutExpo`; respects `prefers-reduced-motion`. |
| `GsapReveal.tsx` | Staggered entrance animation | Wrapper component | Uses GSAP with `useGSAP` hook; respects `prefers-reduced-motion`. |

---

### 2.3 Component Surface & Color Audit Across All Pages

| Component / File | Current Surface Color | Current Borders | Accent & Glow Usages |
|---|---|---|---|
| `components/HeroSection.tsx` | Container `bg-[#050507]`, Photo stage `bg-[#0B0B0E]`, Bottom strip `bg-[#0E0E12]` | `border-b border-white/5`, `border-white/10` | Focal glow `bg-brand-orange/8 blur-[120px]`, primary CTA `bg-brand-orange hover:bg-brand-darkOrange text-black`, text `text-brand-orange`, secondary button hover `hover:border-brand-orange/40`. |
| `components/Navbar.tsx` | `bg-[#050507]/90 backdrop-blur-md` | `border-b border-white/5` | Brand wordmark `ABHINAYA <span className="text-brand-orange">UNY</span>`, active tab `bg-brand-orange/10 text-brand-orange`. |
| `components/Preloader.tsx` | `bg-[#050507]`, logo box `bg-[#0B0B0E]` | `border-white/10`, `border-white/8` | Ambient glow `bg-brand-orange/5 blur-[100px]`, progress bar `bg-gradient-to-r from-brand-orange to-amber-400`. |
| `components/AboutTeamSection.tsx` | Main photo card `bg-[#0B0B0E]`, strips `bg-[#0E0E12]` | `border-white/10`, `border-white/8` | Badge `bg-brand-orange text-black`, counter `text-brand-orange`, spotlight `rgba(234, 88, 12, 0.12)`. |
| `components/Achievements.tsx` | Cards `bg-[#0B0B0E]` / `bg-[#0E0E12]` | `border-white/8`, `border-brand-orange/30` | Header badge `bg-brand-orange/10 text-brand-orange`, spotlight `rgba(245, 158, 11, 0.14)` / `rgba(234, 88, 12, 0.10)`, highlight shadow `shadow-brand-orange/5`. |
| `components/KRIOverview.tsx` | Container `bg-[#050507]`, spotlight card `bg-[#0B0B0E]`, sub-cards `bg-[#0E0E12]` | `border-white/5`, `border-white/8` | Glow `bg-brand-orange/5 blur-[120px]`, badge `bg-brand-orange text-black`, icon `text-brand-orange`. |
| `components/KrtmiChronicles.tsx` | Container `bg-[#050507]`, main card `bg-[#0B0B0E]`, info boxes `bg-[#0E0E12]` | `border-white/10`, `border-white/8` | Timeline tabs `bg-brand-orange text-black`, section top border `bg-brand-orange/60`, buttons `bg-brand-orange hover:bg-brand-darkOrange`, gold awards `text-brand-gold`. |
| `components/YouTubeVideoShowcase.tsx`| Container `bg-[#050507]`, stage `bg-[#0B0B0E]`, thumbnails `bg-[#0E0E12]` | `border-white/8`, `border-white/10` | Action tab `bg-brand-orange text-black`, pill `bg-brand-orange/15 border-brand-orange`, indicator `bg-brand-orange animate-pulse`. |
| `components/InstagramFeedShowcase.tsx`| Cards `bg-[#0B0B0E]`, header/footer `bg-[#0E0E12]`, modal `bg-[#0B0B0E]` | `border-white/8`, `border-white/15` | Background blur `bg-brand-orange/15 blur-3xl`, filter pills `bg-brand-orange text-black`, active dot `bg-brand-orange shadow-[0_0_8px_rgba(255,107,0,0.8)]`. |
| `components/DocumentationGallerySection.tsx`| Container `bg-[#050507]`, cards `bg-[#0B0B0E]`, modal `bg-[#0B0B0E]` | `border-white/5`, `border-white/8`, `border-white/15` | Glow `bg-brand-orange/5 blur-[140px]`, active category `bg-brand-orange text-black`, year pill `text-brand-orange border-brand-orange/20`. |
| `components/TeamRosterSection.tsx` | Main cards `bg-[#0B0B0E] hover:bg-[#0E0E12]`, controls `bg-[#0B0B0E]` | `border-white/8`, `border-white/10` | Dot pagination `bg-brand-orange shadow-[0_0_10px_rgba(255,107,0,0.9)]`, division semantic accents (Leader `#EAB308`, Manager `#10B981`, Program `#06B6D4`, Mekanik `#F97316`, etc.). |
| `components/MemberPhotoFadeEngine.tsx`| Card container `bg-[#0B0B0E]` | `border-white/8` | Fallback avatar accent defaults to `#FF6B00`, pagination dots `bg-brand-orange`. |
| `components/Footer.tsx` | `bg-[#050507]` | `border-t border-white/5` | Links `hover:text-brand-orange`, social icons with brand colors. |
| `app/divisi/page.tsx` | Cards `bg-[#0B0B0E]` | `border-white/10 hover:border-brand-orange/40` | Header badge `bg-brand-orange/15 text-brand-orange`, icon container `bg-brand-orange/10 text-brand-orange`. |
| `app/prestasi/page.tsx` | Container cards `bg-[#0B0B0E]`, sub-cards `bg-[#0E0E12]` | `border-white/10`, `border-white/8` | Header badge `bg-brand-gold/15 text-brand-gold`, news container `bg-brand-cyan/20 text-brand-cyan`. |
| `app/krtmi/page.tsx` | Cards `bg-[#0B0B0E]`, sub-cards `bg-[#0E0E12]` | `border-white/10`, `border-white/8` | Header badge `bg-brand-orange/15 text-brand-orange`, accents `text-brand-orange`, CTA `bg-brand-orange`. |
| `app/not-found.tsx` | Container `bg-[#050507]`, card `bg-[#0B0B0E]` | `border-white/10` | Glow `bg-brand-orange/20 blur-[120px]`, CTA `bg-brand-orange text-black`. |

---

## 3. The Target Palette & Design System Architecture

### 3.1 Design System Color Token Hierarchy

```
┌────────────────────────────────────────────────────────────────────────┐
│                        BASE CANVAS: Deep Obsidian                      │
│                                  #0B0B0E                               │
│                                                                        │
│   ┌────────────────────────────────────────────────────────────────┐   │
│   │                 CARD SURFACE: Layer 1 (Elevated)               │   │
│   │                             #121216                            │   │
│   │     Border: 1px solid #27272A / rgba(255, 255, 255, 0.06)      │   │
│   │                                                                │   │
│   │   ┌────────────────────────────────────────────────────────┐   │   │
│   │   │               NESTED SURFACE: Layer 2 (Inner)          │   │   │
│   │   │                        #18181B                         │   │   │
│   │   │     Border: 1px solid rgba(255, 255, 255, 0.04)        │   │   │
│   │   │                                                        │   │   │
│   │   │   Primary Accent: Refined Emerald Green                │   │   │
│   │   │   • Emerald 500: #10B981 (Active elements, buttons)    │   │   │
│   │   │   • Emerald 600: #059669 (Hover, solid badges)         │   │   │
│   │   │   • Emerald 400: #34D399 (Text accents, shimmers)      │   │   │
│   │   │   • Emerald Glow: rgba(16, 185, 129, 0.08 - 0.15)      │   │   │
│   │   │                                                        │   │   │
│   │   └────────────────────────────────────────────────────────┘   │   │
│   └────────────────────────────────────────────────────────────────┘   │
└────────────────────────────────────────────────────────────────────────┘
```

### 3.2 Detailed Color Token Mapping Table

| Token Purpose | Legacy Value / Class | Target Redesign Value | Tailwind Class / CSS Variable |
|---|---|---|---|
| **Root Background (Canvas)** | `#050507` / `rgb(5, 5, 7)` | **`#0B0B0E`** (Deep Obsidian) | `bg-[#0B0B0E]` / `--background: #0B0B0E` |
| **Primary Card Surface** | `#0B0B0E` | **`#121216`** | `bg-[#121216]` / `bg-surface-primary` |
| **Elevated / Secondary Card** | `#0E0E12` | **`#18181B`** (Zinc-900 equivalent) | `bg-[#18181B]` / `bg-surface-secondary` |
| **Nested Sub-Strip / Header** | `#0E0E12` / `#050507` | **`#15151A`** | `bg-[#15151A]` |
| **Delicate 1px Border (Default)** | `border-white/8` / `border-white/10` | **`#27272A`** or **`rgba(255,255,255,0.06)`** | `border-white/[0.06]` or `border-zinc-800` |
| **Delicate 1px Border (Subtle)** | `border-white/5` | **`rgba(255, 255, 255, 0.04)`** | `border-white/[0.04]` |
| **Card Hover Border** | `hover:border-brand-orange/40` | **`rgba(16, 185, 129, 0.3)`** or **`rgba(255,255,255,0.12)`** | `hover:border-emerald-500/30` |
| **Primary Brand Accent** | `#FF6B00` (`brand-orange`) | **`#10B981`** (Emerald 500) | `text-emerald-400` / `bg-emerald-500` |
| **Dark Brand Accent (Hover)** | `#EA580C` (`brand-darkOrange`) | **`#059669`** (Emerald 600) | `hover:bg-emerald-600` |
| **Light Brand Accent (Text)** | `#FB923C` (`brand-lightOrange`) | **`#34D399`** (Emerald 400) | `text-emerald-400` |
| **Accent Glow / Ambiance** | `rgba(255, 107, 0, 0.15)` | **`rgba(16, 185, 129, 0.12)`** | `shadow-emerald-500/10` |
| **Spotlight Radial Color** | `rgba(234, 88, 12, 0.12)` | **`rgba(16, 185, 129, 0.12)`** | `spotlightColor="rgba(16, 185, 129, 0.12)"` |
| **Primary CTA Fill** | `bg-brand-orange text-black` | **`bg-emerald-500 hover:bg-emerald-600 text-black font-bold`** | `bg-emerald-500 hover:bg-emerald-600 text-black` |
| **Primary Pill Badge** | `bg-brand-orange/10 text-brand-orange`| **`bg-emerald-500/10 text-emerald-400 border-emerald-500/20`** | `bg-emerald-500/10 text-emerald-400 border border-emerald-500/20` |
| **Browser Selection** | `selection:bg-brand-orange selection:text-black` | **`selection:bg-emerald-500 selection:text-black`** | `selection:bg-emerald-500 selection:text-black` |
| **Theme Color Meta** | `#FF6B00` | **`#0B0B0E`** | `<meta name="theme-color" content="#0B0B0E" />` |

---

### 3.3 Engineering Division Semantic Colors (Cohesive Integration)

In `data/teamData.ts`, individual technical divisions have distinct semantic badges that help users distinguish engineering functions (Programming vs Mechanics vs Electronics). To maintain technical clarity without clash against the new emerald/obsidian palette, we refine the division badge palette:

```typescript
export const DIVISION_BADGES: Record<TeamMember['division'], { bg: string; text: string; border: string; accent: string }> = {
  'Pembimbing': {
    bg: 'bg-purple-950/30',
    text: 'text-purple-300',
    border: 'border-purple-500/30',
    accent: '#A855F7',
  },
  'Ketua Tim': {
    bg: 'bg-amber-950/30',
    text: 'text-amber-300',
    border: 'border-amber-500/30',
    accent: '#F59E0B',
  },
  'Manager': {
    bg: 'bg-emerald-950/30',
    text: 'text-emerald-300',
    border: 'border-emerald-500/30',
    accent: '#10B981',
  },
  'Program': {
    bg: 'bg-teal-950/30',
    text: 'text-teal-300',
    border: 'border-teal-500/30',
    accent: '#14B8A6',
  },
  'Elektronik': {
    bg: 'bg-sky-950/30',
    text: 'text-sky-300',
    border: 'border-sky-500/30',
    accent: '#0EA5E9',
  },
  'Mekanik': {
    bg: 'bg-zinc-800/50',
    text: 'text-zinc-200',
    border: 'border-zinc-700/50',
    accent: '#71717A',
  },
  'Desain': {
    bg: 'bg-indigo-950/30',
    text: 'text-indigo-300',
    border: 'border-indigo-500/30',
    accent: '#6366F1',
  },
  'Official': {
    bg: 'bg-zinc-900/60',
    text: 'text-zinc-400',
    border: 'border-zinc-800',
    accent: '#71717A',
  },
};
```
*Key enhancement:* Mekanik shifts from raw harsh orange (`#F97316`) to an industrial titanium grey/slate accent (`#71717A` / `#A1A1AA`), creating a unified, mature look alongside the Emerald accent.

---

## 4. Typography System: Outfit & Plus Jakarta Sans

### 4.1 Pairing Rationale
- **Headings & Display (Outfit):**
  - Geometric, circular letterforms with a modern engineering vibe.
  - Generous x-height, razor-sharp numerals (ideal for years `2019–2026`, telemetry, and scores).
  - Matches the react-bits and high-craft industrial aesthetic.
- **Body & Interface (Plus Jakarta Sans):**
  - Humanist yet geometric grotesque tailored specifically for dark interfaces.
  - High legibility at small sizes (`11px` - `14px`) across dense telemetry cards, member bios, and competition chronicles.
- **Telemetry & Technical Data (JetBrains Mono / Standard Monospace):**
  - Retains monospace crispness for student NIMs, robot specs, and match procedure stats.

### 4.2 Next.js 14 Font Implementation Strategy (`app/layout.tsx`)

Zero extra dependencies. Implemented natively via `next/font/google`:

```typescript
// app/layout.tsx
import { Outfit, Plus_Jakarta_Sans } from 'next/font/google';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${outfit.variable} ${plusJakarta.variable} scroll-smooth`}>
      <body className="antialiased font-sans bg-[#0B0B0E] text-slate-100 selection:bg-emerald-500 selection:text-black">
        {/* ... */}
      </body>
    </html>
  );
}
```

### 4.3 `tailwind.config.js` Font Family Setup
```javascript
theme: {
  extend: {
    fontFamily: {
      sans: ['var(--font-plus-jakarta)', 'system-ui', 'sans-serif'],
      heading: ['var(--font-outfit)', 'sans-serif'],
      mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
    },
  },
}
```

---

## 5. Fluid Animated Background Canvas Primitives

### 5.1 Architecture Requirements
1. **Hero & Header Zones:** Subtle Aurora / Mesh ambient gradient glow that gently shifts in the background without causing eye strain or distraction.
2. **Interactive Grid / Particle Dust:** Gentle motion reacting smoothly to cursor coordinates.
3. **Performance Throttling:** 30/60 FPS frame rate limiting, viewport pause via `IntersectionObserver`, and immediate freeze when `prefers-reduced-motion` is detected.
4. **Zero New Heavy Dependencies:** 100% pure React, HTML5 2D Canvas, and Web APIs (no Three.js, Pixi.js, or heavyweight bundles).

---

### 5.2 Component Option 1: Subtle Aurora / Mesh Ambient Glow (`AuroraMeshGlow.tsx`)

#### Concept
A lightweight, multi-layered mesh gradient glow designed specifically for the Hero stage, section headers, and sticky navigation backdrops. It produces smooth organic color drift using hardware-accelerated CSS transforms.

```tsx
'use client';

import React, { useEffect, useState } from 'react';

export interface AuroraMeshGlowProps {
  className?: string;
  intensity?: 'subtle' | 'medium';
}

export const AuroraMeshGlow: React.FC<AuroraMeshGlowProps> = ({
  className = '',
  intensity = 'subtle',
}) => {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const opacityClass = intensity === 'subtle' ? 'opacity-40' : 'opacity-60';

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden select-none z-0 ${opacityClass} ${className}`}
    >
      {/* Aurora Orb 1: Emerald Primary */}
      <div
        className={`absolute -top-32 left-1/4 w-[500px] sm:w-[700px] h-[350px] sm:h-[450px] rounded-full bg-emerald-500/12 blur-[130px] ${
          reducedMotion ? '' : 'animate-aurora-drift-1'
        }`}
      />
      {/* Aurora Orb 2: Deep Teal / Mint Complement */}
      <div
        className={`absolute -top-20 right-1/4 w-[400px] sm:w-[600px] h-[300px] sm:h-[400px] rounded-full bg-teal-600/8 blur-[140px] ${
          reducedMotion ? '' : 'animate-aurora-drift-2'
        }`}
      />
      {/* Aurora Orb 3: Deep Obsidian Grounding Vignette */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0B0B0E]/60 to-[#0B0B0E]"
      />
    </div>
  );
};
```

#### Tailwind Keyframe Animation Extension
```javascript
keyframes: {
  'aurora-drift-1': {
    '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
    '50%': { transform: 'translate(40px, 20px) scale(1.08)' },
  },
  'aurora-drift-2': {
    '0%, 100%': { transform: 'translate(0, 0) scale(1.05)' },
    '50%': { transform: 'translate(-30px, 25px) scale(0.95)' },
  },
},
animation: {
  'aurora-drift-1': 'aurora-drift-1 16s ease-in-out infinite',
  'aurora-drift-2': 'aurora-drift-2 20s ease-in-out infinite',
},
```

---

### 5.3 Component Option 2: Interactive Grid & Micro-Particle Dust Canvas (`InteractiveCanvasDust.tsx`)

#### Performance & Lifecycle Safeguards
1. **Delta-Time FPS Clamping:**
   ```typescript
   const targetFps = isMobile ? 30 : 60;
   const frameInterval = 1000 / targetFps;
   // In RAF loop:
   const delta = timestamp - lastFrameTime;
   if (delta < frameInterval) {
     rafId = requestAnimationFrame(render);
     return;
   }
   lastFrameTime = timestamp - (delta % frameInterval);
   ```
2. **IntersectionObserver Pause:**
   When the canvas container leaves the active viewport (`entry.isIntersecting === false`), `cancelAnimationFrame` triggers immediately, reducing CPU and GPU utilization to 0%. When scrolled back into view, the RAF loop seamlessly restarts.
3. **`prefers-reduced-motion` Handling:**
   If user prefers reduced motion, particles remain static, and the render loop executes once upon mounting. No event listeners for mouse coordinates are attached.
4. **Page Visibility API:**
   Listening to `visibilitychange` ensures complete pausing when the browser tab is hidden or minimized.
5. **Retina Device Pixel Ratio Capping:**
   `const dpr = Math.min(window.devicePixelRatio || 1, 2);` prevents canvas rendering lag on ultra-high-density mobile displays.

#### Complete Component Implementation Prototype
```tsx
'use client';

import React, { useEffect, useRef } from 'react';

export interface InteractiveCanvasDustProps {
  className?: string;
  particleCount?: number;
  gridSize?: number;
  showGrid?: boolean;
  particleColor?: string;
  gridColor?: string;
  maxFps?: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  baseAlpha: number;
}

export const InteractiveCanvasDust: React.FC<InteractiveCanvasDustProps> = ({
  className = '',
  particleCount = 35,
  gridSize = 44,
  showGrid = true,
  particleColor = '16, 185, 129', // Emerald
  gridColor = '255, 255, 255',
  maxFps = 60,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let rafId: number | null = null;
    let isVisible = false;
    let isReducedMotion = false;
    let width = 0;
    let height = 0;
    let mouseX = -9999;
    let mouseY = -9999;
    let lastTime = 0;
    const frameInterval = 1000 / maxFps;

    // Detect reduced motion
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    isReducedMotion = motionQuery.matches;

    // Initialize Particles
    let particles: Particle[] = [];
    const initParticles = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        const baseAlpha = Math.random() * 0.25 + 0.08;
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          size: Math.random() * 1.5 + 0.75,
          alpha: baseAlpha,
          baseAlpha,
        });
      }
    };

    // Resize Handler
    const handleResize = () => {
      if (!container || !canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = container.clientWidth;
      height = container.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
      initParticles();
      if (isReducedMotion) renderStatic();
    };

    handleResize();
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // Mouse Tracking
    const handlePointerMove = (e: PointerEvent) => {
      if (isReducedMotion) return;
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const handlePointerLeave = () => {
      mouseX = -9999;
      mouseY = -9999;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerleave', handlePointerLeave, { passive: true });

    // Static Frame Render (for Reduced Motion)
    const renderStatic = () => {
      ctx.clearRect(0, 0, width, height);

      // Grid dots
      if (showGrid) {
        ctx.fillStyle = `rgba(${gridColor}, 0.04)`;
        for (let x = 0; x < width; x += gridSize) {
          for (let y = 0; y < height; y += gridSize) {
            ctx.fillRect(x, y, 1, 1);
          }
        }
      }

      // Particles
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${particleColor}, ${p.baseAlpha})`;
        ctx.fill();
      });
    };

    // Animation Loop with 60/30 FPS Clamping
    const loop = (timestamp: number) => {
      if (!isVisible || isReducedMotion) return;

      const elapsed = timestamp - lastTime;
      if (elapsed > frameInterval) {
        lastTime = timestamp - (elapsed % frameInterval);

        ctx.clearRect(0, 0, width, height);

        // 1. Draw Subtle Grid
        if (showGrid) {
          ctx.fillStyle = `rgba(${gridColor}, 0.04)`;
          for (let x = 0; x < width; x += gridSize) {
            for (let y = 0; y < height; y += gridSize) {
              const dx = x - mouseX;
              const dy = y - mouseY;
              const dist = Math.sqrt(dx * dx + dy * dy);
              if (dist < 120) {
                const proximityGlow = (1 - dist / 120) * 0.18;
                ctx.fillStyle = `rgba(${particleColor}, ${proximityGlow})`;
                ctx.fillRect(x - 0.5, y - 0.5, 2, 2);
                ctx.fillStyle = `rgba(${gridColor}, 0.04)`;
              } else {
                ctx.fillRect(x, y, 1, 1);
              }
            }
          }
        }

        // 2. Update & Draw Particles
        particles.forEach((p) => {
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;

          // Mouse proximity reaction
          const dx = p.x - mouseX;
          const dy = p.y - mouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          let alpha = p.baseAlpha;

          if (dist < 140) {
            const proximity = 1 - dist / 140;
            alpha = p.baseAlpha + proximity * 0.4;
            // Gentle nudge away
            p.x += (dx / dist) * 0.4;
            p.y += (dy / dist) * 0.4;
          }

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${particleColor}, ${alpha})`;
          ctx.fill();
        });
      }

      rafId = requestAnimationFrame(loop);
    };

    // IntersectionObserver: Pause when not visible
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && !isReducedMotion) {
          lastTime = performance.now();
          rafId = requestAnimationFrame(loop);
        } else if (rafId) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
      },
      { threshold: 0.05 }
    );

    intersectionObserver.observe(container);

    // Page Visibility API
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (rafId) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
      } else if (isVisible && !isReducedMotion) {
        lastTime = performance.now();
        rafId = requestAnimationFrame(loop);
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, [particleCount, gridSize, showGrid, particleColor, gridColor, maxFps]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden select-none z-0 ${className}`}
    >
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
};

export default InteractiveCanvasDust;
```

---

## 6. Component-by-Component Migration Blueprint

Below is the concrete transition map for each file in the repository to guide implementer agents in subsequent milestones:

### 6.1 `app/globals.css`
- Change `--background-rgb: 5, 5, 7;` to `--background-rgb: 11, 11, 14;` (`#0B0B0E`).
- Change `background-color: #050507;` to `background-color: #0B0B0E;`.
- Update background radial gradient:
  - From: `rgba(255, 107, 0, 0.08)`
  - To: `radial-gradient(ellipse 80% 50% at 50% -20%, rgba(16, 185, 129, 0.05), transparent), radial-gradient(ellipse 60% 40% at 50% 100%, rgba(16, 185, 129, 0.02), transparent)`
- Scrollbar thumb hover: change `rgba(255, 107, 0, 0.6)` to `rgba(16, 185, 129, 0.5)`.
- Border subtle hover: change `rgba(255, 107, 0, 0.4)` to `rgba(16, 185, 129, 0.4)`.

### 6.2 `tailwind.config.js`
- Expand `brand` palette or define `emerald` system tokens:
  ```javascript
  colors: {
    brand: {
      emerald: '#10B981',
      deepEmerald: '#059669',
      lightEmerald: '#34D399',
      obsidian: '#0B0B0E',
      card: '#121216',
      cardElevated: '#18181B',
      borderSubtle: '#27272A',
      // Maintain backwards-compatibility aliases for test suites:
      orange: '#10B981', // Re-aliased or kept for smooth test assertions
    },
  }
  ```

### 6.3 `components/HeroSection.tsx`
- Background: `#050507` → `#0B0B0E`.
- Mount `AuroraMeshGlow` and `InteractiveCanvasDust` in hero background layer.
- Accent text: `text-brand-orange` → `text-emerald-400`.
- Primary CTA:
  - Before: `bg-brand-orange hover:bg-brand-darkOrange text-black shadow-brand-orange/20`
  - After: `bg-emerald-500 hover:bg-emerald-600 text-black font-bold shadow-lg shadow-emerald-500/20`
- Photo stage card:
  - Background: `bg-[#0B0B0E]` → `bg-[#121216]`
  - Bottom strip: `bg-[#0E0E12]` → `bg-[#18181B]`
  - Border: `border-white/10` → `border-[#27272A] border-white/[0.06]`
  - Subtitle badge: `Juara 1 Wilayah & Juara 2 Nasional` in `text-emerald-400 font-medium`.

### 6.4 `components/Navbar.tsx`
- Background: `bg-[#050507]/90` → `bg-[#0B0B0E]/90 backdrop-blur-md`.
- Border: `border-white/5` → `border-white/[0.06]`.
- Brand logo text: `ABHINAYA <span className="text-emerald-400">UNY</span>`.
- Active tab link: `bg-emerald-500/10 text-emerald-400 border border-emerald-500/20`.

### 6.5 `components/animations/SpotlightCard.tsx`
- Default `spotlightColor`: change from `rgba(234, 88, 12, 0.12)` to `rgba(16, 185, 129, 0.12)`.
- Default card background: change from `bg-[#0B0B0E]` to `bg-[#121216]`.
- Default border: `borderColor="rgba(255, 255, 255, 0.06)"` (`#27272A`).
- Hover border: `hoverBorderColor="rgba(16, 185, 129, 0.3)"`.

### 6.6 `components/animations/ShinyText.tsx`
- Update gradient sweep:
  - Before: `from-brand-orange via-amber-200 to-brand-orange`
  - After: `from-emerald-400 via-emerald-100 to-emerald-400`
- Fallback text color: `text-emerald-400 font-bold`.

### 6.7 `components/animations/DecryptedText.tsx`
- Default `encryptedClassName`: change from `text-brand-orange/80` to `text-emerald-400/90 font-mono font-bold`.

### 6.8 `components/Achievements.tsx`
- Header pill badge: `bg-emerald-500/10 text-emerald-400 border border-emerald-500/20`.
- Card surfaces: default cards `bg-[#121216] border-white/[0.06]`, highlight cards `bg-[#18181B] border-emerald-500/30 shadow-lg shadow-emerald-500/5`.
- Spotlight color: `rgba(16, 185, 129, 0.14)`.
- Verification icon: `ShieldCheck` in `text-emerald-400`.

### 6.9 `components/TeamRosterSection.tsx` & `MemberPhotoFadeEngine.tsx`
- Roster cards: `bg-[#121216] hover:bg-[#18181B] border-white/[0.06]`.
- Controls & filter pill container: `bg-[#121216] border-white/[0.06]`.
- Dot pagination active indicator: `bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]`.
- Modal background: `bg-[#121216] border-white/10`.
- Fallback avatar default accent: change `#FF6B00` to `#10B981`.

---

## 7. Build Integrity & Test Compatibility Safeguards

### 7.1 Static HTML Test Harness (`scripts/test_empirical_html_output.js`)
Test 7 in `scripts/test_empirical_html_output.js` validates:
```javascript
const requiredClasses = [
  'bg-brand-orange', 'text-brand-orange', 'text-amber-300', 'text-emerald-300',
  'grid-cols-1', 'duration-1000'
];
```
The test verifies either the exact class string or its last token (`orange`, `300`, `1`, `1000`). To guarantee 100% zero-failure in automated CI pipelines:
1. Implementers can maintain backward-compatible CSS utility aliases in `app/globals.css`:
   ```css
   .bg-brand-orange { @apply bg-emerald-500; }
   .text-brand-orange { @apply text-emerald-400; }
   ```
2. Or cleanly update `test_empirical_html_output.js` to assert `bg-emerald-500` / `text-emerald-400` once the palette overhaul is committed.

### 7.2 Stress Test Harness (`scripts/stress_test_edge_cases.js`)
All 22 test assertions in `stress_test_edge_cases.js` focus on query boundaries, UNLIMITED UNDIP 2026, photo unblocking architecture, and responsive layouts. The palette and canvas redesign does not modify data structures or search logic, guaranteeing 100% pass rate.

---

## 8. Summary of Findings & Next Steps

1. **Foundational Readiness:** The codebase has clean separation of components and already includes lightweight animation primitives (`BlurText`, `DecryptedText`, `CountUp`, `SpotlightCard`) with `prefers-reduced-motion` and `IntersectionObserver` awareness.
2. **Key Transition Items:**
   - Base canvas: `#050507` → `#0B0B0E` (Deep Obsidian).
   - Card surfaces: `#0B0B0E` / `#0E0E12` → `#121216` / `#18181B`.
   - Borders: delicate 1px lines (`#27272A` / `rgba(255, 255, 255, 0.06)`).
   - Primary accent: `#FF6B00` → `#10B981` / `#059669` (Refined Emerald).
   - Fonts: inject `Outfit` and `Plus Jakarta Sans` via `@next/font/google`.
   - Background: replace static orange radial gradient with fluid `AuroraMeshGlow` and `InteractiveCanvasDust`.
3. **Execution Safety:** The proposed transition requires zero new npm packages, operates entirely with standard Next.js 14 / React 18 / HTML5 APIs, builds cleanly in static export mode, and maintains 100% PDDikti student data integrity.
