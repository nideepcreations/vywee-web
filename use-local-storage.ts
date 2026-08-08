'use client';

import { useCallback, useEffect, useState } from 'react';

/**
 * Persisted state that degrades gracefully: if storage is unavailable
 * (private mode, blocked cookies) the value simply stays in memory.
 */
export function useLocalStorage<TValue>(
  key: string,
  initialValue: TValue,
): [TValue, (value: TValue) => void] {
  const [value, setValue] = useState<TValue>(initialValue);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(key);
      if (stored !== null) setValue(JSON.parse(stored) as TValue);
    } catch {
      setValue(initialValue);
    }
    // Reading once on mount is intentional: later writes go through `update`.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const update = useCallback(
    (next: TValue) => {
      setValue(next);
      try {
        window.localStorage.setItem(key, JSON.stringify(next));
      } catch {
        // Storage is unavailable; in-memory state is the acceptable fallback.
      }
    },
    [key],
  );

  return [value, update];
}
