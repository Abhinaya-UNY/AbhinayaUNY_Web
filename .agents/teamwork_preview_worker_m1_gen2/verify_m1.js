const fs = require('fs');
const assert = require('assert');

console.log('--- Verifying Milestone 1 Requirements ---');

// 1. data/newsData.ts
const newsContent = fs.readFileSync('data/newsData.ts', 'utf8');
assert(newsContent.includes('"date": "2026"'), 'newsData must have date 2026 for UNDIP');
assert(newsContent.includes('UNLIMITED UNDIP 2026'), 'newsData title must have 2026');
assert(newsContent.includes('UNLIMITED Robot 2026 • UNDIP'), 'newsData stats must have 2026');
assert(newsContent.includes('Rilis pers resmi Rektorat UNY mengulas keberhasilan robot Abhinaya'), 'newsData must have authentic uny-krtmi summary');
console.log('✔ 1. data/newsData.ts passed');

// 2. components/Achievements.tsx
const achContent = fs.readFileSync('components/Achievements.tsx', 'utf8');
assert(achContent.includes("year: '2026'"), 'Achievements must have year 2026');
assert(achContent.includes("event: 'UNLIMITED Robotics Competition UNDIP 2026'"), 'Achievements event must have 2026');
assert(achContent.includes('Penghargaan Resmi Teknik Elektro UNDIP'), 'Achievements must have dynamic UNDIP organizer label');
assert(achContent.includes('Sertifikasi Resmi DTETI FT UGM'), 'Achievements must have dynamic UGM organizer label');
assert(achContent.includes('Kabinet Prestasi &amp; Jejak Podium Nasional'), 'Achievements must have authentic title');
console.log('✔ 2. components/Achievements.tsx passed');

// 3. ARSIP_BERITA_DAN_MEDIA_ABHINAYA.md
const arsipContent = fs.readFileSync('ARSIP_BERITA_DAN_MEDIA_ABHINAYA.md', 'utf8');
assert(arsipContent.includes('## 3. PRESTASI LOMBA ROBOT KREATIF NASIONAL UNLIMITED UNDIP 2026'), 'ARSIP Section 3 heading must have 2026');
assert(arsipContent.includes('[Prestasi Lomba Robot Kreatif Nasional UNLIMITED UNDIP 2026](#3-prestasi-lomba-robot-kreatif-nasional-unlimited-undip-2026)'), 'ARSIP TOC Section 3 must have 2026');
assert(arsipContent.includes('## 4. TRANSKRIP LENGKAP SELURUH ARTIKEL BERITA (2019 – 2026)'), 'ARSIP Section 4 must have 2019-2026');
assert(arsipContent.includes('[Transkrip Lengkap Seluruh Artikel Berita (2019 – 2026)](#4-transkrip-lengkap-seluruh-artikel-berita-2019--2026)'), 'ARSIP TOC Section 4 must have 2019-2026');
console.log('✔ 3. ARSIP_BERITA_DAN_MEDIA_ABHINAYA.md passed');

// 4. app/prestasi/page.tsx
const prestasiContent = fs.readFileSync('app/prestasi/page.tsx', 'utf8');
assert(prestasiContent.includes('UNLIMITED Robotics Competition UNDIP 2026'), 'app/prestasi/page.tsx must mention UNDIP 2026');
console.log('✔ 4. app/prestasi/page.tsx passed');

// 5. components/KRIOverview.tsx
const kriContent = fs.readFileSync('components/KRIOverview.tsx', 'utf8');
assert(kriContent.includes('2023: Digital Twin Cyber-Physical'), 'KRIOverview must have 2023 Digital Twin');
assert(kriContent.includes('2024: Pemilah Sampah Cerdas'), 'KRIOverview must have 2024 Pemilah Sampah');
assert(kriContent.includes('2026: Technocorner &amp; UNDIP'), 'KRIOverview must have 2026 Technocorner & UNDIP');
assert(kriContent.includes('Kinematika Holonomik 4WD Mecanum'), 'KRIOverview must have Kinematika Holonomik 4WD Mecanum');
assert(kriContent.includes('Visi Komputer AI & Deteksi Real-Time'), 'KRIOverview must have Visi Komputer AI');
assert(kriContent.includes('YOLOv8'), 'KRIOverview must mention YOLOv8');
assert(kriContent.includes('DIVISI RESMI KONTES ROBOT INDONESIA (KRI)'), 'KRIOverview badge must be authentic');
console.log('✔ 5. components/KRIOverview.tsx passed');

// 6. data/galleryData.ts
const galleryContent = fs.readFileSync('data/galleryData.ts', 'utf8');
assert(galleryContent.includes('Manuver holonomik 4WD Mecanum'), 'galleryData item 2 must have authentic caption');
assert(galleryContent.includes('Pengecekan tegangan sel baterai'), 'galleryData item 3 must have authentic caption');
assert(galleryContent.includes('Solidaritas seluruh kontingen UKM Rekayasa Teknologi UNY'), 'galleryData item 4 must have authentic caption');
console.log('✔ 6. data/galleryData.ts passed');

// 7. components/SocialMediaHub.tsx
const smContent = fs.readFileSync('components/SocialMediaHub.tsx', 'utf8');
assert(smContent.includes('JARINGAN MEDIA SOSIAL RESMI'), 'SocialMediaHub badge must be JARINGAN MEDIA SOSIAL RESMI');
assert(smContent.includes('Simak cuplikan uji coba sirkuit'), 'SocialMediaHub subtitle must be authentic');
console.log('✔ 7. components/SocialMediaHub.tsx passed');

// 8. components/Footer.tsx
const footerContent = fs.readFileSync('components/Footer.tsx', 'utf8');
assert(footerContent.includes('Dikelola secara mandiri oleh Tim Robotika Abhinaya — UKM Rekayasa Teknologi Universitas Negeri Yogyakarta.'), 'Footer text must be authentic');
console.log('✔ 8. components/Footer.tsx passed');

// 9. app/divisi/page.tsx
const divisiContent = fs.readFileSync('app/divisi/page.tsx', 'utf8');
assert(divisiContent.includes('Di UKM Restek UNY, kami menyediakan kurikulum pelatihan bertahap'), 'divisi FAQ 1 must be authentic');
assert(divisiContent.includes('Ekuivalensi/Rekognisi Pembelajaran Lampau'), 'divisi FAQ 3 must be authentic');
console.log('✔ 9. app/divisi/page.tsx passed');

console.log('\n======================================');
console.log('ALL 9 VERIFICATION CHECKS PASSED 100%!');
console.log('======================================');
