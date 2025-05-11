/** @jsxImportSource react */

import { useStore } from '@nanostores/react';
import { bookScreenStore } from '../../_components/book-screen/BookScreen.state';
import { LayoutSubheader } from '../../../_layouts/header/LayoutSubheader.react';
import { useHydration } from '../../../../hooks/hydrate';
import {
  DropdownMenuContent,
  DropdownMenuItem,
} from '@libs/shadcn/components/ui/dropdown-menu';
import { DropdownMenuTrigger } from '@libs/shadcn/components/ui/dropdown-menu';
import { DropdownMenu } from '@libs/shadcn/components/ui/dropdown-menu';
import { HapticButton } from '../../../../components/button/HapticButton.react';
import { EllipsisIcon } from 'lucide-react';
import type React from 'react';

/**
 * @jsx
 */
export function BookDetailsSubheader(props: { chatGPTLogo?: React.ReactNode }) {
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
      rightButton={
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <HapticButton
              variant="ghost"
              size="icon"
              className="-mr-1.5 rounded-full"
            >
              <EllipsisIcon className="size-4" />
            </HapticButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            <DropdownMenuItem>
              <HapticButton variant="ghost" size="sm">
                <span className="mr-1 size-4">{props.chatGPTLogo}</span>
                <span>ChatGPT に聞く</span>
              </HapticButton>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      }
    />
  );
}
