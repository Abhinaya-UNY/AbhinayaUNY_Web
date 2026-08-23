import os
import re

base_dir = r"D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web\.agents\spec_miner_guidebooks"

def find_krtmi_section(filename, year):
    p = os.path.join(base_dir, filename)
    with open(p, "r", encoding="utf-8") as f:
        txt = f.read()
    print(f"\n=================== {year} Search in {filename} ===================")
    matches = list(re.finditer(r"(KONTES ROBOT TEMATIK|KRTMI|ROBOT TEMATIK)", txt, re.IGNORECASE))
    print(f"Found {len(matches)} matches")
    for m in matches:
        pos = m.start()
        # check if heading or chapter
        snippet = txt[pos-50:pos+250].replace('\n', ' ')
        print(f"  Pos {pos}: {snippet}")

find_krtmi_section("KRI_2020_fulltext.txt", 2020)
find_krtmi_section("KRI_2021_fulltext.txt", 2021)
find_krtmi_section("KRI_2022_fulltext.txt", 2022)
