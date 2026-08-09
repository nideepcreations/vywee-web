import { cva, type VariantProps } from 'class-variance-authority';
import type { LucideIcon, LucideProps } from 'lucide-react';
import * as React from 'react';

import type { IconSizeToken } from '@/types/theme';

import { ICON_SIZE, ICON_STROKE_BY_SIZE, ICONS, type IconName } from '@/constants/icons';
import { cn } from '@/lib/utils';

const iconVariants = cva('shrink-0', {
  variants: {
    size: {
      xs: 'size-3.5',
      sm: 'size-4',
      md: 'size-5',
      lg: 'size-6',
      xl: 'size-8',
    },
    tone: {
      current: 'text-current',
      muted: 'text-muted-foreground',
      brand: 'text-brand',
      accent: 'text-accent',
      highlight: 'text-highlight-strong',
      success: 'text-success',
      warning: 'text-warning',
      danger: 'text-danger',
    },
  },
  defaultVariants: { size: 'md', tone: 'current' },
});

type IconVariants = VariantProps<typeof iconVariants>;

interface IconBaseProps extends Omit<LucideProps, 'ref' | 'size' | 'color'>, IconVariants {
  /**
   * Accessible name. Provide it only when the icon carries meaning on its own;
   * an icon that sits beside a visible text label must stay undecorated so
   * screen readers do not announce it twice.
   */
  label?: string;
}

interface IconByNameProps extends IconBaseProps {
  name: IconName;
  icon?: never;
}

interface IconByComponentProps extends IconBaseProps {
  /** Escape hatch for icons not in the registry, such as category glyphs. */
  icon: LucideIcon;
  name?: never;
}

export type IconProps = IconByNameProps | IconByComponentProps;

/**
 * The single way icons enter the UI.
 *
 * It fixes three things that otherwise drift: size (locked to the token
 * scale), optical stroke weight (corrected per size), and accessibility —
 * decorative by default, named only when asked.
 */
function Icon({ name, icon, size, tone, className, label, strokeWidth, ...props }: IconProps) {
  const Component: LucideIcon | undefined = icon ?? (name ? ICONS[name] : undefined);
  if (!Component) return null;

  const sizeToken: IconSizeToken = size ?? 'md';

  return (
    <Component
      className={cn(iconVariants({ size, tone }), className)}
      size={ICON_SIZE[sizeToken]}
      strokeWidth={strokeWidth ?? ICON_STROKE_BY_SIZE[sizeToken]}
      absoluteStrokeWidth
      aria-hidden={label ? undefined : true}
      role={label ? 'img' : undefined}
      aria-label={label}
      focusable="false"
      {...props}
    />
  );
}

export { Icon, iconVariants };
