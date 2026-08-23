import os
import re

base_dir = r"D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web\.agents\spec_miner_guidebooks"
out_file = os.path.join(base_dir, "analysis_dump.txt")

with open(out_file, "w", encoding="utf-8") as out:
    def log(msg=""):
        out.write(str(msg) + "\n")

    def print_section(title, text):
        log("=" * 80)
        log(f"=== {title} ===")
        log("=" * 80)
        log(text)

    # 1. KRTMI 2024
    log("=================================================================")
    log("=== ANALYSIS OF KRTMI 2024 (BUKU 7 & KRI 2024) ===")
    log("=================================================================")
    with open(os.path.join(base_dir, "extracted_krtmi_2024.txt"), "r", encoding="utf-8") as f:
        krtmi_2024_txt = f.read()

    sections_2024 = [
        "Tema Kontes",
        "1. Latar Belakang",
        "2. Konsep Kontes",
        "3. Rancangan Kontes",
        "4. Aturan Kontes",
        "4.2.1 Persiapan Robot",
        "4.2.2 Pergerakan ROBOT",
        "4.2.3 SAMPAH",
        "4.2.4 Mengumpankan SAMPAH",
        "4.2.5 Memilah SAMPAH",
        "4.2.6 PENILAIAN",
        "4.2.7 MEMUTUSKAN PEMENANG",
        "4.2.8 RANCANGAN DAN PENGEMBANGAN ROBOT",
        "4.2.9 PELANGGARAN",
        "4.2.10 DISKUALIFIKASI",
        "4.2.11 TIM",
        "4.2.12 KESELAMATAN",
        "5. Seleksi Wilayah Secara Daring",
        "6. Hak Kekayaan Intelektual",
        "7. Lain-lain",
        "8. Penutup"
    ]
    for s in sections_2024:
        idx = krtmi_2024_txt.find(s)
        if idx != -1:
            log(f"\n--- Section: {s} ---")
            log(krtmi_2024_txt[idx:idx+2500].strip())

    # 2. KRTMI 2023
    log("\n\n=================================================================")
    log("=== ANALYSIS OF KRTMI 2023 (DIGITAL TWIN) ===")
    log("=================================================================")
    with open(os.path.join(base_dir, "extracted_krtmi_2023.txt"), "r", encoding="utf-8") as f:
        krtmi_2023_txt = f.read()

    sections_2023 = [
        "1. Latar Belakang",
        "2. Konsep Kontes",
        "3. Rancangan Kontes",
        "4. Aturan Kontes",
        "4.1", "4.2",
        "4.2.1", "4.2.2", "4.2.3", "4.2.4", "4.2.5", "4.2.6", "4.2.7", "4.2.8", "4.2.9", "4.2.10",
        "PENILAIAN",
        "MEMUTUSKAN PEMENANG",
        "RANCANGAN DAN PENGEMBANGAN ROBOT",
        "PELANGGARAN",
        "DISKUALIFIKASI",
        "ARENA KONTES DAN ROBOT"
    ]
    for s in sections_2023:
        idx = krtmi_2023_txt.find(s)
        if idx != -1:
            log(f"\n--- Section: {s} ---")
            log(krtmi_2023_txt[idx:idx+2500].strip())

    # 3. TECHNOCORNER 2026 TRANSPORTER
    log("\n\n=================================================================")
    log("=== ANALYSIS OF TECHNOCORNER 2026 TRANSPORTER ===")
    log("=================================================================")
    with open(os.path.join(base_dir, "extracted_technocorner_2026.txt"), "r", encoding="utf-8") as f:
        tc_txt = f.read()

    log(tc_txt)

print("Analysis dump written successfully to analysis_dump.txt")
