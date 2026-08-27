import json

with open("scripts/instagram_analysis.json", "r", encoding="utf-8") as f:
    posts = json.load(f)

md_lines = ["# Analisis Lengkap Feed & Caption Instagram Resmi @abhinaya.uny 📸🤖\n\n"]

for i, p in enumerate(posts, 1):
    stem = p["base_stem"]
    cap = p["caption"]
    imgs = p["images"]
    
    md_lines.append(f"## {i}. Post `{stem}` ({len(imgs)} Foto HD)\n")
    if cap:
        md_lines.append("```text\n" + cap + "\n```\n")
    else:
        md_lines.append("*(Tidak ada teks caption)*\n")
    
    md_lines.append("**Daftar Foto:**\n")
    for img in imgs:
        md_lines.append(f"- `{img}`\n")
    md_lines.append("\n---\n\n")

with open("scripts/INSTAGRAM_ANALYSIS_SUMMARY.md", "w", encoding="utf-8") as f:
    f.writelines(md_lines)

print("Generated scripts/INSTAGRAM_ANALYSIS_SUMMARY.md!")
