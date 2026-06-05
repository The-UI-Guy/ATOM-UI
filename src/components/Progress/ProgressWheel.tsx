import { useState, useEffect } from 'react';
import type { ProgressWheelProps } from './ProgressWheel.types';

const EASING = 'cubic-bezier(0.16, 1, 0.3, 1)';

export const ProgressWheel = ({ value, size = 48 }: ProgressWheelProps) => {
  const clamped = Math.min(100, Math.max(0, value));
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      const id2 = requestAnimationFrame(() => setReady(true));
      return () => cancelAnimationFrame(id2);
    });
    return () => cancelAnimationFrame(id);
  }, []);

  const strokeWidth = Math.max(3, Math.round(size * 0.083));
  const center = size / 2;
  const radius = center - strokeWidth / 2 - 1;
  const circumference = 2 * Math.PI * radius;
  const displayValue = ready ? clamped : 0;
  const offset = circumference * (1 - displayValue / 100);
  const fontSize = Math.round(size * 0.25);

  return (
    <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{ display: 'block' }}
      >
        {/* Track */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="var(--atom-neutral-one)"
          strokeWidth={strokeWidth}
        />
        {/* Progress arc */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="var(--atom-primary-main)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${center} ${center})`}
          style={{ transition: `stroke-dashoffset 1s ${EASING}` }}
        />
      </svg>

      {/* Centre label */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize,
          fontWeight: 500,
          lineHeight: 1,
          color: 'var(--atom-text-secondary)',
          fontFamily: 'var(--atom-font-family)',
          userSelect: 'none',
        }}
      >
        {clamped}%
      </div>
    </div>
  );
};

ProgressWheel.displayName = 'ProgressWheel';
