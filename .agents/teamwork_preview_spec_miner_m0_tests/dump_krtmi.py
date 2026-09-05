import re

with open(r'data/krtmiData.ts', 'r', encoding='utf-8') as f:
    text = f.read()

stories = re.findall(r'\{\s*year:\s*\'(\d+)\'[\s\S]*?title:\s*\'([^\']+)\'[\s\S]*?location:\s*\'([^\']+)\'[\s\S]*?achievement:\s*\'([^\']+)\'', text)

print(f"Total KRTMI Stories: {len(stories)}")
for year, title, loc, ach in stories:
    print(f"Year {year}: {title[:45]:45} | Loc: {loc[:30]:30} | Ach: {ach}")
