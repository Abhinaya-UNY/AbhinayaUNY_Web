# Handoff Report — Reviewer 1 (UI, Media & Responsive Reviewer)

**Review Target:** Abhinaya UNY Robotics Portal Refinement  
**Role:** Reviewer 1 (UI, Media, Responsive & Static Build Gatekeeper)  
**Date:** 2026-08-23T07:41:00+07:00  
**Status:** Complete  
**Gate Verdict:** 🛑 **REQUEST_CHANGES**

---

## 1. Observation

### 1.1 Direct File Observations
- `components/HeroSection.tsx:27-67`:
  ```tsx
  <section className="relative w-full min-h-[48vh] sm:min-h-[60vh] md:min-h-[72vh] lg:min-h-[82vh] aspect-[16/10] sm:aspect-[16/9] lg:aspect-auto flex flex-col items-center justify-start overflow-hidden px-4 pt-3 sm:pt-6 pb-2">
    <div className="absolute inset-0 bg-cover bg-[center_22%] sm:bg-center bg-no-repeat sm:bg-fixed brightness-[0.98] contrast-105 will-change-transform" style={{ backgroundImage: `url('${basePath}/assets/hero_abhinaya.jpg')` }} />
    ...
  </section>
  ```
- `components/HeroSection.tsx:70-88`:
  ```tsx
  <div className="relative z-20 w-full py-4 sm:py-6 px-4 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-5 bg-[#070503] border-b border-[#1A120B]">
    <a href="#about-tim" onClick={(e) => scrollToSection(e, 'about-tim')} className="...">
      <Flame className="w-4 h-4 text-black fill-black" />
      <span>EXPLORE TEAM &amp; GUIDEBOOKS</span>
      <ArrowRight className="w-4 h-4 text-black" />
    </a>
    <a href="#video-aksi" onClick={(e) => scrollToSection(e, 'video-aksi')} className="...">
      <Play className="w-4 h-4 text-brand-orange fill-brand-orange" />
      <span>WATCH ROBOT IN ACTION</span>
    </a>
  </div>
  ```
- `components/YouTubeVideoShowcase.tsx:19-44`:
  Configures official video ID `PmxwdrhpxKg` (16:9 widescreen) and Shorts ID `wLusNVfFFHA` (9:16 vertical), with channel `https://www.youtube.com/@AbhinayaUNY` and Instagram `https://www.instagram.com/abhinaya.uny/`.
- `components/TeamRosterSection.tsx:71-84`:
  ```tsx
  const filteredMembers = ALL_ROSTER_MEMBERS.filter((member) => {
    const matchesDivision =
      selectedDivision === 'All' ? true : member.division === selectedDivision;

    const matchesSearch =
      searchQuery.trim() === '' ||
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.nim.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.studyProgram.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.specialization.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesDivision && matchesSearch;
  });
  ```
- `data/teamData.ts:9`:
  `nim?: string;` (declared optional in `TeamMember` interface).

### 1.2 Tool Commands & Verbatim Execution Results
- `python scripts/test_e2e_suite.py --tier 1`
  - Exit code: `0`
  - Output: `Ran 35 tests in 0.584s -> OK (35/35 PASS)`
- `python scripts/test_e2e_suite.py --tier 2`
  - Exit code: `0`
  - Output: `Ran 5 tests in 0.524s -> OK (5/5 PASS)`
- `python scripts/test_e2e_suite.py`
  - Exit code: `0`
  - Output: `Ran 55 tests in 1.468s -> OK (55/55 PASS)`
- `npm.cmd run build`
  - Exit code: `1`
  - Verbatim error output:
    ```
    > abhinaya-uny-web@1.0.0 build
    > next build

      ▲ Next.js 14.2.35

       Creating an optimized production build ...
     ✓ Compiled successfully
       Linting and checking validity of types ...
    Failed to compile.

    ./components/TeamRosterSection.tsx:79:7
    Type error: 'member.nim' is possibly 'undefined'.

      77 |       member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      78 |       member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    > 79 |       member.nim.toLowerCase().includes(searchQuery.toLowerCase()) ||
         |       ^
      80 |       member.studyProgram.toLowerCase().includes(searchQuery.toLowerCase()) ||
      81 |       member.specialization.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
      82 |
    Next.js build worker exited with code: 1 and signal: null
    ```

---

## 2. Logic Chain

1. **Premise 1 (Visual Placement):** `HeroSection.tsx` mounts the hero photo stage inside a `<section>` container (lines 27–67) and renders the CTA button stage in a subsequent, independent `<div>` container (lines 70–88). Therefore, CTA buttons are strictly outside and below the photo across all screen widths.
2. **Premise 2 (Responsive Ratios):** `HeroSection.tsx` specifies `aspect-[16/10]`, `min-h-[48vh]`, `bg-[center_22%]`, and `bg-cover`. On mobile screens (<=640px), the panoramic ratio preserves the width of the team photo while keeping trophies and flags visible in the upper 22% viewport anchor without side cropping.
3. **Premise 3 (Media Embeds):** `YouTubeVideoShowcase.tsx` includes official video IDs `PmxwdrhpxKg` and `wLusNVfFFHA`, dual-mode tabs, privacy-enhanced iframes (`youtube-nocookie.com`), dynamic thumbnail fallbacks, and a responsive modal dialog.
4. **Premise 4 (Team Roster & Divisions):** `TeamRosterSection.tsx` and `teamData.ts` accurately model 14 verified student members + Dosen Pembimbing across 5 official divisions with search filtering and detail modal views.
5. **Premise 5 (Build Gate Requirement):** `ORIGINAL_REQUEST.md` §Verification explicitly mandates: `"npm run build succeeds with zero TypeScript, lint, or static export errors."`
6. **Premise 6 (Type Safety Inconsistency):** In `data/teamData.ts:9`, `nim` is typed as `nim?: string;` (optional). In `TeamRosterSection.tsx:79`, `member.nim.toLowerCase()` assumes `nim` is unconditionally present. Under TypeScript `strict: true` during `next build`, this causes a fatal type error (`'member.nim' is possibly 'undefined'`), halting compilation with exit code 1.
7. **Conclusion:** Because the production build fails with exit code 1, the implementation cannot be exported statically or deployed to GitHub Pages. Thus, the gate verdict must be `REQUEST_CHANGES`.

---

## 3. Caveats

- **Scope of Review:** Reviewer 1 focused on UI layout, media embedding, responsive behavior, roster display, and build compilation. Deep verification of offline CLI tooling (`manager_tool.py`) data insertion workflows was verified through the multi-tier test suite.
- **Assumptions:** Assumed Node.js v20+ and Windows PowerShell execution environment where `npm.cmd` is required.
- **Alternative Interpretations Considered:** Considered whether `nim` should be required in `data/teamData.ts` vs optional in `TeamMember`. Because senior advisors/alumni might not have active student NIMs (e.g., `Senior Member` or `NIDN`), making `nim` optional in `teamData.ts` is reasonable, but `TeamRosterSection.tsx` must safely guard access with `(member.nim?.toLowerCase() || '')`.

---

## 4. Conclusion

- **Gate Verdict:** 🛑 **REQUEST_CHANGES**
- **Action Required by Implementer:**
  Update `components/TeamRosterSection.tsx` line 79 to safely guard against `undefined`:
  ```typescript
  (member.nim?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
  ```
  Then re-run `npm.cmd run build` to verify static build success (exit code 0).

---

## 5. Verification Method

### 5.1 Commands to Verify the Fix
```powershell
# 1. Run Tier 1 Feature Tests
python scripts/test_e2e_suite.py --tier 1

# 2. Run Tier 2 Boundary Tests
python scripts/test_e2e_suite.py --tier 2

# 3. Run Static Production Build
npm.cmd run build
```

### 5.2 Invalidation Conditions
- If `npm.cmd run build` fails with any TypeScript or static export errors, the fix remains invalid.
- If CTA buttons in `HeroSection.tsx` are moved back inside `<section>` overlapping the background image, the review must be invalidated.
