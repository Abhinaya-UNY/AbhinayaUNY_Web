import os
import json
import lzma
import hashlib
import datetime
from PIL import Image

def generate_survey_report():
    base_dir = "public/images"
    ig_dir = os.path.join(base_dir, "instagram_feed")
    members_dir = os.path.join(base_dir, "members")
    tournaments_dir = os.path.join(base_dir, "tournaments")

    # Load raw catalog
    with open(".agents/teamwork_preview_explorer_survey_1/catalog_raw.json", "r", encoding="utf-8") as f:
        raw_catalog = json.load(f)

    ig_list = raw_catalog["instagram_feed"]
    members_list = raw_catalog["members"]
    tournaments_list = raw_catalog["tournaments"]

    # Calculate hashes for members
    member_hashes = {}
    for m in members_list:
        p = os.path.join(members_dir, m["filename"])
        with open(p, "rb") as fp:
            h = hashlib.md5(fp.read()).hexdigest()
        m["hash"] = h
        member_hashes.setdefault(h, []).append(m["filename"])

    # Calculate hashes for IG
    ig_hashes = {}
    for ig in ig_list:
        p = os.path.join(ig_dir, ig["filename"])
        with open(p, "rb") as fp:
            h = hashlib.md5(fp.read()).hexdigest()
        ig["hash"] = h
        ig_hashes.setdefault(h, []).append(ig["filename"])

    print("Loaded all files and calculated hashes.")
    return raw_catalog, member_hashes, ig_hashes

if __name__ == "__main__":
    generate_survey_report()
