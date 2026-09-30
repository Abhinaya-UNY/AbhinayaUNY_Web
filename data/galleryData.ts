export interface GalleryItem {
  id: string;
  title: string;
  category: 'Semua' | 'Arena Lomba' | 'Panggung Juara' | 'Riset & Lab' | 'Behind The Scenes';
  year: string;
  image: string;
  caption: string;
  event: string;
  aspect?: 'wide' | 'standard' | 'panoramic' | 'square';
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
    aspect: 'wide'
  },
  {
    id: 'uny-krtmi-juara-pusat',
    title: 'Foto Resmi Kontingen Juara Bersama Rektorat',
    category: 'Panggung Juara',
    year: '2024',
    image: '/images/news/uny-krtmi-juara-pusat-2024.jpg',
    caption: 'Apresiasi universitas atas capaian gemilang tim robotika di kancah nasional.',
    event: 'Humas UNY 2024',
    aspect: 'standard'
  },
  {
    id: 'krtmi-celebration-stage',
    title: 'Momen Emas Perjuangan Kontingen Robotika',
    category: 'Panggung Juara',
    year: '2024',
    image: '/gallery/krtmi_celebration.jpg',
    caption: 'Suasana riuh kebahagiaan para anggota dan pembina menyambut pengumuman skor akhir juri.',
    event: 'KRI Nasional 2024',
    aspect: 'wide'
  },
  {
    id: 'hero-team-stage',
    title: 'Foto Bersama di Panggung Utama KRI',
    category: 'Panggung Juara',
    year: '2024',
    image: '/assets/hero_team_stage.jpg',
    caption: 'Potret lengkap seluruh punggawa teknis dan ofisial Abhinaya UNY di panggung KRI.',
    event: 'KRI 2024 (Edutorium UMS)',
    aspect: 'panoramic'
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
    aspect: 'wide'
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
    aspect: 'wide'
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
    aspect: 'panoramic'
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
    aspect: 'wide'
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
    aspect: 'wide'
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
    aspect: 'wide'
  },
  {
    id: 'ig-paddock-usm-2023',
    title: 'Atmosfer Paddock KRTMI USM Semarang',
    category: 'Behind The Scenes',
    year: '2023',
    image: '/images/instagram_feed/2023-09-08_02-54-52_UTC_Cw6jFIzPwDx_5.jpg',
    caption: 'Suasana kerja intensif anggota tim menyempurnakan kode kontroler di sela-sela babak penyisihan.',
    event: 'KRTMI 2023 (USM Semarang)',
    aspect: 'panoramic'
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
    aspect: 'wide'
  },
  {
    id: 'ig-evaluasi-paddock',
    title: 'Briefing Strategis Menghadapi Babak Final',
    category: 'Behind The Scenes',
    year: '2024',
    image: '/images/instagram_feed/2024-09-12_17-50-54_UTC_C_03vj8zNUB_2.jpg',
    caption: 'Ketua tim dan manajer mengarahkan taktik kecepatan konveyor demi memaksimalkan poin.',
    event: 'KRTMI 2024',
    aspect: 'standard'
  },
  {
    id: 'ig-telemetri-usm',
    title: 'Pengujian Frekuensi Nirkabel 2.4 GHz Anti-Interferensi',
    category: 'Behind The Scenes',
    year: '2023',
    image: '/images/instagram_feed/2023-09-08_02-54-52_UTC_Cw6jFIzPwDx_7.jpg',
    caption: 'Pengujian link komunikasi radio agar kendali robot tetap responsif di tengah ratusan sinyal nirkabel.',
    event: 'KRI 2023',
    aspect: 'wide'
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
    aspect: 'wide'
  },
  {
    id: 'ig-divisi-program',
    title: 'Optimasi Model Visi Komputer YOLOv8',
    category: 'Riset & Lab',
    year: '2023',
    image: '/images/instagram_feed/2023-09-08_02-08-37_UTC_Cw6dyWqPSoI_3.jpg',
    caption: 'Tim programmer melatih dataset ribuan citra objek sampah basah dan kering untuk inferensi real-time.',
    event: 'Lab Komputer FT UNY',
    aspect: 'standard'
  },
  {
    id: 'ig-divisi-elektronik',
    title: 'Riset Distribusi Daya & Sensor Fusion',
    category: 'Riset & Lab',
    year: '2023',
    image: '/images/instagram_feed/2023-09-08_01-46-44_UTC_Cw6bSByvBVA_2.jpg',
    caption: 'Penyusunan modul power management dan integrasi sensor ultrasonik anti-tabrakan.',
    event: 'Lab Mekatronika UNY',
    aspect: 'wide'
  },
  {
    id: 'ig-divisi-mekanik',
    title: 'Pemodelan CAD 3D & Rapid Prototyping Sasis',
    category: 'Riset & Lab',
    year: '2023',
    image: '/images/instagram_feed/2023-09-08_01-39-35_UTC_Cw6ads0v8Q2_1.jpg',
    caption: 'Perancangan struktur sasis di Autodesk Inventor dan pencetakan komponen 3D print berkekuatan tinggi.',
    event: 'Workshop Mekanik UNY',
    aspect: 'panoramic'
  },
  {
    id: 'ig-taktik-lomba',
    title: 'Analisis Jalur Lintasan & Efisiensi Manuver',
    category: 'Riset & Lab',
    year: '2023',
    image: '/images/instagram_feed/2023-09-08_01-27-05_UTC_Cw6ZCItPRJ-_1.jpg',
    caption: 'Evaluasi kurva belok sasis mecanum demi memangkas milidetik waktu tempuh arena.',
    event: 'Lab Riset Robotika',
    aspect: 'standard'
  },
  {
    id: 'ig-skuad-2025-1',
    title: 'Skuad Penerus Riset Generasi 2025',
    category: 'Riset & Lab',
    year: '2025',
    image: '/images/instagram_feed/2025-09-27_20-10-47_UTC_DPHl0olk4Zw_1.jpg',
    caption: 'Regenerasi anggota baru Abhinaya meneruskan tongkat estafet inovasi robotika UNY.',
    event: 'Gedung KPLT FT UNY',
    aspect: 'wide'
  },
  {
    id: 'ig-skuad-2025-2',
    title: 'Pengujian Sasis Robot Baru Generasi 2025',
    category: 'Riset & Lab',
    year: '2025',
    image: '/images/instagram_feed/2025-09-27_20-17-09_UTC_DPHmjMFEwJm_1.jpg',
    caption: 'Uji coba platform mobile robot generasi terbaru untuk ajang lomba mendatang.',
    event: 'FT UNY 2025',
    aspect: 'standard'
  },
  {
    id: 'ig-skuad-2025-3',
    title: 'Ketahanan Manuver Sasis Mecanum Heavy-Duty',
    category: 'Riset & Lab',
    year: '2025',
    image: '/images/instagram_feed/2025-09-27_20-31-45_UTC_DPHoOJJk2NM_2.jpg',
    caption: 'Pengujian performa motor brushless dan roda mecanum di berbagai jenis permukaan lantai.',
    event: 'Laboratorium Restek',
    aspect: 'wide'
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
    aspect: 'panoramic'
  },
  {
    id: 'uny-kri-its-2022',
    title: 'Kontingen KRTMI 2022 di Kampus ITS Surabaya',
    category: 'Behind The Scenes',
    year: '2022',
    image: '/images/news/uny-kri-lolos-nasional-2022.jpg',
    caption: 'Perjuangan mengharumkan almamater UNY pada divisi tematik limbah medis rumah sakit di Surabaya.',
    event: 'KRTMI 2022 (ITS Surabaya)',
    aspect: 'standard'
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
    aspect: 'standard'
  },
  {
    id: 'ig-kontingen-usm-2023',
    title: 'Kontingen Abhinaya KRTMI 2023 di USM Semarang',
    category: 'Behind The Scenes',
    year: '2023',
    image: '/images/instagram_feed/2023-09-08_02-54-52_UTC_Cw6jFIzPwDx_2.jpg',
    caption: 'Kontingen robot tematik UNY berfoto bersama di arena Gelora USM Semarang.',
    event: 'KRTMI 2023',
    aspect: 'panoramic'
  },
  {
    id: 'ig-kebersamaan-2024',
    title: 'Malam Refleksi & Kebersamaan Tim Pasca Laga',
    category: 'Behind The Scenes',
    year: '2024',
    image: '/images/instagram_feed/2024-09-12_17-50-54_UTC_C_03vj8zNUB_4.jpg',
    caption: 'Rasa syukur atas perjuangan berbulan-bulan yang membuahkan trofi kejuaraan nasional.',
    event: 'KRI 2024',
    aspect: 'standard'
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
    aspect: 'standard'
  }
];

export const GALLERY_CATEGORIES = [
  'Semua',
  'Arena Lomba',
  'Panggung Juara',
  'Riset & Lab',
  'Behind The Scenes'
] as const;

// 5 Distinct Rows for the "BEHIND THE MACHINES" Photo Wall Collage
export const GALLERY_ROWS = {
  row1: GALLERY_ITEMS.slice(0, 8),
  row2: GALLERY_ITEMS.slice(8, 16),
  row3: GALLERY_ITEMS.slice(16, 24),
  row4: GALLERY_ITEMS.slice(24, 32),
  row5: GALLERY_ITEMS.slice(32, 40),
};
