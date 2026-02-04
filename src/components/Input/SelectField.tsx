import React, { useState, forwardRef } from 'react';
import { CaretDown } from '@phosphor-icons/react';
import type { SelectFieldProps } from './Input.types';
import { 
  InputBaseWrapper, 
  inputSizeConfig, 
  getInputContainerStyles,
  getInputHoverStyles,
} from './InputBase';

/**
 * SelectField Component
 * 
 * A dropdown select input with label, helper text, and icon support.
 * 
 * @example
 * <SelectField 
 *   label="Country" 
 *   placeholder="Select a country"
 *   options={[
 *     { value: 'us', label: 'United States' },
 *     { value: 'uk', label: 'United Kingdom' },
 *   ]}
 * />
 */
export const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(
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
      options,
      placeholder,
      disabled = false,
      value,
      onFocus,
      onBlur,
      ...selectProps
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const config = inputSizeConfig[size];

    // Check if a value is selected (to style placeholder differently)
    const hasValue = value !== undefined && value !== '';

    const handleFocus = (e: React.FocusEvent<HTMLSelectElement>) => {
      setIsFocused(true);
      onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLSelectElement>) => {
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
      cursor: disabled ? 'not-allowed' : 'pointer',
      position: 'relative',
    };

    const selectStyle: React.CSSProperties = {
      flex: 1,
      height: '100%',
      border: 'none',
      outline: 'none',
      background: 'transparent',
      fontSize: 'inherit',
      fontFamily: 'inherit',
      color: hasValue ? 'var(--atom-text-primary)' : 'var(--atom-text-tertiary)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      appearance: 'none',
      WebkitAppearance: 'none',
      MozAppearance: 'none',
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

          {/* Select */}
          <select
            ref={ref}
            disabled={disabled}
            value={value}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className="font-atom"
            style={{
              ...selectStyle,
              paddingLeft: iconLeft ? 8 : config.paddingX,
              paddingRight: config.iconSize + config.paddingX + 8,
            }}
            {...selectProps}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option 
                key={option.value} 
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))}
          </select>

          {/* Chevron icon (fixed right) */}
          <span 
            className="absolute flex items-center justify-center text-atom-text-tertiary pointer-events-none"
            style={{ 
              right: config.paddingX,
              width: config.iconSize,
            }}
          >
            <CaretDown size={config.iconSize} />
          </span>
        </div>
      </InputBaseWrapper>
    );
  }
);

SelectField.displayName = 'SelectField';
