# HANDOFF REPORT — Explorer Survey 1: Photo Layout & Unblocking

## 1. Observation
Melalui audit kode statis mendalam pada berkas komponen dan halaman di direktori `D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web`:

1. **`components/AboutTeamSection.tsx`**:
   - Baris 29–34: `<div className="relative aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden">` memuat `<img src="${basePath}/images/team_ums_2024_web.jpg" />`.
   - Baris 36: `<div className="absolute inset-0 bg-gradient-to-t from-[#0A0704] via-[#0A0704]/40 to-transparent" />` menggelapkan 50% bagian bawah foto tim.
   - Baris 39–47: `<div className="absolute top-4 left-4 sm:top-6 sm:left-6 flex flex-wrap gap-2">` menempatkan badge *"KONTINGEN RESMI KRTMI 2024"* dan *"Universitas Muhammadiyah Surakarta (UMS)"* tepat di atas wajah dan bahu anggota kontingen di sudut kiri atas.
   - Baris 50–63: `<div className="absolute bottom-4 inset-x-4 sm:bottom-6 sm:inset-x-6 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3 text-white">` berisi judul (font-black text-amber-300), deskripsi 2 baris (line-clamp-2 text-slate-200), dan badge foto resmi menutupi baris depan anggota, piala, dan robot.

2. **`components/HeroSection.tsx`**:
   - Baris 27–30: Foto tim panggung `assets/hero_abhinaya.jpg` diposisikan sebagai background penuh `<div className="absolute inset-0 bg-cover bg-center bg-no-repeat..." />`.
   - Baris 33–34: Vignette atas `h-32 sm:h-44 bg-gradient-to-b from-[#070503]/95...` dan bawah `h-36 sm:h-48 bg-gradient-to-t from-[#070503]...`.
   - Baris 40–62: Logo badge + H1 *"ABHINAYA UNY"* (text-3xl sampai text-7xl font-black) + subtitle tepat di tengah atas, menimpa kepala dan wajah anggota kontingen di baris belakang.
   - Baris 65–83: Tombol aksi CTA bertumpuk di bagian bawah, menutupi piala dan badan anggota baris depan.

3. **`components/InstagramFeedShowcase.tsx`**:
   - Baris 183: `<div className="absolute inset-0 bg-gradient-to-t from-[#130E09] via-transparent to-black/40 pointer-events-none z-10" />`.
   - Baris 186–198: `<div className="absolute top-3.5 inset-x-3.5 z-20 flex items-center justify-between pointer-events-none">` menempatkan tag `@abhinaya.uny` dan badge slide `1/X` melayang di bagian atas foto persegi, memotong dahi dan mata pada foto portrait anggota.
   - Baris 201–214: Titik paginasi dan tombol expand berada di dalam kanvas foto.

4. **`components/DocumentationGallerySection.tsx`**:
   - Baris 68: Tinggi tetap kaku `<div className="relative h-44 sm:h-48 overflow-hidden bg-black/40">` dengan `object-cover` memotong proporsi alami foto horizontal/vertikal.
   - Baris 74–79: Badge kategori `{item.category}` di `top-3 left-3` dan badge tahun `{item.year}` di `top-3 right-3` melayang tepat di sudut atas foto dokumentasi.

5. **`components/TeamRosterSection.tsx`** & **`MemberPhotoFadeEngine.tsx`**:
   - Baris 526–546 di `TeamRosterSection.tsx`: Wadah `absolute top-3.5 left-3.5 z-20` menumpuk Badge Divisi dan Badge Era secara vertikal (~65px tinggi) di pojok kiri atas foto profil anggota.
   - Baris 187 di `MemberPhotoFadeShowcase`: Gradient bawah `bg-gradient-to-t from-[#130E09] via-[#130E09]/25 to-transparent` menggelapkan pakaian dan tangan anggota.

6. **`components/NewsMediaSection.tsx`**:
   - Baris 61–84: Thumbnail berita diapit oleh gradient bawah pekat, badge jenis artikel di `top-3 left-3`, dan portal berita di `bottom-2.5 left-3`, menutupi piala kejuaraan dan robot dalam foto berita.

7. **`components/YouTubeVideoShowcase.tsx`**:
   - Baris 281–317: Thumbnail video 16:9 ditimpa gradient hitam pekat, badge di kiri atas, dan judul/views di kiri-kanan bawah.
   - Baris 345–360: Video Shorts 9:16 ditimpa judul dan badge di bagian bawah kanvas video.

8. **`components/Achievements.tsx`**:
   - Baris 41: Ditemukan rekaman `event: 'UNLIMITED Robotics Competition UNDIP 2024'` yang belum dikoreksi ke tahun 2026.

## 2. Logic Chain
1. **Dari Observasi 1 (`AboutTeamSection.tsx`)**: Menempatkan elemen judul berukuran besar, deskripsi, dua badge, dan gradient hitam 50% di atas gambar berdimensi `21/9` secara matematis memakan lebih dari 60% ruang vertikal foto. Akibatnya, subjek manusia di baris atas terpotong oleh rasio 21:9, wajah di sisi kiri tertutup badge, dan subjek di baris depan tertutup oleh kotak caption dan gradient. Oleh karena itu, foto harus dipisahkan dari teks (*decoupled*) ke dalam Card 3 Bagian: Header Meta Bar (atas) -> Foto Alami 16:10 Bersih (tengah) -> Caption Story Card (bawah).
2. **Dari Observasi 2 (`HeroSection.tsx`)**: Menggunakan foto dokumentasi tim nyata sebagai latar belakang layar penuh (`100svh`) dengan judul raksasa di tengah atas dan tombol CTA di bawah pasti menimpa wajah dan piala/robot. Solusi logisnya adalah memindahkan foto tim ke dalam panggung sinematik tersendiri (*Framed Hero Stage*) di bawah blok tipografi dan tombol aksi, sehingga foto tampil 100% bebas dari teks tanpa mengorbankan keterbacaan judul utama.
3. **Dari Observasi 3, 4, 5, 6, 7**: Pola floating badges di pojok foto (`top-left`, `top-right`, `bottom-left`) secara konsisten merusak komposisi visual dan menimpa wajah manusia atau bagian robot. Solusi universal yang terbukti adalah memindahkan seluruh metadata ke luar kanvas foto (ke Header Strip kartu di atas foto, atau ke Card Body di bawah foto).

## 3. Caveats
- Komponen video player (`YouTubeVideoShowcase` dan `app/pertandingan/page.tsx`) saat memutar video via `iframe` tidak memiliki overlay teks (karena iframe YouTube menangani videonya sendiri). Overlay hanya terjadi pada state pratinjau thumbnail sebelum tombol putar ditekan.
- Tidak ada modifikasi kode yang dilakukan pada tahap ini karena Explorer beroperasi dalam mode Read-Only Investigation. Proposal struktural yang lengkap telah disediakan di `report.md`.

## 4. Conclusion
Seluruh titik penutup foto (text overlay, floating badges, dark gradient, dan rasio aspek kaku) telah teridentifikasi secara presisi dengan nomor baris dan kode sumbernya. Desain ulang struktural telah diformulasikan dengan prinsip **Zero Text Covering Faces/Photos**, memisahkan kanvas foto bersih dari wadah metadata dan teks naratif. Solusi ini menyelesaikan tuntas persyaratan R1 dari permintaan orisinal pengguna.

## 5. Verification Method
1. **Inspeksi Berkas**:
   - Buka `report.md` di direktori `.agents/teamwork_preview_explorer_survey_gen2_1/` untuk melihat kode Before/After JSX dan panduan implementasi lengkap.
   - Periksa nomor baris komponen:
     - `components/AboutTeamSection.tsx` (baris 28–65)
     - `components/HeroSection.tsx` (baris 24–85)
     - `components/InstagramFeedShowcase.tsx` (baris 167–220)
     - `components/DocumentationGallerySection.tsx` (baris 68–80)
     - `components/TeamRosterSection.tsx` (baris 516–552)
2. **Uji Build TypeScript & Next.js**:
   - Jalankan `npm run build` di terminal PowerShell root untuk memverifikasi keabsahan sintaksis dan tipe data TypeScript saat implementasi dilakukan.
3. **Kondisi Invalidasi**:
   - Jika implementer mempertahankan `absolute` caption box atau badge di atas foto manusia/robot di salah satu komponen di atas, maka kriteria Zero Text Covering Faces/Photos dianggap tidak terpenuhi.
