/** @jsxImportSource react */

import { cn } from '@libs/shadcn/lib/utils';
import { useStore } from '@nanostores/react';
import { ScanBarcodeIcon } from 'lucide-react';
import { memo } from 'react';
import { Book } from '../../../../../components/book/Book.react';
import { bookScreenStore } from '../BookScreen.state';
import {
  bookScreenNewSearchComputedStore,
  bookScreenNewSearchStore,
} from '../new/BookScreenNewSearch.state';

/**
 * @jsx
 */
export function BookScreenContentThumbnail({ mode }: { mode: 'new' | 'view' }) {
  const data = useStore(bookScreenStore.dataset.data);
  const isSelectedData = useStore(
    bookScreenNewSearchComputedStore.isSelectedData,
  );

  const isFullSize = mode === 'new' && !isSelectedData;
  return (
    <Book
      className={cn(
        '[view-transition-name:book-screen-content-thumbnail]',
        isFullSize
          ? 'aspect-auto size-full max-h-[564px] max-w-[400px] grow'
          : mode === 'new'
            ? 'w-[160px] sm:w-[240px] lg:w-[320px]'
            : 'w-[160px] lg:w-[200px]',
      )}
      name={data?.title}
      image={data?.thumbnailUrl || null}
      scalable={false}
      skeleton={!isFullSize}
      fallback={true}
    >
      {mode === 'new' ? <SearchBookNavigation /> : null}
    </Book>
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
        'group absolute inset-0 z-10 flex size-full cursor-pointer flex-col items-center justify-center gap-4 bg-muted opacity-100',
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
      <div className="absolute inset-0 z-10 size-full bg-primary opacity-0 fade-transition group-hover:opacity-5 group-active:opacity-5"></div>
    </button>
  );
});
