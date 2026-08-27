# Original User Request

## 2026-08-27T16:11:34Z

<USER_REQUEST>
Lakukan analisis mendalam dan renaming sistematis terhadap seluruh foto anggota dari arsip feed Instagram (@abhinaya.uny 2020–2025), lalu perbarui antarmuka Roster Anggota pada web Abhinaya UNY: menampilkan deretan seluruh Ketua Tim (2020–sekarang) dan seluruh Manager (2020–sekarang) dalam baris khusus yang lengkap, divisi teknis aktif saat ini, serta modul arsip alumni interaktif berbasis tahun generasi.

Working directory: D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web
Integrity mode: development

## Requirements

### R1. Instagram Member Photo Analysis & Semantic Renaming Pipeline
Analisis seluruh foto dari arsip Instagram public/images/instagram_feed/ dan public/images/members/. Lakukan renaming / penataan file gambar ke dalam direktori terstruktur dengan format penamaan semantik yang jelas: {tahun}_{divisi}_{nama_anggota}_{urutan}.jpg (atau .png). Pastikan foto non-anggota atau potongan grafis grid tidak diikutsertakan.

### R2. All-Era Leaders & Managers Showcase (2020 – Sekarang)
Pada tampilan roster utama:
- **Baris Khusus Ketua Tim (Leaders Hall of Fame)**: Tampilkan seluruh Ketua Tim Abhinaya dari tahun 2020 hingga sekarang (2020, 2021, 2022, 2023, 2024, 2025) secara berurutan dalam satu deret baris yang ramai dan estetik.
  - 2020: Leader 2020
  - 2021: Leader 2021
  - 2022: Leader 2022 (dari post 2022-09-24 Ci5QBYaLgHg)
  - 2023: Salsabila Azzahra PSDU (Leader 2023 - Cw6bd9zPTNP)
  - 2024: Ilham Widyo Nugroho (Leader 2024 - C_0wguVTpGY)
  - 2025: Farhan Yuda Mahendra (Leader 2025 - DPHoWoFkxa3)
- **Baris Khusus Manager (Managers Showcase)**: Tampilkan seluruh Manager tim dari tahun 2020 hingga sekarang secara berurutan (2020: Yuli Dwi Saputri, 2022, 2023: Mustika Wahyu Aprilia, 2024: Mustika & Rose Pita, 2025: Rose Pita & Zelfa Nafisah Zalna).
- Setiap kartu dilengkapi badge tahun kepemimpinan, prodi, dan animasi smooth auto-crossfade antar foto.

### R3. Current Active Technical Squad (Programmer, Elektronik, Mekanik)
Tampilkan anggota skuad aktif saat ini untuk divisi Program, Elektronik, dan Mekanik lengkap dengan peran spesifik, keahlian teknis, dan multi-foto crossfade.

### R4. Interactive Alumni & Generation Explorer
Sediakan modul/tombol interaktif penjelajah alumni (*Alumni & Generations Archive*) dengan tab/filter tahun generasi (2020, 2021, 2022, 2023, 2024, 2025). Ketika tombol tahun diklik, tampilkan daftar dan kartu anggota kontingen resmi pada tahun tersebut beserta peran & divisi mereka.

### R5. Ultra-Smooth Crossfade Photo Transition Engine
Pastikan seluruh kartu anggota dan modal profil menggunakan transisi pergantian foto (*crossfade*) yang sangat halus, dilengkapi indikator jumlah slide dan kontrol navigasi manual.

## Acceptance Criteria

### Build & Functionality Verification
- [ ] 
pm run build sukses dengan 0 error kompilasi, TypeScript, atau static export.
- [ ] Seluruh foto anggota hasil ekstraksi Instagram ter-rename dengan format semantik rapi.
- [ ] Baris Leader menampilkan seluruh Ketua Tim (2020–2025) dan Baris Manager menampilkan seluruh Manager (2020–2025).
- [ ] Modul Alumni interaktif berfungsi mulus menampilkan daftar anggota sesuai tahun yang dipilih.
- [ ] Animasi perpindahan foto crossfade berjalan halus tanpa patah-patah pada kartu maupun modal.
- [ ] Perubahan tersimpan bersih, ter-commit, dan ter-push ke repository GitHub.
</USER_REQUEST>
