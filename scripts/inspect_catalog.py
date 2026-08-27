import json
from collections import defaultdict

with open('scripts/full_catalog_with_renaming.json', 'r', encoding='utf-8') as f:
    cat = json.load(f)

roster_items = [x for x in cat if x.get('include_in_roster')]
non_roster_items = [x for x in cat if not x.get('include_in_roster')]

print(f"Total entries: {len(cat)}")
print(f"Roster items: {len(roster_items)}")
print(f"Non-roster items: {len(non_roster_items)}")

# Check duplicate target filenames among roster items
target_counts = defaultdict(list)
for x in roster_items:
    target_counts[x['target_filename']].append(x['source_path'])

duplicates = {k: v for k, v in target_counts.items() if len(v) > 1}
if duplicates:
    print("\nWARNING: Duplicate target filenames found:")
    for k, v in duplicates.items():
        print(f"  {k}: {v}")
else:
    print("\nAll roster target filenames are UNIQUE!")

# Check division names in target_filename
# Format: {tahun}_{divisi}_{nama_anggota}_{urutan}.ext
print("\nChecking naming convention {tahun}_{divisi}_{nama_anggota}_{urutan}.ext:")
for x in roster_items:
    fn = x['target_filename']
    parts = fn.split('.')
    name_no_ext = parts[0]
    ext = parts[1]
    tokens = name_no_ext.split('_')
    year = tokens[0]
    division = tokens[1]
    seq = tokens[-1]
    name_part = "_".join(tokens[2:-1])
    # Check if division is one of: leader/ketua, manager, program/programmer, elektronik, mekanik, pembimbing/official/desain
    print(f"  {fn} -> year={year}, div={division}, name={name_part}, seq={seq}, ext={ext}")
