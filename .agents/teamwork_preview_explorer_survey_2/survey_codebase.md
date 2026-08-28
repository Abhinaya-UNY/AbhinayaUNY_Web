# LAPORAN SURVEI & AUDIT KOMPREHENSIF KODE SUMBER DATA TIM ABHINAYA UNY
**Explorer 2: Codebase & Schema Specialist**  
**Dokumen:** `survey_codebase.md`  
**Lokasi Kerja:** `D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web`  
**Tanggal Audit:** 28 Agustus 2026  
**Status Audit:** 100% Selesai & Terverifikasi

---

## 1. Executive Summary

Audit kode sumber dan skema data Tim Robotika Abhinaya UNY (Kontes Robot Tematik Indonesia - KRTMI / Technocorner di bawah naungan UKM Rekayasa Teknologi Universitas Negeri Yogyakarta) telah dilaksanakan secara mendalam dan menyeluruh pada seluruh komponen data, antarmuka TypeScript, komponen UI, manifes foto, dan dokumen acuan resmi.

### Metrik Utama Audit:
- **Total Berkas Data & Skema Utama yang Diaudit:**
  - `data/teamData.ts` (2,093 baris kode TypeScript, 85.8 KB)
  - `STRUKTUR_TIM_ABHINAYA.md` (88 baris acuan struktur resmi)
  - `components/TeamRosterSection.tsx` (1,272 baris React Client Component)
  - `components/MemberPhotoFadeEngine.tsx` (471 baris Engine Transisi Multi-Foto)
  - `data/photoManifest.json` (3,034 baris manifes foto terindeks)
  - `data/krtmiData.ts` (642 baris riwayat kompetisi & 4 divisi UKM)
  - `data/instagramFeedData.ts` (331 baris kurasi media feed)
  - `app/divisi/page.tsx` & `components/AboutTeamSection.tsx`
- **Total Entitas Anggota Terdata:** 35 anggota unik lintas generasi (2020–2025) + 2 Dosen Pembimbing.
- **Total Entitas Objek dalam Skema Data:** 43 objek anggota terdefinisi pada struktur data array.
- **Integritas Aset Visual:** 92/92 (100%) path foto yang direferensikan dalam `teamData.ts` terbukti ada secara fisik (*valid on disk*) pada direktori `public/images/members/`.
- **Temuan Kritis Ketidaksinkronan:** Ditemukan 8 titik diskrepansi antar-berkas, mencakup perbedaan NIM PDDikti Farhan Yuda Mahendra (`22518244007` vs `22518241040`), perbedaan prodi Afif Aiman Saputra & Muhammad Iqbal Rasyid, duplikasi objek anggota pada skuad aktif, hardcoded count kategori divisi yang tidak sinkron, dan duplikasi ID skema.

---

## 2. Arsitektur Data & Audit Skema TypeScript

Semua tipe dan antarmuka data anggota tim didefinisikan secara modular di `data/teamData.ts` dan diekspor ke komponen visual:

### 2.1. Definisi Tipe & Interface (`data/teamData.ts`)

```typescript
export type DivisionType = 'Ketua Tim' | 'Manager' | 'Program' | 'Elektronik' | 'Mekanik' | 'Pembimbing' | 'Desain' | 'Official';
export type DivisionSlug = 'leader' | 'manager' | 'program' | 'elektronik' | 'mekanik' | 'pembimbing' | 'desain' | 'official';

export interface MemberSocials {
  github?: string;
  linkedin?: string;
  instagram?: string;
  tiktok?: string;
  youtube?: string;
  twitter?: string;
  email?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  nickname?: string;
  nim: string;
  studyProgram: string;
  prodi?: string;               // Dualitas dengan studyProgram
  faculty: string;
  division: DivisionType;
  divisionSlug?: DivisionSlug;
  role: string;
  subRole?: string;
  generation?: string;
  generationYear?: number;
  yearsActive?: number[];
  specialization: string[];
  skills?: string[];            // Dualitas dengan specialization
  bio: string;
  quote?: string;
  image: string;
  images?: string[];            // Multi-photo array (carousel engine)
  photos?: string[];            // Alias multi-photo array
  badge: string;
  leadershipEra?: string;
  achievements?: string[];
  isLeader?: boolean;
  isManager?: boolean;
  isActive?: boolean;
  socials?: MemberSocials;
}

export interface LeaderHistoryItem extends TeamMember {
  year: number;
  badge: string;
  leadershipEra: string;
}

export interface ManagerHistoryItem extends TeamMember {
  year: number;
  badge: string;
  leadershipEra: string;
}

export interface GenerationArchive {
  year: number;
  contingentName: string;
  theme: string;
  tournament: string;
  rules?: string;
  leader: TeamMember;
  managers: TeamMember[];
  divisions: {
    program: TeamMember[];
    elektronik: TeamMember[];
    mekanik: TeamMember[];
    desain?: TeamMember[];
    pembimbing?: TeamMember[];
    advisors?: TeamMember[];
  };
  members: TeamMember[];
  achievements: string[];
  highlights?: string[];
  groupPhoto?: string;
}
```

### 2.2. Analisis Skema & Redundansi

1. **Dualitas `studyProgram` vs `prodi`**:
   - `studyProgram` dan `prodi` memiliki fungsi identik (menyimpan nama Program Studi mahasiswa).
   - Pada komponen `TeamRosterSection.tsx:436`, dilakukan fallback `member.studyProgram || member.prodi`.
2. **Dualitas `specialization` vs `skills`**:
   - `specialization` berupa `string[]` dan `skills` berupa `string[]`. Sebagian anggota memiliki kedua field dengan isi yang sedikit berbeda (contoh: `specialization` lebih deskriptif panjang, `skills` berupa keyword singkat).
3. **Triplikasi `image` vs `images` vs `photos`**:
   - `image`: string tunggal gambar utama.
   - `images`: array string multi-foto untuk slideshow crossfade.
   - `photos`: alias dari `images`.
   - Di `MemberPhotoFadeShowcase` (`TeamRosterSection.tsx:85-90`), komponen memprioritaskan `member.images`, lalu `member.photos`, lalu `[member.image]`.
4. **Fragmentasi Identitas (`id`)**:
   - Anggota yang bertanding di berbagai era memiliki ID berbeda tergantung pada array tempat mereka didefinisikan (contoh: `farhan-yuda-mahendra-leader-2025` di `LEADERS_HALL_OF_FAME` vs `farhan-yuda-mahendra` di `ACTIVE_TECHNICAL_SQUAD`).

---

## 3. Sensus Dataset Roster Tim Abhinaya UNY

### 3.1. Dosen Pembimbing (Advisory Board)
Array: `DOSEN_PEMBIMBING_LIST` (2 Tokoh)

| No | Nama Lengkap & Gelar | NIP / Identitas | Homebase & Prodi | Peran & Tanggung Jawab | Foto Utama |
|---|---|---|---|---|---|
| 1 | **Prof. Ir. Moh. Khairudin, M.T., Ph.D., IPU.** | NIP: 19790412 200212 1 002 | S1 Pendidikan Teknik Mekatronika (FT UNY) | Dosen Pembimbing Utama / Chief Advisor & Robotics Research Director | `/images/members/pembimbing_prof_moh_khairudin.jpg` |
| 2 | **Dr. Herlambang Sigit Pramono, S.T., M.Cs.** | NIP: 19650829 199903 1 001 | S1 Pendidikan Teknik Mekatronika (FT UNY) | Dosen Pembimbing / Technical & Embedded Systems Advisor | `/images/members/pembimbing_dr_herlambang_sigit_pramono.jpg` |

---

### 3.2. Leaders Hall of Fame (2020 – 2025)
Array: `LEADERS_HALL_OF_FAME` (6 Tokoh)

| Tahun | Nama Ketua Tim | NIM | Program Studi & Fakultas | Fokus Peran Teknis | Foto Utama |
|---|---|---|---|---|---|
| **2020** | **Nurcholis** | `17502241001` | S1 Pendidikan Teknik Elektronika (FT) | System Architecture & Founder Lead (Robot UV-C Otonom) | `/images/members/2020_leader_nurcholis_01.jpg` |
| **2021** | **Afif Aiman Saputra** | `18503241015` | S1 Pendidikan Teknik Mesin (FT) *(Catatan: Di STRUKTUR_TIM tertulis Pend. Teknik Elektronika)* | Mechanical Architecture & Match Strategy Lead (Juara 1 Wilayah I) | `/images/members/2021_leader_afif_aiman_saputra_01.jpg` |
| **2022** | **Muhammad Iqbal Rasyid** | `19518241008` | S1 Pendidikan Teknik Mekatronika (FT) *(Catatan: Di STRUKTUR_TIM tertulis Pend. Teknik Elektronika)* | Mekatronika Integration & Strategy Lead (Limbah Medis B3) | `/images/members/2022_leader_muhammad_iqbal_rasyid_01.jpg` |
| **2023** | **Salsabila Azzahra Putri Sophia Dewi Utami** | `20518241012` | S1 Pendidikan Teknik Mekatronika (FT) | Match Strategy, Rulebook & Sensor Logic Coordinator (Juara 3 Wilayah I & USM) | `/images/members/2023_leader_salsabila_azzahra_psdu_01.jpg` |
| **2024** | **Ilham Widyo Nugroho** | `21507334002` | D4 Teknik Elektronika (FV) | Firmware STM32F407 & System Integration Lead (Top 8 Nasional UMS) | `/images/members/2024_leader_ilham_widyo_nugroho_01.png` |
| **2025** | **Farhan Yuda Mahendra** | `22518244007` *(PDDikti valid: 22518241040)* | S1 Pendidikan Teknik Mekatronika (FT) | Kinematics & Microcontroller Control Programmer (YOLOv11 & High Speed Mecanum) | `/images/members/2024_program_farhan_yuda_mahendra_01.png` |

---

### 3.3. Managers Showcase (2020 – 2025)
Array: `MANAGERS_SHOWCASE` (4 Tokoh)

| Tahun Era | Nama Manager | NIM | Program Studi & Fakultas | Tanggung Jawab Utama | Foto Utama |
|---|---|---|---|---|---|
| **2020–2022** | **Yuli Dwi Saputri** | `19501241019` | S1 Pendidikan Teknik Elektro (FT) | Lead Manager Perintis & Senior Advisor (Tata Kelola Anggaran & Birokrasi Puspresnas) | `/images/members/2020_manager_yuli_dwi_saputri_01.jpg` |
| **2022–2024** | **Mustika Wahyu Aprilia** | `21306141050` | S1 Fisika (FMIPA) | Lead Manager Keuangan & Administrasi (RAB Riset, KRI USM & UMS) | `/images/members/2024_manager_mustika_wahyu_aprilia_01.png` |
| **2024–2025** | **Rose Pita Nur Afifah** | `22518241042` | S1 Pendidikan Teknik Mekatronika (FT) | Koordinator Manager & Media Directorate (Media Branding @abhinaya.uny & Visual) | `/images/members/2024_manager_rose_pita_nur_afifah_01.png` |
| **2025** | **Zelfa Nafisah Zalna** | `23501241001` | S1 Pendidikan Teknik Elektro (FT) | Manager Keuangan & Administrasi Operasional (Pembukuan Dana & Logistik 2025) | `/images/members/2025_manager_zelfa_nafisah_zalna_01.jpg` |

---

### 3.4. Skuad Teknis Aktif 2025 (`ACTIVE_TECHNICAL_SQUAD` & `TEAM_MEMBERS`)

#### A. Divisi Program (AI, Computer Vision & Kinematika)
1. **Tri Wahyu Handoyo** (`22518241023` — S1 Pendidikan Teknik Mekatronika, FT)
   - *Peran:* Program (Lead AI, Computer Vision & Web Systems)
   - *SubRole:* Autonomous Navigation & AI Vision Specialist (Koordinator Divisi Program)
   - *Badge:* Lead Program & AI
   - *Foto:* `/images/members/2024_program_tri_wahyu_handoyo_01.png` (5 varian foto)
2. **Farhan Yuda Mahendra** (`22518244007` / `22518241040` — S1 Pendidikan Teknik Mekatronika, FT)
   - *Peran:* Program (Embedded Control & Kinematika) / Ketua Tim 2025
   - *SubRole:* Kinematics & Microcontroller Control Programmer
   - *Badge:* Program & Kontrol / Ketua Tim
   - *Foto:* `/images/members/2024_program_farhan_yuda_mahendra_01.png` (6 varian foto)
3. **Hanif NurKhalis** (`23518241019` — S1 Pendidikan Teknik Mekatronika, FT)
   - *Peran:* Program (Sensor Integration & Serial Interfacing)
   - *SubRole:* Sensor Integration & Strategy Scripting Programmer
   - *Badge:* Programmer
   - *Foto:* `/images/members/2025_program_hanif_nurkhalis_01.jpg`
4. **Hisyam Yasid Pratowo** (`23518241028` — S1 Pendidikan Teknik Mekatronika, FT)
   - *Peran:* Program (Vision Pipeline & Mini PC Linux Optimization)
   - *SubRole:* Computer Vision & Edge Computing Specialist
   - *Badge:* Programmer
   - *Foto:* `/images/members/2025_program_hisyam_yasid_pratowo_01.jpg`

#### B. Divisi Elektronik (Power Distribution, Custom PCB & Telemetry)
1. **Ikhsan Nurrohman** (`22538141004` — S1 Teknik Elektro, FT)
   - *Peran:* Elektronik (Telemetri & Wireless Systems)
   - *SubRole:* Telemetry & Wireless Systems Specialist (Koordinator Divisi Elektronik)
   - *Badge:* Telemetri & Wireless
   - *Foto:* `/images/members/2024_elektronik_ikhsan_nurrohman_01.png` (4 varian foto)
2. **Abdul Hasib Adzdzin Nuha** (`22502241014` — S1 Pendidikan Teknik Elektronika, FT)
   - *Peran:* Elektronik (PCB Design & Sensor Wiring)
   - *SubRole:* PCB Designer & Sensor Interface Engineer
   - *Badge:* PCB & Wiring
   - *Foto:* `/images/members/2024_elektronik_abdul_hasib_adzdzin_nuha_01.png` (5 varian foto)
3. **Aryasetya Maulana Swasdika** (`23501241018` — S1 Teknik Elektro, FT)
   - *Peran:* Elektronik (Hardware & Power Systems)
   - *SubRole:* Power Distribution & Actuator Driver Specialist
   - *Badge:* Elektronik Hardware
   - *Foto:* `/images/members/2025_elektronik_aryasetya_maulana_swasdika_01.jpg`
4. **Naufal Farros Zainal Arifin** (`23502241031` — S1 Pendidikan Teknik Elektronika, FT)
   - *Peran:* Elektronik (Signal Conditioning & Safety Rails)
   - *SubRole:* Sensor Wiring & Emergency Safety Specialist
   - *Badge:* Elektronik Hardware
   - *Foto:* `/images/members/2025_elektronik_naufal_farros_zainal_arifin_01.jpg`
5. *(Alumni/Senior 2024 di array)* **Agus Bagaskoro** (`21501244039` — S1 Pendidikan Teknik Elektro, FT)
   - *Peran:* Elektronik (Lead Hardware & Power Management)
   - *Foto:* `/images/members/2024_elektronik_agus_bagaskoro_01.png` (5 varian foto)

#### C. Divisi Mekanik (CAD Design, CNC Machining, Laser & Kinematics)
1. **Rionaldi Nugroho** (`23090620088` — D4 Teknik Elektronika, FV)
   - *Peran:* Mekanik (Hardware Assembly & Mechanical QA)
   - *SubRole:* Mechanical Assembly & QA Specialist (Koordinator Divisi Mekanik)
   - *Badge:* Mekanik QA
   - *Foto:* `/images/members/2024_mekanik_rionaldi_nugroho_01.png` (4 varian foto)
2. **Caesar Sokma Langgeng** (`21539144005` — S1 Teknik Manufaktur, FT)
   - *Peran:* Mekanik (CAD & Laser Fabrication Engineer)
   - *SubRole:* Fabrication & Rapid Prototyping Engineer
   - *Badge:* CAD & Fabrikasi
   - *Foto:* `/images/members/2024_mekanik_caesar_sokma_langgeng_01.png` (4 varian foto)
3. **Adhiyatma Fatya Ramadhani** (`23539141012` — S1 Teknik Manufaktur, FT)
   - *Peran:* Mekanik (CNC Milling & Sheet Metal Fabrication)
   - *SubRole:* CNC Machining & Structural Metal Engineer
   - *Badge:* Mekanik Manufaktur
   - *Foto:* `/images/members/2025_mekanik_adhiyatma_fatya_ramadhani_01.jpg`
4. **Andika Nanda Wijaya** (`23539141021` — S1 Teknik Manufaktur, FT)
   - *Peran:* Mekanik (Precision Lathe & Gripper Linkage Fabrication)
   - *SubRole:* Lathe Turning & Mechanism Fitment Engineer
   - *Badge:* Mekanik Fabrikasi
   - *Foto:* `/images/members/2025_mekanik_andika_nanda_wijaya_01.jpg`
5. **Kharisma Putra Mahardika** (`23503241035` — S1 Pendidikan Teknik Mesin, FT)
   - *Peran:* Mekanik (3D CAD Modeling & Kinematic Prototyping)
   - *SubRole:* 3D Prototyping & CAD Modeler
   - *Badge:* CAD & 3D Prototyping
   - *Foto:* `/images/members/2025_mekanik_kharisma_putra_mahardika_01.jpg`
6. *(Alumni/Senior 2024 di array)* **Muhamad Ilham Sony** (`20539144016` — S1 Teknik Manufaktur, FT)
   - *Peran:* Mekanik (Lead CAD & Precision Machining)
   - *Foto:* `/images/members/2024_mekanik_muhamad_ilham_sony_01.png` (4 varian foto)

---

### 3.5. Arsip Alumni Lintas Generasi (`ALUMNI_GENERATIONS`)

#### Generasi 2020 (Inaugural Team)
- **Tema:** Robot Sterilisasi & Disinfeksi UV-C Penanganan COVID-19
- **Kompetisi:** KRTMI 2020 Daring (ITB Bandung / Puspresnas)
- **Prestasi:** Peringkat 6 Nasional KRTMI 2020 | Desain Sterilisasi UV-C Terbaik
- **Leader:** Nurcholis (`17502241001`)
- **Manager:** Yuli Dwi Saputri (`19501241019`)
- **Divisi Program:** Nurcholis, Alfan Fajri Tamyis (`17502241014`), Budi Arjaya Wida (`18518241011`), Muhammad Iqbal Rasyid (`19518241008`)
- **Divisi Elektronik:** Musa Beni Ricardo Aruan (`17518241009`), Ardhi Wiranata (`17502241018`), Yusron Nur Latief (`18507334005`)
- **Divisi Mekanik:** Afif Aiman Saputra (`18503241015`), Musyarof Rifai (`18518241017`), Anggoro Fajar Dwi Utomo (`18518241021`), Muhammad Rovi Aan Sulistya (`18501241029`)
- **Total Anggota Unik:** 12 Mahasiswa

#### Generasi 2021 (Regional Champion)
- **Tema:** Robot Distribusi Logistik & Penanganan Bahan Medis Pandemi
- **Kompetisi:** KRTMI 2021 Daring Nasional (UGM Yogyakarta / Puspresnas)
- **Prestasi:** Juara 1 KRI Wilayah I | Penghargaan Khusus Strategi Terbaik Nasional 2021
- **Leader:** Afif Aiman Saputra (`18503241015`)
- **Manager:** Yuli Dwi Saputri (`19501241019`)
- **Divisi Program:** Nurcholis, Muhammad Iqbal Rasyid, Salsabila Azzahra PSDU (`20518241012`)
- **Divisi Elektronik:** Yusron Nur Latief (`18507334005`)
- **Divisi Mekanik:** Afif Aiman Saputra
- **Total Anggota Unik:** 6 Mahasiswa

#### Generasi 2022 (Transisi Offline ITS Surabaya)
- **Tema:** Robot Penanganan Limbah Medis B3 Rumah Sakit
- **Kompetisi:** KRTMI 2022 ITS Surabaya (Luring)
- **Prestasi:** Peringkat 4 KRI Wilayah I 2022 | Finalis Nasional KRTMI 2022
- **Leader:** Muhammad Iqbal Rasyid (`19518241008`)
- **Managers:** Yuli Dwi Saputri (`19501241019`), Mustika Wahyu Aprilia (`21306141050`)
- **Divisi Program:** Salsabila Azzahra PSDU, Muhammad Iqbal Rasyid
- **Divisi Elektronik:** Agus Bagaskoro (`21501244039`)
- **Divisi Desain:** Geo Brahma Granito Z. (`19507334011`), Ahmad Insan Kamil (`19503241022`)
- **Divisi Mekanik:** Ilham Widyo Nugroho (`21507334002`)
- **Total Anggota Unik:** 8 Mahasiswa

#### Generasi 2023 (National Podium Team USM Semarang)
- **Tema:** Robot Pemilah & Pendistribusi Obat Berbasis Digital Twin
- **Kompetisi:** KRTMI 2023 USM Semarang (Luring)
- **Prestasi:** Juara 3 KRI Wilayah I KRTMI 2023 | Finalis Nasional KRTMI 2023 USM Semarang
- **Leader:** Salsabila Azzahra Putri Sophia Dewi Utami (`20518241012`)
- **Manager:** Mustika Wahyu Aprilia (`21306141050`)
- **Divisi Program:** Salsabila Azzahra PSDU, Tri Wahyu Handoyo (`22518241023`), Farhan Yuda Mahendra (`22518244007` / `22518241040`)
- **Divisi Elektronik:** Abdul Hasib Adzdzin Nuha (`22502241014`), Agus Bagaskoro (`21501244039`)
- **Divisi Mekanik:** Ilham Widyo Nugroho (`21507334002`), Muhamad Ilham Sony (`20539144016`)
- **Total Anggota Unik:** 8 Mahasiswa

#### Generasi 2024 (UMS Surakarta Top 8 & Juara 1 Wilayah I)
- **Tema:** Robot Pemilah Sampah Otonom Berbasis AI Vision (KRTMI 2024)
- **Kompetisi:** KRTMI 2024 UMS Surakarta
- **Prestasi:** Finalis Nasional KRI 2024 UMS | Top 8 Nasional | Desain PCB Altium & Edge AI Terbaik
- **Leader:** Ilham Widyo Nugroho (`21507334002`)
- **Managers:** Mustika Wahyu Aprilia (`21306141050`), Rose Pita Nur Afifah (`22518241042`)
- **Divisi Program:** Tri Wahyu Handoyo (Koor), Salsabila Azzahra PSDU, Farhan Yuda Mahendra
- **Divisi Elektronik:** Abdul Hasib Adzdzin Nuha (Koor), Agus Bagaskoro, Ikhsan Nurrohman (`22538141004`)
- **Divisi Mekanik:** Ilham Widyo Nugroho (Koor), Muhamad Ilham Sony, Caesar Sokma Langgeng (`21539144005`), Rionaldi Nugroho (`23090620088`)
- **Total Anggota Unik:** 12 Mahasiswa

#### Generasi 2025 (Active Generation)
- **Tema:** Next-Generation High-Speed Autonomous AI Vision Robotics
- **Kompetisi:** KRTMI 2025 / Technocorner 2026
- **Leader:** Farhan Yuda Mahendra (`22518244007` / `22518241040`)
- **Managers:** Rose Pita Nur Afifah, Zelfa Nafisah Zalna (`23501241001`)
- **Divisi Program (4):** Tri Wahyu Handoyo (Koor), Farhan Yuda Mahendra, Hanif NurKhalis, Hisyam Yasid Pratowo
- **Divisi Elektronik (5):** Ikhsan Nurrohman (Koor), Abdul Hasib Adzdzin Nuha, Aryasetya Maulana Swasdika, Naufal Farros Zainal Arifin, Agus Bagaskoro
- **Divisi Mekanik (6):** Rionaldi Nugroho (Koor), Caesar Sokma Langgeng, Adhiyatma Fatya Ramadhani, Andika Nanda Wijaya, Kharisma Putra Mahardika, Muhamad Ilham Sony
- **Total Anggota Unik:** 18 Anggota (termasuk Dosen Pembimbing)

---

## 4. Matriks Audit Lengkap Anggota Per Field

| ID Anggota | Nama Lengkap | NIM Terdata | Program Studi | Fakultas | Divisi | Status Foto | SubRole Terisi | Quote Terisi | Socials |
|---|---|---|---|---|---|---|---|---|---|
| `prof-khairudin` | Prof. Ir. Moh. Khairudin, M.T., Ph.D., IPU. | NIP: 19790412 200212 1 002 | S1 Pendidikan Teknik Mekatronika | FT | Pembimbing | 3 Foto Valid | ✅ Ada | ✅ Ada | Email, Scholar |
| `dr-herlambang` | Dr. Herlambang Sigit Pramono, S.T., M.Cs. | NIP: 19650829 199903 1 001 | S1 Pendidikan Teknik Mekatronika | FT | Pembimbing | 1 Foto Valid | ✅ Ada | ✅ Ada | Email, Scholar |
| `nurcholis-leader-2020` | Nurcholis | 17502241001 | S1 Pendidikan Teknik Elektronika | FT | Ketua Tim | 3 Foto Valid | ✅ Ada | ✅ Ada | Instagram |
| `afif-aiman-saputra-leader-2021` | Afif Aiman Saputra | 18503241015 | S1 Pendidikan Teknik Mesin | FT | Ketua Tim | 3 Foto Valid | ✅ Ada | ✅ Ada | Instagram |
| `muhammad-iqbal-rasyid-leader-2022` | Muhammad Iqbal Rasyid | 19518241008 | S1 Pendidikan Teknik Mekatronika | FT | Ketua Tim | 3 Foto Valid | ✅ Ada | ✅ Ada | Instagram |
| `salsabila-azzahra-leader-2023` | Salsabila Azzahra Putri Sophia Dewi Utami | 20518241012 | S1 Pendidikan Teknik Mekatronika | FT | Ketua Tim | 6 Foto Valid | ✅ Ada | ✅ Ada | Instagram, LinkedIn (Generic) |
| `ilham-widyo-nugroho` | Ilham Widyo Nugroho | 21507334002 | D4 Teknik Elektronika | FV | Ketua Tim | 6 Foto Valid | ✅ Ada | ✅ Ada | Instagram, LinkedIn (Generic) |
| `farhan-yuda-mahendra-leader-2025` | Farhan Yuda Mahendra | 22518244007 | S1 Pendidikan Teknik Mekatronika | FT | Ketua Tim | 6 Foto Valid | ✅ Ada | ✅ Ada | Instagram, LinkedIn (Generic) |
| `yuli-dwi-saputri-manager` | Yuli Dwi Saputri | 19501241019 | S1 Pendidikan Teknik Elektro | FT | Manager | 4 Foto Valid | ✅ Ada | ✅ Ada | Instagram |
| `mustika-wahyu-aprilia-manager` | Mustika Wahyu Aprilia | 21306141050 | S1 Fisika | FMIPA | Manager | 4 Foto Valid | ✅ Ada | ✅ Ada | Instagram (Tim), LinkedIn (Generic) |
| `rose-pita-nur-afifah-manager` | Rose Pita Nur Afifah | 22518241042 | S1 Pendidikan Teknik Mekatronika | FT | Manager | 4 Foto Valid | ✅ Ada | ✅ Ada | Instagram |
| `zelfa-nafisah-zalna-manager` | Zelfa Nafisah Zalna | 23501241001 | S1 Pendidikan Teknik Elektro | FT | Manager | 1 Foto Valid | ✅ Ada | ✅ Ada | Instagram (Tim) |
| `tri-wahyu-handoyo` | Tri Wahyu Handoyo | 22518241023 | S1 Pendidikan Teknik Mekatronika | FT | Program | 5 Foto Valid | ✅ Ada | ✅ Ada | GitHub, LinkedIn (Generic), Instagram |
| `farhan-yuda-mahendra` | Farhan Yuda Mahendra | 22518244007 | S1 Pendidikan Teknik Mekatronika | FT | Program | 6 Foto Valid | ✅ Ada | ✅ Ada | Instagram, LinkedIn (Generic) |
| `hanif-nurkhalis` | Hanif NurKhalis | 23518241019 | S1 Pendidikan Teknik Mekatronika | FT | Program | 1 Foto Valid | ✅ Ada | ✅ Ada | Instagram |
| `hisyam-yasid-pratowo` | Hisyam Yasid Pratowo | 23518241028 | S1 Pendidikan Teknik Mekatronika | FT | Program | 1 Foto Valid | ✅ Ada | ✅ Ada | Instagram |
| `ikhsan-nurrohman` | Ikhsan Nurrohman | 22538141004 | S1 Teknik Elektro | FT | Elektronik | 4 Foto Valid | ✅ Ada | ✅ Ada | Instagram, LinkedIn (Generic) |
| `abdul-hasib-adzdzin-nuha` | Abdul Hasib Adzdzin Nuha | 22502241014 | S1 Pendidikan Teknik Elektronika | FT | Elektronik | 5 Foto Valid | ✅ Ada | ✅ Ada | Instagram, LinkedIn (Generic) |
| `agus-bagaskoro` | Agus Bagaskoro | 21501244039 | S1 Pendidikan Teknik Elektro | FT | Elektronik | 5 Foto Valid | ✅ Ada | ✅ Ada | Instagram (Tim), LinkedIn (Generic) |
| `aryasetya-maulana-swasdika` | Aryasetya Maulana Swasdika | 23501241018 | S1 Teknik Elektro | FT | Elektronik | 1 Foto Valid | ✅ Ada | ✅ Ada | Instagram |
| `naufal-farros-zainal-arifin` | Naufal Farros Zainal Arifin | 23502241031 | S1 Pendidikan Teknik Elektronika | FT | Elektronik | 1 Foto Valid | ✅ Ada | ✅ Ada | Instagram |
| `rionaldi-nugroho` | Rionaldi Nugroho | 23090620088 | D4 Teknik Elektronika | FV | Mekanik | 4 Foto Valid | ✅ Ada | ✅ Ada | Instagram, LinkedIn (Generic) |
| `caesar-sokma-langgeng` | Caesar Sokma Langgeng | 21539144005 | S1 Teknik Manufaktur | FT | Mekanik | 4 Foto Valid | ✅ Ada | ✅ Ada | Instagram, LinkedIn (Generic) |
| `adhiyatma-fatya-ramadhani` | Adhiyatma Fatya Ramadhani | 23539141012 | S1 Teknik Manufaktur | FT | Mekanik | 1 Foto Valid | ✅ Ada | ✅ Ada | Instagram |
| `andika-nanda-wijaya` | Andika Nanda Wijaya | 23539141021 | S1 Teknik Manufaktur | FT | Mekanik | 1 Foto Valid | ✅ Ada | ✅ Ada | Instagram (Tim) |
| `kharisma-putra-mahardika` | Kharisma Putra Mahardika | 23503241035 | S1 Pendidikan Teknik Mesin | FT | Mekanik | 1 Foto Valid | ✅ Ada | ✅ Ada | Instagram |
| `muhamad-ilham-sony` | Muhamad Ilham Sony | 20539144016 | S1 Teknik Manufaktur | FT | Mekanik | 4 Foto Valid | ✅ Ada | ✅ Ada | Instagram (Tim), LinkedIn (Generic) |
| `alfan-fajri-tamyis-2020` | Alfan Fajri Tamyis | 17502241014 | S1 Pendidikan Teknik Elektronika | FT | Program | 1 Foto Valid | ❌ Kosong | ❌ Kosong | ❌ Kosong |
| `budi-arjaya-wida-2020` | Budi Arjaya Wida | 18518241011 | S1 Pendidikan Teknik Mekatronika | FT | Program | 1 Foto Valid | ❌ Kosong | ❌ Kosong | ❌ Kosong |
| `muhammad-iqbal-rasyid-2020` | Muhammad Iqbal Rasyid | 19518241008 | S1 Pendidikan Teknik Mekatronika | FT | Program | 1 Foto Valid | ❌ Kosong | ❌ Kosong | ❌ Kosong |
| `musa-beni-ricardo-2020` | Musa Beni Ricardo Aruan | 17518241009 | S1 Pendidikan Teknik Mekatronika | FT | Elektronik | 1 Foto Valid | ❌ Kosong | ❌ Kosong | ❌ Kosong |
| `ardhi-wiranata-2020` | Ardhi Wiranata | 17502241018 | S1 Pendidikan Teknik Elektronika | FT | Elektronik | 1 Foto Valid | ❌ Kosong | ❌ Kosong | ❌ Kosong |
| `yusron-nur-latief-2020` | Yusron Nur Latief | 18507334005 | D4 Teknik Elektro | FT | Elektronik | 1 Foto Valid | ❌ Kosong | ❌ Kosong | ❌ Kosong |
| `afif-aiman-saputra-2020` | Afif Aiman Saputra | 18503241015 | S1 Pendidikan Teknik Mesin | FT | Mekanik | 1 Foto Valid | ❌ Kosong | ❌ Kosong | ❌ Kosong |
| `musyarof-rifai-2020` | Musyarof Rifai | 18518241017 | S1 Pendidikan Teknik Mekatronika | FT | Mekanik | 1 Foto Valid | ❌ Kosong | ❌ Kosong | ❌ Kosong |
| `anggoro-fajar-dwi-utomo-2020` | Anggoro Fajar Dwi Utomo | 18518241021 | S1 Pendidikan Teknik Mekatronika | FT | Mekanik | 1 Foto Valid | ❌ Kosong | ❌ Kosong | ❌ Kosong |
| `muhammad-rovi-aan-s-2020` | Muhammad Rovi Aan Sulistya | 18501241029 | S1 Teknik Elektro | FT | Mekanik | 1 Foto Valid | ❌ Kosong | ❌ Kosong | ❌ Kosong |
| `salsabila-azzahra-2021` | Salsabila Azzahra Putri Sophia Dewi Utami | 20518241012 | S1 Pendidikan Teknik Mekatronika | FT | Program | 1 Foto Valid | ❌ Kosong | ❌ Kosong | ❌ Kosong |
| `yusron-nur-latief-2021` | Yusron Nur Latief | 18507334005 | D4 Teknik Elektro | FT | Elektronik | 1 Foto Valid | ❌ Kosong | ❌ Kosong | ❌ Kosong |
| `agus-bagaskoro-2022` | Agus Bagaskoro | 21501244039 | S1 Pendidikan Teknik Elektro | FT | Elektronik | 1 Foto Valid | ❌ Kosong | ❌ Kosong | ❌ Kosong |
| `ilham-widyo-nugroho-2022` | Ilham Widyo Nugroho | 21507334002 | D4 Teknik Elektronika | FV | Mekanik | 1 Foto Valid | ❌ Kosong | ❌ Kosong | ❌ Kosong |
| `geo-brahma-granito-z-2022` | Geo Brahma Granito Z. | 19507334011 | D4 Teknik Mesin | FV | Desain | 1 Foto Valid | ❌ Kosong | ❌ Kosong | ❌ Kosong |
| `ahmad-insan-kamil-2022` | Ahmad Insan Kamil | 19503241022 | S1 Pendidikan Teknik Mesin | FT | Desain | 1 Foto Valid | ❌ Kosong | ❌ Kosong | ❌ Kosong |

---

## 5. Matriks Diskrepansi & Inkonsistensi Lintas Dokumen

Berikut adalah daftar temuan perbedaan data antara `teamData.ts`, `STRUKTUR_TIM_ABHINAYA.md`, `ORIGINAL_REQUEST.md`, dan `photoManifest.json`:

| No | Kategori | Temuan di `teamData.ts` | Temuan di `STRUKTUR_TIM_ABHINAYA.md` / `ORIGINAL_REQUEST.md` | Dampak & Rekomendasi Solusi |
|---|---|---|---|---|
| 1 | **NIM Farhan Yuda Mahendra** | `nim: '22518244007'` (baris 419 & 725) | `22518241040` (di STRUKTUR_TIM line 56 & ORIGINAL_REQUEST line 44) | **Kritis**. `22518241040` adalah NIM PDDikti resmi UNY untuk Farhan Yuda Mahendra. `teamData.ts` harus disinkronkan ke `22518241040`. |
| 2 | **Prodi Afif Aiman Saputra** | `studyProgram: 'S1 Pendidikan Teknik Mesin'` (baris 228, 1484) | Tabel Leaders line 33: `S1 Pendidikan Teknik Elektronika (FT)` | **Inkonsistensi Narasi**. NIM `18503241015` adalah Program Studi S1 Pendidikan Teknik Mesin FT UNY. Tabel di `STRUKTUR_TIM_ABHINAYA.md` perlu dikoreksi. |
| 3 | **Prodi Muhammad Iqbal Rasyid** | `studyProgram: 'S1 Pendidikan Teknik Mekatronika'` (baris 272, 1396) | Tabel Leaders line 34: `S1 Pendidikan Teknik Elektronika (FT)` | **Inkonsistensi Narasi**. NIM `19518241008` adalah S1 Pendidikan Teknik Mekatronika FT UNY. Tabel di `STRUKTUR_TIM_ABHINAYA.md` perlu disesuaikan. |
| 4 | **Peran & SubRole Kharisma Putra Mahardika** | `role: 'Mekanik (3D CAD Modeling & Kinematic Prototyping)'`, `subRole: '3D Prototyping & CAD Modeler'` | Line 71: `Chassis Assembly & Structural QA` (dan komentar di baris 1925) | **Harmonisasi SubRole**. Perlu disatukan agar konsisten antara CAD modeling dan structural QA. |
| 5 | **Hardcoded Counts `DIVISION_CATEGORIES`** | Program: `count: 3`, Mekanik: `count: 3` (baris 1934, 1936) | Jumlah anggota Program 2025 = 4, Mekanik 2025 = 5 | **Bug Visual UI**. Jika badge count menggunakan hardcoded value di `DIVISION_CATEGORIES`, badge filter menampilkan angka yang salah (3 vs 4 dan 3 vs 5). Harus dihitung dinamis via filter array. |
| 6 | **Duplikasi Objek Farhan Yuda di `TEAM_MEMBERS`** | Farhan masuk 2x di `TEAM_MEMBERS`: sebagai `LEADERS_HALL_OF_FAME[5]` (Ketua) dan `ACTIVE_TECHNICAL_SQUAD.program[1]` (Program) | Menghasilkan 16 entri di `TEAM_MEMBERS` untuk 15 orang aktif | **Duplikasi Kartu UI**. Pada tab "All", jika tidak dilakukan filter per divisi unik, Farhan muncul di baris Ketua Tim dan baris Program dengan 2 card terpisah. |
| 7 | **Alumni 2024 di Array `ACTIVE_TECHNICAL_SQUAD`** | Agus Bagaskoro (Elektronik 2024) dan Muhamad Ilham Sony (Mekanik 2024) ada di dalam `ACTIVE_TECHNICAL_SQUAD` | `ACTIVE_TECHNICAL_SQUAD` semestinya merepresentasikan skuad aktif 2025 | **Ambigu Status Aktif**. `TEAM_MEMBERS` sudah benar memilih hanya anggota 2025, namun fungsi pembantu `getActiveSquadByDivision` mengambil seluruh isi `ACTIVE_TECHNICAL_SQUAD` termasuk alumni 2024. |
| 8 | **Generic Placeholders pada Link Sosial** | 12 anggota memiliki `linkedin: 'https://linkedin.com'`, 5 anggota memiliki `instagram: 'https://instagram.com/abhinaya.uny'` | Sebagian anggota memiliki username asli di Instagram/LinkedIn | **Data Placeholder**. Jika link diklik di modal, pengguna diarahkan ke landing page LinkedIn atau Instagram tim daripada profil individu. |

---

## 6. Audit Aset Visual & Jalur Foto Direktori

### 6.1. Verifikasi File Fisik
- **Total Path Foto yang Dicek:** 92 path unik dalam `data/teamData.ts`.
- **Hasil Pengecekan:** 92 file fisik **TERBUKTI ADA** (100% Match, 0 Missing) di dalam folder `public/images/members/`.

### 6.2. Pola Penamaan Semantik File Foto
Semua file foto anggota telah mengikuti konvensi penamaan baku:
`{tahun}_{divisi}_{nama_anggota}_{urutan}.{ekstensi}`

Contoh:
- `2024_program_tri_wahyu_handoyo_01.png` (Studio Cutout Portrait)
- `2024_program_tri_wahyu_handoyo_02.png` (Studio Alt Angle)
- `2025_program_tri_wahyu_handoyo_01.jpg` (Live Paddock / Competition)
- `2024_leader_ilham_widyo_nugroho_01.png` (Studio Cutout Portrait)
- `2025_leader_farhan_yuda_mahendra_01.jpg` (Live Competition)
- `2024_manager_rose_pita_nur_afifah_01.png` (Studio Cutout Portrait)
- `2025_manager_zelfa_nafisah_zalna_01.jpg` (Live Portrait)
- `pembimbing_prof_moh_khairudin.jpg` (Official Faculty Portrait)
- `pembimbing_dr_herlambang_sigit_pramono.jpg` (Official Faculty Portrait)

### 6.3. Integrasi Crossfade Engine (`MemberPhotoFadeEngine.tsx` & `TeamRosterSection.tsx`)
- Komponen menggunakan transisi CSS opacity dan scale berbasis GPU (`transform-gpu will-change-[opacity,transform] duration-1000`).
- Interval perpindahan slide dihitung dengan *deterministic offset* per ID anggota (`getDeterministicOffset(memberId, 1400)`) agar kartu anggota di grid tidak berganti foto secara bersamaan (mencegah efek kedip serentak).
- Tersedia tombol navigasi manual (chevron kiri/kanan), badge indikator jumlah foto (contoh: `1/5`), pagination dots di bagian bawah, serta fallback avatar monogram 2 huruf jika gambar gagal dimuat.

---

## 7. Analisis Komponen Konsumen Data Tim

| Komponen / Halaman | Berkas Kode | Data yang Dikonsumsi | Fitur & Fungsi |
|---|---|---|---|
| **Halaman Divisi** | `app/divisi/page.tsx` | `TEAM_DIVISIONS` dari `krtmiData.ts`, `TeamRosterSection` | Menampilkan 4 pilar divisi UKM Restek, galeri feed Instagram, dan roster lengkap tim. |
| **Team Roster Section** | `components/TeamRosterSection.tsx` | Semua ekspor dari `teamData.ts` | Hub interaktif utama: tab Leaders Hall of Fame, Managers Showcase, Skuad Aktif, Penjelajah Alumni 2020–2025, Filter Divisi, Pencarian Real-time, dan Lightbox Modal. |
| **About Team Section** | `components/AboutTeamSection.tsx` | `TEAM_DIVISIONS` dari `krtmiData.ts`, foto kontingen UMS 2024 | Narasi profil UKM Rekayasa Teknologi UNY dan kolase foto workshop/pertandingan. |
| **Instagram Feed Showcase** | `components/InstagramFeedShowcase.tsx` | `INSTAGRAM_FEED_ITEMS` dari `instagramFeedData.ts` | Menampilkan postingan resmi per divisi (Programmer 2024/2025, Mekanik 2024/2025, Elektronik 2024/2025, Manager 2024/2025, Leader, Pembimbing). |
| **KRI Overview & Chronicles** | `components/KRIOverview.tsx`, `components/KrtmiChronicles.tsx` | `KRTMI_STORIES` dari `krtmiData.ts` | Riwayat aturan dan tema teknis kompetisi KRTMI dari era 2019 hingga Technocorner 2026. |

---

## 8. Rekomendasi & Cetak Biru Sinkronisasi

Berdasarkan hasil audit komprehensif ini, berikut tindakan yang direkomendasikan untuk implementasi penyempurnaan data:

1. **Koreksi NIM Farhan Yuda Mahendra**:
   Ubah `nim: '22518244007'` menjadi `nim: '22518241040'` pada `data/teamData.ts` (pada baris `LEADERS_HALL_OF_FAME` dan `ACTIVE_TECHNICAL_SQUAD.program`).
2. **Harmonisasi Data Prodi pada Dokumen Markdown**:
   Perbarui tabel `STRUKTUR_TIM_ABHINAYA.md` baris 33 (Afif Aiman Saputra: S1 Pendidikan Teknik Mesin) dan baris 34 (Muhammad Iqbal Rasyid: S1 Pendidikan Teknik Mekatronika).
3. **Penyempurnaan Perhitungan `DIVISION_CATEGORIES`**:
   Ubah penghitungan `count` di `DIVISION_CATEGORIES` agar selalu dinamis sesuai dengan jumlah anggota aktif (`ALL_ROSTER_MEMBERS.filter(m => m.division === cat.id).length`) sehingga tidak terjadi ketidaksesuaian angka badge.
4. **Deduplikasi Identitas Farhan Yuda Mahendra**:
   Pastikan kartu Farhan Yuda Mahendra di baris Ketua Tim dan baris Program memiliki tautan data yang konsisten atau diberi tanda peran ganda (Leader & Control Programmer).
5. **Pemisahan Jelas Alumni 2024 dalam `ACTIVE_TECHNICAL_SQUAD`**:
   Pindahkan Agus Bagaskoro dan Muhamad Ilham Sony ke bagian Alumni/Senior Advisor dalam `ACTIVE_TECHNICAL_SQUAD` atau pastikan fungsi `getActiveSquadByDivision` hanya memfilter anggota dengan `isActive === true`.
6. **Pelengkapan Metadata Alumni (2020–2022)**:
   Lengkapi field `subRole` dan `quote` historis untuk anggota perintis generasi 2020, 2021, dan 2022 agar modal lightbox menampilkan narasi kontribusi yang utuh.

---
*Laporan survei ini disusun secara objektif berdasarkan pembacaan langsung seluruh berkas repositori.*
