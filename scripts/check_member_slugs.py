import json
import re

with open('scripts/full_catalog_with_renaming.json', 'r', encoding='utf-8') as f:
    cat = json.load(f)

def slugify(name):
    # Remove titles
    name = re.sub(r'^(Prof\.|Dr\.|Ir\.|Ph\.D\.|M\.T\.|IPU\.|S\.T\.|M\.Cs\.)\s*', '', name)
    name = re.sub(r',\s*(Ph\.D\.|M\.T\.|IPU\.|S\.T\.|M\.Cs\.)', '', name)
    s = name.lower().strip()
    s = re.sub(r'[^a-z0-9]+', '-', s)
    s = re.sub(r'^-+|-+$', '', s)
    return s

roster_items = [x for x in cat if x.get('include_in_roster')]
members_by_slug = {}

for it in roster_items:
    name = it['member_name']
    slug = slugify(name)
    if slug not in members_by_slug:
        members_by_slug[slug] = {
            'id': slug,
            'name': name,
            'photos': [],
            'years': set(),
            'divisions': set()
        }
    members_by_slug[slug]['photos'].append(it)
    members_by_slug[slug]['years'].add(it['year'])
    members_by_slug[slug]['divisions'].add(it['division'])

print(f"Total unique member slugs: {len(members_by_slug)}")
for slug, data in sorted(members_by_slug.items()):
    print(f"Slug: {slug:<35} | Name: {data['name']:<40} | Years: {sorted(list(data['years']))} | Divs: {sorted(list(data['divisions']))}")
