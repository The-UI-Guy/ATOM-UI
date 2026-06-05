import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  ArrowUp,
  ArrowDown,
  ArrowsDownUp,
  Funnel,
  Columns,
  DownloadSimple,
  X,
} from '@phosphor-icons/react';
import { Button } from '../Button/Button';
import { Checkbox } from '../Checkbox/Checkbox';
import { SearchField } from '../Input';
import { PopMenu } from '../PopMenu/PopMenu';
import { ListItem } from '../Listitem/ListItem';
import { Pagination } from '../Pagination/Pagination';
import type { TableProps, TableColumn, TableToolbarConfig } from './Table.types';

// ─── Constants ───────────────────────────────────────────────────────────────

const CELL_PADDING_X = 16;
const ROW_HEIGHT = 40;
const CHECKBOX_COL_WIDTH = 48;
const RADIUS = 'var(--atom-radius-md)';
const BORDER = '1px solid var(--atom-border-primary)';

// ─── Styles ──────────────────────────────────────────────────────────────────

const cellBase: React.CSSProperties = {
  paddingLeft: CELL_PADDING_X,
  paddingRight: CELL_PADDING_X,
  height: ROW_HEIGHT,
  fontSize: 14,
  fontFamily: 'var(--atom-font-family)',
  verticalAlign: 'middle',
  borderBottom: BORDER,
  whiteSpace: 'nowrap',
};

const headerCellBase: React.CSSProperties = {
  ...cellBase,
  color: 'var(--atom-text-tertiary)',
  fontWeight: 500,
  background: 'var(--atom-surface-1)',
  userSelect: 'none',
  position: 'sticky',
  top: 0,
  zIndex: 1,
};

// ─── ToolbarPopupButton ───────────────────────────────────────────────────────

function ToolbarPopupButton({
  label,
  icon,
  renderContent,
}: {
  label: string;
  icon: React.ReactNode;
  renderContent: (open: boolean, onClose: () => void) => React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  // Close on outside click
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const handler = (e: PointerEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('pointerdown', handler);
    return () => document.removeEventListener('pointerdown', handler);
  }, [open]);

  return (
    <div ref={containerRef} style={{ position: 'relative' }}>
      <Button
        variant="outline"
        size="sm"
        iconStart={icon}
        onClick={() => setOpen((v) => !v)}
      >
        {label}
      </Button>
      {renderContent(open, close)}
    </div>
  );
}

// ─── ColumnsPanel ─────────────────────────────────────────────────────────────

function ColumnsPanel({
  columns,
  hidden,
  onToggle,
}: {
  columns: { key: string; header: string }[];
  hidden: Set<string>;
  onToggle: (key: string) => void;
}) {
  return (
    <div
      style={{
        position: 'absolute',
        top: '100%',
        left: 0,
        marginTop: 4,
        zIndex: 20,
      }}
    >
      <PopMenu width={200}>
        <div
          style={{
            padding: '4px 8px 4px',
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            color: 'var(--atom-text-tertiary)',
            fontFamily: 'var(--atom-font-family)',
          }}
        >
          Columns
        </div>
        {columns.map((col) => (
          <ListItem
            key={col.key}
            onClick={() => onToggle(col.key)}
            icon={
              <Checkbox
                checked={!hidden.has(col.key)}
                size="md"
                onChange={() => onToggle(col.key)}
              />
            }
          >
            {col.header}
          </ListItem>
        ))}
      </PopMenu>
    </div>
  );
}

// ─── Toolbar ─────────────────────────────────────────────────────────────────

function Toolbar<T extends Record<string, unknown>>({
  config,
  selectedCount,
  bulkActions,
  selectedRows,
  onClearSelection,
  onSearch,
  columns,
  hiddenColumns,
  onToggleColumn,
}: {
  config?: TableToolbarConfig;
  selectedCount: number;
  bulkActions?: TableProps<T>['bulkActions'];
  selectedRows: T[];
  onClearSelection: () => void;
  onSearch?: (q: string) => void;
  columns: TableColumn<T>[];
  hiddenColumns: Set<string>;
  onToggleColumn: (key: string) => void;
}) {
  const [columnsOpen, setColumnsOpen] = useState(false);
  const columnsRef = useRef<HTMLDivElement>(null);
  const searchPlaceholder =
    config?.search && typeof config.search === 'object'
      ? config.search.placeholder
      : 'Search…';

  useEffect(() => {
    if (!columnsOpen) return;
    const handler = (e: PointerEvent) => {
      if (!columnsRef.current?.contains(e.target as Node)) setColumnsOpen(false);
    };
    document.addEventListener('pointerdown', handler);
    return () => document.removeEventListener('pointerdown', handler);
  }, [columnsOpen]);

  const hasToolbar =
    config?.sort ||
    config?.filter ||
    config?.columns ||
    config?.csv ||
    config?.search;

  if (!hasToolbar && !bulkActions?.length) return null;

  // ── Bulk action bar ──────────────────────────────────────
  if (selectedCount > 0 && bulkActions?.length) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '10px 0',
        }}
      >
        <span
          style={{
            fontSize: 14,
            fontFamily: 'var(--atom-font-family)',
            color: 'var(--atom-text-primary)',
            fontWeight: 500,
            marginRight: 4,
          }}
        >
          {selectedCount} selected
        </span>
        {bulkActions.map((action, i) => (
          <Button
            key={i}
            variant={action.variant ?? 'outline'}
            size="sm"
            iconStart={action.icon}
            onClick={() => action.onClick(selectedRows)}
          >
            {action.label}
          </Button>
        ))}
        <Button
          variant="text"
          size="sm"
          iconOnly
          onClick={onClearSelection}
          aria-label="Clear selection"
        >
          <X size={14} />
        </Button>
      </div>
    );
  }

  // ── Normal toolbar ───────────────────────────────────────
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '10px 0',
      }}
    >
      {/* Left: Sort / Filter / Columns / CSV */}
      {config?.sort && (
        <ToolbarPopupButton
          label="Sort"
          icon={<ArrowsDownUp size={14} />}
          renderContent={config.sort}
        />
      )}
      {config?.filter && (
        <ToolbarPopupButton
          label="Filter"
          icon={<Funnel size={14} />}
          renderContent={config.filter}
        />
      )}
      {config?.columns && (
        <div ref={columnsRef} style={{ position: 'relative' }}>
          <Button
            variant="outline"
            size="sm"
            iconStart={<Columns size={14} />}
            onClick={() => setColumnsOpen((v) => !v)}
          >
            Columns
          </Button>
          {columnsOpen && (
            <ColumnsPanel
              columns={columns.map((c) => ({ key: c.key, header: c.header }))}
              hidden={hiddenColumns}
              onToggle={(key) => {
                onToggleColumn(key);
              }}
            />
          )}
        </div>
      )}
      {config?.csv && (
        <Button
          variant="outline"
          size="sm"
          iconStart={<DownloadSimple size={14} />}
          onClick={config.csv}
        >
          CSV
        </Button>
      )}

      {/* Right: Search */}
      {config?.search && (
        <div style={{ marginLeft: 'auto' }}>
          <SearchField
            size="sm"
            placeholder={searchPlaceholder}
            onChange={(e) => onSearch?.(e.target.value)}
          />
        </div>
      )}
    </div>
  );
}

// ─── EditableInput ────────────────────────────────────────────────────────────

function EditableInput({
  value,
  onChange,
  onBlur,
  onKeyDown,
  autoFocus,
}: {
  value: unknown;
  onChange: (v: unknown) => void;
  onBlur: () => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  autoFocus?: boolean;
}) {
  return (
    <input
      autoFocus={autoFocus}
      value={String(value ?? '')}
      onChange={(e) => onChange(e.target.value)}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
      style={{
        width: '100%',
        border: 'none',
        outline: 'none',
        background: 'transparent',
        fontSize: 14,
        fontFamily: 'var(--atom-font-family)',
        color: 'var(--atom-text-primary)',
        padding: 0,
      }}
    />
  );
}

// ─── Main Table component ─────────────────────────────────────────────────────

export function Table<T extends Record<string, unknown>>({
  columns,
  data,
  rowKey,
  selectable = false,
  onSelectionChange,
  bulkActions,
  autoSave = false,
  onRowSave,
  onCellChange,
  onRowClick,
  onSort,
  toolbar,
  onSearch,
  pagination,
  dividers = true,
  className = '',
}: TableProps<T>) {
  // ── State ──────────────────────────────────────────────────────────────────

  // Selection: set of row key values
  const [selectedKeys, setSelectedKeys] = useState<Set<unknown>>(new Set());

  // Editing: Map<rowKeyValue, { columnKey: newValue }> — pending changes
  const [editingRows, setEditingRows] = useState<Map<unknown, Partial<T>>>(new Map());

  // Active cell being edited: { rk: rowKeyValue, ck: columnKey }
  const [activeCell, setActiveCell] = useState<{ rk: unknown; ck: string } | null>(null);

  // Hidden columns
  const [hiddenColumns, setHiddenColumns] = useState<Set<string>>(
    () => new Set(columns.filter((c) => c.hidden).map((c) => c.key))
  );

  // Sort state
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

  // ── Derived ────────────────────────────────────────────────────────────────

  const visibleColumns = columns.filter((c) => !hiddenColumns.has(c.key));
  const selectedRows = data.filter((row) => selectedKeys.has(row[rowKey]));
  const allSelected = data.length > 0 && data.every((row) => selectedKeys.has(row[rowKey]));

  // ── Selection handlers ─────────────────────────────────────────────────────

  const toggleRow = useCallback(
    (row: T) => {
      setSelectedKeys((prev) => {
        const next = new Set(prev);
        const key = row[rowKey];
        next.has(key) ? next.delete(key) : next.add(key);
        onSelectionChange?.(data.filter((r) => next.has(r[rowKey])));
        return next;
      });
    },
    [data, rowKey, onSelectionChange]
  );

  const toggleAll = useCallback(() => {
    const next = allSelected ? new Set() : new Set(data.map((r) => r[rowKey]));
    setSelectedKeys(next);
    onSelectionChange?.(allSelected ? [] : [...data]);
  }, [allSelected, data, rowKey, onSelectionChange]);

  const clearSelection = useCallback(() => {
    setSelectedKeys(new Set());
    onSelectionChange?.([]);
  }, [onSelectionChange]);

  // ── Edit handlers ──────────────────────────────────────────────────────────

  const getCellValue = (row: T, key: string): unknown => {
    const rk = row[rowKey];
    const edits = editingRows.get(rk);
    return edits && key in edits ? (edits as Record<string, unknown>)[key] : (row as Record<string, unknown>)[key];
  };

  const handleCellClick = (row: T, col: TableColumn<T>) => {
    if (!col.editable) return;
    const rk = row[rowKey];
    setActiveCell({ rk, ck: col.key });
    // Initialise editing state for this row if not started
    if (!editingRows.has(rk)) {
      setEditingRows((prev) => new Map(prev).set(rk, {}));
    }
  };

  const handleCellChange = (row: T, colKey: string, value: unknown) => {
    const rk = row[rowKey];
    setEditingRows((prev) => {
      const next = new Map(prev);
      next.set(rk, { ...(next.get(rk) ?? {}), [colKey]: value } as Partial<T>);
      return next;
    });
  };

  const handleCellBlur = (row: T, colKey: string) => {
    if (!autoSave) return;
    const rk = row[rowKey];
    const changes = editingRows.get(rk);
    const newValue = changes?.[colKey as keyof T];
    if (newValue !== undefined) {
      onCellChange?.(row, colKey, newValue);
    }
    // Remove just this key from editing state
    setEditingRows((prev) => {
      const next = new Map(prev);
      const existing = { ...(next.get(rk) ?? {}) } as Record<string, unknown>;
      delete existing[colKey];
      if (Object.keys(existing).length === 0) {
        next.delete(rk);
      } else {
        next.set(rk, existing as Partial<T>);
      }
      return next;
    });
    setActiveCell(null);
  };

  const handleSaveRow = (row: T) => {
    const rk = row[rowKey];
    const changes = editingRows.get(rk);
    if (changes && Object.keys(changes).length > 0) {
      onRowSave?.(row, changes);
    }
    setEditingRows((prev) => {
      const next = new Map(prev);
      next.delete(rk);
      return next;
    });
    setActiveCell(null);
  };

  const handleCancelRow = (rk: unknown) => {
    setEditingRows((prev) => {
      const next = new Map(prev);
      next.delete(rk);
      return next;
    });
    setActiveCell(null);
  };

  // ── Sort handler ───────────────────────────────────────────────────────────

  const handleSort = (key: string) => {
    const newDir = sortKey === key && sortDir === 'asc' ? 'desc' : 'asc';
    setSortKey(key);
    setSortDir(newDir);
    onSort?.(key, newDir);
  };

  // ── Column visibility ──────────────────────────────────────────────────────

  const toggleColumn = useCallback((key: string) => {
    setHiddenColumns((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  }, []);

  // ── Derived: toolbar visibility ────────────────────────────────────────────

  const showToolbar = !!(
    (bulkActions && bulkActions.length > 0) ||
    toolbar?.sort || toolbar?.filter || toolbar?.columns || toolbar?.csv || toolbar?.search
  );

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className={className} style={{ fontFamily: 'var(--atom-font-family)' }}>

      {/* Toolbar — separate bordered section so its dropdowns aren't clipped */}
      {showToolbar && (
        <div
          style={{
            border: BORDER,
            borderBottom: 'none',
            borderRadius: `${RADIUS} ${RADIUS} 0 0`,
            padding: '0 16px',
            background: 'var(--atom-surface-1)',
          }}
        >
          <Toolbar
            config={toolbar}
            selectedCount={selectedKeys.size}
            bulkActions={bulkActions}
            selectedRows={selectedRows}
            onClearSelection={clearSelection}
            onSearch={onSearch}
            columns={columns}
            hiddenColumns={hiddenColumns}
            onToggleColumn={toggleColumn}
          />
        </div>
      )}

      {/* Table + pagination */}
      <div
        style={{
          border: BORDER,
          borderRadius: showToolbar ? `0 0 ${RADIUS} ${RADIUS}` : RADIUS,
          overflow: 'hidden',
        }}
      >
        <div style={{ overflowX: 'auto' }}>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              tableLayout: 'auto',
            }}
          >
            {/* Head */}
            <thead>
              <tr>
                {selectable && (
                  <th
                    style={{
                      ...headerCellBase,
                      borderBottom: dividers ? BORDER : 'none',
                      width: CHECKBOX_COL_WIDTH,
                      paddingLeft: CELL_PADDING_X,
                      paddingRight: 8,
                      textAlign: 'center',
                    }}
                  >
                    <Checkbox
                      size="md"
                      checked={allSelected}
                      onChange={toggleAll}
                    />
                  </th>
                )}
                {visibleColumns.map((col) => (
                  <th
                    key={col.key}
                    style={{
                      ...headerCellBase,
                      borderBottom: dividers ? BORDER : 'none',
                      width: col.width,
                      textAlign: 'left',
                      cursor: col.sortable ? 'pointer' : 'default',
                    }}
                    onClick={col.sortable ? () => handleSort(col.key) : undefined}
                  >
                    <div
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 4,
                      }}
                    >
                      {col.header}
                      {col.sortable && (
                        <span style={{ color: 'var(--atom-text-tertiary)', display: 'flex' }}>
                          {sortKey === col.key ? (
                            sortDir === 'asc' ? (
                              <ArrowUp size={12} weight="bold" />
                            ) : (
                              <ArrowDown size={12} weight="bold" />
                            )
                          ) : (
                            <ArrowsDownUp size={12} />
                          )}
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            {/* Body */}
            <tbody>
              {data.map((row, rowIdx) => {
                const rk = row[rowKey];
                const isSelected = selectedKeys.has(rk);
                const edits = editingRows.get(rk);
                const isDirty =
                  !autoSave && edits !== undefined && Object.keys(edits).length > 0;
                const isEditing = editingRows.has(rk); // has an entry (may be empty on first click)
                const isLastRow = rowIdx === data.length - 1;

                return (
                  <TableRow
                    key={String(rk)}
                    row={row}
                    rowKey={rk}
                    columns={visibleColumns}
                    isSelected={isSelected}
                    isEditing={isEditing}
                    isDirty={isDirty}
                    isLastRow={isLastRow}
                    selectable={selectable}
                    autoSave={autoSave}
                    activeCell={activeCell}
                    dividers={dividers}
                    getCellValue={getCellValue}
                    onToggleRow={toggleRow}
                    onCellClick={handleCellClick}
                    onCellChange={handleCellChange}
                    onCellBlur={handleCellBlur}
                    onSave={handleSaveRow}
                    onCancel={() => handleCancelRow(rk)}
                    onRowClick={onRowClick}
                  />
                );
              })}
              {data.length === 0 && (
                <tr>
                  <td
                    colSpan={visibleColumns.length + (selectable ? 1 : 0)}
                    style={{
                      ...cellBase,
                      textAlign: 'center',
                      color: 'var(--atom-text-tertiary)',
                      borderBottom: 'none',
                      padding: '40px 24px',
                    }}
                  >
                    No data
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination — inside the border */}
        {pagination && (
          <div
            style={{
              borderTop: BORDER,
              padding: '8px 16px',
              display: 'flex',
              justifyContent: 'flex-end',
              background: 'var(--atom-surface-1)',
            }}
          >
            <Pagination {...pagination} />
          </div>
        )}
      </div>
    </div>
  );
}

Table.displayName = 'Table';

// ─── TableRow ─────────────────────────────────────────────────────────────────

function TableRow<T extends Record<string, unknown>>({
  row,
  rowKey: rk,
  columns,
  isSelected,
  isEditing,
  isDirty,
  isLastRow,
  selectable,
  autoSave,
  activeCell,
  dividers,
  getCellValue,
  onToggleRow,
  onCellClick,
  onCellChange,
  onCellBlur,
  onSave,
  onCancel,
  onRowClick,
}: {
  row: T;
  rowKey: unknown;
  columns: TableColumn<T>[];
  isSelected: boolean;
  isEditing: boolean;
  isDirty: boolean;
  isLastRow: boolean;
  selectable: boolean;
  autoSave: boolean;
  activeCell: { rk: unknown; ck: string } | null;
  dividers: boolean;
  getCellValue: (row: T, key: string) => unknown;
  onToggleRow: (row: T) => void;
  onCellClick: (row: T, col: TableColumn<T>) => void;
  onCellChange: (row: T, key: string, value: unknown) => void;
  onCellBlur: (row: T, key: string) => void;
  onSave: (row: T) => void;
  onCancel: () => void;
  onRowClick?: (row: T) => void;
}) {
  const [hovered, setHovered] = useState(false);

  const rowBg = isSelected || isEditing
    ? 'var(--atom-halo-primary)'
    : hovered
    ? 'var(--atom-neutral-one)'
    : 'var(--atom-surface-1)';

  const borderBottom = (!dividers || isLastRow) ? 'none' : BORDER;

  const sharedCellStyle: React.CSSProperties = {
    ...cellBase,
    borderBottom,
    backgroundColor: rowBg,
  };

  return (
    <tr
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Checkbox */}
      {selectable && (
        <td
          style={{
            ...sharedCellStyle,
            width: CHECKBOX_COL_WIDTH,
            paddingRight: 8,
            textAlign: 'center',
          }}
          onClick={(e) => { e.stopPropagation(); onToggleRow(row); }}
        >
          <Checkbox size="md" checked={isSelected} onChange={() => onToggleRow(row)} />
        </td>
      )}

      {/* Data cells */}
      {columns.map((col, colIdx) => {
        const isLast = colIdx === columns.length - 1;
        const value = getCellValue(row, col.key);
        const isCellActive = activeCell?.rk === rk && activeCell?.ck === col.key;

        // Last column of dirty row → show Save/Cancel
        if (isDirty && isLast) {
          return (
            <td key={col.key} style={{ ...sharedCellStyle, textAlign: 'right' }}>
              <div style={{ display: 'inline-flex', gap: 8, alignItems: 'center' }}>
                <Button variant="text" size="sm" onClick={onCancel}>
                  Cancel
                </Button>
                <Button variant="primary" size="sm" onClick={() => onSave(row)}>
                  Save
                </Button>
              </div>
            </td>
          );
        }

        const isActivelyCellEditing = col.editable && isCellActive;

        const cellStyle: React.CSSProperties = {
          ...sharedCellStyle,
          cursor: col.editable
            ? 'text'
            : col.onClick || onRowClick
            ? 'pointer'
            : 'default',
          ...(isActivelyCellEditing && {
            outline: '2px solid var(--atom-primary-main)',
            outlineOffset: '-2px',
            backgroundColor: 'var(--atom-surface-1)',
          }),
        };

        const handleClick = () => {
          if (col.editable) {
            onCellClick(row, col);
          } else if (col.onClick) {
            col.onClick(value, row);
          } else if (onRowClick) {
            onRowClick(row);
          }
        };

        return (
          <td key={col.key} style={cellStyle} onClick={handleClick}>
            {isActivelyCellEditing ? (
              col.renderEdit ? (
                col.renderEdit(value, row, (v) => onCellChange(row, col.key, v))
              ) : (
                <EditableInput
                  autoFocus
                  value={value}
                  onChange={(v) => onCellChange(row, col.key, v)}
                  onBlur={() => onCellBlur(row, col.key)}
                  onKeyDown={(e) => {
                    if (e.key === 'Escape') onCancel();
                    if (e.key === 'Enter') {
                      if (autoSave) {
                        onCellBlur(row, col.key);
                      } else {
                        onSave(row);
                      }
                    }
                  }}
                />
              )
            ) : (
              <span
                style={{
                  color: col.onClick
                    ? 'var(--atom-primary-main)'
                    : 'var(--atom-text-primary)',
                  textDecoration: col.onClick ? 'underline' : 'none',
                  textDecorationColor: 'transparent',
                }}
                onMouseEnter={(e) => {
                  if (col.onClick) (e.target as HTMLElement).style.textDecorationColor = 'var(--atom-primary-main)';
                }}
                onMouseLeave={(e) => {
                  if (col.onClick) (e.target as HTMLElement).style.textDecorationColor = 'transparent';
                }}
              >
                {col.render ? col.render(value, row) : String(value ?? '')}
              </span>
            )}
          </td>
        );
      })}
    </tr>
  );
}
