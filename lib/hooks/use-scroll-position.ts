'use client';

import { useEffect, useState } from 'react';

interface ScrollState {
  readonly y: number;
  readonly isScrolled: boolean;
  readonly direction: 'up' | 'down';
}

/**
 * Passive, rAF-throttled scroll state for sticky chrome.
 * `threshold` is the offset at which the header switches to its condensed look.
 */
export function useScrollPosition(threshold = 8): ScrollState {
  const [state, setState] = useState<ScrollState>({ y: 0, isScrolled: false, direction: 'up' });

  useEffect(() => {
    let previousY = window.scrollY;
    let frame = 0;

    const update = () => {
      const y = window.scrollY;
      setState({
        y,
        isScrolled: y > threshold,
        direction: y > previousY ? 'down' : 'up',
      });
      previousY = y;
      frame = 0;
    };

    const onScroll = () => {
      if (frame !== 0) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame !== 0) window.cancelAnimationFrame(frame);
    };
  }, [threshold]);

  return state;
}
