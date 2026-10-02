export interface GalleryItem {
  id: string;
  title: string;
  category: 'Semua' | 'Arena Lomba' | 'Panggung Juara' | 'Riset & Lab' | 'Behind The Scenes' | 'Video Aksi';
  year: string;
  image: string;
  caption: string;
  event: string;
  aspect?: 'wide' | 'standard' | 'panoramic' | 'square' | 'portrait' | 'tall';
  isVideo?: boolean;
  youtubeId?: string;
  videoDuration?: string;
  videoUrl?: string;
}

export const GALLERY_ITEMS: GalleryItem[] = [
  // ROW 1: Panggung Juara & Selebrasi Nasional
  {
    id: 'krtmi-2024-podium',
    title: 'Penyerahan Trofi Juara 2 Nasional KRTMI 2024',
    category: 'Panggung Juara',
    year: '2024',
    image: '/gallery/krtmi_podium_juara.jpg',
    caption: 'Momen penganugerahan piala dan sertifikat Juara 2 Nasional KRTMI 2024 bagi Tim Robotika Abhinaya UNY di UMS Surakarta.',
    event: 'KRI Nasional 2024 (UMS)',
    aspect: 'wide'
  },
  {
    id: 'team-podium-1',
    title: 'Selebrasi Kontingen UNY di Atas Panggung Juara',
    category: 'Panggung Juara',
    year: '2024',
    image: '/assets/team_podium_1.jpg',
    caption: 'Sujud syukur dan pengibaran bendera UNY di panggung kehormatan nasional Kontes Robot Indonesia.',
    event: 'KRI Nasional 2024',
    aspect: 'standard'
  },
  {
    id: 'krtmi-2024-celebration',
    title: 'Piala Prestasi & Solidaritas Abhinaya UNY',
    category: 'Panggung Juara',
    year: '2024',
    image: '/gallery/krtmi_team_celebration.jpg',
    caption: 'Solidaritas kontingen UKM Rekayasa Teknologi UNY merayakan keberhasilan merebut podium nasional.',
    event: 'KRI Nasional 2024',
    aspect: 'wide'
  },
  {
    id: 'krtmi-2019-piala',
    title: 'Piala Sejarah Perdana KRTMI 2019 di UDINUS',
    category: 'Panggung Juara',
    year: '2019',
    image: '/images/news/uny-kri-piala-nasional-2019.jpg',
    caption: 'Tonggak awal keikutsertaan divisi tematik UNY pada gelaran KRTMI 2019 di Semarang.',
    event: 'KRI Nasional 2019 (UDINUS)',
    aspect: 'standard'
  },
  {
    id: 'team-podium-2',
    title: 'Penyerahan Medali & Piagam Puspresnas',
    category: 'Panggung Juara',
    year: '2024',
    image: '/assets/team_podium_2.jpg',
    caption: 'Penyerahan piagam resmi juara robotika dari Pusat Prestasi Nasional Kemendikbudristek.',
    event: 'KRI Nasional 2024',
    aspect: 'standard'
  },
  {
    id: 'uny-krtmi-juara-pusat',
    title: 'Foto Resmi Kontingen Juara Bersama Rektorat',
    category: 'Panggung Juara',
    year: '2024',
    image: '/images/news/uny-krtmi-juara-pusat-2024.jpg',
    caption: 'Apresiasi universitas atas capaian gemilang tim robotika di kancah nasional.',
    event: 'Humas UNY 2024',
    aspect: 'wide'
  },
  {
    id: 'krtmi-celebration-stage',
    title: 'Momen Emas Perjuangan Kontingen Robotika',
    category: 'Panggung Juara',
    year: '2024',
    image: '/gallery/krtmi_celebration.jpg',
    caption: 'Suasana riuh kebahagiaan para anggota dan pembina menyambut pengumuman skor akhir juri.',
    event: 'KRI Nasional 2024',
    aspect: 'standard'
  },
  {
    id: 'hero-team-stage',
    title: 'Foto Bersama di Panggung Utama KRI',
    category: 'Panggung Juara',
    year: '2024',
    image: '/assets/hero_team_stage.jpg',
    caption: 'Potret lengkap seluruh punggawa teknis dan ofisial Abhinaya UNY di panggung KRI.',
    event: 'KRI 2024 (Edutorium UMS)',
    aspect: 'standard'
  },

  // ROW 2: Aksi Robot di Arena Lomba
  {
    id: 'krtmi-2024-action',
    title: 'Manuver Holonomik Sasis Mecanum di Arena KRTMI',
    category: 'Arena Lomba',
    year: '2024',
    image: '/gallery/krtmi_arena_action.jpg',
    caption: 'Manuver lincah 4 roda mecanum robot Abhinaya mengambil kotak sampah dan berakselerasi menuju konveyor.',
    event: 'KRI Nasional 2024',
    aspect: 'standard'
  },
  {
    id: 'robot-action-1',
    title: 'Ketangguhan Sistem Capit Lead-Screw Presisi',
    category: 'Arena Lomba',
    year: '2024',
    image: '/assets/robot_action_1.jpg',
    caption: 'Sistem capit bertenaga tinggi mencengkeram payload tanpa goyang melintasi lintasan berundak.',
    event: 'Uji Laga Arena 2024',
    aspect: 'standard'
  },
  {
    id: 'krtmi-official-match',
    title: 'Laga Resmi Babak Eliminasi Nasional KRI',
    category: 'Arena Lomba',
    year: '2024',
    image: '/gallery/krtmi_official_match.jpg',
    caption: 'Pertandingan sengit melawan tim-tim terbaik perguruan tinggi se-Indonesia di bawah pantauan juri BPTI.',
    event: 'Babak Gugur KRTMI 2024',
    aspect: 'standard'
  },
  {
    id: 'robot-action-2',
    title: 'Eksekusi Misi Pemilahan Sampah Otonom AI',
    category: 'Arena Lomba',
    year: '2024',
    image: '/assets/robot_action_2.jpg',
    caption: 'Kamera YOLOv8 memindai jenis sampah di konveyor getar dalam hitungan milidetik secara mandiri.',
    event: 'KRI Nasional 2024',
    aspect: 'standard'
  },
  {
    id: 'krtmi-arena-prep',
    title: 'Inspeksi & Setting Garis Start Arena Pertandingan',
    category: 'Arena Lomba',
    year: '2024',
    image: '/gallery/krtmi_arena_prep.jpg',
    caption: 'Operator meletakkan robot pada koordinat zona start hijau sebelum peluit wasit dibunyikan.',
    event: 'Arena KRI 2024',
    aspect: 'standard'
  },
  {
    id: 'undip-unlimited-robot',
    title: 'Robot Kreatif UNLIMITED UNDIP 2026',
    category: 'Arena Lomba',
    year: '2026',
    image: '/images/news/undip-unlimited-robot-finalist.jpg',
    caption: 'Prototipe robot mandiri Abhinaya berlaga di kompetisi robot kreatif tingkat nasional di Universitas Diponegoro.',
    event: 'UNLIMITED UNDIP 2026',
    aspect: 'standard'
  },
  {
    id: 'ig-simulasi-laga-2023',
    title: 'Simulasi Laga Roda Gigi Planet KRTMI 2023',
    category: 'Arena Lomba',
    year: '2023',
    image: '/images/instagram_feed/2023-02-03_17-08-58_UTC_CoNUUzuPX9e_2.jpg',
    caption: 'Pengujian penempatan koin digital twin pada lapangan fisik karpet hijau di laboratorium.',
    event: 'KRTMI 2023 (USM)',
    aspect: 'square'
  },
  {
    id: 'web-laga-5721',
    title: 'Akurasi Sensor Optik & Deteksi Lintasan',
    category: 'Arena Lomba',
    year: '2024',
    image: '/assets/WEB_5721.jpg',
    caption: 'Dokumentasi ketepatan robot membaca marka jalur dan batas dinding tepi arena.',
    event: 'KRI Nasional 2024',
    aspect: 'standard'
  },

  // ROW 3: Paddock, Kalibrasi & Scrutineering
  {
    id: 'krtmi-2024-tuning',
    title: 'Paddock Monitoring & Kalibrasi AI Vision',
    category: 'Behind The Scenes',
    year: '2024',
    image: '/gallery/krtmi_robot_tuning.jpg',
    caption: 'Penyetelan exposure kamera, kalibrasi threshold warna, dan verifikasi telemetri di pit stop sebelum tanding.',
    event: 'Paddock KRTMI 2024',
    aspect: 'standard'
  },
  {
    id: 'krtmi-paddock-tuning',
    title: 'Pemeriksaan Catu Daya Baterai & Inverter',
    category: 'Behind The Scenes',
    year: '2024',
    image: '/gallery/krtmi_paddock_tuning.jpg',
    caption: 'Uji voltase baterai mandiri memastikan kepatuhan regulasi ketat panitia di bawah batas voltase maksimal.',
    event: 'Pit Stop KRI 2024',
    aspect: 'standard'
  },
  {
    id: 'krtmi-mechanics-check',
    title: 'Inspeksi Torsi Gearbox & Motor Penggerak',
    category: 'Behind The Scenes',
    year: '2024',
    image: '/gallery/krtmi_mechanics_check.jpg',
    caption: 'Divisi mekanik memeriksa kelonggaran baut, pelumasan bearing, dan kesiapan motor DC encoder.',
    event: 'Paddock KRTMI 2024',
    aspect: 'standard'
  },
  {
    id: 'ig-paddock-usm-2023',
    title: 'Atmosfer Paddock KRTMI USM Semarang',
    category: 'Behind The Scenes',
    year: '2023',
    image: '/images/instagram_feed/2023-09-08_02-54-52_UTC_Cw6jFIzPwDx_5.jpg',
    caption: 'Suasana kerja intensif anggota tim menyempurnakan kode kontroler di sela-sela babak penyisihan.',
    event: 'KRTMI 2023 (USM Semarang)',
    aspect: 'square'
  },
  {
    id: 'krtmi-robot-closeup',
    title: 'Arsitektur Rangkaian Tertutup STM32 & ESP32',
    category: 'Behind The Scenes',
    year: '2024',
    image: '/gallery/krtmi_robot_closeup.jpg',
    caption: 'Tata letak kabel terisolasi rapi dan modul pemrosesan tepi yang dirancang mandiri oleh tim elektronik.',
    event: 'Dokumentasi Lab 2024',
    aspect: 'standard'
  },
  {
    id: 'ig-elektronik-solder',
    title: 'Fabrikasi PCB & Soldering Standar IPC',
    category: 'Behind The Scenes',
    year: '2023',
    image: '/images/instagram_feed/2023-09-08_01-46-44_UTC_Cw6bSByvBVA_3.jpg',
    caption: 'Penyolderan presisi komponen surface mount (SMD) regulator dan mikrokontroler STM32.',
    event: 'Lab Riset FT UNY',
    aspect: 'square'
  },
  {
    id: 'ig-evaluasi-paddock',
    title: 'Briefing Strategis Menghadapi Babak Final',
    category: 'Behind The Scenes',
    year: '2024',
    image: '/images/instagram_feed/2024-09-12_17-50-54_UTC_C_03vj8zNUB_2.jpg',
    caption: 'Ketua tim dan manajer mengarahkan taktik kecepatan konveyor demi memaksimalkan poin.',
    event: 'KRTMI 2024',
    aspect: 'square'
  },
  {
    id: 'ig-telemetri-usm',
    title: 'Pengujian Frekuensi Nirkabel 2.4 GHz Anti-Interferensi',
    category: 'Behind The Scenes',
    year: '2023',
    image: '/images/instagram_feed/2023-09-08_02-54-52_UTC_Cw6jFIzPwDx_7.jpg',
    caption: 'Pengujian link komunikasi radio agar kendali robot tetap responsif di tengah ratusan sinyal nirkabel.',
    event: 'KRI 2023',
    aspect: 'square'
  },

  // ROW 4: Riset Divisi & Kehidupan Laboratorium
  {
    id: 'krtmi-team-focus',
    title: 'Konsentrasi Penuh Operator di Tepi Arena',
    category: 'Riset & Lab',
    year: '2024',
    image: '/gallery/krtmi_team_focus.jpg',
    caption: 'Fokus tinggi operator memantau koordinat gerakan robot dan waktu pertandingan.',
    event: 'KRI Nasional 2024',
    aspect: 'standard'
  },
  {
    id: 'ig-divisi-program',
    title: 'Optimasi Model Visi Komputer YOLOv8',
    category: 'Riset & Lab',
    year: '2023',
    image: '/images/instagram_feed/2023-09-08_02-08-37_UTC_Cw6dyWqPSoI_3.jpg',
    caption: 'Tim programmer melatih dataset ribuan citra objek sampah basah dan kering untuk inferensi real-time.',
    event: 'Lab Komputer FT UNY',
    aspect: 'square'
  },
  {
    id: 'ig-divisi-elektronik',
    title: 'Riset Distribusi Daya & Sensor Fusion',
    category: 'Riset & Lab',
    year: '2023',
    image: '/images/instagram_feed/2023-09-08_01-46-44_UTC_Cw6bSByvBVA_2.jpg',
    caption: 'Penyusunan modul power management dan integrasi sensor ultrasonik anti-tabrakan.',
    event: 'Lab Mekatronika UNY',
    aspect: 'square'
  },
  {
    id: 'ig-divisi-mekanik',
    title: 'Pemodelan CAD 3D & Rapid Prototyping Sasis',
    category: 'Riset & Lab',
    year: '2023',
    image: '/images/instagram_feed/2023-09-08_01-39-35_UTC_Cw6ads0v8Q2_1.jpg',
    caption: 'Perancangan struktur sasis di Autodesk Inventor dan pencetakan komponen 3D print berkekuatan tinggi.',
    event: 'Workshop Mekanik UNY',
    aspect: 'square'
  },
  {
    id: 'ig-taktik-lomba',
    title: 'Analisis Jalur Lintasan & Efisiensi Manuver',
    category: 'Riset & Lab',
    year: '2023',
    image: '/images/instagram_feed/2023-09-08_01-27-05_UTC_Cw6ZCItPRJ-_1.jpg',
    caption: 'Evaluasi kurva belok sasis mecanum demi memangkas milidetik waktu tempuh arena.',
    event: 'Lab Riset Robotika',
    aspect: 'square'
  },
  {
    id: 'ig-skuad-2025-1',
    title: 'Skuad Penerus Riset Generasi 2025',
    category: 'Riset & Lab',
    year: '2025',
    image: '/images/instagram_feed/2025-09-27_20-10-47_UTC_DPHl0olk4Zw_1.jpg',
    caption: 'Regenerasi anggota baru Abhinaya meneruskan tongkat estafet inovasi robotika UNY.',
    event: 'Gedung KPLT FT UNY',
    aspect: 'portrait'
  },
  {
    id: 'ig-skuad-2025-2',
    title: 'Pengujian Sasis Robot Baru Generasi 2025',
    category: 'Riset & Lab',
    year: '2025',
    image: '/images/instagram_feed/2025-09-27_20-17-09_UTC_DPHmjMFEwJm_1.jpg',
    caption: 'Uji coba platform mobile robot generasi terbaru untuk ajang lomba mendatang.',
    event: 'FT UNY 2025',
    aspect: 'portrait'
  },
  {
    id: 'ig-skuad-2025-3',
    title: 'Ketahanan Manuver Sasis Mecanum Heavy-Duty',
    category: 'Riset & Lab',
    year: '2025',
    image: '/images/instagram_feed/2025-09-27_20-31-45_UTC_DPHoOJJk2NM_2.jpg',
    caption: 'Pengujian performa motor brushless dan roda mecanum di berbagai jenis permukaan lantai.',
    event: 'Laboratorium Restek',
    aspect: 'portrait'
  },

  // ROW 5: Kilas Balik Historis & Persaudaraan Tim (2019-2026)
  {
    id: 'hero-abhinaya-squad',
    title: 'Persaudaraan & Integritas Tim Robotika Abhinaya UNY',
    category: 'Behind The Scenes',
    year: '2024',
    image: '/assets/hero_abhinaya.jpg',
    caption: 'Semangat kekeluargaan dan dedikasi tanpa henti seluruh kru mekanik, elektrik, dan programmer.',
    event: 'Kontingen Resmi 2024',
    aspect: 'wide'
  },
  {
    id: 'uny-kri-its-2022',
    title: 'Kontingen KRTMI 2022 di Kampus ITS Surabaya',
    category: 'Behind The Scenes',
    year: '2022',
    image: '/images/news/uny-kri-lolos-nasional-2022.jpg',
    caption: 'Perjuangan mengharumkan almamater UNY pada divisi tematik limbah medis rumah sakit di Surabaya.',
    event: 'KRTMI 2022 (ITS Surabaya)',
    aspect: 'wide'
  },
  {
    id: 'ig-krtmi-covid-2020',
    title: 'Inovasi Robot Sterilisasi UV-C COVID-19 KRTMI 2020',
    category: 'Behind The Scenes',
    year: '2020',
    image: '/images/instagram_feed/2020-07-28_14-22-54_UTC_CDMF_hcDUwh.jpg',
    caption: 'Respon cepat mahasiswa mekatronika UNY menciptakan robot disinfeksi otomatis di masa pandemi.',
    event: 'KRTMI 2020 (ITB Bandung)',
    aspect: 'wide'
  },
  {
    id: 'ig-laga-its-2022',
    title: 'Pertandingan Digital Twin Insinerator Medis KRTMI 2022',
    category: 'Arena Lomba',
    year: '2022',
    image: '/images/instagram_feed/2022-05-28_04-24-07_UTC_CeFpRStLwaE.jpg',
    caption: 'Robot Abhinaya membawa simulasi limbah B3 menuju docking steril di arena panggung KRI 2022.',
    event: 'KRTMI 2022',
    aspect: 'square'
  },
  {
    id: 'ig-kontingen-usm-2023',
    title: 'Kontingen Abhinaya KRTMI 2023 di USM Semarang',
    category: 'Behind The Scenes',
    year: '2023',
    image: '/images/instagram_feed/2023-09-08_02-54-52_UTC_Cw6jFIzPwDx_2.jpg',
    caption: 'Kontingen robot tematik UNY berfoto bersama di arena Gelora USM Semarang.',
    event: 'KRTMI 2023',
    aspect: 'square'
  },
  {
    id: 'ig-kebersamaan-2024',
    title: 'Malam Refleksi & Kebersamaan Tim Pasca Laga',
    category: 'Behind The Scenes',
    year: '2024',
    image: '/images/instagram_feed/2024-09-12_17-50-54_UTC_C_03vj8zNUB_4.jpg',
    caption: 'Rasa syukur atas perjuangan berbulan-bulan yang membuahkan trofi kejuaraan nasional.',
    event: 'KRI 2024',
    aspect: 'square'
  },
  {
    id: 'img-wa-celebration-2024',
    title: 'Senyum Bangga Pembina & Kru Abhinaya UNY',
    category: 'Panggung Juara',
    year: '2024',
    image: '/assets/IMG-20240706-WA0117.jpg',
    caption: 'Dokumentasi spontan penuh kebanggaan bersama dosen pembimbing di Edutorium UMS.',
    event: 'Piala KRTMI 2024',
    aspect: 'wide'
  },
  {
    id: 'tc-2026-cover',
    title: 'Transporter Robot Technocorner 2026 DTETI FT UGM',
    category: 'Arena Lomba',
    year: '2026',
    image: '/images/tournaments/technocorner_2026_cover.png',
    caption: 'Langkah awal persiapan menyongsong kompetisi transporter robot di Universitas Gadjah Mada.',
    event: 'Technocorner UGM 2026',
    aspect: 'portrait'
  },

  // --- VIDEO ITEMS (AKSI RESMI, KILAS BALIK & SHORTS ROBOTIKA ABHINAYA) ---
  {
    id: 'vid-kilas-balik-2024',
    title: 'Kilas Balik Abhinaya 2019 - 2024 & Robot in Action',
    category: 'Video Aksi',
    year: '2024',
    image: '/gallery/yt_3yr5uNkxA_8.jpg',
    caption: 'Video resmi kilas balik perjalanan riset dan aksi manuver robot Abhinaya UNY di ajang Kontes Robot Tematik Indonesia.',
    event: 'Kilas Balik Resmi UNY',
    aspect: 'wide',
    isVideo: true,
    youtubeId: '3yr5uNkxA_8',
    videoDuration: 'Full HD'
  },
  {
    id: 'vid-live-krtmi-2024',
    title: 'Aksi Robot Abhinaya di KRTMI Wilayah 2024',
    category: 'Video Aksi',
    year: '2024',
    image: '/gallery/yt_PmxwdrhpxKg.jpg',
    caption: 'Rekaman siaran langsung pertandingan KRTMI 2024: kelincahan manuver roda mecanum, deteksi kamera AI, dan perolehan poin arena.',
    event: 'KRI Wilayah I 2024',
    aspect: 'wide',
    isVideo: true,
    youtubeId: 'PmxwdrhpxKg',
    videoDuration: '1080p 60fps'
  },
  {
    id: 'vid-perjalanan-krtmi',
    title: 'Perjalanan Riset Robotika Abhinaya 2019 - 2023',
    category: 'Video Aksi',
    year: '2023',
    image: '/gallery/yt_J5FXI2AnQxE.jpg',
    caption: 'Dokumentasi inovasi dari era panen padi (2019), disinfektan medis (2020), digital twin (2021-2023), hingga pemilah sampah otonom.',
    event: 'Kilas Balik KRTMI',
    aspect: 'wide',
    isVideo: true,
    youtubeId: 'J5FXI2AnQxE',
    videoDuration: 'HD 60fps'
  },
  {
    id: 'vid-oprec-tim',
    title: 'Highlight & Kaderisasi Anggota Baru Robotika',
    category: 'Video Aksi',
    year: '2024',
    image: '/gallery/yt_LyP9M_uTvMk.jpg',
    caption: 'Video profil tim, suasana laboratorium riset mekatronika, dan kaderisasi mahasiswa baru UKM Rekayasa Teknologi UNY.',
    event: 'Kaderisasi Robotika UNY',
    aspect: 'wide',
    isVideo: true,
    youtubeId: 'LyP9M_uTvMk',
    videoDuration: 'Full HD'
  },
  {
    id: 'vid-shorts-recap-2023',
    title: 'Shorts: Manuver Robot di Arena Gelora USM Semarang',
    category: 'Video Aksi',
    year: '2023',
    image: '/gallery/yt_wLusNVfFFHA.jpg',
    caption: 'Cuplikan kilas persiapan teknis di paddock, kalibrasi kontrol elektrik, serta uji responsivitas manuver robot saat kompetisi nasional.',
    event: 'KRTMI 2023 (USM)',
    aspect: 'tall',
    isVideo: true,
    youtubeId: 'wLusNVfFFHA',
    videoDuration: 'Shorts'
  },
  {
    id: 'vid-shorts-simulasi-sirkuit',
    title: 'Shorts: Simulasi Sirkuit & Riset Mikrokontroler',
    category: 'Video Aksi',
    year: '2024',
    image: '/gallery/yt_tcsBS-6qgCs.jpg',
    caption: 'Cuplikan simulasi rangkaian elektronik robotika menggunakan platform Tinkercad & Wokwi untuk perancangan logika embedded.',
    event: 'Riset Elektronika UNY',
    aspect: 'tall',
    isVideo: true,
    youtubeId: 'tcsBS-6qgCs',
    videoDuration: 'Shorts'
  },
  {
    id: 'vid-shorts-fabrikasi-3d',
    title: 'Shorts: Fabrikasi 3D Print Komponen Mekanik Robot',
    category: 'Video Aksi',
    year: '2024',
    image: '/gallery/yt_vjxbL5MB4-4.jpg',
    caption: 'Proses pencetakan 3D print komponen sasis dan bracket motor robotika Abhinaya UNY untuk persiapan Kontes Robot Indonesia.',
    event: 'Workshop Mekanik UNY',
    aspect: 'tall',
    isVideo: true,
    youtubeId: 'vjxbL5MB4-4',
    videoDuration: 'Shorts'
  },
  {
    id: 'vid-shorts-selebrasi-juara',
    title: 'Shorts: Sujud Syukur & Selebrasi Podium Juara Abhinaya',
    category: 'Video Aksi',
    year: '2024',
    image: '/gallery/yt_epyl7w6xZ6Y.jpg',
    caption: 'Momen haru dan sorak gembira kontingen Abhinaya UNY saat namanya diumumkan sebagai peraih Juara Nasional KRTMI.',
    event: 'KRI Nasional 2024',
    aspect: 'tall',
    isVideo: true,
    youtubeId: 'epyl7w6xZ6Y',
    videoDuration: 'Shorts'
  },
  {
    id: 'undip-stage-01',
    title: 'Penyerahan Trofi Juara 1 Robot Kreatif UNLIMITED UNDIP 2026',
    category: 'Panggung Juara',
    year: '2026',
    image: '/gallery/unlimited_undip/undip_stage_action_01.jpg',
    caption: 'Momen penganugerahan piala Juara 1 Robot Kreatif subkategori Environmental Monitoring & Waste Management di panggung utama UNDIP.',
    event: 'UNLIMITED UNDIP 2026',
    aspect: 'wide'
  },
  {
    id: 'undip-stage-02',
    title: 'Selebrasi Podium Juara 1 Tim Abhinaya di UNDIP Semarang',
    category: 'Panggung Juara',
    year: '2026',
    image: '/gallery/unlimited_undip/undip_stage_action_02.jpg',
    caption: 'Kontingen Abhinaya UNY merayakan kemenangan Juara 1 Robot Kreatif nasional di Gedung Serbaguna UNDIP Tembalang.',
    event: 'UNLIMITED UNDIP 2026',
    aspect: 'wide'
  },
  {
    id: 'undip-stage-03',
    title: 'Pengibaran Bendera Kebanggaan UNY di Panggung Kehormatan',
    category: 'Panggung Juara',
    year: '2026',
    image: '/gallery/unlimited_undip/undip_stage_action_03.jpg',
    caption: 'Kebanggaan mahasiswa mekatronika dan elektro UNY membawa nama almamater ke puncak juara lomba robot kreatif.',
    event: 'UNLIMITED UNDIP 2026',
    aspect: 'wide'
  },
  {
    id: 'undip-stage-04',
    title: 'Pemberian Penghargaan Juara Robot Kreatif Lingkungan',
    category: 'Panggung Juara',
    year: '2026',
    image: '/gallery/unlimited_undip/undip_stage_action_04.jpg',
    caption: 'Sesi serah terima piala dan plakat penghargaan dari juri dan panitia HME FT Universitas Diponegoro.',
    event: 'UNLIMITED UNDIP 2026',
    aspect: 'wide'
  },
  {
    id: 'undip-stage-05',
    title: 'Piala Juara 1 Nasional & Plakat Kehormatan UNLIMITED 2026',
    category: 'Panggung Juara',
    year: '2026',
    image: '/gallery/unlimited_undip/undip_stage_action_05.jpg',
    caption: 'Dokumentasi trofi Juara 1 divisi Robot Kreatif Environmental Monitoring & Waste Management.',
    event: 'UNLIMITED UNDIP 2026',
    aspect: 'wide'
  },
  {
    id: 'undip-stage-06',
    title: 'Tim Abhinaya Bersama Piala Juara 1 di Backdrop Resmi UNDIP',
    category: 'Panggung Juara',
    year: '2026',
    image: '/gallery/unlimited_undip/undip_stage_action_06.jpg',
    caption: 'Foto bersama seluruh delegasi teknis dan ofisial Abhinaya UNY berlatar backdrop resmi UNLIMITED 2026.',
    event: 'UNLIMITED UNDIP 2026',
    aspect: 'tall'
  },
  {
    id: 'undip-stage-07',
    title: 'Suasana Haru & Syukur Atas Kemenangan Juara 1 Robotika',
    category: 'Panggung Juara',
    year: '2026',
    image: '/gallery/unlimited_undip/undip_stage_action_07.jpg',
    caption: 'Ungkapan syukur dan suka cita seluruh anggota tim setelah melewati babak eliminasi dan presentasi final.',
    event: 'UNLIMITED UNDIP 2026',
    aspect: 'tall'
  },
  {
    id: 'undip-stage-08',
    title: 'Aksi Robot Pemilah Sampah Otonom di Booth Pertandingan',
    category: 'Arena Lomba',
    year: '2026',
    image: '/gallery/unlimited_undip/undip_stage_action_08.jpg',
    caption: 'Robot kreatif Abhinaya mendemonstrasikan sistem klasifikasi sampah otomatis berbasis sensor dan aktuator presisi.',
    event: 'UNLIMITED UNDIP 2026',
    aspect: 'portrait'
  },
  {
    id: 'undip-stage-09',
    title: 'Pengujian Mekanisme Pemilahan Limbah di Depan Dewan Juri',
    category: 'Arena Lomba',
    year: '2026',
    image: '/gallery/unlimited_undip/undip_stage_action_09.jpg',
    caption: 'Juri mengamati langsung efisiensi mekanisme pemilahan dan sorting sampah cerdas karya tim Abhinaya UNY.',
    event: 'UNLIMITED UNDIP 2026',
    aspect: 'tall'
  },
  {
    id: 'undip-stage-10',
    title: 'Presentasi Teknis Sistem AI & Vision Robot Pemantau Lingkungan',
    category: 'Arena Lomba',
    year: '2026',
    image: '/gallery/unlimited_undip/undip_stage_action_10.jpg',
    caption: 'Pemaparan arsitektur sistem vision dan integrasi kontrol mikrokontroler di hadapan akademisi dan juri praktisi.',
    event: 'UNLIMITED UNDIP 2026',
    aspect: 'tall'
  },
  {
    id: 'undip-stage-11',
    title: 'Display Robot Kreatif Waste Management Abhinaya UNY',
    category: 'Arena Lomba',
    year: '2026',
    image: '/gallery/unlimited_undip/undip_stage_action_11.jpg',
    caption: 'Detail sasis, kompartemen penampung, dan modul mikrokontroler robot yang tampil prima di arena kompetisi.',
    event: 'UNLIMITED UNDIP 2026',
    aspect: 'portrait'
  },
  {
    id: 'undip-stage-12',
    title: 'Uji Ketangkasan Navigasi & Manuver Robot di Arena UNDIP',
    category: 'Arena Lomba',
    year: '2026',
    image: '/gallery/unlimited_undip/undip_stage_action_12.jpg',
    caption: 'Robot bergerak dinamis menyelesaikan simulasi rute pengumpulan limbah dan pemantauan kualitas lingkungan.',
    event: 'UNLIMITED UNDIP 2026',
    aspect: 'tall'
  },
  {
    id: 'undip-stage-13',
    title: 'Inspeksi Teknis & Uji Kelayakan Robot oleh Tim Juri',
    category: 'Arena Lomba',
    year: '2026',
    image: '/gallery/unlimited_undip/undip_stage_action_13.jpg',
    caption: 'Proses scrutineering dan verifikasi dimensi serta kepatuhan aturan lomba robot kreatif tingkat nasional.',
    event: 'UNLIMITED UNDIP 2026',
    aspect: 'tall'
  },
  {
    id: 'undip-stage-14',
    title: 'Foto Lengkap Kontingen Abhinaya Memegang Piala Juara 1',
    category: 'Panggung Juara',
    year: '2026',
    image: '/gallery/unlimited_undip/undip_stage_action_14.jpg',
    caption: 'Potret kebersamaan seluruh skuad Abhinaya UNY dengan trofi Juara 1 Robot Kreatif di panggung utama.',
    event: 'UNLIMITED UNDIP 2026',
    aspect: 'wide'
  },
  {
    id: 'undip-stage-15',
    title: 'Pemberian Tepuk Tangan Penghormatan dari Peserta Lomba',
    category: 'Panggung Juara',
    year: '2026',
    image: '/gallery/unlimited_undip/undip_stage_action_15.jpg',
    caption: 'Apresiasi dari dewan juri dan seluruh peserta kompetisi atas keunggulan inovasi robotika lingkungan UNY.',
    event: 'UNLIMITED UNDIP 2026',
    aspect: 'wide'
  },
  {
    id: 'undip-stage-16',
    title: 'Momen Pembacaan Skor Akhir & Pengumuman Juara 1',
    category: 'Panggung Juara',
    year: '2026',
    image: '/gallery/unlimited_undip/undip_stage_action_16.jpg',
    caption: 'Detik-detik penentuan hasil kalkulasi poin juri yang menempatkan Abhinaya UNY di posisi teratas.',
    event: 'UNLIMITED UNDIP 2026',
    aspect: 'wide'
  },
  {
    id: 'undip-stage-17',
    title: 'Diskusi Teknis Evaluasi Robot Bersama Dosen & Pembimbing',
    category: 'Behind The Scenes',
    year: '2026',
    image: '/gallery/unlimited_undip/undip_stage_action_17.jpg',
    caption: 'Diskusi evaluasi performa mekanik dan elektronika setelah babak penyisihan berlangsung lancar.',
    event: 'UNLIMITED UNDIP 2026',
    aspect: 'tall'
  },
  {
    id: 'undip-stage-18',
    title: 'Sesi Tanya Jawab Inovasi Sensor Limbah dengan Panelis',
    category: 'Arena Lomba',
    year: '2026',
    image: '/gallery/unlimited_undip/undip_stage_action_18.jpg',
    caption: 'Penjelasan interaktif mengenai sensor pembaca kelembapan, gas, dan klasifikasi jenis sampah lingkungan.',
    event: 'UNLIMITED UNDIP 2026',
    aspect: 'wide'
  },
  {
    id: 'undip-stage-19',
    title: 'Briefing Akhir Anggota Tim Sebelum Naik ke Panggung Presentasi',
    category: 'Behind The Scenes',
    year: '2026',
    image: '/gallery/unlimited_undip/undip_stage_action_19.jpg',
    caption: 'Fokus dan koordinasi divisi program, elektrik, dan mekanik memastikan kelancaran demonstrasi live.',
    event: 'UNLIMITED UNDIP 2026',
    aspect: 'wide'
  },
  {
    id: 'undip-stage-20',
    title: 'Euforia Kontingen UNY Merayakan Kemenangan Bergengsi di Semarang',
    category: 'Panggung Juara',
    year: '2026',
    image: '/gallery/unlimited_undip/undip_stage_action_20.jpg',
    caption: 'Sorak gembira anggota tim robotika di luar arena setelah kepastian perolehan piala Juara 1 Nasional.',
    event: 'UNLIMITED UNDIP 2026',
    aspect: 'wide'
  },
  {
    id: 'undip-stage-21',
    title: 'Dokumentasi Piala Juara 1 Bersama Maskot & Panggung UNDIP',
    category: 'Panggung Juara',
    year: '2026',
    image: '/gallery/unlimited_undip/undip_stage_action_21.jpg',
    caption: 'Foto piala juara berhiaskan ornamen panggung megah UNLIMITED Robotics Competition 2026.',
    event: 'UNLIMITED UNDIP 2026',
    aspect: 'wide'
  },
  {
    id: 'undip-stage-22',
    title: 'Simulasi Pemilahan Sampah Berulang Tanpa Kesalahan',
    category: 'Arena Lomba',
    year: '2026',
    image: '/gallery/unlimited_undip/undip_stage_action_22.jpg',
    caption: 'Demonstrasi akurasi sistem pengambil dan pemilah sampah yang bekerja secara berkesinambungan.',
    event: 'UNLIMITED UNDIP 2026',
    aspect: 'wide'
  },
  {
    id: 'undip-stage-23',
    title: 'Cek Kesiapan Baterai & Daya Sistem Sebelum Sesi Live Juri',
    category: 'Behind The Scenes',
    year: '2026',
    image: '/gallery/unlimited_undip/undip_stage_action_23.jpg',
    caption: 'Pengecekan voltase sel daya dan kestabilan regulator tegangan demi menjaga keandalan sistem.',
    event: 'UNLIMITED UNDIP 2026',
    aspect: 'tall'
  },
  {
    id: 'undip-stage-24',
    title: 'Paddock Abhinaya UNY Menjelang Giliran Unjuk Karya',
    category: 'Behind The Scenes',
    year: '2026',
    image: '/gallery/unlimited_undip/undip_stage_action_24.jpg',
    caption: 'Suasana kerja yang intensif di meja kerja paddock Abhinaya sebelum giliran tampil di panggung dewan juri.',
    event: 'UNLIMITED UNDIP 2026',
    aspect: 'tall'
  },
  {
    id: 'undip-stage-25',
    title: 'Selebrasi Spontan Tim Robotika di Koridor Venue Kompetisi',
    category: 'Panggung Juara',
    year: '2026',
    image: '/gallery/unlimited_undip/undip_stage_action_25.jpg',
    caption: 'Keceriaan dan kebanggaan tim membawa pulang gelar juara ke kampus Universitas Negeri Yogyakarta.',
    event: 'UNLIMITED UNDIP 2026',
    aspect: 'tall'
  },
  {
    id: 'undip-uny-ugm-01',
    title: 'Solidaritas Robotika Yogyakarta: Kontingen UNY x UGM di UNDIP',
    category: 'Behind The Scenes',
    year: '2026',
    image: '/gallery/unlimited_undip/undip_uny_ugm_01.jpg',
    caption: 'Momen persaudaraan hangat antara tim Abhinaya UNY dan tim GMRT UGM yang sama-sama berprestasi di Semarang.',
    event: 'UNLIMITED UNDIP 2026',
    aspect: 'tall'
  },
  {
    id: 'undip-uny-ugm-02',
    title: 'Foto Bersama Peraih Podium: Juara 1 UNY & Juara 2 UGM',
    category: 'Panggung Juara',
    year: '2026',
    image: '/gallery/unlimited_undip/undip_uny_ugm_02.jpg',
    caption: 'Potret bersejarah dua delegasi kampus terbaik D.I. Yogyakarta yang memborong podium subkategori Environmental Monitoring & Waste Management.',
    event: 'UNLIMITED UNDIP 2026',
    aspect: 'wide'
  },
  {
    id: 'undip-uny-ugm-03',
    title: 'Saling Mendukung di Arena: Sinergi Mahasiswa Robotika Yogya',
    category: 'Behind The Scenes',
    year: '2026',
    image: '/gallery/unlimited_undip/undip_uny_ugm_03.jpg',
    caption: 'Kebersamaan anggota tim UNY dan UGM saat bertukar wawasan teknis seputar mekanika dan kecerdasan buatan.',
    event: 'UNLIMITED UNDIP 2026',
    aspect: 'wide'
  },
  {
    id: 'undip-uny-ugm-04',
    title: 'Kebanggaan Kontingen DIY di Ajang Robotika Nasional Semarang',
    category: 'Panggung Juara',
    year: '2026',
    image: '/gallery/unlimited_undip/undip_uny_ugm_04.jpg',
    caption: 'Delegasi Yogyakarta membuktikan kualitas riset robotika terdepan di tingkat nasional lewat inovasi pengelolaan lingkungan.',
    event: 'UNLIMITED UNDIP 2026',
    aspect: 'wide'
  },
  {
    id: 'undip-uny-ugm-05',
    title: 'Sesi Foto Bersama Abhinaya UNY dan Subtim H8 GMRT UGM',
    category: 'Behind The Scenes',
    year: '2026',
    image: '/gallery/unlimited_undip/undip_uny_ugm_05.jpg',
    caption: 'Kolaborasi persahabatan antarkampus di area venue perlombaan HME FT Universitas Diponegoro.',
    event: 'UNLIMITED UNDIP 2026',
    aspect: 'wide'
  },
  {
    id: 'undip-uny-ugm-06',
    title: 'Trofi Bersama: Pesta Prestasi Robotika DIY di UNLIMITED 2026',
    category: 'Panggung Juara',
    year: '2026',
    image: '/gallery/unlimited_undip/undip_uny_ugm_06.jpg',
    caption: 'Dua piala kemenangan digenggam bersama oleh perwakilan kontingen Abhinaya UNY dan GMRT UGM.',
    event: 'UNLIMITED UNDIP 2026',
    aspect: 'tall'
  },
  {
    id: 'undip-uny-ugm-07',
    title: 'Diskusi Santai & Bedah Teknologi Pasca Lomba Antara UNY & UGM',
    category: 'Behind The Scenes',
    year: '2026',
    image: '/gallery/unlimited_undip/undip_uny_ugm_07.jpg',
    caption: 'Berbagi pengalaman teknis, sistem sensor limbah, dan strategi rancang bangun robot kompetisi berikutnya.',
    event: 'UNLIMITED UNDIP 2026',
    aspect: 'wide'
  },
  {
    id: 'undip-uny-ugm-08',
    title: 'Foto Ceria Kolaborasi Almamater Hijau & Biru di Semarang',
    category: 'Behind The Scenes',
    year: '2026',
    image: '/gallery/unlimited_undip/undip_uny_ugm_08.jpg',
    caption: 'Senyum bangga para mahasiswa teknik dari UNY dan UGM yang sukses mengharumkan nama Yogyakarta.',
    event: 'UNLIMITED UNDIP 2026',
    aspect: 'wide'
  },
  {
    id: 'undip-uny-ugm-09',
    title: 'Pose Kebersamaan Skuad UNY x UGM Membawa Trofi Penghargaan',
    category: 'Panggung Juara',
    year: '2026',
    image: '/gallery/unlimited_undip/undip_uny_ugm_09.jpg',
    caption: 'Momen foto bersama yang penuh energi positif dan kebanggaan akan kerja keras selama persiapan kompetisi.',
    event: 'UNLIMITED UNDIP 2026',
    aspect: 'wide'
  },
  {
    id: 'undip-uny-ugm-10',
    title: 'Silaturahmi Riset Robotika Lintas Kampus UNY & UGM',
    category: 'Behind The Scenes',
    year: '2026',
    image: '/gallery/unlimited_undip/undip_uny_ugm_10.jpg',
    caption: 'Menjalin relasi riset dan persaudaraan berkelanjutan antarmahasiswa penggiat robotika di Indonesia.',
    event: 'UNLIMITED UNDIP 2026',
    aspect: 'tall'
  },
  {
    id: 'undip-uny-ugm-11',
    title: 'Suasana Hangat Kontingen Yogya di Ruang Tunggu Venue',
    category: 'Behind The Scenes',
    year: '2026',
    image: '/gallery/unlimited_undip/undip_uny_ugm_11.jpg',
    caption: 'Dukungan moral timpal-balik antaranggota tim selama berlangsungnya proses penilaian babak final.',
    event: 'UNLIMITED UNDIP 2026',
    aspect: 'tall'
  },
  {
    id: 'undip-uny-ugm-12',
    title: 'Kenang-Kenangan Indah Panggung Kejuaraan UNY Bersama UGM',
    category: 'Panggung Juara',
    year: '2026',
    image: '/gallery/unlimited_undip/undip_uny_ugm_12.jpg',
    caption: 'Kenangan manis keberhasilan bersama di ajang bergengsi UNLIMITED UNDIP 2026.',
    event: 'UNLIMITED UNDIP 2026',
    aspect: 'tall'
  },
  {
    id: 'undip-trophy-01',
    title: 'Potret Anggota Tim Memegang Piala Juara 1 Robot Kreatif',
    category: 'Panggung Juara',
    year: '2026',
    image: '/gallery/unlimited_undip/undip_trophy_squad_01.jpg',
    caption: 'Bangga mempersembahkan piala Juara 1 tingkat nasional bagi almamater Universitas Negeri Yogyakarta.',
    event: 'UNLIMITED UNDIP 2026',
    aspect: 'portrait'
  },
  {
    id: 'undip-trophy-02',
    title: 'Senyum Kebanggaan Personil Abhinaya dengan Trofi Kemenangan',
    category: 'Panggung Juara',
    year: '2026',
    image: '/gallery/unlimited_undip/undip_trophy_squad_02.jpg',
    caption: 'Buah manis dari lembur riset, perancangan sasis, dan pengujian program berhari-hari di lab.',
    event: 'UNLIMITED UNDIP 2026',
    aspect: 'portrait'
  },
  {
    id: 'undip-trophy-03',
    title: 'Genggam Erat Piala Juara: Dedikasi Divisi Teknis Robotika',
    category: 'Panggung Juara',
    year: '2026',
    image: '/gallery/unlimited_undip/undip_trophy_squad_03.jpg',
    caption: 'Apresiasi tertinggi atas dedikasi dan kerja keras setiap divisi dalam menyempurnakan performa robot.',
    event: 'UNLIMITED UNDIP 2026',
    aspect: 'portrait'
  },
  {
    id: 'undip-trophy-04',
    title: 'Potret Ofisial & Kru Pendukung Abhinaya UNY di Hari Kemenangan',
    category: 'Panggung Juara',
    year: '2026',
    image: '/gallery/unlimited_undip/undip_trophy_squad_04.jpg',
    caption: 'Dukungan moril dan manajemen tim yang solid menjadi kunci keberhasilan di ajang UNLIMITED 2026.',
    event: 'UNLIMITED UNDIP 2026',
    aspect: 'portrait'
  },
  {
    id: 'undip-trophy-05',
    title: 'Kebanggaan Pribadi Membawa Pulang Trofi Juara Nasional',
    category: 'Panggung Juara',
    year: '2026',
    image: '/gallery/unlimited_undip/undip_trophy_squad_05.jpg',
    caption: 'Momen tak terlupakan memegang piala lambang supremasi inovasi teknologi lingkungan di Semarang.',
    event: 'UNLIMITED UNDIP 2026',
    aspect: 'tall'
  },
  {
    id: 'undip-trophy-06',
    title: 'Pose Juara: Refleksi Perjuangan Menghadapi Persaingan Ketat',
    category: 'Panggung Juara',
    year: '2026',
    image: '/gallery/unlimited_undip/undip_trophy_squad_06.jpg',
    caption: 'Menghadapi delegasi puluhan perguruan tinggi dengan percaya diri dan sportivitas tinggi.',
    event: 'UNLIMITED UNDIP 2026',
    aspect: 'tall'
  },
  {
    id: 'undip-trophy-07',
    title: 'Semangat Juara Anggota Muda Abhinaya UNY',
    category: 'Panggung Juara',
    year: '2026',
    image: '/gallery/unlimited_undip/undip_trophy_squad_07.jpg',
    caption: 'Regenerasi yang terbukti unggul dan siap meneruskan tradisi prestasi robotika UNY di kancah nasional.',
    event: 'UNLIMITED UNDIP 2026',
    aspect: 'tall'
  },
  {
    id: 'undip-trophy-08',
    title: 'Potret Membanggakan Kru Mekanik Bersama Hasil Karya Juara',
    category: 'Panggung Juara',
    year: '2026',
    image: '/gallery/unlimited_undip/undip_trophy_squad_08.jpg',
    caption: 'Sistem mekanik yang presisi dan tangguh terbukti mengantarkan tim meraih skor penilaian tertinggi.',
    event: 'UNLIMITED UNDIP 2026',
    aspect: 'tall'
  },
  {
    id: 'undip-trophy-09',
    title: 'Potret Kru Elektrik & Hardware Bersama Trofi Juara 1',
    category: 'Panggung Juara',
    year: '2026',
    image: '/gallery/unlimited_undip/undip_trophy_squad_09.jpg',
    caption: 'Sirkuit yang andal tanpa gangguan glitch memastikan robot beroperasi sempurna di hadapan juri.',
    event: 'UNLIMITED UNDIP 2026',
    aspect: 'tall'
  },
  {
    id: 'undip-trophy-10',
    title: 'Potret Programmer AI & Kendali Otonom Abhinaya UNY',
    category: 'Panggung Juara',
    year: '2026',
    image: '/gallery/unlimited_undip/undip_trophy_squad_10.jpg',
    caption: 'Logika pemilahan dan sorting sampah berjalan mulus tanpa celah berkat algoritma kontrol yang matang.',
    event: 'UNLIMITED UNDIP 2026',
    aspect: 'tall'
  },
  {
    id: 'undip-trophy-11',
    title: 'Pose Kemenangan di Area Backdrop Resmi Universitas Diponegoro',
    category: 'Panggung Juara',
    year: '2026',
    image: '/gallery/unlimited_undip/undip_trophy_squad_11.jpg',
    caption: 'Mengabadikan momen bersejarah sebagai Juara 1 Kompetisi Robot Kreatif UNLIMITED 2026.',
    event: 'UNLIMITED UNDIP 2026',
    aspect: 'tall'
  },
  {
    id: 'undip-trophy-12',
    title: 'Senyum Penuh Rasa Syukur Kru Abhinaya di Venue Perlombaan',
    category: 'Panggung Juara',
    year: '2026',
    image: '/gallery/unlimited_undip/undip_trophy_squad_12.jpg',
    caption: 'Setiap tetes keringat dan waktu yang tercurah terbayar lunas dengan prestasi membanggakan.',
    event: 'UNLIMITED UNDIP 2026',
    aspect: 'tall'
  },
  {
    id: 'undip-trophy-13',
    title: 'Foto Profil Juara dengan Latar Panggung Megah UNDIP',
    category: 'Panggung Juara',
    year: '2026',
    image: '/gallery/unlimited_undip/undip_trophy_squad_13.jpg',
    caption: 'Kenangan manis kompetisi teknologi robotika tingkat nasional di Tembalang, Semarang.',
    event: 'UNLIMITED UNDIP 2026',
    aspect: 'tall'
  },
  {
    id: 'undip-trophy-14',
    title: 'Potret Prestasi Mahasiswa Fakultas Teknik UNY di Kancah Nasional',
    category: 'Panggung Juara',
    year: '2026',
    image: '/gallery/unlimited_undip/undip_trophy_squad_14.jpg',
    caption: 'Membuktikan kompetensi vokasi dan rekayasa teknologi FT UNY di level tertinggi.',
    event: 'UNLIMITED UNDIP 2026',
    aspect: 'tall'
  },
  {
    id: 'undip-trophy-15',
    title: 'Momen Berharga Anggota Tim Mengangkat Trofi Kehormatan',
    category: 'Panggung Juara',
    year: '2026',
    image: '/gallery/unlimited_undip/undip_trophy_squad_15.jpg',
    caption: 'Simbol kebangkitan dan konsistensi prestasi tim robotika Abhinaya UNY.',
    event: 'UNLIMITED UNDIP 2026',
    aspect: 'tall'
  },
  {
    id: 'undip-trophy-16',
    title: 'Potret Semangat Kolaboratif Anggota Abhinaya',
    category: 'Panggung Juara',
    year: '2026',
    image: '/gallery/unlimited_undip/undip_trophy_squad_16.jpg',
    caption: 'Kekompakan tim yang menjadi fondasi utama keberhasilan merebut juara pertama.',
    event: 'UNLIMITED UNDIP 2026',
    aspect: 'tall'
  },
  {
    id: 'undip-trophy-17',
    title: 'Pose Percaya Diri Memegang Piala Robot Kreatif Lingkungan',
    category: 'Panggung Juara',
    year: '2026',
    image: '/gallery/unlimited_undip/undip_trophy_squad_17.jpg',
    caption: 'Solusi nyata pemilahan sampah cerdas yang diapresiasi oleh juri akademisi dan industri.',
    event: 'UNLIMITED UNDIP 2026',
    aspect: 'tall'
  },
  {
    id: 'undip-trophy-18',
    title: 'Potret Kebanggaan Almamater UNY di Antara Deretan Kampus Unggulan',
    category: 'Panggung Juara',
    year: '2026',
    image: '/gallery/unlimited_undip/undip_trophy_squad_18.jpg',
    caption: 'Menegaskan posisi Abhinaya UNY sebagai salah satu kekuatan utama robotika di tanah air.',
    event: 'UNLIMITED UNDIP 2026',
    aspect: 'tall'
  },
  {
    id: 'undip-trophy-19',
    title: 'Sorot Mata Optimisme & Prestasi Anggota Tim Robotika',
    category: 'Panggung Juara',
    year: '2026',
    image: '/gallery/unlimited_undip/undip_trophy_squad_19.jpg',
    caption: 'Siap melangkah ke kompetisi dan tantangan inovasi robotika berikutnya.',
    event: 'UNLIMITED UNDIP 2026',
    aspect: 'tall'
  },
  {
    id: 'undip-trophy-20',
    title: 'Potret Kenangan Penganugerahan Juara di Tembalang Semarang',
    category: 'Panggung Juara',
    year: '2026',
    image: '/gallery/unlimited_undip/undip_trophy_squad_20.jpg',
    caption: 'Mengabadikan perjalanan indah tim robotika Abhinaya di ibu kota Jawa Tengah.',
    event: 'UNLIMITED UNDIP 2026',
    aspect: 'tall'
  },
  {
    id: 'undip-trophy-21',
    title: 'Gaya Santai & Ceria Anggota Bersama Trofi Juara 1',
    category: 'Panggung Juara',
    year: '2026',
    image: '/gallery/unlimited_undip/undip_trophy_squad_21.jpg',
    caption: 'Melepaskan ketegangan setelah berjuang maksimal dan menuntaskan kompetisi dengan kemenangan.',
    event: 'UNLIMITED UNDIP 2026',
    aspect: 'tall'
  },
  {
    id: 'undip-trophy-22',
    title: 'Potret Bersama Trofi: Bukti Nyata Kerja Keras Tanpa Henti',
    category: 'Panggung Juara',
    year: '2026',
    image: '/gallery/unlimited_undip/undip_trophy_squad_22.jpg',
    caption: 'Komitmen menghadirkan teknologi robot yang aplikatif dan bermanfaat untuk lingkungan hidup.',
    event: 'UNLIMITED UNDIP 2026',
    aspect: 'tall'
  },
  {
    id: 'undip-trophy-23',
    title: 'Potret Simbolis Sukses Abhinaya UNY di UNLIMITED 2026',
    category: 'Panggung Juara',
    year: '2026',
    image: '/gallery/unlimited_undip/undip_trophy_squad_23.jpg',
    caption: 'Selamat kepada seluruh tim atas pencapaian luar biasa Juara 1 Robot Kreatif Nasional!',
    event: 'UNLIMITED UNDIP 2026',
    aspect: 'tall'
  }
];

export const GALLERY_CATEGORIES = [
  'Semua',
  'Arena Lomba',
  'Panggung Juara',
  'Riset & Lab',
  'Behind The Scenes',
  'Video Aksi'
] as const;

// 5 Distinct Rows for the Photo & Video Marquee Wall
// Combining historic championship moments, KRTMI arena matches, and the vibrant UNLIMITED UNDIP 2026 trophy haul
export const GALLERY_ROWS = {
  row1: [
    ...GALLERY_ITEMS.filter((it) => it.category === 'Panggung Juara').slice(0, 16),
    GALLERY_ITEMS.find((it) => it.id === 'vid-kilas-balik-2024')!,
    GALLERY_ITEMS.find((it) => it.id === 'vid-shorts-selebrasi-juara')!
  ],
  row2: [
    ...GALLERY_ITEMS.filter((it) => it.category === 'Arena Lomba').slice(0, 16),
    GALLERY_ITEMS.find((it) => it.id === 'vid-live-krtmi-2024')!,
    GALLERY_ITEMS.find((it) => it.id === 'vid-shorts-recap-2023')!
  ],
  row3: [
    ...GALLERY_ITEMS.filter((it) => it.id.startsWith('undip-uny-ugm-') || (it.category === 'Behind The Scenes' && !it.isVideo)).slice(0, 16),
    GALLERY_ITEMS.find((it) => it.id === 'vid-perjalanan-krtmi')!,
    GALLERY_ITEMS.find((it) => it.id === 'vid-shorts-fabrikasi-3d')!
  ],
  row4: [
    ...GALLERY_ITEMS.filter((it) => it.category === 'Riset & Lab' || it.id.startsWith('undip-stage-')).slice(0, 16),
    GALLERY_ITEMS.find((it) => it.id === 'vid-oprec-tim')!,
    GALLERY_ITEMS.find((it) => it.id === 'vid-shorts-simulasi-sirkuit')!
  ],
  row5: [
    ...GALLERY_ITEMS.filter((it) => it.id.startsWith('undip-trophy-')).slice(0, 18),
    GALLERY_ITEMS.find((it) => it.id === 'vid-kilas-balik-2024')!,
    GALLERY_ITEMS.find((it) => it.id === 'vid-live-krtmi-2024')!
  ]
};

