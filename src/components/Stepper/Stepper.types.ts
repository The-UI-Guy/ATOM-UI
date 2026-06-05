import type { ReactNode } from 'react';
import type { StepOrientation } from './StepperContext';

export interface StepperProps {
  /** Zero-based index of the current (in-progress) step */
  currentStep: number;
  /** Step components */
  children: ReactNode;
  /** Layout direction. Default: "horizontal" */
  orientation?: StepOrientation;
  /**
   * Called when the user clicks a completed step.
   * Receives the zero-based index of the clicked step.
   * If omitted, completed steps are not interactive.
   */
  onStepClick?: (index: number) => void;
}
