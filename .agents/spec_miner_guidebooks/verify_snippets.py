import os
import json
import re

base_dir = r"D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web\.agents\spec_miner_guidebooks"

def search_text(filename, terms):
    p = os.path.join(base_dir, filename)
    with open(p, "r", encoding="utf-8") as f:
        txt = f.read()
    results = {}
    for term in terms:
        matches = [m.start() for m in re.finditer(re.escape(term), txt, re.IGNORECASE)]
        snippets = []
        for m in matches[:3]:
            start = max(0, m - 40)
            end = min(len(txt), m + 160)
            snippets.append(txt[start:end].replace("\n", " "))
        results[term] = snippets
    return results

tc26_checks = search_text("extracted_tc26_precise.txt", ["dimensi", "berat", "baterai", "tegangan", "lapangan", "waktu", "poin", "drop zone", "teeter", "jungkat", "rintangan", "penalti", "diskualifikasi"])
krtmi24_checks = search_text("extracted_krtmi_2024_precise.txt", ["ukuran", "berat", "baterai", "tegangan", "lapangan", "waktu", "pemilah", "pengumpan", "kotak sampah", "organik", "anorganik", "botol", "kaleng"])

with open(os.path.join(base_dir, "verified_snippets.json"), "w", encoding="utf-8") as f:
    json.dump({"tc26": tc26_checks, "krtmi24": krtmi24_checks}, f, indent=2, ensure_ascii=False)

print("Verified snippets saved.")
