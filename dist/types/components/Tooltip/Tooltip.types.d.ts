import { ReactNode } from 'react';
/**
 * Tooltip placement options
 */
export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';
/**
 * Tooltip component props
 */
export interface TooltipProps {
    /**
     * The element that triggers the tooltip on hover
     */
    children: ReactNode;
    /**
     * Content to display in the tooltip
     */
    content: ReactNode;
    /**
     * Placement of the tooltip relative to the trigger
     * @default 'top'
     */
    placement?: TooltipPlacement;
    /**
     * Delay before showing tooltip (ms)
     * @default 0
     */
    delay?: number;
    /**
     * Whether the tooltip is disabled
     * @default false
     */
    disabled?: boolean;
    /**
     * Additional CSS classes for the tooltip
     */
    className?: string;
}
