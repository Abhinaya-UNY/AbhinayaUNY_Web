import React from 'react';
import { Metadata } from 'next';
import Custom500Content from '@/components/Custom500Content';

export const metadata: Metadata = {
  title: '500 — Anomali Sistem Internal | Abhinaya UNY Robotics',
  description: 'Terjadi anomali pemrosesan data internal pada sistem telemetri Abhinaya UNY. Protokol failsafe aktif.',
};

export default function Page500() {
  return <Custom500Content />;
}
