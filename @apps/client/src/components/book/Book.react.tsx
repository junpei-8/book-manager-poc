/** @jsxImportSource react */

import { cn } from '@libs/shadcn/lib/utils';
import React, { useLayoutEffect, useState } from 'react';
import { SkeletonOverlay } from '../skeleton/SkeletonOverlay.react';

/**
 * @jsx
 */
export function Book({
  className,
  name,
  link,
  image,
  scalable,
  skeleton,
  fallback,
  children,
  ...props
}: {
  className?: string;
  name?: string | null;
  link?: string | null;
  image?: string | null;
  scalable?: boolean;
  skeleton?: boolean;
  fallback?: React.ReactNode | boolean;
  children?: React.ReactNode;
} & React.JSX.IntrinsicElements['div' | 'a']) {
  const [hasLoadedImage, setHasLoadedImage] = useState(false);
  const [hasLoadedError, setHasLoadedError] = useState(false);
  const shouldDisplayImage = image !== undefined && !hasLoadedError;
  const shouldDisplayFallback = fallback && hasLoadedError;
  const shouldDisplaySkeleton = !hasLoadedImage && !shouldDisplayFallback;

  useLayoutEffect(() => {
    if (image === null) {
      setHasLoadedImage(true);
      setHasLoadedError(true);
    } else {
      setHasLoadedImage(false);
      setHasLoadedError(false);
    }
  }, [image]);

  const ContainerTag = link ? 'a' : 'div';
  return (
    <ContainerTag
      {...(props as any)}
      className={cn(
        'relative block aspect-[1/1.41] size-full max-h-full max-w-full overflow-visible rounded-l-sm rounded-r-md bg-muted text-muted-foreground',
        scalable !== false
          ? 'cursor-pointer transition-[scale] active:scale-[98%] [html[data-os-type$=pc]_&]:hover:scale-[102%] [html[data-os-type$=pc]_&]:active:scale-none'
          : null,
        className,
      )}
    >
      {shouldDisplayImage ? (
        image ? (
          <div className="overflow-hidden">
            <img
              className="absolute inset-0 h-full w-full object-cover"
              src={image}
              alt={name === null ? void 0 : name}
              onLoad={() => setHasLoadedImage(true)}
              onError={() => setHasLoadedError(true)}
            />
          </div>
        ) : null
      ) : null}

      {shouldDisplayFallback ? (
        fallback === true ? (
          <div className="flex size-full items-center justify-center p-2 md:p-4">
            <div className="text line-clamp-3 text-center text-sm font-bold text-muted-foreground md:text-base">
              {name}
            </div>
          </div>
        ) : (
          fallback
        )
      ) : null}

      {children}

      {skeleton !== false ? (
        <SkeletonOverlay hidden={!shouldDisplaySkeleton} />
      ) : null}
    </ContainerTag>
  );
}
