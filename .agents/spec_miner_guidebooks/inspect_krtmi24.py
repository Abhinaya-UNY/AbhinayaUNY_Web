import os
import json
import re

base_dir = r"D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web\.agents\spec_miner_guidebooks"

def read_file(name):
    with open(os.path.join(base_dir, name), "r", encoding="utf-8") as f:
        return f.read()

t2024 = read_file("krtmi_2024_clean.txt")
t2023 = read_file("krtmi_2023_clean.txt")
t2022 = read_file("extracted_krtmi_2022_precise.txt")
t2021 = read_file("extracted_krtmi_2021_precise.txt")
t2020 = read_file("extracted_krtmi_2020_precise.txt")
t2026 = read_file("tc26_clean.txt")

# Let's inspect KRTMI 2024 scoring, dimensions, robot specs, field
print("=== KRTMI 2024 DETAILED EXTRACTION ===")
for heading in ["4.2.1", "4.2.2", "4.2.3", "4.2.4", "4.2.5", "4.2.6", "4.2.7", "4.2.8", "4.2.9", "4.2.10", "4.2.11", "4.2.12", "5."]:
    idx = t2024.find(heading)
    if idx != -1:
        next_idx = min([t2024.find(f"4.2.{int(heading.split('.')[2])+1}") if heading.startswith("4.2.") and heading.split('.')[2].isdigit() and int(heading.split('.')[2]) < 12 else len(t2024)])
        chunk = t2024[idx:idx+1500]
        print(f"\n--- {heading} ---\n{chunk.strip()[:600]}...\n")
