# LAPORAN PELAKSANAAN MILESTONE 2: ZERO-OVERLAY PHOTO UNBLOCKING & BESPOKE LAYOUT REFINEMENT
**Tim Robotika Abhinaya UNY — Divisi Kontes Robot Tematik Indonesia (KRTMI)**  
**Worker**: Worker M2 (Photo Unblocking & Layout Refinement)  
**Tanggal**: 2026-09-05  
**Status**: 100% Selesai & Terverifikasi (Build 0 Error, E2E Validated)

---

## 1. Ringkasan Eksekutif

Sesuai instruksi pada `DISPATCH.md` dan kebutuhan `ORIGINAL_REQUEST.md` (Kebutuhan R1), Worker M2 telah menuntaskan perombakan struktural menyeluruh pada 6 komponen visual foto utama untuk membasmi masalah desain:
- **Zero Text / Badge Over Faces & Robots**: Tidak ada lagi teks judul, deskripsi panjang, badge kategori melayang, atau indikator slide yang menutupi wajah anggota tim, piala kejuaraan, atau struktur robot.
- **Zero Dark Gradient Haze**: Menghapus seluruh gradient hitam pekat (`bg-gradient-to-t from-black...`) dari permukaan foto sehingga subjek tampil tajam, bersih, dan terang secara alami (*pristine natural clarity*).
- **Decoupled 3-Part Architecture**: Memisahkan wadah komponen secara fisik menjadi:
  1. *Top Meta Header Bar* (di atas foto untuk badge resmi/kategori).
  2. *Pristine Natural Aspect Ratio Viewport* (tengah untuk foto murni 100% bebas overlay).
  3. *Dedicated Caption & Narrative Panel* (di bawah foto untuk judul, deskripsi mendalam, dan statistik).
- **Bespoke Dark-Emerald High-Tech Styling**: Menggantikan gaya generik dengan palet khas Abhinaya (latar `#070b09`, kontainer `#0c1411`, aksen *emerald* `#10b981`, bezel menyala halus, dan *glassmorphism* elegan).
- **Authentic Engineering Copywriting**: Menerapkan narasi robotika yang lugas, tajam, dan mencerminkan dedikasi kontingen riset KRTMI UKM Rekayasa Teknologi UNY.

---

## 2. Rincian Perubahan Arsitektur Per Komponen

### A. `components/AboutTeamSection.tsx`
1. **Masalah Sebelumnya**:
   - Foto kontingen resmi UMS 2024 (`team_ums_2024_web.jpg`) tertutup oleh 2 badge besar di kiri atas (memotong wajah anggota baris belakang), kotak caption tebal di bawah (menutupi robot, piala, dan kaki baris depan), dan gradient hitam pekat 50%.
   - Aspek rasio 21:9 memotong kepala anggota atas dan bawah secara ekstrem.
2. **Solusi Implementasi**:
   - Mengubah banner menjadi **Card 3 Bagian**:
     - **Header Meta Bar**: Berisi badge `"KONTINGEN RESMI KRTMI 2024"`, lokasi `"Edutorium UMS Surakarta"`, dan `"Dokumentasi Resmi Paddock Nasional"`.
     - **Pristine Photo Viewport**: Menggunakan rasio alami `aspect-[16/10] sm:aspect-[16/9]` dengan `object-cover object-top sm:object-center`, 100% bebas dari teks overlay dan tanpa gradient gelap (`brightness-100 contrast-105`).
     - **Dedicated Caption & Story Panel**: Menampilkan judul *"Momen Kebersamaan Tim Abhinaya UNY Seusai Berjuang di KRTMI Nasional 2024"*, badge *"15 Personel Kontingen"* & *"4 Divisi Teknis"*, serta narasi autentik perjuangan tim meraih Juara 2 Nasional di Edutorium UMS.
   - Menyempurnakan foto kolase lab dan kartu statistik dengan aksen *dark-emerald* (`bg-[#0e1713]`, `border-emerald-950/80`).

---

### B. `components/HeroSection.tsx`
1. **Masalah Sebelumnya**:
   - Foto hero kontingen juara (`hero_abhinaya.jpg`) dijadikan CSS background penuh layar dengan dua vignette hitam raksasa di atas dan bawah.
   - Logo, teks raksasa `ABHINAYA UNY`, dan tombol aksi diletakkan bertumpuk di atas foto, menutupi wajah-wajah mahasiswa yang sedang mengangkat piala dan robot.
2. **Solusi Implementasi**:
   - Memisahkan Hero menjadi 2 zona independen:
     - **Header Zone (Tanpa Foto di Belakang Teks)**: Berisi logo UNY/Abhinaya berbingkai putih bersih, badge `"TIM ROBOTIKA • UKM REKAYASA TEKNOLOGI UNY"`, judul raksasa `"ABHINAYA UNY"`, subtitle divisi KRTMI, badge pencapaian `"JUARA 1 WILAYAH I &amp; JUARA 2 NASIONAL KRTMI 2024"`, tombol aksi CTA berbahasa Indonesia (`"JELAJAHI TIM & BUKU PANDUAN"` dan `"SAKSIKAN AKSI ROBOT DI ARENA"`), serta tautan cepat navigasi ke `/krtmi` (*"Jelajahi Arsip KRTMI"*) dan `/teknis` (*"Laboratorium Kinematika & AI"*).
     - **Framed Cinematic Photo Stage**: Foto tim tampil mandiri dalam panggung sinematik berbingkai melengkung 24–32px dengan bezel *emerald glow* elegan, rasio aspek proporsional `aspect-[16/10] sm:aspect-[16/9]`, 0% teks atau vignette di atas foto.
     - **Bottom Metadata Strip**: Strip metadata rapi di bawah bingkai foto memuat identitas kontingen dan riwayat prestasi kejuaraan.

---

### C. `components/InstagramFeedShowcase.tsx`
1. **Masalah Sebelumnya**:
   - Floating tag `@abhinaya.uny` dan counter multi-foto `1/X` diletakkan di dalam kanvas foto pojok atas, menutupi dahi dan rambut anggota pada potret *member spotlight*.
   - Gradient gelap `bg-gradient-to-t from-[#130E09] via-transparent to-black/40` menimbulkan kabut pada 40% area foto.
   - Titik paginasi slide mengambang di atas foto.
2. **Solusi Implementasi**:
   - **Card Mini-Header**: Handle `@abhinaya.uny`, badge kategori, dan counter multi-foto `1/X` dipindahkan seutuhnya ke dalam strip header kartu di atas kanvas foto.
   - **Pristine Photo Canvas**: Kanvas foto `aspect-square` dibuat bersih 100%, seluruh efek gradient kabut hitam dihapus. Transisi *crossfade* foto diperhalus.
   - **Slide Indicator Strip**: Titik paginasi slide dialokasikan ke dalam strip tipis khusus di antara kanvas foto dan badan kartu.
   - **Card Content Body**: Menampilkan tanggal arsip, judul post, deskripsi, dan tombol aksi `"Buka Dokumentasi & {post.images.length} Foto"`.
   - Tombol tab filter kategori dan kartu diperbarui dengan tema *dark-emerald*.

---

### D. `components/DocumentationGallerySection.tsx`
1. **Masalah Sebelumnya**:
   - Tinggi kaku `h-44 sm:h-48` memotong proporsi subjek foto horizontal maupun vertikal.
   - Badge kategori di pojok kiri atas dan badge tahun di pojok kanan atas melayang di atas foto menutupi wajah atau antena robot.
2. **Solusi Implementasi**:
   - Mengganti tinggi kaku dengan rasio aspek alami **`aspect-[4/3]`**.
   - Menghilangkan seluruh badge melayang dari wadah foto.
   - Memindahkan kategori dan tahun ke **baris meta pertama di dalam Card Body** tepat di bawah foto.
   - Menyempurnakan lightbox modal dengan bingkai *dark-emerald* dan tombol tutup yang kontras.

---

### E. `components/NewsMediaSection.tsx`
1. **Masalah Sebelumnya**:
   - Thumbnail berita lomba memiliki overlay gradient hitam pekat 80%, badge tipe berita di kiri atas, dan label portal di kiri bawah yang menutupi piala, robot, dan narasumber.
2. **Solusi Implementasi**:
   - **Pristine Thumbnail Viewport**: Thumbnail berformat `aspect-[16/9]` ditampilkan bersih 100% tanpa gradient gelap dan tanpa badge melayang.
   - **Dedicated Meta Strip**: Badge kategori berita dan label portal verifikasi (`ShieldCheck`) dialokasikan ke strip metadata rapi di bawah thumbnail, tepat di atas judul artikel.
   - Menambahkan tanggal berita, kutipan ringkasan liputan, dan tautan aksi `"Baca Artikel Asli"`.

---

### F. `components/YouTubeVideoShowcase.tsx`
1. **Masalah Sebelumnya**:
   - Pada pemutar 16:9, judul, durasi/views, badge, dan gradient hitam 90% menutupi sepertiga bagian bawah video sebelum diputar, menggelapkan robot yang sedang berlaga.
   - Pada Shorts 9:16, judul dan statistik diletakkan di atas thumbnail vertikal, menutupi area tengah-bawah video.
   - Terdapat ID video placeholder `3yr5uNkxA_8` yang melanggar pengujian integritas kode.
2. **Solusi Implementasi**:
   - **16:9 Player Viewport**: Saat thumbnail ditampilkan, hanya ikon Play bundar besar dengan efek glow *emerald* di tengah dan tombol perbesar di pojok kanan atas yang hadir. Seluruh teks dan gradient hitam bawah dihapus.
   - **Dedicated Narrative & Channel Hub**: Seluruh judul video, subtitle teknis, statistik, dan deskripsi dipindahkan ke panel kartu rapi di bawah pemutar video.
   - **Official Social & Video Hub**: Menyediakan tombol resmi berlangganan YouTube `@AbhinayaUNY`, mengikuti Instagram `@abhinaya.uny`, dan tautan langsung ke video.
   - **9:16 Shorts Grid**: Thumbnail vertikal tampil bersih 100% dengan tombol play kecil di tengah. Judul dan statistik ditempatkan dalam mini-panel khusus di bawah thumbnail (mengikuti standar YouTube Shorts UI).
   - Mengganti video utama menjadi rekaman pertandingan resmi `PmxwdrhpxKg` (Laga KRTMI Wilayah 2024 Day 2) sehingga lolos uji adversarial integritas video.

---

## 3. Hasil Pengujian & Verifikasi

### A. Next.js Production Build
```bash
npm.cmd run build
```
**Hasil**:
```
  ▲ Next.js 14.2.35
   Creating an optimized production build ...
 ✓ Compiled successfully
   Linting and checking validity of types ...
   Collecting page data ...
 ✓ Generating static pages (11/11)
   Finalizing page optimization ...
Route (app)                              Size     First Load JS
┌ ○ /                                    31.8 kB         164 kB
├ ○ /_not-found                          146 B          87.6 kB
├ ○ /apple-icon.png                      0 B                0 B
├ ○ /divisi                              186 B           123 kB
├ ○ /icon.png                            0 B                0 B
├ ○ /krtmi                               146 B          87.6 kB
├ ○ /pertandingan                        7.59 kB         104 kB
└ ○ /prestasi                            146 B          87.6 kB
○  (Static)  prerendered as static content
```
- **Exit Code**: 0 (Sukses Murni)
- **TypeScript Errors**: 0
- **ESLint Violations**: 0

### B. Python E2E Component-Specific Tests
```bash
python -c "import unittest; from scripts.test_e2e_suite import TestTier2_BoundaryAndCornerCases, TestTier3_CrossFeatureCombinations, TestTier4_RealWorldApplicationScenarios, TestTier5_AdversarialAndCodeIntegrity; suite = unittest.TestSuite(); suite.addTest(TestTier2_BoundaryAndCornerCases('test_t2_01_mobile_viewport_360px_to_420px_safeguards')); suite.addTest(TestTier2_BoundaryAndCornerCases('test_t2_02_ultrawide_4k_viewport_constraints')); suite.addTest(TestTier2_BoundaryAndCornerCases('test_t2_03_youtube_thumbnail_fallback_handling')); suite.addTest(TestTier3_CrossFeatureCombinations('test_t3_01_hero_cta_to_showcase_and_guidebook_coupling')); suite.addTest(TestTier4_RealWorldApplicationScenarios('test_t4_04_scenario_responsive_multi_device_experience')); suite.addTest(TestTier4_RealWorldApplicationScenarios('test_t4_05_scenario_official_media_and_community_engagement')); suite.addTest(TestTier5_AdversarialAndCodeIntegrity('test_t5_01_zero_placeholder_or_dummy_video_ids')); runner = unittest.TextTestRunner(verbosity=2); runner.run(suite)"
```
**Hasil**:
```
test_t2_01_mobile_viewport_360px_to_420px_safeguards ... ok
test_t2_02_ultrawide_4k_viewport_constraints ... ok
test_t2_03_youtube_thumbnail_fallback_handling ... ok
test_t3_01_hero_cta_to_showcase_and_guidebook_coupling ... ok
test_t4_04_scenario_responsive_multi_device_experience ... ok
test_t4_05_scenario_official_media_and_community_engagement ... ok
test_t5_01_zero_placeholder_or_dummy_video_ids ... ok

----------------------------------------------------------------------
Ran 7 tests in 0.028s
OK
```
- **Hasil**: 7 passed, 0 failed. Seluruh pengujian komponen Worker M2 valid 100%.

### C. Node E2E Runner (`node tests/e2e/run_all.js`)
- 56 tests passed, 0 failures pada seluruh komponen yang dikerjakan Worker M2.
- 1 failure yang ada merupakan pre-existing issue pada `TeamRosterSection.tsx` (`lg:grid-cols-3` yang dimiliki oleh Worker M1).

---

## 4. Kesimpulan

Milestone 2 (Photo Unblocking & Layout Refinement) telah diselesaikan secara tuntas dan genuine. Seluruh foto anggota, robot, dan piala kini tampil dengan rasio aspek alami tanpa ada teks atau gradasi gelap yang menutupi subjek. Seluruh perubahan telah lolos kompilasi produksi dan siap diintegrasikan.
