export interface ProgressBarProps {
  /** Progress value from 0–100 */
  value: number;
  /** Optional label rendered above the track */
  label?: string;
  /** Show "X% complete" text below the track */
  showDescription?: boolean;
}
