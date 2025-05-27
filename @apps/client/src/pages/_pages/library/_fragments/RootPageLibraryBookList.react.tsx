/** @jsxImportSource react */

import { useStore } from '@nanostores/react';
import { AlertTriangleIcon, BookPlusIcon } from 'lucide-react';
import { memo } from 'react';
import { Book } from '../../../../components/book/Book.react';
import { type NanoQueryResult } from '../../../../utils/nanoquery';
import { rootPageLibraryBookListQuery } from './RootPageLibraryBookList.state';

/**
 * @jsx
 */
export function RootPageLibraryBookList() {
  // #############
  // ## My books #
  // #############

  type MyBook = NonNullable<
    NanoQueryResult<typeof rootPageLibraryBookListQuery.myBooks>['data']
  >['items'][number];

  /* eslint-disable @typescript-eslint/no-unsafe-assignment */
  const { data: rawMyBooks, error: myBooksError } = useStore(
    rootPageLibraryBookListQuery.myBooks,
  );
  /* eslint-enable @typescript-eslint/no-unsafe-assignment */

  const isEmptyMyBooks = rawMyBooks?.items.length === 0;
  const myBookItems = rawMyBooks
    ? rawMyBooks.items
    : (Array.from({ length: 9 }, () => ({})) as Partial<MyBook>[]);

  // ############
  // ## Render ##
  // ############

  return (
    <div className="flex flex-col gap-8">
      <div className="relative wrapper grid grid-cols-3 gap-4">
        {myBookItems.map((book, index) => (
          <Book
            key={book.publicId || index}
            className="w-full min-w-[160px]"
            title={book.title}
            image={book.thumbnailUrl}
          />
        ))}
        {isEmptyMyBooks ? (
          <NoBooksState />
        ) : myBooksError ? (
          <ErrorState />
        ) : null}
      </div>
    </div>
  );
}

/** @ignore */
const NoBooksState = memo(() => (
  <div className="absolute inset-0 z-10 size-full fade-in-animation bg-background px-4 opacity-0">
    <a className="relative inset-0 flex" href="/books/new">
      <div className="grid w-full grid-cols-3 gap-4">
        <div className="aspect-[1/1.41] w-full"></div>
        <div className="aspect-[1/1.41] w-full"></div>
        <div className="aspect-[1/1.41] w-full"></div>
      </div>
      <div className="absolute inset-0 flex size-full flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed border-input bg-card p-4">
        <BookPlusIcon className="size-16 text-muted-foreground/60" />
        <p className="text-center text-muted-foreground">本を追加しましょう</p>
      </div>
    </a>
  </div>
));

/** @ignore */
const ErrorState = memo(() => (
  <div className="absolute inset-0 z-10 size-full fade-in-animation bg-background px-4 opacity-0">
    <div className="relative inset-0 flex">
      <div className="grid w-full grid-cols-3 gap-4">
        <div className="aspect-[1/1.41] w-full"></div>
        <div className="aspect-[1/1.41] w-full"></div>
        <div className="aspect-[1/1.41] w-full"></div>
      </div>
      <div className="absolute inset-0 flex size-full flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed border-input bg-card p-4">
        <AlertTriangleIcon className="size-16 text-destructive/60" />
        <p className="text-center text-destructive">エラーが発生しました</p>
      </div>
    </div>
  </div>
));
