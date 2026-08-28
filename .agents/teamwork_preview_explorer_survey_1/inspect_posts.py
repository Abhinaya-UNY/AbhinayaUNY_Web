import json
import os

with open(".agents/teamwork_preview_explorer_survey_1/catalog_raw.json", "r", encoding="utf-8") as f:
    data = json.load(f)

ig_list = data["instagram_feed"]

# Group by shortcode / post
posts = {}
for item in ig_list:
    sc = item["shortcode"]
    posts.setdefault(sc, []).append(item)

print(f"Total Unique Posts in Instagram Feed: {len(posts)}")

# Summarize posts by year
years = {}
for sc, items in posts.items():
    yr = items[0]["year"]
    years.setdefault(yr, []).append((sc, items))

for yr in sorted(years.keys()):
    print(f"\n==================== YEAR {yr} ({len(years[yr])} posts, {sum(len(it[1]) for it in years[yr])} images) ====================")
    for sc, items in years[yr]:
        first = items[0]
        dt = first["datetime"]
        cap = first["caption"].replace("\n", " ")[:120]
        tagged = ", ".join(first["tagged"]) if first["tagged"] else "none"
        print(f"[{dt}] Post: {sc} (Images: {len(items)}) | Tagged: [{tagged}]")
        print(f"   Caption: {cap}...")
        for it in items:
            print(f"     - {it['filename']} ({it['dimensions']}, {it['size']} bytes)")
