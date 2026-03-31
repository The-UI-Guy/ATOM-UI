import React, { useRef, useState, useCallback, useEffect } from 'react';
import type { SliderProps } from './Slider.types';

/**
 * Slider Component
 */
export const Slider = ({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  showLabels = false,
  formatLabel = (val) => `${val}%`,
  className = '',
}: SliderProps) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState<'single' | 'min' | 'max' | null>(null);
  const [hovering, setHovering] = useState<'single' | 'min' | 'max' | null>(null);

  const isRange = Array.isArray(value);
  const minValue = isRange ? value[0] : min;
  const maxValue = isRange ? value[1] : value;

  // Convert value to percentage
  const toPercent = (val: number) => ((val - min) / (max - min)) * 100;

  // Convert percentage to value
  const toValue = (percent: number) => {
    const rawValue = (percent / 100) * (max - min) + min;
    const stepped = Math.round(rawValue / step) * step;
    return Math.min(max, Math.max(min, stepped));
  };

  // Get percentage from mouse/touch position
  const getPercentFromEvent = useCallback((clientX: number) => {
    if (!trackRef.current) return 0;
    const rect = trackRef.current.getBoundingClientRect();
    const percent = ((clientX - rect.left) / rect.width) * 100;
    return Math.min(100, Math.max(0, percent));
  }, []);

  // Handle mouse/touch move
  const handleMove = useCallback((clientX: number) => {
    if (!dragging || disabled) return;

    const percent = getPercentFromEvent(clientX);
    const newValue = toValue(percent);

    if (isRange) {
      const [currentMin, currentMax] = value as [number, number];
      if (dragging === 'min') {
        onChange?.([Math.min(newValue, currentMax - step), currentMax]);
      } else if (dragging === 'max') {
        onChange?.([currentMin, Math.max(newValue, currentMin + step)]);
      }
    } else {
      onChange?.(newValue);
    }
  }, [dragging, disabled, getPercentFromEvent, isRange, value, onChange, step]);

  // Mouse events
  useEffect(() => {
    if (!dragging) return;

    const handleMouseMove = (e: MouseEvent) => handleMove(e.clientX);
    const handleMouseUp = () => setDragging(null);

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragging, handleMove]);

  // Touch events
  useEffect(() => {
    if (!dragging) return;

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) handleMove(e.touches[0].clientX);
    };
    const handleTouchEnd = () => setDragging(null);

    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [dragging, handleMove]);

  // Handle track click
  const handleTrackClick = (e: React.MouseEvent) => {
    if (disabled) return;
    
    const percent = getPercentFromEvent(e.clientX);
    const newValue = toValue(percent);

    if (isRange) {
      const [currentMin, currentMax] = value as [number, number];
      const midPoint = (currentMin + currentMax) / 2;
      if (newValue < midPoint) {
        onChange?.([newValue, currentMax]);
      } else {
        onChange?.([currentMin, newValue]);
      }
    } else {
      onChange?.(newValue);
    }
  };

  return (
    <div 
      className={`
        flex items-center gap-3
        ${disabled ? 'opacity-50' : ''}
        ${className}
      `}
    >
      {/* Min label */}
      {showLabels && (
        <span className="text-sm text-atom-text-secondary font-atom min-w-[3ch]">
          {formatLabel(isRange ? minValue : min)}
        </span>
      )}

      {/* Track container */}
      <div
        ref={trackRef}
        className={`
          relative flex-1 h-5 flex items-center
          ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
        `}
        onClick={handleTrackClick}
      >
        {/* Track background */}
        <div className="absolute w-full h-0.5 rounded-full bg-atom-neutral-one" />

        {/* Track fill */}
        <div
          className="absolute h-0.5 rounded-full bg-atom-primary-main"
          style={{
            left: isRange ? `${toPercent(minValue)}%` : '0%',
            width: isRange 
              ? `${toPercent(maxValue) - toPercent(minValue)}%` 
              : `${toPercent(maxValue)}%`,
          }}
        />

        {/* Min handle (range only) */}
        {isRange && (
          <div
            className="absolute w-2 h-2 rounded-full bg-white border border-atom-border-secondary transition-shadow duration-200"
            style={{ 
              left: `${toPercent(minValue)}%`,
              transform: 'translateX(-50%)',
              cursor: disabled ? 'not-allowed' : dragging === 'min' ? 'grabbing' : 'grab',
               boxShadow: dragging === 'min'
                ? '0 0 0 10px var(--atom-halo-primary)' // dragging double shadow size
                : hovering === 'min'
                  ? '0 0 0 4px var(--atom-halo-primary)' // hovering regular shadow size
                  : 'none',
            }}
            onMouseDown={(e) => {
              e.stopPropagation();
              if (!disabled) setDragging('min');
            }}
            onTouchStart={(e) => {
              e.stopPropagation();
              if (!disabled) setDragging('min');
            }}
            onMouseEnter={() => !disabled && setHovering('min')}
            onMouseLeave={() => setHovering(null)}
            role="slider"
            aria-valuemin={min}
            aria-valuemax={maxValue}
            aria-valuenow={minValue}
            tabIndex={disabled ? -1 : 0}
          />
        )}

        {/* Max handle (or single handle) */}
        <div
          className="absolute w-2 h-2 rounded-full bg-white border border-atom-border-secondary transition-shadow duration-200"
          style={{ 
            left: `${toPercent(maxValue)}%`,
            transform: 'translateX(-50%)',
            cursor: disabled ? 'not-allowed' : dragging === (isRange ? 'max' : 'single') ? 'grabbing' : 'grab',
            boxShadow: dragging === (isRange ? 'max' : 'single') 
            ? '0 0 0 10px var(--atom-halo-primary)' // dragging double shadow size
            : hovering === (isRange ? 'max' : 'single')
              ? '0 0 0 4px var(--atom-halo-primary)' // hovering regular shadow size
              : 'none',
          }}
          onMouseDown={(e) => {
            e.stopPropagation();
            if (!disabled) setDragging(isRange ? 'max' : 'single');
          }}
          onTouchStart={(e) => {
            e.stopPropagation();
            if (!disabled) setDragging(isRange ? 'max' : 'single');
          }}
          onMouseEnter={() => !disabled && setHovering(isRange ? 'max' : 'single')}
          onMouseLeave={() => setHovering(null)}
          role="slider"
          aria-valuemin={isRange ? minValue : min}
          aria-valuemax={max}
          aria-valuenow={maxValue}
          tabIndex={disabled ? -1 : 0}
        />
      </div>

      {/* Max label */}
      {showLabels && (
        <span className="text-sm text-atom-text-secondary font-atom min-w-[3ch]">
          {formatLabel(maxValue)}
        </span>
      )}
    </div>
  );
};

Slider.displayName = 'Slider';