import re
import json

with open('data/teamData.ts', 'r', encoding='utf-8') as f:
    content = f.read()

print("=" * 80)
print("HISTORICAL INTEGRITY FORENSIC DEEP-DIVE")
print("=" * 80)

# Check LEADERS_HALL_OF_FAME
print("\n1. LEADERS HALL OF FAME:")
leaders_block = re.search(r'export const LEADERS_HALL_OF_FAME: TeamMember\[\] = \[(.*?)\];', content, re.DOTALL)
if leaders_block:
    # Find names and years
    items = re.findall(r'name:\s*[\'"]([^\'"]+)[\'"].*?leadershipEra:\s*[\'"]([^\'"]+)[\'"].*?generation:\s*(\d+)', leaders_block.group(1), re.DOTALL)
    for name, era, gen in items:
        print(f"   - Gen {gen}: {name} ({era})")

# Check MANAGERS_SHOWCASE
print("\n2. MANAGERS SHOWCASE:")
managers_block = re.search(r'export const MANAGERS_SHOWCASE: TeamMember\[\] = \[(.*?)\];', content, re.DOTALL)
if managers_block:
    items = re.findall(r'name:\s*[\'"]([^\'"]+)[\'"].*?leadershipEra:\s*[\'"]([^\'"]+)[\'"].*?generation:\s*(\d+)', managers_block.group(1), re.DOTALL)
    for name, era, gen in items:
        print(f"   - Gen {gen}: {name} ({era})")

# Check ACTIVE_TECHNICAL_SQUAD
print("\n3. ACTIVE TECHNICAL SQUAD:")
squad_block = re.search(r'export const ACTIVE_TECHNICAL_SQUAD: TeamMember\[\] = \[(.*?)\];', content, re.DOTALL)
if squad_block:
    items = re.findall(r'name:\s*[\'"]([^\'"]+)[\'"].*?division:\s*[\'"]([^\'"]+)[\'"].*?role:\s*[\'"]([^\'"]+)[\'"]', squad_block.group(1), re.DOTALL)
    by_div = {}
    for name, div, role in items:
        by_div.setdefault(div, []).append((name, role))
    for div, members in by_div.items():
        print(f"   Division [{div}] ({len(members)} members):")
        for name, role in members:
            print(f"     - {name}: {role}")

# Check ALUMNI_GENERATIONS
print("\n4. ALUMNI GENERATIONS ARCHIVE:")
alumni_block = re.search(r'export const ALUMNI_GENERATIONS: GenerationArchive\[\] = \[(.*?)\];\s*export const', content, re.DOTALL)
if alumni_block:
    gen_years = re.findall(r'year:\s*(\d+)', alumni_block.group(1))
    print(f"   Archive Generation Years: {sorted(list(set(gen_years)))}")

print("\nDeep-dive script complete.")
