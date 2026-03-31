import type { ListItemProps } from './ListItem.types';
/**
 * ListItem Component
 *
 * A single interactive item used inside a PopMenu. Supports a start icon,
 * label, keyboard shortcut, end icon / submenu indicator, and an active state.
 *
 * @example
 * <ListItem icon={<Rocket />} shortcut="⌘⇧D">Deploy</ListItem>
 *
 * @example
 * <ListItem icon={<TrashSimple />} shortcut="DEL">Delete</ListItem>
 *
 * @example
 * <ListItem icon={<Folder />} hasSubmenu>Open in…</ListItem>
 */
export declare const ListItem: {
    ({ children, icon, shortcut, endIcon, hasSubmenu, active, disabled, onClick, className, }: ListItemProps): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
