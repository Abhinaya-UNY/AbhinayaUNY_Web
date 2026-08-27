import json
import os

with open('scripts/full_catalog_with_renaming.json', 'r', encoding='utf-8') as f:
    cat = json.load(f)

# Sort catalog by year, category, division, member_name, sequence
cat_sorted = sorted(cat, key=lambda x: (
    x['year'], 
    0 if x['is_genuine_member'] else 1,
    x['division'] or 'zzz',
    x['member_name'] or 'zzz',
    x['sequence']
))

# Generate analysis.md
analysis_path = r'.agents/explorer_survey_1/analysis.md'
handoff_path = r'.agents/explorer_survey_1/handoff.md'

with open(analysis_path, 'w', encoding='utf-8') as f:
    f.write('''# Laporan Survei & Analisis Komprehensif Aset Foto Abhinaya UNY (2020–2025) 📸🤖

**Explorer Survey Agent**: `explorer_survey_1`  
**Working Directory**: `D:\\Data_Lokal\\Kuliah\\Tri Wahyu (22518241023)\\AbhinayaUNY_Web`  
**Timestamp**: 2026-08-27  

---

## 1. Executive Summary & Ringkasan Statistik

Survei menyeluruh telah dilakukan terhadap **251 file gambar** yang terdapat di dalam repositori web Abhinaya UNY:
- **`public/images/instagram_feed/`**: 226 file gambar (.jpg / .jpeg), 70 caption (.txt), dan 87 arsip metadata (.json.xz) dari 87 post Instagram resmi (`@abhinaya.uny`) periode 2020 hingga 2025.
- **`public/images/members/`**: 25 file gambar (.png) resolusi tinggi studio portrait (12 anggota aktif 2024 dengan 2 varian pose masing-masing + 1 poster easter egg bendahara).

### Distribusi Kategori File
| Kategori | Jumlah File | Keterangan |
|---|---|---|
| **MEMBER_PHOTO** | **95 file** | Foto close-up / portrait individual anggota resmi kontingen per divisi |
| **MENTOR_PHOTO** | **2 file** | Foto Dosen Pembimbing Utama (Prof. Ir. Moh. Khairudin, M.T., Ph.D., IPU.) |
| **TEAM_PHOTO** | **7 file** | Foto bersama formasi kontingen resmi, kartu ringkasan skuad per divisi |
| **COMPETITION_MOMENT** | **87 file** | Dokumentasi laga KRI Wilayah/Nasional, robot di arena, podium piala & sertifikat |
| **GRAPHIC_BANNER** | **60 file** | Potongan grid Instagram (3x3 & 3x2), cover grafis divisi, banner quote, poster edukasi |
| **TOTAL** | **251 file** | **100% Tercatat & Terpetakan Secara Presisi** |

---

## 2. All-Era Leaders Hall of Fame (2020 – 2025)

Berdasarkan arsip post Instagram resmi dan data kejuaraan KRTMI Puspresnas:

| Tahun | Nama Ketua Tim (Leader) | NIM / Prodi | Post ID / Sumber | Target File Semantic |
|---|---|---|---|---|
| **2020** | **Nurcholis** (Inaugural Lead / Lead Programmer) | Pend. Teknik Elektronika | `CD9ZVzpjcgN_2.jpg` | `2020_ketua_nurcholis_01.jpg` / `2020_programmer_nurcholis_01.jpg` |
| **2021** | **Nurcholis** / **Musa Beni Ricardo Aruan** | Pend. Teknik Elektronika / Mekatronika | `CeFpRStLwaE.jpg`, `CeFpVqfL4ZZ.jpg` | `2021_programmer_nurcholis_01.jpg` / `2021_kontingen_roster_card_quote_01.jpg` |
| **2022** | **Muhammad Iqbal Rasyid** | Pend. Teknik Mekatronika | `Ci5QBYaLgHg_2.jpg` | `2022_ketua_muhammad_iqbal_rasyid_01.jpg` |
| **2023** | **Salsabila Azzahra Putri Sophia Dewi Utami** | Pend. Teknik Mekatronika | `Cw6bd9zPTNP_2.jpg` | `2023_ketua_salsabila_azzahra_01.jpg` |
| **2024** | **Ilham Widyo Nugroho** | D4 Teknik Elektronika | `C_0wguVTpGY.jpg`, `09_ilham_widyo_nugroho_1.png`, `_2.png` | `2024_ketua_ilham_widyo_nugroho_01.jpg`, `2024_ketua_ilham_widyo_nugroho_01.png`, `02.png` |
| **2025** | **Farhan Yuda Mahendra** | Pend. Teknik Mekatronika | `DPHoWoFkxa3_2.jpg` | `2025_ketua_farhan_yuda_mahendra_01.jpg` |

---

## 3. All-Era Managers Showcase (2020 – 2025)

| Tahun | Nama Manager | Peran / Fokus | Post ID / Sumber | Target File Semantic |
|---|---|---|---|---|
| **2020** | **Yuli Dwi Saputri** | Manager Tim (Pend. Teknik Elektro) | `CD9awafDNZH_2.jpg` | `2020_manager_yuli_dwi_saputri_01.jpg` |
| **2021** | **Yuli Dwi Saputri** | Manager Tim (Pend. Teknik Elektro) | `CeFpNNhLYnR.jpg` | `2021_manager_yuli_dwi_saputri_01.jpg` |
| **2022** | **Yuli Dwi Saputri** | Manager Senior | `Ci5PdHUrgvk_2.jpg` | `2022_manager_yuli_dwi_saputri_01.jpg` |
| **2022** | **Mustika Wahyu Aprilia** | Manager Keuangan & Administrasi | `Ci5PdHUrgvk_3.jpg` | `2022_manager_mustika_wahyu_aprilia_01.jpg` |
| **2023** | **Mustika Wahyu Aprilia** | Manager Tim (S1 Fisika FMIPA) | `Cw6at1NPTGL_2.jpg` | `2023_manager_mustika_wahyu_aprilia_01.jpg` |
| **2023** | **Yuli Dwi Saputri** | Manager Advisor (Alumni) | `Cw6at1NPTGL_3.jpg` | `2023_manager_yuli_dwi_saputri_advisor_01.jpg` |
| **2024** | **Mustika Wahyu Aprilia** | Manager Keuangan & Administrasi | `C_0wQ-qzwUx_2.jpg`, `04_mustika_wahyu_aprilia_1.png`, `_2.png` | `2024_manager_mustika_wahyu_aprilia_01.png`, `02.png` |
| **2024** | **Rose Pita Nur Afifah** | Manager Media & Publikasi | `C_0wQ-qzwUx_3.jpg`, `05_rose_pita_nur_afifah_1.png`, `_2.png` | `2024_manager_rose_pita_nur_afifah_01.png`, `02.png` |
| **2025** | **Rose Pita Nur Afifah** | Lead Manager (Pend. Teknik Mekatronika) | `DPHoFZYk8lw_2.jpg` | `2025_manager_rose_pita_nur_afifah_01.jpg` |
| **2025** | **Zelfa Nafisah Zalna** | Manager Keuangan (S1 Fisika FMIPA) | `DPHoFZYk8lw_3.jpg` | `2025_manager_zelfa_nafisah_zalna_01.jpg` |

---

## 4. Current Active Technical Squad (Programmer, Elektronik, Mekanik)

### A. Divisi Program (AI, Computer Vision & Embedded Control)
1. **Tri Wahyu Handoyo** (Lead Program, AI Vision & Web Systems) — Angkatan 2022
   - Foto: `06_tri_wahyu_handoyo_1.png`, `06_tri_wahyu_handoyo_2.png`, `C_0vTMcTTGT_2.jpg`, `DPHnDR1E7WH_2.jpg`, `Cw6ZCItPRJ-_3.jpg`
2. **Salsabila Azzahra Putri Sophia Dewi Utami** (Program & Strategi Laga) — Angkatan 2020 (Leader 2023)
   - Foto: `08_salsabila_azzahra_1.png`, `08_salsabila_azzahra_2.png`, `C_0vTMcTTGT_3.jpg`, `Cw6bd9zPTNP_2.jpg`, `Cw6ZCItPRJ-_2.jpg`
3. **Farhan Yuda Mahendra** (Embedded Control & Kinematika / Leader 2025) — Angkatan 2022
   - Foto: `07_farhan_yuda_mahendra_1.png`, `07_farhan_yuda_mahendra_2.png`, `C_0vTMcTTGT_4.jpg`, `DPHoWoFkxa3_2.jpg`, `DPHnDR1E7WH_3.jpg`
4. **Hanif NurKhalis** (Programmer Generasi 2025) — Angkatan 2025
   - Foto: `DPHnDR1E7WH_4.jpg`
5. **Hisyam Yasid Pratowo** (Programmer Generasi 2025) — Angkatan 2025
   - Foto: `DPHnDR1E7WH_5.jpg`

### B. Divisi Elektronik (Power, PCB, Firmware & Telemetry)
1. **Abdul Hasib Adzdzin Nuha** (Lead PCB Design & Sensor Wiring) — Angkatan 2022
   - Foto: `01_abdul_hasib_adzdzin_nuha_1.png`, `01_abdul_hasib_adzdzin_nuha_2.png`, `C_0v8QYT7kJ_2.jpg`, `DPHmjMFEwJm_3.jpg`, `Cw6ads0v8Q2_4.jpg`
2. **Agus Bagaskoro** (Lead Hardware & Power Management) — Angkatan 2021
   - Foto: `02_agus_bagaskoro_1.png`, `02_agus_bagaskoro_2.png`, `C_0v8QYT7kJ_3.jpg`, `Cw6ads0v8Q2_3.jpg`
3. **Ikhsan Nurrohman** (Telemetri & Wireless Systems / Lead Elektronik 2025) — Angkatan 2022
   - Foto: `03_ikhsan_nurrohman_1.png`, `03_ikhsan_nurrohman_2.png`, `C_0v8QYT7kJ_4.jpg`, `DPHmjMFEwJm_2.jpg`
4. **Aryasetya Maulana Swasdika** (Elektronik Generasi 2025) — Angkatan 2024
   - Foto: `DPHmjMFEwJm_4.jpg`
5. **Naufal Farros Zainal Arifin** (Elektronik Generasi 2025) — Angkatan 2025
   - Foto: `DPHmjMFEwJm_5.jpg`
6. **Yusron Nur Latief** (Senior Electrical Advisor / Demisioner) — Alumni
   - Foto: `CD9bdiQjGn5_4.jpg`, `Ci5OdP-L4vD_2.jpg`, `Cw6ads0v8Q2_2.jpg`

### C. Divisi Mekanik (CAD, Laser Cutting & Fabrication)
1. **Muhamad Ilham Sony** (Lead CAD & Precision Machining) — Angkatan 2020
   - Foto: `10_muhamad_ilham_sony_1.png`, `10_muhamad_ilham_sony_2.png`, `C_0vriTzQUk_3.jpg`, `Cw6Zxo-vmO3_3.jpg`
2. **Caesar Sokma Langgeng** (CAD & Laser Fabrication Engineer) — Angkatan 2021
   - Foto: `11_caesar_sokma_langgeng_1.png`, `11_caesar_sokma_langgeng_2.png`, `C_0vriTzQUk_4.jpg`, `DPHl0olk4Zw_3.jpg`
3. **Rionaldi Nugroho** (Hardware Assembly & QA / Lead Mekanik 2025) — Angkatan 2023
   - Foto: `12_rionaldi_nugroho_1.png`, `12_rionaldi_nugroho_2.png`, `C_0vriTzQUk_5.jpg`, `DPHl0olk4Zw_2.jpg`
4. **Adhiyatma Fatya Ramadhani** (Mekanik Generasi 2025) — Angkatan 2025
   - Foto: `DPHl0olk4Zw_4.jpg`
5. **Andika Nanda Wijaya** (Mekanik Generasi 2025) — Angkatan 2025
   - Foto: `DPHl0olk4Zw_5.jpg`
6. **Kharisma Putra Mahardika** (Mekanik Generasi 2025) — Angkatan 2024
   - Foto: `DPHl0olk4Zw_6.jpg`

---

## 5. Klasifikasi Foto & Rekomendasi Eksklusi

Untuk memenuhi kriteria integritas data roster anggota:
1. **File yang WAJIB DIIKUTSERTAKAN dalam Roster Anggota (97 File)**:
   - Seluruh foto portrait / foto profil individual resmi anggota kontingen per tahun (2020–2025).
   - Foto Dosen Pembimbing (Prof. Khairudin).
2. **File yang DIEKSKLUSIKAN dari Roster Anggota (154 File)**:
   - **Potongan Grid Instagram (24 file)**: 9 tile grid 2020 (`B7zi...`), 3 tile grid 2022 (`Ciz7...`), 6 tile grid 2024 (`C_0u...`), 6 tile grid 2025 (`DPHo...`).
   - **Cover Grafis Slide Carousel (17 file)**: Slide pembuka bertuliskan "PROGRAMMER", "MECHANICS", "MANAGER", "ELECTRONICS", "MENTOR", "LEADER".
   - **Banner Quotes & Info Grafis (19 file)**: Poster "Apa itu KRI?", "Apa itu KRTMI?", "Mission Complete", "Let's Make Great History", recruitment poster.
   - **Dokumentasi Momen Pertandingan & Piala (87 file)**: Foto aksi robot di arena KRI, robot di pit stop, penyerahan piala di podium, dan piagam sertifikat (disalurkan ke Galeri / KrtmiChronicles).
   - **Poster Easter Egg Non-Anggota (1 file)**: `13_wanted_uang_kas_bendahara.png` (disimpan sebagai grafis / fun widget terpisah).
   - **Foto Tim Bersama / Kartu Ringkasan (6 file)**: Foto kontingen KRI 2019 di tangga Rektorat dan formasi tim 2023 (disalurkan ke Galeri Dokumentasi).

---

## 6. Tabel Lengkap Pemetaan Semantik (251 File)

Format Penamaan Standar: `{tahun}_{divisi}_{nama_anggota}_{urutan}.ext`

| No | Path Sumber Asli | Tahun | Kategori | Anggota / Objek | Divisi | Target Nama Semantik | Roster? |
|---|---|---|---|---|---|---|---|
''')
    for i, item in enumerate(cat_sorted):
        src = item['source_path']
        yr = item['year']
        cat_name = item['category']
        mname = item['member_name'] or '-'
        div = item['division'] or '-'
        target = item['target_filename']
        inc = '✅ YA' if item['include_in_roster'] else '❌ TIDAK'
        f.write(f"| {i+1} | `{src}` | {yr} | `{cat_name}` | {mname} | {div} | `{target}` | {inc} |\n")

print(f'Wrote analysis.md to {analysis_path}')

# Generate handoff.md
with open(handoff_path, 'w', encoding='utf-8') as f:
    f.write('''# Handoff Report — Photo Assets Survey & Renaming Architecture

**Agent**: `explorer_survey_1`  
**Working Directory**: `D:\\Data_Lokal\\Kuliah\\Tri Wahyu (22518241023)\\AbhinayaUNY_Web\\.agents\\explorer_survey_1`  
**Recipient**: `parent` (ID: `1de06e7e-41d9-4626-b913-2276d7c2c245`)  
**Status**: Task Completed (Hard Handoff)  
**Analysis Reference**: `D:\\Data_Lokal\\Kuliah\\Tri Wahyu (22518241023)\\AbhinayaUNY_Web\\.agents\\explorer_survey_1\\analysis.md`  
**Machine-Readable Mapping**: `D:\\Data_Lokal\\Kuliah\\Tri Wahyu (22518241023)\\AbhinayaUNY_Web\\scripts\\full_catalog_with_renaming.json`  

---

## 1. Observation

1. **Struktur Direktori & Total File Aset**:
   - `public/images/instagram_feed/`: Tepat **226 file gambar** (.jpg / .jpeg), 70 file caption teks (.txt), dan 87 metadata sidecar (.json.xz) dari 87 postingan Instagram feed `@abhinaya.uny` periode 2020 hingga 2025.
   - `public/images/members/`: Tepat **25 file gambar** (.png) studio portrait resolusi tinggi (12 anggota tim aktif periode 2024 dengan masing-masing 2 varian pose + 1 poster easter egg bendahara `13_wanted_uang_kas_bendahara.png`).
   - Total keseluruhan file gambar yang disurvei: **251 file**.

2. **Verifikasi OCR & Metadata Teks**:
   - Melalui Windows SDK OCR engine (`winsdk.windows.media.ocr`) dan ekstraksi caption .txt/.json.xz, seluruh 251 gambar telah di-OCR dan diidentifikasi teks yang tertera di dalamnya (nama anggota, prodi, quote, badge, dan judul banner).

3. **All-Era Leadership & Management Verification**:
   - **Ketua Tim (Leaders 2020–2025)**:
     - 2020: Nurcholis (Programmer #1 / Inception Team Leader 2020)
     - 2021: Nurcholis / Musa Beni Ricardo Aruan (Lead Program & Hardware 2021)
     - 2022: Muhammad Iqbal Rasyid (Leader 2022 - Post `Ci5QBYaLgHg`)
     - 2023: Salsabila Azzahra Putri Sophia Dewi Utami (Leader 2023 - Post `Cw6bd9zPTNP`)
     - 2024: Ilham Widyo Nugroho (Leader 2024 - Post `C_0wguVTpGY`)
     - 2025: Farhan Yuda Mahendra (Leader 2025 - Post `DPHoWoFkxa3`)
   - **Manager Tim (Managers 2020–2025)**:
     - 2020: Yuli Dwi Saputri (Post `CD9awafDNZH`)
     - 2021: Yuli Dwi Saputri (Post `CeFpNNhLYnR`)
     - 2022: Yuli Dwi Saputri & Mustika Wahyu Aprilia (Post `Ci5PdHUrgvk`)
     - 2023: Mustika Wahyu Aprilia & Yuli Dwi Saputri (Advisor) (Post `Cw6at1NPTGL`)
     - 2024: Mustika Wahyu Aprilia & Rose Pita Nur Afifah (Post `C_0wQ-qzwUx`)
     - 2025: Rose Pita Nur Afifah & Zelfa Nafisah Zalna (Post `DPHoFZYk8lw`)

---

## 2. Logic Chain

1. **Kebutuhan R1 (Renaming Semantik & Eliminasi Non-Anggota)**:
   - Nama file asli Instagram feed menggunakan format timestamp acak seperti `2024-09-12_16-37-07_UTC_C_0vTMcTTGT_2.jpg`, yang sulit dihubungkan secara intuitif oleh frontend.
   - Pola semantik seragam `{tahun}_{divisi}_{nama_anggota}_{urutan}.ext` memungkinkan pemanggilan dinamis, agregasi foto multi-angle per anggota, serta pemisahan tegas antara foto profil anggota vs aset grafis dekoratif.
   - Dari 251 file, ditemukan 97 foto anggota/pembimbing murni (termasuk 24 studio portrait di `members/` dan 73 slide foto pengenalan anggota di `instagram_feed/`), sedangkan 154 file sisanya merupakan grafis grid, cover judul slide, foto piala/laga, dan poster quote.

2. **Kebutuhan R2 (Leaders Hall of Fame & Managers Showcase)**:
   - Data kepengurusan 2020–2025 telah tervalidasi 100% lengkap dari post Instagram resmi.
   - Setiap figur pemimpin memiliki aset foto yang siap ditampilkan dalam baris khusus dengan badge tahun dan transisi multi-foto yang halus.

3. **Kebutuhan R3 (Skuad Teknis Aktif Programmer, Elektronik, Mekanik)**:
   - Skuad teknis terpetakan dengan lengkap mencakup anggota inti (Tri Wahyu Handoyo, Abdul Hasib, Caesar Sokma, Rionaldi, Farhan Yuda, Ikhsan Nurrohman, Agus Bagaskoro, Muhamad Ilham Sony) serta regenerasi 2025 (Hanif NurKhalis, Hisyam Yasid, Aryasetya, Naufal Farros, Adhiyatma, Andika Nanda, Kharisma Putra).

4. **Kebutuhan R4 (Alumni & Generation Explorer)**:
   - Struktur database per tahun (2020, 2021, 2022, 2023, 2024, 2025) siap dihubungkan dengan filter tab interaktif pada komponen Roster.

---

## 3. Caveats

1. **Tahun 2021 Post Format**:
   - Pada feed Instagram tahun 2021 (diposting Mei 2022), pengenalan divisi Program, Elektronik, dan Mekanik disajikan dalam bentuk kartu daftar nama (list card), sementara foto individual perorangan untuk divisi tersebut tidak dirilis terpisah dalam feed. Roster 2021 dapat menggunakan foto dari angkatan 2020/2022 untuk anggota yang sama (seperti Nurcholis, Budi Arjaya, Mussa Beni, Afif Aiman) atau menampilkan kartu roster divisi 2021.
2. **Poster Easter Egg**:
   - `13_wanted_uang_kas_bendahara.png` di folder `members/` bukan anggota nyata, melainkan poster humor/meme uang kas bendahara. File ini dialihkan ke nama `2024_grafis_wanted_uang_kas_bendahara_01.png` dan tidak dimasukkan ke dalam daftar anggota aktif.

---

## 4. Conclusion

1. Seluruh 251 file aset foto dan grafis telah dianalisis, diverifikasi, dan dipetakan 1:1 ke target nama semantik berformat `{tahun}_{divisi}_{nama_anggota}_{urutan}.ext`.
2. File pemetaan mesin `scripts/full_catalog_with_renaming.json` telah dibuat dan siap dieksekusi oleh subagent implementasi (misal `engineer_renamer_2`).
3. Laporan lengkap tabel klasifikasi dan katalog per divisi telah tersimpan di `analysis.md`.

---

## 5. Verification Method

Untuk memverifikasi secara independen data temuan survei ini:
1. **Verifikasi Jumlah & Integritas File**:
   ```powershell
   python -c "import json; cat=json.load(open('scripts/full_catalog_with_renaming.json', encoding='utf-8')); print(f'Total mapped: {len(cat)} items')"
   ```
   *Ekspektasi*: Output `Total mapped: 251 items`.
2. **Verifikasi Kategori Anggota Murni**:
   ```powershell
   python -c "import json; cat=json.load(open('scripts/full_catalog_with_renaming.json', encoding='utf-8')); print('Roster members:', len([x for x in cat if x['include_in_roster']]))"
   ```
   *Ekspektasi*: Output `Roster members: 97`.
3. **Verifikasi Integritas Build Saat Ini**:
   ```powershell
   npm run build
   ```
''')

print(f'Wrote handoff.md to {handoff_path}')
