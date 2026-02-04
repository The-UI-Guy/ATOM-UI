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
export const InputBaseWrapper = ({
  label,
  helperText,
  error = false,
  errorMessage,
  size = 'md',
  fullWidth = false,
  className = '',
  children,
}: InputBaseWrapperProps) => {
  
  const labelSizeStyles: Record<InputSize, string> = {
    sm: 'text-sm',
    md: 'text-sm',
    lg: 'text-base',
  };

  const helperSizeStyles: Record<InputSize, string> = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-sm',
  };

  return (
    <div className={`${fullWidth ? 'w-full' : ''} ${className}`}>
      {/* Label */}
      {label && (
        <label 
          className={`
            block mb-1 font-atom font-atom-medium
            text-atom-text-primary
            ${labelSizeStyles[size]}
          `}
        >
          {label}
        </label>
      )}

      {/* Input slot */}
      {children}

      {/* Helper text / Error message */}
      {(helperText || (error && errorMessage)) && (
        <p 
          className={`
            mt-1 font-atom
            ${helperSizeStyles[size]}
            ${error ? 'text-atom-error-main' : 'text-atom-text-tertiary'}
          `}
        >
          {error && errorMessage ? errorMessage : helperText}
        </p>
      )}
    </div>
  );
};

/**
 * Shared size configurations for input fields
 */
export const inputSizeConfig: Record<InputSize, {
  height: number;
  paddingX: number;
  fontSize: string;
  iconSize: number;
}> = {
  sm: {
    height: 36,
    paddingX: 12,
    fontSize: 'text-sm',
    iconSize: 18,
  },
  md: {
    height: 44,
    paddingX: 14,
    fontSize: 'text-sm',
    iconSize: 20,
  },
  lg: {
    height: 52,
    paddingX: 16,
    fontSize: 'text-base',
    iconSize: 22,
  },
};

/**
 * Shared input container styles (the actual input box)
 */
export const getInputContainerStyles = (
  isFocused: boolean,
  error: boolean,
  disabled: boolean
): React.CSSProperties => {
  let boxShadow = 'none';
  let borderColor = 'var(--atom-border-primary)';

  if (disabled) {
    borderColor = 'var(--atom-border-primary)';
  } else if (error) {
    borderColor = 'var(--atom-error-main)';
    boxShadow = isFocused ? '0 0 0 4px var(--atom-halo-error)' : 'none';
  } else if (isFocused) {
    borderColor = 'var(--atom-primary-main)';
    boxShadow = '0 0 0 4px var(--atom-halo-primary)';
  }

  return {
    border: `1px solid ${borderColor}`,
    boxShadow,
    borderRadius: 'var(--atom-radius-md)',
    transition: 'border-color 150ms ease, box-shadow 150ms ease',
  };
};

/**
 * Hover styles for input container (when not focused)
 */
export const getInputHoverStyles = (
  isHovered: boolean,
  isFocused: boolean,
  error: boolean,
  disabled: boolean
): React.CSSProperties => {
  if (disabled || isFocused || error) return {};
  
  if (isHovered) {
    return {
      boxShadow: '0 0 0 4px var(--atom-halo-default)',
    };
  }
  
  return {};
};

InputBaseWrapper.displayName = 'InputBaseWrapper';
