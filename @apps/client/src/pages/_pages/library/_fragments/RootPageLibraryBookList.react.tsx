/** @jsxImportSource react */

import { BookPlusIcon } from 'lucide-react';
import { memo, useLayoutEffect, useState } from 'react';
import { Book } from '../../../../components/book/Book.react';

/**
 * @jsx
 */
export function RootPageLibraryBookList() {
  const [books, setBooks] = useState<any[]>([
    void 0,
    void 0,
    void 0,
    void 0,
    void 0,
    void 0,
    void 0,
    void 0,
    void 0,
  ]);
  const [isLoadingBooks, setIsLoadingBooks] = useState(true);
  const [isEmptyBooks, setIsEmptyBooks] = useState(false);

  useLayoutEffect(() => {
    setTimeout(() => {
      setIsLoadingBooks(false);
      setIsEmptyBooks(true);
    }, 2400);
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <div className="relative wrapper grid grid-cols-3 gap-4">
        {books.map((book, index) => (
          <Book key={index} className="w-full" image={book} />
        ))}
        {isEmptyBooks ? <NoBooksState /> : null}
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
