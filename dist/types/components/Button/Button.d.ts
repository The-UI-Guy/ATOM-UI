import type { ButtonProps } from './Button.types';
/**
 * Button Component
 *
 * A versatile button component with multiple variants, sizes, and icon support.
 *
 * @example
 * // Primary button
 * <Button variant="primary">Click me</Button>
 *
 * @example
 * // Outline button with icon
 * <Button variant="outline" iconStart={<PlusIcon />}>Add item</Button>
 *
 * @example
 * // Icon-only button
 * <Button variant="text" iconOnly><SearchIcon /></Button>
 */
export declare const Button: import("react").ForwardRefExoticComponent<ButtonProps & import("react").RefAttributes<HTMLButtonElement>>;
