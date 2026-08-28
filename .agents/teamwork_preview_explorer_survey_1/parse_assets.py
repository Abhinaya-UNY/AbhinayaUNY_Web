import os
import lzma
import json
import datetime
from PIL import Image

def analyze_all():
    ig_dir = 'public/images/instagram_feed'
    members_dir = 'public/images/members'
    tournaments_dir = 'public/images/tournaments'
    
    print("=== Analyzing Instagram Feed ===")
    xz_files = [f for f in os.listdir(ig_dir) if f.endswith('.json.xz')]
    ig_posts = {}
    
    for xz in xz_files:
        path = os.path.join(ig_dir, xz)
        try:
            with lzma.open(path, 'rt', encoding='utf-8') as f:
                data = json.load(f)
                node = data.get('node', {})
                shortcode = node.get('shortcode', '')
                timestamp = node.get('taken_at_timestamp', 0)
                dt = datetime.datetime.fromtimestamp(timestamp, tz=datetime.timezone.utc)
                caption = ''
                edges = node.get('edge_media_to_caption', {}).get('edges', [])
                if edges:
                    caption = edges[0].get('node', {}).get('text', '')
                
                # Check tagged users
                tagged = []
                edges_tagged = node.get('edge_media_to_tagged_user', {}).get('edges', [])
                for edge in edges_tagged:
                    u = edge.get('node', {}).get('user', {})
                    tagged.append(u.get('username', ''))
                
                # Check sidecar children if any
                sidecar = []
                children = node.get('edge_sidecar_to_children', {}).get('edges', [])
                for c in children:
                    cnode = c.get('node', {})
                    sidecar.append({
                        'id': cnode.get('id'),
                        'shortcode': cnode.get('shortcode'),
                        'is_video': cnode.get('is_video')
                    })
                
                ig_posts[shortcode] = {
                    'xz_file': xz,
                    'shortcode': shortcode,
                    'timestamp': timestamp,
                    'datetime': dt.isoformat(),
                    'year': dt.year,
                    'caption': caption,
                    'tagged': tagged,
                    'sidecar_count': len(sidecar)
                }
        except Exception as e:
            print(f"Error reading {xz}: {e}")

    # Map all images in instagram_feed
    ig_images = [f for f in os.listdir(ig_dir) if f.endswith(('.jpg', '.jpeg', '.png'))]
    print(f"Found {len(ig_posts)} parsed metadata posts and {len(ig_images)} image files in instagram_feed.")

    # Match images to posts
    image_post_map = {}
    for img in ig_images:
        # File format can be: 2020-08-16_14-07-28_UTC_1.jpg or CD9ZVzpjcgN_1.jpg etc.
        prefix = img.rsplit('.', 1)[0]
        # check if prefix or part of prefix matches shortcode or timestamp
        matched = False
        for sc, pdata in ig_posts.items():
            base_xz = pdata['xz_file'].replace('.json.xz', '')
            if img.startswith(base_xz) or img.startswith(sc):
                image_post_map[img] = sc
                matched = True
                break
        if not matched:
            image_post_map[img] = None

    print(f"Mapped {sum(1 for v in image_post_map.values() if v is not None)}/{len(ig_images)} instagram images to JSON metadata.")

    # Check members
    member_files = sorted(os.listdir(members_dir))
    print(f"\n=== Analyzing Members Dir ({len(member_files)} files) ===")
    
    # Categorize members by year
    years_count = {}
    for f in member_files:
        if f.startswith('2020_'): years_count['2020'] = years_count.get('2020', 0) + 1
        elif f.startswith('2021_'): years_count['2021'] = years_count.get('2021', 0) + 1
        elif f.startswith('2022_'): years_count['2022'] = years_count.get('2022', 0) + 1
        elif f.startswith('2023_'): years_count['2023'] = years_count.get('2023', 0) + 1
        elif f.startswith('2024_'): years_count['2024'] = years_count.get('2024', 0) + 1
        elif f.startswith('2025_'): years_count['2025'] = years_count.get('2025', 0) + 1
        elif f.startswith('0') or f.startswith('1'): years_count['studio_png'] = years_count.get('studio_png', 0) + 1
        else: years_count['other'] = years_count.get('other', 0) + 1
        
    for k, v in years_count.items():
        print(f"Year / Type: {k} -> {v} files")

if __name__ == '__main__':
    analyze_all()
