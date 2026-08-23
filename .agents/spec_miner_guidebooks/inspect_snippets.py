import os
import json
import re

base_dir = r"D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web\.agents\spec_miner_guidebooks"

def inspect_krtmi_2024_details():
    with open(os.path.join(base_dir, "extracted_krtmi_2024.txt"), "r", encoding="utf-8") as f:
        txt = f.read()
    
    print("=== KRTMI 2024 DETAILS ===")
    # Search for robot dimensions, weight, power, arena, score, etc.
    patterns = [
        r"Ukuran.*?(?:cm|meter|kg|volt|V)",
        r"Dimensi.*?(?:cm|meter)",
        r"Berat.*?(?:kg|gram)",
        r"Tegangan.*?(?:V|Volt)",
        r"Baterai.*?",
        r"Waktu.*?(?:menit|detik)",
        r"Ukuran lapangan.*?",
        r"Ukuran arena.*?",
        r"Nilai.*?",
        r"Poin.*?",
        r"Sampah.*?"
    ]
    for p in patterns:
        matches = list(re.finditer(p, txt, re.IGNORECASE))
        print(f"\nPattern '{p}': found {len(matches)} matches")
        for m in matches[:4]:
            start = max(0, m.start() - 50)
            end = min(len(txt), m.end() + 200)
            print(f"  [SNIPPET] {txt[start:end].replace('\n', ' ')}")

inspect_krtmi_2024_details()
