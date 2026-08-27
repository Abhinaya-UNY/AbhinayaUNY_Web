import re

with open('data/teamData.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Find all id: '...' in teamData.ts
ids = re.findall(r"id:\s*['\"]([^'\"]+)['\"]", content)
names = re.findall(r"name:\s*['\"]([^'\"]+)['\"]", content)

print(f"Total IDs found in teamData.ts: {len(ids)}")
for i, name in zip(ids, names):
    print(f"  ID: {i} -> Name: {name}")
