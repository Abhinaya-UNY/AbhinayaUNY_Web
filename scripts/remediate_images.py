import os
import shutil
from PIL import Image

code_dir = r"D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web"
members_dir = os.path.join(code_dir, "public", "images", "members")
ig_dir = os.path.join(code_dir, "public", "images", "instagram_feed")

def copy_or_convert_to_jpg(src, dst, quality=95):
    """Safely copies or converts any valid image to standard high-quality RGB JPEG."""
    if not os.path.exists(src):
        raise FileNotFoundError(f"Source image not found: {src}")
    
    with Image.open(src) as img:
        if img.mode in ('RGBA', 'LA') or (img.mode == 'P' and 'transparency' in img.info):
            # Composite transparent PNG onto dark studio slate background
            bg = Image.new('RGB', img.size, (1, 2, 7))
            if img.mode == 'RGBA':
                bg.paste(img, mask=img.split()[3])
            else:
                bg.paste(img)
            bg.save(dst, 'JPEG', quality=quality)
        elif img.format == 'JPEG':
            shutil.copy2(src, dst)
        else:
            img.convert('RGB').save(dst, 'JPEG', quality=quality)
    print(f"  [REMEDIATED] {os.path.basename(dst)} ({os.path.getsize(dst)} bytes) <- {os.path.basename(src)}")

# 1. 22 Member Blank Photos Remediation Mapping
remediation_map_members = {
    # 2023 Corrupted files
    "2023_program_tri_wahyu_handoyo_01.jpg": os.path.join(members_dir, "2024_program_tri_wahyu_handoyo_01.jpg"),
    "2023_programmer_tri_wahyu_handoyo_01.jpg": os.path.join(members_dir, "2024_program_tri_wahyu_handoyo_01.jpg"),
    "2023_program_farhan_yuda_mahendra_01.jpg": os.path.join(members_dir, "2024_program_farhan_yuda_mahendra_01.jpg"),
    "2023_programmer_farhan_yuda_mahendra_01.jpg": os.path.join(members_dir, "2024_program_farhan_yuda_mahendra_01.jpg"),
    "2023_elektronik_abdul_hasib_adzdzin_nuha_01.jpg": os.path.join(members_dir, "2024_elektronik_abdul_hasib_adzdzin_nuha_01.jpg"),
    "2023_elektronik_agus_bagaskoro_01.jpg": os.path.join(members_dir, "2024_elektronik_agus_bagaskoro_01.jpg"),
    "2023_mekanik_muhamad_ilham_sony_01.jpg": os.path.join(members_dir, "2024_mekanik_muhamad_ilham_sony_01.jpg"),
    
    # 2022 Corrupted files
    "2022_manager_mustika_wahyu_aprilia_01.jpg": os.path.join(members_dir, "2024_manager_mustika_wahyu_aprilia_01.jpg"),
    "2022_program_muhammad_iqbal_rasyid_01.jpg": os.path.join(members_dir, "2020_program_muhammad_iqbal_rasyid_01.jpg"),
    "2022_programmer_muhammad_iqbal_rasyid_01.jpg": os.path.join(members_dir, "2020_program_muhammad_iqbal_rasyid_01.jpg"),
    "2022_program_nurcholis_01.jpg": os.path.join(members_dir, "2020_leader_nurcholis_01.jpg"),
    "2022_programmer_nurcholis_01.jpg": os.path.join(members_dir, "2020_leader_nurcholis_01.jpg"),
    "2022_program_budi_arjaya_wida_01.jpg": os.path.join(members_dir, "2020_program_budi_arjaya_wida_01.jpg"),
    "2022_programmer_budi_arjaya_wida_01.jpg": os.path.join(members_dir, "2020_program_budi_arjaya_wida_01.jpg"),
    "2022_elektronik_agus_bagaskoro_01.jpg": os.path.join(members_dir, "2024_elektronik_agus_bagaskoro_01.jpg"),
    "2022_elektronik_musa_beni_ricardo_aruan_01.jpg": os.path.join(members_dir, "2020_elektronik_musa_beni_ricardo_aruan_01.jpg"),
    "2022_mekanik_musyarof_rifai_01.jpg": os.path.join(members_dir, "2020_mekanik_musyarof_rifai_01.jpg"),
    "2022_mekanik_anggoro_fajar_dwi_utomo_01.jpg": os.path.join(members_dir, "2020_mekanik_anggoro_fajar_dwi_utomo_01.jpg"),
    "2022_mekanik_anggoro_fajar_dwi_s_01.jpg": os.path.join(members_dir, "2020_mekanik_anggoro_fajar_dwi_utomo_01.jpg"),
    "2022_mekanik_ilham_widyo_nugroho_01.jpg": os.path.join(members_dir, "2024_mekanik_ilham_widyo_nugroho_01.jpg"),
    "2022_desain_afif_aiman_saputra_01.jpg": os.path.join(members_dir, "2021_leader_afif_aiman_saputra_01.jpg"),
    "2022_desain_ahmad_insan_kamil_01.jpg": os.path.join(ig_dir, "2022-09-24_15-07-57_UTC_Ci5Ni_VrsFe_1.jpg"),
}

print("=== Remediation 1: Replacing 22 Corrupted Placeholder Photos in public/images/members/ ===")
for target_name, src_path in remediation_map_members.items():
    dst_path = os.path.join(members_dir, target_name)
    copy_or_convert_to_jpg(src_path, dst_path)

# 2. Instagram Feed Scraper Slide Remediation
remediation_map_ig = {
    "2022-09-24_15-07-57_UTC_Ci5Ni_VrsFe_3.jpg": os.path.join(members_dir, "2021_leader_afif_aiman_saputra_01.jpg"),
    "2022-09-24_15-07-57_UTC_Ci5Ni_VrsFe_4.jpg": os.path.join(ig_dir, "2022-09-24_15-07-57_UTC_Ci5Ni_VrsFe_1.jpg"),
    "2022-09-24_15-10-54_UTC_Ci5N4jTrT34_3.jpg": os.path.join(members_dir, "2020_mekanik_anggoro_fajar_dwi_utomo_01.jpg"),
    "2022-09-24_15-10-54_UTC_Ci5N4jTrT34_4.jpg": os.path.join(members_dir, "2020_mekanik_musyarof_rifai_01.jpg"),
    "2022-09-24_15-10-54_UTC_Ci5N4jTrT34_5.jpg": os.path.join(members_dir, "2024_mekanik_ilham_widyo_nugroho_01.jpg"),
    "2022-09-24_15-15-54_UTC_Ci5OdP-L4vD_3.jpg": os.path.join(members_dir, "2024_elektronik_agus_bagaskoro_01.jpg"),
    "2022-09-24_15-15-54_UTC_Ci5OdP-L4vD_4.jpg": os.path.join(members_dir, "2020_elektronik_musa_beni_ricardo_aruan_01.jpg"),
    "2022-09-24_15-24-38_UTC_Ci5PdHUrgvk_3.jpg": os.path.join(members_dir, "2024_manager_mustika_wahyu_aprilia_01.jpg"),
    "2022-09-24_16-40-21_UTC_Ci5YHvevYYu_3.jpg": os.path.join(members_dir, "2020_program_muhammad_iqbal_rasyid_01.jpg"),
    "2022-09-24_16-40-21_UTC_Ci5YHvevYYu_4.jpg": os.path.join(members_dir, "2020_program_budi_arjaya_wida_01.jpg"),
    "2022-09-24_16-40-21_UTC_Ci5YHvevYYu_5.jpg": os.path.join(members_dir, "2020_leader_nurcholis_01.jpg"),
    "2023-09-08_01-27-05_UTC_Cw6ZCItPRJ-_3.jpg": os.path.join(members_dir, "2024_program_farhan_yuda_mahendra_01.jpg"),
    "2023-09-08_01-27-05_UTC_Cw6ZCItPRJ-_4.jpg": os.path.join(members_dir, "2024_program_tri_wahyu_handoyo_01.jpg"),
    "2023-09-08_01-33-34_UTC_Cw6Zxo-vmO3_3.jpg": os.path.join(members_dir, "2024_elektronik_agus_bagaskoro_01.jpg"),
    "2023-09-08_01-39-35_UTC_Cw6ads0v8Q2_3.jpg": os.path.join(members_dir, "2024_elektronik_abdul_hasib_adzdzin_nuha_01.jpg"),
    "2023-09-08_01-39-35_UTC_Cw6ads0v8Q2_4.jpg": os.path.join(members_dir, "2024_mekanik_muhamad_ilham_sony_01.jpg"),
}

print("\n=== Remediation 2: Replacing 16 Scraper Black Slides in public/images/instagram_feed/ ===")
for target_name, src_path in remediation_map_ig.items():
    dst_path = os.path.join(ig_dir, target_name)
    copy_or_convert_to_jpg(src_path, dst_path)

# 3. Complete Semantic & Alias Generation for 2021 Squad
additional_semantic_2021 = {
    "2021_program_nurcholis_01.jpg": os.path.join(members_dir, "2020_leader_nurcholis_01.jpg"),
    "2021_programmer_nurcholis_01.jpg": os.path.join(members_dir, "2020_leader_nurcholis_01.jpg"),
    "2021_program_budi_arjaya_wida_01.jpg": os.path.join(members_dir, "2020_program_budi_arjaya_wida_01.jpg"),
    "2021_programmer_budi_arjaya_wida_01.jpg": os.path.join(members_dir, "2020_program_budi_arjaya_wida_01.jpg"),
    "2021_program_alfan_fajri_tamyis_01.jpg": os.path.join(members_dir, "2020_program_alfan_fajri_tamyis_01.jpg"),
    "2021_programmer_alfan_fajri_tamyis_01.jpg": os.path.join(members_dir, "2020_program_alfan_fajri_tamyis_01.jpg"),
    "2021_program_muhammad_iqbal_rasyid_01.jpg": os.path.join(members_dir, "2020_program_muhammad_iqbal_rasyid_01.jpg"),
    "2021_programmer_muhammad_iqbal_rasyid_01.jpg": os.path.join(members_dir, "2020_program_muhammad_iqbal_rasyid_01.jpg"),
    "2021_program_salsabila_azzahra_01.jpg": os.path.join(members_dir, "2024_program_salsabila_azzahra_psdu_01.jpg"),
    "2021_programmer_salsabila_azzahra_01.jpg": os.path.join(members_dir, "2024_program_salsabila_azzahra_psdu_01.jpg"),
    "2021_elektronik_musa_beni_ricardo_aruan_01.jpg": os.path.join(members_dir, "2020_elektronik_musa_beni_ricardo_aruan_01.jpg"),
    "2021_elektronik_yusron_nur_latief_01.jpg": os.path.join(members_dir, "2020_elektronik_yusron_nur_latief_01.jpg"),
    "2021_elektronik_ardhi_wiranata_01.jpg": os.path.join(members_dir, "2020_elektronik_ardhi_wiranata_01.jpg"),
    "2021_mekanik_afif_aiman_saputra_01.jpg": os.path.join(members_dir, "2020_mekanik_afif_aiman_saputra_01.jpg"),
    "2021_mekanik_muhammad_rovi_aan_sulistya_01.jpg": os.path.join(members_dir, "2020_mekanik_muhammad_rovi_aan_sulistya_01.jpg"),
    "2021_mekanik_anggoro_fajar_dwi_utomo_01.jpg": os.path.join(members_dir, "2020_mekanik_anggoro_fajar_dwi_utomo_01.jpg"),
    "2021_mekanik_geo_brahma_granito_z_01.jpg": os.path.join(members_dir, "2022_desain_geo_brahma_granito_z_01.jpg"),
    "2021_mekanik_musyarof_rifai_01.jpg": os.path.join(members_dir, "2020_mekanik_musyarof_rifai_01.jpg"),
}

print("\n=== Semantic Sync: Generating 2021 Member Roster Files ===")
for target_name, src_path in additional_semantic_2021.items():
    dst_path = os.path.join(members_dir, target_name)
    copy_or_convert_to_jpg(src_path, dst_path)

print("\nAll image remediation and semantic file generation completed successfully!")
