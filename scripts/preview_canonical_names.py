import json
import re

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
    
    # Clean member name
    name = item['member_name'].lower().strip()
    name = re.sub(r'^(prof\.|dr\.|ir\.|ph\.d\.|m\.t\.|ipu\.|s\.t\.|m\.cs\.)\s*', '', name)
    name = re.sub(r',\s*(ph\.d\.|m\.t\.|ipu\.|s\.t\.|m\.cs\.)', '', name)
    name = re.sub(r'\s*\b(advisor)\b', '', name)
    
    # Specific short names for clean filenames
    if 'salsabila azzahra' in name:
        clean_name = 'salsabila_azzahra'
        if 'psdu' in name or 'putri sophia' in name:
            # Check if psdu form
            clean_name = 'salsabila_azzahra_psdu' if item['source_dir'] != 'members' else 'salsabila_azzahra'
    elif 'moh. khairudin' in name or 'moh khairudin' in name:
        clean_name = 'prof_moh_khairudin'
    elif 'anggoro fajar' in name:
        clean_name = 'anggoro_fajar_dwi_utomo'
    else:
        clean_name = re.sub(r'[^a-z0-9]+', '_', name).strip('_')
    
    # Determine sequence
    seq = item.get('sequence', 1)
    seq_str = f"{seq:02d}"
    
    ext = item['source_path'].split('.')[-1].lower()
    
    return f"{year}_{div}_{clean_name}_{seq_str}.{ext}"

for it in roster_items:
    canon = get_canonical_filename(it)
    print(f"{it['source_path']}  ==>  {canon}  (orig target: {it['target_filename']})")
