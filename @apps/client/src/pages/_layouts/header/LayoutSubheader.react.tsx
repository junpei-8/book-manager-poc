/** @jsxImportSource react */

import { cn } from '@libs/shadcn/lib/utils';
import { LayoutSubheaderXButton } from './LayoutSubheaderXButton.react';

/** @ignore */
type Props = React.JSX.IntrinsicElements['header'] & {
  title: string;
  h1Props?: React.JSX.IntrinsicElements['h1'];
};

/**
 * @jsx
 */
export function LayoutSubheader({
  title,
  className,
  h1Props = {},
  ...props
}: Props) {
  return (
    <header
      {...props}
      className={cn('fixed top-0 right-0 left-0 z-20', className)}
    >
      <h1
        {...h1Props}
        className={cn(
          'flex w-full py-4 text-center text-sm font-bold backdrop-blur-2xl',
          h1Props.className,
        )}
      >
        <span className="wrapper overflow-hidden px-16 text-ellipsis whitespace-nowrap">
          {title || 'Untitled'}
        </span>
      </h1>

      <div
        // Overlays
        className="absolute inset-0 wrapper flex size-full items-center justify-between"
      >
        <a href="/">
          <img src="/logo.png" alt="logo" className="size-8" />
        </a>
        <LayoutSubheaderXButton />
      </div>
    </header>
  );
}
