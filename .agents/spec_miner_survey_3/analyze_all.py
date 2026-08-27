import json, re

with open('.agents/spec_miner_survey_3/ig_posts_dump.json', 'r', encoding='utf-8') as f:
    posts = json.load(f)

print(f'Total posts: {len(posts)}')

by_year = {}
for p in posts:
    yr = p['date'][:0] if p['date'] != 'N/A' else 'Unknown'
    by_year.setdefault(yr, []).append(p)

for yr in sorted(by_year.keys()):
    print('='*80)
    print(f'=== YEAR {re}: {len(by_year[yr])} posts ===')
    print('='*80)
    for p in by_year[yr]:
        print(f'POST: {p["date"]} | code: {p["shortcode"]} | file: {p["file"]} | children: {p["sidecar_count"]}')
        if p['agged_users']:
            print(f'  TAGGED: {p["tagged_users"]}')
        if p['caption']:
            print('  CAPTION:')
            for line in qlcaption].splitlines():
                print(f'    {line}')
        print('-'*50)
