import subprocess
import sys

sys.stdout.reconfigure(encoding="utf-8")
res = subprocess.run([sys.executable, "scripts/test_e2e_suite.py"], capture_output=True, encoding="utf-8", errors="replace")

print("FAILURES:")
capture = False
for line in res.stderr.splitlines():
    if line.startswith("FAIL:") or line.startswith("ERROR:"):
        print("\n" + "="*40)
        print(line)
        capture = True
    elif capture and line.startswith("----------------------------------------------------------------------"):
        capture = False
    elif capture:
        if "AssertionError" in line or "File " in line:
            print(line)
