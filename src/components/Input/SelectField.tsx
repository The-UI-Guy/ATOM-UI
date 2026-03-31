import React, { useState, useRef, useEffect } from 'react';
import { CaretDown } from '@phosphor-icons/react';
import type { SelectFieldProps } from './Input.types';
import {
  InputBaseWrapper,
  inputSizeConfig,
  getInputContainerStyles,
  getInputHoverStyles,
} from './InputBase';
import { PopMenu } from '../PopMenu/PopMenu';
import { ListItem } from '../Listitem/ListItem';

/**
 * SelectField Component
 *
 * A dropdown select backed by PopMenu — never uses the native <select>.
 * The trigger matches the TextField visual style; options render as ListItems.
 *
 * @example
 * <SelectField
 *   label="Country"
 *   placeholder="Select a country"
 *   value={value}
 *   onChange={setValue}
 *   options={[
 *     { value: 'us', label: 'United States' },
 *     { value: 'uk', label: 'United Kingdom' },
 *   ]}
 * />
 */
export const SelectField = ({
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
  onChange,
  name,
}: SelectFieldProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const config = inputSizeConfig[size];
  const selectedOption = options.find(o => o.value === value);

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;
    const handlePointerDown = (e: PointerEvent) => {
      if (!wrapperRef.current?.contains(e.target as Node)) {
        setIsOpen(false);
        setIsFocused(false);
      }
    };
    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, [isOpen]);

  const handleToggle = () => {
    if (disabled) return;
    setIsOpen(prev => !prev);
    setIsFocused(true);
  };

  const handleSelect = (optionValue: string) => {
    onChange?.(optionValue);
    setIsOpen(false);
    setIsFocused(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') { setIsOpen(false); setIsFocused(false); }
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleToggle(); }
  };

  const containerStyle: React.CSSProperties = {
    ...getInputContainerStyles(isFocused, error, disabled),
    ...getInputHoverStyles(isHovered, isFocused, error, disabled),
    height: config.height,
    display: 'flex',
    alignItems: 'center',
    backgroundColor: disabled ? 'var(--atom-neutral-one)' : 'var(--atom-surface-1)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    userSelect: 'none',
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
      {/* Hidden input for form compatibility */}
      {name && <input type="hidden" name={name} value={value ?? ''} />}

      <div ref={wrapperRef} style={{ position: 'relative' }}>
        {/* Trigger */}
        <div
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-disabled={disabled}
          tabIndex={disabled ? -1 : 0}
          style={containerStyle}
          className={config.fontSize}
          onClick={handleToggle}
          onKeyDown={handleKeyDown}
          onMouseEnter={() => !disabled && setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onBlur={(e) => {
            if (!wrapperRef.current?.contains(e.relatedTarget as Node)) {
              setIsFocused(false);
            }
          }}
        >
          {/* Left icon */}
          {iconLeft && (
            <span
              className="flex items-center justify-center text-atom-text-tertiary flex-shrink-0"
              style={{ paddingLeft: config.paddingX, width: config.iconSize + config.paddingX }}
            >
              {React.isValidElement(iconLeft)
                ? React.cloneElement(iconLeft as React.ReactElement<{ size?: number }>, { size: config.iconSize })
                : iconLeft}
            </span>
          )}

          {/* Selected value / placeholder */}
          <span
            className="flex-1 font-atom truncate"
            style={{
              paddingLeft: iconLeft ? 8 : config.paddingX,
              paddingRight: 8,
              color: selectedOption ? 'var(--atom-text-primary)' : 'var(--atom-text-tertiary)',
            }}
          >
            {selectedOption ? selectedOption.label : (placeholder ?? 'Select…')}
          </span>

          {/* Caret */}
          <span
            className="flex items-center justify-center flex-shrink-0 text-atom-text-tertiary"
            style={{ paddingRight: config.paddingX }}
          >
            <CaretDown size={config.iconSize} />
          </span>
        </div>

        {/* Dropdown */}
        {isOpen && (
          <div
            style={{
              position: 'absolute',
              top: config.height + 4,
              left: 0,
              right: 0,
              zIndex: 50,
            }}
          >
            <PopMenu width="100%">
              <div style={{ paddingLeft: 8, paddingRight: 8, display: 'flex', flexDirection: 'column', gap: 2 }}>
                {options.map(option => (
                  <ListItem
                    key={option.value}
                    active={option.value === value}
                    disabled={option.disabled}
                    onClick={() => handleSelect(option.value)}
                  >
                    {option.label}
                  </ListItem>
                ))}
              </div>
            </PopMenu>
          </div>
        )}
      </div>
    </InputBaseWrapper>
  );
};

SelectField.displayName = 'SelectField';
