/**
 * Authentic Team Member Roster & Historical Dataset Architecture Layer
 * Abhinaya UNY Robotics Team - Kontes Robot Tematik Indonesia (KRTMI)
 * Under the auspices of UKM Rekayasa Teknologi (Restek) Universitas Negeri Yogyakarta
 * Verified against official UNY News Press Releases, Dikti/Puspresnas registries, & Official Instagram @abhinaya.uny (2020-2025)
 */

export type DivisionType = 'Ketua Tim' | 'Manager' | 'Program' | 'Elektronik' | 'Mekanik' | 'Pembimbing' | 'Desain' | 'Official';
export type DivisionSlug = 'leader' | 'manager' | 'program' | 'elektronik' | 'mekanik' | 'pembimbing' | 'desain' | 'official';

export interface MemberSocials {
  github?: string;
  linkedin?: string;
  instagram?: string;
  tiktok?: string;
  youtube?: string;
  twitter?: string;
  email?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  nickname?: string;
  nim: string;
  studyProgram: string;
  prodi?: string;
  faculty: string;
  division: DivisionType;
  divisionSlug?: DivisionSlug;
  role: string;
  subRole?: string;
  generation?: string;
  generationYear?: number;
  yearsActive?: number[];
  specialization: string[];
  skills?: string[];
  bio: string;
  quote?: string;
  image: string;
  images?: string[];
  photos?: string[];
  badge: string;
  leadershipEra?: string;
  achievements?: string[];
  isLeader?: boolean;
  isManager?: boolean;
  isActive?: boolean;
  socials?: MemberSocials;
}

export interface LeaderHistoryItem extends TeamMember {
  year: number;
  badge: string;
  leadershipEra: string;
}

export interface ManagerHistoryItem extends TeamMember {
  year: number;
  badge: string;
  leadershipEra: string;
}

export interface GenerationArchive {
  year: number;
  contingentName: string;
  theme: string;
  tournament: string;
  rules?: string;
  leader: TeamMember;
  managers: TeamMember[];
  divisions: {
    program: TeamMember[];
    elektronik: TeamMember[];
    mekanik: TeamMember[];
    desain?: TeamMember[];
    pembimbing?: TeamMember[];
    advisors?: TeamMember[];
  };
  members: TeamMember[];
  achievements: string[];
  highlights?: string[];
  groupPhoto?: string;
}

/* ==========================================================================
   1. DOSEN PEMBIMBING & ADVISORS
   ========================================================================== */

export const DOSEN_PEMBIMBING_LIST: TeamMember[] = [
  {
    id: 'prof-khairudin',
    name: 'Prof. Ir. Moh. Khairudin, M.T., Ph.D., IPU.',
    nickname: 'Prof. Khairudin',
    nim: 'NIP: 19790412 200212 1 002',
    studyProgram: 'Pendidikan Teknik Mekatronika / Guru Besar Robotika UNY',
    prodi: 'S1 Pendidikan Teknik Mekatronika',
    faculty: 'Fakultas Teknik (FT)',
    division: 'Pembimbing',
    divisionSlug: 'pembimbing',
    role: 'Dosen Pembimbing Utama',
    subRole: 'Chief Advisor & Robotics Research Director',
    generation: 'Pembimbing KRI',
    generationYear: 2020,
    yearsActive: [2020, 2021, 2022, 2023, 2024, 2025],
    specialization: [
      'Adaptive Control Systems',
      'Robotics Research & Development',
      'KRI National Strategy',
      'Power & Automation Engineering',
    ],
    skills: ['Adaptive Control', 'System Dynamics', 'Strategic Leadership', 'Robotics Mentorship'],
    bio: 'Guru Besar Universitas Negeri Yogyakarta bidang Sistem Kontrol & Robotika pada Program Studi Pendidikan Teknik Mekatronika FT UNY. Mengarahkan riset otonom, strategi kompetisi, dan pembimbingan teknis Kontes Robot Indonesia (KRI) Wilayah & Nasional untuk kontingen robotika UNY.',
    quote: 'Inovasi robotika bermula dari dedikasi dan kerja keras tanpa henti.',
    image: '/images/members/pembimbing_prof_moh_khairudin.jpg',
    images: [
      '/images/members/pembimbing_prof_moh_khairudin.jpg',
      '/images/members/2024_pembimbing_prof_moh_khairudin_01.jpg',
      '/images/members/2025_pembimbing_prof_moh_khairudin_01.jpg',
    ],
    photos: [
      '/images/members/pembimbing_prof_moh_khairudin.jpg',
      '/images/members/2024_pembimbing_prof_moh_khairudin_01.jpg',
      '/images/members/2025_pembimbing_prof_moh_khairudin_01.jpg',
    ],
    badge: 'Chief Advisor',
    isActive: true,
    socials: {
      email: 'moh_khairudin@uny.ac.id',
      linkedin: 'https://scholar.google.com/citations?user=qau4BuwAAAAJ&hl=id&oi=ao',
    },
  },
  {
    id: 'dr-herlambang',
    name: 'Dr. Herlambang Sigit Pramono, S.T., M.Cs.',
    nickname: 'Dr. Herlambang',
    nim: 'NIP: 19650829 199903 1 001',
    studyProgram: 'Pendidikan Teknik Mekatronika FT UNY',
    prodi: 'S1 Pendidikan Teknik Mekatronika',
    faculty: 'Fakultas Teknik (FT)',
    division: 'Pembimbing',
    divisionSlug: 'pembimbing',
    role: 'Dosen Pembimbing',
    subRole: 'Technical & Embedded Systems Advisor',
    generation: 'Pembimbing KRI',
    generationYear: 2022,
    yearsActive: [2022, 2023, 2024, 2025],
    specialization: [
      'Embedded Microcontrollers',
      'Electronic Hardware Design',
      'Signal Processing & Sensor Integration',
      'Robotics Pedagogy & Mentorship',
    ],
    skills: ['Embedded Systems', 'PCB Architecture', 'Sensor Interfacing', 'Hardware QA'],
    bio: 'Dosen Program Studi Pendidikan Teknik Mekatronika FT UNY yang mendampingi dan membimbing tim Abhinaya dalam pengujian mekatronika, kalibrasi sistem kontrol, dan transfer teknologi riset robotika.',
    quote: 'Semangat pantang menyerah dan kolaborasi yang kuat adalah kunci prestasi gemilang.',
    image: '/images/members/pembimbing_dr_herlambang_sigit_pramono.jpg',
    images: [
      '/images/members/pembimbing_dr_herlambang_sigit_pramono.jpg',
    ],
    photos: [
      '/images/members/pembimbing_dr_herlambang_sigit_pramono.jpg',
    ],
    badge: 'Dosen Pembimbing',
    isActive: true,
    socials: {
      email: 'herlambang@uny.ac.id',
      linkedin: 'https://scholar.google.com/citations?user=g7GNiKUAAAAJ&hl=id&oi=ao',
    },
  },
];

/* ==========================================================================
   2. ALL-ERA LEADERS HALL OF FAME (2020 – 2025)
   ========================================================================== */

export const LEADERS_HALL_OF_FAME: LeaderHistoryItem[] = [
  {
    year: 2020,
    id: 'nurcholis-leader-2020',
    name: 'Nurcholis',
    nickname: 'Cholis',
    nim: '17502241001',
    studyProgram: 'S1 Pendidikan Teknik Elektronika',
    prodi: 'S1 Pendidikan Teknik Elektronika',
    faculty: 'Fakultas Teknik (FT)',
    division: 'Ketua Tim',
    divisionSlug: 'leader',
    role: 'Ketua Tim Abhinaya 2020 (Founder Era)',
    subRole: 'System Architecture & Founder Lead',
    generation: 'Angkatan 2017',
    generationYear: 2020,
    yearsActive: [2020, 2021, 2022],
    specialization: [
      'Team Leadership & Strategy',
      'Autonomous Robotics Architecture',
      'STM32 Embedded Systems',
      'UV-C Disinfection Mechanism',
    ],
    skills: ['STM32', 'Robotics Architecture', 'Strategy', 'Embedded C', 'Team Leadership'],
    bio: 'Ketua Tim Abhinaya UNY era perdana 2020. Merintis fondasi divisi riset robotika tematik otonom KRTMI UNY dari awal hingga sukses berlaga di KRI Wilayah dan Nasional dengan inovasi robot sterilisasi UV-C.',
    quote: 'Langkah awal menentukan seberapa jauh kita bisa terbang.',
    image: '/images/members/2020_leader_nurcholis_01.jpg',
    images: [
      '/images/members/2020_leader_nurcholis_01.jpg',
      '/images/members/2020_program_nurcholis_01.jpg',
      '/images/members/2022_program_nurcholis_01.jpg',
    ],
    photos: [
      '/images/members/2020_leader_nurcholis_01.jpg',
      '/images/members/2020_program_nurcholis_01.jpg',
      '/images/members/2022_program_nurcholis_01.jpg',
    ],
    badge: 'Ketua Tim 2020',
    leadershipEra: 'Ketua Tim 2020',
    achievements: ['Peringkat 6 Nasional KRTMI 2020', 'Pionir Pembentukan Tim Robotika Abhinaya UNY'],
    isLeader: true,
    socials: {
      instagram: 'https://instagram.com/nrchs.mr',
    },
  },
  {
    year: 2021,
    id: 'afif-aiman-saputra-leader-2021',
    name: 'Afif Aiman Saputra',
    nickname: 'Afif',
    nim: '19503241015',
    studyProgram: 'S1 Pendidikan Teknik Mesin',
    prodi: 'S1 Pendidikan Teknik Mesin',
    faculty: 'Fakultas Teknik (FT)',
    division: 'Ketua Tim',
    divisionSlug: 'leader',
    role: 'Ketua Tim Abhinaya 2021 (Juara 1 Wilayah I)',
    subRole: 'Mechanical Architecture & Match Strategy Lead',
    generation: 'Angkatan 2019',
    generationYear: 2021,
    yearsActive: [2020, 2021, 2022, 2023],
    specialization: [
      'Robotics Mechanical Design',
      'Autonomous Competition Strategy',
      'Mecanum Drive Assembly',
      'Team Leadership',
    ],
    skills: ['CAD', 'Mecanum', 'Strategy', 'Sheet Metal Fabrication', 'Team Leadership'],
    bio: 'Ketua Tim Abhinaya UNY periode 2021 yang memimpin kontingen mencetak rekor gemilang Juara 1 KRI Wilayah I dan Penghargaan Strategi Terbaik KRTMI Nasional dengan robot logistik otonom.',
    quote: 'Dedikasi tanpa batas untuk kejayaan almamater.',
    image: '/images/members/2021_leader_afif_aiman_saputra_01.jpg',
    images: [
      '/images/members/2021_leader_afif_aiman_saputra_01.jpg',
      '/images/members/2020_mekanik_afif_aiman_saputra_01.jpg',
      '/images/members/2022_desain_afif_aiman_saputra_01.jpg',
    ],
    photos: [
      '/images/members/2021_leader_afif_aiman_saputra_01.jpg',
      '/images/members/2020_mekanik_afif_aiman_saputra_01.jpg',
      '/images/members/2022_desain_afif_aiman_saputra_01.jpg',
    ],
    badge: 'Ketua Tim 2021',
    leadershipEra: 'Ketua Tim 2021',
    achievements: ['Juara 1 KRI Wilayah I KRTMI 2021', 'Penghargaan Khusus Strategi Terbaik Nasional 2021'],
    isLeader: true,
    socials: {
      instagram: 'https://instagram.com/afifaimans',
    },
  },
  {
    year: 2022,
    id: 'muhammad-iqbal-rasyid-leader-2022',
    name: 'Muhammad Iqbal Rasyid',
    nickname: 'Iqbal',
    nim: '19518241046',
    studyProgram: 'S1 Pendidikan Teknik Mekatronika',
    prodi: 'S1 Pendidikan Teknik Mekatronika',
    faculty: 'Fakultas Teknik (FT)',
    division: 'Ketua Tim',
    divisionSlug: 'leader',
    role: 'Ketua Tim Abhinaya 2022 (Era Transisi Offline)',
    subRole: 'Mekatronika Integration & Strategy Lead',
    generation: 'Angkatan 2019',
    generationYear: 2022,
    yearsActive: [2020, 2021, 2022],
    specialization: [
      'Mekatronika Robotics Integration',
      'Computer Vision & Embedded Control',
      'Medical Waste Sorting Algorithm',
      'Team Leadership',
    ],
    skills: ['Mekatronika', 'Computer Vision', 'STM32', 'Algorithm', 'Team Leadership'],
    bio: 'Ketua Tim Abhinaya UNY 2022. Memimpin riset robotika penanganan limbah medis B3 rumah sakit pada kompetisi KRTMI Wilayah & Nasional dalam transisi kompetisi luring pasca pandemi.',
    quote: 'Tantangan baru adalah peluang pembuktian kualitas riset.',
    image: '/images/members/2022_leader_muhammad_iqbal_rasyid_01.jpg',
    images: [
      '/images/members/2022_leader_muhammad_iqbal_rasyid_01.jpg',
      '/images/members/2022_program_muhammad_iqbal_rasyid_01.jpg',
      '/images/members/2020_program_muhammad_iqbal_rasyid_01.jpg',
    ],
    photos: [
      '/images/members/2022_leader_muhammad_iqbal_rasyid_01.jpg',
      '/images/members/2022_program_muhammad_iqbal_rasyid_01.jpg',
      '/images/members/2020_program_muhammad_iqbal_rasyid_01.jpg',
    ],
    badge: 'Ketua Tim 2022',
    leadershipEra: 'Ketua Tim 2022',
    achievements: ['Finalis Nasional KRTMI 2022 ITS Surabaya', 'Peringkat 4 KRI Wilayah I 2022'],
    isLeader: true,
    socials: {
      instagram: 'https://instagram.com/iqbalrasyid_',
    },
  },
  {
    year: 2023,
    id: 'salsabila-azzahra-leader-2023',
    name: 'Salsabila Azzahra Putri Sophia Dewi Utami',
    nickname: 'Salsa',
    nim: '20518241012',
    studyProgram: 'S1 Pendidikan Teknik Mekatronika',
    prodi: 'S1 Pendidikan Teknik Mekatronika',
    faculty: 'Fakultas Teknik (FT)',
    division: 'Ketua Tim',
    divisionSlug: 'leader',
    role: 'Ketua Tim Abhinaya 2023 (Juara 3 Wilayah I & Finalis Nasional)',
    subRole: 'Match Strategy, Rulebook & Sensor Logic Coordinator',
    generation: 'Angkatan 2020',
    generationYear: 2023,
    yearsActive: [2021, 2022, 2023, 2024],
    specialization: [
      'Puspresnas Rulebook & Match Analysis',
      'Sensor Logic & Calibration Testing',
      'Digital Twin Synchronization',
      'Match Strategy & Paddock Logistics',
    ],
    skills: ['Strategy', 'Sensor Logic', 'Rulebook Analysis', 'Digital Twin', 'Leadership'],
    bio: 'Ketua Tim Abhinaya UNY 2023 yang berhasil membawa tim meraih Juara 3 KRI Wilayah I dan lolos ke putaran Final Nasional KRTMI 2023 di Semarang dengan robot pembagi obat & sistem digital twin arena.',
    quote: 'Keep fighting, never surrender!',
    image: '/images/members/2023_leader_salsabila_azzahra_psdu_01.jpg',
    images: [
      '/images/members/2023_leader_salsabila_azzahra_psdu_01.jpg',
      '/images/members/2024_program_salsabila_azzahra_01.png',
      '/images/members/2024_program_salsabila_azzahra_02.png',
      '/images/members/2024_program_salsabila_azzahra_psdu_01.jpg',
      '/images/members/2023_program_salsabila_azzahra_psdu_01.jpg',
      '/images/members/2022_program_salsabila_azzahra_psdu_01.jpg',
    ],
    photos: [
      '/images/members/2023_leader_salsabila_azzahra_psdu_01.jpg',
      '/images/members/2024_program_salsabila_azzahra_01.png',
      '/images/members/2024_program_salsabila_azzahra_02.png',
      '/images/members/2024_program_salsabila_azzahra_psdu_01.jpg',
      '/images/members/2023_program_salsabila_azzahra_psdu_01.jpg',
      '/images/members/2022_program_salsabila_azzahra_psdu_01.jpg',
    ],
    badge: 'Ketua Tim 2023',
    leadershipEra: 'Ketua Tim 2023',
    achievements: ['Juara 3 KRI Wilayah I KRTMI 2023', 'Finalis Nasional KRTMI 2023 Universitas Semarang (USM)'],
    isLeader: true,
    socials: {
      instagram: 'https://instagram.com/kuranglemu',
      linkedin: 'https://linkedin.com',
    },
  },
  {
    year: 2024,
    id: 'ilham-widyo-nugroho',
    name: 'Ilham Widyo Nugroho',
    nickname: 'Ilham',
    nim: '21507334002',
    studyProgram: 'D4 Teknik Elektronika',
    prodi: 'D4 Teknik Elektronika',
    faculty: 'Fakultas Vokasi (FV)',
    division: 'Ketua Tim',
    divisionSlug: 'leader',
    role: 'Ketua Tim (Team Leader)',
    subRole: 'Firmware & System Integration Lead',
    generation: 'Angkatan 2021',
    generationYear: 2024,
    yearsActive: [2022, 2023, 2024],
    specialization: [
      'Team Leadership & Strategy',
      'STM32F407 Firmware Architecture',
      'Serial Protocol & Mini PC Integration',
      'High-Speed Control Loops',
      'STM32',
      'CAD',
    ],
    skills: ['STM32', 'Firmware', 'Serial Protocol', 'Control Loops', 'Team Leadership', 'CAD'],
    bio: 'Ketua Tim Abhinaya UNY periode 2024. Bertanggung jawab atas kepemimpinan umum kontingen, arsitektur firmware STM32F407, dan integrasi komunikasi serial Mini PC dengan mikrokontroler.',
    quote: 'Adigang, adigung, adiguna.',
    image: '/images/members/2024_leader_ilham_widyo_nugroho_01.png',
    images: [
      '/images/members/2024_leader_ilham_widyo_nugroho_01.png',
      '/images/members/2024_leader_ilham_widyo_nugroho_02.png',
      '/images/members/2024_leader_ilham_widyo_nugroho_01.jpg',
      '/images/members/2024_mekanik_ilham_widyo_nugroho_01.jpg',
      '/images/members/2023_mekanik_ilham_widyo_nugroho_01.jpg',
      '/images/members/2022_mekanik_ilham_widyo_nugroho_01.jpg',
    ],
    photos: [
      '/images/members/2024_leader_ilham_widyo_nugroho_01.png',
      '/images/members/2024_leader_ilham_widyo_nugroho_02.png',
      '/images/members/2024_leader_ilham_widyo_nugroho_01.jpg',
      '/images/members/2024_mekanik_ilham_widyo_nugroho_01.jpg',
      '/images/members/2023_mekanik_ilham_widyo_nugroho_01.jpg',
      '/images/members/2022_mekanik_ilham_widyo_nugroho_01.jpg',
    ],
    badge: 'Ketua Tim',
    leadershipEra: 'Ketua Tim 2024',
    achievements: ['Juara 1 Regional I KRTMI 2024 (BPTI Puspresnas Kemendikbudristek)', 'Juara 2 Tingkat Nasional KRTMI 2024 (Puspresnas & UMS Surakarta)'],
    isLeader: true,
    socials: {
      linkedin: 'https://linkedin.com',
      instagram: 'https://instagram.com/ilhamwn_',
    },
  },
  {
    year: 2025,
    id: 'farhan-yuda-mahendra-leader-2025',
    name: 'Farhan Yuda Mahendra',
    nickname: 'Farhan',
    nim: '22518244007',
    studyProgram: 'S1 Pendidikan Teknik Mekatronika',
    prodi: 'S1 Pendidikan Teknik Mekatronika',
    faculty: 'Fakultas Teknik (FT)',
    division: 'Ketua Tim',
    divisionSlug: 'leader',
    role: 'Ketua Tim (Team Leader 2025)',
    subRole: 'Kinematics & Microcontroller Control Programmer',
    generation: 'Angkatan 2022',
    generationYear: 2025,
    yearsActive: [2023, 2024, 2025],
    specialization: [
      'Kinematics Control Algorithms',
      'Servo & Gripper Actuation Logic',
      'Sensor Feedback Loop Control',
      'Autonomous State Machine',
      'STM32',
      'CAD',
      'Mecanum',
      'YOLO',
    ],
    skills: ['Kinematics', 'STM32', 'CAD', 'Mecanum', 'YOLO', 'Team Leadership'],
    bio: 'Ketua Tim Abhinaya UNY periode 2025. Mengarahkan riset integrasi AI Computer Vision YOLOv11, aktuasi presisi mekatronika, dan persiapan kontingen menghadapi Kontes Robot Indonesia 2025.',
    quote: 'Pejuang hibernasi, pantang menyerah sebelum juara.',
    image: '/images/members/2024_program_farhan_yuda_mahendra_01.png',
    images: [
      '/images/members/2024_program_farhan_yuda_mahendra_01.png',
      '/images/members/2024_program_farhan_yuda_mahendra_02.png',
      '/images/members/2025_leader_farhan_yuda_mahendra_01.jpg',
      '/images/members/2025_program_farhan_yuda_mahendra_01.jpg',
      '/images/members/2024_program_farhan_yuda_mahendra_01.jpg',
      '/images/members/2023_program_farhan_yuda_mahendra_01.jpg',
    ],
    photos: [
      '/images/members/2024_program_farhan_yuda_mahendra_01.png',
      '/images/members/2024_program_farhan_yuda_mahendra_02.png',
      '/images/members/2025_leader_farhan_yuda_mahendra_01.jpg',
      '/images/members/2025_program_farhan_yuda_mahendra_01.jpg',
      '/images/members/2024_program_farhan_yuda_mahendra_01.jpg',
      '/images/members/2023_program_farhan_yuda_mahendra_01.jpg',
    ],
    badge: 'Ketua Tim',
    leadershipEra: 'Ketua Tim 2025',
    achievements: ['Kontingen Resmi KRI 2025', 'Riset Navigasi Otonom YOLOv11 & High Speed Mecanum'],
    isLeader: true,
    isActive: true,
    socials: {
      linkedin: 'https://linkedin.com',
      instagram: 'https://instagram.com/frhnyudaa',
    },
  },
];

/* ==========================================================================
   3. ALL-ERA MANAGERS SHOWCASE (2020 – 2025)
   ========================================================================== */

export const MANAGERS_SHOWCASE: ManagerHistoryItem[] = [
  {
    year: 2020,
    id: 'yuli-dwi-saputri-manager',
    name: 'Yuli Dwi Saputri',
    nickname: 'Yuli',
    nim: '19501241019',
    studyProgram: 'S1 Pendidikan Teknik Elektro',
    prodi: 'S1 Pendidikan Teknik Elektro',
    faculty: 'Fakultas Teknik (FT)',
    division: 'Manager',
    divisionSlug: 'manager',
    role: 'Lead Manager Perintis & Senior Advisor (Era 2020–2022)',
    subRole: 'Finance, Administration & Operational Procurement Lead',
    generation: 'Angkatan 2019',
    generationYear: 2020,
    yearsActive: [2020, 2021, 2022, 2023],
    specialization: [
      'Financial Budgeting & RAB',
      'Administrasi Kampus & Dikti',
      'Logistics Procurement',
      'Public Relations',
    ],
    skills: ['Budgeting', 'Administrasi', 'Sponsorship', 'Public Relations', 'Puspresnas Registration'],
    bio: 'Manager Tim Abhinaya UNY era perintisan (2020–2022). Membangun sistem tata kelola keuangan, administrasi birokrasi universitas, perizinan laboratorium masa pandemi, dan mengawal kontingen menyabet Juara 1 KRI Wilayah I 2021.',
    quote: 'Kerapihan administrasi adalah fondasi kelancaran riset.',
    image: '/images/members/2020_manager_yuli_dwi_saputri_01.jpg',
    images: [
      '/images/members/2020_manager_yuli_dwi_saputri_01.jpg',
      '/images/members/2021_manager_yuli_dwi_saputri_01.jpg',
      '/images/members/2022_manager_yuli_dwi_saputri_01.jpg',
      '/images/members/2023_manager_yuli_dwi_saputri_01.jpg',
    ],
    photos: [
      '/images/members/2020_manager_yuli_dwi_saputri_01.jpg',
      '/images/members/2021_manager_yuli_dwi_saputri_01.jpg',
      '/images/members/2022_manager_yuli_dwi_saputri_01.jpg',
      '/images/members/2023_manager_yuli_dwi_saputri_01.jpg',
    ],
    badge: 'Manager 2020–2022',
    leadershipEra: 'Manager Era 2020–2022',
    achievements: ['Tata Kelola Tim Perdana KRTMI 2020', 'Manajemen Kontingen Juara 1 KRI Wilayah I 2021', 'Regenerasi Manajerial Abhinaya'],
    isManager: true,
    socials: {
      instagram: 'https://instagram.com/youuly__',
    },
  },
  {
    year: 2023,
    id: 'mustika-wahyu-aprilia-manager',
    name: 'Mustika Wahyu Aprilia',
    nickname: 'Mustika',
    nim: '21306141050',
    studyProgram: 'S1 Fisika',
    prodi: 'S1 Fisika',
    faculty: 'Fakultas Matematika dan Ilmu Pengetahuan Alam (FMIPA)',
    division: 'Manager',
    divisionSlug: 'manager',
    role: 'Lead Manager Keuangan & Administrasi (Era 2022–2024)',
    subRole: 'Finance, Administration & Sponsorship Lead',
    generation: 'Angkatan 2021',
    generationYear: 2023,
    yearsActive: [2022, 2023, 2024],
    specialization: [
      'RAB & Financial Budgeting Tim Robotika',
      'Official University Correspondence',
      'Public Relations & Sponsorship',
      'Administrasi',
      'Fisika',
    ],
    skills: ['Financial Planning', 'Administrasi', 'Sponsorship', 'Logistics Management'],
    bio: 'Lead Manager Abhinaya UNY periode 2022–2024. Mengelola alokasi anggaran riset, administrasi kontingen KRI Nasional USM Semarang & UMS Surakarta, serta perizinan universitas.',
    quote: 'Ketelitian anggaran adalah nafas keberlanjutan tim riset.',
    image: '/images/members/2024_manager_mustika_wahyu_aprilia_01.png',
    images: [
      '/images/members/2024_manager_mustika_wahyu_aprilia_01.png',
      '/images/members/2024_manager_mustika_wahyu_aprilia_02.png',
      '/images/members/2023_manager_mustika_wahyu_aprilia_01.jpg',
      '/images/members/2022_manager_mustika_wahyu_aprilia_01.jpg',
    ],
    photos: [
      '/images/members/2024_manager_mustika_wahyu_aprilia_01.png',
      '/images/members/2024_manager_mustika_wahyu_aprilia_02.png',
      '/images/members/2023_manager_mustika_wahyu_aprilia_01.jpg',
      '/images/members/2022_manager_mustika_wahyu_aprilia_01.jpg',
    ],
    badge: 'Manager 2022–2024',
    leadershipEra: 'Manager Era 2022–2024',
    achievements: ['Manajemen Kontingen Juara 3 KRI Wilayah I 2023', 'Pengelolaan Logistik Kontingen KRI 2024 UMS Surakarta'],
    isManager: true,
    socials: {
      instagram: 'https://instagram.com/abhinaya.uny',
      linkedin: 'https://linkedin.com',
    },
  },
  {
    year: 2024,
    id: 'rose-pita-nur-afifah-manager',
    name: 'Rose Pita Nur Afifah',
    nickname: 'Rose Pita',
    nim: '22518241042',
    studyProgram: 'S1 Pendidikan Teknik Mekatronika',
    prodi: 'S1 Pendidikan Teknik Mekatronika',
    faculty: 'Fakultas Teknik (FT)',
    division: 'Manager',
    divisionSlug: 'manager',
    role: 'Koordinator Manager & Media Directorate (Era 2024–2025)',
    subRole: 'Social Media Branding, Official Visual Identity & Team Coordination',
    generation: 'Angkatan 2022',
    generationYear: 2024,
    yearsActive: [2024, 2025],
    specialization: [
      'Social Media Branding (@abhinaya.uny)',
      'Match Photography & Visual Content',
      'Visual Identity & Graphic Design',
      'Administrasi',
      'Mekatronika',
    ],
    skills: ['Social Media', 'Visual Branding', 'Photography', 'Administrasi', 'Mekatronika'],
    bio: 'Koordinator Manager Abhinaya UNY periode 2024–2025. Mengarahkan branding digital media sosial resmi (@abhinaya.uny), publikasi visual laga KRI, dan koordinasi operasional kontingen aktif.',
    quote: 'Life is a stage, and we shape our best story.',
    image: '/images/members/2024_manager_rose_pita_nur_afifah_01.png',
    images: [
      '/images/members/2024_manager_rose_pita_nur_afifah_01.png',
      '/images/members/2024_manager_rose_pita_nur_afifah_02.png',
      '/images/members/2025_manager_rose_pita_nur_afifah_01.jpg',
      '/images/members/2024_manager_rose_pita_nur_afifah_01.jpg',
    ],
    photos: [
      '/images/members/2024_manager_rose_pita_nur_afifah_01.png',
      '/images/members/2024_manager_rose_pita_nur_afifah_02.png',
      '/images/members/2025_manager_rose_pita_nur_afifah_01.jpg',
      '/images/members/2024_manager_rose_pita_nur_afifah_01.jpg',
    ],
    badge: 'Manager 2024–2025',
    leadershipEra: 'Manager Era 2024–2025',
    achievements: ['Ekspansi Branding Media Sosial Resmi @abhinaya.uny', 'Manajemen Kontingen KRI 2024 & 2025'],
    isManager: true,
    isActive: true,
    socials: {
      instagram: 'https://instagram.com/_takrspt',
    },
  },
  {
    year: 2025,
    id: 'zelfa-nafisah-zalna-manager',
    name: 'Zelfa Nafisah Zalna',
    nickname: 'Zelfa',
    nim: '23030730048',
    studyProgram: 'S1 Fisika',
    prodi: 'S1 Fisika',
    faculty: 'Fakultas Matematika dan Ilmu Pengetahuan Alam (FMIPA)',
    division: 'Manager',
    divisionSlug: 'manager',
    role: 'Manager Keuangan & Administrasi Operasional (Era 2025)',
    subRole: 'Finance, Administrative Documentation & Logistics Lead',
    generation: 'Angkatan 2023',
    generationYear: 2025,
    yearsActive: [2025],
    specialization: [
      'Administrasi Kampus & Ormawa',
      'Financial Accounting & RAB',
      'Logistics & Team Welfare',
      'Documentation',
    ],
    skills: ['Accounting', 'Administrasi', 'Logistics', 'Documentation'],
    bio: 'Manager Keuangan & Administrasi aktif periode 2025. Mengawal pembukuan dana riset, pengadaan komponen, dan registrasi berkas kontingen KRI 2025.',
    quote: 'Dedikasi di balik layar mengantarkan tim menuju podium juara.',
    image: '/images/members/2025_manager_zelfa_nafisah_zalna_01.jpg',
    images: [
      '/images/members/2025_manager_zelfa_nafisah_zalna_01.jpg',
    ],
    photos: [
      '/images/members/2025_manager_zelfa_nafisah_zalna_01.jpg',
    ],
    badge: 'Manager 2025',
    leadershipEra: 'Manager Era 2025',
    achievements: ['Manajemen Kontingen Aktif KRI 2025', 'Tata Kelola Administrasi Tim 2025'],
    isManager: true,
    isActive: true,
    socials: {
      instagram: 'https://instagram.com/abhinaya.uny',
    },
  },
];

/* ==========================================================================
   4. ACTIVE TECHNICAL SQUAD (PROGRAMMER, ELEKTRONIK, MEKANIK)
   ========================================================================== */

export const ACTIVE_TECHNICAL_SQUAD = {
  program: [
    {
      id: 'tri-wahyu-handoyo',
      name: 'Tri Wahyu Handoyo',
      nickname: 'Wahyu',
      nim: '22518241023',
      studyProgram: 'S1 Pendidikan Teknik Mekatronika',
      prodi: 'S1 Pendidikan Teknik Mekatronika',
      faculty: 'Fakultas Teknik (FT)',
      division: 'Program' as DivisionType,
      divisionSlug: 'program' as DivisionSlug,
      role: 'Program (Lead AI, Computer Vision & Web Systems / Lead Programmer)',
      subRole: 'Autonomous Navigation & AI Vision Specialist',
      generation: 'Angkatan 2022',
      generationYear: 2025,
      yearsActive: [2023, 2024, 2025],
      specialization: [
        'Deep Learning & YOLO Object Detection',
        'Mecanum Omnidirectional Kinematics',
        'Autonomous Navigation & Trajectory Planning',
        'Computer Vision & Mini PC Optimization',
        'Next.js Full-Stack Web Portal',
        'YOLO',
        'STM32',
        'Mecanum',
        'PCB',
        'CAD',
      ],
      skills: ['YOLO', 'Python', 'OpenCV', 'Mecanum', 'STM32', 'Next.js', 'Autonomous Navigation', 'Computer Vision'],
      bio: 'Memimpin riset algoritma deteksi objek sampah berbasis deep learning / YOLO, pemetaan lintasan otonom roda mecanum, komputasi edge pada Mini PC, dan perancangan portal web resmi Abhinaya UNY.',
      quote: 'Anti turu, standby setiap waktu',
      image: '/images/members/2024_program_tri_wahyu_handoyo_01.png',
      images: [
        '/images/members/2024_program_tri_wahyu_handoyo_01.png',
        '/images/members/2024_program_tri_wahyu_handoyo_02.png',
        '/images/members/2025_program_tri_wahyu_handoyo_01.jpg',
        '/images/members/2024_program_tri_wahyu_handoyo_01.jpg',
        '/images/members/2023_program_tri_wahyu_handoyo_01.jpg',
      ],
      photos: [
        '/images/members/2024_program_tri_wahyu_handoyo_01.png',
        '/images/members/2024_program_tri_wahyu_handoyo_02.png',
        '/images/members/2025_program_tri_wahyu_handoyo_01.jpg',
        '/images/members/2024_program_tri_wahyu_handoyo_01.jpg',
        '/images/members/2023_program_tri_wahyu_handoyo_01.jpg',
      ],
      badge: 'Lead Program & AI',
      isActive: true,
      socials: {
        github: 'https://github.com/abhinaya-uny',
        linkedin: 'https://linkedin.com',
        instagram: 'https://instagram.com/triwahyu45',
      },
    },
    {
      id: 'farhan-yuda-mahendra',
      name: 'Farhan Yuda Mahendra',
      nickname: 'Farhan',
      nim: '22518244007',
      studyProgram: 'S1 Pendidikan Teknik Mekatronika',
      prodi: 'S1 Pendidikan Teknik Mekatronika',
      faculty: 'Fakultas Teknik (FT)',
      division: 'Program' as DivisionType,
      divisionSlug: 'program' as DivisionSlug,
      role: 'Program (Embedded Control & Kinematika)',
      subRole: 'Kinematics & Microcontroller Control Programmer',
      generation: 'Angkatan 2022',
      generationYear: 2025,
      yearsActive: [2023, 2024, 2025],
      specialization: [
        'Kinematics Control Algorithms',
        'Servo & Gripper Actuation Logic',
        'Sensor Feedback Loop Control',
        'Autonomous State Machine',
        'STM32 Microcontroller Programming',
        'YOLO',
        'STM32',
        'CAD',
        'Mecanum',
      ],
      skills: ['STM32', 'C/C++', 'Kinematics', 'State Machine', 'Gripper', 'CAD'],
      bio: 'Fokus pada pengembangan logika state-machine kendali robot, pemrograman pergerakan aktuator capit (gripper), dan sinkronisasi feedback sensor lintasan arena.',
      quote: 'Pejuang hibernasi',
      image: '/images/members/2024_program_farhan_yuda_mahendra_01.png',
      images: [
        '/images/members/2024_program_farhan_yuda_mahendra_01.png',
        '/images/members/2024_program_farhan_yuda_mahendra_02.png',
        '/images/members/2025_leader_farhan_yuda_mahendra_01.jpg',
        '/images/members/2025_program_farhan_yuda_mahendra_01.jpg',
        '/images/members/2024_program_farhan_yuda_mahendra_01.jpg',
        '/images/members/2023_program_farhan_yuda_mahendra_01.jpg',
      ],
      photos: [
        '/images/members/2024_program_farhan_yuda_mahendra_01.png',
        '/images/members/2024_program_farhan_yuda_mahendra_02.png',
        '/images/members/2025_leader_farhan_yuda_mahendra_01.jpg',
        '/images/members/2025_program_farhan_yuda_mahendra_01.jpg',
        '/images/members/2024_program_farhan_yuda_mahendra_01.jpg',
        '/images/members/2023_program_farhan_yuda_mahendra_01.jpg',
      ],
      badge: 'Program & Kontrol',
      isLeader: true,
      isActive: true,
      socials: {
        linkedin: 'https://linkedin.com',
        instagram: 'https://instagram.com/frhnyudaa',
      },
    },
    {
      id: 'hanif-nurkhalis',
      name: 'Hanif NurKhalis',
      nickname: 'Hanif',
      nim: '23050430023',
      studyProgram: 'S1 Pendidikan Teknik Elektronika',
      prodi: 'S1 Pendidikan Teknik Elektronika',
      faculty: 'Fakultas Teknik (FT)',
      division: 'Program' as DivisionType,
      divisionSlug: 'program' as DivisionSlug,
      role: 'Program (Sensor Integration & Serial Interfacing)',
      subRole: 'Sensor Integration & Strategy Scripting Programmer',
      generation: 'Angkatan 2023',
      generationYear: 2025,
      yearsActive: [2025],
      specialization: [
        'Sensor Integration & Calibration',
        'Serial Communication Interfacing',
        'Strategy Scripting & State Simulation',
        'Autonomous Navigation',
        'STM32',
      ],
      skills: ['C++', 'Python', 'Serial Protocol', 'Sensor Calibration', 'STM32'],
      bio: 'Bertanggung jawab atas integrasi sensor serial, kalibrasi jarak arena, scripting logika manuver robot otonom, dan telemetry testing.',
      quote: 'Kode yang efisien lahir dari algoritma yang presisi.',
      image: '/images/members/2025_program_hanif_nurkhalis_01.jpg',
      images: [
        '/images/members/2025_program_hanif_nurkhalis_01.jpg',
      ],
      photos: [
        '/images/members/2025_program_hanif_nurkhalis_01.jpg',
      ],
      badge: 'Programmer',
      isActive: true,
      socials: {
        instagram: 'https://instagram.com/hanif__00',
      },
    },
    {
      id: 'hisyam-yasid-pratowo',
      name: 'Hisyam Yasid Pratowo',
      nickname: 'Hisyam',
      nim: '24090620010',
      studyProgram: 'D4 Teknik Elektronika',
      prodi: 'D4 Teknik Elektronika',
      faculty: 'Fakultas Vokasi (FV)',
      division: 'Program' as DivisionType,
      divisionSlug: 'program' as DivisionSlug,
      role: 'Program (Vision Pipeline & Mini PC Linux Optimization)',
      subRole: 'Computer Vision & Edge Computing Specialist',
      generation: 'Angkatan 2024',
      generationYear: 2025,
      yearsActive: [2025],
      specialization: [
        'Mini PC Linux Environment Setup',
        'Computer Vision Pipeline Optimization',
        'Arena Telemetry & Logging',
        'Computer Vision',
        'YOLO',
      ],
      skills: ['Linux', 'OpenCV', 'Python', 'Computer Vision', 'YOLO'],
      bio: 'Fokus pada konfigurasi lingkungan Linux Mini PC, pengolahan citra arena, penyesuaian frame-rate kamera deteksi, dan logging data perlombaan.',
      quote: 'Optimasi tanpa henti untuk performa terbaik.',
      image: '/images/members/2025_program_hisyam_yasid_pratowo_01.jpg',
      images: [
        '/images/members/2025_program_hisyam_yasid_pratowo_01.jpg',
      ],
      photos: [
        '/images/members/2025_program_hisyam_yasid_pratowo_01.jpg',
      ],
      badge: 'Programmer',
      isActive: true,
      socials: {
        instagram: 'https://instagram.com/hsymptw._',
      },
    },
  ],

  elektronik: [
    {
      id: 'ikhsan-nurrohman',
      name: 'Ikhsan Nurrohman',
      nickname: 'Ikhsan',
      nim: '22538141004',
      studyProgram: 'S1 Teknik Elektro',
      prodi: 'S1 Teknik Elektro',
      faculty: 'Fakultas Teknik (FT)',
      division: 'Elektronik' as DivisionType,
      divisionSlug: 'elektronik' as DivisionSlug,
      role: 'Elektronik (Telemetri & Wireless Systems)',
      subRole: 'Telemetry & Wireless Systems Specialist',
      generation: 'Angkatan 2022',
      generationYear: 2025,
      yearsActive: [2024, 2025],
      specialization: [
        'Power Distribution Board (PDB)',
        'ESP32 Wireless Data Telemetry',
        'Bluetooth DualShock 4 Controller Bridge',
        'Real-Time Battery Voltage Monitoring',
        'Power Noise Choke & Filtering',
        'Power Distribution Board',
        'PCB',
        'STM32',
      ],
      skills: ['ESP32', 'Bluetooth', 'PDB Design', 'Power Distribution Board', 'PCB', 'STM32'],
      bio: 'Mengembangkan sistem komunikasi wireless ESP32, integrasi kendali darurat Bluetooth DualShock 4, monitoring telemetri tegangan baterai real-time, dan filtering derau daya.',
      quote: 'Always connected, zero packet loss.',
      image: '/images/members/2024_elektronik_ikhsan_nurrohman_01.png',
      images: [
        '/images/members/2024_elektronik_ikhsan_nurrohman_01.png',
        '/images/members/2024_elektronik_ikhsan_nurrohman_02.png',
        '/images/members/2025_elektronik_ikhsan_nurrohman_01.jpg',
        '/images/members/2024_elektronik_ikhsan_nurrohman_01.jpg',
      ],
      photos: [
        '/images/members/2024_elektronik_ikhsan_nurrohman_01.png',
        '/images/members/2024_elektronik_ikhsan_nurrohman_02.png',
        '/images/members/2025_elektronik_ikhsan_nurrohman_01.jpg',
        '/images/members/2024_elektronik_ikhsan_nurrohman_01.jpg',
      ],
      badge: 'Telemetri & Wireless',
      isActive: true,
      socials: {
        linkedin: 'https://linkedin.com',
        instagram: 'https://instagram.com/ikhsan.omn_1.0',
      },
    },
    {
      id: 'abdul-hasib-adzdzin-nuha',
      name: 'Abdul Hasib Adzdzin Nuha',
      nickname: 'Hasib',
      nim: '22502241014',
      studyProgram: 'S1 Pendidikan Teknik Elektronika',
      prodi: 'S1 Pendidikan Teknik Elektronika',
      faculty: 'Fakultas Teknik (FT)',
      division: 'Elektronik' as DivisionType,
      divisionSlug: 'elektronik' as DivisionSlug,
      role: 'Elektronik (PCB Design & Sensor Wiring)',
      subRole: 'PCB Designer & Sensor Interface Engineer',
      generation: 'Angkatan 2022',
      generationYear: 2025,
      yearsActive: [2023, 2024, 2025],
      specialization: [
        'Autodesk EAGLE & KiCad Custom Shield PCB',
        'Optical Rotary Encoder Signal Conditioning',
        'Proximity & Limit Switch Integration',
        'EMI / Noise Grounding Plane Design',
        'PCB',
        'Power Distribution Board',
      ],
      skills: ['Autodesk EAGLE', 'KiCad', 'EasyEDA', 'PCB', 'Sensor Wiring', 'Signal Conditioning', 'Power Distribution Board'],
      bio: 'Merancang skematik dan layout custom PCB shield STM32, sirkuit pengkondisi sinyal rotary encoder optik, serta instalasi sensor proximity & limit switch.',
      quote: 'Follow your dream',
      image: '/images/members/2024_elektronik_abdul_hasib_adzdzin_nuha_01.png',
      images: [
        '/images/members/2024_elektronik_abdul_hasib_adzdzin_nuha_01.png',
        '/images/members/2024_elektronik_abdul_hasib_adzdzin_nuha_02.png',
        '/images/members/2025_elektronik_abdul_hasib_adzdzin_nuha_01.jpg',
        '/images/members/2024_elektronik_abdul_hasib_adzdzin_nuha_01.jpg',
        '/images/members/2023_elektronik_abdul_hasib_adzdzin_nuha_01.jpg',
      ],
      photos: [
        '/images/members/2024_elektronik_abdul_hasib_adzdzin_nuha_01.png',
        '/images/members/2024_elektronik_abdul_hasib_adzdzin_nuha_02.png',
        '/images/members/2025_elektronik_abdul_hasib_adzdzin_nuha_01.jpg',
        '/images/members/2024_elektronik_abdul_hasib_adzdzin_nuha_01.jpg',
        '/images/members/2023_elektronik_abdul_hasib_adzdzin_nuha_01.jpg',
      ],
      badge: 'PCB & Wiring',
      isActive: true,
      socials: {
        linkedin: 'https://linkedin.com',
        instagram: 'https://instagram.com/hasibnuha',
      },
    },
    {
      id: 'agus-bagaskoro',
      name: 'Agus Bagaskoro',
      nickname: 'Bagas',
      nim: '21501244039',
      studyProgram: 'S1 Pendidikan Teknik Elektro',
      prodi: 'S1 Pendidikan Teknik Elektro',
      faculty: 'Fakultas Teknik (FT)',
      division: 'Elektronik' as DivisionType,
      divisionSlug: 'elektronik' as DivisionSlug,
      role: 'Elektronik (Lead Hardware & Power Management)',
      subRole: 'Electrical Hardware & Power Management Lead',
      generation: 'Angkatan 2021',
      generationYear: 2024,
      yearsActive: [2022, 2023, 2024],
      specialization: [
        'High-Current Power Distribution Board (PDB)',
        'Emergency Stop (E-Stop) Hardware Cutoff',
        'BTS7960 High-Power H-Bridge Drivers',
        'Multi-Rail Voltage Regulation (24V/12V/5V)',
        'Power Distribution Board',
        'PCB',
      ],
      skills: ['Power Distribution Board', 'H-Bridge', 'Battery Safety', 'PCB', 'Hardware QA'],
      bio: 'Memimpin divisi elektrik dalam perancangan Power Distribution Board (PDB) berarus tinggi, sistem proteksi darurat (E-Stop), isolasi optocoupler driver motor BTS7960, dan manajemen baterai.',
      quote: 'Focus on accuracy, power will follow.',
      image: '/images/members/2024_elektronik_agus_bagaskoro_01.png',
      images: [
        '/images/members/2024_elektronik_agus_bagaskoro_01.png',
        '/images/members/2024_elektronik_agus_bagaskoro_02.png',
        '/images/members/2024_elektronik_agus_bagaskoro_01.jpg',
        '/images/members/2023_elektronik_agus_bagaskoro_01.jpg',
        '/images/members/2022_elektronik_agus_bagaskoro_01.jpg',
      ],
      photos: [
        '/images/members/2024_elektronik_agus_bagaskoro_01.png',
        '/images/members/2024_elektronik_agus_bagaskoro_02.png',
        '/images/members/2024_elektronik_agus_bagaskoro_01.jpg',
        '/images/members/2023_elektronik_agus_bagaskoro_01.jpg',
        '/images/members/2022_elektronik_agus_bagaskoro_01.jpg',
      ],
      badge: 'Lead Elektronik',
      socials: {
        linkedin: 'https://linkedin.com',
        instagram: 'https://instagram.com/abhinaya.uny',
      },
    },
    {
      id: 'aryasetya-maulana-swasdika',
      name: 'Aryasetya Maulana Swasdika',
      nickname: 'Arya',
      nim: '24051030016',
      studyProgram: 'S1 Teknik Elektro',
      prodi: 'S1 Teknik Elektro',
      faculty: 'Fakultas Teknik (FT)',
      division: 'Elektronik' as DivisionType,
      divisionSlug: 'elektronik' as DivisionSlug,
      role: 'Elektronik (Hardware & Power Systems)',
      subRole: 'Power Distribution & Actuator Driver Specialist',
      generation: 'Angkatan 2024',
      generationYear: 2025,
      yearsActive: [2025],
      specialization: [
        'Power Distribution Board',
        'Actuator Drivers',
        'Wiring Harness QA',
        'Battery Management Systems',
        'PCB',
      ],
      skills: ['Power Distribution Board', 'Wiring QA', 'Actuator Drivers', 'PCB'],
      bio: 'Bertanggung jawab pada perakitan jalur distribusi daya robot, manajemen wiring harness berkecepatan tinggi, dan pengujian keandalan driver aktuator.',
      quote: 'Kerapian kelistrikan mencegah segala kendala di arena.',
      image: '/images/members/2025_elektronik_aryasetya_maulana_swasdika_01.jpg',
      images: [
        '/images/members/2025_elektronik_aryasetya_maulana_swasdika_01.jpg',
      ],
      photos: [
        '/images/members/2025_elektronik_aryasetya_maulana_swasdika_01.jpg',
      ],
      badge: 'Elektronik Hardware',
      isActive: true,
      socials: {
        instagram: 'https://instagram.com/setya_ary_',
      },
    },
    {
      id: 'naufal-farros-zainal-arifin',
      name: 'Naufal Farros Zainal Arifin',
      nickname: 'Farros',
      nim: '23090620033',
      studyProgram: 'D4 Teknik Elektronika',
      prodi: 'D4 Teknik Elektronika',
      faculty: 'Fakultas Vokasi (FV)',
      division: 'Elektronik' as DivisionType,
      divisionSlug: 'elektronik' as DivisionSlug,
      role: 'Elektronik (Signal Conditioning & Safety Rails)',
      subRole: 'Sensor Wiring & Emergency Safety Specialist',
      generation: 'Angkatan 2023',
      generationYear: 2025,
      yearsActive: [2025],
      specialization: [
        'Sensor Signal Conditioning',
        'Emergency Cutoff (E-Stop)',
        'Microcontroller Power Rails',
        'Noise Suppression & Grounding',
        'PCB',
      ],
      skills: ['Signal Conditioning', 'E-Stop', 'Sensor Wiring', 'PCB'],
      bio: 'Mengembangkan proteksi tegangan logika mikroprosesor, sirkuit isolasi optocoupler, dan penapisan noise sensor pada sirkuit tematik.',
      quote: 'Sinyal bersih, respon sistem cepat.',
      image: '/images/members/2025_elektronik_naufal_farros_zainal_arifin_01.jpg',
      images: [
        '/images/members/2025_elektronik_naufal_farros_zainal_arifin_01.jpg',
      ],
      photos: [
        '/images/members/2025_elektronik_naufal_farros_zainal_arifin_01.jpg',
      ],
      badge: 'Elektronik Hardware',
      isActive: true,
      socials: {
        instagram: 'https://instagram.com/farros_555',
      },
    },
  ],

  mekanik: [
    {
      id: 'rionaldi-nugroho',
      name: 'Rionaldi Nugroho',
      nickname: 'Rio',
      nim: '23090620088',
      studyProgram: 'D4 Teknik Elektronika',
      prodi: 'D4 Teknik Elektronika',
      faculty: 'Fakultas Vokasi (FV)',
      division: 'Mekanik' as DivisionType,
      divisionSlug: 'mekanik' as DivisionSlug,
      role: 'Mekanik (Hardware Assembly & Mechanical QA)',
      subRole: 'Mechanical Assembly & QA Specialist',
      generation: 'Angkatan 2023',
      generationYear: 2025,
      yearsActive: [2024, 2025],
      specialization: [
        'Mekatronika Hardware Assembly',
        'Chassis Fitment & Tolerance QA',
        'LiFePO4 Power Station Mounting',
        'Precision Hardware Diagnostics',
        'CAD',
        'Gripper',
      ],
      skills: ['Hardware Assembly', 'Tolerance QA', 'CAD', 'Gripper', 'Mounting Systems'],
      bio: 'Mahasiswa Teknik Elektronika yang berfokus pada perakitan mekatronika dan mekanik sasis robot, mounting bracket baterai, toleransi perakitan, dan verifikasi struktur fisik robot.',
      quote: 'Ikan tidak terbang dan burung tidak berenang, kecuali pinguin',
      image: '/images/members/2024_mekanik_rionaldi_nugroho_01.png',
      images: [
        '/images/members/2024_mekanik_rionaldi_nugroho_01.png',
        '/images/members/2024_mekanik_rionaldi_nugroho_02.png',
        '/images/members/2025_mekanik_rionaldi_nugroho_01.jpg',
        '/images/members/2024_mekanik_rionaldi_nugroho_01.jpg',
      ],
      photos: [
        '/images/members/2024_mekanik_rionaldi_nugroho_01.png',
        '/images/members/2024_mekanik_rionaldi_nugroho_02.png',
        '/images/members/2025_mekanik_rionaldi_nugroho_01.jpg',
        '/images/members/2024_mekanik_rionaldi_nugroho_01.jpg',
      ],
      badge: 'Mekanik QA',
      isActive: true,
      socials: {
        linkedin: 'https://linkedin.com',
        instagram: 'https://instagram.com/rionaldi.nu',
      },
    },
    {
      id: 'caesar-sokma-langgeng',
      name: 'Caesar Sokma Langgeng',
      nickname: 'Caesar',
      nim: '21539144005',
      studyProgram: 'S1 Teknik Manufaktur',
      prodi: 'S1 Teknik Manufaktur',
      faculty: 'Fakultas Teknik (FT)',
      division: 'Mekanik' as DivisionType,
      divisionSlug: 'mekanik' as DivisionSlug,
      role: 'Mekanik (CAD & Laser Fabrication Engineer)',
      subRole: 'Fabrication & Rapid Prototyping Engineer',
      generation: 'Angkatan 2021',
      generationYear: 2025,
      yearsActive: [2024, 2025],
      specialization: [
        'High-Precision Laser Cutting',
        'Planetary Gearbox Motor Bracket',
        'Rapid Prototyping & 3D Print',
        'Structural Joint Optimization',
        'CAD',
        'Gripper',
      ],
      skills: ['CAD', 'Laser Cutting', '3D Print', 'SolidWorks', 'Gripper'],
      bio: 'Fokus pada fabrikasi laser cutting akrilik presisi, manufaktur bracket motor gearbox planetary bertorsi tinggi, dan optimasi rigiditas struktural komponen robot.',
      quote: 'Sometimes you win, sometimes you learn.',
      image: '/images/members/2024_mekanik_caesar_sokma_langgeng_01.png',
      images: [
        '/images/members/2024_mekanik_caesar_sokma_langgeng_01.png',
        '/images/members/2024_mekanik_caesar_sokma_langgeng_02.png',
        '/images/members/2025_mekanik_caesar_sokma_langgeng_01.jpg',
        '/images/members/2024_mekanik_caesar_sokma_langgeng_01.jpg',
      ],
      photos: [
        '/images/members/2024_mekanik_caesar_sokma_langgeng_01.png',
        '/images/members/2024_mekanik_caesar_sokma_langgeng_02.png',
        '/images/members/2025_mekanik_caesar_sokma_langgeng_01.jpg',
        '/images/members/2024_mekanik_caesar_sokma_langgeng_01.jpg',
      ],
      badge: 'CAD & Fabrikasi',
      isActive: true,
      socials: {
        linkedin: 'https://linkedin.com',
        instagram: 'https://instagram.com/langgngcaesr',
      },
    },
    {
      id: 'adhiyatma-fatya-ramadhani',
      name: 'Adhiyatma Fatya Ramadhani',
      nickname: 'Adhit',
      nim: '23090520026',
      studyProgram: 'D4 Teknik Elektro',
      prodi: 'D4 Teknik Elektro',
      faculty: 'Fakultas Vokasi (FV)',
      division: 'Mekanik' as DivisionType,
      divisionSlug: 'mekanik' as DivisionSlug,
      role: 'Mekanik (CNC Milling & Sheet Metal Fabrication)',
      subRole: 'CNC Machining & Structural Metal Engineer',
      generation: 'Angkatan 2023',
      generationYear: 2025,
      yearsActive: [2025],
      specialization: [
        'CNC Milling',
        'Sheet Metal Bending',
        'Structural Chassis Assembly',
        'Tolerance Measurement',
        'CAD',
      ],
      skills: ['CNC Milling', 'Sheet Metal', 'CAD', 'Chassis Assembly'],
      bio: 'Spesialis dalam pemesinan CNC milling plat duralium, pembentukan sheet metal rangka robot, dan penyelarasan toleransi sudut transmisi mekanik.',
      quote: 'Presisi dalam fabrikasi, tangguh di arena laga.',
      image: '/images/members/2025_mekanik_adhiyatma_fatya_ramadhani_01.jpg',
      images: [
        '/images/members/2025_mekanik_adhiyatma_fatya_ramadhani_01.jpg',
      ],
      photos: [
        '/images/members/2025_mekanik_adhiyatma_fatya_ramadhani_01.jpg',
      ],
      badge: 'Mekanik Manufaktur',
      isActive: true,
      socials: {
        instagram: 'https://instagram.com/ramadhannii__',
      },
    },
    {
      id: 'andika-nanda-wijaya',
      name: 'Andika Nanda Wijaya',
      nickname: 'Andika',
      nim: '23050730031',
      studyProgram: 'S1 Pendidikan Teknik Mesin',
      prodi: 'S1 Pendidikan Teknik Mesin',
      faculty: 'Fakultas Teknik (FT)',
      division: 'Mekanik' as DivisionType,
      divisionSlug: 'mekanik' as DivisionSlug,
      role: 'Mekanik (Precision Lathe & Gripper Linkage Fabrication)',
      subRole: 'Lathe Turning & Mechanism Fitment Engineer',
      generation: 'Angkatan 2023',
      generationYear: 2025,
      yearsActive: [2025],
      specialization: [
        'Precision Lathe Turning',
        'Mechanical Fitment & Bushing',
        'Gripper Linkage Fabrication',
        'CAD',
        'Gripper',
      ],
      skills: ['Lathe Turning', 'Gripper Linkage', 'CAD', 'Mechanical Fitment'],
      bio: 'Berfokus pada pemesinan bubut presisi poros roda, pembuatan bushing & linkage mekanisme capit (gripper), dan perakitan mekanisme gerak otonom.',
      quote: 'Tiap milimeter ketepatan adalah kunci kemenangan.',
      image: '/images/members/2025_mekanik_andika_nanda_wijaya_01.jpg',
      images: [
        '/images/members/2025_mekanik_andika_nanda_wijaya_01.jpg',
      ],
      photos: [
        '/images/members/2025_mekanik_andika_nanda_wijaya_01.jpg',
      ],
      badge: 'Mekanik Fabrikasi',
      isActive: true,
      socials: {
        instagram: 'https://instagram.com/abhinaya.uny',
      },
    },
    {
      id: 'kharisma-putra-mahardika',
      name: 'Kharisma Putra Mahardhika',
      nickname: 'Kharisma',
      nim: '24090620053',
      studyProgram: 'D4 Teknik Elektronika',
      prodi: 'D4 Teknik Elektronika',
      faculty: 'Fakultas Vokasi (FV)',
      division: 'Mekanik' as DivisionType,
      divisionSlug: 'mekanik' as DivisionSlug,
      role: 'Mekanik (3D CAD Modeling & Kinematic Prototyping)',
      subRole: '3D Prototyping & CAD Modeler',
      generation: 'Angkatan 2024',
      generationYear: 2025,
      yearsActive: [2025],
      specialization: [
        'SolidWorks 3D CAD Modeling',
        'Rapid Prototyping 3D Print',
        'Kinematics Tolerance Testing',
        'CAD',
        'Gripper',
      ],
      skills: ['SolidWorks', '3D Print', 'CAD', 'Kinematics Prototyping', 'Gripper'],
      bio: 'Mengembangkan pemodelan CAD 3D SolidWorks komponen mekanik, simulasi kinematika lengan pengambil sampah, dan 3D printing prototipe cepat.',
      quote: 'Imaginasi diwujudkan dalam geometri mekanika.',
      image: '/images/members/2025_mekanik_kharisma_putra_mahardika_01.jpg',
      images: [
        '/images/members/2025_mekanik_kharisma_putra_mahardika_01.jpg',
      ],
      photos: [
        '/images/members/2025_mekanik_kharisma_putra_mahardika_01.jpg',
      ],
      badge: 'CAD & 3D Prototyping',
      isActive: true,
      socials: {
        instagram: 'https://instagram.com/kryz_project',
      },
    },
    {
      id: 'muhamad-ilham-sony',
      name: 'Muhamad Ilham Sony',
      nickname: 'Sony',
      nim: '20539144016',
      studyProgram: 'S1 Teknik Manufaktur',
      prodi: 'S1 Teknik Manufaktur',
      faculty: 'Fakultas Teknik (FT)',
      division: 'Mekanik' as DivisionType,
      divisionSlug: 'mekanik' as DivisionSlug,
      role: 'Mekanik (Lead CAD & Precision Machining)',
      subRole: 'Manufacturing & Fabrication Lead',
      generation: 'Angkatan 2020',
      generationYear: 2024,
      yearsActive: [2023, 2024],
      specialization: [
        'SolidWorks 3D CAD Modeling',
        'Aluminium 6061 Precision Milling',
        'Chassis Structural Rigidity',
        'Lathe & CNC Fabrication',
        'CAD',
        'Gripper',
      ],
      skills: ['SolidWorks', 'Aluminium 6061', 'CNC Milling', 'CAD', 'Gripper'],
      bio: 'Memimpin divisi mekanik dalam fabrikasi presisi plat aluminium 6061, pemesinan bubut & milling sasis utama robot, serta memastikan durabilitas mekanik saat bermanuver di arena KRTMI.',
      quote: 'Bentar, masih cari quote',
      image: '/images/members/2024_mekanik_muhamad_ilham_sony_01.png',
      images: [
        '/images/members/2024_mekanik_muhamad_ilham_sony_01.png',
        '/images/members/2024_mekanik_muhamad_ilham_sony_02.png',
        '/images/members/2024_mekanik_muhamad_ilham_sony_01.jpg',
        '/images/members/2023_mekanik_muhamad_ilham_sony_01.jpg',
      ],
      photos: [
        '/images/members/2024_mekanik_muhamad_ilham_sony_01.png',
        '/images/members/2024_mekanik_muhamad_ilham_sony_02.png',
        '/images/members/2024_mekanik_muhamad_ilham_sony_01.jpg',
        '/images/members/2023_mekanik_muhamad_ilham_sony_01.jpg',
      ],
      badge: 'Lead Mekanik',
      socials: {
        linkedin: 'https://linkedin.com',
        instagram: 'https://instagram.com/abhinaya.uny',
      },
    },
  ],

  advisors: DOSEN_PEMBIMBING_LIST,
};

/* ==========================================================================
   5. ALUMNI & GENERATION ARCHIVES (2020 – 2025)
   ========================================================================== */

export const ALUMNI_GENERATIONS: GenerationArchive[] = [
  // GENERATION 2020
  {
    year: 2020,
    contingentName: 'Kontingen Abhinaya UNY 2020 (Inaugural Team)',
    theme: 'Robot Sterilisasi & Disinfeksi UV-C Penanganan COVID-19',
    tournament: 'Kontes Robot Tematik Indonesia (KRTMI) 2020 Daring',
    rules: 'Navigasi otonom di ruang isolasi rumah sakit darurat untuk penyemprotan disinfektan & paparan sinar ultraviolet UV-C.',
    leader: LEADERS_HALL_OF_FAME[0], // Nurcholis
    managers: [MANAGERS_SHOWCASE[0]], // Yuli Dwi Saputri
    divisions: {
      program: [
        LEADERS_HALL_OF_FAME[0],
        {
          id: 'alfan-fajri-tamyis-2020',
          name: 'Alfan Fajri Tamyis',
          nickname: 'Alfan',
          nim: '18502244014',
          studyProgram: 'S1 Pendidikan Teknik Elektronika',
          prodi: 'S1 Pendidikan Teknik Elektronika',
          faculty: 'Fakultas Teknik (FT)',
          division: 'Program',
          divisionSlug: 'program',
          role: 'Programmer (Navigation & Autonomous Control)',
          generation: 'Angkatan 2017',
          generationYear: 2020,
          yearsActive: [2020],
          specialization: ['Autonomous Navigation', 'STM32', 'Sensor Integration'],
          skills: ['STM32', 'Navigation', 'C/C++'],
          bio: 'Programmer perintis logika navigasi otonom robot disinfeksi Abhinaya UNY 2020.',
          image: '/images/members/2020_program_alfan_fajri_tamyis_01.jpg',
          images: ['/images/members/2020_program_alfan_fajri_tamyis_01.jpg'],
          badge: 'Programmer 2020',
        },
        {
          id: 'budi-arjaya-wida-2020',
          name: 'Budi Arjaya Wida',
          nickname: 'Budi',
          nim: '18518244002',
          studyProgram: 'S1 Pendidikan Teknik Mekatronika',
          prodi: 'S1 Pendidikan Teknik Mekatronika',
          faculty: 'Fakultas Teknik (FT)',
          division: 'Program',
          divisionSlug: 'program',
          role: 'Programmer (Kinematika & Sensor)',
          generation: 'Angkatan 2018',
          generationYear: 2020,
          yearsActive: [2020, 2021, 2022],
          specialization: ['Kinematika Mecanum', 'Sensor Logic', 'STM32'],
          skills: ['Mecanum', 'Kinematics', 'STM32'],
          bio: 'Programmer fokus pada algoritma kinematika roda omni/mecanum dan kalibrasi sensor jarak.',
          image: '/images/members/2020_program_budi_arjaya_wida_01.jpg',
          images: ['/images/members/2020_program_budi_arjaya_wida_01.jpg'],
          badge: 'Programmer 2020',
        },
        {
          id: 'muhammad-iqbal-rasyid-2020',
          name: 'Muhammad Iqbal Rasyid',
          nickname: 'Iqbal',
          nim: '19518241046',
          studyProgram: 'S1 Pendidikan Teknik Mekatronika',
          prodi: 'S1 Pendidikan Teknik Mekatronika',
          faculty: 'Fakultas Teknik (FT)',
          division: 'Program',
          divisionSlug: 'program',
          role: 'Programmer (State Logic)',
          generation: 'Angkatan 2019',
          generationYear: 2020,
          yearsActive: [2020, 2021, 2022],
          specialization: ['State Machine Control', 'Mekatronika', 'Embedded Systems'],
          skills: ['Mekatronika', 'C++', 'Embedded'],
          bio: 'Programmer muda generasi perdana yang mengembangkan alur state machine robot otonom.',
          image: '/images/members/2020_program_muhammad_iqbal_rasyid_01.jpg',
          images: ['/images/members/2020_program_muhammad_iqbal_rasyid_01.jpg'],
          badge: 'Programmer 2020',
        },
      ],
      elektronik: [
        {
          id: 'musa-beni-ricardo-2020',
          name: 'Musa Beni Ricardo Aruan',
          nickname: 'Musa',
          nim: '18518241012',
          studyProgram: 'S1 Pendidikan Teknik Mekatronika',
          prodi: 'S1 Pendidikan Teknik Mekatronika',
          faculty: 'Fakultas Teknik (FT)',
          division: 'Elektronik',
          divisionSlug: 'elektronik',
          role: 'Elektronik (Hardware & Sensor Wiring)',
          generation: 'Angkatan 2017',
          generationYear: 2020,
          yearsActive: [2020, 2021, 2022],
          specialization: ['Power Distribution Board', 'PCB', 'Sensor Wiring'],
          skills: ['PCB', 'Wiring', 'Power Distribution Board'],
          bio: 'Merancang instalasi kelistrikan daya UV-C dan wiring sensor jarak robot perdana 2020.',
          image: '/images/members/2020_elektronik_musa_beni_ricardo_aruan_01.jpg',
          images: ['/images/members/2020_elektronik_musa_beni_ricardo_aruan_01.jpg'],
          badge: 'Elektronik 2020',
        },
        {
          id: 'ardhi-wiranata-2020',
          name: 'Ardhi Wiranata',
          nickname: 'Ardhi',
          nim: '18502244012',
          studyProgram: 'S1 Pendidikan Teknik Elektronika',
          prodi: 'S1 Pendidikan Teknik Elektronika',
          faculty: 'Fakultas Teknik (FT)',
          division: 'Elektronik',
          divisionSlug: 'elektronik',
          role: 'Elektronik (Power & Driver Management)',
          generation: 'Angkatan 2017',
          generationYear: 2020,
          yearsActive: [2020],
          specialization: ['Motor Driver BTS7960', 'PCB', 'Battery Safety'],
          skills: ['PCB', 'Motor Drivers', 'Power Management'],
          bio: 'Bertanggung jawab pada rangkaian driver motor arus tinggi dan sistem catu daya robot.',
          image: '/images/members/2020_elektronik_ardhi_wiranata_01.jpg',
          images: ['/images/members/2020_elektronik_ardhi_wiranata_01.jpg'],
          badge: 'Elektronik 2020',
        },
        {
          id: 'yusron-nur-latief-2020',
          name: 'Yusron Nur Latief',
          nickname: 'Yusron',
          nim: '19506334011',
          studyProgram: 'D4 Teknik Elektro',
          prodi: 'D4 Teknik Elektro',
          faculty: 'Fakultas Vokasi (FV)',
          division: 'Elektronik',
          divisionSlug: 'elektronik',
          role: 'Elektronik (PCB Design & Hardware Architecture)',
          generation: 'Angkatan 2019',
          generationYear: 2020,
          yearsActive: [2020, 2021, 2022, 2023],
          specialization: ['Custom Shield PCB', 'Power Distribution Board', 'Hardware QA'],
          skills: ['Autodesk EAGLE', 'KiCad', 'Power Distribution Board', 'PCB'],
          bio: 'Merancang PCB custom shield mikrokontroler dan sistem proteksi kelistrikan robot.',
          image: '/images/members/2020_elektronik_yusron_nur_latief_01.jpg',
          images: ['/images/members/2020_elektronik_yusron_nur_latief_01.jpg'],
          badge: 'Elektronik 2020',
        },
      ],
      mekanik: [
        {
          id: 'afif-aiman-saputra-2020',
          name: 'Afif Aiman Saputra',
          nickname: 'Afif',
          nim: '19503241015',
          studyProgram: 'S1 Pendidikan Teknik Mesin',
          prodi: 'S1 Pendidikan Teknik Mesin',
          faculty: 'Fakultas Teknik (FT)',
          division: 'Mekanik',
          divisionSlug: 'mekanik',
          role: 'Mekanik (Chassis Design & Fabrication Lead)',
          generation: 'Angkatan 2019',
          generationYear: 2020,
          yearsActive: [2020, 2021, 2022],
          specialization: ['CAD', 'Mecanum Drive Assembly', 'Chassis Rigidity'],
          skills: ['CAD', 'Mecanum', 'Sheet Metal'],
          bio: 'Memimpin fabrikasi sasis dan sistem pergerakan mecanum pada robot perdana Abhinaya.',
          image: '/images/members/2020_mekanik_afif_aiman_saputra_01.jpg',
          images: ['/images/members/2020_mekanik_afif_aiman_saputra_01.jpg'],
          badge: 'Mekanik 2020',
        },
        {
          id: 'musyarof-rifai-2020',
          name: 'Musyarof Rifai',
          nickname: 'Musyarof',
          nim: '19518244003',
          studyProgram: 'S1 Pendidikan Teknik Mekatronika',
          prodi: 'S1 Pendidikan Teknik Mekatronika',
          faculty: 'Fakultas Teknik (FT)',
          division: 'Mekanik',
          divisionSlug: 'mekanik',
          role: 'Mekanik (UV-C Mechanism & Actuator)',
          generation: 'Angkatan 2019',
          generationYear: 2020,
          yearsActive: [2020, 2021, 2022, 2023],
          specialization: ['CAD', 'Actuator Mounting', 'Mekatronika'],
          skills: ['CAD', 'Actuators', 'Mekatronika'],
          bio: 'Merancang mekanisme penyebaran sinar UV-C dan mounting modul nozzle disinfektan.',
          image: '/images/members/2020_mekanik_musyarof_rifai_01.jpg',
          images: ['/images/members/2020_mekanik_musyarof_rifai_01.jpg'],
          badge: 'Mekanik 2020',
        },
        {
          id: 'anggoro-fajar-dwi-utomo-2020',
          name: 'Anggoro Fajar Dwi Utomo',
          nickname: 'Anggoro',
          nim: '19518241003',
          studyProgram: 'S1 Pendidikan Teknik Mekatronika',
          prodi: 'S1 Pendidikan Teknik Mekatronika',
          faculty: 'Fakultas Teknik (FT)',
          division: 'Mekanik',
          divisionSlug: 'mekanik',
          role: 'Mekanik (Machining & Fitting)',
          generation: 'Angkatan 2019',
          generationYear: 2020,
          yearsActive: [2020, 2021, 2022],
          specialization: ['Machining', 'CAD', 'Mechanical QA'],
          skills: ['Lathe', 'Milling', 'CAD'],
          bio: 'Melakukan pemesinan bubut komponen transmisi roda dan penyelarasan bearing.',
          image: '/images/members/2020_mekanik_anggoro_fajar_dwi_utomo_01.jpg',
          images: ['/images/members/2020_mekanik_anggoro_fajar_dwi_utomo_01.jpg'],
          badge: 'Mekanik 2020',
        },
        {
          id: 'muhammad-rovi-aan-s-2020',
          name: 'Muhamad Rovi Aan Sulistya',
          nickname: 'Rovi',
          nim: '19538141019',
          studyProgram: 'S1 Teknik Elektro',
          prodi: 'S1 Teknik Elektro',
          faculty: 'Fakultas Teknik (FT)',
          division: 'Mekanik',
          divisionSlug: 'mekanik',
          role: 'Mekanik (Structure & Hardware Integration)',
          generation: 'Angkatan 2019',
          generationYear: 2020,
          yearsActive: [2020, 2021, 2022],
          specialization: ['Structural Rigidity', 'CAD', 'Assembly QA'],
          skills: ['Assembly', 'CAD', 'Hardware Integration'],
          bio: 'Bertanggung jawab atas kekokohan struktural bodi robot dan integrasi mekanik-elektrik.',
          image: '/images/members/2020_mekanik_muhammad_rovi_aan_sulistya_01.jpg',
          images: ['/images/members/2020_mekanik_muhammad_rovi_aan_sulistya_01.jpg'],
          badge: 'Mekanik 2020',
        },
      ],
      pembimbing: DOSEN_PEMBIMBING_LIST,
    },
    members: [],
    achievements: [
      'Peringkat 6 Nasional KRTMI 2020',
      'Kontingen Perdana Tim Robotika Tematik UNY',
      'Desain Sistem Sterilisasi UV-C Otonom Terbaik',
    ],
    highlights: [
      'Berhasil merintis sistem kendali otonom pertama di divisi KRTMI UNY',
      'Lolos seleksi wilayah dan bertanding di putaran final nasional daring',
    ],
    groupPhoto: '/images/members/2020_leader_nurcholis_01.jpg',
  },

  // GENERATION 2021
  {
    year: 2021,
    contingentName: 'Kontingen Abhinaya UNY 2021 (Regional Champion)',
    theme: 'Robot Distribusi Logistik & Penanganan Bahan Medis Pandemi',
    tournament: 'Kontes Robot Tematik Indonesia (KRTMI) 2021 Daring Nasional',
    rules: 'Pengantaran paket logistik dan obat-obatan secara cepat dan presisi di arena simulasi rumah sakit darurat.',
    leader: LEADERS_HALL_OF_FAME[1], // Afif Aiman Saputra
    managers: [MANAGERS_SHOWCASE[0]], // Yuli Dwi Saputri
    divisions: {
      program: [
        LEADERS_HALL_OF_FAME[0],
        LEADERS_HALL_OF_FAME[2],
        {
          id: 'salsabila-azzahra-2021',
          name: 'Salsabila Azzahra Putri Sophia Dewi Utami',
          nickname: 'Salsa',
          nim: '20518241012',
          studyProgram: 'S1 Pendidikan Teknik Mekatronika',
          prodi: 'S1 Pendidikan Teknik Mekatronika',
          faculty: 'Fakultas Teknik (FT)',
          division: 'Program',
          divisionSlug: 'program',
          role: 'Programmer (Sensor & Match Strategy)',
          generation: 'Angkatan 2020',
          generationYear: 2021,
          yearsActive: [2021, 2022, 2023, 2024],
          specialization: ['Sensor Calibration', 'Strategy Analysis', 'STM32'],
          skills: ['Sensor Logic', 'Strategy', 'STM32'],
          bio: 'Mengembangkan strategi manuver dan logika sensor penentu kemenangan laga.',
          image: '/images/members/2024_program_salsabila_azzahra_01.png',
          images: ['/images/members/2024_program_salsabila_azzahra_01.png'],
          badge: 'Programmer 2021',
        },
      ],
      elektronik: [
        {
          id: 'yusron-nur-latief-2021',
          name: 'Yusron Nur Latief',
          nickname: 'Yusron',
          nim: '19506334011',
          studyProgram: 'D4 Teknik Elektro',
          prodi: 'D4 Teknik Elektro',
          faculty: 'Fakultas Vokasi (FV)',
          division: 'Elektronik',
          divisionSlug: 'elektronik',
          role: 'Elektronik (Lead Hardware)',
          generation: 'Angkatan 2019',
          generationYear: 2021,
          yearsActive: [2020, 2021, 2022, 2023],
          specialization: ['Power Distribution Board', 'Custom Shield PCB', 'PCB'],
          skills: ['PCB', 'Power Distribution Board'],
          bio: 'Merancang sistem kelistrikan berdaya tahan tinggi untuk kompetisi berkecepatan tinggi.',
          image: '/images/members/2020_elektronik_yusron_nur_latief_01.jpg',
          images: ['/images/members/2020_elektronik_yusron_nur_latief_01.jpg'],
          badge: 'Elektronik 2021',
        },
      ],
      mekanik: [
        LEADERS_HALL_OF_FAME[1],
      ],
      pembimbing: DOSEN_PEMBIMBING_LIST,
    },
    members: [],
    achievements: [
      'Juara 1 KRI Wilayah I (Regional Champion KRTMI 2021)',
      'Penghargaan Khusus Strategi Terbaik Nasional KRTMI 2021',
      'Finalis Nasional Kontes Robot Indonesia 2021',
    ],
    highlights: [
      'Meraih podium tertinggi regional Wilayah I dengan catatan waktu tercepat',
      'Mendapatkan pengakuan strategi navigasi paling efisien tingkat nasional',
    ],
    groupPhoto: '/images/members/2021_leader_afif_aiman_saputra_01.jpg',
  },

  // GENERATION 2022
  {
    year: 2022,
    contingentName: 'Kontingen Abhinaya UNY 2022',
    theme: 'Robot Penanganan Limbah Medis B3 Rumah Sakit',
    tournament: 'Kontes Robot Tematik Indonesia (KRTMI) 2022 ITS Surabaya',
    rules: 'Pengambilan, pemindahan, dan pembuangan limbah medis B3 rumah sakit dengan mekanisme capit 2-stage dan navigasi otonom.',
    leader: LEADERS_HALL_OF_FAME[2], // Muhammad Iqbal Rasyid
    managers: [MANAGERS_SHOWCASE[0], MANAGERS_SHOWCASE[1]], // Yuli Dwi Saputri & Mustika Wahyu Aprilia
    divisions: {
      program: [
        LEADERS_HALL_OF_FAME[3],
        LEADERS_HALL_OF_FAME[2],
      ],
      elektronik: [
        {
          id: 'agus-bagaskoro-2022',
          name: 'Agus Bagaskoro',
          nickname: 'Bagas',
          nim: '21501244039',
          studyProgram: 'S1 Pendidikan Teknik Elektro',
          prodi: 'S1 Pendidikan Teknik Elektro',
          faculty: 'Fakultas Teknik (FT)',
          division: 'Elektronik',
          divisionSlug: 'elektronik',
          role: 'Elektronik (Hardware Engineer)',
          generation: 'Angkatan 2021',
          generationYear: 2022,
          yearsActive: [2022, 2023, 2024],
          specialization: ['Power Distribution Board', 'PCB', 'Motor Drivers'],
          skills: ['PCB', 'Power Distribution Board', 'H-Bridge'],
          bio: 'Merancang sistem kelistrikan driver motor dan catu daya multi-rail.',
          image: '/images/members/2022_elektronik_agus_bagaskoro_01.jpg',
          images: ['/images/members/2022_elektronik_agus_bagaskoro_01.jpg'],
          badge: 'Elektronik 2022',
        },
      ],
      desain: [
        {
          id: 'geo-brahma-granito-z-2022',
          name: 'Geo Brahma Granito Zain',
          nickname: 'Geo',
          nim: '19508334027',
          studyProgram: 'D3 Teknik Mesin',
          prodi: 'D3 Teknik Mesin',
          faculty: 'Fakultas Vokasi (FV)',
          division: 'Desain',
          divisionSlug: 'desain',
          role: 'Desain (Koordinator Desain & 3D CAD)',
          generation: 'Angkatan 2019',
          generationYear: 2022,
          yearsActive: [2022],
          specialization: ['SolidWorks CAD', 'Chassis Optimization', 'CAD'],
          skills: ['SolidWorks', 'CAD', 'Prototyping'],
          bio: 'Memimpin divisi desain dalam pemodelan 3D sasis robot dan mekanisme capit.',
          image: '/images/members/2022_desain_geo_brahma_granito_z_01.jpg',
          images: ['/images/members/2022_desain_geo_brahma_granito_z_01.jpg'],
          badge: 'Lead Desain 2022',
        },
        {
          id: 'ahmad-insan-kamil-2022',
          name: 'Ahmad Insan Kamil',
          nickname: 'Insan',
          nim: '21501244019',
          studyProgram: 'S1 Pendidikan Teknik Elektro',
          prodi: 'S1 Pendidikan Teknik Elektro',
          faculty: 'Fakultas Teknik (FT)',
          division: 'Desain',
          divisionSlug: 'desain',
          role: 'Desain (CAD & Rendering)',
          generation: 'Angkatan 2021',
          generationYear: 2022,
          yearsActive: [2022],
          specialization: ['3D CAD Modeling', 'Rendering', 'CAD'],
          skills: ['CAD', 'SolidWorks', 'Rendering'],
          bio: 'Merancang visual 3D render dan geometri komponen robot limbah medis.',
          image: '/images/members/2022_desain_ahmad_insan_kamil_01.jpg',
          images: ['/images/members/2022_desain_ahmad_insan_kamil_01.jpg'],
          badge: 'Desain 2022',
        },
      ],
      mekanik: [
        {
          id: 'ilham-widyo-nugroho-2022',
          name: 'Ilham Widyo Nugroho',
          nickname: 'Ilham',
          nim: '21507334002',
          studyProgram: 'D4 Teknik Elektronika',
          prodi: 'D4 Teknik Elektronika',
          faculty: 'Fakultas Vokasi (FV)',
          division: 'Mekanik',
          divisionSlug: 'mekanik',
          role: 'Mekanik (Assembly & Kinematics Fitment)',
          generation: 'Angkatan 2021',
          generationYear: 2022,
          yearsActive: [2022, 2023, 2024],
          specialization: ['Chassis Fitment', 'STM32', 'CAD'],
          skills: ['Assembly', 'CAD', 'STM32'],
          bio: 'Bergabung di divisi mekanik dalam perakitan bodi dan linkage capit limbah medis.',
          image: '/images/members/2022_mekanik_ilham_widyo_nugroho_01.jpg',
          images: ['/images/members/2022_mekanik_ilham_widyo_nugroho_01.jpg'],
          badge: 'Mekanik 2022',
        },
      ],
      pembimbing: DOSEN_PEMBIMBING_LIST,
    },
    members: [],
    achievements: [
      'Peringkat 4 KRI Wilayah I 2022',
      'Finalis Nasional KRTMI 2022 di ITS Surabaya (Luring)',
    ],
    highlights: [
      'Transisi sukses dari kompetisi daring ke format luring pasca-pandemi',
      'Implementasi mekanisme capit 2-stage untuk limbah medis B3 rumah sakit',
    ],
    groupPhoto: '/images/members/2022_leader_muhammad_iqbal_rasyid_01.jpg',
  },

  // GENERATION 2023
  {
    year: 2023,
    contingentName: 'Kontingen Abhinaya UNY 2023 (National Podium Team)',
    theme: 'Robot Pemilah & Pendistribusi Obat Berbasis Digital Twin',
    tournament: 'Kontes Robot Tematik Indonesia (KRTMI) 2023 USM Semarang',
    rules: 'Navigasi arena kompleks dengan sinkronisasi digital twin, identifikasi resep obat, dan pengantaran ke loket farmasi rumah sakit.',
    leader: LEADERS_HALL_OF_FAME[3], // Salsabila Azzahra
    managers: [MANAGERS_SHOWCASE[1]], // Mustika Wahyu Aprilia
    divisions: {
      program: [
        LEADERS_HALL_OF_FAME[3],
        ACTIVE_TECHNICAL_SQUAD.program[0], // Tri Wahyu Handoyo
        ACTIVE_TECHNICAL_SQUAD.program[1], // Farhan Yuda Mahendra
      ],
      elektronik: [
        ACTIVE_TECHNICAL_SQUAD.elektronik[1], // Abdul Hasib Adzdzin Nuha
        ACTIVE_TECHNICAL_SQUAD.elektronik[2], // Agus Bagaskoro
      ],
      mekanik: [
        LEADERS_HALL_OF_FAME[4], // Ilham Widyo Nugroho
        ACTIVE_TECHNICAL_SQUAD.mekanik[5], // Muhamad Ilham Sony
      ],
      pembimbing: DOSEN_PEMBIMBING_LIST,
    },
    members: [],
    achievements: [
      'Juara 3 KRI Wilayah I KRTMI 2023',
      'Finalis Nasional KRTMI 2023 Universitas Semarang (USM)',
      'Penghargaan Desain Digital Twin & Mekanisme Presisi Terbaik',
    ],
    highlights: [
      'Integrasi data telemetri real-time dengan model simulasi 3D Digital Twin',
      'Meraih podium 3 Wilayah I dan menembus jajaran elit robotika nasional di USM',
    ],
    groupPhoto: '/images/members/2023_leader_salsabila_azzahra_psdu_01.jpg',
  },

  // GENERATION 2024
  {
    year: 2024,
    contingentName: 'Kontingen Abhinaya UNY 2024',
    theme: 'Robot Pemilah Sampah Otonom Berbasis AI Vision (KRTMI 2024)',
    tournament: 'Kontes Robot Tematik Indonesia (KRTMI) 2024 UMS Surakarta',
    rules: 'Pendeteksian objek sampah organik & anorganik secara real-time via YOLOv8, pengambilan presisi, dan pembuangan pada bak berputar.',
    leader: LEADERS_HALL_OF_FAME[4], // Ilham Widyo Nugroho
    managers: [MANAGERS_SHOWCASE[1], MANAGERS_SHOWCASE[2]], // Mustika Wahyu Aprilia & Rose Pita Nur Afifah
    divisions: {
      program: [
        ACTIVE_TECHNICAL_SQUAD.program[0], // Tri Wahyu Handoyo (Koor)
        LEADERS_HALL_OF_FAME[3], // Salsabila Azzahra
        ACTIVE_TECHNICAL_SQUAD.program[1], // Farhan Yuda Mahendra
      ],
      elektronik: [
        ACTIVE_TECHNICAL_SQUAD.elektronik[1], // Abdul Hasib Adzdzin Nuha (Koor)
        ACTIVE_TECHNICAL_SQUAD.elektronik[2], // Agus Bagaskoro
        ACTIVE_TECHNICAL_SQUAD.elektronik[0], // Ikhsan Nurrohman
      ],
      mekanik: [
        LEADERS_HALL_OF_FAME[4], // Ilham Widyo Nugroho (Koor)
        ACTIVE_TECHNICAL_SQUAD.mekanik[5], // Muhamad Ilham Sony
        ACTIVE_TECHNICAL_SQUAD.mekanik[1], // Caesar Sokma Langgeng
        ACTIVE_TECHNICAL_SQUAD.mekanik[0], // Rionaldi Nugroho
      ],
      pembimbing: DOSEN_PEMBIMBING_LIST,
    },
    members: [],
    achievements: [
      'Juara 1 Regional I Wilayah KRTMI 2024 (BPTI Puspresnas Kemendikbudristek)',
      'Juara 2 Tingkat Nasional KRTMI 2024 (Puspresnas Kemendikbudristek & UMS Surakarta)',
      'Finalis Technocorner Transporter Robot UGM 2024',
      'Desain Custom Shield PCB & Vision Edge Computing Terbaik',
    ],
    highlights: [
      'Implementasi YOLOv8 Object Detection dengan inference time < 15ms pada Mini PC',
      'Custom Shield STM32F407 PCB dengan proteksi optocoupler isolasi penuh',
    ],
    groupPhoto: '/images/members/2024_leader_ilham_widyo_nugroho_01.png',
  },

  // GENERATION 2025
  {
    year: 2025,
    contingentName: 'Kontingen Abhinaya UNY 2025 (Active Generation)',
    theme: 'Next-Generation High-Speed Autonomous AI Vision Robotics',
    tournament: 'Kontes Robot Tematik Indonesia (KRTMI) 2025',
    rules: 'Navigasi otonom kecepatan tinggi, deteksi objek multimodal AI YOLOv11, aktuasi capit pintar, dan telemetri wireless terintegrasi.',
    leader: LEADERS_HALL_OF_FAME[5], // Farhan Yuda Mahendra
    managers: [MANAGERS_SHOWCASE[2], MANAGERS_SHOWCASE[3]], // Rose Pita & Zelfa
    divisions: {
      program: ACTIVE_TECHNICAL_SQUAD.program,
      elektronik: ACTIVE_TECHNICAL_SQUAD.elektronik,
      mekanik: ACTIVE_TECHNICAL_SQUAD.mekanik,
      pembimbing: DOSEN_PEMBIMBING_LIST,
    },
    members: [],
    achievements: [
      'Kontingen Resmi Abhinaya UNY KRI 2025',
      'Riset Navigasi Otonom YOLOv11 & High-Speed Mecanum Kinematics',
    ],
    highlights: [
      'Pengembangan full-stack robotics portal web dan telemetri nirkabel terenkripsi',
      'Struktur sasis aluminium duralium presisi tinggi dengan toleransi < 0.05 mm',
    ],
    groupPhoto: '/images/members/2024_program_farhan_yuda_mahendra_01.png',
  },
];

// Populate members arrays in ALUMNI_GENERATIONS
ALUMNI_GENERATIONS.forEach((gen) => {
  const divisionMembers: TeamMember[] = [];
  if (gen.leader) divisionMembers.push(gen.leader);
  if (gen.managers) divisionMembers.push(...gen.managers);
  if (gen.divisions.program) divisionMembers.push(...gen.divisions.program);
  if (gen.divisions.elektronik) divisionMembers.push(...gen.divisions.elektronik);
  if (gen.divisions.mekanik) divisionMembers.push(...gen.divisions.mekanik);
  if (gen.divisions.desain) divisionMembers.push(...gen.divisions.desain);
  
  // Deduplicate by ID
  const uniqueMap = new Map<string, TeamMember>();
  divisionMembers.forEach((m) => {
    if (!uniqueMap.has(m.id)) {
      uniqueMap.set(m.id, m);
    }
  });
  gen.members = Array.from(uniqueMap.values());
});

export const TEAM_MEMBERS: TeamMember[] = [
  // 1. KETUA TIM (2025)
  LEADERS_HALL_OF_FAME[5], // Farhan Yuda Mahendra (Ketua Tim 2025)

  // 2. MANAGERS (2025)
  MANAGERS_SHOWCASE[2], // Rose Pita Nur Afifah (Manager Media & Branding 2025)
  MANAGERS_SHOWCASE[3], // Zelfa Nafisah Zalna (Manager Keuangan & Administrasi 2025)

  // 3. DIVISI PROGRAM (AKTIF 2025)
  ACTIVE_TECHNICAL_SQUAD.program[0], // Tri Wahyu Handoyo (Lead AI & Systems)
  ACTIVE_TECHNICAL_SQUAD.program[1], // Farhan Yuda Mahendra (Kinematics & Microcontroller Control)
  ACTIVE_TECHNICAL_SQUAD.program[2], // Hanif NurKhalis (Sensor Integration & Serial Interfacing)
  ACTIVE_TECHNICAL_SQUAD.program[3], // Hisyam Yasid Pratowo (Vision Pipeline & Linux Optimization)

  // 4. DIVISI ELEKTRONIK (AKTIF 2025)
  ACTIVE_TECHNICAL_SQUAD.elektronik[0], // Ikhsan Nurrohman (Lead Elektronik / Telemetri & Wireless)
  ACTIVE_TECHNICAL_SQUAD.elektronik[1], // Abdul Hasib Adzdzin Nuha (PCB Design & Sensor Wiring)
  ACTIVE_TECHNICAL_SQUAD.elektronik[3], // Aryasetya Maulana Swasdika (Hardware & Power Systems)
  ACTIVE_TECHNICAL_SQUAD.elektronik[4], // Naufal Farros Zainal Arifin (Signal Conditioning & Safety Rails)

  // 5. DIVISI MEKANIK (AKTIF 2025)
  ACTIVE_TECHNICAL_SQUAD.mekanik[0], // Rionaldi Nugroho (Lead Mekanik / Hardware Assembly & QA)
  ACTIVE_TECHNICAL_SQUAD.mekanik[1], // Caesar Sokma Langgeng (CAD & Laser Fabrication Engineer)
  ACTIVE_TECHNICAL_SQUAD.mekanik[2], // Adhiyatma Fatya Ramadhani (CNC Milling & Sheet Metal Fabrication)
  ACTIVE_TECHNICAL_SQUAD.mekanik[3], // Andika Nanda Wijaya (Precision Lathe & Gripper Linkage Fabrication)
  ACTIVE_TECHNICAL_SQUAD.mekanik[4], // Kharisma Putra Mahardika (Chassis Assembly & Structural QA Engineer)
];

export const ALL_ROSTER_MEMBERS: TeamMember[] = [...DOSEN_PEMBIMBING_LIST, ...TEAM_MEMBERS];

export const DIVISION_CATEGORIES = [
  { id: 'All', label: 'Semua Divisi', icon: 'Users', count: ALL_ROSTER_MEMBERS.length },
  { id: 'Ketua Tim', label: 'Ketua Tim', icon: 'Award', count: ALL_ROSTER_MEMBERS.filter((m) => m.division === 'Ketua Tim').length },
  { id: 'Manager', label: 'Manager Tim', icon: 'Briefcase', count: ALL_ROSTER_MEMBERS.filter((m) => m.division === 'Manager').length },
  { id: 'Program', label: 'Program (AI & Vision)', icon: 'Code', count: ALL_ROSTER_MEMBERS.filter((m) => m.division === 'Program').length },
  { id: 'Elektronik', label: 'Elektronik', icon: 'Zap', count: ALL_ROSTER_MEMBERS.filter((m) => m.division === 'Elektronik').length },
  { id: 'Mekanik', label: 'Mekanik', icon: 'Wrench', count: ALL_ROSTER_MEMBERS.filter((m) => m.division === 'Mekanik').length },
  { id: 'Pembimbing', label: 'Dosen Pembimbing', icon: 'GraduationCap', count: ALL_ROSTER_MEMBERS.filter((m) => m.division === 'Pembimbing').length },
];

export const DIVISION_ORDER: TeamMember['division'][] = [
  'Ketua Tim',
  'Manager',
  'Program',
  'Elektronik',
  'Mekanik',
  'Pembimbing',
];

export const DIVISION_INFO: Record<TeamMember['division'], { title: string; subtitle: string; icon: string }> = {
  'Ketua Tim': {
    title: 'Ketua Tim (Team Leader)',
    subtitle: 'Kepemimpinan Kontingen, Koordinasi Lintas Divisi & Arsitektur Integrasi Sistem',
    icon: 'Award',
  },
  'Manager': {
    title: 'Manager Tim (Administrasi, Keuangan & Media)',
    subtitle: 'Manajemen Anggaran Riset, Administrasi Surat Resmi, Sponsorship & Publikasi Visual',
    icon: 'Briefcase',
  },
  'Program': {
    title: 'Divisi Program (Programming & AI)',
    subtitle: 'Computer Vision YOLO, Navigasi Otonom Roda Mecanum, Logika Sensor & Web Systems',
    icon: 'Code',
  },
  'Elektronik': {
    title: 'Divisi Elektronik',
    subtitle: 'Power Distribution Board (PDB), Custom Shield PCB, Firmware & Telemetri Nirkabel',
    icon: 'Zap',
  },
  'Mekanik': {
    title: 'Divisi Mekanik',
    subtitle: 'Desain 3D CAD, Fabrikasi Plat Aluminium 6061, Gripper 2-Stage & Laser Cutting',
    icon: 'Wrench',
  },
  'Pembimbing': {
    title: 'Dosen Pembimbing',
    subtitle: 'Pengarah Riset Robotika & Kebijakan Strategis Kontes Robot Indonesia (KRI)',
    icon: 'GraduationCap',
  },
  'Desain': {
    title: 'Divisi Desain & Manufaktur',
    subtitle: 'Pemodelan 3D CAD, Rendering & Simulasi Kinematika Komponen',
    icon: 'Layers',
  },
  'Official': {
    title: 'Official & Pit Crew',
    subtitle: 'Dukungan Operasional Paddock, Logistik Pertandingan & Monitoring Lapangan',
    icon: 'Users',
  },
};

export const DIVISION_BADGES: Record<TeamMember['division'], { bg: string; text: string; border: string; accent: string }> = {
  'Pembimbing': {
    bg: 'bg-purple-950/40',
    text: 'text-purple-300',
    border: 'border-purple-500/40',
    accent: '#A855F7',
  },
  'Ketua Tim': {
    bg: 'bg-yellow-950/40',
    text: 'text-amber-300',
    border: 'border-amber-500/40',
    accent: '#EAB308',
  },
  'Manager': {
    bg: 'bg-emerald-950/40',
    text: 'text-emerald-300',
    border: 'border-emerald-500/40',
    accent: '#10B981',
  },
  'Program': {
    bg: 'bg-cyan-950/40',
    text: 'text-cyan-300',
    border: 'border-cyan-500/40',
    accent: '#06B6D4',
  },
  'Elektronik': {
    bg: 'bg-blue-950/40',
    text: 'text-blue-300',
    border: 'border-blue-500/40',
    accent: '#3B82F6',
  },
  'Mekanik': {
    bg: 'bg-orange-950/40',
    text: 'text-orange-300',
    border: 'border-orange-500/40',
    accent: '#F97316',
  },
  'Desain': {
    bg: 'bg-indigo-950/40',
    text: 'text-indigo-300',
    border: 'border-indigo-500/40',
    accent: '#6366F1',
  },
  'Official': {
    bg: 'bg-slate-950/40',
    text: 'text-slate-300',
    border: 'border-slate-500/40',
    accent: '#94A3B8',
  },
};

/* ==========================================================================
   7. HELPER QUERY FUNCTIONS
   ========================================================================== */

/**
 * Get all members from a specific generation year archive
 */
export function getMembersByGeneration(year: number): TeamMember[] {
  const archive = ALUMNI_GENERATIONS.find((gen) => gen.year === year);
  return archive ? archive.members : [];
}

/**
 * Get the leader for a specific generation year
 */
export function getLeaderByYear(year: number): LeaderHistoryItem | undefined {
  return LEADERS_HALL_OF_FAME.find((l) => l.year === year);
}

/**
 * Get the manager(s) for a specific generation year
 */
export function getManagersByYear(year: number): ManagerHistoryItem[] {
  return MANAGERS_SHOWCASE.filter((m) => m.year === year);
}

/**
 * Get active squad members by division
 */
export function getActiveSquadByDivision(division: 'Program' | 'Elektronik' | 'Mekanik' | string): TeamMember[] {
  const divLower = division.toLowerCase();
  if (divLower.includes('program')) return ACTIVE_TECHNICAL_SQUAD.program;
  if (divLower.includes('elektronik')) return ACTIVE_TECHNICAL_SQUAD.elektronik;
  if (divLower.includes('mekanik')) return ACTIVE_TECHNICAL_SQUAD.mekanik;
  return [];
}

/**
 * Get the complete generation archive for a given year
 */
export function getGenerationArchive(year: number): GenerationArchive | undefined {
  return ALUMNI_GENERATIONS.find((gen) => gen.year === year);
}

/**
 * Get all covered historical generation years in chronological order
 */
export function getAllGenerations(): number[] {
  return ALUMNI_GENERATIONS.map((gen) => gen.year).sort((a, b) => a - b);
}
