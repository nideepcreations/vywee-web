import type { Brand, BrandId } from '@/types';

/**
 * Mock catalogue data. Shapes match the domain types exactly, so swapping in a
 * real data source later is a change of loader, not a change of components.
 */
export const brands: readonly Brand[] = [
  {
    id: 'brand_sonova' as BrandId,
    slug: 'sonova',
    name: 'Sonova',
    tagline: 'Studio-grade audio, priced for daily use',
    logoText: 'SN',
    originCountry: 'Japan',
    foundedYear: 1978,
    strongIn: ['headphones', 'speakers'],
    featured: true,
  },
  {
    id: 'brand_northloop' as BrandId,
    slug: 'northloop',
    name: 'Northloop',
    tagline: 'Outdoor-first wearables that survive the commute',
    logoText: 'NL',
    originCountry: 'Sweden',
    foundedYear: 2011,
    strongIn: ['wearables'],
    featured: true,
  },
  {
    id: 'brand_kestrel' as BrandId,
    slug: 'kestrel',
    name: 'Kestrel',
    tagline: 'Thin laptops that do not throttle',
    logoText: 'KS',
    originCountry: 'Taiwan',
    foundedYear: 1996,
    strongIn: ['laptops'],
    featured: true,
  },
  {
    id: 'brand_lumen' as BrandId,
    slug: 'lumen',
    name: 'Lumen',
    tagline: 'Displays and phones with honest colour',
    logoText: 'LM',
    originCountry: 'South Korea',
    foundedYear: 1989,
    strongIn: ['smartphones', 'monitors'],
    featured: true,
  },
  {
    id: 'brand_havenhome' as BrandId,
    slug: 'havenhome',
    name: 'Haven Home',
    tagline: 'Appliances built to be repaired, not replaced',
    logoText: 'HH',
    originCountry: 'Germany',
    foundedYear: 1964,
    strongIn: ['home-appliances'],
    featured: false,
  },
  {
    id: 'brand_pixelforge' as BrandId,
    slug: 'pixelforge',
    name: 'Pixelforge',
    tagline: 'Gaming gear without the gamer tax',
    logoText: 'PF',
    originCountry: 'United States',
    foundedYear: 2014,
    strongIn: ['gaming', 'monitors'],
    featured: false,
  },
  {
    id: 'brand_teabreak' as BrandId,
    slug: 'teabreak',
    name: 'Teabreak',
    tagline: 'Small kitchen appliances for small kitchens',
    logoText: 'TB',
    originCountry: 'India',
    foundedYear: 2018,
    strongIn: ['home-appliances'],
    featured: false,
  },
  {
    id: 'brand_orbital' as BrandId,
    slug: 'orbital',
    name: 'Orbital',
    tagline: 'Charging and cables that stop failing at month four',
    logoText: 'OR',
    originCountry: 'China',
    foundedYear: 2016,
    strongIn: ['accessories'],
    featured: false,
  },
];

export const brandById = new Map(brands.map((brand) => [brand.id, brand]));
export const brandBySlug = new Map(brands.map((brand) => [brand.slug, brand]));
