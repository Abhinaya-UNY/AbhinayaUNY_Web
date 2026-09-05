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
    title: 'Penyerahan Trofi Juara 2 Nasional KRTMI 2024',
    category: 'Panggung Juara',
    year: '2024',
    image: '/gallery/krtmi_podium_juara.jpg',
    caption: 'Momen penganugerahan piala & sertifikat Juara 2 Nasional KRTMI 2024 bagi Tim Robotika Abhinaya UNY di UMS Surakarta.',
    event: 'KRI Nasional 2024 (UMS)'
  },
  {
    id: 'krtmi-2024-action',
    title: 'Aksi Robot Otonom Abhinaya di Arena KRTMI',
    category: 'Arena Lomba',
    year: '2024',
    image: '/gallery/krtmi_arena_action.jpg',
    caption: 'Manuver holonomik 4WD Mecanum dan pemindaian objek otomatis via kamera AI saat mengejar predikat "BERSIH" di arena KRTMI Nasional.',
    event: 'KRI Nasional 2024 (UMS)'
  },
  {
    id: 'krtmi-2024-tuning',
    title: 'Paddock Monitoring & Kalibrasi Tim Abhinaya',
    category: 'Behind The Scenes',
    year: '2024',
    image: '/gallery/krtmi_robot_tuning.jpg',
    caption: 'Pengecekan tegangan sel baterai, kalibrasi threshold sensor warna, dan inspeksi mekanikal gripper di paddock beberapa menit menjelang laga dimulai.',
    event: 'KRI Nasional 2024'
  },
  {
    id: 'krtmi-2024-celebration',
    title: 'Selebrasi Prestasi Tim Robotika Abhinaya UNY',
    category: 'Panggung Juara',
    year: '2024',
    image: '/gallery/krtmi_team_celebration.jpg',
    caption: 'Solidaritas seluruh kontingen UKM Rekayasa Teknologi UNY merayakan keberhasilan merebut podium Juara 2 Tingkat Nasional KRTMI 2024.',
    event: 'KRI Nasional 2024'
  }
];

export const GALLERY_CATEGORIES = [
  'Semua',
  'Arena Lomba',
  'Panggung Juara',
  'Riset & Lab',
  'Behind The Scenes'
] as const;
