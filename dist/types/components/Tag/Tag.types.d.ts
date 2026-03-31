import { ReactNode } from 'react';
/**
 * Tag size variants
 */
export type TagSize = 'sm' | 'md';
/**
 * Tag visual variants
 */
export type TagVariant = 'primary' | 'outline' | 'neutral';
/**
 * Counter badge props
 */
export interface TagCounterProps {
    /**
     * The count number to display
     */
    count: number;
    /**
     * Badge color variant
     * @default 'primary'
     */
    color?: 'primary' | 'neutral' | 'success' | 'warning' | 'error';
}
/**
 * Tag component props
 */
export interface TagProps {
    /**
     * Tag label text
     */
    children: ReactNode;
    /**
     * Size variant
     * @default 'md'
     */
    size?: TagSize;
    /**
     * Visual variant
     * @default 'outline'
     */
    variant?: TagVariant;
    /**
     * Custom color override (for primary variant)
     * Uses CSS color value
     */
    color?: string;
    /**
     * Element at the start (icon, avatar, etc.)
     */
    itemStart?: ReactNode;
    /**
     * Element at the end (icon, avatar, etc.)
     */
    itemEnd?: ReactNode;
    /**
     * Counter badge configuration
     */
    counter?: TagCounterProps;
    /**
     * Show checkbox for multi-select
     * @default false
     */
    checkable?: boolean;
    /**
     * Checked state (when checkable is true)
     * @default false
     */
    checked?: boolean;
    /**
     * Callback when checked state changes
     */
    onCheckedChange?: (checked: boolean) => void;
    /**
     * Show delete button
     * @default false
     */
    deletable?: boolean;
    /**
     * Callback when delete button is clicked
     */
    onDelete?: () => void;
    /**
     * Click handler for the tag
     */
    onClick?: () => void;
    /**
     * Whether the tag is disabled
     * @default false
     */
    disabled?: boolean;
    /**
     * Additional CSS classes
     */
    className?: string;
}
