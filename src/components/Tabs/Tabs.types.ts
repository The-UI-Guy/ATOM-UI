import { ReactNode } from 'react';

/**
 * Tab visual variants
 */
export type TabsVariant = 'segment' | 'underline';

/**
 * Tab orientation
 */
export type TabsOrientation = 'horizontal' | 'vertical';

/**
 * Tab size variants
 */
export type TabsSize = 'sm' | 'md';

/**
 * Individual tab item configuration
 */
export interface TabItem {
  /**
   * Unique value for the tab
   */
  value: string;

  /**
   * Tab label text
   */
  label?: string;

  /**
   * Tab icon
   */
  icon?: ReactNode;

  /**
   * Counter badge value
   */
  counter?: number;

  /**
   * Whether this tab is disabled
   */
  disabled?: boolean;
}

/**
 * Tabs component props
 */
export interface TabsProps {
  /**
   * Array of tab items
   */
  items: TabItem[];

  /**
   * Currently selected tab value
   */
  value?: string;

  /**
   * Default selected tab (uncontrolled)
   */
  defaultValue?: string;

  /**
   * Callback when tab changes
   */
  onValueChange?: (value: string) => void;

  /**
   * Visual variant
   * @default 'segment'
   */
  variant?: TabsVariant;

  /**
   * Size variant
   * @default 'md'
   */
  size?: TabsSize;

  /**
   * Orientation
   * @default 'horizontal'
   */
  orientation?: TabsOrientation;

  /**
   * Additional CSS classes for the container
   */
  className?: string;
}

/**
 * Tab content panel props
 */
export interface TabPanelProps {
  /**
   * Value matching the tab this panel belongs to
   */
  value: string;

  /**
   * Panel content
   */
  children: ReactNode;

  /**
   * Additional CSS classes
   */
  className?: string;
}
