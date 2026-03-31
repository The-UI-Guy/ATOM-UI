import { ReactNode, InputHTMLAttributes } from 'react';

/**
 * Input size variants
 */
export type InputSize = 'sm' | 'md' | 'lg';

/**
 * Base props shared by all input types
 */
export interface InputBaseProps {
  /**
   * Label text displayed above the input
   */
  label?: string;

  /**
   * Helper text displayed below the input
   */
  helperText?: string;

  /**
   * Error state - changes border/halo to error color
   */
  error?: boolean;

  /**
   * Error message (overrides helperText when error is true)
   */
  errorMessage?: string;

  /**
   * Size variant
   * @default 'md'
   */
  size?: InputSize;

  /**
   * Whether the input takes full width
   * @default false
   */
  fullWidth?: boolean;

  /**
   * Additional class name for the wrapper
   */
  className?: string;
}

/**
 * TextField props
 */
export interface TextFieldProps extends InputBaseProps, Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /**
   * Icon displayed on the left side
   */
  iconLeft?: ReactNode;

  /**
   * Icon displayed on the right side
   */
  iconRight?: ReactNode;
}

/**
 * SelectField option
 */
export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

/**
 * SelectField props
 */
export interface SelectFieldProps extends InputBaseProps {
  /**
   * Options for the select dropdown
   */
  options: SelectOption[];

  /**
   * Placeholder text when no option is selected
   */
  placeholder?: string;

  /**
   * Currently selected value
   */
  value?: string;

  /**
   * Called with the selected option's value when selection changes
   */
  onChange?: (value: string) => void;

  /**
   * Icon displayed on the left side
   */
  iconLeft?: ReactNode;

  /**
   * Disables the field
   */
  disabled?: boolean;

  /**
   * Name attribute (for form usage)
   */
  name?: string;
}

/**
 * PasswordField props
 */
export interface PasswordFieldProps extends InputBaseProps, Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  /**
   * Icon displayed on the left side
   */
  iconLeft?: ReactNode;
}

/**
 * SearchField props
 */
export interface SearchFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  /**
   * Size variant
   * @default 'md'
   */
  size?: InputSize;

  /**
   * Whether the input takes full width
   * @default false
   */
  fullWidth?: boolean;

  /**
   * Additional class name for the wrapper
   */
  className?: string;
}
