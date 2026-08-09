'use client';

import { useEffect, useState } from 'react';

/** Guards client-only reads (theme, storage, viewport) against hydration mismatch. */
export function useMounted(): boolean {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
}
