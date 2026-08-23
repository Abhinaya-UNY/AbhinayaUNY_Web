#!/usr/bin/env python3
"""
================================================================================
 Abhinaya UNY Robotics Portal — Manager Tool Comprehensive Test Suite
================================================================================
 File: scripts/test_manager_tool.py
 Purpose: Comprehensive unit, integration, and CLI test suite for scripts/manager_tool.py:
   - Backup creation, listing, point-in-time restoration, and atomic rollback.
   - JS/TS recursive-descent tokenization, object literal parsing, AST emission.
   - Team Member CRUD, division filtering, and strict schema validation.
   - KRTMI competition stories and guidebook specs CRUD.
   - Gallery media items CRUD and tag/category filtering.
   - CLI flags handling, JSON output formatting, and subprocess execution.
   - 100% standard library Python (unittest).
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

# Force UTF-8 for standard output/error
if hasattr(sys.stdout, 'reconfigure'):
    try:
        sys.stdout.reconfigure(encoding='utf-8', errors='replace')
        sys.stderr.reconfigure(encoding='utf-8', errors='replace')
    except Exception:
        pass

# Add script directory to sys.path
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
    CLIController,
    InteractiveTUI,
    DEFAULT_SEED_MEMBERS,
    DEFAULT_SEED_DIVISIONS,
    extract_ts_array,
    extract_ts_object
)


class TestJsTsParser(unittest.TestCase):
    """Tests for the recursive-descent JavaScript/TypeScript literal parser."""

    def test_tokenize_basic_primitives(self):
        code = "{ name: 'Tri Wahyu', year: 2024, isChampion: true, notes: null, score: 98.5 }"
        tokenizer = JsTsTokenizer(code)
        tokens = tokenizer.tokenize()
        parser = JsTsParser(tokens)
        res = parser.parse_object()

        self.assertEqual(res['name'], 'Tri Wahyu')
        self.assertEqual(res['year'], 2024)
        self.assertEqual(res['isChampion'], True)
        self.assertIsNone(res['notes'])
        self.assertEqual(res['score'], 98.5)

    def test_parse_nested_structures_with_trailing_commas_and_comments(self):
        code = """
        // Top level line comment
        [
          {
            /* Multi-line
               block comment */
            id: 'item-1',
            title: 'Aksi Robot \\'Abhinaya\\'',
            tags: ['AI', 'Vision', 'Mecanum', ],
            meta: {
              width: 1920,
              height: 1080,
              nestedArr: [1, 2, 3, ],
            },
          },
        ]
        """
        tokenizer = JsTsTokenizer(code)
        tokens = tokenizer.tokenize()
        parser = JsTsParser(tokens)
        res = parser.parse_array()

        self.assertEqual(len(res), 1)
        self.assertEqual(res[0]['id'], 'item-1')
        self.assertEqual(res[0]['title'], "Aksi Robot 'Abhinaya'")
        self.assertEqual(res[0]['tags'], ['AI', 'Vision', 'Mecanum'])
        self.assertEqual(res[0]['meta']['width'], 1920)
        self.assertEqual(res[0]['meta']['height'], 1080)
        self.assertEqual(res[0]['meta']['nestedArr'], [1, 2, 3])

    def test_extract_ts_array_and_object(self):
        sample_ts = """
        export interface Sample { id: string; }

        export const SINGLE_ITEM: Sample = {
          id: 'single-1',
          name: 'Advisor',
        };

        export const ITEMS_LIST: Sample[] = [
          { id: '1', name: 'Alpha' },
          { id: '2', name: 'Beta' },
        ];
        """
        single = extract_ts_object(sample_ts, "SINGLE_ITEM")
        self.assertIsNotNone(single)
        self.assertEqual(single['id'], 'single-1')

        items = extract_ts_array(sample_ts, "ITEMS_LIST")
        self.assertIsNotNone(items)
        self.assertEqual(len(items), 2)
        self.assertEqual(items[1]['name'], 'Beta')

    def test_extract_non_existent_constant(self):
        sample_ts = "export const OTHER = [1, 2, 3];"
        self.assertIsNone(extract_ts_array(sample_ts, "NON_EXISTENT"))
        self.assertIsNone(extract_ts_object(sample_ts, "NON_EXISTENT"))


class TestTypeScriptFormatter(unittest.TestCase):
    """Tests for formatted TypeScript code generation."""

    def test_format_primitives_and_escapes(self):
        self.assertEqual(TypeScriptFormatter.format_value(None), "null")
        self.assertEqual(TypeScriptFormatter.format_value(True), "true")
        self.assertEqual(TypeScriptFormatter.format_value(False), "false")
        self.assertEqual(TypeScriptFormatter.format_value(42), "42")
        self.assertEqual(TypeScriptFormatter.format_value("Hello 'World'"), "'Hello \\'World\\''")
        self.assertEqual(TypeScriptFormatter.format_value("Line 1\nLine 2"), "'Line 1\\nLine 2'")

    def test_format_empty_structures(self):
        self.assertEqual(TypeScriptFormatter.format_value([]), "[]")
        self.assertEqual(TypeScriptFormatter.format_value({}), "{}")

    def test_generate_team_data_file_reparseable(self):
        sample_members = [
            {
                "id": "prof-khairudin",
                "name": "Prof. Ir. Moh. Khairudin, M.T., Ph.D.",
                "studyProgram": "Guru Besar",
                "faculty": "FT UNY",
                "division": "Pembimbing",
                "role": "Dosen Pembimbing Utama",
                "specialization": ["Adaptive Control"],
                "bio": "Advisor.",
                "image": "/img.png",
                "badge": "Advisor"
            },
            {
                "id": "member-1",
                "name": "Member One",
                "studyProgram": "S1 Elektro",
                "faculty": "FT UNY",
                "division": "Elektrik",
                "role": "Hardware Engineer",
                "specialization": ["PCB Design"],
                "bio": "Electrical bio.",
                "image": "/img1.png",
                "badge": "Hardware"
            }
        ]
        ts_code = TypeScriptFormatter.generate_team_data_file(sample_members)
        self.assertIn("export const DOSEN_PEMBIMBING: TeamMember", ts_code)
        self.assertIn("export const TEAM_MEMBERS: TeamMember[]", ts_code)
        self.assertIn("export const ALL_ROSTER_MEMBERS: TeamMember[]", ts_code)

        parsed_members = extract_ts_array(ts_code, "TEAM_MEMBERS")
        parsed_advisor = extract_ts_object(ts_code, "DOSEN_PEMBIMBING")
        self.assertIsNotNone(parsed_members)
        self.assertIsNotNone(parsed_advisor)
        self.assertEqual(len(parsed_members), 1)
        self.assertEqual(parsed_advisor['id'], 'prof-khairudin')

    def test_multiple_advisors_preservation_and_type_matching(self):
        """Ensures multiple advisors are preserved, primary advisor is assigned, and type matches PROJECT.md."""
        m1 = {
            "id": "prof-khairudin",
            "name": "Prof. Ir. Moh. Khairudin, M.T., Ph.D.",
            "nim": "NIDN: 0012047901",
            "studyProgram": "Guru Besar",
            "faculty": "FT UNY",
            "division": "Pembimbing",
            "role": "Dosen Pembimbing Utama",
            "specialization": ["Adaptive Control"],
            "bio": "Advisor.",
            "image": "/img.png",
            "badge": "Advisor"
        }
        m2 = {
            "id": "co-advisor-dr-ir",
            "name": "Dr. Ir. Co-Advisor",
            "nim": "NIDN: 0099887766",
            "studyProgram": "Teknik Mekatronika",
            "faculty": "FT UNY",
            "division": "Pembimbing",
            "role": "Dosen Pembimbing Pendamping",
            "specialization": ["AI Vision"],
            "bio": "Co Advisor.",
            "image": "/img2.png",
            "badge": "Co-Advisor"
        }
        m3 = {
            "id": "student-lead",
            "name": "Student Lead",
            "nim": "22518241099",
            "studyProgram": "Pendidikan Teknik Mekatronika",
            "faculty": "FT UNY",
            "division": "Programming & AI",
            "role": "Ketua",
            "specialization": ["Navigation"],
            "bio": "Student bio.",
            "image": "/img3.png",
            "badge": "Lead"
        }

        ts_code = TypeScriptFormatter.generate_team_data_file([m1, m2, m3])
        self.assertIn("nim: string;", ts_code)
        self.assertIn("export const DOSEN_PEMBIMBING: TeamMember", ts_code)
        self.assertIn("export const TEAM_MEMBERS: TeamMember[]", ts_code)

        parsed_members = extract_ts_array(ts_code, "TEAM_MEMBERS")
        parsed_advisor = extract_ts_object(ts_code, "DOSEN_PEMBIMBING")
        self.assertEqual(parsed_advisor['id'], 'prof-khairudin')
        self.assertEqual(len(parsed_members), 2)
        self.assertTrue(any(m['id'] == 'co-advisor-dr-ir' for m in parsed_members))
        self.assertTrue(any(m['id'] == 'student-lead' for m in parsed_members))

    def test_generate_krtmi_data_file_reparseable(self):
        sample_stories = [
            {
                "year": "2024",
                "badgeYear": "2024",
                "title": "KRTMI 2024",
                "theme": "Sorting",
                "location": "UMS",
                "storySummary": "Summary",
                "arenaSpecs": {"dimensions": "6x4m", "surface": "Mat", "zones": "All"},
                "missionRules": ["Rule 1"],
                "robotSpecs": {"dimensions": "60x60cm", "weight": "20kg", "power": "24V", "controller": "ESP32", "mechanism": "Mecanum"},
                "scoringSystem": ["100 pts"],
                "teamRoleAndFunFacts": ["Fun 1"],
                "achievement": "Juara 2 Nasional",
                "pdfFile": "guide.pdf",
                "pdfSize": "1MB",
                "pdfTitle": "Guide 2024"
            }
        ]
        ts_code = TypeScriptFormatter.generate_krtmi_data_file(sample_stories)
        self.assertIn("export const KRTMI_STORIES: KrtmiStory[]", ts_code)
        self.assertIn("export const TEAM_DIVISIONS", ts_code)

        parsed_stories = extract_ts_array(ts_code, "KRTMI_STORIES")
        self.assertEqual(len(parsed_stories), 1)
        self.assertEqual(parsed_stories[0]['year'], '2024')

    def test_generate_gallery_data_file_reparseable(self):
        sample_gallery = [
            {
                "id": "gal-1",
                "title": "Action Shot",
                "category": "Arena Lomba",
                "year": "2024",
                "image": "/gal1.jpg",
                "caption": "Action caption",
                "event": "KRI 2024"
            }
        ]
        ts_code = TypeScriptFormatter.generate_gallery_data_file(sample_gallery)
        self.assertIn("export const GALLERY_ITEMS: GalleryItem[]", ts_code)
        self.assertIn("export const GALLERY_CATEGORIES", ts_code)

        parsed_items = extract_ts_array(ts_code, "GALLERY_ITEMS")
        self.assertEqual(len(parsed_items), 1)
        self.assertEqual(parsed_items[0]['id'], 'gal-1')


class TestValidationEngine(unittest.TestCase):
    """Tests for schema validation constraints."""

    def test_valid_team_member(self):
        member = {
            "id": "member-valid",
            "name": "Budi Santoso",
            "nim": "2150123456",
            "studyProgram": "S1 Pendidikan Teknik Elektronika",
            "faculty": "FT UNY",
            "division": "Elektrik",
            "role": "Power Electronics Lead",
            "specialization": ["Power Distribution", "Battery Management"],
            "bio": "Spesialis kelistrikan robotika.",
            "image": "/assets/team/budi.png",
            "badge": "Power Lead"
        }
        ok, errors = ValidationEngine.validate_team_member(member)
        self.assertTrue(ok)
        self.assertEqual(len(errors), 0)

    def test_invalid_team_member_division(self):
        member = {
            "id": "member-invalid",
            "name": "Budi Santoso",
            "studyProgram": "S1 Teknik",
            "faculty": "FT UNY",
            "division": "DivisiKhayalan",  # Invalid
            "role": "Lead",
            "specialization": ["Testing"],
            "bio": "Bio"
        }
        ok, errors = ValidationEngine.validate_team_member(member)
        self.assertFalse(ok)
        self.assertTrue(any("Invalid division" in e for e in errors))

    def test_invalid_gallery_category(self):
        item = {
            "id": "photo-1",
            "title": "Foto Lomba",
            "category": "KategoriInvalid",
            "year": "2024",
            "image": "/img.jpg",
            "caption": "Caption",
            "event": "Event"
        }
        ok, errors = ValidationEngine.validate_gallery_item(item)
        self.assertFalse(ok)
        self.assertTrue(any("Invalid category" in e for e in errors))

    def test_invalid_krtmi_story_missing_specs(self):
        story = {
            "year": "2025",
            "badgeYear": "2025",
            "title": "Incomplete",
            "theme": "Theme",
            "location": "Loc",
            "storySummary": "Summary",
            "arenaSpecs": "Not a dict", # Invalid
            "robotSpecs": {},
            "pdfFile": "file.pdf"
        }
        ok, errors = ValidationEngine.validate_krtmi_story(story)
        self.assertFalse(ok)
        self.assertTrue(any("arenaSpecs" in e for e in errors))


class TestBackupAndDataStoreIsolated(unittest.TestCase):
    """Tests CRUD operations and rollback mechanisms within isolated temp sandbox."""

    def setUp(self):
        self.test_dir = tempfile.mkdtemp(prefix="abhinaya_test_")
        self.data_dir = Path(self.test_dir) / "data"
        self.backups_dir = Path(self.test_dir) / "scripts" / "backups"
        self.data_dir.mkdir(parents=True)
        self.backups_dir.mkdir(parents=True)

        self.backup_mgr = BackupManager(backups_dir=self.backups_dir, data_dir=self.data_dir)
        self.store = DataStore(data_dir=self.data_dir, backup_manager=self.backup_mgr)

    def tearDown(self):
        shutil.rmtree(self.test_dir, ignore_errors=True)

    def test_seed_and_load_team_members(self):
        self.store.seed_initial_data()
        members = self.store.load_team_members()
        self.assertGreaterEqual(len(members), 14)

        backups = self.backup_mgr.list_backups()
        self.assertGreaterEqual(len(backups), 1)

    def test_add_edit_and_remove_team_member(self):
        self.store.seed_initial_data()

        new_member = {
            "id": "new-programmer",
            "name": "Ahmad Fauzi",
            "nim": "23518240001",
            "studyProgram": "S1 Pendidikan Teknik Mekatronika",
            "faculty": "Fakultas Teknik (FT UNY)",
            "division": "Programming & AI",
            "role": "Computer Vision Junior Engineer",
            "specialization": ["PyTorch", "ROS2 Navigation"],
            "bio": "Riset navigasi otonom berbasis ROS2.",
            "image": "/assets/team/fauzi.png",
            "badge": "Vision Junior"
        }

        # Add member
        ok = self.store.add_team_member(new_member)
        self.assertTrue(ok)
        loaded = self.store.load_team_members()
        self.assertTrue(any(m['id'] == 'new-programmer' for m in loaded))

        # Edit member
        new_member['role'] = "Computer Vision Senior Engineer"
        self.store.add_team_member(new_member)
        updated = next(m for m in self.store.load_team_members() if m['id'] == 'new-programmer')
        self.assertEqual(updated['role'], "Computer Vision Senior Engineer")

        # Remove member
        self.store.remove_team_member('new-programmer')
        after_del = self.store.load_team_members()
        self.assertFalse(any(m['id'] == 'new-programmer' for m in after_del))

    def test_remove_non_existent_member_raises(self):
        self.store.seed_initial_data()
        with self.assertRaises(ValueError):
            self.store.remove_team_member("non-existent-id")

    def test_add_and_remove_krtmi_story(self):
        dummy_story = {
            "year": "2027",
            "badgeYear": "2027",
            "title": "KRTMI 2027 — Next Gen Autonomous Sorter",
            "tagline": "Inovasi Baru Robotika UNY",
            "theme": "Smart Sorting Ecosystem",
            "location": "UGM Yogyakarta",
            "storySummary": "Tantangan baru pemilahan multi-material otonom.",
            "arenaSpecs": {
                "dimensions": "600 cm x 500 cm",
                "surface": "Vinyl Modular",
                "zones": "Start, Sorting, Basket"
            },
            "missionRules": ["Rule 1", "Rule 2"],
            "robotSpecs": {
                "dimensions": "50x50x50 cm",
                "weight": "15 kg",
                "power": "24V LiFePO4",
                "controller": "ESP32-S3 + STM32",
                "mechanism": "4-Wheel Mecanum"
            },
            "scoringSystem": ["Full Mission: 100 Pts"],
            "teamRoleAndFunFacts": ["Fun fact 1"],
            "achievement": "FINALIS KRTMI 2027",
            "isChampion": False,
            "pdfFile": "Panduan_2027.pdf",
            "pdfSize": "4.5 MB",
            "pdfTitle": "Guidebook KRTMI 2027"
        }

        self.store.add_krtmi_story(dummy_story)
        stories = self.store.load_krtmi_stories()
        self.assertEqual(len(stories), 1)
        self.assertEqual(stories[0]['year'], '2027')

        # Remove
        self.store.remove_krtmi_story('2027')
        self.assertEqual(len(self.store.load_krtmi_stories()), 0)

    def test_remove_non_existent_krtmi_story_raises(self):
        with self.assertRaises(ValueError):
            self.store.remove_krtmi_story("1999")

    def test_add_and_remove_gallery_item(self):
        item = {
            "id": "gallery-test-1",
            "title": "Uji Coba Laga Robot",
            "category": "Arena Lomba",
            "year": "2024",
            "image": "/gallery/test.jpg",
            "caption": "Pengujian sensor ToF di lapangan",
            "event": "Uji Coba Internal Lab"
        }
        self.store.add_gallery_item(item)
        items = self.store.load_gallery_items()
        self.assertEqual(len(items), 1)
        self.assertEqual(items[0]['id'], 'gallery-test-1')

        self.store.remove_gallery_item('gallery-test-1')
        self.assertEqual(len(self.store.load_gallery_items()), 0)

    def test_remove_non_existent_gallery_item_raises(self):
        with self.assertRaises(ValueError):
            self.store.remove_gallery_item("non-existent-gallery")

    def test_rollback_on_corrupt_write(self):
        self.store.seed_initial_data()
        initial_members = self.store.load_team_members()
        initial_count = len(initial_members)

        invalid_member = {
            "id": "invalid-member",
            "name": "", # Invalid empty
            "division": "Mekanik"
        }

        with self.assertRaises(ValueError):
            self.store.add_team_member(invalid_member)

        # Verify data was NOT corrupted and matches initial state
        current_members = self.store.load_team_members()
        self.assertEqual(len(current_members), initial_count)

    def test_restore_backup_snapshot(self):
        self.store.seed_initial_data()
        snap = self.backup_mgr.create_backup(reason="Snapshot Before Mutation")

        test_item = {
            "id": "temp-gallery-item",
            "title": "Temp Photo",
            "category": "Riset & Lab",
            "year": "2025",
            "image": "/gallery/temp.jpg",
            "caption": "Testing snapshot restore",
            "event": "Lab Test"
        }
        self.store.add_gallery_item(test_item)
        self.assertEqual(len(self.store.load_gallery_items()), 1)

        ok, msg = self.backup_mgr.restore_backup(snap.name)
        self.assertTrue(ok)
        self.assertEqual(len(self.store.load_gallery_items()), 0)

    def test_restore_non_existent_backup(self):
        ok, msg = self.backup_mgr.restore_backup("backup_does_not_exist_9999")
        self.assertFalse(ok)
        self.assertIn("not found", msg)


class TestCLIFlagsAndLiveValidation(unittest.TestCase):
    """Tests CLI flag operations on project files and validates live project data."""

    def test_live_data_files_validation(self):
        """Verifies that actual project data files pass 100% schema integrity check."""
        live_store = DataStore(PROJECT_ROOT / "data")
        report = live_store.validate_all_files()
        self.assertTrue(report['valid'], f"Live data validation failed: {report}")
        self.assertEqual(report['details']['teamData']['status'], "PASS")
        self.assertEqual(report['details']['krtmiData']['status'], "PASS")
        self.assertEqual(report['details']['galleryData']['status'], "PASS")

    def test_cli_subprocess_commands(self):
        """Executes CLI commands via subprocess to verify standard invocation."""
        manager_py = SCRIPT_DIR / "manager_tool.py"

        # 1. Test --validate
        res_val = subprocess.run(
            [sys.executable, str(manager_py), "--validate"],
            capture_output=True,
            text=True,
            encoding="utf-8"
        )
        self.assertEqual(res_val.returncode, 0)
        self.assertIn('"valid": true', res_val.stdout)

        # 2. Test --list-team --json
        res_team = subprocess.run(
            [sys.executable, str(manager_py), "--list-team", "--json"],
            capture_output=True,
            text=True,
            encoding="utf-8"
        )
        self.assertEqual(res_team.returncode, 0)
        members = json.loads(res_team.stdout)
        self.assertGreaterEqual(len(members), 14)

        # 3. Test --list-team with division filter
        res_mekanik = subprocess.run(
            [sys.executable, str(manager_py), "--list-team", "--division", "Mekanik", "--json"],
            capture_output=True,
            text=True,
            encoding="utf-8"
        )
        self.assertEqual(res_mekanik.returncode, 0)
        mek_members = json.loads(res_mekanik.stdout)
        self.assertTrue(all(m['division'] == 'Mekanik' for m in mek_members))

        # 4. Test --search-team
        res_search = subprocess.run(
            [sys.executable, str(manager_py), "--search-team", "Tri Wahyu"],
            capture_output=True,
            text=True,
            encoding="utf-8"
        )
        self.assertEqual(res_search.returncode, 0)
        found = json.loads(res_search.stdout)
        self.assertGreaterEqual(len(found), 1)
        self.assertEqual(found[0]['id'], 'tri-wahyu-handoyo')

        # 5. Test --list-krtmi --json
        res_krtmi = subprocess.run(
            [sys.executable, str(manager_py), "--list-krtmi", "--json"],
            capture_output=True,
            text=True,
            encoding="utf-8"
        )
        self.assertEqual(res_krtmi.returncode, 0)
        stories = json.loads(res_krtmi.stdout)
        self.assertGreaterEqual(len(stories), 7)

        # 6. Test --view-krtmi 2024
        res_view = subprocess.run(
            [sys.executable, str(manager_py), "--view-krtmi", "2024"],
            capture_output=True,
            text=True,
            encoding="utf-8"
        )
        self.assertEqual(res_view.returncode, 0)
        story_2024 = json.loads(res_view.stdout)
        self.assertEqual(str(story_2024.get('year')), "2024")

        # 7. Test --list-gallery --json
        res_gal = subprocess.run(
            [sys.executable, str(manager_py), "--list-gallery", "--json"],
            capture_output=True,
            text=True,
            encoding="utf-8"
        )
        self.assertEqual(res_gal.returncode, 0)
        items = json.loads(res_gal.stdout)
        self.assertGreaterEqual(len(items), 4)

        # 8. Test --backup and --list-backups
        res_bk = subprocess.run(
            [sys.executable, str(manager_py), "--backup", "--reason", "Automated test backup"],
            capture_output=True,
            text=True,
            encoding="utf-8"
        )
        self.assertEqual(res_bk.returncode, 0)
        self.assertIn('"status": "success"', res_bk.stdout)

        res_list_bk = subprocess.run(
            [sys.executable, str(manager_py), "--list-backups"],
            capture_output=True,
            text=True,
            encoding="utf-8"
        )
        self.assertEqual(res_list_bk.returncode, 0)
        backups = json.loads(res_list_bk.stdout)
        self.assertGreater(len(backups), 0)

    def test_empty_cli_flags_rejection_and_non_hang(self):
        """Ensures passing empty strings to CLI action flags returns exit code 1 without hanging."""
        manager_py = SCRIPT_DIR / "manager_tool.py"
        empty_flags = [
            ["--add-member", ""],
            ["--remove-member", ""],
            ["--add-krtmi", ""],
            ["--remove-krtmi", ""],
            ["--add-gallery", ""],
            ["--remove-gallery", ""],
            ["--restore", ""],
        ]
        for flag_args in empty_flags:
            res = subprocess.run(
                [sys.executable, str(manager_py)] + flag_args,
                cwd=str(PROJECT_ROOT),
                capture_output=True,
                text=True,
                timeout=3
            )
            self.assertEqual(res.returncode, 1, f"Expected exit code 1 for {flag_args}")
            self.assertIn("error", (res.stderr + res.stdout).lower())

    def test_non_dict_payload_rejection(self):
        """Ensures passing non-dictionary JSON payloads (e.g. lists, primitives) returns structured errors."""
        manager_py = SCRIPT_DIR / "manager_tool.py"
        non_dict_payloads = [
            ["--add-member", "[1, 2, 3]"],
            ["--add-member", "\"just a string\""],
            ["--add-krtmi", "12345"],
            ["--add-gallery", "true"],
        ]
        for flag_args in non_dict_payloads:
            res = subprocess.run(
                [sys.executable, str(manager_py)] + flag_args,
                cwd=str(PROJECT_ROOT),
                capture_output=True,
                text=True,
                timeout=3
            )
            self.assertEqual(res.returncode, 1, f"Expected exit code 1 for non-dict payload {flag_args}")
            self.assertIn("dictionary", (res.stderr + res.stdout).lower())

    def test_interactive_tui_initialization(self):
        """Ensures InteractiveTUI instantiates properly."""
        store = DataStore(PROJECT_ROOT / "data")
        tui = InteractiveTUI(store)
        self.assertIsNotNone(tui.store)
        self.assertIsNotNone(tui.backup_mgr)


def run_tests():
    """Runs test suite and returns exit code."""
    suite = unittest.defaultTestLoader.loadTestsFromModule(sys.modules[__name__])
    runner = unittest.TextTestRunner(verbosity=2)
    result = runner.run(suite)
    return 0 if result.wasSuccessful() else 1


if __name__ == "__main__":
    sys.exit(run_tests())
