import React, { useState, forwardRef } from 'react';
import { Eye, EyeSlash } from '@phosphor-icons/react';
import type { PasswordFieldProps } from './Input.types';
import { 
  InputBaseWrapper, 
  inputSizeConfig, 
  getInputContainerStyles,
  getInputHoverStyles,
} from './InputBase';

/**
 * PasswordField Component
 * 
 * A password input with visibility toggle, label, helper text, and icon support.
 * 
 * @example
 * <PasswordField 
 *   label="Password" 
 *   placeholder="Enter your password"
 *   helperText="Must be at least 8 characters"
 * />
 */
export const PasswordField = forwardRef<HTMLInputElement, PasswordFieldProps>(
  (
    {
      label,
      helperText,
      error = false,
      errorMessage,
      size = 'md',
      fullWidth = false,
      className = '',
      iconLeft,
      disabled = false,
      onFocus,
      onBlur,
      ...inputProps
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const config = inputSizeConfig[size];

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      onBlur?.(e);
    };

    const toggleVisibility = () => {
      if (!disabled) {
        setShowPassword(!showPassword);
      }
    };

    const containerStyle: React.CSSProperties = {
      ...getInputContainerStyles(isFocused, error, disabled),
      ...getInputHoverStyles(isHovered, isFocused, error, disabled),
      height: config.height,
      display: 'flex',
      alignItems: 'center',
      backgroundColor: disabled ? 'var(--atom-neutral-one)' : 'var(--atom-surface-1)',
      cursor: disabled ? 'not-allowed' : 'text',
    };

    const inputStyle: React.CSSProperties = {
      flex: 1,
      height: '100%',
      border: 'none',
      outline: 'none',
      background: 'transparent',
      fontSize: 'inherit',
      fontFamily: 'inherit',
      color: 'var(--atom-text-primary)',
      cursor: disabled ? 'not-allowed' : 'text',
    };

    return (
      <InputBaseWrapper
        label={label}
        helperText={helperText}
        error={error}
        errorMessage={errorMessage}
        size={size}
        fullWidth={fullWidth}
        className={className}
      >
        <div
          style={containerStyle}
          className={config.fontSize}
          onMouseEnter={() => !disabled && setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Left icon */}
          {iconLeft && (
            <span 
              className="flex items-center justify-center text-atom-text-tertiary"
              style={{ 
                paddingLeft: config.paddingX,
                width: config.iconSize + config.paddingX,
              }}
            >
              {React.isValidElement(iconLeft)
                ? React.cloneElement(iconLeft as React.ReactElement<{ size?: number }>, { 
                    size: config.iconSize,
                  })
                : iconLeft
              }
            </span>
          )}

          {/* Input */}
          <input
            ref={ref}
            type={showPassword ? 'text' : 'password'}
            disabled={disabled}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className="font-atom placeholder:text-atom-text-tertiary"
            style={{
              ...inputStyle,
              paddingLeft: iconLeft ? 8 : config.paddingX,
              paddingRight: 8,
            }}
            {...inputProps}
          />

          {/* Eye toggle icon */}
          <button
            type="button"
            onClick={toggleVisibility}
            disabled={disabled}
            className={`
              flex items-center justify-center 
              text-atom-text-tertiary
              hover:text-atom-text-secondary
              transition-colors duration-150
              ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
            `}
            style={{ 
              paddingRight: config.paddingX,
              width: config.iconSize + config.paddingX,
              background: 'none',
              border: 'none',
            }}
            tabIndex={-1}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? (
              <EyeSlash size={config.iconSize} />
            ) : (
              <Eye size={config.iconSize} />
            )}
          </button>
        </div>
      </InputBaseWrapper>
    );
  }
);

PasswordField.displayName = 'PasswordField';
