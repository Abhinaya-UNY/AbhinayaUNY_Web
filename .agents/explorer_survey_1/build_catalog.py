import os
import json
import re

# Load raw posts and OCR
with open('scripts/detailed_ig_analysis.json', 'r', encoding='utf-8') as f:
    posts = json.load(f)

with open('scripts/all_images_ocr_results.json', 'r', encoding='utf-8') as f:
    ocr_results = json.load(f)

def slugify(name):
    if not name:
        return 'unknown'
    s = name.lower()
    # Replace special characters, punctuation with underscores
    s = re.sub(r'[^a-z0-9]+', '_', s)
    return s.strip('_')

catalog = []

# 1. PROCESS public/images/members/ (25 files)
members_meta = {
    '01_abdul_hasib_adzdzin_nuha': ('Abdul Hasib Adzdzin Nuha', 'elektronik', 'Elektronik (PCB Design & Sensor Wiring)'),
    '02_agus_bagaskoro': ('Agus Bagaskoro', 'elektronik', 'Elektronik (Lead Hardware & Power Management)'),
    '03_ikhsan_nurrohman': ('Ikhsan Nurrohman', 'elektronik', 'Elektronik (Telemetri & Wireless Systems)'),
    '04_mustika_wahyu_aprilia': ('Mustika Wahyu Aprilia', 'manager', 'Manager (Keuangan, Administrasi & Sekretariat)'),
    '05_rose_pita_nur_afifah': ('Rose Pita Nur Afifah', 'manager', 'Manager (Media, Dokumentasi & Publikasi)'),
    '06_tri_wahyu_handoyo': ('Tri Wahyu Handoyo', 'programmer', 'Program (Lead AI, Computer Vision & Web Systems)'),
    '07_farhan_yuda_mahendra': ('Farhan Yuda Mahendra', 'programmer', 'Program (Embedded Control & Kinematika)'),
    '08_salsabila_azzahra': ('Salsabila Azzahra Putri Sophia Dewi Utami', 'programmer', 'Program (Logika Sensor & Strategi Laga)'),
    '09_ilham_widyo_nugroho': ('Ilham Widyo Nugroho', 'ketua', 'Ketua Tim (Team Leader)'),
    '10_muhamad_ilham_sony': ('Muhamad Ilham Sony', 'mekanik', 'Mekanik (Lead CAD & Precision Machining)'),
    '11_caesar_sokma_langgeng': ('Caesar Sokma Langgeng', 'mekanik', 'Mekanik (CAD & Laser Fabrication Engineer)'),
    '12_rionaldi_nugroho': ('Rionaldi Nugroho', 'mekanik', 'Mekanik (Hardware Assembly & Mechanical QA)'),
}

mem_dir = 'public/images/members'
for f in sorted(os.listdir(mem_dir)):
    if not f.lower().endswith(('.png', '.jpg', '.jpeg', '.webp')):
        continue
    path = f'public/images/members/{f}'
    ext = os.path.splitext(f)[1]
    
    if f.startswith('13_wanted'):
        catalog.append({
            'source_path': path,
            'source_dir': 'members',
            'year': 2024,
            'category': 'GRAPHIC_BANNER',
            'is_genuine_member': False,
            'include_in_roster': False,
            'division': 'grafis',
            'member_name': 'Wanted Uang Kas Bendahara',
            'role': 'Easter Egg Poster / Graphic',
            'sequence': 1,
            'target_filename': f'2024_grafis_wanted_uang_kas_bendahara_01{ext}',
            'target_relative_path': f'members/2024_grafis_wanted_uang_kas_bendahara_01{ext}',
            'evidence': 'Meme / poster uang kas bendahara ("WANTED JANGAN LALAIKAN UANG KAS-MU")'
        })
    else:
        base = f.rsplit('_', 1)[0]
        seq = int(os.path.splitext(f.rsplit('_', 1)[1])[0])
        name, div, role = members_meta.get(base, ('Unknown', 'unknown', 'Member'))
        slug_name = slugify(name)
        target = f'2024_{div}_{slug_name}_{seq:02d}{ext}'
        catalog.append({
            'source_path': path,
            'source_dir': 'members',
            'year': 2024,
            'category': 'MEMBER_PHOTO',
            'is_genuine_member': True,
            'include_in_roster': True,
            'division': div,
            'member_name': name,
            'role': role,
            'sequence': seq,
            'target_filename': target,
            'target_relative_path': f'members/{target}',
            'evidence': f'Roster studio portrait 2024 ({name} - pose variant {seq})'
        })

# 2. PROCESS public/images/instagram_feed/ (226 files across 87 posts)
for p in posts:
    stem = p['stem']
    year = p['year']
    sc = p['shortcode']
    cap = p['caption']
    imgs = p['images']
    
    # 2020 GRID LAUNCH (9 posts)
    if stem.startswith('2020-01-27'):
        for img in imgs:
            fname = img['filename']
            catalog.append({
                'source_path': f'public/images/instagram_feed/{fname}',
                'source_dir': 'instagram_feed',
                'year': 2020,
                'category': 'GRAPHIC_BANNER',
                'is_genuine_member': False,
                'include_in_roster': False,
                'division': 'grafis',
                'member_name': None,
                'role': 'Instagram 3x3 Grid Slice (Logo Launch)',
                'sequence': 1,
                'target_filename': f'2020_grafis_grid_launch_{sc}.jpg',
                'target_relative_path': f'instagram_feed/2020_grafis_grid_launch_{sc}.jpg',
                'evidence': f'Post {sc}: Instagram 3x3 grid slice (320x320 logo tile)'
            })
            
    # 2020 KRI 2019 DOKUMENTASI
    elif stem == '2020-07-28_14-03-49_UTC_CDMDzwrjLDf':
        catalog.append({
            'source_path': f'public/images/instagram_feed/{imgs[0]["filename"]}',
            'source_dir': 'instagram_feed',
            'year': 2020,
            'category': 'TEAM_PHOTO',
            'is_genuine_member': False,
            'include_in_roster': False,
            'division': 'kontingen',
            'member_name': 'Kontingen KRI 2019',
            'role': 'Official Team Photo at Rektorat UNY',
            'sequence': 1,
            'target_filename': '2020_kontingen_tim_kri_nasional_2019_01.jpg',
            'target_relative_path': 'instagram_feed/2020_kontingen_tim_kri_nasional_2019_01.jpg',
            'evidence': 'Post CDMDzwrjLDf caption: "KRI Nasional 2019"'
        })
    elif stem == '2020-07-28_14-21-57_UTC_CDMF4i9D1iT':
        catalog.append({
            'source_path': f'public/images/instagram_feed/{imgs[0]["filename"]}',
            'source_dir': 'instagram_feed',
            'year': 2020,
            'category': 'COMPETITION_MOMENT',
            'is_genuine_member': False,
            'include_in_roster': False,
            'division': 'prestasi',
            'member_name': None,
            'role': 'Podium Juara 2 KRTMI KRI Nasional 2019',
            'sequence': 1,
            'target_filename': '2020_prestasi_juara_2_krtmi_2019_podium_01.jpg',
            'target_relative_path': 'instagram_feed/2020_prestasi_juara_2_krtmi_2019_podium_01.jpg',
            'evidence': 'Post CDMF4i9D1iT caption: "Alhamdulilah ditahun pertama bisa mendapat gelar juara 2 KRTMI KRI Nasional"'
        })
    elif stem == '2020-07-28_14-22-54_UTC_CDMF_hcDUwh':
        catalog.append({
            'source_path': f'public/images/instagram_feed/{imgs[0]["filename"]}',
            'source_dir': 'instagram_feed',
            'year': 2020,
            'category': 'COMPETITION_MOMENT',
            'is_genuine_member': False,
            'include_in_roster': False,
            'division': 'prestasi',
            'member_name': None,
            'role': 'Piala & Piagam Juara 2 KRTMI 2019',
            'sequence': 1,
            'target_filename': '2020_prestasi_juara_2_krtmi_2019_piala_02.jpg',
            'target_relative_path': 'instagram_feed/2020_prestasi_juara_2_krtmi_2019_piala_02.jpg',
            'evidence': 'Post CDMF_hcDUwh OCR: "JUARA 2 KRTMI 2019"'
        })

    # 2020 PROGRAMMER INTRO
    elif stem == '2020-08-16_17-54-45_UTC_CD9ZVzpjcgN':
        prog_2020 = [
            (imgs[0]['filename'], 'GRAPHIC_BANNER', False, False, 'grafis', None, 'Cover Introduction Programmer 2020', '2020_grafis_programmer_cover_01.jpg'),
            (imgs[1]['filename'], 'MEMBER_PHOTO', True, True, 'programmer', 'Nurcholis', 'Programmer (Pendidikan Teknik Elektronika)', '2020_programmer_nurcholis_01.jpg'),
            (imgs[2]['filename'], 'MEMBER_PHOTO', True, True, 'programmer', 'Alfan Fajri Tamyis', 'Programmer (Pendidikan Teknik Elektronika)', '2020_programmer_alfan_fajri_tamyis_01.jpg'),
            (imgs[3]['filename'], 'MEMBER_PHOTO', True, True, 'programmer', 'Budi Arjaya Wida', 'Programmer (Pendidikan Teknik Mekatronika)', '2020_programmer_budi_arjaya_wida_01.jpg'),
            (imgs[4]['filename'], 'MEMBER_PHOTO', True, True, 'programmer', 'Muhammad Iqbal Rasyid', 'Programmer (Pendidikan Teknik Mekatronika)', '2020_programmer_muhammad_iqbal_rasyid_01.jpg'),
        ]
        for fname, cat, is_gen, inc, div, name, role, target in prog_2020:
            catalog.append({
                'source_path': f'public/images/instagram_feed/{fname}',
                'source_dir': 'instagram_feed',
                'year': 2020,
                'category': cat,
                'is_genuine_member': is_gen,
                'include_in_roster': inc,
                'division': div,
                'member_name': name,
                'role': role,
                'sequence': 1,
                'target_filename': target,
                'target_relative_path': f'instagram_feed/{target}',
                'evidence': f'Post CD9ZVzpjcgN: {name or "Cover Graphic"}'
            })

    # 2020 MECHANICS INTRO
    elif stem == '2020-08-16_18-05-25_UTC_CD9aj6dD_Xc':
        mech_2020 = [
            (imgs[0]['filename'], 'GRAPHIC_BANNER', False, False, 'grafis', None, 'Cover Introduction Mechanics 2020', '2020_grafis_mekanik_cover_01.jpg'),
            (imgs[1]['filename'], 'MEMBER_PHOTO', True, True, 'mekanik', 'Afif Aiman Saputra', 'Mekanik (Pendidikan Teknik Mesin)', '2020_mekanik_afif_aiman_saputra_01.jpg'),
            (imgs[2]['filename'], 'MEMBER_PHOTO', True, True, 'mekanik', 'Musyarof Rifai', 'Mekanik (Pendidikan Teknik Mekatronika)', '2020_mekanik_musyarof_rifai_01.jpg'),
            (imgs[3]['filename'], 'MEMBER_PHOTO', True, True, 'mekanik', 'Anggoro Fajar Dwi Utomo', 'Mekanik (Pendidikan Teknik Mekatronika)', '2020_mekanik_anggoro_fajar_dwi_utomo_01.jpg'),
            (imgs[4]['filename'], 'MEMBER_PHOTO', True, True, 'mekanik', 'Muhammad Rovi Aan Sulistya', 'Mekanik (Teknik Elektro)', '2020_mekanik_muhammad_rovi_aan_sulistya_01.jpg'),
        ]
        for fname, cat, is_gen, inc, div, name, role, target in mech_2020:
            catalog.append({
                'source_path': f'public/images/instagram_feed/{fname}',
                'source_dir': 'instagram_feed',
                'year': 2020,
                'category': cat,
                'is_genuine_member': is_gen,
                'include_in_roster': inc,
                'division': div,
                'member_name': name,
                'role': role,
                'sequence': 1,
                'target_filename': target,
                'target_relative_path': f'instagram_feed/{target}',
                'evidence': f'Post CD9aj6dD_Xc: {name or "Cover Graphic"}'
            })

    # 2020 MANAGER INTRO
    elif stem == '2020-08-16_18-07-08_UTC_CD9awafDNZH':
        mgr_2020 = [
            (imgs[0]['filename'], 'GRAPHIC_BANNER', False, False, 'grafis', None, 'Cover Introduction Manager 2020', '2020_grafis_manager_cover_01.jpg'),
            (imgs[1]['filename'], 'MEMBER_PHOTO', True, True, 'manager', 'Yuli Dwi Saputri', 'Manager (Pendidikan Teknik Elektro)', '2020_manager_yuli_dwi_saputri_01.jpg'),
        ]
        for fname, cat, is_gen, inc, div, name, role, target in mgr_2020:
            catalog.append({
                'source_path': f'public/images/instagram_feed/{fname}',
                'source_dir': 'instagram_feed',
                'year': 2020,
                'category': cat,
                'is_genuine_member': is_gen,
                'include_in_roster': inc,
                'division': div,
                'member_name': name,
                'role': role,
                'sequence': 1,
                'target_filename': target,
                'target_relative_path': f'instagram_feed/{target}',
                'evidence': f'Post CD9awafDNZH: {name or "Cover Graphic"}'
            })

    # 2020 ELECTRONICS INTRO
    elif stem == '2020-08-16_18-13-17_UTC_CD9bdiQjGn5':
        elec_2020 = [
            (imgs[0]['filename'], 'GRAPHIC_BANNER', False, False, 'grafis', None, 'Cover Introduction Electronics 2020', '2020_grafis_elektronik_cover_01.jpg'),
            (imgs[1]['filename'], 'MEMBER_PHOTO', True, True, 'elektronik', 'Musa Beni Ricardo Aruan', 'Elektronik (Pendidikan Teknik Mekatronika)', '2020_elektronik_musa_beni_ricardo_aruan_01.jpg'),
            (imgs[2]['filename'], 'MEMBER_PHOTO', True, True, 'elektronik', 'Ardhi Wiranata', 'Elektronik (Pendidikan Teknik Elektronika)', '2020_elektronik_ardhi_wiranata_01.jpg'),
            (imgs[3]['filename'], 'MEMBER_PHOTO', True, True, 'elektronik', 'Yusron Nur Latief', 'Elektronik (D4 Teknik Elektro)', '2020_elektronik_yusron_nur_latief_01.jpg'),
        ]
        for fname, cat, is_gen, inc, div, name, role, target in elec_2020:
            catalog.append({
                'source_path': f'public/images/instagram_feed/{fname}',
                'source_dir': 'instagram_feed',
                'year': 2020,
                'category': cat,
                'is_genuine_member': is_gen,
                'include_in_roster': inc,
                'division': div,
                'member_name': name,
                'role': role,
                'sequence': 1,
                'target_filename': target,
                'target_relative_path': f'instagram_feed/{target}',
                'evidence': f'Post CD9bdiQjGn5: {name or "Cover Graphic"}'
            })

    # 2020 QUOTE BANNERS
    elif stem in ['2020-08-16_17-57-56_UTC_CD9ZtD9jHCt', '2020-08-16_18-09-22_UTC_CD9bA2HjVTU']:
        idx = 1 if stem.endswith('CD9ZtD9jHCt') else 2
        catalog.append({
            'source_path': f'public/images/instagram_feed/{imgs[0]["filename"]}',
            'source_dir': 'instagram_feed',
            'year': 2020,
            'category': 'GRAPHIC_BANNER',
            'is_genuine_member': False,
            'include_in_roster': False,
            'division': 'grafis',
            'member_name': None,
            'role': 'Quote Banner Lets Make a Great History',
            'sequence': idx,
            'target_filename': f'2020_grafis_banner_letsmakeagreathistory_{idx:02d}.jpg',
            'target_relative_path': f'instagram_feed/2020_grafis_banner_letsmakeagreathistory_{idx:02d}.jpg',
            'evidence': f'Post {sc}: Quote graphic #letsmakeagreathistory'
        })

    # 2021 KRTMI NASIONAL 2020 POSTS (published Oct 2021)
    elif stem in ['2021-10-24_14-51-00_UTC_CValTvaPQdt', '2021-10-24_14-51-41_UTC_CValYuvPiOa', '2021-10-24_15-17-40_UTC_CVaoXCJvrS9']:
        for i, img in enumerate(imgs):
            fname = img['filename']
            catalog.append({
                'source_path': f'public/images/instagram_feed/{fname}',
                'source_dir': 'instagram_feed',
                'year': 2021,
                'category': 'COMPETITION_MOMENT',
                'is_genuine_member': False,
                'include_in_roster': False,
                'division': 'dokumentasi',
                'member_name': None,
                'role': 'Dokumentasi KRTMI Nasional 2020',
                'sequence': i + 1,
                'target_filename': f'2021_dokumentasi_krtmi_nasional_2020_{sc}_{i+1:02d}.jpg',
                'target_relative_path': f'instagram_feed/2021_dokumentasi_krtmi_nasional_2020_{sc}_{i+1:02d}.jpg',
                'evidence': f'Post {sc} slide {i+1}: Dokumentasi Kontes Robot Tematik Indonesia Nasional 2020'
            })

    # 2022 EDUCATIONAL & 2021 TEAM INTRO POSTS (May 2022)
    elif stem.startswith('2022-05-28'):
        if stem == '2022-05-28_04-15-20_UTC_CeFoQ7XLJXR':
            catalog.append({
                'source_path': f'public/images/instagram_feed/{imgs[0]["filename"]}',
                'source_dir': 'instagram_feed',
                'year': 2022,
                'category': 'GRAPHIC_BANNER',
                'is_genuine_member': False,
                'include_in_roster': False,
                'division': 'grafis',
                'member_name': None,
                'role': 'Educational Poster "Apa itu KRI?"',
                'sequence': 1,
                'target_filename': '2022_grafis_edukasi_apa_itu_kri_01.jpg',
                'target_relative_path': 'instagram_feed/2022_grafis_edukasi_apa_itu_kri_01.jpg',
                'evidence': 'Post CeFoQ7XLJXR: Apa itu KRI? graphic'
            })
        elif stem == '2022-05-28_04-21-57_UTC_CeFpBVwLegE':
            catalog.append({
                'source_path': f'public/images/instagram_feed/{imgs[0]["filename"]}',
                'source_dir': 'instagram_feed',
                'year': 2022,
                'category': 'GRAPHIC_BANNER',
                'is_genuine_member': False,
                'include_in_roster': False,
                'division': 'grafis',
                'member_name': None,
                'role': 'Educational Poster "Apa itu KRTMI?"',
                'sequence': 1,
                'target_filename': '2022_grafis_edukasi_apa_itu_krtmi_01.jpg',
                'target_relative_path': 'instagram_feed/2022_grafis_edukasi_apa_itu_krtmi_01.jpg',
                'evidence': 'Post CeFpBVwLegE: Apa itu KRTMI? graphic'
            })
        elif stem == '2022-05-28_04-22-16_UTC_CeFpDwkrQRW':
            catalog.append({
                'source_path': f'public/images/instagram_feed/{imgs[0]["filename"]}',
                'source_dir': 'instagram_feed',
                'year': 2022,
                'category': 'GRAPHIC_BANNER',
                'is_genuine_member': False,
                'include_in_roster': False,
                'division': 'grafis',
                'member_name': None,
                'role': 'Mission Complete KRTMI 2019-2020 Graphic',
                'sequence': 1,
                'target_filename': '2022_grafis_mission_complete_01.jpg',
                'target_relative_path': 'instagram_feed/2022_grafis_mission_complete_01.jpg',
                'evidence': 'Post CeFpDwkrQRW: Mission Complete graphic'
            })
        elif stem == '2022-05-28_04-23-34_UTC_CeFpNNhLYnR':
            catalog.append({
                'source_path': f'public/images/instagram_feed/{imgs[0]["filename"]}',
                'source_dir': 'instagram_feed',
                'year': 2021,
                'category': 'MEMBER_PHOTO',
                'is_genuine_member': True,
                'include_in_roster': True,
                'division': 'manager',
                'member_name': 'Yuli Dwi Saputri',
                'role': 'Manager 2021 (Pendidikan Teknik Elektro)',
                'sequence': 1,
                'target_filename': '2021_manager_yuli_dwi_saputri_01.jpg',
                'target_relative_path': 'instagram_feed/2021_manager_yuli_dwi_saputri_01.jpg',
                'evidence': 'Post CeFpNNhLYnR: Manager 2021 Yuli Dwi Saputri'
            })
        elif stem == '2022-05-28_04-24-07_UTC_CeFpRStLwaE':
            catalog.append({
                'source_path': f'public/images/instagram_feed/{imgs[0]["filename"]}',
                'source_dir': 'instagram_feed',
                'year': 2021,
                'category': 'TEAM_PHOTO',
                'is_genuine_member': False,
                'include_in_roster': False,
                'division': 'kontingen',
                'member_name': 'Roster Rangkuman Tim 2021',
                'role': 'Team Roster Card 2021 with Quote',
                'sequence': 1,
                'target_filename': '2021_kontingen_roster_card_quote_01.jpg',
                'target_relative_path': 'instagram_feed/2021_kontingen_roster_card_quote_01.jpg',
                'evidence': 'Post CeFpRStLwaE: List of 13 members with Walt Disney quote'
            })
        elif stem == '2022-05-28_04-24-23_UTC_CeFpTM3Lb00':
            catalog.append({
                'source_path': f'public/images/instagram_feed/{imgs[0]["filename"]}',
                'source_dir': 'instagram_feed',
                'year': 2021,
                'category': 'TEAM_PHOTO',
                'is_genuine_member': False,
                'include_in_roster': False,
                'division': 'elektronik',
                'member_name': 'Divisi Elektronik 2021',
                'role': 'Team Card Divisi Elektronik 2021 (Musa Beni, Yusron, Ardhi, Danang)',
                'sequence': 1,
                'target_filename': '2021_elektronik_divisi_card_01.jpg',
                'target_relative_path': 'instagram_feed/2021_elektronik_divisi_card_01.jpg',
                'evidence': 'Post CeFpTM3Lb00: Divisi Elektronik 2021 list card'
            })
        elif stem == '2022-05-28_04-24-43_UTC_CeFpVqfL4ZZ':
            catalog.append({
                'source_path': f'public/images/instagram_feed/{imgs[0]["filename"]}',
                'source_dir': 'instagram_feed',
                'year': 2021,
                'category': 'TEAM_PHOTO',
                'is_genuine_member': False,
                'include_in_roster': False,
                'division': 'programmer',
                'member_name': 'Divisi Program 2021',
                'role': 'Team Card Divisi Program 2021 (Nurcholis, Budi, Alfan, Iqbal, Salsa)',
                'sequence': 1,
                'target_filename': '2021_programmer_divisi_card_01.jpg',
                'target_relative_path': 'instagram_feed/2021_programmer_divisi_card_01.jpg',
                'evidence': 'Post CeFpVqfL4ZZ: Divisi Program 2021 list card'
            })
        elif stem == '2022-05-28_04-25-05_UTC_CeFpYVIraoL':
            catalog.append({
                'source_path': f'public/images/instagram_feed/{imgs[0]["filename"]}',
                'source_dir': 'instagram_feed',
                'year': 2021,
                'category': 'GRAPHIC_BANNER',
                'is_genuine_member': False,
                'include_in_roster': False,
                'division': 'grafis',
                'member_name': None,
                'role': 'Cover Let\'s Introduce Member Abhinaya Team 2021',
                'sequence': 1,
                'target_filename': '2021_grafis_cover_intro_team_01.jpg',
                'target_relative_path': 'instagram_feed/2021_grafis_cover_intro_team_01.jpg',
                'evidence': 'Post CeFpYVIraoL: Cover Let\'s introduce member abhinaya team 2021'
            })
        elif stem == '2022-05-28_04-25-24_UTC_CeFpaoOLxhn':
            catalog.append({
                'source_path': f'public/images/instagram_feed/{imgs[0]["filename"]}',
                'source_dir': 'instagram_feed',
                'year': 2021,
                'category': 'TEAM_PHOTO',
                'is_genuine_member': False,
                'include_in_roster': False,
                'division': 'mekanik',
                'member_name': 'Divisi Mekanik 2021',
                'role': 'Team Card Divisi Mekanik 2021 (Afif, Rovi, Anggoro, Geo, Musyarof)',
                'sequence': 1,
                'target_filename': '2021_mekanik_divisi_card_01.jpg',
                'target_relative_path': 'instagram_feed/2021_mekanik_divisi_card_01.jpg',
                'evidence': 'Post CeFpaoOLxhn: Divisi Mekanik 2021 list card'
            })

    # 2022 DOKUMENTASI & PRESTASI KRI 2021 (Sep 2022)
    elif sc in ['CiAjofZrwxK', 'CiAjpHWLy_i', 'CiAjrDmLpcr', 'CiAjwfRL4ln', 'CiAjxl4ryH4', 'CiAj23Yr7iv']:
        for i, img in enumerate(imgs):
            fname = img['filename']
            catalog.append({
                'source_path': f'public/images/instagram_feed/{fname}',
                'source_dir': 'instagram_feed',
                'year': 2022,
                'category': 'COMPETITION_MOMENT',
                'is_genuine_member': False,
                'include_in_roster': False,
                'division': 'prestasi',
                'member_name': None,
                'role': 'Dokumentasi Prestasi KRI 2021 (Peringkat 1 & Strategi Terbaik)',
                'sequence': i + 1,
                'target_filename': f'2022_prestasi_kri_2021_{sc}_{i+1:02d}.jpg',
                'target_relative_path': f'instagram_feed/2022_prestasi_kri_2021_{sc}_{i+1:02d}.jpg',
                'evidence': f'Post {sc} slide {i+1}: Dokumentasi KRI 2021'
            })

    # 2022 GRID ANNOUNCEMENT (Sep 2022)
    elif sc in ['Ciz7pRSrrH1', 'Ciz71rorgFF', 'Ciz74B1LQWr']:
        for img in imgs:
            fname = img['filename']
            catalog.append({
                'source_path': f'public/images/instagram_feed/{fname}',
                'source_dir': 'instagram_feed',
                'year': 2022,
                'category': 'GRAPHIC_BANNER',
                'is_genuine_member': False,
                'include_in_roster': False,
                'division': 'grafis',
                'member_name': None,
                'role': 'Announcement Grid Slice 2022',
                'sequence': 1,
                'target_filename': f'2022_grafis_grid_announcement_{sc}.jpg',
                'target_relative_path': f'instagram_feed/2022_grafis_grid_announcement_{sc}.jpg',
                'evidence': f'Post {sc}: Grid piece announcement'
            })

    # 2022 TEAM INTRODUCTIONS (Sep 24, 2022)
    # Desain 2022
    elif stem == '2022-09-24_15-07-57_UTC_Ci5Ni_VrsFe':
        des_2022 = [
            (imgs[0]['filename'], 'GRAPHIC_BANNER', False, False, 'grafis', None, 'Cover Introduction Desain 2022', '2022_grafis_desain_cover_01.jpg'),
            (imgs[1]['filename'], 'MEMBER_PHOTO', True, True, 'desain', 'Geo Brahma Granito Z.', 'Desain (Koordinator)', '2022_desain_geo_brahma_granito_z_01.jpg'),
            (imgs[2]['filename'], 'MEMBER_PHOTO', True, True, 'desain', 'Afif Aiman Saputra', 'Desain (Anggota)', '2022_desain_afif_aiman_saputra_01.jpg'),
            (imgs[3]['filename'], 'MEMBER_PHOTO', True, True, 'desain', 'Ahmad Insan Kamil', 'Desain (Anggota)', '2022_desain_ahmad_insan_kamil_01.jpg'),
        ]
        for fname, cat, is_gen, inc, div, name, role, target in des_2022:
            catalog.append({
                'source_path': f'public/images/instagram_feed/{fname}',
                'source_dir': 'instagram_feed',
                'year': 2022,
                'category': cat,
                'is_genuine_member': is_gen,
                'include_in_roster': inc,
                'division': div,
                'member_name': name,
                'role': role,
                'sequence': 1,
                'target_filename': target,
                'target_relative_path': f'instagram_feed/{target}',
                'evidence': f'Post Ci5Ni_VrsFe: {name or "Cover Graphic"}'
            })

    # Mekanik 2022
    elif stem == '2022-09-24_15-10-54_UTC_Ci5N4jTrT34':
        mech_2022 = [
            (imgs[0]['filename'], 'GRAPHIC_BANNER', False, False, 'grafis', None, 'Cover Introduction Mekanik 2022', '2022_grafis_mekanik_cover_01.jpg'),
            (imgs[1]['filename'], 'MEMBER_PHOTO', True, True, 'mekanik', 'Muhammad Rovi Aan Sulistya', 'Mekanik (Koordinator)', '2022_mekanik_muhammad_rovi_aan_sulistya_01.jpg'),
            (imgs[2]['filename'], 'MEMBER_PHOTO', True, True, 'mekanik', 'Anggoro Fajar Dwi S.', 'Mekanik (Anggota)', '2022_mekanik_anggoro_fajar_dwi_s_01.jpg'),
            (imgs[3]['filename'], 'MEMBER_PHOTO', True, True, 'mekanik', 'Musyarof Rifai', 'Mekanik (Anggota)', '2022_mekanik_musyarof_rifai_01.jpg'),
            (imgs[4]['filename'], 'MEMBER_PHOTO', True, True, 'mekanik', 'Ilham Widyo Nugroho', 'Mekanik (Anggota)', '2022_mekanik_ilham_widyo_nugroho_01.jpg'),
        ]
        for fname, cat, is_gen, inc, div, name, role, target in mech_2022:
            catalog.append({
                'source_path': f'public/images/instagram_feed/{fname}',
                'source_dir': 'instagram_feed',
                'year': 2022,
                'category': cat,
                'is_genuine_member': is_gen,
                'include_in_roster': inc,
                'division': div,
                'member_name': name,
                'role': role,
                'sequence': 1,
                'target_filename': target,
                'target_relative_path': f'instagram_feed/{target}',
                'evidence': f'Post Ci5N4jTrT34: {name or "Cover Graphic"}'
            })

    # Elektronik 2022
    elif stem == '2022-09-24_15-15-54_UTC_Ci5OdP-L4vD':
        elec_2022 = [
            (imgs[0]['filename'], 'GRAPHIC_BANNER', False, False, 'grafis', None, 'Cover Introduction Elektronik 2022', '2022_grafis_elektronik_cover_01.jpg'),
            (imgs[1]['filename'], 'MEMBER_PHOTO', True, True, 'elektronik', 'Yusron Nur Latief', 'Elektronik (Koordinator)', '2022_elektronik_yusron_nur_latief_01.jpg'),
            (imgs[2]['filename'], 'MEMBER_PHOTO', True, True, 'elektronik', 'Agus Bagaskoro', 'Elektronik (Anggota)', '2022_elektronik_agus_bagaskoro_01.jpg'),
            (imgs[3]['filename'], 'MEMBER_PHOTO', True, True, 'elektronik', 'Musa Beni Ricardo Aruan', 'Elektronik (Mentor)', '2022_elektronik_musa_beni_ricardo_aruan_01.jpg'),
        ]
        for fname, cat, is_gen, inc, div, name, role, target in elec_2022:
            catalog.append({
                'source_path': f'public/images/instagram_feed/{fname}',
                'source_dir': 'instagram_feed',
                'year': 2022,
                'category': cat,
                'is_genuine_member': is_gen,
                'include_in_roster': inc,
                'division': div,
                'member_name': name,
                'role': role,
                'sequence': 1,
                'target_filename': target,
                'target_relative_path': f'instagram_feed/{target}',
                'evidence': f'Post Ci5OdP-L4vD: {name or "Cover Graphic"}'
            })

    # Manager 2022
    elif stem == '2022-09-24_15-24-38_UTC_Ci5PdHUrgvk':
        mgr_2022 = [
            (imgs[0]['filename'], 'GRAPHIC_BANNER', False, False, 'grafis', None, 'Cover Introduction Manager 2022', '2022_grafis_manager_cover_01.jpg'),
            (imgs[1]['filename'], 'MEMBER_PHOTO', True, True, 'manager', 'Yuli Dwi Saputri', 'Manager (Senior/Lead)', '2022_manager_yuli_dwi_saputri_01.jpg'),
            (imgs[2]['filename'], 'MEMBER_PHOTO', True, True, 'manager', 'Mustika Wahyu Aprilia', 'Manager (Keuangan & Administrasi)', '2022_manager_mustika_wahyu_aprilia_01.jpg'),
        ]
        for fname, cat, is_gen, inc, div, name, role, target in mgr_2022:
            catalog.append({
                'source_path': f'public/images/instagram_feed/{fname}',
                'source_dir': 'instagram_feed',
                'year': 2022,
                'category': cat,
                'is_genuine_member': is_gen,
                'include_in_roster': inc,
                'division': div,
                'member_name': name,
                'role': role,
                'sequence': 1,
                'target_filename': target,
                'target_relative_path': f'instagram_feed/{target}',
                'evidence': f'Post Ci5PdHUrgvk: {name or "Cover Graphic"}'
            })

    # Leader 2022
    elif stem == '2022-09-24_15-29-35_UTC_Ci5QBYaLgHg':
        ldr_2022 = [
            (imgs[0]['filename'], 'GRAPHIC_BANNER', False, False, 'grafis', None, 'Cover Introduction Leader 2022', '2022_grafis_leader_cover_01.jpg'),
            (imgs[1]['filename'], 'MEMBER_PHOTO', True, True, 'ketua', 'Muhammad Iqbal Rasyid', 'Ketua Tim (Team Leader 2022)', '2022_ketua_muhammad_iqbal_rasyid_01.jpg'),
        ]
        for fname, cat, is_gen, inc, div, name, role, target in ldr_2022:
            catalog.append({
                'source_path': f'public/images/instagram_feed/{fname}',
                'source_dir': 'instagram_feed',
                'year': 2022,
                'category': cat,
                'is_genuine_member': is_gen,
                'include_in_roster': inc,
                'division': div,
                'member_name': name,
                'role': role,
                'sequence': 1,
                'target_filename': target,
                'target_relative_path': f'instagram_feed/{target}',
                'evidence': f'Post Ci5QBYaLgHg: {name or "Cover Graphic"}'
            })

    # Program 2022
    elif stem == '2022-09-24_16-40-21_UTC_Ci5YHvevYYu':
        prog_2022 = [
            (imgs[0]['filename'], 'GRAPHIC_BANNER', False, False, 'grafis', None, 'Cover Introduction Program 2022', '2022_grafis_programmer_cover_01.jpg'),
            (imgs[1]['filename'], 'MEMBER_PHOTO', True, True, 'programmer', 'Salsabila Azzahra Putri Sophia Dewi Utami', 'Programmer (Koordinator)', '2022_programmer_salsabila_azzahra_01.jpg'),
            (imgs[2]['filename'], 'MEMBER_PHOTO', True, True, 'programmer', 'Muhammad Iqbal Rasyid', 'Programmer (Anggota)', '2022_programmer_muhammad_iqbal_rasyid_01.jpg'),
            (imgs[3]['filename'], 'MEMBER_PHOTO', True, True, 'programmer', 'Budi Arjaya Wida', 'Programmer (Mentor)', '2022_programmer_budi_arjaya_wida_01.jpg'),
            (imgs[4]['filename'], 'MEMBER_PHOTO', True, True, 'programmer', 'Nurcholis', 'Programmer (Mentor)', '2022_programmer_nurcholis_01.jpg'),
        ]
        for fname, cat, is_gen, inc, div, name, role, target in prog_2022:
            catalog.append({
                'source_path': f'public/images/instagram_feed/{fname}',
                'source_dir': 'instagram_feed',
                'year': 2022,
                'category': cat,
                'is_genuine_member': is_gen,
                'include_in_roster': inc,
                'division': div,
                'member_name': name,
                'role': role,
                'sequence': 1,
                'target_filename': target,
                'target_relative_path': f'instagram_feed/{target}',
                'evidence': f'Post Ci5YHvevYYu: {name or "Cover Graphic"}'
            })

    # 2023 DOKUMENTASI KRTMI WILAYAH & NASIONAL 2022 (Feb 2023)
    elif stem in ['2023-02-03_17-07-25_UTC_CoNUJgovUzp', '2023-02-03_17-07-48_UTC_CoNUMPUP-ZH', '2023-02-03_17-08-58_UTC_CoNUUzuPX9e']:
        for i, img in enumerate(imgs):
            fname = img['filename']
            catalog.append({
                'source_path': f'public/images/instagram_feed/{fname}',
                'source_dir': 'instagram_feed',
                'year': 2023,
                'category': 'COMPETITION_MOMENT',
                'is_genuine_member': False,
                'include_in_roster': False,
                'division': 'dokumentasi',
                'member_name': None,
                'role': 'Dokumentasi KRTMI Wilayah/Nasional 2022',
                'sequence': i + 1,
                'target_filename': f'2023_dokumentasi_krtmi_2022_{sc}_{i+1:02d}.jpg',
                'target_relative_path': f'instagram_feed/2023_dokumentasi_krtmi_2022_{sc}_{i+1:02d}.jpg',
                'evidence': f'Post {sc} slide {i+1}: Dokumentasi KRTMI 2022'
            })

    # 2023 RECRUITMENT POSTERS (June 2023)
    elif stem in ['2023-06-18_17-45-18_UTC_Cto_zCIPIMo', '2023-06-18_17-45-35_UTC_Cto_1Jrvlkf', '2023-06-18_17-45-51_UTC_Cto_3FDv_t0']:
        idx = 1 if 'zCIPIMo' in stem else (2 if '1Jrvlkf' in stem else 3)
        catalog.append({
            'source_path': f'public/images/instagram_feed/{imgs[0]["filename"]}',
            'source_dir': 'instagram_feed',
            'year': 2023,
            'category': 'GRAPHIC_BANNER',
            'is_genuine_member': False,
            'include_in_roster': False,
            'division': 'grafis',
            'member_name': None,
            'role': 'Recruitment / Welcome Grid Slice 2023',
            'sequence': idx,
            'target_filename': f'2023_grafis_welcome_recruitment_{idx:02d}.jpg',
            'target_relative_path': f'instagram_feed/2023_grafis_welcome_recruitment_{idx:02d}.jpg',
            'evidence': f'Post {sc}: Recruitment announcement graphic'
        })

    # 2023 INTRODUCTIONS & FORMATION (Sep 2023)
    # Programmer 2023
    elif stem == '2023-09-08_01-27-05_UTC_Cw6ZCItPRJ-':
        prog_2023 = [
            (imgs[0]['filename'], 'GRAPHIC_BANNER', False, False, 'grafis', None, 'Cover Introduction Programmer 2023', '2023_grafis_programmer_cover_01.jpg'),
            (imgs[1]['filename'], 'MEMBER_PHOTO', True, True, 'programmer', 'Salsabila Azzahra Putri Sophia Dewi Utami', 'Programmer / Leader (Angkatan 2020)', '2023_programmer_salsabila_azzahra_01.jpg'),
            (imgs[2]['filename'], 'MEMBER_PHOTO', True, True, 'programmer', 'Tri Wahyu Handoyo', 'Programmer (Angkatan 2022)', '2023_programmer_tri_wahyu_handoyo_01.jpg'),
            (imgs[3]['filename'], 'MEMBER_PHOTO', True, True, 'programmer', 'Farhan Yuda Mahendra', 'Programmer (Angkatan 2022)', '2023_programmer_farhan_yuda_mahendra_01.jpg'),
        ]
        for fname, cat, is_gen, inc, div, name, role, target in prog_2023:
            catalog.append({
                'source_path': f'public/images/instagram_feed/{fname}',
                'source_dir': 'instagram_feed',
                'year': 2023,
                'category': cat,
                'is_genuine_member': is_gen,
                'include_in_roster': inc,
                'division': div,
                'member_name': name,
                'role': role,
                'sequence': 1,
                'target_filename': target,
                'target_relative_path': f'instagram_feed/{target}',
                'evidence': f'Post Cw6ZCItPRJ-: {name or "Cover Graphic"}'
            })

    # Mekanik 2023
    elif stem == '2023-09-08_01-33-34_UTC_Cw6Zxo-vmO3':
        mech_2023 = [
            (imgs[0]['filename'], 'GRAPHIC_BANNER', False, False, 'grafis', None, 'Cover Introduction Mekanik 2023', '2023_grafis_mekanik_cover_01.jpg'),
            (imgs[1]['filename'], 'MEMBER_PHOTO', True, True, 'mekanik', 'Ilham Widyo Nugroho', 'Mekanik (Angkatan 2021)', '2023_mekanik_ilham_widyo_nugroho_01.jpg'),
            (imgs[2]['filename'], 'MEMBER_PHOTO', True, True, 'mekanik', 'Muhamad Ilham Sony', 'Mekanik (Angkatan 2020)', '2023_mekanik_muhamad_ilham_sony_01.jpg'),
            (imgs[3]['filename'], 'MEMBER_PHOTO', True, True, 'mekanik', 'Musyarof Rifai', 'Mekanik Advisor (Alumni)', '2023_mekanik_musyarof_rifai_advisor_01.jpg'),
        ]
        for fname, cat, is_gen, inc, div, name, role, target in mech_2023:
            catalog.append({
                'source_path': f'public/images/instagram_feed/{fname}',
                'source_dir': 'instagram_feed',
                'year': 2023,
                'category': cat,
                'is_genuine_member': is_gen,
                'include_in_roster': inc,
                'division': div,
                'member_name': name,
                'role': role,
                'sequence': 1,
                'target_filename': target,
                'target_relative_path': f'instagram_feed/{target}',
                'evidence': f'Post Cw6Zxo-vmO3: {name or "Cover Graphic"}'
            })

    # Elektronik 2023
    elif stem == '2023-09-08_01-39-35_UTC_Cw6ads0v8Q2':
        elec_2023 = [
            (imgs[0]['filename'], 'GRAPHIC_BANNER', False, False, 'grafis', None, 'Cover Introduction Elektronik 2023', '2023_grafis_elektronik_cover_01.jpg'),
            (imgs[1]['filename'], 'MEMBER_PHOTO', True, True, 'elektronik', 'Yusron Nur Latief', 'Elektronik Advisor (Alumni)', '2023_elektronik_yusron_nur_latief_advisor_01.jpg'),
            (imgs[2]['filename'], 'MEMBER_PHOTO', True, True, 'elektronik', 'Agus Bagaskoro', 'Elektronik (Angkatan 2021)', '2023_elektronik_agus_bagaskoro_01.jpg'),
            (imgs[3]['filename'], 'MEMBER_PHOTO', True, True, 'elektronik', 'Abdul Hasib Adzdzin Nuha', 'Elektronik (Angkatan 2022)', '2023_elektronik_abdul_hasib_adzdzin_nuha_01.jpg'),
        ]
        for fname, cat, is_gen, inc, div, name, role, target in elec_2023:
            catalog.append({
                'source_path': f'public/images/instagram_feed/{fname}',
                'source_dir': 'instagram_feed',
                'year': 2023,
                'category': cat,
                'is_genuine_member': is_gen,
                'include_in_roster': inc,
                'division': div,
                'member_name': name,
                'role': role,
                'sequence': 1,
                'target_filename': target,
                'target_relative_path': f'instagram_feed/{target}',
                'evidence': f'Post Cw6ads0v8Q2: {name or "Cover Graphic"}'
            })

    # Manager 2023
    elif stem == '2023-09-08_01-41-47_UTC_Cw6at1NPTGL':
        mgr_2023 = [
            (imgs[0]['filename'], 'GRAPHIC_BANNER', False, False, 'grafis', None, 'Cover Introduction Manager 2023', '2023_grafis_manager_cover_01.jpg'),
            (imgs[1]['filename'], 'MEMBER_PHOTO', True, True, 'manager', 'Mustika Wahyu Aprilia', 'Manager Tim (Angkatan 2021)', '2023_manager_mustika_wahyu_aprilia_01.jpg'),
            (imgs[2]['filename'], 'MEMBER_PHOTO', True, True, 'manager', 'Yuli Dwi Saputri', 'Manager Advisor (Alumni)', '2023_manager_yuli_dwi_saputri_advisor_01.jpg'),
        ]
        for fname, cat, is_gen, inc, div, name, role, target in mgr_2023:
            catalog.append({
                'source_path': f'public/images/instagram_feed/{fname}',
                'source_dir': 'instagram_feed',
                'year': 2023,
                'category': cat,
                'is_genuine_member': is_gen,
                'include_in_roster': inc,
                'division': div,
                'member_name': name,
                'role': role,
                'sequence': 1,
                'target_filename': target,
                'target_relative_path': f'instagram_feed/{target}',
                'evidence': f'Post Cw6at1NPTGL: {name or "Cover Graphic"}'
            })

    # Formasi Tim 2023
    elif stem == '2023-09-08_01-46-44_UTC_Cw6bSByvBVA':
        for i, img in enumerate(imgs):
            fname = img['filename']
            catalog.append({
                'source_path': f'public/images/instagram_feed/{fname}',
                'source_dir': 'instagram_feed',
                'year': 2023,
                'category': 'TEAM_PHOTO' if i > 0 else 'GRAPHIC_BANNER',
                'is_genuine_member': False,
                'include_in_roster': False,
                'division': 'kontingen',
                'member_name': 'Formasi Tim Abhinaya 2023',
                'role': 'Cover / Foto Formasi Kontingen 2023',
                'sequence': i + 1,
                'target_filename': f'2023_kontingen_formasi_tim_{i+1:02d}.jpg',
                'target_relative_path': f'instagram_feed/2023_kontingen_formasi_tim_{i+1:02d}.jpg',
                'evidence': f'Post Cw6bSByvBVA slide {i+1}: Formasi Tim Abhinaya 2023'
            })

    # Leader 2023
    elif stem == '2023-09-08_01-48-22_UTC_Cw6bd9zPTNP':
        ldr_2023 = [
            (imgs[0]['filename'], 'GRAPHIC_BANNER', False, False, 'grafis', None, 'Cover Introduction Leader 2023', '2023_grafis_leader_cover_01.jpg'),
            (imgs[1]['filename'], 'MEMBER_PHOTO', True, True, 'ketua', 'Salsabila Azzahra Putri Sophia Dewi Utami', 'Ketua Tim (Team Leader 2023)', '2023_ketua_salsabila_azzahra_01.jpg'),
        ]
        for fname, cat, is_gen, inc, div, name, role, target in ldr_2023:
            catalog.append({
                'source_path': f'public/images/instagram_feed/{fname}',
                'source_dir': 'instagram_feed',
                'year': 2023,
                'category': cat,
                'is_genuine_member': is_gen,
                'include_in_roster': inc,
                'division': div,
                'member_name': name,
                'role': role,
                'sequence': 1,
                'target_filename': target,
                'target_relative_path': f'instagram_feed/{target}',
                'evidence': f'Post Cw6bd9zPTNP: {name or "Cover Graphic"}'
            })

    # 2023 MOMENTS KRTMI REGIONAL & NASIONAL 2023
    elif stem in ['2023-09-08_02-08-37_UTC_Cw6dyWqPSoI', '2023-09-08_02-49-29_UTC_Cw6idpGPiVT', '2023-09-08_02-54-52_UTC_Cw6jFIzPwDx']:
        prefix = 'regional' if 'Cw6dyWqPSoI' in stem else ('juara3' if 'Cw6idpGPiVT' in stem else 'nasional')
        for i, img in enumerate(imgs):
            fname = img['filename']
            catalog.append({
                'source_path': f'public/images/instagram_feed/{fname}',
                'source_dir': 'instagram_feed',
                'year': 2023,
                'category': 'COMPETITION_MOMENT',
                'is_genuine_member': False,
                'include_in_roster': False,
                'division': 'prestasi',
                'member_name': None,
                'role': f'Dokumentasi Laga KRTMI {prefix.capitalize()} 2023',
                'sequence': i + 1,
                'target_filename': f'2023_prestasi_krtmi_{prefix}_{sc}_{i+1:02d}.jpg',
                'target_relative_path': f'instagram_feed/2023_prestasi_krtmi_{prefix}_{sc}_{i+1:02d}.jpg',
                'evidence': f'Post {sc} slide {i+1}: {p["caption"][:60]}'
            })

    # 2024 GRID BANNER (6 posts C_0u...)
    elif stem in ['2024-09-12_16-26-11_UTC_C_0uDCjzSjL', '2024-09-12_16-26-51_UTC_C_0uH9gTkXl', '2024-09-12_16-27-12_UTC_C_0uKjOzv1u', '2024-09-12_16-27-39_UTC_C_0uN4jT4fF', '2024-09-12_16-27-52_UTC_C_0uPbYzsDQ', '2024-09-12_16-28-05_UTC_C_0uRA8TA89']:
        catalog.append({
            'source_path': f'public/images/instagram_feed/{imgs[0]["filename"]}',
            'source_dir': 'instagram_feed',
            'year': 2024,
            'category': 'GRAPHIC_BANNER',
            'is_genuine_member': False,
            'include_in_roster': False,
            'division': 'grafis',
            'member_name': None,
            'role': 'Instagram 3x2 Grid Slice 2024',
            'sequence': 1,
            'target_filename': f'2024_grafis_grid_slice_{sc}.jpg',
            'target_relative_path': f'instagram_feed/2024_grafis_grid_slice_{sc}.jpg',
            'evidence': f'Post {sc}: Instagram 3x2 grid slice'
        })

    # 2024 INTRODUCTIONS
    # Programmer 2024
    elif stem == '2024-09-12_16-37-07_UTC_C_0vTMcTTGT':
        prog_2024 = [
            (imgs[0]['filename'], 'GRAPHIC_BANNER', False, False, 'grafis', None, 'Cover Introduction Programmer 2024', '2024_grafis_programmer_cover_01.jpg'),
            (imgs[1]['filename'], 'MEMBER_PHOTO', True, True, 'programmer', 'Tri Wahyu Handoyo', 'Programmer (Koordinator)', '2024_programmer_tri_wahyu_handoyo_01.jpg'),
            (imgs[2]['filename'], 'MEMBER_PHOTO', True, True, 'programmer', 'Salsabila Azzahra Putri Sophia Dewi Utami', 'Programmer (Anggota)', '2024_programmer_salsabila_azzahra_01.jpg'),
            (imgs[3]['filename'], 'MEMBER_PHOTO', True, True, 'programmer', 'Farhan Yuda Mahendra', 'Programmer (Anggota)', '2024_programmer_farhan_yuda_mahendra_01.jpg'),
        ]
        for fname, cat, is_gen, inc, div, name, role, target in prog_2024:
            catalog.append({
                'source_path': f'public/images/instagram_feed/{fname}',
                'source_dir': 'instagram_feed',
                'year': 2024,
                'category': cat,
                'is_genuine_member': is_gen,
                'include_in_roster': inc,
                'division': div,
                'member_name': name,
                'role': role,
                'sequence': 1,
                'target_filename': target,
                'target_relative_path': f'instagram_feed/{target}',
                'evidence': f'Post C_0vTMcTTGT: {name or "Cover Graphic"}'
            })

    # Mekanik 2024
    elif stem == '2024-09-12_16-40-27_UTC_C_0vriTzQUk':
        mech_2024 = [
            (imgs[0]['filename'], 'GRAPHIC_BANNER', False, False, 'grafis', None, 'Cover Introduction Mekanik 2024', '2024_grafis_mekanik_cover_01.jpg'),
            (imgs[1]['filename'], 'MEMBER_PHOTO', True, True, 'mekanik', 'Ilham Widyo Nugroho', 'Mekanik / Ketua Tim (Koordinator)', '2024_mekanik_ilham_widyo_nugroho_01.jpg'),
            (imgs[2]['filename'], 'MEMBER_PHOTO', True, True, 'mekanik', 'Muhamad Ilham Sony', 'Mekanik (Anggota)', '2024_mekanik_muhamad_ilham_sony_01.jpg'),
            (imgs[3]['filename'], 'MEMBER_PHOTO', True, True, 'mekanik', 'Caesar Sokma Langgeng', 'Mekanik (Anggota)', '2024_mekanik_caesar_sokma_langgeng_01.jpg'),
            (imgs[4]['filename'], 'MEMBER_PHOTO', True, True, 'mekanik', 'Rionaldi Nugroho', 'Mekanik (Anggota)', '2024_mekanik_rionaldi_nugroho_01.jpg'),
        ]
        for fname, cat, is_gen, inc, div, name, role, target in mech_2024:
            catalog.append({
                'source_path': f'public/images/instagram_feed/{fname}',
                'source_dir': 'instagram_feed',
                'year': 2024,
                'category': cat,
                'is_genuine_member': is_gen,
                'include_in_roster': inc,
                'division': div,
                'member_name': name,
                'role': role,
                'sequence': 1,
                'target_filename': target,
                'target_relative_path': f'instagram_feed/{target}',
                'evidence': f'Post C_0vriTzQUk: {name or "Cover Graphic"}'
            })

    # Elektronik 2024
    elif stem == '2024-09-12_16-42-44_UTC_C_0v8QYT7kJ':
        elec_2024 = [
            (imgs[0]['filename'], 'GRAPHIC_BANNER', False, False, 'grafis', None, 'Cover Introduction Elektronik 2024', '2024_grafis_elektronik_cover_01.jpg'),
            (imgs[1]['filename'], 'MEMBER_PHOTO', True, True, 'elektronik', 'Abdul Hasib Adzdzin Nuha', 'Elektronik (Koordinator)', '2024_elektronik_abdul_hasib_adzdzin_nuha_01.jpg'),
            (imgs[2]['filename'], 'MEMBER_PHOTO', True, True, 'elektronik', 'Agus Bagaskoro', 'Elektronik (Anggota)', '2024_elektronik_agus_bagaskoro_01.jpg'),
            (imgs[3]['filename'], 'MEMBER_PHOTO', True, True, 'elektronik', 'Ikhsan Nurrohman', 'Elektronik (Anggota)', '2024_elektronik_ikhsan_nurrohman_01.jpg'),
        ]
        for fname, cat, is_gen, inc, div, name, role, target in elec_2024:
            catalog.append({
                'source_path': f'public/images/instagram_feed/{fname}',
                'source_dir': 'instagram_feed',
                'year': 2024,
                'category': cat,
                'is_genuine_member': is_gen,
                'include_in_roster': inc,
                'division': div,
                'member_name': name,
                'role': role,
                'sequence': 1,
                'target_filename': target,
                'target_relative_path': f'instagram_feed/{target}',
                'evidence': f'Post C_0v8QYT7kJ: {name or "Cover Graphic"}'
            })

    # Manager 2024
    elif stem == '2024-09-12_16-45-33_UTC_C_0wQ-qzwUx':
        mgr_2024 = [
            (imgs[0]['filename'], 'GRAPHIC_BANNER', False, False, 'grafis', None, 'Cover Introduction Manager 2024', '2024_grafis_manager_cover_01.jpg'),
            (imgs[1]['filename'], 'MEMBER_PHOTO', True, True, 'manager', 'Mustika Wahyu Aprilia', 'Manager (Keuangan & Administrasi)', '2024_manager_mustika_wahyu_aprilia_01.jpg'),
            (imgs[2]['filename'], 'MEMBER_PHOTO', True, True, 'manager', 'Rose Pita Nur Afifah', 'Manager (Media & Publikasi)', '2024_manager_rose_pita_nur_afifah_01.jpg'),
        ]
        for fname, cat, is_gen, inc, div, name, role, target in mgr_2024:
            catalog.append({
                'source_path': f'public/images/instagram_feed/{fname}',
                'source_dir': 'instagram_feed',
                'year': 2024,
                'category': cat,
                'is_genuine_member': is_gen,
                'include_in_roster': inc,
                'division': div,
                'member_name': name,
                'role': role,
                'sequence': 1,
                'target_filename': target,
                'target_relative_path': f'instagram_feed/{target}',
                'evidence': f'Post C_0wQ-qzwUx: {name or "Cover Graphic"}'
            })

    # Mentor 2024
    elif stem == '2024-09-12_16-47-00_UTC_C_0wbi1z6IH':
        catalog.append({
            'source_path': f'public/images/instagram_feed/{imgs[0]["filename"]}',
            'source_dir': 'instagram_feed',
            'year': 2024,
            'category': 'MENTOR_PHOTO',
            'is_genuine_member': True,
            'include_in_roster': True,
            'division': 'pembimbing',
            'member_name': 'Prof. Ir. Moh. Khairudin, M.T., Ph.D., IPU.',
            'role': 'Dosen Pembimbing Utama',
            'sequence': 1,
            'target_filename': '2024_pembimbing_prof_moh_khairudin_01.jpg',
            'target_relative_path': 'instagram_feed/2024_pembimbing_prof_moh_khairudin_01.jpg',
            'evidence': 'Post C_0wbi1z6IH: Prof. Ir. Moh. Khairudin, MT., PhD., IPU.'
        })

    # Leader 2024
    elif stem == '2024-09-12_16-47-42_UTC_C_0wguVTpGY':
        catalog.append({
            'source_path': f'public/images/instagram_feed/{imgs[0]["filename"]}',
            'source_dir': 'instagram_feed',
            'year': 2024,
            'category': 'MEMBER_PHOTO',
            'is_genuine_member': True,
            'include_in_roster': True,
            'division': 'ketua',
            'member_name': 'Ilham Widyo Nugroho',
            'role': 'Ketua Tim (Team Leader 2024)',
            'sequence': 1,
            'target_filename': '2024_ketua_ilham_widyo_nugroho_01.jpg',
            'target_relative_path': 'instagram_feed/2024_ketua_ilham_widyo_nugroho_01.jpg',
            'evidence': 'Post C_0wguVTpGY: Leader 2024 Ilham Widyo Nugroho'
        })

    # 2024 MOMENTS KRTMI 2024 (Regional 1st, National 2nd, UMS Surakarta)
    elif stem in ['2024-09-12_17-49-08_UTC_C_03ipczFeM', '2024-09-12_17-49-24_UTC_C_03kmdTpNp', '2024-09-12_17-50-54_UTC_C_03vj8zNUB']:
        prefix = 'regional_juara1' if 'C_03ipczFeM' in stem else ('venue_ums' if 'C_03kmdTpNp' in stem else 'nasional_juara2')
        for i, img in enumerate(imgs):
            fname = img['filename']
            catalog.append({
                'source_path': f'public/images/instagram_feed/{fname}',
                'source_dir': 'instagram_feed',
                'year': 2024,
                'category': 'COMPETITION_MOMENT',
                'is_genuine_member': False,
                'include_in_roster': False,
                'division': 'prestasi',
                'member_name': None,
                'role': f'Dokumentasi Prestasi KRTMI 2024 ({prefix})',
                'sequence': i + 1,
                'target_filename': f'2024_prestasi_krtmi_{prefix}_{sc}_{i+1:02d}.jpg',
                'target_relative_path': f'instagram_feed/2024_prestasi_krtmi_{prefix}_{sc}_{i+1:02d}.jpg',
                'evidence': f'Post {sc} slide {i+1}: Dokumentasi Juara KRTMI 2024'
            })

    # 2025 INTRODUCTIONS (Sep 2025)
    # Mekanik 2025
    elif stem == '2025-09-27_20-10-47_UTC_DPHl0olk4Zw':
        mech_2025 = [
            (imgs[0]['filename'], 'GRAPHIC_BANNER', False, False, 'grafis', None, 'Cover Introduction Mechanics 2025', '2025_grafis_mekanik_cover_01.jpg'),
            (imgs[1]['filename'], 'MEMBER_PHOTO', True, True, 'mekanik', 'Rionaldi Nugroho', 'Mekanik (Koordinator 2025)', '2025_mekanik_rionaldi_nugroho_01.jpg'),
            (imgs[2]['filename'], 'MEMBER_PHOTO', True, True, 'mekanik', 'Caesar Sokma Langgeng', 'Mekanik (Anggota 2025)', '2025_mekanik_caesar_sokma_langgeng_01.jpg'),
            (imgs[3]['filename'], 'MEMBER_PHOTO', True, True, 'mekanik', 'Adhiyatma Fatya Ramadhani', 'Mekanik (Anggota 2025)', '2025_mekanik_adhiyatma_fatya_ramadhani_01.jpg'),
            (imgs[4]['filename'], 'MEMBER_PHOTO', True, True, 'mekanik', 'Andika Nanda Wijaya', 'Mekanik (Anggota 2025)', '2025_mekanik_andika_nanda_wijaya_01.jpg'),
            (imgs[5]['filename'], 'MEMBER_PHOTO', True, True, 'mekanik', 'Kharisma Putra Mahardika', 'Mekanik (Anggota 2025)', '2025_mekanik_kharisma_putra_mahardika_01.jpg'),
        ]
        for fname, cat, is_gen, inc, div, name, role, target in mech_2025:
            catalog.append({
                'source_path': f'public/images/instagram_feed/{fname}',
                'source_dir': 'instagram_feed',
                'year': 2025,
                'category': cat,
                'is_genuine_member': is_gen,
                'include_in_roster': inc,
                'division': div,
                'member_name': name,
                'role': role,
                'sequence': 1,
                'target_filename': target,
                'target_relative_path': f'instagram_feed/{target}',
                'evidence': f'Post DPHl0olk4Zw: {name or "Cover Graphic"}'
            })

    # Elektronik 2025
    elif stem == '2025-09-27_20-17-09_UTC_DPHmjMFEwJm':
        elec_2025 = [
            (imgs[0]['filename'], 'GRAPHIC_BANNER', False, False, 'grafis', None, 'Cover Introduction Electronics 2025', '2025_grafis_elektronik_cover_01.jpg'),
            (imgs[1]['filename'], 'MEMBER_PHOTO', True, True, 'elektronik', 'Ikhsan Nurrohman', 'Elektronik (Koordinator 2025)', '2025_elektronik_ikhsan_nurrohman_01.jpg'),
            (imgs[2]['filename'], 'MEMBER_PHOTO', True, True, 'elektronik', 'Abdul Hasib Adzdzin Nuha', 'Elektronik (Anggota 2025)', '2025_elektronik_abdul_hasib_adzdzin_nuha_01.jpg'),
            (imgs[3]['filename'], 'MEMBER_PHOTO', True, True, 'elektronik', 'Aryasetya Maulana Swasdika', 'Elektronik (Anggota 2025)', '2025_elektronik_aryasetya_maulana_swasdika_01.jpg'),
            (imgs[4]['filename'], 'MEMBER_PHOTO', True, True, 'elektronik', 'Naufal Farros Zainal Arifin', 'Elektronik (Anggota 2025)', '2025_elektronik_naufal_farros_zainal_arifin_01.jpg'),
        ]
        for fname, cat, is_gen, inc, div, name, role, target in elec_2025:
            catalog.append({
                'source_path': f'public/images/instagram_feed/{fname}',
                'source_dir': 'instagram_feed',
                'year': 2025,
                'category': cat,
                'is_genuine_member': is_gen,
                'include_in_roster': inc,
                'division': div,
                'member_name': name,
                'role': role,
                'sequence': 1,
                'target_filename': target,
                'target_relative_path': f'instagram_feed/{target}',
                'evidence': f'Post DPHmjMFEwJm: {name or "Cover Graphic"}'
            })

    # Programmer 2025
    elif stem == '2025-09-27_20-21-31_UTC_DPHnDR1E7WH':
        prog_2025 = [
            (imgs[0]['filename'], 'GRAPHIC_BANNER', False, False, 'grafis', None, 'Cover Introduction Programmer 2025', '2025_grafis_programmer_cover_01.jpg'),
            (imgs[1]['filename'], 'MEMBER_PHOTO', True, True, 'programmer', 'Tri Wahyu Handoyo', 'Programmer (Koordinator 2025)', '2025_programmer_tri_wahyu_handoyo_01.jpg'),
            (imgs[2]['filename'], 'MEMBER_PHOTO', True, True, 'programmer', 'Farhan Yuda Mahendra', 'Programmer / Leader 2025', '2025_programmer_farhan_yuda_mahendra_01.jpg'),
            (imgs[3]['filename'], 'MEMBER_PHOTO', True, True, 'programmer', 'Hanif NurKhalis', 'Programmer (Anggota 2025)', '2025_programmer_hanif_nurkhalis_01.jpg'),
            (imgs[4]['filename'], 'MEMBER_PHOTO', True, True, 'programmer', 'Hisyam Yasid Pratowo', 'Programmer (Anggota 2025)', '2025_programmer_hisyam_yasid_pratowo_01.jpg'),
        ]
        for fname, cat, is_gen, inc, div, name, role, target in prog_2025:
            catalog.append({
                'source_path': f'public/images/instagram_feed/{fname}',
                'source_dir': 'instagram_feed',
                'year': 2025,
                'category': cat,
                'is_genuine_member': is_gen,
                'include_in_roster': inc,
                'division': div,
                'member_name': name,
                'role': role,
                'sequence': 1,
                'target_filename': target,
                'target_relative_path': f'instagram_feed/{target}',
                'evidence': f'Post DPHnDR1E7WH: {name or "Cover Graphic"}'
            })

    # Manager 2025
    elif stem == '2025-09-27_20-30-33_UTC_DPHoFZYk8lw':
        mgr_2025 = [
            (imgs[0]['filename'], 'GRAPHIC_BANNER', False, False, 'grafis', None, 'Cover Introduction Manager 2025', '2025_grafis_manager_cover_01.jpg'),
            (imgs[1]['filename'], 'MEMBER_PHOTO', True, True, 'manager', 'Rose Pita Nur Afifah', 'Manager (Koordinator 2025)', '2025_manager_rose_pita_nur_afifah_01.jpg'),
            (imgs[2]['filename'], 'MEMBER_PHOTO', True, True, 'manager', 'Zelfa Nafisah Zalna', 'Manager (Anggota 2025)', '2025_manager_zelfa_nafisah_zalna_01.jpg'),
        ]
        for fname, cat, is_gen, inc, div, name, role, target in mgr_2025:
            catalog.append({
                'source_path': f'public/images/instagram_feed/{fname}',
                'source_dir': 'instagram_feed',
                'year': 2025,
                'category': cat,
                'is_genuine_member': is_gen,
                'include_in_roster': inc,
                'division': div,
                'member_name': name,
                'role': role,
                'sequence': 1,
                'target_filename': target,
                'target_relative_path': f'instagram_feed/{target}',
                'evidence': f'Post DPHoFZYk8lw: {name or "Cover Graphic"}'
            })

    # Mentor 2025
    elif stem == '2025-09-27_20-31-45_UTC_DPHoOJJk2NM':
        mentor_2025 = [
            (imgs[0]['filename'], 'GRAPHIC_BANNER', False, False, 'grafis', None, 'Cover Introduction Mentor 2025', '2025_grafis_pembimbing_cover_01.jpg'),
            (imgs[1]['filename'], 'MENTOR_PHOTO', True, True, 'pembimbing', 'Prof. Ir. Moh. Khairudin, M.T., Ph.D., IPU.', 'Dosen Pembimbing Utama', '2025_pembimbing_prof_moh_khairudin_01.jpg'),
        ]
        for fname, cat, is_gen, inc, div, name, role, target in mentor_2025:
            catalog.append({
                'source_path': f'public/images/instagram_feed/{fname}',
                'source_dir': 'instagram_feed',
                'year': 2025,
                'category': cat,
                'is_genuine_member': is_gen,
                'include_in_roster': inc,
                'division': div,
                'member_name': name,
                'role': role,
                'sequence': 1,
                'target_filename': target,
                'target_relative_path': f'instagram_feed/{target}',
                'evidence': f'Post DPHoOJJk2NM: {name or "Cover Graphic"}'
            })

    # Leader 2025
    elif stem == '2025-09-27_20-32-54_UTC_DPHoWoFkxa3':
        ldr_2025 = [
            (imgs[0]['filename'], 'GRAPHIC_BANNER', False, False, 'grafis', None, 'Cover Introduction Leader 2025', '2025_grafis_leader_cover_01.jpg'),
            (imgs[1]['filename'], 'MEMBER_PHOTO', True, True, 'ketua', 'Farhan Yuda Mahendra', 'Ketua Tim (Team Leader 2025)', '2025_ketua_farhan_yuda_mahendra_01.jpg'),
        ]
        for fname, cat, is_gen, inc, div, name, role, target in ldr_2025:
            catalog.append({
                'source_path': f'public/images/instagram_feed/{fname}',
                'source_dir': 'instagram_feed',
                'year': 2025,
                'category': cat,
                'is_genuine_member': is_gen,
                'include_in_roster': inc,
                'division': div,
                'member_name': name,
                'role': role,
                'sequence': 1,
                'target_filename': target,
                'target_relative_path': f'instagram_feed/{target}',
                'evidence': f'Post DPHoWoFkxa3: {name or "Cover Graphic"}'
            })

    # 2025 GRID BANNER (6 posts DPHor...)
    elif stem in ['2025-09-27_20-35-49_UTC_DPHor8rEz4v', '2025-09-27_20-36-18_UTC_DPHovgbk4NE', '2025-09-27_20-36-52_UTC_DPHozsjkzcZ', '2025-09-27_20-37-34_UTC_DPHo4wEk6vW', '2025-09-27_20-37-55_UTC_DPHo7UHE-ZX', '2025-09-27_20-38-49_UTC_DPHpB7eE-bY']:
        catalog.append({
            'source_path': f'public/images/instagram_feed/{imgs[0]["filename"]}',
            'source_dir': 'instagram_feed',
            'year': 2025,
            'category': 'GRAPHIC_BANNER',
            'is_genuine_member': False,
            'include_in_roster': False,
            'division': 'grafis',
            'member_name': None,
            'role': 'Instagram 3x2 Grid Slice 2025 ("Welcome Thematic Team Abhinaya 2025")',
            'sequence': 1,
            'target_filename': f'2025_grafis_grid_slice_{sc}.jpg',
            'target_relative_path': f'instagram_feed/2025_grafis_grid_slice_{sc}.jpg',
            'evidence': f'Post {sc}: Instagram 3x2 grid slice'
        })

print(f'Total cataloged items: {len(catalog)}')
with open('scripts/full_catalog_with_renaming.json', 'w', encoding='utf-8') as f:
    json.dump(catalog, f, indent=2, ensure_ascii=False)
print('Saved to scripts/full_catalog_with_renaming.json')
