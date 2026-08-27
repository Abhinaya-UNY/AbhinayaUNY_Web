
import lzma, json, glob, os, datetime

feed_dir = 'public/images/instagram_feed'
xz_files = glob.glob(os.path.join(feed_dir, '*.json.xz'))
print(f'Total json.xz files: {len(xz_files)}')

posts = []
for xz_path in sorted(xz_files):
    try:
        with lzma.open(xz_path, 'rt', encoding='utf-8') as f:
            data = json.load(f)
            node = data.get('node', data)
            shortcode = node.get('shortcode', '')
            timestamp = node.get('taken_at_timestamp', 0)
            date_str = datetime.datetime.fromtimestamp(timestamp).strftime('%Y-%m-%d %H:%M:%S') if timestamp else 'N/A'
            caption_edges = node.get('edge_media_to_caption', {}).get('edges', [])
            caption = caption_edges[0]['node']['text'] if caption_edges else ''
            
            tagged_users = []
            for edge in node.get('edge_media_to_tagged_user', {}).get('edges', []):
                u = edge.get('node', {}).get('user', {})
                tagged_users.append({'username': u.get('username', ''), 'full_name': u.get('full_name', '')})
                
            sidecar_edges = node.get('edge_sidecar_to_children', {}).get('edges', [])
            sidecar_count = len(sidecar_edges)
            
            # also get child image filenames / shortcodes
            child_nodes = []
            for c in sidecar_edges:
                cn = c.get('node', {})
                child_nodes.append({
                    'id': cn.get('id'),
                    'shortcode': cn.get('shortcode'),
                    'display_url': cn.get('display_url'),
                    'tagged': [{'username': tu.get('node',{}).get('user',{}).get('username',''), 'full_name': tu.get('node',{}).get('user',{}).get('full_name','')} for tu in cn.get('edge_media_to_tagged_user',{}).get('edges',[])]
                })
            
            posts.append({
                'file': os.path.basename(xz_path),
                'shortcode': shortcode,
                'timestamp': timestamp,
                'date': date_str,
                'caption': caption,
                'tagged_users': tagged_users,
                'sidecar_count': sidecar_count,
                'children': child_nodes
            })
    except Exception as e:
        print(f'Error reading {xz_path}: {e}')

out_path = '.agents/spec_miner_survey_3/ig_posts_dump.json'
with open(out_path, 'w', encoding='utf-8') as f:
    json.dump(posts, f, indent=2, ensure_ascii=False)

print(f'Dumped {len(posts)} posts to {out_path}')
