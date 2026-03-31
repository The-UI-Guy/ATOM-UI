import type { TagProps } from './Tag.types';
/**
 * Tag Component
 *
 * A versatile tag/chip component for labels, filters, and selections.
 *
 * @example
 * // Basic tag
 * <Tag>Label</Tag>
 *
 * @example
 * // With icon and counter
 * <Tag itemStart={<FileIcon />} counter={{ count: 5 }}>Documents</Tag>
 *
 * @example
 * // Checkable tag
 * <Tag checkable checked={isChecked} onCheckedChange={setIsChecked}>Option</Tag>
 *
 * @example
 * // Deletable tag
 * <Tag deletable onDelete={() => handleDelete()}>Removable</Tag>
 */
export declare const Tag: {
    ({ children, size, variant, color, itemStart, itemEnd, counter, checkable, checked, onCheckedChange, deletable, onDelete, onClick, disabled, className, }: TagProps): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
