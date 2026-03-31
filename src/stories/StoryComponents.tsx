import React from 'react';

// ============================================================
// StoryPage — outer page wrapper
// ============================================================
export const StoryPage = ({
  children,
  maxWidth = 900,
}: {
  children: React.ReactNode;
  maxWidth?: number;
}) => (
  <div
    style={{
      padding: '40px',
      maxWidth,
      fontFamily: 'Inter, sans-serif',
      color: 'var(--atom-text-primary)',
    }}
  >
    {children}
  </div>
);

// ============================================================
// StoryHeader — page title + description
// ============================================================
export const StoryHeader = ({
  title,
  description,
}: {
  title: string;
  description?: React.ReactNode;
}) => (
  <div style={{ marginBottom: '40px' }}>
    <h1 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '8px', color: 'var(--atom-text-primary)' }}>
      {title}
    </h1>
    {description && (
      <p style={{ fontSize: '16px', color: 'var(--atom-text-secondary)', lineHeight: 1.6, margin: 0 }}>
        {description}
      </p>
    )}
  </div>
);

// ============================================================
// Section — titled content block
// ============================================================
export const Section = ({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) => (
  <div style={{ marginBottom: '48px' }}>
    <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '8px', color: 'var(--atom-text-primary)' }}>
      {title}
    </h2>
    {description && (
      <p style={{ fontSize: '14px', color: 'var(--atom-text-secondary)', marginBottom: '16px' }}>
        {description}
      </p>
    )}
    <div
      style={{
        padding: '24px',
        background: 'var(--atom-surface-2)',
        borderRadius: '8px',
      }}
    >
      {children}
    </div>
  </div>
);

// ============================================================
// PropsTable — API reference table
// ============================================================
export const PropsTable = ({
  columns = ['Prop', 'Type', 'Default', 'Description'],
  rows,
}: {
  columns?: string[];
  rows: (string | React.ReactNode)[][];
}) => (
  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
    <thead>
      <tr
        style={{
          borderBottom: `2px solid var(--atom-border-primary)`,
          textAlign: 'left',
        }}
      >
        {columns.map((col, i) => (
          <th
            key={i}
            style={{
              padding: i === columns.length - 1 ? '12px 0' : '12px 16px 12px 0',
              fontWeight: 600,
              color: 'var(--atom-text-primary)',
            }}
          >
            {col}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {rows.map((row, ri) => (
        <tr
          key={ri}
          style={{
            borderBottom: ri < rows.length - 1 ? `1px solid var(--atom-border-primary)` : undefined,
          }}
        >
          {row.map((cell, ci) => (
            <td
              key={ci}
              style={{
                padding: ci === row.length - 1 ? '12px 0' : '12px 16px 12px 0',
                color: ci === 0 ? 'var(--atom-text-primary)' : 'var(--atom-text-secondary)',
                fontFamily: ci === 0 ? 'monospace' : undefined,
              }}
            >
              {ci === 0 ? <code>{cell}</code> : cell}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);

// ============================================================
// Row — horizontal demo layout (Button stories)
// ============================================================
export const Row = ({
  label,
  description,
  children,
}: {
  label?: string;
  description?: string;
  children: React.ReactNode;
}) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '16px' }}>
    {label && (
      <div style={{ width: '120px', flexShrink: 0 }}>
        <strong style={{ fontSize: '14px', color: 'var(--atom-text-primary)' }}>{label}</strong>
        {description && (
          <div style={{ fontSize: '12px', color: 'var(--atom-text-secondary)' }}>{description}</div>
        )}
      </div>
    )}
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
      {children}
    </div>
  </div>
);

// ============================================================
// DemoBox — bordered container (Divider stories)
// ============================================================
export const DemoBox = ({
  children,
  label,
  width = 300,
}: {
  children: React.ReactNode;
  label?: string;
  width?: number | string;
}) => (
  <div
    style={{
      width,
      background: 'var(--atom-surface-1)',
      border: '1px solid var(--atom-border-primary)',
      borderRadius: '4px',
      marginBottom: '16px',
    }}
  >
    {label && (
      <div style={{ fontSize: '12px', color: 'var(--atom-text-secondary)', padding: '8px 8px 0' }}>
        {label}
      </div>
    )}
    {children}
  </div>
);
