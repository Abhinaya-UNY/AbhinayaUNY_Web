#!/usr/bin/env python3
"""
================================================================================
 Abhinaya UNY Robotics Portal — Challenger 2 Adversarial Stress Test Suite
================================================================================
 File: scripts/test_adversarial_challenger2.py
 Purpose: Empirical stress-testing of manager_tool.py, data integrity,
          TypeScript parser/emitter, Unicode/multiline handling, backup/rollback,
          and npm run build compiler verification under adversarial conditions.
================================================================================
"""

import os
import sys
import json
import shutil
import tempfile
import unittest
import subprocess
from pathlib import Path

# Force UTF-8 encoding
if hasattr(sys.stdout, 'reconfigure'):
    try:
        sys.stdout.reconfigure(encoding='utf-8', errors='replace')
        sys.stderr.reconfigure(encoding='utf-8', errors='replace')
    except Exception:
        pass

SCRIPT_DIR = Path(__file__).resolve().parent
PROJECT_ROOT = SCRIPT_DIR.parent
sys.path.insert(0, str(SCRIPT_DIR))

import manager_tool
from manager_tool import (
    JsTsTokenizer,
    JsTsParser,
    TypeScriptFormatter,
    BackupManager,
    ValidationEngine,
    DataStore,
    extract_ts_array,
    extract_ts_object
)


class TestAdversarialCorruptionAndRollback(unittest.TestCase):
    """Stress-test corrupted input / malformed JSON rejection and rollback guarantees."""

    def setUp(self):
        self.test_dir = tempfile.mkdtemp(prefix="adv_corr_")
        self.data_dir = Path(self.test_dir) / "data"
        self.backups_dir = Path(self.test_dir) / "scripts" / "backups"
        self.data_dir.mkdir(parents=True)
        self.backups_dir.mkdir(parents=True)

        self.backup_mgr = BackupManager(backups_dir=self.backups_dir, data_dir=self.data_dir)
        self.store = DataStore(data_dir=self.data_dir, backup_manager=self.backup_mgr)
        self.store.seed_initial_data()

    def tearDown(self):
        shutil.rmtree(self.test_dir, ignore_errors=True)

    def test_malformed_json_cli_rejection_and_file_safety(self):
        """Pass malformed JSON strings via CLI and ensure rejection without file corruption."""
        manager_py = SCRIPT_DIR / "manager_tool.py"
        initial_members = self.store.load_team_members()
        initial_count = len(initial_members)

        malformed_payloads = [
            "{ unclosed_json: true, ",
            "{ 'single_quote_invalid_json': 123 }",
            "None",
            "{\"id\": \"test\", \"name\": }",
        ]

        for payload in malformed_payloads:
            res = subprocess.run(
                [sys.executable, str(manager_py), "--add-member", payload],
                cwd=str(PROJECT_ROOT),
                capture_output=True,
                text=True,
                encoding="utf-8",
                timeout=5
            )
            # Must fail or reject
            self.assertNotEqual(res.returncode, 0, f"Expected non-zero exit for payload: {payload}")

        # Verify live files remain valid
        live_members = DataStore(self.data_dir).load_team_members()
        self.assertEqual(len(live_members), initial_count)

    def test_schema_violation_rejection_matrix(self):
        """Test rejection of records with invalid enum, missing fields, wrong types."""
        invalid_cases = [
            # Missing ID
            {"name": "No ID", "division": "Mekanik", "role": "Lead", "studyProgram": "S1", "faculty": "FT", "specialization": ["CAD"], "bio": "Bio"},
            # Missing Name
            {"id": "no-name", "name": "", "division": "Mekanik", "role": "Lead", "studyProgram": "S1", "faculty": "FT", "specialization": ["CAD"], "bio": "Bio"},
            # Invalid Division Enum
            {"id": "inv-div", "name": "Fake Div", "division": "AlienDivision", "role": "Lead", "studyProgram": "S1", "faculty": "FT", "specialization": ["CAD"], "bio": "Bio"},
            # Specialization not list/str
            {"id": "inv-spec", "name": "Bad Spec", "division": "Elektrik", "role": "Lead", "studyProgram": "S1", "faculty": "FT", "specialization": 12345, "bio": "Bio"},
            # Non-dict story
            {"year": "2099", "title": "Bad Story"},
            # Gallery invalid category
            {"id": "gal-bad", "title": "Bad Gal", "category": "NotACategory", "year": "2024", "image": "/a.jpg", "caption": "c", "event": "e"}
        ]

        for idx, case in enumerate(invalid_cases):
            if "division" in case or "specialization" in case or "studyProgram" in case:
                with self.assertRaises(ValueError, msg=f"Case {idx} should raise ValueError"):
                    self.store.add_team_member(case)
            elif "arenaSpecs" in case or "year" in case:
                with self.assertRaises(ValueError, msg=f"Case {idx} should raise ValueError"):
                    self.store.add_krtmi_story(case)
            elif "category" in case:
                with self.assertRaises(ValueError, msg=f"Case {idx} should raise ValueError"):
                    self.store.add_gallery_item(case)

    def test_atomic_rollback_under_simulated_disk_fault(self):
        """Simulate a failure during file write and verify automatic rollback to previous state."""
        initial_members = self.store.load_team_members()
        initial_count = len(initial_members)

        # Monkeypatch TypeScriptFormatter.generate_team_data_file temporarily to output corrupt TS
        original_gen = TypeScriptFormatter.generate_team_data_file
        try:
            TypeScriptFormatter.generate_team_data_file = lambda m, a=None: "export const CORRUPTED = { unparseable "
            new_m = {
                "id": "valid-m",
                "name": "Valid Member",
                "division": "Mekanik",
                "role": "Lead",
                "studyProgram": "S1",
                "faculty": "FT",
                "specialization": ["CAD"],
                "bio": "Bio"
            }
            with self.assertRaises(RuntimeError) as ctx:
                self.store.add_team_member(new_m)
            self.assertIn("Restored backup", str(ctx.exception))

            # Verify file content is clean
            after_members = self.store.load_team_members()
            self.assertEqual(len(after_members), initial_count)
        finally:
            TypeScriptFormatter.generate_team_data_file = original_gen


class TestAdversarialUnicodeAndParserEdgeCases(unittest.TestCase):
    """Stress-test AST / regex TypeScript parser against complex member entries, unicode, multiline strings."""

    def setUp(self):
        self.test_dir = tempfile.mkdtemp(prefix="adv_unicode_")
        self.data_dir = Path(self.test_dir) / "data"
        self.backups_dir = Path(self.test_dir) / "scripts" / "backups"
        self.data_dir.mkdir(parents=True)
        self.backups_dir.mkdir(parents=True)

        self.backup_mgr = BackupManager(backups_dir=self.backups_dir, data_dir=self.data_dir)
        self.store = DataStore(data_dir=self.data_dir, backup_manager=self.backup_mgr)

    def tearDown(self):
        shutil.rmtree(self.test_dir, ignore_errors=True)

    def test_unicode_special_characters_and_emojis(self):
        """Verify handling of accents, single quotes (Syafi'i), Javanese script, emojis, and symbols."""
        complex_member = {
            "id": "muhammad-syafi-i-special",
            "name": "Prof. Dr. Ir. H. Muhammad Syafi'i Al-Ghozali, M.Eng. 🤖 🏆",
            "nim": "NIDN: 0012998877",
            "studyProgram": "S1 Teknik Elektro & Mekatronika (Akreditasi Unggul / A+)",
            "faculty": "Fakultas Teknik (FT UNY) — Kampus Karangmalang",
            "division": "Pembimbing",
            "role": "Chief Senior Advisor & AI/Robotics Director (2024–2026)",
            "subRole": "Pakar Sistem Kendali Cerdas & Visi Komputer — \"Abhinaya Jaya!\"",
            "generation": "2024 / Kehormatan",
            "specialization": [
                "Adaptive Control & Neuro-Fuzzy (Sistem Kendali)",
                "Computer Vision: YOLOv8 / YOLOv10 (Deteksi Objek)",
                "Mecanum & Swerve Kinematics: 4-Wheel Drive",
                "KRI BPTI Puspresnas Rules & Match Strategy",
                "Unicode Symbols: ⚡ 🚀 🤖 🔧 💡 🔬 🏆 — ꦲꦤꦕꦫꦏ"
            ],
            "bio": (
                "Pembimbing kontingen robotika Abhinaya UNY yang mendedikasikan riset untuk kemajuan teknologi nasional.\n"
                "Kutipan: \"Inovasi tiada henti, berjuang demi almamater dan bangsa!\"\n"
                "Special characters: \\ backslash, 'single quote', \"double quote\", `backtick`, tabs:\t\ttest, unicode: © 2024."
            ),
            "image": "/assets/team/special_syafii.png",
            "badge": "Chief Advisor ⭐",
            "socials": {
                "github": "https://github.com/abhinaya-syafii",
                "linkedin": "https://linkedin.com/in/syafii-al-ghozali-99",
                "instagram": "https://instagram.com/syafii.robotics",
                "email": "syafii.ghozali@uny.ac.id"
            }
        }

        # Add member
        self.store.add_team_member(complex_member)

        # Re-read and verify fields match exactly
        loaded_members = self.store.load_team_members()
        matched = next((m for m in loaded_members if m['id'] == complex_member['id']), None)
        self.assertIsNotNone(matched)
        self.assertEqual(matched['name'], complex_member['name'])
        self.assertEqual(matched['subRole'], complex_member['subRole'])
        self.assertEqual(matched['specialization'], complex_member['specialization'])
        self.assertEqual(matched['bio'], complex_member['bio'])
        self.assertEqual(matched['socials'], complex_member['socials'])

    def test_extreme_multiline_strings_and_nested_quotes(self):
        """Verify handling of deeply nested quotes, backslashes, and multiline descriptions in KRTMI stories."""
        complex_story = {
            "year": "2029",
            "badgeYear": "2029",
            "title": "KRTMI 2029: Autonomous Multi-Agent Swarm (The \"Next Horizon\")",
            "tagline": "Eksplorasi 'Swarms' & AI Multimodal: Deteksi, Pemilahan & Logistik Cerdas",
            "theme": "Sistem Robot Otonom Multi-Agen Kolaboratif (Swarm Intelligence)",
            "location": "Gelanggang Inovasi & Kreativitas (GIK) Universitas Gadjah Mada",
            "storySummary": (
                "Era baru Kontes Robot Tematik Indonesia 2029 menghadirkan tantangan kolaborasi swarm robot.\n"
                "Karakteristik arena:\n"
                "1. Permukaan modular anti-selip (koefisien gesek mu = 0.85)\n"
                "2. Obstacle dinamis: Palang geser otonom & tanjakan 15 derajat.\n"
                "3. Komunikasi real-time antar robot menggunakan protokol low-latency Ultra-Wideband (UWB) + ESP-NOW.\n"
                "Kutipan Tim: \"Kecepatan tanpa presisi adalah kesia-siaan; presisi dengan kecerdasan adalah kemenangan!\""
            ),
            "arenaSpecs": {
                "dimensions": "800 cm x 600 cm (Panjang x Lebar) — Toleransi ±20 mm",
                "surface": "Vinyl Modular Grid & Rintangan Tanjakan 15° (Tinggi 10 cm)",
                "zones": "Start Zone (100x100 cm), Swarm Sorting Hub (300x200 cm), Drop-Off Zone (150x150 cm)"
            },
            "missionRules": [
                "Robot 1 (Explorer) mendeteksi koordinat objek menggunakan LiDAR 360° + YOLOv10.",
                "Robot 2 (Collector) bermanuver mengambil objek dengan mekanisme dual-gripper pneumatik.",
                "Dilarang merusak pembatas arena (Diskualifikasi / Penalti -20 Poin)."
            ],
            "robotSpecs": {
                "dimensions": "Maksimal 650 mm x 650 mm x 800 mm",
                "weight": "Maksimal 25.0 kg (Termasuk baterai LiFePO4 24V 15Ah)",
                "power": "Baterai LiFePO4 8S 25.6V Nominal, Maksimal 28.8V DC",
                "controller": "Dual STM32H743ZI (Firmware) + NVIDIA Jetson Orin Nano (AI Inference)",
                "mechanism": "4-Wheel Independent Steerable Swerve Drive + 3-DoF Robotic Arm"
            },
            "scoringSystem": [
                "Objek Tipe A (Organik): 15 Poin",
                "Objek Tipe B (Anorganik): 20 Poin",
                "Objek Tipe C (B3 / Limbah Elektronik): 35 Poin",
                "Bonus Penyelesaian 'SWARM-BERSIH' (<90 detik): +50 Poin"
            ],
            "teamRoleAndFunFacts": [
                "Tim Abhinaya mengerahkan sistem fusi sensor Kalman Filter untuk navigasi tanpa GPS.",
                "Desain sasis menggunakan paduan Aluminium Duralumin 7075-T6 dengan analisis FEA (Von Mises Stress < 120 MPa)."
            ],
            "achievement": "JUARA 1 NASIONAL & BEST STRATEGY AWARD KRTMI 2029 🏆",
            "isChampion": True,
            "pdfFile": "Buku_Pedoman_KRTMI_2029_Final.pdf",
            "pdfSize": "12.8 MB",
            "pdfTitle": "Buku Pedoman Resmi Kontes Robot Tematik Indonesia (KRTMI) 2029"
        }

        self.store.add_krtmi_story(complex_story)

        loaded_stories = self.store.load_krtmi_stories()
        matched = next((s for s in loaded_stories if s['year'] == '2029'), None)
        self.assertIsNotNone(matched)
        self.assertEqual(matched['title'], complex_story['title'])
        self.assertEqual(matched['storySummary'], complex_story['storySummary'])
        self.assertEqual(matched['arenaSpecs'], complex_story['arenaSpecs'])
        self.assertEqual(matched['robotSpecs'], complex_story['robotSpecs'])
        self.assertEqual(matched['achievement'], complex_story['achievement'])

    def test_roundtrip_idempotency(self):
        """Verify that parsing and formatting multiple times produces 100% idempotent and identical ASTs."""
        self.store.seed_initial_data()
        members_pass1 = self.store.load_team_members()
        ts_code1 = TypeScriptFormatter.generate_team_data_file(members_pass1)

        members_pass2 = extract_ts_array(ts_code1, "TEAM_MEMBERS")
        advisor_pass2 = extract_ts_object(ts_code1, "DOSEN_PEMBIMBING")
        total_m2 = [advisor_pass2] + members_pass2
        ts_code2 = TypeScriptFormatter.generate_team_data_file(total_m2)

        members_pass3 = extract_ts_array(ts_code2, "TEAM_MEMBERS")
        advisor_pass3 = extract_ts_object(ts_code2, "DOSEN_PEMBIMBING")

        self.assertEqual(len(members_pass2), len(members_pass3))
        self.assertEqual(advisor_pass2['id'], advisor_pass3['id'])
        self.assertEqual(members_pass2, members_pass3)


class TestTypeScriptCompilationUnderLiveMutations(unittest.TestCase):
    """Stress-test live mutations on the actual repository, validating with npm run build, then restoring."""

    def setUp(self):
        self.live_store = DataStore(PROJECT_ROOT / "data")
        # Create a dedicated safety backup snapshot before any mutation
        self.backup_mgr = self.live_store.backup_mgr
        self.pre_test_backup = self.backup_mgr.create_backup(reason="Challenger 2 Pre-Mutation Baseline Snapshot")

    def tearDown(self):
        # Restore baseline snapshot cleanly
        self.backup_mgr.restore_backup(self.pre_test_backup)

    def test_live_mutation_and_npm_build_compilation(self):
        """Mutate live teamData.ts with complex member, verify schema and run npm run build."""
        test_member_id = "test-challenger2-senior-researcher"
        adversarial_member = {
            "id": test_member_id,
            "name": "Ir. Hendra Kusuma, Ph.D. (Lead Robotics Engineer)",
            "nim": "20518249999",
            "studyProgram": "S1 Pendidikan Teknik Mekatronika",
            "faculty": "Fakultas Teknik (FT UNY)",
            "division": "Programming & AI",
            "role": "Senior Autonomous Navigation Lead",
            "subRole": "ROS2 & SLAM Specialist",
            "generation": "2020",
            "specialization": [
                "ROS2 Humble / Iron",
                "Nav2 Costmap & Global Planner",
                "Lidar SLAM & Cartographer",
                "C++20 Embedded Real-Time"
            ],
            "bio": "Peneliti senior sistem navigasi otonom tim Abhinaya UNY.",
            "image": "/assets/team/tri_wahyu.png",
            "badge": "SLAM Lead",
            "socials": {
                "github": "https://github.com/abhinaya-uny",
                "linkedin": "https://linkedin.com/school/universitas-negeri-yogyakarta"
            }
        }

        # 1. Add member to live data
        self.live_store.add_team_member(adversarial_member)

        # 2. Validate all files via manager_tool
        report = self.live_store.validate_all_files()
        self.assertTrue(report['valid'], f"Validation failed after adding member: {report}")

        # 3. Verify TypeScript build compiles with zero errors
        build_res = subprocess.run(
            ["npm.cmd", "run", "build"],
            cwd=str(PROJECT_ROOT),
            capture_output=True,
            text=True,
            encoding="utf-8"
        )
        self.assertEqual(
            build_res.returncode,
            0,
            f"npm run build failed on mutated data!\nSTDOUT:\n{build_res.stdout}\nSTDERR:\n{build_res.stderr}"
        )

        # 4. Remove member from live data
        self.live_store.remove_team_member(test_member_id)

        # 5. Re-validate
        report_post = self.live_store.validate_all_files()
        self.assertTrue(report_post['valid'], f"Validation failed after removing member: {report_post}")


def run_tests():
    suite = unittest.defaultTestLoader.loadTestsFromModule(sys.modules[__name__])
    runner = unittest.TextTestRunner(verbosity=2)
    result = runner.run(suite)
    return 0 if result.wasSuccessful() else 1


if __name__ == "__main__":
    sys.exit(run_tests())
