/** @jsxImportSource react */

import { useStore } from '@nanostores/react';
import { bookScreenStore } from '../../_components/book-screen/BookScreen.state';
import { LayoutSubheader } from '../../../_layouts/header/LayoutSubheader.react';
import { useHydration } from '../../../../hooks/hydrate';

/**
 * @jsx
 */
export function BooksDetailsSubheader() {
  const hasHydrated = useHydration();
  const data = useStore(bookScreenStore.dataset.data);
  const intersectionRatio = useStore(bookScreenStore.contentIntersectionRatio);

  return (
    <LayoutSubheader
      title={data?.title || ''}
      h1Props={{
        className: 'opacity-0',
        style: hasHydrated ? { opacity: intersectionRatio } : undefined,
      }}
    />
  );
}
