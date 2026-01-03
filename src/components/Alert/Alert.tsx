import { useEffect, useState } from 'react';
import { Info, CheckCircle, Warning, XCircle, X } from '@phosphor-icons/react';
import { Button } from '../Button';
import type { AlertProps, AlertIntent } from './Alert.types';

/**
 * Get the default icon based on intent
 */
const getDefaultIcon = (intent: AlertIntent, size: number = 24) => {
  const icons = {
    default: <Info size={size} />,
    success: <CheckCircle size={size} />,
    warning: <Warning size={size} />,
    error: <XCircle size={size} />,
  };
  return icons[intent];
};

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
 * // With timer and buttons
 * <Alert 
 *   intent="success" 
 *   title="1000 contacts uploaded"
 *   timer={10}
 *   cancelLabel="Revert"
 *   onCancel={() => handleRevert()}
 *   onClose={() => removeAlert()}
 * />
 */
export const Alert = ({
  intent = 'default',
  orientation = 'vertical',
  title,
  description,
  children,
  icon,
  showIcon = true,
  closable = false,
  onClose,
  timer,
  cancelLabel,
  onCancel,
  confirmLabel,
  onConfirm,
  className = '',
}: AlertProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  // Handle timer auto-dismiss
  useEffect(() => {
    if (timer && !isPaused) {
      const timeout = setTimeout(() => {
        setIsVisible(false);
        onClose?.();
      }, timer * 1000);

      return () => clearTimeout(timeout);
    }
  }, [timer, isPaused, onClose]);

  // Don't render if not visible
  if (!isVisible) return null;

  // Determine the icon to display
  const displayIcon = icon || getDefaultIcon(intent);

  // ==========================================
  // INTENT STYLES
  // Controls colors based on alert type
  // ==========================================
  const intentStyles: Record<AlertIntent, { container: string; icon: string; progress: string }> = {
    default: {
      container: 'bg-atom-surface-1 border-atom-border-primary',
      icon: 'text-atom-text-secondary',
      progress: 'bg-atom-primary-main',
    },
    success: {
      container: 'bg-atom-surface-1 border-atom-border-primary',
      icon: 'text-atom-success-main',
      progress: 'bg-atom-success-main',
    },
    warning: {
      container: 'bg-atom-surface-1 border-atom-border-primary',
      icon: 'text-atom-warning-main',
      progress: 'bg-atom-warning-main',
    },
    error: {
      container: 'bg-atom-surface-1 border-atom-border-primary',
      icon: 'text-atom-error-main',
      progress: 'bg-atom-error-main',
    },
  };

  // ==========================================
  // LAYOUT STYLES
  // Controls layout based on orientation
  // ==========================================
  const isHorizontal = orientation === 'horizontal';

  const containerLayout = isHorizontal
    ? 'flex-row items-center'
    : 'flex-col';

  const contentLayout = isHorizontal
    ? 'flex-row items-center gap-4 flex-1'
    : 'flex-col gap-1';

  const buttonLayout = isHorizontal
    ? 'flex-row'
    : 'flex-row mt-3';

  // ==========================================
  // HANDLE CLOSE
  // ==========================================
  const handleClose = () => {
    setIsVisible(false);
    onClose?.();
  };

  // ==========================================
  // DETERMINE CONFIRM BUTTON VARIANT
  // ==========================================
  const getConfirmButtonVariant = () => {
    if (intent === 'error') return 'destructive';
    return 'primary';
  };

  // ==========================================
  // RENDER
  // ==========================================
  return (
    <div
      className={`
        relative overflow-hidden
        flex ${containerLayout}
        border rounded-atom-lg shadow-atom-depth-1
        p-4 gap-3 border-md rounded-atom-md
        ${intentStyles[intent].container}
        ${className}
      `}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      role="alert"
    >
      {/* Icon */}
      {showIcon && (
        <div className={`flex-shrink-0 ${intentStyles[intent].icon}`}>
          {displayIcon}
        </div>
      )}

      {/* Content Area */}
      <div className={`flex ${contentLayout} min-w-0 flex-1`}>
        {/* Title & Description */}
        <div className={`flex flex-col gap-1 ${isHorizontal ? 'flex-1' : ''}`}>
          <h4 className="font-semibold text-atom-text-primary text-sm">
            {title}
          </h4>
          {description && !children && (
            <p className="text-atom-text-secondary text-sm">
              {description}
            </p>
          )}
          {children && (
            <div className="text-atom-text-secondary text-sm">
              {children}
            </div>
          )}
        </div>

        {/* Button Group */}
        {(cancelLabel || confirmLabel) && (
          <div className={`flex ${buttonLayout} gap-2`}>
            {cancelLabel && (
              <Button
                variant="outline"
                size="sm"
                onClick={onCancel}
              >
                {cancelLabel}
              </Button>
            )}
            {confirmLabel && (
              <Button
                variant={getConfirmButtonVariant()}
                size="sm"
                onClick={onConfirm}
              >
                {confirmLabel}
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Close Button */}
      {closable && (
        <button
          onClick={handleClose}
          className="flex-shrink-0 p-1 rounded hover:bg-atom-neutral-one transition-colors text-atom-text-tertiary hover:text-atom-text-primary"
          aria-label="Close alert"
        >
          <X size={18} />
        </button>
      )}

      {/* Timer Progress Bar */}
      {timer && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-atom-neutral-one">
          <div
            className={`h-full ${intentStyles[intent].progress}`}
            style={{
              animation: isPaused ? 'none' : `shrink ${timer}s linear forwards`,
              animationPlayState: isPaused ? 'paused' : 'running',
            }}
          />
        </div>
      )}

      {/* Keyframes for progress bar animation */}
      <style>{`
        @keyframes shrink {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </div>
  );
};

Alert.displayName = 'Alert';
