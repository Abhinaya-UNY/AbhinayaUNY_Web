import sys
sys.path.append('scripts')
from test_challenger1_nim_faculty_oracle import EXPECTED_MEMBERS, EXPECTED_ADVISORS

print(f"EXPECTED_MEMBERS count: {len(EXPECTED_MEMBERS)}")
print(f"EXPECTED_ADVISORS count: {len(EXPECTED_ADVISORS)}")

for i, (k, v) in enumerate(sorted(EXPECTED_MEMBERS.items()), 1):
    print(f"{i:2d}. {k:42} | NIM: {v['nim']:15} | {v['prodi']:35} | {v['faculty']}")
