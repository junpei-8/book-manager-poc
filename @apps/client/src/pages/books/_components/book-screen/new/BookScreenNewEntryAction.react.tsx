import { cn } from '@libs/shadcn/lib/utils';
import { useStore } from '@nanostores/react';
import { CheckIcon, XIcon } from 'lucide-react';
import { HapticButton } from '../../../../../components/button/HapticButton.react';
import { bookScreenStore } from '../BookScreen.state';

/**
 * @jsx
 */
export function BookScreenNewEntryAction() {
  const data = useStore(bookScreenStore.dataset.data);

  return (
    <div
      className={cn(
        'fixed right-0 bottom-4 left-0 z-[1] mx-auto flex w-full max-w-[400px] flex-nowrap gap-2 p-4',
        'transition-transform duration-[240ms] ease-in-out',
        data ? 'translate-y-0' : 'pointer-events-none translate-y-full',
      )}
    >
      <HapticButton
        variant="muted"
        className="h-9 w-9 shrink-0 rounded-full shadow-2xl"
        onClick={() => {
          if (!data) return;
          bookScreenStore.dataset.data.set(null);
        }}
      >
        <XIcon className="size-6" />
      </HapticButton>

      <HapticButton
        variant="secondary"
        className="grow rounded-full shadow-2xl"
        onClick={() => {
          if (!data) return;
          // bookScreenStore.dataset.data.set(null); // new book
        }}
      >
        <CheckIcon className="size-6" />
      </HapticButton>
    </div>
  );
}
