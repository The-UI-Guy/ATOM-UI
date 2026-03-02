import { ReactNode } from 'react';

/**
 * Popover positioning
 */
export type PopoverSide = 'top' | 'bottom' | 'left' | 'right';
export type PopoverAlign = 'start' | 'center' | 'end';

/**
 * Base Popover component props
 */
export interface PopoverProps {
  /**
   * Trigger element that opens the popover
   */
  trigger: ReactNode;

  /**
   * Popover content
   */
  children: ReactNode;

  /**
   * Side of the trigger to render the popover
   * @default 'bottom'
   */
  side?: PopoverSide;

  /**
   * Alignment relative to trigger
   * @default 'start'
   */
  align?: PopoverAlign;

  /**
   * Offset from the trigger (px)
   * @default 4
   */
  sideOffset?: number;

  /**
   * Controlled open state
   */
  open?: boolean;

  /**
   * Callback when open state changes
   */
  onOpenChange?: (open: boolean) => void;

  /**
   * Min width of the popover
   * @default 200
   */
  minWidth?: number;

  /**
   * Max height before scrolling
   */
  maxHeight?: number;

  /**
   * Additional class for the content
   */
  className?: string;

  /**
   * Whether to match trigger width
   * @default false
   */
  matchTriggerWidth?: boolean;
}

/**
 * Standard list item
 */
export interface PopoverItemProps {
  /**
   * Item content/label
   */
  children: ReactNode;

  /**
   * Icon before the label
   */
  icon?: ReactNode;

  /**
   * Value displayed on right side (shortcuts, counts)
   */
  value?: ReactNode;

  /**
   * Whether the item is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Whether the item is selected/active
   * @default false
   */
  selected?: boolean;

  /**
   * Click handler
   */
  onClick?: () => void;

  /**
   * Additional class
   */
  className?: string;
}

/**
 * Checkbox item
 */
export interface PopoverCheckboxItemProps {
  /**
   * Item label
   */
  children: ReactNode;

  /**
   * Whether checked
   */
  checked: boolean;

  /**
   * Change handler
   */
  onCheckedChange: (checked: boolean) => void;

  /**
   * Whether disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Additional class
   */
  className?: string;
}

/**
 * Radio item (use within RadioGroup)
 */
export interface PopoverRadioItemProps {
  /**
   * Item label
   */
  children: ReactNode;

  /**
   * Radio value
   */
  value: string;

  /**
   * Whether disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Additional class
   */
  className?: string;
}

/**
 * Radio group wrapper
 */
export interface PopoverRadioGroupProps {
  /**
   * Radio items
   */
  children: ReactNode;

  /**
   * Current selected value
   */
  value: string;

  /**
   * Change handler
   */
  onValueChange: (value: string) => void;
}

/**
 * Separator
 */
export interface PopoverSeparatorProps {
  className?: string;
}

/**
 * Header/Label
 */
export interface PopoverHeaderProps {
  children: ReactNode;
  className?: string;
}
