import subprocess
import sys

sys.stdout.reconfigure(encoding="utf-8")
res = subprocess.run([sys.executable, "scripts/test_e2e_roster.py"], capture_output=True, encoding="utf-8", errors="replace")

print("STDOUT SUMMARY:")
for line in res.stdout.splitlines():
    if "FAIL" in line or "FAILED" in line:
        print(line)

print("\nSTDERR:")
for line in res.stderr.splitlines():
    if "FAIL:" in line or "AssertionError" in line:
        print(line)
