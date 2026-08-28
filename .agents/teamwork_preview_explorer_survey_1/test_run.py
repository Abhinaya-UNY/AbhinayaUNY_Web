import json
with open(".agents/teamwork_preview_explorer_survey_1/catalog_raw.json", "r", encoding="utf-8") as f:
    cat = json.load(f)
print(f"Success! IG: {len(cat['instagram_feed'])}, Members: {len(cat['members'])}, Tournaments: {len(cat['tournaments'])}")
