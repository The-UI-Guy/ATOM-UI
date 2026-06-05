import type { ReactNode } from 'react';

export interface StepProps {
  /** Primary label */
  label: string;
  /** Optional secondary label rendered below the primary */
  subLabel?: string;
  /** Optional extras rendered inline with the label (e.g. a Badge counter) */
  children?: ReactNode;
}
