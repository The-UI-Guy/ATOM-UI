/**
 * Checkbox size
 */
export type CheckboxSize = 'sm' | 'md';

/**
 * Checkbox component props
 */
export interface CheckboxProps {
  /**
   * Whether the checkbox is checked
   * @default false
   */
  checked?: boolean;

  /**
   * Callback when checked state changes
   */
  onChange?: (checked: boolean) => void;

  /**
   * Size of the checkbox
   * @default 'md'
   */
  size?: CheckboxSize;

  /**
   * Whether the checkbox is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Label text to display next to checkbox
   */
  label?: string;

  /**
   * ID for the input element
   */
  id?: string;

  /**
   * Name attribute for form submission
   */
  name?: string;

  /**
   * Additional CSS classes
   */
  className?: string;
}