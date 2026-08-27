import os
import cv2
import numpy as np
from PIL import Image
import winsdk.windows.graphics.imaging as imaging
import winsdk.windows.media.ocr as ocr
import winsdk.windows.storage as storage
import asyncio

folder = r"D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\Restek\Abhinaya 2025\ABHINAYA - FEED ANGGOTA"
debug_folder = r"D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web\scripts\ocr_debug"
os.makedirs(debug_folder, exist_ok=True)

async def detailed_analysis():
    engine = ocr.OcrEngine.try_create_from_user_profile_languages()
    if not engine:
        import winsdk.windows.globalization as glob
        engine = ocr.OcrEngine.try_create_from_language(glob.Language("en-US"))

    files = sorted([f for f in os.listdir(folder) if f.endswith('.png')], key=lambda x: int(os.path.splitext(x)[0]) if os.path.splitext(x)[0].isdigit() else x)

    for f in files:
        img_path = os.path.join(folder, f)
        img = cv2.imread(img_path)
        h, w, _ = img.shape
        
        # Crop text area (usually middle-bottom or middle-left)
        # Let's save a contrast-enhanced version
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        
        # Multiple enhancements
        # 1. CLAHE
        clahe = cv2.createCLAHE(clipLimit=3.0, tileGridSize=(8,8))
        cl = clahe.apply(gray)
        
        # 2. Otsu threshold inverted and normal
        _, thresh1 = cv2.threshold(cl, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
        _, thresh2 = cv2.threshold(cl, 0, 255, cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU)
        
        # Save debug
        enhanced_path = os.path.join(debug_folder, f"enh_{f}")
        cv2.imwrite(enhanced_path, cl)
        
        # OCR on enhanced
        storage_file = await storage.StorageFile.get_file_from_path_async(enhanced_path)
        stream = await storage_file.open_async(storage.FileAccessMode.READ)
        decoder = await imaging.BitmapDecoder.create_async(stream)
        bitmap = await decoder.get_software_bitmap_async()
        
        res = await engine.recognize_async(bitmap)
        lines = [line.text.strip() for line in res.lines if line.text.strip()]
        
        print(f"[{f}] Enhanced OCR:")
        for l in lines:
            print(f"   {l}")
        print("-" * 50)

if __name__ == "__main__":
    asyncio.run(detailed_analysis())
