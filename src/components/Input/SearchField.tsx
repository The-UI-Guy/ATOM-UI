import React, { useState, forwardRef } from 'react';
import { MagnifyingGlass } from '@phosphor-icons/react';
import type { SearchFieldProps } from './Input.types';
import { 
  inputSizeConfig, 
  getInputContainerStyles,
  getInputHoverStyles,
} from './InputBase';

/**
 * SearchField Component
 * 
 * A simplified search input with a search icon.
 * No label or helper text - designed for search bars.
 * 
 * @example
 * <SearchField placeholder="Search..." />
 */
export const SearchField = forwardRef<HTMLInputElement, SearchFieldProps>(
  (
    {
      size = 'md',
      fullWidth = false,
      className = '',
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
      ...getInputContainerStyles(isFocused, false, disabled),
      ...getInputHoverStyles(isHovered, isFocused, false, disabled),
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
      <div className={`${fullWidth ? 'w-full' : ''} ${className}`}>
        <div
          style={containerStyle}
          className={config.fontSize}
          onMouseEnter={() => !disabled && setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Search icon */}
          <span 
            className="flex items-center justify-center text-atom-text-tertiary"
            style={{ 
              paddingLeft: config.paddingX,
              width: config.iconSize + config.paddingX,
            }}
          >
            <MagnifyingGlass size={config.iconSize} />
          </span>

          {/* Input */}
          <input
            ref={ref}
            type="search"
            disabled={disabled}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className="font-atom placeholder:text-atom-text-tertiary"
            style={{
              ...inputStyle,
              paddingLeft: 8,
              paddingRight: config.paddingX,
            }}
            {...inputProps}
          />
        </div>
      </div>
    );
  }
);

SearchField.displayName = 'SearchField';
