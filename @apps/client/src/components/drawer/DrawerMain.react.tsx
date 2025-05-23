/** @jsxImportSource react */

import { cn } from '@libs/shadcn/lib/utils';
import {
  SmoothResizingContainer,
  type SmoothResizingContainerProps,
} from '../container/SmoothResizingContainer.react';

/**
 * @jsx
 */
export type DrawerMainProps = {
  smoothResizer?:
    | boolean
    | Omit<
        SmoothResizingContainerProps,
        'direction' | 'disabled' | 'outerProps' | 'innerProps' | 'children'
      >;
  outerProps?: React.JSX.IntrinsicElements['div'];
  innerProps?: React.JSX.IntrinsicElements['div'];
  children?: React.ReactNode;
};

/**
 * @jsx
 *
 * NOTE: 現状は Vertical 方向しか考慮していない。
 */
export function DrawerMain({
  smoothResizer = false,
  outerProps = {},
  innerProps = {},
  children,
}: DrawerMainProps) {
  return (
    <SmoothResizingContainer
      {...(typeof smoothResizer === 'object' ? smoothResizer : void 0)}
      direction="vertical"
      disabled={!smoothResizer}
      outerProps={{
        ...outerProps,
        className: cn(
          'scrollbar-hidden duration-[320ms]',
          outerProps.className,
        ),
      }}
      innerProps={{
        ...innerProps,
        className: cn(
          'relative mx-auto max-w-lg py-4 group-data-[vaul-drawer-direction=bottom]/drawer-content:pb-8',
          smoothResizer ? null : 'h-full',
          innerProps.className,
        ),
      }}
    >
      {children}
    </SmoothResizingContainer>
  );
}
