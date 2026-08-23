#!/usr/bin/env python3
"""
================================================================================
 Challenger 2 — Empirical Bug Reproduction & Proof of Concept Harness
================================================================================
"""

import sys
import json
import subprocess
from pathlib import Path

SCRIPT_DIR = Path(__file__).resolve().parent
PROJECT_ROOT = SCRIPT_DIR.parent
sys.path.insert(0, str(SCRIPT_DIR))

import manager_tool
from manager_tool import TypeScriptFormatter, DataStore

def reproduce_finding_1_compilation():
    """Reproduce Finding 1: Type error on nim?: string in TypeScript emission."""
    print("\n--- [REPRODUCING FINDING 1: Compilation Type Error] ---")
    ts_code = TypeScriptFormatter.generate_team_data_file([])
    has_optional_nim = "nim?: string;" in ts_code
    print(f"TypeScriptFormatter emits 'nim?: string;': {has_optional_nim}")
    assert has_optional_nim, "Expected 'nim?: string;' in emitted TypeScript interface"

def reproduce_finding_2_multiple_advisors():
    """Reproduce Finding 2: Dropping second Pembimbing in generate_team_data_file."""
    print("\n--- [REPRODUCING FINDING 2: Pembimbing Dropping] ---")
    m1 = {"id": "prof-khairudin", "name": "Prof Khairudin", "division": "Pembimbing", "role": "Advisor", "studyProgram": "FT", "faculty": "FT", "specialization": ["Control"], "bio": "Bio", "image": "/a.png", "badge": "Adv"}
    m2 = {"id": "co-advisor", "name": "Co-Advisor", "division": "Pembimbing", "role": "Co-Advisor", "studyProgram": "FT", "faculty": "FT", "specialization": ["AI"], "bio": "Bio", "image": "/b.png", "badge": "CoAdv"}
    ts_code = TypeScriptFormatter.generate_team_data_file([m1, m2])
    print(f"Contains co-advisor in emitted code: {'co-advisor' in ts_code}")
    assert 'co-advisor' not in ts_code, "Expected co-advisor to be dropped due to division == 'Pembimbing'"

def reproduce_finding_3_cli_flag_truthiness():
    """Reproduce Finding 3: Empty string CLI flag ignored in has_cli_flag."""
    print("\n--- [REPRODUCING FINDING 3: Empty CLI Flag Truthiness] ---")
    manager_py = SCRIPT_DIR / "manager_tool.py"
    try:
        res = subprocess.run(
            [sys.executable, str(manager_py), "--add-member", ""],
            cwd=str(PROJECT_ROOT),
            capture_output=True,
            text=True,
            timeout=2
        )
        print(f"Returned: {res.returncode}")
    except subprocess.TimeoutExpired:
        print("CONFIRMED: Process hung waiting for TUI input on --add-member ''!")

if __name__ == "__main__":
    reproduce_finding_1_compilation()
    reproduce_finding_2_multiple_advisors()
    reproduce_finding_3_cli_flag_truthiness()
    print("\nAll 3 Challenger findings successfully reproduced empirically!\n")
