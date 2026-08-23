import os
import sys
import json
import re

if sys.stdout.encoding != 'utf-8':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

base_dir = r"D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web\.agents\spec_miner_guidebooks"

def extract_krtmi_2024_full():
    with open(os.path.join(base_dir, "extracted_krtmi_2024.txt"), "r", encoding="utf-8") as f:
        txt = f.read()
    
    data = {
        "year": "2024",
        "competition": "Kontes Robot Tematik Indonesia (KRTMI) 2024",
        "theme": "ROBOT PEMILAH SAMPAH",
        "host_organizer": "Balai Pengembangan Talenta Indonesia (BPTI), Pusat Prestasi Nasional (Puspresnas), Kemendikbudristek & Universitas Muhammadiyah Surakarta (UMS)",
        "full_text": txt
    }
    return data

def extract_krtmi_2023_full():
    with open(os.path.join(base_dir, "extracted_krtmi_2023.txt"), "r", encoding="utf-8") as f:
        txt = f.read()
    
    data = {
        "year": "2023",
        "competition": "Kontes Robot Tematik Indonesia (KRTMI) 2023",
        "theme": "DIGITAL TWIN (Robo Game - DIGITAL TWIN)",
        "host_organizer": "Balai Pengembangan Talenta Indonesia (BPTI), Puspresnas Kemendikbudristek & Universitas Semarang (USM)",
        "full_text": txt
    }
    return data

def extract_technocorner_2026_full():
    with open(os.path.join(base_dir, "extracted_technocorner_2026.txt"), "r", encoding="utf-8") as f:
        txt = f.read()
    
    data = {
        "year": "2026",
        "competition": "Technocorner 2026 - Transporter Robot Competition",
        "theme": "High-Speed Precision Payload Transfer & Extreme Obstacle Crossing",
        "host_organizer": "Keluarga Mahasiswa Teknik Elektro dan Teknologi Informasi (KMTETI), Departemen Teknik Elektro dan Teknologi Informasi (DTETI), Fakultas Teknik, Universitas Gadjah Mada (FT UGM)",
        "full_text": txt
    }
    return data

d2024 = extract_krtmi_2024_full()
d2023 = extract_krtmi_2023_full()
d2026 = extract_technocorner_2026_full()

out_json = os.path.join(base_dir, "extracted_all_guidebooks.json")
with open(out_json, "w", encoding="utf-8") as f:
    json.dump({"2024": d2024, "2023": d2023, "2026": d2026}, f, indent=2, ensure_ascii=False)

print("Saved extracted_all_guidebooks.json successfully")
