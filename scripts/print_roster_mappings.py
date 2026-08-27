import json

with open('scripts/full_catalog_with_renaming.json', 'r', encoding='utf-8') as f:
    cat = json.load(f)

for item in cat:
    if item.get('include_in_roster'):
        print(f"[{item['year']}] {item['source_path']} -> {item['target_filename']} (div: {item['division']}, name: {item['member_name']})")
