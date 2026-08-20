export interface KrtmiStory {
  year: string;
  badgeYear: string;
  title: string;
  tagline?: string;
  theme: string;
  location: string;
  storySummary: string;
  howItWorks: string[];
  teamRoleAndFunFacts: string[];
  achievement: string;
  isChampion?: boolean;
}

export const KRTMI_STORIES: KrtmiStory[] = [
  {
    year: '2024',
    badgeYear: '2024',
    title: 'KRTMI 2024 — Robot Pemilah Sampah Cerdas & Keranjang Digital',
    tagline: 'Puncak Kejayaan Abhinaya: Raih Juara 1 Regional & Juara 2 Tingkat Nasional!',
    theme: 'Otomasi Pengelolaan Sampah Cerdas Berbasis Visi Komputer & Mobile Robot',
    location: 'Universitas Muhammadiyah Surakarta (UMS) & BPTI Kemendikbudristek',
    storySummary: 'Di edisi 2024 ini, robot Abhinaya ditantang untuk mengenali dan memungut berbagai jenis sampah (botol plastik, kaleng, kotak) yang tersebar di arena secara otomatis. Robot menggunakan kamera cerdas berbasis AI untuk membedakan jenis sampah dalam hitungan milidetik, lalu mengantarkannya ke keranjang digital yang bergerak lincah tanpa boleh bertabrakan.',
    howItWorks: [
      '🤖 Robot Pengambil (Picker): Bergerak ke segala arah menggunakan 4 roda mecanum khusus, mendeteksi sampah dengan kamera AI, lalu menjepitnya dengan capit bermotor.',
      '🗑️ Keranjang Cerdas (Smart Basket): Menerima sinyal dari robot utama dan bersiap di titik penampungan untuk menerima sampah.',
      '⚡ Misi Super Cepat: Seluruh proses pengambilan dan pelemparan sampah diselesaikan dalam batas waktu pertandingan yang sangat ketat.',
    ],
    teamRoleAndFunFacts: [
      '🏆 Tim Abhinaya sukses membungkam persaingan sengit dari puluhan universitas top se-Indonesia.',
      '🎯 Keberhasilan ini mengantarkan Abhinaya meraih JUARA 1 REGIONAL I dan JUARA 2 NASIONAL KRI 2024!',
    ],
    achievement: '🥇 JUARA 1 REGIONAL I WILAYAH & 🥈 JUARA 2 TINGKAT NASIONAL KRTMI 2024',
    isChampion: true,
  },
  {
    year: '2023',
    badgeYear: '2023',
    title: 'KRTMI 2023 — Robot Pemilah Sampah & Keranjang Cerdas Tematik',
    tagline: 'Duet Robot Kolaboratif di Panggung Nasional Semarang',
    theme: 'Smart Waste Sorting & Collaborative Mobile Robotics',
    location: 'Universitas Semarang (USM) & Puspresnas Kemendikbudristek',
    storySummary: 'KRTMI 2023 membawa konsep kolaborasi 2 robot sekaligus di arena: satu robot bertugas menyisir arena untuk mengambil sampah tiruan, dan robot kedua bertindak sebagai keranjang penerima bergerak yang harus selalu siap menangkap sasaran.',
    howItWorks: [
      '🧭 Navigasi Lincah: Robot memanfaatkan sistem roda omnidirectional untuk meluncur 360 derajat di arena tanpa harus memutar badan.',
      '📡 Komunikasi Nirkabel: Kedua robot saling bertukar data koordinat posisi via sinyal radio nirkabel agar tidak saling menabrak.',
      '🎯 Akurasi Pelemparan: Mekanisme peluncur sampah dirancang presisi agar sampah masuk tepat ke keranjang target.',
    ],
    teamRoleAndFunFacts: [
      '🥉 Berhasil membawa pulang piala JUARA 3 WILAYAH dan melaju mulus sebagai FINALIS TINGKAT NASIONAL.',
      '💡 Mengasah kekompakan tim divisi mekanik, elektrik, dan programmer saat setting arena malam hari sebelum tanding.',
    ],
    achievement: '🥉 JUARA 3 WILAYAH & 🏅 FINALIS TINGKAT NASIONAL KRTMI 2023',
    isChampion: false,
  },
  {
    year: '2022',
    badgeYear: '2022',
    title: 'KRTMI 2022 — Robot Penanganan & Pemilahan Limbah Medis',
    tagline: 'Otomasi Evakuasi Limbah Klinis Rumah Sakit',
    theme: 'Autonomous Handling of Hazardous Hospital Waste',
    location: 'Institut Teknologi Sepuluh Nopember (ITS) Surabaya',
    storySummary: 'Mengangkat tema lingkungan rumah sakit, robot ditugaskan menggantikan peran tenaga manusia dalam menangani limbah medis berbahaya. Robot harus membaca label bahaya / barcode kantong limbah dan membawanya menuju ruang insinerator steril.',
    howItWorks: [
      '📷 Barcode Scanner: Robot memindai kode identifikasi kantong limbah medis secara dinamis saat berjalan.',
      '🦾 Lengan Angkat Kuat: Menggunakan mekanisme pengangkat berbahan kokoh untuk memindahkan wadah limbah dengan aman.',
      '🚪 Docking Insinerator: Menempatkan limbah ke pintu pembakaran virtual secara otomatis.',
    ],
    teamRoleAndFunFacts: [
      '🏥 Menguji keandalan sistem robot dalam simulasi situasi kritis penanganan limbah klinis.',
      '🏅 Tim Abhinaya membuktikan ketangguhan desain sasis dan sistem elektronika di tingkat nasional.',
    ],
    achievement: '🏅 TAHAP NASIONAL KRTMI 2022 (ITS SURABAYA)',
    isChampion: false,
  },
  {
    year: '2021',
    badgeYear: '2021',
    title: 'KRTMI 2021 — Robot Pelayanan Pasien COVID-19 Rumah Sakit',
    tagline: 'Pelayanan Medis Tanpa Kontak di Era Pandemi',
    theme: 'Contactless Medical Aid & Hospital Logistical Automation',
    location: 'Universitas Gadjah Mada (UGM) & Penyelenggaraan Daring Nasional',
    storySummary: 'Saat pandemi masih membatasi kontak langsung, KRTMI 2021 menantang mahasiswa menciptakan robot pelayan ruang isolasi. Robot bergerak menyusuri lorong rumah sakit tiruan untuk mengantar obat dan makanan ke depan pintu pasien secara otonom.',
    howItWorks: [
      '🚪 Kamar Pasien Virtual: Robot mengenali nomor pintu kamar pasien dan berhenti tepat di depan kamar tujuan.',
      '📦 Dropping Box Otomatis: Kotak obat terbuka otomatis dan menurunkan obat tanpa perlu disentuh manusia.',
      '📹 Kamera Monitoring: Mengirimkan feed video langsung ke pos perawat untuk memantau kondisi lorong.',
    ],
    teamRoleAndFunFacts: [
      '😷 Tantangan luar biasa di masa pandemi, di mana seluruh tim bekerja ekstra keras mematuhi protokol kesehatan di lab.',
      '🏅 Berhasil menembus babak Finalis Nasional KRTMI 2021.',
    ],
    achievement: '🏅 FINALIS DARING NASIONAL KRTMI 2021',
    isChampion: false,
  },
  {
    year: '2020',
    badgeYear: '2020',
    title: 'KRTMI 2020 — Robot Penanganan COVID-19 & Disinfeksi',
    tagline: 'Tanggap Darurat Pandemi: Robot Sterilisasi UV-C & Logistik',
    theme: 'Autonomous UV-C Disinfection & Smart Logistics',
    location: 'Institut Teknologi Bandung (ITB) & Daring Nasional',
    storySummary: 'Tahun pertama pandemi COVID-19, Puspresnas langsung merespons dengan tema robot disinfeksi darurat. Robot bertugas menyemprotkan cairan disinfektan dan menyinari ruang dengan lampu UV-C guna membunuh kuman dan virus di zona merah.',
    howItWorks: [
      '💡 Sterilisasi UV-C: Menyinari area tertentu dengan durasi terukur untuk memastikan sterilisasi maksimal.',
      '💨 Nozzle Penyemprot: Mengaktifkan pompa semprot otomatis saat melewati lintasan yang telah dipetakan.',
      '🛡️ Sensor Keamanan: Otomatis mematikan radiasi UV-C jika mendeteksi ada pergerakan manusia di dekatnya.',
    ],
    teamRoleAndFunFacts: [
      '🚀 Adaptasi tercepat tim Abhinaya dalam merespons aturan lomba baru yang diumumkan secara mendadak akibat pandemi.',
      '🏅 Sukses menorehkan prestasi sebagai Finalis Nasional KRTMI 2020.',
    ],
    achievement: '🏅 FINALIS TINGKAT NASIONAL KRTMI 2020',
    isChampion: false,
  },
  {
    year: '2019',
    badgeYear: '2019',
    title: 'KRTMI 2019 — Robot Pertanian Cerdas & Panen Padi',
    tagline: 'Kelahiran Divisi Tematik: Otomasi Panen Padi & Pertanian Modern',
    theme: 'Kelahiran Divisi Tematik: Otomasi Panen Padi & Pertanian Modern',
    location: 'Universitas Dian Nuswantoro (UDINUS) Semarang',
    storySummary: '2019 adalah tahun perdana diresmikannya divisi KRTMI (Kontes Robot Tematik Indonesia) di Indonesia. Temanya mengangkat mekanisasi panen padi di mana robot harus memotong batang padi tiruan di sawah bertingkat (terasering) dan membawanya ke lumbung padi.',
    howItWorks: [
      '🌾 Pemotong Mekanik: Bilah pisau putar mikro berkecepatan tinggi untuk memotong replika batang padi.',
      '🚜 Roda Bergerigi Sawah: Menembus kontur tanah arena yang berundak dan tidak rata.',
      '📦 Lumbung Penampung: Mengumpulkan gabah hasil panen ke zona penyimpanan dengan rapi.',
    ],
    teamRoleAndFunFacts: [
      '🌱 Tonggak sejarah awal berdirinya riset divisi Tematik Abhinaya di lingkungan Universitas Negeri Yogyakarta.',
      '💡 Menjadi inspirasi bagi mahasiswa baru mekatronika dan elektro untuk menekuni dunia robotika aplikatif.',
    ],
    achievement: '🌱 PIONIR RISET DIVISI TEMATIK KRTMI UNY 2019',
    isChampion: false,
  },
  {
    year: '2026',
    badgeYear: '2026',
    title: 'TECHNOCORNER 2026 — Transporter Robot Competition',
    tagline: 'Adu Kecepatan Sasis Mecanum & Kekuatan Capit di FT UGM',
    theme: 'High-Speed Precision Payload Transfer & Obstacle Crossing',
    location: 'Departemen Teknik Elektro & Teknologi Informasi FT UGM',
    storySummary: 'Di luar ajang resmi KRI Puspresnas, tim Abhinaya melebarkan sayap inovasi ke kompetisi Transporter Robot tingkat nasional Technocorner UGM. Robot bertugas memindahkan balok-balok payload melewati tanjakan, jembatan sempit, dan rintangan arena dalam waktu tercepat.',
    howItWorks: [
      '⚡ Sasis Mecanum Cepat: Manuver geser samping dan akselerasi kilat untuk memangkas waktu putaran arena.',
      '🦾 Capit Lead-Screw Kuat: Mekanisme penjepit balok dengan daya cengkeram tinggi agar payload tidak jatuh saat melaju kencang.',
      '🎮 Kontrol Nirkabel Responsif: Pengendalian multi-kanal ultra responsif tanpa jeda.',
    ],
    teamRoleAndFunFacts: [
      '🔥 Menjadi ajang pembuktian kecepatan dan ketangguhan mekanik sasis rancangan tim Abhinaya.',
      '🤖 Memperluas jejaring persahabatan riset robotika antar-kampus di Indonesia.',
    ],
    achievement: '🤖 PESERTA TINGKAT NASIONAL TECHNOCORNER 2026 FT UGM',
    isChampion: false,
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
