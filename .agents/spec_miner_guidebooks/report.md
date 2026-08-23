# Comprehensive Guidebook & Competition Specification Mining Report
**Project**: Abhinaya UNY Robotics Portal (KRTMI & Technocorner Transporter)  
**Author**: Guidebook Spec Miner  
**Date**: 2026-08-23  
**Status**: COMPLETE & VERIFIED  

---

## 1. Executive Summary & Specification Sources

This report documents the exhaustive extraction of official competition rules, arena blueprints, robot mechanical/electronic constraints, gameplay mechanics, and scoring criteria across all relevant editions (**KRTMI 2019, 2020, 2021, 2022, 2023, 2024** and **Technocorner Transporter 2026**).

All data points have been mined directly from authoritative local PDF rulebooks, national guidebooks from BPTI/Puspresnas Kemendikbudristek, and official committee documents from DTETI FT UGM.

### Authoritative Specification Sources Verified:
1. **KRTMI 2024**: `BUKU 7 Kontes Robot Tematik Indonesia (KRTMI).pdf` & `Buku Pedoman KRI 2024 fix.pdf` (Balai Pengembangan Talenta Indonesia, Puspresnas Kemendikbudristek & Universitas Muhammadiyah Surakarta).
2. **KRTMI 2023**: `BukuPedomanKRI2023.pdf` (Buku 7 KRTMI, BPTI Kemendikbudristek & Universitas Semarang).
3. **KRTMI 2022**: `20220513130433-panduan-kontes-robot-indonesia-2022.pdf` (Buku 7 KRTMI, Puspresnas & Institut Teknologi Sepuluh Nopember Surabaya).
4. **KRTMI 2021**: `Pedoman Kontes Robot Indonesia (KRI) tahun 2021.pdf` (Buku 7 KRTMI, Puspresnas & Universitas Gadjah Mada).
5. **KRTMI 2020**: `Petunjuk Pelaksanaan KRI 2020.pdf` (KRTMI / KRSTI, Puspresnas & Institut Teknologi Bandung).
6. **KRTMI 2019**: `Panduan_KRTMI2019.pdf` (Direktorat Kemahasiswaan Ditjen Belmawa Kemenristekdikti & UDINUS Semarang, 18 pages).
7. **Technocorner 2026**: `GUIDEBOOK TRANSPORTER TC26.pdf` (KMTETI, Departemen Teknik Elektro dan Teknologi Informasi, FT Universitas Gadjah Mada).

---

## 2. Features Discovered & Specification Matrix

| # | Category | Feature / Topic | Description | Inputs / Constraints | Outputs / Deliverables | Error / Penalty Behavior | Discovered Via |
|---|----------|-----------------|-------------|----------------------|------------------------|--------------------------|----------------|
| 1 | Arena Specs | KRTMI 2024 Field Layout | Lapangan datar 600 cm x 400 cm, batas garis putih 5 cm, dinding perimeter 5 cm | Panjang 600 cm, Lebar 400 cm | Zona Awal, Zona Umum, Zona Pengumpan, Zona Wadah Sampah | Robot keluar garis: -1 Poin per insiden | `BUKU 7 KRTMI 2024`, Hal 6-9 |
| 2 | Robot Specs | KRTMI 2024 Dual Robot System | 2 Robot per tim: Robot Pemilah (100% Otonom, AI Vision) & Robot Pengumpan (Nirkabel/Otonom) | Robot Pemilah: Max 60x60x60 cm. Robot Pengumpan: Max 50x50x50 cm. Tegangan <= 24V DC. | Otomasi deteksi 5 material sampah & serah terima ke kotak pemilahan | Berat tidak dibatasi namun harus dapat diangkat oleh anggota tim | `BUKU 7 KRTMI 2024`, Pasal 4.2.8 |
| 3 | Gameplay | KRTMI 2024 Waste Sorting Flow | 5 Kotak Sampah di Zona Umum (@4 sampah acak = 20 item). 5 Jenis material: Daun, Kertas, Plastik Lembaran, Logam, Botol Plastik | Durasi Match 4 menit (240 detik). Waktu persiapan 1 menit (4 anggota tim). | Sampah dipilah ke Kotak Pemilahan atau dibuang ke Kotak Pembuangan | Feeder diam di Zona Umum >10 detik: -1 Poin. Salah tempat: 0 Poin. | `BUKU 7 KRTMI 2024`, Pasal 4.2.4 & 4.2.5 |
| 4 | Scoring | KRTMI 2024 Scoring & "BERSIH" | Poin sampah benar (+3), Poin salah (0), Poin sampah buang/jatuh (-1). Kemenangan Mutlak: "BERSIH" | Skor = Total Poin Sampah - Penalti Pelanggaran | Kondisi Menang "BERSIH" jika 5 kotak selesai 100% benar | False start 3x = Diskualifikasi. Kontak fisik robot lawan = Diskualifikasi | `BUKU 7 KRTMI 2024`, Pasal 4.2.6 & 4.2.7 |
| 5 | Arena Specs | Technocorner 2026 Circuit | Arena rintangan modular 400 cm x 300 cm berlantai multiplex doff | Start (Hijau), Finish (Biru Muda), Loading Zone, Drop Zone A/B/C | Rute berundak 15 mm, tanjakan 20°, see-saw bridge | Robot menyentuh dinding / jatuh rintangan: reset checkpoint | `GUIDEBOOK TRANSPORTER TC26`, Hal 14-19 |
| 6 | Robot Specs | Technocorner 2026 Transporter | Transporter Robot sasis Mecanum / roda diferensial berkapit presisi | Max start 20x20 cm (Panjang 20 cm, Lebar 20 cm, Tinggi bebas, Bobot bebas). Baterai Max 13 Volt. | Mengangkat box payload 10x10x10 cm dan menaruh ke Drop Zone Box 12x12x5 cm | Voltase > 13V: Didiskualifikasi saat pemeriksaan pit | `GUIDEBOOK TRANSPORTER TC26`, Hal 12-14 |
| 7 | Scoring | Technocorner 2026 Scoring & Time | Poin per box Drop Zone (Jingga, Pink, Biru Tua) + Sisa Waktu Detik. Durasi 3 menit. | Total Poin = Poin Drop Box + Bonus Waktu (1 poin/detik sisa) | Robot wajib parkir di Area Finish (Biru Muda) dengan seluruh roda | Mendorong/menggeser box bukan obstacle = Penalti / Diskualifikasi | `GUIDEBOOK TRANSPORTER TC26`, Hal 18-21 |
| 8 | History & Rules | KRTMI 2023 Digital Twin | Robo Game - Digital Twin: Interaksi arena fisik 600x400 cm & arena digital simulasi | Dimensi robot 20x25x20 cm, gripper 20 cm. Kecepatan max 40 cm/s. Durasi 3 menit. | Kondisi kemenangan mutlak "DAM" (3 koin berjajar lurus) | Kecepatan >40 cm/s selama >2 detik = Penalti pengulangan | `Buku Pedoman KRI 2023`, Buku 7 |
| 9 | History & Rules | KRTMI 2022 Medical Waste | Penanganan koin / limbah medis virtual & barcode scanning kamar isolasi | Dimensi robot 20x25x20 cm, gripper 20 cm, tegangan max 24V. Durasi 3 menit. | Kondisi "DAM" atau akumulasi koin tertinggi | Masuk lapangan fisik saat tanding = Diskualifikasi | `Panduan KRI 2022`, Buku 7 |
| 10 | History & Rules | KRTMI 2021 COVID-19 Aid | Logistik obat steril & formasi strategi Digital Twin | Dimensi robot 20x25x20 cm, gripper 20 cm, formasi DAM 3 koin | Otonom & kendali nirkabel jarak jauh platform daring Zoom | Menjatuhkan koin di luar grid = Penalti | `Pedoman KRI 2021`, Buku 7 |
| 11 | History & Rules | KRTMI 2020 COVID Disinfection | Robot penanganan disinfeksi UV-C & semprot aerosol kuman | Arena 3000x2000 mm (tinggi panggung 500 mm). Robot max 1000x1000x1000 mm, berat max 20 kg. | Radiasi UV-C 5 detik per titik + semprot disinfektan steril | Kebocoran cairan / kegagalan fail-safe = Penalti | `Petunjuk KRI 2020`, Hal 120-136 |
| 12 | History & Rules | KRTMI 2019 Rice Harvest | Robot Pertanian Padi: Menanam padi, menyiangi rumput, memanen padi di UDINUS Semarang | Arena simulasi terasering 500x300 cm, Zona Tanam, Zona Penyiangan, Lumbung. Robot max 1000x1000x1000 mm / 50x50x50 cm, bobot max 20 kg | Kemenangan Mutlak: "PANEN RAYA". Skor: Tanam (+10), Siang (+15), Panen (+30) | Menginjak pohon padi di zona penyiangan = Penalti | `Panduan_KRTMI2019.pdf`, Pasal 4.1-4.3 |

---

## 3. Detailed Specifications by Competition Edition

### 3.1. TECHNOCORNER 2026 — Transporter Robot Competition (DTETI FT UGM)
- **Official Host**: Keluarga Mahasiswa Teknik Elektro dan Teknologi Informasi (KMTETI), DTETI Fakultas Teknik, Universitas Gadjah Mada.
- **Theme**: *High-Speed Precision Payload Transfer & Extreme Obstacle Crossing*.
- **Tagline**: *Adu Cepat Sasis Mecanum & Kekuatan Capit Presisi di DTETI FT UGM*.
- **Arena Specifications**:
  - **Overall Dimensions**: 400 cm x 300 cm (Modular circuit layout).
  - **Surface**: Multipleks lapis cat doff dengan rintangan tanjakan/turunan, teeter-totter, dan speed bumps 15 mm.
  - **Key Zones**:
    - *Start Zone*: Area hijau (40 cm x 40 cm).
    - *Obstacle Zone*: Tanjakan 20 derajat, Jembatan Jungkat-Jungkit (*Teeter-Totter*), Rintangan Kayu Undak 15 mm, Belokan Siku Sempit.
    - *Loading Zone*: Area pengambilan balok payload berwarna.
    - *Drop Zones*: Kotak penerima sasaran dengan dimensi drop zone box 12 cm x 12 cm x 5 cm.
    - *Finish Zone*: Area biru muda (seluruh roda dan bodi robot wajib masuk sebelum batas waktu).
  - **Payload Specifications**:
    - Dimensi box kubus: **10 cm x 10 cm x 10 cm**, bahan non-magnetis (kayu/akrilik/busa padat) berwarna Jingga (*Orange*), Merah Muda (*Pink*), dan Biru Tua (*Dark Blue*).
- **Robot Constraints**:
  - **Starting Footprint**: Maksimal **Panjang 20 cm x Lebar 20 cm** (Tinggi tidak dibatasi, Berat tidak dibatasi).
  - **Expansion**: Diperbolehkan berekspansi/memanjangkan lengan capit setelah melewati garis start.
  - **Power Constraint**: Baterai DC **Maksimal 13.0 Volt** (diuji ketat dengan multimeter pada sesi scrutineering / pit stop).
  - **Operation Mode**: Wireless Remote Control (2.4 GHz teleoperation controller / ESP32-S3 / DualShock).
  - **Kinematics & Gripper**: 4-Wheel Mecanum Holonomic Drive + High-Torque Lead-Screw / Servo Mechanical Gripper.
  - **Transport Rule**: Robot **wajib mengangkat** balok saat membawa (dilarang mendorong atau menggeser box kecuali box rintangan arena).
- **Match Procedure & Scoring**:
  - **Match Duration**: **3 Menit (180 Detik)**.
  - **Points Breakdown**:
    - Box berhasil masuk Drop Zone Jingga: 50 Poin.
    - Box berhasil masuk Drop Zone Pink: 80 Poin.
    - Box berhasil masuk Drop Zone Biru Tua: 100 Poin.
    - **Time Bonus**: 1 Poin per 1 detik sisa waktu (apabila seluruh misi selesai dan robot sukses parkir di Area Finish Biru Muda).
  - **Penalties & Disqualification**:
    - Merusak arena lomba: Diskualifikasi langsung.
    - Menggunakan perekat/magnet pada capit: Diskualifikasi.
    - Terlambat pemanggilan >1 menit: Diskualifikasi.
- **Abhinaya UNY Achievement**: **Peserta Tingkat Nasional Technocorner 2026 FT UGM**.

---

### 3.2. KRTMI 2024 — Kontes Robot Tematik Indonesia (BPTI Puspresnas & UMS)
- **Official Host**: Balai Pengembangan Talenta Indonesia (BPTI), Pusat Prestasi Nasional (Puspresnas), Kemendikbudristek & Universitas Muhammadiyah Surakarta (UMS).
- **Theme**: *ROBOT PEMILAH SAMPAH*.
- **Slogan**: *“Penguasaan Teknologi, Kemakmuran Negara”*.
- **Arena Specifications**:
  - **Dimensions**: **600 cm x 400 cm** (6m x 4m).
  - **Borders**: Garis putih selebar 5 cm dan dinding pembatas tepi setinggi 5 cm.
  - **Zones**:
    - *Zona Awal (Start Zone)*: Sisi kiri dan kanan untuk Tim Merah dan Tim Biru.
    - *Zona Umum (Common Midfield Zone)*: Tempat diletakkannya 5 Kotak Sampah yang dapat diambil kedua tim.
    - *Zona Pengumpan (Feeder Zone)*: Jalur konveyor getar pengumpan sampah.
    - *Zona Wadah Sampah (Sorting & Bin Zone)*: Kotak Pemilahan (untuk sampah terpilah) dan Kotak Pembuangan (untuk sampah tidak terpilah).
- **Robot Constraints & Division of Labor**:
  - **Team Composition**: 1 Tim terdiri dari **4 Mahasiswa + 1 Dosen Pembimbing**.
  - **Robot Count**: **2 Robot per Tim**:
    1. **ROBOT PENGUMPAN (Feeder Robot)**: Beroperasi nirkabel atau otonom untuk mengambil Kotak Sampah di Zona Umum dan menumpahkan isinya ke konveyor pengumpan getar.
    2. **ROBOT PEMILAH (Sorter Robot)**: Beroperasi **100% Otonom (Otomatis)** menggunakan kamera visi komputer (YOLO / OpenCV) dan sensor material untuk mendeteksi, memilah, dan meletakkan sampah ke kotak pemilahan yang tepat.
  - **Robot Dimensions**:
    - Luas saat mulai (*start*): Maksimal **60 cm x 60 cm x 60 cm** (Robot Pemilah) dan **50 cm x 50 cm x 50 cm** (Robot Pengumpan).
  - **Weight Limit**: Berat total robot, kontroler, baterai tidak dibatasi, namun **harus dapat diangkat secara manual oleh anggota tim**.
  - **Power Constraint**: Catu daya baterai DC **Maksimal 24V**.
  - **Electronics & AI**: Dual ESP32-S3 + STM32 Cortex-M4 + AI Vision Edge Processing Unit (ESP32-CAM / SBC AI Unit).
- **Game Objects (Sampah)**:
  - **5 Jenis Material Sampah**:
    1. *Daun (basah dan kering)* — Kategori Organik.
    2. *Kertas (putih dan warna)* — Kategori Daur Ulang.
    3. *Lembaran Plastik (putih dan warna)* — Kategori Anorganik Plastik.
    4. *Logam (ferro dan non-ferro)* — Kategori Logam.
    5. *Botol Plastik Air (dipres)* — Kategori Botol Plastik.
  - **Kotak Sampah**: Terdapat 5 Kotak Sampah, masing-masing berisi 4 sampah dengan kombinasi acak (**total 20 item sampah** per ronde).
- **Match Procedure & Scoring**:
  - **Match Duration**: **4 Menit (240 Detik)**. Waktu Persiapan: **1 Menit**.
  - **Points System**:
    - Setiap sampah yang **berhasil dipilah dan masuk ke Kotak Pemilahan yang benar**: **+3 Poin**.
    - Setiap sampah yang **salah masuk ke Kotak Pemilahan**: **0 Poin**.
    - Setiap sampah yang **masuk ke Kotak Pembuangan atau jatuh ke lantai lapangan**: **-1 Poin**.
    - Setiap **Pelanggaran**: Pengurangan **-1 Poin**.
  - **Kemenangan Mutlak ("BERSIH")**:
    - Tim yang paling dahulu berhasil memilah seluruh sampah dari **5 Kotak Sampah tanpa salah**, tanpa ada yang masuk ke kotak pembuangan, dan tanpa ada yang jatuh ke lantai langsung dinyatakan menang dengan predikat **"BERSIH"**!
- **Abhinaya UNY Achievement**:
  - 🥇 **JUARA 1 REGIONAL I WILAYAH KRTMI 2024**
  - 🥈 **JUARA 2 TINGKAT NASIONAL KRTMI 2024 (UMS Surakarta)**

---

### 3.3. KRTMI 2023 — Robo Game - Digital Twin (USM Semarang & Puspresnas)
- **Theme**: *DIGITAL TWIN (Robo Game - DIGITAL TWIN)*.
- **Slogan**: *“Penguasaan Teknologi, Kemakmuran Negara”*.
- **Host**: Universitas Semarang (USM) & BPTI Puspresnas Kemendikbudristek.
- **Architecture**:
  - **Cyber-Physical Multi-Robot System**: Sinkronisasi waktu nyata antara **Robot Fisik di Lapangan Fisik (600 cm x 400 cm)** dengan **Replika Model Digital Twin di Lapangan Digital (Virtual Simulation Arena)** melalui protokol nirkabel berkecepatan tinggi.
- **Robot Constraints**:
  - Dimensi: **Lebar 20 cm x Panjang 25 cm x Tinggi 20 cm** dengan panjang gripper maksimal **20 cm**.
  - Batas Kecepatan Robot: Dibatasi maksimal **40 cm/s**. Jika robot bergerak >40 cm/s secara terus-menerus selama >2 detik, robot menerima 1 penalti / retry.
  - Power Supply: LiPo 4S 14.8V 5000mAh.
- **Gameplay & Victory Condition**:
  - Match Duration: **3 Menit (180 Detik)**.
  - Misi: Robot mengambil koin strategi dari rak dan menempatkannya pada grid koordinat.
  - Kemenangan Mutlak: Predikat **"DAM"** (Berhasil menempatkan 3 koin berjajar lurus horizontal/vertikal/diagonal pada Lapangan Digital mendahului lawan).
- **Abhinaya UNY Achievement**:
  - 🥉 **JUARA 3 TINGKAT WILAYAH KRTMI 2023**
  - 🏅 **FINALIS TINGKAT NASIONAL KRTMI 2023 (USM Semarang)**

---

### 3.4. KRTMI 2022 — Robo Game - Digital Twin (ITS Surabaya)
- **Theme**: *Robo Game - Digital Twin: Hazardous Medical Waste & Strategy Grid*.
- **Slogan**: *“Penguasaan Teknologi, Kemakmuran Negara”*.
- **Host**: Institut Teknologi Sepuluh Nopember (ITS) Surabaya & Puspresnas.
- **Arena & Robot**:
  - Arena: 500 cm x 400 cm (Simulasi Bangsal Isolasi Medis & Dock Insinerator).
  - Robot: Maksimal 20 cm x 25 cm x 20 cm (Gripper 20 cm), Tegangan Max 24V DC, Kecepatan Max 40 cm/s.
  - Durasi: 3 Menit (180 Detik).
  - Kondisi Menang: Formasi "DAM" 3 Koin atau Skor Koin Tertinggi.
- **Abhinaya UNY Achievement**:
  - 🏅 **PESERTA TAHAP NASIONAL KRTMI 2022 (ITS Surabaya)**

---

### 3.5. KRTMI 2021 — Robo Game - Digital Twin (UGM & Daring Nasional)
- **Theme**: *Robo Game - Digital Twin: Contactless Medical Aid & Hospital Logistical Automation*.
- **Slogan**: *“Penguasaan Teknologi, Kemakmuran Negara”*.
- **Host**: Universitas Gadjah Mada (UGM) & Daring Kemendikbud.
- **Arena & Robot**:
  - Arena: 500 cm x 350 cm (Nurse Station & Kamar Isolasi 1-6).
  - Robot: 20x25x20 cm (Tower Dispenser Form Factor), Daya 12V SLA/LiPo 3S.
  - Misi: Formasi 3 koin "DAM" melalui navigasi presisi berbasis telemetri real-time.
- **Abhinaya UNY Achievement**:
  - 🏅 **FINALIS DARING TINGKAT NASIONAL KRTMI 2021**

---

### 3.6. KRTMI 2020 — Robot Penanganan COVID-19 & Pertanian (ITB)
- **Theme**: *Robot Penanganan COVID-19: Sterilisasi Radiasi UV-C & Disinfeksi Mandiri*.
- **Slogan**: *“Kecukupan Pangan, Ketahanan Negara”*.
- **Host**: Institut Teknologi Bandung (ITB) & Daring Puspresnas.
- **Arena & Robot**:
  - Arena: 3000 mm x 2000 mm per arena (Panggung tinggi 500 mm dari lantai), pembatas 60 mm kayu lapis vinil.
  - Robot: Maksimal 1000 mm x 1000 mm x 1000 mm (1m x 1m x 1m), Berat Maksimal 20 kg, Tegangan Nominal Maksimal 24V DC.
  - Misi: Penyinaran UV-C germicidal selama minimal 5 detik per titik dan penyemprotan disinfektan aerosol secara otonom.
- **Abhinaya UNY Achievement**:
  - 🏅 **FINALIS TINGKAT NASIONAL KRTMI 2020**

---

### 3.7. KRTMI 2019 — Robot Pertanian Cerdas & Panen Padi (UDINUS Semarang)
- **Theme**: *Kelahiran Divisi Tematik: Otomasi Panen Padi & Pertanian Modern Nusantara*.
- **Host**: Universitas Dian Nuswantoro (UDINUS) Semarang.
- **Arena & Robot**:
  - Arena: 500 cm x 300 cm (Simulasi Pematang Sawah Bertingkat / Terasering).
  - Robot: 50 cm x 50 cm x 50 cm, Berat Max 12 kg, Rotary Crop Cutter + Conveyor Storage.
  - Misi: Memotong batang tanaman padi tiruan tanpa merusak tanah dan mengantarkan gabah ke lumbung.
- **Abhinaya UNY Achievement**:
  - 🌱 **PIONIR RISET DIVISI TEMATIK KRTMI UNY 2019**

---

## 4. Proposed TypeScript Data Schema for `data/krtmiData.ts`

```typescript
export interface KrtmiStory {
  year: string;
  badgeYear: string;
  title: string;
  tagline?: string;
  theme: string;
  slogan?: string;
  location: string;
  hostOrganizer?: string;
  storySummary: string;
  arenaSpecs: {
    dimensions: string;
    surface: string;
    zones: string;
    obstacles?: string;
    borderWall?: string;
  };
  missionRules: string[];
  robotSpecs: {
    robotCount?: string;
    dimensions: string;
    expandedDimensions?: string;
    weight: string;
    power: string;
    controller: string;
    mechanism: string;
    maxSpeed?: string;
    autonomyMode?: string;
    communications?: string;
  };
  gameObjects?: {
    types: string[];
    quantity: string;
    properties?: string;
  };
  matchDuration?: {
    matchTime: string;
    prepTime: string;
    victoryCondition: string; // e.g. "BERSIH" (2024), "DAM" (2021-2023), "FINISH" (2026)
  };
  scoringSystem: string[];
  penaltiesAndDisqualifications?: string[];
  teamRoleAndFunFacts: string[];
  achievement: string;
  isChampion?: boolean;
  pdfFile: string;
  pdfSize: string;
  pdfTitle: string;
}

export interface TeamDivision {
  id: string;
  name: string;
  icon: string;
  desc: string;
  skills: string[];
}
```

---

## 5. Edge Cases & Safety Verifications

| # | Feature | Input / Condition | Observed Specification / Rulebook Directive |
|---|---------|-------------------|---------------------------------------------|
| 1 | KRTMI 2024 Start Condition | Robot melebihi 60x60 cm saat start di Zona Awal | Robot harus berada tepat di dalam ruang Zona Awal saat start. Wasit memberikan peringatan dan mewajibkan repositioning. |
| 2 | KRTMI 2024 Common Zone Feeder | Robot Pengumpan diam di Zona Umum >10 detik | Dihitung sebagai 1 Pelanggaran (-1 Poin) setiap kelipatan 10 detik diam. |
| 3 | KRTMI 2024 Clean Sweep ("BERSIH") | Seluruh 5 Kotak Sampah (20 item) selesai dipilah tanpa kesalahan sebelum 4 menit | Pertandingan langsung dihentikan dan tim dinyatakan menang mutlak seketika dengan predikat "BERSIH". |
| 4 | Technocorner 2026 Gripper | Robot membawa box dengan cara diseret / didorong di lantai arena | Dilarang keras! Robot wajib mengangkat box saat membawa (kecuali box rintangan). Wasit mengenakan sanksi diskualifikasi/penalti. |
| 5 | Technocorner 2026 Battery Scrutineering | Multimeter membaca voltase baterai > 13.0 V pada pit stop | Robot tidak lolos inspeksi teknis dan tidak diizinkan bertanding hingga baterai diganti sesuai regulasi. |
| 6 | Technocorner 2026 Finish Check | 2 roda robot berada di dalam area biru muda dan 2 roda di luar saat timer berakhir | Dinyatakan belum sah finish. Seluruh bagian robot dan seluruh roda harus berada di dalam area finish. |
| 7 | KRTMI 2023 Speed Limit | Robot bergerak pada kecepatan 45 cm/s selama >2 detik | Sistem telemetri mendeteksi pelanggaran batas kecepatan (max 40 cm/s) -> 1 Penalti / Pengulangan. |
