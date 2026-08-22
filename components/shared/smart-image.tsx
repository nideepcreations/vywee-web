import Image, { type ImageProps } from 'next/image';
import * as React from 'react';

import type { ImageAsset } from '@/types';

import { cn } from '@/lib/utils';

interface SmartImageProps extends Omit<ImageProps, 'src' | 'alt' | 'width' | 'height'> {
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
        'relative overflow-hidden bg-muted',
        ASPECT_CLASS[aspect],
        containerClassName,
      )}
    >
      <Image
        src={asset.src}
        alt={asset.alt}
        width={asset.width}
        height={asset.height}
        sizes={sizes}
        priority={priority}
        loading={priority ? 'eager' : 'lazy'}
        placeholder={asset.blurDataURL ? 'blur' : 'empty'}
        blurDataURL={asset.blurDataURL}
        className={cn(
          'h-full w-[133.333%] max-w-none object-cover object-left',
          className,
        )}
        {...props}
      />
    </div>
  );
}

export { SmartImage };
