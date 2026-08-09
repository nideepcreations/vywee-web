import type { BuyingGuide, CategoryId, GuideId, ProductId } from '@/types';

export const buyingGuides: readonly BuyingGuide[] = [
  {
    id: 'guide_anc_headphones' as GuideId,
    slug: 'how-to-choose-noise-cancelling-headphones',
    name: 'How to choose noise cancelling headphones',
    categoryId: 'cat_headphones' as CategoryId,
    excerpt:
      'Cancellation depth matters less than where it cancels. Here is what to check before you spend.',
    cover: {
      src: '/images/guides/anc-headphones.svg',
      alt: 'Illustration of over-ear headphones',
      width: 1600,
      height: 900,
    },
    author: 'Vywee Audio Desk',
    readingMinutes: 8,
    sections: [
      {
        heading: 'Cancellation depth is not the whole story',
        body: 'Most headphones cancel low rumble well. The difference between a good and a great pair shows up between 500 Hz and 1 kHz, which is where voices sit.',
      },
      {
        heading: 'Fit decides how much you actually get',
        body: 'A seal broken by glasses arms loses more cancellation than any processing can recover. Try before you commit, or buy where returns are easy.',
      },
      {
        heading: 'Battery claims assume cancellation is off',
        body: 'Read the number with cancellation on. That figure is usually 20 to 30 percent lower than the one on the box.',
      },
    ],
    recommendedProductIds: ['prod_sonova_arc_900' as ProductId, 'prod_sonova_clip_2' as ProductId],
    publishedAt: '2026-03-12T09:00:00.000Z',
    updatedAt: '2026-07-18T09:00:00.000Z',
  },
  {
    id: 'guide_phone_upgrade' as GuideId,
    slug: 'when-to-upgrade-your-phone',
    name: 'When it is worth upgrading your phone',
    categoryId: 'cat_smartphones' as CategoryId,
    excerpt: 'Four checks that tell you whether a new phone will fix your problem or just move it.',
    cover: {
      src: '/images/guides/phone-upgrade.svg',
      alt: 'Illustration of two smartphones side by side',
      width: 1600,
      height: 900,
    },
    author: 'Vywee Mobile Desk',
    readingMinutes: 6,
    sections: [
      {
        heading: 'Start with battery health, not speed',
        body: 'Most phones that feel slow are throttling to protect a worn battery. A replacement costs a fraction of an upgrade.',
      },
      {
        heading: 'Check the update window',
        body: 'A phone outside its security window is the one genuinely urgent reason to replace a device that still works.',
      },
      {
        heading: 'Match the camera to what you shoot',
        body: 'Sensor size beats megapixel count indoors. If most of your photos are taken after sunset, that is the spec to compare.',
      },
    ],
    recommendedProductIds: ['prod_lumen_edge_7' as ProductId, 'prod_lumen_edge_7_pro' as ProductId],
    publishedAt: '2026-02-02T09:00:00.000Z',
    updatedAt: '2026-07-22T09:00:00.000Z',
  },
  {
    id: 'guide_laptop_for_devs' as GuideId,
    slug: 'laptop-buying-guide-for-developers',
    name: 'A laptop buying guide for developers',
    categoryId: 'cat_laptops' as CategoryId,
    excerpt:
      'Sustained performance, thermals and memory headroom decide this — not peak benchmarks.',
    cover: {
      src: '/images/guides/developer-laptop.svg',
      alt: 'Illustration of a laptop with a code editor open',
      width: 1600,
      height: 900,
    },
    author: 'Vywee Computing Desk',
    readingMinutes: 10,
    sections: [
      {
        heading: 'Benchmarks lie about the second hour',
        body: 'A machine that scores well for 30 seconds can lose a third of its performance once the chassis heats up. Look for sustained-load numbers.',
      },
      {
        heading: 'Buy the memory you will need in year three',
        body: 'Memory is soldered on most thin laptops now, so it is the one spec you cannot fix later.',
      },
      {
        heading: 'Ports are a daily comfort',
        body: 'A machine that needs a dongle for an external display costs you time every single day.',
      },
    ],
    recommendedProductIds: [
      'prod_kestrel_air_14' as ProductId,
      'prod_kestrel_studio_16' as ProductId,
    ],
    publishedAt: '2026-01-20T09:00:00.000Z',
    updatedAt: '2026-07-11T09:00:00.000Z',
  },
  {
    id: 'guide_air_purifier' as GuideId,
    slug: 'air-purifier-buying-guide-india',
    name: 'Air purifiers: what the numbers actually mean',
    categoryId: 'cat_home_appliances' as CategoryId,
    excerpt: 'CADR, ACH and filter cost, explained for a normal-sized Indian bedroom.',
    cover: {
      src: '/images/guides/air-purifier.svg',
      alt: 'Illustration of an air purifier in a room',
      width: 1600,
      height: 900,
    },
    author: 'Vywee Home Desk',
    readingMinutes: 7,
    sections: [
      {
        heading: 'Size the purifier to the room, twice over',
        body: 'Aim for at least four air changes per hour in the room where you sleep. Manufacturer coverage figures usually assume two.',
      },
      {
        heading: 'Filters are the real price',
        body: 'Over five years, filters often cost more than the machine. Check replacement prices before you compare units.',
      },
      {
        heading: 'Noise decides whether you run it',
        body: 'A purifier you switch off at night is doing nothing. Anything above 30 dB on low will get turned down.',
      },
    ],
    recommendedProductIds: ['prod_havenhome_pure_300' as ProductId],
    publishedAt: '2026-05-04T09:00:00.000Z',
    updatedAt: '2026-07-25T09:00:00.000Z',
  },
  {
    id: 'guide_monitor_wfh' as GuideId,
    slug: 'monitor-guide-for-hybrid-desks',
    name: 'Picking a monitor for a hybrid desk',
    categoryId: 'cat_monitors' as CategoryId,
    excerpt: 'One cable, correct text rendering and a panel that does not need calibrating.',
    cover: {
      src: '/images/guides/monitor-desk.svg',
      alt: 'Illustration of a monitor on a desk',
      width: 1600,
      height: 900,
    },
    author: 'Vywee Computing Desk',
    readingMinutes: 6,
    sections: [
      {
        heading: 'Pixel density before resolution',
        body: 'A 27-inch 1440p panel and a 24-inch 1080p panel render text at roughly the same size. Density, not resolution, is what your eyes read.',
      },
      {
        heading: 'USB-C power delivery replaces a charger',
        body: 'Ninety watts is enough for most 14-inch laptops, which means one cable to dock and charge.',
      },
      {
        heading: 'Check the stand, not just the panel',
        body: 'Height adjustment is the difference between a comfortable desk and a stack of books.',
      },
    ],
    recommendedProductIds: ['prod_pixelforge_view_27' as ProductId],
    publishedAt: '2026-04-08T09:00:00.000Z',
    updatedAt: '2026-06-14T09:00:00.000Z',
  },
];

export const guideById = new Map(buyingGuides.map((guide) => [guide.id, guide]));
export const guideBySlug = new Map(buyingGuides.map((guide) => [guide.slug, guide]));
