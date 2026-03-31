/**
 * Badge intent - controls the color scheme
 */
export type BadgeIntent = 'neutral' | 'primary' | 'success' | 'warning' | 'error';
/**
 * Badge type - dot or count
 */
export type BadgeType = 'dot' | 'count';
/**
 * Badge component props
 */
export interface BadgeProps {
    /**
     * Badge type
     * - 'dot': Small colored circle
     * - 'count': Shows a number
     * @default 'dot'
     */
    type?: BadgeType;
    /**
     * Color scheme of the badge
     * @default 'primary'
     */
    intent?: BadgeIntent;
    /**
     * Number to display (for type="count")
     */
    count?: number;
    /**
     * Maximum count to display (shows "99+" if exceeded)
     * @default 99
     */
    max?: number;
    /**
     * Show badge even when count is 0
     * @default false
     */
    showZero?: boolean;
    /**
     * Additional CSS classes
     */
    className?: string;
}
