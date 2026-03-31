import React, { useState, useRef, useEffect } from 'react';
import { CaretLeft, CaretRight, CaretUp, CaretDown } from '@phosphor-icons/react';
import { PopMenu } from '../PopMenu';
import { ListItem } from '../Listitem/ListItem';
import type { DatePickerProps } from './DatePicker.types';

// ─── Constants ────────────────────────────────────────────────────────────────

const MONTHS = [
  'January', 'February', 'March', 'April',
  'May', 'June', 'July', 'August',
  'September', 'October', 'November', 'December',
];

const DAY_LABELS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

// ─── Calendar helpers ─────────────────────────────────────────────────────────

function buildGrid(year: number, month: number): Array<{ date: Date; isCurrentMonth: boolean }> {
  const firstDow = new Date(year, month, 1).getDay(); // 0=Sun
  const offset = (firstDow + 6) % 7;                 // Mon-first: 0=Mon … 6=Sun
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrev = new Date(year, month, 0).getDate();
  const cells: Array<{ date: Date; isCurrentMonth: boolean }> = [];

  for (let i = offset - 1; i >= 0; i--) {
    cells.push({ date: new Date(year, month - 1, daysInPrev - i), isCurrentMonth: false });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ date: new Date(year, month, d), isCurrentMonth: true });
  }
  const total = cells.length > 35 ? 42 : 35;
  let n = 1;
  while (cells.length < total) {
    cells.push({ date: new Date(year, month + 1, n++), isCurrentMonth: false });
  }
  return cells;
}

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function isInRange(date: Date, start: Date, end: Date) {
  const t = date.getTime();
  const s = Math.min(start.getTime(), end.getTime());
  const e = Math.max(start.getTime(), end.getTime());
  return t > s && t < e;
}

function navMonth(year: number, month: number, delta: number) {
  const d = new Date(year, month + delta, 1);
  return { year: d.getFullYear(), month: d.getMonth() };
}

// ─── NavButton ────────────────────────────────────────────────────────────────

interface NavButtonProps {
  direction: 'prev' | 'next';
  onClick: () => void;
}

const NavButton = ({ direction, onClick }: NavButtonProps) => (
  <button
    onClick={onClick}
    style={{
      width: 29,
      height: 28,
      borderRadius: 8,
      border: 'none',
      background: 'transparent',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      color: 'var(--atom-text-primary)',
      flexShrink: 0,
    }}
    className="hover:bg-atom-neutral-one"
  >
    {direction === 'prev' ? <CaretLeft size={16} /> : <CaretRight size={16} />}
  </button>
);

// ─── PillDropdown ─────────────────────────────────────────────────────────────

interface PillDropdownProps {
  label: string;
  id: string;
  openDropdown: string | null;
  setOpenDropdown: (id: string | null) => void;
  children: React.ReactNode;
}

const PillDropdown = ({ label, id, openDropdown, setOpenDropdown, children }: PillDropdownProps) => {
  const isOpen = openDropdown === id;
  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={() => setOpenDropdown(isOpen ? null : id)}
        style={{
          height: 28,
          paddingLeft: 8,
          paddingRight: 8,
          borderRadius: 8,
          border: 'none',
          background: 'transparent',
          fontSize: 14,
          fontWeight: 500,
          fontFamily: 'Inter, sans-serif',
          color: 'var(--atom-text-primary)',
          display: 'flex',
          alignItems: 'center',
          gap: 4,
          cursor: 'pointer',
          whiteSpace: 'nowrap',
        }}
        className="hover:bg-atom-neutral-one"
      >
        {label}
        {isOpen ? <CaretUp size={12} /> : <CaretDown size={12} />}
      </button>
      {isOpen && (
        <div style={{ position: 'absolute', top: '100%', left: 0, zIndex: 100, marginTop: 4 }}>
          {children}
        </div>
      )}
    </div>
  );
};

// ─── YearDropdown — scrollable styled like PopMenu ────────────────────────────

interface YearDropdownProps {
  currentYear: number;
  onSelect: (year: number) => void;
}

const YearDropdown = ({ currentYear, onSelect }: YearDropdownProps) => {
  const years = Array.from({ length: 21 }, (_, i) => currentYear - 10 + i);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Scroll selected year into view on open
  useEffect(() => {
    if (scrollRef.current) {
      const active = scrollRef.current.querySelector('[data-active="true"]') as HTMLElement | null;
      active?.scrollIntoView({ block: 'nearest' });
    }
  }, []);

  return (
    <div
      style={{
        backgroundColor: 'var(--atom-surface-1)',
        borderRadius: 8,
        border: '1px solid var(--atom-border-primary)',
        boxShadow: '0 8px 24px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06)',
        width: 110,
        overflow: 'hidden',
      }}
    >
      <div
        ref={scrollRef}
        style={{
          maxHeight: 240,
          overflowY: 'auto',
          paddingTop: 8,
          paddingBottom: 8,
          paddingLeft: 8,
          paddingRight: 8,
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
        }}
      >
        {years.map((y) => (
          <div key={y} data-active={y === currentYear ? 'true' : undefined}>
            <ListItem active={y === currentYear} onClick={() => onSelect(y)}>
              {String(y)}
            </ListItem>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── CalendarGrid ─────────────────────────────────────────────────────────────

interface CalendarGridProps {
  year: number;
  month: number;
  variant: 'single' | 'range';
  value?: Date | null;
  startDate?: Date | null;
  endDate?: Date | null;
  hoverDate?: Date | null;
  onDayClick: (date: Date) => void;
  onDayHover: (date: Date | null) => void;
}

const CalendarGrid = ({
  year, month, variant,
  value, startDate, endDate, hoverDate,
  onDayClick, onDayHover,
}: CalendarGridProps) => {
  const cells = buildGrid(year, month);
  const rows = Array.from({ length: cells.length / 7 }, (_, i) => cells.slice(i * 7, i * 7 + 7));

  // Compute effective range bounds (includes hover preview, normalised start <= end)
  const rangeEndForBg = endDate ?? (startDate && hoverDate ? hoverDate : null);
  const [bgStart, bgEnd] = (() => {
    if (!startDate || !rangeEndForBg) return [null, null] as [null, null];
    return startDate.getTime() <= rangeEndForBg.getTime()
      ? [startDate, rangeEndForBg]
      : [rangeEndForBg, startDate];
  })();
  const isSameStartEnd = !!(bgStart && bgEnd && isSameDay(bgStart, bgEnd));

  return (
    // Center the 280px grid within whatever width its container provides
    <div style={{ padding: '8px 0', display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: 280 }}>
        {/* Day-of-week labels */}
        <div style={{ display: 'flex' }}>
          {DAY_LABELS.map((label, i) => (
            <div
              key={i}
              style={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <span
                style={{
                  width: 26, height: 16,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 12, fontWeight: 500,
                  color: 'var(--atom-text-tertiary)',
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* Day rows */}
        {rows.map((row, rowIdx) => (
          <div key={rowIdx} style={{ display: 'flex' }}>
            {row.map((cell, colIdx) => {
              const isStart = !!(startDate && isSameDay(cell.date, startDate));
              const isEnd = !!(endDate && isSameDay(cell.date, endDate));

              // Span classification using effective (hover-inclusive) range
              const isBgStart = !!(bgStart && isSameDay(cell.date, bgStart));
              const isBgEnd = !!(bgEnd && isSameDay(cell.date, bgEnd));
              const inRange =
                variant === 'range' &&
                !!(bgStart && bgEnd && !isSameStartEnd && isInRange(cell.date, bgStart, bgEnd));
              const showRangeBg =
                variant === 'range' && !isSameStartEnd && (isBgStart || isBgEnd || inRange);

              const isSelected =
                variant === 'single'
                  ? !!(value && isSameDay(cell.date, value))
                  : !!(isStart || isEnd || isBgStart || isBgEnd);

              const textColor = isSelected
                ? '#ffffff'
                : !cell.isCurrentMonth
                ? 'var(--atom-text-tertiary)'
                : 'var(--atom-text-primary)';

              // Range bg strip: 26px tall, vertically centred in 40px cell
              // Start → transparent 8px left, bg strip with rounded-left cap
              // End   → bg strip with rounded-right cap, transparent 8px right
              // Middle → full-width strip
              const rangeBgStyle: React.CSSProperties | undefined = showRangeBg ? {
                position: 'absolute',
                top: 7,           // (40 - 26) / 2
                height: 26,
                left: isBgStart ? 8 : 0,
                right: isBgEnd ? 8 : 0,
                backgroundColor: 'var(--atom-halo-primary)',
                borderRadius: isBgStart ? '13px 0 0 13px' : isBgEnd ? '0 13px 13px 0' : 0,
              } : undefined;

              return (
                <div
                  key={colIdx}
                  onClick={() => onDayClick(cell.date)}
                  onMouseEnter={() => onDayHover(cell.date)}
                  onMouseLeave={() => onDayHover(null)}
                  style={{
                    width: 40,
                    height: 40,
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                >
                  {/* Range background strip */}
                  {rangeBgStyle && <div style={rangeBgStyle} />}

                  {/* Number circle (above the strip) */}
                  <div
                    style={{
                      position: 'relative',
                      zIndex: 1,
                      width: 26,
                      height: 26,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: isSelected ? 999 : undefined,
                      backgroundColor: isSelected ? 'var(--atom-primary-main)' : undefined,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 12,
                        fontWeight: 500,
                        fontFamily: 'Inter, sans-serif',
                        color: textColor,
                        lineHeight: 1,
                      }}
                    >
                      {cell.date.getDate()}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── DatePicker ───────────────────────────────────────────────────────────────

/**
 * DatePicker Component
 *
 * Single-month or dual-month (range) date picker. Month and year navigation
 * uses PopMenu dropdowns. In range mode, hover previews the selection span.
 *
 * @example
 * // Single
 * <DatePicker value={date} onChange={setDate} />
 *
 * @example
 * // Range
 * <DatePicker variant="range" startDate={start} endDate={end} onRangeChange={(s, e) => { setStart(s); setEnd(e); }} />
 */
export const DatePicker = ({
  variant = 'single',
  value,
  startDate,
  endDate,
  onChange,
  onRangeChange,
  className = '',
}: DatePickerProps) => {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [hoverDate, setHoverDate] = useState<Date | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // The right panel always shows the month after the left panel
  const right = navMonth(viewYear, viewMonth, 1);

  // Close dropdowns when clicking outside the picker
  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  const handleDayClick = (date: Date) => {
    if (variant === 'single') {
      onChange?.(date);
    } else {
      if (startDate && !endDate) {
        // Complete the range
        const [s, e] = date < startDate ? [date, startDate] : [startDate, date];
        onRangeChange?.(s, e);
      } else {
        // Start a new range
        onRangeChange?.(date, null);
      }
    }
  };

  // ── Month selector ────────────────────────────────────────────

  const MonthMenu = ({ side }: { side: 'left' | 'right' }) => {
    const activeMonth = side === 'left' ? viewMonth : right.month;
    return (
      <PopMenu width={160}>
        <div style={{ padding: '0 8px', display: 'flex', flexDirection: 'column', gap: 4 }}>
          {MONTHS.map((name, i) => (
            <ListItem
              key={name}
              active={i === activeMonth}
              onClick={() => {
                if (side === 'left') {
                  setViewMonth(i);
                } else {
                  // Navigate left panel so right panel shows month i
                  const nav = navMonth(right.year, i, -1);
                  setViewYear(nav.year);
                  setViewMonth(nav.month);
                }
                setOpenDropdown(null);
              }}
            >
              {name}
            </ListItem>
          ))}
        </div>
      </PopMenu>
    );
  };

  // ── Year selector ─────────────────────────────────────────────

  const yearFor = (side: 'left' | 'right') => (side === 'left' ? viewYear : right.year);

  const handleYearSelect = (y: number, side: 'left' | 'right') => {
    if (side === 'left') {
      setViewYear(y);
    } else {
      const nav = navMonth(y, right.month, -1);
      setViewYear(nav.year);
      setViewMonth(nav.month);
    }
    setOpenDropdown(null);
  };

  // ── Shared panel styles ───────────────────────────────────────

  const panelStyle: React.CSSProperties = {
    backgroundColor: 'var(--atom-surface-1)',
    borderRadius: 4,
    border: '1px solid var(--atom-border-primary)',
    boxShadow: '0 4px 16px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04)',
    display: 'inline-flex',
    flexDirection: 'column',
    fontFamily: 'Inter, sans-serif',
    width: variant === 'single' ? 320 : 600,
  };

  const vDivider = (
    <div style={{ width: 1, backgroundColor: 'var(--atom-border-primary)', alignSelf: 'stretch' }} />
  );

  // ── Single variant ─────────────────────────────────────────────

  if (variant === 'single') {
    return (
      <div ref={containerRef} style={panelStyle} className={className}>
        {/* Title bar: < [Month Year] > */}
        <div style={{ display: 'flex', alignItems: 'center', height: 48, padding: '0 8px' }}>
          <div style={{ flex: 1 }}>
            <NavButton
              direction="prev"
              onClick={() => { const n = navMonth(viewYear, viewMonth, -1); setViewYear(n.year); setViewMonth(n.month); }}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <PillDropdown
              label={MONTHS[viewMonth]}
              id="month-single"
              openDropdown={openDropdown}
              setOpenDropdown={setOpenDropdown}
            >
              <MonthMenu side="left" />
            </PillDropdown>
            <PillDropdown
              label={String(viewYear)}
              id="year-single"
              openDropdown={openDropdown}
              setOpenDropdown={setOpenDropdown}
            >
              <YearDropdown currentYear={viewYear} onSelect={(y) => handleYearSelect(y, 'left')} />
            </PillDropdown>
          </div>
          <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
            <NavButton
              direction="next"
              onClick={() => { const n = navMonth(viewYear, viewMonth, 1); setViewYear(n.year); setViewMonth(n.month); }}
            />
          </div>
        </div>

        {/* Calendar */}
        <CalendarGrid
          year={viewYear}
          month={viewMonth}
          variant="single"
          value={value}
          onDayClick={handleDayClick}
          onDayHover={setHoverDate}
        />
      </div>
    );
  }

  // ── Range variant ──────────────────────────────────────────────

  return (
    <div ref={containerRef} style={panelStyle} className={className}>
      {/* Title bar: [< Month Year] | [Month Year >] */}
      <div style={{ display: 'flex', height: 48 }}>
        {/* Left title */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', padding: '0 8px', gap: 2 }}>
          <NavButton
            direction="prev"
            onClick={() => { const n = navMonth(viewYear, viewMonth, -1); setViewYear(n.year); setViewMonth(n.month); }}
          />
          <PillDropdown
            label={MONTHS[viewMonth]}
            id="month-left"
            openDropdown={openDropdown}
            setOpenDropdown={setOpenDropdown}
          >
            <MonthMenu side="left" />
          </PillDropdown>
          <PillDropdown
            label={String(viewYear)}
            id="year-left"
            openDropdown={openDropdown}
            setOpenDropdown={setOpenDropdown}
          >
            <YearDropdown currentYear={yearFor('left')} onSelect={(y) => handleYearSelect(y, 'left')} />
          </PillDropdown>
        </div>

        {vDivider}

        {/* Right title */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: '0 8px', gap: 2 }}>
          <PillDropdown
            label={MONTHS[right.month]}
            id="month-right"
            openDropdown={openDropdown}
            setOpenDropdown={setOpenDropdown}
          >
            <MonthMenu side="right" />
          </PillDropdown>
          <PillDropdown
            label={String(right.year)}
            id="year-right"
            openDropdown={openDropdown}
            setOpenDropdown={setOpenDropdown}
          >
            <YearDropdown currentYear={yearFor('right')} onSelect={(y) => handleYearSelect(y, 'right')} />
          </PillDropdown>
          <NavButton
            direction="next"
            onClick={() => { const n = navMonth(viewYear, viewMonth, 1); setViewYear(n.year); setViewMonth(n.month); }}
          />
        </div>
      </div>

      {/* Calendars */}
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1 }}>
          <CalendarGrid
            year={viewYear}
            month={viewMonth}
            variant="range"
            startDate={startDate}
            endDate={endDate}
            hoverDate={hoverDate}
            onDayClick={handleDayClick}
            onDayHover={setHoverDate}
          />
        </div>

        {vDivider}

        <div style={{ flex: 1 }}>
          <CalendarGrid
            year={right.year}
            month={right.month}
            variant="range"
            startDate={startDate}
            endDate={endDate}
            hoverDate={hoverDate}
            onDayClick={handleDayClick}
            onDayHover={setHoverDate}
          />
        </div>
      </div>
    </div>
  );
};

DatePicker.displayName = 'DatePicker';
