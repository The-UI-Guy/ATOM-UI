import { useState } from 'react';
import { Check } from '@phosphor-icons/react';
import { useStepContext } from './StepperContext';
import type { StepProps } from './Step.types';

const FONT = 'var(--atom-font-family)';

function borderColor(stage: 'complete' | 'in-progress' | 'empty') {
  if (stage === 'complete') return 'var(--atom-success-main)';
  return 'var(--atom-border-primary)';
}

export const Step = ({ label, subLabel, children }: StepProps) => {
  const { index, stage, orientation, onStepClick } = useStepContext();
  const [hovered, setHovered] = useState(false);

  const isClickable = stage === 'complete' && !!onStepClick;
  const color = borderColor(stage);

  const outerStyle: React.CSSProperties =
    orientation === 'horizontal'
      ? {
          flex: 1,
          borderBottom: `1px solid ${color}`,
          paddingTop: 4,
          paddingBottom: 4,
          paddingLeft: 16,
          paddingRight: 16,
          display: 'flex',
          alignItems: 'flex-start',
          flexShrink: 0,
        }
      : {
          width: '100%',
          borderRight: `1px solid ${color}`,
          paddingTop: 4,
          paddingBottom: 16,
          paddingLeft: 8,
          paddingRight: 8,
          display: 'flex',
          alignItems: 'flex-start',
        };

  const circleStyle: React.CSSProperties = {
    width: 24,
    height: 24,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    backgroundColor:
      stage === 'complete'
        ? 'var(--atom-success-main)'
        : stage === 'in-progress'
        ? 'var(--atom-primary-main)'
        : 'var(--atom-neutral-one)',
  };

  return (
    <div style={outerStyle}>
      <div
        style={{
          display: 'flex',
          gap: 8,
          alignItems: 'center',
          padding: '4px 8px',
          borderRadius: 8,
          cursor: isClickable ? 'pointer' : 'default',
          backgroundColor:
            hovered && isClickable ? 'var(--atom-halo-primary)' : 'transparent',
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={isClickable ? () => onStepClick!(index) : undefined}
      >
        {/* Step circle */}
        <div style={circleStyle}>
          {stage === 'complete' ? (
            <Check size={12} weight="bold" color="white" />
          ) : (
            <span
              style={{
                fontSize: 12,
                fontWeight: 500,
                lineHeight: '16px',
                fontFamily: FONT,
                color:
                  stage === 'empty'
                    ? 'var(--atom-text-tertiary)'
                    : 'var(--atom-primary-contrast)',
              }}
            >
              {index + 1}
            </span>
          )}
        </div>

        {/* Labels */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span
              style={{
                fontSize: 14,
                fontWeight: 500,
                lineHeight: '20px',
                fontFamily: FONT,
                whiteSpace: 'nowrap',
                color:
                  stage === 'empty'
                    ? 'var(--atom-text-tertiary)'
                    : 'var(--atom-text-primary)',
              }}
            >
              {label}
            </span>
            {children}
          </div>
          {subLabel && (
            <span
              style={{
                fontSize: 12,
                fontWeight: 500,
                lineHeight: '16px',
                fontFamily: FONT,
                whiteSpace: 'nowrap',
                color: 'var(--atom-text-tertiary)',
              }}
            >
              {subLabel}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

Step.displayName = 'Step';
