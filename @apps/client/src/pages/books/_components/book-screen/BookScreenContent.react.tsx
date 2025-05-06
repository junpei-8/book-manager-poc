/** @jsxImportSource react */

import { cn } from '@libs/shadcn/lib/utils';
import { useStore } from '@nanostores/react';
import { ScanBarcodeIcon } from 'lucide-react';
import { memo } from 'react';
import { Book } from '../../../../components/book/Book.react';
import { bookScreenStore } from './BookScreen.state';
import { bookScreenNewSearchDrawerStore } from './new/BookScreenNewSearchDrawer.state';

/**
 * @jsx
 */
export function BookScreenContent(props: { mode: 'new' | 'view' }) {
  const data = useStore(bookScreenStore.dataset.data);

  return (
    <div className="flex size-full flex-col items-center justify-center px-4">
      <Book
        className={cn(
          'transform-gpu transition-[width] duration-[320ms] ease-in-out',
          data ? 'w-[160px] sm:w-[240px] lg:w-[320px]' : 'w-full',
        )}
        name={data?.title}
        image={data?.thumbnailUrl || null}
        scalable={!data}
        fallback={!!data}
      >
        {data && props.mode === 'new' ? null : <SearchBookNavigation />}
      </Book>
    </div>
  );
}

/** @ignore */
const SearchBookNavigation = memo(() => (
  <button
    className="flex size-full cursor-pointer flex-col items-center justify-center gap-4"
    onClickCapture={() => {
      bookScreenNewSearchDrawerStore.isOpen.set(true);
      bookScreenNewSearchDrawerStore.mode.set('barcode');
    }}
  >
    <ScanBarcodeIcon className="size-12 text-secondary dark:text-primary" />
    <p className="text-sm font-bold text-secondary dark:text-primary">
      バーコードから読み取る
    </p>
  </button>
));
