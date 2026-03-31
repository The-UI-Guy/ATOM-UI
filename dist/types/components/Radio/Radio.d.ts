import type { RadioProps } from './Radio.types';
/**
 * Radio Component
 *
 * A styled radio input with label support.
 *
 * @example
 * <Radio label="Option A" name="options" checked={selected === 'a'} onChange={() => setSelected('a')} />
 */
export declare const Radio: {
    ({ checked, onChange, size, disabled, label, id, name, value, className, }: RadioProps): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
