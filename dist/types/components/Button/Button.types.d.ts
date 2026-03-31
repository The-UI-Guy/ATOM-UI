import { ButtonHTMLAttributes, ReactNode } from 'react';
/**
 * Button variant - controls the visual style
 */
export type ButtonVariant = 'primary' | 'outline' | 'text' | 'destructive';
/**
 * Button size
 */
export type ButtonSize = 'sm' | 'md' | 'lg';
/**
 * Button component props
 *
 * Extends native HTML button attributes so you get all standard
 * button props (onClick, disabled, type, etc.) for free
 */
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    /**
     * The visual style of the button
     * @default 'primary'
     */
    variant?: ButtonVariant;
    /**
     * The size of the button
     * @default 'md'
     */
    size?: ButtonSize;
    /**
     * Icon to display before the button text
     */
    iconStart?: ReactNode;
    /**
     * Icon to display after the button text
     */
    iconEnd?: ReactNode;
    /**
     * If true, the button will be styled as an icon-only button (square)
     * @default false
     */
    iconOnly?: boolean;
    /**
     * If true, shows a loading spinner and disables the button
     * @default false
     */
    loading?: boolean;
    /**
     * The content of the button
     */
    children?: ReactNode;
}
