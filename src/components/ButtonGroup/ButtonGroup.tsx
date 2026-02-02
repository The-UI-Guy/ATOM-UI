import React from 'react';
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
export const ButtonGroup = ({
  children,
  className = '',
}: ButtonGroupProps) => {
  
  const childArray = React.Children.toArray(children);
  const childCount = childArray.length;

  return (
       <div 
      className={`inline-flex ${className}`}
      role="group"
      style={{ 
        boxShadow: 'var(--atom-depth-1)',
        borderRadius: 'var(--atom-radius-md)',
        width: 'fit-content',
      }}
    >
      {childArray.map((child, index) => {
        if (!React.isValidElement(child)) return child;

        const isFirst = index === 0;
        const isLast = index === childCount - 1;

        // Calculate border radius
        let radiusStyle: React.CSSProperties = {};
        if (isFirst && isLast) {
          radiusStyle = { borderRadius: 'var(--atom-radius-md)' };
        } else if (isFirst) {
          radiusStyle = { 
            borderTopLeftRadius: 'var(--atom-radius-md)', 
            borderBottomLeftRadius: 'var(--atom-radius-md)',
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
          };
        } else if (isLast) {
          radiusStyle = { 
            borderTopRightRadius: 'var(--atom-radius-md)', 
            borderBottomRightRadius: 'var(--atom-radius-md)',
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
          };
        } else {
          radiusStyle = { borderRadius: 0 };
        }

        // Remove left border on non-first buttons to avoid double borders
        const borderStyle: React.CSSProperties = isFirst 
          ? {} 
          : { borderLeftWidth: 0 };

        // Merge with any existing styles on the child
        const existingStyle = (child.props as { style?: React.CSSProperties }).style || {};
        const mergedStyle = { ...existingStyle, ...radiusStyle, ...borderStyle };

        return React.cloneElement(child as React.ReactElement<{ style?: React.CSSProperties }>, {
          style: mergedStyle,
        });
      })}
    </div>
  );
};

ButtonGroup.displayName = 'ButtonGroup';
