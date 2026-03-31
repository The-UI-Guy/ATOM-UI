import React, { useState } from 'react';
import type { SwitchProps, SwitchSize } from './Switch.types';

/**
 * Switch Component
 * 
 * A toggle switch for binary on/off states.
 * 
 * @example
 * <Switch checked={isOn} onChange={setIsOn} />
 * 
 * @example
 * // With label and icon
 * <Switch checked={isOn} onChange={setIsOn} label="Label" icon={<Check />} />
 */
export const Switch = ({
  checked = false,
  onChange,
  size = 'md',
  label,
  icon,
  disabled = false,
  id,
  name,
  className = '',
}: SwitchProps) => {
  const [hovering, setHovering] = useState(false);

  // Generate unique ID if not provided
  const inputId = id || `switch-${Math.random().toString(36).substr(2, 9)}`;

  const hasContent = label || icon;

  // ==========================================
  // SIZE CONFIGURATION
  // ==========================================
  const sizeConfig: Record<SwitchSize, {
    trackHeight: number;
    trackWidth: number;
    handleSize: number;
    padding: number;
    fontSize: string;
    iconSize: number;
    gap: number;
  }> = {
    sm: {
      trackHeight: 16,
      trackWidth: 32,
      handleSize: 12,
      padding: 2,
      fontSize: 'text-xs',
      iconSize: 10,
      gap: 4,
    },
    md: {
      trackHeight: 24,
      trackWidth: 44,
      handleSize: 20,
      padding: 2,
      fontSize: 'text-sm',
      iconSize: 14,
      gap: 8,
    },
  };

  const config = sizeConfig[size];

  // ==========================================
  // HANDLE CHANGE
  // ==========================================
  const handleChange = () => {
    if (!disabled && onChange) {
      onChange(!checked);
    }
  };

  // ==========================================
  // CALCULATE HALO
  // ==========================================
  const getHaloStyle = () => {
    if (disabled || !hovering) return 'none';
    return checked 
      ? '0 0 0 4px var(--atom-halo-primary)' 
      : '0 0 0 4px var(--atom-halo-default)';
  };

  return (
    <label
      htmlFor={inputId}
      className={`
        inline-flex items-center
        ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
        ${className}
      `}
      onMouseEnter={() => !disabled && setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      {/* Hidden native input */}
      <input
        type="checkbox"
        id={inputId}
        name={name}
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
        className="sr-only"
      />

      {/* Switch track */}
      <div
        className={`
          relative inline-flex items-center
          rounded-full
          transition-all duration-200
          ${checked ? 'bg-atom-primary-main' : 'bg-atom-neutral-two'}
        `}
        style={{
          height: config.trackHeight,
          minWidth: hasContent ? 'auto' : config.trackWidth,
          paddingLeft: checked ? config.padding + config.gap : config.handleSize + config.padding + config.gap,
          paddingRight: checked ? config.handleSize + config.padding + config.gap : config.padding + config.gap,
          boxShadow: getHaloStyle(),
        }}
      >
        {/* Content (icon + label) */}
        {hasContent && (
          <div
            className={`
              flex items-center font-atom font-atom-medium
              transition-colors duration-200
              ${config.fontSize}
              ${checked ? 'text-white' : 'text-atom-text-primary'}
            `}
            style={{ 
              gap: config.gap, 
            }}
          >
            {icon && (
              <span className="flex-shrink-0 flex items-center">
                {React.isValidElement(icon) 
                  ? React.cloneElement(icon as React.ReactElement<{ size?: number; weight?: string }>, { size: config.iconSize, weight: 'bold' })
                  : icon
                }
              </span>
            )}
            {label && <span className="whitespace-nowrap">{label}</span>}
          </div>
        )}

        {/* Handle - absolutely positioned for smooth animation */}
        <div
          className="absolute bg-white rounded-full transition-all duration-200"
          style={{
            width: config.handleSize,
            height: config.handleSize,
            top: '50%',
            transform: 'translateY(-50%)',
            left: checked ? `calc(100% - ${config.handleSize + config.padding}px)` : `${config.padding}px`,
          }}
        />
      </div>
    </label>
  );
};

Switch.displayName = 'Switch';