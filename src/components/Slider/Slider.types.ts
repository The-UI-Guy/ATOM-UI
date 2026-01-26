/**
 * Slider component props
 */
export interface SliderProps {
  /**
   * Current value (single slider) or [min, max] values (range slider)
   */
  value: number | [number, number];

  /**
   * Callback when value changes
   */
  onChange?: (value: number | [number, number]) => void;

  /**
   * Minimum value
   * @default 0
   */
  min?: number;

  /**
   * Maximum value
   * @default 100
   */
  max?: number;

  /**
   * Step increment
   * @default 1
   */
  step?: number;

  /**
   * Whether the slider is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Show value label(s) at the ends
   * @default false
   */
  showLabels?: boolean;

  /**
   * Format the label value
   * @default (val) => `${val}%`
   */
  formatLabel?: (value: number) => string;

  /**
   * Additional CSS classes
   */
  className?: string;
}
