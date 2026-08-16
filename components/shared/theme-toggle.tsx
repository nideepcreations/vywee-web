'use client';

import * as React from 'react';

import type { ThemeMode } from '@/types/theme';

import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { type IconName } from '@/constants/icons';
import { useThemePreference } from '@/hooks/use-theme-preference';
import { cn } from '@/lib/utils';

export const THEME_META: Record<ThemeMode, { label: string; icon: IconName }> = {
  light: { label: 'Light', icon: 'themeLight' },
  dark: { label: 'Dark', icon: 'themeDark' },
  system: { label: 'System', icon: 'themeSystem' },
};

const ORDER: readonly ThemeMode[] = ['light', 'dark', 'system'];

/**
 * Cycles light → dark → system.
 *
 * Before mount the icon is fixed to `system`, so server and client markup
 * agree. The accessible name states the current mode and what pressing it
 * will do, which is the part a colour-only toggle leaves out.
 */
function ThemeToggle({ className }: { className?: string }) {
  const { mode, isReady, setMode } = useThemePreference();

  const current = isReady ? mode : 'system';
  const next = ORDER[(ORDER.indexOf(current) + 1) % ORDER.length] ?? 'system';

  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn('tap-target text-muted-foreground hover:text-foreground', className)}
      onClick={() => setMode(next)}
      aria-label={`Theme: ${THEME_META[current].label}. Switch to ${THEME_META[next].label}.`}
    >
      <Icon name={THEME_META[current].icon} size="md" />
    </Button>
  );
}

export { ThemeToggle };
