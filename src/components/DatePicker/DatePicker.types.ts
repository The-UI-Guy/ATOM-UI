export type DatePickerVariant = 'single' | 'range';

export interface DatePickerProps {
  /** Show a single month or two side-by-side for range selection */
  variant?: DatePickerVariant;
  /** Selected date (single mode) */
  value?: Date | null;
  /** Range start date (range mode) */
  startDate?: Date | null;
  /** Range end date (range mode) */
  endDate?: Date | null;
  /** Called when a date is selected (single mode) */
  onChange?: (date: Date) => void;
  /** Called when range changes (range mode). endDate is null while selecting. */
  onRangeChange?: (start: Date | null, end: Date | null) => void;
  className?: string;
}
