/** @jsxImportSource react */

import { PlusIcon } from 'lucide-react';
import { HapticButton } from '../../../../../components/button/HapticButton.react';

/**
 * @jsx
 */
export function BookDetailsPhraseList(props: {
  chatGPTLogo?: React.ReactNode;
}) {
  return (
    <div className="flex grow flex-col">
      <HapticButton
        className="relative flex h-28 w-full flex-col items-center justify-center border border-dashed"
        variant="secondary"
      >
        <PlusIcon className="size-8 text-secondary-foreground" />
        <span className="font-bold text-secondary-foreground">
          フレーズを追加
        </span>
      </HapticButton>

      <div className="mt-auto">
        <HapticButton
          className="relative w-full bg-black text-white dark:bg-white dark:text-black"
          size="lg"
        >
          <span className="absolute left-4 size-5">{props.chatGPTLogo}</span>
          <div>ChatGPT に聞く</div>
        </HapticButton>
      </div>
    </div>
  );
}
