import type { AlertProps } from './Alert.types';
/**
 * Alert Component
 *
 * A versatile alert component for displaying messages, confirmations, and notifications.
 *
 * @example
 * // Simple alert
 * <Alert intent="success" title="Upload complete" />
 *
 * @example
 * // Positioned alert (toast style)
 * <Alert
 *   intent="success"
 *   title="1000 contacts uploaded"
 *   position="bottom-right"
 *   timer={10}
 *   closable
 *   onClose={() => removeAlert()}
 * />
 */
export declare const Alert: {
    ({ intent, orientation, position, title, description, children, icon, showIcon, closable, onClose, timer, loopTimer, cancelLabel, onCancel, confirmLabel, onConfirm, className, }: AlertProps): import("react/jsx-runtime").JSX.Element | null;
    displayName: string;
};
