import os
import subprocess

ps_script = r'''
$source = @"
using System;
using System.IO;
using System.Threading.Tasks;
using Windows.Graphics.Imaging;
using Windows.Media.Ocr;
using Windows.Storage;

public class WinOcrHelper {
    public static async Task<string> RecognizeFile(string filePath) {
        var file = await StorageFile.GetFileFromPathAsync(filePath);
        using (var stream = await file.OpenAsync(FileAccessMode.Read)) {
            var decoder = await BitmapDecoder.CreateAsync(stream);
            var bitmap = await decoder.GetSoftwareBitmapAsync();
            var engine = OcrEngine.TryCreateFromUserProfileLanguages() ?? OcrEngine.TryCreateFromLanguage(new Windows.Globalization.Language("en-US"));
            var ocrResult = await engine.RecognizeAsync(bitmap);
            return ocrResult.Text;
        }
    }
}
"@

$winDir = [System.Environment]::GetFolderPath([System.Environment+SpecialFolder]::Windows)
Add-Type -TypeDefinition $source -Language CSharp -ReferencedAssemblies @(
    'System.Runtime.WindowsRuntime',
    [System.IO.Path]::Combine($winDir, 'System32\WinMetadata\Windows.Foundation.winmd'),
    [System.IO.Path]::Combine($winDir, 'System32\WinMetadata\Windows.Graphics.winmd'),
    [System.IO.Path]::Combine($winDir, 'System32\WinMetadata\Windows.Media.winmd'),
    [System.IO.Path]::Combine($winDir, 'System32\WinMetadata\Windows.Storage.winmd'),
    [System.IO.Path]::Combine($winDir, 'System32\WinMetadata\Windows.Globalization.winmd')
)

$folder = "D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\Restek\Abhinaya 2025\ABHINAYA - FEED ANGGOTA"
$files = Get-ChildItem $folder -Filter '*.png' | Sort-Object { [int]$_.BaseName }

foreach ($f in $files) {
    try {
        $text = [WinOcrHelper]::RecognizeFile($f.FullName).GetAwaiter().GetResult()
        $singleLine = ($text -split "`r?`n" | Where-Object { $_.Trim() -ne "" }) -join " | "
        Write-Host "$($f.Name) ===> $singleLine"
    } catch {
        Write-Host "Error $($f.Name): $($_.Exception.Message)"
    }
}
'''

with open("D:/Data_Lokal/Kuliah/Tri Wahyu (22518241023)/AbhinayaUNY_Web/scripts/ocr_members.ps1", "w", encoding="utf-8") as f:
    f.write(ps_script)

res = subprocess.run(["powershell", "-ExecutionPolicy", "Bypass", "-File", "D:/Data_Lokal/Kuliah/Tri Wahyu (22518241023)/AbhinayaUNY_Web/scripts/ocr_members.ps1"], capture_output=True, text=True)
print("STDOUT:")
print(res.stdout)
print("STDERR:")
print(res.stderr)
