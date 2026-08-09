import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Bookmark,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  CircleAlert,
  CircleCheck,
  ExternalLink,
  Filter,
  Heart,
  Info,
  Loader2,
  Menu,
  Minus,
  Monitor,
  Moon,
  Percent,
  Plus,
  RotateCw,
  Scale,
  ScanSearch,
  Search,
  Share2,
  SlidersHorizontal,
  Sparkles,
  Star,
  Sun,
  TrendingUp,
  Tag,
  TrendingDown,
  TriangleAlert,
  X,
  type LucideIcon,
} from 'lucide-react';

import type { IconSizeToken } from '@/types/theme';

/**
 * Icon sizes, aligned to the type scale so an icon set beside text at a given
 * size optically matches it. Values are px because Lucide renders an SVG with
 * explicit width and height.
 */
export const ICON_SIZE = {
  xs: 14,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
} as const satisfies Record<IconSizeToken, number>;

/**
 * One stroke width across the product. Lucide ships 2 by default, which reads
 * heavy next to Instrument Sans at body size; 1.75 sits correctly against it.
 */
export const ICON_STROKE_WIDTH = 1.75;

/**
 * Stroke does not scale with the icon by default, so large icons look thin and
 * small icons look clogged. These per-size corrections keep the optical weight
 * even across the scale.
 */
export const ICON_STROKE_BY_SIZE = {
  xs: 2,
  sm: 1.9,
  md: ICON_STROKE_WIDTH,
  lg: 1.6,
  xl: 1.4,
} as const satisfies Record<IconSizeToken, number>;

/**
 * Semantic icon registry.
 *
 * Feature code refers to an intent (`ICONS.priceDrop`) rather than importing a
 * Lucide name directly. Swapping the icon set, or changing which glyph means
 * "price drop", becomes a change in this file alone — and every meaning stays
 * consistent across the product.
 */
export const ICONS = {
  // Navigation
  menu: Menu,
  close: X,
  back: ArrowLeft,
  forward: ArrowRight,
  chevronUp: ChevronUp,
  chevronDown: ChevronDown,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  externalLink: ExternalLink,
  goTo: ArrowUpRight,

  // Discovery
  search: Search,
  filter: Filter,
  sort: SlidersHorizontal,
  category: Tag,

  // Verdict and rating
  rating: Star,
  editorsPick: Sparkles,
  verified: BadgeCheck,
  pro: Check,
  con: Minus,

  // Research and trust
  research: ScanSearch,
  compare: Scale,
  trending: TrendingUp,

  // Commerce
  deal: Percent,
  priceDrop: TrendingDown,
  save: Bookmark,
  favourite: Heart,
  share: Share2,

  // Feedback
  loading: Loader2,
  success: CircleCheck,
  info: Info,
  warning: TriangleAlert,
  error: CircleAlert,
  alert: AlertCircle,
  retry: RotateCw,

  // Theme
  themeLight: Sun,
  themeDark: Moon,
  themeSystem: Monitor,

  // Generic
  add: Plus,
  remove: Minus,
} as const satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof ICONS;

/** Every registered icon name, for iteration in tooling and tests. */
export const ICON_NAMES = Object.keys(ICONS) as readonly IconName[];
