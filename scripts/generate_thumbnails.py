import os
import re
from PIL import Image

BASE_DIR = os.path.abspath(os.path.dirname(__file__) + '/..')
PUBLIC_DIR = os.path.join(BASE_DIR, 'public')
THUMBNAILS_DIR = os.path.join(PUBLIC_DIR, 'thumbnails')

os.makedirs(THUMBNAILS_DIR, exist_ok=True)

with open(os.path.join(BASE_DIR, 'data', 'galleryData.ts'), 'r', encoding='utf-8') as f:
    content = f.read()

# Match each gallery item block
pattern = re.compile(r"image:\s*['\"]([^'\"]+)['\"]")
images = pattern.findall(content)
unique_images = sorted(list(set(images)))

print(f"Total image references: {len(images)}")
print(f"Unique images: {len(unique_images)}")

processed = 0
total_orig_size = 0
total_thumb_size = 0

for img_rel in unique_images:
    # Remove leading slash
    clean_path = img_rel.lstrip('/')
    src_file = os.path.join(PUBLIC_DIR, clean_path)
    
    if not os.path.exists(src_file):
        print(f"[MISSING] {src_file}")
        continue
    
    orig_size = os.path.getsize(src_file)
    total_orig_size += orig_size
    
    # Destination thumbnail path: /public/thumbnails/{clean_path_without_ext}.webp
    rel_no_ext, _ = os.path.splitext(clean_path)
    thumb_rel = f"thumbnails/{rel_no_ext}.webp"
    dest_file = os.path.join(PUBLIC_DIR, thumb_rel)
    
    os.makedirs(os.path.dirname(dest_file), exist_ok=True)
    
    try:
        with Image.open(src_file) as im:
            # Convert RGBA or P to RGB if needed for WebP, though WebP supports RGBA
            if im.mode in ('RGBA', 'LA') or (im.mode == 'P' and 'transparency' in im.info):
                im_rgb = im.convert('RGBA')
            else:
                im_rgb = im.convert('RGB')
            
            # Thumbnail size: max dimension 480px, maintaining aspect ratio
            # For 180px cards in gallery, 480px provides crisp 2x retina display while being super light
            im_rgb.thumbnail((480, 480), Image.Resampling.LANCZOS)
            
            im_rgb.save(dest_file, 'WEBP', quality=80, method=6)
            
        thumb_size = os.path.getsize(dest_file)
        total_thumb_size += thumb_size
        processed += 1
    except Exception as e:
        print(f"Error processing {src_file}: {e}")

print(f"\nDone! Processed {processed} images.")
print(f"Original total size: {total_orig_size / (1024*1024):.2f} MB")
print(f"Thumbnail total size: {total_thumb_size / (1024*1024):.2f} MB")
reduction = (1 - total_thumb_size / max(total_orig_size, 1)) * 100
print(f"Size reduction: {reduction:.1f}%")
