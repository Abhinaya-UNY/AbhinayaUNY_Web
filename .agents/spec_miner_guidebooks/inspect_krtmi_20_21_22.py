import os
import re

base_dir = r"D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web\.agents\spec_miner_guidebooks"

def inspect_file(fname, label):
    p = os.path.join(base_dir, fname)
    with open(p, "r", encoding="utf-8") as f:
        txt = f.read()
    print(f"\n=================== {label} ===================")
    for kw in ["Tema", "Slogan", "Latar Belakang", "Konsep Kontes", "Aturan Kontes", "PENILAIAN", "MEMUTUSKAN PEMENANG", "RANCANGAN DAN PENGEMBANGAN", "PELANGGARAN", "DISKUALIFIKASI"]:
        idx = txt.find(kw)
        if idx != -1:
            print(f"\n[{kw}] -> {txt[idx:idx+350].replace(chr(10), ' ')}")

inspect_file("extracted_krtmi_2020_precise.txt", "2020")
inspect_file("extracted_krtmi_2021_precise.txt", "2021")
inspect_file("extracted_krtmi_2022_precise.txt", "2022")
