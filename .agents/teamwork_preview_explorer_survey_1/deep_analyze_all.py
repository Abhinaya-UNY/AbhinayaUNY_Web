import json
import os
import sys

sys.stdout.reconfigure(encoding="utf-8")

with open(".agents/teamwork_preview_explorer_survey_1/catalog_raw.json", "r", encoding="utf-8") as f:
    data = json.load(f)

ig_list = data["instagram_feed"]
members_list = data["members"]

# Group by year
years = {}
for it in ig_list:
    yr = it["year"]
    years.setdefault(yr, []).append(it)

# Print full breakdown per year
for yr in sorted(years.keys()):
    print(f"\n==========================================")
    print(f"         YEAR {yr} (Total Images: {len(years[yr])})")
    print(f"==========================================")
    
    # group by shortcode
    by_sc = {}
    for it in years[yr]:
        by_sc.setdefault(it["shortcode"], []).append(it)
        
    for sc, items in by_sc.items():
        dt = items[0]["datetime"]
        caption = items[0]["caption"]
        tagged = items[0]["tagged"]
        print(f"\n--- Post {sc} ({dt}) ---")
        print(f"Tagged: {tagged}")
        print(f"Caption:\n{caption.strip()}")
        print("Images:")
        for idx, it in enumerate(items, 1):
            print(f"  [{idx}] {it['filename']} ({it['dimensions']}, {it['size']} B)")
