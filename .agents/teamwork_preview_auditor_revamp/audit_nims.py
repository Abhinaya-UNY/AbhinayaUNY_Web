import re
import sys

with open('data/teamData.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Extract members
member_blocks = re.split(r'\{\s*id:\s*[\'"][^\'"]+[\'"]', content)
print(f"Total blocks split: {len(member_blocks)}")

nims = re.findall(r'nim:\s*[\'"]([^\'"]+)[\'"]', content)
names = re.findall(r'name:\s*[\'"]([^\'"]+)[\'"]', content)
prodis = re.findall(r'studyProgram:\s*[\'"]([^\'"]+)[\'"]', content)
faculties = re.findall(r'faculty:\s*[\'"]([^\'"]+)[\'"]', content)

print(f"Total NIMs extracted: {len(nims)}")
print(f"Unique NIMs: {len(set(nims))}")
print(f"Total Names extracted: {len(names)}")
print(f"Total Study Programs extracted: {len(prodis)}")
print(f"Total Faculties extracted: {len(faculties)}")

# Check for dummy / placeholder patterns
dummy_patterns = ['00000', '12345', 'dummy', 'placeholder', 'none', 'tbd', 'unknown', 'test', 'sample']
suspicious = []
for n in nims:
    if any(p in n.lower() for p in dummy_patterns):
        suspicious.append(n)
print(f"Suspicious NIMs: {suspicious}")

non_11_digit = []
for n in set(nims):
    if not (len(n) == 11 and n.isdigit()):
        non_11_digit.append(n)
print(f"Non-11-digit or non-numeric NIMs: {non_11_digit}")

# Verify known members mentioned in ORIGINAL_REQUEST.md:
# Yuli Dwi Saputri 19501241019, Mustika Wahyu Aprilia 21306141050, Rose Pita Nur Afifah 22518241042,
# Zelfa Nafisah Zalna 23501241001, Tri Wahyu Handoyo 22518241023, Farhan Yuda Mahendra 22518241040
target_verifications = [
    ("Yuli Dwi Saputri", "19501241019"),
    ("Mustika Wahyu Aprilia", "21306141050"),
    ("Rose Pita Nur Afifah", "22518241042"),
    ("Zelfa Nafisah Zalna", "23501241001"),
    ("Tri Wahyu Handoyo", "22518241023"),
    ("Farhan Yuda Mahendra", "22518241040"),
]

print("\n--- Mandatory Reference Cross-Verification ---")
for target_name, target_nim in target_verifications:
    found = False
    for i, name in enumerate(names):
        if target_name.lower() in name.lower():
            # Find closest NIM
            match = re.search(r'name:\s*[\'"][^\'"]*' + re.escape(target_name) + r'[^\'"]*[\'"].*?nim:\s*[\'"]([^\'"]+)[\'"]', content, re.DOTALL)
            if match:
                actual_nim = match.group(1)
                status = "MATCH" if actual_nim == target_nim else f"MISMATCH (found {actual_nim})"
                print(f"[{status}] {target_name}: expected {target_nim}, got {actual_nim}")
                found = True
                break
    if not found:
        print(f"[NOT FOUND] {target_name}")

print("\n--- Unique Faculties in teamData.ts ---")
for fac in sorted(set(faculties)):
    print(f"  - {fac}")

print("\n--- Unique Study Programs in teamData.ts ---")
for sp in sorted(set(prodis)):
    print(f"  - {sp}")
