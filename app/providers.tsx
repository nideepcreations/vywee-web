'use client';

import { ThemeProvider } from 'next-themes';
import * as React from 'react';

import type { ThemeMode } from '@/types/theme';

/** Persisted under this key so the choice survives reloads and tabs. */
export const THEME_STORAGE_KEY = 'vywee-theme';

export const DEFAULT_THEME: ThemeMode = 'system';

/** Kept in sync with `ThemeMode`; passed to next-themes for validation. */
export const THEME_MODES: readonly ThemeMode[] = ['light', 'dark', 'system'];

/**
 * Single client boundary for app-wide context. Anything that needs state on
 * the client mounts here, which keeps the rest of the tree server-rendered.
 *
 * `attribute="class"` drives the `.dark` block in styles/tokens.css, and
 * next-themes inlines a blocking script that sets the class before first
 * paint — so there is no flash of the wrong theme.
 */
function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme={DEFAULT_THEME}
      themes={[...THEME_MODES]}
      enableSystem
      enableColorScheme
      disableTransitionOnChange
      storageKey={THEME_STORAGE_KEY}
    >
      {children}
    </ThemeProvider>
  );
}

export { Providers };
