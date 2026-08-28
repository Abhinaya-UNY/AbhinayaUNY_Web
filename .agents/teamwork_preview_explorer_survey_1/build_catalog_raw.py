import os
import lzma
import json
import datetime
from PIL import Image

def analyze_all_images():
    base_dir = "public/images"
    ig_dir = os.path.join(base_dir, "instagram_feed")
    members_dir = os.path.join(base_dir, "members")
    tournaments_dir = os.path.join(base_dir, "tournaments")

    # Load Instagram metadata
    posts_meta = {}
    xz_files = [f for f in os.listdir(ig_dir) if f.endswith(".json.xz")]
    for xz in xz_files:
        p = os.path.join(ig_dir, xz)
        try:
            with lzma.open(p, "rt", encoding="utf-8") as f:
                d = json.load(f)
                node = d.get("node", {})
                shortcode = node.get("shortcode", "")
                ts = node.get("taken_at_timestamp", 0)
                dt = datetime.datetime.fromtimestamp(ts, tz=datetime.timezone.utc)
                caption = ""
                edges = node.get("edge_media_to_caption", {}).get("edges", [])
                if edges:
                    caption = edges[0].get("node", {}).get("text", "")
                
                tagged = [e.get("node", {}).get("user", {}).get("username", "") 
                          for e in node.get("edge_media_to_tagged_user", {}).get("edges", [])]
                
                sidecars = [c.get("node", {}).get("shortcode", "") 
                            for c in node.get("edge_sidecar_to_children", {}).get("edges", [])]

                posts_meta[shortcode] = {
                    "xz_file": xz,
                    "base_prefix": xz.replace(".json.xz", ""),
                    "shortcode": shortcode,
                    "timestamp": ts,
                    "datetime": dt.strftime("%Y-%m-%d %H:%M:%S UTC"),
                    "year": dt.year,
                    "caption": caption,
                    "tagged": tagged,
                    "sidecars": sidecars
                }
        except Exception as e:
            print(f"Error reading {xz}: {e}")

    print(f"Loaded {len(posts_meta)} Instagram post metadata records.")

    # Inspect Instagram Images
    ig_images = sorted([f for f in os.listdir(ig_dir) if f.endswith((".jpg", ".jpeg", ".png"))])
    ig_catalog = []
    
    for img_name in ig_images:
        img_path = os.path.join(ig_dir, img_name)
        file_size = os.path.getsize(img_path)
        try:
            with Image.open(img_path) as im:
                width, height = im.size
        except Exception:
            width, height = (0, 0)
            
        # Match with post
        matched_post = None
        for sc, pmeta in posts_meta.items():
            if img_name.startswith(pmeta["base_prefix"]) or img_name.startswith(sc):
                matched_post = pmeta
                break
                
        year = matched_post["year"] if matched_post else "Unknown"
        caption = matched_post["caption"] if matched_post else ""
        dt_str = matched_post["datetime"] if matched_post else "Unknown"
        shortcode = matched_post["shortcode"] if matched_post else ""
        tagged = matched_post["tagged"] if matched_post else []

        ig_catalog.append({
            "filename": img_name,
            "path": img_path.replace("\\", "/"),
            "size": file_size,
            "dimensions": f"{width}x{height}",
            "year": year,
            "datetime": dt_str,
            "shortcode": shortcode,
            "caption": caption,
            "tagged": tagged
        })

    print(f"Processed {len(ig_catalog)} Instagram feed images.")

    # Inspect Members Images
    member_files = sorted(os.listdir(members_dir))
    members_catalog = []
    for m_name in member_files:
        m_path = os.path.join(members_dir, m_name)
        file_size = os.path.getsize(m_path)
        try:
            with Image.open(m_path) as im:
                width, height = im.size
        except Exception:
            width, height = (0, 0)

        members_catalog.append({
            "filename": m_name,
            "path": m_path.replace("\\", "/"),
            "size": file_size,
            "dimensions": f"{width}x{height}",
            "ext": os.path.splitext(m_name)[1].lower()
        })

    print(f"Processed {len(members_catalog)} member images.")

    # Tournaments Images
    tournament_files = sorted(os.listdir(tournaments_dir))
    tournaments_catalog = []
    for t_name in tournament_files:
        t_path = os.path.join(tournaments_dir, t_name)
        file_size = os.path.getsize(t_path)
        try:
            with Image.open(t_path) as im:
                width, height = im.size
        except Exception:
            width, height = (0, 0)

        tournaments_catalog.append({
            "filename": t_name,
            "path": t_path.replace("\\", "/"),
            "size": file_size,
            "dimensions": f"{width}x{height}",
            "ext": os.path.splitext(t_name)[1].lower()
        })

    print(f"Processed {len(tournaments_catalog)} tournament images.")

    # Save intermediate JSON
    output_json = {
        "instagram_feed": ig_catalog,
        "members": members_catalog,
        "tournaments": tournaments_catalog
    }
    with open(".agents/teamwork_preview_explorer_survey_1/catalog_raw.json", "w", encoding="utf-8") as f:
        json.dump(output_json, f, indent=2, ensure_ascii=False)
    print("Saved catalog_raw.json successfully.")

if __name__ == "__main__":
    analyze_all_images()
