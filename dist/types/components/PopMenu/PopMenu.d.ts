import type { PopMenuProps } from './PopMenu.types';
/**
 * PopMenu Component
 *
 * A floating context/popup menu panel. Renders a styled container with a
 * vertical list of ListItem children, separated by Dividers as needed.
 *
 * @example
 * <PopMenu>
 *   <ListItem icon={<CopySimple />} shortcut="⌘C">Copy</ListItem>
 *   <ListItem icon={<PaintRoller />} shortcut="⌘V">Paste</ListItem>
 *   <Divider paddingY="1" />
 *   <ListItem icon={<TrashSimple />} shortcut="DEL">Delete</ListItem>
 * </PopMenu>
 */
export declare const PopMenu: {
    ({ children, width, className, }: PopMenuProps): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
