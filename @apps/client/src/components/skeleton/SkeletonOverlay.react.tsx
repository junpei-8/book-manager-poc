import { Skeleton } from '@libs/shadcn/components/ui/skeleton';
import { cn } from '@libs/shadcn/lib/utils';

/**
 * @jsx
 */
export function SkeletonOverlay({
  hidden,
  className,
  ...props
}: React.ComponentProps<typeof Skeleton>) {
  return (
    <Skeleton
      {...props}
      hidden={false}
      className={cn(
        'absolute inset-0 z-10 size-full opacity-1',
        hidden
          ? 'pointer-events-none animate-none opacity-0 fade-transition'
          : null,
        className,
      )}
    />
  );
}
