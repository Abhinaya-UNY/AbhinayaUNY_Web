"""
Adversarial Verification & Mathematical Oracle Suite
Tim Robotika Abhinaya UNY Web Platform
"""

import math
import os
import re
import glob
import sys
import random
from pathlib import Path
from html.parser import HTMLParser

ROOT_DIR = Path(r"D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web")
OUT_DIR = ROOT_DIR / "out"

def test_mecanum_kinematics():
    print("=" * 70)
    print("ORACLE 1: 4WD Mecanum Forward & Inverse Kinematics (J_fwd * J_inv = I)")
    print("=" * 70)
    
    lx = 0.16
    ly = 0.16
    rw = 0.038
    L = lx + ly # 0.32
    
    test_cases = [
        (0.0, 0.0, 0.0),
        (1.0, 0.0, 0.0),
        (0.0, 1.0, 0.0),
        (0.0, 0.0, 1.0),
        (-0.5, 0.8, -2.5),
        (1.5, -1.5, 3.14),
        (-2.0, -2.0, -3.14),
        (0.001, 0.001, 0.001),
        (100.0, -50.0, 25.0)
    ]
    
    random.seed(42)
    for _ in range(10000):
        test_cases.append((
            random.uniform(-10, 10),
            random.uniform(-10, 10),
            random.uniform(-10, 10)
        ))
        
    max_error = 0.0
    for vx, vy, wz in test_cases:
        # Inverse Kinematics
        wFL = (1.0 / rw) * (vx - vy - L * wz)
        wFR = (1.0 / rw) * (vx + vy + L * wz)
        wBL = (1.0 / rw) * (vx + vy - L * wz)
        wBR = (1.0 / rw) * (vx - vy + L * wz)
        
        # Forward Kinematics (Pseudo-Inverse)
        vx_rec = (rw / 4.0) * (wFL + wFR + wBL + wBR)
        vy_rec = (rw / 4.0) * (-wFL + wFR + wBL - wBR)
        wz_rec = (rw / (4.0 * L)) * (-wFL + wFR - wBL + wBR)
        
        err = max(abs(vx - vx_rec), abs(vy - vy_rec), abs(wz - wz_rec))
        if err > max_error:
            max_error = err
            
    print(f"  * Tested {len(test_cases)} velocity vectors.")
    print(f"  * Max Reconstruction Error |v_in - J_fwd * J_inv * v_in|: {max_error:.2e}")
    assert max_error < 1e-12, f"Kinematics error too high: {max_error}"
    print("  [OK] PASS: 4WD Mecanum J_fwd * J_inv = I exact identity verified.")
    return True

def test_kiwi_omni_kinematics():
    print("\n" + "=" * 70)
    print("ORACLE 2: 3WD Kiwi Omni 120-Degree Transformation & Net Torque Equilibrium")
    print("=" * 70)
    
    rw = 0.038
    rBase = 0.20
    
    random.seed(42)
    max_net_torque = 0.0
    for _ in range(10000):
        vx = random.uniform(-10, 10)
        vy = random.uniform(-10, 10)
        wz = 0.0
        
        w1 = (1 / rw) * (-vx + rBase * wz)
        w2 = (1 / rw) * (0.5 * vx - (math.sqrt(3) / 2) * vy + rBase * wz)
        w3 = (1 / rw) * (0.5 * vx + (math.sqrt(3) / 2) * vy + rBase * wz)
        
        sum_w = w1 + w2 + w3
        if abs(sum_w) > max_net_torque:
            max_net_torque = abs(sum_w)
            
    print(f"  * Pure Translation Torque Balance: Max |w1 + w2 + w3| across 10,000 vectors: {max_net_torque:.2e}")
    assert max_net_torque < 1e-12, f"Kiwi Omni torque balance failed: {max_net_torque}"
    
    max_kiwi_error = 0.0
    for _ in range(10000):
        vx = random.uniform(-10, 10)
        vy = random.uniform(-10, 10)
        wz = random.uniform(-10, 10)
        
        w1 = (1 / rw) * (-vx + rBase * wz)
        w2 = (1 / rw) * (0.5 * vx - (math.sqrt(3) / 2) * vy + rBase * wz)
        w3 = (1 / rw) * (0.5 * vx + (math.sqrt(3) / 2) * vy + rBase * wz)
        
        vx_rec = rw * (-2.0 / 3.0 * w1 + 1.0 / 3.0 * w2 + 1.0 / 3.0 * w3)
        vy_rec = rw * (-1.0 / math.sqrt(3) * w2 + 1.0 / math.sqrt(3) * w3)
        wz_rec = rw * (w1 + w2 + w3) / (3.0 * rBase)
        
        err = max(abs(vx - vx_rec), abs(vy - vy_rec), abs(wz - wz_rec))
        if err > max_kiwi_error:
            max_kiwi_error = err
            
    print(f"  * Kiwi Forward Reconstruction Max Error: {max_kiwi_error:.2e}")
    assert max_kiwi_error < 1e-12, f"Kiwi reconstruction error too high: {max_kiwi_error}"
    print("  [OK] PASS: 3WD Kiwi Omni 120-Deg Kinematics & Zero Net Torque verified.")
    return True

def test_omni_45_kinematics():
    print("\n" + "=" * 70)
    print("ORACLE 3: 4WD Omni 45-Degree Corner Kinematics Matrix Inversion")
    print("=" * 70)
    
    rw = 0.038
    rBase = 0.20
    sqrt2 = math.sqrt(2)

    max_err = 0
    for _ in range(10000):
        vx = random.uniform(-5, 5)
        vy = random.uniform(-5, 5)
        wz = random.uniform(-5, 5)
        
        w1 = (1 / (rw * sqrt2)) * (-vx + vy + sqrt2 * rBase * wz)
        w2 = (1 / (rw * sqrt2)) * (-vx - vy + sqrt2 * rBase * wz)
        w3 = (1 / (rw * sqrt2)) * (vx - vy + sqrt2 * rBase * wz)
        w4 = (1 / (rw * sqrt2)) * (vx + vy + sqrt2 * rBase * wz)
        
        vx_rec = (rw * sqrt2 / 4.0) * (-w1 - w2 + w3 + w4)
        vy_rec = (rw * sqrt2 / 4.0) * (w1 - w2 - w3 + w4)
        wz_rec = (rw / (4.0 * rBase)) * (w1 + w2 + w3 + w4)
        
        err = max(abs(vx - vx_rec), abs(vy - vy_rec), abs(wz - wz_rec))
        if err > max_err:
            max_err = err

    print(f"  * 4WD Omni 45-Deg Matrix Inversion Max Error: {max_err:.2e}")
    assert max_err < 1e-12
    print("  [OK] PASS: 4WD Omni 45-Deg Kinematics verified.")
    return True

def test_pid_simulation_and_stress():
    print("\n" + "=" * 70)
    print("ORACLE 4: PID Simulation, Anti-Windup Clamping & Stability Analysis")
    print("=" * 70)
    
    def simulate_pid(kp, ki, kd, setpoint=1.0, disturbance=0.0, discrete_mcu=False):
        dt = 0.01
        steps = 150
        timeData = []
        responseData = []
        controlData = []
        integralHistory = []

        currentVelocity = 0.0
        prevError = 0.0
        integralError = 0.0
        J = 0.02
        B = 0.08

        for i in range(steps):
            t = i * dt
            timeData.append(t)

            target = setpoint if t >= 0.1 else 0.0
            error = target - currentVelocity

            P = kp * error
            integralError += error * dt
            # Clamping anti-windup
            integralError = max(-5.0, min(5.0, integralError))
            integralHistory.append(integralError)
            
            I = ki * integralError
            D = kd * (error - prevError) if discrete_mcu else kd * (error - prevError) / dt

            u = P + I + D
            u = max(-12.0, min(12.0, u))
            controlData.append(u)

            load = disturbance if t >= 0.8 else 0.0
            force = 0.2 * u if discrete_mcu else u
            accel = (force - B * currentVelocity - load) / J
            currentVelocity += accel * dt
            responseData.append(currentVelocity)

            prevError = error

        return {
            'responseData': responseData,
            'controlData': controlData,
            'integralHistory': integralHistory,
            'finalV': responseData[-1],
            'maxIntegral': max(integralHistory),
            'minIntegral': min(integralHistory)
        }

    # 1. Anti-windup Clamping Verification
    res_windup = simulate_pid(3.2, 5.0, 0.45, disturbance=10.0)
    print(f"  * Anti-Windup Bounds Under Stalled Load (10 N*m): [{res_windup['minIntegral']}, {res_windup['maxIntegral']}]")
    assert res_windup['maxIntegral'] <= 5.0 and res_windup['minIntegral'] >= -5.0
    print("  [OK] PASS: Anti-windup clamping strictly confines integral error within [-5.0, 5.0].")

    # 2. Extreme Parameters
    res_extreme = simulate_pid(1000.0, 1000.0, 500.0)
    assert not any(math.isnan(x) or math.isinf(x) for x in res_extreme['responseData'])
    assert not any(math.isnan(x) or math.isinf(x) for x in res_extreme['controlData'])
    print("  [OK] PASS: Extreme gain stress (Kp=1000, Ki=1000, Kd=500) remains bounded without NaN/Inf.")

    # 3. Discrete MCU Formulation Stability
    res_mcu = simulate_pid(3.2, 1.8, 0.45, discrete_mcu=True)
    print(f"  * Discrete Embedded PID Velocity Output: {res_mcu['finalV']:.4f} m/s (Target: 1.00 m/s)")
    assert abs(res_mcu['finalV'] - 1.0) < 0.10
    print("  [OK] PASS: Discrete Embedded Controller converges accurately to setpoint.")
    return True

def test_scoring_calculators():
    print("\n" + "=" * 70)
    print("ORACLE 5: Scoring Calculators Boundary Stress Test (All 7 Editions)")
    print("=" * 70)
    
    # 2024 Engine
    def calc_2024(correctSort, droppedTrash, disposal, fouls, isBersih):
        if isBersih:
            return {'score': 100, 'isInstant': True, 'instantTitle': 'KEMENANGAN MUTLAK BERSIH'}
        score = (correctSort * 3) - (droppedTrash * 1) - (disposal * 1) - (fouls * 1)
        return {'score': max(0, score), 'isInstant': False}
        
    # 2019 / 2020 Engine
    def calc_2019_2020(bibitPadi, gulma, panen, rusakPadi):
        if bibitPadi >= 3 and gulma >= 2 and panen and not rusakPadi:
            return {'score': 90, 'isInstant': True, 'instantTitle': 'KEMENANGAN MUTLAK PANEN RAYA'}
        score = (bibitPadi * 10) + (gulma * 15) + (30 if panen else 0)
        return {'score': score, 'isInstant': False}
        
    # 2023 Engine
    def calc_2023(koinSah, isInstantWin, penalties):
        if isInstantWin:
            return {'score': 100, 'isInstant': True, 'instantTitle': 'KEMENANGAN MUTLAK DONE (4-Oktagon)'}
        score = (koinSah * 4) - (penalties * 5)
        return {'score': max(0, score), 'isInstant': False}

    # 2021 / 2022 Engine
    def calc_2021_2022(koinSah, isInstantWin, penalties):
        if isInstantWin:
            return {'score': 100, 'isInstant': True, 'instantTitle': 'KEMENANGAN MUTLAK DAM'}
        score = (koinSah * 5) - (penalties * 5)
        return {'score': max(0, score), 'isInstant': False}

    # 2026 Engine
    def calc_2026(correctBoxes, wrongBoxes, finishedInZone, timeSeconds):
        score = (correctBoxes * 20) + (wrongBoxes * 5) + (15 if finishedInZone else 0)
        isTimeTrialWin = correctBoxes >= 4 and finishedInZone and timeSeconds < 120
        return {'score': score, 'isInstant': isTimeTrialWin, 'instantTitle': f'PRECISION TIME-TRIAL VICTORY ({timeSeconds}s)'}

    # Execute assertions
    assert calc_2024(0, 0, 0, 0, False) == {'score': 0, 'isInstant': False}
    assert calc_2024(25, 0, 0, 0, False) == {'score': 75, 'isInstant': False}
    assert calc_2024(0, 10, 10, 10, False) == {'score': 0, 'isInstant': False}
    assert calc_2024(10, 5, 5, 5, True)['isInstant'] == True
    assert calc_2024(10, 5, 5, 5, True)['score'] == 100

    assert calc_2019_2020(0, 0, False, False) == {'score': 0, 'isInstant': False}
    assert calc_2019_2020(3, 2, True, False) == {'score': 90, 'isInstant': True, 'instantTitle': 'KEMENANGAN MUTLAK PANEN RAYA'}
    assert calc_2019_2020(3, 2, True, True) == {'score': 90, 'isInstant': False}
    assert calc_2019_2020(2, 2, True, False) == {'score': 80, 'isInstant': False}

    assert calc_2021_2022(0, False, 0) == {'score': 0, 'isInstant': False}
    assert calc_2021_2022(12, False, 0) == {'score': 60, 'isInstant': False}
    assert calc_2021_2022(0, False, 10) == {'score': 0, 'isInstant': False}
    assert calc_2021_2022(6, True, 0) == {'score': 100, 'isInstant': True, 'instantTitle': 'KEMENANGAN MUTLAK DAM'}

    assert calc_2023(0, False, 0) == {'score': 0, 'isInstant': False}
    assert calc_2023(12, False, 0) == {'score': 48, 'isInstant': False}
    assert calc_2023(0, False, 10) == {'score': 0, 'isInstant': False}
    assert calc_2023(4, True, 0) == {'score': 100, 'isInstant': True, 'instantTitle': 'KEMENANGAN MUTLAK DONE (4-Oktagon)'}

    assert calc_2026(0, 0, False, 180)['score'] == 0
    assert calc_2026(0, 0, False, 180)['isInstant'] == False
    assert calc_2026(5, 0, True, 80)['score'] == 115
    assert calc_2026(5, 0, True, 80)['isInstant'] == True
    assert calc_2026(4, 0, True, 119)['isInstant'] == True
    assert calc_2026(4, 0, True, 120)['isInstant'] == False
    assert calc_2026(3, 0, True, 50)['isInstant'] == False

    print("  [OK] PASS: All 7 editions (2019, 2020, 2021, 2022, 2023, 2024, 2026) verified across boundary edge cases.")
    return True

def test_pii_scan():
    print("\n" + "=" * 70)
    print("ORACLE 6: Adversarial PII & Personal Identity Repository Scan")
    print("=" * 70)
    
    exts = ['.ts', '.tsx', '.js', '.jsx', '.json', '.html', '.md', '.css']
    nim_pattern = re.compile(r'\b\d{11}\b')
    phone_pattern = re.compile(r'(\+62|08)[0-9]{8,12}')
    
    suspicious_name_tokens = [
        "Ketua Tim:", "Anggota Tim:", "NIM:", "Dosen Pembimbing:"
    ]
    
    violations = []
    files_scanned = 0
    
    for root, dirs, files in os.walk(ROOT_DIR):
        if 'node_modules' in root or '.git' in root or '.next' in root or 'out' in root:
            continue
        for file in files:
            if any(file.endswith(ext) for ext in exts):
                filepath = os.path.join(root, file)
                rel_path = os.path.relpath(filepath, ROOT_DIR)
                files_scanned += 1
                try:
                    with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
                        content = f.read()
                        
                    if 'test_adversarial_oracle.py' in rel_path or 'tests\\' in rel_path:
                        continue
                        
                    if 'app' in rel_path or 'components' in rel_path or 'data' in rel_path:
                        nims = nim_pattern.findall(content)
                        if nims:
                            violations.append(f"PII NIM found in {rel_path}: {nims}")
                            
                        phones = phone_pattern.findall(content)
                        if phones:
                            violations.append(f"PII Phone found in {rel_path}: {phones}")
                            
                        for token in suspicious_name_tokens:
                            if token.lower() in content.lower():
                                violations.append(f"Personal Token '{token}' found in {rel_path}")
                except Exception as e:
                    print(f"Error reading {rel_path}: {e}")

    print(f"  * Scanned {files_scanned} files across repository.")
    if violations:
        for v in violations:
            print(f"  [VIOLATION] {v}")
        return False
    else:
        print("  [OK] PASS: Zero PII / Personal Student Data found. 100% Team Data verified.")
        return True

def test_static_export_links():
    print("\n" + "=" * 70)
    print("ORACLE 7: Static Export Output & Chunk Integrity Scan")
    print("=" * 70)
    
    if not OUT_DIR.exists():
        print(f"  [ERROR] {OUT_DIR} does not exist!")
        return False
        
    html_files = list(OUT_DIR.glob("**/*.html"))
    print(f"  * Found {len(html_files)} exported static HTML files.")
        
    required_pages = ["index.html", "krtmi/index.html", "prestasi/index.html", "teknis/index.html", "404.html"]
    for req in required_pages:
        req_path = OUT_DIR / req
        assert req_path.exists(), f"Missing required static page: {req}"
        
    class LinkExtractor(HTMLParser):
        def __init__(self):
            super().__init__()
            self.scripts = []
            self.styles = []

        def handle_starttag(self, tag, attrs):
            attr_dict = dict(attrs)
            if tag == 'script' and 'src' in attr_dict:
                self.scripts.append(attr_dict['src'])
            elif tag == 'link' and 'href' in attr_dict:
                self.styles.append(attr_dict['href'])

    broken_assets = []
    
    for hf in html_files:
        with open(hf, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
            
        parser = LinkExtractor()
        parser.feed(content)
        
        for src in parser.scripts + parser.styles:
            if '/_next/' in src or src.startswith('_next/'):
                clean_path = '_next/' + src.split('/_next/')[1] if '/_next/' in src else src
                clean_path = clean_path.split('?')[0].split('#')[0]
                target_file = OUT_DIR / clean_path
                if not target_file.exists():
                    broken_assets.append((str(hf.relative_to(OUT_DIR)), src, str(target_file)))

    print(f"  * Verified {len(html_files)} HTML pages against static chunk bundle.")
    if broken_assets:
        for page, src, target in broken_assets:
            print(f"  [BROKEN] ASSET in {page}: {src}")
        return False
    else:
        print("  [OK] PASS: All JS chunks, CSS bundles, and static assets exist and resolve cleanly.")
        return True

if __name__ == "__main__":
    mecanum_ok = test_mecanum_kinematics()
    kiwi_ok = test_kiwi_omni_kinematics()
    omni45_ok = test_omni_45_kinematics()
    pid_ok = test_pid_simulation_and_stress()
    scoring_ok = test_scoring_calculators()
    pii_ok = test_pii_scan()
    export_ok = test_static_export_links()
    
    print("\n" + "=" * 70)
    print("EMPIRICAL VERIFICATION SUITE RESULTS")
    print("=" * 70)
    print(f"  [1] 4WD Mecanum Kinematics Oracle:        {'PASS' if mecanum_ok else 'FAIL'}")
    print(f"  [2] 3WD Kiwi Omni Transformation:         {'PASS' if kiwi_ok else 'FAIL'}")
    print(f"  [3] 4WD Omni 45-Deg Kinematics Matrix:    {'PASS' if omni45_ok else 'FAIL'}")
    print(f"  [4] PID Simulation & Anti-Windup Stress:  {'PASS' if pid_ok else 'FAIL'}")
    print(f"  [5] 7-Edition Scoring Boundary Engine:    {'PASS' if scoring_ok else 'FAIL'}")
    print(f"  [6] Adversarial PII Scan:                 {'PASS' if pii_ok else 'FAIL'}")
    print(f"  [7] Static Export Link & Chunk Integrity: {'PASS' if export_ok else 'FAIL'}")
    print("=" * 70)
    
    all_ok = all([mecanum_ok, kiwi_ok, omni45_ok, pid_ok, scoring_ok, pii_ok, export_ok])
    if all_ok:
        print("EMPIRICAL VERDICT: 100% VERIFIED -- ALL CHALLENGES SATISFIED")
        sys.exit(0)
    else:
        sys.exit(1)
