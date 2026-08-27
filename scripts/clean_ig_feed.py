import json

with open("scripts/instagram_analysis.json", "r", encoding="utf-8") as f:
    posts = json.load(f)

# List of excluded stem IDs (puzzle split grid slices / dark sis slices)
EXCLUDED_STEMS = {
    "2024-09-12_16-26-11_UTC_C_0uDCjzSjL",
    "2024-09-12_16-26-51_UTC_C_0uH9gTkXl",
    "2024-09-12_16-27-12_UTC_C_0uKjOzv1u",
    "2024-09-12_16-27-39_UTC_C_0uN4jT4fF",
    "2024-09-12_16-27-52_UTC_C_0uPbYzsDQ",
    "2024-09-12_16-28-05_UTC_C_0uRA8TA89",
    "2024-09-12_17-49-24_UTC_C_03kmdTpNp",
    "2025-09-27_20-35-49_UTC_DPHor8rEz4v",
    "2025-09-27_20-36-18_UTC_DPHovgbk4NE",
    "2025-09-27_20-36-52_UTC_DPHozsjkzcZ",
    "2025-09-27_20-37-34_UTC_DPHo4wEk6vW",
    "2025-09-27_20-37-55_UTC_DPHo7UHE-ZX",
    "2025-09-27_20-38-49_UTC_DPHpB7eE-bY",
}

filtered_items = []

for p in posts:
    stem = p["base_stem"]
    cap = p["caption"]
    imgs = p["images"]
    
    if stem in EXCLUDED_STEMS:
        continue
        
    if len(imgs) == 0:
        continue
        
    # Determine category and title
    cat = "Momen Tim & Riset"
    title = "Momen Kebersamaan Tim Abhinaya UNY"
    event = "Kontes Robot Indonesia"
    year = "2024"
    
    if "2023" in stem or "2023" in cap:
        year = "2023"
        if "Regional" in cap or "Wilayah" in cap:
            cat = "KRTMI Wilayah 2023"
            title = "Momen Abhinaya di KRTMI Wilayah 2023"
            event = "KRI Wilayah I 2023"
        elif "Nasional" in cap:
            cat = "KRTMI Nasional 2023"
            title = "Momen Abhinaya di KRTMI Nasional 2023"
            event = "KRI Nasional 2023 (USM Semarang)"
        elif "juara 3" in cap.lower():
            cat = "Panggung Prestasi"
            title = "Juara 3 KRTMI Tingkat Wilayah I 2023"
            event = "KRI Wilayah I 2023"
    elif "Introduction our" in cap:
        cat = "Pengenalan Divisi"
        if "programmer" in cap.lower():
            title = f"Pengenalan Divisi Programmer Abhinaya ({year})"
        elif "mechanic" in cap.lower():
            title = f"Pengenalan Divisi Mekanik Abhinaya ({year})"
        elif "electronic" in cap.lower():
            title = f"Pengenalan Divisi Elektronik Abhinaya ({year})"
        elif "manager" in cap.lower():
            title = f"Pengenalan Divisi Manager Abhinaya ({year})"
        elif "mentor" in cap.lower():
            title = f"Pengenalan Dosen Pembimbing Abhinaya ({year})"
        elif "leader" in cap.lower():
            title = f"Pengenalan Ketua Tim (Leader) Abhinaya ({year})"
    elif "Together, we’re stronger" in cap or "No challenge can defeat us" in cap:
        cat = "Team Spirit & Kebersamaan"
        title = f"Dokumentasi Laga & Kebersamaan Tim Abhinaya ({year})"
        
    if "2025" in cap or "2025" in stem:
        year = "2025"
        
    item = {
        "id": f"ig-post-{stem}",
        "title": title,
        "category": cat,
        "year": year,
        "event": event,
        "caption": cap,
        "images": imgs,
        "coverImage": imgs[0],
        "instagramUrl": f"https://www.instagram.com/p/{stem.split('_')[-1]}/" if "_" in stem else "https://www.instagram.com/abhinaya.uny/",
        "timestamp": stem.split("_UTC_")[0].replace("_", " ") if "_UTC_" in stem else "2024-09-12"
    }
    filtered_items.append(item)

ts_content = f"""/**
 * Authentic Instagram Feed & Media Dataset from @abhinaya.uny
 * UKM Rekayasa Teknologi (Restek) Universitas Negeri Yogyakarta
 * Curated exclusively with authentic competition moments, division intros, and trophy celebrations.
 * (Excluded partial split puzzle/grid slices).
 */

export interface InstagramFeedItem {{
  id: string;
  title: string;
  category: string;
  year: string;
  event: string;
  caption: string;
  images: string[];
  coverImage: string;
  instagramUrl: string;
  timestamp: string;
}}

export const INSTAGRAM_FEED_ITEMS: InstagramFeedItem[] = {json.dumps(filtered_items, ensure_ascii=False, indent=2)};

export const INSTAGRAM_FEED_CATEGORIES = [
  'Semua Feed',
  'Pengenalan Divisi',
  'KRTMI Nasional 2023',
  'KRTMI Wilayah 2023',
  'Panggung Prestasi',
  'Team Spirit & Kebersamaan',
] as const;
"""

with open(r"D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web\data\instagramFeedData.ts", "w", encoding="utf-8") as f:
    f.write(ts_content)

print(f"Successfully cleaned data/instagramFeedData.ts! Remaining clean posts: {len(filtered_items)}")
