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
      className="absolute right-3 rounded-full"
      onClick={() => window.history.back()}
    >
      <XIcon className="size-4" />
    </HapticButton>
  );
}
