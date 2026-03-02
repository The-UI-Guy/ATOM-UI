import React, { useState } from 'react';
import type { ListItemProps, ListItemSize } from './ListItem.types';

/**
 * ListItem Component
 * 
 * A standardized list item for use in menus, popovers, selects, and lists.
 * Provides consistent styling with flexible start/end slots.
 * 
 * @example
 * // Basic
 * <ListItem onClick={handleClick}>Option 1</ListItem>
 * 
 * @example
 * // With icon and shortcut
 * <ListItem 
 *   itemStart={<FolderIcon />}
 *   endText="⌘⇧D"
 *   itemEnd={<FolderIcon />}
 * >
 *   List Item
 * </ListItem>
 * 
 * @example
 * // With checkbox
 * <ListItem itemStart={<Checkbox checked={checked} onCheckedChange={setChecked} />}>
 *   Checkbox Item
 * </ListItem>
 */
export const ListItem = ({
  children,
  itemStart,
  itemEnd,
  endText,
  size = 'md',
  selected = false,
  disabled = false,
  onClick,
  className = '',
}: ListItemProps) => {
  const [isHovered, setIsHovered] = useState(false);

  // ==========================================
  // SIZE CONFIGURATION
  // ==========================================
  const sizeConfig: Record<ListItemSize, {
    minHeight: number;
    paddingX: number;
    paddingY: number;
    fontSize: number;
    gap: number;
    iconSize: number;
  }> = {
    sm: {
      minHeight: 36,
      paddingX: 12,
      paddingY: 8,
      fontSize: 14,
      gap: 8,
      iconSize: 18,
    },
    md: {
      minHeight: 44,
      paddingX: 12,
      paddingY: 10,
      fontSize: 14,
      gap: 12,
      iconSize: 20,
    },
  };

  const config = sizeConfig[size];

  // ==========================================
  // EVENT HANDLERS
  // ==========================================
  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!disabled && onClick && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onClick();
    }
  };

  // ==========================================
  // STYLES
  // ==========================================
  const isHighlighted = selected || isHovered;

  const containerStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    minHeight: config.minHeight,
    paddingLeft: config.paddingX,
    paddingRight: config.paddingX,
    paddingTop: config.paddingY,
    paddingBottom: config.paddingY,
    gap: config.gap,
    fontSize: config.fontSize,
    borderRadius: 'var(--atom-radius-sm)',
    cursor: disabled ? 'not-allowed' : onClick ? 'pointer' : 'default',
    transition: 'background-color 100ms ease',
    outline: 'none',
    backgroundColor: isHighlighted && !disabled 
      ? 'var(--atom-primary-tint1)' 
      : 'transparent',
    opacity: disabled ? 0.5 : 1,
  };

  // ==========================================
  // RENDER ICON WRAPPER
  // ==========================================
  const renderIconSlot = (content: ReactNode) => {
    if (!content) return null;

    // Clone icons to apply size
    if (React.isValidElement(content)) {
      const element = content as React.ReactElement<{ size?: number }>;
      
      // Check if it's an icon (has size prop capability)
      if (typeof element.type !== 'string') {
        return (
          <span 
            className="flex items-center justify-center flex-shrink-0"
            style={{ color: 'var(--atom-neutral-icon)' }}
          >
            {React.cloneElement(element, { size: config.iconSize })}
          </span>
        );
      }
    }

    // For non-icons (checkbox, radio, avatar), render as-is
    return (
      <span className="flex items-center justify-center flex-shrink-0">
        {content}
      </span>
    );
  };

  // ==========================================
  // RENDER
  // ==========================================
  return (
    <div
      role={onClick ? 'option' : undefined}
      aria-selected={selected}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : onClick ? 0 : undefined}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`font-atom ${className}`}
      style={containerStyles}
    >
      {/* Start Slot */}
      {renderIconSlot(itemStart)}

      {/* Main Content */}
      <span 
        className="flex-1"
        style={{ 
          color: disabled ? 'var(--atom-text-tertiary)' : 'var(--atom-text-primary)',
        }}
      >
        {children}
      </span>

      {/* End Text (shortcuts, etc.) */}
      {endText && (
        <span 
          className="flex-shrink-0"
          style={{ 
            color: 'var(--atom-text-tertiary)',
            fontSize: config.fontSize - 2,
          }}
        >
          {endText}
        </span>
      )}

      {/* End Slot */}
      {renderIconSlot(itemEnd)}
    </div>
  );
};

ListItem.displayName = 'ListItem';
