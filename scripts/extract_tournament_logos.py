import os
import fitz # PyMuPDF
from PIL import Image

output_dir = r"D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web\public\images\tournaments"
os.makedirs(output_dir, exist_ok=True)

pdf_map = {
    "krtmi_2019": r"D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\Restek\Abhinaya 2024\Mas Agus Titip\Project\Panduan_KRTMI2019.pdf",
    "krtmi_2020": r"D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\Petunjuk Pelaksanaan KRI 2020.pdf",
    "krtmi_2021": r"D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\Pedoman Kontes Robot Indonesia (KRI) tahun 2021.pdf",
    "krtmi_2022": r"D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\Restek\Abhinaya KRTMI 2023\Referensi\PANDUAN KRTMI 2022 HEHE MLZ.pdf",
    "krtmi_2023": r"D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\Restek\Abhinaya KRTMI 2023\BukuPedomanKRI2023.pdf",
    "krtmi_2024": r"D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\Restek\Abhinaya 2024\Bedah Rules\BUKU 7 Kontes Robot Tematik Indonesia (KRTMI).pdf",
    "krtmi_2024_full": r"D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\Restek\Abhinaya 2024\Bedah Rules\Buku Pedoman KRI 2024 fix.pdf",
    "technocorner_2026": r"D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\Lomba Technocorner UGM\02_Transporter\GUIDEBOOK TRANSPORTER TC26.pdf"
}

for key, pdf_path in pdf_map.items():
    if not os.path.exists(pdf_path):
        print(f"File not found: {pdf_path}")
        continue
    
    doc = fitz.open(pdf_path)
    print(f"\nProcessing {key} ({len(doc)} pages)...")
    
    # 1. Render Cover Page (Page 0) in High Resolution
    page = doc[0]
    pix = page.get_pixmap(dpi=200)
    cover_path = os.path.join(output_dir, f"{key}_cover.png")
    pix.save(cover_path)
    print(f"  Saved cover: {cover_path} ({pix.width}x{pix.height})")
    
    # 2. Extract Embedded Images from first 5 pages to find standalone logos
    img_count = 0
    for pno in range(min(5, len(doc))):
        p = doc[pno]
        image_list = p.get_images(full=True)
        for img_index, img_info in enumerate(image_list):
            xref = img_info[0]
            base_image = doc.extract_image(xref)
            image_bytes = base_image["image"]
            image_ext = base_image["ext"]
            
            # Save image if size is reasonable
            if len(image_bytes) > 5000: # filter tiny bullets
                logo_path = os.path.join(output_dir, f"{key}_extracted_p{pno}_{img_index}.{image_ext}")
                with open(logo_path, "wb") as f:
                    f.write(image_bytes)
                print(f"  Extracted image: {logo_path} ({len(image_bytes)/1024:.1f} KB)")
                img_count += 1
                if img_count >= 6:
                    break
        if img_count >= 6:
            break
