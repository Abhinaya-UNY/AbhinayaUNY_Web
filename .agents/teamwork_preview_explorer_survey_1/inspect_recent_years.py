import json

with open(".agents/teamwork_preview_explorer_survey_1/catalog_raw.json", "r", encoding="utf-8") as f:
    data = json.load(f)

ig_list = data["instagram_feed"]

by_sc = {}
for it in ig_list:
    by_sc.setdefault(it["shortcode"], []).append(it)

print("=== 2023 POSTS ===")
for sc, items in by_sc.items():
    if items[0]["year"] == 2023:
        print(f"[{items[0]['datetime']}] {sc} (Images: {len(items)})")
        print(f"  Caption: {items[0]['caption'][:160].replace(chr(10), ' ')}")
        for it in items:
            print(f"    - {it['filename']}")

print("\n=== 2024 POSTS ===")
for sc, items in by_sc.items():
    if items[0]["year"] == 2024:
        print(f"[{items[0]['datetime']}] {sc} (Images: {len(items)})")
        print(f"  Caption: {items[0]['caption'][:160].replace(chr(10), ' ')}")
        for it in items:
            print(f"    - {it['filename']}")

print("\n=== 2025 POSTS ===")
for sc, items in by_sc.items():
    if items[0]["year"] == 2025:
        print(f"[{items[0]['datetime']}] {sc} (Images: {len(items)})")
        print(f"  Caption: {items[0]['caption'][:160].replace(chr(10), ' ')}")
        for it in items:
            print(f"    - {it['filename']}")
