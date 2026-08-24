import Image, { type ImageProps } from 'next/image';
import * as React from 'react';

import type { ImageAsset } from '@/types';

import { cn } from '@/lib/utils';

interface SmartImageProps
  extends Omit<ImageProps, 'src' | 'alt' | 'width' | 'height' | 'fill'> {
  asset: ImageAsset;
  /** Only the largest above-the-fold image on a route should set this. */
  priority?: boolean;
  className?: string;
  containerClassName?: string;
  aspect?: 'square' | '4/3' | '16/9' | 'auto';
}

const ASPECT_CLASS = {
  square: 'aspect-square',
  '4/3': 'aspect-[4/3]',
  '16/9': 'aspect-video',
  auto: '',
} as const;

/**
 * Responsive product image wrapper.
 *
 * The image uses Next/Image fill mode so it always occupies the complete
 * image container. The container owns the aspect ratio and clipping.
 */
function SmartImage({
  asset,
  priority = false,
  className,
  containerClassName,
  aspect = '4/3',
  sizes = '(min-width: 1280px) 320px, (min-width: 1024px) 31vw, (min-width: 640px) 46vw, 92vw',
  ...props
}: SmartImageProps) {
  return (
    <div
      className={cn(
        'relative w-full overflow-hidden bg-muted',
        ASPECT_CLASS[aspect],
        containerClassName,
      )}
    >
      <Image
        src={asset.src}
        alt={asset.alt}
        fill
        sizes={sizes}
        priority={priority}
        loading={priority ? 'eager' : 'lazy'}
        placeholder={asset.blurDataURL ? 'blur' : 'empty'}
        blurDataURL={asset.blurDataURL}
        className={cn('object-cover object-center', className)}
        {...props}
      />
    </div>
  );
}

export { SmartImage };
