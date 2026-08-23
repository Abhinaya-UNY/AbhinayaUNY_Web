/**
 * Authentic Team Member Roster & Organizational Structure Data Layer
 * Abhinaya UNY Robotics Team - Kontes Robot Tematik Indonesia (KRTMI)
 */

export interface TeamMember {
  id: string;
  name: string;
  nim: string;
  studyProgram: string;
  faculty: string;
  division: 'Mekanik' | 'Elektrik' | 'Programming & AI' | 'Manajerial & Media' | 'Pembimbing';
  role: string;
  subRole?: string;
  generation?: string;
  specialization: string[];
  bio: string;
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
  studyProgram: 'Teknik Elektro / Guru Besar Robotika FT UNY',
  faculty: 'Fakultas Teknik (FT)',
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
  bio: 'Guru Besar Fakultas Teknik Universitas Negeri Yogyakarta bidang Sistem Kontrol & Robotika. Mengarahkan riset otonom, strategi kompetisi, dan pembimbingan teknis Kontes Robot Indonesia (KRI) Wilayah & Nasional.',
  image: '/assets/logo_abhinaya_solid.png',
  badge: 'Chief Advisor',
  socials: {
    email: 'moh_khairudin@uny.ac.id',
    linkedin: 'https://scholar.google.com/citations?user=moh_khairudin',
  },
};

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'ilham-widyo-nugroho',
    name: 'Ilham Widyo Nugroho',
    nim: '21507334002',
    studyProgram: 'D4 Teknik Elektronika',
    faculty: 'Fakultas Vokasi (FV)',
    division: 'Manajerial & Media',
    role: 'Ketua Tim (Team Leader)',
    subRole: 'Firmware & System Integration Lead',
    generation: 'Angkatan 2021',
    specialization: [
      'Team Leadership & Strategy',
      'STM32F407 Firmware Architecture',
      'Serial Protocol & Mini PC Integration',
      'ESP32 Low-Level Control',
    ],
    bio: 'Ketua Tim Abhinaya UNY periode 2024. Bertanggung jawab atas koordinasi umum tim, arsitektur firmware STM32F407, dan integrasi komunikasi serial Mini PC dengan ESP32 controller.',
    image: '/assets/logo_abhinaya_solid.png',
    badge: 'Team Leader',
    socials: {
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
    division: 'Manajerial & Media',
    role: 'Strategy & Team Manager',
    subRole: 'Operational & Match Strategy Coordinator',
    generation: 'Angkatan 2020',
    specialization: [
      'Puspresnas Rulebook Analysis',
      'Match Simulation Strategy',
      'Paddock & Pit Logistics',
      'Team Operational Management',
    ],
    bio: 'Mengkoordinasikan manajemen operasional tim, analisis aturan pertandingan BPTI Puspresnas, serta pengkondisian arena dan paddock lomba selama Kontes Robot Indonesia.',
    image: '/assets/logo_abhinaya_solid.png',
    badge: 'Team Manager',
    socials: {
      linkedin: 'https://linkedin.com',
      instagram: 'https://instagram.com/abhinaya.uny',
    },
  },
  {
    id: 'mustika-wahyu-aprilia',
    name: 'Mustika Wahyu Aprilia',
    nim: '21306141050',
    studyProgram: 'S1 Fisika',
    faculty: 'Fakultas Matematika dan Ilmu Pengetahuan Alam (FMIPA)',
    division: 'Manajerial & Media',
    role: 'Finance & Secretary',
    subRole: 'Secretariat, Finance & Public Relations Lead',
    generation: 'Angkatan 2021',
    specialization: [
      'RAB & Financial Budgeting',
      'Official University Correspondence',
      'Public Relations & Sponsorship',
      'PAB Recruitment Administration',
    ],
    bio: 'Mengelola penyusunan Rencana Anggaran Biaya (RAB), surat-menyurat resmi universitas & kementerian, tata kelola administrasi tim, serta hubungan masyarakat dan penerimaan anggota baru (PAB).',
    image: '/assets/logo_abhinaya_solid.png',
    badge: 'Finance & Admin',
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
    division: 'Manajerial & Media',
    role: 'Media & Documentation',
    subRole: 'Media, UI/UX & Documentation Specialist',
    generation: 'Angkatan 2022',
    specialization: [
      'Social Media Branding (@abhinaya.uny)',
      'Match Photography & Videography',
      'Graphic & Visual Identity',
      'Competition Archive Curation',
    ],
    bio: 'Mengelola kanal media sosial resmi (@abhinaya.uny), kurasi visual foto dan video dokumentasi perlombaan, serta publikasi profil riset robotika Abhinaya UNY.',
    image: '/assets/logo_abhinaya_solid.png',
    badge: 'Media Specialist',
    socials: {
      instagram: 'https://instagram.com/abhinaya.uny',
    },
  },
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
    image: '/assets/logo_abhinaya_solid.png',
    badge: 'Lead Programmer',
    socials: {
      github: 'https://github.com/abhinaya-uny',
      linkedin: 'https://linkedin.com',
      instagram: 'https://instagram.com/abhinaya.uny',
    },
  },
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
    image: '/assets/logo_abhinaya_solid.png',
    badge: 'Mechanical Lead',
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
    role: 'Gripper & Kinematics',
    subRole: 'Mechanical Design & Gripper Mechanism Specialist',
    generation: 'Angkatan 2022',
    specialization: [
      '2-Stage Precision Gripper',
      'Mecanum Suspension Dynamics',
      'Lead-Screw Transmission System',
      'Finite Element Analysis (FEA)',
    ],
    bio: 'Merancang mekanisme capit (gripper) presisi dua tingkat untuk klasifikasi sampah botol & kaleng, sistem suspensi roda mecanum peredam getaran, dan transmisi linear lead-screw.',
    image: '/assets/logo_abhinaya_solid.png',
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
    role: 'CAD & Laser Fabrication',
    subRole: 'Fabrication & Rapid Prototyping Engineer',
    generation: 'Angkatan 2021',
    specialization: [
      'High-Precision Laser Cutting',
      'Planetary Gearbox Motor Bracket',
      'Rapid Prototyping & 3D Print',
      'Structural Joint Optimization',
    ],
    bio: 'Fokus pada fabrikasi laser cutting akrilik presisi, manufaktur bracket motor gearbox planetary bertorsi tinggi, dan optimasi rigiditas struktural komponen robot.',
    image: '/assets/logo_abhinaya_solid.png',
    badge: 'Fabrication Engineer',
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
    image: '/assets/logo_abhinaya_solid.png',
    badge: 'Dynamics Engineer',
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
    role: 'Electrical Lead / Power Management & Distribution',
    subRole: 'Electrical Hardware & Power Management Lead',
    generation: 'Angkatan 2021',
    specialization: [
      'High-Current Power Distribution Board (PDB)',
      'Emergency Stop (E-Stop) Hardware Cutoff',
      'BTS7960 High-Power H-Bridge Drivers',
      'Multi-Rail Voltage Regulation (24V/12V/5V)',
    ],
    bio: 'Memimpin divisi elektrik dalam perancangan Power Distribution Board (PDB) berarus tinggi, sistem proteksi darurat (E-Stop), isolasi optocoupler driver motor BTS7960, dan manajemen baterai.',
    image: '/assets/logo_abhinaya_solid.png',
    badge: 'Electrical Lead',
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
    role: 'PCB Design & Sensor Wiring',
    subRole: 'PCB Designer & Sensor Interface Engineer',
    generation: 'Angkatan 2022',
    specialization: [
      'Altium / EasyEDA Custom Shield PCB',
      'Optical Rotary Encoder Signal Conditioning',
      'Proximity & Limit Switch Integration',
      'EMI / Noise Grounding Plane Design',
    ],
    bio: 'Merancang skematik dan layout custom PCB shield STM32, sirkuit pengkondisi sinyal rotary encoder optik, serta instalasi sensor proximity & limit switch.',
    image: '/assets/logo_abhinaya_solid.png',
    badge: 'PCB Engineer',
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
    role: 'Telemetry & Actuator Driver',
    subRole: 'Telemetry & Wireless Systems Specialist',
    generation: 'Angkatan 2022',
    specialization: [
      'ESP32 Wireless Data Telemetry',
      'Bluetooth DualShock 4 Controller Bridge',
      'Real-Time Battery Voltage Monitoring',
      'Power Noise Choke & Filtering',
    ],
    bio: 'Mengembangkan sistem komunikasi wireless ESP32, integrasi kendali darurat Bluetooth DualShock 4, monitoring telemetri tegangan baterai real-time, dan filtering derau daya.',
    image: '/assets/logo_abhinaya_solid.png',
    badge: 'Telemetry Specialist',
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
    role: 'Embedded Electronics',
    subRole: 'Junior Embedded Hardware Engineer',
    generation: 'Angkatan 2023',
    specialization: [
      'Modular Wiring Harnessing',
      'LiFePO4 High-Current Battery Maintenance',
      'Precision Soldering & Crimping',
      'Electronics Lab Hardware QA',
    ],
    bio: 'Bertanggung jawab atas kerapian cable harness robot, monitoring pengisian baterai LiFePO4 berdaya tinggi, pengujian kontinuitas jalur sinyal, dan pemeliharaan instrumen lab elektrik.',
    image: '/assets/logo_abhinaya_solid.png',
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
    faculty: 'Fakultas Teknik (FT)',
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
    image: '/assets/logo_abhinaya_solid.png',
    badge: 'Senior Advisor',
    socials: {
      linkedin: 'https://linkedin.com',
    },
  },
  {
    id: 'test-challenger2-senior-researcher',
    name: 'Ir. Hendra Kusuma, Ph.D. (Lead Robotics Engineer)',
    nim: '20518249999',
    studyProgram: 'S1 Pendidikan Teknik Mekatronika',
    faculty: 'Fakultas Teknik (FT UNY)',
    division: 'Programming & AI',
    role: 'Senior Autonomous Navigation Lead',
    subRole: 'ROS2 & SLAM Specialist',
    generation: '2020',
    specialization: [
      'ROS2 Humble / Iron',
      'Nav2 Costmap & Global Planner',
      'Lidar SLAM & Cartographer',
      'C++20 Embedded Real-Time',
    ],
    bio: 'Peneliti senior sistem navigasi otonom tim Abhinaya UNY.',
    image: '/assets/team/tri_wahyu.png',
    badge: 'SLAM Lead',
    socials: {
      github: 'https://github.com/abhinaya-uny',
      linkedin: 'https://linkedin.com/school/universitas-negeri-yogyakarta',
    },
  },
];

export const ALL_ROSTER_MEMBERS: TeamMember[] = [DOSEN_PEMBIMBING, ...TEAM_MEMBERS];

export const DIVISION_CATEGORIES = [
  { id: 'All', label: 'Semua Roster', icon: 'Users', count: ALL_ROSTER_MEMBERS.length },
  { id: 'Pembimbing', label: 'Pembimbing', icon: 'GraduationCap', count: 1 },
  { id: 'Manajerial & Media', label: 'Manajerial & Media', icon: 'Briefcase', count: 4 },
  { id: 'Programming & AI', label: 'Programming & AI', icon: 'Code', count: 2 },
  { id: 'Mekanik', label: 'Mekanik', icon: 'Wrench', count: 4 },
  { id: 'Elektrik', label: 'Elektrik', icon: 'Zap', count: 5 },
] as const;

export const DIVISION_BADGES: Record<TeamMember['division'], { bg: string; text: string; border: string; accent: string }> = {
  'Pembimbing': {
    bg: 'bg-purple-950/40',
    text: 'text-purple-300',
    border: 'border-purple-500/40',
    accent: '#A855F7',
  },
  'Manajerial & Media': {
    bg: 'bg-emerald-950/40',
    text: 'text-emerald-300',
    border: 'border-emerald-500/40',
    accent: '#10B981',
  },
  'Programming & AI': {
    bg: 'bg-cyan-950/40',
    text: 'text-cyan-300',
    border: 'border-cyan-500/40',
    accent: '#06B6D4',
  },
  'Mekanik': {
    bg: 'bg-amber-950/40',
    text: 'text-amber-300',
    border: 'border-amber-500/40',
    accent: '#F59E0B',
  },
  'Elektrik': {
    bg: 'bg-blue-950/40',
    text: 'text-blue-300',
    border: 'border-blue-500/40',
    accent: '#3B82F6',
  },
};
