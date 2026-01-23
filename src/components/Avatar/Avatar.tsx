import React from 'react';
import { User } from '@phosphor-icons/react';
import type { AvatarProps, AvatarSize, AvatarShape } from './Avatar.types';
import { Badge } from '../Badge/Badge';


/**
 * Generate initials from a name
 * "John Doe" → "JD"
 * "John" → "J"
 * "John Middle Doe" → "JD" (first and last)
 */
const getName = (name: string, size: AvatarSize): string => {
  const parts = name.trim().split(/\s+/);
   // For extra small and small avatars, only show first initial
  if (size === 'xs' || size === 'sm') {
    return parts[0].charAt(0).toUpperCase();
  }
  if (parts.length === 1) {
    return parts[0].charAt(0).toUpperCase();
  }
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
};

/**
 * Avatar Component
 * 
 * Displays a user avatar as an image, initials, or icon.
 * 
 * @example
 * // Image avatar
 * <Avatar type="image" src="/photo.jpg" alt="John Doe" />
 * 
 * @example
 * // Text avatar with initials
 * <Avatar type="text" name="John Doe" />
 * 
 * @example
 * // Icon avatar (default)
 * <Avatar type="icon" size="lg" shape="square" />
 */


export const Avatar = ({
  badge,  
  type = 'icon',
  size = 'md',
  shape = 'round',
  src,
  alt = '',
  name,
  icon,
  className = '',
}: AvatarProps) => {
  
  // ==========================================
  // SIZE STYLES
  // Controls dimensions and font/icon sizes
  // ==========================================
  const sizeStyles: Record<AvatarSize, { 
    container: string; 
    text: string; 
    iconSize: number;
  }> = {
    xs: {
      container: 'w-atom-2 h-atom-2',      // 16px
      text: 'text-xs',           // 12px
      iconSize: 16,
    },
    sm: {
      container: 'w-atom-3 h-atom-3',    // 24px
      text: 'text-sm',           // 14px
      iconSize: 20,
    },
    md: {
      container: 'w-atom-4 h-atom-4',    // 32px
      text: 'text-sm',           // 14px
      iconSize: 28,
    },
    lg: {
      container: 'w-atom-5 h-atom-5',    // 40px
      text: 'text-lg',          // 24px
      iconSize: 40,
    },
  };

  // ==========================================
  // SHAPE STYLES
  // Controls border radius
  // ==========================================
  const shapeStyles: Record<AvatarShape, string> = {
    round: 'rounded-full',
    square: 'rounded-atom-md',  // 16px rounded corners
  };

  // ==========================================
  // DETERMINE CONTENT
  // ==========================================
  const displayName = name ? getName(name, size) : '';
  const displayIcon = icon || <User size={sizeStyles[size].iconSize} weight="regular" />;
  
  // ==========================================
  // RENDER BADGE
  // ==========================================

    const renderBadge = () => {
    if (!badge) return null;

    const badgeProps = badge === true 
      ? { type: 'dot' as const, intent: 'primary' as const }
      : badge;

    return (
      <div className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4">
        <Badge {...badgeProps} />
      </div>
    );
  };

  // ==========================================
  // RENDER CONTENT BASED ON TYPE
  // ==========================================
  const renderContent = () => {
    switch (type) {
      case 'image':
        return (
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover"
          />
        );
      case 'text':
        return (
          <span className={`font-atom font-atom-medium ${sizeStyles[size].text} text-atom-primary-main`}>
            {displayName}
          </span>
        );
      case 'icon':
      default:
        return (
          <span className="text-atom-primary-main">
            {displayIcon}
          </span>
        );
    }
  };

  // ==========================================
  // CONTAINER STYLES
  // ==========================================
  const baseStyles = `
    inline-flex items-center justify-center
    overflow-hidden
    ${sizeStyles[size].container}
    ${shapeStyles[shape]}
  `;

  // Image type has no background, text/icon have primary background
  const backgroundStyles = type === 'image' 
    ? '' 
    : 'bg-atom-primary-transparent border border-atom-primary-main';

  return (
     <div className="relative inline-flex">
    <div
      className={`
        ${baseStyles}
        ${backgroundStyles}
        ${className}
      `}
      role="img"
      aria-label={alt || name || 'Avatar'}
    >
      {renderContent()}
    </div>
     {renderBadge()}
    </div>
  );
};

Avatar.displayName = 'Avatar';