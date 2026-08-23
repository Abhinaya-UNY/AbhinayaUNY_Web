import os
import re

base_dir = r"D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web\.agents\spec_miner_guidebooks"

def get_specs_for_year(fname, yr):
    with open(os.path.join(base_dir, fname), "r", encoding="utf-8") as f:
        txt = f.read()
    
    print(f"\n=================== ARENA & ROBOT SPECS FOR {yr} ===================")
    # Search for arena section / table
    for term in ["Ukuran", "Dimensi", "Lapangan", "Arena", "Robot", "Tegangan", "Berat"]:
        for m in re.finditer(rf"{term}[\w\s]*[:=]?\s*[\d\.\,\sx\+\-]+(?:cm|mm|m\b|kg|gram|volt|V\b)", txt, re.IGNORECASE):
            s = max(0, m.start() - 20)
            e = min(len(txt), m.end() + 60)
            print(f"  [{yr}] {txt[s:e].replace(chr(10), ' ')}")

get_specs_for_year("krtmi_2024_clean.txt", "2024")
get_specs_for_year("krtmi_2023_clean.txt", "2023")
get_specs_for_year("extracted_krtmi_2022_precise.txt", "2022")
get_specs_for_year("extracted_krtmi_2021_precise.txt", "2021")
get_specs_for_year("extracted_krtmi_2020_precise.txt", "2020")
get_specs_for_year("tc26_clean.txt", "2026")
