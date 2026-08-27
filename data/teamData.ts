/**
 * Authentic Team Member Roster & Organizational Structure Data Layer
 * Abhinaya UNY Robotics Team - Kontes Robot Tematik Indonesia (KRTMI)
 * Under the auspices of UKM Rekayasa Teknologi (Restek) Universitas Negeri Yogyakarta
 */

export interface TeamMember {
  id: string;
  name: string;
  nim: string;
  studyProgram: string;
  faculty: string;
  division: 'Mekanik' | 'Elektrik' | 'Programming & AI' | 'Manajemen & Administrasi' | 'Pembimbing';
  role: string;
  subRole?: string;
  generation?: string;
  specialization: string[];
  bio: string;
  quote?: string;
  image: string;
  badge: string;
  socials?: {
    github?: string;
    linkedin?: string;
    instagram?: string;
    email?: string;
  };
}

export const DOSEN_PEMBIMBING: TeamMember = {
  id: 'prof-khairudin',
  name: 'Prof. Ir. Moh. Khairudin, M.T., Ph.D.',
  nim: 'NIDN: 0012047901',
  studyProgram: 'Teknik Elektro / Guru Besar Robotika UNY',
  faculty: 'Universitas Negeri Yogyakarta (UNY)',
  division: 'Pembimbing',
  role: 'Dosen Pembimbing Utama',
  subRole: 'Chief Advisor & Robotics Research Director',
  generation: 'Pembimbing KRI',
  specialization: [
    'Adaptive Control Systems',
    'Robotics Research & Development',
    'KRI National Strategy',
    'Power & Automation Engineering',
  ],
  bio: 'Guru Besar Universitas Negeri Yogyakarta bidang Sistem Kontrol & Robotika. Mengarahkan riset otonom, strategi kompetisi, dan pembimbingan teknis Kontes Robot Indonesia (KRI) Wilayah & Nasional untuk kontingen robotika UNY.',
  quote: 'Inovasi robotika bermula dari dedikasi dan kerja keras tanpa henti.',
  image: '/assets/logo_abhinaya_solid.png',
  badge: 'Chief Advisor',
  socials: {
    email: 'moh_khairudin@uny.ac.id',
    linkedin: 'https://scholar.google.com/citations?user=moh_khairudin',
  },
};

export const TEAM_MEMBERS: TeamMember[] = [
  // 1. DIVISI PROGRAMMING & AI (PROGRAM)
  {
    id: 'tri-wahyu-handoyo',
    name: 'Tri Wahyu Handoyo',
    nim: '22518241023',
    studyProgram: 'S1 Pendidikan Teknik Mekatronika',
    faculty: 'Fakultas Teknik (FT)',
    division: 'Programming & AI',
    role: 'Lead Programmer / Computer Vision & Web Systems',
    subRole: 'Autonomous Navigation & AI Vision Specialist',
    generation: 'Angkatan 2022',
    specialization: [
      'Deep Learning & YOLO Object Detection',
      'Mecanum Omnidirectional Kinematics',
      'Autonomous Trajectory Planning',
      'Next.js Full-Stack Web Portal',
    ],
    bio: 'Memimpin riset algoritma deteksi objek sampah berbasis deep learning / YOLO, pemetaan lintasan otonom roda mecanum, komputasi edge pada Mini PC, dan perancangan portal web resmi Abhinaya UNY.',
    quote: 'Anti turu, standby setiap waktu',
    image: '/images/members/06_tri_wahyu_handoyo_1.png',
    badge: 'Lead Programmer & AI',
    socials: {
      github: 'https://github.com/abhinaya-uny',
      linkedin: 'https://linkedin.com',
      instagram: 'https://instagram.com/abhinaya.uny',
    },
  },
  {
    id: 'salsabila-azzahra',
    name: 'Salsabila Azzahra Putri Sophia Dewi Utami',
    nim: '20518241012',
    studyProgram: 'S1 Pendidikan Teknik Mekatronika',
    faculty: 'Fakultas Teknik (FT)',
    division: 'Programming & AI',
    role: 'Programmer / Strategy & Team Manager',
    subRole: 'Match Strategy & Sensor Logic Coordinator',
    generation: 'Angkatan 2020',
    specialization: [
      'Puspresnas Rulebook & Match Analysis',
      'Sensor Logic & Calibration Testing',
      'Match Strategy Simulation',
      'Paddock & Pit Operational Logistics',
    ],
    bio: 'Mengkoordinasikan logika kendali strategi pertandingan, analisis aturan BPTI Puspresnas, kalibrasi sensor di arena, serta manajemen paddock kontingen selama Kontes Robot Indonesia.',
    quote: 'Reconnecting...',
    image: '/images/members/08_salsabila_azzahra_1.png',
    badge: 'Program & Strategy',
    socials: {
      linkedin: 'https://linkedin.com',
      instagram: 'https://instagram.com/abhinaya.uny',
    },
  },

  // 2. DIVISI ELEKTRONIK / ELEKTRIK
  {
    id: 'ilham-widyo-nugroho',
    name: 'Ilham Widyo Nugroho',
    nim: '21507334002',
    studyProgram: 'D4 Teknik Elektronika',
    faculty: 'Fakultas Vokasi (FV)',
    division: 'Elektrik',
    role: 'Ketua Tim / Embedded Firmware & System Integration',
    subRole: 'Team Leader & Electronics System Architect',
    generation: 'Angkatan 2021',
    specialization: [
      'Team Leadership & Strategy',
      'STM32F407 Firmware Architecture',
      'Serial Protocol & Mini PC Integration',
      'High-Speed Microcontroller Control',
    ],
    bio: 'Ketua Tim Abhinaya UNY periode 2024 dari latar belakang Teknik Elektronika. Bertanggung jawab atas koordinasi umum tim, arsitektur firmware STM32F407, dan integrasi komunikasi serial Mini PC dengan mikrokontroler.',
    quote: 'Adigang, adigung, adiguna.',
    image: '/images/members/09_ilham_widyo_nugroho_1.png',
    badge: 'Ketua Tim & Firmware',
    socials: {
      linkedin: 'https://linkedin.com',
      instagram: 'https://instagram.com/abhinaya.uny',
    },
  },
  {
    id: 'agus-bagaskoro',
    name: 'Agus Bagaskoro',
    nim: '21501244039',
    studyProgram: 'S1 Pendidikan Teknik Elektro',
    faculty: 'Fakultas Teknik (FT)',
    division: 'Elektrik',
    role: 'Electrical Lead / Power Distribution & Hardware',
    subRole: 'Electrical Hardware & Power Management Lead',
    generation: 'Angkatan 2021',
    specialization: [
      'High-Current Power Distribution Board (PDB)',
      'Emergency Stop (E-Stop) Hardware Cutoff',
      'BTS7960 High-Power H-Bridge Drivers',
      'Multi-Rail Voltage Regulation (24V/12V/5V)',
    ],
    bio: 'Memimpin divisi elektrik dalam perancangan Power Distribution Board (PDB) berarus tinggi, sistem proteksi darurat (E-Stop), isolasi optocoupler driver motor BTS7960, dan manajemen baterai.',
    quote: 'Focus on accuracy, power will follow.',
    image: '/images/members/02_agus_bagaskoro_1.png',
    badge: 'Lead Elektronik',
    socials: {
      linkedin: 'https://linkedin.com',
      instagram: 'https://instagram.com/abhinaya.uny',
    },
  },
  {
    id: 'abdul-hasib-adzdzin-nuha',
    name: 'Abdul Hasib Adzdzin Nuha',
    nim: '22502241014',
    studyProgram: 'S1 Pendidikan Teknik Elektronika',
    faculty: 'Fakultas Teknik (FT)',
    division: 'Elektrik',
    role: 'PCB Design & Sensor Wiring Engineer',
    subRole: 'PCB Designer & Sensor Interface Engineer',
    generation: 'Angkatan 2022',
    specialization: [
      'Altium / EasyEDA Custom Shield PCB',
      'Optical Rotary Encoder Signal Conditioning',
      'Proximity & Limit Switch Integration',
      'EMI / Noise Grounding Plane Design',
    ],
    bio: 'Merancang skematik dan layout custom PCB shield STM32, sirkuit pengkondisi sinyal rotary encoder optik, serta instalasi sensor proximity & limit switch.',
    quote: 'Follow your dream',
    image: '/images/members/01_abdul_hasib_adzdzin_nuha_1.png',
    badge: 'PCB & Wiring',
    socials: {
      linkedin: 'https://linkedin.com',
      instagram: 'https://instagram.com/abhinaya.uny',
    },
  },
  {
    id: 'ikhsan-nurrohman',
    name: 'Ikhsan Nurrohman',
    nim: '22538141004',
    studyProgram: 'S1 Teknik Elektro',
    faculty: 'Fakultas Teknik (FT)',
    division: 'Elektrik',
    role: 'Telemetry & Actuator Driver Specialist',
    subRole: 'Telemetry & Wireless Systems Specialist',
    generation: 'Angkatan 2022',
    specialization: [
      'ESP32 Wireless Data Telemetry',
      'Bluetooth DualShock 4 Controller Bridge',
      'Real-Time Battery Voltage Monitoring',
      'Power Noise Choke & Filtering',
    ],
    bio: 'Mengembangkan sistem komunikasi wireless ESP32, integrasi kendali darurat Bluetooth DualShock 4, monitoring telemetri tegangan baterai real-time, dan filtering derau daya.',
    quote: 'Always connected, zero packet loss.',
    image: '/images/members/03_ikhsan_nurrohman_1.png',
    badge: 'Telemetri & Wireless',
    socials: {
      linkedin: 'https://linkedin.com',
      instagram: 'https://instagram.com/abhinaya.uny',
    },
  },
  {
    id: 'rionaldi-nugroho',
    name: 'Rionaldi Nugroho',
    nim: '23090620088',
    studyProgram: 'D4 Teknik Elektronika',
    faculty: 'Fakultas Vokasi (FV)',
    division: 'Elektrik',
    role: 'Embedded Electronics & Hardware QA',
    subRole: 'Junior Embedded Hardware Engineer',
    generation: 'Angkatan 2023',
    specialization: [
      'Modular Wiring Harnessing',
      'LiFePO4 High-Current Battery Maintenance',
      'Precision Soldering & Crimping',
      'Electronics Lab Hardware QA',
    ],
    bio: 'Bertanggung jawab atas kerapian cable harness robot, monitoring pengisian baterai LiFePO4 berdaya tinggi, pengujian kontinuitas jalur sinyal, dan pemeliharaan instrumen lab elektrik.',
    quote: 'Ikan tidak terbang dan burung tidak berenang, kecuali pinguin',
    image: '/images/members/12_rionaldi_nugroho_1.png',
    badge: 'Embedded Hardware',
    socials: {
      linkedin: 'https://linkedin.com',
      instagram: 'https://instagram.com/abhinaya.uny',
    },
  },
  {
    id: 'yusron-nur-latief',
    name: 'Yusron Nur Latief',
    nim: 'Senior Member',
    studyProgram: 'Teknik Elektro UNY',
    faculty: 'Universitas Negeri Yogyakarta (UNY)',
    division: 'Elektrik',
    role: 'Electrical Advisor / Alumni',
    subRole: 'Senior Electrical & Hardware Advisor',
    generation: 'Alumni / Demisioner',
    specialization: [
      'Industrial Hardware Architecture',
      'High-Power MOSFET Driver Systems',
      'KRTMI Technology Transfer',
      'Electrical Fault Diagnostics',
    ],
    bio: 'Konsultan dan penasihat teknis perangkat keras robotika Abhinaya UNY. Memberikan transfer pengetahuan riset kelistrikan robotika dari generasi-generasi kompetisi sebelumnya.',
    quote: 'Transfer knowledge adalah kunci konsistensi juara.',
    image: '/assets/logo_abhinaya_solid.png',
    badge: 'Senior Advisor',
    socials: {
      linkedin: 'https://linkedin.com',
    },
  },

  // 3. DIVISI MEKANIK
  {
    id: 'muhamad-ilham-sony',
    name: 'Muhamad Ilham Sony',
    nim: '20539144016',
    studyProgram: 'S1 Teknik Manufaktur',
    faculty: 'Fakultas Teknik (FT)',
    division: 'Mekanik',
    role: 'Mechanical Lead / Chassis & CAD',
    subRole: 'Manufacturing & Fabrication Lead',
    generation: 'Angkatan 2020',
    specialization: [
      'SolidWorks 3D CAD Modeling',
      'Aluminium 6061 Precision Milling',
      'Chassis Structural Rigidity',
      'Lathe & CNC Fabrication',
    ],
    bio: 'Memimpin divisi mekanik dalam fabrikasi presisi plat aluminium 6061, pemesinan bubut & milling sasis utama robot, serta memastikan durabilitas mekanik saat bermanuver di arena KRTMI.',
    quote: 'Bentar, masih cari quote',
    image: '/images/members/10_muhamad_ilham_sony_1.png',
    badge: 'Lead Mekanik',
    socials: {
      linkedin: 'https://linkedin.com',
      instagram: 'https://instagram.com/abhinaya.uny',
    },
  },
  {
    id: 'farhan-yuda-mahendra',
    name: 'Farhan Yuda Mahendra',
    nim: '22518244007',
    studyProgram: 'S1 Pendidikan Teknik Mekatronika',
    faculty: 'Fakultas Teknik (FT)',
    division: 'Mekanik',
    role: 'Gripper & Kinematics Specialist',
    subRole: 'Mechanical Design & Gripper Mechanism Specialist',
    generation: 'Angkatan 2022',
    specialization: [
      '2-Stage Precision Gripper',
      'Mecanum Suspension Dynamics',
      'Lead-Screw Transmission System',
      'Finite Element Analysis (FEA)',
    ],
    bio: 'Merancang mekanisme capit (gripper) presisi dua tingkat untuk klasifikasi sampah botol & kaleng, sistem suspensi roda mecanum peredam getaran, dan transmisi linear lead-screw.',
    quote: 'Pejuang hibernasi',
    image: '/images/members/07_farhan_yuda_mahendra_1.png',
    badge: 'Gripper Specialist',
    socials: {
      linkedin: 'https://linkedin.com',
      instagram: 'https://instagram.com/abhinaya.uny',
    },
  },
  {
    id: 'caesar-sokma-langgeng',
    name: 'Caesar Sokma Langgeng',
    nim: '21539144005',
    studyProgram: 'S1 Teknik Manufaktur',
    faculty: 'Fakultas Teknik (FT)',
    division: 'Mekanik',
    role: 'CAD & Laser Fabrication Engineer',
    subRole: 'Fabrication & Rapid Prototyping Engineer',
    generation: 'Angkatan 2021',
    specialization: [
      'High-Precision Laser Cutting',
      'Planetary Gearbox Motor Bracket',
      'Rapid Prototyping & 3D Print',
      'Structural Joint Optimization',
    ],
    bio: 'Fokus pada fabrikasi laser cutting akrilik presisi, manufaktur bracket motor gearbox planetary bertorsi tinggi, dan optimasi rigiditas struktural komponen robot.',
    quote: 'Sometimes you win, sometimes you learn.',
    image: '/images/members/11_caesar_sokma_langgeng_1.png',
    badge: 'CAD & Fabrikasi',
    socials: {
      linkedin: 'https://linkedin.com',
      instagram: 'https://instagram.com/abhinaya.uny',
    },
  },
  {
    id: 'edo-raja-saputra-siahaan',
    name: 'Edo Raja Saputra Siahaan',
    nim: '22508334033',
    studyProgram: 'D4 Teknik Mesin',
    faculty: 'Fakultas Vokasi (FV)',
    division: 'Mekanik',
    role: 'Actuation & Structural Mechanics',
    subRole: 'Actuator & Mechanical Dynamics Engineer',
    generation: 'Angkatan 2022',
    specialization: [
      'Pneumatic & Servo Actuation',
      'Dynamic Vibration Testing',
      'Mechanical Assembly & Tolerance',
      'Obstacle Traversal Testing',
    ],
    bio: 'Menangani perakitan aktuator gripper dan mekanik dorong, pengujian getaran sasis saat melintasi rintangan arena KRTMI, serta kalibrasi toleransi mekanik.',
    quote: 'Get the victory, win the trophy',
    image: '/images/members/10_muhamad_ilham_sony_2.png',
    badge: 'Aktuator & Sasis',
    socials: {
      linkedin: 'https://linkedin.com',
      instagram: 'https://instagram.com/abhinaya.uny',
    },
  },
  {
    id: 'rose-pita-nur-afifah',
    name: 'Rose Pita Nur Afifah',
    nim: '22518241042',
    studyProgram: 'S1 Pendidikan Teknik Mekatronika',
    faculty: 'Fakultas Teknik (FT)',
    division: 'Mekanik',
    role: 'Mekatronika Design & Media Documentation',
    subRole: 'Mechanical Layout & Official Media Specialist',
    generation: 'Angkatan 2022',
    specialization: [
      'Mechanical Layout & Ergonomics',
      'Social Media Branding (@abhinaya.uny)',
      'Match Photography & Videography',
      'Visual Identity & Graphic Design',
    ],
    bio: 'Mahasiswa Pendidikan Teknik Mekatronika yang memadukan riset desain mekatronika dengan pengelolaan publikasi visual resmi (@abhinaya.uny), kurasi dokumentasi perlombaan, dan identitas grafis kontingen.',
    quote: 'Life is a stage, and I am a screenwriter',
    image: '/images/members/05_rose_pita_nur_afifah_1.png',
    badge: 'Mekatronika & Media',
    socials: {
      instagram: 'https://instagram.com/abhinaya.uny',
    },
  },

  // 4. MANAJEMEN & ADMINISTRASI (NON-TEKNIS)
  {
    id: 'mustika-wahyu-aprilia',
    name: 'Mustika Wahyu Aprilia',
    nim: '21306141050',
    studyProgram: 'S1 Fisika',
    faculty: 'Fakultas Matematika dan Ilmu Pengetahuan Alam (FMIPA)',
    division: 'Manajemen & Administrasi',
    role: 'Bendahara, Administrasi & Sekretariat Tim',
    subRole: 'Finance, Administration & Sponsorship Lead',
    generation: 'Angkatan 2021',
    specialization: [
      'RAB & Financial Budgeting Tim Robotika',
      'Official University Correspondence',
      'Public Relations & Sponsorship',
      'PAB Recruitment Administration',
    ],
    bio: 'Mengelola penyusunan Rencana Anggaran Biaya (RAB) riset dan kompetisi, surat-menyurat resmi universitas & Puspresnas, tata kelola administrasi tim, serta hubungan masyarakat dan kepengurusan PAB.',
    quote: 'Just double tap',
    image: '/images/members/04_mustika_wahyu_aprilia_1.png',
    badge: 'Bendahara & Administrasi',
    socials: {
      linkedin: 'https://linkedin.com',
      instagram: 'https://instagram.com/abhinaya.uny',
    },
  },
];

export const ALL_ROSTER_MEMBERS: TeamMember[] = [DOSEN_PEMBIMBING, ...TEAM_MEMBERS];

export const DIVISION_CATEGORIES = [
  { id: 'All', label: 'Semua Divisi', icon: 'Users', count: ALL_ROSTER_MEMBERS.length },
  { id: 'Programming & AI', label: 'Programming & AI', icon: 'Code', count: 2 },
  { id: 'Elektrik', label: 'Elektronik / Elektrik', icon: 'Zap', count: 6 },
  { id: 'Mekanik', label: 'Mekanik', icon: 'Wrench', count: 5 },
  { id: 'Manajemen & Administrasi', label: 'Administrasi & Keuangan', icon: 'Briefcase', count: 1 },
  { id: 'Pembimbing', label: 'Pembimbing', icon: 'GraduationCap', count: 1 },
] as const;

export const DIVISION_ORDER: TeamMember['division'][] = [
  'Programming & AI',
  'Elektrik',
  'Mekanik',
  'Manajemen & Administrasi',
  'Pembimbing',
];

export const DIVISION_INFO: Record<TeamMember['division'], { title: string; subtitle: string; icon: string }> = {
  'Programming & AI': {
    title: 'Divisi Programming & AI',
    subtitle: 'Arsitektur Firmware Otonom, Computer Vision YOLO, Logika Sensor & Trajectory Planning',
    icon: 'Code',
  },
  'Elektrik': {
    title: 'Divisi Elektronik / Elektrik',
    subtitle: 'Power Distribution Board (PDB), Firmware STM32, PCB Shield, Sensor & Telemetri Nirkabel',
    icon: 'Zap',
  },
  'Mekanik': {
    title: 'Divisi Mekanik',
    subtitle: 'Desain 3D CAD, Fabrikasi Sasis Aluminium 6061, Mekanisme Gripper 2-Stage & Media Desain',
    icon: 'Wrench',
  },
  'Manajemen & Administrasi': {
    title: 'Administrasi, Keuangan & Sekretariat',
    subtitle: 'Pengelolaan Anggaran Riset (RAB), Administrasi Surat Resmi Universitas & Rekrutmen',
    icon: 'Briefcase',
  },
  'Pembimbing': {
    title: 'Dosen Pembimbing Utama',
    subtitle: 'Pengarah Riset Robotika & Kebijakan Strategis Kontes Robot Indonesia',
    icon: 'GraduationCap',
  },
};

export const DIVISION_BADGES: Record<TeamMember['division'], { bg: string; text: string; border: string; accent: string }> = {
  'Pembimbing': {
    bg: 'bg-purple-950/40',
    text: 'text-purple-300',
    border: 'border-purple-500/40',
    accent: '#A855F7',
  },
  'Programming & AI': {
    bg: 'bg-cyan-950/40',
    text: 'text-cyan-300',
    border: 'border-cyan-500/40',
    accent: '#06B6D4',
  },
  'Elektrik': {
    bg: 'bg-blue-950/40',
    text: 'text-blue-300',
    border: 'border-blue-500/40',
    accent: '#3B82F6',
  },
  'Mekanik': {
    bg: 'bg-amber-950/40',
    text: 'text-amber-300',
    border: 'border-amber-500/40',
    accent: '#F59E0B',
  },
  'Manajemen & Administrasi': {
    bg: 'bg-emerald-950/40',
    text: 'text-emerald-300',
    border: 'border-emerald-500/40',
    accent: '#10B981',
  },
};
