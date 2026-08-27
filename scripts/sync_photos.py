import os
import shutil
from PIL import Image

src_folder = r"D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\Restek\Abhinaya 2025\ABHINAYA - FEED ANGGOTA"
dest_folder = r"D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web\public\images\members"
os.makedirs(dest_folder, exist_ok=True)

name_map = {
    "1.png": "01_abdul_hasib_adzdzin_nuha_1.png",
    "2.png": "01_abdul_hasib_adzdzin_nuha_2.png",
    "3.png": "02_agus_bagaskoro_1.png",
    "4.png": "02_agus_bagaskoro_2.png",
    "5.png": "03_ikhsan_nurrohman_1.png",
    "6.png": "03_ikhsan_nurrohman_2.png",
    "7.png": "04_mustika_wahyu_aprilia_1.png",
    "8.png": "04_mustika_wahyu_aprilia_2.png",
    "9.png": "05_rose_pita_nur_afifah_1.png",
    "10.png": "05_rose_pita_nur_afifah_2.png",
    "11.png": "06_tri_wahyu_handoyo_1.png",
    "12.png": "06_tri_wahyu_handoyo_2.png",
    "13.png": "07_farhan_yuda_mahendra_1.png",
    "14.png": "07_farhan_yuda_mahendra_2.png",
    "15.png": "08_salsabila_azzahra_1.png",
    "16.png": "08_salsabila_azzahra_2.png",
    "17.png": "09_ilham_widyo_nugroho_1.png",
    "18.png": "09_ilham_widyo_nugroho_2.png",
    "19.png": "10_muhamad_ilham_sony_1.png",
    "20.png": "10_muhamad_ilham_sony_2.png",
    "21.png": "11_caesar_sokma_langgeng_1.png",
    "22.png": "11_caesar_sokma_langgeng_2.png",
    "23.png": "12_rionaldi_nugroho_1.png",
    "24.png": "12_rionaldi_nugroho_2.png",
    "25.png": "13_wanted_uang_kas_bendahara.png"
}

# 1. Rename files in original folder AND copy to web public folder
for old_name, new_name in name_map.items():
    old_path = os.path.join(src_folder, old_name)
    new_path = os.path.join(src_folder, new_name)
    web_path = os.path.join(dest_folder, new_name)
    
    if os.path.exists(old_path):
        # Copy to web
        shutil.copy2(old_path, web_path)
        # Rename original
        os.rename(old_path, new_path)
        print(f"Renamed & Copied: {old_name} -> {new_name}")
    elif os.path.exists(new_path):
        # Already renamed, copy to web
        shutil.copy2(new_path, web_path)
        print(f"Copied existing: {new_name} -> {web_path}")

# 2. Copy team UMS 2024 photo
team_src = r"D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\Restek\Abhinaya 2025\Promosi Video\Footages\Foto\Foto\DSCF2250.JPG"
team_dest_dir = r"D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web\public\images"
os.makedirs(team_dest_dir, exist_ok=True)
team_dest = os.path.join(team_dest_dir, "team_ums_2024.jpg")

if os.path.exists(team_src):
    shutil.copy2(team_src, team_dest)
    print(f"Copied team photo: {team_src} -> {team_dest}")
    
    # Also optimize a compressed web version
    im = Image.open(team_src)
    im_resized = im.resize((1920, int(1920 * im.height / im.width)), Image.Resampling.LANCZOS)
    im_resized.save(os.path.join(team_dest_dir, "team_ums_2024_web.jpg"), "JPEG", quality=88, optimize=True)
    print("Generated web-optimized team photo: team_ums_2024_web.jpg")
