export interface ArenaSpecs {
  dimensions: string;
  surface: string;
  zones: string;
  obstacles?: string;
  borderWall?: string;
  lightingAndCamera?: string;
}

export interface RobotSpecs {
  robotCount?: string;
  dimensions: string;
  expandedDimensions?: string;
  weight: string;
  power: string;
  controller: string;
  mechanism: string;
  maxSpeed?: string;
  autonomyMode?: string;
  communications?: string;
}

export interface GameObjects {
  types: string[];
  dimensions?: string;
  quantity?: string;
  properties?: string;
}

export interface MatchProcedure {
  matchDuration: string;
  prepTime: string;
  teamQuota?: string;
  victoryCondition: string;
}

export interface KrtmiStory {
  year: string;
  badgeYear: string;
  title: string;
  tagline?: string;
  theme: string;
  slogan?: string;
  location: string;
  hostOrganizer?: string;
  storySummary: string;
  arenaSpecs: ArenaSpecs;
  robotSpecs: RobotSpecs;
  gameObjects?: GameObjects;
  matchProcedure?: MatchProcedure;
  missionRules: string[];
  scoringSystem: string[];
  penaltiesAndDisqualifications?: string[];
  teamRoleAndFunFacts: string[];
  achievement: string;
  isChampion?: boolean;
  coverImage?: string;
  logoImage?: string;
  pdfFile: string;
  pdfSize: string;
  pdfTitle: string;
}

export const KRTMI_STORIES: KrtmiStory[] = [
  {
    year: '2026',
    badgeYear: '2026',
    title: 'TECHNOCORNER 2026 — Transporter Robot Competition',
    tagline: 'Adu Cepat Sasis Mecanum & Kekuatan Capit Presisi di DTETI FT UGM',
    theme: 'High-Speed Precision Payload Transfer & Extreme Obstacle Crossing',
    slogan: '“The Eternal Flight of Nusantara: From Heritage to Horizon”',
    location: 'Departemen Teknik Elektro & Teknologi Informasi FT UGM, Yogyakarta',
    hostOrganizer: 'KMTETI, Departemen Teknik Elektro dan Teknologi Informasi (DTETI), Fakultas Teknik, Universitas Gadjah Mada (UGM)',
    storySummary: 'Kompetisi Transporter Robot tingkat nasional pada ajang Technocorner 2026 FT UGM menantang robot melintasi sirkuit modular berlantai multipleks doff dengan rintangan ekstrem (tanjakan terjal 20°, jembatan jungkat-jungkit/teeter-totter, speed bumps kayu undak 15 mm, belokan siku sempit) untuk mengangkut balok payload kubus (10x10x10 cm) aneka warna ke dalam Drop Zone Box (12x12x5 cm). Robot dikendalikan secara wireless (remote control), wajib mengangkat balok (dilarang mendorong/menggeser), dibatasi footprint start 20x20 cm (tinggi & bobot bebas), serta catu daya baterai dibatasi maksimal 13.0 Volt DC.',
    arenaSpecs: {
      dimensions: '300 cm x 300 cm (3m x 3m Sirkuit Modular Bertingkat)',
      surface: 'Multipleks lapis cat doff dengan tanjakan 20°, jembatan teeter-totter, dan speed bumps undak 15 mm',
      zones: 'Area Start (Hijau 40x40 cm), Obstacle Runway, Loading Zone (Payload Boxes), Drop Zones (Jingga, Pink, Biru Tua, Ungu, Kuning), Area Finish (Biru Muda)',
      obstacles: 'Tanjakan 20 derajat, Jembatan Teeter-Totter, Box Rintangan Merah (Obstacle Box), Belokan Siku Sempit, Undak Kayu 15 mm',
      borderWall: 'Dinding pembatas tepi arena setinggi 10 cm',
      lightingAndCamera: 'Pencahayaan aula perlombaan indoor DTETI FT UGM dengan sistem sensor timekeeper digital',
    },
    robotSpecs: {
      robotCount: '1 Robot Transporter Utama per Tim (Tanpa robot cadangan)',
      dimensions: 'Maksimal 20 cm x 20 cm saat di Area Start (Panjang 20 cm, Lebar 20 cm, Tinggi tidak dibatasi)',
      expandedDimensions: 'Diperbolehkan berekspansi/memanjangkan lengan capit setelah melewati garis batas Area Start',
      weight: 'Tidak dibatasi (Bebas bobot sasis)',
      power: 'Baterai DC Mandiri Maksimal 13.0 Volt (Diuji ketat dengan multimeter pada scrutineering / pit stop)',
      controller: 'ESP32-S3 / Wireless 2.4GHz Teleoperation Remote Controller (DualShock / Custom Transmitter)',
      mechanism: '4-Wheel Mecanum Holonomic Drive + High-Torque Lead-Screw / Servo Mechanical Gripper (Dilarang magnet/perekat)',
      maxSpeed: 'Responsif kecepatan tinggi dengan kendali presisi manuver holonomik',
      autonomyMode: 'Manual Remote Control via High-Speed 2.4 GHz Low-Latency Wireless Link (1 Operator)',
      communications: 'Wireless RF 2.4GHz Direct Link dengan proteksi interferensi frekuensi',
    },
    gameObjects: {
      types: [
        'Box Kubus Jingga (Orange) — Drop Zone Jingga',
        'Box Kubus Merah Muda (Pink) — Drop Zone Pink',
        'Box Kubus Biru Tua (Dark Blue) — Drop Zone Biru Tua',
        'Box Kubus Ungu (Purple) — Drop Zone Ungu (Babak 16 Besar & Lanjut)',
        'Box Kubus Kuning (Yellow) — Drop Zone Kuning (Semifinal & Final)',
        'Box Merah (Obstacle Box) — Rintangan yang boleh digeser',
      ],
      dimensions: 'Box Payload: 10 cm x 10 cm x 10 cm | Drop Zone Box: 12 cm x 12 cm x 5 cm',
      quantity: 'Babak Penyisihan/32 Besar: 3 pasang box | Babak 16 Besar: 4 pasang | Semifinal/Final: 5 pasang + 3 Box Obstacle Merah',
      properties: 'Bahan non-magnetis (kayu/akrilik/busa padat), bobot seragam per kelas warna',
    },
    matchProcedure: {
      matchDuration: '3 Menit (Penyisihan & 32 Besar) / 2 Menit (8 Besar, Semifinal, Final)',
      prepTime: '2 Menit Alokasi Total (1 Menit Pemanggilan + 1 Menit Persiapan Arena)',
      teamQuota: 'Maksimal 3 Mahasiswa + 1 Pembimbing (1 Operator di Arena)',
      victoryCondition: 'FINISH & Poin Tertinggi (Robot wajib masuk seluruh roda ke Area Finish Biru Muda sebelum timer habis)',
    },
    scoringSystem: [
      'Box Masuk Drop Zone Jingga: 50 Poin / box',
      'Box Masuk Drop Zone Pink: 80 Poin / box',
      'Box Masuk Drop Zone Biru Tua: 100 Poin / box',
      'Box Masuk Drop Zone Ungu (Babak 16 Besar ke atas): 120 Poin / box',
      'Box Masuk Drop Zone Kuning (Babak Semifinal & Final): 150 Poin / box',
      'Time Bonus (Bonus Sisa Waktu): 1 Poin per 1 detik sisa waktu jika seluruh misi tuntas dan parkir di Area Finish',
      'Pemeriksaan Drop Zone: Box sah jika seluruh bagian box masuk ke dalam Drop Zone Box (tidak ada toleransi batas)',
      'Mekanisme Retry: Maksimal 3 kali retry dengan mengangkat tangan dan berseru "Retry" (box ditaruh di posisi terakhir saat dibawa)',
    ],
    penaltiesAndDisqualifications: [
      'Mendorong / menggeser box payload (Wajib diangkat saat membawa): Peringatan wasit & pembatalan poin box',
      'Robot tergelincir / keluar arena: Wajib melakukan prosedur Retry dari titik start hijau',
      'Tegangan baterai melebihi 13.0 Volt DC saat inspeksi pit: Tidak lolos uji kelayakan hingga baterai diganti',
      'Menggunakan perekat atau magnet pada sistem capit robot: Diskualifikasi langsung',
      'Merusak lintasan arena dalam bentuk apapun: Diskualifikasi langsung',
      'Mengganti catu daya / baterai saat pertandingan berjalan: Diskualifikasi',
      'Terlambat hadir melebihi toleransi 1 menit saat pemanggilan: Diskualifikasi',
      'Mencuri start tanpa instruksi wasit: Diskualifikasi',
    ],
    missionRules: [
      '1. Uji Kelayakan: Robot melewati scrutineering dimensi 20x20 cm dan uji batas tegangan baterai <= 13.0V.',
      '2. Start: Robot diposisikan di Area Start Hijau; operator menunggu aba-aba resmi dari wasit.',
      '3. Loading & Angkat: Robot meluncur ke Loading Zone, mencapit dan MENGANGKAT box payload (dilarang menyeret).',
      '4. Navigasi Ekstrem: Melintasi tanjakan 20°, jembatan jungkat-jungkit, dan speed bumps tanpa menjatuhkan muatan.',
      '5. Drop Off: Memasukkan box payload ke Drop Zone box dengan warna yang bersesuaian.',
      '6. Finish Lock: Robot melaju dan memarkirkan seluruh bodi beserta seluruh rodanya di Area Finish Biru Muda sebelum waktu habis.',
    ],
    teamRoleAndFunFacts: [
      '🔥 Sasis Mecanum dirancang khusus dengan distribusi bobot rendah untuk mencegah terguling di tanjakan 20° dan teeter-totter.',
      '🦾 Capit lead-screw bertenaga tinggi memastikan cengkeraman kokoh pada box 10x10x10 cm bahkan saat terjadi getaran di undak kayu 15 mm.',
      '⚡ Tim riset Abhinaya mengoptimalkan efisiensi daya agar voltase baterai tetap stabil di bawah batas 13.0V sepanjang perlombaan.',
    ],
    achievement: '🤖 PESERTA TINGKAT NASIONAL TECHNOCORNER 2026 FT UGM',
    isChampion: false,
    coverImage: '/images/tournaments/technocorner_2026_thumb.jpg',
    logoImage: '/images/tournaments/technocorner_logo.png',
    pdfFile: 'Panduan_Technocorner_2026.pdf',
    pdfSize: '40.83 MB',
    pdfTitle: 'Guidebook Transporter Technocorner 2026 (DTETI FT UGM)',
  },
  {
    year: '2024',
    badgeYear: '2024',
    title: 'KRTMI 2024 — Robot Pemilah Sampah Cerdas & Dual Robot System',
    tagline: 'Puncak Kejayaan Abhinaya UNY: Juara 1 Regional I & Juara 2 Tingkat Nasional!',
    theme: 'ROBOT PEMILAH SAMPAH (Autonomous Waste Sorting & Feeding System)',
    slogan: '”Penguasaan Teknologi, Kemakmuran Negara”',
    location: 'Universitas Muhammadiyah Surakarta (UMS) & BPTI Kemendikbudristek',
    hostOrganizer: 'Balai Pengembangan Talenta Indonesia (BPTI), Pusat Prestasi Nasional, Kemendikbudristek & Universitas Muhammadiyah Surakarta (UMS)',
    storySummary: 'KRTMI 2024 mengangkat urgensi krisis sampah global dengan menghadirkan sistem kolaborasi dua robot: ROBOT PENGUMPAN (Feeder Robot) bertugas mengambil Kotak Sampah dari Zona Umum dan menumpahkannya ke konveyor getar, lalu diteruskan ke konveyor datar di mana ROBOT PEMILAH (Sorter Robot) bekerja 100% OTONOM dengan visi komputer AI (YOLO) dan sensor material untuk mendeteksi 5 jenis sampah (Daun, Kertas, Plastik, Logam, Botol Plastik) dan menempatkannya ke Kotak Pemilahan yang presisi. Laju gerak konveyor meningkat dinamis dari 50 cm/menit hingga 200 cm/menit sepanjang match.',
    arenaSpecs: {
      dimensions: '600 cm x 400 cm (6m x 4m) Tingkat Nasional / Meja Daring 40 cm Seleksi Wilayah',
      surface: 'Lantai datar vinil berpembatas dinding tepi 5 cm dan garis putih selebar 5 cm',
      zones: 'Zona Awal (Start Merah/Biru), Zona Umum (Midfield 5 Kotak Sampah), Zona Pengumpan (Konveyor Getar & Datar 40 cm), Zona Kotak Kosong, Zona Wadah (5 Kotak Pemilahan & Kotak Pembuangan)',
      obstacles: 'Konveyor getar bertingkat 40 cm berkecepatan dinamis (50 cm/min -> 200 cm/min), meja sortir',
      borderWall: 'Dinding pembatas tepi setinggi 5 cm, garis batas putih selebar 5 cm',
      lightingAndCamera: 'Penerangan studio standar industri, kamera overhead ZOOM meeting (Seleksi Wilayah)',
    },
    robotSpecs: {
      robotCount: '2 Robot per Tim: ROBOT PEMILAH (100% Otonom) + ROBOT PENGUMPAN (Nirkabel/Otonom)',
      dimensions: 'Robot Pemilah: Max 60x60x60 cm | Robot Pengumpan: Max 50x50x50 cm (Area start 90x80 cm, Tinggi bebas)',
      expandedDimensions: 'Berekspansi saat operasi konveyor berlangsung',
      weight: 'Tidak dibatasi, namun wajib dapat diangkat secara manual oleh anggota tim',
      power: 'Baterai DC Mandiri Maksimal 24.0 Volt (LiFePO4 / LiPo Isolated Distribution)',
      controller: 'Dual ESP32-S3 + STM32 ARM Cortex-M4 + AI Vision Edge Processing Unit (ESP32-CAM / SBC AI)',
      mechanism: 'Heavy-Duty Mecanum Drive + Dual Roller Elevator Gripper + Pneumatic/Servo Waste Diverter',
      maxSpeed: 'Konveyor dinamis 50–200 cm/menit; manuver lincah di Zona Umum',
      autonomyMode: 'Robot Pemilah 100% Otonom (Computer Vision YOLO/OpenCV) + Robot Pengumpan Nirkabel 2.4GHz',
      communications: 'Wireless ESP-NOW / Telemetry Link antar sub-sistem robot',
    },
    gameObjects: {
      types: [
        '1. Daun (basah dan kering) — Kategori Organik',
        '2. Kertas (warna putih dan warna) — Kategori Daur Ulang',
        '3. Lembaran Plastik (putih dan warna) — Kategori Anorganik Plastik',
        '4. Logam Ferro & Non-Ferro (plat tebal < 0.5 mm) — Kategori Logam',
        '5. Botol Plastik Air 300 ml (diameter 5.8 cm, tinggi 17 cm dipres) — Kategori Botol Plastik',
      ],
      dimensions: 'Sampah Pipih: Lingkaran diameter 15 cm | Botol: d=5.8 cm, t=17 cm (dipres) | Kotak Sampah: 21x17x31 cm (3L) | Kotak Pemilahan: 25x19x36 cm (10L)',
      quantity: '5 Kotak Sampah @ 4 sampah acak = 20 item sampah total per ronde match',
      properties: '5 Kategori material berbeda dengan karakteristik optik, induktif, dan mekanis spesifik',
    },
    matchProcedure: {
      matchDuration: '4 Menit (240 Detik) Waktu Pertandingan Resmi',
      prepTime: '1 Menit Waktu Persiapan (Maksimal 4 Anggota Tim di Lapangan)',
      teamQuota: '4 Mahasiswa + 1 Dosen Pembimbing',
      victoryCondition: '”BERSIH” (Kemenangan Mutlak jika tim berhasil memilah 5 Kotak Sampah 100% benar tanpa salah, tanpa masuk kotak pembuangan, dan tanpa jatuh)',
    },
    scoringSystem: [
      'Sampah Benar masuk Kotak Pemilahan: +3 Poin per item sampah',
      'Sampah Salah masuk Kotak Pemilahan: 0 Poin',
      'Sampah Masuk Kotak Pembuangan / Jatuh ke Lantai: -1 Poin per item',
      'Setiap Pelanggaran Aturan: -1 Poin per insiden',
      'Kemenangan Mutlak "BERSIH": Langsung menghentikan pertandingan dan dinobatkan sebagai pemenang seketika',
      'Tie-Breaker: Nilai total sampah benar -> Nilai sampah di pembuangan/lantai lebih rendah -> Jumlah sampah salah lebih sedikit -> Waktu sampah pertama tercepat',
    ],
    penaltiesAndDisqualifications: [
      'Pelanggaran (-1 Poin): Bagian dari Robot keluar arena atau masuk ke area lawan selain Zona Umum',
      'Pelanggaran (-1 Poin): Robot Pengumpan diam di Zona Umum setiap kelipatan 10 detik',
      'Pelanggaran (-1 Poin): Robot Pengumpan mengambil kotak sampah di sisi lawan saat lawan di Zona Umum',
      'Pelanggaran (-1 Poin): Robot menyentuh fisik robot lawan secara sengaja',
      'Pelanggaran (-1 Poin): Anggota tim memasuki lapangan tanpa izin wasit saat perbaikan',
      'Diskualifikasi (DQ): Anggota tim menyentuh robot lawan saat pertandingan berlangsung',
      'Diskualifikasi (DQ): Robot merusak lapangan atau merusak robot lawan',
      'Diskualifikasi (DQ): Melakukan false start (menggerakkan robot sebelum aba-aba) sebanyak 3 kali',
      'Diskualifikasi (DQ): Tidak mematuhi instruksi atau peringatan wasit',
    ],
    missionRules: [
      '1. Persiapan 1 Menit: Tim meletakkan Robot Pengumpan dan Robot Pemilah di Zona Awal.',
      '2. Pengambilan Kotak Sampah: Robot Pengumpan menuju Zona Umum, mengambil 1 Kotak Sampah (isi 4 sampah acak).',
      '3. Pengumpanan Konveyor: Menumpahkan isi kotak ke Konveyor Getar (tinggi 40 cm), lalu meletakkan kotak kosong di Zona Kotak.',
      '4. Deteksi & Klasifikasi AI: Sampah bergerak ke Konveyor Datar; Robot Pemilah mendeteksi jenis material dengan kamera AI & sensor.',
      '5. Pemilahan Presisi: Robot Pemilah mengambil sampah dan memasukkannya ke Kotak Pemilahan 1-5 sesuai jenis.',
      '6. Kemenangan "BERSIH": Jika seluruh 20 sampah dari 5 kotak terpilah sempurna tanpa cacat, wasit meniup peluit tanda "BERSIH"!',
    ],
    teamRoleAndFunFacts: [
      '🏆 Mengukir sejarah emas bagi UNY dengan menyabet JUARA 1 REGIONAL I dan JUARA 2 TINGKAT NASIONAL di UMS Surakarta!',
      '🤖 Algoritma Computer Vision YOLOv8 yang dioptimasi tim Programming mampu mengenali sampah basah/kering dalam hitungan milidetik.',
      '🦾 Mekanisme dual-roller elevator buatan tim Mekanik sanggup mencengkeram botol pipih hingga plat logam tanpa selip.',
    ],
    achievement: '🥇 JUARA 1 REGIONAL I WILAYAH & 🥈 JUARA 2 TINGKAT NASIONAL KRTMI 2024',
    isChampion: true,
    coverImage: '/images/tournaments/krtmi_2024_thumb.jpg',
    logoImage: '/images/tournaments/krtmi_2024_cover.png',
    pdfFile: 'Panduan_KRTMI_2024.pdf',
    pdfSize: '0.56 MB',
    pdfTitle: 'Buku 7 Pedoman KRTMI 2024 (BPTI Puspresnas Kemendikbudristek & UMS)',
  },
  {
    year: '2023',
    badgeYear: '2023',
    title: 'KRTMI 2023 — Robo Game: Cyber-Physical Digital Twin',
    tagline: 'Duet Robot Kolaboratif & Perakitan Roda Gigi Planet di Panggung Nasional USM',
    theme: 'DIGITAL TWIN (Robo Game - Cyber-Physical Planetary Gear Assembly)',
    slogan: '”Penguasaan Teknologi, Kemakmuran Negara”',
    location: 'Universitas Semarang (USM) & BPTI Kemendikbudristek',
    hostOrganizer: 'Balai Pengembangan Talenta Indonesia (BPTI), Puspresnas Kemendikbudristek & Universitas Semarang (USM)',
    storySummary: 'KRTMI 2023 mengadopsi pilar Industri 4.0: Cyber-Physical System & Digital Twin. Dua robot bersaing merakit sistem transmisi roda gigi planet (sun gear, planet gears, carrier, ring gear) yang direpresentasikan dalam bentuk KOIN segi delapan di Lapangan Fisik (600x400 cm green screen) yang tersinkronisasi langsung ke Lapangan Digital pada komputer juri melalui kamera overhead. Robot mengambil koin dari rak (23 slot) dan menempatkannya pada koordinat sah. Kemenangan mutlak diraih melalui predikat "DONE" / "DAM" (formasi 3 koin simetri 120° roda gigi dalam dan 4 koin 90° roda gigi luar).',
    arenaSpecs: {
      dimensions: '600 cm x 400 cm (Lapangan Fisik Green Screen & Lapangan Digital Virtual)',
      surface: 'Lantai tertutup kain/karpet hijau (green screen) berpenanda batas koordinat optik',
      zones: 'Zona Awal (Start Pad), Rak Koin (23 Slot di tepi lapangan), Lapangan Fisik, Lapangan Digital Juri, Zona No-Entry',
      obstacles: 'Batas kecepatan dinamis telemetri, zona intervensi virtual lawan',
      borderWall: 'Garis batas koordinat optik berpenanda sudut',
      lightingAndCamera: 'Kamera utama overhead di atas tengah lapangan fisik + sistem pencahayaan studio memadai',
    },
    robotSpecs: {
      robotCount: '1 Robot Pemain Utama per Tim (Dikendalikan nirkabel)',
      dimensions: 'Lebar 20 cm x Panjang 25 cm x Tinggi 20 cm dengan panjang Gripper maksimal 20 cm',
      expandedDimensions: 'Sisi samping robot wajib ditutup penutup HIJAU sewarna dengan Lapangan Fisik',
      weight: 'Tidak dibatasi, namun wajib dapat diangkat dengan tongkat hijau dari luar lapangan',
      power: 'LiPo 4S 14.8V 5000mAh High-Discharge / Baterai Mandiri',
      controller: 'ESP32 Dual-Core + Closed-Loop Magnetic Encoder + Telemetry Feedback Module',
      mechanism: '3-Wheel / 4-Wheel Omni-Directional Kinematics + Specialized Top-Grip Coin Gripper',
      maxSpeed: 'Dibatasi Maksimal 40 cm/s (Penalti jika >40 cm/s selama >2 detik berturut-turut)',
      autonomyMode: 'Wireless Remote Control berpanduan tampilan Lapangan Digital di monitor operator',
      communications: 'Wireless 2.4GHz Telemetry + Real-Time Video Link',
    },
    gameObjects: {
      types: ['Koin Roda Gigi Planet (Warna Biru atau Merah)'],
      dimensions: 'Koin Stiroform Segi Delapan: 20 cm x 20 cm tebal 3 cm',
      quantity: '1 Set Koin terdiri dari 12 Koin per tim (Diletakkan pada rak 23 slot)',
      properties: 'Warna Biru / Merah dengan sisi terlebar menghadap ke atas agar tertangkap kamera utama',
    },
    matchProcedure: {
      matchDuration: '3 Menit (180 Detik)',
      prepTime: '1 Menit (Maksimal 4 Anggota Tim di Lapangan Fisik)',
      teamQuota: '4 Mahasiswa + 1 Dosen Pembimbing',
      victoryCondition: '”DONE” / ”DAM” (Berhasil menempatkan 4 Koin simetri 90° roda gigi planet luar setelah 3 koin simetri 120° roda gigi dalam)',
    },
    scoringSystem: [
      'Koin Garis Koordinat Terdekat Zona Awal: 3 Poin per koin',
      'Koin Garis Koordinat Lapis Kedua: 4 Poin per koin',
      'Koin Garis Koordinat Lapis Ketiga: 5 Poin per koin',
      'Koin Garis Koordinat Terjauh: 6 Poin per koin',
      'Kemenangan Mutlak "DONE": Selesai 4 koin luar simetri seketika menghentikan kontes sebagai juara',
      'Penalti Kecepatan: Kembali ke Zona Awal dan diam 2 detik di Zona Awal',
      'Pengulangan: Maksimal 3 kali menggunakan tongkat hijau dari luar Zona No-Entry',
    ],
    penaltiesAndDisqualifications: [
      'Pelanggaran (Penalti 2 detik di Start): Robot keluar lapangan atau menyentuh koin/robot lawan di Lapangan Digital',
      'Pelanggaran: Membawa koin tidak sesuai tata cara (DILARANG mendorong koin di lantai lapangan fisik)',
      'Pelanggaran: Anggota tim tertangkap kamera utama di atas arena',
      'Pelanggaran: Kecepatan robot melebihi 40 cm/s secara terus menerus selama >2 detik',
      'Diskualifikasi: Anggota tim menyentuh robot pemain di Lapangan Fisik tanpa izin wasit',
      'Diskualifikasi: Anggota tim menggerakkan/mendorong koin fisik secara manual',
      'Diskualifikasi: Anggota tim memasuki Lapangan Fisik saat pertandingan berlangsung',
      'Diskualifikasi: False start 3 kali dalam satu kontes',
    ],
    missionRules: [
      '1. Persiapan: Tim meletakkan Robot di Zona Awal dan menyusun 12 koin di rak tepi lapangan.',
      '2. Pengambilan Koin: Robot mengambil 1 koin dari rak; koin harus dipegang pada sisi lebarnya.',
      '3. Tahap 1 (Roda Gigi Dalam): Menempatkan minimal 3 koin berjarak 120° simetri di sekeliling sun gear.',
      '4. Tahap 2 (Roda Gigi Luar): Menempatkan 4 koin berjarak 90° simetri di ring gear luar.',
      '5. Victory State: Tim yang berhasil mengunci formasi 4 koin luar langsung dinobatkan sebagai pemenang "DONE"!',
    ],
    teamRoleAndFunFacts: [
      '🥉 Membuktikan keandalan navigasi omni-wheel presisi dengan meraih JUARA 3 WILAYAH dan FINALIS TINGKAT NASIONAL di USM Semarang!',
      '💡 Mengembangkan algoritma closed-loop speed limiter cerdas untuk mematuhi regulasi ketat batas kecepatan 40 cm/s.',
      '🎮 Menggabungkan strategi digital twin dan transmisi telemetri nirkabel zero-lag.',
    ],
    achievement: '🥉 JUARA 3 TINGKAT WILAYAH & 🏅 FINALIS TINGKAT NASIONAL KRTMI 2023',
    isChampion: false,
    coverImage: '/images/tournaments/krtmi_2023_thumb.jpg',
    logoImage: '/images/tournaments/krtmi_2023_cover.png',
    pdfFile: 'Panduan_KRI_2023.pdf',
    pdfSize: '6.06 MB',
    pdfTitle: 'Buku Pedoman Kontes Robot Indonesia (KRI) 2023 — Buku 7 KRTMI (BPTI Kemendikbudristek)',
  },
  {
    year: '2022',
    badgeYear: '2022',
    title: 'KRTMI 2022 — Robot Penanganan & Pemilahan Limbah Medis Berbahaya',
    tagline: 'Otomasi Evakuasi Limbah Medis Berbahaya & Cyber-Physical Hospital Logistics',
    theme: 'Robo Game - Digital Twin: Hazardous Medical Waste & Strategy Grid',
    slogan: '”Penguasaan Teknologi, Kemakmuran Negara”',
    location: 'Institut Teknologi Sepuluh Nopember (ITS) Surabaya',
    hostOrganizer: 'Pusat Prestasi Nasional (Puspresnas) Kemendikbudristek & ITS Surabaya',
    storySummary: 'KRTMI 2022 menggabungkan konsep Digital Twin dengan penanganan limbah medis infeksius rumah sakit. Robot bertugas mengidentifikasi kantong limbah berbahaya dan koin strategi menggunakan sensor barcode dan visi optik, lalu menavigasi bangsal isolasi menuju docking insinerator steril. Pertandingan berlangsung secara real-time di Lapangan Fisik (500x400 cm) dan simulasi Digital Twin.',
    arenaSpecs: {
      dimensions: '500 cm x 400 cm (Simulasi Bangsal Isolasi & Area Insinerator)',
      surface: 'Lantai vinil hijau / karpet khusus dengan garis batas zona isolasi medis',
      zones: 'Zona Start, Depo Limbah Medis (Kuning B3 / Merah Infeksius), Dock Insinerator Steril, Lapangan Digital Juri',
      obstacles: 'Batas koridor bangsal isolasi, checkpoint barcode',
      borderWall: 'Garis batas pembatas vinil',
      lightingAndCamera: 'Kamera overhead HD untuk platform simulasi Digital Twin nasional',
    },
    robotSpecs: {
      robotCount: '1 Robot Logistik Medis Utama',
      dimensions: 'Maksimal 20 cm x 25 cm x 20 cm dengan jangkauan Gripper 20 cm',
      weight: 'Maksimal 15 kg',
      power: 'Baterai LiPo 3S/4S (Maksimal 24.0V DC)',
      controller: 'STM32 ARM Cortex-M4 + Modul Pemindai Barcode / Visi Digital',
      mechanism: 'Differential 4WD / Omni Drive + High-Torque Servo Gripper & Depo Holder',
      maxSpeed: 'Maksimal 40 cm/s',
      autonomyMode: 'Semi-Otonom berpadu Wireless Remote Control telemetri digital',
      communications: 'Wireless ESP-NOW / RF Link',
    },
    gameObjects: {
      types: ['Koin Strategi Medis', 'Replika Kantong Limbah B3 Kuning & Merah Infeksius'],
      dimensions: 'Koin Stiroform 20x20x3 cm & Kantong Limbah Ber-Barcode',
      quantity: '12 Koin strategi per tim + 6 Depo limbah medis',
      properties: 'Material kode barcode infeksius khusus rumah sakit',
    },
    matchProcedure: {
      matchDuration: '3 Menit (180 Detik)',
      prepTime: '1 Menit',
      teamQuota: '4 Mahasiswa + 1 Dosen Pembimbing',
      victoryCondition: '”DAM” (3 Koin Sejajar) atau Akumulasi Poin Tertinggi di Insinerator',
    },
    scoringSystem: [
      'Identifikasi Barcode & Jenis Limbah Benar: 40 Poin',
      'Penempatan Koin Strategi di Grid Digital: 30 - 60 Poin per koin',
      'Evakuasi ke Insinerator Sempurna: +100 Poin Bonus',
      'Kemenangan Mutlak "DAM": Mengunci garis diagonal/horizontal koin strategi',
    ],
    penaltiesAndDisqualifications: [
      'Menjatuhkan limbah infeksius di koridor: -20 Poin',
      'Masuk ke arena lapangan fisik saat match berjalan: Diskualifikasi',
      'Menabrak fasilitas insinerator virtual: Penalti pengulangan',
    ],
    missionRules: [
      '1. Pindai kode barcode limbah medis di stasiun awal.',
      '2. Angkut limbah dengan capit higienis tanpa merusak kemasan.',
      '3. Bawa ke docking insinerator steril dan letakkan koin strategi pada koordinat Lapangan Digital.',
      '4. Bentuk formasi DAM untuk meraih kemenangan mutlak.',
    ],
    teamRoleAndFunFacts: [
      '🏥 Menunjukkan ketangguhan sasis robot dalam bermanuver di koridor sempit simulasi rumah sakit.',
      '🏅 Lolos seleksi ketat dan bertanding di Tingkat Nasional KRTMI 2022 di ITS Surabaya.',
    ],
    achievement: '🏅 PESERTA TAHAP NASIONAL KRTMI 2022 (ITS SURABAYA)',
    isChampion: false,
    coverImage: '/images/tournaments/krtmi_2022_thumb.jpg',
    logoImage: '/images/tournaments/krtmi_2022_cover.png',
    pdfFile: 'Panduan_KRI_2022.pdf',
    pdfSize: '4.41 MB',
    pdfTitle: 'Buku Panduan Kontes Robot Indonesia (KRI) 2022 — Buku 7 KRTMI (Puspresnas & ITS)',
  },
  {
    year: '2021',
    badgeYear: '2021',
    title: 'KRTMI 2021 — Robot Pelayanan Pasien COVID-19 & Digital Twin Daring',
    tagline: 'Pelayanan Logistik Medis & Disinfeksi Tanpa Kontak di Era Pandemi Global',
    theme: 'Contactless Medical Aid & Hospital Logistical Automation (Robo Game - Digital Twin)',
    slogan: '”Penguasaan Teknologi, Kemakmuran Negara”',
    location: 'Universitas Gadjah Mada (UGM) & Penyelenggaraan Daring Nasional',
    hostOrganizer: 'Pusat Prestasi Nasional (Puspresnas) Kemendikbud & Universitas Gadjah Mada (UGM)',
    storySummary: 'KRTMI 2021 diselenggarakan di tengah puncak pandemi COVID-19 secara daring berbasis platform video conference Zoom dan sistem simulasi Digital Twin. Robot bertugas menggantikan peran nakes mengantarkan obat steril dan logistik ke kamar isolasi (Kamar 1–6) dari Nurse Station secara presisi dan nirsentuh, sekaligus menempatkan koin formasi "DAM" di grid virtual.',
    arenaSpecs: {
      dimensions: '500 cm x 350 cm (Arena Kamar Pasien & Koridor Isolasi Modular)',
      surface: 'Lantai putih / karpet hijau berpemandu garis optik kontras tinggi',
      zones: 'Nurse Station Base, Koridor Ruang Isolasi, Kamar Pasien 1-6, Lapangan Digital',
      obstacles: 'Pintu sekat kamar isolasi, lorong berliku',
      borderWall: 'Dinding pembatas koridor isolasi setinggi 15 cm',
      lightingAndCamera: 'Kamera live-streaming Zoom & platform evaluasi otomatis panitia UGM',
    },
    robotSpecs: {
      robotCount: '1 Robot Logistik Tower Dispenser',
      dimensions: 'Maksimal 20 cm x 25 cm x 20 cm (atau tower dispenser 50x50x70 cm)',
      weight: 'Maksimal 12 kg',
      power: 'Baterai Kering Gel 12V 7Ah / LiPo 3S 11.1V',
      controller: 'Arduino Mega 2560 + ESP8266 Wi-Fi Link + Optical Line Sensor Array',
      mechanism: 'Automatic Dropping Box Mechanism + Ultrasonic Anti-Collision Guard',
      autonomyMode: 'Navigasi Berpandu Garis Otonom & Perintah Telemetri Nirkabel',
      communications: 'Wi-Fi Socket Client-Server ke Host Daring',
    },
    gameObjects: {
      types: ['Boks Obat Steril', 'Koin Strategi Logistik Medis'],
      dimensions: 'Boks Obat 10x10x10 cm & Koin Segi Delapan 20x20 cm',
      quantity: '6 Boks obat steril + 12 Koin formasi',
      properties: 'Kontainer tertutup steril anti-kontaminasi',
    },
    matchProcedure: {
      matchDuration: '3 Menit (180 Detik)',
      prepTime: '1 Menit',
      teamQuota: '4 Mahasiswa + 1 Dosen Pembimbing',
      victoryCondition: 'Formasi 3 Koin ”DAM” & Logistik Kamar Tuntas Tercepat',
    },
    scoringSystem: [
      'Keberhasilan Antar Boks Obat ke Kamar yang Tepat: 60 Poin per kamar',
      'Penurunan Boks Obat Sempurna Tanpa Kontak Fisik: +40 Poin Bonus',
      'Penempatan Koin Strategi Digital: 30 - 60 Poin per titik',
      'Penalti: -15 Poin jika menyenggol dinding koridor',
    ],
    penaltiesAndDisqualifications: [
      'Menjatuhkan obat di luar kamar isolasi: -20 Poin',
      'Gagal transmisi kamera / disconnect koneksi video: Wajib restart sesi',
      'Intervensi manusia di dalam arena saat tanding: Diskualifikasi',
    ],
    missionRules: [
      '1. Robot menerima rute kamar isolasi yang dituju dari Nurse Station.',
      '2. Meluncur menyusuri koridor rumah sakit secara otonom.',
      '3. Membuka kompartemen dropping box untuk menyerahkan boks obat steril.',
      '4. Sinkronisasi status misi ke sistem Lapangan Digital.',
    ],
    teamRoleAndFunFacts: [
      '😷 Riset intensif dilakukan di lab robotika FT UNY dengan menerapkan protokol kesehatan dan karantina mandiri yang ketat.',
      '🏅 Sukses menorehkan prestasi gemilang sebagai FINALIS DARING TINGKAT NASIONAL KRTMI 2021.',
    ],
    achievement: '🏅 FINALIS DARING TINGKAT NASIONAL KRTMI 2021',
    isChampion: false,
    coverImage: '/images/tournaments/krtmi_2021_thumb.jpg',
    logoImage: '/images/tournaments/krtmi_2021_cover.png',
    pdfFile: 'Panduan_KRI_2021.pdf',
    pdfSize: '18.41 MB',
    pdfTitle: 'Pedoman Kontes Robot Indonesia (KRI) 2021 — Buku 7 KRTMI (Puspresnas & UGM)',
  },
  {
    year: '2020',
    badgeYear: '2020',
    title: 'KRTMI 2020 — Robot Sterilisasi Radiasi UV-C & Disinfeksi Mandiri',
    tagline: 'Tanggap Darurat Pandemi: Inovasi Sterilisasi Ruang Publik & Logistik Otonom',
    theme: 'Robot Penanganan COVID-19: Sterilisasi Radiasi UV-C & Disinfeksi Mandiri',
    slogan: '”Kecukupan Pangan, Ketahanan Negara”',
    location: 'Institut Teknologi Bandung (ITB) & Daring Puspresnas Kemendikbud',
    hostOrganizer: 'Pusat Prestasi Nasional (Puspresnas) Kemendikbud & ITB Bandung',
    storySummary: 'Tahun 2020 menandai transformasi KRTMI menjadi respon tanggap darurat wabah COVID-19. Robot ditugaskan melakukan sterilisasi ruang publik secara otonom menggunakan radiasi germicidal UV-C (dosis paparan minimal 5 detik per titik sasaran) dan penyemprotan disinfektan aerosol di atas arena panggung 3000x2000 mm (tinggi 500 mm dari lantai) dengan sistem keselamatan fail-safe ketat.',
    arenaSpecs: {
      dimensions: '3000 mm x 2000 mm (Panggung Kayu Tinggi 500 mm dari Lantai)',
      surface: 'Lantai panggung kayu lapis vinil doff dengan pembatas 60 mm',
      zones: 'Zona Sterilisasi UV-C (Titik Sasaran A-E), Zona Disinfeksi Aerosol, Safe Holding Area',
      obstacles: 'Batas partisi panggung, simulasi perabot ruang isolasi',
      borderWall: 'Pembatas kayu vinil setinggi 60 mm di sekeliling panggung',
      lightingAndCamera: 'Live streaming broadcast dan sensor UV irradiance meter penguji dosis',
    },
    robotSpecs: {
      robotCount: '1 Robot Sterilisasi Otonom Utama',
      dimensions: 'Maksimal 1000 mm x 1000 mm x 1000 mm (1m x 1m x 1m)',
      weight: 'Maksimal 20 kg (termasuk tangki cairan & inverter)',
      power: 'Baterai DC Maksimal 24.0V + High-Voltage Inverter untuk Tabung Radiasi UV-C',
      controller: 'Microcontroller ATmega328P / ARM Cortex-M3 + PIR Motion Safety Sensor',
      mechanism: 'Pneumatic Atomizer Spray Pump + 360-Degree Shielded UV-C Germicidal Lamp Tower',
      autonomyMode: '100% Otonom dengan interlock otomatis pemati lampu UV saat mendeteksi manusia',
      communications: 'Autonomous Embedded Loop',
    },
    gameObjects: {
      types: ['Titik Sasaran Radiasi Kuman (Target Pad)', 'Cairan Disinfektan Aerosol Steril'],
      dimensions: 'Target Pad Radiasi: 20 cm x 20 cm',
      quantity: '5 Titik Radiasi UV-C + 1 Koridor Aerosol',
      properties: 'Dosis paparan radiasi UV germicidal terverifikasi',
    },
    matchProcedure: {
      matchDuration: '3 Menit (180 Detik)',
      prepTime: '1 Menit',
      teamQuota: '4 Mahasiswa + 1 Dosen Pembimbing',
      victoryCondition: 'Sterilisasi Penuh Seluruh Titik Target dengan Dosis Radiasi Memenuhi Syarat',
    },
    scoringSystem: [
      'Durasi Penyinaran UV-C Memenuhi Syarat (>= 5 detik): 50 Poin per titik',
      'Penyemprotan Aerosol Merata Tanpa Tetesan Kasar: +30 Poin per zona',
      'Kepatuhan Sistem Fail-Safe Keselamatan: +50 Poin',
      'Kecepatan Total Misi: Dikonversi ke poin bonus waktu',
    ],
    penaltiesAndDisqualifications: [
      'Kebocoran cairan disinfektan di atas arena: -25 Poin',
      'Lampu UV-C menyala saat ada intervensi manusia (Kegagalan Fail-Safe): Diskualifikasi Langsung',
      'Robot jatuh dari panggung arena setinggi 500 mm: Diskualifikasi',
    ],
    missionRules: [
      '1. Start dari safe holding area saat hitungan waktu dimulai.',
      '2. Navigasi ke titik sasaran kuman dan nyalakan lampu UV-C selama minimal 5 detik.',
      '3. Aktifkan nosel semprot aerosol pada koridor disinfeksi.',
      '4. Kembali ke area parkir steril secara otonom.',
    ],
    teamRoleAndFunFacts: [
      '🚀 Tim Abhinaya merancang sistem proteksi sinar UV tertutup untuk menjamin keamanan operator selama sesi pengujian.',
      '🏅 Berhasil meraih predikat FINALIS TINGKAT NASIONAL KRTMI 2020 di ITB Bandung.',
    ],
    achievement: '🏅 FINALIS TINGKAT NASIONAL KRTMI 2020 (ITB BANDUNG)',
    isChampion: false,
    coverImage: '/images/tournaments/krtmi_2020_thumb.jpg',
    logoImage: '/images/tournaments/krtmi_2020_cover.png',
    pdfFile: 'Panduan_KRI_2020.pdf',
    pdfSize: '5.08 MB',
    pdfTitle: 'Petunjuk Pelaksanaan KRI 2020 — KRTMI / KRSTI (Puspresnas & ITB)',
  },
  {
    year: '2019',
    badgeYear: '2019',
    title: 'KRTMI 2019 — Robot Pertanian Cerdas & Otomasi Panen Padi',
    tagline: 'Tonggak Sejarah Kelahiran Divisi Tematik: Otomasi Panen Padi Nusantara',
    theme: 'Kelahiran Divisi Tematik: Otomasi Panen Padi & Pertanian Modern Nusantara',
    slogan: '”Kecukupan Pangan, Kemandirian Bangsa”',
    location: 'Universitas Dian Nuswantoro (UDINUS) Semarang',
    hostOrganizer: 'Direktorat Kemahasiswaan Ditjen Belmawa Kemenristekdikti & UDINUS Semarang',
    storySummary: 'Tahun 2019 adalah tahun bersejarah peluncuran divisi baru Kontes Robot Tematik Indonesia (KRTMI) oleh Kemenristekdikti untuk menjawab tantangan kedaulatan pangan nasional. Robot harus menavigasi sawah terasering berundak (500x300 cm), memotong batang padi tiruan dengan bilah pemotong putar berkecepatan tinggi tanpa merusak tanah, dan mengangkut gabah ke lumbung panen terpusat.',
    arenaSpecs: {
      dimensions: '500 cm x 300 cm (Simulasi Pematang Sawah Bertingkat / Terasering)',
      surface: 'Kontur bertingkat kayu lapis sintetis dengan pematang sawah setinggi 10 cm',
      zones: 'Start Pad, Sawah Terasering Tingkat 1 & 2, Jalur Pematang, Lumbung Gabah Terpusat',
      obstacles: 'Pematang sawah berundak, kontur tanah tidak rata',
      borderWall: 'Pembatas tepi sawah setinggi 10 cm',
      lightingAndCamera: 'Pencahayaan arena KRI standar nasional UDINUS',
    },
    robotSpecs: {
      robotCount: '1 Robot Pemanen Padi Otonom / Semi-Otonom',
      dimensions: 'Maksimal 50 cm x 50 cm x 50 cm',
      weight: 'Maksimal 12 kg',
      power: 'Baterai Kering SLA (Sealed Lead Acid) 12V 4.5Ah / LiPo 3S',
      controller: 'Microcontroller ATmega2560 + High-Current Dual MOSFET H-Bridge Driver',
      mechanism: 'High-RPM Rotary Crop Cutter + Conveyor Storage Hopper & Tilt Dispenser',
      maxSpeed: 'Kecepatan panen stabil melintasi kontur terasering',
      autonomyMode: 'Kombinasi Navigasi Garis Pematang Otonom & Kendali Nirkabel',
      communications: 'RF Link Remote Switch',
    },
    gameObjects: {
      types: ['Batang Tanaman Padi Tiruan Berbutir Gabah', 'Lumbung Padi Penyimpanan'],
      dimensions: 'Ikatan Padi: Diameter 5 cm, Tinggi 30 cm | Lumbung: 40x40x30 cm',
      quantity: '10 Rumpun Padi di Terasering 1 & 10 Rumpun di Terasering 2',
      properties: 'Batang fleksibel sintetis mudah dipotong oleh bilah rotary',
    },
    matchProcedure: {
      matchDuration: '3 Menit (180 Detik)',
      prepTime: '1 Menit',
      teamQuota: '4 Mahasiswa + 1 Dosen Pembimbing',
      victoryCondition: 'Panen Raya Penuh (Seluruh Padi Terpotong & Masuk Lumbung Tercepat)',
    },
    scoringSystem: [
      'Padi Berhasil Dipotong Rapi: 20 Poin per ikat',
      'Padi Masuk Lumbung Sempurna: 50 Poin per lumbung',
      'Panen Raya (Seluruh Rumpun Bersih): +100 Poin Tambahan',
      'Penalti: -20 Poin jika merusak konstruksi pematang sawah',
    ],
    penaltiesAndDisqualifications: [
      'Pisau perusak merusak lapisan lantai sawah: -25 Poin',
      'Robot terguling dari pematang sawah: Wajib retry dari start',
      'Intervensi fisik saat robot memotong: Diskualifikasi',
    ],
    missionRules: [
      '1. Robot berangkat dari Start Pad mendaki pematang terasering.',
      '2. Pisau rotary berputar memotong rumpun padi tiruan.',
      '3. Konveyor mengangkat gabah ke dalam hopper penyimpanan.',
      '4. Mengalirkan hasil panen ke dalam lumbung gabah terpusat.',
    ],
    teamRoleAndFunFacts: [
      '🌱 Menjadi tonggak sejarah berdirinya Tim Riset Divisi Tematik Abhinaya di Universitas Negeri Yogyakarta.',
      '💡 Mekanisme pisau rotary dan hopper conveyor menjadi rujukan desain mekanik robot pertanian generasi berikutnya.',
    ],
    achievement: '🌱 PIONIR RISET DIVISI TEMATIK KRTMI UNY 2019',
    isChampion: false,
    coverImage: '/images/tournaments/krtmi_2019_thumb.jpg',
    logoImage: '/images/tournaments/krtmi_2019_cover.png',
    pdfFile: 'Panduan_KRTMI_2019.pdf',
    pdfSize: '0.24 MB',
    pdfTitle: 'Panduan Resmi Kontes Robot Tematik Indonesia (KRTMI) 2019 (Ditjen Belmawa Kemenristekdikti)',
  },
];

export interface TeamDivision {
  id: string;
  name: string;
  icon: string;
  desc: string;
  skills: string[];
}

export const TEAM_DIVISIONS: TeamDivision[] = [
  {
    id: 'mekanik',
    name: 'Divisi Mekanik (CAD & Prototyping)',
    icon: 'Wrench',
    desc: 'Merancang sasis 3D di Autodesk Inventor/Fusion 360, menghitung distribusi beban, memilih gear & motor penggerak, serta merakit sistem capit/gripper dengan 3D printing & mesin CNC.',
    skills: ['3D CAD Modeling', 'Mecanum/Omni Chassis Assembly', '3D Printing & Las Alumunium', 'Gripper & Kinematics Design'],
  },
  {
    id: 'elektrik',
    name: 'Divisi Elektrik & Hardware',
    icon: 'Zap',
    desc: 'Mendesain layout PCB sirkuit di KiCad/Eagle, merangkai driver motor arus tinggi (TB6612/BTS7960), sistem manajemen daya baterai LiFePO4/LiPo, fusi sensor IMU, dan jalur pengkabelan rapi.',
    skills: ['PCB Design & Soldering', 'Motor Drivers & Power Management', 'Sensor Integration (IMU, ToF, Optical)', 'Microcontroller Wiring'],
  },
  {
    id: 'programming',
    name: 'Divisi Pemrograman & AI',
    icon: 'Code',
    desc: 'Menulis firmware kontrol otonom di ESP32 & STM32, mengatur algoritma navigasi cerdas, tuning kecepatan motor dengan Closed-Loop PID, dan melatih model Visi Komputer (YOLO) untuk deteksi objek.',
    skills: ['C/C++ Embedded Firmware', 'Closed-Loop PID Tuning', 'Computer Vision (OpenCV/YOLO)', 'RTOS & Wireless Telemetry'],
  },
  {
    id: 'manajerial',
    name: 'Divisi Manajerial & Media',
    icon: 'Users',
    desc: 'Mengelola administrasi tim, jadwal riset workshop, pembuatan video dokumentasi lomba, branding media sosial Instagram & TikTok, serta penyusunan berkas proposal kejuaraan.',
    skills: ['Project Management', 'Video & Photo Content Creation', 'Social Media Branding (@abhinaya.uny)', 'Sponsorship & Logistics'],
  },
];
