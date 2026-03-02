import { ReactNode } from 'react';

/**
 * ListItem size variants
 */
export type ListItemSize = 'sm' | 'md';

/**
 * ListItem component props
 */
export interface ListItemProps {
  /**
   * Main content/label
   */
  children: ReactNode;

  /**
   * Start slot - checkbox, radio, avatar, icon, etc.
   */
  itemStart?: ReactNode;

  /**
   * End slot - checkbox, radio, avatar, icon, etc.
   */
  itemEnd?: ReactNode;

  /**
   * End text - for shortcuts, counts, etc.
   */
  endText?: string;

  /**
   * Size variant
   * @default 'md'
   */
  size?: ListItemSize;

  /**
   * Whether the item is selected/active
   * @default false
   */
  selected?: boolean;

  /**
   * Whether the item is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Click handler
   */
  onClick?: () => void;

  /**
   * Additional class
   */
  className?: string;
}
