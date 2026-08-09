import type { Transition, Variants } from 'framer-motion';

import { DURATION, EASE, STAGGER_STEP } from '@/constants/animation';

const entrance: Transition = {
  duration: DURATION.slow,
  ease: EASE.entrance,
};

/**
 * Shared motion vocabulary. Components pick a variant rather than inventing
 * their own timings, which is what keeps the whole product feeling like one
 * piece of software.
 */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: entrance },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: entrance },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.97 },
  visible: { opacity: 1, scale: 1, transition: entrance },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: STAGGER_STEP, delayChildren: 0.04 },
  },
};

/** Default viewport config for scroll reveals: fire once, slightly early. */
export const revealViewport = { once: true, margin: '-64px 0px' } as const;
