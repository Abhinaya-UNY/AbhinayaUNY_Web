export interface KrtmiEdition {
  year: string;
  title: string;
  theme: string;
  division: string;
  organizer: string;
  rulesSummary: string;
  technicalChallenges: string[];
  robotArchitecture: {
    drivetrain: string;
    controller: string;
    sensors: string[];
    actuators: string;
    algorithm: string;
  };
  achievements: string;
  badgeColor: string;
  accentColor: string;
}

export const KRTMI_EDITIONS: KrtmiEdition[] = [
  {
    year: '2024',
    title: 'KRTMI 2024 — Robot Otonom Pemilah Sampah & Keranjang Digital',
    theme: 'Otomasi Pengelolaan Sampah Cerdas Berbasis Visi Komputer & Holonomic Mobile Robot',
    division: 'Kontes Robot Tematik Indonesia (KRTMI)',
    organizer: 'BPTI Puspresnas Kemendikbudristek & Universitas Muhammadiyah Surakarta (UMS)',
    rulesSummary: 'Robot ditantang beroperasi secara penuh mandiri (autonomous) dan semi-otomatis untuk mendeteksi berbagai kategori sampah di arena dinamis, mengambil objek menggunakan mekanisme gripper cerdas, memilah sampah berdasarkan jenis (organik/anorganik/logam), dan memasukkannya ke dalam keranjang digital yang bergerak dengan sinkronisasi presisi.',
    technicalChallenges: [
      'Deteksi & Klasifikasi Objek Real-time dengan YOLOv8/YOLOv11 dan Visi Komputer pada mini PC/Edge AI.',
      'Sistem Gerak Holonomic 4-Wheel Mecanum Drivetrain dengan kompensasi gyroskopik IMU 6-DOF (MPU6050) 100 Hz.',
      'Mekanisme Gripper Motorized dengan pengatur torsi otomatis dan sensor ToF laser (VL53L0X) untuk deteksi jarak jepit.',
      'Fusi Telemetri Nirkabel (Wireless Telemetry) untuk komunikasi status antar-robot dan referee server.',
    ],
    robotArchitecture: {
      drivetrain: '4-Wheel Independent Mecanum Drivetrain (Holonomic Omnidirectional Motion)',
      controller: 'Dual Core ESP32-S3 High-Speed Microcontroller + STM32F4 Motion Co-Processor',
      sensors: ['Kinect Depth Camera', 'AS5600 12-bit Magnetic Encoders', 'MPU6050 6-DOF IMU', 'VL53L0X Laser ToF'],
      actuators: 'Coreless DC Planetary Geared Motors + MG996R Metal Servos with Dual TB6612FNG / BTS7960 Drivers',
      algorithm: 'Inverse Kinematics Matrix + Discrete PID Velocity Loop + Real-time Edge Vision Classification',
    },
    achievements: '🏆 JUARA 1 REGIONAL I WILAYAH & 🥈 JUARA 2 TINGKAT NASIONAL KRTMI 2024',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    accentColor: 'text-emerald-400',
  },
  {
    year: '2023',
    title: 'KRTMI 2023 — Robot Pemilah Sampah & Keranjang Cerdas Tematik',
    theme: 'Smart Waste Sorting & Collaborative Mobile Robotics for Green Campus',
    division: 'Kontes Robot Tematik Indonesia (KRTMI)',
    organizer: 'Puspresnas Kemendikbudristek & Universitas Semarang (USM)',
    rulesSummary: 'Dua robot (Robot Pengambil dan Keranjang Bergerak) bekerja sama di arena untuk mengidentifikasi sampah botol plastik dan kaleng kaleng berlabel, melakukan navigasi titik koordinat presisi, serta melempar/meletakkan sampah ke dalam keranjang penerima secara otomatis tanpa menyentuh garis batas pelanggaran.',
    technicalChallenges: [
      'Navigasi otonom berbasis fusi sensor ultrasonik array dan pembacaan garis lintasan fotodioda.',
      'Komputasi invers kinematika 3-Wheel Omni-directional drive untuk pergerakan 360 derajat lincah.',
      'Sinkronisasi posisi antara robot pembawa keranjang dan robot pengambil sampah via protokol radio RF 2.4GHz.',
    ],
    robotArchitecture: {
      drivetrain: '3-Wheel Holonomic Omni-directional Drive',
      controller: 'STM32F401 BlackPill + Arduino Mega 2560 Sensor Hub',
      sensors: ['Color Sensor TCS3200', 'Rotary Optical Encoders', 'Ultrasonic HC-SR04 Array', 'IMU 3-Axis'],
      actuators: 'PG45 Planetary DC Motors with Optical Encoders + High-Torque Gripper Servos',
      algorithm: 'Closed-loop PID Trajectory Tracking + Threshold Color Segmentation',
    },
    achievements: '🥉 JUARA 3 REGIONAL & 🏅 FINALIS TINGKAT NASIONAL KRTMI 2023',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    accentColor: 'text-amber-400',
  },
  {
    year: '2022',
    title: 'KRTMI 2022 — Robot Penanganan & Pemilahan Limbah Medis',
    theme: 'Autonomous Robotic Handling of Hazardous Hospital Waste',
    division: 'Kontes Robot Tematik Indonesia (KRTMI)',
    organizer: 'Puspresnas Kemendikbudristek & Institut Teknologi Sepuluh Nopember (ITS)',
    rulesSummary: 'Fokus kompetisi diarahkan pada otomatisasi evakuasi limbah medis sintetis di lingkungan simulasi bangsal rumah sakit. Robot diharuskan mendeteksi simbol bahaya biologis (biohazard), membaca QR-Code kantong limbah, serta menempatkannya pada insinerator virtual tanpa kontak fisik langsung oleh manusia.',
    technicalChallenges: [
      'Pembacaan kode QR dan barcode secara dinamis saat robot bergerak.',
      'Sistem lengan mekanik 4-DOF untuk manuver pengangkatan beban limbah hingga 1.5 kg.',
      'Desain sasis kedap cairan dengan isolasi elektrostatik untuk standar keamanan simulasi medis.',
    ],
    robotArchitecture: {
      drivetrain: 'Differential Drive with Active Caster Balance',
      controller: 'ESP32 Dual Core Wi-Fi/BLE + STM32 ARM Cortex-M4',
      sensors: ['Serial Barcode Scanner', 'Sharp Optical Distance Sensors', 'Rotary Encoders'],
      actuators: 'High Torque Worm Gear Motors + Multi-turn Lead Screw Linear Actuator',
      algorithm: 'State Machine Sequential Automation + Optical QR Decoders',
    },
    achievements: '🏅 TAHAP NASIONAL KRTMI 2022',
    badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
    accentColor: 'text-blue-400',
  },
  {
    year: '2021',
    title: 'KRTMI 2021 — Robot Pelayanan Pasien COVID-19 Rumah Sakit',
    theme: 'Contactless Medical Aid & Hospital Logistical Automation',
    division: 'Kontes Robot Tematik Indonesia (KRTMI)',
    organizer: 'Puspresnas Kemendikbudristek & Universitas Gadjah Mada (UGM) / Daring Nasional',
    rulesSummary: 'Penyelenggaraan secara hybrid/daring nasional di mana robot diuji kecepatannya dalam mengantarkan obat-obatan, melakukan sterilisasi sinar UV-C, dan berkomunikasi dengan pasien tiruan di koridor rumah sakit darurat pandemi.',
    technicalChallenges: [
      'Transmisi video telemetri ultra-low latency untuk kendali jarak jauh ruang isolasi.',
      'Sistem kendali modular dengan mekanisme dropping box otomatis steril.',
      'Perhitungan konsumsi daya baterai LiFePO4 untuk ketahanan operasi durasi panjang.',
    ],
    robotArchitecture: {
      drivetrain: '4-Wheel Skid-Steer Mobile Platform',
      controller: 'ESP32 + Raspberry Pi 4 Telemetry Node',
      sensors: ['Pi Camera v2', 'Digital IR Sensor Array', 'Current/Voltage Telemetry INA219'],
      actuators: 'High-Torque DC Geared Motors with Dual BTS7960 Driver Module',
      algorithm: 'WebRTC Low-Latency Streaming + Proportional Line Following',
    },
    achievements: '🏅 FINALIS DARING NASIONAL KRTMI 2021',
    badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
    accentColor: 'text-cyan-400',
  },
  {
    year: '2020',
    title: 'KRTMI 2020 — Robot Penanganan COVID-19 & Disinfeksi',
    theme: 'Autonomous UV-C Disinfection & Smart Logistics Against Infectious Pandemics',
    division: 'Kontes Robot Tematik Indonesia (KRTMI)',
    organizer: 'Puspresnas Kemendikbudristek & ITB / Daring',
    rulesSummary: 'Edisi khusus respons tanggap darurat awal pandemi global. Peserta diminta merancang inovasi robot yang mampu menyemprotkan disinfektan dan menyinari ruang secara otonom tanpa campur tangan tenaga kesehatan langsung di zona merah.',
    technicalChallenges: [
      'Integrasi pompa atomisasi disinfektan bertekanan tinggi dengan kontrol digital.',
      'Sistem proteksi paparan radiasi UV-C menggunakan sensor deteksi keberadaan manusia.',
      'Pengujian navigasi pada denah bangsal rumah sakit virtual.',
    ],
    robotArchitecture: {
      drivetrain: 'Differential Two-Wheel Drive with Heavy-Duty Ball Casters',
      controller: 'Arduino Mega 2560 R3 + ESP8266 Wi-Fi Module',
      sensors: ['PIR Motion Sensors', 'Sonar Rangefinders', 'Rotary Encoders'],
      actuators: '12V DC Worm Geared Motors + Solid State Relay UV-C Driver',
      algorithm: 'Autonomous Boundary Traversal + Safety Interlock Firmware',
    },
    achievements: '🏅 FINALIS TINGKAT NASIONAL KRTMI 2020',
    badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
    accentColor: 'text-purple-400',
  },
  {
    year: '2019',
    title: 'KRTMI 2019 — Robot Pertanian Cerdas & Panen Padi',
    theme: 'Smart Agricultural Mechanization & Grain Harvesting Robotics',
    division: 'Kontes Robot Tematik Indonesia (KRTMI)',
    organizer: 'Kemenristekdikti & Universitas Dian Nuswantoro (UDINUS) Semarang',
    rulesSummary: 'Tahun kelahiran divisi Kontes Robot Tematik Indonesia. Robot ditantang beroperasi di miniatur sawah dan terasering bertingkat untuk menanam bibit, memotong batang padi sintetis, dan mengumpulkan gabah ke dalam lumbung penampungan.',
    technicalChallenges: [
      'Menaklukkan rintangan medan tanah berkontur dengan sistem roda bergerigi (cleated wheels).',
      'Mekanisme pemotong padi mekanik menggunakan bilah pisau putar mikro berkecepatan tinggi.',
      'Sistem pemilahan tingkat kematangan padi berdasarkan pembacaan reflektansi spektral.',
    ],
    robotArchitecture: {
      drivetrain: 'All-Terrain 4WD with High-Traction Lugged Wheels',
      controller: 'Arduino Mega + Custom Shield PCB',
      sensors: ['Analog Color Sensors', 'Inductive Proximity Switches', 'Limit Switches'],
      actuators: 'High-RPM Brushless Motor Cutters + High-Torque Planetary DC Motors',
      algorithm: 'Coordinate Step Sequencing + Obstacle Avoidance Tree',
    },
    achievements: '🏅 EKSPLORASI INOVASI PERDANA KRTMI 2019',
    badgeColor: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40',
    accentColor: 'text-yellow-400',
  },
  {
    year: '2026',
    title: 'TECHNOCORNER 2026 — Transporter Robot Competition',
    theme: 'High-Speed Precision Payload Transfer & Holonomic Kinematics',
    division: 'Transporter Robot National Competition',
    organizer: 'KMTETI Fakultas Teknik Universitas Gadjah Mada (UGM)',
    rulesSummary: 'Kompetisi robot transporter bergengsi di mana robot berlomba di arena berundak dan lintasan rintangan untuk memindahkan balok-balok payload berbagai ukuran ke zona sasaran dalam batasan waktu minimum dengan akurasi penempatan 100%.',
    technicalChallenges: [
      'Manuver kecepatan tinggi menggunakan 4-Wheel Mecanum drive dengan akselerasi terkontrol PID.',
      'Mekanisme capit (gripper) berkekuatan tinggi dengan lead screw ganda dan pelapis karet anti-slip.',
      'Pengendalian nirkabel multi-kanal dengan gamepad nirkabel 2.4GHz tanpa latency.',
    ],
    robotArchitecture: {
      drivetrain: '4-Wheel CNC Machined Mecanum Drivetrain',
      controller: 'ESP32 Dual-Core 240MHz with FreeRTOS Multithreading',
      sensors: ['Magnetic Rotary Encoders', 'Laser Distance ToF Sensor', 'Battery Voltage Telemetry'],
      actuators: 'High-Power DC Planetary Motors with Dual TB6612FNG Drivers + High Torque Gripper Motor',
      algorithm: 'Gamepad Direct Teleoperation + Closed-Loop Speed Control + Smooth Ramp Acceleration',
    },
    achievements: '🤖 PESERTA TINGKAT NASIONAL TECHNOCORNER 2026 FT UGM',
    badgeColor: 'bg-red-500/20 text-red-300 border-red-500/40',
    accentColor: 'text-red-400',
  },
];
