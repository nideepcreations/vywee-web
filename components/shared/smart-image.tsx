import Image, { type ImageProps } from 'next/image';
import * as React from 'react';

import type { ImageAsset } from '@/types';

import { cn } from '@/lib/utils';

interface SmartImageProps
  extends Omit<ImageProps, 'src' | 'alt' | 'width' | 'height' | 'fill'> {
  asset: ImageAsset;
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
        'relative w-full overflow-hidden bg-muted',
        ASPECT_CLASS[aspect],
        containerClassName,
      )}
    >
      <div className="absolute inset-4 overflow-hidden rounded-sm">
        <Image
          src={asset.src}
          alt={asset.alt}
          fill
          sizes={sizes}
          priority={priority}
          loading={priority ? 'eager' : 'lazy'}
          placeholder={asset.blurDataURL ? 'blur' : 'empty'}
          blurDataURL={asset.blurDataURL}
          className={cn('object-contain object-center', className)}
          {...props}
        />
      </div>
    </div>
  );
}

export { SmartImage };
