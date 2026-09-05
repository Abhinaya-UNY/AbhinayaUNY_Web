# LAPORAN INVESTIGASI & AUDIT DESAIN FOTO: ZERO-TEXT OVERLAY & REFINEMEN LAYOUT
**Tim Robotika Abhinaya UNY — Portal Resmi Divisi KRTMI**  
**Explorer**: Survey 1 (Photo Layout & Unblocking)  
**Tanggal**: 2026-09-05  
**Target Arsitektur**: Menghilangkan 100% teks, gradient pekat, dan badge yang menutupi wajah anggota, piala, dan robot pada seluruh komponen situs.

---

## 1. Executive Summary & Temuan Utama

Berdasarkan audit mendalam terhadap seluruh berkas komponen (`components/*.tsx`) dan halaman aplikasi (`app/**/*.tsx`), ditemukan masalah desain sistemik: **hampir seluruh elemen foto menggunakan pendekatan "Magazine / Post-Banner Overlay"**, di mana judul, deskripsi panjang, badge kategori, dan gradient hitam (`bg-gradient-to-t from-black...`) ditempatkan secara bertumpuk (*absolute overlay*) tepat di atas foto.

### Dampak Visual & Masalah Kritis di Lapangan:
1. **Wajah Terpotong & Tertutup Teks**: Pada foto kontingen resmi (misal banner UMS 2024 di `AboutTeamSection.tsx`), anggota tim yang berdiri di sisi kiri tertutup oleh 2 badge besar (*"KONTINGEN RESMI KRTMI 2024"* dan *"UMS"*), sedangkan anggota di baris depan, piala, dan robot tertutup oleh kotak teks tebal yang berisi judul dan deskripsi 2 baris.
2. **Gradient Hitam Pekat Mematikan Detail Robot**: Gradient `from-[#0A0704] via-[#0A0704]/40 to-transparent` menggelapkan hingga 50% bagian bawah foto, membuat robot, komponen mekanik, piala, dan seragam kontingen menjadi hitam tak terlihat.
3. **Aspect Ratio Ekstrem (21:9)**: Penggunaan rasio `aspect-[21/9]` pada layar laptop/desktop memotong kepala anggota baris atas dan kaki/robot baris bawah secara drastis (*severe letterbox clipping*).
4. **Hero Section Mengorbankan Foto Tim**: `hero_abhinaya.jpg` dijadikan background layar penuh (`h-[100svh]`) dengan vignette atas dan bawah yang sangat pekat, serta teks raksasa `ABHINAYA UNY` tepat di tengah atas yang menimpa wajah-wajah mahasiswa yang sedang mengangkat piala.
5. **Card Anggota Roster & Galeri Feed**: Badge divisi, era kepengurusan, dan tagar Instagram ditempatkan melayang di pojok atas foto portret, tepat di area dahi dan mata anggota.

### Prinsip Utama Redesain Struktural (The 4 Zero-Overlay Rules):
1. **Rule 1 — Decoupled Content Architecture**: Foto dan teks dipisahkan secara fisik ke dalam dua zona kontainer yang berbeda. Tidak boleh ada elemen teks paragraf, judul, atau badge mengambang di atas subjek manusia/robot.
2. **Rule 2 — Natural & Respectful Aspect Ratios**: Gunakan rasio aspek alami (`aspect-[16/10]`, `aspect-[4/3]`, `aspect-[3/4]` untuk potret, atau `aspect-video` 16:9) tanpa letterbox ekstrem 21:9.
3. **Rule 3 — 0% Dark Vignette Over Humans & Robots**: Hapus gradient `bg-gradient-to-t from-black...` dari atas permukaan foto. Foto harus tampil tajam, bersih, dan terang secara alami (*crisp & unobstructed*).
4. **Rule 4 — Dedicated Meta Bars**: Badge kategori, tahun era, dan kredit dokumentasi dialokasikan ke dalam bar header di atas foto atau bar caption di bawah foto.

---

## 2. Audit Rinci Per Komponen & Proposal Redesain Struktural

---

### A. `components/AboutTeamSection.tsx` (PRIORITAS TERTINGGI)
- **Lokasi Kode**: Baris 28 – 65
- **Aset Gambar**: `/images/team_ums_2024_web.jpg` (Foto resmi seluruh kontingen Abhinaya UNY di ajang KRTMI Nasional 2024 di UMS)

#### Masalah Saat Ini:
```tsx
{/* KODE SEKARANG (BERMASALAH) */}
<div className="relative rounded-3xl overflow-hidden border-2 border-brand-orange/50 ... bg-[#120D08] group">
  <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden">
    <img
      src={`${basePath}/images/team_ums_2024_web.jpg`}
      alt="Tim Robotika Abhinaya UNY..."
      className="w-full h-full object-cover object-center ..."
    />
    {/* Gradient Overlay menutupi 50% foto */}
    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0704] via-[#0A0704]/40 to-transparent" />
    
    {/* Badge menutupi wajah anggota di sisi kiri atas */}
    <div className="absolute top-4 left-4 sm:top-6 sm:left-6 flex flex-wrap gap-2">
      <span className="... bg-brand-orange/90 text-black ...">KONTINGEN RESMI KRTMI 2024</span>
      <span className="... bg-black/70 text-amber-200 ...">Universitas Muhammadiyah Surakarta (UMS)</span>
    </div>

    {/* Caption menutupi piala, robot, dan baris depan tim */}
    <div className="absolute bottom-4 inset-x-4 sm:bottom-6 sm:inset-x-6 flex flex-col sm:flex-row ... text-white">
      <div className="space-y-1 max-w-3xl">
        <p className="text-sm sm:text-lg md:text-xl font-black text-amber-300">
          Momen Kebersamaan Tim Abhinaya UNY Seusai Berjuang di KRTMI Nasional 2024
        </p>
        <p className="text-xs sm:text-sm text-slate-200 line-clamp-2">
          Solidaritas seluruh kontingen UKM Rekayasa Teknologi UNY divisi Mekanik, Elektrik...
        </p>
      </div>
      <div className="flex items-center space-x-2 ... bg-black/60 ...">
        <Camera className="w-4 h-4" />
        <span>Foto Resmi Paddock UMS 2024</span>
      </div>
    </div>
  </div>
</div>
```

#### Proposal Redesain Struktural:
Pisahkan showcase menjadi **Showcase Card 3 Bagian**:
1. **Header Meta Bar** (Di atas foto): Berisi badge resmi, lokasi, dan tahun.
2. **Clean Photo Frame** (Tengah): Menggunakan `aspect-[16/10]` atau `aspect-[16/9]` tanpa gradient pekat. Seluruh wajah anggota dan robot tampil utuh 100%.
3. **Dedicated Caption & Insight Card** (Di bawah foto): Berisi judul momen, deskripsi peran divisi, dan kredit fotografer resmi.

```tsx
{/* USULAN REDESAIN: UNBLOCKED ABOUT TEAM SHOWCASE */}
<div className="rounded-3xl overflow-hidden border-2 border-brand-orange/40 bg-[#120D08] shadow-[0_0_50px_rgba(255,107,0,0.15)] flex flex-col">
  
  {/* 1. Header Meta Bar (Bersih di atas foto) */}
  <div className="px-5 py-3.5 sm:px-7 sm:py-4 bg-[#180F09] border-b border-[#2B1B10] flex flex-wrap items-center justify-between gap-3">
    <div className="flex flex-wrap items-center gap-2">
      <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-xl bg-brand-orange text-black text-xs font-black uppercase tracking-wider shadow-sm">
        <Trophy className="w-3.5 h-3.5 fill-black" />
        <span>KONTINGEN RESMI KRTMI 2024</span>
      </span>
      <span className="px-3 py-1 rounded-xl bg-[#22160E] text-amber-200 text-xs font-mono font-bold border border-brand-orange/30">
        Edutorium UMS Surakarta
      </span>
    </div>
    <div className="flex items-center space-x-2 text-xs font-bold text-amber-400/90 bg-[#22150D] px-3 py-1 rounded-xl border border-white/5">
      <Camera className="w-3.5 h-3.5 text-brand-orange" />
      <span>Dokumentasi Resmi Paddock Nasional</span>
    </div>
  </div>

  {/* 2. Pristine Photo Viewport (100% Bersih, Nol Teks, Aspect Alami) */}
  <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] overflow-hidden bg-black group">
    <img
      src={`${basePath}/images/team_ums_2024_web.jpg`}
      alt="Tim Robotika Abhinaya UNY Seusai Berjuang di Ajang KRTMI UMS 2024"
      className="w-full h-full object-cover object-top sm:object-center group-hover:scale-102 transition-transform duration-700 brightness-100 contrast-105"
    />
  </div>

  {/* 3. Dedicated Caption & Story Panel (Bersih di bawah foto) */}
  <div className="p-5 sm:p-7 bg-[#140E09] border-t border-[#2B1B10] space-y-3">
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
      <h3 className="text-base sm:text-xl font-black text-amber-300">
        Momen Kebersamaan Tim Abhinaya UNY Seusai Berjuang di KRTMI Nasional 2024
      </h3>
      <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
        <span className="px-2.5 py-0.5 rounded-lg bg-[#20150D] text-brand-orange border border-brand-orange/20">
          15 Personel Kontingen
        </span>
        <span className="px-2.5 py-0.5 rounded-lg bg-[#20150D] text-amber-300 border border-amber-500/20">
          4 Divisi Teknis
        </span>
      </div>
    </div>
    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-5xl">
      Solidaritas seluruh kontingen UKM Rekayasa Teknologi UNY lintas fakultas (Mekanik, Elektrik, Programming &amp; AI, serta Manajerial) seusai menuntaskan seluruh ronde pertandingan dan meraih prestasi membanggakan pada ajang bergengsi Kontes Robot Tematik Indonesia di Edutorium Universitas Muhammadiyah Surakarta.
    </p>
  </div>

</div>
```

---

### B. `components/HeroSection.tsx`
- **Lokasi Kode**: Baris 24 – 85
- **Aset Gambar**: `assets/hero_abhinaya.jpg` (Foto tim di panggung kejuaraan mengangkat piala dan robot)

#### Masalah Saat Ini:
1. `hero_abhinaya.jpg` dipaksa menjadi CSS `background-image` penuh layar (`h-[calc(100svh-4rem)]`).
2. Vignette atas (`h-32 sm:h-44 bg-gradient-to-b from-[#070503]/95...`) dan teks raksasa `ABHINAYA UNY` + logo diletakkan tepat di area atas, menimpa kepala dan wajah anggota kontingen di baris belakang.
3. Vignette bawah (`h-36 sm:h-48 bg-gradient-to-t from-[#070503]...`) dan 2 tombol CTA raksasa diletakkan tepat di atas robot, piala, dan badan anggota di baris depan.
4. Pada perangkat mobile, area tengah foto terhimpit hingga wajah anggota tertutupi teks putih tebal.

#### Proposal Redesain Struktural:
Ada dua opsi arsitektural yang elegan:
- **Pilihan Direkomendasikan (Cinematic Framed Hero)**:
  1. Bagian atas Hero dialokasikan khusus untuk Identitas Tim: Logo UNY/Abhinaya, Judul Utama *"ABHINAYA UNY"*, Subtitle *"Kontes Robot Tematik Indonesia — UKM Rekayasa Teknologi UNY"*, dan tombol navigasi aksi. Seluruh teks berada di atas kanvas gelap pekat beraksen grid/glow mikro tanpa ada foto di belakangnya.
  2. Tepat di bawahnya, sediakan **Panggung Foto Sinematik Mandiri (Framed Hero Stage)** dengan rasio `aspect-[16/9]` atau `aspect-[21/10]` dengan bezel neon oranye halus, sudut melengkung 32px, dan efek *glow ambient*. Foto tim tampil 100% bebas dari teks apapun.
  3. Di bawah bingkai foto terdapat strip kredit & prestasi: *"Kontingen Resmi Tim Abhinaya UNY — Runner-Up Nasional KRTMI 2024"*.

```tsx
{/* USULAN REDESAIN: UNBLOCKED CINEMATIC HERO */}
<div className="relative w-full bg-[#070503] border-b border-[#1A120B] overflow-hidden pt-6 sm:pt-10 pb-12">
  
  {/* 1. Header Zone: Clean Typography & Actions (0% foto di belakang teks) */}
  <div className="relative z-10 max-w-5xl mx-auto px-4 text-center space-y-4">
    {/* Logo Badge */}
    <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white p-1.5 border-2 border-brand-orange shadow-[0_0_30px_rgba(255,107,0,0.6)] hover:scale-105 transition duration-300">
      <img src={`${basePath}/assets/logo_abhinaya.png`} alt="Logo Abhinaya UNY" className="w-full h-full object-contain" />
    </div>

    {/* Title */}
    <div className="space-y-1">
      <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight uppercase">
        <span>ABHINAYA</span> <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange via-amber-400 to-yellow-400">UNY</span>
      </h1>
      <p className="text-xs sm:text-sm md:text-base font-bold text-amber-200 tracking-[0.25em] uppercase">
        Tim Robotika Divisi Kontes Robot Tematik Indonesia • UKM Restek UNY
      </p>
    </div>

    {/* CTA Buttons */}
    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
      <a href="#about-tim" className="w-full sm:w-auto px-7 py-3 rounded-full bg-gradient-to-r from-brand-orange to-amber-500 hover:from-amber-500 hover:to-orange-500 text-black font-black text-xs sm:text-sm tracking-wider uppercase flex items-center justify-center space-x-2 shadow-[0_0_25px_rgba(255,107,0,0.4)]">
        <Flame className="w-4 h-4 text-black fill-black" />
        <span>JELAJAHI PROFIL &amp; BUKU PANDUAN</span>
        <ArrowRight className="w-4 h-4 text-black" />
      </a>
      <a href="#video-aksi" className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#140E09] hover:bg-[#20140A] border border-brand-orange/40 text-amber-200 font-bold text-xs sm:text-sm tracking-wider uppercase flex items-center justify-center space-x-2">
        <Play className="w-4 h-4 text-brand-orange fill-brand-orange" />
        <span>TONTON AKSI ROBOT</span>
      </a>
    </div>
  </div>

  {/* 2. Photo Stage: Framed Cinematic Team Showcase (100% Unblocked) */}
  <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-8">
    <div className="relative rounded-3xl overflow-hidden border-2 border-brand-orange/40 shadow-[0_0_60px_rgba(255,107,0,0.2)] bg-[#100A05]">
      <div className="aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden">
        <img
          src={`${basePath}/assets/hero_abhinaya.jpg`}
          alt="Kontingen Tim Robotika Abhinaya UNY di Panggung Kejuaraan Nasional"
          className="w-full h-full object-cover object-top sm:object-center brightness-100 contrast-105"
        />
      </div>
      
      {/* Caption Strip di bawah foto */}
      <div className="px-5 py-3 bg-[#160E08] border-t border-[#26170E] flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
        <span className="text-amber-300 font-bold">
          Kontingen Resmi Tim Abhinaya UNY — Divisi KRTMI UKM Rekayasa Teknologi UNY
        </span>
        <span className="text-slate-400">
          Prestasi: Juara 1 Wilayah I &amp; Juara 2 Nasional BPTI Puspresnas
        </span>
      </div>
    </div>
  </div>

</div>
```

---

### C. `components/InstagramFeedShowcase.tsx`
- **Lokasi Kode**: Baris 167 – 220 (Grid Feed Cards) dan Baris 282 – 330 (Modal Lightbox)
- **Aset Gambar**: 50+ foto Instagram resolusi tinggi di `public/images/instagram_feed/`

#### Masalah Saat Ini:
1. **Pojok Atas Foto**: Terdapat floating tag `@abhinaya.uny` dan indikator jumlah foto `1/X` (`absolute top-3.5 inset-x-3.5 z-20`). Pada foto potret satu anggota (*member spotlight / wisuda / sambutan ketua*), tag ini tepat memotong dahi, mata, atau rambut.
2. **Gradient Overlay**: `absolute inset-0 bg-gradient-to-t from-[#130E09] via-transparent to-black/40` menimbulkan kabut gelap di 30% atas foto dan 40% bawah foto.
3. **Pojok Bawah Foto**: Titik-titik slide dan tombol expand berada di dalam kanvas foto.

#### Proposal Redesain Struktural:
1. **Pindahkan Identitas Instagram & Slide Counter ke Atas Foto**:
   Buat Card Mini-Header yang elegan:
   ```tsx
   <div className="px-4 py-2.5 bg-[#170F09] border-b border-[#26180E] flex items-center justify-between text-xs">
     <div className="flex items-center space-x-2">
       <Instagram className="w-3.5 h-3.5 text-pink-400" />
       <span className="text-[11px] font-mono font-bold text-pink-200">@abhinaya.uny</span>
     </div>
     <div className="flex items-center space-x-1.5">
       <span className="px-2 py-0.5 rounded-md bg-[#23150D] text-amber-300 text-[10px] font-mono border border-amber-500/20">
         {post.category}
       </span>
       {post.images.length > 1 && (
         <span className="px-2 py-0.5 rounded-md bg-black/60 text-pink-300 text-[10px] font-mono font-bold">
           {activeIdx + 1}/{post.images.length}
         </span>
       )}
     </div>
   </div>
   ```
2. **Hapus Seluruh Gradient Overlay**: Kanvas foto `aspect-square` dibuat bersih 100% tanpa bayangan hitam buatan.
3. **Indikator Slide**: Ditempatkan di strip tipis antara foto dan badan kartu caption.

---

### D. `components/DocumentationGallerySection.tsx`
- **Lokasi Kode**: Baris 68 – 80
- **Aset Gambar**: 12+ foto dokumentasi riset di `data/galleryData.ts`

#### Masalah Saat Ini:
1. Tinggi tetap kaku: `h-44 sm:h-48 overflow-hidden` dengan `object-cover` memotong wajah orang di foto vertikal atau memotong ujung robot di foto horizontal.
2. Badge Kategori di pojok kiri atas: `absolute top-3 left-3` (`{item.category}`).
3. Badge Tahun di pojok kanan atas: `absolute top-3 right-3` (`{item.year}`).
Kedua badge ini menimpa pojok kiri dan kanan foto yang kerap diisi wajah anggota tim atau struktur antena robot.

#### Proposal Redesain Struktural:
1. Ganti tinggi kaku `h-44 sm:h-48` dengan **rasio aspek visual proporsional** `aspect-[4/3]` atau `aspect-[16/10]`.
2. Hapus seluruh `absolute` badges dari wadah foto.
3. Pindahkan kategori dan tahun ke **baris meta pertama di dalam Card Body** (di atas judul foto):
   ```tsx
   <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
     <div className="space-y-1.5">
       {/* Meta bar bersih di bawah foto */}
       <div className="flex items-center justify-between text-[11px]">
         <span className="px-2 py-0.5 rounded-md bg-[#22150D] text-amber-300 font-mono font-bold border border-amber-500/20">
           {item.category}
         </span>
         <span className="px-2 py-0.5 rounded-md bg-brand-orange/20 text-brand-orange font-mono font-black">
           {item.year}
         </span>
       </div>
       <h3 className="text-sm font-bold text-white group-hover:text-brand-orange transition line-clamp-1">
         {item.title}
       </h3>
       <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
         {item.caption}
       </p>
     </div>
     <div className="pt-2 flex items-center justify-between text-[11px] text-amber-200/70 border-t border-[#22160E]">
       <span>{item.event}</span>
       <span className="text-brand-orange font-bold flex items-center gap-0.5">
         <span>Buka</span> &rarr;
       </span>
     </div>
   </div>
   ```

---

### E. `components/TeamRosterSection.tsx` & `MemberPhotoFadeEngine.tsx`
- **Lokasi Kode**: 
  - `components/TeamRosterSection.tsx`: Baris 160 – 244 (`MemberPhotoFadeShowcase`) dan Baris 516 – 552 (`renderMemberCard`)
  - `components/MemberPhotoFadeEngine.tsx`: Baris 404 – 466
- **Aset Gambar**: 40+ foto anggota, leader, dan pembimbing di `public/images/members/`

#### Masalah Saat Ini:
1. **Top-Left Badges Menumpuk**: Di `TeamRosterSection.tsx` baris 526-546, terdapat wadah `absolute top-3.5 left-3.5 z-20` yang menumpuk:
   - Badge Divisi (misal: *Ketua Tim*, *Programming & AI*, *Mekanik*)
   - Badge Era (misal: *Era 2024*, *Era 2025*)
   Tumpukan 2 badge ini memakan tinggi ~65px dan lebar ~140px di pojok kiri atas foto. Pada foto portrait/headshot anggota, tumpukan ini menutupi rambut, dahi, telinga, atau bahu anggota.
2. **Top-Right Multi-Photo Counter**: `absolute top-3.5 right-3.5 z-20` (`1/3` foto) melayang di pojok kanan atas.
3. **Bottom Dark Gradient**: `bg-gradient-to-t from-[#130E09] via-[#130E09]/25 to-transparent` menggelapkan pakaian dan tangan anggota.
4. **Bottom Dots & Zoom Button**: Mengambang di area dada/bawah foto.

#### Proposal Redesain Struktural:
1. **Ciptakan Card Top-Header khusus sebelum foto**:
   Pindahkan Badge Divisi, Badge Era, dan Counter Multi-Foto ke dalam strip header kartu:
   ```tsx
   {/* Card Top Header: Bebas 100% dari Foto */}
   <div className="px-4 py-2.5 bg-[#170E08] border-b border-[#24170E] flex items-center justify-between">
     <div className="flex items-center gap-1.5">
       <span className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-wider ${badgeStyle.bg} ${badgeStyle.text} ${badgeStyle.border}`}>
         {getDivisionIcon(member.division, 'w-3 h-3')}
         <span>{member.division}</span>
       </span>
       {member.generationYear && (
         <span className="px-2 py-0.5 rounded-md bg-black/60 text-amber-300 text-[10px] font-mono font-bold border border-white/10">
           Era {member.generationYear}
         </span>
       )}
     </div>
     {images.length > 1 && (
       <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-md bg-[#24170E] text-amber-300 text-[10px] font-mono font-bold">
         <Images className="w-3 h-3 text-brand-orange" />
         <span>{currentIdx + 1}/{images.length}</span>
       </span>
     )}
   </div>
   ```
2. **Wadah Foto Murni**: Rasio `aspect-[4/3] sm:aspect-square` (atau `aspect-[3/4]` potret alami). Tidak ada lagi teks, tidak ada gradient gelap yang menutupi tubuh anggota.
3. **Kontrol Interaktif**: Tombol panah ganti foto hanya muncul saat hover (`opacity-0 group-hover:opacity-100`), dan titik paginasi dipindahkan secara bersih ke batas bawah foto atau saat hover.

---

### F. `components/NewsMediaSection.tsx`
- **Lokasi Kode**: Baris 61 – 84
- **Aset Gambar**: Thumbnail artikel berita Humas UNY, Puspresnas, dan ANTARA News

#### Masalah Saat Ini:
- `absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent`
- `absolute top-3 left-3` (Badge tipe berita)
- `absolute bottom-2.5 left-3` (Nama portal Humas UNY / BPTI Kemendikbudristek)
- Thumbnail berita lomba robotika sering kali berupa piala podium atau robot di arena. Teks portal dan gradient bawah menutupi piala dan robot tersebut.

#### Proposal Redesain Struktural:
Pindahkan `article.badge` dan `article.portal` ke baris metadata di atas judul artikel di dalam kartu konten. Biarkan thumbnail foto tampil bersih tanpa teks yang menutupi momen penyerahan medali/piala.

---

### G. `components/YouTubeVideoShowcase.tsx` & `app/pertandingan/page.tsx`
- **Lokasi Kode**:
  - `components/YouTubeVideoShowcase.tsx`: Baris 281 – 317 (16:9 Video Player Stage) & Baris 345 – 360 (9:16 Shorts Grid)
  - `app/pertandingan/page.tsx`: Baris 270 – 280 & 502 – 510

#### Masalah Saat Ini:
- Pada video 16:9 sebelum di-play, teks judul dan durasi/views diletakkan di `bottom-3 left-3 right-3` di atas gradient hitam pekat, menutupi robot yang sedang diuji coba.
- Pada Shorts 9:16, judul video diletakkan di `bottom-2 inset-x-2`, menutupi sepertiga bagian bawah video vertikal.

#### Proposal Redesain Struktural:
- Untuk Video Utama: Hanya pertahankan tombol **Play** bundar di tengah. Pindahkan judul, kategori badge, dan statistik penonton ke panel kartu di bawah pemutar video.
- Untuk Shorts 9:16: Tampilkan thumbnail bersih dengan ikon Play kecil di tengah, lalu letakkan judul dan tag Shorts di bawah kartu seperti standar YouTube Shorts UI.

---

### H. `components/KrtmiChronicles.tsx` & `app/krtmi/page.tsx`
- **Lokasi Kode**:
  - `components/KrtmiChronicles.tsx`: Baris 127 – 138
  - `app/krtmi/page.tsx`: Baris 86 – 93
- **Aset Gambar**: Sampul resmi buku panduan KRTMI 2019 – 2026 di `public/images/krtmi_history/`

#### Masalah Saat Ini:
Sampul buku panduan memiliki desain grafis resmi dari kementerian yang memuat maskot dan judul turnamen. Badge `"PANDUAN RESMI"` di pojok atas dan teks `"Buku Panduan 202X"` di pojok bawah menutupi judul asli dokumen kementerian tersebut.

#### Proposal Redesain Struktural:
Hapus overlay badge dari atas sampul buku pedoman. Pindahkan informasi edisi ke caption rapi di bawah sampul buku pedoman.

---

## 3. Matriks Rekapitulasi Komponen & Tindakan Perbaikan

| Komponen | Elemen Terpengaruh | Masalah Overlay Saat Ini | Solusi Redesain Struktural |
| :--- | :--- | :--- | :--- |
| **`AboutTeamSection.tsx`** | Foto Paddock UMS 2024 (`team_ums_2024_web.jpg`) | 2 Badge di kiri atas menutupi wajah; Box caption raksasa di bawah menutupi kaki, piala, dan robot; Gradient 50%; Rasio 21:9 ekstrem memenggal kepala. | Ubah ke **Card 3 Bagian**: Header Meta Bar (atas) + Foto Alami 16:10 Unblocked (tengah) + Caption Story Card (bawah). Hapus gradient gelap. |
| **`HeroSection.tsx`** | Background Hero (`hero_abhinaya.jpg`) | Foto dijadikan background layar penuh. Teks raksasa `ABHINAYA UNY` + logo + vignette atas menutupi wajah anggota; Tombol CTA + vignette bawah menutupi robot & piala. | Pisahkan Hero menjadi **Zone Teks & Aksi** di atas (latar murni #070503) dan **Cinematic Framed Photo Stage** di bawah dengan border neon elegan, 100% bebas teks. |
| **`InstagramFeedShowcase.tsx`** | Grid feed cards & Modal Lightbox | Tag `@abhinaya.uny` & counter `1/X` di pojok atas menutupi dahi/rambut potret anggota; Gradient atas-bawah; Titik slide di atas foto. | Pindahkan tag akun & counter ke **Card Mini-Header** di atas foto. Hapus gradient pekat. Titik slide diletakkan di bawah foto. |
| **`DocumentationGallerySection.tsx`** | Kartu galeri foto riset | Tinggi statis `h-44 sm:h-48` memotong proporsi; Badge kategori di kiri atas dan badge tahun di kanan atas menutupi sudut foto. | Ganti ke rasio aspek proporsional `aspect-[4/3]`. Pindahkan badge kategori & tahun ke dalam Card Body di bawah foto. |
| **`TeamRosterSection.tsx`** & **`MemberPhotoFadeEngine.tsx`** | Kartu anggota aktif, Leader, Manager, Alumni | Badge divisi & era menumpuk di kiri atas (~65px) menutupi rambut/dahi; Counter `1/X` di kanan atas; Gradient gelap di bawah. | Pindahkan badge divisi, era, dan counter ke **Card Top Header** di atas kanvas foto. Foto tampil terang dan bersih 100%. |
| **`NewsMediaSection.tsx`** | Thumbnail berita | Badge di kiri atas & portal Humas UNY di kiri bawah menutupi piala/orang; Gradient hitam pekat. | Pindahkan badge & portal ke Card Body di atas judul artikel. Hapus gradient pekat dari thumbnail. |
| **`YouTubeVideoShowcase.tsx`** | Video stage & Shorts 9:16 | Judul, views, & badge menimpa thumbnail video dan Shorts. | Pindahkan judul & statistik ke kartu konten di bawah wadah video/shorts. |
| **`KrtmiChronicles.tsx`** & **`krtmi/page.tsx`** | Sampul buku panduan turnamen | Badge `"PANDUAN RESMI"` dan `"Buku Panduan 202X"` menutupi maskot dan judul turnamen kementerian. | Hapus overlay badge, tampilkan sampul utuh, letakkan teks keterangan di bawah kartu sampul. |

---

## 4. Catatan Sinkronisasi Faktual Terkait (R2: UNLIMITED UNDIP 2026)

Selama penelusuran komponen di atas, terverifikasi bahwa pada:
- `components/Achievements.tsx` (baris 41): Tertulis `event: 'UNLIMITED Robotics Competition UNDIP 2024'`
- Sesuai amanat **R2** pada `ORIGINAL_REQUEST.md`, kompetisi UNLIMITED UNDIP harus dikoreksi menjadi tahun **2026** di `components/Achievements.tsx`, `data/newsData.ts`, dan dokumentasi media arsip.

---

## 5. Kesimpulan & Langkah Eksekusi Berikutnya

Investigasi telah tuntas memetakan seluruh komponen visual foto dan membuktikan secara konkret letak teks overlay, badge mengambang, gradient gelap, dan rasio aspek yang merusak tampilan foto anggota dan robot. 

Desain struktural yang diusulkan menjamin **Zero Text Covering Faces/Photos** dengan memisahkan wadah foto (*clean viewport*) dari wadah metadata (*dedicated card/header/caption*), sekaligus memelihara integritas visual responsif baik di desktop maupun mobile. Laporan ini siap diserahkan kepada parent orchestrator dan implementer.
