import React from 'react';
import Head from 'next/head';
import Custom500Content from '../components/Custom500Content';

export default function Custom500() {
  return (
    <>
      <Head>
        <title>500 — Anomali Sistem Internal | Abhinaya UNY Robotics</title>
        <meta name="description" content="Terjadi anomali pemrosesan data internal pada sistem telemetri Abhinaya UNY. Protokol failsafe aktif." />
      </Head>
      <Custom500Content />
    </>
  );
}
