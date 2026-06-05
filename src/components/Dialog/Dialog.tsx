import { useEffect, useRef, useId } from 'react';
import { createPortal } from 'react-dom';
import { X } from '@phosphor-icons/react';
import { Button } from '../Button/Button';
import type { DialogProps } from './Dialog.types';

const FOCUSABLE_SELECTORS = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ');

const PANEL_WIDTHS: Record<string, number> = {
  sm: 400,
  md: 520,
  lg: 640,
  xl: 800,
};

export const Dialog = ({
  open,
  onClose,
  title,
  description,
  size = 'md',
  children,
  footer,
  actions,
  closeOnBackdrop = true,
  showClose = true,
  className = '',
}: DialogProps) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const uid = useId();
  const titleId = `dialog-title-${uid}`;
  const descId = `dialog-desc-${uid}`;

  useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;

    // Focus first focusable element in the panel
    requestAnimationFrame(() => {
      const first = panelRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS)[0];
      first?.focus();
    });

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      if (e.key !== 'Tab') return;

      const focusable = Array.from(
        panelRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS) ?? []
      );
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      previouslyFocused?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  const hasFooter = footer !== undefined || (actions && actions.length > 0);

  return createPortal(
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
      }}
    >
      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={closeOnBackdrop ? onClose : undefined}
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.45)',
        }}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descId : undefined}
        className={className}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: PANEL_WIDTHS[size],
          maxHeight: '85vh',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'var(--atom-surface-1)',
          border: '1px solid var(--atom-border-primary)',
          borderRadius: 'var(--atom-radius-lg)',
          boxShadow: '0 24px 48px rgba(0,0,0,0.12), 0 8px 16px rgba(0,0,0,0.07)',
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: 16,
            padding: '24px 24px 20px',
            borderBottom: '1px solid var(--atom-border-primary)',
            flexShrink: 0,
          }}
        >
          <div style={{ flex: 1, minWidth: 0 }}>
            <h2
              id={titleId}
              style={{
                margin: 0,
                fontSize: 16,
                fontWeight: 600,
                lineHeight: '24px',
                color: 'var(--atom-text-primary)',
                fontFamily: 'var(--atom-font-family)',
              }}
            >
              {title}
            </h2>
            {description && (
              <p
                id={descId}
                style={{
                  margin: '4px 0 0',
                  fontSize: 14,
                  lineHeight: '20px',
                  color: 'var(--atom-text-tertiary)',
                  fontFamily: 'var(--atom-font-family)',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                }}
              >
                {description}
              </p>
            )}
          </div>
          {showClose && (
            <Button variant="text" size="sm" iconOnly onClick={onClose} aria-label="Close">
              <X size={16} />
            </Button>
          )}
        </div>

        {/* Body */}
        {children && (
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '20px 24px',
              fontFamily: 'var(--atom-font-family)',
              fontSize: 14,
              lineHeight: '20px',
              color: 'var(--atom-text-secondary)',
            }}
          >
            {children}
          </div>
        )}

        {/* Footer */}
        {hasFooter && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: 8,
              padding: '16px 24px',
              borderTop: '1px solid var(--atom-border-primary)',
              flexShrink: 0,
            }}
          >
            {footer ??
              actions?.map((action, i) => (
                <Button
                  key={i}
                  variant={action.variant ?? 'outline'}
                  size="sm"
                  onClick={action.onClick}
                  loading={action.loading}
                  disabled={action.disabled}
                >
                  {action.label}
                </Button>
              ))}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};

Dialog.displayName = 'Dialog';
