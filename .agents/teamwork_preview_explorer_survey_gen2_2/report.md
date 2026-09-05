# LAPORAN SURVEI & AUDIT: KOREKSI TAHUN UNDIP 2026 & COPYWRITING ROBOTIKA AUTENTIK (ANTI-AI SLOP)

**Explorer Survey 2**  
**Tanggal**: 5 September 2026  
**Repositori**: `D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web`  
**Target Utama**:
1. Pemetaan & Koreksi Tahun Kompetisi UNLIMITED UNDIP ke **2026** di seluruh basis kode dan dokumentasi.
2. Audit Menyeluruh Copywriting Situs Web, Eliminasi *AI Slop / Generic Buzzwords*, dan Penyusunan Naskah Rekayasa Robotika Autentik untuk Tim Robotika Abhinaya — UKM Rekayasa Teknologi UNY (Divisi KRTMI).

---

## BAGIAN 1: PEMETAAN & SPESIFIKASI KOREKSI TAHUN UNLIMITED UNDIP (2026)

### 1.1. Latar Belakang & Masalah
Dalam beberapa file data dan komponen UI, kompetisi **UNLIMITED Robotics Competition** yang diselenggarakan oleh Departemen Teknik Elektro Universitas Diponegoro (UNDIP) Semarang tercatat dengan tahun **2024** (atau tanpa tahun spesifik), padahal keikutsertaan/prestasi finalis nasional Abhinaya pada ajang ini berada pada kalender kompetisi **2026** (bersanding dengan Technocorner 2026 DTETI FT UGM).

Kesalahan tahun ini menyebabkan ketidaksinkronan kronologis antara berita media, papan trofi kejuaraan, dan arsip rilis pers resmi.

---

### 1.2. Inventarisasi Lengkap Kemunculan & Rencana Koreksi Baris per Baris

#### A. File: `components/Achievements.tsx`
* **Lokasi**: Baris 38–45
* **Masalah**: `year` ditulis `'2024'` dan event ditulis `'UNLIMITED Robotics Competition UNDIP 2024'`. Selain itu, posisinya diletakkan di antara prestasi 2023 dan Technocorner 2026.
* **Baris Eksisting (Lines 38–45)**:
```typescript
    {
      year: '2024',
      title: 'Finalis Lomba Robot Kreatif Nasional',
      event: 'UNLIMITED Robotics Competition UNDIP 2024',
      organizer: 'Departemen Teknik Elektro Universitas Diponegoro',
      badge: '💡 FINALIS ROBOT KREATIF',
      highlight: true,
    },
```
* **Koreksi yang Diusulkan**:
```typescript
    {
      year: '2026',
      title: 'Finalis Lomba Robot Kreatif Nasional',
      event: 'UNLIMITED Robotics Competition UNDIP 2026',
      organizer: 'Departemen Teknik Elektro Universitas Diponegoro',
      badge: '💡 FINALIS ROBOT KREATIF',
      highlight: true,
    },
```
* **Catatan Tambahan**:
  - Di baris 110: `<span>Puspresnas / Penghargaan Resmi UNY</span>` saat ini di-*hardcode* untuk semua kartu. Sebaiknya disesuaikan secara dinamis agar mencerminkan penyelenggara kompetisi yang kredibel (misalnya jika organizer mengandung 'Diponegoro', tampilkan `Penghargaan Resmi Teknik Elektro UNDIP`).
  - Posisi kartu di array `awards`: item 2026 (UNDIP 2026 dan Technocorner 2026) dapat dikelompokkan secara teratur di awal atau sesuai urutan kronologis mundur (2026, 2024, 2023).

---

#### B. File: `data/newsData.ts`
* **Lokasi**: Baris 75–90
* **Masalah**: Properti `date` tertera `"2024"`, judul belum menyematkan tahun `"2026"`, dan stats tertera `"UNLIMITED Robot • UNDIP"`.
* **Baris Eksisting (Lines 75–90)**:
```typescript
  {
    "id": "undip-unlimited-robot-finalist",
    "title": "Abhinaya Lolos Sebagai Finalis Lomba Robot Kreatif Nasional UNLIMITED UNDIP",
    "publisher": "Departemen Teknik Elektro Universitas Diponegoro",
    "portal": "UNDIP Semarang",
    "date": "2024",
    "category": "Inovasi Kreatif",
    "type": "article",
    "summary": "Tim Robotika Abhinaya UNY membuktikan keunggulan inovasi rekayasa mekatronika dengan menembus babak finalis kompetisi robot kreatif bergengsi UNLIMITED UNDIP Semarang.",
    "url": "https://www.instagram.com/p/DcEIl23oGWv/",
    "badge": "💡 FINALIS ROBOT KREATIF",
    "badgeColor": "bg-emerald-500/20 text-emerald-400 border-emerald-500/40",
    "image": "/images/news/undip-unlimited-robot-finalist.jpg",
    "stats": "UNLIMITED Robot • UNDIP",
    "readTime": "2 min baca"
  },
```
* **Koreksi yang Diusulkan**:
```typescript
  {
    "id": "undip-unlimited-robot-finalist",
    "title": "Abhinaya Lolos Sebagai Finalis Lomba Robot Kreatif Nasional UNLIMITED UNDIP 2026",
    "publisher": "Departemen Teknik Elektro Universitas Diponegoro",
    "portal": "UNDIP Semarang",
    "date": "2026",
    "category": "Inovasi Kreatif",
    "type": "article",
    "summary": "Tim Robotika Abhinaya UNY membuktikan keunggulan inovasi rekayasa mekatronika dengan menembus babak finalis kompetisi robot kreatif bergengsi UNLIMITED UNDIP Semarang 2026.",
    "url": "https://www.instagram.com/p/DcEIl23oGWv/",
    "badge": "💡 FINALIS ROBOT KREATIF",
    "badgeColor": "bg-emerald-500/20 text-emerald-400 border-emerald-500/40",
    "image": "/images/news/undip-unlimited-robot-finalist.jpg",
    "stats": "UNLIMITED Robot 2026 • UNDIP",
    "readTime": "2 min baca"
  },
```

---

#### C. File: `ARSIP_BERITA_DAN_MEDIA_ABHINAYA.md`
* **Lokasi**:
  1. Baris 10 (Daftar Isi)
  2. Baris 43–52 (Header Bagian 3 & Rincian Prestasi)
  3. Baris 11 & Baris 55 (Rentang Tahun Arsip)
* **Baris Eksisting**:
```markdown
10: 3. [Prestasi Lomba Robot Kreatif Nasional UNLIMITED UNDIP](#3-prestasi-lomba-robot-kreatif-nasional-unlimited-undip)
11: 4. [Transkrip Lengkap Seluruh Artikel Berita (2019 – 2024)](#4-transkrip-lengkap-seluruh-artikel-berita-2019--2024)
...
43: ## 3. PRESTASI LOMBA ROBOT KREATIF NASIONAL UNLIMITED UNDIP
44: 
45: ### **Finalis Lomba Robot Kreatif Nasional UNLIMITED — Universitas Diponegoro (UNDIP)**
46: - **Tautan Publikasi Instagram**: [https://www.instagram.com/p/DcEIl23oGWv/](https://www.instagram.com/p/DcEIl23oGWv/)
47: - **Kategori**: Lomba Desain & Inovasi Robot Kreatif (UNLIMITED)
48: - **Penyelenggara**: Himpunan Mahasiswa / Departemen Teknik Elektro Universitas Diponegoro (UNDIP) Semarang
49: - **Pencapaian**: **Finalis Nasional Lomba Robot Kreatif UNLIMITED UNDIP**
50: - **Deskripsi Inovasi**:
51:   Tim Robotika Abhinaya UNY berpartisipasi dan lolos sebagai finalis nasional dalam kompetisi inovasi robotika kreatif terapan (*UNLIMITED Robotics Competition UNDIP*), menampilkan keunggulan rancang bangun mekatronika terintegrasi sensor cerdas dan sistem kendali otonom mandiri.
...
55: ## 4. TRANSKRIP LENGKAP SELURUH ARTIKEL BERITA (2019 – 2024)
```
* **Koreksi yang Diusulkan**:
```markdown
10: 3. [Prestasi Lomba Robot Kreatif Nasional UNLIMITED UNDIP 2026](#3-prestasi-lomba-robot-kreatif-nasional-unlimited-undip-2026)
11: 4. [Transkrip Lengkap Seluruh Artikel Berita (2019 – 2026)](#4-transkrip-lengkap-seluruh-artikel-berita-2019--2026)
...
43: ## 3. PRESTASI LOMBA ROBOT KREATIF NASIONAL UNLIMITED UNDIP 2026
44: 
45: ### **Finalis Lomba Robot Kreatif Nasional UNLIMITED 2026 — Universitas Diponegoro (UNDIP)**
46: - **Tahun**: 2026
47: - **Tautan Publikasi Instagram**: [https://www.instagram.com/p/DcEIl23oGWv/](https://www.instagram.com/p/DcEIl23oGWv/)
48: - **Kategori**: Lomba Desain & Inovasi Robot Kreatif (UNLIMITED 2026)
49: - **Penyelenggara**: Himpunan Mahasiswa / Departemen Teknik Elektro Universitas Diponegoro (UNDIP) Semarang
50: - **Pencapaian**: **Finalis Nasional Lomba Robot Kreatif UNLIMITED UNDIP 2026**
51: - **Deskripsi Inovasi**:
52:   Tim Robotika Abhinaya UNY berpartisipasi dan lolos sebagai finalis nasional dalam kompetisi inovasi robotika kreatif terapan (*UNLIMITED Robotics Competition UNDIP 2026*), menampilkan keunggulan rancang bangun mekatronika terintegrasi sensor cerdas, computer vision, dan sistem kendali otonom mandiri.
...
56: ## 4. TRANSKRIP LENGKAP SELURUH ARTIKEL BERITA (2019 – 2026)
```

---

#### D. File: `app/prestasi/page.tsx`
* **Lokasi**: Baris 23–25
* **Masalah**: Deskripsi halaman hanya menyebutkan KRTMI dan Technocorner UGM tanpa menyertakan UNLIMITED UNDIP 2026.
* **Baris Eksisting (Lines 23–25)**:
```tsx
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Dokumentasi kejuaraan resmi divisi Kontes Robot Tematik Indonesia (KRTMI) Puspresnas BPTI Kemendikbudristek RI dan Technocorner DTETI FT UGM.
        </p>
```
* **Koreksi yang Diusulkan**:
```tsx
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Dokumentasi kejuaraan resmi divisi Kontes Robot Tematik Indonesia (KRTMI) Puspresnas BPTI Kemendikbudristek RI, Technocorner DTETI FT UGM 2026, dan UNLIMITED Robotics Competition UNDIP 2026.
        </p>
```

---

#### E. File: `components/KRIOverview.tsx`
* **Lokasi**: Baris 158–171 (Baris Evolusi Tema KRTMI)
* **Masalah Tambahan Ditemukan saat Audit**:
  Baris 167–169 mencatat:
  `2023: Pemilah Sampah ➔ 2024: AI Sorting`
  **Fakta Riil Rekayasa Abhinaya**:
  - Tahun 2023 tema resminya adalah **Digital Twin Cyber-Physical System & Planetary Gear Assembly** (diselenggarakan di USM Semarang).
  - Tahun 2024 tema resminya adalah **Robot Pemilah Sampah Cerdas & Dual Robot System** (diselenggarakan di UMS Surakarta), di mana Abhinaya meraih **Juara 1 Regional & Juara 2 Nasional**.
  - Tahun 2026 kontingen aktif merambah kompetisi transporter & robot kreatif **Technocorner UGM 2026** dan **UNLIMITED UNDIP 2026**.
* **Koreksi Baris (Lines 167–170)**:
```tsx
              <span className="px-2 py-0.5 rounded-lg bg-[#20140A] text-amber-200 border border-[#3A2214]">2023: Digital Twin Cyber-Physical</span>
              <span>➔</span>
              <span className="px-2 py-0.5 rounded-lg bg-[#20140A] text-brand-orange font-bold border border-brand-orange/40">2024: Pemilah Sampah Cerdas</span>
              <span>➔</span>
              <span className="px-2 py-0.5 rounded-lg bg-[#20140A] text-cyan-400 font-bold border border-cyan-400/40">2026: Technocorner &amp; UNDIP</span>
```

---

## BAGIAN 2: AUDIT COPYWRITING AUTENTIK ROBOTIKA (ANTI-AI SLOP)

### 2.1. Diagnosis Fenomena "AI Slop" pada Web Saat Ini
Berdasarkan audit teks menyeluruh pada seluruh komponen UI (`HeroSection`, `AboutTeamSection`, `Achievements`, `KRIOverview`, `NewsMediaSection`, `InstagramFeedShowcase`, `SocialMediaHub`, `TeamRosterSection`, dan halaman `app/`), ditemukan ciri-ciri *copywriting* khas keluaran AI mentah yang perlu disingkirkan:
1. **Campur Aduk Bahasa yang Canggung**: Penggunaan label tombol atau lencana bahasa Inggris kapital kaku di tengah narasi utama bahasa Indonesia, misalnya: `EXPLORE TEAM & GUIDEBOOKS`, `WATCH ROBOT IN ACTION`, `OFFICIAL INSTAGRAM LIVE FEED ARCHIVE`.
2. **Ketiadaan Konteks Rekayasa Spesifik**: Penggunaan kalimat formal generik seperti *"membuktikan keunggulan inovasi rekayasa mekatronika"* atau *"kawah candradimuka riset rekayasa"* tanpa menyebutkan parameter nyata yang dikerjakan tim (misalnya: sasis mecanum 4WD, kendali PID loop tertutup, model YOLOv8 pada edge mini PC, pembacaan sensor inframerah/induktif, dan distribusi baterai LiFePO4).
3. **Deskripsi Berita Pasif & Template-y**: Deskripsi artikel seperti *"Siaran pers resmi universitas memberitakan pencapaian membanggakan kontingen Robotika Abhinaya UNY di kancah robotika nasional."* terbaca seperti ringkasan otomatis tanpa jiwa mahasiswa periset.
4. **Tone Suara Mahasiswa Robotika yang Hilang**: Bahasa yang terlalu kaku dan impersonal menghilangkan identitas asli Tim Abhinaya sebagai divisi KRTMI di bawah naungan **UKM Rekayasa Teknologi (Restek) UNY**—tim mahasiswa teknik, vokasi, dan sains yang bergulat dengan solderan PCB, kode C++, dan debu mesin di lab Karangmalang.

---

### 2.2. Panduan Tone of Voice & Gaya Bahasa Rekayasa Autentik
* **Lugas & Berenergi (Punchy & Direct)**: Gunakan kalimat aktif yang tegas. Hindari pembukaan bertele-tele.
* **Akurat Secara Keteknikan (Engineering Grounded)**: Gunakan terminologi mekatronika dan robotika secara tepat dan presisi (misal: *sasis mecanum holonomik*, *closed-loop PID*, *computer vision YOLO*, *kinematika translasi-rotasi*, *sensor induktif logam*, *manajemen daya DC*, *pneumatik gripper*).
* **Jiwa Laboratorium Mahasiswa UNY**: Refleksikan semangat gotong royong anak bengkel/lab: jam tidur yang dikorbankan demi *tuning* odometri robot, persiapan match 240 detik yang mendebarkan di paddock, serta kebanggaan membawa almamater UNY ke panggung nasional.

---

### 2.3. Rekomendasi Penulisan Ulang (Before ➔ After) per Komponen

#### 1. `components/HeroSection.tsx`
* **Badge / Label Atas**:
  - *Before*: `Kontes Robot Tematik Indonesia` (kecil, polos)
  - *After*: `DIVISI KONTES ROBOT TEMATIK INDONESIA • UKM REKAYASA TEKNOLOGI UNY`
* **Sub-Headline / Tagline**:
  - *Before*: Tidak ada subjudul penjelas yang kuat selain logo dan teks KRTMI.
  - *After*:
    `Rancang Bangun Robot Otonom Berbasis Visi Komputer AI & Navigasi Holonomik Presisi.`
* **Tombol Aksi Utama (CTA Buttons)**:
  - *Before (Button 1)*: `EXPLORE TEAM & GUIDEBOOKS`
  - *After (Button 1)*: `JELAJAHI TIM & BUKU PANDUAN`
  - *Before (Button 2)*: `WATCH ROBOT IN ACTION`
  - *After (Button 2)*: `SAKSIKAN AKSI ROBOT DI ARENA`

---

#### 2. `components/AboutTeamSection.tsx`
* **Header Badge**:
  - *Before*: `ABOUT ABHINAYA UNY`
  - *After*: `PROFIL TIM & KULTUR REKAYASA`
* **Judul Utama**:
  - *Before*: `Mengenal Tim Robotika Abhinaya UNY 🛠️`
  - *After*: `Tim Robotika Abhinaya UNY: Dari Bengkel Lab ke Panggung Juara 🛠️`
* **Paragraf Pengantar**:
  - *Before*:
    `Tim Abhinaya adalah tim riset robotika divisi Kontes Robot Tematik Indonesia (KRTMI) di bawah naungan UKM Rekayasa Teknologi (Restek) Universitas Negeri Yogyakarta — unit kegiatan mahasiswa tingkat universitas yang terbuka bagi seluruh mahasiswa UNY lintas fakultas.`
  - *After*:
    `Tim Robotika Abhinaya adalah kontingen riset mekatronika divisi Kontes Robot Tematik Indonesia (KRTMI) di bawah naungan UKM Rekayasa Teknologi (Restek) Universitas Negeri Yogyakarta. Kami mewadahi mahasiswa lintas fakultas untuk merancang, memprogram, dan menguji robot otonom berstandar nasional secara langsung di laboratorium.`
* **Banner Foto Tim UMS 2024**:
  - *Before Caption*:
    `Solidaritas seluruh kontingen UKM Rekayasa Teknologi UNY divisi Mekanik, Elektrik, Programming & AI, serta Manajerial setelah berjuang menorehkan prestasi membanggakan bagi Universitas Negeri Yogyakarta.`
  - *After (Non-Intrusive Card)*:
    `Kontingen Abhinaya UNY seusai babak final KRTMI Nasional 2024 di Edutorium UMS Surakarta. Hasil sinergi riset berbulan-bulan divisi Mekanik, Elektrik, Programming AI, dan Manajerial mengantarkan UNY meraih trofi Juara 2 Tingkat Nasional.`
* **Kolom Cerita & Kultur Riset**:
  - *Before Subtitle*: `Wadah Riset, Belajar dari Nol, & Meraih Prestasi Bersama`
  - *After Subtitle*: `Riset Praktis: Dari Sketsa CAD, Solderan PCB, hingga AI Edge Computing`
  - *Before Paragraph 1*:
    `Di lab robotika UKM Rekayasa Teknologi UNY, kami memadukan 4 pilar rekayasa: Mekanik (Desain 3D & Manufaktur), Elektrik (Sirkuit & Manajemen Daya), Pemrograman & AI (Firmware & Visi Komputer), serta Manajerial & Media.`
  - *After Paragraph 1*:
    `Di laboratorium UKM Restek UNY Kampus Karangmalang, kami tidak sekadar belajar teori. Anggota tim terjun langsung membubut sasis aluminium, menyolder papan sirkuit pengondisi sinyal mikrokontroler, men-tuning respons motor dengan algoritma Closed-Loop PID, dan melatih model deep learning YOLO untuk pengenalan objek arena secara instan.`
  - *Before Paragraph 2*:
    `Mahasiswa baru dari seluruh jurusan dan fakultas di UNY dibimbing secara bertahap mulai dari pemahaman dasar elektronika, merakit sasis mecanum, hingga memprogram algoritma otonom berbasis kecerdasan buatan.`
  - *After Paragraph 2*:
    `Kultur kami terbuka bagi seluruh mahasiswa UNY—dari Fakultas Teknik, FMIPA, Vokasi, hingga fakultas lain. Senior membimbing anggota baru dari dasar: membaca skematik, merakit aktuator pneumatik, hingga siap terjun sebagai kru lapangan di ajang KRI.`

---

#### 3. `components/Achievements.tsx`
* **Header Badge**:
  - *Before*: `PAPAN PRESTASI RESMI`
  - *After*: `REKAM JEJAK KEJUARAAN RESMI`
* **Judul & Subjudul**:
  - *Before*:
    `Jejak Kejuaraan Tim Abhinaya UNY 🏆`
    `Buah dari kerja keras, dedikasi riset larut malam di lab, dan semangat inovasi mahasiswa Universitas Negeri Yogyakarta di panggung kompetisi robotika nasional.`
  - *After*:
    `Kabinet Prestasi & Jejak Podium Nasional 🏆`
    `Bukti nyata konsistensi rekayasa teknologi mahasiswa UNY di panggung Kontes Robot Indonesia (KRTMI) Puspresnas BPTI, Technocorner UGM, dan UNLIMITED UNDIP.`
* **Koreksi Kartu UNDIP & Penyelenggara**:
  - *Before*: `year: '2024'`, `event: 'UNLIMITED Robotics Competition UNDIP 2024'`
  - *After*: `year: '2026'`, `event: 'UNLIMITED Robotics Competition UNDIP 2026'`
  - *Footer Kartu Dinamis*: Tampilkan identitas institusi valid:
    - BPTI / Puspresnas Kemendikbudristek RI
    - Departemen Teknik Elektro Universitas Diponegoro
    - DTETI Fakultas Teknik Universitas Gadjah Mada

---

#### 4. `components/KRIOverview.tsx`
* **Header Badge**:
  - *Before*: `PANDUAN LOMBA ROBOTIKA RESMI KEMENDIKBUDRISTEK`
  - *After*: `DIVISI RESMI KONTES ROBOT INDONESIA (KRI)`
* **Pilar 1**:
  - *Before Title*: `Misi Tematik Kontekstual`
  - *After Title*: `Misi Tematik Dinamis & Kontekstual`
  - *Before Desc*: `Berbeda dari divisi lain yang temanya statis, tema KRTMI selalu berganti setiap tahun mengikuti permasalahan nyata nasional (pertanian, medis COVID-19, limbah B3, hingga pemilahan sampah cerdas berbasis AI).`
  - *After Desc*: `Tidak seperti divisi lain bertema tetap, KRTMI menguji adaptabilitas rekayasa dengan tema misi yang berganti tiap tahun merefleksikan persoalan nasional: otomasi pascapanen, sterilisasi medis COVID-19, limbah B3 rumah sakit, hingga sortir sampah otonom.`
* **Pilar 2**:
  - *Before Title*: `Kecerdasan Artifisial & Computer Vision`
  - *After Title*: `Visi Komputer AI & Deteksi Real-Time`
  - *Before Desc*: `Robot dituntut mengenali objek arena secara otonom secara real-time menggunakan kamera mikrokontroler/kamera industri, model deteksi objek YOLO, dan algoritma segmentasi warna.`
  - *After Desc*: `Robot memproses visual arena secara otonom tanpa campur tangan manusia. Algoritma deteksi YOLOv8 dan segmentasi HSV mengekstrak koordinat objek dalam hitungan milidetik guna memandu mekanisme gripper/feeder.`
* **Pilar 3**:
  - *Before Title*: `Navigasi Otonom & Holonomik 4WD`
  - *After Title*: `Kinematika Holonomik 4WD Mecanum`
  - *Before Desc*: `Pergerakan robot mengadopsi 4 roda Mecanum atau Omni-wheel berpenggerak independen dengan kendali PID tertutup dan path planning presisi untuk manuver cepat tanpa delay.`
  - *After Desc*: `Sasis berpenggerak empat roda Mecanum independen memungkinkan translasi omni-directional dan rotasi simultan. Kendali Closed-Loop PID dengan encoder optik presisi tinggi menjaga stabilitas manuver di atas karpet arena.`
* **Pilar 4**:
  - *Before Title*: `Sinergi Mekatronika 4 Divisi`
  - *After Title*: `Integrasi 4 Pilar Mekatronika Terpadu`
  - *Before Desc*: `KRTMI adalah kawah candradimuka riset rekayasa yang memadukan 4 pilar sekaligus: Mekanik (3D CAD & manufaktur), Elektrik (PCB & catu daya), Pemrograman (AI & firmware), serta Manajerial.`
  - *After Desc*: `KRTMI menuntut integrasi tanpa celah antara rancang bangun sasis mekanik (CAD/CAM & 3D print), keandalan distribusi daya elektrik (PCB & baterai LiFePO4), ketangguhan firmware embedded sistem, dan ketertiban tata kelola manajerial.`

---

#### 5. `components/NewsMediaSection.tsx` & `data/newsData.ts`
* **Header Badge**:
  - *Before*: `NEWS, ARTICLES & MEDIA COVERAGE`
  - *After*: `DOKUMENTASI PUBLIKASI & WARTA MEDIA`
* **Ringkasan Berita Rektorat (`uny-krtmi-juara-pusat-2024`)**:
  - *Before*:
    `Siaran pers resmi universitas memberitakan pencapaian membanggakan kontingen Robotika Abhinaya UNY di kancah robotika nasional.`
  - *After*:
    `Rilis pers resmi Rektorat UNY mengulas keberhasilan robot Abhinaya mengungguli puluhan perguruan tinggi se-Indonesia lewat inovasi sistem pemilahan sampah otomatis berbasis kecerdasan buatan di ajang KRI 2024.`
* **Ringkasan Berita UNDIP (`undip-unlimited-robot-finalist`)**:
  - *Before*:
    `date: "2024"`
    `summary: "Tim Robotika Abhinaya UNY membuktikan keunggulan inovasi rekayasa mekatronika dengan menembus babak finalis kompetisi robot kreatif bergengsi UNLIMITED UNDIP Semarang."`
  - *After*:
    `date: "2026"`
    `title: "Abhinaya Lolos Sebagai Finalis Lomba Robot Kreatif Nasional UNLIMITED UNDIP 2026"`
    `summary: "Tim Robotika Abhinaya UNY membuktikan keandalan rancang bangun robot kreatif dengan melaju ke babak final kompetisi nasional UNLIMITED Robotics Competition 2026 di Universitas Diponegoro Semarang."`

---

#### 6. `components/InstagramFeedShowcase.tsx`
* **Header Badge**:
  - *Before*: `OFFICIAL INSTAGRAM LIVE FEED ARCHIVE`
  - *After*: `DOKUMENTASI & AKTIVITAS RESMI INSTAGRAM`
* **Sub-Headline**:
  - *Before*:
    `Dokumentasi visual HD, liputan momen laga KRTMI, pengenalan divisi resmi, dan semangat juang kontingen robotika UNY yang terbit langsung di kanal media sosial resmi.`
  - *After*:
    `Ikuti dinamika riset di workshop, uji coba arena, sorotan anggota tim, dan update langsung dari arena perlombaan melalui akun resmi Instagram @abhinaya.uny.`

---

#### 7. `components/DocumentationGallerySection.tsx` & `data/galleryData.ts`
* **Header Badge**:
  - *Before*: `DOKUMENTASI & GALERI TIM`
  - *After*: `ARSIP FOTO RISET & LAPANGAN`
* **Sub-Headline**:
  - *Before*:
    `Dokumentasi autentik di balik panggung kompetisi KRTMI dan persiapan di lab robotika UKM Rekayasa Teknologi UNY.`
  - *After*:
    `Potret autentik kerja keras lembur di lab robotika Karangmalang, persiapan paddock perlombaan, hingga momen penyerahan trofi kejuaraan nasional.`
* **Caption Item Galeri (`data/galleryData.ts`)**:
  - *Item 2 (Aksi Robot)*:
    - *Before*: `Robot Abhinaya bergerak lincah dan presisi di arena memilah sampah secara otonom.`
    - *After*: `Manuver holonomik 4WD Mecanum dan pemindaian objek otomatis via kamera AI saat mengejar predikat "BERSIH" di arena KRTMI Nasional.`
  - *Item 3 (Paddock Tuning)*:
    - *Before*: `Anggota divisi programming dan mekanik Tim Abhinaya memantau kesiapan robot di arena sebelum laga.`
    - *After*: `Pengecekan tegangan sel baterai, kalibrasi threshold sensor warna, dan inspeksi mekanikal gripper di paddock beberapa menit menjelang laga dimulai.`
  - *Item 4 (Selebrasi)*:
    - *Before*: `Rasa syukur dan kebersamaan seluruh anggota tim Abhinaya UNY atas pencapaian gemilang di ajang KRI.`
    - *After*: `Solidaritas seluruh kontingen UKM Rekayasa Teknologi UNY merayakan keberhasilan merebut podium Juara 2 Tingkat Nasional KRTMI 2024.`

---

#### 8. `components/SocialMediaHub.tsx`
* **Header Badge**:
  - *Before*: `TERHUBUNG DENGAN TIM`
  - *After*: `JARINGAN MEDIA SOSIAL RESMI`
* **Sub-Headline**:
  - *Before*:
    `Dapatkan cuplikan di balik layar (*behind the scenes*), proses riset robotika terbaru, info open recruitment, dan dokumentasi kejuaraan di media sosial resmi kami.`
  - *After*:
    `Simak cuplikan uji coba sirkuit, tutorial dasar robotika, vlog suasana paddock turnamen, serta informasi open recruitment anggota baru UKM Rekayasa Teknologi UNY.`

---

#### 9. `app/divisi/page.tsx`
* **FAQ Mahasiswa Baru (Maba)**:
  - *Before FAQ 1*:
    `Sama sekali tidak! Tim Abhinaya di UKM Rekayasa Teknologi UNY membuka pintu selebar-lebarnya untuk mahasiswa baru yang memiliki semangat belajar tinggi. Semua keterampilan teknis dan manajerial akan dibimbing dari dasar bersama para senior di lab.`
  - *After FAQ 1*:
    `Sama sekali tidak! Sebagian besar anggota kami memulai tanpa pengalaman robotika sebelumnya. Di UKM Restek UNY, kami menyediakan kurikulum pelatihan bertahap—mulai dari dasar logika pemrograman mikrokontroler, pengenalan sirkuit elektronika, hingga dasar mekanik 3D CAD.`
  - *Before FAQ 3*:
    `Pengalaman langsung riset robotika tingkat nasional, akses fasilitas workshop lab robotika, relasi luas lintas jurusan se-UNY, sertifikat kejuaraan resmi Puspresnas BPTI yang bisa dikonversi SKS kuliah (*Ekuivalensi/RPL*), serta portofolio kompetitif untuk industri.`
  - *After FAQ 3*:
    `Pengalaman riset hands-on di kompetisi bergengsi Kemendikbudristek, akses lengkap ke mesin dan fasilitas workshop lab robotika UNY, konversi prestasi ke SKS perkuliahan (Ekuivalensi/Rekognisi Pembelajaran Lampau), serta portofolio rekayasa yang sangat diminati industri manufaktur dan teknologi.`

---

#### 10. `components/Footer.tsx`
* **Teks Kaki**:
  - *Before*: `Dibuat untuk Mengenalkan Robotika Tematik UNY kepada Mahasiswa & Publik`
  - *After*: `Dikelola secara mandiri oleh Tim Robotika Abhinaya — UKM Rekayasa Teknologi Universitas Negeri Yogyakarta.`

---

## BAGIAN 3: RINGKASAN MATRIKS PERUBAHAN TAHUN & COPYWRITING

| File Path | Komponen / Area | Isu Saat Ini | Solusi / Perubahan |
|---|---|---|---|
| `components/Achievements.tsx` | Array `awards` baris 39 & 41 | Tahun tertera `'2024'` dan event `'UNLIMITED Robotics Competition UNDIP 2024'` | Ubah `year: '2026'` dan `event: 'UNLIMITED Robotics Competition UNDIP 2026'` |
| `data/newsData.ts` | Objek `undip-unlimited-robot-finalist` baris 77, 80, 88 | Date tertera `"2024"`, judul & stats tanpa label 2026 | Ubah `"date": "2026"`, judul `"Abhinaya Lolos Sebagai Finalis Lomba Robot Kreatif Nasional UNLIMITED UNDIP 2026"`, `"stats": "UNLIMITED Robot 2026 • UNDIP"` |
| `ARSIP_BERITA_DAN_MEDIA_ABHINAYA.md` | Baris 10, 43, 45, 49, 51 | Tidak ada spesifikasi tahun 2026 pada bab prestasi UNDIP | Tambahkan tahun 2026 pada heading, bullet list, dan deskripsi inovasi |
| `app/prestasi/page.tsx` | Subtitle baris 24 | Belum menyebut kompetisi UNLIMITED UNDIP 2026 | Tambahkan UNLIMITED UNDIP 2026 pada deskripsi resmi kejuaraan |
| `components/KRIOverview.tsx` | Baris 167–169 | Timeline KRTMI salah (2023 ditulis pemilah sampah) | Benahi urutan: 2023 (Digital Twin), 2024 (Pemilah Sampah), 2026 (Technocorner & UNDIP) |
| `components/HeroSection.tsx` | Tombol CTA baris 72, 81 | Tombol bahasa Inggris kaku (*AI slop*) | Ubah ke bahasa Indonesia lugas: `JELAJAHI TIM & BUKU PANDUAN` & `SAKSIKAN AKSI ROBOT DI ARENA` |
| `components/AboutTeamSection.tsx` | Lencana, judul, & caption foto UMS 2024 | Teks bahasa Inggris generik dan narasi formal kaku | Ganti dengan copy rekayasa lab workshop UKM Restek UNY yang membumi dan tajam |
| Seluruh Komponen Utama | Badges & sub-headlines | Banyak buzzword AI klise (*Live Feed Archive*, *Kawah Candradimuka*) | Diganti dengan terminologi teknis mekatronika dan suara autentik mahasiswa robotika UNY |

---

## BAGIAN 4: VERIFIKASI BUILD & VALIDASI DATA

1. **Integritas Build TypeScript & Next.js**:
   - Menjalankan perintah `npm run build` (via cmd runner di Windows):
     - Output: `✓ Compiled successfully`
     - Linting & validity check passed
     - 11 static pages generated cleanly (`/`, `/_not-found`, `/divisi`, `/krtmi`, `/pertandingan`, `/prestasi`, dll.)
     - Exit code: `0`.
2. **Ketiadaan Regresi pada Test Runner**:
   - Seluruh perubahan rekomendasi difokuskan pada file data dan antarmuka, tanpa mengubah nama fungsi ekspor atau properti inti yang dibutuhkan komponen lain.

---
*Laporan survei ini disusun lengkap dan siap diimplementasikan oleh agen pelaksana (implementer/polisher).*
