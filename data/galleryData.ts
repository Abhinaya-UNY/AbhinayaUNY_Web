export interface GalleryItem {
  id: string;
  title: string;
  category: 'Semua' | 'Arena Lomba' | 'Panggung Juara' | 'Riset & Lab' | 'Behind The Scenes';
  year: string;
  image: string;
  caption: string;
  event: string;
}

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'krtmi-2024-podium',
    title: 'Penyerahan Trofi Juara 2 Nasional KRTMI',
    category: 'Panggung Juara',
    year: '2024',
    image: '/assets/team_podium_1.jpg',
    caption: 'Momen penganugerahan piala & sertifikat Juara 2 Nasional KRTMI 2024 di UMS Surakarta.',
    event: 'KRI Nasional 2024 (UMS)'
  },
  {
    id: 'krtmi-2024-action',
    title: 'Manuver Robot Otonom di Arena Utama',
    category: 'Arena Lomba',
    year: '2024',
    image: '/assets/WEB_5721.jpg',
    caption: 'Robot Abhinaya bergerak otonom memilah dan memasukkan sampel sampah ke keranjang cerdas.',
    event: 'KRI Nasional 2024 (UMS)'
  },
  {
    id: 'krtmi-2024-prep',
    title: 'Persiapan Match & Kalibrasi Kamera AI',
    category: 'Arena Lomba',
    year: '2024',
    image: '/gallery/krtmi_arena_prep.jpg',
    caption: 'Tim divisi programming & mekanik memastikan parameter visi komputer dan sasis dalam kondisi prima.',
    event: 'KRI Nasional 2024'
  },
  {
    id: 'krtmi-2024-focus',
    title: 'Konsentrasi Penuh di Pinggir Arena Lomba',
    category: 'Behind The Scenes',
    year: '2024',
    image: '/gallery/krtmi_team_focus.jpg',
    caption: 'Fokus dan ketegangan anggota tim saat countdown start otonom dimulai.',
    event: 'KRI Nasional 2024'
  },
  {
    id: 'krtmi-2024-closeup',
    title: 'Detail Mekanisme Gripper & Sasis Mecanum',
    category: 'Riset & Lab',
    year: '2024',
    image: '/gallery/krtmi_robot_closeup.jpg',
    caption: 'Struktur mekanik 4WD Mecanum Wheel dan sistem pengangkat lead-screw presisi.',
    event: 'KRTMI 2024'
  },
  {
    id: 'krtmi-2024-paddock',
    title: 'Paddock Tuning & Debugging Firmware',
    category: 'Behind The Scenes',
    year: '2024',
    image: '/gallery/krtmi_paddock_tuning.jpg',
    caption: 'Sesi tuning PID motor dan pemantauan serial telemetry di pit stop kontingen UNY.',
    event: 'Paddock KRI 2024'
  },
  {
    id: 'krtmi-2024-celebration',
    title: 'Sukacita Kontingen Robotika Abhinaya UNY',
    category: 'Panggung Juara',
    year: '2024',
    image: '/gallery/krtmi_celebration.jpg',
    caption: 'Rasa syukur dan kebersamaan seluruh delegasi Abhinaya UNY setelah laga final selesai.',
    event: 'KRI Nasional 2024'
  },
  {
    id: 'krtmi-2024-mechanics',
    title: 'Pemeriksaan Akhir Sistem Transmisi & Sensor',
    category: 'Riset & Lab',
    year: '2024',
    image: '/gallery/krtmi_mechanics_check.jpg',
    caption: 'Verifikasi voltase baterai LiPo dan ketegangan belt sebelum running match.',
    event: 'KRI 2024'
  }
];

export const GALLERY_CATEGORIES = [
  'Semua',
  'Arena Lomba',
  'Panggung Juara',
  'Riset & Lab',
  'Behind The Scenes'
] as const;
