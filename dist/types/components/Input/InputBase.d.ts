import React, { ReactNode } from 'react';
import type { InputSize } from './Input.types';
interface InputBaseWrapperProps {
    label?: string;
    helperText?: string;
    error?: boolean;
    errorMessage?: string;
    size?: InputSize;
    fullWidth?: boolean;
    className?: string;
    children: ReactNode;
}
/**
 * InputBase - Shared wrapper for all input components
 * Provides label, helper text, and consistent spacing
 */
export declare const InputBaseWrapper: {
    ({ label, helperText, error, errorMessage, size, fullWidth, className, children, }: InputBaseWrapperProps): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
/**
 * Shared size configurations for input fields
 */
export declare const inputSizeConfig: Record<InputSize, {
    height: number;
    paddingX: number;
    fontSize: string;
    iconSize: number;
}>;
/**
 * Shared input container styles (the actual input box)
 */
export declare const getInputContainerStyles: (isFocused: boolean, error: boolean, disabled: boolean) => React.CSSProperties;
/**
 * Hover styles for input container (when not focused)
 */
export declare const getInputHoverStyles: (isHovered: boolean, isFocused: boolean, error: boolean, disabled: boolean) => React.CSSProperties;
export {};
