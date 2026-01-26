import React from 'react';
import { Check } from '@phosphor-icons/react';
import type { CheckboxProps, CheckboxSize } from './Checkbox.types';

/**
 * Checkbox Component
 * 
 * A styled checkbox input with label support.
 * 
 * @example
 * <Checkbox label="Accept terms" checked={checked} onChange={setChecked} />
 */
export const Checkbox = ({
  checked = false,
  onChange,
  size = 'md',
  disabled = false,
  label,
  id,
  name,
  className = '',
}: CheckboxProps) => {
  
  // Generate unique ID if not provided
  const inputId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;

  // ==========================================
  // SIZE STYLES
  // ==========================================
  const sizeStyles: Record<CheckboxSize, { 
    box: string; 
    iconSize: number;
    label: string;
  }> = {
    sm: {
      box: 'w-2 h-2',        // 14px
      iconSize: 12,
      label: 'text-sm',
    },
    md: {
      box: 'w-[20px] h-[20px]',            // 20px
      iconSize: 18,
      label: 'text-sm',
    },
  };

  // ==========================================
  // HANDLE CHANGE
  // ==========================================
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!disabled && onChange) {
      onChange(e.target.checked);
    }
  };

  return (
    <label
      htmlFor={inputId}
      className={`
        inline-flex items-center gap-2
        ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
        ${className}
      `}
    >
      {/* Hidden native input */}
      <input
        type="checkbox"
        id={inputId}
        name={name}
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
        className="sr-only peer"
      />
      
      {/* Custom checkbox visual */}
      {/* Custom checkbox visual */}
<div
  className={`
    ${sizeStyles[size].box}
    flex items-center justify-center
    rounded-atom-sm
    border
    transition-all duration-150
    
    ${checked 
      ? 'bg-atom-primary-main border-atom-primary-tint2 text-white' 
      : 'bg-atom-surface-1 border-atom-border-tertiary'
    }
    
    ${!disabled && !checked && `
      hover:shadow-[0_0_0_4px_var(--atom-halo-default)]
    `}
    
    ${!disabled && checked && `
      hover:bg-atom-primary-tint2
      hover:border-atom-primary-tint2
      hover:shadow-[0_0_0_4px_var(--atom-halo-primary)]
    `}
    
    peer-focus-visible:ring-2
    peer-focus-visible:ring-atom-primary-main
    peer-focus-visible:ring-offset-2
  `}
>
        {checked && (
          <Check size={sizeStyles[size].iconSize} weight="bold" />
        )}
      </div>

      {/* Label */}
      {label && (
        <span className={`${sizeStyles[size].label} text-atom-text-primary font-atom`}>
          {label}
        </span>
      )}
    </label>
  );
};

Checkbox.displayName = 'Checkbox';