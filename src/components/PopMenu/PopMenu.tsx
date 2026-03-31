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
export const PopMenu = ({
  children,
  width = 264,
  className = '',
}: PopMenuProps) => {

  return (
    <div
      role="menu"
      className={`flex flex-col ${className}`}
      style={{
        width,
        backgroundColor: 'var(--atom-surface-1)',
        borderRadius: 8,
        border: '1px solid var(--atom-border-primary)',
        paddingTop: 8,
        paddingBottom: 8,
        boxShadow: '0 8px 24px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06)',
      }}
    >
      {children}
    </div>
  );
};

PopMenu.displayName = 'PopMenu';
