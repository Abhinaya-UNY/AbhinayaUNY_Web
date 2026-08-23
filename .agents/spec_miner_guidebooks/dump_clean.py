import os
import json

base_dir = r"D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web\.agents\spec_miner_guidebooks"

def dump_file(fname, out_name):
    with open(os.path.join(base_dir, fname), "r", encoding="utf-8") as f:
        txt = f.read()
    with open(os.path.join(base_dir, out_name), "w", encoding="utf-8") as out:
        out.write(txt)

dump_file("extracted_krtmi_2024_precise.txt", "krtmi_2024_clean.txt")
dump_file("extracted_tc26_precise.txt", "tc26_clean.txt")
dump_file("extracted_krtmi_2023_precise.txt", "krtmi_2023_clean.txt")

print("Clean files written.")
