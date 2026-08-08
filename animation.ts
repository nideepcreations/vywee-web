import type { DurationToken, EasingToken } from '@/types/theme';

import { DURATION_MS } from './design-tokens';

/**
 * Framer Motion values, derived from the same tokens the CSS uses so the two
 * animation systems cannot drift apart. Motion takes seconds; CSS takes ms.
 */
export const DURATION = {
  instant: DURATION_MS.instant / 1000,
  fast: DURATION_MS.fast / 1000,
  base: DURATION_MS.base / 1000,
  slow: DURATION_MS.slow / 1000,
  slower: DURATION_MS.slower / 1000,
} as const satisfies Record<DurationToken, number>;

/** Bezier control points matching the `--vy-ease-*` tokens. */
export const EASE = {
  standard: [0.2, 0, 0, 1],
  entrance: [0.16, 1, 0.3, 1],
  exit: [0.4, 0, 1, 1],
} as const satisfies Partial<Record<EasingToken, readonly number[]>>;

export const SPRING = {
  soft: { type: 'spring', stiffness: 220, damping: 30, mass: 0.9 },
  snappy: { type: 'spring', stiffness: 420, damping: 34, mass: 0.7 },
} as const;

/** Stagger step for list reveals. Anything slower starts to feel sluggish. */
export const STAGGER_STEP = 0.06;

/**
 * Motion policy: which durations are acceptable for which kind of change.
 * Anything longer than `slow` on an interaction feels unresponsive.
 */
export const MOTION_ROLE = {
  /** Hover, focus, colour and border changes. */
  stateChange: 'fast',
  /** Elements entering or leaving the viewport. */
  reveal: 'slow',
  /** Overlays, drawers and popovers. */
  overlay: 'base',
  /** Layout shifts and expanding regions. */
  layout: 'base',
} as const satisfies Record<string, DurationToken>;
