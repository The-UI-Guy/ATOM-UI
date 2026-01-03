import { ReactNode } from 'react';

/**
 * Alert intent - controls the color scheme
 */
export type AlertIntent = 'default' | 'success' | 'warning' | 'error';

/**
 * Alert orientation - controls the layout direction
 */
export type AlertOrientation = 'vertical' | 'horizontal';

/**
 * Alert component props
 */
export interface AlertProps {
  /**
   * The color scheme of the alert
   * @default 'default'
   */
  intent?: AlertIntent;

  /**
   * Layout direction
   * @default 'vertical'
   */
  orientation?: AlertOrientation;

  /**
   * Alert title (required)
   */
  title: string;

  /**
   * Alert description text
   */
  description?: string;

  /**
   * Custom content (replaces description if provided)
   */
  children?: ReactNode;

  /**
   * Custom icon (auto-selects based on intent if not provided)
   */
  icon?: ReactNode;

  /**
   * Show or hide the icon
   * @default true
   */
  showIcon?: boolean;

  /**
   * Show the X close button
   * @default false
   */
  closable?: boolean;

  /**
   * Called when X button clicked or timer expires
   */
  onClose?: () => void;

  /**
   * Auto-dismiss after X seconds (shows progress bar)
   */
  timer?: number;

  /**
   * Secondary (cancel) button label
   */
  cancelLabel?: string;

  /**
   * Secondary (cancel) button callback
   */
  onCancel?: () => void;

  /**
   * Primary (confirm) button label
   */
  confirmLabel?: string;

  /**
   * Primary (confirm) button callback
   */
  onConfirm?: () => void;

  /**
   * Additional CSS classes
   */
  className?: string;
}
