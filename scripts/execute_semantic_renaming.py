#!/usr/bin/env python3
"""
execute_semantic_renaming.py
----------------------------
Milestone 1: Photo Renaming Pipeline & Asset Standardization

Executes the semantic copying and standardization of member photos from
Instagram archive (public/images/instagram_feed/) and Studio portraits (public/images/members/)
into standardized semantic naming: {tahun}_{divisi}_{nama_anggota}_{urutan}.{ext}
in public/images/members/.

Generates comprehensive data/photoManifest.json mapping member photos indexed by
member ID, year, and division.
"""

import json
import os
import re
import shutil
import hashlib
from collections import defaultdict

WORKSPACE_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CATALOG_PATH = os.path.join(WORKSPACE_ROOT, 'scripts', 'full_catalog_with_renaming.json')
MEMBERS_DIR = os.path.join(WORKSPACE_ROOT, 'public', 'images', 'members')
MANIFEST_PATH = os.path.join(WORKSPACE_ROOT, 'data', 'photoManifest.json')

def slugify(name):
    name = re.sub(r'^(Prof\.|Dr\.|Ir\.|Ph\.D\.|M\.T\.|IPU\.|S\.T\.|M\.Cs\.)\s*', '', name)
    name = re.sub(r',\s*(Ph\.D\.|M\.T\.|IPU\.|S\.T\.|M\.Cs\.)', '', name)
    name = re.sub(r'\s*\b(advisor)\b', '', name, flags=re.IGNORECASE)
    s = name.lower().strip()
    s = re.sub(r'[^a-z0-9]+', '-', s)
    s = re.sub(r'^-+|-+$', '', s)
    return s

def get_canonical_filename(item):
    year = item['year']
    div = item['division'].lower()
    if div == 'programmer':
        div = 'program'
    elif div == 'ketua':
        div = 'leader'
    
    name = item['member_name'].lower().strip()
    name = re.sub(r'^(prof\.|dr\.|ir\.|ph\.d\.|m\.t\.|ipu\.|s\.t\.|m\.cs\.)\s*', '', name)
    name = re.sub(r',\s*(ph\.d\.|m\.t\.|ipu\.|s\.t\.|m\.cs\.)', '', name)
    name = re.sub(r'\s*\b(advisor)\b', '', name)
    
    if 'salsabila azzahra' in name:
        if 'psdu' in name or 'putri sophia' in name:
            clean_name = 'salsabila_azzahra_psdu' if item['source_dir'] != 'members' else 'salsabila_azzahra'
        else:
            clean_name = 'salsabila_azzahra'
    elif 'moh. khairudin' in name or 'moh khairudin' in name:
        clean_name = 'prof_moh_khairudin'
    elif 'anggoro fajar' in name:
        clean_name = 'anggoro_fajar_dwi_utomo'
    else:
        clean_name = re.sub(r'[^a-z0-9]+', '_', name).strip('_')
    
    seq = item.get('sequence', 1)
    seq_str = f"{seq:02d}"
    ext = item['source_path'].split('.')[-1].lower()
    
    return f"{year}_{div}_{clean_name}_{seq_str}.{ext}"

def get_slug_aliases(slug, name):
    aliases = [slug]
    if slug == 'salsabila-azzahra-putri-sophia-dewi-utami':
        aliases.extend(['salsabila-azzahra', 'salsabila-azzahra-psdu'])
    elif slug == 'salsabila-azzahra':
        aliases.extend(['salsabila-azzahra-putri-sophia-dewi-utami', 'salsabila-azzahra-psdu'])
    elif slug == 'prof-ir-moh-khairudin-m-t-ph-d-ipu' or slug == 'ir-moh-khairudin' or slug == 'moh-khairudin':
        aliases.extend(['prof-khairudin', 'prof-moh-khairudin', 'ir-moh-khairudin', 'moh-khairudin'])
    elif slug == 'anggoro-fajar-dwi-s':
        aliases.append('anggoro-fajar-dwi-utomo')
    return list(set(aliases))

def sha256_file(filepath):
    h = hashlib.sha256()
    with open(filepath, 'rb') as f:
        while chunk := f.read(65536):
            h.update(chunk)
    return h.hexdigest()

def run_pipeline():
    print("=" * 80)
    print("EXECUTING SEMANTIC RENAMING & ASSET STANDARDIZATION PIPELINE")
    print("=" * 80)

    if not os.path.exists(CATALOG_PATH):
        raise FileNotFoundError(f"Catalog not found at {CATALOG_PATH}")

    with open(CATALOG_PATH, 'r', encoding='utf-8') as f:
        catalog = json.load(f)

    os.makedirs(MEMBERS_DIR, exist_ok=True)
    os.makedirs(os.path.dirname(MANIFEST_PATH), exist_ok=True)

    roster_items = [x for x in catalog if x.get('include_in_roster')]
    non_roster_items = [x for x in catalog if not x.get('include_in_roster')]

    print(f"Total catalog assets surveyed: {len(catalog)}")
    print(f"Genuine member roster photos:  {len(roster_items)}")
    print(f"Excluded non-roster assets:   {len(non_roster_items)}")

    copied_files_report = []
    manifest_members = {}
    manifest_by_year = {str(y): {
        'leader': [],
        'manager': [],
        'program': [],
        'elektronik': [],
        'mekanik': [],
        'desain': [],
        'pembimbing': [],
        'allPhotos': []
    } for y in range(2020, 2026)}
    
    manifest_by_division = {
        'leader': [],
        'manager': [],
        'program': [],
        'elektronik': [],
        'mekanik': [],
        'desain': [],
        'pembimbing': []
    }

    all_roster_photos = []

    for item in roster_items:
        src_rel = item['source_path']
        src_abs = os.path.join(WORKSPACE_ROOT, src_rel.replace('/', os.sep))
        
        if not os.path.exists(src_abs):
            raise FileNotFoundError(f"Source file missing: {src_abs}")

        src_hash = sha256_file(src_abs)
        src_size = os.path.getsize(src_abs)

        # 1. Canonical Filename
        canonical_fn = get_canonical_filename(item)
        canonical_target_abs = os.path.join(MEMBERS_DIR, canonical_fn)
        canonical_web_path = f"/images/members/{canonical_fn}"

        # Copy canonical file if not already existing or hash mismatch
        if not os.path.exists(canonical_target_abs) or sha256_file(canonical_target_abs) != src_hash:
            shutil.copy2(src_abs, canonical_target_abs)

        copied_files_report.append({
            'source_path': src_rel,
            'target_filename': canonical_fn,
            'web_path': canonical_web_path,
            'size_bytes': src_size,
            'sha256': src_hash,
            'year': item['year'],
            'division': item['division'],
            'member_name': item['member_name'],
            'role': item['role'],
            'category': 'canonical'
        })

        # 2. Also ensure alias if catalog target_filename is different from canonical_fn
        cat_target_fn = item.get('target_filename')
        if cat_target_fn and cat_target_fn != canonical_fn:
            alias_target_abs = os.path.join(MEMBERS_DIR, cat_target_fn)
            if not os.path.exists(alias_target_abs) or sha256_file(alias_target_abs) != src_hash:
                shutil.copy2(src_abs, alias_target_abs)
            copied_files_report.append({
                'source_path': src_rel,
                'target_filename': cat_target_fn,
                'web_path': f"/images/members/{cat_target_fn}",
                'size_bytes': src_size,
                'sha256': src_hash,
                'year': item['year'],
                'division': item['division'],
                'member_name': item['member_name'],
                'role': item['role'],
                'category': 'alias'
            })

        # Roster photo object for manifest
        div_normalized = 'leader' if item['division'].lower() in ('ketua', 'leader') else \
                         ('program' if item['division'].lower() in ('programmer', 'program') else item['division'].lower())

        photo_desc = {
            'filename': canonical_fn,
            'path': canonical_web_path,
            'sourcePath': src_rel,
            'year': item['year'],
            'division': div_normalized,
            'memberName': item['member_name'],
            'role': item['role'],
            'sequence': item.get('sequence', 1),
            'sizeBytes': src_size,
            'isStudio': item['source_dir'] == 'members'
        }
        all_roster_photos.append(photo_desc)

        # Populate manifest_by_year
        yr_str = str(item['year'])
        if yr_str in manifest_by_year:
            if canonical_web_path not in manifest_by_year[yr_str]['allPhotos']:
                manifest_by_year[yr_str]['allPhotos'].append(canonical_web_path)
            if div_normalized in manifest_by_year[yr_str]:
                if canonical_web_path not in manifest_by_year[yr_str][div_normalized]:
                    manifest_by_year[yr_str][div_normalized].append(canonical_web_path)

        # Populate manifest_by_division
        if div_normalized in manifest_by_division:
            if canonical_web_path not in manifest_by_division[div_normalized]:
                manifest_by_division[div_normalized].append(canonical_web_path)

        # Populate manifest_members
        name = item['member_name']
        slug = slugify(name)
        if slug.startswith('prof-') or slug.startswith('ir-moh-khairudin'):
            slug = 'prof-khairudin'
        elif slug == 'salsabila-azzahra-putri-sophia-dewi-utami':
            slug = 'salsabila-azzahra'
        elif slug == 'anggoro-fajar-dwi-s':
            slug = 'anggoro-fajar-dwi-utomo'

        if slug not in manifest_members:
            manifest_members[slug] = {
                'id': slug,
                'name': name,
                'aliases': get_slug_aliases(slug, name),
                'primaryDivision': div_normalized,
                'yearsActive': [],
                'roles': [],
                'isLeader': False,
                'isManager': False,
                'leadershipEras': [],
                'primaryPhoto': canonical_web_path,
                'photos': [],
                'studioPhotos': [],
                'feedPhotos': [],
                'photosByYear': {}
            }

        mem = manifest_members[slug]
        if item['year'] not in mem['yearsActive']:
            mem['yearsActive'].append(item['year'])
            mem['yearsActive'].sort()

        if item['role'] not in mem['roles']:
            mem['roles'].append(item['role'])

        if div_normalized == 'leader':
            mem['isLeader'] = True
            era_str = f"Ketua Tim {item['year']}"
            if era_str not in mem['leadershipEras']:
                mem['leadershipEras'].append(era_str)
        elif div_normalized == 'manager':
            mem['isManager'] = True
            era_str = f"Manager {item['year']}"
            if era_str not in mem['leadershipEras']:
                mem['leadershipEras'].append(era_str)

        if canonical_web_path not in mem['photos']:
            mem['photos'].append(canonical_web_path)

        if item['source_dir'] == 'members':
            if canonical_web_path not in mem['studioPhotos']:
                mem['studioPhotos'].append(canonical_web_path)
        else:
            if canonical_web_path not in mem['feedPhotos']:
                mem['feedPhotos'].append(canonical_web_path)

        yr_s = str(item['year'])
        if yr_s not in mem['photosByYear']:
            mem['photosByYear'][yr_s] = []
        if canonical_web_path not in mem['photosByYear'][yr_s]:
            mem['photosByYear'][yr_s].append(canonical_web_path)

    # 3. Add explicit leadership linkages for 2020 (Nurcholis) and 2021 (Afif Aiman Saputra / Nurcholis)
    # 2020: Nurcholis (Inception Leader)
    src_nurcholis_2020 = os.path.join(WORKSPACE_ROOT, 'public', 'images', 'instagram_feed', '2020-08-16_17-54-45_UTC_CD9ZVzpjcgN_2.jpg')
    target_leader_2020 = os.path.join(MEMBERS_DIR, '2020_leader_nurcholis_01.jpg')
    shutil.copy2(src_nurcholis_2020, target_leader_2020)
    web_leader_2020 = '/images/members/2020_leader_nurcholis_01.jpg'
    if web_leader_2020 not in manifest_by_year['2020']['leader']:
        manifest_by_year['2020']['leader'].append(web_leader_2020)
    if web_leader_2020 not in manifest_by_division['leader']:
        manifest_by_division['leader'].append(web_leader_2020)
    if 'nurcholis' in manifest_members:
        manifest_members['nurcholis']['isLeader'] = True
        if "Ketua Tim 2020" not in manifest_members['nurcholis']['leadershipEras']:
            manifest_members['nurcholis']['leadershipEras'].append("Ketua Tim 2020")
        if web_leader_2020 not in manifest_members['nurcholis']['photos']:
            manifest_members['nurcholis']['photos'].append(web_leader_2020)

    # 2021: Afif Aiman Saputra (Leader 2021)
    src_afif_2020 = os.path.join(WORKSPACE_ROOT, 'public', 'images', 'instagram_feed', '2020-08-16_18-05-25_UTC_CD9aj6dD_Xc_2.jpg')
    target_leader_2021 = os.path.join(MEMBERS_DIR, '2021_leader_afif_aiman_saputra_01.jpg')
    shutil.copy2(src_afif_2020, target_leader_2021)
    web_leader_2021 = '/images/members/2021_leader_afif_aiman_saputra_01.jpg'
    if web_leader_2021 not in manifest_by_year['2021']['leader']:
        manifest_by_year['2021']['leader'].append(web_leader_2021)
    if web_leader_2021 not in manifest_by_division['leader']:
        manifest_by_division['leader'].append(web_leader_2021)
    if 'afif-aiman-saputra' in manifest_members:
        manifest_members['afif-aiman-saputra']['isLeader'] = True
        if 2021 not in manifest_members['afif-aiman-saputra']['yearsActive']:
            manifest_members['afif-aiman-saputra']['yearsActive'].append(2021)
            manifest_members['afif-aiman-saputra']['yearsActive'].sort()
        if "Ketua Tim 2021" not in manifest_members['afif-aiman-saputra']['leadershipEras']:
            manifest_members['afif-aiman-saputra']['leadershipEras'].append("Ketua Tim 2021")
        if web_leader_2021 not in manifest_members['afif-aiman-saputra']['photos']:
            manifest_members['afif-aiman-saputra']['photos'].append(web_leader_2021)

    # Sort photos for each member so studio / sequence 01 is first
    for slug, mem in manifest_members.items():
        mem['photos'].sort(key=lambda p: (0 if '_01.' in p else 1, p))
        if mem['studioPhotos']:
            mem['primaryPhoto'] = mem['studioPhotos'][0]
        elif mem['photos']:
            mem['primaryPhoto'] = mem['photos'][0]

    # Structure Manifest
    manifest_data = {
        '$schema': 'https://json-schema.org/draft/2020-12/schema',
        'generatedAt': '2026-08-27T16:25:00Z',
        'generator': 'scripts/execute_semantic_renaming.py',
        'version': '1.0.0',
        'summary': {
            'totalSurveyedAssets': len(catalog),
            'totalRosterPhotos': len(roster_items),
            'totalUniqueMembers': len(manifest_members),
            'totalExcludedAssets': len(non_roster_items),
            'generationsCovered': [2020, 2021, 2022, 2023, 2024, 2025],
            'divisionsCovered': ['leader', 'manager', 'program', 'elektronik', 'mekanik', 'desain', 'pembimbing']
        },
        'members': manifest_members,
        'byYear': manifest_by_year,
        'byDivision': manifest_by_division,
        'allRosterPhotos': all_roster_photos
    }

    with open(MANIFEST_PATH, 'w', encoding='utf-8') as f:
        json.dump(manifest_data, f, indent=2, ensure_ascii=False)

    print(f"Successfully generated manifest at: {MANIFEST_PATH}")
    print(f"Total members mapped in manifest: {len(manifest_members)}")
    print(f"Total copied/verified files:     {len(copied_files_report)}")

    return copied_files_report, manifest_data

if __name__ == '__main__':
    run_pipeline()
