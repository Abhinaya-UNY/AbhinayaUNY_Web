import os
from PIL import Image

members_dir = r"D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web\public\images\members"
ig_dir = r"D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web\public\images\instagram_feed"

candidates = {
    "2023_program_tri_wahyu_handoyo_01.jpg": os.path.join(members_dir, "06_tri_wahyu_handoyo_1.png"),
    "2023_programmer_tri_wahyu_handoyo_01.jpg": os.path.join(members_dir, "06_tri_wahyu_handoyo_1.png"),
    "2023_program_farhan_yuda_mahendra_01.jpg": os.path.join(members_dir, "07_farhan_yuda_mahendra_1.png"),
    "2023_programmer_farhan_yuda_mahendra_01.jpg": os.path.join(members_dir, "07_farhan_yuda_mahendra_1.png"),
    "2023_elektronik_abdul_hasib_adzdzin_nuha_01.jpg": os.path.join(members_dir, "01_abdul_hasib_adzdzin_nuha_1.png"),
    "2023_elektronik_agus_bagaskoro_01.jpg": os.path.join(members_dir, "02_agus_bagaskoro_1.png"),
    "2023_mekanik_muhamad_ilham_sony_01.jpg": os.path.join(members_dir, "10_muhamad_ilham_sony_1.png"),
    "2022_manager_mustika_wahyu_aprilia_01.jpg": os.path.join(members_dir, "04_mustika_wahyu_aprilia_1.png"),
    "2022_program_muhammad_iqbal_rasyid_01.jpg": os.path.join(members_dir, "2020_program_muhammad_iqbal_rasyid_01.jpg"),
    "2022_programmer_muhammad_iqbal_rasyid_01.jpg": os.path.join(members_dir, "2020_program_muhammad_iqbal_rasyid_01.jpg"),
    "2022_program_nurcholis_01.jpg": os.path.join(members_dir, "2020_leader_nurcholis_01.jpg"),
    "2022_programmer_nurcholis_01.jpg": os.path.join(members_dir, "2020_leader_nurcholis_01.jpg"),
    "2022_program_budi_arjaya_wida_01.jpg": os.path.join(members_dir, "2020_program_budi_arjaya_wida_01.jpg"),
    "2022_programmer_budi_arjaya_wida_01.jpg": os.path.join(members_dir, "2020_program_budi_arjaya_wida_01.jpg"),
    "2022_elektronik_agus_bagaskoro_01.jpg": os.path.join(members_dir, "02_agus_bagaskoro_1.png"),
    "2022_elektronik_musa_beni_ricardo_aruan_01.jpg": os.path.join(members_dir, "2020_elektronik_musa_beni_ricardo_aruan_01.jpg"),
    "2022_mekanik_musyarof_rifai_01.jpg": os.path.join(members_dir, "2020_mekanik_musyarof_rifai_01.jpg"),
    "2022_mekanik_anggoro_fajar_dwi_utomo_01.jpg": os.path.join(members_dir, "2020_mekanik_anggoro_fajar_dwi_utomo_01.jpg"),
    "2022_mekanik_anggoro_fajar_dwi_s_01.jpg": os.path.join(members_dir, "2020_mekanik_anggoro_fajar_dwi_utomo_01.jpg"),
    "2022_mekanik_ilham_widyo_nugroho_01.jpg": os.path.join(members_dir, "09_ilham_widyo_nugroho_1.png"),
    "2022_desain_afif_aiman_saputra_01.jpg": os.path.join(members_dir, "2021_leader_afif_aiman_saputra_01.jpg"),
    "2022_desain_ahmad_insan_kamil_01.jpg": os.path.join(ig_dir, "2022-09-24_15-07-57_UTC_Ci5Ni_VrsFe_1.jpg"),
}

for target, src in candidates.items():
    exists = os.path.exists(src)
    if exists:
        sz = os.path.getsize(src)
        with Image.open(src) as img:
            dims = f"{img.width}x{img.height}"
            fmt = img.format
            mode = img.mode
        print(f"OK: {target} <- {os.path.basename(src)} ({fmt}, {mode}, {dims}, {sz} bytes)")
    else:
        print(f"MISSING SRC: {target} <- {src}")
