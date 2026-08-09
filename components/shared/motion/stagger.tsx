'use client';

import { motion } from 'framer-motion';
import * as React from 'react';

import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion';
import { fadeUp, revealViewport, staggerContainer } from '@/lib/motion';

import type { MotionSafeProps } from './types';

interface StaggerProps extends MotionSafeProps<HTMLElement> {
  as?: 'div' | 'ul' | 'ol';
}

/** Parent for list reveals. Pair with `StaggerItem` for each child. */
function Stagger({ as = 'div', children, ...props }: StaggerProps) {
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
      variants={staggerContainer}
      {...props}
    >
      {children}
    </Animated>
  );
}

interface StaggerItemProps extends MotionSafeProps<HTMLElement> {
  as?: 'div' | 'li' | 'article';
}

function StaggerItem({ as = 'div', children, ...props }: StaggerItemProps) {
  const reducedMotion = usePrefersReducedMotion();

  if (reducedMotion) {
    const Plain = as as React.ElementType;
    return <Plain {...props}>{children}</Plain>;
  }

  const Animated = motion[as] as React.ElementType;

  return (
    <Animated variants={fadeUp} {...props}>
      {children}
    </Animated>
  );
}

export { Stagger, StaggerItem };
