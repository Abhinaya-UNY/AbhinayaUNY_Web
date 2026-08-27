# Milestone 1: Changes Report — Photo Renaming Pipeline & Asset Standardization

**Agent**: `worker_m1`  
**Timestamp**: 2026-08-27T16:25:00Z  
**Working Directory**: `D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web\.agents\worker_m1`  
**Status**: COMPLETE & VERIFIED  

---

## 1. Executive Summary

Milestone 1 successfully executed the semantic photo renaming, standardization, and asset mapping pipeline for the Abhinaya UNY Robotics Portal. All genuine member photographs spanning generations 2020 through 2025 were systematically extracted from the Instagram feed archives (`public/images/instagram_feed/`) and studio high-resolution portraits (`public/images/members/`), renamed according to the standardized semantic pattern `{tahun}_{divisi}_{nama_anggota}_{urutan}.ext`, and copied into `public/images/members/`.

A comprehensive, indexed manifest `data/photoManifest.json` was generated to serve as the unified data source for Milestone 2 (`data/teamData.ts`), Milestone 3 (Crossfade Engine), and Milestone 4 (Roster UI).

---

## 2. File Operations & Artifact Inventory

### 2.1. Pipeline & Manifest Artifacts
1. **`scripts/execute_semantic_renaming.py`**:
   - Automated idempotent pipeline script that parses `scripts/full_catalog_with_renaming.json`, enforces canonical naming normalization (`program`, `leader`, `manager`, `elektronik`, `mekanik`, `desain`, `pembimbing`), copies genuine member assets with SHA-256 integrity checks, generates alias compatibility files, and outputs `data/photoManifest.json`.
2. **`data/photoManifest.json`**:
   - 114 KB JSON database indexed by:
     - `summary`: High-level asset counts (251 surveyed, 97 genuine roster photos, 35 unique members, 154 excluded non-roster assets).
     - `members`: Dictionary of 35 members keyed by slug ID containing full profile links, aliases, active years, leadership eras, primary photo, studio photos, feed photos, and per-year photo arrays.
     - `byYear`: Generation indices (`2020`, `2021`, `2022`, `2023`, `2024`, `2025`) partitioned by division (`leader`, `manager`, `program`, `elektronik`, `mekanik`, `desain`, `pembimbing`, `allPhotos`).
     - `byDivision`: Global division indices.
     - `allRosterPhotos`: Exhaustive list of all 97 photo descriptors with source/target paths, dimensions, and byte sizes.
3. **`scripts/verify_renaming_integrity.py`**:
   - Verification suite validating file existence on disk, non-zero file size, binary image magic headers (PNG/JPEG), leader/manager coverage (2020–2025), active technical squad (2025), and zero leakage of non-roster assets.

### 2.2. Standardized Files in `public/images/members/`
- Total files in `public/images/members/`: **158 files**
  - **133 semantic standardized photo files** (`{tahun}_{divisi}_{nama_anggota}_{urutan}.ext` canonicals + aliases)
  - **25 original studio portrait files** (`01_...` through `13_...`) preserved intact for 100% backward compatibility.

---

## 3. Leadership & Active Squad Asset Mapping

### 3.1. All-Era Leaders Hall of Fame (2020 – 2025)
| Generation | Leader Name | Standardized Semantic Photo(s) | Source Path |
|:---:|:---|:---|:---|
| **2020** | **Nurcholis** | `/images/members/2020_leader_nurcholis_01.jpg` | `public/images/instagram_feed/2020-08-16_17-54-45_UTC_CD9ZVzpjcgN_2.jpg` |
| **2021** | **Afif Aiman Saputra** | `/images/members/2021_leader_afif_aiman_saputra_01.jpg` | `public/images/instagram_feed/2020-08-16_18-05-25_UTC_CD9aj6dD_Xc_2.jpg` |
| **2022** | **Muhammad Iqbal Rasyid** | `/images/members/2022_leader_muhammad_iqbal_rasyid_01.jpg` | `public/images/instagram_feed/2022-09-24_15-29-35_UTC_Ci5QBYaLgHg_2.jpg` |
| **2023** | **Salsabila Azzahra PSDU** | `/images/members/2023_leader_salsabila_azzahra_psdu_01.jpg` | `public/images/instagram_feed/2023-09-08_01-48-22_UTC_Cw6bd9zPTNP_2.jpg` |
| **2024** | **Ilham Widyo Nugroho** | `/images/members/2024_leader_ilham_widyo_nugroho_01.png`<br>`/images/members/2024_leader_ilham_widyo_nugroho_02.png`<br>`/images/members/2024_leader_ilham_widyo_nugroho_01.jpg` | Studio Portrait Variant 1 & 2<br>`public/images/instagram_feed/2024-09-12_16-47-42_UTC_C_0wguVTpGY.jpg` |
| **2025** | **Farhan Yuda Mahendra** | `/images/members/2025_leader_farhan_yuda_mahendra_01.jpg` | `public/images/instagram_feed/2025-09-27_20-32-54_UTC_DPHoWoFkxa3_2.jpg` |

### 3.2. All-Era Managers Showcase (2020 – 2025)
| Generation | Manager Names | Standardized Semantic Photo(s) |
|:---:|:---|:---|
| **2020** | **Yuli Dwi Saputri** | `/images/members/2020_manager_yuli_dwi_saputri_01.jpg` |
| **2021** | **Yuli Dwi Saputri** | `/images/members/2021_manager_yuli_dwi_saputri_01.jpg` |
| **2022** | **Yuli Dwi Saputri** & **Mustika Wahyu Aprilia** | `/images/members/2022_manager_yuli_dwi_saputri_01.jpg`<br>`/images/members/2022_manager_mustika_wahyu_aprilia_01.jpg` |
| **2023** | **Mustika Wahyu Aprilia** & **Yuli Dwi Saputri** | `/images/members/2023_manager_mustika_wahyu_aprilia_01.jpg`<br>`/images/members/2023_manager_yuli_dwi_saputri_01.jpg` |
| **2024** | **Mustika Wahyu Aprilia** & **Rose Pita Nur Afifah** | `/images/members/2024_manager_mustika_wahyu_aprilia_01.png` (Studio)<br>`/images/members/2024_manager_mustika_wahyu_aprilia_02.png` (Studio)<br>`/images/members/2024_manager_rose_pita_nur_afifah_01.png` (Studio)<br>`/images/members/2024_manager_rose_pita_nur_afifah_02.png` (Studio)<br>`/images/members/2024_manager_mustika_wahyu_aprilia_01.jpg` (IG)<br>`/images/members/2024_manager_rose_pita_nur_afifah_01.jpg` (IG) |
| **2025** | **Rose Pita Nur Afifah** & **Zelfa Nafisah Zalna** | `/images/members/2025_manager_rose_pita_nur_afifah_01.jpg`<br>`/images/members/2025_manager_zelfa_nafisah_zalna_01.jpg` |

### 3.3. Active Technical Squad (2025)
- **Program**:
  - Tri Wahyu Handoyo: `/images/members/2025_program_tri_wahyu_handoyo_01.jpg` (+ 2024 Studio & IG photos)
  - Farhan Yuda Mahendra: `/images/members/2025_program_farhan_yuda_mahendra_01.jpg`
  - Hanif NurKhalis: `/images/members/2025_program_hanif_nurkhalis_01.jpg`
  - Hisyam Yasid Pratowo: `/images/members/2025_program_hisyam_yasid_pratowo_01.jpg`
- **Elektronik**:
  - Ikhsan Nurrohman: `/images/members/2025_elektronik_ikhsan_nurrohman_01.jpg`
  - Abdul Hasib Adzdzin Nuha: `/images/members/2025_elektronik_abdul_hasib_adzdzin_nuha_01.jpg`
  - Aryasetya Maulana Swasdika: `/images/members/2025_elektronik_aryasetya_maulana_swasdika_01.jpg`
  - Naufal Farros Zainal Arifin: `/images/members/2025_elektronik_naufal_farros_zainal_arifin_01.jpg`
- **Mekanik**:
  - Rionaldi Nugroho: `/images/members/2025_mekanik_rionaldi_nugroho_01.jpg`
  - Caesar Sokma Langgeng: `/images/members/2025_mekanik_caesar_sokma_langgeng_01.jpg`
  - Adhiyatma Fatya Ramadhani: `/images/members/2025_mekanik_adhiyatma_fatya_ramadhani_01.jpg`
  - Andika Nanda Wijaya: `/images/members/2025_mekanik_andika_nanda_wijaya_01.jpg`
  - Kharisma Putra Mahardika: `/images/members/2025_mekanik_kharisma_putra_mahardika_01.jpg`

---

## 4. Exclusion of Non-Roster Assets

All 154 non-member assets surveyed (3x3 Instagram grid slices, carousel title covers, quote banners, trophy celebration photos, meme poster `13_wanted_uang_kas_bendahara.png`) were rigorously classified with `include_in_roster: false` and excluded from `data/photoManifest.json` roster arrays.

---

## 5. Verification Summary

1. `python scripts/verify_renaming_integrity.py` -> **0 ERRORS, 100% PASS**
2. `npm.cmd run build` -> **0 ERRORS (11/11 static pages generated)**
3. Zero modifications made to `data/teamData.ts` or React UI components (preserving strict milestone boundaries).
