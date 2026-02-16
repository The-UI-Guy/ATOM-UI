import React from 'react';
import { X, Check } from '@phosphor-icons/react';
import type { TagProps, TagSize, TagVariant } from './Tag.types';

/**
 * Tag Component
 * 
 * A versatile tag/chip component for labels, filters, and selections.
 * 
 * @example
 * // Basic tag
 * <Tag>Label</Tag>
 * 
 * @example
 * // With icon and counter
 * <Tag itemStart={<FileIcon />} counter={{ count: 5 }}>Documents</Tag>
 * 
 * @example
 * // Checkable tag
 * <Tag checkable checked={isChecked} onCheckedChange={setIsChecked}>Option</Tag>
 * 
 * @example
 * // Deletable tag
 * <Tag deletable onDelete={() => handleDelete()}>Removable</Tag>
 */
export const Tag = ({
  children,
  size = 'md',
  variant = 'outline',
  color,
  itemStart,
  itemEnd,
  counter,
  checkable = false,
  checked = false,
  onCheckedChange,
  deletable = false,
  onDelete,
  onClick,
  disabled = false,
  className = '',
}: TagProps) => {

  // ==========================================
  // SIZE CONFIGURATION
  // ==========================================
  const sizeConfig: Record<TagSize, {
    height: string;
    paddingX: string;
    fontSize: string;
    iconSize: number;
    gap: string;
    checkboxSize: number;
    counterSize: string;
  }> = {
    sm: {
      height: 'h-3',           // 24px
      paddingX: 'px-1',        // 8px
      fontSize: 'text-xs',
      iconSize: 12,
      gap: 4,          // 4px
      checkboxSize: 12,
      counterSize: 'text-xs',
    },
    md: {
      height: 'h-4',           // 32px
      paddingX: 'px-1.5',      // 12px
      fontSize: 'text-sm',
      iconSize: 16,
      gap: 8,            // 8px
      checkboxSize: 14,
      counterSize: 'text-xs',
    },
  };

  const config = sizeConfig[size];

  // ==========================================
  // VARIANT STYLES
  // ==========================================
  const getVariantClasses = (): string => {
    if (disabled) {
      return 'bg-atom-surface-2 border-atom-border-primary text-atom-text-tertiary';
    }

    switch (variant) {
      case 'primary':
        return `
          bg-atom-primary-main border-atom-primary-main text-white
          ${onClick ? 'hover:bg-atom-primary-tint2 hover:border-atom-primary-tint2' : ''}
        `;
      case 'neutral':
        return `
          bg-atom-neutral-one border-atom-neutral-two text-atom-text-primary
          ${onClick ? 'hover:bg-atom-neutral-two' : ''}
        `;
      case 'outline':
      default:
        return `
          bg-atom-surface-1 border-atom-border-primary text-atom-text-primary
          ${onClick ? 'hover:bg-atom-neutral-one' : ''}
        `;
    }
  };

  // ==========================================
  // COUNTER BADGE COLORS
  // ==========================================
  const getCounterClasses = (): string => {
    if (!counter) return '';
    
    const colorMap: Record<string, string> = {
      primary: 'bg-atom-primary-main text-white',
      neutral: 'bg-atom-neutral-two text-atom-text-primary',
      success: 'bg-atom-success-main text-white',
      warning: 'bg-atom-warning-main text-atom-text-primary',
      error: 'bg-atom-error-main text-white',
    };

    return colorMap[counter.color || 'primary'] || colorMap.primary;
  };

  // ==========================================
  // ICON COLOR
  // ==========================================
  const getIconColor = (): string => {
    if (disabled) return 'text-atom-text-tertiary';
    if (variant === 'primary') return 'text-white';
    return 'text-atom-text-secondary';
  };

  // ==========================================
  // HANDLERS
  // ==========================================
  const handleClick = () => {
    if (disabled) return;
    
    if (checkable && onCheckedChange) {
      onCheckedChange(!checked);
    } else if (onClick) {
      onClick();
    }
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!disabled && onDelete) {
      onDelete();
    }
  };

  // ==========================================
  // CUSTOM COLOR STYLES
  // ==========================================
  const customColorStyle: React.CSSProperties = color && variant === 'primary' ? {
    backgroundColor: color,
    borderColor: color,
  } : {};

  // ==========================================
  // RENDER
  // ==========================================
  const isClickable = !disabled && (onClick || checkable);

  return (
    <div
      role={checkable ? 'checkbox' : onClick ? 'button' : undefined}
      aria-checked={checkable ? checked : undefined}
      aria-disabled={disabled}
      tabIndex={isClickable ? 0 : undefined}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (isClickable && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          handleClick();
        }
      }}
      className={`
        inline-flex items-center
        ${config.height}
        ${config.paddingX}
        ${config.fontSize}
     
        border
        rounded-[6px]
        font-atom font-atom-medium
        transition-all duration-150
        ${getVariantClasses()}
        ${isClickable ? 'cursor-pointer' : ''}
        ${disabled ? 'cursor-not-allowed opacity-70' : ''}
        ${className}
      `}
      style={{ ...customColorStyle, gap: config.gap }}
    >
      {/* Checkbox */}
      {checkable && (
        <span 
          className={`
            flex items-center justify-center rounded-sm border
            transition-all duration-150
            ${checked 
              ? 'bg-atom-primary-main border-atom-primary-main' 
              : 'bg-atom-surface-1 border-atom-border-tertiary'
            }
            ${disabled ? 'opacity-50' : ''}
          `}
          style={{ 
            width: config.checkboxSize, 
            height: config.checkboxSize,
          }}
        >
          <Check 
            size={config.checkboxSize - 2} 
            weight="bold" 
            className={`text-white transition-opacity ${checked ? 'opacity-100' : 'opacity-0'}`}
          />
        </span>
      )}

      {/* Item Start */}
      {itemStart && (
        <span className={`flex items-center justify-center ${getIconColor()}`}>
          {React.isValidElement(itemStart)
            ? React.cloneElement(itemStart as React.ReactElement<{ size?: number }>, { 
                size: config.iconSize,
              })
            : itemStart
          }
        </span>
      )}

      {/* Label */}
      <span className="whitespace-nowrap">{children}</span>

      {/* Item End */}
      {itemEnd && (
        <span className={`flex items-center justify-center ${getIconColor()}`}>
          {React.isValidElement(itemEnd)
            ? React.cloneElement(itemEnd as React.ReactElement<{ size?: number }>, { 
                size: config.iconSize,
              })
            : itemEnd
          }
        </span>
      )}

      {/* Counter Badge */}
      {counter && (
        <span 
          className={`
            inline-flex items-center justify-center
            rounded-full font-atom-medium
            ${config.counterSize}
            ${getCounterClasses()}
          `}
          style={{
            minWidth: size === 'sm' ? 16 : 18,
            height: size === 'sm' ? 16 : 18,
            paddingLeft: 4,
            paddingRight: 4,
          }}
        >
          {counter.count}
        </span>
      )}

      {/* Delete Button */}
      {deletable && (
        <button
          type="button"
          onClick={handleDelete}
          disabled={disabled}
          className={`
            flex items-center justify-center
            rounded-full
            transition-colors duration-150
            ${disabled 
              ? 'cursor-not-allowed' 
              : 'cursor-pointer hover:bg-black/10'
            }
            ${getIconColor()}
          `}
           style={{
          padding: 2,
        }}
          aria-label="Remove tag"
        >
          <X size={config.iconSize - 2} weight="bold" />
        </button>
      )}
    </div>
  );
};

Tag.displayName = 'Tag';
