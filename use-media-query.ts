'use client';

import { useEffect, useState } from 'react';

/**
 * Subscribes to a media query. Returns false during SSR and the first client
 * render so server and client markup match, then updates on mount.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);
    setMatches(mediaQueryList.matches);

    const onChange = (event: MediaQueryListEvent) => setMatches(event.matches);
    mediaQueryList.addEventListener('change', onChange);
    return () => mediaQueryList.removeEventListener('change', onChange);
  }, [query]);

  return matches;
}
