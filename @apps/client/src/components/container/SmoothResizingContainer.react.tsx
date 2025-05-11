/** @jsxImportSource react */

import { cn } from '@libs/shadcn/lib/utils';
import { useEffect, useRef } from 'react';

/**
 * @jsx
 */
export interface SmoothResizingContainerProps {
  disabled?: boolean;
  direction?: 'vertical' | 'horizontal' | 'both';
  outerProps?: React.JSX.IntrinsicElements['div'];
  innerProps?: React.JSX.IntrinsicElements['div'];
  children?: React.ReactNode;
  calcHeight?: (rect: DOMRect) => number;
  calcWidth?: (rect: DOMRect) => number;
}

/**
 * @jsx
 */
export function SmoothResizingContainer({
  disabled = false,
  direction = 'both',
  outerProps = {},
  innerProps = {},
  children,
  calcHeight,
  calcWidth,
}: SmoothResizingContainerProps) {
  const outerElRef = useRef<HTMLDivElement>(null);
  const innerElRef = useRef<HTMLDivElement>(null);
  const isHorizontal = direction === 'both' || direction === 'horizontal';
  const isVertical = direction === 'both' || direction === 'vertical';

  useEffect(
    () =>
      observeResizeObserver(
        outerElRef,
        innerElRef,
        disabled,
        isHorizontal,
        isVertical,
        calcHeight,
        calcWidth,
      ),
    [disabled, isHorizontal, isVertical],
  );

  return (
    <div
      {...outerProps}
      ref={outerElRef}
      className={cn(
        'box-content size-full !p-0',
        isHorizontal ? 'overflow-x-auto' : null,
        isVertical ? 'overflow-y-auto' : null,
        !disabled
          ? 'transform-gpu transition-all duration-[320ms] ease-in-out'
          : null,
        outerProps.className,
      )}
    >
      <div
        {...innerProps}
        ref={innerElRef}
        className={cn(
          'flex flex-col',
          direction === 'horizontal' ? 'h-full' : 'h-fit',
          direction === 'vertical' ? 'w-full' : 'w-fit',
          innerProps.className,
        )}
      >
        {children}
      </div>
    </div>
  );
}

/**
 * @ignore
 */
function observeResizeObserver(
  outerElRef: React.RefObject<HTMLDivElement | null>,
  innerElRef: React.RefObject<HTMLDivElement | null>,
  disabled: boolean,
  isHorizontal: boolean,
  isVertical: boolean,
  calcHeight: (rect: DOMRect) => number = (rect) => rect.height,
  calcWidth: (rect: DOMRect) => number = (rect) => rect.width,
) {
  if (disabled) return;

  const innerEl = innerElRef.current;
  if (!innerEl || typeof ResizeObserver !== 'function') return;

  const resizeObserver = new ResizeObserver((entries) =>
    entries.forEach((entry) => {
      const outerEl = outerElRef.current;
      const innerEl = innerElRef.current;

      if (!outerEl || !innerEl) return;
      if (entry.target !== innerEl) return;

      const queuing =
        typeof requestAnimationFrame === 'function'
          ? requestAnimationFrame
          : setTimeout;

      queuing(() => {
        const rect = innerEl.getBoundingClientRect();
        if (isVertical) outerEl.style.height = `${calcHeight(rect)}px`; // 垂直の場合は縦を可変
        if (isHorizontal) outerEl.style.width = `${calcWidth(rect)}px`; // 水平の場合は横を可変
      });
    }),
  );

  resizeObserver.observe(innerEl);

  // eslint-disable-next-line jsdoc/require-jsdoc
  return () => resizeObserver.disconnect();
}
