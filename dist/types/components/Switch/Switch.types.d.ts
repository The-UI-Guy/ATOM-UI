import { ReactNode } from 'react';
/**
 * Switch size
 */
export type SwitchSize = 'sm' | 'md';
/**
 * Switch component props
 */
export interface SwitchProps {
    /**
     * Whether the switch is on
     * @default false
     */
    checked?: boolean;
    /**
     * Callback when switch state changes
     */
    onChange?: (checked: boolean) => void;
    /**
     * Size of the switch
     * @default 'md'
     */
    size?: SwitchSize;
    /**
     * Label text displayed inside the switch (when on)
     */
    label?: string;
    /**
     * Icon displayed inside the switch (when on)
     */
    icon?: ReactNode;
    /**
     * Whether the switch is disabled
     * @default false
     */
    disabled?: boolean;
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
