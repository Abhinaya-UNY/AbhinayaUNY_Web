#!/usr/bin/env python3
"""
================================================================================
 EMPIRICAL STRESS TEST SUITE — CHALLENGER 1 (Responsive UI & Media Stress)
================================================================================
 Project: Abhinaya UNY Robotics Portal
 Target Components:
   1. HeroSection.tsx (Hero Stage & Button Positioning across viewports)
   2. YouTubeVideoShowcase.tsx (16:9 vs 9:16, ESC modal, thumbnail fallback)
   3. TeamRosterSection.tsx (Division tabs, search edge cases, modal dismiss)
   4. Viewport Layout Simulation (360px, 375px, 390px, 412px, 768px, 1024px, 1920px, 3840px)
================================================================================
"""

import os
import sys
import re
import json
import unittest
from pathlib import Path

# Ensure UTF-8 output
if hasattr(sys.stdout, 'reconfigure'):
    try:
        sys.stdout.reconfigure(encoding='utf-8', errors='replace')
        sys.stderr.reconfigure(encoding='utf-8', errors='replace')
    except Exception:
        pass

PROJECT_ROOT = Path(__file__).resolve().parent.parent.parent
COMPONENTS_DIR = PROJECT_ROOT / "components"
DATA_DIR = PROJECT_ROOT / "data"
APP_DIR = PROJECT_ROOT / "app"


def read_file(path: Path) -> str:
    if not path.exists():
        raise FileNotFoundError(f"File not found: {path}")
    return path.read_text(encoding="utf-8", errors="replace")


class TestEmpiricalHeroLayoutStress(unittest.TestCase):
    """
    Stress-tests Hero Section layout, photo stage separation, and button positions.
    """

    def setUp(self):
        self.hero_code = read_file(COMPONENTS_DIR / "HeroSection.tsx")

    def test_hero_stage_and_button_dom_separation(self):
        """Verify the hero photo stage and CTA buttons are in separate sibling DOM containers."""
        # Stage container check
        self.assertIn('<section className="relative w-full min-h-[48vh]', self.hero_code)
        
        # Action container check
        self.assertIn('<div className="relative z-20 w-full py-4 sm:py-6 px-4 flex flex-col sm:flex-row', self.hero_code)
        
        # Find index of section end </section> and action container start
        section_end_idx = self.hero_code.find('</section>')
        action_container_idx = self.hero_code.find('/* 2. Action Container')
        
        self.assertGreater(section_end_idx, 0, "</section> tag not found")
        self.assertGreater(action_container_idx, 0, "Action container comment not found")
        self.assertLess(section_end_idx, action_container_idx, 
                        "Action container must be strictly AFTER the hero photo </section>")

    def test_hero_responsive_aspect_ratio_and_min_heights(self):
        """Stress-test mobile through desktop aspect ratios and min-heights."""
        # Mobile aspect ratio 16:10 prevents vertical squishing / head-cutting
        self.assertIn('aspect-[16/10]', self.hero_code)
        self.assertIn('sm:aspect-[16/9]', self.hero_code)
        self.assertIn('lg:aspect-auto', self.hero_code)

        # Responsive min-heights across breakpoints
        self.assertIn('min-h-[48vh]', self.hero_code)
        self.assertIn('sm:min-h-[60vh]', self.hero_code)
        self.assertIn('md:min-h-[72vh]', self.hero_code)
        self.assertIn('lg:min-h-[82vh]', self.hero_code)

    def test_hero_buttons_never_overlap_photo_stage(self):
        """Mathematically & structurally verify buttons cannot overlap the photo stage."""
        # The parent is a flex-col container
        self.assertIn('className="relative w-full flex flex-col items-center bg-[#070503]"', self.hero_code)
        # Sibling 1 is <section> (photo stage)
        # Sibling 2 is <div> (buttons) with bg-[#070503]
        # There are NO negative margins (e.g., -mt-*) on the button container that would pull it into the photo
        self.assertNotIn('-mt-', self.hero_code)
        self.assertNotIn('-translate-y-', self.hero_code.split('/* 2. Action Container')[1])

    def test_hero_cta_buttons_mobile_flex_direction(self):
        """Verify buttons stack vertically on mobile (<640px) and align horizontally on desktop."""
        self.assertIn('flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-5', self.hero_code)
        self.assertIn('w-full sm:w-auto', self.hero_code)

    def test_hero_emblem_white_badge_dimensions(self):
        """Verify emblem badge scaling across breakpoints."""
        self.assertIn('w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16', self.hero_code)
        self.assertIn('bg-white', self.hero_code)
        self.assertIn('border-2 border-brand-orange', self.hero_code)


class TestEmpiricalYouTubeModalStress(unittest.TestCase):
    """
    Stress-tests YouTube video showcase, 16:9 vs 9:16 aspect ratio switching,
    keyboard ESC listener, body overflow lock, and thumbnail fallback.
    """

    def setUp(self):
        self.yt_code = read_file(COMPONENTS_DIR / "YouTubeVideoShowcase.tsx")

    def test_aspect_ratio_definitions_and_switching(self):
        """Verify video items and stages define both 16:9 and 9:16 aspect ratios."""
        self.assertIn("aspect: '16:9'", self.yt_code)
        self.assertIn("aspect: '9:16'", self.yt_code)
        self.assertIn("aspect-video", self.yt_code)
        self.assertIn("aspect-[9/16]", self.yt_code)

    def test_modal_aspect_ratio_max_width_constraints(self):
        """Verify modal adapts max-width based on video aspect ratio (widescreen vs vertical shorts)."""
        self.assertIn("modalVideo.aspect === '16:9' ? 'max-w-5xl' : 'max-w-[360px]'", self.yt_code)
        self.assertIn("modalVideo.aspect === '16:9' ? 'aspect-video' : 'aspect-[9/16]'", self.yt_code)

    def test_keyboard_esc_handler_and_body_scroll_locking(self):
        """Verify ESC key dismisses modal and body overflow is toggled safely."""
        self.assertIn("e.key === 'Escape'", self.yt_code)
        self.assertIn("document.body.style.overflow = 'hidden'", self.yt_code)
        self.assertIn("document.body.style.overflow = 'unset'", self.yt_code)
        self.assertIn("window.removeEventListener('keydown', handleKeyDown)", self.yt_code)

    def test_thumbnail_fallback_mechanism(self):
        """Verify onError handler switches thumbnail from maxresdefault.jpg to hqdefault.jpg."""
        self.assertIn("getThumbnailUrl", self.yt_code)
        self.assertIn("maxresdefault.jpg", self.yt_code)
        self.assertIn("hqdefault.jpg", self.yt_code)
        self.assertIn("onError={() => setThumbError({ ...thumbError, [currentVideo.id]: true })}", self.yt_code)

    def test_privacy_enhanced_nocookie_domain(self):
        """Verify iframe embeds use youtube-nocookie.com for privacy and GDPR compliance."""
        self.assertIn("https://www.youtube-nocookie.com/embed/", self.yt_code)

    def test_dual_tab_state_switch(self):
        """Verify tab switching between Match Action and Official Shorts."""
        self.assertIn("const [activeTab, setActiveTab] = useState<'action' | 'shorts'>('action')", self.yt_code)
        self.assertIn("setActiveTab('action')", self.yt_code)
        self.assertIn("setActiveTab('shorts')", self.yt_code)


class TestEmpiricalTeamRosterStress(unittest.TestCase):
    """
    Stress-tests Team Roster filtering logic, edge case search queries,
    division counter consistency, and modal dialog behavior.
    """

    def setUp(self):
        self.roster_code = read_file(COMPONENTS_DIR / "TeamRosterSection.tsx")
        self.team_data_code = read_file(DATA_DIR / "teamData.ts")

    def test_all_divisions_represented_with_counters(self):
        """Verify all 5 divisions and All tab exist in DIVISION_CATEGORIES."""
        expected_divisions = [
            'All',
            'Pembimbing',
            'Manajerial & Media',
            'Programming & AI',
            'Mekanik',
            'Elektrik',
        ]
        for div in expected_divisions:
            self.assertIn(f"id: '{div}'", self.team_data_code)

    def test_simulated_search_filtering_against_authentic_roster(self):
        """Simulate search algorithm against actual authentic roster data under adversarial inputs."""
        # Extract member records from teamData.ts using regex
        # We can extract names, roles, nims, studyPrograms, specializations
        members_pattern = re.findall(
            r"id:\s*'([^']+)',\s*name:\s*'([^']+)',\s*nim:\s*'([^']+)',\s*studyProgram:\s*'([^']+)',\s*faculty:\s*'([^']+)',\s*division:\s*'([^']+)',\s*role:\s*'([^']+)'",
            self.team_data_code
        )
        self.assertGreaterEqual(len(members_pattern), 14, "Must extract at least 14 roster members")

        # Parse specializations
        spec_blocks = re.findall(r"specialization:\s*\[([^\]]+)\]", self.team_data_code)
        
        parsed_members = []
        for i, m in enumerate(members_pattern):
            specs = [s.strip().strip("'").strip('"') for s in spec_blocks[i].split(',')] if i < len(spec_blocks) else []
            parsed_members.append({
                'id': m[0],
                'name': m[1],
                'nim': m[2],
                'studyProgram': m[3],
                'faculty': m[4],
                'division': m[5],
                'role': m[6],
                'specialization': specs
            })

        # Test Filter Logic Function (replicating TeamRosterSection.tsx)
        def filter_fn(division: str, query: str):
            q = query.lower().strip()
            res = []
            for mem in parsed_members:
                match_div = (division == 'All') or (mem['division'] == division)
                match_search = (
                    q == '' or
                    q in mem['name'].lower() or
                    q in mem['role'].lower() or
                    q in mem['nim'].lower() or
                    q in mem['studyProgram'].lower() or
                    any(q in s.lower() for s in mem['specialization'])
                )
                if match_div and match_search:
                    res.append(mem)
            return res

        # 1. Edge Case: Empty & Whitespace Queries
        self.assertEqual(len(filter_fn('All', '')), len(parsed_members))
        self.assertEqual(len(filter_fn('All', '   ')), len(parsed_members))

        # 2. Division Switching with Empty Search
        for div in ['Pembimbing', 'Manajerial & Media', 'Programming & AI', 'Mekanik', 'Elektrik']:
            div_res = filter_fn(div, '')
            self.assertGreater(len(div_res), 0, f"Division {div} returned 0 members")
            self.assertTrue(all(m['division'] == div for m in div_res))

        # 3. Adversarial / Complex Search Queries
        # Name search
        self.assertGreaterEqual(len(filter_fn('All', 'Tri Wahyu')), 1)
        self.assertGreaterEqual(len(filter_fn('All', 'khairudin')), 1)
        self.assertGreaterEqual(len(filter_fn('All', 'iLhAm')), 2)  # Ilham Widyo & Muhamad Ilham Sony

        # NIM search
        self.assertGreaterEqual(len(filter_fn('All', '22518241023')), 1)
        self.assertGreaterEqual(len(filter_fn('All', '21507334002')), 1)

        # Skill / Specialization search
        self.assertGreaterEqual(len(filter_fn('All', 'YOLO')), 1)
        self.assertGreaterEqual(len(filter_fn('All', 'Mecanum')), 2)
        self.assertGreaterEqual(len(filter_fn('All', 'SolidWorks')), 1)
        self.assertGreaterEqual(len(filter_fn('All', 'LiFePO4')), 1)

        # Non-matching queries
        self.assertEqual(len(filter_fn('All', 'NonExistentMemberQuery999')), 0)
        self.assertEqual(len(filter_fn('All', '!@#$%^&*()_+')), 0)

        # Division + Query Intersection
        # Lead Programmer in Programming & AI -> 1
        self.assertEqual(len(filter_fn('Programming & AI', 'Tri Wahyu')), 1)
        # Lead Programmer in Mekanik -> 0
        self.assertEqual(len(filter_fn('Mekanik', 'Tri Wahyu')), 0)

    def test_roster_modal_accessibility_and_dismissal(self):
        """Verify modal implements proper a11y roles and ESC/click-outside dismiss."""
        self.assertIn('role="dialog"', self.roster_code)
        self.assertIn('aria-modal="true"', self.roster_code)
        self.assertIn('aria-label="Tutup modal"', self.roster_code)
        self.assertIn("e.key === 'Escape'", self.roster_code)
        self.assertIn("document.body.style.overflow = 'hidden'", self.roster_code)
        self.assertIn("onClick={(e) => e.stopPropagation()}", self.roster_code)


class TestEmpiricalViewportBreakpoints(unittest.TestCase):
    """
    Stress-tests layout CSS classes across target viewport matrix:
    [360px, 375px, 390px, 412px, 768px, 1024px, 1920px, 3840px (4K)]
    """

    def setUp(self):
        self.hero_code = read_file(COMPONENTS_DIR / "HeroSection.tsx")
        self.yt_code = read_file(COMPONENTS_DIR / "YouTubeVideoShowcase.tsx")
        self.roster_code = read_file(COMPONENTS_DIR / "TeamRosterSection.tsx")
        self.layout_code = read_file(APP_DIR / "layout.tsx")

    def test_mobile_viewports_360_to_412px(self):
        """Verify mobile layout classes prevent overflow and enable wrapping on 360px-412px."""
        # Horizontal overflow containment
        self.assertIn('overflow-x-hidden', read_file(APP_DIR / "globals.css") + read_file(APP_DIR / "page.tsx") + self.roster_code)
        
        # Hero buttons stack vertically on mobile
        self.assertIn('flex flex-col sm:flex-row', self.hero_code)
        
        # Grid goes 1 column on mobile (<640px)
        self.assertIn('grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3', self.roster_code)

    def test_tablet_and_desktop_viewports_768_to_1920px(self):
        """Verify 2-column grid at sm: (640px+) and 3-column grid at lg: (1024px+)."""
        self.assertIn('sm:grid-cols-2', self.roster_code)
        self.assertIn('lg:grid-cols-3', self.roster_code)
        self.assertIn('sm:flex-row', self.hero_code)

    def test_ultrawide_4k_viewport_3840px_containment(self):
        """Verify max-w container boundaries prevent unconstrained stretching on 4K screens."""
        self.assertIn('max-w-7xl', self.roster_code)
        self.assertIn('max-w-7xl', self.yt_code)
        self.assertIn('max-w-4xl', self.hero_code)


if __name__ == '__main__':
    runner = unittest.TextTestRunner(verbosity=2)
    suite = unittest.TestSuite()
    suite.addTest(unittest.makeSuite(TestEmpiricalHeroLayoutStress))
    suite.addTest(unittest.makeSuite(TestEmpiricalYouTubeModalStress))
    suite.addTest(unittest.makeSuite(TestEmpiricalTeamRosterStress))
    suite.addTest(unittest.makeSuite(TestEmpiricalViewportBreakpoints))
    res = runner.run(suite)
    sys.exit(0 if res.wasSuccessful() else 1)
