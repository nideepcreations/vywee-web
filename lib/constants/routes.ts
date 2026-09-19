/**
 * Every internal path is built here. Nothing in the app hardcodes a URL string,
 * so a route rename is a one-file change.
 */
export const ROUTES = {
  home: '/',
  categories: '/categories',
  category: (slug: string) => `/categories/${slug}`,
  search: '/search',
  searchQuery: (query: string) => `/search?q=${encodeURIComponent(query)}`,
  products: '/products',
  product: (slug: string) => `/products/${slug}`,
  brands: '/brands',
  brand: (slug: string) => `/brands/${slug}`,
  guides: '/guides',
  guide: (slug: string) => `/guides/${slug}`,
  offers: '/offers',
  about: '/about',
  contact: '/contact',
  privacy: '/legal/privacy',
  terms: '/legal/terms',
  affiliateDisclosure: '/legal/affiliate-disclosure',
} as const;

export type AppRoute = typeof ROUTES;
