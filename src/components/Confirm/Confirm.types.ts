import type { ReactElement, ReactNode, MouseEvent } from 'react';

export type ConfirmPosition = 'top' | 'bottom' | 'left' | 'right';

export interface ConfirmProps {
  /** The element that opens the popover on click */
  trigger: ReactElement<{ onClick?: (e: MouseEvent) => void }>;
  /** Heading text */
  title: string;
  /** Supporting text below the title */
  description?: string;
  /** Optional content rendered between the description and the button row */
  children?: ReactNode;
  /** Label for the confirm button. Default: "Confirm" */
  confirmLabel?: string;
  /** Label for the cancel button. Default: "Cancel" */
  cancelLabel?: string;
  /** Where the popover appears relative to the trigger. Default: "top" */
  position?: ConfirmPosition;
  /** Called when the user clicks the confirm button */
  onConfirm: () => void;
  /** Called when the user cancels (cancel button or click-outside) */
  onCancel?: () => void;
}
