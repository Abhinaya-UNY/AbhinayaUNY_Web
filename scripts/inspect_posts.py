import glob, os, sys
sys.stdout.reconfigure(encoding='utf-8')
ig_dir = r"D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web\public\images\instagram_feed"
for base in ['CiAjwfRL4ln', 'CiAj23Yr7iv', 'CValTvaPQdt', 'CVaoXCJvrS9', 'CeFpRStLwaE']:
    txt = os.path.join(ig_dir, f"*{base}*.txt")
    matches = glob.glob(txt)
    for m in matches:
        print(f"=== {os.path.basename(m)} ===")
        with open(m, 'r', encoding='utf-8', errors='ignore') as fp:
            print(fp.read())
