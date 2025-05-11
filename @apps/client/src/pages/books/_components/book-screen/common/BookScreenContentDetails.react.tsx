/** @jsxImportSource react */

import { cn } from '@libs/shadcn/lib/utils';
import { useStore } from '@nanostores/react';
import { CodeIcon, KeyboardIcon } from 'lucide-react';
import { memo } from 'react';
import { HapticButton } from '../../../../../components/button/HapticButton.react';
import { SmoothResizingContainer } from '../../../../../components/container/SmoothResizingContainer.react';
import { bookScreenStore } from '../BookScreen.state';
import { Badge } from '@libs/shadcn/components/ui/badge';
import { bookScreenNewSearchStore } from '../new/BookScreenNewSearch.state';
import { bookScreenNewSearchComputedStore } from '../new/BookScreenNewSearch.state';

/**
 * @jsx
 */
export function BookScreenContentDetails(props: { mode: 'new' | 'view' }) {
  const mode = props.mode;
  return (
    <SmoothResizingContainer
      direction="vertical"
      disabled={mode !== 'new'}
      outerProps={{
        className: cn(
          '[view-transition-name:book-screen-content-details]',
          'overflow-hidden',
          mode !== 'new' ? '!h-full' : null,
        ),
      }}
      innerProps={{
        className: cn('relative', mode !== 'new' ? 'h-full' : null),
      }}
    >
      {mode === 'new' ? <BookScreenContentSearchDrawerTrigger /> : null}
      <BookScreenContentDetailsView />
    </SmoothResizingContainer>
  );
}

/** @ignore */
const BookScreenContentSearchDrawerTrigger = memo(() => {
  const isSelectedData = useStore(
    bookScreenNewSearchComputedStore.isSelectedData,
  );

  return (
    <div
      className={cn(
        'flex w-full flex-col gap-2 opacity-100',
        isSelectedData
          ? null // isSelectedData が選択された時のみアニメーションが発生するように
          : 'fade-transition',
        isSelectedData
          ? 'pointer-events-none absolute inset-0 opacity-0'
          : null,
      )}
    >
      <HapticButton
        className="relative w-full font-bold"
        onClick={() => {
          bookScreenNewSearchStore.drawerMode.set('keyword');
          bookScreenNewSearchStore.isOpenDrawer.set(true);
        }}
      >
        <KeyboardIcon className="absolute left-4 size-4" strokeWidth={3} />
        <span>キーワードで検索</span>
      </HapticButton>
      <HapticButton
        className="relative w-full font-bold"
        onClick={() => {
          bookScreenNewSearchStore.drawerMode.set('isbn');
          bookScreenNewSearchStore.isOpenDrawer.set(true);
        }}
      >
        <CodeIcon className="absolute left-4 size-4" strokeWidth={3} />
        <span>ISBN コードで検索</span>
      </HapticButton>
    </div>
  );
});

/**
 * @jsx
 */
const BookScreenContentDetailsView = memo((props: { className?: string }) => {
  const data = useStore(bookScreenStore.dataset.data);
  const isSelectedData = useStore(
    bookScreenNewSearchComputedStore.isSelectedData,
  );

  return (
    <div
      className={cn(
        'flex size-full flex-col gap-2 overflow-visible opacity-100 fade-transition',
        isSelectedData
          ? null
          : 'pointer-events-none absolute inset-0 opacity-0',
        props.className,
      )}
    >
      {data ? (
        <div className="mx-auto flex size-full flex-col p-4">
          <h3 className="mb-1.5 font-bold md:text-lg">{data.title}</h3>
          {data.authors ? (
            <div className="mb-4 text-xs text-muted-foreground md:text-sm">
              {data.authors}
            </div>
          ) : null}
          {data.categories ? (
            <div className="mt-auto ml-auto scrollbar-hidden flex flex-wrap gap-2 overflow-x-scroll">
              {data.categories.map((category) => (
                <Badge key={category} className="rounded-full">
                  {category.trim()}
                </Badge>
              ))}
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
});
