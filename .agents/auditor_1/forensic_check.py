import re
import os
import sys
import json
from collections import defaultdict

print("=" * 80)
print("ABHINAYA UNY WEB — INDEPENDENT FORENSIC INTEGRITY AUDIT")
print("=" * 80)

# Check 1: File references in teamData.ts
with open('data/teamData.ts', 'r', encoding='utf-8') as f:
    team_data_content = f.read()

photo_matches = re.findall(r'[\'"](/images/members/[^\'"]+)[\'"]', team_data_content)
unique_photos = sorted(list(set(photo_matches)))
print(f"\n[CHECK 1: teamData.ts Photo Path Integrity]")
print(f"Total photo references in teamData.ts: {len(photo_matches)}")
print(f"Unique photo paths in teamData.ts: {len(unique_photos)}")

missing_files = []
zero_byte_files = []
valid_photos = []

for p in unique_photos:
    local_path = os.path.join('public', p.lstrip('/'))
    if not os.path.exists(local_path):
        missing_files.append((p, local_path))
    else:
        sz = os.path.getsize(local_path)
        if sz == 0:
            zero_byte_files.append((p, sz))
        else:
            valid_photos.append((p, sz))

print(f"  Existing valid photos: {len(valid_photos)} / {len(unique_photos)}")
print(f"  Missing photos: {len(missing_files)}")
print(f"  Zero-byte photos: {len(zero_byte_files)}")

if missing_files:
    print("  ERROR: Missing photo files:")
    for m in missing_files:
        print(f"    - {m}")
if zero_byte_files:
    print("  ERROR: Zero-byte photo files:")
    for z in zero_byte_files:
        print(f"    - {z}")

# Check 2: Non-member graphics exclusion
print(f"\n[CHECK 2: Non-Member Graphics & Grid Slice Exclusion]")
forbidden_keywords = ['wanted', 'kas', 'bendahara', 'grid', 'slice', 'cover', 'banner', 'logo', 'sponsor', 'feed_cover']
flagged_in_roster = []
for p in unique_photos:
    for kw in forbidden_keywords:
        if kw in p.lower():
            flagged_in_roster.append((p, kw))

print(f"  Flagged non-member graphics in roster: {len(flagged_in_roster)}")
if flagged_in_roster:
    for item in flagged_in_roster:
        print(f"    - Flagged: {item[0]} (matched keyword: {item[1]})")

# Check 3: Check data exports in teamData.ts
print(f"\n[CHECK 3: teamData.ts Exported Structures]")
exports = re.findall(r'export const (\w+)', team_data_content)
print(f"  Exported constants: {exports}")


# Check 7: Static Analysis on TeamRosterSection.tsx
with open('components/TeamRosterSection.tsx', 'r', encoding='utf-8') as f:
    roster_tsx_content = f.read()

print(f"\n[CHECK 7: Component & State Management Static Analysis]")
print(f"  TeamRosterSection.tsx length: {len(roster_tsx_content)} bytes, {len(roster_tsx_content.splitlines())} lines")
has_use_state = 'useState' in roster_tsx_content
has_use_effect = 'useEffect' in roster_tsx_content
has_use_memo = 'useMemo' in roster_tsx_content
has_search = 'searchQuery' in roster_tsx_content or 'searchTerm' in roster_tsx_content or 'search' in roster_tsx_content.lower()
has_active_tab = 'activeTab' in roster_tsx_content or 'activeDivision' in roster_tsx_content or 'selectedYear' in roster_tsx_content
has_modal = 'selectedMember' in roster_tsx_content or 'isModalOpen' in roster_tsx_content or 'modal' in roster_tsx_content.lower()
has_crossfade = 'crossfade' in roster_tsx_content.lower() or 'transition' in roster_tsx_content.lower()

print(f"  useState present: {has_use_state}")
print(f"  useEffect present: {has_use_effect}")
print(f"  useMemo present: {has_use_memo}")
print(f"  Search state logic: {has_search}")
print(f"  Tab/division/year selection logic: {has_active_tab}")
print(f"  Modal selection logic: {has_modal}")
print(f"  Crossfade/transition logic: {has_crossfade}")

print("\nAudit check script execution complete.")
