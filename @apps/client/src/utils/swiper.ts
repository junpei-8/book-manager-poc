import { type SwiperOptions } from 'swiper/types';

/**
 * スライダーの端の操作をブロックする。
 */
export const edgeMoveBlocker = {
  slideChange: (swiper) => {
    // 最初のスライドなら「前に進めない」
    swiper.isBeginning
      ? (swiper.allowSlidePrev = false)
      : (swiper.allowSlidePrev = true);

    // 最後のスライドなら「次に進めない」
    swiper.isEnd
      ? (swiper.allowSlideNext = false)
      : (swiper.allowSlideNext = true);
  },
  reachBeginning: (swiper) => {
    swiper.allowSlidePrev = false;
  },
  reachEnd: (swiper) => {
    swiper.allowSlideNext = false;
  },
  fromEdge: (swiper) => {
    swiper.allowSlidePrev = true;
    swiper.allowSlideNext = true;
  },
} as const satisfies Partial<SwiperOptions['on']>;
