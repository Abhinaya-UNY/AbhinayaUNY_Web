import os
import re
import json

base_dir = r"D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web\.agents\spec_miner_guidebooks"

def extract_section_between(text, start_pat, end_pat):
    m1 = re.search(start_pat, text, re.IGNORECASE)
    if not m1:
        return None
    start_pos = m1.start()
    if end_pat:
        m2 = re.search(end_pat, text[start_pos+500:], re.IGNORECASE)
        if m2:
            end_pos = start_pos + 500 + m2.start()
            return text[start_pos:end_pos]
    return text[start_pos:start_pos+35000]

# 2020
with open(os.path.join(base_dir, "KRI_2020_fulltext.txt"), "r", encoding="utf-8") as f:
    t2020 = f.read()
# Let's find where KRTMI starts in 2020
krtmi_2020 = extract_section_between(t2020, r"BUKU\s+(?:V|VI|VII|7|6|5)?\s*\.?\s*KONTES\s+ROBOT\s+TEMATIK", r"BUKU\s+(?:VI|VII|VIII|8|7)")
if not krtmi_2020:
    # try generic
    krtmi_2020 = extract_section_between(t2020, r"KONTES\s+ROBOT\s+TEMATIK\s+INDONESIA", r"PENUTUP|BUKU\s+\d")
with open(os.path.join(base_dir, "extracted_krtmi_2020.txt"), "w", encoding="utf-8") as f:
    f.write(krtmi_2020 if krtmi_2020 else "NOT_FOUND")

# 2021
with open(os.path.join(base_dir, "KRI_2021_fulltext.txt"), "r", encoding="utf-8") as f:
    t2021 = f.read()
krtmi_2021 = extract_section_between(t2021, r"BUKU\s+(?:V|VI|VII|7|6|5)?\s*\.?\s*KONTES\s+ROBOT\s+TEMATIK", r"BUKU\s+(?:VI|VII|VIII|8|7)")
if not krtmi_2021:
    krtmi_2021 = extract_section_between(t2021, r"KONTES\s+ROBOT\s+TEMATIK\s+INDONESIA", r"BUKU\s+\d")
with open(os.path.join(base_dir, "extracted_krtmi_2021.txt"), "w", encoding="utf-8") as f:
    f.write(krtmi_2021 if krtmi_2021 else "NOT_FOUND")

# 2022
with open(os.path.join(base_dir, "KRI_2022_fulltext.txt"), "r", encoding="utf-8") as f:
    t2022 = f.read()
krtmi_2022 = extract_section_between(t2022, r"BUKU\s+(?:V|VI|VII|7|6|5)?\s*\.?\s*KONTES\s+ROBOT\s+TEMATIK", r"BUKU\s+(?:VI|VII|VIII|8|7)")
if not krtmi_2022:
    krtmi_2022 = extract_section_between(t2022, r"KONTES\s+ROBOT\s+TEMATIK\s+INDONESIA", r"BUKU\s+\d")
with open(os.path.join(base_dir, "extracted_krtmi_2022.txt"), "w", encoding="utf-8") as f:
    f.write(krtmi_2022 if krtmi_2022 else "NOT_FOUND")

print(f"2020 extracted: {len(krtmi_2020 or '')} chars")
print(f"2021 extracted: {len(krtmi_2021 or '')} chars")
print(f"2022 extracted: {len(krtmi_2022 or '')} chars")
