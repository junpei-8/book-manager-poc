import { useStore } from '@nanostores/react';
import { bookScreenStore } from '../BookScreen.state';
import { memo } from 'react';
import { cn } from '@libs/shadcn/lib/utils';
import { Badge } from '@libs/shadcn/components/ui/badge';

/**
 * @jsx
 */
export function BookScreenContentDetails(props: { className?: string }) {
  const data = useStore(bookScreenStore.dataset.data);

  return (
    <div className={cn('flex w-full flex-col gap-2', props.className)}>
      {data ? (
        <div className="mx-auto flex w-full max-w-[240px] flex-col pb-2 sm:max-w-[320px] lg:max-w-[400px]">
          <h3 className="mb-1 font-bold md:text-lg">{data.title}</h3>
          {data.authors ? (
            <div className="mb-1 text-xs text-gray-600 md:mb-2 md:text-sm">
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
}
