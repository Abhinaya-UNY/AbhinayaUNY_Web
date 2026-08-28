import json
import os
import sys

sys.stdout.reconfigure(encoding="utf-8")

with open(".agents/teamwork_preview_explorer_survey_1/catalog_raw.json", "r", encoding="utf-8") as f:
    raw_data = json.load(f)

# Let's inspect all member files in public/images/members
member_files = raw_data["members"]
ig_files = raw_data["instagram_feed"]
tournaments_files = raw_data["tournaments"]

print(f"Total IG Files: {len(ig_files)}")
print(f"Total Member Files: {len(member_files)}")
print(f"Total Tournament Files: {len(tournaments_files)}")
