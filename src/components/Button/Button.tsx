import { forwardRef } from 'react';
import { CircleNotch } from '@phosphor-icons/react';
import type { ButtonProps } from './Button.types';

/**
 * Button Component
 * 
 * A versatile button component with multiple variants, sizes, and icon support.
 * 
 * @example
 * // Primary button
 * <Button variant="primary">Click me</Button>
 * 
 * @example
 * // Outline button with icon
 * <Button variant="outline" iconStart={<PlusIcon />}>Add item</Button>
 * 
 * @example
 * // Icon-only button
 * <Button variant="text" iconOnly><SearchIcon /></Button>
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      iconStart,
      iconEnd,
      iconOnly = false,
      loading = false,
      disabled = false,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    // ==========================================
    // BASE STYLES
    // These apply to ALL buttons regardless of variant
    // ==========================================
    const baseStyles = [
      // Font 
      'font-atom',
      // Layout
      'inline-flex items-center justify-center',
      // Typography
      'font-atom font-atom-medium',
      // Transitions
      'transition-colors duration-150 ease-in-out',
      // Focus ring (accessibility)
      'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
      // Disabled state
      'disabled:cursor-not-allowed disabled:opacity-50',
    ].join(' ');

    // ==========================================
    // VARIANT STYLES
    // Controls colors based on button type
    // ==========================================
    const variantStyles: Record<string, string> = {
      primary: [
        // Background
        'bg-atom-primary-main',
        'hover:bg-atom-primary-tint2',
        // Border
        'border border-atom-primary-tint2',
        // Text & Icons
        'text-atom-primary-contrast',
        // Focus ring color
        'focus-visible:ring-atom-halo-primary',
      ].join(' '),

      outline: [
        // Background
        'bg-atom-surface-1',
        'hover:bg-atom-neutral-one',
        // Border
        'border border-atom-border-primary',
        // Shadow
        'shadow-atom-depth-1',
        // Text & Icons
        'text-atom-text-primary',
        // Focus ring color
        'focus-visible:ring-atom-halo-default',
      ].join(' '),

      text: [
        // Background
        'bg-transparent',
        'hover:bg-atom-neutral-one',
        // Border
        'border border-transparent',
        // Text & Icons
        'text-atom-text-primary',
        // Focus ring color
        'focus-visible:ring-atom-halo-default',
      ].join(' '),

      destructive: [
        // Background
        'bg-atom-error-main',
        'hover:bg-atom-error-tint2',
        // Border
        'border border-atom-error-tint2',
        // Text & Icons
        'text-atom-error-contrast',
        // Focus ring color
        'focus-visible:ring-atom-halo-error',
      ].join(' '),
    };

    // ==========================================
    // SIZE STYLES
    // Controls padding, font size, and height
    // ==========================================
    const sizeStyles: Record<string, string> = {
      sm: iconOnly
        ? 'h-[28px] w-[28px] font-atom-medium text-atom-sm'
        : 'h-[28px] px-2 font-atom-medium text-atom-sm gap-1',
      md: iconOnly
        ? 'h-[40px] w-[40px] font-atom-medium text-atom-sm'
        : 'h-[40px] px-2 font-atom-medium text-atom-sm gap-1',
      lg: iconOnly
        ? 'h-[48px] w-[48px] font-atom-medium text-atom-sm'
        : 'h-[48px] px-2 font-atom-medium text-atom-sm gap-1',
    };

    // ==========================================
    // ICON STYLES
    // Different colors for outline/text vs primary/destructive
    // ==========================================
    const getIconClass = (): string => {
      if (variant === 'outline' || variant === 'text') {
        return 'text-atom-neutral-icon';
      }
      // Primary and destructive use the contrast color (inherited from text)
      return '';
    };

    // ==========================================
    // BORDER RADIUS
    // Uses your design token
    // ==========================================
    const radiusStyle = 'rounded-atom-md';

    // ==========================================
    // COMBINE ALL STYLES
    // ==========================================
    const combinedClassName = [
      baseStyles,
      variantStyles[variant],
      sizeStyles[size],
      radiusStyle,
      className, // Allow custom classes to be added
    ].join(' ');

    // ==========================================
    // RENDER
    // ==========================================
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={combinedClassName}
        {...props}
      >
        {/* Loading spinner - replaces start icon when loading */}
        {loading ? (
          <CircleNotch className="animate-spin" size={size === 'sm' ? 16 : size === 'md' ? 18 : 20} />
        ) : (
          iconStart && <span className={getIconClass()}>{iconStart}</span>
        )}

        {/* Button text - hidden for icon-only buttons */}
        {!iconOnly && children && <span>{children}</span>}

        {/* End icon - hidden when loading */}
        {!loading && iconEnd && <span className={getIconClass()}>{iconEnd}</span>}

        {/* For icon-only buttons, render children as the icon */}
        {iconOnly && !loading && <span className={getIconClass()}>{children}</span>}
      </button>
    );
  }
);

// Display name for React DevTools
Button.displayName = 'Button';