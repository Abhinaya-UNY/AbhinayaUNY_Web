# SPECIFICATION MINING REPORT: BASELINE SPECIFICATIONS, DATA INVARIANTS & TEST ASSERTIONS
**Repository:** `AbhinayaUNY_Web`  
**Agent:** `teamwork_preview_spec_miner_m0_tests`  
**Date:** 2026-09-06  
**Status:** COMPLETE & EMPIRICALLY VALIDATED  

---

## 1. Executive Summary & Specification Mining Mandate

This report establishes the authoritative specification, data ground truth, and empirical test assertions for the redesign of the official **Abhinaya UNY Robotics Portal** (`https://abhinaya-uny.github.io/AbhinayaUNY_Web/`).

During the redesign (transitioning from high-contrast orange to an eye-friendly **Deep Obsidian `#0B0B0E` / `#121216`** canvas with **Emerald Green `#10B981`** subtle glow accents and **react-bits** interactive motion design), zero regression must occur against existing test harnesses, verified academic credentials, tournament chronologies, or static export requirements.

All invariants below have been mined from authoritative test scripts (`scripts/test_empirical_html_output.js`, `scripts/stress_test_edge_cases.js`, `scripts/test_reactbits_suite.js`, `scripts/run_e2e_tests.js`, `scripts/verify_11_static_pages.js`, `scripts/challenger1_dom_and_nim_test.js`, `scripts/test_challenger2_m3_stress_oracle.js`, `scripts/test_challenger1_nim_faculty_oracle.py`), data models (`data/teamData.ts`, `data/krtmiData.ts`, `data/newsData.ts`), and documentation (`ORIGINAL_REQUEST.md`, `STRUKTUR_TIM_ABHINAYA.md`, `ARSIP_ANALISIS_FOTO_DAN_DATA_ANGGOTA.md`).

---

## Features Discovered

| # | Category | Feature | Description | Inputs | Outputs | Error Behavior | Discovered Via |
|---|----------|---------|-------------|--------|---------|----------------|----------------|
| 1 | Static Build | Static Export 11 Targets | Generates exactly 11 static files/pages in `out/` with min size > 500 B | `npm run build` (`next build && next export`) | 11 static target files in `out/` | Exit code 1 if missing or < 500 B | `scripts/verify_11_static_pages.js`, `scripts/test_empirical_html_output.js` |
| 2 | Static Build | Asset Link Integrity | All `src` and `href` internal paths resolve to files in `out/` under `/AbhinayaUNY_Web` base path | Static HTML pages in `out/` | 0 broken internal links | Throws assertion failure on broken asset | `scripts/test_empirical_html_output.js` (Test 6) |
| 3 | Data Invariant | 34 Student PDDikti NIMs | All team member NIMs strictly follow UNY 11-digit hierarchical format (`Angkatan + Prodi + Seq`) | `data/teamData.ts`, PDDikti registry | Exact 11-digit strings matching student records | Throws on fake/placeholder strings | `scripts/test_challenger1_nim_faculty_oracle.py`, `ORIGINAL_REQUEST.md` |
| 4 | Data Invariant | 2 Advisor NIPs | 18-digit Indonesian civil service NIP for official robotics advisors | `data/teamData.ts`, UNY Staff Directory | Exact NIP strings with formatting | Throws on missing NIP | `scripts/test_challenger1_nim_faculty_oracle.py`, `data/teamData.ts` |
| 5 | Leadership | Leaders Hall of Fame (6) | Chronological team leaders 2020–2025 with portraits, badge `Ketua Tim`, and bio | `LEADERS_HALL_OF_FAME` dataset | Rendered leadership cards in DOM | Assertion error if any of the 6 names missing | `scripts/test_empirical_html_output.js` (Test 2), `tests/e2e/test_r2_leaders.js` |
| 6 | Leadership | Managers Showcase (4) | Chronological team managers 2020–2025 with dual-management support | `MANAGERS_SHOWCASE` dataset | Rendered manager cards with role badge | Assertion error if any of the 4 names missing | `scripts/test_empirical_html_output.js` (Test 3), `tests/e2e/test_r2_managers.js` |
| 7 | Active Squad | Active Squad 2025 (15) | Active squad members categorized by technical division (Program, Elektronik, Mekanik) | `ACTIVE_TECHNICAL_SQUAD` dataset | Division cards with name, NIM, role, and photo | Fails if division or student NIM missing | `scripts/test_empirical_html_output.js` (Test 4), `tests/e2e/test_r3_technical_squad.js` |
| 8 | Alumni Archive | Generation Explorer (6 Eras) | Generation filter for 2020, 2021, 2022, 2023, 2024, 2025 rosters | Year button/tab click | Filtered contingent roster & theme info | Renders default/safe state if empty | `scripts/test_empirical_html_output.js` (Test 5), `tests/e2e/test_r4_alumni_explorer.js` |
| 9 | UI / Interaction | Crossfade Photo Engine | Automated/manual slideshow for member cards with multi-photo arrays | Image array, user hover/clicks, interval seed | Transitioning image viewport with slide badge `X/N` | Monogram initials fallback if image missing | `components/TeamRosterSection.tsx`, `scripts/adversarial_stress_test.js` |
| 10 | UI / Interaction | Division Filtering & Reset | Category tabs for All, Ketua Tim, Manager, Program, Elektronik, Mekanik | Division tab click | Active filtered cards, search query reset | Fallback to 'Mekanik' badge if unknown | `scripts/stress_test_edge_cases.js`, `scripts/test_challenger2_m3_stress_oracle.js` |
| 11 | UI / Interaction | Search Engine & Empty State | Live client-side search matching name, NIM, division, role, skills, quote | Search input string | Filtered cards or 'Tidak Ada Anggota Ditemukan' with Reset | No crash on regex, SQL, XSS, or 100k chars | `scripts/stress_test_edge_cases.js`, `scripts/test_challenger2_m3_stress_oracle.js` |
| 12 | UI / Interaction | View Layout Mode Toggle | Switch between responsive Grid mode and horizontal snap Carousel mode | `viewLayout` state toggle ('grid' vs 'carousel') | CSS grid layout or `snap-x snap-mandatory` | Retains responsive classes | `scripts/stress_test_edge_cases.js` (Section 3) |
| 13 | Factual Timeline | UNDIP Competition Year 2026 | UNLIMITED Robotics Competition UNDIP must strictly cite year 2026 | `newsData.ts`, `Achievements.tsx` | Year '2026' in news cards & achievement badges | Throws if stale '2025' found | `scripts/stress_test_edge_cases.js` (Section 4), `ORIGINAL_REQUEST.md` |
| 14 | UI / Layout | Photo Unblocking Architecture | Clean separation between photo stage and text/badges | Member card and hero components | Zero dark heavy gradients obscuring faces | Test rejects heavy overlay gradients | `scripts/stress_test_edge_cases.js` (Section 5) |
| 15 | Animation Suite | DecryptedText Primitive | Scramble hacker text effect with SSR-safe initial state & a11y | `text`, `speed`, `maxIterations`, `revealDirection` | Scrambled to clean text string | Falls back to static text if reduced motion | `scripts/test_reactbits_suite.js`, `components/animations/DecryptedText.tsx` |
| 16 | Animation Suite | ShinyText Primitive | Metallic light sweep across text headline via CSS gradient shimmer | `text`, `disabled`, `speed`, `className` | Animated gradient text with `bg-clip-text` | Static text if `disabled` or reduced motion | `scripts/test_reactbits_suite.js`, `components/animations/ShinyText.tsx` |
| 17 | Animation Suite | BlurText Primitive | Staggered blur-to-clear entrance animation with IntersectionObserver | `text`, `delay`, `animateBy`, `direction` | Staggered span elements with blur filter | Renders immediately if reduced motion | `scripts/test_reactbits_suite.js`, `components/animations/BlurText.tsx` |
| 18 | Animation Suite | SpotlightCard Primitive | Cursor-following ambient radial light glow without re-renders | Mouse event coordinates (`--mouse-x`, `--mouse-y`) | Smooth radial gradient backdrop on hover | Graceful null ref handling if unmounted | `scripts/test_reactbits_suite.js`, `scripts/test_challenger2_m3_stress_oracle.js` |
| 19 | Animation Suite | CountUp Primitive | High-performance numerical telemetry counter via `requestAnimationFrame` | `to`, `from`, `duration`, `separator` | Interpolated counter value | Jumps directly to target if reduced motion | `scripts/test_reactbits_suite.js`, `components/animations/CountUp.tsx` |
| 20 | Animation Suite | AmbientGrid Primitive | Subtle SVG micro-grid pattern with scanline effect | `gridSize`, `strokeColor`, `showScanLine` | Responsive SVG pattern with `aria-hidden="true"` | Non-intrusive backdrop | `scripts/test_reactbits_suite.js`, `components/animations/AmbientGrid.tsx` |

---

## Edge Cases

| # | Feature | Input | Observed Behavior |
|---|---------|-------|-------------------|
| 1 | Roster Search | Empty string `""` | Returns 100% of roster members (no items hidden). |
| 2 | Roster Search | Whitespace-only (`"   \t\n  "`, NBSP, fullwidth, BOM) | Trimmed to empty; returns 100% of roster members. |
| 3 | Roster Search | Non-existent string `"zzzz_nonexistent_xyz_999"` | Returns 0 members; triggers graceful Empty State with 'Tidak Ada Anggota Ditemukan' and 'Reset Pencarian' button. |
| 4 | Roster Search | ReDoS & Regex Metacharacters (`.*+?^${}()\|[]\`, catastrophic backtracking `a?a?...a...`) | Safe literal matching; evaluates under 100ms with zero errors or catastrophic backtracking. |
| 5 | Roster Search | XSS & Script Injection (`<script>alert(1)</script>`, `<img src=x onerror=...>`) | Handled safely as literal substring without DOM execution or sanitization crashes. |
| 6 | Roster Search | SQL & Shell Injection (`' OR '1'='1`, `'; DROP TABLE...`, `${IFS}`) | Handled safely as literal search string. |
| 7 | Roster Search | Unicode Emojis & RTL Overrides (`🤖 🦾`, `\u202Ereversed\u202C`) | Safe string parsing without crash or layout collapse. |
| 8 | Roster Search | Massive query string (100,000 characters) | Handled safely in <200ms; returns 0 matches. |
| 9 | Crossfade Engine | Rapid clicking (100,000 circular index transitions) | Circular index `(idx + 1) % len` and `(idx - 1 + len) % len` never goes out of bounds. |
| 10 | Crossfade Engine | Single photo (`images.length === 1`) | Prev/Next navigation arrows and `X/N` counter are omitted; auto-transition timer is disabled. |
| 11 | Crossfade Engine | Missing / Broken image URL (`onError` event) | Triggers `onImageError`; renders monogram fallback avatar (e.g. 'FY' for Farhan Yuda) with academic titles filtered out. |
| 12 | Crossfade Engine | Staggered interval timers | Member IDs generate hash seed (`member.id.charCodeAt(0) % 5`); interval timing staggered `3600 + seed * 200` ms to prevent synchronous flipping. |
| 13 | SpotlightCard | High-frequency pointer events (100k events, subpixel floats, out-of-bounds) | Direct CSS variable manipulation (`setProperty('--mouse-x')`) without React state re-renders; completes in <500ms. |
| 14 | SpotlightCard | Unmounted / Null DOM reference | Safely checks `if (divRef.current)` before mutating properties; zero unhandled exceptions. |
| 15 | Modal Dialog | Escape key (`e.key === 'Escape'`) | Closes open member detail modal and restores `document.body.style.overflow = 'unset'`. |
| 16 | Modal Dialog | Backdrop click vs Content click | Backdrop click dismisses modal; modal container calls `e.stopPropagation()` to preserve dialog state. |
| 17 | Division Filter | Unknown/invalid division category | Defensive fallback: `DIVISION_BADGES[selectedDivision] || DIVISION_BADGES['Mekanik']`. |
| 18 | Division Filter | Switching division while search query active | Tab click handler explicitly executes `setSearchQuery('')` to prevent trapped zero-state. |
| 19 | Static Export | Missing route or asset | `postbuild.js` / test harnesses fail immediately if any internal URL does not resolve to an existing static file. |

---

## Mandatory Invariant 1: Verified PDDikti Credentials Across All Team Members

The authoritative PDDikti UNY schema consists of an **11-digit numerical code**:
- **Digits 1–2 (Angkatan):** Year of enrollment (`17`=2017, `18`=2018, `19`=2019, `20`=2020, `21`=2021, `22`=2022, `23`=2023, `24`=2024).
- **Digits 3–7 (Prodi Code):**
  - `50124`: S1 Pendidikan Teknik Elektro (FT)
  - `50224`: S1 Pendidikan Teknik Elektronika (FT)
  - `50324`: S1 Pendidikan Teknik Mesin (FT)
  - `51824`: S1 Pendidikan Teknik Mekatronika (FT)
  - `53814`: S1 Teknik Elektro (FT)
  - `53914`: S1 Teknik Manufaktur (FT)
  - `54014`: S1 Teknik Mesin (FT)
  - `30614`: S1 Fisika (FMIPA)
  - `50733`: D4 Teknik Elektronika (FV / FT)
  - `50734`: D4 Teknik Mesin (FV / FT)
  - `09062`: D4 Teknik Elektronika (FV)
- **Digits 8–11 (Registration):** Individual student sequence number.

### Complete Ground Truth Roster Table (34 Students + 2 Advisors)

| # | Full Legal Name | Verified PDDikti NIM / NIP | Program Studi (Prodi) | Fakultas | Angkatan | Primary Team Role | Status |
|---|---|---|---|---|---|---|---|
| **Advisors** |
| 1 | Prof. Ir. Moh. Khairudin, M.T., Ph.D., IPU. | `19790412 200212 1 002` (NIP) | S1 Pendidikan Teknik Mekatronika | FT | Guru Besar | Dosen Pembimbing Utama | Active |
| 2 | Dr. Herlambang Sigit Pramono, S.T., M.Cs. | `19650829 199903 1 001` (NIP) | S1 Pendidikan Teknik Mekatronika | FT | Dosen | Dosen Pembimbing | Active |
| **Active Technical Squad (2025)** |
| 3 | Farhan Yuda Mahendra | `22518241040` | S1 Pendidikan Teknik Mekatronika | FT | 2022 | Ketua Tim 2025 / Programmer | Active |
| 4 | Rose Pita Nur Afifah | `22518241042` | S1 Pendidikan Teknik Mekatronika | FT | 2022 | Koordinator Manager / Media | Active |
| 5 | Zelfa Nafisah Zalna | `23501241001` | S1 Pendidikan Teknik Elektro | FT | 2023 | Manager Keuangan & Logistik | Active |
| 6 | Tri Wahyu Handoyo | `22518241023` | S1 Pendidikan Teknik Mekatronika | FT | 2022 | Koordinator Divisi Program / AI Vision | Active |
| 7 | Hanif NurKhalis | `23518241019` | S1 Pendidikan Teknik Mekatronika | FT | 2023 | Divisi Program (Vision & Control) | Active |
| 8 | Hisyam Yasid Pratowo | `23518241028` | S1 Pendidikan Teknik Mekatronika | FT | 2023 | Divisi Program (Embedded & Nav) | Active |
| 9 | Ikhsan Nurrohman | `22538141004` | S1 Teknik Elektro | FT | 2022 | Koordinator Divisi Elektronik | Active |
| 10 | Abdul Hasib Adzdzin Nuha | `22502241014` | S1 Pendidikan Teknik Elektronika | FT | 2022 | Divisi Elektronik (PCB & Wiring) | Active |
| 11 | Aryasetya Maulana Swasdika | `23501241018` | S1 Pendidikan Teknik Elektro | FT | 2023 | Divisi Elektronik (Power Distribution) | Active |
| 12 | Naufal Farros Zainal Arifin | `23502241031` | S1 Pendidikan Teknik Elektronika | FT | 2023 | Divisi Elektronik (Sensor Telemetry) | Active |
| 13 | Rionaldi Nugroho | `23090620088` | D4 Teknik Elektronika | FV | 2023 | Koordinator Divisi Mekanik | Active |
| 14 | Caesar Sokma Langgeng | `21539144005` | S1 Teknik Manufaktur | FT | 2021 | Divisi Mekanik (Mechanism & 3D CAD) | Active |
| 15 | Adhiyatma Fatya Ramadhani | `23539141012` | S1 Teknik Manufaktur | FT | 2023 | Divisi Mekanik (Fabrication & CNC) | Active |
| 16 | Andika Nanda Wijaya | `23539141021` | S1 Teknik Manufaktur | FT | 2023 | Divisi Mekanik (Chassis & Lathe) | Active |
| 17 | Kharisma Putra Mahardika | `23503241035` | S1 Pendidikan Teknik Mesin | FT | 2023 | Divisi Mekanik (Drive Mechanism) | Active |
| **Alumni & Past Leaders/Managers** |
| 18 | Ilham Widyo Nugroho | `21507334002` | D4 Teknik Elektronika | FV | 2021 | Ketua Tim 2024 / Elektronik | Alumni |
| 19 | Mustika Wahyu Aprilia | `21306141050` | S1 Fisika | FMIPA | 2021 | Lead Manager (2022–2024) | Alumni |
| 20 | Salsabila Azzahra Putri Sophia Dewi Utami | `20518241012` | S1 Pendidikan Teknik Mekatronika | FT | 2020 | Ketua Tim 2023 / Programmer | Alumni |
| 21 | Agus Bagaskoro | `21501244039` | S1 Pendidikan Teknik Elektro | FT | 2021 | Divisi Elektronik (2022–2024) | Alumni |
| 22 | Muhamad Ilham Sony | `20539144016` | S1 Teknik Manufaktur | FT | 2020 | Divisi Mekanik (2023–2024) | Alumni |
| 23 | Muhammad Iqbal Rasyid | `19518241008` | S1 Pendidikan Teknik Mekatronika | FT | 2019 | Ketua Tim 2022 / Programmer | Alumni |
| 24 | Yuli Dwi Saputri | `19501241019` | S1 Pendidikan Teknik Elektro | FT | 2019 | Lead Manager (2020–2022) | Alumni |
| 25 | Geo Brahma Granito Z. | `19507334011` | D4 Teknik Mesin | FV | 2019 | Divisi Desain (2022) | Alumni |
| 26 | Ahmad Insan Kamil | `19503241022` | S1 Pendidikan Teknik Mesin | FT | 2019 | Divisi Desain (2022) | Alumni |
| 27 | Afif Aiman Saputra | `18503241015` | S1 Pendidikan Teknik Mesin | FT | 2018 | Ketua Tim 2021 / Mekanik | Alumni |
| 28 | Yusron Nur Latief | `18507334005` | D4 Teknik Elektronika | FV | 2018 | Divisi Elektronik (2020–2021) | Alumni |
| 29 | Nurcholis | `17502241001` | S1 Pendidikan Teknik Elektronika | FT | 2017 | Ketua Tim 2020 / Founder | Alumni |
| 30 | Alfan Fajri Tamyis | `17502241014` | S1 Pendidikan Teknik Elektronika | FT | 2017 | Divisi Program (2020) | Alumni |
| 31 | Budi Arjaya Wida | `18518241011` | S1 Pendidikan Teknik Mekatronika | FT | 2018 | Divisi Program (2020) | Alumni |
| 32 | Musa Beni Ricardo Aruan | `17518241009` | S1 Pendidikan Teknik Mekatronika | FT | 2017 | Divisi Elektronik (2020) | Alumni |
| 33 | Ardhi Wiranata | `17502241018` | S1 Pendidikan Teknik Elektronika | FT | 2017 | Divisi Elektronik (2020) | Alumni |
| 34 | Musyarof Rifai | `18518241017` | S1 Pendidikan Teknik Mekatronika | FT | 2018 | Divisi Mekanik (2020) | Alumni |
| 35 | Anggoro Fajar Dwi Utomo | `18518241021` | S1 Pendidikan Teknik Mekatronika | FT | 2018 | Divisi Mekanik (2020) | Alumni |
| 36 | Muhammad Rovi Aan Sulistya | `18501241029` | S1 Pendidikan Teknik Elektro | FT | 2018 | Divisi Mekanik (2020) | Alumni |

### ⚠️ CRITICAL FINDING: The Farhan Yuda Mahendra NIM Discrepancy
- **The Issue**: In `data/teamData.ts` (lines 419, 725) and `STRUKTUR_TIM_ABHINAYA.md`, Farhan Yuda Mahendra was entered with placeholder NIM `22518244007`.
- **The Test Assertion**: `tests/e2e/test_r3_technical_squad.js` (line 64), `tests/e2e/test_tier5_integrity.js` (line 46), `scripts/challenger1_dom_and_nim_test.js` (line 24), `scripts/test_challenger1_nim_faculty_oracle.py` (line 56), and `ORIGINAL_REQUEST.md` (lines 25, 44) strictly require **`22518241040`**.
- **The Oracle Assertion**: `test_challenger1_nim_faculty_oracle.py` explicitly scans for and fails upon encountering `22518244007` as an unauthorized placeholder!
- **Mandate for Redesign Workers**: `22518241040` must be used across all files and HTML output for Farhan Yuda Mahendra.

---

## Mandatory Invariant 2: Leadership & Management Records

### 1. Leaders Hall of Fame (6 Chronological Leaders, 2020–2025)

| Year | Leader Name | PDDikti NIM | Study Program & Faculty | Leadership Badge | Primary Contribution |
|---|---|---|---|---|---|
| **2020** | **Nurcholis** | `17502241001` | S1 Pendidikan Teknik Elektronika (FT) | `Ketua Tim` / `Founder` | Perintis divisi KRTMI UNY, robot otonom disinfeksi UV-C |
| **2021** | **Afif Aiman Saputra** | `18503241015` | S1 Pendidikan Teknik Mesin (FT) | `Ketua Tim` | Robot layanan medis COVID-19 & navigasi teleoperasi |
| **2022** | **Muhammad Iqbal Rasyid** | `19518241008` | S1 Pendidikan Teknik Mekatronika (FT) | `Ketua Tim` | Robot limbah medis & barcode reader KRTMI Surabaya |
| **2023** | **Salsabila Azzahra** | `20518241012` | S1 Pendidikan Teknik Mekatronika (FT) | `Ketua Tim` | Dual robot kolaboratif pemilah sampah USM Semarang |
| **2024** | **Ilham Widyo Nugroho** | `21507334002` | D4 Teknik Elektronika (FV / FT) | `Ketua Tim` | Robot pemilah digital AI edge vision UMS Surakarta |
| **2025** | **Farhan Yuda Mahendra** | `22518241040` | S1 Pendidikan Teknik Mekatronika (FT) | `Ketua Tim` | Sasis holonomik transmisi tinggi & Technocorner UGM |

### 2. Managers Showcase (4 Chronological Managers, 2020–2025)

| Era | Manager Name | PDDikti NIM | Study Program & Faculty | Role Badge | Core Operational Scope |
|---|---|---|---|---|---|
| **2020–2022** | **Yuli Dwi Saputri** | `19501241019` | S1 Pendidikan Teknik Elektro (FT) | `Manager` | Lead Manager perintis, tata kelola anggaran KRTMI & birokrasi |
| **2022–2024** | **Mustika Wahyu Aprilia** | `21306141050` | S1 Fisika (FMIPA) | `Manager` | Alokasi anggaran riset & administrasi KRI USM / UMS |
| **2024–2025** | **Rose Pita Nur Afifah** | `22518241042` | S1 Pendidikan Teknik Mekatronika (FT) | `Manager` | Koordinator Manager, media branding `@abhinaya.uny`, UI/UX |
| **2025** | **Zelfa Nafisah Zalna** | `23501241001` | S1 Pendidikan Teknik Elektro (FT) | `Manager` | Manajemen keuangan riset, logistik akomodasi & operasional |

---

## Mandatory Invariant 3: Factual Timeline & Tournament Chronicles

The official tournament timeline rules must be strictly preserved across all data files, achievements, and text:

1. **UNLIMITED UNDIP Rule**: All references to the **UNLIMITED Robotics Competition (Universitas Diponegoro, Semarang)** must state **2026** (NEVER 2025). Stale references to `UNLIMITED UNDIP 2025` will cause instant rejection in `scripts/stress_test_edge_cases.js`.
2. **Technocorner UGM 2026 Rule**: Transporter Robot Competition at Departemen Teknik Elektro & Teknologi Informasi (DTETI) FT UGM is **2026**.
3. **KRTMI 2024 (UMS Surakarta)**:
   - Location: Universitas Muhammadiyah Surakarta (Edutorium KH Ahmad Dahlan UMS).
   - Achievement: **Juara 1 Wilayah I** and **Juara 2 Tingkat Nasional**.
   - Robot: Robot Pemilah Sampah Cerdas Otonom & Keranjang Berjalan.
4. **KRTMI 2023 (USM Semarang)**:
   - Location: Universitas Semarang (USM) & BPTI Kemendikbudristek.
   - Achievement: **Juara 3 Wilayah I** & **Finalis Nasional**.
   - Theme: Cyber-Physical Digital Twin Sorting.
5. **KRTMI 2022 (ITS Surabaya)**:
   - Location: Institut Teknologi Sepuluh Nopember (ITS Surabaya).
   - Theme: Robot Penanganan & Pemilahan Limbah Medis Berbahaya.
6. **KRTMI 2021 (UGM Daring)**:
   - Location: Universitas Gadjah Mada (UGM Daring).
   - Theme: Robot Pelayanan Pasien COVID-19.
7. **KRTMI 2020 (ITB Bandung Daring)**:
   - Location: Institut Teknologi Bandung (ITB Daring).
   - Theme: Robot Sterilisasi Radiasi UV-C & Desinfeksi Mandiri.
8. **KRTMI 2019 (UDINUS Semarang)**:
   - Location: Universitas Dian Nuswantoro (UDINUS Semarang).
   - Theme: Pionir Riset Divisi Tematik KRTMI UNY.

---

## Mandatory Invariant 4: Exact DOM String Assertions & Selectors

The following exact DOM text strings and keywords are tested directly in `out/index.html` and `out/prestasi/index.html`:

### Static DOM Assertions in `out/index.html`
1. **Leaders Hall of Fame**:
   - `Nurcholis`
   - `Afif Aiman Saputra`
   - `Muhammad Iqbal Rasyid`
   - `Salsabila Azzahra`
   - `Ilham Widyo Nugroho`
   - `Farhan Yuda Mahendra`
   - Exact leadership badge: `'Ketua Tim'`
   - Section header match: `'Leaders Hall of Fame'` OR `'Hall of Fame'` OR `'Deretan Ketua'`
2. **Managers Showcase**:
   - `Yuli Dwi Saputri`
   - `Mustika Wahyu Aprilia`
   - `Rose Pita Nur Afifah`
   - `Zelfa Nafisah Zalna`
   - Exact role keyword: `'Manager'`
   - Section header match: `'Managers Showcase'` OR `'Deretan Manager'` OR `'Manajer Tim'`
3. **Active Technical Squad Names & Authentic NIMs**:
   - `Tri Wahyu Handoyo` AND `22518241023`
   - `Ikhsan Nurrohman` AND `22538141004`
   - `Agus Bagaskoro` AND `21501244039`
   - `Muhamad Ilham Sony` AND `20539144016`
   - `Caesar Sokma Langgeng` AND `21539144005`
   - `Rionaldi Nugroho` AND `23090620088`
   - (*And in challenger1*: `Farhan Yuda Mahendra` AND `22518241040`)
4. **Alumni & Generation Eras**:
   - Each individual year string must be present: `'2020'`, `'2021'`, `'2022'`, `'2023'`, `'2024'`, `'2025'`.
5. **Meta & SEO Tags**:
   - `name="viewport"`
   - `charset=`
   - `<title>`
   - `og:title` or `property="og:title"`

### Static DOM Assertions in `out/prestasi/index.html`
- Occurrences of `'2026'` > 0
- UNDIP 2026 reference: `prestasiHtml.includes('UNDIP') && (prestasiHtml.includes('2026') || prestasiHtml.includes('UNLIMITED'))`

---

## Mandatory Invariant 5: Technical Divisions & Filtering Architecture

The team roster filtering architecture has rigorous structural requirements tested in `scripts/stress_test_edge_cases.js` and `scripts/test_challenger2_m3_stress_oracle.js`:

1. **Division IDs in `teamData.ts`**:
   `DIVISION_CATEGORIES` must define:
   - `id: 'All'`
   - `id: 'Ketua Tim'`
   - `id: 'Manager'`
   - `id: 'Program'`
   - `id: 'Elektronik'`
   - `id: 'Mekanik'`
   - `id: 'Pembimbing'`
2. **Division Icon Mapper Cases**:
   `TeamRosterSection.tsx` icon mapper must support:
   - `case 'Program':`
   - `case 'Elektronik':`
   - `case 'Elektrik':` (alias)
   - `case 'Mekanik':`
   - `case 'Manager':`
   - `case 'Manajemen & Administrasi':` or `case 'Manajerial & Media':`
3. **Behavioral Filter Invariants**:
   - **Search query reset on division select**: Clicking any division category tab must invoke `setSelectedDivision(cat.id)` AND `setSearchQuery('')`.
   - **Escape hatch button**: When viewing a single division, the UI must provide an escape hatch button that executes `setSelectedDivision('All')` with text `"Tampilkan Semua Divisi"`.
   - **Defensive badge fallback**: If an unrecognized division is selected, it must fallback defensively: `DIVISION_BADGES[selectedDivision as DivisionType] || DIVISION_BADGES['Mekanik']`.
   - **Empty search state**: When a query yields no results, the UI must display:
     - Heading: `"Tidak Ada Anggota Ditemukan"`
     - Subtitle: `"Coba sesuaikan kata kunci pencarian Anda"`
     - Reset button: `"Reset Pencarian"` with handler `onClick={() => setSearchQuery('')}`.

---

## Mandatory Invariant 6: Static Export Architecture

The project is deployed via Next.js Static HTML Export (`next build && next export`) to GitHub Pages under the base path `/AbhinayaUNY_Web`.

### Required 11 Static Export Targets (Verified in `scripts/verify_11_static_pages.js`)

| # | File Path in `out/` | Target Name | Min File Size |
|---|---|---|---|
| 1 | `out/index.html` | Root Home Page | > 500 Bytes |
| 2 | `out/divisi/index.html` | Divisi Showcase Page | > 500 Bytes |
| 3 | `out/prestasi/index.html` | Prestasi Showcase Page | > 500 Bytes |
| 4 | `out/krtmi/index.html` | KRTMI Division Detail Page | > 500 Bytes |
| 5 | `out/pertandingan/index.html` | Pertandingan / Schedule Page | > 500 Bytes |
| 6 | `out/404.html` | 404 Standalone Root | > 500 Bytes |
| 7 | `out/404/index.html` | 404 Directory Page | > 500 Bytes |
| 8 | `out/500.html` | 500 Standalone Root | > 500 Bytes |
| 9 | `out/500/index.html` | 500 Directory Page | > 500 Bytes |
| 10 | `out/apple-icon.png` | Apple Touch Icon | > 500 Bytes |
| 11 | `out/icon.png` | Favicon Icon PNG | > 500 Bytes |

### BasePath & Zero-Broken-Link Requirement
- Base path: `/AbhinayaUNY_Web`
- `scripts/test_empirical_html_output.js` (Test 6) recursively inspects every `src` and `href` in all exported HTML files.
- **Allowed broken asset count is STRICTLY 0**. Any 404 image, missing chunk, or invalid route causes build failure.

---

## Mandatory Invariant 7: CSS Classes & Structural Layout Constraints

Existing automated tests strictly check for the existence of specific CSS classes, container bounds, and structural arrangements:

### 1. Compiled CSS Bundle Utility Classes (`test_empirical_html_output.js` Test 7)
The compiled stylesheet in `out/_next/static/css/*.css` MUST include:
- `bg-brand-orange` (or theme equivalent preserved in safelist)
- `text-brand-orange`
- `text-amber-300` (Gold theme for Leaders Hall of Fame)
- `text-emerald-300` (Emerald theme for Managers Showcase)
- `grid-cols-1`
- `duration-1000` (Crossfade transition duration)

### 2. Responsive 4-Tier Grid Breakpoint Progression (`stress_test_edge_cases.js`)
The member cards container in `TeamRosterSection.tsx` must implement:
- `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6`
- Container width restriction: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8` (also in Achievements, NewsMedia, Gallery).

### 3. Dual-Layout Mode Structure
- Grid mode branch: `viewLayout === 'grid'`
- Carousel mode branch: `viewLayout === 'carousel'`
- Triggers: `setViewLayout('grid')`, `setViewLayout('carousel')`
- Carousel CSS classes: `snap-x snap-mandatory`, `overflow-x-auto`, and `WebkitOverflowScrolling: 'touch'`.

### 4. Photo Unblocking Architecture
- In `AboutTeamSection.tsx`: **NO** `bg-gradient-to-t from-black/90 via-black/40 to-transparent absolute inset-0` covering faces. Must maintain unobstructed view with `aspect-` or `object-cover`.
- In `TeamRosterSection.tsx`: Top meta bar above photo viewport (`px-3.5 py-2.5 ...` or `Floating Top Division Pill`), and clean aspect ratio `aspect-[4/3] sm:aspect-square` or `aspect-[4/5] sm:aspect-square rounded-xl overflow-hidden`.
- In `HeroSection.tsx`: Decoupled text header from cinematic team photo stage.

---

## Mandatory Invariant 8: React Bits Component Specifications & Guardrails

The animation primitives located in `components/animations/` must comply with strict integrity criteria verified by `scripts/test_reactbits_suite.js`:

### 1. Component Suite Files
- `components/animations/DecryptedText.tsx`
- `components/animations/ShinyText.tsx`
- `components/animations/BlurText.tsx`
- `components/animations/SpotlightCard.tsx`
- `components/animations/CountUp.tsx`
- `components/animations/AmbientGrid.tsx`
- `components/animations/index.ts` (Barrel export)
- `components/ui/SpotlightCard.tsx` (Alias export)

### 2. Zero External Animation Dependency Rule
- **STRICTLY FORBIDDEN**: `framer-motion` or `@react-spring` imports.
- All animations must be powered by vanilla React, direct CSS transitions, `requestAnimationFrame`, and `IntersectionObserver`.

### 3. Client Directive & Accessibility
- All animation primitives must declare `'use client'`.
- All text animations must supply semantic `aria-label={text}` or `aria-hidden="true"` (for ambient backgrounds).
- All primitives must check `window.matchMedia('(prefers-reduced-motion: reduce)')` and provide an instant, non-animated fallback for accessibility and low-power devices.

### 4. SpotlightCard Pointer Architecture
- CSS Variables: `--mouse-x`, `--mouse-y`, `--spotlight-opacity`.
- Glow overlay must have `pointer-events-none`.
- Card content must be placed on `relative z-20` above the glow.
- Must NOT invoke `useState` on `pointermove`/`mousemove` (prevents unnecessary React re-renders during high-frequency mouse movements).

---

## 9. Comprehensive Regression Prevention Checklist for Redesign Agents

Before declaring any milestone complete, all agents must ensure:

- [ ] **Data Integrity**: Farhan Yuda Mahendra's NIM is `22518241040` (placeholder `22518244007` eradicated from all code, data, and docs).
- [ ] **PDDikti Parity**: All 34 student members have authentic UNY 11-digit NIMs matching their real faculty and prodi.
- [ ] **Leadership Coverage**: All 6 Leaders and 4 Managers appear in static DOM with their respective badges.
- [ ] **Active Squad Coverage**: All 15 active 2025 squad members appear with authentic credentials.
- [ ] **Timeline Factuality**: UNLIMITED UNDIP is year **2026** everywhere (zero instances of UNDIP 2025).
- [ ] **Zero Text on Faces**: No dark gradients or text banners obscure members' faces in photo viewports.
- [ ] **Static Export Integrity**: `npm run build` succeeds cleanly with 11 static pages generated in `out/`.
- [ ] **Zero Broken Links**: `scripts/test_empirical_html_output.js` Test 6 reports 0 broken assets.
- [ ] **Tailwind Safelist / CSS Integrity**: Required utility classes (`text-amber-300`, `text-emerald-300`, `grid-cols-1`, `duration-1000`) exist in compiled bundle.
- [ ] **Automated Test Passes**:
  - `node scripts/test_empirical_html_output.js` -> EXIT 0
  - `node scripts/stress_test_edge_cases.js` -> EXIT 0
  - `node scripts/test_reactbits_suite.js` -> EXIT 0
  - `node scripts/test_challenger2_m3_stress_oracle.js` -> EXIT 0
  - `node scripts/verify_11_static_pages.js` -> EXIT 0
  - `python scripts/test_challenger1_nim_faculty_oracle.py` -> EXIT 0 (once NIM `22518241040` synchronized)
  - `node scripts/run_e2e_tests.js` -> EXIT 0 (once NIM `22518241040` synchronized)
