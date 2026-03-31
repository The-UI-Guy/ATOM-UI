import type { ReactNode } from 'react';
export interface PopMenuProps {
    /** ListItems and Dividers to render inside the menu */
    children: ReactNode;
    /** Width of the menu panel in pixels or CSS string e.g. '100%' (default: 264) */
    width?: number | string;
    className?: string;
}
