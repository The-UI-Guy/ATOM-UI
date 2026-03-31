import type { ButtonGroupProps } from './ButtonGroup.types';
/**
 * ButtonGroup Component
 *
 * A wrapper that groups buttons together with seamless styling.
 * Pass Button components as children - they keep their own sizing/styling.
 * ButtonGroup only modifies borders and radius to create a unified look.
 *
 * @example
 * <ButtonGroup>
 *   <Button variant="outline" icon={<AlignLeft />} />
 *   <Button variant="outline" icon={<AlignCenter />} />
 *   <Button variant="outline" icon={<AlignRight />} />
 * </ButtonGroup>
 */
export declare const ButtonGroup: {
    ({ children, className, }: ButtonGroupProps): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
