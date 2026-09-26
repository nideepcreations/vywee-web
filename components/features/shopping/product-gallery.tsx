'use client';

import * as React from 'react';

import { SmartImage } from '@/components/shared/smart-image';
import type { ImageAsset } from '@/types';
import { cn } from '@/lib/utils';

/**
 * Product images: one large frame with the other views under it.
 *
 * A single photo is enough to recognise a product in a list, but not to
 * decide on one — the back, the fabric close-up and the fit shot are what
 * someone actually looks at before buying. So this renders on the product
 * page only, and falls back to plain `SmartImage` when a product has just
 * the one view, rather than showing a thumbnail strip of length one.
 *
 * A client component because switching frames is local state; the images
 * themselves are still served and optimised by `next/image`.
 */

export interface ProductGalleryProps {
  /** The representative shot; always the first frame. */
  primary: ImageAsset;
  /** Further views, in the retailer's own order. */
  gallery?: readonly ImageAsset[];
  className?: string;
}

function ProductGallery({ primary, gallery, className }: ProductGalleryProps) {
  const frames = React.useMemo(() => [primary, ...(gallery ?? [])], [primary, gallery]);
  const [active, setActive] = React.useState(0);

  const current = frames[active] ?? primary;

  if (frames.length === 1) {
    return (
      <SmartImage
        asset={primary}
        aspect="4/3"
        priority
        sizes="(min-width: 1024px) 560px, 100vw"
        containerClassName={cn('rounded-xl border border-border', className)}
      />
    );
  }

  return (
    <div className={cn('flex flex-col gap-3', className)}>
      <SmartImage
        asset={current}
        aspect="4/3"
        priority
        sizes="(min-width: 1024px) 560px, 100vw"
        containerClassName="rounded-xl border border-border"
      />

      {/* Scrolls rather than wraps: a second row of thumbnails would push the
          price and verdict below the fold on a phone. */}
      <ul className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
        {frames.map((frame, index) => {
          const isActive = index === active;
          return (
            <li key={frame.src} className="shrink-0">
              <button
                type="button"
                onClick={() => setActive(index)}
                aria-label={`View image ${index + 1} of ${frames.length}`}
                aria-current={isActive || undefined}
                className={cn(
                  'block overflow-hidden rounded-lg border-2 transition-colors duration-fast ease-standard',
                  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
                  isActive ? 'border-brand' : 'border-border hover:border-input-hover',
                )}
              >
                <SmartImage
                  asset={{ ...frame, alt: '' }}
                  aspect="square"
                  sizes="72px"
                  containerClassName="w-16 sm:w-[72px]"
                />
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export { ProductGallery };
