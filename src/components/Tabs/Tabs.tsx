import React from 'react';
import * as RadixTabs from '@radix-ui/react-tabs';
import type { TabsProps, TabPanelProps, TabItem } from './Tabs.types';

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
  orientation = 'horizontal',
  className = '',
}: TabsProps) => {

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
  const getTriggerClasses = (item: TabItem, isSelected: boolean): string => {
    const baseClasses = `
      inline-flex items-center justify-center
      font-atom font-atom-medium text-sm
      transition-all duration-150
      cursor-pointer
      disabled:cursor-not-allowed disabled:opacity-50
    `;

    if (variant === 'segment') {
      return `
        ${baseClasses}
        px-2 py-1
        rounded-atom-md
        ${isSelected 
          ? 'bg-atom-surface-1 text-atom-text-primary shadow-sm' 
          : 'bg-transparent text-atom-text-secondary hover:text-atom-text-primary'
        }
      `;
    }

    // Underline variant
    if (orientation === 'horizontal') {
      return `
        ${baseClasses}
        px-0.5 py-1
        ${isSelected 
          ? 'text-atom-primary-main' 
          : 'text-atom-text-secondary hover:text-atom-text-primary'
        }
      `;
    }

    // Vertical underline
    return `
      ${baseClasses}
      px-1.5 py-1
      ${isSelected 
        ? 'text-atom-primary-main' 
        : 'text-atom-text-secondary hover:text-atom-text-primary'
      }
    `;
  };

  const getTriggerStyles = (isSelected: boolean): React.CSSProperties => {
    if (variant !== 'underline') return {};

    if (orientation === 'horizontal') {
      return {
        borderBottom: isSelected 
          ? '2px solid var(--atom-primary-main)' 
          : '2px solid transparent',
        marginBottom: -2,
      };
    }

    // Vertical underline
    return {
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
  const renderTabContent = (item: TabItem) => {
    const iconSize = 20;
    const hasLabel = !!item.label;
    const hasIcon = !!item.icon;
    const hasCounter = item.counter !== undefined;

    return (
      <>
        {hasIcon && (
          <span className="flex items-center justify-center">
            {React.isValidElement(item.icon)
              ? React.cloneElement(item.icon as React.ReactElement<{ size?: number }>, { 
                  size: iconSize,
                })
              : item.icon
            }
          </span>
        )}
        {hasLabel && <span>{item.label}</span>}
        {hasCounter && (
          <span 
            className="inline-flex items-center justify-center rounded-full text-xs font-atom-medium bg-atom-neutral-two text-atom-text-primary"
            style={{
              minWidth: 20,
              height: 20,
              paddingLeft: 6,
              paddingRight: 6,
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
        {items.map((item) => (
          <RadixTabs.Trigger
            key={item.value}
            value={item.value}
            disabled={item.disabled}
            className={getTriggerClasses(item, value === item.value || (!value && defaultValue === item.value))}
            style={{
              ...getTriggerStyles(value === item.value || (!value && defaultValue === item.value)),
              gap: 8,
            }}
          >
            {renderTabContent(item)}
          </RadixTabs.Trigger>
        ))}
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
