/** @jsxImportSource react */

import { cn } from '@libs/shadcn/lib/utils';
import { useStore } from '@nanostores/react';
import { Book } from '../../../../../components/book/Book.react';
import { bookScreenStore } from '../BookScreen.state';

/**
 * @jsx
 */
export function BookScreenContentThumbnail({
  className,
  fullSize,
  children,
}: {
  className?: string;
  fullSize?: boolean;
  children?: React.ReactNode;
}) {
  const data = useStore(bookScreenStore.dataset.data);
  console.log(data?.thumbnailUrl);

  return (
    <Book
      className={cn(
        fullSize
          ? 'aspect-auto size-full max-h-[564px] max-w-[400px] grow'
          : 'w-[160px] sm:w-[240px] lg:w-[320px]',
        className,
      )}
      name={data?.title}
      image={data?.thumbnailUrl || null}
      scalable={!fullSize}
      skeleton={!fullSize}
      fallback={true}
      containerProps={{
        className: fullSize ? 'rounded-md' : void 0,
      }}
    >
      {children}
    </Book>
  );
}
