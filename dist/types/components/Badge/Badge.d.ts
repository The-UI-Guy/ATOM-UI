import type { BadgeProps } from './Badge.types';
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
export declare const Badge: {
    ({ type, intent, count, max, showZero, className, }: BadgeProps): import("react/jsx-runtime").JSX.Element | null;
    displayName: string;
};
