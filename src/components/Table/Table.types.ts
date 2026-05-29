import { ReactNode } from 'react';
import type { PaginationProps } from '../Pagination/Pagination.types';

export interface TableColumn<T = Record<string, unknown>> {
  /** Matches a key on the data row */
  key: string;
  header: string;
  width?: number | string;
  /** Adds a sort toggle to the header. Fires onSort on the Table. */
  sortable?: boolean;
  /** Custom cell renderer. Receives (value, row). */
  render?: (value: unknown, row: T) => ReactNode;
  /**
   * Clicking the cell enters edit mode.
   * Mutually exclusive with onClick.
   */
  editable?: boolean;
  /**
   * Custom edit control. Receives (currentValue, row, onChange).
   * Defaults to a plain text input when editable=true and this is omitted.
   */
  renderEdit?: (value: unknown, row: T, onChange: (v: unknown) => void) => ReactNode;
  /**
   * Click handler for navigation / drill-down.
   * Mutually exclusive with editable.
   */
  onClick?: (value: unknown, row: T) => void;
  /** Hidden by default; toggleable via the built-in Columns panel. */
  hidden?: boolean;
}

export interface BulkAction<T = Record<string, unknown>> {
  label: string;
  icon?: ReactNode;
  variant?: 'primary' | 'outline' | 'text' | 'destructive';
  onClick: (selectedRows: T[]) => void;
}

export interface TableToolbarConfig {
  /**
   * Render prop for the Sort button overlay.
   * Receives (open, onClose) — wire to a PopMenu or Dialog as needed.
   */
  sort?: (open: boolean, onClose: () => void) => ReactNode;
  /** Same pattern as sort. */
  filter?: (open: boolean, onClose: () => void) => ReactNode;
  /** true = render the built-in column visibility panel. */
  columns?: boolean;
  /** Called when the CSV button is clicked. */
  csv?: () => void;
  /** true = render a search input on the right side of the toolbar. */
  search?: boolean | { placeholder?: string };
}

export interface TableProps<T extends Record<string, unknown> = Record<string, unknown>> {
  columns: TableColumn<T>[];
  data: T[];
  /** Key of T whose value uniquely identifies each row. */
  rowKey: keyof T & string;

  // ── Selection ───────────────────────────────────────────
  /** Adds a checkbox column as the first column. */
  selectable?: boolean;
  onSelectionChange?: (rows: T[]) => void;
  /** Bulk-action buttons shown when at least one row is selected. */
  bulkActions?: BulkAction<T>[];

  // ── Editing ─────────────────────────────────────────────
  /**
   * true  → save each cell immediately on blur (onCellChange fires)
   * false → accumulate row edits; Save button appears (onRowSave fires)
   * @default false
   */
  autoSave?: boolean;
  onRowSave?: (original: T, changes: Partial<T>) => void;
  onCellChange?: (row: T, key: string, value: unknown) => void;

  // ── Row click ────────────────────────────────────────────
  /** Fires when a non-editable, non-checkbox cell is clicked. */
  onRowClick?: (row: T) => void;

  // ── Sorting ──────────────────────────────────────────────
  onSort?: (key: string, direction: 'asc' | 'desc') => void;

  // ── Toolbar ──────────────────────────────────────────────
  toolbar?: TableToolbarConfig;
  onSearch?: (query: string) => void;

  // ── Pagination ───────────────────────────────────────────
  pagination?: PaginationProps;

  // ── Appearance ───────────────────────────────────────────
  /** Show horizontal divider lines between rows. @default true */
  dividers?: boolean;

  className?: string;
}
