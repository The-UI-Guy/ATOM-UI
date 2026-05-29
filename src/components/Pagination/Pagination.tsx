import { useState, useRef, useEffect } from 'react';
import { CaretLeft, CaretRight, CaretDown } from '@phosphor-icons/react';
import { PopMenu } from '../PopMenu/PopMenu';
import { ListItem } from '../Listitem/ListItem';
import type { PaginationProps } from './Pagination.types';

const DEFAULT_PAGE_SIZE_OPTIONS = [10, 20, 50, 100];

// ─── Page range algorithm ────────────────────────────────────────────────────
// Always shows first and last page. Shows a window of ~5 pages around current,
// inserting '...' where consecutive pages are skipped.

function getPageRange(current: number, total: number): (number | '...')[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  let start: number;
  let end: number;

  if (current <= 4) {
    start = 2;
    end = Math.min(total - 1, 5);
  } else if (current >= total - 3) {
    start = Math.max(2, total - 4);
    end = total - 1;
  } else {
    start = current - 1;
    end = current + 1;
  }

  const pages: (number | '...')[] = [1];
  if (start > 2) pages.push('...');
  for (let i = start; i <= end; i++) pages.push(i);
  if (end < total - 1) pages.push('...');
  pages.push(total);

  return pages;
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function NavButton({
  onClick,
  disabled,
  label,
  children,
}: {
  onClick: () => void;
  disabled: boolean;
  label: string;
  children: React.ReactNode;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 32,
        height: 32,
        borderRadius: 6,
        border: 'none',
        backgroundColor: hovered && !disabled ? 'var(--atom-neutral-one)' : 'transparent',
        color: disabled ? 'var(--atom-text-tertiary)' : 'var(--atom-text-primary)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.4 : 1,
        flexShrink: 0,
      }}
    >
      {children}
    </button>
  );
}

function PageButton({
  page,
  active,
  onClick,
}: {
  page: number;
  active: boolean;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      aria-label={`Page ${page}`}
      aria-current={active ? 'page' : undefined}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 32,
        height: 32,
        borderRadius: 6,
        border: 'none',
        backgroundColor: active
          ? 'var(--atom-primary-main)'
          : hovered
          ? 'var(--atom-neutral-one)'
          : 'transparent',
        color: active ? 'var(--atom-primary-contrast)' : 'var(--atom-text-primary)',
        cursor: 'pointer',
        fontSize: 14,
        fontWeight: active ? 600 : 400,
        fontFamily: 'var(--atom-font-family)',
        flexShrink: 0,
      }}
    >
      {page}
    </button>
  );
}

function Ellipsis() {
  return (
    <span
      aria-hidden="true"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 32,
        height: 32,
        fontSize: 14,
        color: 'var(--atom-text-tertiary)',
        fontFamily: 'var(--atom-font-family)',
        flexShrink: 0,
        userSelect: 'none',
      }}
    >
      …
    </span>
  );
}

function PageSizeSelector({
  pageSize,
  options,
  onChange,
}: {
  pageSize: number;
  options: number[];
  onChange: (size: number) => void;
}) {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handlePointerDown = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, [open]);

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen((v) => !v)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          height: 32,
          padding: '0 10px',
          borderRadius: 6,
          border: '1px solid var(--atom-border-primary)',
          backgroundColor: hovered ? 'var(--atom-neutral-one)' : 'var(--atom-surface-1)',
          color: 'var(--atom-text-primary)',
          cursor: 'pointer',
          fontSize: 14,
          fontFamily: 'var(--atom-font-family)',
          whiteSpace: 'nowrap',
          boxShadow: 'var(--atom-depth-1)',
        }}
      >
        {pageSize} per page
        <CaretDown size={12} style={{ color: 'var(--atom-text-tertiary)', flexShrink: 0 }} />
      </button>

      {open && (
        <div style={{ position: 'absolute', bottom: '100%', right: 0, marginBottom: 4, zIndex: 20 }}>
          <PopMenu width={148}>
            <div style={{ padding: '0 8px', display: 'flex', flexDirection: 'column', gap: 2 }}>
              {options.map((opt) => (
                <ListItem
                  key={opt}
                  active={opt === pageSize}
                  onClick={() => { onChange(opt); setOpen(false); }}
                >
                  {opt} per page
                </ListItem>
              ))}
            </div>
          </PopMenu>
        </div>
      )}
    </div>
  );
}

// ─── Main component ──────────────────────────────────────────────────────────

export const Pagination = ({
  page,
  totalPages,
  onPageChange,
  pageSize = 10,
  onPageSizeChange,
  pageSizeOptions = DEFAULT_PAGE_SIZE_OPTIONS,
  hidePageSize = false,
  className = '',
}: PaginationProps) => {
  const pages = getPageRange(page, totalPages);

  return (
    <nav
      aria-label="Pagination"
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        fontFamily: 'var(--atom-font-family)',
      }}
    >
      {/* Previous */}
      <NavButton
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        label="Previous page"
      >
        <CaretLeft size={14} />
      </NavButton>

      {/* Page numbers */}
      {pages.map((p, i) =>
        p === '...' ? (
          <Ellipsis key={`ellipsis-${i}`} />
        ) : (
          <PageButton
            key={p}
            page={p}
            active={p === page}
            onClick={() => onPageChange(p)}
          />
        )
      )}

      {/* Next */}
      <NavButton
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
        label="Next page"
      >
        <CaretRight size={14} />
      </NavButton>

      {/* Page size */}
      {!hidePageSize && onPageSizeChange && (
        <>
          <div style={{ width: 12 }} />
          <PageSizeSelector
            pageSize={pageSize}
            options={pageSizeOptions}
            onChange={onPageSizeChange}
          />
        </>
      )}
    </nav>
  );
};

Pagination.displayName = 'Pagination';
