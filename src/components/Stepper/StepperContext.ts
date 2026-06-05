import { createContext, useContext } from 'react';

export type StepStage = 'complete' | 'in-progress' | 'empty';
export type StepOrientation = 'horizontal' | 'vertical';

export interface StepContextValue {
  index: number;
  stage: StepStage;
  orientation: StepOrientation;
  isLast: boolean;
  onStepClick?: (index: number) => void;
}

export const StepContext = createContext<StepContextValue>({
  index: 0,
  stage: 'empty',
  orientation: 'horizontal',
  isLast: false,
});

export const useStepContext = () => useContext(StepContext);
