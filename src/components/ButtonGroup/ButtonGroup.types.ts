import { ReactNode } from 'react';

/**
 * ButtonGroup component props
 */
export interface ButtonGroupProps {
  /**
   * Button components to group together
   */
  children: ReactNode;

  /**
   * Additional CSS classes
   */
  className?: string;
}
