import subprocess
import sys

sys.stdout.reconfigure(encoding="utf-8")
res = subprocess.run([sys.executable, "scripts/test_e2e_suite.py"], capture_output=True, encoding="utf-8", errors="replace")

with open(r".agents/teamwork_preview_auditor/e2e_suite_output.txt", "w", encoding="utf-8") as f:
    f.write("=== STDOUT ===\n")
    f.write(res.stdout)
    f.write("\n=== STDERR ===\n")
    f.write(res.stderr)

print(f"Wrote {len(res.stdout)} chars stdout, {len(res.stderr)} chars stderr.")
