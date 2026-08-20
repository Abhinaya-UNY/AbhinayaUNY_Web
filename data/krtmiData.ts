export interface ScoringRule {
  item: string;
  points: string;
  type: 'bonus' | 'penalty' | 'instant_win';
  description: string;
}

export interface KrtmiEdition {
  year: string;
  title: string;
  theme: string;
  slogan: string;
  division: string;
  hostVenue: string;
  date: string;
  organizer: string;
  arenaDimensions: {
    size: string;
    zones: { name: string; dimension: string; description: string }[];
  };
  robotConstraints: {
    startDimension: string;
    dynamicDimension: string;
    weightLimit: string;
    powerSupply: string;
    controlProtocol: string;
  };
  missionFlow: string[];
  instantWinCondition: {
    name: string;
    condition: string;
    reward: string;
  };
  scoringRules: ScoringRule[];
  technicalChallenges: string[];
  robotArchitecture: {
    drivetrain: string;
    controller: string;
    sensors: string[];
    actuators: string;
    algorithm: string;
  };
  achievements: string;
  officialCitation: string;
  citationUrl?: string;
  badgeColor: string;
  accentColor: string;
}

export const KRTMI_EDITIONS: KrtmiEdition[] = [
  {
    year: '2024',
    title: 'KRTMI 2024 — Pemilah Sampah Otonom Digital (Dual Collaborative Robot)',
    theme: 'Otomasi Pengelolaan Sampah Cerdas Berbasis Visi Komputer Edge AI & Holonomic 4WD Mecanum',
    slogan: 'Kecerdasan Buatan & Kolaborasi Otonom untuk Keberlanjutan Lingkungan',
    division: 'Kontes Robot Tematik Indonesia (KRTMI)',
    hostVenue: 'Edutorium Universitas Muhammadiyah Surakarta (UMS), Jawa Tengah',
    date: '1 – 6 Juli 2024',
    organizer: 'Balai Pengembangan Talenta Indonesia (BPTI) Puspresnas Kemendikbudristek & UMS',
    arenaDimensions: {
      size: '6.0 m × 6.0 m (36 m²)',
      zones: [
        { name: 'Zona Start (Tim Merah / Tim Biru)', dimension: '100 cm × 100 cm', description: 'Area awal peletakan Robot Pengumpan dan Robot Pemilah.' },
        { name: 'Zona Umum (Tengah)', dimension: '200 cm × 200 cm', description: 'Area netral perebutan 5 Kotak Sampah tematik.' },
        { name: 'Konveyor Getar (Vibrating Feeder)', dimension: '150 cm × 40 cm', description: 'Konveyor pembawa sampah menuju jangkauan kamera visi dan lengan pemilah.' },
        { name: 'Kotak Pemilahan (Sorting Bins)', dimension: '40 cm × 40 cm (4 kompartemen)', description: 'Wadah target pemilahan kategori botol plastik, kaleng aluminium, kertas, dan organik.' },
        { name: 'Kotak Pembuangan (Disposal Overflow)', dimension: '50 cm × 50 cm', description: 'Wadah pembuangan sampah non-target / residu.' },
      ],
    },
    robotConstraints: {
      startDimension: 'Maks 600 mm × 600 mm × 600 mm',
      dynamicDimension: 'Maks 800 mm × 800 mm × 1000 mm saat ekspansi mekanisme lengan',
      weightLimit: 'Maks 25.0 kg total per robot',
      powerSupply: 'Baterai LiPo / LiFePO4 maks 24.0 Volt nominal',
      controlProtocol: 'Dual Wireless: 2.4GHz Telemetri Nirkabel + ESP-NOW Inter-Robot Mesh',
    },
    missionFlow: [
      '1. Robot Pengumpan (Feeder) bergerak cepat menuju Zona Umum untuk mengambil Kotak Sampah.',
      '2. Membawa kotak ke dudukan konveyor getar dan menumpahkan muatan sampah secara merata.',
      '3. Konveyor getar mendistribusikan objek sampah ke bawah jangkauan kamera Edge AI Sorter Robot.',
      '4. Model YOLOv8/11 pada Sorter Robot mengklasifikasikan kelas sampah dan menghitung titik koordinat spatial.',
      '5. Robot Pemilah menggerakkan 4WD Mecanum dan lengan gripper presisi untuk memasukkan sampah ke kategori bin yang tepat.',
    ],
    instantWinCondition: {
      name: 'BERSIH',
      condition: 'Berhasil memilah seluruh sampah dari 5 Kotak Sampah dengan 100% akurasi kategori tanpa ada sampah jatuh ke lantai atau masuk ke Kotak Pembuangan.',
      reward: 'Kemenangan Mutlak Seketika (Instant Victory) tanpa perhitungan poin sisa.',
    },
    scoringRules: [
      { item: 'Sampah Masuk Sesuai Kategori Bin', points: '+3 Poin / buah', type: 'bonus', description: 'Berhasil diidentifikasi AI dan ditempatkan di kompartemen yang sesuai.' },
      { item: 'Sampah Masuk Kategori Salah', points: '0 Poin', type: 'bonus', description: 'Sampah berhasil diambil namun dimasukkan ke kategori bin yang keliru.' },
      { item: 'Sampah Jatuh ke Lantai Arena', points: '-1 Poin / buah', type: 'penalty', description: 'Objek sampah tercecer di luar konveyor atau kotak penerima.' },
      { item: 'Sampah Masuk Kotak Pembuangan', points: '-1 Poin / buah', type: 'penalty', description: 'Sampah target terbuang ke kompartemen residu.' },
      { item: 'Pelanggaran Idle Zona Umum > 10s', points: '-1 Poin / 10 detik', type: 'penalty', description: 'Robot Pengumpan berhenti di zona netral menghalangi lawan.' },
      { item: 'Kemenangan Mutlak BERSIH', points: 'INSTANT WIN (100 Pts)', type: 'instant_win', description: '5 Kotak Sampah terpilah sempurna tanpa error dalam batas waktu 4 menit.' },
    ],
    technicalChallenges: [
      'Deteksi & Klasifikasi Multi-Objek Real-time dengan YOLOv8/YOLOv11 TensorRT pada platform Edge AI Mini-PC (30+ FPS).',
      'Sistem Gerak Holonomic 4-Wheel Mecanum Drivetrain dengan kompensasi gyroskopik IMU 6-DOF (MPU6050/6500) 100 Hz.',
      'Transformasi Koordinat Invers Perspektif (IPM) dari bidang kamera ke sistem koordinat planar sasis robot.',
      'Sinkronisasi komunikasi telemetri nirkabel antar-robot menggunakan ESP-NOW frekuensi 2.4GHz tanpa latency.',
    ],
    robotArchitecture: {
      drivetrain: '4-Wheel Independent CNC Mecanum Drivetrain (Holonomic Omnidirectional Motion)',
      controller: 'Dual Core ESP32-S3 240MHz (Copilot) + STM32F407 High-Speed Real-Time Motion Controller',
      sensors: ['Kinect / CSI Depth Camera', 'AS5600 12-bit Magnetic Encoders', 'MPU6500 6-DOF IMU', 'VL53L0X Laser ToF'],
      actuators: 'Coreless High-Torque DC Planetary Geared Motors + Metal Servos dengan Driver TB6612FNG & BTS7960',
      algorithm: 'Inverse Kinematics Matrix + Discrete PID Velocity Loop (100Hz) + Real-time YOLOv8 Inference',
    },
    achievements: '🥇 JUARA 1 REGIONAL I WILAYAH & 🥈 JUARA 2 NASIONAL KRTMI 2024',
    officialCitation: 'Tim Robotika Abhinaya UNY sukses mengukir prestasi gemilang dengan meraih gelar Juara 1 KRTMI Wilayah I dan Juara 2 Nasional pada Kontes Robot Indonesia (KRI) 2024 di Edutorium Universitas Muhammadiyah Surakarta.',
    citationUrl: 'https://www.uny.ac.id/index.php/id/berita/abhinaya-meraih-juara-2-nasional-di-kompetisi-kri-divisi-krtmi-2024',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    accentColor: 'text-emerald-400',
  },
  {
    year: '2023',
    title: 'KRTMI 2023 — Cyber-Physical Planetary Gear Digital Twin (Roda Gigi Planet)',
    theme: 'Robo Game – Digital Twin: Penguasaan Teknologi, Kemakmuran Bangsa',
    slogan: 'Penguasaan Teknologi, Kemakmuran Bangsa',
    division: 'Kontes Robot Tematik Indonesia (KRTMI)',
    hostVenue: 'Universitas Semarang (USM), Semarang, Jawa Tengah',
    date: '21 – 26 Juni 2023',
    organizer: 'BPTI Puspresnas Kemendikbudristek & Universitas Semarang (USM)',
    arenaDimensions: {
      size: '3.0 m × 4.0 m (12 m²)',
      zones: [
        { name: 'Lapangan Fisik (Green Screen)', dimension: '300 cm × 400 cm', description: 'Karpet hijau polos dengan kamera pelacak visual di langit-langit arena.' },
        { name: 'Rak Koin (23 Slot)', dimension: 'Panjang 200 cm', description: 'Rak penempatan koin segidelapan (octagon) styrofoam.' },
        { name: 'Lapangan Digital (Cyber Grid)', dimension: 'Simulasi Konsentris 250 cm', description: 'Proyeksi digital transmisi roda gigi matahari (sun gear) dan roda gigi planet (ring gear).' },
      ],
    },
    robotConstraints: {
      startDimension: 'Lebar maks 20 cm, Panjang maks 25 cm, Tinggi maks 20 cm',
      dynamicDimension: 'Panjang lengan gripper maks 20 cm',
      weightLimit: 'Maks 15.0 kg',
      powerSupply: 'Baterai LiPo maks 14.8 Volt (4S)',
      controlProtocol: 'Kamera Pemantau Langit-langit (Overhead Tracking) + Wireless Control',
    },
    missionFlow: [
      '1. Robot mengambil koin segi delapan dari rak slot koin.',
      '2. Melakukan manuver lincah dengan batasan kecepatan maksimal 40 cm/s.',
      '3. Menempatkan koin di titik koordinat digital twin untuk mengunci formasi roda gigi.',
      '4. Mengunci 4 posisi oktagon simetris luar untuk memicu putaran transmisi roda gigi planet.',
    ],
    instantWinCondition: {
      name: 'DONE',
      condition: 'Berhasil menempatkan 4 koin segi delapan membentuk simetri sempurna pada roda gigi planet luar dalam representasi digital twin.',
      reward: 'Kemenangan Mutlak Seketika (Instant Victory).',
    },
    scoringRules: [
      { item: 'Koin Berhasil di Baris 1', points: '+3 Poin / koin', type: 'bonus', description: 'Penempatan sah pada slot baris terluar.' },
      { item: 'Koin Berhasil di Baris 2', points: '+4 Poin / koin', type: 'bonus', description: 'Penempatan sah pada slot baris menengah.' },
      { item: 'Koin Berhasil di Baris 3', points: '+5 Poin / koin', type: 'bonus', description: 'Penempatan sah pada slot baris dalam.' },
      { item: 'Koin Berhasil di Baris 4 (Pusat)', points: '+6 Poin / koin', type: 'bonus', description: 'Penempatan sah pada slot sumbu poros pusat.' },
      { item: 'Pelanggaran Kecepatan > 40 cm/s', points: 'Penalti 2 Detik di Start', type: 'penalty', description: 'Kecepatan melebihi 40 cm/s terakumulasi selama 2 detik.' },
      { item: 'Kemenangan Mutlak DONE', points: 'INSTANT WIN', type: 'instant_win', description: '4 koin simetri transmisi roda gigi planet terkunci sempurna.' },
    ],
    technicalChallenges: [
      'Navigasi otonom presisi tinggi tanpa garis panduan fisik (pure green-screen visual tracking).',
      'Kinematika 3-Wheel Omni Kiwi Drive (120 derajat) untuk manuver rotasi dan translasi independen.',
      'Kalibrasi penundaan (latency compensation) antara arena fisik dan representasi grafis digital twin.',
    ],
    robotArchitecture: {
      drivetrain: '3-Wheel Holonomic Kiwi Omni-directional Drive (120° Layout)',
      controller: 'STM32F401 BlackPill + Dual ESP32 Sub-controller',
      sensors: ['Rotary Optical Encoders', 'Top-Down Visual Tracking Marker', 'TCS34725 RGB Color Sensor'],
      actuators: 'PG45 Planetary DC Motors dengan Encoder 500 CPR + High-Torque Gripper Servos',
      algorithm: 'Kiwi Kinematics Inverse Matrix + Trapezoidal Velocity Profile + PID Position Control',
    },
    achievements: '🥉 JUARA 3 WILAYAH & 🏅 FINALIS NASIONAL KRTMI 2023',
    officialCitation: 'Tim Robotika Abhinaya UNY berhasil menembus babak finalis nasional KRTMI 2023 di Universitas Semarang dengan keunggulan manuver omniwheel Kiwi drive.',
    citationUrl: 'https://uny.ac.id/index.php/id/berita',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    accentColor: 'text-amber-400',
  },
  {
    year: '2022',
    title: 'KRTMI 2022 — Cyber-Physical Digital Twin (Dam-daman & Zona Non-DAM)',
    theme: 'Cyber-Physical Digital Twin Game – Dam-daman Lanjutan & Penanganan Limbah Medis',
    slogan: 'Penguasaan Teknologi Digital Twin untuk Ketahanan Bangsa',
    division: 'Kontes Robot Tematik Indonesia (KRTMI)',
    hostVenue: 'Institut Teknologi Sepuluh Nopember (ITS), Surabaya (Luring Nasional) & Daring',
    date: '29 Juni – 3 Juli 2022',
    organizer: 'BPTI Puspresnas Kemendikbudristek & ITS Surabaya',
    arenaDimensions: {
      size: '3.0 m × 4.0 m Green Screen',
      zones: [
        { name: 'Lapangan Fisik', dimension: '300 cm × 400 cm', description: 'Karpet hijau dengan penutup kamuflase robot berwarna senada.' },
        { name: 'Arena Digital Konsentris', dimension: 'Diameter 90 cm, 170 cm, 250 cm', description: 'Peta lingkaran virtual dengan pembagian Zona DAM dan Zona Non-DAM.' },
        { name: 'Koin Persegi', dimension: '20 cm × 20 cm × 3 cm', description: '12 koin styrofoam persegi per tim.' },
      ],
    },
    robotConstraints: {
      startDimension: 'Lebar 20 cm, Panjang 25 cm, Tinggi 20 cm',
      dynamicDimension: 'Gripper 20 cm, dinding samping berlapis kain hijau senada karpet',
      weightLimit: 'Maks 15.0 kg',
      powerSupply: 'Baterai LiPo maks 14.8 Volt',
      controlProtocol: 'Overhead Computer Vision Marker Tracking + Wireless Control',
    },
    missionFlow: [
      '1. Robot mengambil koin persegi dari rak penyimpanan.',
      '2. Memindahkan koin ke posisi grid digital dengan menghindari penempatan pada Zona Non-DAM.',
      '3. Membentuk formasi 3 koin berjajar lurus secara horizontal, vertikal, atau diagonal di area sah.',
      '4. Mencegah tim lawan membentuk formasi DAM terlebih dahulu.',
    ],
    instantWinCondition: {
      name: 'DAM',
      condition: 'Menempatkan 3 koin berjajar lurus (horizontal, vertikal, atau diagonal) di luar Zona Non-DAM.',
      reward: 'Kemenangan Mutlak DAM Seketika.',
    },
    scoringRules: [
      { item: 'Penempatan Koin di Baris 1', points: '+3 Poin / koin', type: 'bonus', description: 'Koin sah di baris pertama.' },
      { item: 'Penempatan Koin di Baris 2 s.d 7', points: '+4 s.d +9 Poin', type: 'bonus', description: 'Poin bertingkat sesuai kedalaman baris matriks.' },
      { item: 'Koin Masuk Zona Non-DAM', points: 'Membatalkan DAM', type: 'penalty', description: 'Koin tidak dihitung untuk syarat kemenangan mutlak DAM.' },
      { item: 'Kemenangan Mutlak DAM', points: 'INSTANT WIN', type: 'instant_win', description: '3 koin berjajar di zona sah.' },
    ],
    technicalChallenges: [
      'Optimalisasi kamuflase bodi robot agar transparan sempurna dalam sistem chromakeying digital juri.',
      'Pembatasan kecepatan ketat (40 cm/s) dengan deteksi deviasi posisi real-time.',
      'Mekanisme capit koin presisi tinggi dengan lead-screw mikro.',
    ],
    robotArchitecture: {
      drivetrain: '4-Wheel Omni-directional Drive',
      controller: 'ESP32 Dual Core + STM32 ARM Cortex-M4',
      sensors: ['Rotary Encoders', 'Top Tracking Marker', 'Sharp GP2Y0A21YK Distance Sensor'],
      actuators: 'Coreless DC Planetary Motors + Micro Metal Geared Servo Grippers',
      algorithm: 'Coordinate Transformation Engine + PID Closed-Loop Motion Controller',
    },
    achievements: '🏅 TAHAP FINALIS NASIONAL KRTMI 2022',
    officialCitation: 'Abhinaya UNY lolos seleksi wilayah dan bertanding di putaran final nasional KRTMI 2022 di ITS Surabaya.',
    citationUrl: 'https://uny.ac.id',
    badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
    accentColor: 'text-blue-400',
  },
  {
    year: '2021',
    title: 'KRTMI 2021 — Robo Game Cyber-Physical Digital Twin (Dam-daman)',
    theme: 'Robo Game – Digital Twin: Penguasaan Teknologi, Kemakmuran Negara',
    slogan: 'Penguasaan Teknologi, Kemakmuran Negara',
    division: 'Kontes Robot Tematik Indonesia (KRTMI)',
    hostVenue: 'Universitas Gadjah Mada (UGM) / Daring Nasional Puspresnas Kemdikbudristek',
    date: '22 September – 1 Oktober 2021',
    organizer: 'Puspresnas Kemdikbudristek & Universitas Gadjah Mada (UGM)',
    arenaDimensions: {
      size: '3.0 m × 4.0 m Lapangan Hijau',
      zones: [
        { name: 'Lapangan Phisik (Green Screen)', dimension: '300 cm × 400 cm', description: 'Karpet hijau polos dengan kamera utama di titik tengah atas.' },
        { name: 'Koin Permainan (12 Merah, 12 Biru)', dimension: 'Diameter 15 cm, Tebal 3 cm', description: 'Koin silinder styrofoam ringan.' },
        { name: 'Lapangan Digital', dimension: 'Matriks Garis Virtual', description: 'Papan dam-daman virtual yang terhubung dengan visual tracking real-time.' },
      ],
    },
    robotConstraints: {
      startDimension: 'Lebar 20 cm, Panjang 25 cm, Tinggi 20 cm, Gripper 20 cm',
      dynamicDimension: 'Penutup samping wajib warna hijau karpet',
      weightLimit: 'Maks 15.0 kg',
      powerSupply: 'Baterai LiPo maks 14.8 Volt',
      controlProtocol: 'Dual Video Streaming WebRTC / Zoom + Wireless Joystick',
    },
    missionFlow: [
      '1. Robot memulai pertandingan dari Zona Awal.',
      '2. Mengambil koin warna tim dari rak dan membawanya melintasi arena.',
      '3. Menempatkan koin tepat di perpotongan garis digital tanpa menabrak koin lawan.',
      '4. Menyusun 3 koin sejajar untuk memicu kemenangan mutlak DAM dalam 3 menit.',
    ],
    instantWinCondition: {
      name: 'DAM',
      condition: 'Menempatkan 3 koin berjajar lurus horizontal, vertikal, atau diagonal di titik koordinat yang sah.',
      reward: 'Kemenangan Mutlak DAM (Pertandingan Berakhir Seketika).',
    },
    scoringRules: [
      { item: 'Koin di Baris Terdekat (Baris 1)', points: '+3 Poin / koin', type: 'bonus', description: 'Penempatan koin pada baris pertama.' },
      { item: 'Koin di Baris 2 hingga Baris 7', points: '+4, +5, +6, +7, +8, +9 Poin', type: 'bonus', description: 'Nilai meningkat semakin mendekati zona lawan.' },
      { item: 'Kecepatan > 40 cm/s', points: 'Diskualifikasi / Retry', type: 'penalty', description: 'Pelanggaran batas kecepatan gerak visual.' },
      { item: 'Kemenangan Mutlak DAM', points: 'INSTANT WIN', type: 'instant_win', description: '3 koin berjajar lurus seketika.' },
    ],
    technicalChallenges: [
      'Pengembangan sistem transmisi video ultra-low latency untuk kendali teleoperasi daring.',
      'Stabilisasi posisi robot pada koordinat perpotongan piksel digital twin.',
      'Pengendalian torsi capit styrofoam agar tidak merusak fisik koin.',
    ],
    robotArchitecture: {
      drivetrain: '4-Wheel Skid-Steer / Omni Mobile Base',
      controller: 'ESP32 + Raspberry Pi 4 Telemetry Gateway',
      sensors: ['Digital Encoders', 'Top-Down Visual Tracking Marker', 'Voltage/Current Monitor'],
      actuators: 'High-Torque DC Geared Motors + Micro Servos',
      algorithm: 'WebRTC Teleoperation + Trapezoidal Motion Profiling + Anti-Slip Control',
    },
    achievements: '🎖️ FINALIS NASIONAL DARING KRTMI 2021',
    officialCitation: 'Abhinaya UNY menjadi finalis nasional dalam kompetisi robotika daring berskala nasional yang diselenggarakan Puspresnas dan UGM.',
    citationUrl: 'https://uny.ac.id',
    badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
    accentColor: 'text-cyan-400',
  },
  {
    year: '2020',
    title: 'KRTMI 2020 — Disinfeksi & Penanganan COVID-19 / Pertanian Daring',
    theme: 'Adaptasi Teknologi Robotika Otonom dalam Penanganan Pandemi & Pertanian Daring',
    slogan: 'Inovasi Robotika Cerdas untuk Ketahanan Nasional di Masa Pandemi',
    division: 'Kontes Robot Tematik Indonesia (KRTMI)',
    hostVenue: 'Institut Teknologi Bandung (ITB) / Daring Nasional Puspresnas Kemdikbud',
    date: '6 – 11 Oktober 2020',
    organizer: 'Pusat Prestasi Nasional (Puspresnas) Kemdikbud & ITB Bandung',
    arenaDimensions: {
      size: 'Miniatur Sawah 3.0 m × 3.0 m dengan Dual Live Streaming Juri',
      zones: [
        { name: 'Zona Awal', dimension: '500 mm × 500 mm', description: 'Area start robot teleoperasi.' },
        { name: 'Zona Tanam & Disinfeksi', dimension: '1500 mm × 1000 mm', description: 'Simulasi lahan tanam dan sterilisasi terisolasi.' },
        { name: 'Zona Penyiangan & Panen', dimension: '1500 mm × 1000 mm', description: 'Area seleksi gulma dan pemanenan presisi.' },
      ],
    },
    robotConstraints: {
      startDimension: 'Maks 500 mm × 500 mm',
      dynamicDimension: 'Maks 1000 mm × 1000 mm × 1000 mm',
      weightLimit: 'Maks 25.0 kg',
      powerSupply: 'Baterai maks 24.0 Volt nominal, Tekanan pneumatik maks 600 kPa',
      controlProtocol: 'Dual Zoom Stream Camera + Wi-Fi Teleoperasi 2.4GHz',
    },
    missionFlow: [
      '1. Start di Zona Awal setelah wasit daring membunyikan peluit.',
      '2. Membawa bibit padi dan menanam tegak pada lubang tanam.',
      '3. Melakukan penyiangan 2 gulma rumput tanpa merusak tanaman padi.',
      '4. Memotong dan mengangkat batang padi kuning untuk meraih PANEN RAYA.',
    ],
    instantWinCondition: {
      name: 'PANEN RAYA',
      condition: 'Menyelesaikan misi tanam minimal 3 bibit tegak, cabut 2 gulma, dan panen padi kuning tanpa pelanggaran dalam waktu 3 menit.',
      reward: 'Kemenangan Mutlak PANEN RAYA Seketika.',
    },
    scoringRules: [
      { item: 'Bibit Padi Tertanam Tegak', points: '+10 Poin / bibit (Maks 30)', type: 'bonus', description: 'Minimal 3 bibit tertanam sempurna.' },
      { item: 'Rumput Gulma Tercabut', points: '+15 Poin / rumput (Maks 30)', type: 'bonus', description: 'Mencabut 2 batang rumput liar.' },
      { item: 'Padi Kuning Dipanen', points: '+30 Poin', type: 'bonus', description: 'Batang dipotong dan diangkat ke atas sasis robot.' },
      { item: 'Merusak Tanaman Padi Sah', points: 'Gugur Hak Panen Raya', type: 'penalty', description: 'Hukuman melindas tanaman padi.' },
      { item: 'Kemenangan Mutlak Panen Raya', points: 'INSTANT WIN (90 Pts)', type: 'instant_win', description: 'Selesai sempurna 3 zona.' },
    ],
    technicalChallenges: [
      'Pengujian performa robot secara daring dengan live broadcasting dual kamera beresolusi tinggi.',
      'Desain roda bergerigi (cleated wheels) untuk traksi tinggi pada permukaan lunak busa.',
      'Mekanisme pneumatik pemotong batang padi dengan respon instan.',
    ],
    robotArchitecture: {
      drivetrain: '4WD Skid-Steer dengan Roda Lugged Anti-Slip',
      controller: 'Arduino Mega 2560 R3 + ESP8266 Wi-Fi Telemetry Shield',
      sensors: ['Rotary Quadrature Encoders', 'Limit Switches', 'Laser Alignment ToF'],
      actuators: 'High Torque DC Planetary Motors + 600 kPa Pneumatic Linear Cylinder',
      algorithm: 'Sequential State Machine + PWM Smooth Acceleration Curve',
    },
    achievements: '🎖️ PESERTA & FINALIS NASIONAL DARING KRTMI 2020',
    officialCitation: 'Partisipasi Tim Robotika Abhinaya UNY dalam perhelatan perdana KRI Daring Nasional di tengah pandemi COVID-19.',
    citationUrl: 'https://uny.ac.id',
    badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
    accentColor: 'text-purple-400',
  },
  {
    year: '2019',
    title: 'KRTMI 2019 — Robot Pertanian Padi (Kecukupan Pangan, Ketahanan Negara)',
    theme: 'Robot Pertanian Padi — Kecukupan Pangan, Ketahanan Negara',
    slogan: 'Kecukupan Pangan, Ketahanan Negara',
    division: 'Kontes Robot Tematik Indonesia (KRTMI) — Edisi Perdana',
    hostVenue: 'Universitas Dian Nuswantoro (UDINUS), Semarang, Jawa Tengah',
    date: '20 – 23 Juni 2019',
    organizer: 'Direktorat Jenderal Pembelajaran dan Kemahasiswaan Kemenristekdikti & UDINUS',
    arenaDimensions: {
      size: 'Lapangan Miniatur Sawah 4.0 m × 3.0 m',
      zones: [
        { name: 'Zona Awal (Starting Grid)', dimension: '500 mm × 500 mm', description: 'Area awal peletakan robot manual dan wadah 6 bibit padi.' },
        { name: 'Zona Tanam (Mud Simulation)', dimension: '1500 mm × 1000 mm', description: 'Area busa berlapisan kedap air menyerupai sawah becek.' },
        { name: 'Zona Penyiangan (Weeding Zone)', dimension: '1500 mm × 1000 mm', description: 'Area tanaman padi muda dan 2 batang rumput gulma liar.' },
        { name: 'Zona Panen (Harvesting Zone)', dimension: '1000 mm × 1000 mm', description: 'Area 1 pohon padi kuning matang siap panen.' },
      ],
    },
    robotConstraints: {
      startDimension: 'Maks 500 mm × 500 mm',
      dynamicDimension: 'Maks 1000 mm × 1000 mm × 1000 mm (P × L × T)',
      weightLimit: 'Maks 25.0 kg (termasuk baterai dan kontroler)',
      powerSupply: 'Baterai maks 24.0 Volt nominal, Pneumatik maks 600 kPa',
      controlProtocol: 'Wireless Nirkabel (WiFi / Bluetooth) — RF murni & IR dilarang',
    },
    missionFlow: [
      '1. Start di Zona Awal: Membawa bibit padi (maks 3 bibit per perjalanan dari total 6 bibit).',
      '2. Zona Tanam: Menanam tegak minimal 3 bibit padi ke lubang tanam sintetis.',
      '3. Zona Penyiangan: Mencabut 2 batang rumput liar tanpa mencabut atau melindas pohon padi muda.',
      '4. Zona Panen: Memegang, memotong batang padi kuning menggunakan pisau putar / pneumatik, dan mengangkatnya.',
    ],
    instantWinCondition: {
      name: 'PANEN RAYA',
      condition: 'Berhasil menyelesaikan seluruh misi tanam (3 bibit), penyiangan (2 gulma), dan pemanenan padi kuning tanpa merusak tanaman lain dalam waktu kurang dari 3 menit.',
      reward: 'Kemenangan Mutlak PANEN RAYA Seketika.',
    },
    scoringRules: [
      { item: 'Bibit Padi Tertanam Tegak', points: '+10 Poin / bibit (Maks 30 Pts)', type: 'bonus', description: 'Minimal 3 bibit tertanam sempurna tegak.' },
      { item: 'Rumput Gulma Berhasil Dicabut', points: '+15 Poin / rumput (Maks 30 Pts)', type: 'bonus', description: '2 batang gulma tercabut bersih.' },
      { item: 'Padi Kuning Berhasil Dipanen', points: '+30 Poin', type: 'bonus', description: 'Batang dipotong dan padi diangkat ke atas robot.' },
      { item: 'Melindas / Merusak Pohon Padi', points: 'Gugur Hak Panen Raya', type: 'penalty', description: 'Hanya mendapatkan poin akumulasi tanpa status kemenangan mutlak.' },
      { item: 'Kemenangan Mutlak PANEN RAYA', points: 'INSTANT WIN (90 Pts)', type: 'instant_win', description: 'Selesai 3 zona dengan sempurna.' },
    ],
    technicalChallenges: [
      'Perancangan sistem traksi lumpur terasering menggunakan roda bergerigi aluminium custom.',
      'Mekanisme penjepit dan pemotong batang padi pneumatik kecepatan tinggi.',
      'Distribusi beban dinamis sasis agar tidak tergelincir pada busa sintetis.',
    ],
    robotArchitecture: {
      drivetrain: '4WD Custom Lugged Cleated Aluminum Wheels',
      controller: 'Arduino Mega 2560 + Custom Power Distribution PCB Shield',
      sensors: ['Rotary Encoders', 'Inductive Proximity Limit Switches', 'Battery Voltage Telemetry'],
      actuators: 'High-Torque Planetary DC Motors + 600 kPa Festo Pneumatic Actuators',
      algorithm: 'Proportional Manual Teleoperation + Automated Sequence Assist',
    },
    achievements: '🥈 JUARA 2 TINGKAT NASIONAL KRTMI 2019 (UDINUS SEMARANG)',
    officialCitation: 'Juara II Divisi Kontes Robot Tematik Indonesia (KRTMI) dalam Kontes Robot Indonesia (KRI) Tingkat Nasional Tahun 2019 di Universitas Dian Nuswantoro Semarang (Laporan Pelaksanaan Program UNY 2019, hal. 41).',
    citationUrl: 'https://uny.ac.id',
    badgeColor: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40',
    accentColor: 'text-yellow-400',
  },
  {
    year: '2026',
    title: 'TECHNOCORNER 2026 — Transporter Robot Competition (DTETI FT UGM)',
    theme: 'High-Speed Precision Payload Transfer, Multi-Stage Obstacle Race & Holonomic Kinematics',
    slogan: 'Precision, Speed, and Engineering Excellence in Transporter Robotics',
    division: 'Transporter Robot National Competition',
    hostVenue: 'Departemen Teknik Elektro dan Teknologi Informasi (DTETI) FT UGM, Yogyakarta',
    date: 'Maret – Juni 2026',
    organizer: 'KMTETI Fakultas Teknik Universitas Gadjah Mada (UGM)',
    arenaDimensions: {
      size: '3.0 m × 3.0 m Arena Multi-Obstacle',
      zones: [
        { name: 'Area Start (Hijau)', dimension: '40 cm × 40 cm', description: 'Zona awal start robot di sudut arena.' },
        { name: 'Area Finish (Biru Muda)', dimension: '50 cm × 50 cm', description: 'Zona akhir wajib masuk sebelum batas waktu habis.' },
        { name: 'Box Payload (Kubus)', dimension: '10 cm × 10 cm × 10 cm', description: 'Balok non-magnetis pasangan warna Jingga, Pink, Biru Tua, Ungu, Kuning.' },
        { name: 'Drop Zone', dimension: '12 cm × 12 cm × 5 cm', description: 'Wadah target penempatan balok sesuai pasangan warna.' },
        { name: 'Obstacle Box (Merah)', dimension: '10 cm × 10 cm × 10 cm', description: 'Rintangan penghalang jalur (2 buah di 8 Besar & Semifinal; 3 buah di Grand Final).' },
      ],
    },
    robotConstraints: {
      startDimension: 'Panjang maks 20.0 cm, Lebar maks 20.0 cm (Tinggi tidak dibatasi)',
      dynamicDimension: 'Ekstensi dinamis diperbolehkan saat pertandingan berlangsung',
      weightLimit: 'Tidak dibatasi (Bebas)',
      powerSupply: 'Baterai mandiri dengan tegangan MAKSIMAL 13.0 Volt (Wajib Lolos Uji Voltase)',
      controlProtocol: '100% Robot Buatan Sendiri (Kit Pabrikan Lego/Prebuilt Dilarang) + Wireless Controller',
    },
    missionFlow: [
      '1. Start dari Area Start Hijau setelah aba-aba wasit dimulai.',
      '2. Menavigasi arena melintasi rintangan dan Box Merah pembatas jalur.',
      '3. Menjepit dan mengangkat box payload (Box WAJIB diangkat, dilarang diseret/didorong di lantai).',
      '4. Menempatkan box payload secara presisi ke dalam Drop Zone dengan warna yang sesuai.',
      '5. Robot WAJIB bergerak masuk ke Area Finish Biru Muda (seluruh roda menyentuh zona) sebelum waktu habis.',
    ],
    instantWinCondition: {
      name: 'TIME-TRIAL PRECISION DROP',
      condition: 'Memindahkan seluruh balok payload ke Drop Zone yang cocok dengan 100% akurasi warna dan seluruh roda menyentuh Area Finish dalam waktu tercepat.',
      reward: 'Poin Maksimal & Kemenangan Catatan Waktu Tercepat.',
    },
    scoringRules: [
      { item: 'Box Masuk Drop Zone Sesuai Warna', points: '+20 Poin / box', type: 'bonus', description: 'Balok berada sempurna di dalam wadah warna yang cocok.' },
      { item: 'Box Masuk Drop Zone Warna Salah', points: '+5 Poin / box', type: 'bonus', description: 'Balok masuk wadah namun warna tidak sesuai.' },
      { item: 'Robot Masuk Sempurna Area Finish', points: '+15 Poin', type: 'bonus', description: 'Seluruh roda menyentuh area biru muda sebelum waktu habis.' },
      { item: 'Menyeret / Mendorong Payload di Lantai', points: 'Peringatan / Diskualifikasi Box', type: 'penalty', description: 'Box payload wajib diangkat saat mobilisasi.' },
      { item: 'Tegangan Baterai > 13.0 Volt', points: 'Gagal Uji Teknis', type: 'penalty', description: 'Wajib menurunkan voltase sebelum diizinkan bertanding.' },
    ],
    technicalChallenges: [
      'Manuver kecepatan tinggi menggunakan 4-Wheel Mecanum drive dengan batasan dimensi sasis 20x20 cm.',
      'Mekanisme capit gripper lead-screw ganda dengan daya jepit presisi untuk kubus 10x10x10 cm.',
      'Regulasi voltase catu daya presisi tinggi agar tidak melebihi ambang batas 13.0V dengan monitoring telemetry.',
      'Struktur turnamen eliminasi multi-tahap (Penyisihan 32, 16 Besar, 8 Besar, Semifinal, Grand Final).',
    ],
    robotArchitecture: {
      drivetrain: '4-Wheel CNC Machined High-Speed Mecanum Drivetrain',
      controller: 'ESP32-S3 Dual-Core 240MHz dengan FreeRTOS Multithreading Task Scheduler',
      sensors: ['AS5600 12-bit Magnetic Rotary Encoders', 'VL53L0X Laser Distance ToF', 'ADC Precision Battery Telemetry'],
      actuators: 'Coreless DC Planetary Motors + High-Torque Dual Lead-Screw Gripper Motor',
      algorithm: 'Gamepad Direct Teleoperation + Closed-Loop Velocity PID + S-Curve Acceleration Profiling',
    },
    achievements: '🤖 PESERTA TINGKAT NASIONAL TECHNOCORNER 2026 FT UGM',
    officialCitation: 'Partisipasi Tim Robotika Abhinaya UNY pada divisi Transporter Robot Technocorner 2026 Departemen Teknik Elektro dan TI Fakultas Teknik Universitas Gadjah Mada.',
    citationUrl: 'https://ugm.ac.id',
    badgeColor: 'bg-red-500/20 text-red-300 border-red-500/40',
    accentColor: 'text-red-400',
  },
];
