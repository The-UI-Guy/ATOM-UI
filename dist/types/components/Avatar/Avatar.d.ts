import type { AvatarProps } from './Avatar.types';
/**
 * Avatar Component
 *
 * Displays a user avatar as an image, initials, or icon.
 *
 * @example
 * // Image avatar
 * <Avatar type="image" src="/photo.jpg" alt="John Doe" />
 *
 * @example
 * // Text avatar with initials
 * <Avatar type="text" name="John Doe" />
 *
 * @example
 * // Icon avatar (default)
 * <Avatar type="icon" size="lg" shape="square" />
 */
export declare const Avatar: {
    ({ badge, type, size, shape, src, alt, name, icon, className, }: AvatarProps): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
