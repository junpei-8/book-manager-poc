/** @jsxImportSource react */

// @ts-expect-error: declarations are not available in the global scope
import 'swiper/css/bundle';
import '../../styles/swiper.css';

import { cn } from '@libs/shadcn/lib/utils';
import { useEffect, useRef, useState } from 'react';
import Swiper from 'swiper';
import { type SwiperOptions } from 'swiper/types';
import { useHydration } from '../../hooks/hydrate';
import { vibrate, type VibrationToken } from '../../utils/vibration';

/**
 * スライドの表示内容のプロパティ。
 */
export type SlidablePageSlotProps = {
  /**
   * スライドの表示内容。
   *
   * - Content: `slide:0`
   * - Icon: `slide-icon:0`
   */
  [key: string]: React.ReactNode;
};

/**
 * スライドのプロパティ。
 */
export type SlidablePageSlideProps = {
  [key: string]: React.JSX.IntrinsicElements['div'] & {
    link?: string;
  };
};

/**
 * スライダーのプロパティ。
 */
export type SlidablePageProps = {
  vibration?: VibrationToken | null;
  instanceKey?: string;
  options?: SwiperOptions;
  containerProps?: React.JSX.IntrinsicElements['div'];
  wrapperProps?: React.JSX.IntrinsicElements['div'];
  slideProps?: SlidablePageSlideProps;
};

/**
 * @example
 *
 * ```ts
 * <SlidablePage>
 *   <div slot="slide:0">Slide 1</div>
 *   <div slot="slide-icon:0">Icon 1</div>
 *
 *   <div slot="slide:1">Slide 2</div>
 *   <div slot="slide-icon:1">Icon 2</div>
 * </SlidablePage>;
 * ```
 *
 * @jsx
 */
export function PageSlider({
  instanceKey,
  vibration = 'short',
  options = {},
  containerProps = {},
  wrapperProps = {},
  slideProps = {},
  ...slots
}: SlidablePageProps) {
  // JS が読み込まれたかどうか
  const hasHydrated = useHydration();

  // 初期スライド
  const initialSlide = options.initialSlide || 0;

  // スライドの内容
  const slideProperties = getSlideProperties(slideProps);
  const slideMap = getSlideMap(slots, slideProperties, {
    only: !hasHydrated, // 初回読み込み時は最初のスライドのみ表示
    index: initialSlide,
  });

  // Swiper の初期化
  const containerRef = useRef<HTMLDivElement>(null);
  const instanceRef = useRef<Swiper>(null);
  const activeIndexChangesRef = useRef<(index: number) => void>(null);
  useEffect(() => {
    if (!hasHydrated) return;

    const container = containerRef.current;
    if (!container) return;

    // Swiper を初期化
    const swiper = (instanceRef.current = initializeSwiper(
      container,
      options,
      vibration,
      slideProperties,
      initialSlide,
      activeIndexChangesRef,
    ));

    // eslint-disable-next-line jsdoc/require-jsdoc
    return () => swiper.destroy();
  }, [hasHydrated, instanceKey]);

  return (
    <div
      ref={containerRef}
      {...containerProps}
      className={cn(
        'swiper swiper-smooth-initial-slide w-full',
        containerProps.className,
      )}
    >
      <div
        {...wrapperProps}
        className={cn('swiper-wrapper', wrapperProps.className)}
      >
        {slideMap.contents}
      </div>
      {hasHydrated ? (
        <SwiperPagination
          icons={slideMap.icons}
          activeIndexChangesRef={activeIndexChangesRef}
        />
      ) : null}
    </div>
  );
}

/** @ignore */
function getSlideMap(
  slots: SlidablePageSlotProps,
  slideProperties: SlidablePageSlideProps[number][],
  initialSlide: {
    index: number;
    only?: boolean;
  },
) {
  const contents: React.ReactNode[] = [];
  const icons: React.ReactNode[] = [];

  const entries = Object.entries(slots);
  for (let i = 0, length = entries.length; i < length; i++) {
    const [key, value] = entries[i]!;

    if (key.startsWith('slide:')) {
      const index = Number(key.slice(6));
      if (index < 0) continue;

      const props = slideProperties[index] || {};
      const isInitialSlide = initialSlide.index === index;
      contents[index] = (
        <div
          {...props}
          key={index}
          className={cn(
            'swiper-slide min-h-[100svh]',
            isInitialSlide ? 'swiper-initial-slide' : null,
            props.className,
          )}
        >
          {
            // only で初回読み込み以外の場合はコンテンツをレンダリングさせないことで描画コストを抑える
            initialSlide.only && !isInitialSlide ? null : value
          }
        </div>
      );
      continue;
    }

    if (key.startsWith('slide-icon:')) {
      const index = Number(key.slice(11));
      if (index < 0) continue;

      icons[index] = value;
      continue;
    }
  }

  return {
    contents,
    icons,
  };
}

/** @ignore */
function getSlideProperties(slideProps: SlidablePageSlideProps) {
  const properties: SlidablePageSlideProps[number][] = [];
  const entries = Object.entries(slideProps);

  for (let i = 0, length = entries.length; i < length; i++) {
    const [key, value] = entries[i]!;
    if (!key.startsWith('slide:')) continue;

    const index = Number(key.slice(6));
    if (index < 0) continue;

    properties[index] = value;
  }

  return properties;
}

/** @ignore */
function initializeSwiper(
  container: HTMLDivElement,
  options: SwiperOptions,
  vibration: VibrationToken | undefined | null,
  slideProperties: SlidablePageSlideProps[number][],
  initialSlide: number,
  activeIndexChangesRef: React.RefObject<((index: number) => void) | null>,
) {
  const routeHistory: string[] = [location.pathname];
  let hasChangedActiveIndex = false;

  return new Swiper(container, {
    ...options,
    initialSlide,
    speed: 320,
    on: {
      ...options.on,
      // ...edgeMoveBlocker,
      slideChange: (swiper) => {
        const currentSlide = swiper.activeIndex;
        const currentSlideProps = slideProperties[currentSlide];

        // スライドのリンクがあれば遷移
        const slideLink = currentSlideProps?.link;
        if (slideLink && slideLink !== location.pathname) {
          const shouldBack =
            routeHistory[routeHistory.length - 2] === slideLink;

          // 戻る操作であれば router.back() を呼び出す
          if (shouldBack) {
            window.__POPSTATE_BLOCKER__.once();
            routeHistory.pop();
            history.back();

            // ↓ 追加する
          } else {
            const state = history.state || {};
            routeHistory.push(slideLink);
            history.pushState(
              { ...state, index: (state.index || 0) + 1 },
              '',
              slideLink,
            );
          }
        }

        // edgeMoveBlocker.slideChange?.(swiper);
        options.on?.slideChange?.(swiper);
      },
      activeIndexChange: (swiper) => {
        if (hasChangedActiveIndex && vibration)
          vibrate(vibration, { polyfillBrowser: false });
        activeIndexChangesRef.current?.(swiper.activeIndex);
        hasChangedActiveIndex = true;
      },
    },
  });
}

/** @ignore */
function SwiperPagination({
  icons,
  activeIndexChangesRef,
}: {
  icons: React.ReactNode[];
  activeIndexChangesRef: React.RefObject<((index: number) => void) | null>;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  activeIndexChangesRef.current = setCurrentIndex;

  return (
    <div className="fixed right-1.5 bottom-1.5 z-20 flex fade-in-animation gap-1 rounded-full bg-primary p-1.5 text-primary-foreground/40 shadow backdrop-blur md:right-2 md:bottom-2.5 md:gap-2 md:p-3">
      {icons.map((icon, index) => (
        <div
          key={index}
          className={cn(
            'h-3 w-3 md:h-4 md:w-4 [&_svg]:h-full [&_svg]:w-full [&_svg]:stroke-[2.5px] md:[&_svg]:stroke-[3px]',
            currentIndex === index ? 'text-secondary' : null,
          )}
        >
          {icon}
        </div>
      ))}
    </div>
  );
}
