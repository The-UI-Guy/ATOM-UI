import { useState, useRef, useEffect, cloneElement } from 'react';
import { Warning } from '@phosphor-icons/react';
import { Button } from '../Button/Button';
import type { ConfirmProps, ConfirmPosition } from './Confirm.types';

const ARROW_SIZE = 10;
const ARROW_HALF = ARROW_SIZE / 2;
const GAP = 10; // distance from trigger to bubble edge (includes arrow)

const BORDER = '1px solid var(--atom-border-primary)';

function arrowPositionStyle(position: ConfirmPosition): React.CSSProperties {
  const base: React.CSSProperties = {
    position: 'absolute',
    width: ARROW_SIZE,
    height: ARROW_SIZE,
    background: 'var(--atom-surface-1)',
    zIndex: 1,
  };
  switch (position) {
    case 'top':
      return { ...base, bottom: -ARROW_HALF - 1, left: '50%', transform: 'translateX(-50%) rotate(45deg)', borderRight: BORDER, borderBottom: BORDER };
    case 'bottom':
      return { ...base, top: -ARROW_HALF - 1, left: '50%', transform: 'translateX(-50%) rotate(45deg)', borderLeft: BORDER, borderTop: BORDER };
    case 'left':
      return { ...base, right: -ARROW_HALF - 1, top: '50%', transform: 'translateY(-50%) rotate(45deg)', borderTop: BORDER, borderRight: BORDER };
    case 'right':
      return { ...base, left: -ARROW_HALF - 1, top: '50%', transform: 'translateY(-50%) rotate(45deg)', borderBottom: BORDER, borderLeft: BORDER };
  }
}

function popoverPositionStyle(position: ConfirmPosition): React.CSSProperties {
  switch (position) {
    case 'top':    return { bottom: `calc(100% + ${GAP}px)`, left: '50%', transform: 'translateX(-50%)' };
    case 'bottom': return { top: `calc(100% + ${GAP}px)`, left: '50%', transform: 'translateX(-50%)' };
    case 'left':   return { right: `calc(100% + ${GAP}px)`, top: '50%', transform: 'translateY(-50%)' };
    case 'right':  return { left: `calc(100% + ${GAP}px)`, top: '50%', transform: 'translateY(-50%)' };
  }
}

export const Confirm = ({
  trigger,
  title,
  description,
  children,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  position = 'top',
  onConfirm,
  onCancel,
}: ConfirmProps) => {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleMouseDown = (e: MouseEvent) => {
      if (!wrapperRef.current?.contains(e.target as Node)) {
        setOpen(false);
        onCancel?.();
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        onCancel?.();
      }
    };
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, onCancel]);

  const handleConfirm = () => {
    setOpen(false);
    onConfirm();
  };

  const handleCancel = () => {
    setOpen(false);
    onCancel?.();
  };

  const triggerEl = cloneElement(trigger, {
    onClick: (e: React.MouseEvent) => {
      e.stopPropagation();
      setOpen(prev => !prev);
      trigger.props.onClick?.(e);
    },
  });

  return (
    <div ref={wrapperRef} style={{ position: 'relative', display: 'inline-block' }}>
      {triggerEl}
      {open && (
        <div
          role="dialog"
          aria-modal="false"
          style={{
            position: 'absolute',
            zIndex: 50,
            width: 260,
            ...popoverPositionStyle(position),
          }}
        >
          {/* Arrow */}
          <div style={arrowPositionStyle(position)} />

          {/* Bubble */}
          <div
            style={{
              background: 'var(--atom-surface-1)',
              border: BORDER,
              borderRadius: 'var(--atom-radius-md)',
              padding: 16,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 8,
              boxShadow: 'var(--atom-depth-4)',
              position: 'relative',
              textAlign: 'center',
            }}
          >
            <Warning size={20} weight="bold" color="var(--atom-text-tertiary)" />

            {/* Title + description grouped so they sit 4px apart */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  lineHeight: '20px',
                  color: 'var(--atom-text-primary)',
                  fontFamily: 'var(--atom-font-family)',
                }}
              >
                {title}
              </div>

              {description && (
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 400,
                    lineHeight: '20px',
                    color: 'var(--atom-text-secondary)',
                    fontFamily: 'var(--atom-font-family)',
                  }}
                >
                  {description}
                </div>
              )}
            </div>

            {children && (
              <div style={{ width: '100%' }}>{children}</div>
            )}

            <div style={{ display: 'flex', justifyContent: 'center', gap: 8 }}>
              <Button variant="outline" size="sm" onClick={handleCancel}>
                {cancelLabel}
              </Button>
              <Button variant="primary" size="sm" onClick={handleConfirm}>
                {confirmLabel}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

Confirm.displayName = 'Confirm';
