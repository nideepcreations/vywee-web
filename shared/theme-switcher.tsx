'use client';

import * as React from 'react';

import type { ThemeMode } from '@/types/theme';

import { Icon } from '@/components/ui/icon';
import { useThemePreference } from '@/hooks/use-theme-preference';
import { cn } from '@/lib/utils';

import { THEME_META } from './theme-toggle';

/**
 * Three-option theme control for settings surfaces, where the cycling toggle
 * hides which options exist.
 *
 * Built as a radio group rather than buttons: arrow keys move between options,
 * only the selected option is in the tab order, and the current choice is
 * announced as checked instead of being signalled by background colour alone.
 */
function ThemeSwitcher({ className }: { className?: string }) {
  const { mode, isReady, setMode, modes } = useThemePreference();
  const current = isReady ? mode : 'system';

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const forward = event.key === 'ArrowRight' || event.key === 'ArrowDown';
    const back = event.key === 'ArrowLeft' || event.key === 'ArrowUp';
    if (!forward && !back) return;

    event.preventDefault();
    const index = modes.indexOf(current);
    const nextIndex = (index + (forward ? 1 : -1) + modes.length) % modes.length;
    const next = modes[nextIndex];
    if (next) setMode(next);
  };

  return (
    <div
      role="radiogroup"
      aria-label="Colour theme"
      onKeyDown={handleKeyDown}
      className={cn(
        'inline-flex items-center gap-1 rounded-pill border border-border bg-surface p-1',
        className,
      )}
    >
      {modes.map((value: ThemeMode) => {
        const meta = THEME_META[value];
        const selected = value === current;

        return (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={selected}
            tabIndex={selected ? 0 : -1}
            onClick={() => setMode(value)}
            className={cn(
              'inline-flex items-center gap-1.5 rounded-pill px-3 py-1.5 text-sm font-medium',
              'transition-colors duration-fast ease-standard',
              'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
              selected
                ? 'bg-brand text-brand-foreground'
                : 'text-muted-foreground hover:bg-muted-hover hover:text-foreground',
            )}
          >
            <Icon name={meta.icon} size="sm" />
            {meta.label}
          </button>
        );
      })}
    </div>
  );
}

export { ThemeSwitcher };
