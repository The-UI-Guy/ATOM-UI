import type { DividerProps } from './Divider.types';
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
export declare const Divider: {
    ({ type, color, paddingTop, paddingBottom, paddingLeft, paddingRight, paddingY, paddingX, className, }: DividerProps): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
