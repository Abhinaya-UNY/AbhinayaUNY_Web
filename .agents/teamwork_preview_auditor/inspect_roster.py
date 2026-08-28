import os
import re

ROOT_DIR = r"D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web"
TEAM_DATA_FILE = os.path.join(ROOT_DIR, "data", "teamData.ts")

with open(TEAM_DATA_FILE, "r", encoding="utf-8") as fp:
    content = fp.read()

# Find all object blocks in teamData.ts that define TeamMember
# We can extract id, name, nim, studyProgram, faculty, division, image
member_pattern = re.compile(r"\{\s*id:\s*['\"]([^'\"]+)['\"].*?name:\s*['\"]([^'\"]+)['\"].*?nim:\s*['\"]([^'\"]+)['\"].*?studyProgram:\s*['\"]([^'\"]+)['\"].*?faculty:\s*['\"]([^'\"]+)['\"].*?image:\s*['\"]([^'\"]+)['\"]", re.DOTALL)

matches = member_pattern.findall(content)
print(f"Found {len(matches)} member blocks:")

unique_members = {}
for mid, name, nim, prodi, fac, img in matches:
    if mid not in unique_members:
        unique_members[mid] = {
            "name": name,
            "nim": nim,
            "prodi": prodi,
            "faculty": fac,
            "image": img
        }

print(f"\nUnique member count: {len(unique_members)}")
for mid, data in sorted(unique_members.items()):
    img_exists = os.path.exists(os.path.join(ROOT_DIR, "public", data["image"].lstrip("/").replace("/", os.sep)))
    print(f"ID: {mid:<25} | NIM: {data['nim']:<28} | Name: {data['name']:<35} | Exists: {img_exists}")
