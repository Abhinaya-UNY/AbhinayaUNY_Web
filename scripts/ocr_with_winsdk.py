import os
import asyncio
from PIL import Image
import winsdk.windows.graphics.imaging as imaging
import winsdk.windows.media.ocr as ocr
import winsdk.windows.storage as storage
import winsdk.windows.storage.streams as streams

async def run_ocr():
    engine = ocr.OcrEngine.try_create_from_user_profile_languages()
    if not engine:
        import winsdk.windows.globalization as glob
        engine = ocr.OcrEngine.try_create_from_language(glob.Language("en-US"))
    
    folder = r"D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\Restek\Abhinaya 2025\ABHINAYA - FEED ANGGOTA"
    files = sorted([f for f in os.listdir(folder) if f.endswith('.png')], key=lambda x: int(os.path.splitext(x)[0]) if os.path.splitext(x)[0].isdigit() else x)
    
    results = []
    for f in files:
        file_path = os.path.join(folder, f)
        storage_file = await storage.StorageFile.get_file_from_path_async(file_path)
        stream = await storage_file.open_async(storage.FileAccessMode.READ)
        decoder = await imaging.BitmapDecoder.create_async(stream)
        bitmap = await decoder.get_software_bitmap_async()
        
        res = await engine.recognize_async(bitmap)
        lines = [line.text.strip() for line in res.lines if line.text.strip()]
        full_text = " | ".join(lines)
        results.append((f, file_path, lines, full_text))
        print(f"=== {f} ===")
        for l in lines:
            print(f"  {l}")
        print()
    
    return results

if __name__ == "__main__":
    asyncio.run(run_ocr())
