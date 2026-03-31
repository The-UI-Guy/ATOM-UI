import type { TooltipProps } from './Tooltip.types';
/**
 * Tooltip Component
 *
 * A tooltip that appears on hover with configurable placement.
 *
 * @example
 * <Tooltip content="Save your changes">
 *   <Button>Save</Button>
 * </Tooltip>
 *
 * @example
 * <Tooltip content="More information here" placement="right">
 *   <InfoIcon />
 * </Tooltip>
 */
export declare const Tooltip: {
    ({ children, content, placement, delay, disabled, className, }: TooltipProps): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
