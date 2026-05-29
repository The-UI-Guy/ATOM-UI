import { ReactNode } from 'react';
import type { ButtonVariant } from '../Button/Button.types';

export type DialogSize = 'sm' | 'md' | 'lg' | 'xl';

export interface DialogAction {
  label: string;
  variant?: ButtonVariant;
  onClick: () => void;
  loading?: boolean;
  disabled?: boolean;
}

export interface DialogProps {
  /** Whether the dialog is visible */
  open: boolean;
  /** Called when the dialog requests to be closed (Escape, backdrop click, X button) */
  onClose: () => void;
  /** Dialog heading */
  title: string;
  /** Optional supporting text below the title */
  description?: string;
  /** Controls the max-width of the panel */
  size?: DialogSize;
  /** Dialog body content */
  children?: ReactNode;
  /** Replaces the default footer entirely — use when you need custom layout */
  footer?: ReactNode;
  /** Convenience shorthand: renders a row of buttons in the footer */
  actions?: DialogAction[];
  /** Close when the backdrop is clicked. Default: true */
  closeOnBackdrop?: boolean;
  /** Show the × close button in the header. Default: true */
  showClose?: boolean;
  className?: string;
}
