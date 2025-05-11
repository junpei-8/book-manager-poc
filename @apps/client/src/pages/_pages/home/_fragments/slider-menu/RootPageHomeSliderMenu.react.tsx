/** @jsxImportSource react */

// @ts-expect-error: declarations are not available in the global scope
import 'swiper/css/bundle';
import '../../../../../styles/swiper.css';
import { AnimatedBeam } from '@libs/shadcn/components/magicui/animated-beam';
import { BentoCardWithoutLink } from '@libs/shadcn/components/magicui/custom/bento-card-without-link';
import { cn } from '@libs/shadcn/lib/utils';
import {
  ActivityIcon,
  BookHeartIcon,
  BookIcon,
  CalendarHeartIcon,
  ChartNoAxesCombinedIcon,
  HistoryIcon,
  LibraryIcon,
  PlusIcon,
  UserRoundIcon,
} from 'lucide-react';
import { memo, useEffect, useRef } from 'react';
import Swiper from 'swiper';
import { EffectCoverflow } from 'swiper/modules';
import { useHydration } from '../../../../../hooks/hydrate';
import { toast } from 'sonner';

/**
 * @jsx
 */
export function RootPageHomeSliderMenu() {
  const hasHydrated = useHydration();

  // Swiper の初期化
  const containerRef = useRef<HTMLDivElement>(null);
  const swiperRef = useRef<Swiper>(null);
  useEffect(() => {
    if (!hasHydrated) return;

    const container = containerRef.current;
    if (!container) return;

    // Swiper を初期化
    swiperRef.current = initializeSwiper(container);

    // NOTE: Safari で Swiper の初期レンダリングの計算が間違ってしまうため、Initialize 後に再計算を行う。
    queueMicrotask(() => {
      swiperRef.current?.destroy();
      swiperRef.current = initializeSwiper(container);
    });

    // eslint-disable-next-line jsdoc/require-jsdoc
    return () => {
      swiperRef.current?.destroy();
      swiperRef.current = null;
    };
  }, [hasHydrated]);

  // Styles
  const swiperSlideStyle =
    'swiper-slide w-full max-w-[88%] min-[32rem]:max-w-md aspect-[1.586/1]';
  return (
    <div className="mb-8 mask-fade-x-4 sm:mask-fade-x-6 md:mb-16 lg:mb-24">
      <div
        ref={containerRef}
        className="swiper swiper-3d swiper-smooth-initial-slide swiper-smooth-initial-slide-animation w-full max-w-[1280px] !overflow-visible !pb-2"
      >
        <div className="swiper-wrapper">
          <div className={swiperSlideStyle}>
            <LibraryCard swiperRef={swiperRef} />
          </div>
          <div className={cn('swiper-initial-slide mx-auto', swiperSlideStyle)}>
            <BookCard swiperRef={swiperRef} />
          </div>
          <div className={swiperSlideStyle}>
            <StatusCard swiperRef={swiperRef} />
          </div>
        </div>
      </div>
    </div>
  );
}

/** @ignore */
function initializeSwiper(container: HTMLDivElement) {
  return new Swiper(container, {
    modules: [EffectCoverflow],
    initialSlide: 1,
    speed: 320,
    effect: 'coverflow',
    coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: 100,
      modifier: 1,
      scale: 0.86,
      slideShadows: false,
    },
    nested: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    on: {
      touchMove: (_, event) => {
        event.stopPropagation();
      },
    },
  });
}

/** @ignore */
const LibraryCard = memo(
  ({ swiperRef }: { swiperRef: React.RefObject<Swiper | null> }) => {
    const index = 0;
    const href = '/library';

    return (
      <a href={href} onClick={(event) => onClickCard(index, swiperRef, event)}>
        <BentoCardWithoutLink
          className="h-full w-full"
          Icon={LibraryIcon}
          name="本棚を見る"
          description="登録した本を確認しましょう。"
          background={
            <div className="absolute top-0 h-full w-full bg-primary [mask-image:linear-gradient(to_top,transparent_32%,#000_100%)] text-primary-foreground [--duration:20s]"></div>
          }
        />
      </a>
    );
  },
);

/** @ignore */
const BookCard = memo(
  ({ swiperRef }: { swiperRef: React.RefObject<Swiper | null> }) => {
    const index = 1;
    const href = '/books/new';

    return (
      <a href={href} onClick={(event) => onClickCard(index, swiperRef, event)}>
        <BentoCardWithoutLink
          className="h-full w-full force-border-none"
          Icon={BookIcon}
          name="本を追加する"
          description="あなたの読書の軌跡を残しましょう。"
          background={
            <div className="absolute top-0 h-full w-full bg-primary [mask-image:linear-gradient(to_top,transparent_32%,#000_100%)] text-primary-foreground [--duration:20s]">
              <div className="flex justify-end">
                <PlusIcon className="h-[32%] w-[32%] text-black dark:text-white" />
              </div>
            </div>
          }
        />
      </a>
    );
  },
);

/** @ignore */
const StatusCard = memo(
  ({ swiperRef }: { swiperRef: React.RefObject<Swiper | null> }) => {
    const index = 2;
    const href = '/status';

    return (
      <a href={href} onClick={(event) => onClickCard(index, swiperRef, event)}>
        <BentoCardWithoutLink
          className="h-full w-full"
          Icon={ActivityIcon}
          name="ステータスを見る"
          description="あなたの統計を確認できます。"
          background={
            <div className="absolute top-0 h-full w-full bg-primary [mask-image:linear-gradient(to_top,transparent_32%,#000_100%)] text-primary-foreground [--duration:20s]">
              <StatusCardBackground />
            </div>
          }
        />
      </a>
    );
  },
);

/** @ignore */
const StatusCardBackground = memo(() => {
  const containerRef = useRef<HTMLDivElement>(null);
  const div1Ref = useRef<HTMLDivElement>(null);
  const div2Ref = useRef<HTMLDivElement>(null);
  const div3Ref = useRef<HTMLDivElement>(null);
  const div4Ref = useRef<HTMLDivElement>(null);
  const div5Ref = useRef<HTMLDivElement>(null);

  const containerStyle =
    'relative mx-auto flex h-[114px] w-[88%] max-w-[320px] min-w-[200px] items-center justify-center overflow-hidden pt-6 min-[384px]:h-[160px] min-[384px]:pt-8';
  const circleStyle =
    'z-10 border-muted-foreground shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)] flex h-10 w-10 items-center justify-center rounded-full border bg-white p-2 min-[384px]:h-12 min-[384px]:w-12';
  return (
    <div className={containerStyle} ref={containerRef}>
      <div className="flex size-full items-stretch justify-between gap-10">
        <div className="flex flex-col items-center justify-between">
          <div ref={div1Ref} className={circleStyle}>
            <CalendarHeartIcon className="size-full" />
          </div>
          <div ref={div4Ref} className={circleStyle}>
            <ChartNoAxesCombinedIcon className="size-full" />
          </div>
        </div>

        <div className="flex flex-col items-center justify-center">
          <div ref={div3Ref} className={circleStyle}>
            <UserRoundIcon className="size-full" />
          </div>
        </div>

        <div className="flex flex-col items-center justify-between">
          <div ref={div2Ref} className={circleStyle}>
            <HistoryIcon className="size-full" />
          </div>
          <div ref={div5Ref} className={circleStyle}>
            <BookHeartIcon className="size-full" />
          </div>
        </div>
      </div>

      <AnimatedBeam
        className="size-full"
        containerRef={containerRef}
        fromRef={div1Ref}
        toRef={div3Ref}
        curvature={-24}
        reverse
      />
      <AnimatedBeam
        className="size-full"
        containerRef={containerRef}
        fromRef={div2Ref}
        toRef={div3Ref}
        curvature={-24}
        reverse
      />
      <AnimatedBeam
        className="size-full"
        containerRef={containerRef}
        fromRef={div4Ref}
        toRef={div3Ref}
        curvature={24}
        reverse
      />
      <AnimatedBeam
        className="size-full"
        containerRef={containerRef}
        fromRef={div5Ref}
        toRef={div3Ref}
        curvature={24}
      />
    </div>
  );
});

/** @ignore */
function onClickCard(
  index: number,
  swiperRef: React.RefObject<Swiper | null>,
  event: React.MouseEvent<HTMLAnchorElement>,
) {
  const swiper = swiperRef.current;
  if (!swiper) {
    event.preventDefault();
    return;
  }

  const currentIndex = swiper.activeIndex;
  if (currentIndex !== index) {
    swiper.slideTo(index);
    event.preventDefault();
    return;
  }
}
