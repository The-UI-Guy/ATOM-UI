import React from 'react';
import { CaretRight } from '@phosphor-icons/react';
import type { ListItemProps } from './ListItem.types';

/**
 * ListItem Component
 *
 * A single interactive item used inside a PopMenu. Supports a start icon,
 * label, keyboard shortcut, end icon / submenu indicator, and an active state.
 *
 * @example
 * <ListItem icon={<Rocket />} shortcut="⌘⇧D">Deploy</ListItem>
 *
 * @example
 * <ListItem icon={<TrashSimple />} shortcut="DEL">Delete</ListItem>
 *
 * @example
 * <ListItem icon={<Folder />} hasSubmenu>Open in…</ListItem>
 */
export const ListItem = ({
  children,
  icon,
  shortcut,
  endIcon,
  hasSubmenu = false,
  active = false,
  disabled = false,
  onClick,
  className = '',
}: ListItemProps) => {

  // ==========================================
  // HANDLERS
  // ==========================================
  const handleClick = () => {
    if (!disabled && onClick) onClick();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      handleClick();
    }
  };

  // ==========================================
  // STYLES
  //
  // Note: padding is set via inline style (not Tailwind) to avoid the project's
  // 8px Tailwind base-unit (px-1 = 8px, px-2 = 16px), keeping exact Figma values.
  // ==========================================
  const stateClasses = active
    ? 'bg-atom-action-selected'
    : disabled
      ? ''
      : 'hover:bg-atom-action-hover focus-visible:bg-atom-action-hover';

  return (
    <div
      role="menuitem"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={`
        flex items-center w-full
        font-atom font-atom-medium text-atom-sm tracking-[0.07px] text-atom-text-primary
        focus:outline-none transition-colors duration-150
        ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
        ${stateClasses}
        ${className}
      `}
      style={{
        padding: 'var(--atom-space-1)',
        gap: 'var(--atom-space-1)',
        borderRadius: 'var(--atom-radius-md)',
      }}
    >
      {/* Start Icon */}
      {icon && (
        <span
          className="flex items-center justify-center flex-shrink-0 text-atom-neutral-icon"
          style={{ width: 20, height: 20 }}
        >
          {React.isValidElement(icon)
            ? React.cloneElement(icon as React.ReactElement<{ size?: number }>, { size: 16 })
            : icon}
        </span>
      )}

      {/* Label */}
      <span
        className="flex-1 text-left whitespace-nowrap overflow-hidden text-ellipsis"
        style={{ fontSize: 'var(--atom-font-size-sm)' }}
      >
        {children}
      </span>

      {/* Shortcut */}
      {shortcut && (
        <span
          className="font-atom font-atom-regular tracking-[0.07px] flex-shrink-0 text-atom-text-tertiary"
          style={{ fontSize: 'var(--atom-font-size-sm)' }}
        >
          {shortcut}
        </span>
      )}

      {/* End Icon / Submenu Indicator */}
      {(endIcon || hasSubmenu) && (
        <span
          className="flex items-center justify-center flex-shrink-0 text-atom-neutral-icon"
          style={{ width: 20, height: 20 }}
        >
          {endIcon
            ? React.isValidElement(endIcon)
              ? React.cloneElement(endIcon as React.ReactElement<{ size?: number }>, { size: 16 })
              : endIcon
            : <CaretRight size={14} />}
        </span>
      )}
    </div>
  );
};

ListItem.displayName = 'ListItem';
