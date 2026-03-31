import type { ReactNode } from 'react';

export interface ListItemProps {
  /** Label text for the menu item */
  children: ReactNode;
  /** Icon displayed at the start of the item */
  icon?: ReactNode;
  /** Keyboard shortcut label (e.g. "⌘⇧H") */
  shortcut?: string;
  /** Icon displayed at the end of the item */
  endIcon?: ReactNode;
  /** Shows a caret-right to indicate a submenu is available */
  hasSubmenu?: boolean;
  /** Active/selected state — renders with a dark background and white text */
  active?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Click handler */
  onClick?: () => void;
  className?: string;
}
