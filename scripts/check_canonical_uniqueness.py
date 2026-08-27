import json
import re
from collections import defaultdict

with open('scripts/full_catalog_with_renaming.json', 'r', encoding='utf-8') as f:
    cat = json.load(f)

roster_items = [x for x in cat if x.get('include_in_roster')]

def get_canonical_filename(item):
    year = item['year']
    div = item['division'].lower()
    if div == 'programmer':
        div = 'program'
    elif div == 'ketua':
        div = 'leader'
    
    name = item['member_name'].lower().strip()
    name = re.sub(r'^(prof\.|dr\.|ir\.|ph\.d\.|m\.t\.|ipu\.|s\.t\.|m\.cs\.)\s*', '', name)
    name = re.sub(r',\s*(ph\.d\.|m\.t\.|ipu\.|s\.t\.|m\.cs\.)', '', name)
    name = re.sub(r'\s*\b(advisor)\b', '', name)
    
    if 'salsabila azzahra' in name:
        clean_name = 'salsabila_azzahra'
        # For leader post or specific ig post:
        if 'psdu' in name or 'putri sophia' in name:
            clean_name = 'salsabila_azzahra_psdu' if item['source_dir'] != 'members' else 'salsabila_azzahra'
    elif 'moh. khairudin' in name or 'moh khairudin' in name:
        clean_name = 'prof_moh_khairudin'
    elif 'anggoro fajar' in name:
        clean_name = 'anggoro_fajar_dwi_utomo'
    else:
        clean_name = re.sub(r'[^a-z0-9]+', '_', name).strip('_')
    
    seq = item.get('sequence', 1)
    seq_str = f"{seq:02d}"
    ext = item['source_path'].split('.')[-1].lower()
    
    return f"{year}_{div}_{clean_name}_{seq_str}.{ext}"

names_map = defaultdict(list)
for it in roster_items:
    fn = get_canonical_filename(it)
    names_map[fn].append(it['source_path'])

print(f"Total roster items: {len(roster_items)}")
print(f"Unique canonical filenames: {len(names_map)}")

collisions = {k: v for k, v in names_map.items() if len(v) > 1}
if collisions:
    print("\nCollisions found:")
    for k, v in collisions.items():
        print(f"  {k}: {v}")
else:
    print("\nZERO COLLISIONS! All 97 canonical filenames are strictly unique.")
