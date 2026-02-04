import React, { useState, forwardRef } from 'react';
import type { TextFieldProps } from './Input.types';
import { 
  InputBaseWrapper, 
  inputSizeConfig, 
  getInputContainerStyles,
  getInputHoverStyles,
} from './InputBase';

/**
 * TextField Component
 * 
 * A standard text input with label, helper text, and icon support.
 * 
 * @example
 * <TextField 
 *   label="Email" 
 *   placeholder="Enter your email"
 *   iconLeft={<EnvelopeIcon />}
 * />
 */
export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
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
      iconRight,
      disabled = false,
      onFocus,
      onBlur,
      ...inputProps
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const config = inputSizeConfig[size];

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      onBlur?.(e);
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
            type="text"
            disabled={disabled}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className="font-atom placeholder:text-atom-text-tertiary"
            style={{
              ...inputStyle,
              paddingLeft: iconLeft ? 8 : config.paddingX,
              paddingRight: iconRight ? 8 : config.paddingX,
            }}
            {...inputProps}
          />

          {/* Right icon */}
          {iconRight && (
            <span 
              className="flex items-center justify-center text-atom-text-tertiary"
              style={{ 
                paddingRight: config.paddingX,
                width: config.iconSize + config.paddingX,
              }}
            >
              {React.isValidElement(iconRight)
                ? React.cloneElement(iconRight as React.ReactElement<{ size?: number }>, { 
                    size: config.iconSize,
                  })
                : iconRight
              }
            </span>
          )}
        </div>
      </InputBaseWrapper>
    );
  }
);

TextField.displayName = 'TextField';
