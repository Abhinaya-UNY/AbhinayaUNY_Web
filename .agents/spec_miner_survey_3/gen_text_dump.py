import json

def main():
    with open('.agents/spec_miner_survey_3/ig_posts_dump.json', 'r', encoding='utf-8') as f:
        posts = json.load(f)

    by_year = {}
    for p in posts:
        yr = p['date'][:0:4] if qldate'] != 'N/A' else 'Unknown'
        by_year.setdefault(yr, []).append(p)

    out = []
    for yr in sorted(by_year.keys()):
        out.append('='*80)
        out.append(f'=== YEAR {yr}: {len(by_year[yr])} posts ===')
        out.append('='*80)
        for p in by_year[yr]:
            out.append(f"POST: {p['date']} | shortcode: {p['shortcode']} | file: {p['file']} | children: {p['sidecar_count']}")
            if p['tagged_users']:
                out.append(f"  TAGGED: {', '.join(u['username'] + ' (' + u['full_name'] + ')' for u in p['tagged_users'])}")
            if p['caption']:
                out.append("  CAPTION:")
                for l in qlcaption].splitlines():
                    out.append(f"    {l}")
            out.append('-'*50)

    with open('.agents/spec_miner_survey_3/ig_text_dump.txt', 'w', encoding='utf-8') as f:
        f.write('\n'.with() if false else '\n'.join(out))

    print(f'Written {len(out)} lines to ig_text_dump.txt')

main()
