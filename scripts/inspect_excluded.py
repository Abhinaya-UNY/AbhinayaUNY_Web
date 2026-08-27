import json
from collections import Counter

with open('scripts/full_catalog_with_renaming.json', 'r', encoding='utf-8') as f:
    cat = json.load(f)

excluded = [x for x in cat if not x.get('include_in_roster')]
print(f"Total excluded items: {len(excluded)}")
print("Excluded categories:", Counter(x['category'] for x in excluded))

for ex in excluded[:20]:
    print(f"[{ex['category']}][{ex['year']}] {ex['source_path']} -> {ex['target_filename']} | reason: {ex['evidence']}")
