import re

file_path = r"D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web\data\teamData.ts"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Update interface
if "images?: string[];" not in content:
    content = content.replace(
        "  image: string;\n  badge: string;",
        "  image: string;\n  images?: string[];\n  badge: string;"
    )

# 2. Member images mapping
member_images = {
    "'ilham-widyo-nugroho'": ["/images/members/09_ilham_widyo_nugroho_1.png", "/images/members/09_ilham_widyo_nugroho_2.png"],
    "'mustika-wahyu-aprilia'": ["/images/members/04_mustika_wahyu_aprilia_1.png", "/images/members/04_mustika_wahyu_aprilia_2.png", "/images/members/13_wanted_uang_kas_bendahara.png"],
    "'rose-pita-nur-afifah'": ["/images/members/05_rose_pita_nur_afifah_1.png", "/images/members/05_rose_pita_nur_afifah_2.png"],
    "'tri-wahyu-handoyo'": ["/images/members/06_tri_wahyu_handoyo_1.png", "/images/members/06_tri_wahyu_handoyo_2.png"],
    "'salsabila-azzahra'": ["/images/members/08_salsabila_azzahra_1.png", "/images/members/08_salsabila_azzahra_2.png"],
    "'farhan-yuda-mahendra'": ["/images/members/07_farhan_yuda_mahendra_1.png", "/images/members/07_farhan_yuda_mahendra_2.png"],
    "'abdul-hasib-adzdzin-nuha'": ["/images/members/01_abdul_hasib_adzdzin_nuha_1.png", "/images/members/01_abdul_hasib_adzdzin_nuha_2.png"],
    "'agus-bagaskoro'": ["/images/members/02_agus_bagaskoro_1.png", "/images/members/02_agus_bagaskoro_2.png"],
    "'ikhsan-nurrohman'": ["/images/members/03_ikhsan_nurrohman_1.png", "/images/members/03_ikhsan_nurrohman_2.png"],
    "'yusron-nur-latief'": ["/assets/logo_abhinaya_solid.png"],
    "'muhamad-ilham-sony'": ["/images/members/10_muhamad_ilham_sony_1.png", "/images/members/10_muhamad_ilham_sony_2.png"],
    "'caesar-sokma-langgeng'": ["/images/members/11_caesar_sokma_langgeng_1.png", "/images/members/11_caesar_sokma_langgeng_2.png"],
    "'rionaldi-nugroho'": ["/images/members/12_rionaldi_nugroho_1.png", "/images/members/12_rionaldi_nugroho_2.png"],
    "'prof-khairudin'": ["/assets/logo_abhinaya_solid.png"],
    "'dr-herlambang'": ["/assets/logo_abhinaya_solid.png"],
}

for mem_id, imgs in member_images.items():
    formatted_imgs = "[\n      " + ",\n      ".join([f"'{img}'" for img in imgs]) + ",\n    ]"
    # Match id block
    pattern = rf"(id:\s*{mem_id},[\s\S]*?image:\s*'[^']+',)"
    def repl(m):
        block = m.group(1)
        if "images:" not in block:
            return f"{block}\n    images: {formatted_imgs},"
        return block
    content = re.sub(pattern, repl, content, count=1)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Updated teamData.ts with multi-image arrays!")
