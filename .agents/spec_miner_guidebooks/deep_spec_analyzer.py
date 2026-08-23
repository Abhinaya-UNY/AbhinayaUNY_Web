import os
import json
import re

base_dir = r"D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web\.agents\spec_miner_guidebooks"

files = {
    "2020": "extracted_krtmi_2020_precise.txt",
    "2021": "extracted_krtmi_2021_precise.txt",
    "2022": "extracted_krtmi_2022_precise.txt",
    "2023": "extracted_krtmi_2023_precise.txt",
    "2024": "extracted_krtmi_2024_precise.txt",
    "2026": "extracted_tc26_precise.txt",
}

summaries = {}

for yr, fname in files.items():
    p = os.path.join(base_dir, fname)
    with open(p, "r", encoding="utf-8") as f:
        content = f.read()
    
    summaries[yr] = {
        "file": fname,
        "length": len(content),
        "sample": content[:2000]
    }

with open(os.path.join(base_dir, "summary_overview.json"), "w", encoding="utf-8") as f:
    json.dump(summaries, f, indent=2, ensure_ascii=False)

print("Overview written successfully.")
