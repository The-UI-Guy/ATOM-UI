import React from 'react';
import type { RadioProps, RadioSize } from './Radio.types';

/**
 * Radio Component
 * 
 * A styled radio input with label support.
 * 
 * @example
 * <Radio label="Option A" name="options" checked={selected === 'a'} onChange={() => setSelected('a')} />
 */
export const Radio = ({
  checked = false,
  onChange,
  size = 'md',
  disabled = false,
  label,
  id,
  name,
  value,
  className = '',
}: RadioProps) => {
  
  // Generate unique ID if not provided
  const inputId = id || `radio-${Math.random().toString(36).substr(2, 9)}`;

  // ==========================================
  // SIZE STYLES
  // ==========================================
  const sizeStyles: Record<RadioSize, { 
    box: string; 
    innerRing: string;
    label: string;
  }> = {
    sm: {
      box: 'w-2 h-2',        // 14px
      innerRing: 'w-1 h-1',  // 6px inner white circle
      label: 'text-sm',
    },
    md: {
      box: 'w-[20px] h-[20px]',            // 20px
      innerRing: 'w-[12px] h-[12px]',      // 8px inner white circle
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
        type="radio"
        id={inputId}
        name={name}
        value={value}
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
        className="sr-only peer"
      />
      
      {/* Custom radio visual */}
      <div
        className={`
          ${sizeStyles[size].box}
          flex items-center justify-center
          rounded-full
          transition-all duration-150
          
          ${checked 
            ? 'bg-atom-primary-main' 
            : 'bg-atom-surface-1 border border-atom-border-tertiary'
          }
          
          ${!disabled && !checked && `
            hover:shadow-[0_0_0_4px_var(--atom-halo-default)]
          `}
          
          ${!disabled && checked && `
            hover:bg-atom-primary-tint2
            hover:shadow-[0_0_0_4px_var(--atom-halo-primary)]
          `}
          
          peer-focus-visible:ring-2
          peer-focus-visible:ring-atom-primary-main
          peer-focus-visible:ring-offset-2
        `}
      >
        {/* Inner white circle (always rendered, opacity controlled) */}
        <div 
          className={`
            ${sizeStyles[size].innerRing} 
            rounded-full 
            bg-white
            ${checked ? 'opacity-100' : 'opacity-0'}
          `} 
        />
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

Radio.displayName = 'Radio';