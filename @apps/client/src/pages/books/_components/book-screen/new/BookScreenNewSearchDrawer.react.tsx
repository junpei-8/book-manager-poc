/** @jsxImportSource react */

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@libs/shadcn/components/ui/alert';
import { Badge } from '@libs/shadcn/components/ui/badge';
import '../../../../../styles/vaul.css';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@libs/shadcn/components/ui/drawer';
import { Input } from '@libs/shadcn/components/ui/input';
import { cn } from '@libs/shadcn/lib/utils';
import { useStore } from '@nanostores/react';
import { Scanner, type IDetectedBarcode } from '@yudiel/react-qr-scanner';
import { AlertCircleIcon, InfoIcon, Loader2Icon } from 'lucide-react';
import { memo, useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import { safeParse } from 'valibot';
import { Book } from '../../../../../components/book/Book.react';
import { HapticButton } from '../../../../../components/button/HapticButton.react';
import { DrawerMain } from '../../../../../components/drawer/DrawerMain.react';
import { isbnSchema } from '../../../../../schemas/isbn';
import { server } from '../../../../../utils/server';
import { bookScreenStore } from '../BookScreen.state';
import { bookScreenNewSearchStore } from './BookScreenNewSearch.state';
import { type StoreValue } from 'nanostores';

/**
 * @jsx
 */
export function BookScreenNewSearchDrawer() {
  const isOpen = useStore(bookScreenNewSearchStore.isOpenDrawer);

  return (
    <Drawer
      open={isOpen}
      // shouldScaleBackground
      repositionInputs={false}
      onOpenChange={bookScreenNewSearchStore.isOpenDrawer.set}
      onAnimationEnd={(open) => {
        if (!open) bookScreenNewSearchStore.list.reset();
      }}
    >
      <SearchDrawerContent />
    </Drawer>
  );
}

/** @ignore */
const SearchDrawerContent = memo(() => (
  <DrawerContent className="!max-h-[90svh] [&>div:first-child]:hidden">
    <form
      className="flex flex-col gap-4 overflow-hidden"
      onSubmit={(event) => {
        const isFetching = bookScreenNewSearchStore.list.isFetching.get();
        if (isFetching) return;

        const property = bookScreenNewSearchStore.list.createProperty();
        if (!property) return;

        event.preventDefault();
        bookScreenNewSearchStore.list.update();
      }}
    >
      <SearchDrawerHeader />
      <SearchDrawerMain />
    </form>
  </DrawerContent>
));

/** @ignore */
const SearchDrawerHeader = memo(() => {
  const mode = useStore(bookScreenNewSearchStore.drawerMode);

  return (
    <DrawerHeader
      className={cn(
        mode === 'keyword' || mode === 'isbn'
          ? 'fixed right-0 left-0 z-10 rounded-t-lg px-0 backdrop-blur'
          : null,
      )}
    >
      <DrawerTitle className="px-4 text-center text-sm font-bold">
        {mode === 'keyword'
          ? 'キーワードで検索'
          : mode === 'isbn'
            ? 'ISBN コードで検索'
            : mode === 'barcode'
              ? 'バーコードから読み取る'
              : '本を検索'}
      </DrawerTitle>
      {mode === 'keyword' || mode === 'isbn' ? (
        <div className="mx-auto mt-2 flex w-full max-w-lg flex-col gap-4 px-4">
          <SearchKeywordInput />
        </div>
      ) : null}
    </DrawerHeader>
  );
});

/** @ignore */
const SearchDrawerMain = memo(() => {
  const mode = useStore(bookScreenNewSearchStore.drawerMode);

  return (
    <DrawerMain
      smoothResizer={
        mode === 'keyword' || mode === 'isbn'
          ? { calcHeight: (rect) => Math.min(rect.height, window.innerHeight) }
          : false
      }
      outerProps={{
        className: cn(mode === 'barcode' ? 'flex flex-col' : null),
      }}
      innerProps={{
        className: cn(
          'scroll-hidden m-auto justify-center',
          mode === 'keyword' || mode === 'isbn' ? 'pt-28' : null,
          mode === 'barcode' ? 'pt-0 overflow-hidden' : null,
        ),
      }}
    >
      {mode === 'keyword' || mode === 'isbn' ? <SearchResultList /> : null}
      {mode === 'keyword' || mode === 'isbn' ? <SearchSubmitButton /> : null}
      {mode === 'barcode' ? <SearchBarcodeScanner /> : null}
    </DrawerMain>
  );
});

/** @ignore */
const SearchKeywordInput = memo(() => {
  const keyword = useStore(bookScreenNewSearchStore.list.input.keyword);
  const isFetching = useStore(bookScreenNewSearchStore.list.isFetching);

  return (
    <Input
      name="keyword"
      type="text"
      value={keyword}
      placeholder="タイトル、著者名などで検索..."
      disabled={isFetching}
      className="bg-card"
      onChange={(e) =>
        bookScreenNewSearchStore.list.input.keyword.set(e.target.value)
      }
    />
  );
});

/** @ignore */
const SearchBarcodeScanner = memo(() => {
  const [fetching, setFetching] = useState(false);

  const onScan = fetching
    ? () => {}
    : (results: IDetectedBarcode[]) =>
        onScanSearchBarcode({ results, setFetching });

  function onError() {
    toast.error('バーコードの読み取りできません。');
  }

  return (
    // 100vh にしているが、実際には画面いっぱいになるだけ
    <div className="relative mx-4 flex h-[100vh] flex-col overflow-hidden rounded-2xl bg-black">
      <Scanner
        formats={['ean_13']}
        sound={false}
        components={{
          finder: false,
        }}
        scanDelay={240}
        styles={{
          container: {
            background: 'black',
          },
          video: {
            background: 'black',
          },
        }}
        onScan={onScan}
        onError={onError}
      >
        <div className="pointer-events-none relative top-1/2 left-1/2 z-10 flex size-full h-[128px] w-[280px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-lg border-2 border-white/50 shadow-[0_0_0_1000px_rgba(0,0,0,0.6)]">
          <div className="absolute -top-4 -left-4 h-8 w-8 border-t-2 border-l-2 border-white/50" />
          <div className="absolute -top-4 -right-4 h-8 w-8 border-t-2 border-r-2 border-white/50" />
          <div className="absolute -bottom-4 -left-4 h-8 w-8 border-b-2 border-l-2 border-white/50" />
          <div className="absolute -right-4 -bottom-4 h-8 w-8 border-r-2 border-b-2 border-white/50" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-8 text-sm font-bold [letter-spacing:0.2em] whitespace-nowrap text-white/50">
            978----------
          </div>
          <div
            className={cn(
              'absolute inset-0 flex items-center justify-center bg-black/50 fade-transition',
              fetching ? 'opacity-100' : 'opacity-0',
            )}
          >
            <Loader2Icon className="text-white" />
          </div>
        </div>
      </Scanner>
    </div>
  );
});

/** @ignore */
async function onScanSearchBarcode(props: {
  results: IDetectedBarcode[];
  setFetching: (fetching: boolean) => void;
}) {
  const { results, setFetching } = props;

  let isbn: string | null = null;
  for (let i = 0, length = results.length; i < length; i++) {
    const result = results[i];
    if (!result) continue;

    const code = result.rawValue;
    const isbnResult = safeParse(isbnSchema, code);
    if (!isbnResult.success) continue;

    isbn = isbnResult.output;
    break;
  }

  if (!isbn) return;
  try {
    setFetching(true);
    const response = await server.api.ndl.books.isbn.$get({
      query: { value: isbn },
    });

    if (!response.ok) throw new Error();
    const item = (await response.json()).item;

    // 本が１つも見つからない場合
    if (!item) {
      setFetching(false);
      toast.error('本が見つかりませんでした。');
      bookScreenNewSearchStore.isOpenDrawer.set(false);
      return;
    }

    bookScreenNewSearchStore.isOpenDrawer.set(false);
    bookScreenNewSearchStore.isConfirmed.set(true);
    bookScreenStore.dataset.setDataFromNDLSearchItem(item);

    // ↓ エラーが発生した場合はトーストを表示する
  } catch {
    setFetching(false);
    toast.error('本の情報を取得できませんでした。');
  }
}

/** @ignore */
const SearchSubmitButton = memo(() => {
  const data = useStore(bookScreenNewSearchStore.list.data);
  const error = useStore(bookScreenNewSearchStore.list.error);
  const isFetching = useStore(bookScreenNewSearchStore.list.isFetching);

  const hasLoaded = data !== undefined || error !== undefined;
  return (
    <div className="relative size-full px-4">
      <HapticButton
        className={cn(
          'w-full opacity-100 fade-transition',
          hasLoaded ? 'pointer-events-none absolute inset-0 !opacity-0' : null,
        )}
        type="submit"
        disabled={isFetching}
      >
        {isFetching ? <Loader2Icon className="animate-spin" /> : '検索する'}
      </HapticButton>
    </div>
  );
});

/** @ignore */
const SearchResultList = memo(() => {
  const data = useStore(bookScreenNewSearchStore.list.data);
  const error = useStore(bookScreenNewSearchStore.list.error);
  const isFetching = useStore(bookScreenNewSearchStore.list.isFetching);
  const isMoreFetching = useStore(bookScreenNewSearchStore.list.isMoreFetching);

  const hasLoaded = data !== undefined || error !== undefined;
  return (
    <div
      className={cn(
        'px-4 pb-4 opacity-100 fade-transition',
        hasLoaded ? null : 'pointer-events-none absolute inset-0 !opacity-0',
        isFetching && !isMoreFetching ? 'animate-pulse' : null,
      )}
    >
      {error ? (
        <Alert variant="destructive">
          <AlertCircleIcon className="h-4 w-4" />
          <AlertTitle>エラー</AlertTitle>
          <AlertDescription>本の情報を取得できませんでした。</AlertDescription>
        </Alert>
      ) : data ? (
        data.length > 0 ? (
          <div className="flex flex-col gap-4">
            {data.map((item, index) => (
              <SearchResultListItem key={index} item={item} />
            ))}
            <SearchResultMoreLoader />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed border-input bg-card p-8">
            <InfoIcon className="size-12 text-muted-foreground/60" />
            <p className="text-center text-muted-foreground">
              本が見つかりませんでした
            </p>
          </div>
        )
      ) : null}
    </div>
  );
});

/** @ignore */
type SearchResultListItemType = NonNullable<
  StoreValue<typeof bookScreenNewSearchStore.list.data>
>[number];

/** @ignore */
const SearchResultListItem = memo(
  ({ item }: { item: SearchResultListItemType }) => {
    if (!item) return null;
    return (
      <div
        className="group relative flex flex-nowrap gap-4 overflow-hidden rounded-xl border bg-card p-4 py-6 text-card-foreground shadow-sm transition-all active:scale-95"
        onClick={() => {
          bookScreenNewSearchStore.isOpenDrawer.set(false);
          bookScreenNewSearchStore.isConfirmed.set(true);
          bookScreenStore.dataset.setDataFromNDLSearchItem(item);
        }}
      >
        <div className="my-auto w-[24%] flex-shrink-0">
          <Book
            name={item.title}
            image={item.thumbnailUrl}
            scalable={false}
            fallback
          />
        </div>
        <div className="flex flex-1 flex-col">
          <h3 className="mb-1 line-clamp-2 font-bold md:text-lg">
            {item.title}
          </h3>
          {item.authors ? (
            <div className="mb-1 text-xs text-gray-600 md:mb-2 md:text-sm">
              {item.authors}
            </div>
          ) : null}
          {item.categories ? (
            <div className="mt-auto ml-auto scrollbar-hidden flex flex-wrap gap-2 overflow-x-scroll">
              {item.categories.map((category) => (
                <Badge key={category} className="rounded-full">
                  {category.trim()}
                </Badge>
              ))}
            </div>
          ) : null}
        </div>
        <div className="pointer-events-none absolute inset-0 z-10 transition-all duration-[240ms] ease-in-out group-hover:bg-primary/24 group-active:bg-primary/24"></div>
      </div>
    );
  },
);

/** @ignore */
const SearchResultMoreLoader = memo(() => {
  const ref = useRef<HTMLDivElement>(null);
  const isMoreFetching = useStore(bookScreenNewSearchStore.list.isMoreFetching);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) =>
          entry.isIntersecting ? bookScreenNewSearchStore.list.update() : null,
        );
      },
      { threshold: 0.5 },
    );

    if (ref.current) observer.observe(ref.current);
    // eslint-disable-next-line jsdoc/require-jsdoc
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="flex flex-col items-center justify-center">
      {isMoreFetching ? (
        <Loader2Icon className="size-8 animate-spin text-muted-foreground/60" />
      ) : null}
    </div>
  );
});
