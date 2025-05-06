/** @jsxImportSource react */

import { Button } from '@libs/shadcn/components/ui/button';
import { cn } from '@libs/shadcn/lib/utils';
import { vibrate, type VibrationToken } from '../../utils/vibration';

/** @ignore */
type ButtonProps = React.ComponentProps<typeof Button>;

/** @ignore */
const hapticButtonVariant = {
  default: 'active:bg-primary/90',
  destructive: 'active:bg-destructive/90',
  outline: 'active:bg-accent dark:active:bg-accent/50',
  secondary: 'active:bg-secondary/80',
  ghost:
    'active:bg-accent active:text-accent-foreground dark:active:bg-accent/50',
  link: 'active:underline',

  // Custom Variants
  success:
    'bg-success text-white shadow-xs hover:bg-success/90 active:bg-success/90 focus-visible:ring-success/20 dark:bg-success/60 dark:focus-visible:ring-success/40',
  muted:
    'bg-muted text-muted-foreground shadow-xs hover:bg-muted/90 active:bg-muted/90 focus-visible:ring-muted/20 dark:bg-muted/60 dark:focus-visible:ring-muted/40',
} satisfies Record<
  NonNullable<ButtonProps['variant']> | 'success' | 'muted',
  string
>;

/**
 * @jsx
 */
export function HapticButton({
  className,
  variant,
  scalable,
  vibration,
  onClick,
  ...props
}: Omit<React.ComponentProps<typeof Button>, 'variant'> & {
  scalable?: boolean;
  vibration?: VibrationToken | null;
  variant?: keyof typeof hapticButtonVariant;
}) {
  return (
    <Button
      {...props}
      className={cn(
        'cursor-pointer',
        scalable === false ? null : 'active:scale-[96%]',
        hapticButtonVariant[variant || 'default'],
        className,
      )}
      variant={
        variant === 'success' || variant === 'muted' ? 'default' : variant
      }
      onClick={(e) => {
        if (vibration) vibrate(vibration);
        onClick?.(e);
      }}
    />
  );
}
