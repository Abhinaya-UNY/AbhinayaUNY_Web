export interface NewsArticle {
  id: string;
  title: string;
  portal: string;
  url: string;
  date: string;
  year: number;
  badge: string;
  badgeColor: string;
  summary: string;
  image: string;
  sourceType: 'official' | 'national_media' | 'press_release';
  stats?: string;
}

export const OFFICIAL_NEWS_ARTICLES: NewsArticle[] = [
  {
    id: 'uny-news-juara-2-nasional-2024',
    title: 'Abhinaya Meraih Juara 2 Nasional di Kompetisi KRI Divisi KRTMI 2024',
    portal: 'UNY Official News',
    url: 'https://www.uny.ac.id/id/berita/abhinaya-meraih-juara-2-nasional-di-kompetisi-kri-divisi-krtmi-2024',
    date: 'Juli 2024',
    year: 2024,
    badge: '🏆 JUARA 2 NASIONAL',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    summary: 'Tim Robot Abhinaya Universitas Negeri Yogyakarta (UNY) menorehkan prestasi gemilang dengan meraih Juara 2 Tingkat Nasional pada Kontes Robot Tematik Indonesia (KRTMI) 2024 di Edutorium Universitas Muhammadiyah Surakarta (UMS) yang diselenggarakan oleh BPTI Puspresnas Kemendikbudristek.',
    image: '/images/tournaments/krtmi_2024_thumb.jpg',
    sourceType: 'official',
    stats: 'Liputan Resmi Humas UNY',
  },
  {
    id: 'antara-news-kri-2024',
    title: 'Sebanyak 142 Tim dari Perguruan Tinggi Ikuti Kontes Robot Indonesia (KRI 2024)',
    portal: 'ANTARA News TV',
    url: 'https://ramadhan.antaranews.com/video/4184535/sebanyak-142-tim-dari-perguruan-tinggi-ikuti-kontes-robot-indonesia?utm_source=antaranews&utm_medium=desktop&utm_campaign=related_news',
    date: 'Juli 2024',
    year: 2024,
    badge: '📺 LIPUTAN TV NASIONAL',
    badgeColor: 'bg-red-600/20 text-red-400 border-red-500/40',
    summary: 'Kantor Berita Nasional ANTARA menayangkan liputan video kemeriahan dan persaingan ketat 142 tim robotika terbaik dari berbagai perguruan tinggi se-Indonesia dalam ajang Kontes Robot Indonesia (KRI) 2024 di Surakarta.',
    image: '/assets/hero_abhinaya.jpg',
    sourceType: 'national_media',
    stats: 'Video Reportase ANTARA TV',
  },
  {
    id: 'uny-news-juara-1-wilayah-2024',
    title: 'Abhinaya Raih Juara 1 di Kontes Robot Tematik Indonesia Wilayah I Tahun 2024',
    portal: 'UNY Official News',
    url: 'http://www.uny.ac.id/id/berita/abhinaya-raih-juara-1-di-konteks-robot-tematik-indonesia-wilayah-i-tahun-2024',
    date: 'Mei 2024',
    year: 2024,
    badge: '🥇 JUARA 1 REGIONAL I',
    badgeColor: 'bg-brand-orange/20 text-brand-orange border-brand-orange/40',
    summary: 'Kontingen Robotika Abhinaya UNY sukses menyabet Juara 1 Regional I Wilayah KRTMI 2024 dengan performa otonom tercepat dan akurasi visi komputer AI tanpa cela, mengamankan tiket melaju ke putaran final nasional.',
    image: '/images/tournaments/krtmi_2024_cover.png',
    sourceType: 'official',
    stats: 'Pemberitaan Resmi UNY',
  },
  {
    id: 'uny-news-juara-krtmi-perdana',
    title: 'Robot Abhinaya UNY Sabet Juara Pertama Kontes Robot Tematik Indonesia',
    portal: 'Humas FT UNY',
    url: 'https://www.uny.ac.id/index.php/id/berita/robot-abhinaya-uny-sabet-juara-pertama-kontes-robot-tematik-indonesia',
    date: 'Oktober 2021',
    year: 2021,
    badge: '🎖️ PIONIR KRTMI',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    summary: 'Sejarah kemenangan emas divisi KRTMI UNY di kancah nasional dengan rekor strategi navigasi otonom terunggul di bawah bimbingan dosen Fakultas Teknik UNY.',
    image: '/images/tournaments/krtmi_2021_cover.png',
    sourceType: 'official',
    stats: 'Arsip Berita Kemendikbud',
  },
  {
    id: 'bpti-puspresnas-kri',
    title: 'Balai Pengembangan Talenta Indonesia (BPTI) Kemendikbudristek — Kontes Robot Indonesia',
    portal: 'Pusat Prestasi Nasional',
    url: 'https://pusatprestasinasional.kemdikbud.go.id/',
    date: '2024',
    year: 2024,
    badge: '🏛️ BPTI PUSPRESNAS',
    badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
    summary: 'Pangkalan data resmi ajang talenta Kontes Robot Indonesia (KRI) yang dikelola oleh Balai Pengembangan Talenta Indonesia, Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi Republik Indonesia.',
    image: '/images/tournaments/krtmi_2023_cover.png',
    sourceType: 'press_release',
    stats: 'Portal Resmi Puspresnas',
  },
];
