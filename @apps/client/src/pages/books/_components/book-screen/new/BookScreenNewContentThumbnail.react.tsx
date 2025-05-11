/** @jsxImportSource react */

import { memo } from 'react';
import { BookScreenContentThumbnail } from '../common/BookScreenContentThumbnail.react';
import {
  bookScreenNewSearchComputedStore,
  bookScreenNewSearchStore,
} from './BookScreenNewSearch.state';
import { ScanBarcodeIcon } from 'lucide-react';
import { useStore } from '@nanostores/react';
import { cn } from '@libs/shadcn/lib/utils';

/**
 * @jsx
 */
export function BookScreenNewContentThumbnail() {
  const isSelectedData = useStore(
    bookScreenNewSearchComputedStore.isSelectedData,
  );

  return (
    <BookScreenContentThumbnail
      fullSize={!isSelectedData}
      className="transform-gpu transition-[width] duration-[320ms] ease-in-out"
    >
      <SearchBookNavigation />
    </BookScreenContentThumbnail>
  );
}

/** @ignore */
const SearchBookNavigation = memo(() => {
  const isSelectedData = useStore(
    bookScreenNewSearchComputedStore.isSelectedData,
  );

  return (
    <button
      className={cn(
        'absolute inset-0 z-10 flex size-full cursor-pointer flex-col items-center justify-center gap-4 bg-muted opacity-100',
        isSelectedData ? 'pointer-events-none opacity-0' : null,
      )}
      onClickCapture={() => {
        bookScreenNewSearchStore.isOpenDrawer.set(true);
        bookScreenNewSearchStore.drawerMode.set('barcode');
      }}
    >
      <ScanBarcodeIcon className="size-12 text-secondary dark:text-primary" />
      <p className="text-sm font-bold text-secondary dark:text-primary">
        バーコードから読み取る
      </p>
    </button>
  );
});
