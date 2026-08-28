import os
import re

ROOT_DIR = r"D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web"
TEAM_DATA_FILE = os.path.join(ROOT_DIR, "data", "teamData.ts")

with open(TEAM_DATA_FILE, "r", encoding="utf-8") as fp:
    text = fp.read()

# Let's find all instances of id: '...', name: '...', nim: '...'
pattern = re.compile(r"id:\s*['\"]([^'\"]+)['\"],\s*name:\s*['\"]([^'\"]+)['\"],(?:\s*nickname:\s*['\"][^'\"]*['\"],)?\s*nim:\s*['\"]([^'\"]+)['\"]", re.MULTILINE)
matches = pattern.findall(text)

print(f"Total ID-Name-NIM tuples: {len(matches)}")
all_records = []
for mid, name, nim in matches:
    all_records.append((mid, name, nim))
    print(f"  {mid:<30} | {nim:<25} | {name}")

print("\nChecking Leaders:")
leaders_block = re.search(r"export const LEADER_HISTORY: LeaderHistoryItem\[\] = \[(.*?)\];", text, re.DOTALL)
if leaders_block:
    l_matches = pattern.findall(leaders_block.group(1))
    print(f"Found {len(l_matches)} leaders in LEADER_HISTORY:")
    for mid, name, nim in l_matches:
        print(f"  Leader: {name} ({nim}) [id: {mid}]")

print("\nChecking Managers:")
managers_block = re.search(r"export const MANAGER_HISTORY: ManagerHistoryItem\[\] = \[(.*?)\];", text, re.DOTALL)
if managers_block:
    m_matches = pattern.findall(managers_block.group(1))
    print(f"Found {len(m_matches)} managers in MANAGER_HISTORY:")
    for mid, name, nim in m_matches:
        print(f"  Manager: {name} ({nim}) [id: {mid}]")

print("\nChecking Active Squad (2025):")
active_block = re.search(r"export const ACTIVE_SQUAD_2025: TeamMember\[\] = \[(.*?)\];", text, re.DOTALL)
if active_block:
    a_matches = pattern.findall(active_block.group(1))
    print(f"Found {len(a_matches)} active members in ACTIVE_SQUAD_2025:")
    for mid, name, nim in a_matches:
        print(f"  Active 2025: {name} ({nim}) [id: {mid}]")
