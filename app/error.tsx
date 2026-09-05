'use client';

import React, { useEffect } from 'react';
import Custom500Content from '../components/Custom500Content';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Application Error Boundary caught error:', error);
  }, [error]);

  return <Custom500Content reset={reset} />;
}
