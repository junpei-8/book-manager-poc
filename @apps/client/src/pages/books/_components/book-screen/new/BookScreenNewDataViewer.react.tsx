/** @jsxImportSource react */

import { Badge } from '@libs/shadcn/components/ui/badge';
import { cn } from '@libs/shadcn/lib/utils';
import { useStore } from '@nanostores/react';
import { CodeIcon, KeyboardIcon } from 'lucide-react';
import { memo } from 'react';
import { HapticButton } from '../../../../../components/button/HapticButton.react';
import { SmoothResizingContainer } from '../../../../../components/container/SmoothResizingContainer.react';
import { bookScreenStore } from '../BookScreen.state';
import { bookScreenNewSearchDrawerStore } from './BookScreenNewSearchDrawer.state';

/**
 * @jsx
 */
export function BookScreenNewDataViewer() {
  return (
    <SmoothResizingContainer
      direction="vertical"
      outerProps={{ className: 'overflow-hidden' }}
      innerProps={{ className: 'relative pb-8' }}
    >
      <SearchDrawerTriggers />
      <SearchDrawerData />
    </SmoothResizingContainer>
  );
}

/** @ignore */
const SearchDrawerTriggers = memo(() => {
  const data = useStore(bookScreenStore.dataset.data);

  const isSelected = !!data;
  return (
    <div
      className={cn(
        'flex w-full flex-col gap-2 opacity-100 fade-transition',
        isSelected ? 'pointer-events-none absolute inset-0 !opacity-0' : null,
      )}
    >
      <HapticButton
        className="relative w-full font-bold"
        onClick={() => {
          bookScreenNewSearchDrawerStore.mode.set('keyword');
          bookScreenNewSearchDrawerStore.isOpen.set(true);
        }}
      >
        <KeyboardIcon className="absolute left-4 size-4" strokeWidth={3} />
        <span>キーワードで検索</span>
      </HapticButton>
      <HapticButton
        className="relative w-full font-bold"
        onClick={() => {
          bookScreenNewSearchDrawerStore.mode.set('isbn');
          bookScreenNewSearchDrawerStore.isOpen.set(true);
        }}
      >
        <CodeIcon className="absolute left-4 size-4" strokeWidth={3} />
        <span>ISBN コードで検索</span>
      </HapticButton>
    </div>
  );
});

/** @ignore */
const SearchDrawerData = memo(() => {
  const data = useStore(bookScreenStore.dataset.data);

  const isSelected = !!data;
  return (
    <div
      className={cn(
        'flex w-full flex-col gap-2 opacity-100 fade-transition',
        isSelected ? null : 'pointer-events-none absolute inset-0 !opacity-0',
      )}
    >
      {data ? (
        <div className="mx-auto flex max-w-[240px] flex-1 flex-col pb-2 sm:max-w-[320px] lg:max-w-[400px]">
          <h3 className="mb-1 font-bold md:text-lg">{data.title}</h3>
          {data.authors ? (
            <div className="mb-1 text-xs text-gray-600 md:mb-2 md:text-sm">
              {data.authors}
            </div>
          ) : null}
          {data.categories ? (
            <div className="mt-auto ml-auto scrollbar-hidden flex flex-wrap gap-2 overflow-x-scroll">
              {data.categories.split(',').map((category) => (
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
