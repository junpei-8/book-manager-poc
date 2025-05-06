/** @jsxImportSource react */

import { BookIcon, CrossIcon, HeartIcon } from 'lucide-react';
import { memo } from 'react';
import { HapticButton } from '../../../../../components/button/HapticButton.react';

/**
 * @jsx
 */
export const RootPageHomeStaticMenu = memo(() => (
  <div className="wrapper mx-auto grid grid-cols-3 grid-rows-1 gap-4 p-4">
    <HapticButton
      variant="outline"
      className="inline-flex h-auto grow flex-col rounded-xl border-2 border-secondary p-4 text-center font-bold text-secondary shadow transition-transform md:flex-row"
    >
      <HeartIcon className="!h-6 !w-6 text-pink-500" strokeWidth={3} />
      <div className="w-full text-[11px] md:text-sm">お気に入り</div>
    </HapticButton>

    <HapticButton
      variant="outline"
      className="inline-flex h-auto grow flex-col rounded-xl border-2 border-secondary p-4 text-center font-bold text-secondary shadow transition-transform md:flex-row"
    >
      <BookIcon className="h-10 w-10" strokeWidth={3} />
      <div className="w-full text-[11px] md:text-sm">ブックマーク</div>
    </HapticButton>

    <HapticButton
      variant="outline"
      className="inline-flex h-auto grow flex-col rounded-xl border-2 border-secondary p-4 text-center font-bold text-secondary shadow transition-transform md:flex-row"
    >
      <CrossIcon className="h-10 w-10" strokeWidth={3} />
      <div className="w-full text-[11px] md:text-sm">ステータス</div>
    </HapticButton>
  </div>
));
