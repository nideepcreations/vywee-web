'use client';

import { useTheme } from 'next-themes';
import { useCallback } from 'react';

import {
  DEFAULT_THEME,
  getNextTheme,
  getThemeOption,
  isTheme,
  type ResolvedTheme,
  type Theme,
} from '@/lib/theme';

import { useMounted } from './use-mounted';

interface AppTheme {
  /** The chosen preference, which may be `system`. */
  readonly theme: Theme;
  /** What `system` resolved to. Undefined until mounted. */
  readonly resolvedTheme: ResolvedTheme | undefined;
  readonly isDark: boolean;
  /** False during SSR and the first client render. Gate any theme-dependent output on this. */
  readonly isReady: boolean;
  readonly label: string;
  readonly setTheme: (theme: Theme) => void;
  /** Advances light → dark → system. */
  readonly cycleTheme: () => void;
}

/**
 * Typed wrapper over next-themes. It exists so components never handle the
 * library's loose `string | undefined` values or repeat the mount guard that
 * keeps server and client markup identical.
 */
export function useAppTheme(): AppTheme {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const isReady = useMounted();

  const current: Theme = isReady && isTheme(theme) ? theme : DEFAULT_THEME;
  const resolved: ResolvedTheme | undefined =
    isReady && (resolvedTheme === 'light' || resolvedTheme === 'dark') ? resolvedTheme : undefined;

  const cycleTheme = useCallback(() => {
    setTheme(getNextTheme(isTheme(theme) ? theme : DEFAULT_THEME));
  }, [setTheme, theme]);

  const setTypedTheme = useCallback((next: Theme) => setTheme(next), [setTheme]);

  return {
    theme: current,
    resolvedTheme: resolved,
    isDark: resolved === 'dark',
    isReady,
    label: getThemeOption(current).label,
    setTheme: setTypedTheme,
    cycleTheme,
  };
}
