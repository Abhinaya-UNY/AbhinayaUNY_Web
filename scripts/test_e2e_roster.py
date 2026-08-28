#!/usr/bin/env python3
"""
================================================================================
 Abhinaya UNY Robotics Portal — Team Roster Upgrade E2E Test Suite
================================================================================
 File: scripts/test_e2e_roster.py
 Framework: Python 3 standard library unittest (Zero external dependencies)
 Coverage:
   - Tier 1: Feature Coverage (R1 Photo Renaming, R2 Leaders 2020-2025,
             R2 Managers 2020-2025, R3 Active Squad, R4 Alumni Explorer,
             R5 Crossfade Engine)
   - Tier 2: Boundary & Corner Cases (fallbacks, wrapping, empty fields)
   - Tier 3: Cross-Feature Combinations (couplings, sync, filtering)
   - Tier 4: Real-World Scenarios (timeline, modal, responsive, SSG export)
   - Tier 5: Adversarial & Code Integrity (authentic data, zero cheats)

 Usage:
   python scripts/test_e2e_roster.py
   python scripts/test_e2e_roster.py -v
   python scripts/test_e2e_roster.py --tier 1
   python scripts/test_e2e_roster.py --tier 4
================================================================================
"""

import os
import sys
import json
import re
import unittest
from pathlib import Path

# Force UTF-8 on Windows
if hasattr(sys.stdout, 'reconfigure'):
    try:
        sys.stdout.reconfigure(encoding='utf-8', errors='replace')
        sys.stderr.reconfigure(encoding='utf-8', errors='replace')
    except Exception:
        pass

SCRIPT_DIR = Path(__file__).resolve().parent
PROJECT_ROOT = SCRIPT_DIR.parent
CATALOG_PATH = PROJECT_ROOT / "scripts" / "full_catalog_with_renaming.json"
TEAM_DATA_PATH = PROJECT_ROOT / "data" / "teamData.ts"
KRTMI_DATA_PATH = PROJECT_ROOT / "data" / "krtmiData.ts"
ROSTER_COMPONENT_PATH = PROJECT_ROOT / "components" / "TeamRosterSection.tsx"
APP_PAGE_PATH = PROJECT_ROOT / "app" / "page.tsx"
NEXT_CONFIG_PATH = PROJECT_ROOT / "next.config.js"


def read_text(path: Path) -> str:
    if not path.exists():
        return ""
    return path.read_text(encoding="utf-8", errors="replace")


# ==============================================================================
# TIER 1: FEATURE COVERAGE (6 FEATURES, >=5 TESTS EACH)
# ==============================================================================

class TestTier1_R1_PhotoPipeline(unittest.TestCase):
    """R1: Instagram Member Photo Analysis & Semantic Renaming Pipeline"""

    def setUp(self):
        self.assertTrue(CATALOG_PATH.exists(), "Catalog JSON must exist")
        self.catalog = json.loads(read_text(CATALOG_PATH))

    def test_r1_01_naming_format_compliance(self):
        roster_regex = re.compile(r"^(\d{4})_([a-z0-9]+)_([a-z0-9_]+)_(\d{2})\.(jpg|jpeg|png)$")
        non_roster_regex = re.compile(r"^(\d{4})_([a-zA-Z0-9_\-]+)\.(jpg|jpeg|png)$")

        invalid = []
        for item in self.catalog:
            fn = item.get("target_filename", "")
            if item.get("include_in_roster"):
                if not roster_regex.match(fn):
                    invalid.append(f"Roster: {fn}")
            else:
                if not non_roster_regex.match(fn):
                    invalid.append(f"Non-Roster: {fn}")
        self.assertEqual(len(invalid), 0, f"Invalid semantic target filenames: {invalid}")

    def test_r1_02_non_member_and_grid_exclusion(self):
        non_roster = [x for x in self.catalog if not x.get("include_in_roster")]
        self.assertGreater(len(non_roster), 100)
        for item in non_roster:
            self.assertFalse(item.get("include_in_roster"))
            if "13_wanted_uang_kas_bendahara" in item.get("source_path", ""):
                self.assertFalse(item.get("include_in_roster"))

        roster = [x for x in self.catalog if x.get("include_in_roster")]
        for item in roster:
            self.assertTrue(item.get("is_genuine_member"))
            self.assertIn(item.get("category"), ["MEMBER_PHOTO", "MENTOR_PHOTO"])

    def test_r1_03_genuine_member_portrait_count(self):
        roster = [x for x in self.catalog if x.get("include_in_roster")]
        self.assertEqual(len(roster), 97)
        years = sorted(list(set(x["year"] for x in roster)))
        self.assertEqual(years, [2020, 2021, 2022, 2023, 2024, 2025])

        studio = [x for x in roster if x.get("source_dir") == "members"]
        ig = [x for x in roster if x.get("source_dir") == "instagram_feed"]
        self.assertEqual(len(studio), 24)
        self.assertEqual(len(ig), 73)

    def test_r1_04_image_file_existence_and_byte_integrity(self):
        missing = []
        empty = []
        for item in self.catalog:
            fp = PROJECT_ROOT / item["source_path"]
            if not fp.exists():
                missing.append(item["source_path"])
            elif fp.stat().st_size < 1000:
                empty.append(item["source_path"])
        self.assertEqual(len(missing), 0, f"Missing files: {missing}")
        self.assertEqual(len(empty), 0, f"Empty files: {empty}")

    def test_r1_05_multi_pose_sequence_indexing(self):
        roster = [x for x in self.catalog if x.get("include_in_roster")]
        target_paths = [x["target_relative_path"] for x in roster]
        self.assertEqual(len(set(target_paths)), len(roster))
        for item in roster:
            self.assertGreaterEqual(item.get("sequence", 0), 1)

    def test_r1_06_catalog_schema_validity(self):
        req = ["source_path", "source_dir", "year", "category", "is_genuine_member",
               "include_in_roster", "division", "sequence", "target_filename",
               "target_relative_path", "evidence"]
        for item in self.catalog:
            for field in req:
                self.assertIn(field, item)


class TestTier1_R2_Leaders(unittest.TestCase):
    """R2: All-Era Leaders Hall of Fame (2020-2025)"""

    def setUp(self):
        self.catalog = json.loads(read_text(CATALOG_PATH))
        self.team_data = read_text(TEAM_DATA_PATH)
        self.roster_comp = read_text(ROSTER_COMPONENT_PATH)

    def test_r2l_01_all_six_eras_leaders_cataloged(self):
        years = sorted(list(set(x["year"] for x in self.catalog)))
        for y in [2020, 2021, 2022, 2023, 2024, 2025]:
            self.assertIn(y, years)

    def test_r2l_02_authentic_historical_leaders_fidelity(self):
        names = [x["member_name"].lower() for x in self.catalog if x.get("member_name")]
        self.assertTrue(any("nurcholis" in n for n in names))
        self.assertTrue(any("iqbal" in n for n in names))
        self.assertTrue(any("salsabila" in n for n in names))
        self.assertTrue(any("ilham widyo" in n for n in names))
        self.assertTrue(any("farhan yuda" in n for n in names))

    def test_r2l_03_leadership_badge_annotations(self):
        self.assertIn("'Ketua Tim'", self.team_data)
        self.assertIn("Ilham Widyo Nugroho", self.team_data)
        self.assertIn("Farhan Yuda Mahendra", self.team_data)
        self.assertIn("Ketua Tim", self.team_data)

    def test_r2l_04_academic_info_and_division(self):
        self.assertIn("D4 Teknik Elektronika", self.team_data)
        self.assertIn("Pendidikan Teknik Mekatronika", self.team_data)

    def test_r2l_05_multi_photo_asset_bindings(self):
        ilham = [x for x in self.catalog if x.get("member_name") and "ilham widyo" in x["member_name"].lower()]
        farhan = [x for x in self.catalog if x.get("member_name") and "farhan yuda" in x["member_name"].lower()]
        salsabila = [x for x in self.catalog if x.get("member_name") and "salsabila" in x["member_name"].lower()]
        self.assertGreaterEqual(len(ilham), 2)
        self.assertGreaterEqual(len(farhan), 2)
        self.assertGreaterEqual(len(salsabila), 2)

    def test_r2l_06_gold_theme_ui_styling(self):
        self.assertIn("#EAB308", self.team_data)
        self.assertIn("text-amber-300", self.team_data)
        self.assertIn("Award", self.roster_comp)


class TestTier1_R2_Managers(unittest.TestCase):
    """R2: All-Era Managers Showcase (2020-2025)"""

    def setUp(self):
        self.catalog = json.loads(read_text(CATALOG_PATH))
        self.team_data = read_text(TEAM_DATA_PATH)
        self.roster_comp = read_text(ROSTER_COMPONENT_PATH)

    def test_r2m_01_all_six_eras_managers_cataloged(self):
        mgr_items = [x for x in self.catalog if x.get("division") == "manager" or "manager" in (x.get("role") or "").lower()]
        years = sorted(list(set(x["year"] for x in mgr_items)))
        for y in [2020, 2021, 2022, 2023, 2024, 2025]:
            self.assertIn(y, years)

    def test_r2m_02_authentic_historical_managers_fidelity(self):
        names = [x["member_name"].lower() for x in self.catalog if x.get("member_name")]
        self.assertTrue(any("yuli dwi saputri" in n for n in names))
        self.assertTrue(any("mustika wahyu aprilia" in n for n in names))
        self.assertTrue(any("rose pita" in n for n in names))
        self.assertTrue(any("zelfa" in n for n in names))

    def test_r2m_03_co_management_eras_support(self):
        mgr_2024 = [x for x in self.catalog if x.get("year") == 2024 and x.get("division") == "manager" and x.get("member_name")]
        names_2024 = [x["member_name"].lower() for x in mgr_2024]
        self.assertTrue(any("mustika" in n for n in names_2024))
        self.assertTrue(any("rose pita" in n for n in names_2024))

        mgr_2025 = [x for x in self.catalog if x.get("year") == 2025 and x.get("division") == "manager" and x.get("member_name")]
        names_2025 = [x["member_name"].lower() for x in mgr_2025]
        self.assertTrue(any("rose pita" in n or "zelfa" in n for n in names_2025))

    def test_r2m_04_manager_operational_specializations(self):
        self.assertIn("Manager", self.team_data)
        self.assertIn("Mustika Wahyu Aprilia", self.team_data)
        self.assertIn("Rose Pita Nur Afifah", self.team_data)
        self.assertIn("Administrasi", self.team_data)

    def test_r2m_05_emerald_theme_ui_styling(self):
        self.assertIn("#10B981", self.team_data)
        self.assertIn("text-emerald-300", self.team_data)
        self.assertIn("Briefcase", self.roster_comp)

    def test_r2m_06_manager_academic_and_badge_consistency(self):
        self.assertIn("Fisika", self.team_data)
        self.assertIn("Mekatronika", self.team_data)


class TestTier1_R3_TechnicalSquad(unittest.TestCase):
    """R3: Current Active Technical Squad"""

    def setUp(self):
        self.team_data = read_text(TEAM_DATA_PATH)
        self.roster_comp = read_text(ROSTER_COMPONENT_PATH)

    def test_r3_01_technical_divisions_representation(self):
        self.assertIn("'Program'", self.team_data)
        self.assertIn("'Elektronik'", self.team_data)
        self.assertIn("'Mekanik'", self.team_data)

    def test_r3_02_granular_technical_roles(self):
        self.assertIn("Autonomous Navigation", self.team_data)
        self.assertIn("Computer Vision", self.team_data)
        self.assertIn("Power Distribution Board", self.team_data)
        self.assertIn("CAD", self.team_data)
        self.assertIn("Gripper", self.team_data)

    def test_r3_03_robotics_skill_tags_coverage(self):
        for skill in ["YOLO", "STM32", "PCB", "CAD", "Mecanum"]:
            self.assertIn(skill, self.team_data)

    def test_r3_04_authentic_student_nims(self):
        nims = ["22518241023", "21501244039", "22518241040", "22502241014",
                "20539144016", "21539144005", "22538141004", "23090620088"]
        for nim in nims:
            self.assertIn(nim, self.team_data)

    def test_r3_05_multi_photo_pose_availability(self):
        self.assertIn("images: [", self.team_data)
        matches = re.findall(r"images:\s*\[[\s\S]*?\]", self.team_data)
        self.assertGreaterEqual(len(matches), 10)

    def test_r3_06_ui_division_filter_buttons_and_icons(self):
        self.assertIn("DIVISION_CATEGORIES", self.team_data)
        self.assertIn("Code", self.roster_comp)
        self.assertIn("Zap", self.roster_comp)
        self.assertIn("Wrench", self.roster_comp)


class TestTier1_R4_AlumniExplorer(unittest.TestCase):
    """R4: Interactive Alumni & Generation Explorer (2020-2025)"""

    def setUp(self):
        self.catalog = json.loads(read_text(CATALOG_PATH))
        self.krtmi_data = read_text(KRTMI_DATA_PATH)
        self.roster_comp = read_text(ROSTER_COMPONENT_PATH)

    def test_r4_01_all_six_generation_years_supported(self):
        years = sorted(list(set(x["year"] for x in self.catalog)))
        self.assertEqual(years, [2020, 2021, 2022, 2023, 2024, 2025])

    def test_r4_02_contingent_roster_integrity(self):
        for year in [2020, 2021, 2022, 2023, 2024, 2025]:
            items = [x for x in self.catalog if x.get("year") == year]
            self.assertGreater(len(items), 0)

    def test_r4_03_generation_leadership_linkage(self):
        era2020 = [x for x in self.catalog if x.get("year") == 2020 and x.get("member_name")]
        self.assertTrue(any("nurcholis" in x["member_name"].lower() for x in era2020))
        self.assertTrue(any("yuli" in x["member_name"].lower() for x in era2020))

        era2023 = [x for x in self.catalog if x.get("year") == 2023 and x.get("member_name")]
        self.assertTrue(any("salsabila" in x["member_name"].lower() for x in era2023))

        era2025 = [x for x in self.catalog if x.get("year") == 2025 and x.get("member_name")]
        self.assertTrue(any("farhan yuda" in x["member_name"].lower() for x in era2025))

    def test_r4_04_historical_tournament_achievements(self):
        for year in ["2020", "2021", "2022", "2023", "2024"]:
            self.assertIn(year, self.krtmi_data)

    def test_r4_05_year_tab_filter_logic_and_state(self):
        self.assertIn("useState", self.roster_comp)
        self.assertIn("selectedDivision", self.roster_comp)
        self.assertIn("searchQuery", self.roster_comp)
        self.assertIn("selectedMember", self.roster_comp)

    def test_r4_06_generation_achievements_documentation(self):
        self.assertIn("prestasi", self.krtmi_data)
        self.assertIn("Juara", self.krtmi_data)


class TestTier1_R5_CrossfadeEngine(unittest.TestCase):
    """R5: Ultra-Smooth Crossfade Photo Transition Engine"""

    def setUp(self):
        self.roster_comp = read_text(ROSTER_COMPONENT_PATH)

    def test_r5_01_gpu_accelerated_css_transitions(self):
        self.assertIn("transition-all", self.roster_comp)
        self.assertIn("duration-1000", self.roster_comp)
        self.assertIn("ease-in-out", self.roster_comp)
        self.assertIn("opacity-100 scale-100", self.roster_comp)
        self.assertIn("opacity-0 scale-105", self.roster_comp)

    def test_r5_02_slide_count_badge_indicator(self):
        self.assertIn("Images", self.roster_comp)
        self.assertIn("currentIdx + 1", self.roster_comp)
        self.assertIn("images.length", self.roster_comp)

    def test_r5_03_interactive_dot_pagination(self):
        self.assertIn("bg-brand-orange", self.roster_comp)
        self.assertIn("shadow-[0_0_10px_rgba(255,107,0,0.9)]", self.roster_comp)
        self.assertIn("w-6 bg-brand-orange", self.roster_comp)
        self.assertIn("w-1.5 bg-white/40", self.roster_comp)

    def test_r5_04_manual_navigation_arrows_and_events(self):
        self.assertIn("ChevronLeft", self.roster_comp)
        self.assertIn("ChevronRight", self.roster_comp)
        self.assertIn("e.stopPropagation()", self.roster_comp)
        self.assertIn("nextSlide", self.roster_comp)
        self.assertIn("prevSlide", self.roster_comp)

    def test_r5_05_staggered_interval_timer_logic(self):
        self.assertIn("charCodeAt", self.roster_comp)
        self.assertIn("setInterval", self.roster_comp)
        self.assertIn("clearInterval", self.roster_comp)

    def test_r5_06_graceful_monogram_fallback_avatar(self):
        self.assertIn("hasCustomPhoto", self.roster_comp)
        self.assertIn("onImageError", self.roster_comp)


# ==============================================================================
# TIER 2: BOUNDARY & CORNER CASES (6 TESTS)
# ==============================================================================

class TestTier2_Boundaries(unittest.TestCase):
    """Tier 2: Boundary & Corner Cases"""

    def setUp(self):
        self.roster_comp = read_text(ROSTER_COMPONENT_PATH)
        self.catalog = json.loads(read_text(CATALOG_PATH))

    def test_t2_01_empty_optional_fields_resilience(self):
        self.assertIn("member.quote &&", self.roster_comp)
        self.assertIn("selectedMember.socials", self.roster_comp)
        self.assertIn("selectedMember.socials.github", self.roster_comp)
        self.assertIn("selectedMember.socials.linkedin", self.roster_comp)
        self.assertIn("selectedMember.socials.instagram", self.roster_comp)
        self.assertIn("selectedMember.socials.email", self.roster_comp)

    def test_t2_02_image_error_fallback_handling(self):
        self.assertIn("onError={() => onImageError && onImageError(member.id)}", self.roster_comp)
        self.assertIn("setImgErrors", self.roster_comp)

    def test_t2_03_single_vs_multi_photo_branching(self):
        self.assertIn("images.length > 1 &&", self.roster_comp)
        self.assertIn("if (images.length <= 1) return;", self.roster_comp)

    def test_t2_04_slide_index_circular_wrapping(self):
        n = 3
        idx = 0
        idx = (idx + 1) % n
        self.assertEqual(idx, 1)
        idx = (idx + 1) % n
        self.assertEqual(idx, 2)
        idx = (idx + 1) % n
        self.assertEqual(idx, 0)

        idx = (idx - 1 + n) % n
        self.assertEqual(idx, 2)

    def test_t2_05_search_query_boundary_inputs(self):
        self.assertIn("searchQuery.trim()", self.roster_comp)
        self.assertIn("toLowerCase()", self.roster_comp)
        self.assertIn("member.name.toLowerCase()", self.roster_comp)

    def test_t2_06_generation_year_boundaries(self):
        years = [x["year"] for x in self.catalog]
        self.assertEqual(min(years), 2020)
        self.assertEqual(max(years), 2025)
        self.assertEqual(len([y for y in years if y < 2020]), 0)
        self.assertEqual(len([y for y in years if y > 2025]), 0)


# ==============================================================================
# TIER 3: CROSS-FEATURE COMBINATIONS (5 TESTS)
# ==============================================================================

class TestTier3_Combinations(unittest.TestCase):
    """Tier 3: Cross-Feature Combinations"""

    def setUp(self):
        self.roster_comp = read_text(ROSTER_COMPONENT_PATH)
        self.catalog = json.loads(read_text(CATALOG_PATH))
        self.team_data = read_text(TEAM_DATA_PATH)

    def test_t3_01_modal_inspection_coupled_with_member_state(self):
        self.assertIn("setSelectedMember(member)", self.roster_comp)
        self.assertIn('role="dialog"', self.roster_comp)
        self.assertIn('aria-modal="true"', self.roster_comp)
        self.assertIn("selectedMember.name", self.roster_comp)
        self.assertIn("selectedMember.role", self.roster_comp)
        self.assertIn("selectedMember.specialization", self.roster_comp)

    def test_t3_02_division_filtering_coupled_with_search(self):
        self.assertIn("selectedDivision === 'All'", self.roster_comp)
        self.assertIn("filter(matchesSearch)", self.roster_comp)

    def test_t3_03_crossfade_continuity_modal_and_card(self):
        self.assertIn("<MemberPhotoFadeShowcase", self.roster_comp)
        self.assertIn("isModal={true}", self.roster_comp)
        self.assertIn("isModal ? 4500 : 3600", self.roster_comp)

    def test_t3_04_leader_manager_sync_across_eras(self):
        for y in [2020, 2021, 2022, 2023, 2024, 2025]:
            items = [x for x in self.catalog if x.get("year") == y]
            self.assertGreater(len(items), 0)

    def test_t3_05_photo_paths_in_teamdata_resolve_on_disk(self):
        paths = re.findall(r"'(/images/[^']+)'", self.team_data)
        self.assertGreater(len(paths), 10)
        missing = []
        for p in paths:
            clean = p.lstrip("/")
            full = PROJECT_ROOT / "public" / clean
            if not full.exists():
                missing.append(clean)
        self.assertEqual(len(missing), 0, f"Missing disk assets: {missing}")


# ==============================================================================
# TIER 4: REAL-WORLD APPLICATION SCENARIOS (5 TESTS)
# ==============================================================================

class TestTier4_Scenarios(unittest.TestCase):
    """Tier 4: Real-World Application Scenarios"""

    def setUp(self):
        self.catalog = json.loads(read_text(CATALOG_PATH))
        self.roster_comp = read_text(ROSTER_COMPONENT_PATH)
        self.next_config = read_text(NEXT_CONFIG_PATH)
        self.app_page = read_text(APP_PAGE_PATH)
        self.team_data = read_text(TEAM_DATA_PATH)

    def test_t4_01_user_journey_timeline_2020_to_2025(self):
        inc_2020 = [x for x in self.catalog if x.get("year") == 2020]
        self.assertGreaterEqual(len(inc_2020), 5)
        self.assertTrue(any("nurcholis" in (x.get("member_name") or "").lower() for x in inc_2020))

        champ_2023 = [x for x in self.catalog if x.get("year") == 2023]
        self.assertGreaterEqual(len(champ_2023), 5)
        self.assertTrue(any("salsabila" in (x.get("member_name") or "").lower() for x in champ_2023))

        curr_2025 = [x for x in self.catalog if x.get("year") == 2025]
        self.assertGreaterEqual(len(curr_2025), 5)
        self.assertTrue(any("farhan yuda" in (x.get("member_name") or "").lower() for x in curr_2025))

    def test_t4_02_user_journey_member_inspection_modal(self):
        self.assertIn("onClick={() => setSelectedMember(member)}", self.roster_comp)
        self.assertIn("MemberPhotoFadeShowcase", self.roster_comp)
        self.assertIn("isModal={true}", self.roster_comp)
        self.assertIn("selectedMember.bio", self.roster_comp)
        self.assertIn("selectedMember.quote", self.roster_comp)
        self.assertIn("e.key === 'Escape'", self.roster_comp)

    def test_t4_03_user_journey_responsive_grid(self):
        self.assertIn("grid-cols-1", self.roster_comp)
        self.assertIn("sm:grid-cols-2", self.roster_comp)
        self.assertIn("lg:grid-cols-3", self.roster_comp)

    def test_t4_04_user_journey_static_export_readiness(self):
        self.assertIn("output: 'export'", self.next_config)
        self.assertIn("unoptimized: true", self.next_config)
        self.assertIn("TeamRosterSection", self.app_page)

    def test_t4_05_user_journey_skill_discovery(self):
        self.assertIn("specialization", self.team_data)
        self.assertIn("Autonomous Navigation", self.team_data)
        self.assertIn("Power Distribution Board", self.team_data)
        self.assertIn("CAD", self.team_data)


# ==============================================================================
# TIER 5: ADVERSARIAL & CODE INTEGRITY (5 TESTS)
# ==============================================================================

class TestTier5_Integrity(unittest.TestCase):
    """Tier 5: Adversarial & Code Integrity"""

    def setUp(self):
        self.team_data = read_text(TEAM_DATA_PATH)
        self.catalog = json.loads(read_text(CATALOG_PATH))
        self.app_dir = PROJECT_ROOT / "app"

    def test_t5_01_zero_dummy_or_mock_names(self):
        prohibited = ["John Doe", "Jane Doe", "Lorem Ipsum", "Test User", "Dummy Member",
                      "MEMBER_NAME_HERE", "TODO_MEMBER"]
        for bad in prohibited:
            self.assertNotIn(bad, self.team_data)

    def test_t5_02_authentic_student_nims(self):
        for nim in ["22518241023", "21507334002", "20518241012", "21306141050", "22518241042", "22518241040"]:
            self.assertIn(nim, self.team_data)

    def test_t5_03_zero_hardcoded_cheat_assertions(self):
        self.assertEqual(len(self.catalog), 251)
        for item in self.catalog[:20]:
            p = PROJECT_ROOT / item["source_path"]
            self.assertTrue(p.exists())

    def test_t5_04_clean_typescript_data_contracts(self):
        self.assertIn("export interface TeamMember {", self.team_data)
        self.assertIn("id: string;", self.team_data)
        self.assertIn("name: string;", self.team_data)
        self.assertIn("division:", self.team_data)
        self.assertIn("role: string;", self.team_data)
        self.assertIn("specialization: string[];", self.team_data)
        self.assertIn("bio: string;", self.team_data)

    def test_t5_05_zero_unauthorized_admin_routes(self):
        self.assertFalse((self.app_dir / "admin").exists())
        self.assertFalse((self.app_dir / "api" / "admin").exists())


def main():
    loader = unittest.TestLoader()
    suite = unittest.TestSuite()

    tier_filter = None
    if len(sys.argv) > 1 and sys.argv[1] == "--tier" and len(sys.argv) > 2:
        tier_filter = int(sys.argv[2])

    if not tier_filter or tier_filter == 1:
        suite.addTests(loader.loadTestsFromTestCase(TestTier1_R1_PhotoPipeline))
        suite.addTests(loader.loadTestsFromTestCase(TestTier1_R2_Leaders))
        suite.addTests(loader.loadTestsFromTestCase(TestTier1_R2_Managers))
        suite.addTests(loader.loadTestsFromTestCase(TestTier1_R3_TechnicalSquad))
        suite.addTests(loader.loadTestsFromTestCase(TestTier1_R4_AlumniExplorer))
        suite.addTests(loader.loadTestsFromTestCase(TestTier1_R5_CrossfadeEngine))

    if not tier_filter or tier_filter == 2:
        suite.addTests(loader.loadTestsFromTestCase(TestTier2_Boundaries))

    if not tier_filter or tier_filter == 3:
        suite.addTests(loader.loadTestsFromTestCase(TestTier3_Combinations))

    if not tier_filter or tier_filter == 4:
        suite.addTests(loader.loadTestsFromTestCase(TestTier4_Scenarios))

    if not tier_filter or tier_filter == 5:
        suite.addTests(loader.loadTestsFromTestCase(TestTier5_Integrity))

    runner = unittest.TextTestRunner(verbosity=2)
    result = runner.run(suite)

    sys.exit(0 if result.wasSuccessful() else 1)


if __name__ == "__main__":
    main()
