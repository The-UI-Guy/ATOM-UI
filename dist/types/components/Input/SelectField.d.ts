import type { SelectFieldProps } from './Input.types';
/**
 * SelectField Component
 *
 * A dropdown select backed by PopMenu — never uses the native <select>.
 * The trigger matches the TextField visual style; options render as ListItems.
 *
 * @example
 * <SelectField
 *   label="Country"
 *   placeholder="Select a country"
 *   value={value}
 *   onChange={setValue}
 *   options={[
 *     { value: 'us', label: 'United States' },
 *     { value: 'uk', label: 'United Kingdom' },
 *   ]}
 * />
 */
export declare const SelectField: {
    ({ label, helperText, error, errorMessage, size, fullWidth, className, iconLeft, options, placeholder, disabled, value, onChange, name, }: SelectFieldProps): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
