import json

file_path = r"D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web\data\teamData.ts"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Exact mapping of all authentic named member photos from Instagram (2020-2025)
member_photo_map = {
    "'prof-khairudin'": [
        "/images/instagram_feed/2024-09-12_16-47-00_UTC_C_0wbi1z6IH.jpg",
        "/images/instagram_feed/2025-09-27_20-31-45_UTC_DPHoOJJk2NM_2.jpg",
        "/assets/logo_abhinaya_solid.png"
    ],
    "'dr-herlambang'": [
        "/assets/logo_abhinaya_solid.png"
    ],
    "'ilham-widyo-nugroho'": [
        "/images/members/09_ilham_widyo_nugroho_1.png",
        "/images/members/09_ilham_widyo_nugroho_2.png",
        "/images/instagram_feed/2024-09-12_16-47-42_UTC_C_0wguVTpGY.jpg",
        "/images/instagram_feed/2024-09-12_16-40-27_UTC_C_0vriTzQUk_2.jpg",
        "/images/instagram_feed/2023-09-08_01-33-34_UTC_Cw6Zxo-vmO3_2.jpg"
    ],
    "'mustika-wahyu-aprilia'": [
        "/images/members/04_mustika_wahyu_aprilia_1.png",
        "/images/members/04_mustika_wahyu_aprilia_2.png",
        "/images/instagram_feed/2024-09-12_16-45-33_UTC_C_0wQ-qzwUx_2.jpg",
        "/images/instagram_feed/2023-09-08_01-41-47_UTC_Cw6at1NPTGL_2.jpg"
    ],
    "'rose-pita-nur-afifah'": [
        "/images/members/05_rose_pita_nur_afifah_1.png",
        "/images/members/05_rose_pita_nur_afifah_2.png",
        "/images/instagram_feed/2024-09-12_16-45-33_UTC_C_0wQ-qzwUx_3.jpg",
        "/images/instagram_feed/2025-09-27_20-30-33_UTC_DPHoFZYk8lw_2.jpg"
    ],
    "'tri-wahyu-handoyo'": [
        "/images/members/06_tri_wahyu_handoyo_1.png",
        "/images/members/06_tri_wahyu_handoyo_2.png",
        "/images/instagram_feed/2024-09-12_16-37-07_UTC_C_0vTMcTTGT_2.jpg",
        "/images/instagram_feed/2025-09-27_20-21-31_UTC_DPHnDR1E7WH_2.jpg",
        "/images/instagram_feed/2023-09-08_01-27-05_UTC_Cw6ZCItPRJ-_3.jpg"
    ],
    "'salsabila-azzahra'": [
        "/images/members/08_salsabila_azzahra_1.png",
        "/images/members/08_salsabila_azzahra_2.png",
        "/images/instagram_feed/2024-09-12_16-37-07_UTC_C_0vTMcTTGT_3.jpg",
        "/images/instagram_feed/2023-09-08_01-48-22_UTC_Cw6bd9zPTNP_2.jpg",
        "/images/instagram_feed/2023-09-08_01-27-05_UTC_Cw6ZCItPRJ-_2.jpg"
    ],
    "'farhan-yuda-mahendra'": [
        "/images/members/07_farhan_yuda_mahendra_1.png",
        "/images/members/07_farhan_yuda_mahendra_2.png",
        "/images/instagram_feed/2024-09-12_16-37-07_UTC_C_0vTMcTTGT_4.jpg",
        "/images/instagram_feed/2025-09-27_20-32-54_UTC_DPHoWoFkxa3_2.jpg",
        "/images/instagram_feed/2025-09-27_20-21-31_UTC_DPHnDR1E7WH_3.jpg",
        "/images/instagram_feed/2023-09-08_01-27-05_UTC_Cw6ZCItPRJ-_4.jpg"
    ],
    "'abdul-hasib-adzdzin-nuha'": [
        "/images/members/01_abdul_hasib_adzdzin_nuha_1.png",
        "/images/members/01_abdul_hasib_adzdzin_nuha_2.png",
        "/images/instagram_feed/2024-09-12_16-42-44_UTC_C_0v8QYT7kJ_2.jpg",
        "/images/instagram_feed/2025-09-27_20-17-09_UTC_DPHmjMFEwJm_3.jpg",
        "/images/instagram_feed/2023-09-08_01-39-35_UTC_Cw6ads0v8Q2_4.jpg"
    ],
    "'agus-bagaskoro'": [
        "/images/members/02_agus_bagaskoro_1.png",
        "/images/members/02_agus_bagaskoro_2.png",
        "/images/instagram_feed/2024-09-12_16-42-44_UTC_C_0v8QYT7kJ_3.jpg",
        "/images/instagram_feed/2023-09-08_01-39-35_UTC_Cw6ads0v8Q2_3.jpg"
    ],
    "'ikhsan-nurrohman'": [
        "/images/members/03_ikhsan_nurrohman_1.png",
        "/images/members/03_ikhsan_nurrohman_2.png",
        "/images/instagram_feed/2024-09-12_16-42-44_UTC_C_0v8QYT7kJ_4.jpg",
        "/images/instagram_feed/2025-09-27_20-17-09_UTC_DPHmjMFEwJm_2.jpg"
    ],
    "'yusron-nur-latief'": [
        "/images/instagram_feed/2023-09-08_01-39-35_UTC_Cw6ads0v8Q2_2.jpg",
        "/assets/logo_abhinaya_solid.png"
    ],
    "'muhamad-ilham-sony'": [
        "/images/members/10_muhamad_ilham_sony_1.png",
        "/images/members/10_muhamad_ilham_sony_2.png",
        "/images/instagram_feed/2024-09-12_16-40-27_UTC_C_0vriTzQUk_3.jpg",
        "/images/instagram_feed/2023-09-08_01-33-34_UTC_Cw6Zxo-vmO3_3.jpg"
    ],
    "'caesar-sokma-langgeng'": [
        "/images/members/11_caesar_sokma_langgeng_1.png",
        "/images/members/11_caesar_sokma_langgeng_2.png",
        "/images/instagram_feed/2024-09-12_16-40-27_UTC_C_0vriTzQUk_4.jpg",
        "/images/instagram_feed/2025-09-27_20-10-47_UTC_DPHl0olk4Zw_3.jpg"
    ],
    "'rionaldi-nugroho'": [
        "/images/members/12_rionaldi_nugroho_1.png",
        "/images/members/12_rionaldi_nugroho_2.png",
        "/images/instagram_feed/2024-09-12_16-40-27_UTC_C_0vriTzQUk_5.jpg",
        "/images/instagram_feed/2025-09-27_20-10-47_UTC_DPHl0olk4Zw_2.jpg"
    ]
}

import re

for mem_id, imgs in member_photo_map.items():
    formatted_imgs = "[\n      " + ",\n      ".join([f"'{img}'" for img in imgs]) + ",\n    ]"
    # Match id block and replace images array
    pattern = rf"(id:\s*{mem_id},[\s\S]*?images:\s*\[[\s\S]*?\],)"
    def repl(m):
        block = m.group(1)
        # replace the images:[...] part inside this block
        return re.sub(r"images:\s*\[[\s\S]*?\],", f"images: {formatted_imgs},", block)
    
    if re.search(pattern, content):
        content = re.sub(pattern, repl, content, count=1)
    else:
        # If images didn't exist, insert after image: '...'
        p2 = rf"(id:\s*{mem_id},[\s\S]*?image:\s*'[^']+',)"
        def repl2(m):
            return f"{m.group(1)}\n    images: {formatted_imgs},"
        content = re.sub(p2, repl2, content, count=1)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Successfully enriched data/teamData.ts with authentic multi-year Instagram photos for all members!")
