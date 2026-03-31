import { ReactNode } from 'react';
import type { BadgeProps } from '../Badge/Badge.types';
/**
 * Avatar type - what content to display
 */
export type AvatarType = 'image' | 'text' | 'icon';
/**
 * Avatar size
 */
export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg';
/**
 * Avatar shape
 */
export type AvatarShape = 'round' | 'square';
/**
 * Avatar component props
 */
export interface AvatarProps {
    /**
       * Show a badge on the avatar (bottom-right corner)
       * - true: Shows a primary dot badge
       * - BadgeProps: Full badge customization
       */
    badge?: boolean | Omit<BadgeProps, 'className'>;
    /**
     * What type of content to display
     * @default 'icon'
     */
    type?: AvatarType;
    /**
     * Size of the avatar
     * @default 'md'
     */
    size?: AvatarSize;
    /**
     * Shape of the avatar
     * @default 'round'
     */
    shape?: AvatarShape;
    /**
     * Image source URL (required when type="image")
     */
    src?: string;
    /**
     * Alt text for image
     */
    alt?: string;
    /**
     * User's name - automatically generates initials for display
     */
    name?: string;
    /**
     * Custom icon (for type="icon")
     * Defaults to User icon if not provided
     */
    icon?: ReactNode;
    /**
     * Additional CSS classes
     */
    className?: string;
}
