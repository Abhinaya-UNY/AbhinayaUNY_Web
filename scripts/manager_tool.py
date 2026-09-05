#!/usr/bin/env python3
"""
================================================================================
 Abhinaya UNY Robotics Portal — Standalone Offline Data Manager Tool
================================================================================
 File: scripts/manager_tool.py
 Purpose: Offline local CLI / TUI management utility for Abhinaya UNY data layers:
   - Team Members: data/teamData.ts
   - Competitions & Guidebooks: data/krtmiData.ts
   - Gallery & Media Archives: data/galleryData.ts

 Features:
   - Zero public web footprint, 100% offline local utility (Standard Library only).
   - Automated timestamped backups before every write to scripts/backups/backup_YYYYMMDD_HHMMSS/
   - Automatic rollback capability if validation or write fails.
   - Robust recursive-descent JS/TS object literal parser and TypeScript emitter.
   - Dual-mode operation: Interactive TUI Menu and scriptable CLI flags.
   - Comprehensive data schema validation.
================================================================================
"""

import os
import sys
import json
import re
import shutil
import datetime
import argparse
from pathlib import Path
from typing import Any, Dict, List, Optional, Tuple, Union

# Force UTF-8 for standard output/error on Windows
if hasattr(sys.stdout, 'reconfigure'):
    try:
        sys.stdout.reconfigure(encoding='utf-8', errors='replace')
        sys.stderr.reconfigure(encoding='utf-8', errors='replace')
    except Exception:
        pass

# Base Directory Resolution
SCRIPT_DIR = Path(__file__).resolve().parent
PROJECT_ROOT = SCRIPT_DIR.parent
DATA_DIR = PROJECT_ROOT / "data"
BACKUPS_DIR = SCRIPT_DIR / "backups"

TEAM_DATA_FILE = DATA_DIR / "teamData.ts"
KRTMI_DATA_FILE = DATA_DIR / "krtmiData.ts"
GALLERY_DATA_FILE = DATA_DIR / "galleryData.ts"

# ==============================================================================
# ANSI Terminal Colors & Styling
# ==============================================================================
class Colors:
    """Terminal ANSI escape colors with Windows VT100 support."""
    RESET = "\033[0m"
    BOLD = "\033[1m"
    DIM = "\033[2m"
    ITALIC = "\033[3m"
    UNDERLINE = "\033[4m"
    
    # Foreground colors
    BLACK = "\033[30m"
    RED = "\033[31m"
    GREEN = "\033[32m"
    YELLOW = "\033[33m"
    BLUE = "\033[34m"
    MAGENTA = "\033[35m"
    CYAN = "\033[36m"
    WHITE = "\033[37m"
    
    # Bright Foreground
    BRIGHT_RED = "\033[91m"
    BRIGHT_GREEN = "\033[92m"
    BRIGHT_YELLOW = "\033[93m"
    BRIGHT_BLUE = "\033[94m"
    BRIGHT_MAGENTA = "\033[95m"
    BRIGHT_CYAN = "\033[96m"
    BRIGHT_WHITE = "\033[97m"

    # Background
    BG_BLUE = "\033[44m"
    BG_CYAN = "\033[46m"
    BG_DARK = "\033[40m"

    @classmethod
    def enable_windows_ansi(cls):
        """Enable virtual terminal processing on Windows if supported."""
        if os.name == 'nt':
            try:
                import ctypes
                kernel32 = ctypes.windll.kernel32
                handle = kernel32.GetStdHandle(-11)  # STD_OUTPUT_HANDLE
                mode = ctypes.c_ulong()
                kernel32.GetConsoleMode(handle, ctypes.byref(mode))
                mode.value |= 0x0004  # ENABLE_VIRTUAL_TERMINAL_PROCESSING
                kernel32.SetConsoleMode(handle, mode)
            except Exception:
                pass


Colors.enable_windows_ansi()


# ==============================================================================
# Recursive-Descent JS/TS Object Literal Tokenizer & Parser
# ==============================================================================
class Token:
    def __init__(self, type_: str, value: Any, pos: int):
        self.type = type_
        self.value = value
        self.pos = pos

    def __repr__(self):
        return f"Token({self.type}, {repr(self.value)})"


class JsTsTokenizer:
    """Tokenizes JavaScript / TypeScript object literals and arrays."""

    def __init__(self, text: str):
        self.text = text
        self.pos = 0
        self.length = len(text)

    def tokenize(self) -> List[Token]:
        tokens = []
        while self.pos < self.length:
            char = self.text[self.pos]

            # Whitespace
            if char.isspace():
                self.pos += 1
                continue

            # Line comments
            if char == '/' and self.pos + 1 < self.length and self.text[self.pos + 1] == '/':
                self.pos += 2
                while self.pos < self.length and self.text[self.pos] != '\n':
                    self.pos += 1
                continue

            # Block comments
            if char == '/' and self.pos + 1 < self.length and self.text[self.pos + 1] == '*':
                self.pos += 2
                while self.pos + 1 < self.length and not (self.text[self.pos] == '*' and self.text[self.pos + 1] == '/'):
                    self.pos += 1
                self.pos += 2
                continue

            # Structural characters
            if char == '{':
                tokens.append(Token('LBRACE', '{', self.pos))
                self.pos += 1
            elif char == '}':
                tokens.append(Token('RBRACE', '}', self.pos))
                self.pos += 1
            elif char == '[':
                tokens.append(Token('LBRACKET', '[', self.pos))
                self.pos += 1
            elif char == ']':
                tokens.append(Token('RBRACKET', ']', self.pos))
                self.pos += 1
            elif char == ':':
                tokens.append(Token('COLON', ':', self.pos))
                self.pos += 1
            elif char == ',':
                tokens.append(Token('COMMA', ',', self.pos))
                self.pos += 1
            # Strings (single quote, double quote, backtick)
            elif char in ("'", '"', '`'):
                tokens.append(self._read_string(char))
            # Numbers
            elif char.isdigit() or (char == '-' and self.pos + 1 < self.length and self.text[self.pos + 1].isdigit()):
                tokens.append(self._read_number())
            # Identifiers / Keywords
            elif char.isalpha() or char in ('_', '$'):
                tokens.append(self._read_identifier())
            else:
                self.pos += 1

        tokens.append(Token('EOF', None, self.pos))
        return tokens

    def _read_string(self, quote: str) -> Token:
        start_pos = self.pos
        self.pos += 1
        chars = []
        while self.pos < self.length:
            c = self.text[self.pos]
            if c == '\\':
                self.pos += 1
                if self.pos < self.length:
                    esc = self.text[self.pos]
                    if esc == 'n':
                        chars.append('\n')
                    elif esc == 't':
                        chars.append('\t')
                    elif esc == 'r':
                        chars.append('\r')
                    elif esc == '\\':
                        chars.append('\\')
                    elif esc == quote:
                        chars.append(quote)
                    elif esc in ('"', "'", '`'):
                        chars.append(esc)
                    else:
                        chars.append(esc)
                    self.pos += 1
            elif c == quote:
                self.pos += 1
                return Token('STRING', "".join(chars), start_pos)
            else:
                chars.append(c)
                self.pos += 1
        return Token('STRING', "".join(chars), start_pos)

    def _read_number(self) -> Token:
        start_pos = self.pos
        num_chars = []
        if self.text[self.pos] == '-':
            num_chars.append('-')
            self.pos += 1
        has_dot = False
        while self.pos < self.length:
            c = self.text[self.pos]
            if c.isdigit():
                num_chars.append(c)
                self.pos += 1
            elif c == '.' and not has_dot:
                has_dot = True
                num_chars.append(c)
                self.pos += 1
            else:
                break
        num_str = "".join(num_chars)
        val = float(num_str) if '.' in num_str else int(num_str)
        return Token('NUMBER', val, start_pos)

    def _read_identifier(self) -> Token:
        start_pos = self.pos
        ident_chars = []
        while self.pos < self.length:
            c = self.text[self.pos]
            if c.isalnum() or c in ('_', '$', '-'):
                ident_chars.append(c)
                self.pos += 1
            else:
                break
        name = "".join(ident_chars)
        if name == 'true':
            return Token('BOOLEAN', True, start_pos)
        elif name == 'false':
            return Token('BOOLEAN', False, start_pos)
        elif name == 'null':
            return Token('NULL', None, start_pos)
        elif name == 'undefined':
            return Token('NULL', None, start_pos)
        return Token('IDENTIFIER', name, start_pos)


class JsTsParser:
    """Recursive descent parser to turn JS/TS object tokens into Python dicts/lists."""

    def __init__(self, tokens: List[Token]):
        self.tokens = tokens
        self.pos = 0

    def current(self) -> Token:
        if self.pos < len(self.tokens):
            return self.tokens[self.pos]
        return self.tokens[-1]

    def advance(self) -> Token:
        tok = self.current()
        self.pos += 1
        return tok

    def match(self, type_: str) -> bool:
        if self.current().type == type_:
            self.advance()
            return True
        return False

    def expect(self, type_: str) -> Token:
        tok = self.current()
        if tok.type != type_:
            raise ValueError(f"Expected token {type_}, got {tok.type} ({repr(tok.value)}) at position {tok.pos}")
        self.advance()
        return tok

    def parse_value(self) -> Any:
        tok = self.current()
        if tok.type == 'LBRACE':
            val = self.parse_object()
        elif tok.type == 'LBRACKET':
            val = self.parse_array()
        elif tok.type in ('STRING', 'NUMBER', 'BOOLEAN', 'NULL'):
            self.advance()
            val = tok.value
        elif tok.type == 'IDENTIFIER':
            self.advance()
            val = tok.value
        else:
            raise ValueError(f"Unexpected token {tok.type} ({repr(tok.value)}) at position {tok.pos}")

        # Consume optional TypeScript type assertion: 'as Type'
        if self.current().type == 'IDENTIFIER' and self.current().value == 'as':
            self.advance()
            if self.current().type == 'IDENTIFIER':
                self.advance()

        return val

    def parse_object(self) -> Dict[str, Any]:
        self.expect('LBRACE')
        obj = {}
        while self.current().type != 'RBRACE' and self.current().type != 'EOF':
            tok = self.current()
            if tok.type in ('IDENTIFIER', 'STRING'):
                key = tok.value
                self.advance()
            else:
                raise ValueError(f"Expected object key, got {tok.type} at position {tok.pos}")

            self.expect('COLON')
            val = self.parse_value()
            obj[key] = val

            if self.current().type == 'COMMA':
                self.advance()
            else:
                break
        self.expect('RBRACE')
        return obj

    def parse_array(self) -> List[Any]:
        self.expect('LBRACKET')
        arr = []
        while self.current().type != 'RBRACKET' and self.current().type != 'EOF':
            val = self.parse_value()
            arr.append(val)
            if self.current().type == 'COMMA':
                self.advance()
            else:
                break
        self.expect('RBRACKET')
        return arr


def extract_ts_array(file_content: str, const_name: str) -> Optional[List[Any]]:
    """Finds `export const <const_name> = [ ... ]` in TypeScript file and parses it."""
    # Pattern to find start of array
    pattern = rf'(?:export\s+const\s+{const_name}(?:\s*:\s*[^=]+)?\s*=\s*)(\[)'
    match = re.search(pattern, file_content)
    if not match:
        return None
    start_bracket_idx = match.start(1)

    # Slice from start bracket to end of file and parse tokens
    snippet = file_content[start_bracket_idx:]
    tokenizer = JsTsTokenizer(snippet)
    tokens = tokenizer.tokenize()
    parser = JsTsParser(tokens)
    try:
        return parser.parse_array()
    except Exception as e:
        raise ValueError(f"Error parsing array for {const_name}: {e}")


def extract_ts_object(file_content: str, const_name: str) -> Optional[Dict[str, Any]]:
    """Finds `export const <const_name> = { ... }` in TypeScript file and parses it."""
    pattern = rf'(?:export\s+const\s+{const_name}(?:\s*:\s*[^=]+)?\s*=\s*)(\{{)'
    match = re.search(pattern, file_content)
    if not match:
        return None
    start_bracket_idx = match.start(1)

    snippet = file_content[start_bracket_idx:]
    tokenizer = JsTsTokenizer(snippet)
    tokens = tokenizer.tokenize()
    parser = JsTsParser(tokens)
    try:
        return parser.parse_object()
    except Exception as e:
        raise ValueError(f"Error parsing object for {const_name}: {e}")


# ==============================================================================
# TypeScript Emitter & Formatter
# ==============================================================================
class TypeScriptFormatter:
    """Formats Python data structures into clean TypeScript literal exports."""

    @classmethod
    def format_value(cls, val: Any, indent_level: int = 0) -> str:
        indent = "  " * indent_level
        inner_indent = "  " * (indent_level + 1)

        if val is None:
            return "null"
        elif isinstance(val, bool):
            return "true" if val else "false"
        elif isinstance(val, (int, float)):
            return str(val)
        elif isinstance(val, str):
            # Escape quotes and newlines
            escaped = val.replace('\\', '\\\\').replace("'", "\\'").replace('\n', '\\n').replace('\r', '')
            return f"'{escaped}'"
        elif isinstance(val, list):
            if not val:
                return "[]"
            # If list of short strings/numbers, format compactly if small
            if all(isinstance(x, (str, int, float, bool)) for x in val) and len(val) <= 4 and sum(len(str(x)) for x in val) < 60:
                inner = ", ".join(cls.format_value(x, 0) for x in val)
                return f"[{inner}]"
            lines = ["[\n"]
            for item in val:
                lines.append(f"{inner_indent}{cls.format_value(item, indent_level + 1)},\n")
            lines.append(f"{indent}]")
            return "".join(lines)
        elif isinstance(val, dict):
            if not val:
                return "{}"
            lines = ["{\n"]
            for k, v in val.items():
                # Check if key is valid JS identifier
                key_str = k if re.match(r'^[a-zA-Z_$][a-zA-Z0-9_$]*$', k) else f"'{k}'"
                lines.append(f"{inner_indent}{key_str}: {cls.format_value(v, indent_level + 1)},\n")
            lines.append(f"{indent}}}")
            return "".join(lines)
        else:
            return f"'{str(val)}'"

    @classmethod
    def generate_team_data_file(cls, members: List[Dict[str, Any]], advisor: Optional[Dict[str, Any]] = None) -> str:
        """Emits standard TypeScript file for data/teamData.ts."""
        # Find primary advisor:
        # 1. If explicit advisor passed, use it.
        # 2. Else find member with id == 'prof-khairudin'
        # 3. Else find first member with division == 'Pembimbing'
        # 4. Else use default Prof. Khairudin
        pembimbing = advisor
        primary_advisor_id = None

        if pembimbing is not None:
            primary_advisor_id = pembimbing.get('id')
        else:
            # Check for prof-khairudin first
            for m in members:
                if m.get('id') == 'prof-khairudin':
                    pembimbing = m
                    primary_advisor_id = m.get('id')
                    break
            # If still None, check for any Pembimbing
            if pembimbing is None:
                for m in members:
                    if m.get('division') == 'Pembimbing':
                        pembimbing = m
                        primary_advisor_id = m.get('id')
                        break

        if pembimbing is None:
            pembimbing = {
                "id": "prof-khairudin",
                "name": "Prof. Ir. Moh. Khairudin, M.T., Ph.D.",
                "nim": "NIDN: 0012047901",
                "studyProgram": "Teknik Elektro / Guru Besar Robotika FT UNY",
                "faculty": "Fakultas Teknik (FT)",
                "division": "Pembimbing",
                "role": "Dosen Pembimbing Utama",
                "subRole": "Chief Advisor & Robotics Research Director",
                "generation": "Pembimbing KRI",
                "specialization": [
                    "Adaptive Control Systems",
                    "Robotics Research & Development",
                    "KRI National Strategy",
                    "Power & Automation Engineering"
                ],
                "bio": "Guru Besar Fakultas Teknik Universitas Negeri Yogyakarta bidang Sistem Kontrol & Robotika. Mengarahkan riset otonom, strategi kompetisi, dan pembimbingan teknis Kontes Robot Indonesia (KRI) Wilayah & Nasional.",
                "image": "/assets/logo_abhinaya_solid.png",
                "badge": "Chief Advisor",
                "socials": {
                    "email": "moh_khairudin@uny.ac.id",
                    "linkedin": "https://scholar.google.com/citations?user=moh_khairudin"
                }
            }
            primary_advisor_id = "prof-khairudin"

        # All other members except the designated primary advisor go to regular_members
        regular_members = []
        for m in members:
            if primary_advisor_id and m.get('id') == primary_advisor_id:
                continue
            regular_members.append(m)

        all_roster = [pembimbing] + regular_members
        count_pembimbing = sum(1 for m in all_roster if m.get('division') == 'Pembimbing')
        count_manajerial = sum(1 for m in all_roster if m.get('division') == 'Manajerial & Media')
        count_prog = sum(1 for m in all_roster if m.get('division') == 'Programming & AI')
        count_mekanik = sum(1 for m in all_roster if m.get('division') == 'Mekanik')
        count_elektrik = sum(1 for m in all_roster if m.get('division') == 'Elektrik')

        return f"""/**
 * Authentic Team Member Roster & Organizational Structure Data Layer
 * Abhinaya UNY Robotics Team - Kontes Robot Tematik Indonesia (KRTMI)
 */

export interface TeamMember {{
  id: string;
  name: string;
  nim: string;
  studyProgram: string;
  faculty: string;
  division: 'Mekanik' | 'Elektrik' | 'Programming & AI' | 'Manajerial & Media' | 'Pembimbing';
  role: string;
  subRole?: string;
  generation?: string;
  specialization: string[];
  bio: string;
  image: string;
  badge: string;
  socials?: {{
    github?: string;
    linkedin?: string;
    instagram?: string;
    email?: string;
  }};
}}

export const DOSEN_PEMBIMBING: TeamMember = {cls.format_value(pembimbing, 0)};

export const TEAM_MEMBERS: TeamMember[] = {cls.format_value(regular_members, 0)};

export const ALL_ROSTER_MEMBERS: TeamMember[] = [DOSEN_PEMBIMBING, ...TEAM_MEMBERS];

export const DIVISION_CATEGORIES = [
  {{ id: 'All', label: 'Semua Roster', icon: 'Users', count: ALL_ROSTER_MEMBERS.length }},
  {{ id: 'Pembimbing', label: 'Pembimbing', icon: 'GraduationCap', count: {count_pembimbing} }},
  {{ id: 'Manajerial & Media', label: 'Manajerial & Media', icon: 'Briefcase', count: {count_manajerial} }},
  {{ id: 'Programming & AI', label: 'Programming & AI', icon: 'Code', count: {count_prog} }},
  {{ id: 'Mekanik', label: 'Mekanik', icon: 'Wrench', count: {count_mekanik} }},
  {{ id: 'Elektrik', label: 'Elektrik', icon: 'Zap', count: {count_elektrik} }},
] as const;

export const DIVISION_BADGES: Record<TeamMember['division'], {{ bg: string; text: string; border: string; accent: string }}> = {{
  'Pembimbing': {{
    bg: 'bg-purple-950/40',
    text: 'text-purple-300',
    border: 'border-purple-500/40',
    accent: '#A855F7',
  }},
  'Manajerial & Media': {{
    bg: 'bg-emerald-950/40',
    text: 'text-emerald-300',
    border: 'border-emerald-500/40',
    accent: '#10B981',
  }},
  'Programming & AI': {{
    bg: 'bg-cyan-950/40',
    text: 'text-cyan-300',
    border: 'border-cyan-500/40',
    accent: '#06B6D4',
  }},
  'Mekanik': {{
    bg: 'bg-amber-950/40',
    text: 'text-amber-300',
    border: 'border-amber-500/40',
    accent: '#F59E0B',
  }},
  'Elektrik': {{
    bg: 'bg-blue-950/40',
    text: 'text-blue-300',
    border: 'border-blue-500/40',
    accent: '#3B82F6',
  }},
}};
"""

    format_team_data_ts = generate_team_data_file


    @classmethod
    def generate_krtmi_data_file(cls, stories: List[Dict[str, Any]], divisions: Optional[List[Dict[str, Any]]] = None) -> str:
        """Emits standard TypeScript file for data/krtmiData.ts."""
        divisions_code = ""
        if divisions:
            divisions_code = f"\n\nexport const TEAM_DIVISIONS = {cls.format_value(divisions, 0)};\n"
        else:
            divisions_code = f"\n\nexport const TEAM_DIVISIONS = {cls.format_value(DEFAULT_SEED_DIVISIONS, 0)};\n"

        return f"""export interface KrtmiStory {{
  year: string;
  badgeYear: string;
  title: string;
  tagline?: string;
  theme: string;
  location: string;
  storySummary: string;
  arenaSpecs: {{
    dimensions: string;
    surface: string;
    zones: string;
  }};
  missionRules: string[];
  robotSpecs: {{
    dimensions: string;
    weight: string;
    power: string;
    controller: string;
    mechanism: string;
  }};
  scoringSystem: string[];
  teamRoleAndFunFacts: string[];
  achievement: string;
  isChampion?: boolean;
  pdfFile: string;
  pdfSize: string;
  pdfTitle: string;
}}

export const KRTMI_STORIES: KrtmiStory[] = {cls.format_value(stories, 0)};{divisions_code}"""

    @classmethod
    def generate_gallery_data_file(cls, items: List[Dict[str, Any]]) -> str:
        """Emits standard TypeScript file for data/galleryData.ts."""
        return f"""export interface GalleryItem {{
  id: string;
  title: string;
  category: 'Semua' | 'Arena Lomba' | 'Panggung Juara' | 'Riset & Lab' | 'Behind The Scenes';
  year: string;
  image: string;
  caption: string;
  event: string;
}}

export const GALLERY_ITEMS: GalleryItem[] = {cls.format_value(items, 0)};

export const GALLERY_CATEGORIES = [
  'Semua',
  'Arena Lomba',
  'Panggung Juara',
  'Riset & Lab',
  'Behind The Scenes'
] as const;
"""


# ==============================================================================
# Backup & Rollback Manager
# ==============================================================================
class BackupManager:
    """Manages automated timestamped backups and instant rollback capabilities."""

    def __init__(self, backups_dir: Path = BACKUPS_DIR, data_dir: Path = DATA_DIR):
        self.backups_dir = Path(backups_dir)
        self.data_dir = Path(data_dir)
        self.backups_dir.mkdir(parents=True, exist_ok=True)

    def create_backup(self, reason: str = "Automated pre-write snapshot") -> Path:
        """Creates a timestamped snapshot of all data files."""
        now_str = datetime.datetime.now().strftime("%Y%m%d_%H%M%S_%f")
        backup_folder = self.backups_dir / f"backup_{now_str}"
        backup_folder.mkdir(parents=True, exist_ok=True)

        copied_files = []
        for file in [TEAM_DATA_FILE, KRTMI_DATA_FILE, GALLERY_DATA_FILE]:
            target_path = self.data_dir / file.name
            if target_path.exists():
                shutil.copy2(target_path, backup_folder / file.name)
                copied_files.append(file.name)

        manifest = {
            "backup_id": backup_folder.name,
            "timestamp": datetime.datetime.now().isoformat(),
            "reason": reason,
            "files": copied_files
        }
        with open(backup_folder / "manifest.json", "w", encoding="utf-8") as f:
            json.dump(manifest, f, indent=2)

        return backup_folder

    def list_backups(self) -> List[Dict[str, Any]]:
        """Lists all existing backups sorted chronologically descending."""
        backups = []
        if not self.backups_dir.exists():
            return []

        for folder in sorted(self.backups_dir.iterdir(), reverse=True):
            if folder.is_dir() and folder.name.startswith("backup_"):
                manifest_file = folder / "manifest.json"
                if manifest_file.exists():
                    try:
                        with open(manifest_file, "r", encoding="utf-8") as f:
                            info = json.load(f)
                            info["path"] = str(folder)
                            backups.append(info)
                    except Exception:
                        backups.append({"backup_id": folder.name, "timestamp": folder.name, "reason": "Unknown", "path": str(folder)})
                else:
                    backups.append({"backup_id": folder.name, "timestamp": folder.name, "reason": "Legacy backup", "path": str(folder)})
        return backups

    def restore_backup(self, backup_id_or_path: Union[str, Path]) -> Tuple[bool, str]:
        """Restores data files from a backup directory."""
        target_folder = None
        if isinstance(backup_id_or_path, Path) and backup_id_or_path.is_dir():
            target_folder = backup_id_or_path
        else:
            candidate = self.backups_dir / str(backup_id_or_path)
            if candidate.is_dir():
                target_folder = candidate
            else:
                # Search partial matches
                for folder in self.backups_dir.iterdir():
                    if folder.is_dir() and str(backup_id_or_path) in folder.name:
                        target_folder = folder
                        break

        if not target_folder or not target_folder.is_dir():
            return False, f"Backup folder not found: {backup_id_or_path}"

        target_ts_names = {f.name for f in target_folder.glob("*.ts")}

        # Remove data .ts files that did not exist in this backup snapshot
        for existing_ts in self.data_dir.glob("*.ts"):
            if existing_ts.name not in target_ts_names:
                try:
                    existing_ts.unlink()
                except Exception:
                    pass

        restored_files = []
        for ts_file in target_folder.glob("*.ts"):
            dest = self.data_dir / ts_file.name
            shutil.copy2(ts_file, dest)
            restored_files.append(ts_file.name)

        return True, f"Successfully restored snapshot from {target_folder.name} ({len(restored_files)} files: {', '.join(restored_files) if restored_files else 'clean state'})."



# ==============================================================================
# Validation Engine
# ==============================================================================
class ValidationEngine:
    """Schema and integrity validator for all Abhinaya UNY data models."""

    VALID_DIVISIONS = {
        'Mekanik',
        'Elektrik',
        'Elektronik',
        'Program',
        'Programming & AI',
        'Manajerial & Media',
        'Manager',
        'Ketua Tim',
        'Pembimbing',
        'Desain',
        'Official'
    }

    VALID_GALLERY_CATEGORIES = {
        'Semua',
        'Arena Lomba',
        'Panggung Juara',
        'Riset & Lab',
        'Behind The Scenes'
    }

    @classmethod
    def validate_team_member(cls, member: Dict[str, Any]) -> Tuple[bool, List[str]]:
        errors = []
        if not isinstance(member, dict):
            return False, ["Team member must be a dictionary"]

        # Required fields
        for field in ['id', 'name', 'studyProgram', 'faculty', 'division', 'role', 'specialization', 'bio']:
            if field not in member or member[field] is None:
                errors.append(f"Missing required field: '{field}'")
            elif isinstance(member[field], str) and not member[field].strip():
                errors.append(f"Field '{field}' cannot be empty")

        # Division enum validation
        if 'division' in member and member['division'] not in cls.VALID_DIVISIONS:
            errors.append(f"Invalid division '{member['division']}'. Allowed: {', '.join(cls.VALID_DIVISIONS)}")

        # Specialization must be list of strings or string
        if 'specialization' in member:
            if not isinstance(member['specialization'], (list, str)):
                errors.append("Field 'specialization' must be a list of strings or a string")

        return len(errors) == 0, errors

    @classmethod
    def validate_krtmi_story(cls, story: Dict[str, Any]) -> Tuple[bool, List[str]]:
        errors = []
        if not isinstance(story, dict):
            return False, ["Competition story must be a dictionary"]

        for field in ['year', 'badgeYear', 'title', 'theme', 'location', 'storySummary', 'arenaSpecs', 'robotSpecs', 'pdfFile']:
            if field not in story or story[field] is None:
                errors.append(f"Missing required field: '{field}'")

        if 'arenaSpecs' in story:
            if not isinstance(story['arenaSpecs'], dict):
                errors.append("'arenaSpecs' must be a dictionary with dimensions, surface, zones")
            else:
                for k in ['dimensions', 'surface', 'zones']:
                    if k not in story['arenaSpecs']:
                        errors.append(f"Missing arenaSpecs subfield: '{k}'")

        if 'robotSpecs' in story:
            if not isinstance(story['robotSpecs'], dict):
                errors.append("'robotSpecs' must be a dictionary with dimensions, weight, power, controller, mechanism")

        return len(errors) == 0, errors

    @classmethod
    def validate_gallery_item(cls, item: Dict[str, Any]) -> Tuple[bool, List[str]]:
        errors = []
        if not isinstance(item, dict):
            return False, ["Gallery item must be a dictionary"]

        for field in ['id', 'title', 'category', 'year', 'image', 'caption', 'event']:
            if field not in item or item[field] is None:
                errors.append(f"Missing required field: '{field}'")
            elif isinstance(item[field], str) and not item[field].strip():
                errors.append(f"Field '{field}' cannot be empty")

        if 'category' in item and item['category'] not in cls.VALID_GALLERY_CATEGORIES:
            errors.append(f"Invalid category '{item['category']}'. Allowed: {', '.join(cls.VALID_GALLERY_CATEGORIES)}")

        return len(errors) == 0, errors


# ==============================================================================
# Verified Default Seed Data (14 Verified Members + Dosen Pembimbing)
# ==============================================================================
DEFAULT_SEED_MEMBERS: List[Dict[str, Any]] = [
    {
        "id": "prof-khairudin",
        "name": "Prof. Ir. Moh. Khairudin, M.T., Ph.D.",
        "nim": "NIDN: 0012047901",
        "studyProgram": "Guru Besar Robotika & Sistem Kontrol",
        "faculty": "Fakultas Teknik (FT UNY)",
        "division": "Pembimbing",
        "role": "Dosen Pembimbing Utama (Chief Advisor)",
        "subRole": "Guru Besar FT UNY & Peneliti Senior Robotika",
        "generation": "Advisor",
        "specialization": ["Sistem Kontrol Adaptif", "Artificial Intelligence Robotika", "Strategi Kompetisi KRI"],
        "bio": "Guru Besar Fakultas Teknik UNY yang mendedikasikan riset pada kendali cerdas, sistem otomasi, dan pembimbingan kontingen robotika UNY di kancah nasional dan internasional.",
        "image": "/assets/team/pembimbing.png",
        "badge": "Guru Besar FT UNY",
        "skills": ["Adaptive Control", "Robot Dynamics", "Research Mentorship", "Strategic Planning"],
        "featured": True
    },
    {
        "id": "ilham-widyo-nugroho",
        "name": "Ilham Widyo Nugroho",
        "nim": "21507334002",
        "studyProgram": "D4 Teknik Elektronika",
        "faculty": "Fakultas Vokasi (FV UNY)",
        "division": "Elektrik",
        "role": "Ketua Tim (Team Leader) & Firmware Lead",
        "subRole": "Hardware Architect & STM32 Lead",
        "generation": "2021",
        "specialization": ["Firmware STM32F407", "Manajemen Tim", "Serial Interfacing ESP32 & PC"],
        "bio": "Pemimpin kontingen Abhinaya KRTMI 2024 yang mengorkestrasi integrasi mekanik, elektrik, dan AI, serta memprogram firmware kontrol inti mikrokontroler ARM Cortex-M4.",
        "image": "/assets/team/ilham_widyo.png",
        "badge": "Ketua Tim 2024",
        "skills": ["STM32 C/C++", "FreeRTOS", "System Architecture", "Leadership"],
        "socials": {"linkedin": "https://linkedin.com/in/ilhamwidyo", "github": "https://github.com/ilhamwidyo"},
        "featured": True
    },
    {
        "id": "tri-wahyu-handoyo",
        "name": "Tri Wahyu Handoyo",
        "nim": "22518241023",
        "studyProgram": "S1 Pendidikan Teknik Mekatronika",
        "faculty": "Fakultas Teknik (FT UNY)",
        "division": "Programming & AI",
        "role": "Autonomous Navigation & Computer Vision Lead",
        "subRole": "Lead AI & Web Portal Architect",
        "generation": "2022",
        "specialization": ["YOLO Object Detection", "Mecanum Inverse Kinematics", "Full-Stack Web Development"],
        "bio": "Pengembang sistem navigasi otonom berbasis visi komputer YOLO dan perancang portal resmi Abhinaya UNY. Berfokus pada closed-loop control dan otomasi cerdas.",
        "image": "/assets/team/tri_wahyu.png",
        "badge": "Vision & AI Lead",
        "skills": ["Python & OpenCV", "YOLOv8", "C++ Navigation", "React/Next.js", "TypeScript"],
        "socials": {"github": "https://github.com/triwahyu22", "linkedin": "https://linkedin.com/in/triwahyuh"},
        "featured": True
    },
    {
        "id": "agus-bagaskoro",
        "name": "Agus Bagaskoro",
        "nim": "21501244039",
        "studyProgram": "S1 Pendidikan Teknik Elektro",
        "faculty": "Fakultas Teknik (FT UNY)",
        "division": "Elektrik",
        "role": "Electrical Hardware & Power Management Lead",
        "subRole": "Power Distribution & Safety Specialist",
        "generation": "2021",
        "specialization": ["High-Current Power Distribution", "Battery Management LiFePO4", "Motor Driver BTS7960"],
        "bio": "Penanggung jawab sistem kelistrikan daya tinggi, proteksi sirkuit darurat (E-Stop), dan perancangan distribusi arus multi-tegangan untuk motor penggerak robot.",
        "image": "/assets/team/agus_bagas.png",
        "badge": "Power System Lead",
        "skills": ["Power Electronics", "PCB Routing", "Driver Isolation", "Hardware Safety"],
        "featured": True
    },
    {
        "id": "farhan-yuda-mahendra",
        "name": "Farhan Yuda Mahendra",
        "nim": "22518244007",
        "studyProgram": "S1 Pendidikan Teknik Mekatronika",
        "faculty": "Fakultas Teknik (FT UNY)",
        "division": "Mekanik",
        "role": "Mechanical Design & Gripper Specialist",
        "subRole": "Lead CAD & Kinematic Modeler",
        "generation": "2022",
        "specialization": ["3D CAD Autodesk Inventor", "Two-Stage Gripper Mechanism", "Mecanum Suspension"],
        "bio": "Perancang 3D CAD mekanisme capit presisi dua tingkat dan sistem suspensi roda mecanum untuk kestabilan manuver di permukaan berundak.",
        "image": "/assets/team/farhan_yuda.png",
        "badge": "CAD Specialist",
        "skills": ["Autodesk Inventor", "SolidWorks", "CNC Machining", "3D Printing"],
        "featured": True
    },
    {
        "id": "muhamad-ilham-sony",
        "name": "Muhamad Ilham Sony",
        "nim": "20539144016",
        "studyProgram": "S1 Teknik Manufaktur",
        "faculty": "Fakultas Teknik (FT UNY)",
        "division": "Mekanik",
        "role": "Manufacturing & Fabrication Lead",
        "subRole": "Aluminium CNC & Lathe Specialist",
        "generation": "2020",
        "specialization": ["Pemesinan Bubut & Milling", "Fabrikasi Aluminium 6061", "Perakitan Sasis Utama"],
        "bio": "Ahli manufaktur presisi logam dan pemesinan mesin perkakas yang merealisasikan desain CAD ke sasis aluminium tangguh dengan toleransi tinggi.",
        "image": "/assets/team/ilham_sony.png",
        "badge": "Fab Lead",
        "skills": ["CNC Milling", "Lathe Machining", "Sheet Metal", "Tolerance Engineering"],
        "featured": True
    },
    {
        "id": "salsabila-azzahra",
        "name": "Salsabila Azzahra Putri Sophia Dewi Utami",
        "nim": "20518241012",
        "studyProgram": "S1 Pendidikan Teknik Mekatronika",
        "faculty": "Fakultas Teknik (FT UNY)",
        "division": "Manajerial & Media",
        "role": "Managerial Lead & Match Strategy Coordinator",
        "subRole": "Chief Team Manager",
        "generation": "2020",
        "specialization": ["Manajemen Operasional Tim", "Bedah Rulebook BPTI", "Koordinasi Paddock & Logistik"],
        "bio": "Manajer operasional tim yang mengawal kepatuhan regulasi lomba KRI Puspresnas, koordinasi paddock, strategi pertandingan, dan timeline riset tim.",
        "image": "/assets/team/salsabila.png",
        "badge": "Team Manager",
        "skills": ["Project Management", "Rules Analysis", "Logistics Operations", "Match Strategy"],
        "featured": True
    },
    {
        "id": "mustika-wahyu-aprilia",
        "name": "Mustika Wahyu Aprilia",
        "nim": "21306141050",
        "studyProgram": "S1 Fisika",
        "faculty": "Fakultas MIPA (FMIPA UNY)",
        "division": "Manajerial & Media",
        "role": "Secretariat, Finance & Public Relations Lead",
        "subRole": "Finance & Administration Lead",
        "generation": "2021",
        "specialization": ["Penyusunan Anggaran (RAB)", "Administrasi Resmi Universitas", "Humas & Kemitraan"],
        "bio": "Pengelola administrasi keuangan, transparansi pendanaan riset, surat-menyurat resmi universitas/kementerian, dan komunikasi publik tim.",
        "image": "/assets/team/mustika.png",
        "badge": "Finance Lead",
        "skills": ["Budgeting & Accounting", "Institutional Relations", "Secretariat", "Proposal Writing"],
        "featured": True
    },
    {
        "id": "abdul-hasib",
        "name": "Abdul Hasib Adzdzin Nuha",
        "nim": "22502241014",
        "studyProgram": "S1 Pendidikan Teknik Elektronika",
        "faculty": "Fakultas Teknik (FT UNY)",
        "division": "Elektrik",
        "role": "PCB Designer & Sensor Interface Engineer",
        "subRole": "Custom Shield & Signal Conditioner",
        "generation": "2022",
        "specialization": ["KiCad PCB Design", "Rotary Encoder Conditioning", "Proximity & ToF Sensor Shield"],
        "bio": "Perancang papan PCB custom multi-layer shield STM32 dan pengkondisi sinyal sensor optik berkecepatan tinggi dengan noise filtering optimal.",
        "image": "/assets/team/abdul_hasib.png",
        "badge": "PCB Engineer",
        "skills": ["KiCad", "SMD Soldering", "Sensor Interfacing", "Signal Conditioning"],
        "featured": False
    },
    {
        "id": "rose-pita-nur-afifah",
        "name": "Rose Pita Nur Afifah",
        "nim": "22518241042",
        "studyProgram": "S1 Pendidikan Teknik Mekatronika",
        "faculty": "Fakultas Teknik (FT UNY)",
        "division": "Manajerial & Media",
        "role": "Media, UI/UX & Documentation Specialist",
        "subRole": "Creative & Branding Designer",
        "generation": "2022",
        "specialization": ["Media Sosial @abhinaya.uny", "Kurasi Foto & Video Laga", "Desain Visual & Branding"],
        "bio": "Kreator konten visual, videografi laga robot, dan pengelola citra media sosial resmi Abhinaya UNY untuk menjangkau khalayak luas dan calon anggota baru.",
        "image": "/assets/team/rose_pita.png",
        "badge": "Creative Lead",
        "skills": ["Graphic Design", "Video Production", "Social Media Strategy", "UI/UX"],
        "featured": False
    },
    {
        "id": "caesar-sokma-langgeng",
        "name": "Caesar Sokma Langgeng",
        "nim": "21539144005",
        "studyProgram": "S1 Teknik Manufaktur",
        "faculty": "Fakultas Teknik (FT UNY)",
        "division": "Mekanik",
        "role": "Fabrication & Rapid Prototyping Engineer",
        "subRole": "Laser Cutting & Motor Bracket Fabricator",
        "generation": "2021",
        "specialization": ["Laser Cutting Akrilik", "Bracket Motor Planetary", "Optimasi Kekakuan Sasis"],
        "bio": "Spesialis rapid prototyping akrilik dan dudukan gearbox motor planetary untuk memastikan transmisi mekanis tanpa getaran berlebih.",
        "image": "/assets/team/caesar.png",
        "badge": "Prototyping",
        "skills": ["Laser Cutting", "Bracket Fabrication", "Rapid Assembly", "Quality Check"],
        "featured": False
    },
    {
        "id": "ikhsan-nurrohman",
        "name": "Ikhsan Nurrohman",
        "nim": "22538141004",
        "studyProgram": "S1 Teknik Elektro",
        "faculty": "Fakultas Teknik (FT UNY)",
        "division": "Elektrik",
        "role": "Telemetry & Wireless Systems Specialist",
        "subRole": "ESP32 Bluetooth & Telemetry Lead",
        "generation": "2022",
        "specialization": ["ESP32 Bluetooth DualShock 4", "Wireless Telemetry 2.4GHz", "Filtering Derau Catu Daya"],
        "bio": "Pengembang komunikasi nirkabel telemetri arena real-time dan driver kendali joystick Bluetooth DualShock 4 dengan latensi sangat rendah.",
        "image": "/assets/team/ikhsan.png",
        "badge": "Wireless Eng",
        "skills": ["ESP-NOW", "Bluetooth SPP/HID", "Telemetry Protocol", "Low Latency RF"],
        "featured": False
    },
    {
        "id": "edo-raja-saputra",
        "name": "Edo Raja Saputra Siahaan",
        "nim": "22508334033",
        "studyProgram": "D4 Teknik Mesin",
        "faculty": "Fakultas Vokasi (FV UNY)",
        "division": "Mekanik",
        "role": "Actuator & Mechanical Dynamics Engineer",
        "subRole": "Gripper Calibrator & Vibration Tester",
        "generation": "2022",
        "specialization": ["Perakitan Aktuator Gripper", "Uji Getaran Sasis", "Kalibrasi Mekanik Arena"],
        "bio": "Insinyur dinamika mekanik yang memfokuskan kalibrasi keausan gear, torsi capit robot, dan keandalan gerak melintasi obstacle lapangan.",
        "image": "/assets/team/edo_raja.png",
        "badge": "Mechanics",
        "skills": ["Mechanical Tuning", "Torque Calibration", "Vibration Analysis", "Assembly"],
        "featured": False
    },
    {
        "id": "rionaldi-nugroho",
        "name": "Rionaldi Nugroho",
        "nim": "23090620088",
        "studyProgram": "D4 Teknik Elektronika",
        "faculty": "Fakultas Vokasi (FV UNY)",
        "division": "Elektrik",
        "role": "Junior Embedded Hardware Engineer",
        "subRole": "Cable Harness & Battery Technician",
        "generation": "2023",
        "specialization": ["Wiring Harness Testing", "Battery Charging Protocol", "Pemeliharaan Lab Elektrik"],
        "bio": "Teknisi junior kelistrikan yang mengawal standar pengkabelan anti-interferensi dan siklus pemeliharaan baterai robotika selama kompetisi.",
        "image": "/assets/team/rionaldi.png",
        "badge": "Junior Hardware",
        "skills": ["Cable Routing", "Battery Maintenance", "Circuit Testing", "Lab Operations"],
        "featured": False
    },
    {
        "id": "yusron-nur-latief",
        "name": "Yusron Nur Latief",
        "nim": "Senior Member",
        "studyProgram": "Teknik Elektro",
        "faculty": "Fakultas Teknik (FT UNY)",
        "division": "Elektrik",
        "role": "Senior Electrical & Hardware Advisor",
        "subRole": "Hardware Transfer Technology Lead",
        "generation": "Alumni / Senior",
        "specialization": ["Arsitektur Robot Generasi Terdahulu", "Transfer Teknologi KRTMI", "Advising Elektrik"],
        "bio": "Alumni dan anggota senior divisi elektrik yang membimbing transfer pengetahuan arsitektur robotika generasi awal kepada anggota penerus tim.",
        "image": "/assets/team/yusron.png",
        "badge": "Senior Advisor",
        "skills": ["Hardware Architecture", "Knowledge Transfer", "Troubleshooting", "Consultancy"],
        "featured": False
    }
]

DEFAULT_SEED_DIVISIONS: List[Dict[str, Any]] = [
    {
        "id": "mekanik",
        "name": "Divisi Mekanik (CAD & Prototyping)",
        "icon": "Wrench",
        "desc": "Merancang sasis 3D di Autodesk Inventor/Fusion 360, menghitung distribusi beban, memilih gear & motor penggerak, serta merakit sistem capit/gripper dengan 3D printing & mesin CNC.",
        "skills": ["3D CAD Modeling", "Mecanum/Omni Chassis Assembly", "3D Printing & Las Alumunium", "Gripper & Kinematics Design"]
    },
    {
        "id": "elektrik",
        "name": "Divisi Elektrik & Hardware",
        "icon": "Zap",
        "desc": "Mendesain layout PCB sirkuit di KiCad/Eagle, merangkai driver motor arus tinggi (TB6612/BTS7960), sistem manajemen daya baterai LiFePO4/LiPo, fusi sensor IMU, dan jalur pengkabelan rapi.",
        "skills": ["PCB Design & Soldering", "Motor Drivers & Power Management", "Sensor Integration (IMU, ToF, Optical)", "Microcontroller Wiring"]
    },
    {
        "id": "programming",
        "name": "Divisi Pemrograman & AI",
        "icon": "Code",
        "desc": "Menulis firmware kontrol otonom di ESP32 & STM32, mengatur algoritma navigasi cerdas, tuning kecepatan motor dengan Closed-Loop PID, dan melatih model Visi Komputer (YOLO) untuk deteksi objek.",
        "skills": ["C/C++ Embedded Firmware", "Closed-Loop PID Tuning", "Computer Vision (OpenCV/YOLO)", "RTOS & Wireless Telemetry"]
    },
    {
        "id": "manajerial",
        "name": "Divisi Manajerial & Media",
        "icon": "Users",
        "desc": "Mengelola administrasi tim, jadwal riset workshop, pembuatan video dokumentasi lomba, branding media sosial Instagram & TikTok, serta penyusunan berkas proposal kejuaraan.",
        "skills": ["Project Management", "Video & Photo Content Creation", "Social Media Branding (@abhinaya.uny)", "Sponsorship & Logistics"]
    }
]


# ==============================================================================
# Central DataStore with Automated Backup & Rollback
# ==============================================================================
class DataStore:
    """Encapsulates CRUD operations for team, competition, and gallery data with atomic writes."""

    def __init__(self, data_dir: Path = DATA_DIR, backup_manager: Optional[BackupManager] = None):
        self.data_dir = Path(data_dir)
        self.data_dir.mkdir(parents=True, exist_ok=True)
        self.team_file = self.data_dir / "teamData.ts"
        self.krtmi_file = self.data_dir / "krtmiData.ts"
        self.gallery_file = self.data_dir / "galleryData.ts"
        self.backup_mgr = backup_manager or BackupManager(backups_dir=self.data_dir.parent / "scripts" / "backups", data_dir=self.data_dir)

    # --------------------------------------------------------------------------
    # Team Members CRUD
    # --------------------------------------------------------------------------
    def load_team_members(self) -> List[Dict[str, Any]]:
        """Loads team members from teamData.ts, including advisor."""
        if not self.team_file.exists():
            return list(DEFAULT_SEED_MEMBERS)
        content = self.team_file.read_text(encoding="utf-8")

        # 1. First check if authentic structured UNY datasets are present
        advisors = extract_ts_array(content, "DOSEN_PEMBIMBING_LIST")
        if advisors is not None:
            leaders = extract_ts_array(content, "LEADERS_HALL_OF_FAME") or []
            managers = extract_ts_array(content, "MANAGERS_SHOWCASE") or []
            squad = extract_ts_object(content, "ACTIVE_TECHNICAL_SQUAD") or {}

            all_members = []
            seen_ids = set()
            for group in [advisors, leaders, managers]:
                for m in group:
                    if isinstance(m, dict) and m.get('id') and m.get('id') not in seen_ids:
                        seen_ids.add(m.get('id'))
                        all_members.append(m)
            if isinstance(squad, dict):
                for k in ['program', 'elektronik', 'mekanik', 'desain', 'advisors']:
                    sub = squad.get(k, [])
                    if isinstance(sub, list):
                        for m in sub:
                            if isinstance(m, dict) and m.get('id') and m.get('id') not in seen_ids:
                                seen_ids.add(m.get('id'))
                                all_members.append(m)
            if all_members:
                return all_members

        # 2. Fallback to standard TEAM_MEMBERS array and DOSEN_PEMBIMBING
        members = extract_ts_array(content, "TEAM_MEMBERS") or []
        advisor = extract_ts_object(content, "DOSEN_PEMBIMBING")
        if advisor and not any(m.get('id') == advisor.get('id') for m in members):
            return [advisor] + members
        if not members and not advisor:
            return list(DEFAULT_SEED_MEMBERS)
        return members

    def save_team_members(self, members: List[Dict[str, Any]], reason: str = "Update team members") -> bool:
        """Validates, backs up, and saves team members atomically."""
        # 1. Validate all members
        for idx, m in enumerate(members):
            valid, errors = ValidationEngine.validate_team_member(m)
            if not valid:
                raise ValueError(f"Validation failed for member #{idx+1} ({m.get('name', 'Unknown')}): {'; '.join(errors)}")

        # 2. Create automated backup
        backup_folder = self.backup_mgr.create_backup(reason=reason)

        # 3. Generate TypeScript content
        ts_code = TypeScriptFormatter.generate_team_data_file(members)

        # 4. Atomic write with rollback on error
        temp_file = self.team_file.with_suffix(".ts.tmp")
        try:
            temp_file.write_text(ts_code, encoding="utf-8")
            # Verify temporary file is re-parseable
            saved_content = temp_file.read_text(encoding="utf-8")
            verify_members = extract_ts_array(saved_content, "TEAM_MEMBERS")
            verify_advisor = extract_ts_object(saved_content, "DOSEN_PEMBIMBING")
            if verify_members is None:
                raise ValueError("Verification failed: Generated TypeScript TEAM_MEMBERS was not re-parseable.")
            total_verified = len(verify_members) + (1 if verify_advisor else 0)
            if total_verified != len(members):
                raise ValueError(f"Verification failed: Expected {len(members)} total roster items, got {total_verified}.")
            # Atomic rename
            temp_file.replace(self.team_file)
            return True
        except Exception as err:
            if temp_file.exists():
                temp_file.unlink()
            # Rollback
            self.backup_mgr.restore_backup(backup_folder)
            raise RuntimeError(f"Failed to write teamData.ts. Restored backup from {backup_folder.name}. Error: {err}")


    def add_team_member(self, member: Dict[str, Any]) -> bool:
        if not isinstance(member, dict):
            raise ValueError(f"Team member payload must be a dictionary, got {type(member).__name__}")
        members = self.load_team_members()
        # If id already exists, update it or generate unique
        existing_idx = next((i for i, m in enumerate(members) if m.get('id') == member.get('id')), -1)
        if existing_idx >= 0:
            members[existing_idx] = member
            reason = f"Update existing team member: {member.get('name', member.get('id'))}"
        else:
            members.append(member)
            reason = f"Add new team member: {member.get('name', member.get('id'))}"
        return self.save_team_members(members, reason=reason)

    def remove_team_member(self, member_id: str) -> bool:
        members = self.load_team_members()
        initial_len = len(members)
        members = [m for m in members if m.get('id') != member_id]
        if len(members) == initial_len:
            raise ValueError(f"Member with ID '{member_id}' not found.")
        return self.save_team_members(members, reason=f"Remove team member: {member_id}")

    # --------------------------------------------------------------------------
    # KRTMI & Guidebooks CRUD
    # --------------------------------------------------------------------------
    def load_krtmi_stories(self) -> List[Dict[str, Any]]:
        """Loads competition stories from krtmiData.ts."""
        if not self.krtmi_file.exists():
            return []
        content = self.krtmi_file.read_text(encoding="utf-8")
        stories = extract_ts_array(content, "KRTMI_STORIES")
        return stories or []

    def load_team_divisions(self) -> List[Dict[str, Any]]:
        """Loads division metadata from krtmiData.ts."""
        if not self.krtmi_file.exists():
            return list(DEFAULT_SEED_DIVISIONS)
        content = self.krtmi_file.read_text(encoding="utf-8")
        divs = extract_ts_array(content, "TEAM_DIVISIONS")
        return divs or list(DEFAULT_SEED_DIVISIONS)

    def save_krtmi_stories(self, stories: List[Dict[str, Any]], reason: str = "Update KRTMI competition stories") -> bool:
        """Validates, backs up, and saves KRTMI stories atomically."""
        for idx, s in enumerate(stories):
            valid, errors = ValidationEngine.validate_krtmi_story(s)
            if not valid:
                raise ValueError(f"Validation failed for story #{idx+1} ({s.get('year', 'Unknown')}): {'; '.join(errors)}")

        divisions = self.load_team_divisions()
        backup_folder = self.backup_mgr.create_backup(reason=reason)
        ts_code = TypeScriptFormatter.generate_krtmi_data_file(stories, divisions)

        temp_file = self.krtmi_file.with_suffix(".ts.tmp")
        try:
            temp_file.write_text(ts_code, encoding="utf-8")
            verify_stories = extract_ts_array(temp_file.read_text(encoding="utf-8"), "KRTMI_STORIES")
            if verify_stories is None or len(verify_stories) != len(stories):
                raise ValueError("Verification failed: Generated krtmiData.ts was not re-parseable.")
            temp_file.replace(self.krtmi_file)
            return True
        except Exception as err:
            if temp_file.exists():
                temp_file.unlink()
            self.backup_mgr.restore_backup(backup_folder)
            raise RuntimeError(f"Failed to write krtmiData.ts. Restored backup from {backup_folder.name}. Error: {err}")

    def add_krtmi_story(self, story: Dict[str, Any]) -> bool:
        if not isinstance(story, dict):
            raise ValueError(f"Competition story payload must be a dictionary, got {type(story).__name__}")
        stories = self.load_krtmi_stories()
        existing_idx = next((i for i, s in enumerate(stories) if str(s.get('year')) == str(story.get('year'))), -1)
        if existing_idx >= 0:
            stories[existing_idx] = story
            reason = f"Update competition edition: {story.get('year')}"
        else:
            stories.append(story)
            # Sort by year descending
            stories.sort(key=lambda x: str(x.get('year', '')), reverse=True)
            reason = f"Add competition edition: {story.get('year')}"
        return self.save_krtmi_stories(stories, reason=reason)

    def remove_krtmi_story(self, year: str) -> bool:
        stories = self.load_krtmi_stories()
        initial_len = len(stories)
        stories = [s for s in stories if str(s.get('year')) != str(year)]
        if len(stories) == initial_len:
            raise ValueError(f"Competition edition for year '{year}' not found.")
        return self.save_krtmi_stories(stories, reason=f"Remove competition edition: {year}")

    # --------------------------------------------------------------------------
    # Gallery Media CRUD
    # --------------------------------------------------------------------------
    def load_gallery_items(self) -> List[Dict[str, Any]]:
        """Loads gallery items from galleryData.ts."""
        if not self.gallery_file.exists():
            return []
        content = self.gallery_file.read_text(encoding="utf-8")
        items = extract_ts_array(content, "GALLERY_ITEMS")
        return items or []

    def save_gallery_items(self, items: List[Dict[str, Any]], reason: str = "Update gallery items") -> bool:
        """Validates, backs up, and saves gallery items atomically."""
        for idx, item in enumerate(items):
            valid, errors = ValidationEngine.validate_gallery_item(item)
            if not valid:
                raise ValueError(f"Validation failed for gallery item #{idx+1} ({item.get('title', 'Unknown')}): {'; '.join(errors)}")

        backup_folder = self.backup_mgr.create_backup(reason=reason)
        ts_code = TypeScriptFormatter.generate_gallery_data_file(items)

        temp_file = self.gallery_file.with_suffix(".ts.tmp")
        try:
            temp_file.write_text(ts_code, encoding="utf-8")
            verify_items = extract_ts_array(temp_file.read_text(encoding="utf-8"), "GALLERY_ITEMS")
            if verify_items is None or len(verify_items) != len(items):
                raise ValueError("Verification failed: Generated galleryData.ts was not re-parseable.")
            temp_file.replace(self.gallery_file)
            return True
        except Exception as err:
            if temp_file.exists():
                temp_file.unlink()
            self.backup_mgr.restore_backup(backup_folder)
            raise RuntimeError(f"Failed to write galleryData.ts. Restored backup from {backup_folder.name}. Error: {err}")

    def add_gallery_item(self, item: Dict[str, Any]) -> bool:
        if not isinstance(item, dict):
            raise ValueError(f"Gallery item payload must be a dictionary, got {type(item).__name__}")
        items = self.load_gallery_items()
        existing_idx = next((i for i, g in enumerate(items) if g.get('id') == item.get('id')), -1)
        if existing_idx >= 0:
            items[existing_idx] = item
            reason = f"Update gallery item: {item.get('id')}"
        else:
            items.append(item)
            reason = f"Add gallery item: {item.get('id')}"
        return self.save_gallery_items(items, reason=reason)

    def remove_gallery_item(self, item_id: str) -> bool:
        items = self.load_gallery_items()
        initial_len = len(items)
        items = [g for g in items if g.get('id') != item_id]
        if len(items) == initial_len:
            raise ValueError(f"Gallery item with ID '{item_id}' not found.")
        return self.save_gallery_items(items, reason=f"Remove gallery item: {item_id}")

    # --------------------------------------------------------------------------
    # Whole Data Validation & Seed
    # --------------------------------------------------------------------------
    def seed_initial_data(self) -> Dict[str, Any]:
        """Seeds initial data files if missing or empty."""
        results = {}
        if not self.team_file.exists():
            self.save_team_members(DEFAULT_SEED_MEMBERS, reason="Initial seed for teamData.ts")
            results["teamData"] = f"Seeded {len(DEFAULT_SEED_MEMBERS)} verified team members."
        else:
            results["teamData"] = "teamData.ts already exists."

        return results

    def validate_all_files(self) -> Dict[str, Any]:
        """Runs full validation across teamData.ts, krtmiData.ts, and galleryData.ts."""
        report = {
            "valid": True,
            "details": {}
        }

        # Validate Team Data
        team_errors = []
        try:
            members = self.load_team_members()
            for m in members:
                ok, errs = ValidationEngine.validate_team_member(m)
                if not ok:
                    team_errors.extend([f"[{m.get('name', 'Unknown')}] {e}" for e in errs])
            report["details"]["teamData"] = {
                "count": len(members),
                "errors": team_errors,
                "status": "PASS" if not team_errors else "FAIL"
            }
        except Exception as e:
            report["details"]["teamData"] = {"count": 0, "errors": [str(e)], "status": "FAIL"}
            team_errors.append(str(e))

        # Validate KRTMI Data
        krtmi_errors = []
        try:
            stories = self.load_krtmi_stories()
            for s in stories:
                ok, errs = ValidationEngine.validate_krtmi_story(s)
                if not ok:
                    krtmi_errors.extend([f"[{s.get('year', 'Unknown')}] {e}" for e in errs])
            report["details"]["krtmiData"] = {
                "count": len(stories),
                "errors": krtmi_errors,
                "status": "PASS" if not krtmi_errors else "FAIL"
            }
        except Exception as e:
            report["details"]["krtmiData"] = {"count": 0, "errors": [str(e)], "status": "FAIL"}
            krtmi_errors.append(str(e))

        # Validate Gallery Data
        gallery_errors = []
        try:
            items = self.load_gallery_items()
            for g in items:
                ok, errs = ValidationEngine.validate_gallery_item(g)
                if not ok:
                    gallery_errors.extend([f"[{g.get('id', 'Unknown')}] {e}" for e in errs])
            report["details"]["galleryData"] = {
                "count": len(items),
                "errors": gallery_errors,
                "status": "PASS" if not gallery_errors else "FAIL"
            }
        except Exception as e:
            report["details"]["galleryData"] = {"count": 0, "errors": [str(e)], "status": "FAIL"}
            gallery_errors.append(str(e))

        if team_errors or krtmi_errors or gallery_errors:
            report["valid"] = False

        return report


# ==============================================================================
# Interactive Terminal User Interface (TUI)
# ==============================================================================
class InteractiveTUI:
    """Colorized, interactive terminal menu interface."""

    def __init__(self, datastore: DataStore):
        self.store = datastore
        self.backup_mgr = datastore.backup_mgr

    def header(self, title: str):
        print(f"\n{Colors.BRIGHT_CYAN}{'='*72}{Colors.RESET}")
        print(f"{Colors.BOLD}{Colors.BRIGHT_WHITE} 🤖 ABHINAYA UNY DATA MANAGER — {title.upper()}{Colors.RESET}")
        print(f"{Colors.BRIGHT_CYAN}{'='*72}{Colors.RESET}\n")

    def run(self):
        while True:
            self.header("Menu Utama (Main Menu)")
            print(f" {Colors.BRIGHT_YELLOW}[1]{Colors.RESET} 👥 Manajemen Tim (Team Members)")
            print(f" {Colors.BRIGHT_YELLOW}[2]{Colors.RESET} 🤖 Manajemen Kompetisi & Guidebooks (KRTMI & Technocorner)")
            print(f" {Colors.BRIGHT_YELLOW}[3]{Colors.RESET} 📸 Manajemen Galeri Media (Gallery & Photos)")
            print(f" {Colors.BRIGHT_YELLOW}[4]{Colors.RESET} 💾 Backup & Restore System")
            print(f" {Colors.BRIGHT_YELLOW}[5]{Colors.RESET} 🔍 Validasi Integritas Data (Schema Check)")
            print(f" {Colors.BRIGHT_YELLOW}[6]{Colors.RESET} 🌱 Seed Data Awal (Initialize Default Records)")
            print(f" {Colors.BRIGHT_RED}[0]{Colors.RESET} ❌ Keluar (Exit)")
            print()
            choice = input(f"{Colors.BOLD}Pilih opsi [0-6]: {Colors.RESET}").strip()

            if choice == '1':
                self.menu_team()
            elif choice == '2':
                self.menu_krtmi()
            elif choice == '3':
                self.menu_gallery()
            elif choice == '4':
                self.menu_backups()
            elif choice == '5':
                self.action_validate()
            elif choice == '6':
                self.action_seed()
            elif choice in ('0', 'q', 'exit'):
                print(f"\n{Colors.BRIGHT_GREEN}Sampai jumpa! Menutup Abhinaya Manager Tool.{Colors.RESET}\n")
                break
            else:
                print(f"{Colors.RED}Pilihan tidak valid.{Colors.RESET}")

    # --------------------------------------------------------------------------
    # Team Menu
    # --------------------------------------------------------------------------
    def menu_team(self):
        while True:
            self.header("Manajemen Anggota Tim")
            print(f" {Colors.CYAN}[1]{Colors.RESET} 📋 Daftar Semua Anggota (List All)")
            print(f" {Colors.CYAN}[2]{Colors.RESET} 🔍 Filter / Cari Anggota Berdasarkan Divisi")
            print(f" {Colors.CYAN}[3]{Colors.RESET} ➕ Tambah Anggota Baru (Add Member)")
            print(f" {Colors.CYAN}[4]{Colors.RESET} ✏️  Edit Data Anggota (Edit Member)")
            print(f" {Colors.CYAN}[5]{Colors.RESET} 🗑️  Hapus Anggota (Remove Member)")
            print(f" {Colors.CYAN}[6]{Colors.RESET} 📄 Ekspor Roster ke Markdown / JSON")
            print(f" {Colors.RED}[0]{Colors.RESET} 🔙 Kembali ke Menu Utama")
            print()
            choice = input(f"{Colors.BOLD}Pilih opsi [0-6]: {Colors.RESET}").strip()

            if choice == '1':
                self._list_team_members()
            elif choice == '2':
                self._search_team_members()
            elif choice == '3':
                self._add_team_member_wizard()
            elif choice == '4':
                self._edit_team_member_wizard()
            elif choice == '5':
                self._remove_team_member_wizard()
            elif choice == '6':
                self._export_team_roster()
            elif choice == '0':
                break

    def _list_team_members(self, filter_div: Optional[str] = None):
        members = self.store.load_team_members()
        if filter_div:
            members = [m for m in members if filter_div.lower() in m.get('division', '').lower()]

        print(f"\n{Colors.BOLD}TOTAL ANGGOTA: {len(members)}{Colors.RESET}\n")
        print(f"{Colors.DIM}{'ID':<24} | {'NAMA':<30} | {'DIVISI':<20} | {'ROLE'}{Colors.RESET}")
        print(f"{'-'*95}")
        for m in members:
            div_color = Colors.BRIGHT_GREEN if m.get('division') == 'Programming & AI' else \
                        Colors.BRIGHT_YELLOW if m.get('division') == 'Elektrik' else \
                        Colors.BRIGHT_CYAN if m.get('division') == 'Mekanik' else \
                        Colors.BRIGHT_MAGENTA if m.get('division') == 'Manajerial & Media' else Colors.WHITE
            print(f"{m.get('id', ''):<24} | {m.get('name', ''):<30} | {div_color}{m.get('division', ''):<20}{Colors.RESET} | {m.get('role', '')}")
        print()
        input(f"{Colors.DIM}Tekan Enter untuk melanjutkan...{Colors.RESET}")

    def _search_team_members(self):
        query = input("Masukkan nama, divisi, atau kata kunci: ").strip().lower()
        members = self.store.load_team_members()
        matched = [m for m in members if query in m.get('name', '').lower() or query in m.get('division', '').lower() or query in m.get('role', '').lower()]
        print(f"\n{Colors.GREEN}Ditemukan {len(matched)} anggota:{Colors.RESET}\n")
        for m in matched:
            print(f" • {Colors.BOLD}{m.get('name')}{Colors.RESET} ({m.get('division')}) — {m.get('role')} [ID: {m.get('id')}]")
        print()
        input(f"{Colors.DIM}Tekan Enter untuk melanjutkan...{Colors.RESET}")

    def _add_team_member_wizard(self):
        print(f"\n{Colors.BOLD}=== Tambah Anggota Tim Baru ==={Colors.RESET}")
        name = input("Nama Lengkap: ").strip()
        if not name:
            print(f"{Colors.RED}Nama tidak boleh kosong.{Colors.RESET}")
            return
        slug_default = re.sub(r'[^a-z0-9]+', '-', name.lower()).strip('-')
        m_id = input(f"ID Unik (default: {slug_default}): ").strip() or slug_default
        nim = input("NIM: ").strip()
        prodi = input("Program Studi (contoh: S1 Pendidikan Teknik Mekatronika): ").strip()
        faculty = input("Fakultas (contoh: Fakultas Teknik (FT UNY)): ").strip() or "Fakultas Teknik (FT UNY)"

        print("\nPilih Divisi:")
        print(" [1] Mekanik\n [2] Elektrik\n [3] Programming & AI\n [4] Manajerial & Media\n [5] Pembimbing")
        div_map = {'1': 'Mekanik', '2': 'Elektrik', '3': 'Programming & AI', '4': 'Manajerial & Media', '5': 'Pembimbing'}
        div_choice = input("Pilihan [1-5]: ").strip()
        division = div_map.get(div_choice, 'Mekanik')

        role = input("Role / Jabatan Utama: ").strip()
        sub_role = input("Sub-Role / Tanggung Jawab Teknis: ").strip()
        gen = input("Angkatan / Tahun (contoh: 2024): ").strip()
        specs_input = input("Spesialisasi Teknis (pisahkan koma): ").strip()
        specs = [s.strip() for s in specs_input.split(",") if s.strip()]
        bio = input("Bio Singkat: ").strip()
        image = input("Path Foto (default: /assets/team/placeholder.png): ").strip() or "/assets/team/placeholder.png"
        badge = input("Badge (contoh: CAD Specialist): ").strip() or role

        new_member = {
            "id": m_id,
            "name": name,
            "nim": nim,
            "studyProgram": prodi,
            "faculty": faculty,
            "division": division,
            "role": role,
            "subRole": sub_role,
            "generation": gen,
            "specialization": specs,
            "bio": bio,
            "image": image,
            "badge": badge,
            "featured": False
        }

        try:
            self.store.add_team_member(new_member)
            print(f"\n{Colors.BRIGHT_GREEN}✅ Berhasil menambahkan anggota: {name} (ID: {m_id}){Colors.RESET}")
        except Exception as e:
            print(f"\n{Colors.BRIGHT_RED}❌ Gagal menambahkan anggota: {e}{Colors.RESET}")
        input(f"{Colors.DIM}Tekan Enter untuk melanjutkan...{Colors.RESET}")

    def _edit_team_member_wizard(self):
        m_id = input("Masukkan ID Anggota yang ingin diedit: ").strip()
        members = self.store.load_team_members()
        member = next((m for m in members if m.get('id') == m_id), None)
        if not member:
            print(f"{Colors.RED}Anggota dengan ID '{m_id}' tidak ditemukan.{Colors.RESET}")
            input(f"{Colors.DIM}Tekan Enter untuk melanjutkan...{Colors.RESET}")
            return

        print(f"\nMengedit: {Colors.BOLD}{member.get('name')}{Colors.RESET} (Kosongkan jika tidak ingin mengubah)")
        name = input(f"Nama [{member.get('name')}]: ").strip() or member.get('name')
        nim = input(f"NIM [{member.get('nim', '')}]: ").strip() or member.get('nim', '')
        prodi = input(f"Program Studi [{member.get('studyProgram', '')}]: ").strip() or member.get('studyProgram', '')
        role = input(f"Role [{member.get('role', '')}]: ").strip() or member.get('role', '')
        bio = input(f"Bio [{member.get('bio', '')}]: ").strip() or member.get('bio', '')

        member['name'] = name
        member['nim'] = nim
        member['studyProgram'] = prodi
        member['role'] = role
        member['bio'] = bio

        try:
            self.store.add_team_member(member)
            print(f"\n{Colors.BRIGHT_GREEN}✅ Berhasil memperbarui data anggota: {name}{Colors.RESET}")
        except Exception as e:
            print(f"\n{Colors.BRIGHT_RED}❌ Gagal memperbarui: {e}{Colors.RESET}")
        input(f"{Colors.DIM}Tekan Enter untuk melanjutkan...{Colors.RESET}")

    def _remove_team_member_wizard(self):
        m_id = input("Masukkan ID Anggota yang ingin dihapus: ").strip()
        confirm = input(f"{Colors.YELLOW}Yakin ingin menghapus anggota dengan ID '{m_id}'? (y/N): {Colors.RESET}").strip().lower()
        if confirm == 'y':
            try:
                self.store.remove_team_member(m_id)
                print(f"\n{Colors.BRIGHT_GREEN}✅ Berhasil menghapus anggota {m_id}{Colors.RESET}")
            except Exception as e:
                print(f"\n{Colors.BRIGHT_RED}❌ Gagal menghapus: {e}{Colors.RESET}")
        input(f"{Colors.DIM}Tekan Enter untuk melanjutkan...{Colors.RESET}")

    def _export_team_roster(self):
        members = self.store.load_team_members()
        export_file = PROJECT_ROOT / "TEAM_ROSTER_EXPORT.md"
        lines = [
            "# Official Abhinaya UNY Team Roster Export\n",
            f"Generated on: {datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n",
            "| No | Nama | NIM | Prodi / Fakultas | Divisi | Role | Spesialisasi |",
            "|:---|:---|:---|:---|:---|:---|:---|"
        ]
        for idx, m in enumerate(members, 1):
            specs = ", ".join(m.get('specialization', [])) if isinstance(m.get('specialization'), list) else str(m.get('specialization', ''))
            lines.append(f"| {idx:02d} | **{m.get('name')}** | {m.get('nim', '-')} | {m.get('studyProgram')} | {m.get('division')} | {m.get('role')} | {specs} |")

        export_file.write_text("\n".join(lines), encoding="utf-8")
        print(f"\n{Colors.BRIGHT_GREEN}✅ Berhasil mengekspor roster tim ke: {export_file}{Colors.RESET}")
        input(f"{Colors.DIM}Tekan Enter untuk melanjutkan...{Colors.RESET}")

    # --------------------------------------------------------------------------
    # KRTMI / Competitions Menu
    # --------------------------------------------------------------------------
    def menu_krtmi(self):
        while True:
            self.header("Manajemen Kompetisi & Guidebooks")
            print(f" {Colors.CYAN}[1]{Colors.RESET} 📋 Daftar Edisi Kompetisi (List Editions)")
            print(f" {Colors.CYAN}[2]{Colors.RESET} 📖 Detail Spesifikasi & Peraturan Edisi (View Specs)")
            print(f" {Colors.CYAN}[3]{Colors.RESET} ➕ Tambah Edisi Kompetisi Baru (Add Edition)")
            print(f" {Colors.CYAN}[4]{Colors.RESET} ✏️  Update Aturan / Scoring / Robot Specs")
            print(f" {Colors.CYAN}[5]{Colors.RESET} 🗑️  Hapus Edisi Kompetisi (Remove Edition)")
            print(f" {Colors.RED}[0]{Colors.RESET} 🔙 Kembali ke Menu Utama")
            print()
            choice = input(f"{Colors.BOLD}Pilih opsi [0-5]: {Colors.RESET}").strip()

            if choice == '1':
                self._list_krtmi_stories()
            elif choice == '2':
                self._view_krtmi_story_detail()
            elif choice == '3':
                self._add_krtmi_story_wizard()
            elif choice == '4':
                self._update_krtmi_story_wizard()
            elif choice == '5':
                self._remove_krtmi_story_wizard()
            elif choice == '0':
                break

    def _list_krtmi_stories(self):
        stories = self.store.load_krtmi_stories()
        print(f"\n{Colors.BOLD}TOTAL EDISI KOMPETISI: {len(stories)}{Colors.RESET}\n")
        print(f"{Colors.DIM}{'TAHUN':<8} | {'JUDUL KOMPETISI':<45} | {'CAPAIAN / PRESTASI'}{Colors.RESET}")
        print(f"{'-'*95}")
        for s in stories:
            champ_badge = f"{Colors.BRIGHT_YELLOW}🏆 {Colors.RESET}" if s.get('isChampion') else "  "
            print(f"{s.get('year', ''):<8} | {s.get('title', ''):<45} | {champ_badge}{s.get('achievement', '')}")
        print()
        input(f"{Colors.DIM}Tekan Enter untuk melanjutkan...{Colors.RESET}")

    def _view_krtmi_story_detail(self):
        year = input("Masukkan tahun kompetisi (contoh: 2024): ").strip()
        stories = self.store.load_krtmi_stories()
        story = next((s for s in stories if str(s.get('year')) == year), None)
        if not story:
            print(f"{Colors.RED}Edisi kompetisi tahun '{year}' tidak ditemukan.{Colors.RESET}")
            input(f"{Colors.DIM}Tekan Enter untuk melanjutkan...{Colors.RESET}")
            return

        print(f"\n{Colors.BOLD}{Colors.BRIGHT_CYAN}=== {story.get('title')} ==={Colors.RESET}")
        print(f"📍 Lokasi: {story.get('location')}")
        print(f"🎯 Tema: {story.get('theme')}")
        print(f"🏆 Prestasi: {story.get('achievement')}")
        print(f"\n{Colors.BOLD}Ringkasan Tantangan:{Colors.RESET}\n{story.get('storySummary')}")
        print(f"\n{Colors.BOLD}Spesifikasi Arena:{Colors.RESET}")
        for k, v in story.get('arenaSpecs', {}).items():
            print(f"  • {k.capitalize()}: {v}")
        print(f"\n{Colors.BOLD}Spesifikasi Robot:{Colors.RESET}")
        for k, v in story.get('robotSpecs', {}).items():
            print(f"  • {k.capitalize()}: {v}")
        print(f"\n{Colors.BOLD}Aturan Misi:{Colors.RESET}")
        for r in story.get('missionRules', []):
            print(f"  • {r}")
        print(f"\n{Colors.BOLD}Sistem Scoring:{Colors.RESET}")
        for sc in story.get('scoringSystem', []):
            print(f"  • {sc}")
        print(f"\n{Colors.BOLD}Guidebook PDF:{Colors.RESET} {story.get('pdfTitle')} ({story.get('pdfSize')}) -> {story.get('pdfFile')}")
        print()
        input(f"{Colors.DIM}Tekan Enter untuk melanjutkan...{Colors.RESET}")

    def _add_krtmi_story_wizard(self):
        print(f"\n{Colors.BOLD}=== Tambah Edisi Kompetisi Baru ==={Colors.RESET}")
        year = input("Tahun (contoh: 2027): ").strip()
        title = input("Judul Kompetisi: ").strip()
        tagline = input("Tagline: ").strip()
        theme = input("Tema Pertandingan: ").strip()
        location = input("Lokasi & Penyelenggara: ").strip()
        summary = input("Ringkasan Tantangan / Cerita: ").strip()

        arena_dims = input("Dimensi Arena (contoh: 500 cm x 400 cm): ").strip()
        arena_surf = input("Permukaan Arena: ").strip()
        arena_zones = input("Zona-Zona Arena: ").strip()

        robot_dims = input("Dimensi Robot (contoh: Maksimal 50 cm x 50 cm): ").strip()
        robot_weight = input("Batas Berat (contoh: Maksimal 10 kg): ").strip()
        robot_power = input("Catu Daya (contoh: LiPo 3S 12.6V): ").strip()
        robot_ctrl = input("Kontroller (contoh: ESP32 + STM32): ").strip()
        robot_mech = input("Mekanisme (contoh: Mecanum Drive + Gripper): ").strip()

        achievement = input("Capaian / Prestasi: ").strip()
        is_champ = input("Juara 1/2/3? (y/n): ").strip().lower() == 'y'
        pdf_file = input("Nama File PDF Guidebook: ").strip()
        pdf_size = input("Ukuran File PDF (contoh: 5.2 MB): ").strip() or "5.0 MB"
        pdf_title = input("Judul Panduan PDF: ").strip() or f"Buku Panduan KRTMI {year}"

        new_story = {
            "year": year,
            "badgeYear": year,
            "title": title,
            "tagline": tagline,
            "theme": theme,
            "location": location,
            "storySummary": summary,
            "arenaSpecs": {
                "dimensions": arena_dims,
                "surface": arena_surf,
                "zones": arena_zones
            },
            "missionRules": ["Memulai pertandingan dari start zone.", "Menyelesaikan misi pemindahan objek."],
            "robotSpecs": {
                "dimensions": robot_dims,
                "weight": robot_weight,
                "power": robot_power,
                "controller": robot_ctrl,
                "mechanism": robot_mech
            },
            "scoringSystem": ["Selesai Misi Penuh: 100 Poin", "Time Bonus: 1 Poin/detik"],
            "teamRoleAndFunFacts": ["Riset inovasi divisi Tematik Abhinaya UNY."],
            "achievement": achievement,
            "isChampion": is_champ,
            "pdfFile": pdf_file,
            "pdfSize": pdf_size,
            "pdfTitle": pdf_title
        }

        try:
            self.store.add_krtmi_story(new_story)
            print(f"\n{Colors.BRIGHT_GREEN}✅ Berhasil menambahkan edisi kompetisi {year}!{Colors.RESET}")
        except Exception as e:
            print(f"\n{Colors.BRIGHT_RED}❌ Gagal menambahkan: {e}{Colors.RESET}")
        input(f"{Colors.DIM}Tekan Enter untuk melanjutkan...{Colors.RESET}")

    def _update_krtmi_story_wizard(self):
        year = input("Masukkan tahun kompetisi yang ingin diupdate: ").strip()
        stories = self.store.load_krtmi_stories()
        story = next((s for s in stories if str(s.get('year')) == year), None)
        if not story:
            print(f"{Colors.RED}Edisi tahun '{year}' tidak ditemukan.{Colors.RESET}")
            input(f"{Colors.DIM}Tekan Enter untuk melanjutkan...{Colors.RESET}")
            return

        print(f"\nMengedit Edisi: {Colors.BOLD}{story.get('title')}{Colors.RESET}")
        title = input(f"Judul [{story.get('title')}]: ").strip() or story.get('title')
        achievement = input(f"Prestasi [{story.get('achievement')}]: ").strip() or story.get('achievement')
        story['title'] = title
        story['achievement'] = achievement

        try:
            self.store.add_krtmi_story(story)
            print(f"\n{Colors.BRIGHT_GREEN}✅ Berhasil memperbarui edisi kompetisi {year}!{Colors.RESET}")
        except Exception as e:
            print(f"\n{Colors.BRIGHT_RED}❌ Gagal memperbarui: {e}{Colors.RESET}")
        input(f"{Colors.DIM}Tekan Enter untuk melanjutkan...{Colors.RESET}")

    def _remove_krtmi_story_wizard(self):
        year = input("Masukkan tahun kompetisi yang ingin dihapus: ").strip()
        confirm = input(f"{Colors.YELLOW}Yakin ingin menghapus edisi tahun '{year}'? (y/N): {Colors.RESET}").strip().lower()
        if confirm == 'y':
            try:
                self.store.remove_krtmi_story(year)
                print(f"\n{Colors.BRIGHT_GREEN}✅ Berhasil menghapus edisi {year}{Colors.RESET}")
            except Exception as e:
                print(f"\n{Colors.BRIGHT_RED}❌ Gagal menghapus: {e}{Colors.RESET}")
        input(f"{Colors.DIM}Tekan Enter untuk melanjutkan...{Colors.RESET}")

    # --------------------------------------------------------------------------
    # Gallery Menu
    # --------------------------------------------------------------------------
    def menu_gallery(self):
        while True:
            self.header("Manajemen Galeri Media & Foto")
            print(f" {Colors.CYAN}[1]{Colors.RESET} 📋 Daftar Item Galeri (List Items)")
            print(f" {Colors.CYAN}[2]{Colors.RESET} ➕ Tambah Item Galeri Baru (Add Photo/Video)")
            print(f" {Colors.CYAN}[3]{Colors.RESET} 🗑️  Hapus Item Galeri (Remove Item)")
            print(f" {Colors.RED}[0]{Colors.RESET} 🔙 Kembali ke Menu Utama")
            print()
            choice = input(f"{Colors.BOLD}Pilih opsi [0-3]: {Colors.RESET}").strip()

            if choice == '1':
                self._list_gallery_items()
            elif choice == '2':
                self._add_gallery_item_wizard()
            elif choice == '3':
                self._remove_gallery_item_wizard()
            elif choice == '0':
                break

    def _list_gallery_items(self):
        items = self.store.load_gallery_items()
        print(f"\n{Colors.BOLD}TOTAL FOTO / MEDIA: {len(items)}{Colors.RESET}\n")
        print(f"{Colors.DIM}{'ID':<25} | {'KATEGORI':<18} | {'TAHUN':<6} | {'JUDUL'}{Colors.RESET}")
        print(f"{'-'*95}")
        for g in items:
            print(f"{g.get('id', ''):<25} | {g.get('category', ''):<18} | {g.get('year', ''):<6} | {g.get('title', '')}")
        print()
        input(f"{Colors.DIM}Tekan Enter untuk melanjutkan...{Colors.RESET}")

    def _add_gallery_item_wizard(self):
        print(f"\n{Colors.BOLD}=== Tambah Foto / Media Baru ==={Colors.RESET}")
        title = input("Judul Foto / Media: ").strip()
        slug_default = re.sub(r'[^a-z0-9]+', '-', title.lower()).strip('-')
        g_id = input(f"ID Unik (default: {slug_default}): ").strip() or slug_default

        print("\nPilih Kategori:")
        print(" [1] Arena Lomba\n [2] Panggung Juara\n [3] Riset & Lab\n [4] Behind The Scenes")
        cat_map = {'1': 'Arena Lomba', '2': 'Panggung Juara', '3': 'Riset & Lab', '4': 'Behind The Scenes'}
        cat_choice = input("Pilihan [1-4]: ").strip()
        category = cat_map.get(cat_choice, 'Arena Lomba')

        year = input("Tahun (contoh: 2024): ").strip()
        image = input("Path Gambar (contoh: /gallery/krtmi_action.jpg): ").strip()
        caption = input("Keterangan Foto / Caption: ").strip()
        event = input("Nama Acara / Event (contoh: KRI Nasional 2024 UMS): ").strip()

        new_item = {
            "id": g_id,
            "title": title,
            "category": category,
            "year": year,
            "image": image,
            "caption": caption,
            "event": event
        }

        try:
            self.store.add_gallery_item(new_item)
            print(f"\n{Colors.BRIGHT_GREEN}✅ Berhasil menambahkan foto galeri {g_id}!{Colors.RESET}")
        except Exception as e:
            print(f"\n{Colors.BRIGHT_RED}❌ Gagal menambahkan: {e}{Colors.RESET}")
        input(f"{Colors.DIM}Tekan Enter untuk melanjutkan...{Colors.RESET}")

    def _remove_gallery_item_wizard(self):
        g_id = input("Masukkan ID Foto/Media yang ingin dihapus: ").strip()
        confirm = input(f"{Colors.YELLOW}Yakin ingin menghapus item '{g_id}'? (y/N): {Colors.RESET}").strip().lower()
        if confirm == 'y':
            try:
                self.store.remove_gallery_item(g_id)
                print(f"\n{Colors.BRIGHT_GREEN}✅ Berhasil menghapus item {g_id}{Colors.RESET}")
            except Exception as e:
                print(f"\n{Colors.BRIGHT_RED}❌ Gagal menghapus: {e}{Colors.RESET}")
        input(f"{Colors.DIM}Tekan Enter untuk melanjutkan...{Colors.RESET}")

    # --------------------------------------------------------------------------
    # Backups Menu
    # --------------------------------------------------------------------------
    def menu_backups(self):
        while True:
            self.header("Backup & Restore System")
            print(f" {Colors.CYAN}[1]{Colors.RESET} 📸 Buat Snapshot Backup Sekarang (Instant Snapshot)")
            print(f" {Colors.CYAN}[2]{Colors.RESET} 📋 Lihat Riwayat Snapshot Backup (List Backups)")
            print(f" {Colors.CYAN}[3]{Colors.RESET} 🔄 Restore Data dari Snapshot (Restore Backup)")
            print(f" {Colors.RED}[0]{Colors.RESET} 🔙 Kembali ke Menu Utama")
            print()
            choice = input(f"{Colors.BOLD}Pilih opsi [0-3]: {Colors.RESET}").strip()

            if choice == '1':
                reason = input("Catatan / Alasan backup: ").strip() or "Manual backup from TUI"
                folder = self.backup_mgr.create_backup(reason=reason)
                print(f"\n{Colors.BRIGHT_GREEN}✅ Backup berhasil dibuat di: {folder.name}{Colors.RESET}")
                input(f"{Colors.DIM}Tekan Enter untuk melanjutkan...{Colors.RESET}")
            elif choice == '2':
                backups = self.backup_mgr.list_backups()
                print(f"\n{Colors.BOLD}TOTAL SNAPSHOT BACKUP: {len(backups)}{Colors.RESET}\n")
                for b in backups:
                    print(f" • {Colors.BRIGHT_CYAN}{b.get('backup_id')}{Colors.RESET} ({b.get('timestamp')}) — {b.get('reason')}")
                print()
                input(f"{Colors.DIM}Tekan Enter untuk melanjutkan...{Colors.RESET}")
            elif choice == '3':
                b_id = input("Masukkan ID Snapshot Backup yang ingin di-restore: ").strip()
                confirm = input(f"{Colors.YELLOW}Perhatian: Data saat ini akan ditimpa dengan data backup '{b_id}'. Lanjutkan? (y/N): {Colors.RESET}").strip().lower()
                if confirm == 'y':
                    ok, msg = self.backup_mgr.restore_backup(b_id)
                    if ok:
                        print(f"\n{Colors.BRIGHT_GREEN}✅ {msg}{Colors.RESET}")
                    else:
                        print(f"\n{Colors.BRIGHT_RED}❌ {msg}{Colors.RESET}")
                input(f"{Colors.DIM}Tekan Enter untuk melanjutkan...{Colors.RESET}")
            elif choice == '0':
                break

    # --------------------------------------------------------------------------
    # General Actions
    # --------------------------------------------------------------------------
    def action_validate(self):
        print(f"\n{Colors.BOLD}Menjalankan validasi integritas data...{Colors.RESET}\n")
        report = self.store.validate_all_files()
        for k, v in report.get('details', {}).items():
            color = Colors.BRIGHT_GREEN if v.get('status') == 'PASS' else Colors.BRIGHT_RED
            print(f" • {Colors.BOLD}{k:<15}{Colors.RESET} : {color}[{v.get('status')}]{Colors.RESET} ({v.get('count')} records)")
            if v.get('errors'):
                for err in v.get('errors'):
                    print(f"    - {Colors.RED}{err}{Colors.RESET}")
        print()
        if report.get('valid'):
            print(f"{Colors.BRIGHT_GREEN}🎉 SELURUH DATA TERVERIFIKASI VALID & KONSISTEN!{Colors.RESET}\n")
        else:
            print(f"{Colors.BRIGHT_RED}⚠️  DITEMUKAN KESALAHAN PADA DATA. SILAKAN PERIKSA DETAIL DI ATAS.{Colors.RESET}\n")
        input(f"{Colors.DIM}Tekan Enter untuk melanjutkan...{Colors.RESET}")

    def action_seed(self):
        confirm = input(f"{Colors.YELLOW}Inisialisasi seed data awal (jika file belum ada)? (y/N): {Colors.RESET}").strip().lower()
        if confirm == 'y':
            res = self.store.seed_initial_data()
            print(f"\n{Colors.BRIGHT_GREEN}Hasil Seed: {res}{Colors.RESET}\n")
        input(f"{Colors.DIM}Tekan Enter untuk melanjutkan...{Colors.RESET}")


# ==============================================================================
# CLI Flag Controller
# ==============================================================================
class CLIController:
    """Handles non-interactive command-line interface flags."""

    def __init__(self, datastore: DataStore):
        self.store = datastore
        self.backup_mgr = datastore.backup_mgr

    def handle(self, args: argparse.Namespace) -> int:
        # Backup
        if args.backup:
            folder = self.backup_mgr.create_backup(reason=args.reason or "CLI --backup command")
            print(json.dumps({"status": "success", "backup_id": folder.name, "path": str(folder)}, indent=2))
            return 0

        # List backups
        if args.list_backups:
            backups = self.backup_mgr.list_backups()
            print(json.dumps(backups, indent=2))
            return 0

        # Restore
        if args.restore is not None:
            if not str(args.restore).strip():
                print(json.dumps({"status": "error", "message": "Empty snapshot ID or path provided for --restore"}, indent=2), file=sys.stderr)
                return 1
            ok, msg = self.backup_mgr.restore_backup(args.restore)
            if ok:
                print(json.dumps({"status": "success", "message": msg}, indent=2))
                return 0
            else:
                print(json.dumps({"status": "error", "message": msg}, indent=2), file=sys.stderr)
                return 1

        # Validate
        if args.validate:
            report = self.store.validate_all_files()
            print(json.dumps(report, indent=2))
            return 0 if report.get("valid") else 1

        # Seed
        if args.seed:
            res = self.store.seed_initial_data()
            print(json.dumps(res, indent=2))
            return 0

        # Team flags
        if args.list_team:
            members = self.store.load_team_members()
            if args.division:
                members = [m for m in members if args.division.lower() in m.get('division', '').lower()]
            if args.json:
                print(json.dumps(members, indent=2))
            else:
                print(f"{'ID':<24} | {'NAMA':<30} | {'DIVISI':<20} | {'ROLE'}")
                print(f"{'-'*95}")
                for m in members:
                    print(f"{m.get('id', ''):<24} | {m.get('name', ''):<30} | {m.get('division', ''):<20} | {m.get('role', '')}")
            return 0

        if args.search_team is not None:
            query = args.search_team.lower()
            members = self.store.load_team_members()
            matched = [m for m in members if query in m.get('name', '').lower() or query in m.get('division', '').lower() or query in m.get('role', '').lower()]
            print(json.dumps(matched, indent=2))
            return 0

        if args.add_member is not None:
            if not str(args.add_member).strip():
                print(json.dumps({"status": "error", "message": "Empty payload provided for --add-member"}, indent=2), file=sys.stderr)
                return 1
            try:
                data = json.loads(args.add_member)
            except json.JSONDecodeError:
                # Check if it is a filepath
                p = Path(args.add_member)
                if p.exists() and p.is_file():
                    try:
                        data = json.loads(p.read_text(encoding="utf-8"))
                    except Exception as e:
                        print(json.dumps({"status": "error", "message": f"Failed to read or parse JSON file {p}: {e}"}, indent=2), file=sys.stderr)
                        return 1
                else:
                    print(json.dumps({"status": "error", "message": "Invalid JSON string or file path for --add-member"}, indent=2), file=sys.stderr)
                    return 1

            if not isinstance(data, dict):
                print(json.dumps({"status": "error", "message": f"Payload for --add-member must be a JSON dictionary, got {type(data).__name__}"}, indent=2), file=sys.stderr)
                return 1

            try:
                self.store.add_team_member(data)
                print(json.dumps({"status": "success", "action": "add_member", "id": data.get("id")}, indent=2))
                return 0
            except Exception as e:
                print(json.dumps({"status": "error", "message": str(e)}, indent=2), file=sys.stderr)
                return 1

        if args.remove_member is not None:
            if not str(args.remove_member).strip():
                print(json.dumps({"status": "error", "message": "Empty member ID provided for --remove-member"}, indent=2), file=sys.stderr)
                return 1
            try:
                self.store.remove_team_member(args.remove_member)
                print(json.dumps({"status": "success", "action": "remove_member", "id": args.remove_member}, indent=2))
                return 0
            except Exception as e:
                print(json.dumps({"status": "error", "message": str(e)}, indent=2), file=sys.stderr)
                return 1

        # KRTMI flags
        if args.list_krtmi:
            stories = self.store.load_krtmi_stories()
            if args.json:
                print(json.dumps(stories, indent=2))
            else:
                print(f"{'TAHUN':<8} | {'JUDUL KOMPETISI':<45} | {'CAPAIAN / PRESTASI'}")
                print(f"{'-'*95}")
                for s in stories:
                    print(f"{s.get('year', ''):<8} | {s.get('title', ''):<45} | {s.get('achievement', '')}")
            return 0

        if args.view_krtmi is not None:
            if not str(args.view_krtmi).strip():
                print(json.dumps({"status": "error", "message": "Empty year provided for --view-krtmi"}, indent=2), file=sys.stderr)
                return 1
            stories = self.store.load_krtmi_stories()
            story = next((s for s in stories if str(s.get('year')) == str(args.view_krtmi)), None)
            if story:
                print(json.dumps(story, indent=2))
                return 0
            else:
                print(json.dumps({"status": "error", "message": f"Year {args.view_krtmi} not found"}, indent=2), file=sys.stderr)
                return 1

        if args.add_krtmi is not None:
            if not str(args.add_krtmi).strip():
                print(json.dumps({"status": "error", "message": "Empty payload provided for --add-krtmi"}, indent=2), file=sys.stderr)
                return 1
            try:
                data = json.loads(args.add_krtmi)
            except json.JSONDecodeError:
                p = Path(args.add_krtmi)
                if p.exists() and p.is_file():
                    try:
                        data = json.loads(p.read_text(encoding="utf-8"))
                    except Exception as e:
                        print(json.dumps({"status": "error", "message": f"Failed to read or parse JSON file {p}: {e}"}, indent=2), file=sys.stderr)
                        return 1
                else:
                    print(json.dumps({"status": "error", "message": "Invalid JSON string or file path for --add-krtmi"}, indent=2), file=sys.stderr)
                    return 1

            if not isinstance(data, dict):
                print(json.dumps({"status": "error", "message": f"Payload for --add-krtmi must be a JSON dictionary, got {type(data).__name__}"}, indent=2), file=sys.stderr)
                return 1

            try:
                self.store.add_krtmi_story(data)
                print(json.dumps({"status": "success", "action": "add_krtmi", "year": data.get("year")}, indent=2))
                return 0
            except Exception as e:
                print(json.dumps({"status": "error", "message": str(e)}, indent=2), file=sys.stderr)
                return 1

        if args.remove_krtmi is not None:
            if not str(args.remove_krtmi).strip():
                print(json.dumps({"status": "error", "message": "Empty year provided for --remove-krtmi"}, indent=2), file=sys.stderr)
                return 1
            try:
                self.store.remove_krtmi_story(args.remove_krtmi)
                print(json.dumps({"status": "success", "action": "remove_krtmi", "year": args.remove_krtmi}, indent=2))
                return 0
            except Exception as e:
                print(json.dumps({"status": "error", "message": str(e)}, indent=2), file=sys.stderr)
                return 1

        # Gallery flags
        if args.list_gallery:
            items = self.store.load_gallery_items()
            if args.category:
                items = [g for g in items if args.category.lower() in g.get('category', '').lower()]
            if args.json:
                print(json.dumps(items, indent=2))
            else:
                print(f"{'ID':<25} | {'KATEGORI':<18} | {'TAHUN':<6} | {'JUDUL'}")
                print(f"{'-'*95}")
                for g in items:
                    print(f"{g.get('id', ''):<25} | {g.get('category', ''):<18} | {g.get('year', ''):<6} | {g.get('title', '')}")
            return 0

        if args.add_gallery is not None:
            if not str(args.add_gallery).strip():
                print(json.dumps({"status": "error", "message": "Empty payload provided for --add-gallery"}, indent=2), file=sys.stderr)
                return 1
            try:
                data = json.loads(args.add_gallery)
            except json.JSONDecodeError:
                p = Path(args.add_gallery)
                if p.exists() and p.is_file():
                    try:
                        data = json.loads(p.read_text(encoding="utf-8"))
                    except Exception as e:
                        print(json.dumps({"status": "error", "message": f"Failed to read or parse JSON file {p}: {e}"}, indent=2), file=sys.stderr)
                        return 1
                else:
                    print(json.dumps({"status": "error", "message": "Invalid JSON string or file path for --add-gallery"}, indent=2), file=sys.stderr)
                    return 1

            if not isinstance(data, dict):
                print(json.dumps({"status": "error", "message": f"Payload for --add-gallery must be a JSON dictionary, got {type(data).__name__}"}, indent=2), file=sys.stderr)
                return 1

            try:
                self.store.add_gallery_item(data)
                print(json.dumps({"status": "success", "action": "add_gallery", "id": data.get("id")}, indent=2))
                return 0
            except Exception as e:
                print(json.dumps({"status": "error", "message": str(e)}, indent=2), file=sys.stderr)
                return 1

        if args.remove_gallery is not None:
            if not str(args.remove_gallery).strip():
                print(json.dumps({"status": "error", "message": "Empty ID provided for --remove-gallery"}, indent=2), file=sys.stderr)
                return 1
            try:
                self.store.remove_gallery_item(args.remove_gallery)
                print(json.dumps({"status": "success", "action": "remove_gallery", "id": args.remove_gallery}, indent=2))
                return 0
            except Exception as e:
                print(json.dumps({"status": "error", "message": str(e)}, indent=2), file=sys.stderr)
                return 1

        return 0


# ==============================================================================
# Main Entry Point
# ==============================================================================
def main():
    parser = argparse.ArgumentParser(
        description="Abhinaya UNY Robotics Portal — Standalone Offline Data Manager Tool",
        formatter_class=argparse.RawDescriptionHelpFormatter
    )

    # General / Backup flags
    parser.add_argument("--backup", action="store_true", help="Create an immediate timestamped backup of data files")
    parser.add_argument("--reason", type=str, help="Reason/note for backup snapshot")
    parser.add_argument("--list-backups", action="store_true", help="List all available backup snapshots")
    parser.add_argument("--restore", type=str, help="Restore data files from a backup snapshot ID or path")
    parser.add_argument("--validate", action="store_true", help="Run full schema validation across all data files")
    parser.add_argument("--seed", action="store_true", help="Initialize seed data if files are missing")
    parser.add_argument("--json", action="store_true", help="Output results in JSON format")

    # Team Member flags
    parser.add_argument("--list-team", action="store_true", help="List team members")
    parser.add_argument("--division", type=str, help="Filter team members by division")
    parser.add_argument("--search-team", type=str, help="Search team members by query")
    parser.add_argument("--add-member", type=str, help="Add or update team member (JSON string or path to JSON file)")
    parser.add_argument("--remove-member", type=str, help="Remove team member by ID")

    # KRTMI & Guidebooks flags
    parser.add_argument("--list-krtmi", action="store_true", help="List competition editions")
    parser.add_argument("--view-krtmi", type=str, help="View detailed specs of a competition edition by year")
    parser.add_argument("--add-krtmi", type=str, help="Add or update competition edition (JSON string or path to JSON file)")
    parser.add_argument("--remove-krtmi", type=str, help="Remove competition edition by year")

    # Gallery Media flags
    parser.add_argument("--list-gallery", action="store_true", help="List gallery items")
    parser.add_argument("--category", type=str, help="Filter gallery items by category")
    parser.add_argument("--add-gallery", type=str, help="Add or update gallery item (JSON string or path to JSON file)")
    parser.add_argument("--remove-gallery", type=str, help="Remove gallery item by ID")

    args = parser.parse_args()

    datastore = DataStore(DATA_DIR)

    # Check if any CLI action flag is passed
    has_cli_flag = any([
        args.backup, args.list_backups, args.restore is not None, args.validate, args.seed,
        args.list_team, args.search_team is not None, args.add_member is not None, args.remove_member is not None,
        args.list_krtmi, args.view_krtmi is not None, args.add_krtmi is not None, args.remove_krtmi is not None,
        args.list_gallery, args.add_gallery is not None, args.remove_gallery is not None
    ])

    if has_cli_flag:
        cli = CLIController(datastore)
        sys.exit(cli.handle(args))
    else:
        # Launch Interactive TUI
        tui = InteractiveTUI(datastore)
        tui.run()


if __name__ == "__main__":
    main()
