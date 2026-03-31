/**
 * Radio size
 */
export type RadioSize = 'sm' | 'md';
/**
 * Radio component props
 */
export interface RadioProps {
    /**
     * Whether the radio is selected
     * @default false
     */
    checked?: boolean;
    /**
     * Callback when selection changes
     */
    onChange?: (checked: boolean) => void;
    /**
     * Size of the radio
     * @default 'md'
     */
    size?: RadioSize;
    /**
     * Whether the radio is disabled
     * @default false
     */
    disabled?: boolean;
    /**
     * Label text to display next to radio
     */
    label?: string;
    /**
     * ID for the input element
     */
    id?: string;
    /**
     * Name attribute for grouping radios
     */
    name?: string;
    /**
     * Value for form submission
     */
    value?: string;
    /**
     * Additional CSS classes
     */
    className?: string;
}
