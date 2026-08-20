# 📸 Panduan Upload Foto Dokumentasi Tim Abhinaya UNY

Halo Rekan-Rekan Tim Robotika Abhinaya UNY! 👋  
Website resmi kita telah dilengkapi sistem galeri dokumentasi terintegrasi. Teman-teman tim bisa menambahkan foto dokumentasi lomba, riset di lab, maupun *behind the scenes* agar otomatis tampil di website resmi kita!

---

## 🚀 Cara Mudah Upload Foto (Langsung Lewat GitHub)

### Langkah 1: Upload File Foto
1. Buka folder [`public/gallery/`](./public/gallery/) di repositori GitHub ini.
2. Klik tombol **`Add file`** ➔ pilih **`Upload files`**.
3. *Drag & drop* file foto dokumentasi kalian (format `.jpg` atau `.png`, disarankan ukuran file di bawah 2MB agar loading web cepat).
4. Beri nama file yang jelas (misal: `krtmi2024_testing_sensor.jpg` atau `podium_regional2024.jpg`).
5. Klik **`Commit changes`**.

---

### Langkah 2: Daftarkan Foto di Data Galeri
1. Buka file [`data/galleryData.ts`](./data/galleryData.ts).
2. Klik tombol pensil ✏️ (**Edit this file**).
3. Tambahkan data foto baru kalian di dalam array `GALLERY_ITEMS`:

```typescript
{
  id: 'krtmi-2024-testing-sensor',
  title: 'Testing Sensor Jarak di Lab Robotika',
  category: 'Riset & Lab', // Pilihan: 'Arena Lomba' | 'Panggung Juara' | 'Riset & Lab' | 'Behind The Scenes'
  year: '2024',
  image: '/gallery/krtmi2024_testing_sensor.jpg', // Nama file yang kalian upload di folder public/gallery/
  caption: 'Sesi kalibrasi sensor ultrasonik dan kamera otonom bersama tim elektrik.',
  event: 'Riset Lab FT UNY'
},
```

4. Klik **`Commit changes`**.

---

## ⚡ Apa yang Terjadi Selanjutnya?
Sistem GitHub Actions akan secara **otomatis me-rebuild dan mendeploy foto kalian ke website live** ([https://abhinaya-uny.github.io/AbhinayaUNY_Web/](https://abhinaya-uny.github.io/AbhinayaUNY_Web/)) dalam waktu ~1 menit! 🎉

---

### 🏷️ Pilihan Kategori:
- **`Arena Lomba`**: Momen robot sedang bertanding di karpet/lapangan kompetisi.
- **`Panggung Juara`**: Penyerahan piala, medali, sertifikat penghargaan.
- **`Riset & Lab`**: Proses perakitan mekanik, wiring elektrik, coding algoritma di lab.
- **`Behind The Scenes`**: Paddock tim, diskusi strategi, kebersamaan kontingen.
