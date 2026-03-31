import type { SwitchProps } from './Switch.types';
/**
 * Switch Component
 *
 * A toggle switch for binary on/off states.
 *
 * @example
 * <Switch checked={isOn} onChange={setIsOn} />
 *
 * @example
 * // With label and icon
 * <Switch checked={isOn} onChange={setIsOn} label="Label" icon={<Check />} />
 */
export declare const Switch: {
    ({ checked, onChange, size, label, icon, disabled, id, name, className, }: SwitchProps): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
