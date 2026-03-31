import type { TabsProps, TabPanelProps } from './Tabs.types';
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
export declare const Tabs: {
    ({ items, value, defaultValue, onValueChange, variant, size, orientation, className, }: TabsProps): import("react/jsx-runtime").JSX.Element;
    Panel: {
        ({ value, children, className, }: TabPanelProps): import("react/jsx-runtime").JSX.Element;
        displayName: string;
    };
    displayName: string;
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
export declare const TabPanel: {
    ({ value, children, className, }: TabPanelProps): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
