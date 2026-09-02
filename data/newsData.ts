/**
 * Authentic News, Media Coverage & National Press Releases
 * Tim Robotika Abhinaya UNY
 * Universitas Negeri Yogyakarta
 */

export interface NewsArticle {
  id: string;
  title: string;
  publisher: string;
  portal: string;
  date: string;
  category: string;
  type: 'article' | 'video' | 'press_release';
  summary: string;
  url: string;
  badge: string;
  badgeColor: string;
  image: string;
  stats: string;
  readTime: string;
}

export type NewsItem = NewsArticle;

export const OFFICIAL_NEWS_ARTICLES: NewsArticle[] = [
  {
    "id": "uny-krtmi-juara-2-nasional-2024",
    "title": "Abhinaya Meraih Juara 2 Nasional di Kompetisi KRI Divisi KRTMI 2024",
    "publisher": "Humas FT Universitas Negeri Yogyakarta",
    "portal": "FT UNY Official",
    "date": "Juli 2024",
    "category": "Prestasi Nasional",
    "type": "article",
    "summary": "Tim Robotika Abhinaya UNY berhasil menorehkan prestasi gemilang sebagai Juara 2 Tingkat Nasional divisi Kontes Robot Tematik Indonesia (KRTMI) pada ajang Kontes Robot Indonesia (KRI) 2024 di UMS Surakarta.",
    "url": "https://ft.uny.ac.id/id/berita/abhinaya-meraih-juara-2-nasional-di-kompetisi-kri-divisi-krtmi-2024",
    "badge": "🥈 JUARA 2 NASIONAL",
    "badgeColor": "bg-amber-500/20 text-amber-300 border-amber-500/40",
    "image": "/assets/team_podium_1.jpg",
    "stats": "Puspresnas • 142 Kampus",
    "readTime": "3 min baca"
  },
  {
    "id": "antara-kri-2024-video",
    "title": "Sebanyak 142 Tim dari Perguruan Tinggi Ikuti Kontes Robot Indonesia (KRI 2024)",
    "publisher": "LKBN ANTARA News TV",
    "portal": "ANTARA News TV",
    "date": "Juli 2024",
    "category": "Liputan Media Nasional",
    "type": "video",
    "summary": "Liputan berita video resmi LKBN ANTARA mengenai penyelenggaraan KRI Nasional 2024 di Edutorium UMS Surakarta, menyoroti persaingan ketat divisi robot tematik otonom yang dimenangkan Abhinaya UNY.",
    "url": "https://ramadhan.antaranews.com/video/4184535/sebanyak-142-tim-dari-perguruan-tinggi-ikuti-kontes-robot-indonesia?utm_source=antaranews&utm_medium=desktop&utm_campaign=related_news",
    "badge": "📺 LIPUTAN TV NASIONAL",
    "badgeColor": "bg-red-600/20 text-red-400 border-red-500/40",
    "image": "/assets/hero_team_stage.jpg",
    "stats": "Video Jurnalisme • 2:45 min",
    "readTime": "Video 2:45"
  },
  {
    "id": "uny-krtmi-juara-1-wilayah-2024",
    "title": "Abhinaya Raih Juara 1 di Kontes Robot Tematik Indonesia Wilayah I Tahun 2024",
    "publisher": "Humas FT Universitas Negeri Yogyakarta",
    "portal": "FT UNY Official",
    "date": "Mei 2024",
    "category": "Prestasi Wilayah",
    "type": "article",
    "summary": "Tampil dominan dengan waktu tercepat dan akurasi klasifikasi sampah berbasis AI, Abhinaya UNY dinobatkan sebagai Juara 1 KRTMI Wilayah I (Regional Barat).",
    "url": "https://ft.uny.ac.id/id/berita/abhinaya-raih-juara-1-di-konteks-robot-tematik-indonesia-wilayah-i-tahun-2024",
    "badge": "🥇 JUARA 1 WILAYAH",
    "badgeColor": "bg-brand-orange/20 text-brand-orange border-brand-orange/40",
    "image": "/assets/team_podium_2.jpg",
    "stats": "BPTI Kemendikbudristek",
    "readTime": "2 min baca"
  },
  {
    "id": "undip-unlimited-robot-finalist",
    "title": "Abhinaya Lolos Sebagai Finalis Lomba Robot Kreatif Nasional UNLIMITED UNDIP",
    "publisher": "Departemen Teknik Elektro Universitas Diponegoro",
    "portal": "UNDIP Semarang",
    "date": "2024",
    "category": "Inovasi Kreatif",
    "type": "article",
    "summary": "Tim Robotika Abhinaya UNY membuktikan keunggulan inovasi rekayasa mekatronika dengan menembus babak finalis kompetisi robot kreatif bergengsi UNLIMITED UNDIP Semarang.",
    "url": "https://www.instagram.com/p/DcEIl23oGWv/",
    "badge": "💡 FINALIS ROBOT KREATIF",
    "badgeColor": "bg-emerald-500/20 text-emerald-400 border-emerald-500/40",
    "image": "/assets/robot_action_2.jpg",
    "stats": "UNLIMITED Robot • UNDIP",
    "readTime": "2 min baca"
  },
  {
    "id": "uny-krtmi-juara-pusat-2024",
    "title": "Robot Abhinaya UNY Sabet Juara Pertama Kontes Robot Tematik Indonesia",
    "publisher": "Portal Berita Utama UNY Pusat",
    "portal": "UNY Pusat Rektorat",
    "date": "2024",
    "category": "Siaran Pers Resmi",
    "type": "article",
    "summary": "Siaran pers resmi universitas memberitakan pencapaian membanggakan kontingen Robotika Abhinaya UNY di kancah robotika nasional.",
    "url": "https://www.uny.ac.id/id/berita/robot-abhinaya-uny-sabet-juara-pertama-kontes-robot-tematik-indonesia",
    "badge": "📰 SIARAN PERS REKTORAT",
    "badgeColor": "bg-blue-500/20 text-blue-400 border-blue-500/40",
    "image": "/assets/hero_abhinaya.jpg",
    "stats": "Portal Utama UNY",
    "readTime": "3 min baca"
  },
  {
    "id": "uny-kri-enam-juara-2023",
    "title": "Tim Robotika UNY Sabet Enam Kejuaraan Divisi Lomba Kontes Robot Indonesia 2023",
    "publisher": "Humas FT Universitas Negeri Yogyakarta",
    "portal": "FT UNY Official",
    "date": "Juli 2023",
    "category": "Arsip Kejuaraan",
    "type": "article",
    "summary": "Rekapitulasi kemenangan kontingen robotika UNY pada KRI Nasional 2023 di Universitas Semarang (USM) dengan torehan 6 trofi kejuaraan divisi.",
    "url": "https://ft.uny.ac.id/id/berita/tim-robotika-uny-sabet-enam-kejuaraan-divisi-lomba-kontes-robot-indonesia-2023",
    "badge": "🏆 KONTINGEN REKOR",
    "badgeColor": "bg-purple-500/20 text-purple-400 border-purple-500/40",
    "image": "/assets/WEB_5721.jpg",
    "stats": "6 Piala KRI 2023",
    "readTime": "3 min baca"
  },
  {
    "id": "uny-kri-lolos-nasional-2022",
    "title": "Seluruh Tim Robot UNY Lolos KRI 2022 Tingkat Nasional di ITS Surabaya",
    "publisher": "Portal Berita Utama UNY Pusat",
    "portal": "UNY Pusat",
    "date": "Juni 2022",
    "category": "Arsip Kompetisi",
    "type": "article",
    "summary": "Perjuangan kontingen robotika UNY termasuk divisi Robot Tematik Abhinaya dalam melangkah ke putaran final nasional KRI 2022 di Institut Teknologi Sepuluh Nopember.",
    "url": "http://www.uny.ac.id/id/berita/seluruh-tim-robot-uny-lolos-kri-2022-tingkat-nasional",
    "badge": "🎯 FINALIS NASIONAL",
    "badgeColor": "bg-cyan-500/20 text-cyan-400 border-cyan-500/40",
    "image": "/assets/robot_action_1.jpg",
    "stats": "ITS Surabaya Host",
    "readTime": "2 min baca"
  },
  {
    "id": "uny-kri-piala-nasional-2019",
    "title": "Apresiasi Perjuangan Tim Robotika UNY dalam KRI & Bawa Pulang 3 Piala Nasional",
    "publisher": "Portal Berita Utama UNY Pusat",
    "portal": "UNY Pusat",
    "date": "2019",
    "category": "Arsip Pionir KRTMI",
    "type": "article",
    "summary": "Kilas balik tahun pionir kontingen robotika UNY dan divisi tematik Abhinaya pada ajang Kontes Robot Indonesia tingkat nasional.",
    "url": "http://www.uny.ac.id/id/berita/apresiasi-pejuangan-tim-robotika-uny-dalam-kri-2019",
    "badge": "📜 PIONIR KRTMI 2019",
    "badgeColor": "bg-amber-600/20 text-amber-400 border-amber-600/40",
    "image": "/assets/IMG-20240706-WA0117.jpg",
    "stats": "Arsip Sejarah KRI",
    "readTime": "3 min baca"
  }
];
export const OFFICIAL_NEWS_ITEMS = OFFICIAL_NEWS_ARTICLES;
