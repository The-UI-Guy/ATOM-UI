import type { DatePickerProps } from './DatePicker.types';
/**
 * DatePicker Component
 *
 * Single-month or dual-month (range) date picker. Month and year navigation
 * uses PopMenu dropdowns. In range mode, hover previews the selection span.
 *
 * @example
 * // Single
 * <DatePicker value={date} onChange={setDate} />
 *
 * @example
 * // Range
 * <DatePicker variant="range" startDate={start} endDate={end} onRangeChange={(s, e) => { setStart(s); setEnd(e); }} />
 */
export declare const DatePicker: {
    ({ variant, value, startDate, endDate, onChange, onRangeChange, className, }: DatePickerProps): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
