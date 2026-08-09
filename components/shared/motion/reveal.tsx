'use client';

import { motion, type Variants } from 'framer-motion';
import * as React from 'react';

import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion';
import { fadeUp, revealViewport } from '@/lib/motion';

import type { MotionSafeProps } from './types';

type RevealElement = 'div' | 'section' | 'li' | 'article';

interface RevealProps extends MotionSafeProps<HTMLElement> {
  variants?: Variants;
  delay?: number;
  as?: RevealElement;
}

/**
 * Scroll-triggered entrance. When a visitor prefers reduced motion this renders
 * plain markup with no transform at all, rather than a faster animation.
 */
function Reveal({ variants = fadeUp, delay = 0, as = 'div', children, ...props }: RevealProps) {
  const reducedMotion = usePrefersReducedMotion();

  if (reducedMotion) {
    const Plain = as as React.ElementType;
    return <Plain {...props}>{children}</Plain>;
  }

  const Animated = motion[as] as React.ElementType;

  return (
    <Animated
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
      variants={variants}
      transition={{ delay }}
      {...props}
    >
      {children}
    </Animated>
  );
}

export { Reveal };
