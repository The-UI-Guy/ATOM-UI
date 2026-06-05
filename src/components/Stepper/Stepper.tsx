import React from 'react';
import { StepContext } from './StepperContext';
import type { StepStage } from './StepperContext';
import type { StepperProps } from './Stepper.types';

export const Stepper = ({
  currentStep,
  orientation = 'horizontal',
  onStepClick,
  children,
}: StepperProps) => {
  const steps = React.Children.toArray(children);
  const total = steps.length;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: orientation === 'horizontal' ? 'row' : 'column',
        alignItems: orientation === 'horizontal' ? 'stretch' : 'flex-start',
      }}
    >
      {steps.map((child, index) => {
        const stage: StepStage =
          index < currentStep
            ? 'complete'
            : index === currentStep
            ? 'in-progress'
            : 'empty';

        return (
          <StepContext.Provider
            key={index}
            value={{
              index,
              stage,
              orientation,
              isLast: index === total - 1,
              onStepClick,
            }}
          >
            {child}
          </StepContext.Provider>
        );
      })}
    </div>
  );
};

Stepper.displayName = 'Stepper';
