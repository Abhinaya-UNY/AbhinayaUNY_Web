import os
import re

base_dir = r"D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web\.agents\spec_miner_guidebooks"

def print_section(title, text):
    print("=" * 80)
    print(f"=== {title} ===")
    print("=" * 80)
    print(text)

# 1. KRTMI 2024
with open(os.path.join(base_dir, "KRTMI_2024_Buku7_fulltext.txt"), "r", encoding="utf-8") as f:
    krtmi_2024_txt = f.read()
print_section("KRTMI 2024 FULL TEXT", krtmi_2024_txt)

# 2. KRI 2023 KRTMI Section
with open(os.path.join(base_dir, "KRI_2023_fulltext.txt"), "r", encoding="utf-8") as f:
    kri_2023_txt = f.read()

krtmi_2023_start = kri_2023_txt.find("BUKU 7. KONTES ROBOT TEMATIK INDONESIA")
if krtmi_2023_start == -1:
    krtmi_2023_start = kri_2023_txt.find("KONTES ROBOT TEMATIK INDONESIA (KRTMI)")
if krtmi_2023_start != -1:
    krtmi_2023_end = kri_2023_txt.find("BUKU 8", krtmi_2023_start)
    print_section("KRTMI 2023 SECTION", kri_2023_txt[krtmi_2023_start:krtmi_2023_end if krtmi_2023_end != -1 else krtmi_2023_start+30000])

# 3. Technocorner 2026 Transporter
with open(os.path.join(base_dir, "Technocorner_2026_Transporter_fulltext.txt"), "r", encoding="utf-8") as f:
    tc_2026_txt = f.read()
print_section("TECHNOCORNER 2026 TRANSPORTER FULL TEXT", tc_2026_txt)
