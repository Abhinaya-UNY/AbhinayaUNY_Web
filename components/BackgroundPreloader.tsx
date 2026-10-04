'use client';

import React, { useEffect } from 'react';

// Essential visual assets for sections below the fold
const ASSETS_TO_PRELOAD = [
  // High-priority banners & news images
  '/images/team_ums_2024_web.jpg',
  '/images/news/uny-kri-enam-juara-2023.jpg',
  '/images/news/uny-krtmi-juara-1-wilayah-2024.jpg',
  '/images/news/uny-krtmi-juara-2-nasional-2024.jpg',
  '/images/news/uny-krtmi-juara-pusat-2024.jpg',
  '/images/news/undip-unlimited-robot-finalist.jpg',
  '/images/news/uny-kri-lolos-nasional-2022.jpg',
  '/images/news/uny-kri-piala-nasional-2019.jpg',
  '/images/news/antara-kri-2024-video.jpg',
  // Key award photos
  '/gallery/unlimited_undip/undip_juara_1_robot_creative.webp',
  '/gallery/unlimited_undip/undip_stage_action_14.jpg',
  '/gallery/krtmi_podium_juara.jpg',
  '/gallery/krtmi_team_celebration.jpg',
  // First marquee row thumbnails (fast WebP)
  '/thumbnails/gallery/krtmi_podium_juara.webp',
  '/thumbnails/assets/team_podium_1.webp',
  '/thumbnails/gallery/krtmi_team_celebration.webp',
  '/thumbnails/images/news/uny-kri-piala-nasional-2019.webp',
  '/thumbnails/assets/team_podium_2.webp',
  '/thumbnails/assets/hero_team_stage.webp',
  '/thumbnails/gallery/unlimited_undip/undip_stage_action_01.webp',
  '/thumbnails/gallery/unlimited_undip/undip_stage_action_02.webp',
  '/thumbnails/gallery/unlimited_undip/undip_stage_action_03.webp',
  '/thumbnails/gallery/unlimited_undip/undip_stage_action_04.webp',
  '/thumbnails/gallery/unlimited_undip/undip_stage_action_05.webp',
];

export const BackgroundPreloader: React.FC = () => {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const basePath = process.env.NODE_ENV === 'production' ? '/AbhinayaUNY_Web' : '';

    const executePreload = () => {
      // Chunk preloading in requestIdleCallback or setTimeout so the main thread stays 100% idle
      const queue = [...ASSETS_TO_PRELOAD];

      const step = () => {
        if (!queue.length) return;
        // Batch 4 images at a time
        const batch = queue.splice(0, 4);
        batch.forEach((path) => {
          const img = new Image();
          img.decoding = 'async';
          img.src = `${basePath}${path}`;
        });

        if (queue.length > 0) {
          if ('requestIdleCallback' in window) {
            (window as any).requestIdleCallback(step, { timeout: 1000 });
          } else {
            setTimeout(step, 80);
          }
        }
      };

      if ('requestIdleCallback' in window) {
        (window as any).requestIdleCallback(step, { timeout: 1000 });
      } else {
        setTimeout(step, 150);
      }
    };

    // Preload triggers right after preloader dismiss, or fallback after 1.2s
    const handleDismiss = () => {
      executePreload();
    };

    window.addEventListener('abhinaya:preloader-dismiss', handleDismiss, { once: true });
    const timer = setTimeout(executePreload, 1200);

    return () => {
      window.removeEventListener('abhinaya:preloader-dismiss', handleDismiss);
      clearTimeout(timer);
    };
  }, []);

  return null;
};

export default BackgroundPreloader;
