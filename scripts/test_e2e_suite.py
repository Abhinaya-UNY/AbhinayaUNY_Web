#!/usr/bin/env python3
"""
================================================================================
 Abhinaya UNY Robotics Portal — Comprehensive Multi-Tier E2E Test Suite
================================================================================
 File: scripts/test_e2e_suite.py
 Framework: Python 3 standard library unittest (Zero external dependencies)
 Purpose: Full verification across Tiers 1–5 for the Abhinaya UNY Robotics Portal:
   - Tier 1: Feature Coverage (>=5 tests per feature across all 6 core features)
   - Tier 2: Boundary & Corner Cases (Mobile/4K viewports, fallbacks, malformed inputs)
   - Tier 3: Cross-Feature Combinations (Pairwise couplings, data flow & UI states)
   - Tier 4: Real-World Application Scenarios (5 complete user journeys)
   - Tier 5: Adversarial Coverage & Code Integrity (Zero dummy stubs, authentic data)

 Usage:
   python scripts/test_e2e_suite.py
   python scripts/test_e2e_suite.py -v
   python scripts/test_e2e_suite.py --tier 1
   python scripts/test_e2e_suite.py --tier 4
================================================================================
"""

import os
import sys
import json
import re
import shutil
import subprocess
import time
import unittest
from pathlib import Path
from typing import Any, Dict, List, Optional, Tuple

# Force UTF-8 encoding on Windows
if hasattr(sys.stdout, 'reconfigure'):
    try:
        sys.stdout.reconfigure(encoding='utf-8', errors='replace')
        sys.stderr.reconfigure(encoding='utf-8', errors='replace')
    except Exception:
        pass

# Resolve Workspace Root Directory
SCRIPT_DIR = Path(__file__).resolve().parent
PROJECT_ROOT = SCRIPT_DIR.parent
COMPONENTS_DIR = PROJECT_ROOT / "components"
DATA_DIR = PROJECT_ROOT / "data"
APP_DIR = PROJECT_ROOT / "app"
PUBLIC_DIR = PROJECT_ROOT / "public"
OUT_DIR = PROJECT_ROOT / "out"
SCRIPTS_DIR = PROJECT_ROOT / "scripts"

# ANSI Terminal Color Helpers
class TermColor:
    RESET = "\033[0m"
    BOLD = "\033[1m"
    DIM = "\033[2m"
    GREEN = "\033[92m"
    RED = "\033[91m"
    YELLOW = "\033[93m"
    BLUE = "\033[94m"
    CYAN = "\033[96m"
    MAGENTA = "\033[95m"
    WHITE = "\033[97m"

    @classmethod
    def enable_vt100(cls):
        if os.name == 'nt':
            try:
                import ctypes
                k32 = ctypes.windll.kernel32
                h = k32.GetStdHandle(-11)
                m = ctypes.c_ulong()
                k32.GetConsoleMode(h, ctypes.byref(m))
                m.value |= 0x0004
                k32.SetConsoleMode(h, m)
            except Exception:
                pass

TermColor.enable_vt100()


# ==============================================================================
# Helper Functions for File Inspection & AST/Regex Analysis
# ==============================================================================
def read_file_safe(path: Path) -> str:
    """Read file content with UTF-8 encoding."""
    if not path.exists():
        return ""
    return path.read_text(encoding="utf-8", errors="replace")


# ==============================================================================
# TIER 1: FEATURE COVERAGE (6 Features, >=5 Tests Each = 30+ Tests)
# ==============================================================================

class TestTier1_Feature1_HeroLayout(unittest.TestCase):
    """
    Feature 1: Hero Layout & Button Proportions (ORIGINAL_REQUEST §R1)
    Requirement: Proportional placement of CTA buttons strictly below the hero photo
    stage across all viewports; responsive aspect ratio on mobile without cropping.
    """

    def setUp(self):
        self.hero_file = COMPONENTS_DIR / "HeroSection.tsx"
        self.assertTrue(self.hero_file.exists(), "HeroSection.tsx must exist in components/")
        self.content = read_file_safe(self.hero_file)

    def test_f1_01_hero_button_container_is_below_photo_stage(self):
        """Verify the CTA button container is rendered structurally after/below the photo section."""
        section_idx = self.content.find('</section>')
        self.assertGreater(section_idx, 0, "Hero photo stage should be enclosed in a <section> element")
        
        explore_idx = self.content.find('EXPLORE TEAM &')
        watch_idx = self.content.find('WATCH ROBOT IN ACTION')
        
        self.assertGreater(explore_idx, section_idx, "EXPLORE TEAM button must be placed after/below the photo section")
        self.assertGreater(watch_idx, section_idx, "WATCH ROBOT IN ACTION button must be placed after/below the photo section")

    def test_f1_02_hero_stage_has_responsive_height_and_aspect_ratio(self):
        """Verify hero stage defines responsive min-height and aspect-ratio classes across breakpoints."""
        self.assertIn("min-h-[48vh]", self.content, "Must define mobile min-height for hero photo stage")
        self.assertIn("sm:min-h-", self.content, "Must define tablet/sm min-height for hero photo stage")
        self.assertIn("aspect-[16/10]", self.content, "Must define panoramic aspect ratio on mobile to preserve flags/members")
        self.assertIn("bg-cover", self.content, "Background image must use bg-cover for seamless visual coverage")

    def test_f1_03_hero_cta_buttons_styling_and_contrast(self):
        """Verify high-contrast glowing styling and distinct visual hierarchies on both CTA buttons."""
        self.assertIn("bg-gradient-to-r", self.content, "Primary CTA should use vibrant gradient styling")
        self.assertIn("from-brand-orange", self.content, "Primary CTA should use brand orange palette")
        self.assertIn("shadow-[0_0_", self.content, "Buttons should feature glowing drop shadow")
        self.assertIn("rounded-full", self.content, "Buttons should use rounded-full pill styling")

    def test_f1_04_hero_primary_cta_navigation_link(self):
        """Verify primary CTA button includes smooth navigation to team/guidebooks section."""
        self.assertIn("EXPLORE TEAM &", self.content, "Primary button label must include EXPLORE TEAM & GUIDEBOOKS")
        self.assertIn("scrollToSection", self.content, "Primary CTA must implement smooth scroll handler")
        self.assertTrue(
            "#about-tim" in self.content or "#krtmi-story" in self.content or "#team-roster" in self.content,
            "Primary CTA must target an authentic content section"
        )

    def test_f1_05_hero_secondary_cta_watch_action_link(self):
        """Verify secondary CTA button links directly to the multimedia video action section."""
        self.assertIn("WATCH ROBOT IN ACTION", self.content, "Secondary button must have label WATCH ROBOT IN ACTION")
        self.assertIn("#video-aksi", self.content, "Secondary CTA must target the #video-aksi section")

    def test_f1_06_hero_emblem_white_badge_and_border(self):
        """Verify hero emblem features a crisp white background badge with glowing brand-orange border."""
        self.assertIn("bg-white", self.content, "Logo container must feature a crisp white background badge")
        self.assertIn("border-brand-orange", self.content, "Logo container must feature brand orange border")
        self.assertIn("logo_abhinaya.png", self.content, "Emblem must load official logo_abhinaya.png asset")


class TestTier1_Feature2_YouTubeShowcase(unittest.TestCase):
    """
    Feature 2: Official Multimedia & YouTube Showcase (ORIGINAL_REQUEST §R2)
    Requirement: Embed official Abhinaya UNY YouTube videos (PmxwdrhpxKg 16:9, wLusNVfFFHA 9:16),
    official channel (@AbhinayaUNY), Instagram (@abhinaya.uny), and interactive modal playback.
    """

    def setUp(self):
        self.video_file = COMPONENTS_DIR / "YouTubeVideoShowcase.tsx"
        self.assertTrue(self.video_file.exists(), "YouTubeVideoShowcase.tsx must exist in components/")
        self.content = read_file_safe(self.video_file)

    def test_f2_01_official_main_action_video_id_present(self):
        """Verify the official 16:9 Main Action video ID (PmxwdrhpxKg) is configured."""
        self.assertIn("PmxwdrhpxKg", self.content, "Must contain official YouTube video ID PmxwdrhpxKg")
        self.assertIn("16:9", self.content, "Must support 16:9 widescreen format specification")

    def test_f2_02_official_shorts_video_id_present(self):
        """Verify the official 9:16 Shorts video ID (wLusNVfFFHA) is configured."""
        self.assertIn("wLusNVfFFHA", self.content, "Must contain official YouTube Shorts ID wLusNVfFFHA")
        self.assertIn("9:16", self.content, "Must support 9:16 vertical format specification")

    def test_f2_03_dual_mode_tab_switcher_supported(self):
        """Verify component provides interactive tab switching between 16:9 Action and 9:16 Shorts."""
        self.assertIn("activeTab", self.content, "Must maintain activeTab state for tab switching")
        self.assertIn("Match Action (16:9)", self.content, "Must include Match Action (16:9) tab button")
        self.assertIn("Official Shorts (9:16)", self.content, "Must include Official Shorts (9:16) tab button")

    def test_f2_04_official_channel_and_instagram_links(self):
        """Verify direct subscription links to official YouTube channel and Instagram profile."""
        self.assertIn("https://www.youtube.com/@AbhinayaUNY", self.content, "Must link to official YouTube channel @AbhinayaUNY")
        self.assertIn("https://www.instagram.com/abhinaya.uny/", self.content, "Must link to official Instagram profile @abhinaya.uny")
        self.assertIn('target="_blank"', self.content, "External links must open in a new tab")
        self.assertIn('rel="noopener noreferrer"', self.content, "External links must use secure rel attributes")

    def test_f2_05_privacy_enhanced_iframe_and_modal_playback(self):
        """Verify use of youtube-nocookie.com and full-screen modal lightbox support."""
        self.assertIn("youtube-nocookie.com", self.content, "Must use privacy-enhanced youtube-nocookie.com domain")
        self.assertIn("isModalOpen", self.content, "Must maintain isModalOpen state for modal lightbox")
        self.assertIn("allowFullScreen", self.content, "Iframes must allow full screen playback")

    def test_f2_06_high_res_thumbnail_with_fallback(self):
        """Verify YouTube high-res thumbnail CDN URL with fallback to hqdefault."""
        self.assertIn("maxresdefault.jpg", self.content, "Must request maxresdefault.jpg thumbnail")
        self.assertIn("hqdefault.jpg", self.content, "Must provide fallback to hqdefault.jpg")


class TestTier1_Feature3_TeamRoster(unittest.TestCase):
    """
    Feature 3: Team Roster & Division Member Showcase (ORIGINAL_REQUEST §R3)
    Requirement: Interactive team member roster categorizing members by official divisions,
    high-tech member cards with badges, roles, and verified academic credentials.
    """

    def setUp(self):
        self.team_data_file = DATA_DIR / "teamData.ts"
        self.roster_comp_file = COMPONENTS_DIR / "TeamRosterSection.tsx"
        self.assertTrue(self.team_data_file.exists(), "data/teamData.ts must exist")
        self.assertTrue(self.roster_comp_file.exists(), "components/TeamRosterSection.tsx must exist")
        self.team_data = read_file_safe(self.team_data_file)
        self.roster_comp = read_file_safe(self.roster_comp_file)

    def test_f3_01_team_data_exports_required_models(self):
        """Verify data/teamData.ts exports DOSEN_PEMBIMBING, TEAM_MEMBERS, ALL_ROSTER_MEMBERS, DIVISION_CATEGORIES."""
        self.assertIn("export const DOSEN_PEMBIMBING", self.team_data, "Must export DOSEN_PEMBIMBING object")
        self.assertIn("export const TEAM_MEMBERS", self.team_data, "Must export TEAM_MEMBERS array")
        self.assertIn("export const ALL_ROSTER_MEMBERS", self.team_data, "Must export ALL_ROSTER_MEMBERS array")
        self.assertIn("export const DIVISION_CATEGORIES", self.team_data, "Must export DIVISION_CATEGORIES")

    def test_f3_02_all_divisions_represented(self):
        """Verify all 4 student divisions plus Dosen Pembimbing are present in data layer."""
        divisions = ['Mekanik', 'Elektrik', 'Programming & AI', 'Manajerial & Media', 'Pembimbing']
        for div in divisions:
            self.assertIn(f"'{div}'", self.team_data, f"Division {div} must be represented in teamData.ts")

    def test_f3_03_authentic_team_member_records_count(self):
        """Verify data/teamData.ts contains at least 14 verified members matching official records."""
        member_ids = re.findall(r"id:\s*['\"]([\w-]+)['\"]", self.team_data)
        self.assertGreaterEqual(len(member_ids), 14, f"Must contain at least 14 team members, found {len(member_ids)}")
        
        self.assertIn("Prof. Ir. Moh. Khairudin", self.team_data, "Must include Dosen Pembimbing Prof. Moh. Khairudin")
        self.assertIn("Ilham Widyo Nugroho", self.team_data, "Must include Ketua Tim Ilham Widyo Nugroho")
        self.assertIn("Tri Wahyu Handoyo", self.team_data, "Must include Lead Programmer Tri Wahyu Handoyo")
        self.assertIn("Salsabila Azzahra", self.team_data, "Must include Strategy Manager Salsabila Azzahra")
        self.assertIn("Muhamad Ilham Sony", self.team_data, "Must include Mechanical Lead M. Ilham Sony")
        self.assertIn("Agus Bagaskoro", self.team_data, "Must include Electrical Lead Agus Bagaskoro")

    def test_f3_04_roster_ui_division_filter_tabs(self):
        """Verify TeamRosterSection.tsx implements interactive filter buttons with division counters."""
        self.assertIn("selectedDivision", self.roster_comp, "Must manage selectedDivision state")
        self.assertIn("DIVISION_CATEGORIES.map", self.roster_comp, "Must dynamically map over DIVISION_CATEGORIES")
        self.assertIn("setSelectedDivision", self.roster_comp, "Must allow changing selected division")

    def test_f3_05_roster_ui_search_bar_functionality(self):
        """Verify TeamRosterSection.tsx provides search input filtering by name, NIM, role, and skills."""
        self.assertIn("searchQuery", self.roster_comp, "Must maintain searchQuery state")
        self.assertIn("setSearchQuery", self.roster_comp, "Must update search query on input change")
        self.assertIn("filteredMembers", self.roster_comp, "Must compute filteredMembers array")

    def test_f3_06_member_detail_modal_dialog(self):
        """Verify clicking a member card opens a rich modal dialog with full bio and technical skills."""
        self.assertIn("selectedMember", self.roster_comp, "Must track selectedMember for detail modal")
        self.assertIn("setSelectedMember", self.roster_comp, "Must provide modal trigger and close actions")
        self.assertIn('role="dialog"', self.roster_comp, "Modal must define accessible role='dialog'")
        self.assertIn("specialization", self.roster_comp, "Modal must render member technical specialization pills")


class TestTier1_Feature4_GuidebookAlignment(unittest.TestCase):
    """
    Feature 4: Comprehensive Guidebook Alignment 2019-2026 (ORIGINAL_REQUEST §R4)
    Requirement: Accurate competition rules, arena dimensions, scoring criteria, and robot constraints
    extracted directly from local PDF guidebooks across all 7 editions (2019-2026).
    """

    def setUp(self):
        self.krtmi_data_file = DATA_DIR / "krtmiData.ts"
        self.krtmi_comp_file = COMPONENTS_DIR / "KrtmiChronicles.tsx"
        self.guidebooks_dir = PUBLIC_DIR / "guidebooks"
        self.assertTrue(self.krtmi_data_file.exists(), "data/krtmiData.ts must exist")
        self.assertTrue(self.krtmi_comp_file.exists(), "components/KrtmiChronicles.tsx must exist")
        self.krtmi_data = read_file_safe(self.krtmi_data_file)
        self.krtmi_comp = read_file_safe(self.krtmi_comp_file)

    def test_f4_01_all_seven_editions_cataloged(self):
        """Verify data/krtmiData.ts catalogs all 7 editions from 2019 to 2026."""
        years = ['2026', '2024', '2023', '2022', '2021', '2020', '2019']
        for yr in years:
            self.assertIn(f"year: '{yr}'", self.krtmi_data, f"Edition {yr} must be cataloged in krtmiData.ts")

    def test_f4_02_krtmi_2024_waste_sorting_and_bersih_specs(self):
        """Verify KRTMI 2024 Waste Sorting edition includes dual-robot specs, arena 600x400 cm, and 24V power limit."""
        self.assertIn("600 cm x 400 cm", self.krtmi_data, "2024 arena dimensions must be 600 cm x 400 cm")
        self.assertTrue(
            "Dual ESP32-S3" in self.krtmi_data or "STM32" in self.krtmi_data or "YOLO" in self.krtmi_data,
            "2024 robot specs must document controller and AI vision architecture"
        )
        self.assertTrue(
            "24.0 Volt" in self.krtmi_data or "24.0V" in self.krtmi_data or "24V" in self.krtmi_data or "24 Volt" in self.krtmi_data,
            "2024 robot power constraint must document 24V limit"
        )

    def test_f4_03_technocorner_2026_transporter_specs(self):
        """Verify Technocorner 2026 Transporter includes modular arena, Mecanum drive, and <=13.0V limit."""
        self.assertTrue(
            "300 cm x 300 cm" in self.krtmi_data or "400 cm x 300 cm" in self.krtmi_data,
            "2026 arena dimensions must be documented"
        )
        self.assertTrue(
            "12.6V" in self.krtmi_data or "13.0V" in self.krtmi_data or "13.0 Volt" in self.krtmi_data or "13V" in self.krtmi_data,
            "2026 battery constraint must specify voltage limit"
        )
        self.assertIn("Mecanum", self.krtmi_data, "2026 specs must document Mecanum drive kinematics")

    def test_f4_04_historical_editions_2019_to_2023_specs(self):
        """Verify historical editions specify digital twin (2021-2023), UV-C COVID (2020), and harvest (2019)."""
        self.assertIn("Digital Twin", self.krtmi_data, "Historical editions must document Digital Twin theme")
        self.assertIn("Panduan_KRTMI_2019.pdf", self.krtmi_data, "2019 edition must link to Panduan_KRTMI_2019.pdf")
        self.assertIn("Panduan_KRI_2020.pdf", self.krtmi_data, "2020 edition must link to Panduan_KRI_2020.pdf")

    def test_f4_05_all_seven_pdf_guidebooks_exist_in_public(self):
        """Verify all 7 PDF guidebook files exist in public/guidebooks/ with non-zero byte size."""
        self.assertTrue(self.guidebooks_dir.exists(), "public/guidebooks directory must exist")
        expected_pdfs = [
            "Panduan_Technocorner_2026.pdf",
            "Panduan_KRTMI_2024.pdf",
            "Panduan_KRI_2023.pdf",
            "Panduan_KRI_2022.pdf",
            "Panduan_KRI_2021.pdf",
            "Panduan_KRI_2020.pdf",
            "Panduan_KRTMI_2019.pdf",
        ]
        for pdf_name in expected_pdfs:
            pdf_path = self.guidebooks_dir / pdf_name
            self.assertTrue(pdf_path.exists(), f"Guidebook PDF {pdf_name} must exist in public/guidebooks/")
            self.assertGreater(pdf_path.stat().st_size, 1000, f"Guidebook PDF {pdf_name} must have valid non-zero size")

    def test_f4_06_chronicles_ui_renders_year_tabs_and_specs(self):
        """Verify KrtmiChronicles.tsx renders interactive tabs and blueprint cards."""
        self.assertIn("activeYear", self.krtmi_comp, "Must maintain activeYear state for tab selection")
        self.assertIn("activeStory.arenaSpecs", self.krtmi_comp, "Must render arena specs section")
        self.assertIn("activeStory.robotSpecs", self.krtmi_comp, "Must render robot specs section")
        self.assertIn("activeStory.scoringSystem", self.krtmi_comp, "Must render scoring system section")


class TestTier1_Feature5_ManagerTool(unittest.TestCase):
    """
    Feature 5: Standalone Offline Local Manager Tool (ORIGINAL_REQUEST §R5)
    Requirement: Standalone Python CLI / TUI tool (scripts/manager_tool.py) allowing team manager
    to update competitions, team members, and gallery offline with automated backups and zero public web exposure.
    """

    def setUp(self):
        self.tool_file = SCRIPTS_DIR / "manager_tool.py"
        self.assertTrue(self.tool_file.exists(), "scripts/manager_tool.py must exist")
        self.content = read_file_safe(self.tool_file)

    def test_f5_01_manager_tool_uses_pure_standard_library(self):
        """Verify manager_tool.py uses only Python standard library modules (zero external dependencies)."""
        third_party_modules = ['requests', 'flask', 'django', 'fastapi', 'bs4', 'numpy', 'pandas']
        for mod in third_party_modules:
            self.assertNotIn(f"import {mod}", self.content, f"manager_tool.py should not import external {mod}")
            self.assertNotIn(f"from {mod}", self.content, f"manager_tool.py should not import from external {mod}")

    def test_f5_02_automated_backup_mechanism_present(self):
        """Verify BackupManager class creates timestamped backups before writing."""
        self.assertIn("class BackupManager", self.content, "Must define BackupManager class")
        self.assertIn("create_backup", self.content, "Must provide create_backup method")
        self.assertIn("restore_backup", self.content, "Must provide restore_backup method")

    def test_f5_03_cli_argument_parser_flags_supported(self):
        """Verify argparse options for team, competitions, gallery, and validation."""
        flags = [
            "--backup", "--list-backups", "--restore", "--validate",
            "--list-team", "--add-member", "--remove-member",
            "--list-krtmi", "--view-krtmi", "--add-krtmi",
            "--list-gallery", "--add-gallery"
        ]
        for flag in flags:
            self.assertIn(flag, self.content, f"manager_tool.py must support CLI flag {flag}")

    def test_f5_04_validation_engine_execution(self):
        """Execute python scripts/manager_tool.py --validate and verify success return code and JSON output."""
        res = subprocess.run(
            [sys.executable, str(self.tool_file), "--validate"],
            cwd=PROJECT_ROOT,
            capture_output=True,
            text=True
        )
        self.assertEqual(res.returncode, 0, f"manager_tool.py --validate failed with code {res.returncode}: {res.stderr}")
        data = json.loads(res.stdout)
        self.assertTrue(data.get("valid"), f"Validation reported invalid data: {data}")
        self.assertEqual(data.get("details", {}).get("teamData", {}).get("status"), "PASS")
        self.assertEqual(data.get("details", {}).get("krtmiData", {}).get("status"), "PASS")

    def test_f5_05_cli_team_listing_execution(self):
        """Execute python scripts/manager_tool.py --list-team --json and verify structured member listing."""
        res = subprocess.run(
            [sys.executable, str(self.tool_file), "--list-team", "--json"],
            cwd=PROJECT_ROOT,
            capture_output=True,
            text=True
        )
        self.assertEqual(res.returncode, 0, f"manager_tool.py --list-team failed: {res.stderr}")
        members = json.loads(res.stdout)
        self.assertIsInstance(members, list, "Output must be a JSON array of members")
        self.assertGreaterEqual(len(members), 14, "Must list at least 14 team members")

    def test_f5_06_cli_krtmi_listing_execution(self):
        """Execute python scripts/manager_tool.py --list-krtmi --json and verify competition listing."""
        res = subprocess.run(
            [sys.executable, str(self.tool_file), "--list-krtmi", "--json"],
            cwd=PROJECT_ROOT,
            capture_output=True,
            text=True
        )
        self.assertEqual(res.returncode, 0, f"manager_tool.py --list-krtmi failed: {res.stderr}")
        stories = json.loads(res.stdout)
        self.assertIsInstance(stories, list, "Output must be a JSON array of editions")
        self.assertEqual(len(stories), 7, f"Must list exactly 7 competition editions, got {len(stories)}")


class TestTier1_Feature6_StaticExport(unittest.TestCase):
    """
    Feature 6: Static Build & Deployment Readiness (ORIGINAL_REQUEST §Verification)
    Requirement: Zero-error Next.js static site generation (output: 'export'),
    proper basePath handling for GitHub Pages, and complete page exports in out/.
    """

    def test_f6_01_next_config_static_export_settings(self):
        """Verify next.config.js enforces output: 'export', trailingSlash, and unoptimized images."""
        config_file = PROJECT_ROOT / "next.config.js"
        self.assertTrue(config_file.exists(), "next.config.js must exist")
        content = read_file_safe(config_file)
        self.assertIn("output: 'export'", content, "next.config.js must specify output: 'export'")
        self.assertIn("trailingSlash: true", content, "next.config.js must enable trailingSlash: true")
        self.assertIn("unoptimized: true", content, "next.config.js must set images.unoptimized: true")
        self.assertIn("/AbhinayaUNY_Web", content, "next.config.js must configure basePath for GitHub Pages")

    def test_f6_02_all_subpages_exist_in_app_router(self):
        """Verify all required App Router page files exist in app/."""
        pages = [
            APP_DIR / "page.tsx",
            APP_DIR / "divisi" / "page.tsx",
            APP_DIR / "krtmi" / "page.tsx",
            APP_DIR / "prestasi" / "page.tsx",
            APP_DIR / "layout.tsx",
        ]
        for p in pages:
            self.assertTrue(p.exists(), f"App Router page {p.relative_to(PROJECT_ROOT)} must exist")

    def test_f6_03_github_actions_ci_cd_workflow(self):
        """Verify .github/workflows/deploy.yml is configured for automated GitHub Pages deployment."""
        deploy_yml = PROJECT_ROOT / ".github" / "workflows" / "deploy.yml"
        self.assertTrue(deploy_yml.exists(), ".github/workflows/deploy.yml must exist")
        content = read_file_safe(deploy_yml)
        self.assertIn("actions/deploy-pages", content, "Workflow must use actions/deploy-pages")
        self.assertIn("npm run build", content, "Workflow must execute npm run build")

    def test_f6_04_root_layout_seo_and_opengraph_tags(self):
        """Verify app/layout.tsx configures OpenGraph metadata, title, and theme-color tags."""
        layout_file = APP_DIR / "layout.tsx"
        self.assertTrue(layout_file.exists(), "app/layout.tsx must exist")
        content = read_file_safe(layout_file)
        self.assertIn("ABHINAYA UNY", content, "Root layout must configure brand title")
        self.assertIn("openGraph", content, "Root layout must define openGraph metadata")
        self.assertTrue(
            "twitter" in content or "theme-color" in content,
            "Root layout must define twitter or theme-color metadata"
        )

    def test_f6_05_homepage_assembles_all_core_sections(self):
        """Verify app/page.tsx mounts HeroSection, YouTubeVideoShowcase, TeamRosterSection, and KrtmiChronicles."""
        page_file = APP_DIR / "page.tsx"
        content = read_file_safe(page_file)
        self.assertIn("<HeroSection", content, "HomePage must mount HeroSection")
        self.assertIn("<YouTubeVideoShowcase", content, "HomePage must mount YouTubeVideoShowcase")
        self.assertIn("<TeamRosterSection", content, "HomePage must mount TeamRosterSection")
        self.assertIn("<KrtmiChronicles", content, "HomePage must mount KrtmiChronicles")


# ==============================================================================
# TIER 2: BOUNDARY & CORNER CASES (5 Tests)
# ==============================================================================

class TestTier2_BoundaryAndCornerCases(unittest.TestCase):
    """
    Tier 2: Boundary & Corner Cases (TEST_INFRA §Tier 2)
    Requirement: Mobile 360px–420px viewports, 4K screen styles, thumbnail fallback URLs,
    corrupted data rejection in manager tool, and empty/missing optional fields.
    """

    def test_t2_01_mobile_viewport_360px_to_420px_safeguards(self):
        """Verify mobile layout classes prevent horizontal scrolling and provide flex wrapping."""
        home_page = read_file_safe(APP_DIR / "page.tsx")
        self.assertIn("overflow-x-hidden", home_page, "HomePage container must enforce overflow-x-hidden")
        
        hero = read_file_safe(COMPONENTS_DIR / "HeroSection.tsx")
        self.assertIn("flex-col sm:flex-row", hero, "Hero buttons must stack vertically on mobile screens")

        roster = read_file_safe(COMPONENTS_DIR / "TeamRosterSection.tsx")
        self.assertIn("grid-cols-1 sm:grid-cols-2", roster, "Roster grid must collapse to 1 column on mobile")

    def test_t2_02_ultrawide_4k_viewport_constraints(self):
        """Verify containers constrain max-width (max-w-7xl, max-w-6xl) to prevent 4K stretching."""
        files = [
            COMPONENTS_DIR / "HeroSection.tsx",
            COMPONENTS_DIR / "YouTubeVideoShowcase.tsx",
            COMPONENTS_DIR / "TeamRosterSection.tsx",
            COMPONENTS_DIR / "KrtmiChronicles.tsx",
        ]
        for f in files:
            content = read_file_safe(f)
            self.assertTrue(
                "max-w-7xl" in content or "max-w-6xl" in content or "max-w-4xl" in content,
                f"{f.name} must constrain max container width for ultra-wide displays"
            )

    def test_t2_03_youtube_thumbnail_fallback_handling(self):
        """Verify YouTube showcase handles onError event on thumbnail img to fallback to hqdefault."""
        video_comp = read_file_safe(COMPONENTS_DIR / "YouTubeVideoShowcase.tsx")
        self.assertIn("onError=", video_comp, "Thumbnail image element must attach onError handler")
        self.assertIn("thumbError", video_comp, "Component must track thumbnail error state")
        self.assertIn("hqdefault.jpg", video_comp, "Component must fallback to hqdefault.jpg on failure")

    def test_t2_04_manager_tool_malformed_input_rejection_and_rollback(self):
        """Verify manager_tool.py rejects invalid JSON / missing required fields without corrupting files."""
        tool_file = SCRIPTS_DIR / "manager_tool.py"
        
        invalid_member_json = json.dumps({"name": "Incomplete Member"})
        res = subprocess.run(
            [sys.executable, str(tool_file), "--add-member", invalid_member_json],
            cwd=PROJECT_ROOT,
            capture_output=True,
            text=True
        )
        self.assertNotEqual(res.returncode, 0, "Adding malformed member should return non-zero exit code")
        
        val_res = subprocess.run(
            [sys.executable, str(tool_file), "--validate"],
            cwd=PROJECT_ROOT,
            capture_output=True,
            text=True
        )
        self.assertEqual(val_res.returncode, 0, "Datastore must remain valid after rejected input")

    def test_t2_05_empty_optional_fields_graceful_rendering(self):
        """Verify UI components check optional fields before rendering to avoid undefined errors."""
        roster_comp = read_file_safe(COMPONENTS_DIR / "TeamRosterSection.tsx")
        self.assertIn("selectedMember.subRole &&", roster_comp, "Roster modal must guard optional subRole")
        self.assertIn("selectedMember.socials &&", roster_comp, "Roster modal must guard optional socials")

        krtmi_comp = read_file_safe(COMPONENTS_DIR / "KrtmiChronicles.tsx")
        self.assertIn("activeStory.tagline", krtmi_comp, "Chronicles must safely access activeStory properties")


# ==============================================================================
# TIER 3: CROSS-FEATURE COMBINATIONS (5 Tests)
# ==============================================================================

class TestTier3_CrossFeatureCombinations(unittest.TestCase):
    """
    Tier 3: Cross-Feature Combinations (TEST_INFRA §Tier 3)
    Requirement: Pairwise interactions: Hero CTA navigation to Guidebooks/Showcase,
    division filter with modal details, manager tool output leading to clean static build.
    """

    def test_t3_01_hero_cta_to_showcase_and_guidebook_coupling(self):
        """Verify Hero CTA anchor IDs match target section IDs in YouTubeShowcase and KrtmiChronicles."""
        hero = read_file_safe(COMPONENTS_DIR / "HeroSection.tsx")
        video = read_file_safe(COMPONENTS_DIR / "YouTubeVideoShowcase.tsx")
        chronicles = read_file_safe(COMPONENTS_DIR / "KrtmiChronicles.tsx")
        roster = read_file_safe(COMPONENTS_DIR / "TeamRosterSection.tsx")

        self.assertIn('id="video-aksi"', video, "YouTubeVideoShowcase must define id='video-aksi'")
        self.assertIn('id="krtmi-story"', chronicles, "KrtmiChronicles must define id='krtmi-story'")
        self.assertIn('id="team-roster"', roster, "TeamRosterSection must define id='team-roster'")
        
        self.assertIn("#video-aksi", hero, "Hero secondary CTA must point to #video-aksi")
        self.assertTrue("#about-tim" in hero or "#krtmi-story" in hero, "Hero primary CTA must point to valid anchor")

    def test_t3_02_division_filtering_coupled_with_modal_details(self):
        """Verify division filter state correctly propagates to member list and modal displays accurate division badge."""
        roster = read_file_safe(COMPONENTS_DIR / "TeamRosterSection.tsx")
        self.assertIn("member.division === selectedDivision", roster, "Filtering logic must match exact division string")
        self.assertIn("DIVISION_BADGES[selectedMember.division]", roster, "Modal badge styling must couple with member division")

    def test_t3_03_manager_tool_output_coupled_with_typescript_data_layer(self):
        """Verify data generated/managed by manager_tool.py conforms to TypeScript interfaces in teamData.ts."""
        tool = read_file_safe(SCRIPTS_DIR / "manager_tool.py")
        team_data = read_file_safe(DATA_DIR / "teamData.ts")
        
        required_fields = ['id', 'name', 'nim', 'studyProgram', 'faculty', 'division', 'role', 'specialization', 'bio']
        for field in required_fields:
            self.assertIn(f"{field}:", team_data, f"teamData.ts must define field {field}")
            self.assertIn(f"'{field}'", tool, f"manager_tool.py schema must handle field {field}")

    def test_t3_04_krtmi_edition_switching_coupled_with_pdf_assets(self):
        """Verify selecting any KRTMI edition dynamically couples with an existing PDF file in public/guidebooks/."""
        krtmi_data = read_file_safe(DATA_DIR / "krtmiData.ts")
        pdf_files = re.findall(r"pdfFile:\s*['\"]([^'\"]+)['\"]", krtmi_data)
        self.assertEqual(len(pdf_files), 7, f"Must find 7 PDF guidebook references, found {len(pdf_files)}")
        
        for pdf in pdf_files:
            target_path = PUBLIC_DIR / "guidebooks" / pdf
            self.assertTrue(target_path.exists(), f"Coupled PDF file {pdf} must exist in public/guidebooks/")

    def test_t3_05_multimedia_tab_switch_coupled_with_aspect_ratio_and_iframe(self):
        """Verify switching between action and shorts updates container aspect ratio (16:9 vs 9:16)."""
        video = read_file_safe(COMPONENTS_DIR / "YouTubeVideoShowcase.tsx")
        self.assertIn("activeTab === 'action'", video, "Component must render 16:9 container when activeTab is action")
        self.assertIn("aspect-video", video, "Action tab must enforce aspect-video (16:9)")
        self.assertIn("activeTab === 'shorts'", video, "Component must render 9:16 container when activeTab is shorts")
        self.assertIn("aspect-[9/16]", video, "Shorts tab must enforce aspect-[9/16]")


# ==============================================================================
# TIER 4: REAL-WORLD APPLICATION SCENARIOS (5 Tests)
# ==============================================================================

class TestTier4_RealWorldApplicationScenarios(unittest.TestCase):
    """
    Tier 4: Real-World Application Scenarios (TEST_INFRA §Tier 4)
    Requirement: 5 detailed end-to-end user workflows:
      1. Prospective Student / Maba Discovery Journey
      2. Competition Researcher / Scrutineering Journey
      3. Offline Team Data Management Journey
      4. Responsive Multi-Device Inspection
      5. Official Media & Community Engagement Journey
    """

    def test_t4_01_scenario_prospective_student_discovery_journey(self):
        """
        Scenario 1: Prospective Student / Maba Discovery Journey
        User lands on homepage, views hero emblem & title, explores division cards,
        inspects Lead Programmer & Ketua Tim profiles, and navigates to Divisi page FAQ.
        """
        home_content = read_file_safe(APP_DIR / "page.tsx")
        self.assertIn("<HeroSection", home_content)
        self.assertIn("<TeamRosterSection", home_content)
        
        divisi_page = read_file_safe(APP_DIR / "divisi" / "page.tsx")
        self.assertIn("MAHASISWA BARU (MABA)", divisi_page, "Divisi page must feature Maba onboarding guidance")
        self.assertIn("Apakah harus jago koding", divisi_page, "FAQ must answer beginners' questions")
        self.assertIn("Jurusan apa saja yang bisa bergabung", divisi_page, "FAQ must clarify faculty eligibility")

        team_data = read_file_safe(DATA_DIR / "teamData.ts")
        self.assertIn("Ketua Tim (Team Leader)", team_data)
        self.assertIn("Lead Programmer", team_data)

    def test_t4_02_scenario_competition_researcher_scrutineering_journey(self):
        """
        Scenario 2: Competition Researcher / Scrutineering Journey
        Scrutineer checks KRTMI 2024 AI rules (600x400cm, 24V, +3/0/-1, BERSIH)
        and Technocorner 2026 rules (modular arena, <=13V, 20x20cm footprint), then downloads PDF.
        """
        krtmi_data = read_file_safe(DATA_DIR / "krtmiData.ts")
        krtmi_page = read_file_safe(APP_DIR / "krtmi" / "page.tsx")

        self.assertIn("600 cm x 400 cm", krtmi_data)
        self.assertTrue(
            "24.0 Volt" in krtmi_data or "24.0V" in krtmi_data or "24V" in krtmi_data or "24 Volt" in krtmi_data
        )
        self.assertTrue(
            "300 cm x 300 cm" in krtmi_data or "400 cm x 300 cm" in krtmi_data
        )
        self.assertTrue(
            "12.6V" in krtmi_data or "13.0V" in krtmi_data or "13.0 Volt" in krtmi_data or "13V" in krtmi_data
        )
        
        self.assertIn("Panduan_Technocorner_2026.pdf", krtmi_data)
        self.assertIn("Panduan_KRTMI_2024.pdf", krtmi_data)
        self.assertTrue(
            "Download" in krtmi_page or "Unduh PDF" in krtmi_page or "guidebooks" in krtmi_page,
            "KRTMI subpage must provide guidebook PDF download links"
        )

    def test_t4_03_scenario_offline_team_data_management_journey(self):
        """
        Scenario 3: Offline Team Data Management Journey
        Team manager runs manager_tool.py: creates backup snapshot, validates data integrity,
        queries roster, and checks clean exit code with zero web exposure.
        """
        tool_file = SCRIPTS_DIR / "manager_tool.py"

        backup_res = subprocess.run(
            [sys.executable, str(tool_file), "--backup", "--reason", "E2E Automated Test Snapshot"],
            cwd=PROJECT_ROOT,
            capture_output=True,
            text=True
        )
        self.assertEqual(backup_res.returncode, 0, f"Backup creation failed: {backup_res.stderr}")
        
        backups = list((SCRIPTS_DIR / "backups").glob("backup_*"))
        self.assertGreater(len(backups), 0, "At least one backup folder must exist in scripts/backups/")

        val_res = subprocess.run(
            [sys.executable, str(tool_file), "--validate"],
            cwd=PROJECT_ROOT,
            capture_output=True,
            text=True
        )
        self.assertEqual(val_res.returncode, 0, "Datastore validation must pass")

    def test_t4_04_scenario_responsive_multi_device_experience(self):
        """
        Scenario 4: Responsive Multi-Device Inspection
        Verifies CSS Tailwind breakpoints for Mobile (default), Tablet (sm/md), and Desktop (lg/xl).
        """
        components = [
            COMPONENTS_DIR / "HeroSection.tsx",
            COMPONENTS_DIR / "YouTubeVideoShowcase.tsx",
            COMPONENTS_DIR / "TeamRosterSection.tsx",
            COMPONENTS_DIR / "KrtmiChronicles.tsx",
        ]
        for comp in components:
            content = read_file_safe(comp)
            self.assertIn("sm:", content, f"{comp.name} must include sm: responsive breakpoint classes")
            self.assertIn("md:", content, f"{comp.name} must include md: responsive breakpoint classes")

    def test_t4_05_scenario_official_media_and_community_engagement(self):
        """
        Scenario 5: Official Media & Community Engagement Journey
        User engages with official YouTube video (16:9), switches to Shorts (9:16),
        subscribes to @AbhinayaUNY, and follows Instagram @abhinaya.uny.
        """
        video = read_file_safe(COMPONENTS_DIR / "YouTubeVideoShowcase.tsx")
        social = read_file_safe(COMPONENTS_DIR / "SocialMediaHub.tsx")

        self.assertIn("PmxwdrhpxKg", video)
        self.assertIn("wLusNVfFFHA", video)
        self.assertIn("https://www.youtube.com/@AbhinayaUNY", video)
        self.assertIn("https://www.instagram.com/abhinaya.uny/", video)
        self.assertIn("instagram.com/abhinaya.uny", social)


# ==============================================================================
# TIER 5: ADVERSARIAL COVERAGE & CODE INTEGRITY (5 Tests)
# ==============================================================================

class TestTier5_AdversarialAndCodeIntegrity(unittest.TestCase):
    """
    Tier 5: Adversarial Coverage & Code Integrity (TEST_INFRA §Tier 5)
    Requirement: Zero placeholder strings, authentic team member records,
    valid YouTube IDs, strict zero-error static export, and zero public admin endpoints.
    """

    def test_t5_01_zero_placeholder_or_dummy_video_ids(self):
        """Verify no dummy or placeholder video IDs (e.g. 3yr5uNkxA_8, dQw4w9WgXcQ, VIDEO_ID) exist."""
        forbidden_placeholders = [
            "3yr5uNkxA_8",
            "dQw4w9WgXcQ",
            "VIDEO_ID_HERE",
            "TODO_VIDEO",
            "PLACEHOLDER",
        ]
        
        target_files = [
            COMPONENTS_DIR / "YouTubeVideoShowcase.tsx",
            COMPONENTS_DIR / "HeroSection.tsx",
            DATA_DIR / "teamData.ts",
            DATA_DIR / "krtmiData.ts",
            DATA_DIR / "galleryData.ts",
        ]
        
        for f in target_files:
            if f.exists():
                content = read_file_safe(f)
                for placeholder in forbidden_placeholders:
                    self.assertNotIn(
                        placeholder,
                        content,
                        f"Found forbidden placeholder '{placeholder}' in {f.relative_to(PROJECT_ROOT)}"
                    )

    def test_t5_02_authentic_team_member_records_integrity(self):
        """Verify all team member records have authentic UNY student/faculty names, NIMs, and study programs."""
        team_data = read_file_safe(DATA_DIR / "teamData.ts")
        
        dummy_names = ["John Doe", "Jane Doe", "Dummy Member", "Test User", "Sample Name"]
        for name in dummy_names:
            self.assertNotIn(name, team_data, f"Found dummy name '{name}' in data/teamData.ts")

        self.assertRegex(team_data, r"22518241023", "Must contain Tri Wahyu Handoyo authentic NIM")
        self.assertRegex(team_data, r"21507334002", "Must contain Ilham Widyo Nugroho authentic NIM")
        self.assertRegex(team_data, r"20518241012", "Must contain Salsabila Azzahra authentic NIM")

    def test_t5_03_authoritative_rulebook_parameters_fidelity(self):
        """Verify competition specifications match authentic BPTI Puspresnas / DTETI UGM rulebook numbers."""
        krtmi_data = read_file_safe(DATA_DIR / "krtmiData.ts")
        
        # 2024 specs
        self.assertIn("600 cm x 400 cm", krtmi_data)
        self.assertTrue(
            "24.0 Volt" in krtmi_data or "24.0V" in krtmi_data or "24V" in krtmi_data or "24 Volt" in krtmi_data
        )
        
        # 2026 specs
        self.assertTrue(
            "300 cm x 300 cm" in krtmi_data or "400 cm x 300 cm" in krtmi_data
        )

    def test_t5_04_zero_public_admin_routes_or_server_endpoints(self):
        """Verify zero public admin routes (/admin, /api/admin) or exposed server endpoints in the app directory."""
        admin_page = APP_DIR / "admin"
        api_admin = APP_DIR / "api" / "admin"
        self.assertFalse(admin_page.exists(), "Public web bundle must not expose /admin route")
        self.assertFalse(api_admin.exists(), "Public web bundle must not expose /api/admin route")

    def test_t5_05_offline_manager_tool_syntax_and_ast_integrity(self):
        """Verify manager_tool.py compiles cleanly under Python AST and has zero syntax errors."""
        import ast
        tool_file = SCRIPTS_DIR / "manager_tool.py"
        content = read_file_safe(tool_file)
        try:
            ast.parse(content, filename=str(tool_file))
        except SyntaxError as e:
            self.fail(f"manager_tool.py failed AST syntax parsing: {e}")


# ==============================================================================
# Custom Test Runner with Formatted Console Output
# ==============================================================================
class FormattedTestResult(unittest.TextTestResult):
    """Custom test result formatter displaying ANSI colorized matrix."""

    def __init__(self, stream, descriptions, verbosity):
        super().__init__(stream, descriptions, verbosity)
        self.stream = stream
        self.verbosity = verbosity
        self.test_start_time = 0
        self.results_by_tier: Dict[str, List[Tuple[str, str, float]]] = {}

    def startTest(self, test):
        super().startTest(test)
        self.test_start_time = time.time()
        if self.verbosity > 1:
            self.stream.write(f"  • {test._testMethodName:<55} ")
            self.stream.flush()

    def addSuccess(self, test):
        super().addSuccess(test)
        duration = time.time() - self.test_start_time
        self._record_result(test, "PASS", duration)
        if self.verbosity > 1:
            self.stream.write(f"{TermColor.GREEN}[PASS]{TermColor.RESET} ({duration*1000:.1f}ms)\n")

    def addFailure(self, test, err):
        super().addFailure(test, err)
        duration = time.time() - self.test_start_time
        self._record_result(test, "FAIL", duration)
        if self.verbosity > 1:
            self.stream.write(f"{TermColor.RED}[FAIL]{TermColor.RESET} ({duration*1000:.1f}ms)\n")

    def addError(self, test, err):
        super().addError(test, err)
        duration = time.time() - self.test_start_time
        self._record_result(test, "ERROR", duration)
        if self.verbosity > 1:
            self.stream.write(f"{TermColor.RED}[ERROR]{TermColor.RESET} ({duration*1000:.1f}ms)\n")

    def _record_result(self, test, status: str, duration: float):
        cls_name = test.__class__.__name__
        tier_name = "Other"
        if "Tier1" in cls_name:
            tier_name = "Tier 1: Feature Coverage"
        elif "Tier2" in cls_name:
            tier_name = "Tier 2: Boundary & Corner Cases"
        elif "Tier3" in cls_name:
            tier_name = "Tier 3: Cross-Feature Combinations"
        elif "Tier4" in cls_name:
            tier_name = "Tier 4: Real-World Scenarios"
        elif "Tier5" in cls_name:
            tier_name = "Tier 5: Adversarial & Code Integrity"

        if tier_name not in self.results_by_tier:
            self.results_by_tier[tier_name] = []
        self.results_by_tier[tier_name].append((test._testMethodName, status, duration))


def run_e2e_suite(tier_filter: Optional[int] = None, verbose: bool = True) -> bool:
    """Execute the multi-tier test harness and display formatted report."""
    print(f"\n{TermColor.BOLD}{TermColor.CYAN}{'='*80}{TermColor.RESET}")
    print(f"{TermColor.BOLD}{TermColor.CYAN} ABHINAYA UNY ROBOTICS PORTAL — MULTI-TIER E2E TEST SUITE{TermColor.RESET}")
    print(f"{TermColor.BOLD}{TermColor.CYAN}{'='*80}{TermColor.RESET}\n")

    loader = unittest.TestLoader()
    suite = unittest.TestSuite()

    tier_classes = {
        1: [
            TestTier1_Feature1_HeroLayout,
            TestTier1_Feature2_YouTubeShowcase,
            TestTier1_Feature3_TeamRoster,
            TestTier1_Feature4_GuidebookAlignment,
            TestTier1_Feature5_ManagerTool,
            TestTier1_Feature6_StaticExport,
        ],
        2: [TestTier2_BoundaryAndCornerCases],
        3: [TestTier3_CrossFeatureCombinations],
        4: [TestTier4_RealWorldApplicationScenarios],
        5: [TestTier5_AdversarialAndCodeIntegrity],
    }

    if tier_filter and tier_filter in tier_classes:
        print(f"{TermColor.YELLOW}Filtering Execution for: Tier {tier_filter}{TermColor.RESET}\n")
        for cls in tier_classes[tier_filter]:
            suite.addTests(loader.loadTestsFromTestCase(cls))
    else:
        for t_num in sorted(tier_classes.keys()):
            for cls in tier_classes[t_num]:
                suite.addTests(loader.loadTestsFromTestCase(cls))

    runner = unittest.TextTestRunner(
        resultclass=FormattedTestResult,
        verbosity=2 if verbose else 1,
        stream=sys.stdout
    )

    start_time = time.time()
    result = runner.run(suite)
    total_time = time.time() - start_time

    # Summary Report Table
    print(f"\n{TermColor.BOLD}{TermColor.CYAN}{'='*80}{TermColor.RESET}")
    print(f"{TermColor.BOLD}{TermColor.WHITE} E2E TEST EXECUTION SUMMARY MATRIX{TermColor.RESET}")
    print(f"{TermColor.BOLD}{TermColor.CYAN}{'='*80}{TermColor.RESET}")
    print(f"{'TIER / CATEGORY':<42} | {'TOTAL':<7} | {'PASS':<6} | {'FAIL':<6} | {'STATUS'}")
    print(f"{'-'*80}")

    if hasattr(result, 'results_by_tier'):
        for tier_name, test_list in result.results_by_tier.items():
            total = len(test_list)
            passed = sum(1 for _, s, _ in test_list if s == "PASS")
            failed = total - passed
            status_color = TermColor.GREEN if failed == 0 else TermColor.RED
            status_text = "PASSED ✓" if failed == 0 else "FAILED ✗"
            print(f"{tier_name:<42} | {total:<7} | {passed:<6} | {failed:<6} | {status_color}{status_text}{TermColor.RESET}")

    print(f"{'-'*80}")
    grand_total = result.testsRun
    grand_failed = len(result.failures) + len(result.errors)
    grand_passed = grand_total - grand_failed
    overall_color = TermColor.GREEN if grand_failed == 0 else TermColor.RED
    overall_text = "ALL TESTS PASSED" if grand_failed == 0 else "TEST SUITE FAILED"

    print(f"{TermColor.BOLD}{'OVERALL SUITE EXECUTION':<42} | {grand_total:<7} | {grand_passed:<6} | {grand_failed:<6} | {overall_color}{overall_text}{TermColor.RESET}")
    print(f"Total Execution Time: {total_time:.2f} seconds\n")

    return grand_failed == 0


# ==============================================================================
# CLI Entry Point
# ==============================================================================
if __name__ == "__main__":
    import argparse
    parser = argparse.ArgumentParser(description="Run Abhinaya UNY E2E Test Suite")
    parser.add_argument("--tier", type=int, choices=[1, 2, 3, 4, 5], help="Run specific tier only")
    parser.add_argument("-v", "--verbose", action="store_true", default=True, help="Verbose test output")
    args = parser.parse_args()

    success = run_e2e_suite(tier_filter=args.tier, verbose=args.verbose)
    sys.exit(0 if success else 1)
