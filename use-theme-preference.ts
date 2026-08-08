'use client';

import { useTheme } from 'next-themes';
import { useCallback, useMemo } from 'react';

import type { ResolvedTheme, ThemeMode } from '@/types/theme';

import { DEFAULT_THEME, THEME_MODES } from '@/app/providers';

import { useMounted } from './use-mounted';

interface ThemePreference {
  /** What the user chose, including `system`. */
  readonly mode: ThemeMode;
  /** What is actually painted right now. Null until mounted. */
  readonly resolved: ResolvedTheme | null;
  /** The OS preference, regardless of what the user chose. */
  readonly system: ResolvedTheme | null;
  /** False during SSR and the first client render. */
  readonly isReady: boolean;
  readonly setMode: (mode: ThemeMode) => void;
  /** Flips between light and dark, resolving `system` first. */
  readonly toggle: () => void;
  readonly modes: readonly ThemeMode[];
}

function isThemeMode(value: string | undefined): value is ThemeMode {
  return value !== undefined && (THEME_MODES as readonly string[]).includes(value);
}

function isResolvedTheme(value: string | undefined): value is ResolvedTheme {
  return value === 'light' || value === 'dark';
}

/**
 * Typed access to the theme.
 *
 * `next-themes` returns loose strings and reports `undefined` until the client
 * has mounted. This narrows both: components get a real union and an explicit
 * `isReady` flag instead of guessing, which is what prevents the hydration
 * mismatches that theme-aware UI is prone to.
 */
export function useThemePreference(): ThemePreference {
  const { theme, setTheme, resolvedTheme, systemTheme } = useTheme();
  const isReady = useMounted();

  const mode: ThemeMode = isReady && isThemeMode(theme) ? theme : DEFAULT_THEME;
  const resolved: ResolvedTheme | null =
    isReady && isResolvedTheme(resolvedTheme) ? resolvedTheme : null;
  const system: ResolvedTheme | null = isReady && isResolvedTheme(systemTheme) ? systemTheme : null;

  const setMode = useCallback(
    (next: ThemeMode) => {
      setTheme(next);
    },
    [setTheme],
  );

  const toggle = useCallback(() => {
    setTheme(resolved === 'dark' ? 'light' : 'dark');
  }, [resolved, setTheme]);

  return useMemo(
    () => ({ mode, resolved, system, isReady, setMode, toggle, modes: THEME_MODES }),
    [mode, resolved, system, isReady, setMode, toggle],
  );
}
