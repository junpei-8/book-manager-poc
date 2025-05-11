import { XIcon } from 'lucide-react';
import { HapticButton } from '../../../components/button/HapticButton.react';

/**
 * @jsx
 */
export function LayoutSubheaderXButton() {
  return (
    <HapticButton
      variant="ghost"
      size="icon"
      className="-mr-1.5 rounded-full"
      onClick={() => window.history.back()}
    >
      <XIcon className="size-4" />
    </HapticButton>
  );
}
