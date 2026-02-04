import React from 'react';
import type { DividerProps, DividerSpacing } from './Divider.types';

/**
 * Divider Component
 * 
 * A horizontal divider line with configurable style, color, and padding.
 * 
 * @example
 * // Basic divider
 * <Divider />
 * 
 * @example
 * // Dashed divider with padding
 * <Divider type="dashed" paddingY="2" />
 * 
 * @example
 * // Custom padding on each side
 * <Divider paddingTop="4" paddingBottom="2" paddingX="1" />
 */
export const Divider = ({
  type = 'solid',
  color = 'primary',
  paddingTop,
  paddingBottom,
  paddingLeft,
  paddingRight,
  paddingY,
  paddingX,
  className = '',
}: DividerProps) => {

  // ==========================================
  // SPACING MAP
  // ==========================================
  const spacingMap: Record<DividerSpacing, string> = {
    'none': '0',
    'half': 'var(--atom-space-half)',
    '1': 'var(--atom-space-1)',
    '2': 'var(--atom-space-2)',
    '3': 'var(--atom-space-3)',
    '4': 'var(--atom-space-4)',
    '5': 'var(--atom-space-5)',
    '6': 'var(--atom-space-6)',
    '7': 'var(--atom-space-7)',
    '8': 'var(--atom-space-8)',
    '9': 'var(--atom-space-9)',
    '10': 'var(--atom-space-10)',
  };

  // ==========================================
  // COLOR MAP
  // ==========================================
  const colorMap: Record<string, string> = {
    'primary': 'var(--atom-border-primary)',
    'secondary': 'var(--atom-border-secondary)',
    'tertiary': 'var(--atom-border-tertiary)',
  };

  // ==========================================
  // CALCULATE PADDING
  // Individual values override shorthand
  // ==========================================
  const getPadding = (): React.CSSProperties => {
    const top = paddingTop ?? paddingY ?? 'none';
    const bottom = paddingBottom ?? paddingY ?? 'none';
    const left = paddingLeft ?? paddingX ?? 'none';
    const right = paddingRight ?? paddingX ?? 'none';

    return {
      paddingTop: spacingMap[top],
      paddingBottom: spacingMap[bottom],
      paddingLeft: spacingMap[left],
      paddingRight: spacingMap[right],
    };
  };

  // ==========================================
  // LINE STYLES
  // ==========================================
  const lineStyle: React.CSSProperties = {
    width: '100%',
    height: 0,
    borderTop: `1px ${type} ${colorMap[color]}`,
  };

  return (
    <div 
      className={className}
      style={getPadding()}
    >
      <hr 
        style={lineStyle}
        aria-hidden="true"
      />
    </div>
  );
};

Divider.displayName = 'Divider';
