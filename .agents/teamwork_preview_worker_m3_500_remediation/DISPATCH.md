# DISPATCH

## Objective
Migrate 500 error page to pure App Router `app/500/page.tsx`, refactor `Custom500Content.tsx` to Emerald Glow (#10B981), and eliminate `pages/` directory completely.

## Instructions
1. Working Directory: D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web\.agents\teamwork_preview_worker_m3_500_remediation
2. Read ORIGINAL_REQUEST.md at: D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web\.agents\ORIGINAL_REQUEST.md
3. Read Final Reviewer Report at: D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web\.agents\teamwork_preview_reviewer_m3_final\handoff.md
4. Mandatory Integrity Warning:
> DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.
5. Implementation Tasks:
   a. Create `app/500/page.tsx`:
      ```tsx
      import React from 'react';
      import { Metadata } from 'next';
      import Custom500Content from '@/components/Custom500Content';

      export const metadata: Metadata = {
        title: '500 — Anomali Sistem Internal | Abhinaya UNY Robotics',
        description: 'Terjadi anomali pemrosesan data internal pada sistem telemetri Abhinaya UNY. Protokol failsafe aktif.',
      };

      export default function Page500() {
        return <Custom500Content />;
      }
      ```
   b. Refactor `components/Custom500Content.tsx`:
      - Replace all occurrences of `brand-orange` and `brand-darkOrange` with Emerald Glow styling: `emerald-500`, `emerald-400`, `bg-emerald-500/10`, `border-emerald-500/30`, `shadow-emerald-glow`, `text-emerald-400`, `text-emerald-500`.
      - Maintain Deep Obsidian (`#0B0B0E`) background canvas and `#121216` / `#18181B` card surfaces.
   c. Remove `pages/500.tsx` and `pages/_app.tsx` and delete the `pages/` directory completely.
   d. Ensure `scripts/postbuild.js` copies `out/500/index.html` to `out/500.html`.
6. Verification Commands:
   - Run `npm.cmd run build`: Confirm exit code 0, output displays `Route (app) ○ /500` and NO `Route (pages)`. Confirm `out/500.html` and `out/500/index.html` are created.
   - Run `node tests/e2e/run_all.js`: Confirm 57/57 tests pass.
   - Run `python scripts/test_challenger1_nim_faculty_oracle.py`: Confirm 4/4 tests pass.
   - Verify `Test-Path "pages"` returns `False`.
   - Verify zero occurrences of `brand-orange` in `components/Custom500Content.tsx`.

## 2026-09-05T22:38:08Z
You are the Worker for pure App Router 500 error page migration. Read DISPATCH.md at D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web\.agents\teamwork_preview_worker_m3_500_remediation\DISPATCH.md. Create app/500/page.tsx, refactor components/Custom500Content.tsx to Emerald Glow (#10B981), and delete the pages/ directory completely. Execute `npm.cmd run build` and verify `Route (app) /500` is generated with zero `Route (pages)`. Run tests to ensure 100% pass. Write your handoff.md, then notify your parent via send_message.
