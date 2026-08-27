import json

with open('scripts/full_catalog_with_renaming.json', 'r', encoding='utf-8') as f:
    cat = json.load(f)

roster = [x for x in cat if x.get('include_in_roster')]
print(f"Total roster items: {len(roster)}")

members_seen = {}
for item in roster:
    name = item['member_name']
    year = item['year']
    div = item['division']
    fn = item['target_filename']
    src = item['source_path']
    if name not in members_seen:
        members_seen[name] = []
    members_seen[name].append((year, div, fn, src))

print(f"Unique member entities in catalog: {len(members_seen)}")
for name, photos in sorted(members_seen.items()):
    print(f"\nMember: {name} ({len(photos)} photos)")
    for p in photos:
        print(f"   [{p[0]}][{p[1]}] {p[2]} <-- {p[3]}")
