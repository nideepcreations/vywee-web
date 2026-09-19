import { Headphones, Laptop, Percent, Smartphone, Sparkles, Watch } from 'lucide-react';

import type { LinkItem, NavGroup } from '@/types';

import { ROUTES } from './routes';

/** Primary header navigation. Keep this to six items or fewer. */
export const PRIMARY_NAV: readonly LinkItem[] = [
  { label: 'Categories', href: ROUTES.categories },
  { label: 'Buying guides', href: ROUTES.guides },
  { label: 'Brands', href: ROUTES.brands },
  { label: 'Offers', href: ROUTES.offers },
];

/** Shown inside the mobile drawer as quick jumps. */
export const QUICK_LINKS: readonly LinkItem[] = [
  { label: 'Headphones', href: ROUTES.category('headphones'), icon: Headphones },
  { label: 'Phones', href: ROUTES.category('smartphones'), icon: Smartphone },
  { label: 'Laptops', href: ROUTES.category('laptops'), icon: Laptop },
  { label: 'Wearables', href: ROUTES.category('wearables'), icon: Watch },
  { label: "Editors' picks", href: ROUTES.products, icon: Sparkles },
  { label: 'Live offers', href: ROUTES.offers, icon: Percent },
];

export const FOOTER_NAV: readonly NavGroup[] = [
  {
    title: 'Explore',
    items: [
      { label: 'All categories', href: ROUTES.categories },
      { label: 'Buying guides', href: ROUTES.guides },
      { label: 'Brands', href: ROUTES.brands },
      { label: 'Live offers', href: ROUTES.offers },
    ],
  },
  {
    title: 'Company',
    items: [
      { label: 'About Vywee', href: ROUTES.about },
      { label: 'Contact', href: ROUTES.contact },
    ],
  },
  {
    title: 'Legal',
    items: [
      { label: 'Privacy', href: ROUTES.privacy },
      { label: 'Terms', href: ROUTES.terms },
      { label: 'Affiliate disclosure', href: ROUTES.affiliateDisclosure },
    ],
  },
];
