import React, { useEffect, useState } from 'react';
import { Info, CheckCircle, Warning, XCircle, X } from '@phosphor-icons/react';
import { Button } from '../Button';
import type { AlertProps, AlertIntent, AlertPosition } from './Alert.types';

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
export const Alert = ({
  intent = 'default',
  orientation = 'vertical',
  position = 'inline',
  title,
  description,
  children,
  icon,
  showIcon = true,
  closable = false,
  onClose,
  timer,
  loopTimer = false,
  cancelLabel,
  onCancel,
  confirmLabel,
  onConfirm,
  className = '',
}: AlertProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  // Handle timer auto-dismiss (only if not looping)
  useEffect(() => {
    if (timer && !isPaused && !loopTimer) {
      const timeout = setTimeout(() => {
        setIsVisible(false);
        onClose?.();
      }, timer * 1000);

      return () => clearTimeout(timeout);
    }
  }, [timer, isPaused, loopTimer, onClose]);

  // Don't render if not visible
  if (!isVisible) return null;

  // Determine the icon to display
  const displayIcon = icon || getDefaultIcon(intent);

  // ==========================================
  // INTENT STYLES
  // Controls colors based on alert type
  // ==========================================
  const intentStyles: Record<AlertIntent, { 
    container: string; 
    icon: string; 
    progress: string;
    buttonBg: string;
    buttonHover: string;
    buttonBorder: string;
  }> = {
    default: {
      container: 'bg-atom-surface-1 border-atom-border-secondary',
      icon: 'text-atom-text-secondary',
      progress: 'bg-atom-primary-main',
      buttonBg: '', // Uses default primary button
      buttonHover: '',
      buttonBorder: '',
    },
    success: {
      container: 'bg-atom-surface-1 border-atom-success-main',
      icon: 'text-atom-success-main',
      progress: 'bg-atom-success-main',
      buttonBg: 'bg-atom-success-main',
      buttonHover: 'hover:bg-atom-success-tint1',
      buttonBorder: 'border border-atom-success-tint2',
    },
    warning: {
      container: 'bg-atom-surface-1 border-atom-warning-main',
      icon: 'text-atom-warning-main',
      progress: 'bg-atom-warning-main',
      buttonBg: 'bg-atom-warning-main',
      buttonHover: 'hover:bg-atom-warning-tint1',
      buttonBorder: 'border border-atom-warning-tint2',
    },
    error: {
      container: 'bg-atom-surface-1 border-atom-error-main',
      icon: 'text-atom-error-main',
      progress: 'bg-atom-error-main',
      buttonBg: '', // Uses destructive button variant
      buttonHover: '',
      buttonBorder: '',
    },
  };

  // ==========================================
  // POSITION STYLES
  // Controls fixed positioning for toast-style alerts
  // ==========================================
  const getPositionStyles = (): React.CSSProperties => {
    const baseFixed: React.CSSProperties = {
      position: 'fixed',
      zIndex: 9999,
      width: 'auto',
      maxWidth: '384px',
    };

    switch (position) {
      case 'top-left':
        return { ...baseFixed, top: '16px', left: '16px' };
      case 'top-right':
        return { ...baseFixed, top: '16px', right: '16px' };
      case 'bottom-left':
        return { ...baseFixed, bottom: '16px', left: '16px' };
      case 'bottom-right':
        return { ...baseFixed, bottom: '16px', right: '16px' };
      default:
        return {};
    }
  };

  // ==========================================
  // HANDLE CLOSE
  // ==========================================
  const handleClose = () => {
    setIsVisible(false);
    onClose?.();
  };

  // ==========================================
  // DETERMINE CONFIRM BUTTON STYLES
  // ==========================================
  const getConfirmButtonProps = () => {
    // Error uses destructive variant
    if (intent === 'error') {
      return { variant: 'destructive' as const, className: '' };
    }
    // Success and warning use primary variant with intent-colored background and border
    if (intent === 'success' || intent === 'warning') {
      return { 
        variant: 'primary' as const, 
        className: `${intentStyles[intent].buttonBg} ${intentStyles[intent].buttonHover} ${intentStyles[intent].buttonBorder}` 
      };
    }
    // Default uses standard primary
    return { variant: 'primary' as const, className: '' };
  };

  // ==========================================
  // LAYOUT HELPERS
  // ==========================================
  const isHorizontal = orientation === 'horizontal';
  const isPositioned = position !== 'inline';

  // ==========================================
  // RENDER
  // ==========================================
  return (
    <div
      className={`
        ${isPositioned ? '' : 'relative'} overflow-hidden
        flex flex-row ${isHorizontal ? 'items-center' : 'items-start'}
        border rounded-atom-lg shadow-atom-depth-4
        p-atom-2 gap-3 font-atom
        ${intentStyles[intent].container}
        ${className}
      `}
      style={getPositionStyles()}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      role="alert"
    >
      {/* Icon - Always on the left */}
      {showIcon && (
        <div className={`flex-shrink-0 ${intentStyles[intent].icon}`}>
          {displayIcon}
        </div>
      )}

      {/* Content Area - Flexible middle section */}
      <div className={`flex flex-1 min-w-0 ${isHorizontal ? 'flex-row items-center gap-4' : 'flex-col gap-1'}`}>
        {/* Title & Description */}
        <div className={`flex ${isHorizontal ? 'flex-row items-center gap-2 flex-1' : 'flex-col gap-1'}`}>
          <h4 className="font-atom-semibold text-atom-text-primary text-sm">
            {title}
          </h4>
          {description && !children && (
            <p className="text-atom-text-secondary font-atom-regular text-sm">
              {description}
            </p>
          )}
          {children && (
            <div className="text-atom-text-secondary font-atom-regular text-sm">
              {children}
            </div>
          )}
        </div>

        {/* Button Group */}
        {(cancelLabel || confirmLabel) && (
          <div className={`flex flex-row gap-2 ${isHorizontal ? '' : 'mt-3'}`}>
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
                {...getConfirmButtonProps()}
                size="sm"
                onClick={onConfirm}
              >
                {confirmLabel}
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Close Button - Always on the right */}
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
              animation: isPaused ? 'none' : `grow ${timer}s linear ${loopTimer ? 'infinite' : 'forwards'}`,
              animationPlayState: isPaused ? 'paused' : 'running',
            }}
          />
        </div>
      )}

      {/* Keyframes for progress bar animation */}
      <style>{`
        @keyframes grow {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  );
};

Alert.displayName = 'Alert';