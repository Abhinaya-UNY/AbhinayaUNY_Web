export interface KrtmiStory {
  year: string;
  badgeYear: string;
  title: string;
  tagline?: string;
  theme: string;
  location: string;
  storySummary: string;
  arenaSpecs: {
    dimensions: string;
    surface: string;
    zones: string;
  };
  missionRules: string[];
  robotSpecs: {
    dimensions: string;
    weight: string;
    power: string;
    controller: string;
    mechanism: string;
  };
  scoringSystem: string[];
  teamRoleAndFunFacts: string[];
  achievement: string;
  isChampion?: boolean;
  pdfFile: string;
  pdfSize: string;
  pdfTitle: string;
}

export const KRTMI_STORIES: KrtmiStory[] = [
  {
    year: '2026',
    badgeYear: '2026',
    title: 'TECHNOCORNER 2026 — Transporter Robot Competition',
    tagline: 'Adu Cepat Sasis Mecanum & Kekuatan Capit Presisi di DTETI FT UGM',
    theme: 'High-Speed Precision Payload Transfer & Extreme Obstacle Crossing',
    location: 'Departemen Teknik Elektro & Teknologi Informasi FT UGM',
    storySummary: 'Kompetisi Transporter Robot tingkat nasional pada ajang Technocorner 2026 FT UGM menantang robot melintasi rute ekstrem (tanjakan terjal, jembatan jungkat-jungkit/teeter-totter, speed bumps bergelombang) sambil memindahkan balok-balok payload berbagai ukuran dan bobot ke zona Drop Zone sasaran dalam batas waktu tercepat.',
    arenaSpecs: {
      dimensions: '400 cm x 300 cm (Sirkuit Modular Bertingkat)',
      surface: 'Multipleks cat doff dengan rintangan teeter-totter, bridge, dan speed bumps 15mm',
      zones: 'Starting Zone, Obstacle Runway, Payload Loading Zone, Drop Zone A/B/C',
    },
    missionRules: [
      'Memulai start dari garis batas tanpa menyentuh rintangan awal.',
      'Mengambil balok payload di Loading Zone menggunakan mekanisme capit mekanik mandiri.',
      'Melintasi tanjakan kemiringan 20 derajat dan jembatan sempit tanpa menjatuhkan balok.',
      'Meletakkan balok payload tepat di dalam batas garis Drop Zone sasaran untuk mengunci poin maksimal.',
    ],
    robotSpecs: {
      dimensions: 'Maksimal 40 cm x 40 cm x 40 cm (Kondisi Awal Start)',
      weight: 'Maksimal 7.5 kg',
      power: 'Baterai LiPo / LiFePO4 Maksimal 12.6V (3S)',
      controller: 'ESP32-S3 Dual-Core Xtensa + Wireless Multi-Channel Telemetry',
      mechanism: '4-Wheel Mecanum Holonomic Drive + Lead-Screw Precision Gripper Mechanism',
    },
    scoringSystem: [
      'Poin Balok Drop Zone A: 50 Poin / balok',
      'Poin Balok Drop Zone B (Tingkat Kesulitan Tinggi): 100 Poin / balok',
      'Bonus Sisa Waktu (Time Bonus): 1 Poin per detik sisa',
      'Penalti: -20 Poin jika keluar garis lintasan atau menyentuh dinding arena',
    ],
    teamRoleAndFunFacts: [
      '🔥 Dirancang dengan fokus pada akselerasi geser samping (strafe) kilat agar tidak kehilangan waktu saat berbelok.',
      '🦾 Capit lead screw mampu menahan beban getaran saat melewati tanjakan berundak tanpa selip.',
    ],
    achievement: '🤖 PESERTA TINGKAT NASIONAL TECHNOCORNER 2026 FT UGM',
    isChampion: false,
    pdfFile: 'Panduan_Technocorner_2026.pdf',
    pdfSize: '40.83 MB',
    pdfTitle: 'Guidebook Transporter Technocorner 2026 (FT UGM)',
  },
  {
    year: '2024',
    badgeYear: '2024',
    title: 'KRTMI 2024 — Robot Pemilah Sampah Cerdas & Keranjang Digital',
    tagline: 'Puncak Prestasi Abhinaya UNY: Juara 1 Regional I & Juara 2 Tingkat Nasional!',
    theme: 'Otomasi Pengelolaan Sampah Cerdas Berbasis Visi Komputer & Mobile Robot',
    location: 'Universitas Muhammadiyah Surakarta (UMS) & BPTI Kemendikbudristek',
    storySummary: 'KRTMI 2024 menghadirkan tantangan otonom penuh tingkat tinggi: Robot utama harus mendeteksi jenis sampah secara mandiri menggunakan kamera AI (YOLO), memungutnya dengan gripper presisi, lalu mengantarkannya ke Keranjang Cerdas (Smart Basket) yang bergerak dinamis di arena tanpa intervensi kendali manusia.',
    arenaSpecs: {
      dimensions: '600 cm x 400 cm (Lantai Karpet Khusus Uji Traksi)',
      surface: 'Matras eva bergaris pandu optik dan zona koordinat digital',
      zones: 'Start Zone, Waste Distribution Zone (Organik/Anorganik/B3), Smart Basket Moving Zone',
    },
    missionRules: [
      'Robot beroperasi 100% otonom sejak tombol start ditekan di awal ronde pertandingan.',
      'Mengklasifikasikan minimal 3 kategori sampah (Botol Plastik, Kaleng Logam, Kotak Kardus) menggunakan visi komputer.',
      'Melakukan sinkronisasi posisi nirkabel dengan Keranjang Digital untuk proses serah terima sampah.',
      'Menyelesaikan seluruh siklus pemilahan dalam batas waktu maksimal 3 menit.',
    ],
    robotSpecs: {
      dimensions: 'Maksimal 60 cm x 60 cm x 60 cm',
      weight: 'Maksimal 20 kg',
      power: 'Baterai Industri LiFePO4 24V / 12V Isolated Sub-System',
      controller: 'Dual ESP32-S3 + STM32 ARM Cortex-M4 + AI Vision Edge Processing',
      mechanism: '4-Wheel Heavy Duty Mecanum Kinematics + Dual Roller Elevator Gripper',
    },
    scoringSystem: [
      'Deteksi & Pemilahan Sampah Benar: 100 Poin per item',
      'Penempatan Tepat ke Keranjang Cerdas: +50 Poin Bonus',
      'Kecepatan Penyelesaian Penuh (Full Task): Nilai waktu sisa dikonversi ke poin penentu',
      'Penalti: -20 Poin jika sampah jatuh di luar keranjang atau robot menyenggol rintangan',
    ],
    teamRoleAndFunFacts: [
      '🏆 Mengalahkan puluhan universitas terkemuka di Indonesia dan menembus Babak Final Nasional.',
      '🥇 Dinobatkan sebagai JUARA 1 REGIONAL I WILAYAH dan JUARA 2 TINGKAT NASIONAL KRTMI 2024!',
    ],
    achievement: '🥇 JUARA 1 REGIONAL I WILAYAH & 🥈 JUARA 2 TINGKAT NASIONAL KRTMI 2024',
    isChampion: true,
    pdfFile: 'Panduan_KRTMI_2024.pdf',
    pdfSize: '0.56 MB',
    pdfTitle: 'Buku 7 Panduan Resmi KRTMI 2024 (BPTI Kemendikbudristek)',
  },
  {
    year: '2023',
    badgeYear: '2023',
    title: 'KRTMI 2023 — Robot Pemilah Sampah & Keranjang Cerdas Tematik',
    tagline: 'Duet Robot Kolaboratif di Panggung Nasional Semarang',
    theme: 'Smart Waste Sorting & Collaborative Mobile Robotics',
    location: 'Universitas Semarang (USM) & Puspresnas Kemendikbudristek',
    storySummary: 'Edisi 2023 memperkenalkan konsep kolaborasi multi-robot di arena KRTMI: Robot pemungut sampah bertugas menyisir arena dan melempar/menaruh sampah tiruan ke robot kedua yang berfungsi sebagai keranjang penerima bergerak yang selalu mengunci posisi robot utama.',
    arenaSpecs: {
      dimensions: '600 cm x 400 cm',
      surface: 'Lantai vinyl bergaris pandu kontras tinggi',
      zones: 'Waste Collection Yard, Relay Channel, Dynamic Basket Trajectory Area',
    },
    missionRules: [
      'Dua robot (Robot Sorter & Robot Basket) bergerak simultan di arena.',
      'Saling bertukar data koordinat posisi real-time melalui protokol komunikasi nirkabel.',
      'Mengambil dan memilah minimal 6 objek sampah sintetis sesuai kategori warna.',
    ],
    robotSpecs: {
      dimensions: 'Robot Sorter: 55x55x55 cm | Robot Basket: 45x45x60 cm',
      weight: 'Total kombinasi kedua robot maksimal 25 kg',
      power: 'LiPo 4S 14.8V 5000mAh High-Discharge',
      controller: 'ESP32 Dual-Core + Closed-Loop Magnetic Encoder Feedback',
      mechanism: '3-Wheel Omni Directional Drive + Multi-Linkage Gripper Arm',
    },
    scoringSystem: [
      'Memilah Sampah ke Keranjang Sesuai Warna: 80 Poin per objek',
      'Sinkronisasi Gerak Kolaboratif Tanpa Tabrakan: +60 Poin Bonus',
      'Penalti: -10 Poin untuk tiap retry manual operator',
    ],
    teamRoleAndFunFacts: [
      '🥉 Meraih JUARA 3 TINGKAT WILAYAH dan berhasil lolos sebagai FINALIS TINGKAT NASIONAL di USM Semarang.',
      '💡 Sukses membuktikan ketangguhan sistem kendali nirkabel multi-robot tanpa interferensi sinyal di arena.',
    ],
    achievement: '🥉 JUARA 3 WILAYAH & 🏅 FINALIS TINGKAT NASIONAL KRTMI 2023',
    isChampion: false,
    pdfFile: 'Panduan_KRI_2023.pdf',
    pdfSize: '6.06 MB',
    pdfTitle: 'Buku Pedoman Lengkap KRI & KRTMI 2023 (Puspresnas)',
  },
  {
    year: '2022',
    badgeYear: '2022',
    title: 'KRTMI 2022 — Robot Penanganan & Pemilahan Limbah Medis',
    tagline: 'Otomasi Evakuasi Limbah Klinis Berbahaya di Rumah Sakit',
    theme: 'Autonomous Handling of Hazardous Hospital Waste',
    location: 'Institut Teknologi Sepuluh Nopember (ITS) Surabaya',
    storySummary: 'KRTMI 2022 mengangkat tema keselamatan medis rumah sakit, di mana robot ditugaskan menggantikan peran tenaga medis dalam mengevakuasi limbah klinis infeksius. Robot membaca kode bahaya pada kantong limbah secara otonom lalu membawanya menuju ruang insinerator steril.',
    arenaSpecs: {
      dimensions: '500 cm x 400 cm (Simulasi Bangsal Rumah Sakit)',
      surface: 'Lantai karpet abu-abu dengan garis batas ruang isolasi',
      zones: 'Hospital Corridor, Waste Storage Depots (Kuning B3 / Merah Infeksius), Incinerator Dock',
    },
    missionRules: [
      'Memindai barcode/QR code pada kantong limbah untuk menentukan kelas bahaya.',
      'Mengambil kantong limbah menggunakan capit tanpa merusak kemasan.',
      'Melakukan docking otomatis ke pintu insinerator virtual untuk proses pemusnahan.',
    ],
    robotSpecs: {
      dimensions: 'Maksimal 50 cm x 50 cm x 50 cm',
      weight: 'Maksimal 15 kg',
      power: 'LiPo 3S 11.1V 4200mAh',
      controller: 'STM32F4 ARM Cortex-M4 + Hardware Barcode Scanner Module',
      mechanism: 'Differential 4WD All-Terrain Wheels + High-Torque Servo Gripper',
    },
    scoringSystem: [
      'Identifikasi Barcode Benar: 40 Poin',
      'Pengantaran ke Insinerator Sesuai Jenis Limbah: 100 Poin',
      'Waktu tempuh tercepat menjadi kriteria penentu tie-breaker',
    ],
    teamRoleAndFunFacts: [
      '🏥 Menunjukkan desain struktur sasis yang kokoh dalam menopang beban limbah berulang kali.',
      '🏅 Menembus babak seleksi dan berlaga di ajang Tingkat Nasional KRTMI 2022 di ITS Surabaya.',
    ],
    achievement: '🏅 TAHAP NASIONAL KRTMI 2022 (ITS SURABAYA)',
    isChampion: false,
    pdfFile: 'Panduan_KRI_2022.pdf',
    pdfSize: '4.41 MB',
    pdfTitle: 'Buku Panduan Kontes Robot Indonesia (KRI) 2022',
  },
  {
    year: '2021',
    badgeYear: '2021',
    title: 'KRTMI 2021 — Robot Pelayanan Pasien COVID-19 Rumah Sakit',
    tagline: 'Pelayanan Logistik Medis Tanpa Kontak di Era Pandemi',
    theme: 'Contactless Medical Aid & Hospital Logistical Automation',
    location: 'Universitas Gadjah Mada (UGM) & Penyelenggaraan Daring Nasional',
    storySummary: 'Saat pandemi COVID-19 masih membatasi kontak langsung, KRTMI 2021 menantang mahasiswa membuat robot perawat mandiri. Robot bergerak menyusuri lorong kamar isolasi tiruan, mengantarkan obat dan logistik makanan steril tepat ke depan pintu kamar pasien tanpa bantuan manusia.',
    arenaSpecs: {
      dimensions: '500 cm x 350 cm (Arena Kamar Pasien Modular)',
      surface: 'Lantai putih dengan garis pandu optik kontras',
      zones: 'Nurse Station Base, Isolation Ward Corridor, Patient Rooms (Kamar 1–6)',
    },
    missionRules: [
      'Robot menerima instruksi nomor kamar pasien dari pos perawat.',
      'Navigasi otonom melintasi lorong dan berhenti presisi di depan pintu kamar sasaran.',
      'Membuka kotak obat steril (Dropping Box) secara otomatis agar dapat diambil pasien.',
    ],
    robotSpecs: {
      dimensions: 'Maksimal 50 cm x 50 cm x 70 cm (Tower Form Factor)',
      weight: 'Maksimal 12 kg',
      power: 'Baterai Kering Gel 12V 7Ah / LiPo 3S',
      controller: 'Arduino Mega 2560 + ESP8266 Wi-Fi Link + Optical Sensor Array',
      mechanism: 'Automatic Dropping Box Mechanism + Ultrasonic Anti-Collision Guard',
    },
    scoringSystem: [
      'Keberhasilan Navigasi ke Kamar Pasien yang Tepat: 60 Poin per kamar',
      'Penurunan Boks Obat Sempurna Tanpa Kontak: +40 Poin Bonus',
      'Penalti: -15 Poin jika menabrak dinding koridor',
    ],
    teamRoleAndFunFacts: [
      '😷 Tantangan luar biasa di mana seluruh tim mematuhi protokol kesehatan ketat di lab kampus UNY.',
      '🏅 Sukses menorehkan prestasi sebagai Finalis Daring Tingkat Nasional KRTMI 2021.',
    ],
    achievement: '🏅 FINALIS DARING NASIONAL KRTMI 2021',
    isChampion: false,
    pdfFile: 'Panduan_KRI_2021.pdf',
    pdfSize: '18.41 MB',
    pdfTitle: 'Pedoman Kontes Robot Indonesia (KRI) 2021 (UGM & Kemendikbud)',
  },
  {
    year: '2020',
    badgeYear: '2020',
    title: 'KRTMI 2020 — Robot Penanganan COVID-19 & Disinfeksi',
    tagline: 'Tanggap Darurat Pandemi: Robot Sterilisasi Radiasi UV-C & Logistik',
    theme: 'Autonomous UV-C Disinfection & Smart Logistics',
    location: 'Institut Teknologi Bandung (ITB) & Daring Nasional',
    storySummary: 'Tahun pertama merebaknya pandemi global, Puspresnas merilis tema robot disinfeksi darurat. Robot Abhinaya dirancang untuk menyemprotkan cairan disinfektan aerosol dan memancarkan sinar UV-C berintensitas tinggi pada zona-zona berisiko kontaminasi kuman/virus.',
    arenaSpecs: {
      dimensions: '450 cm x 300 cm',
      surface: 'Lantai semen halus dengan garis batas zona isolasi',
      zones: 'Sterilization Chamber, Disinfection Grid, Safe Holding Area',
    },
    missionRules: [
      'Menyinari titik sasaran dengan radiasi lampu UV-C selama durasi minimal 5 detik.',
      'Menyemprotkan disinfektan aerosol secara presisi di sepanjang rute steril.',
      'Memiliki sistem fail-safe otomatis jika mendeteksi anomali di arena.',
    ],
    robotSpecs: {
      dimensions: 'Maksimal 45 cm x 45 cm x 60 cm',
      weight: 'Maksimal 10 kg',
      power: 'LiPo 3S 11.1V + Inverter Tegangan Tinggi untuk Tabung UV-C',
      controller: 'Microcontroller ATmega328P / ARM Cortex-M3 + PIR Motion Sensor',
      mechanism: 'Pneumatic Atomizer Spray Pump + 360-Degree Shielded UV-C Light Tower',
    },
    scoringSystem: [
      'Durasi Sterilisasi Titik Target Memenuhi Syarat: 50 Poin per titik',
      'Penyemprotan Merata Tanpa Tumpahan Cairan: +30 Poin',
      'Kecepatan Total Misi menjadi faktor penilaian utama',
    ],
    teamRoleAndFunFacts: [
      '🚀 Tim Abhinaya merespons perubahan regulasi mendadak secara cepat dan solid.',
      '🏅 Berhasil lolos sebagai Finalis Tingkat Nasional KRTMI 2020.',
    ],
    achievement: '🏅 FINALIS TINGKAT NASIONAL KRTMI 2020',
    isChampion: false,
    pdfFile: 'Panduan_KRI_2020.pdf',
    pdfSize: '5.08 MB',
    pdfTitle: 'Petunjuk Pelaksanaan KRI & KRTMI 2020 (Puspresnas & ITB)',
  },
  {
    year: '2019',
    badgeYear: '2019',
    title: 'KRTMI 2019 — Robot Pertanian Cerdas & Panen Padi',
    tagline: 'Kelahiran Divisi Tematik: Otomasi Panen Padi & Pertanian Modern',
    theme: 'Kelahiran Divisi Tematik: Otomasi Panen Padi & Pertanian Modern',
    location: 'Universitas Dian Nuswantoro (UDINUS) Semarang',
    storySummary: 'Tahun 2019 adalah tonggak sejarah kelahiran divisi KRTMI di ajang resmi KRI. Temanya mengangkat mekanisasi pertanian padi nusantara: robot harus bergerak melintasi sawah berundak (terasering), memotong batang padi tiruan dengan bilah pemotong putar, lalu mengumpulkan gabah ke lumbung panen.',
    arenaSpecs: {
      dimensions: '500 cm x 300 cm (Simulasi Sawah Bertingkat / Terasering)',
      surface: 'Kontur tanah sintetis bertingkat dengan rintangan pematang sawah',
      zones: 'Start Pad, Sawah Terasering 1 & 2, Lumbung Padi Terpusat',
    },
    missionRules: [
      'Robot melintasi pematang sawah tanpa terbalik atau tersangkut.',
      'Memotong batang replika padi dengan pisau mekanik tanpa merusak bibit.',
      'Mengantarkan seluruh hasil panen ke lumbung penyimpanan gabah.',
    ],
    robotSpecs: {
      dimensions: 'Maksimal 50 cm x 50 cm x 50 cm',
      weight: 'Maksimal 12 kg',
      power: 'Baterai Kering Sealed Lead Acid (SLA) 12V 4.5Ah',
      controller: 'Microcontroller ATmega2560 + High-Current MOSFET Driver',
      mechanism: 'High-RPM Rotary Crop Cutter + Conveyor Storage Hopper',
    },
    scoringSystem: [
      'Padi Terpotong Rapi: 20 Poin per ikat',
      'Padi Masuk Lumbung Sempurna: 50 Poin',
      'Bonus Selesai Penuh (Panen Raya): +100 Poin Tambahan',
    ],
    teamRoleAndFunFacts: [
      '🌱 Menjadi fondasi awal tim riset divisi Tematik Abhinaya di Universitas Negeri Yogyakarta.',
      '💡 Menginspirasi generasi mahasiswa teknik elektro & mekatronika UNY untuk konsisten berprestasi di divisi KRTMI.',
    ],
    achievement: '🌱 PIONIR RISET DIVISI TEMATIK KRTMI UNY 2019',
    isChampion: false,
    pdfFile: 'Panduan_KRTMI_2019.pdf',
    pdfSize: '0.24 MB',
    pdfTitle: 'Panduan Resmi Kontes Robot Tematik Indonesia (KRTMI) 2019',
  },
];

export const TEAM_DIVISIONS = [
  {
    id: 'mekanik',
    name: 'Divisi Mekanik (CAD & Prototyping)',
    icon: 'Wrench',
    desc: 'Merancang sasis 3D di Autodesk Inventor/Fusion 360, menghitung distribusi beban, memilih gear & motor penggerak, serta merakit sistem capit/gripper dengan 3D printing & mesin CNC.',
    skills: ['3D CAD Modeling', 'Mecanum/Omni Chassis Assembly', '3D Printing & Las Alumunium', 'Gripper & Kinematics Design'],
  },
  {
    id: 'elektrik',
    name: 'Divisi Elektrik & Hardware',
    icon: 'Zap',
    desc: 'Mendesain layout PCB sirkuit di KiCad/Eagle, merangkai driver motor arus tinggi (TB6612/BTS7960), sistem manajemen daya baterai LiFePO4/LiPo, fusi sensor IMU, dan jalur pengkabelan rapi.',
    skills: ['PCB Design & Soldering', 'Motor Drivers & Power Management', 'Sensor Integration (IMU, ToF, Optical)', 'Microcontroller Wiring'],
  },
  {
    id: 'programming',
    name: 'Divisi Pemrograman & AI',
    icon: 'Code',
    desc: 'Menulis firmware kontrol otonom di ESP32 & STM32, mengatur algoritma navigasi cerdas, tuning kecepatan motor dengan Closed-Loop PID, dan melatih model Visi Komputer (YOLO) untuk deteksi objek.',
    skills: ['C/C++ Embedded Firmware', 'Closed-Loop PID Tuning', 'Computer Vision (OpenCV/YOLO)', 'RTOS & Wireless Telemetry'],
  },
  {
    id: 'manajerial',
    name: 'Divisi Manajerial & Media',
    icon: 'Users',
    desc: 'Mengelola administrasi tim, jadwal riset workshop, pembuatan video dokumentasi lomba, branding media sosial Instagram & TikTok, serta penyusunan berkas proposal kejuaraan.',
    skills: ['Project Management', 'Video & Photo Content Creation', 'Social Media Branding (@abhinaya.uny)', 'Sponsorship & Logistics'],
  },
];
