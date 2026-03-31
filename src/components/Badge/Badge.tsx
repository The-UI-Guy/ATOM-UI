import type { BadgeProps, BadgeIntent } from './Badge.types';

/**
 * Badge Component
 * 
 * A small status indicator that can display a count or a simple dot.
 * 
 * @example
 * // Dot badge
 * <Badge type="dot" intent="success" />
 * 
 * @example
 * // Count badge
 * <Badge type="count" count={5} intent="error" />
 * 
 * @example
 * // Count with max
 * <Badge type="count" count={150} max={99} /> // Shows "99+"
 */
export const Badge = ({
  type = 'dot',
  intent = 'primary',
  count = 0,
  max = 99,
  showZero = false,
  className = '',
}: BadgeProps) => {

  // ==========================================
  // INTENT STYLES
  // ==========================================
  const intentStyles: Record<BadgeIntent, string> = {
    neutral: 'bg-atom-neutral-one text-atom-text-tertiary border border-atom-border-secondary',
    primary: 'bg-atom-primary-main text-atom-primary-contrast',
    success: 'bg-atom-success-main text-atom-success-contrast',
    warning: 'bg-atom-warning-main text-atom-warning-contrast',
    error: 'bg-atom-error-main text-atom-error-contrast',
  };

  // ==========================================
  // DOT BADGE
  // ==========================================
  if (type === 'dot') {
    return (
      <span
        className={`
          inline-block w-1 h-1 rounded-full
          ${intentStyles[intent]}
          ${className}
        `}
        role="status"
        aria-label="Status indicator"
      />
    );
  }

  // ==========================================
  // COUNT BADGE
  // ==========================================
  
  // Hide if count is 0 and showZero is false
  if (count === 0 && !showZero) {
    return null;
  }

  // Format display value
  const displayValue = count > max ? `${max}+` : count;

  return (
    <span
      className={`
        inline-flex items-center justify-center
        min-w-3 h-[20px] px-1
        text-xs font-atom-semibold
        rounded-full
        ${intentStyles[intent]}
        ${className}
      `}
      role="status"
      aria-label={`${count} notifications`}
    >
      {displayValue}
    </span>
  );
};

Badge.displayName = 'Badge';