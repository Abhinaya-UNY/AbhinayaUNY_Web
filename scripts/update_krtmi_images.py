import re

file_path = r"D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web\data\krtmiData.ts"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Update interface
if "coverImage?: string;" not in content:
    content = content.replace(
        "  isChampion?: boolean;\n  pdfFile: string;",
        "  isChampion?: boolean;\n  coverImage?: string;\n  logoImage?: string;\n  pdfFile: string;"
    )

# 2. Add coverImage and logoImage to each year
year_images = {
    "'2026'": ("'/images/tournaments/technocorner_2026_thumb.jpg'", "'/images/tournaments/technocorner_logo.png'"),
    "'2024'": ("'/images/tournaments/krtmi_2024_thumb.jpg'", "'/images/tournaments/krtmi_2024_cover.png'"),
    "'2023'": ("'/images/tournaments/krtmi_2023_thumb.jpg'", "'/images/tournaments/krtmi_2023_cover.png'"),
    "'2022'": ("'/images/tournaments/krtmi_2022_thumb.jpg'", "'/images/tournaments/krtmi_2022_cover.png'"),
    "'2021'": ("'/images/tournaments/krtmi_2021_thumb.jpg'", "'/images/tournaments/krtmi_2021_cover.png'"),
    "'2020'": ("'/images/tournaments/krtmi_2020_thumb.jpg'", "'/images/tournaments/krtmi_2020_cover.png'"),
    "'2019'": ("'/images/tournaments/krtmi_2019_thumb.jpg'", "'/images/tournaments/krtmi_2019_cover.png'"),
}

for yr, (cover, logo) in year_images.items():
    # find block for this year
    pattern = rf"(year:\s*{yr},[\s\S]*?pdfFile:\s*)"
    def repl(m):
        block = m.group(1)
        if "coverImage:" not in block:
            return block.replace("pdfFile:", f"coverImage: {cover},\n    logoImage: {logo},\n    pdfFile:")
        return block
    content = re.sub(pattern, repl, content, count=1)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Updated krtmiData.ts with tournament images!")
