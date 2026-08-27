import glob, os, json

feed_dir = 'public/images/instagram_feed'

with open('.agents/spec_miner_survey_3/ig_posts_dump.json', 'r', encoding='utf-8') as f:
    posts = json.load(f)

member_intro_posts = []
for p in posts:
    cap = p['caption'].lower()
    if any(k in cap for k in ['meet our team', 'introduction', 'leader', 'tim abhinaya', 'introduce member', 'formasi tim', 'alhamdulillah', 'kri', 'krtmi']):
        member_intro_posts.append(p)

print('Total matching posts found:', len(member_intro_posts))

out = []
for p in sorted(member_intro_posts, key=lambda x: x['date']):
    out.append('='*80)
    out.append('DATE: ' + str(p['date']) + ' | SHORTCODE: ' + str(p['shortcode']) + ' | SIDECARS: ' + str(p['sidecar_count']) + ' | FILE: ' + str(p['file']))
    if p['tagged_users']:
        out.append('TAGGED: ' + str(p['tagged_users']))
    out.append('CAPTION:')
    out.append(str(p['caption']))
    
    # find all corresponding jpg files
    prefix = p['file'].replace('.json.xz', '')
    matching_jpgs = sorted(glob.glob(os.path.join(feed_dir, prefix + '*.jpg')))
    out.append('MATCHING IMAGES (' + str(len(matching_jpgs)) + '):')
    for jpg in matching_jpgs:
        out.append('  - ' + os.path.basename(jpg))

with open('.agents/spec_miner_survey_3/member_intro_analysis.txt', 'w', encoding='utf-8') as f:
    f.write('\n'.join(out))

print('Saved analysis to .agents/spec_miner_survey_3/member_intro_analysis.txt')