/** @jsxImportSource react */

import { cn } from '@libs/shadcn/lib/utils';
import React from 'react';

/**
 * アコーディオンのコンテンツを表示するコンポーネントのプロパティ。
 */
export interface AccordionProps {
  /**
   * 開閉状態を制御する場合に使用する値
   */
  open?: boolean;

  /**
   * パネル要素に渡すプロパティ
   */
  outerProps?: React.JSX.IntrinsicElements['div'];

  /**
   * パネル内コンテンツ要素に渡すプロパティ
   */
  innerProps?: React.JSX.IntrinsicElements['div'];

  /**
   * 開閉するコンテンツ
   */
  children: React.ReactNode;
}

/**
 * アコーディオンのコンテンツを表示するコンポーネント。
 *
 * @jsx
 */
export function SimpleAccordionContent({
  open,
  children,
  outerProps = {},
  innerProps = {},
}: AccordionProps) {
  return (
    <div
      {...outerProps}
      className={cn(
        'grid transition-[grid-template-rows] duration-300 ease-in-out',
        open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
        outerProps.className,
      )}
    >
      <div
        {...innerProps}
        className={cn('overflow-hidden', innerProps.className)}
      >
        {children}
      </div>
    </div>
  );
}
