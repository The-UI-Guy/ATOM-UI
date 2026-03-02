import React from 'react';
import * as RadixTabs from '@radix-ui/react-tabs';
import type { TabsProps, TabPanelProps, TabItem, TabsSize } from './Tabs.types';

/**
 * Tabs Component
 * 
 * A tabbed interface with segment or underline variants.
 * Built on Radix UI for accessibility and keyboard navigation.
 * 
 * @example
 * // Segment style
 * <Tabs
 *   variant="segment"
 *   items={[
 *     { value: 'account', label: 'Account' },
 *     { value: 'settings', label: 'Settings' },
 *   ]}
 *   defaultValue="account"
 * />
 * 
 * @example
 * // Underline style with icons and counters
 * <Tabs
 *   variant="underline"
 *   items={[
 *     { value: 'users', label: 'Users', icon: <UserIcon />, counter: 234 },
 *     { value: 'teams', label: 'Teams', icon: <TeamIcon /> },
 *   ]}
 * />
 */
export const Tabs = ({
  items,
  value,
  defaultValue,
  onValueChange,
  variant = 'segment',
  size = 'md',
  orientation = 'horizontal',
  className = '',
}: TabsProps) => {

  // ==========================================
  // SIZE CONFIGURATION
  // ==========================================
  const sizeConfig: Record<TabsSize, {
    fontSize: number;
    paddingX: number;
    paddingY: number;
    iconSize: number;
    counterSize: number;
    counterPadding: number;
    gap: number;
  }> = {
    sm: {
      fontSize: 12,
      paddingX: 12,
      paddingY: 6,
      iconSize: 16,
      counterSize: 16,
      counterPadding: 4,
      gap: 6,
    },
    md: {
      fontSize: 14,
      paddingX: 16,
      paddingY: 8,
      iconSize: 20,
      counterSize: 20,
      counterPadding: 6,
      gap: 8,
    },
  };

  const config = sizeConfig[size];

  // ==========================================
  // CONTAINER STYLES
  // ==========================================
  const getListStyles = (): React.CSSProperties => {
    const baseStyles: React.CSSProperties = {
      display: 'inline-flex',
      gap: variant === 'segment' ? 0 : (orientation === 'horizontal' ? 8 : 0),
      flexDirection: orientation === 'horizontal' ? 'row' : 'column',
    };

    if (variant === 'segment') {
      return {
        ...baseStyles,
        backgroundColor: 'var(--atom-neutral-one)',
        borderRadius: 'var(--atom-radius-lg)',
        padding: 4,
      };
    }

    return baseStyles;
  };

  // ==========================================
  // TAB TRIGGER STYLES
  // ==========================================
  const getTriggerClasses = (isSelected: boolean): string => {
    const baseClasses = `
      inline-flex items-center justify-center
      font-atom font-atom-medium
      transition-all duration-150
      cursor-pointer
      disabled:cursor-not-allowed disabled:opacity-50
    `;

    if (variant === 'segment') {
      return `
        ${baseClasses}
        rounded-atom-md
        ${isSelected 
          ? 'bg-atom-surface-1 text-atom-text-primary shadow-sm' 
          : 'bg-transparent text-atom-text-secondary hover:text-atom-text-primary'
        }
      `;
    }

    // Underline variant
    return `
      ${baseClasses}
      ${isSelected 
        ? 'text-atom-primary-main' 
        : 'text-atom-text-secondary hover:text-atom-text-primary'
      }
    `;
  };

  const getTriggerStyles = (isSelected: boolean): React.CSSProperties => {
    const baseStyles: React.CSSProperties = {
      fontSize: config.fontSize,
      paddingLeft: config.paddingX,
      paddingRight: config.paddingX,
      paddingTop: config.paddingY,
      paddingBottom: config.paddingY,
      gap: config.gap,
    };

    if (variant !== 'underline') {
      return baseStyles;
    }

    if (orientation === 'horizontal') {
      return {
        ...baseStyles,
        borderBottom: isSelected 
          ? '2px solid var(--atom-primary-main)' 
          : '2px solid transparent',
        marginBottom: -2,
      };
    }

    // Vertical underline
    return {
      ...baseStyles,
      borderLeft: isSelected 
        ? '2px solid var(--atom-primary-main)' 
        : '2px solid transparent',
    };
  };

  // ==========================================
  // UNDERLINE BORDER
  // ==========================================
  const getListBorderStyles = (): React.CSSProperties => {
    if (variant !== 'underline') return {};

    if (orientation === 'horizontal') {
      return {
        borderBottom: '1px solid var(--atom-border-primary)',
      };
    }

    return {
      borderLeft: '1px solid var(--atom-border-primary)',
    };
  };

  // ==========================================
  // RENDER TAB CONTENT
  // ==========================================
  const renderTabContent = (item: TabItem, isSelected: boolean) => {
    const hasLabel = !!item.label;
    const hasIcon = !!item.icon;
    const hasCounter = item.counter !== undefined;

    // Icon color based on variant and selection state
    const getIconColor = (): string => {
      if (variant === 'underline' && isSelected) {
        return 'var(--atom-primary-main)';
      }
      return 'var(--atom-neutral-icon)';
    };

    return (
      <>
        {hasIcon && (
          <span 
            className="flex items-center justify-center"
            style={{ color: getIconColor() }}
          >
            {React.isValidElement(item.icon)
              ? React.cloneElement(item.icon as React.ReactElement<{ size?: number }>, { 
                  size: config.iconSize,
                })
              : item.icon
            }
          </span>
        )}
        {hasLabel && <span>{item.label}</span>}
        {hasCounter && (
          <span 
            className="inline-flex items-center justify-center rounded-full font-atom-medium bg-atom-neutral-two text-atom-text-primary"
            style={{
              minWidth: config.counterSize,
              height: config.counterSize,
              paddingLeft: config.counterPadding,
              paddingRight: config.counterPadding,
              fontSize: config.fontSize - 2,
            }}
          >
            {item.counter}
          </span>
        )}
      </>
    );
  };

  // ==========================================
  // RENDER
  // ==========================================
  return (
    <RadixTabs.Root
      value={value}
      defaultValue={defaultValue || items[0]?.value}
      onValueChange={onValueChange}
      orientation={orientation}
      className={className}
    >
      <RadixTabs.List
        style={{
          ...getListStyles(),
          ...getListBorderStyles(),
        }}
      >
        {items.map((item) => {
          const isSelected = value === item.value || (!value && (defaultValue || items[0]?.value) === item.value);
          return (
            <RadixTabs.Trigger
              key={item.value}
              value={item.value}
              disabled={item.disabled}
              className={getTriggerClasses(isSelected)}
              style={getTriggerStyles(isSelected)}
            >
              {renderTabContent(item, isSelected)}
            </RadixTabs.Trigger>
          );
        })}
      </RadixTabs.List>
    </RadixTabs.Root>
  );
};

/**
 * TabPanel Component
 * 
 * Content panel for a tab. Use with Tabs component.
 * 
 * @example
 * <Tabs.Panel value="account">
 *   <AccountSettings />
 * </Tabs.Panel>
 */
export const TabPanel = ({
  value,
  children,
  className = '',
}: TabPanelProps) => {
  return (
    <RadixTabs.Content
      value={value}
      className={`outline-none ${className}`}
    >
      {children}
    </RadixTabs.Content>
  );
};

// Attach Panel as a static property
Tabs.Panel = TabPanel;

Tabs.displayName = 'Tabs';
TabPanel.displayName = 'TabPanel';