/** @jsxImportSource react */

import { Badge } from '@libs/shadcn/components/ui/badge';
import { cn } from '@libs/shadcn/lib/utils';
import { useStore } from '@nanostores/react';
import { CodeIcon, KeyboardIcon } from 'lucide-react';
import { memo } from 'react';
import { HapticButton } from '../../../../../components/button/HapticButton.react';
import { SmoothResizingContainer } from '../../../../../components/container/SmoothResizingContainer.react';
import { bookScreenStore } from '../BookScreen.state';
import {
  bookScreenNewSearchComputedStore,
  bookScreenNewSearchStore,
} from './BookScreenNewSearch.state';
import { BookScreenContentDetails } from '../common/BookScreenContentDetails.react';

/**
 * @jsx
 */
export function BookScreenNewContentDetails() {
  return (
    <SmoothResizingContainer
      direction="vertical"
      outerProps={{ className: 'overflow-hidden' }}
      innerProps={{ className: 'relative' }}
    >
      <SearchDrawerTriggers />
      <SearchDrawerDetails />
    </SmoothResizingContainer>
  );
}

/** @ignore */
const SearchDrawerTriggers = memo(() => {
  const isSelectedData = useStore(
    bookScreenNewSearchComputedStore.isSelectedData,
  );

  return (
    <div
      className={cn(
        'flex w-full flex-col gap-2 opacity-100 fade-transition',
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
const SearchDrawerDetails = memo(() => {
  const isSelectedData = useStore(
    bookScreenNewSearchComputedStore.isSelectedData,
  );

  return (
    <BookScreenContentDetails
      className={cn(
        'opacity-100 fade-transition',
        isSelectedData
          ? null
          : 'pointer-events-none absolute inset-0 opacity-0',
      )}
    />
  );
});
