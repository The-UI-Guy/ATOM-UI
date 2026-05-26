/**
 * Divider line style
 */
export type DividerType = 'solid' | 'dashed';

/**
 * Divider color options (maps to border tokens)
 */
export type DividerColor = 'primary' | 'secondary' | 'tertiary';

/**
 * Spacing options (maps to atom spacing tokens)
 */
export type DividerSpacing = 'none' | 'half' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10';

/**
 * Divider component props
 */
export interface DividerProps {
  /**
   * Line style
   * @default 'solid'
   */
  type?: DividerType;

  /**
   * Line color
   * @default 'primary'
   */
  color?: DividerColor;

  /**
   * Padding top
   * @default 'none'
   */
  paddingTop?: DividerSpacing;

  /**
   * Padding bottom
   * @default 'none'
   */
  paddingBottom?: DividerSpacing;

  /**
   * Padding left
   * @default 'none'
   */
  paddingLeft?: DividerSpacing;

  /**
   * Padding right
   * @default 'none'
   */
  paddingRight?: DividerSpacing;

  /**
   * Shorthand for paddingTop and paddingBottom
   */
  paddingY?: DividerSpacing;

  /**
   * Shorthand for paddingLeft and paddingRight
   */
  paddingX?: DividerSpacing;

  /**
   * Additional CSS classes for the wrapper
   */
  className?: string;
}
