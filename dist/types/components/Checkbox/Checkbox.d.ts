import type { CheckboxProps } from './Checkbox.types';
/**
 * Checkbox Component
 *
 * A styled checkbox input with label support.
 *
 * @example
 * <Checkbox label="Accept terms" checked={checked} onChange={setChecked} />
 */
export declare const Checkbox: {
    ({ checked, onChange, size, disabled, label, id, name, className, }: CheckboxProps): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
