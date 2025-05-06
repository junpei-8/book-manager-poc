/** @jsxImportSource react */

import { cn } from '@libs/shadcn/lib/utils';
import { useEffect, useRef } from 'react';

/**
 * @jsx
 */
export function RichScrollableContainer({
  className,
  direction = 'horizontal',
  passiveMouseScroll = true,
  captureMouseScroll = false,
  disableMouseScroll = false,
  disableScrollbarHidden = false,
  ...props
}: React.JSX.IntrinsicElements['div'] & {
  direction?: 'horizontal' | 'vertical' | 'both';
  passiveMouseScroll?: boolean;
  captureMouseScroll?: boolean;
  disableMouseScroll?: boolean;
  disableScrollbarHidden?: boolean;
}) {
  const elementRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<DragState>({
    isDragging: false,
    startX: 0,
    startY: 0,
    scrollLeft: 0,
    scrollTop: 0,
  });

  const isBothDirection = direction === 'both';
  const isHorizontalDirection = isBothDirection || direction === 'horizontal';
  const isVerticalDirection = isBothDirection || direction === 'vertical';

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    if (disableMouseScroll) return;
    if (!isEnabledMouseScroll()) return;

    const drag = dragRef.current;

    // eslint-disable-next-line func-style
    const onMouseDownWrapper = (event: PointerEvent) =>
      onMouseDown(event, element, drag, {
        isHorizontalDirection,
        isVerticalDirection,
        passiveMouseScroll,
        captureMouseScroll,
      });

    element.addEventListener('pointerdown', onMouseDownWrapper, {
      passive: passiveMouseScroll,
      capture: captureMouseScroll,
    });

    // eslint-disable-next-line jsdoc/require-jsdoc
    return () =>
      element.removeEventListener('pointerdown', onMouseDownWrapper, {
        capture: captureMouseScroll,
      });
  }, [
    disableMouseScroll,
    isHorizontalDirection,
    isVerticalDirection,
    passiveMouseScroll,
    captureMouseScroll,
  ]);

  return (
    <div
      ref={elementRef}
      className={cn(
        'flex',
        isHorizontalDirection
          ? 'touch-pan-x overflow-x-auto mask-fade-x-4 sm:mask-fade-x-6'
          : null,
        isVerticalDirection
          ? 'touch-pan-y flex-col overflow-y-auto mask-fade-y-4 sm:mask-fade-y-6'
          : null,
        disableScrollbarHidden ? null : 'scrollbar-hidden !cursor-default',
        className,
      )}
      {...props}
    />
  );
}

/** @ignore */
function isEnabledMouseScroll() {
  const env = window.__ENV__;

  if (env.app) {
    return env.app.osType === 'pc';
  } else if (env.browser) {
    return env.browser.osType === 'pc';
  }

  return false;
}

/** @ignore */
type DragState = {
  isDragging: boolean;
  startX: number;
  startY: number;
  scrollLeft: number;
  scrollTop: number;
};

/** @ignore */
type MouseOptions = {
  isHorizontalDirection: boolean;
  isVerticalDirection: boolean;
  passiveMouseScroll: boolean;
  captureMouseScroll: boolean;
};

/** @ignore */
function onMouseDown(
  event: PointerEvent,
  element: HTMLElement,
  drag: DragState,
  options: MouseOptions,
) {
  if (event.pointerType !== 'mouse') return;
  event.stopPropagation();

  drag.isDragging = true;
  drag.startX = event.pageX;
  drag.startY = event.pageY;
  drag.scrollLeft = element.scrollLeft;
  drag.scrollTop = element.scrollTop;
  element.style.cursor = 'grabbing';

  /* eslint-disable func-style */
  const moveHandler = (event: PointerEvent) =>
    onMouseMove(event, element, drag, options);
  const upHandler = (event: PointerEvent) =>
    onMouseUp(event, element, drag, moveHandler, upHandler, options);
  /* eslint-enable func-style */

  window.addEventListener('pointermove', moveHandler, {
    passive: options.passiveMouseScroll,
    capture: options.captureMouseScroll,
  });
  window.addEventListener('pointerup', upHandler, {
    capture: options.captureMouseScroll,
  });
}

/** @ignore */
function onMouseMove(
  event: PointerEvent,
  element: HTMLElement,
  drag: DragState,
  options: MouseOptions,
) {
  if (event.pointerType !== 'mouse') return;
  if (!drag.isDragging) return;
  event.stopPropagation();

  const dx = event.pageX - drag.startX;
  const dy = event.pageY - drag.startY;
  if (options.isHorizontalDirection) element.scrollLeft = drag.scrollLeft - dx;
  if (options.isVerticalDirection) element.scrollTop = drag.scrollTop - dy;
}

/** @ignore */
function onMouseUp(
  event: PointerEvent,
  element: HTMLElement,
  drag: DragState,
  moveHandler: (e: PointerEvent) => void,
  upHandler: (e: PointerEvent) => void,
  options: MouseOptions,
) {
  if (event.pointerType !== 'mouse') return;
  event.stopPropagation();

  drag.isDragging = false;
  element.style.cursor = '';
  window.removeEventListener('pointermove', moveHandler, {
    capture: options.captureMouseScroll,
  });
  window.removeEventListener('pointerup', upHandler, {
    capture: options.captureMouseScroll,
  });
}
