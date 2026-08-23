import os
import json
import re

base_dir = r"D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web\.agents\spec_miner_guidebooks"

def search_sections(txt, keywords):
    for kw in keywords:
        matches = list(re.finditer(re.escape(kw), txt, re.IGNORECASE))
        print(f"\n--- KW: {kw} ({len(matches)} found) ---")
        for m in matches[:3]:
            start = max(0, m.start() - 30)
            end = min(len(txt), m.end() + 400)
            print(txt[start:end].replace('\n', ' '))

print("=================== KRTMI 2023 ===================")
with open(os.path.join(base_dir, "krtmi_2023_clean.txt"), "r", encoding="utf-8") as f:
    t23 = f.read()
search_sections(t23, ["Digital Twin", "PENILAIAN", "MEMUTUSKAN PEMENANG", "RANCANGAN", "Ukuran", "PELANGGARAN", "DISKUALIFIKASI", "Waktu"])

print("\n=================== TECHNOCORNER 2026 ===================")
with open(os.path.join(base_dir, "tc26_clean.txt"), "r", encoding="utf-8") as f:
    ttc = f.read()
search_sections(ttc, ["Dimensi robot maksimum", "Drop zone", "SISTEM PERLOMBAAN", "Penilaian", "Waktu", "Babak", "Rintangan", "Pelanggaran"])
