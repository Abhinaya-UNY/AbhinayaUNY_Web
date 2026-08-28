import json
import os

with open(".agents/teamwork_preview_explorer_survey_1/catalog_raw.json", "r", encoding="utf-8") as f:
    data = json.load(f)

for item in data["instagram_feed"]:
    if item["filename"] in ["2022-09-24_15-15-54_UTC_Ci5OdP-L4vD_3.jpg", "2023-09-08_01-27-05_UTC_Cw6ZCItPRJ-_3.jpg"]:
        print(f"Post {item['shortcode']} ({item['datetime']}):")
        print(f"Caption:\n{item['caption']}\n")
