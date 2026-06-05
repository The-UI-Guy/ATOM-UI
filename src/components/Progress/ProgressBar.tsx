import { useState, useEffect } from 'react';
import type { ProgressBarProps } from './ProgressBar.types';

const EASING = 'cubic-bezier(0.16, 1, 0.3, 1)';

export const ProgressBar = ({ value, label, showDescription = false }: ProgressBarProps) => {
  const clamped = Math.min(100, Math.max(0, value));
  const [ready, setReady] = useState(false);

  // Double rAF ensures the browser has painted the initial 0-width state
  // before the transition begins, giving a clean mount animation every time.
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      const id2 = requestAnimationFrame(() => setReady(true));
      return () => cancelAnimationFrame(id2);
    });
    return () => cancelAnimationFrame(id);
  }, []);

  const displayWidth = ready ? clamped : 0;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        width: '100%',
      }}
    >
      {label && (
        <span
          style={{
            fontSize: 14,
            fontWeight: 500,
            lineHeight: '20px',
            color: 'var(--atom-text-primary)',
            fontFamily: 'var(--atom-font-family)',
          }}
        >
          {label}
        </span>
      )}

      <div
        style={{
          height: 8,
          borderRadius: 4,
          backgroundColor: 'var(--atom-neutral-one)',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: '0 auto 0 0',
            width: `${displayWidth}%`,
            backgroundColor: 'var(--atom-primary-main)',
            borderRadius: 4,
            transition: `width 0.65s ${EASING}`,
          }}
        />
      </div>

      {showDescription && (
        <span
          style={{
            fontSize: 12,
            fontWeight: 500,
            lineHeight: '16px',
            color: 'var(--atom-text-secondary)',
            fontFamily: 'var(--atom-font-family)',
          }}
        >
          {clamped}% complete
        </span>
      )}
    </div>
  );
};

ProgressBar.displayName = 'ProgressBar';
