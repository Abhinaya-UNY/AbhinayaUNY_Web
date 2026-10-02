export interface GalleryItem {
  id: string;
  title: string;
  category: 'Semua' | 'Arena Lomba' | 'Panggung Juara' | 'Riset & Lab' | 'Behind The Scenes' | 'Video Aksi';
  year: string;
  image: string;
  thumbnail?: string;
  event: string;
  aspect?: 'wide' | 'standard' | 'panoramic' | 'square' | 'portrait' | 'tall';
  isVideo?: boolean;
  youtubeId?: string;
  videoDuration?: string;
  videoUrl?: string;
}

export const GALLERY_ITEMS: GalleryItem[] = [
  // ROW 1: Panggung Juara & Selebrasi Nasional
  {
    id: 'krtmi-2024-podium',
    title: 'KRTMI KRI 2024',
    category: 'Panggung Juara',
    year: '2024',
    image: '/gallery/krtmi_podium_juara.jpg',
    thumbnail: '/thumbnails/gallery/krtmi_podium_juara.webp',
    event: 'KRI Nasional 2024 (UMS Surakarta)',
    aspect: 'wide'
  },
  {
    id: 'team-podium-1',
    title: 'KRTMI KRI 2024',
    category: 'Panggung Juara',
    year: '2024',
    image: '/assets/team_podium_1.jpg',
    thumbnail: '/thumbnails/assets/team_podium_1.webp',
    event: 'KRI Nasional 2024 (UMS Surakarta)',
    aspect: 'standard'
  },
  {
    id: 'krtmi-2024-celebration',
    title: 'KRTMI KRI 2024',
    category: 'Panggung Juara',
    year: '2024',
    image: '/gallery/krtmi_team_celebration.jpg',
    thumbnail: '/thumbnails/gallery/krtmi_team_celebration.webp',
    event: 'KRI Nasional 2024 (UMS Surakarta)',
    aspect: 'wide'
  },
  {
    id: 'krtmi-2019-piala',
    title: 'KRTMI KRI 2019',
    category: 'Panggung Juara',
    year: '2019',
    image: '/images/news/uny-kri-piala-nasional-2019.jpg',
    thumbnail: '/thumbnails/images/news/uny-kri-piala-nasional-2019.webp',
    event: 'KRI Nasional 2019 (UDINUS Semarang)',
    aspect: 'standard'
  },
  {
    id: 'team-podium-2',
    title: 'KRTMI KRI 2024',
    category: 'Panggung Juara',
    year: '2024',
    image: '/assets/team_podium_2.jpg',
    thumbnail: '/thumbnails/assets/team_podium_2.webp',
    event: 'KRI Nasional 2024 (UMS Surakarta)',
    aspect: 'standard'
  },
  {
    id: 'uny-krtmi-juara-pusat',
    title: 'KRTMI KRI 2024',
    category: 'Panggung Juara',
    year: '2024',
    image: '/images/news/uny-krtmi-juara-pusat-2024.jpg',
    thumbnail: '/thumbnails/images/news/uny-krtmi-juara-pusat-2024.webp',
    event: 'Rektorat UNY 2024',
    aspect: 'wide'
  },
  {
    id: 'krtmi-celebration-stage',
    title: 'KRTMI KRI 2024',
    category: 'Panggung Juara',
    year: '2024',
    image: '/gallery/krtmi_celebration.jpg',
    thumbnail: '/thumbnails/gallery/krtmi_celebration.webp',
    event: 'KRI Nasional 2024 (UMS Surakarta)',
    aspect: 'standard'
  },
  {
    id: 'hero-team-stage',
    title: 'KRTMI KRI 2024',
    category: 'Panggung Juara',
    year: '2024',
    image: '/assets/hero_team_stage.jpg',
    thumbnail: '/thumbnails/assets/hero_team_stage.webp',
    event: 'KRI Nasional 2024 (UMS Surakarta)',
    aspect: 'standard'
  },

  // ROW 2: Aksi Robot di Arena Lomba
  {
    id: 'krtmi-2024-action',
    title: 'KRTMI KRI 2024',
    category: 'Arena Lomba',
    year: '2024',
    image: '/gallery/krtmi_arena_action.jpg',
    thumbnail: '/thumbnails/gallery/krtmi_arena_action.webp',
    event: 'KRI Nasional 2024 (UMS Surakarta)',
    aspect: 'standard'
  },
  {
    id: 'robot-action-1',
    title: 'KRTMI KRI 2024',
    category: 'Arena Lomba',
    year: '2024',
    image: '/assets/robot_action_1.jpg',
    thumbnail: '/thumbnails/assets/robot_action_1.webp',
    event: 'KRI Nasional 2024 (UMS Surakarta)',
    aspect: 'standard'
  },
  {
    id: 'krtmi-official-match',
    title: 'KRTMI KRI 2024',
    category: 'Arena Lomba',
    year: '2024',
    image: '/gallery/krtmi_official_match.jpg',
    thumbnail: '/thumbnails/gallery/krtmi_official_match.webp',
    event: 'KRI Nasional 2024 (UMS Surakarta)',
    aspect: 'standard'
  },
  {
    id: 'robot-action-2',
    title: 'KRTMI KRI 2024',
    category: 'Arena Lomba',
    year: '2024',
    image: '/assets/robot_action_2.jpg',
    thumbnail: '/thumbnails/assets/robot_action_2.webp',
    event: 'KRI Nasional 2024 (UMS Surakarta)',
    aspect: 'standard'
  },
  {
    id: 'krtmi-arena-prep',
    title: 'KRTMI KRI 2024',
    category: 'Arena Lomba',
    year: '2024',
    image: '/gallery/krtmi_arena_prep.jpg',
    thumbnail: '/thumbnails/gallery/krtmi_arena_prep.webp',
    event: 'KRI Nasional 2024 (UMS Surakarta)',
    aspect: 'standard'
  },
  {
    id: 'undip-unlimited-robot',
    title: 'UNLIMITED UNDIP 2026',
    category: 'Arena Lomba',
    year: '2026',
    image: '/images/news/undip-unlimited-robot-finalist.jpg',
    thumbnail: '/thumbnails/images/news/undip-unlimited-robot-finalist.webp',
    event: 'UNLIMITED UNDIP 2026',
    aspect: 'standard'
  },
  {
    id: 'ig-simulasi-laga-2023',
    title: 'KRTMI KRI 2023',
    category: 'Arena Lomba',
    year: '2023',
    image: '/images/instagram_feed/2023-02-03_17-08-58_UTC_CoNUUzuPX9e_2.jpg',
    thumbnail: '/thumbnails/images/instagram_feed/2023-02-03_17-08-58_UTC_CoNUUzuPX9e_2.webp',
    event: 'KRTMI 2023 (USM Semarang)',
    aspect: 'square'
  },
  {
    id: 'web-laga-5721',
    title: 'KRTMI KRI 2024',
    category: 'Arena Lomba',
    year: '2024',
    image: '/assets/WEB_5721.jpg',
    thumbnail: '/thumbnails/assets/WEB_5721.webp',
    event: 'KRI Nasional 2024 (UMS Surakarta)',
    aspect: 'standard'
  },

  // ROW 3: Paddock, Kalibrasi & Scrutineering
  {
    id: 'krtmi-2024-tuning',
    title: 'KRTMI KRI 2024',
    category: 'Behind The Scenes',
    year: '2024',
    image: '/gallery/krtmi_robot_tuning.jpg',
    thumbnail: '/thumbnails/gallery/krtmi_robot_tuning.webp',
    event: 'KRI Nasional 2024 (UMS Surakarta)',
    aspect: 'standard'
  },
  {
    id: 'krtmi-paddock-tuning',
    title: 'KRTMI KRI 2024',
    category: 'Behind The Scenes',
    year: '2024',
    image: '/gallery/krtmi_paddock_tuning.jpg',
    thumbnail: '/thumbnails/gallery/krtmi_paddock_tuning.webp',
    event: 'KRI Nasional 2024 (UMS Surakarta)',
    aspect: 'standard'
  },
  {
    id: 'krtmi-mechanics-check',
    title: 'KRTMI KRI 2024',
    category: 'Behind The Scenes',
    year: '2024',
    image: '/gallery/krtmi_mechanics_check.jpg',
    thumbnail: '/thumbnails/gallery/krtmi_mechanics_check.webp',
    event: 'KRI Nasional 2024 (UMS Surakarta)',
    aspect: 'standard'
  },
  {
    id: 'ig-paddock-usm-2023',
    title: 'KRTMI KRI 2023',
    category: 'Behind The Scenes',
    year: '2023',
    image: '/images/instagram_feed/2023-09-08_02-54-52_UTC_Cw6jFIzPwDx_5.jpg',
    thumbnail: '/thumbnails/images/instagram_feed/2023-09-08_02-54-52_UTC_Cw6jFIzPwDx_5.webp',
    event: 'KRTMI 2023 (USM Semarang)',
    aspect: 'square'
  },
  {
    id: 'krtmi-robot-closeup',
    title: 'KRTMI KRI 2024',
    category: 'Behind The Scenes',
    year: '2024',
    image: '/gallery/krtmi_robot_closeup.jpg',
    thumbnail: '/thumbnails/gallery/krtmi_robot_closeup.webp',
    event: 'KRI Nasional 2024 (UMS Surakarta)',
    aspect: 'standard'
  },
  {
    id: 'ig-elektronik-solder',
    title: 'Perakitan Modul Elektronik di Lab UNY',
    category: 'Behind The Scenes',
    year: '2023',
    image: '/images/instagram_feed/2023-09-08_01-46-44_UTC_Cw6bSByvBVA_3.jpg',
    thumbnail: '/thumbnails/images/instagram_feed/2023-09-08_01-46-44_UTC_Cw6bSByvBVA_3.webp',
    event: 'Lab Robotika UNY',
    aspect: 'square'
  },
  {
    id: 'ig-evaluasi-paddock',
    title: 'KRTMI KRI 2024',
    category: 'Behind The Scenes',
    year: '2024',
    image: '/images/instagram_feed/2024-09-12_17-50-54_UTC_C_03vj8zNUB_2.jpg',
    thumbnail: '/thumbnails/images/instagram_feed/2024-09-12_17-50-54_UTC_C_03vj8zNUB_2.webp',
    event: 'KRI Nasional 2024 (UMS Surakarta)',
    aspect: 'square'
  },
  {
    id: 'ig-telemetri-usm',
    title: 'KRTMI KRI 2023',
    category: 'Behind The Scenes',
    year: '2023',
    image: '/images/instagram_feed/2023-09-08_02-54-52_UTC_Cw6jFIzPwDx_7.jpg',
    thumbnail: '/thumbnails/images/instagram_feed/2023-09-08_02-54-52_UTC_Cw6jFIzPwDx_7.webp',
    event: 'KRTMI 2023 (USM Semarang)',
    aspect: 'square'
  },

  // ROW 4: Riset Divisi & Kehidupan Laboratorium
  {
    id: 'krtmi-team-focus',
    title: 'KRTMI KRI 2024',
    category: 'Riset & Lab',
    year: '2024',
    image: '/gallery/krtmi_team_focus.jpg',
    thumbnail: '/thumbnails/gallery/krtmi_team_focus.webp',
    event: 'KRI Nasional 2024 (UMS Surakarta)',
    aspect: 'standard'
  },
  {
    id: 'ig-divisi-program',
    title: 'KRTMI KRI 2022',
    category: 'Riset & Lab',
    year: '2023',
    image: '/images/instagram_feed/2023-09-08_02-08-37_UTC_Cw6dyWqPSoI_3.jpg',
    thumbnail: '/thumbnails/images/instagram_feed/2023-09-08_02-08-37_UTC_Cw6dyWqPSoI_3.webp',
    event: 'Tim Abhinaya 2022',
    aspect: 'square'
  },
  {
    id: 'ig-divisi-elektronik',
    title: 'KRTMI KRI 2022',
    category: 'Riset & Lab',
    year: '2023',
    image: '/images/instagram_feed/2023-09-08_01-46-44_UTC_Cw6bSByvBVA_2.jpg',
    thumbnail: '/thumbnails/images/instagram_feed/2023-09-08_01-46-44_UTC_Cw6bSByvBVA_2.webp',
    event: 'Tim Abhinaya 2022',
    aspect: 'square'
  },
  {
    id: 'ig-divisi-mekanik',
    title: 'KRTMI KRI 2022',
    category: 'Riset & Lab',
    year: '2023',
    image: '/images/instagram_feed/2023-09-08_01-39-35_UTC_Cw6ads0v8Q2_1.jpg',
    thumbnail: '/thumbnails/images/instagram_feed/2023-09-08_01-39-35_UTC_Cw6ads0v8Q2_1.webp',
    event: 'Tim Abhinaya 2022',
    aspect: 'square'
  },
  {
    id: 'ig-taktik-lomba',
    title: 'KRTMI KRI 2022',
    category: 'Riset & Lab',
    year: '2023',
    image: '/images/instagram_feed/2023-09-08_01-27-05_UTC_Cw6ZCItPRJ-_1.jpg',
    thumbnail: '/thumbnails/images/instagram_feed/2023-09-08_01-27-05_UTC_Cw6ZCItPRJ-_1.webp',
    event: 'KRI 2022 (ITS Surabaya)',
    aspect: 'square'
  },
  {
    id: 'ig-skuad-2025-1',
    title: 'Riset Abhinaya 2025',
    category: 'Riset & Lab',
    year: '2025',
    image: '/images/instagram_feed/2025-09-27_20-10-47_UTC_DPHl0olk4Zw_1.jpg',
    thumbnail: '/thumbnails/images/instagram_feed/2025-09-27_20-10-47_UTC_DPHl0olk4Zw_1.webp',
    event: 'Lab Robotika UNY 2025',
    aspect: 'portrait'
  },
  {
    id: 'ig-skuad-2025-2',
    title: 'Riset Abhinaya 2025',
    category: 'Riset & Lab',
    year: '2025',
    image: '/images/instagram_feed/2025-09-27_20-17-09_UTC_DPHmjMFEwJm_1.jpg',
    thumbnail: '/thumbnails/images/instagram_feed/2025-09-27_20-17-09_UTC_DPHmjMFEwJm_1.webp',
    event: 'Lab Robotika UNY 2025',
    aspect: 'portrait'
  },
  {
    id: 'ig-skuad-2025-3',
    title: 'Riset Abhinaya 2025',
    category: 'Riset & Lab',
    year: '2025',
    image: '/images/instagram_feed/2025-09-27_20-31-45_UTC_DPHoOJJk2NM_2.jpg',
    thumbnail: '/thumbnails/images/instagram_feed/2025-09-27_20-31-45_UTC_DPHoOJJk2NM_2.webp',
    event: 'Lab Robotika UNY 2025',
    aspect: 'portrait'
  },

  // ROW 5: Kilas Balik Historis & Persaudaraan Tim (2019-2026)
  {
    id: 'hero-abhinaya-squad',
    title: 'KRTMI KRI 2024',
    category: 'Behind The Scenes',
    year: '2024',
    image: '/assets/hero_abhinaya.jpg',
    thumbnail: '/thumbnails/assets/hero_abhinaya.webp',
    event: 'KRI Nasional 2024 (UMS Surakarta)',
    aspect: 'wide'
  },
  {
    id: 'uny-kri-its-2022',
    title: 'KRTMI KRI 2022',
    category: 'Behind The Scenes',
    year: '2022',
    image: '/images/instagram_feed/2022-09-02_15-06-12_UTC_CiAj23Yr7iv_5.jpg',
    thumbnail: '/thumbnails/images/instagram_feed/2022-09-02_15-06-12_UTC_CiAj23Yr7iv_5.webp',
    event: 'KRI Nasional 2022 (ITS Surabaya)',
    aspect: 'square'
  },
  {
    id: 'ig-krtmi-covid-2020',
    title: 'KRTMI KRI 2020',
    category: 'Behind The Scenes',
    year: '2020',
    image: '/images/instagram_feed/2020-07-28_14-22-54_UTC_CDMF_hcDUwh.jpg',
    thumbnail: '/thumbnails/images/instagram_feed/2020-07-28_14-22-54_UTC_CDMF_hcDUwh.webp',
    event: 'KRTMI 2020 (Daring)',
    aspect: 'wide'
  },
  {
    id: 'ig-laga-its-2022',
    title: 'KRTMI KRI 2022',
    category: 'Behind The Scenes',
    year: '2022',
    image: '/images/instagram_feed/2022-09-02_15-06-12_UTC_CiAj23Yr7iv_4.jpg',
    thumbnail: '/thumbnails/images/instagram_feed/2022-09-02_15-06-12_UTC_CiAj23Yr7iv_4.webp',
    event: 'KRTMI 2022 (ITS Surabaya)',
    aspect: 'square'
  },
  {
    id: 'ig-kontingen-usm-2023',
    title: 'KRTMI KRI 2023',
    category: 'Behind The Scenes',
    year: '2023',
    image: '/images/instagram_feed/2023-09-08_02-54-52_UTC_Cw6jFIzPwDx_2.jpg',
    thumbnail: '/thumbnails/images/instagram_feed/2023-09-08_02-54-52_UTC_Cw6jFIzPwDx_2.webp',
    event: 'KRTMI 2023 (USM Semarang)',
    aspect: 'square'
  },
  {
    id: 'ig-kebersamaan-2024',
    title: 'KRTMI KRI 2024',
    category: 'Behind The Scenes',
    year: '2024',
    image: '/images/instagram_feed/2024-09-12_17-50-54_UTC_C_03vj8zNUB_4.jpg',
    thumbnail: '/thumbnails/images/instagram_feed/2024-09-12_17-50-54_UTC_C_03vj8zNUB_4.webp',
    event: 'KRI Nasional 2024 (UMS Surakarta)',
    aspect: 'square'
  },
  {
    id: 'img-wa-celebration-2024',
    title: 'KRTMI KRI 2024',
    category: 'Panggung Juara',
    year: '2024',
    image: '/assets/IMG-20240706-WA0117.jpg',
    thumbnail: '/thumbnails/assets/IMG-20240706-WA0117.webp',
    event: 'KRI Nasional 2024 (UMS Surakarta)',
    aspect: 'wide'
  },
  {
    id: 'tc-2026-cover',
    title: 'Technocorner 2026',
    category: 'Arena Lomba',
    year: '2026',
    image: '/images/tournaments/technocorner_2026_cover.png',
    thumbnail: '/thumbnails/images/tournaments/technocorner_2026_cover.webp',
    event: 'Technocorner UGM 2026',
    aspect: 'portrait'
  },

  // --- VIDEO ITEMS (AKSI RESMI, KILAS BALIK & SHORTS ROBOTIKA ABHINAYA) ---
  {
    id: 'vid-kilas-balik-2024',
    title: 'Video Kilas Balik Abhinaya 2019 - 2024',
    category: 'Video Aksi',
    year: '2024',
    image: '/gallery/yt_3yr5uNkxA_8.jpg',
    thumbnail: '/thumbnails/gallery/yt_3yr5uNkxA_8.webp',
    event: 'Kilas Balik Resmi',
    aspect: 'wide',
    isVideo: true,
    youtubeId: '3yr5uNkxA_8',
    videoDuration: 'Full HD'
  },
  {
    id: 'vid-live-krtmi-2024',
    title: 'Video Laga KRTMI Wilayah 2024',
    category: 'Video Aksi',
    year: '2024',
    image: '/gallery/yt_PmxwdrhpxKg.jpg',
    thumbnail: '/thumbnails/gallery/yt_PmxwdrhpxKg.webp',
    event: 'Siaran Laga KRTMI 2024',
    aspect: 'wide',
    isVideo: true,
    youtubeId: 'PmxwdrhpxKg',
    videoDuration: '1080p 60fps'
  },
  {
    id: 'vid-perjalanan-krtmi',
    title: 'Video Perkembangan Abhinaya 2019 - 2023',
    category: 'Video Aksi',
    year: '2023',
    image: '/gallery/yt_J5FXI2AnQxE.jpg',
    thumbnail: '/thumbnails/gallery/yt_J5FXI2AnQxE.webp',
    event: 'Kilas Balik KRTMI',
    aspect: 'wide',
    isVideo: true,
    youtubeId: 'J5FXI2AnQxE',
    videoDuration: 'HD 60fps'
  },
  {
    id: 'vid-oprec-tim',
    title: 'Video Profil Tim Abhinaya UNY',
    category: 'Video Aksi',
    year: '2024',
    image: '/gallery/yt_LyP9M_uTvMk.jpg',
    thumbnail: '/thumbnails/gallery/yt_LyP9M_uTvMk.webp',
    event: 'Profil Tim Robotika UNY',
    aspect: 'wide',
    isVideo: true,
    youtubeId: 'LyP9M_uTvMk',
    videoDuration: 'Full HD'
  },
  {
    id: 'vid-shorts-recap-2023',
    title: 'Shorts: Manuver Robot KRTMI 2023 di USM',
    category: 'Video Aksi',
    year: '2023',
    image: '/gallery/yt_wLusNVfFFHA.jpg',
    thumbnail: '/thumbnails/gallery/yt_wLusNVfFFHA.webp',
    event: 'KRTMI 2023 (USM Semarang)',
    aspect: 'tall',
    isVideo: true,
    youtubeId: 'wLusNVfFFHA',
    videoDuration: 'Shorts'
  },
  {
    id: 'vid-shorts-simulasi-sirkuit',
    title: 'Shorts: Pengujian Rangkaian Elektronika',
    category: 'Video Aksi',
    year: '2024',
    image: '/gallery/yt_tcsBS-6qgCs.jpg',
    thumbnail: '/thumbnails/gallery/yt_tcsBS-6qgCs.webp',
    event: 'Lab Robotika UNY',
    aspect: 'tall',
    isVideo: true,
    youtubeId: 'tcsBS-6qgCs',
    videoDuration: 'Shorts'
  },
  {
    id: 'vid-shorts-fabrikasi-3d',
    title: 'Shorts: Fabrikasi 3D Print Komponen Robot',
    category: 'Video Aksi',
    year: '2024',
    image: '/gallery/yt_vjxbL5MB4-4.jpg',
    thumbnail: '/thumbnails/gallery/yt_vjxbL5MB4-4.webp',
    event: 'Lab Robotika UNY',
    aspect: 'tall',
    isVideo: true,
    youtubeId: 'vjxbL5MB4-4',
    videoDuration: 'Shorts'
  },
  {
    id: 'vid-shorts-selebrasi-juara',
    title: 'Shorts: Pengumuman Juara KRI 2024 di UMS',
    category: 'Video Aksi',
    year: '2024',
    image: '/gallery/yt_epyl7w6xZ6Y.jpg',
    thumbnail: '/thumbnails/gallery/yt_epyl7w6xZ6Y.webp',
    event: 'KRI Nasional 2024 (UMS Surakarta)',
    aspect: 'tall',
    isVideo: true,
    youtubeId: 'epyl7w6xZ6Y',
    videoDuration: 'Shorts'
  },
  {
    id: 'undip-stage-01',
    title: 'UNLIMITED UNDIP 2026',
    category: 'Panggung Juara',
    year: '2026',
    image: '/gallery/unlimited_undip/undip_stage_action_01.jpg',
    thumbnail: '/thumbnails/gallery/unlimited_undip/undip_stage_action_01.webp',
    event: 'UNLIMITED UNDIP 2026',
    aspect: 'wide'
  },
  {
    id: 'undip-stage-02',
    title: 'UNLIMITED UNDIP 2026',
    category: 'Panggung Juara',
    year: '2026',
    image: '/gallery/unlimited_undip/undip_stage_action_02.jpg',
    thumbnail: '/thumbnails/gallery/unlimited_undip/undip_stage_action_02.webp',
    event: 'UNLIMITED UNDIP 2026',
    aspect: 'wide'
  },
  {
    id: 'undip-stage-03',
    title: 'UNLIMITED UNDIP 2026',
    category: 'Panggung Juara',
    year: '2026',
    image: '/gallery/unlimited_undip/undip_stage_action_03.jpg',
    thumbnail: '/thumbnails/gallery/unlimited_undip/undip_stage_action_03.webp',
    event: 'UNLIMITED UNDIP 2026',
    aspect: 'wide'
  },
  {
    id: 'undip-stage-04',
    title: 'UNLIMITED UNDIP 2026',
    category: 'Panggung Juara',
    year: '2026',
    image: '/gallery/unlimited_undip/undip_stage_action_04.jpg',
    thumbnail: '/thumbnails/gallery/unlimited_undip/undip_stage_action_04.webp',
    event: 'UNLIMITED UNDIP 2026',
    aspect: 'wide'
  },
  {
    id: 'undip-stage-05',
    title: 'UNLIMITED UNDIP 2026',
    category: 'Panggung Juara',
    year: '2026',
    image: '/gallery/unlimited_undip/undip_stage_action_05.jpg',
    thumbnail: '/thumbnails/gallery/unlimited_undip/undip_stage_action_05.webp',
    event: 'UNLIMITED UNDIP 2026',
    aspect: 'wide'
  },
  {
    id: 'undip-stage-06',
    title: 'UNLIMITED UNDIP 2026',
    category: 'Panggung Juara',
    year: '2026',
    image: '/gallery/unlimited_undip/undip_stage_action_06.jpg',
    thumbnail: '/thumbnails/gallery/unlimited_undip/undip_stage_action_06.webp',
    event: 'UNLIMITED UNDIP 2026',
    aspect: 'tall'
  },
  {
    id: 'undip-stage-07',
    title: 'UNLIMITED UNDIP 2026',
    category: 'Panggung Juara',
    year: '2026',
    image: '/gallery/unlimited_undip/undip_stage_action_07.jpg',
    thumbnail: '/thumbnails/gallery/unlimited_undip/undip_stage_action_07.webp',
    event: 'UNLIMITED UNDIP 2026',
    aspect: 'tall'
  },
  {
    id: 'undip-stage-08',
    title: 'UNLIMITED UNDIP 2026',
    category: 'Arena Lomba',
    year: '2026',
    image: '/gallery/unlimited_undip/undip_stage_action_08.jpg',
    thumbnail: '/thumbnails/gallery/unlimited_undip/undip_stage_action_08.webp',
    event: 'UNLIMITED UNDIP 2026',
    aspect: 'portrait'
  },
  {
    id: 'undip-stage-09',
    title: 'UNLIMITED UNDIP 2026',
    category: 'Arena Lomba',
    year: '2026',
    image: '/gallery/unlimited_undip/undip_stage_action_09.jpg',
    thumbnail: '/thumbnails/gallery/unlimited_undip/undip_stage_action_09.webp',
    event: 'UNLIMITED UNDIP 2026',
    aspect: 'tall'
  },
  {
    id: 'undip-stage-10',
    title: 'UNLIMITED UNDIP 2026',
    category: 'Arena Lomba',
    year: '2026',
    image: '/gallery/unlimited_undip/undip_stage_action_10.jpg',
    thumbnail: '/thumbnails/gallery/unlimited_undip/undip_stage_action_10.webp',
    event: 'UNLIMITED UNDIP 2026',
    aspect: 'tall'
  },
  {
    id: 'undip-stage-11',
    title: 'UNLIMITED UNDIP 2026',
    category: 'Arena Lomba',
    year: '2026',
    image: '/gallery/unlimited_undip/undip_stage_action_11.jpg',
    thumbnail: '/thumbnails/gallery/unlimited_undip/undip_stage_action_11.webp',
    event: 'UNLIMITED UNDIP 2026',
    aspect: 'portrait'
  },
  {
    id: 'undip-stage-12',
    title: 'UNLIMITED UNDIP 2026',
    category: 'Arena Lomba',
    year: '2026',
    image: '/gallery/unlimited_undip/undip_stage_action_12.jpg',
    thumbnail: '/thumbnails/gallery/unlimited_undip/undip_stage_action_12.webp',
    event: 'UNLIMITED UNDIP 2026',
    aspect: 'tall'
  },
  {
    id: 'undip-stage-13',
    title: 'UNLIMITED UNDIP 2026',
    category: 'Arena Lomba',
    year: '2026',
    image: '/gallery/unlimited_undip/undip_stage_action_13.jpg',
    thumbnail: '/thumbnails/gallery/unlimited_undip/undip_stage_action_13.webp',
    event: 'UNLIMITED UNDIP 2026',
    aspect: 'tall'
  },
  {
    id: 'undip-stage-14',
    title: 'UNLIMITED UNDIP 2026',
    category: 'Panggung Juara',
    year: '2026',
    image: '/gallery/unlimited_undip/undip_stage_action_14.jpg',
    thumbnail: '/thumbnails/gallery/unlimited_undip/undip_stage_action_14.webp',
    event: 'UNLIMITED UNDIP 2026',
    aspect: 'wide'
  },
  {
    id: 'undip-stage-15',
    title: 'UNLIMITED UNDIP 2026',
    category: 'Panggung Juara',
    year: '2026',
    image: '/gallery/unlimited_undip/undip_stage_action_15.jpg',
    thumbnail: '/thumbnails/gallery/unlimited_undip/undip_stage_action_15.webp',
    event: 'UNLIMITED UNDIP 2026',
    aspect: 'wide'
  },
  {
    id: 'undip-stage-16',
    title: 'UNLIMITED UNDIP 2026',
    category: 'Panggung Juara',
    year: '2026',
    image: '/gallery/unlimited_undip/undip_stage_action_16.jpg',
    thumbnail: '/thumbnails/gallery/unlimited_undip/undip_stage_action_16.webp',
    event: 'UNLIMITED UNDIP 2026',
    aspect: 'wide'
  },
  {
    id: 'undip-stage-17',
    title: 'UNLIMITED UNDIP 2026',
    category: 'Behind The Scenes',
    year: '2026',
    image: '/gallery/unlimited_undip/undip_stage_action_17.jpg',
    thumbnail: '/thumbnails/gallery/unlimited_undip/undip_stage_action_17.webp',
    event: 'UNLIMITED UNDIP 2026',
    aspect: 'tall'
  },
  {
    id: 'undip-stage-18',
    title: 'UNLIMITED UNDIP 2026',
    category: 'Arena Lomba',
    year: '2026',
    image: '/gallery/unlimited_undip/undip_stage_action_18.jpg',
    thumbnail: '/thumbnails/gallery/unlimited_undip/undip_stage_action_18.webp',
    event: 'UNLIMITED UNDIP 2026',
    aspect: 'wide'
  },
  {
    id: 'undip-stage-19',
    title: 'UNLIMITED UNDIP 2026',
    category: 'Behind The Scenes',
    year: '2026',
    image: '/gallery/unlimited_undip/undip_stage_action_19.jpg',
    thumbnail: '/thumbnails/gallery/unlimited_undip/undip_stage_action_19.webp',
    event: 'UNLIMITED UNDIP 2026',
    aspect: 'wide'
  },
  {
    id: 'undip-stage-20',
    title: 'UNLIMITED UNDIP 2026',
    category: 'Panggung Juara',
    year: '2026',
    image: '/gallery/unlimited_undip/undip_stage_action_20.jpg',
    thumbnail: '/thumbnails/gallery/unlimited_undip/undip_stage_action_20.webp',
    event: 'UNLIMITED UNDIP 2026',
    aspect: 'wide'
  },
  {
    id: 'undip-stage-21',
    title: 'UNLIMITED UNDIP 2026',
    category: 'Panggung Juara',
    year: '2026',
    image: '/gallery/unlimited_undip/undip_stage_action_21.jpg',
    thumbnail: '/thumbnails/gallery/unlimited_undip/undip_stage_action_21.webp',
    event: 'UNLIMITED UNDIP 2026',
    aspect: 'wide'
  },
  {
    id: 'undip-stage-22',
    title: 'UNLIMITED UNDIP 2026',
    category: 'Arena Lomba',
    year: '2026',
    image: '/gallery/unlimited_undip/undip_stage_action_22.jpg',
    thumbnail: '/thumbnails/gallery/unlimited_undip/undip_stage_action_22.webp',
    event: 'UNLIMITED UNDIP 2026',
    aspect: 'wide'
  },
  {
    id: 'undip-stage-23',
    title: 'UNLIMITED UNDIP 2026',
    category: 'Behind The Scenes',
    year: '2026',
    image: '/gallery/unlimited_undip/undip_stage_action_23.jpg',
    thumbnail: '/thumbnails/gallery/unlimited_undip/undip_stage_action_23.webp',
    event: 'UNLIMITED UNDIP 2026',
    aspect: 'tall'
  },
  {
    id: 'undip-stage-24',
    title: 'UNLIMITED UNDIP 2026',
    category: 'Behind The Scenes',
    year: '2026',
    image: '/gallery/unlimited_undip/undip_stage_action_24.jpg',
    thumbnail: '/thumbnails/gallery/unlimited_undip/undip_stage_action_24.webp',
    event: 'UNLIMITED UNDIP 2026',
    aspect: 'tall'
  },
  {
    id: 'undip-stage-25',
    title: 'UNLIMITED UNDIP 2026',
    category: 'Panggung Juara',
    year: '2026',
    image: '/gallery/unlimited_undip/undip_stage_action_25.jpg',
    thumbnail: '/thumbnails/gallery/unlimited_undip/undip_stage_action_25.webp',
    event: 'UNLIMITED UNDIP 2026',
    aspect: 'tall'
  },
  {
    id: 'undip-uny-ugm-01',
    title: 'UNLIMITED UNDIP 2026',
    category: 'Behind The Scenes',
    year: '2026',
    image: '/gallery/unlimited_undip/undip_uny_ugm_01.jpg',
    thumbnail: '/thumbnails/gallery/unlimited_undip/undip_uny_ugm_01.webp',
    event: 'UNLIMITED UNDIP 2026',
    aspect: 'tall'
  },
  {
    id: 'undip-uny-ugm-02',
    title: 'UNLIMITED UNDIP 2026',
    category: 'Panggung Juara',
    year: '2026',
    image: '/gallery/unlimited_undip/undip_uny_ugm_02.jpg',
    thumbnail: '/thumbnails/gallery/unlimited_undip/undip_uny_ugm_02.webp',
    event: 'UNLIMITED UNDIP 2026',
    aspect: 'wide'
  },
  {
    id: 'undip-uny-ugm-03',
    title: 'UNLIMITED UNDIP 2026',
    category: 'Behind The Scenes',
    year: '2026',
    image: '/gallery/unlimited_undip/undip_uny_ugm_03.jpg',
    thumbnail: '/thumbnails/gallery/unlimited_undip/undip_uny_ugm_03.webp',
    event: 'UNLIMITED UNDIP 2026',
    aspect: 'wide'
  },
  {
    id: 'undip-uny-ugm-04',
    title: 'UNLIMITED UNDIP 2026',
    category: 'Panggung Juara',
    year: '2026',
    image: '/gallery/unlimited_undip/undip_uny_ugm_04.jpg',
    thumbnail: '/thumbnails/gallery/unlimited_undip/undip_uny_ugm_04.webp',
    event: 'UNLIMITED UNDIP 2026',
    aspect: 'wide'
  },
  {
    id: 'undip-uny-ugm-05',
    title: 'UNLIMITED UNDIP 2026',
    category: 'Behind The Scenes',
    year: '2026',
    image: '/gallery/unlimited_undip/undip_uny_ugm_05.jpg',
    thumbnail: '/thumbnails/gallery/unlimited_undip/undip_uny_ugm_05.webp',
    event: 'UNLIMITED UNDIP 2026',
    aspect: 'wide'
  },
  {
    id: 'undip-uny-ugm-06',
    title: 'UNLIMITED UNDIP 2026',
    category: 'Panggung Juara',
    year: '2026',
    image: '/gallery/unlimited_undip/undip_uny_ugm_06.jpg',
    thumbnail: '/thumbnails/gallery/unlimited_undip/undip_uny_ugm_06.webp',
    event: 'UNLIMITED UNDIP 2026',
    aspect: 'tall'
  },
  {
    id: 'undip-uny-ugm-07',
    title: 'UNLIMITED UNDIP 2026',
    category: 'Behind The Scenes',
    year: '2026',
    image: '/gallery/unlimited_undip/undip_uny_ugm_07.jpg',
    thumbnail: '/thumbnails/gallery/unlimited_undip/undip_uny_ugm_07.webp',
    event: 'UNLIMITED UNDIP 2026',
    aspect: 'wide'
  },
  {
    id: 'undip-uny-ugm-08',
    title: 'UNLIMITED UNDIP 2026',
    category: 'Behind The Scenes',
    year: '2026',
    image: '/gallery/unlimited_undip/undip_uny_ugm_08.jpg',
    thumbnail: '/thumbnails/gallery/unlimited_undip/undip_uny_ugm_08.webp',
    event: 'UNLIMITED UNDIP 2026',
    aspect: 'wide'
  },
  {
    id: 'undip-uny-ugm-09',
    title: 'UNLIMITED UNDIP 2026',
    category: 'Panggung Juara',
    year: '2026',
    image: '/gallery/unlimited_undip/undip_uny_ugm_09.jpg',
    thumbnail: '/thumbnails/gallery/unlimited_undip/undip_uny_ugm_09.webp',
    event: 'UNLIMITED UNDIP 2026',
    aspect: 'wide'
  },
  {
    id: 'undip-uny-ugm-10',
    title: 'UNLIMITED UNDIP 2026',
    category: 'Behind The Scenes',
    year: '2026',
    image: '/gallery/unlimited_undip/undip_uny_ugm_10.jpg',
    thumbnail: '/thumbnails/gallery/unlimited_undip/undip_uny_ugm_10.webp',
    event: 'UNLIMITED UNDIP 2026',
    aspect: 'tall'
  },
  {
    id: 'undip-uny-ugm-11',
    title: 'UNLIMITED UNDIP 2026',
    category: 'Behind The Scenes',
    year: '2026',
    image: '/gallery/unlimited_undip/undip_uny_ugm_11.jpg',
    thumbnail: '/thumbnails/gallery/unlimited_undip/undip_uny_ugm_11.webp',
    event: 'UNLIMITED UNDIP 2026',
    aspect: 'tall'
  },
  {
    id: 'undip-uny-ugm-12',
    title: 'UNLIMITED UNDIP 2026',
    category: 'Panggung Juara',
    year: '2026',
    image: '/gallery/unlimited_undip/undip_uny_ugm_12.jpg',
    thumbnail: '/thumbnails/gallery/unlimited_undip/undip_uny_ugm_12.webp',
    event: 'UNLIMITED UNDIP 2026',
    aspect: 'tall'
  },
  {
    id: 'undip-trophy-01',
    title: 'UNLIMITED UNDIP 2026',
    category: 'Panggung Juara',
    year: '2026',
    image: '/gallery/unlimited_undip/undip_trophy_squad_01.jpg',
    thumbnail: '/thumbnails/gallery/unlimited_undip/undip_trophy_squad_01.webp',
    event: 'UNLIMITED UNDIP 2026',
    aspect: 'portrait'
  },
  {
    id: 'undip-trophy-02',
    title: 'UNLIMITED UNDIP 2026',
    category: 'Panggung Juara',
    year: '2026',
    image: '/gallery/unlimited_undip/undip_trophy_squad_02.jpg',
    thumbnail: '/thumbnails/gallery/unlimited_undip/undip_trophy_squad_02.webp',
    event: 'UNLIMITED UNDIP 2026',
    aspect: 'portrait'
  },
  {
    id: 'undip-trophy-03',
    title: 'UNLIMITED UNDIP 2026',
    category: 'Panggung Juara',
    year: '2026',
    image: '/gallery/unlimited_undip/undip_trophy_squad_03.jpg',
    thumbnail: '/thumbnails/gallery/unlimited_undip/undip_trophy_squad_03.webp',
    event: 'UNLIMITED UNDIP 2026',
    aspect: 'portrait'
  },
  {
    id: 'undip-trophy-04',
    title: 'UNLIMITED UNDIP 2026',
    category: 'Panggung Juara',
    year: '2026',
    image: '/gallery/unlimited_undip/undip_trophy_squad_04.jpg',
    thumbnail: '/thumbnails/gallery/unlimited_undip/undip_trophy_squad_04.webp',
    event: 'UNLIMITED UNDIP 2026',
    aspect: 'portrait'
  },
  {
    id: 'undip-trophy-05',
    title: 'UNLIMITED UNDIP 2026',
    category: 'Panggung Juara',
    year: '2026',
    image: '/gallery/unlimited_undip/undip_trophy_squad_05.jpg',
    thumbnail: '/thumbnails/gallery/unlimited_undip/undip_trophy_squad_05.webp',
    event: 'UNLIMITED UNDIP 2026',
    aspect: 'tall'
  },
  {
    id: 'undip-trophy-06',
    title: 'UNLIMITED UNDIP 2026',
    category: 'Panggung Juara',
    year: '2026',
    image: '/gallery/unlimited_undip/undip_trophy_squad_06.jpg',
    thumbnail: '/thumbnails/gallery/unlimited_undip/undip_trophy_squad_06.webp',
    event: 'UNLIMITED UNDIP 2026',
    aspect: 'tall'
  },
  {
    id: 'undip-trophy-07',
    title: 'UNLIMITED UNDIP 2026',
    category: 'Panggung Juara',
    year: '2026',
    image: '/gallery/unlimited_undip/undip_trophy_squad_07.jpg',
    thumbnail: '/thumbnails/gallery/unlimited_undip/undip_trophy_squad_07.webp',
    event: 'UNLIMITED UNDIP 2026',
    aspect: 'tall'
  },
  {
    id: 'undip-trophy-08',
    title: 'UNLIMITED UNDIP 2026',
    category: 'Panggung Juara',
    year: '2026',
    image: '/gallery/unlimited_undip/undip_trophy_squad_08.jpg',
    thumbnail: '/thumbnails/gallery/unlimited_undip/undip_trophy_squad_08.webp',
    event: 'UNLIMITED UNDIP 2026',
    aspect: 'tall'
  },
  {
    id: 'undip-trophy-09',
    title: 'UNLIMITED UNDIP 2026',
    category: 'Panggung Juara',
    year: '2026',
    image: '/gallery/unlimited_undip/undip_trophy_squad_09.jpg',
    thumbnail: '/thumbnails/gallery/unlimited_undip/undip_trophy_squad_09.webp',
    event: 'UNLIMITED UNDIP 2026',
    aspect: 'tall'
  },
  {
    id: 'undip-trophy-10',
    title: 'UNLIMITED UNDIP 2026',
    category: 'Panggung Juara',
    year: '2026',
    image: '/gallery/unlimited_undip/undip_trophy_squad_10.jpg',
    thumbnail: '/thumbnails/gallery/unlimited_undip/undip_trophy_squad_10.webp',
    event: 'UNLIMITED UNDIP 2026',
    aspect: 'tall'
  },
  {
    id: 'undip-trophy-11',
    title: 'UNLIMITED UNDIP 2026',
    category: 'Panggung Juara',
    year: '2026',
    image: '/gallery/unlimited_undip/undip_trophy_squad_11.jpg',
    thumbnail: '/thumbnails/gallery/unlimited_undip/undip_trophy_squad_11.webp',
    event: 'UNLIMITED UNDIP 2026',
    aspect: 'tall'
  },
  {
    id: 'undip-trophy-12',
    title: 'UNLIMITED UNDIP 2026',
    category: 'Panggung Juara',
    year: '2026',
    image: '/gallery/unlimited_undip/undip_trophy_squad_12.jpg',
    thumbnail: '/thumbnails/gallery/unlimited_undip/undip_trophy_squad_12.webp',
    event: 'UNLIMITED UNDIP 2026',
    aspect: 'tall'
  },
  {
    id: 'undip-trophy-13',
    title: 'UNLIMITED UNDIP 2026',
    category: 'Panggung Juara',
    year: '2026',
    image: '/gallery/unlimited_undip/undip_trophy_squad_13.jpg',
    thumbnail: '/thumbnails/gallery/unlimited_undip/undip_trophy_squad_13.webp',
    event: 'UNLIMITED UNDIP 2026',
    aspect: 'tall'
  },
  {
    id: 'undip-trophy-14',
    title: 'UNLIMITED UNDIP 2026',
    category: 'Panggung Juara',
    year: '2026',
    image: '/gallery/unlimited_undip/undip_trophy_squad_14.jpg',
    thumbnail: '/thumbnails/gallery/unlimited_undip/undip_trophy_squad_14.webp',
    event: 'UNLIMITED UNDIP 2026',
    aspect: 'tall'
  },
  {
    id: 'undip-trophy-15',
    title: 'UNLIMITED UNDIP 2026',
    category: 'Panggung Juara',
    year: '2026',
    image: '/gallery/unlimited_undip/undip_trophy_squad_15.jpg',
    thumbnail: '/thumbnails/gallery/unlimited_undip/undip_trophy_squad_15.webp',
    event: 'UNLIMITED UNDIP 2026',
    aspect: 'tall'
  },
  {
    id: 'undip-trophy-16',
    title: 'UNLIMITED UNDIP 2026',
    category: 'Panggung Juara',
    year: '2026',
    image: '/gallery/unlimited_undip/undip_trophy_squad_16.jpg',
    thumbnail: '/thumbnails/gallery/unlimited_undip/undip_trophy_squad_16.webp',
    event: 'UNLIMITED UNDIP 2026',
    aspect: 'tall'
  },
  {
    id: 'undip-trophy-17',
    title: 'UNLIMITED UNDIP 2026',
    category: 'Panggung Juara',
    year: '2026',
    image: '/gallery/unlimited_undip/undip_trophy_squad_17.jpg',
    thumbnail: '/thumbnails/gallery/unlimited_undip/undip_trophy_squad_17.webp',
    event: 'UNLIMITED UNDIP 2026',
    aspect: 'tall'
  },
  {
    id: 'undip-trophy-18',
    title: 'UNLIMITED UNDIP 2026',
    category: 'Panggung Juara',
    year: '2026',
    image: '/gallery/unlimited_undip/undip_trophy_squad_18.jpg',
    thumbnail: '/thumbnails/gallery/unlimited_undip/undip_trophy_squad_18.webp',
    event: 'UNLIMITED UNDIP 2026',
    aspect: 'tall'
  },
  {
    id: 'undip-trophy-19',
    title: 'UNLIMITED UNDIP 2026',
    category: 'Panggung Juara',
    year: '2026',
    image: '/gallery/unlimited_undip/undip_trophy_squad_19.jpg',
    thumbnail: '/thumbnails/gallery/unlimited_undip/undip_trophy_squad_19.webp',
    event: 'UNLIMITED UNDIP 2026',
    aspect: 'tall'
  },
  {
    id: 'undip-trophy-20',
    title: 'UNLIMITED UNDIP 2026',
    category: 'Panggung Juara',
    year: '2026',
    image: '/gallery/unlimited_undip/undip_trophy_squad_20.jpg',
    thumbnail: '/thumbnails/gallery/unlimited_undip/undip_trophy_squad_20.webp',
    event: 'UNLIMITED UNDIP 2026',
    aspect: 'tall'
  },
  {
    id: 'undip-trophy-21',
    title: 'UNLIMITED UNDIP 2026',
    category: 'Panggung Juara',
    year: '2026',
    image: '/gallery/unlimited_undip/undip_trophy_squad_21.jpg',
    thumbnail: '/thumbnails/gallery/unlimited_undip/undip_trophy_squad_21.webp',
    event: 'UNLIMITED UNDIP 2026',
    aspect: 'tall'
  },
  {
    id: 'undip-trophy-22',
    title: 'UNLIMITED UNDIP 2026',
    category: 'Panggung Juara',
    year: '2026',
    image: '/gallery/unlimited_undip/undip_trophy_squad_22.jpg',
    thumbnail: '/thumbnails/gallery/unlimited_undip/undip_trophy_squad_22.webp',
    event: 'UNLIMITED UNDIP 2026',
    aspect: 'tall'
  },
  {
    id: 'undip-trophy-23',
    title: 'UNLIMITED UNDIP 2026',
    category: 'Panggung Juara',
    year: '2026',
    image: '/gallery/unlimited_undip/undip_trophy_squad_23.jpg',
    thumbnail: '/thumbnails/gallery/unlimited_undip/undip_trophy_squad_23.webp',
    event: 'UNLIMITED UNDIP 2026',
    aspect: 'tall'
  }
];

export const GALLERY_CATEGORIES = [
  'Semua',
  'Arena Lomba',
  'Panggung Juara',
  'Riset & Lab',
  'Behind The Scenes',
  'Video Aksi'
] as const;

// 5 Distinct Rows for the Photo & Video Marquee Wall
// Combining historic championship moments, KRTMI arena matches, and the vibrant UNLIMITED UNDIP 2026 trophy haul
export const GALLERY_ROWS = {
  row1: [
    ...GALLERY_ITEMS.filter((it) => it.category === 'Panggung Juara').slice(0, 16),
    GALLERY_ITEMS.find((it) => it.id === 'vid-kilas-balik-2024')!,
    GALLERY_ITEMS.find((it) => it.id === 'vid-shorts-selebrasi-juara')!
  ],
  row2: [
    ...GALLERY_ITEMS.filter((it) => it.category === 'Arena Lomba').slice(0, 16),
    GALLERY_ITEMS.find((it) => it.id === 'vid-live-krtmi-2024')!,
    GALLERY_ITEMS.find((it) => it.id === 'vid-shorts-recap-2023')!
  ],
  row3: [
    ...GALLERY_ITEMS.filter((it) => it.id.startsWith('undip-uny-ugm-') || (it.category === 'Behind The Scenes' && !it.isVideo)).slice(0, 16),
    GALLERY_ITEMS.find((it) => it.id === 'vid-perjalanan-krtmi')!,
    GALLERY_ITEMS.find((it) => it.id === 'vid-shorts-fabrikasi-3d')!
  ],
  row4: [
    ...GALLERY_ITEMS.filter((it) => it.category === 'Riset & Lab' || it.id.startsWith('undip-stage-')).slice(0, 16),
    GALLERY_ITEMS.find((it) => it.id === 'vid-oprec-tim')!,
    GALLERY_ITEMS.find((it) => it.id === 'vid-shorts-simulasi-sirkuit')!
  ],
  row5: [
    ...GALLERY_ITEMS.filter((it) => it.id.startsWith('undip-trophy-')).slice(0, 18),
    GALLERY_ITEMS.find((it) => it.id === 'vid-kilas-balik-2024')!,
    GALLERY_ITEMS.find((it) => it.id === 'vid-live-krtmi-2024')!
  ]
};

