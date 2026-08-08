/**
 * Theme contract. Everything that needs to know about themes — the provider,
 * the toggle, the typed hook — reads from here, so adding a theme is a change
 * to this file plus one block of semantic overrides in styles/tokens.css.
 */

/** Themes a person can choose. `system` defers to the OS preference. */
export const THEMES = ['light', 'dark', 'system'] as const;

export type Theme = (typeof THEMES)[number];

/** What `system` actually resolves to once the OS has been consulted. */
export type ResolvedTheme = Extract<Theme, 'light' | 'dark'>;

export const DEFAULT_THEME: Theme = 'system';

export const THEME_STORAGE_KEY = 'vywee-theme';

/** The class next-themes writes onto `<html>`; `.dark` is styled in tokens.css. */
export const THEME_ATTRIBUTE = 'class';

interface ThemeDescriptor {
  readonly value: Theme;
  /** Shown in the UI. Sentence case, no trailing punctuation. */
  readonly label: string;
  /** Announced to screen readers as the result of choosing this option. */
  readonly description: string;
}

export const THEME_OPTIONS: readonly ThemeDescriptor[] = [
  { value: 'light', label: 'Light', description: 'Always use the light theme' },
  { value: 'dark', label: 'Dark', description: 'Always use the dark theme' },
  { value: 'system', label: 'System', description: 'Match your device setting' },
];

const THEME_SET: ReadonlySet<string> = new Set(THEMES);

export function isTheme(value: unknown): value is Theme {
  return typeof value === 'string' && THEME_SET.has(value);
}

export function getThemeOption(theme: Theme): ThemeDescriptor {
  return THEME_OPTIONS.find((option) => option.value === theme) ?? THEME_OPTIONS[2]!;
}

/** Order used by the cycling toggle: light → dark → system → light. */
export function getNextTheme(theme: Theme): Theme {
  const index = THEMES.indexOf(theme);
  return THEMES[(index + 1) % THEMES.length] ?? DEFAULT_THEME;
}
