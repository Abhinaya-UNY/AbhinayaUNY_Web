import re

with open(r'data/teamData.ts', 'r', encoding='utf-8') as f:
    text = f.read()

member_blocks = re.findall(r'\{\s*(?:year:\s*\d+,[\s\S]*?)?id:\s*[\'"][^\'"]+[\'"][\s\S]*?\n\s*\},?', text)

seen_names = {}

for b in member_blocks:
    name_m = re.search(r'\bname:\s*[\'"]([^\'"]+)[\'"]', b)
    if not name_m:
        continue
    raw_name = name_m.group(1).strip()
    if not raw_name or raw_name in ['Abhinaya UNY', 'UNY Robotics', 'Restek UNY']:
        continue
    
    # Normalize name
    norm_name = raw_name
    if 'Salsabila Azzahra' in raw_name:
        norm_name = 'Salsabila Azzahra Putri Sophia Dewi Utami'
    elif 'Khairudin' in raw_name:
        norm_name = 'Prof. Ir. Moh. Khairudin, M.T., Ph.D., IPU.'
    elif 'Herlambang' in raw_name:
        norm_name = 'Dr. Herlambang Sigit Pramono, S.T., M.Cs.'
    elif 'Geo Brahma' in raw_name:
        norm_name = 'Geo Brahma Granito Zain'

    nim_m = re.search(r'\bnim:\s*[\'"]([^\'"]+)[\'"]', b)
    prodi_m = re.search(r'\b(?:studyProgram|prodi):\s*[\'"]([^\'"]+)[\'"]', b)
    fac_m = re.search(r'\bfaculty:\s*[\'"]([^\'"]+)[\'"]', b)
    div_m = re.search(r'\bdivision:\s*[\'"]([^\'"]+)[\'"]', b)
    role_m = re.search(r'\brole:\s*[\'"]([^\'"]+)[\'"]', b)
    gen_m = re.search(r'\bgeneration:\s*[\'"]([^\'"]+)[\'"]', b)
    genyr_m = re.search(r'\bgenerationYear:\s*(\d+)', b)
    years_m = re.search(r'\byearsActive:\s*\[([^\]]+)\]', b)

    if norm_name not in seen_names:
        seen_names[norm_name] = {
            'name': norm_name,
            'nim': nim_m.group(1) if nim_m else '',
            'studyProgram': prodi_m.group(1) if prodi_m else '',
            'faculty': fac_m.group(1) if fac_m else '',
            'division': div_m.group(1) if div_m else '',
            'role': role_m.group(1) if role_m else '',
            'generation': gen_m.group(1) if gen_m else '',
            'generationYear': int(genyr_m.group(1)) if genyr_m else None,
            'yearsActive': [int(y.strip()) for y in years_m.group(1).split(',')] if years_m else []
        }

print(f"Total Unique Individuals: {len(seen_names)}")
advisors = [m for m in seen_names.values() if m['nim'].startswith('NIP')]
students = [m for m in seen_names.values() if not m['nim'].startswith('NIP')]

print(f"Advisors: {len(advisors)}")
print(f"Students: {len(students)}")

print("\n--- ADVISORS ---")
for m in advisors:
    print(f"- {m['name']} ({m['nim']}) - {m['studyProgram']} / {m['faculty']}")

print("\n--- STUDENTS ---")
for i, m in enumerate(sorted(students, key=lambda x: x['name']), 1):
    print(f"{i:2d}. {m['name']:40} | NIM: {m['nim']:15} | Div: {m['division']:12} | {m['studyProgram']}")
