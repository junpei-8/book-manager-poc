/** @jsxImportSource react */

import { cn } from '@libs/shadcn/lib/utils';
import { useStore } from '@nanostores/react';
import { AlertTriangleIcon, BookPlusIcon, PencilRulerIcon } from 'lucide-react';
import { memo } from 'react';
import { Book } from '../../../../../components/book/Book.react';
import { RichScrollableContainer } from '../../../../../components/container/RichScrollableContainer.react';
import { type NanoQueryResult } from '../../../../../utils/nanoquery';
import { rootPageHomeBookListsQuery } from './RootPageHomeBookLists.state';

/**
 * @jsx
 */
export function RootPageHomeBookLists() {
  // #############
  // ## My books #
  // #############

  type MyBook = NonNullable<
    NanoQueryResult<typeof rootPageHomeBookListsQuery.myBooks>['data']
  >['items'][number];

  /* eslint-disable @typescript-eslint/no-unsafe-assignment */
  const { data: rawMyBooks, error: myBooksError } = useStore(
    rootPageHomeBookListsQuery.myBooks,
  );
  /* eslint-enable @typescript-eslint/no-unsafe-assignment */

  const isEmptyMyBooks = rawMyBooks?.items.length === 0;
  const myBookItems =
    rawMyBooks && !isEmptyMyBooks
      ? rawMyBooks.items
      : (Array.from({ length: 4 }, () => ({})) as Partial<MyBook>[]);

  // ############
  // ## Render ##
  // ############

  return (
    <div className="flex flex-col gap-4 md:gap-8 lg:gap-12">
      <div>
        <h2 className="wrapper text-lg font-bold md:text-xl">あなたの本棚</h2>
        <div className="relative">
          <RichScrollableContainer
            className={cn(
              'relative z-10 wrapper flex-nowrap gap-4 bg-background py-4 sm:py-6',
              isEmptyMyBooks || myBooksError
                ? 'pointer-events-none fade-out-animation'
                : null,
            )}
            disableMouseScroll={isEmptyMyBooks}
            onTouchMoveCapture={(e) => e.stopPropagation()}
          >
            {myBookItems.map((book, index) => (
              <Book
                key={book.publicId || index}
                className="w-full min-w-[160px]"
                title={book.title}
                image={book.thumbnailUrl}
              />
            ))}
          </RichScrollableContainer>
          {isEmptyMyBooks ? (
            <NoBooksState />
          ) : myBooksError ? (
            <ErrorState />
          ) : null}
        </div>
      </div>

      <div>
        <h2 className="wrapper text-lg font-bold md:text-xl">おすすめの本</h2>
        <div className="relative">
          <RichScrollableContainer
            className={cn(
              'relative z-10 wrapper flex-nowrap gap-4 bg-background py-4 sm:py-6',
              // eslint-disable-next-line no-constant-condition
              true ? 'pointer-events-none opacity-0' : null,
            )}
            disableMouseScroll
            onTouchMoveCapture={(e) => e.stopPropagation()}
          >
            {[void 0, void 0, void 0, void 0].map((book, index) => (
              <Book className="w-full min-w-[160px]" key={index} image={book} />
            ))}
          </RichScrollableContainer>

          <InProgressState />
        </div>
      </div>
    </div>
  );
}

/** @ignore */
const NoBooksState = memo(() => (
  <div className="absolute inset-0 z-0 wrapper size-full px-4 py-4 sm:py-6">
    <a
      className="flex size-full flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed border-input bg-card p-4"
      href="/books/new"
    >
      <BookPlusIcon className="size-16 text-muted-foreground/60" />
      <p className="text-center text-muted-foreground">本を追加しましょう</p>
    </a>
  </div>
));

/** @ignore */
const InProgressState = memo(() => (
  <div className="absolute inset-0 z-0 wrapper size-full px-4 py-4 sm:py-6">
    <div className="flex size-full flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed border-input bg-card p-4">
      <PencilRulerIcon className="size-16 text-muted-foreground/60" />
      <p className="text-center text-muted-foreground">近日公開予定</p>
    </div>
  </div>
));

/** @ignore */
const ErrorState = memo(() => (
  <div className="absolute inset-0 z-0 wrapper size-full px-4 py-4 sm:py-6">
    <div className="flex size-full flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed border-input bg-card p-4">
      <AlertTriangleIcon className="size-16 text-destructive/60" />
      <p className="text-center text-destructive">エラーが発生しました</p>
    </div>
  </div>
));
