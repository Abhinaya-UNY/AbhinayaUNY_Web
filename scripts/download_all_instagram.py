import os
import instaloader

target_dir = r"D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web\public\images\instagram_feed"
os.makedirs(target_dir, exist_ok=True)

L = instaloader.Instaloader(
    download_pictures=True,
    download_videos=False,
    download_video_thumbnails=True,
    download_geotags=False,
    download_comments=False,
    save_metadata=True,
    dirname_pattern=target_dir,
    filename_pattern="{date_utc}_UTC_{shortcode}"
)

print("Starting FULL download for profile abhinaya.uny (All posts from 2020 to present)...")
try:
    profile = instaloader.Profile.from_username(L.context, "abhinaya.uny")
    print(f"Profile: {profile.username}, Full Name: {profile.full_name}, Total Posts: {profile.mediacount}")
    
    count = 0
    for post in profile.get_posts():
        count += 1
        print(f"[{count}/{profile.mediacount}] Downloading post {post.shortcode} ({post.date_utc})...")
        L.download_post(post, target="abhinaya.uny")
        
    print(f"DONE! Successfully downloaded all {count} posts from @abhinaya.uny!")
except Exception as e:
    print(f"Error fetching from Instagram: {e}")
