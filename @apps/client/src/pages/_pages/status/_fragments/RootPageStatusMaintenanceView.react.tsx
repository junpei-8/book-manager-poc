/** @jsxImportSource react */

import { useLayoutEffect, useRef, useState } from 'react';
import { SkeletonOverlay } from '../../../../components/skeleton/SkeletonOverlay.react';
import IllustrationUrl from './illustration/amadeus/drawkit-grape-animation-10-LOOP.animation.json?url';

/**
 * @jsx
 */
export function RootPageStatusMaintenanceView() {
  const elementRef = useRef<HTMLDivElement>(null);
  const [hasIllustrationLoaded, setHasIllustrationLoaded] = useState(false);

  useLayoutEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    import('lottie-web').then(({ default: lottie }) => {
      // アニメーションを読み込む
      lottie.loadAnimation({
        container: element,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: IllustrationUrl,
      });

      // アニメーションが読み込まれたら true にする
      setHasIllustrationLoaded(true);
    });
  }, []);

  return (
    <div className="wrapper flex flex-col items-center justify-center gap-6">
      <div className="relative mt-[-4%] size-full min-[20rem]:size-80">
        <div className="size-full" ref={elementRef} />
        <SkeletonOverlay
          className="rounded-xl"
          hidden={hasIllustrationLoaded}
        />
      </div>
      <p className="text-center text-lg font-semibold text-muted-foreground">
        近日公開予定
      </p>
    </div>
  );
}
