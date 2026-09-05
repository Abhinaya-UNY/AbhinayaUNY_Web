'use client';

import React, { useEffect } from 'react';
import Custom500Content from '../components/Custom500Content';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Global Root Error caught error:', error);
  }, [error]);

  return (
    <html lang="id">
      <body className="bg-[#030605] text-slate-100 antialiased">
        <Custom500Content reset={reset} />
      </body>
    </html>
  );
}
