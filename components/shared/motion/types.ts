import type { HTMLAttributes } from 'react';

/**
 * Framer Motion redeclares the drag and animation event props with its own
 * signatures. Omitting them keeps our wrapper components assignable to both
 * plain elements and motion elements.
 */
export type MotionSafeProps<TElement extends HTMLElement> = Omit<
  HTMLAttributes<TElement>,
  | 'onAnimationStart'
  | 'onAnimationEnd'
  | 'onAnimationIteration'
  | 'onDrag'
  | 'onDragStart'
  | 'onDragEnd'
  | 'onDragEnter'
  | 'onDragExit'
  | 'onDragLeave'
  | 'onDragOver'
  | 'onDrop'
  | 'onTransitionEnd'
>;
