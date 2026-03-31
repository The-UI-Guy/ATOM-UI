import React, { useState, useRef, useEffect } from 'react';
import type { TooltipProps, TooltipPlacement } from './Tooltip.types';

/**
 * Tooltip Component
 * 
 * A tooltip that appears on hover with configurable placement.
 * 
 * @example
 * <Tooltip content="Save your changes">
 *   <Button>Save</Button>
 * </Tooltip>
 * 
 * @example
 * <Tooltip content="More information here" placement="right">
 *   <InfoIcon />
 * </Tooltip>
 */
export const Tooltip = ({
  children,
  content,
  placement = 'top',
  delay = 0,
  disabled = false,
  className = '',
}: TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  // ==========================================
  // EVENT HANDLERS
  // ==========================================
  const showTooltip = () => {
    if (disabled) return;
    
    if (delay > 0) {
      timeoutRef.current = setTimeout(() => {
        setIsVisible(true);
      }, delay);
    } else {
      setIsVisible(true);
    }
  };

  const hideTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsVisible(false);
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // ==========================================
  // POSITIONING STYLES
  // ==========================================
  const getTooltipPosition = (): React.CSSProperties => {
    const offset = 8; // Distance from trigger
    
    const positions: Record<TooltipPlacement, React.CSSProperties> = {
      top: {
        bottom: '100%',
        left: '50%',
        transform: 'translateX(-50%)',
        marginBottom: offset,
      },
      bottom: {
        top: '100%',
        left: '50%',
        transform: 'translateX(-50%)',
        marginTop: offset,
      },
      left: {
        right: '100%',
        top: '50%',
        transform: 'translateY(-50%)',
        marginRight: offset,
      },
      right: {
        left: '100%',
        top: '50%',
        transform: 'translateY(-50%)',
        marginLeft: offset,
      },
    };

    return positions[placement];
  };

  // ==========================================
  // ARROW STYLES
  // ==========================================
  const getArrowStyles = (): React.CSSProperties => {
    const arrowSize = 6;
    
    const baseStyles: React.CSSProperties = {
      position: 'absolute',
      width: 0,
      height: 0,
      borderStyle: 'solid',
    };

    const arrowPositions: Record<TooltipPlacement, React.CSSProperties> = {
      top: {
        ...baseStyles,
        bottom: -arrowSize,
        left: '50%',
        transform: 'translateX(-50%)',
        borderWidth: `${arrowSize}px ${arrowSize}px 0 ${arrowSize}px`,
        borderColor: 'var(--atom-neutral-four) transparent transparent transparent',
      },
      bottom: {
        ...baseStyles,
        top: -arrowSize,
        left: '50%',
        transform: 'translateX(-50%)',
        borderWidth: `0 ${arrowSize}px ${arrowSize}px ${arrowSize}px`,
        borderColor: 'transparent transparent var(--atom-neutral-four) transparent',
      },
      left: {
        ...baseStyles,
        right: -arrowSize,
        top: '50%',
        transform: 'translateY(-50%)',
        borderWidth: `${arrowSize}px 0 ${arrowSize}px ${arrowSize}px`,
        borderColor: 'transparent transparent transparent var(--atom-neutral-four)',
      },
      right: {
        ...baseStyles,
        left: -arrowSize,
        top: '50%',
        transform: 'translateY(-50%)',
        borderWidth: `${arrowSize}px ${arrowSize}px ${arrowSize}px 0`,
        borderColor: 'transparent var(--atom-neutral-four) transparent transparent',
      },
    };

    return arrowPositions[placement];
  };

  // ==========================================
  // RENDER
  // ==========================================
  return (
    <div
      ref={triggerRef}
      className="relative inline-flex"
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
    >
      {/* Trigger element */}
      {children}

      {/* Tooltip */}
      {isVisible && (
        <div
          role="tooltip"
          className={`
            absolute z-50
            text-white text-sm font-atom
            ${className}
          `}
          style={{
            ...getTooltipPosition(),
            borderRadius: 6,
            backgroundColor: 'var(--atom-neutral-four)',
            paddingTop: 8,
            paddingBottom: 8,
            paddingLeft: 12,
            paddingRight: 12,
            maxWidth: 300,
            width: 'max-content',
          }}
        >
          {content}
          
          {/* Arrow */}
          <div style={getArrowStyles()} />
        </div>
      )}
    </div>
  );
};

Tooltip.displayName = 'Tooltip';