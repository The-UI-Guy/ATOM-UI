import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
  title: 'Design System/Foundations',
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj<typeof meta>;

// ─── Helpers ────────────────────────────────────────────────────────────────

function cssVar(name: string): string {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

function contrastColor(varName: string): string {
  const raw = cssVar(varName).replace('#', '');
  if (raw.length !== 6) return 'rgba(0,0,0,0.7)';
  const r = parseInt(raw.slice(0, 2), 16);
  const g = parseInt(raw.slice(2, 4), 16);
  const b = parseInt(raw.slice(4, 6), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 145 ? 'rgba(0,0,0,0.65)' : 'rgba(255,255,255,0.9)';
}

// ─── Layout primitives ──────────────────────────────────────────────────────

const Page = ({ children }: { children: React.ReactNode }) => (
  <div style={{ padding: 40, fontFamily: 'var(--atom-font-family)', color: 'var(--atom-text-primary)', maxWidth: 1100 }}>
    {children}
  </div>
);

const PageTitle = ({ children }: { children: React.ReactNode }) => (
  <h1 style={{ fontSize: 32, fontWeight: 700, margin: '0 0 8px', color: 'var(--atom-text-primary)' }}>{children}</h1>
);

const PageSubtitle = ({ children }: { children: React.ReactNode }) => (
  <p style={{ fontSize: 16, color: 'var(--atom-text-secondary)', lineHeight: 1.6, margin: '0 0 48px' }}>{children}</p>
);

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 style={{ fontSize: 20, fontWeight: 600, margin: '48px 0 4px', color: 'var(--atom-text-primary)', borderBottom: '1px solid var(--atom-border-primary)', paddingBottom: 12 }}>
    {children}
  </h2>
);

const SubTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 style={{ fontSize: 13, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--atom-text-tertiary)', margin: '24px 0 12px' }}>
    {children}
  </h3>
);

// ─── Colour Palette ──────────────────────────────────────────────────────────

const SHADES = [25, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];

const FAMILIES = [
  { name: 'Grey',       prefix: '--atom-grey' },
  { name: 'Blue',       prefix: '--atom-b'    },
  { name: 'Light Blue', prefix: '--atom-lb'   },
  { name: 'Cyan',       prefix: '--atom-c'    },
  { name: 'Teal',       prefix: '--atom-t'    },
  { name: 'Green',      prefix: '--atom-g'    },
  { name: 'Lime',       prefix: '--atom-l'    },
  { name: 'Yellow',     prefix: '--atom-y'    },
  { name: 'Amber',      prefix: '--atom-a'    },
  { name: 'Orange',     prefix: '--atom-o'    },
  { name: 'Red',        prefix: '--atom-r'    },
  { name: 'Pink',       prefix: '--atom-pk'   },
  { name: 'Purple',     prefix: '--atom-pu'   },
  { name: 'Indigo',     prefix: '--atom-i'    },
];

function PaletteRow({ name, prefix }: { name: string; prefix: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'stretch', marginBottom: 6 }}>
      <div style={{ width: 88, flexShrink: 0, display: 'flex', alignItems: 'center', fontSize: 13, fontWeight: 500, color: 'var(--atom-text-secondary)', paddingRight: 12 }}>
        {name}
      </div>
      <div style={{ display: 'flex', flex: 1, borderRadius: 8, overflow: 'hidden' }}>
        {SHADES.map(shade => {
          const token = `${prefix}-${shade}`;
          const tc = contrastColor(token);
          return (
            <div
              key={shade}
              title={`${token}: ${cssVar(token)}`}
              style={{
                flex: 1,
                backgroundColor: `var(${token})`,
                padding: '10px 4px 8px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 3,
                cursor: 'default',
              }}
            >
              <span style={{ fontSize: 10, fontWeight: 600, color: tc, lineHeight: 1 }}>{shade}</span>
              <span style={{ fontSize: 9, fontFamily: 'monospace', color: tc, opacity: 0.75, lineHeight: 1 }}>
                {cssVar(token)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Semantic token swatch ───────────────────────────────────────────────────

function TokenSwatch({ token, note }: { token: string; label?: string; note?: string }) {
  const value = cssVar(token);
  const isTransparent = value.includes('rgba') || value.includes('transparent');
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 0', borderBottom: '1px solid var(--atom-border-primary)' }}>
      <div style={{ position: 'relative', width: 36, height: 36, borderRadius: 6, border: '1px solid var(--atom-border-primary)', flexShrink: 0, overflow: 'hidden' }}>
        {isTransparent && (
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-conic-gradient(#ccc 0% 25%, #fff 0% 50%)', backgroundSize: '8px 8px' }} />
        )}
        <div style={{ position: 'absolute', inset: 0, backgroundColor: `var(${token})` }} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 500, fontFamily: 'monospace', color: 'var(--atom-text-primary)' }}>{token}</div>
        {note && <div style={{ fontSize: 12, color: 'var(--atom-text-tertiary)', marginTop: 1 }}>{note}</div>}
      </div>
      <div style={{ fontSize: 12, fontFamily: 'monospace', color: 'var(--atom-text-tertiary)', flexShrink: 0 }}>{value}</div>
    </div>
  );
}

function TokenGroup({ tokens }: { tokens: { token: string; label: string; note?: string }[] }) {
  return <div>{tokens.map(t => <TokenSwatch key={t.token} {...t} />)}</div>;
}

// ─── Typography ──────────────────────────────────────────────────────────────

const TYPE_SIZES = [
  { token: '--atom-font-size-xs', label: 'xs', px: '12px' },
  { token: '--atom-font-size-sm', label: 'sm', px: '14px' },
  { token: '--atom-font-size-md', label: 'md', px: '16px' },
  { token: '--atom-font-size-lg', label: 'lg', px: '18px' },
  { token: '--atom-font-size-xl', label: 'xl', px: '20px' },
  { token: '--atom-font-size-2xl', label: '2xl', px: '24px' },
];

const WEIGHTS = [
  { label: 'Regular', value: 400 },
  { label: 'Medium',  value: 500 },
  { label: 'Semibold', value: 600 },
  { label: 'Bold',    value: 700 },
];

// ─── Spacing ─────────────────────────────────────────────────────────────────

const SPACES = [
  { token: '--atom-space-half', label: 'space-half', px: '4px'  },
  { token: '--atom-space-1',    label: 'space-1',    px: '8px'  },
  { token: '--atom-space-2',    label: 'space-2',    px: '16px' },
  { token: '--atom-space-3',    label: 'space-3',    px: '24px' },
  { token: '--atom-space-4',    label: 'space-4',    px: '32px' },
  { token: '--atom-space-5',    label: 'space-5',    px: '40px' },
  { token: '--atom-space-6',    label: 'space-6',    px: '48px' },
  { token: '--atom-space-7',    label: 'space-7',    px: '56px' },
  { token: '--atom-space-8',    label: 'space-8',    px: '64px' },
];

// ─── Border Radius ────────────────────────────────────────────────────────────

const RADII = [
  { token: '--atom-radius-none', label: 'none', px: '0px'    },
  { token: '--atom-radius-sm',   label: 'sm',   px: '4px'    },
  { token: '--atom-radius-md',   label: 'md',   px: '8px'    },
  { token: '--atom-radius-lg',   label: 'lg',   px: '16px'   },
  { token: '--atom-radius-xl',   label: 'xl',   px: '24px'   },
  { token: '--atom-radius-2xl',  label: '2xl',  px: '32px'   },
  { token: '--atom-radius-full', label: 'full', px: '9999px' },
];

// ─── Depth / Shadow ───────────────────────────────────────────────────────────

const DEPTHS = [
  { token: '--atom-depth-1', label: 'depth-1', desc: '0 1px 2px'   },
  { token: '--atom-depth-2', label: 'depth-2', desc: '0 4px 4px'   },
  { token: '--atom-depth-3', label: 'depth-3', desc: '0 8px 8px'   },
  { token: '--atom-depth-4', label: 'depth-4', desc: '0 16px 16px' },
];

// ─── Story ────────────────────────────────────────────────────────────────────

export const Foundations: Story = {
  render: () => (
    <Page>
      <PageTitle>Design System</PageTitle>
      <PageSubtitle>Foundations — colour palette, semantic tokens, typography, spacing, radius and depth.</PageSubtitle>

      {/* ── Colour Palette ── */}
      <SectionTitle>Colour Palette</SectionTitle>
      <div style={{ marginTop: 20 }}>
        {FAMILIES.map(f => <PaletteRow key={f.name} {...f} />)}
      </div>

      {/* ── Semantic Colour Tokens ── */}
      <SectionTitle>Semantic Tokens</SectionTitle>

      <SubTitle>Primary</SubTitle>
      <TokenGroup tokens={[
        { token: '--atom-primary-main',        label: 'Primary', note: 'Brand / action colour' },
        { token: '--atom-primary-tint1',       label: 'Tint 1' },
        { token: '--atom-primary-tint2',       label: 'Tint 2' },
        { token: '--atom-primary-contrast',    label: 'Contrast', note: 'Text on primary' },
        { token: '--atom-primary-transparent', label: 'Transparent', note: 'Hover / halo fill' },
      ]} />

      <SubTitle>Surface</SubTitle>
      <TokenGroup tokens={[
        { token: '--atom-surface-1',       label: 'Surface 1', note: 'Page / card background' },
        { token: '--atom-surface-2',       label: 'Surface 2', note: 'Subtle background' },
        { token: '--atom-surface-3',       label: 'Surface 3', note: 'Raised / input background' },
        { token: '--atom-surface-inverse', label: 'Inverse',   note: 'Dark surface' },
      ]} />

      <SubTitle>Text</SubTitle>
      <TokenGroup tokens={[
        { token: '--atom-text-primary',   label: 'Primary',   note: 'Headings and body' },
        { token: '--atom-text-secondary', label: 'Secondary', note: 'Supporting text' },
        { token: '--atom-text-tertiary',  label: 'Tertiary',  note: 'Placeholders, labels' },
        { token: '--atom-text-inverse',   label: 'Inverse',   note: 'Text on dark backgrounds' },
      ]} />

      <SubTitle>Border</SubTitle>
      <TokenGroup tokens={[
        { token: '--atom-border-primary',   label: 'Primary',   note: 'Default dividers' },
        { token: '--atom-border-secondary', label: 'Secondary', note: 'Subtle dividers' },
        { token: '--atom-border-tertiary',  label: 'Tertiary',  note: 'Strong dividers' },
        { token: '--atom-border-input',     label: 'Input',     note: 'Form field borders' },
      ]} />

      <SubTitle>Semantic</SubTitle>
      <TokenGroup tokens={[
        { token: '--atom-success-main',        label: 'Success'         },
        { token: '--atom-success-transparent', label: 'Success transparent' },
        { token: '--atom-warning-main',        label: 'Warning'         },
        { token: '--atom-warning-transparent', label: 'Warning transparent' },
        { token: '--atom-error-main',          label: 'Error'           },
        { token: '--atom-error-transparent',   label: 'Error transparent' },
      ]} />

      <SubTitle>Neutral</SubTitle>
      <TokenGroup tokens={[
        { token: '--atom-neutral-one',         label: 'One',         note: 'Hover backgrounds' },
        { token: '--atom-neutral-two',         label: 'Two',         note: 'Borders, dividers' },
        { token: '--atom-neutral-icon',        label: 'Icon',        note: 'Default icon colour' },
        { token: '--atom-neutral-disabled',    label: 'Disabled' },
        { token: '--atom-neutral-transparent', label: 'Transparent', note: 'Subtle overlay' },
      ]} />

      <SubTitle>Halo</SubTitle>
      <TokenGroup tokens={[
        { token: '--atom-halo-default', label: 'Default' },
        { token: '--atom-halo-primary', label: 'Primary' },
        { token: '--atom-halo-success', label: 'Success' },
        { token: '--atom-halo-warning', label: 'Warning' },
        { token: '--atom-halo-error',   label: 'Error'   },
      ]} />

      {/* ── Typography ── */}
      <SectionTitle>Typography</SectionTitle>

      <SubTitle>Type scale</SubTitle>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        {TYPE_SIZES.map(({ token, px }) => (
          <div key={token} style={{ display: 'flex', alignItems: 'baseline', gap: 24, padding: '12px 0', borderBottom: '1px solid var(--atom-border-primary)' }}>
            <div style={{ width: 120, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
              <span style={{ fontSize: 12, fontFamily: 'monospace', color: 'var(--atom-text-secondary)' }}>{token}</span>
              <span style={{ fontSize: 11, color: 'var(--atom-text-tertiary)' }}>{px}</span>
            </div>
            <span style={{ fontSize: px, fontWeight: 400, color: 'var(--atom-text-primary)', lineHeight: 1.3 }}>
              The quick brown fox
            </span>
          </div>
        ))}
      </div>

      <SubTitle>Font weights — Inter</SubTitle>
      <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', padding: '12px 0' }}>
        {WEIGHTS.map(({ label, value }) => (
          <div key={value} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <span style={{ fontSize: 24, fontWeight: value, color: 'var(--atom-text-primary)', lineHeight: 1.2 }}>Ag</span>
            <span style={{ fontSize: 12, color: 'var(--atom-text-secondary)' }}>{label}</span>
            <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--atom-text-tertiary)' }}>{value}</span>
          </div>
        ))}
      </div>

      {/* ── Spacing ── */}
      <SectionTitle>Spacing</SectionTitle>
      <p style={{ fontSize: 13, color: 'var(--atom-text-secondary)', margin: '8px 0 16px' }}>
        Base unit: 8px. All spacing tokens are multiples of this grid.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {SPACES.map(({ token, px }) => (
          <div key={token} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 120, flexShrink: 0 }}>
              <span style={{ fontSize: 12, fontFamily: 'monospace', color: 'var(--atom-text-secondary)' }}>{token}</span>
            </div>
            <div style={{ width: 36, flexShrink: 0, textAlign: 'right' }}>
              <span style={{ fontSize: 11, color: 'var(--atom-text-tertiary)' }}>{px}</span>
            </div>
            <div style={{ height: 20, width: px, backgroundColor: 'var(--atom-primary-main)', borderRadius: 3, opacity: 0.7, flexShrink: 0 }} />
          </div>
        ))}
      </div>

      {/* ── Border Radius ── */}
      <SectionTitle>Border Radius</SectionTitle>
      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', padding: '16px 0' }}>
        {RADII.map(({ token, label, px }) => (
          <div key={token} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <div style={{
              width: 64,
              height: 64,
              borderRadius: `var(${token})`,
              backgroundColor: 'var(--atom-neutral-one)',
              border: '1px solid var(--atom-border-primary)',
            }} />
            <span style={{ fontSize: 12, fontFamily: 'monospace', color: 'var(--atom-text-secondary)' }}>{label}</span>
            <span style={{ fontSize: 11, color: 'var(--atom-text-tertiary)' }}>{px}</span>
          </div>
        ))}
      </div>

      {/* ── Depth / Shadow ── */}
      <SectionTitle>Depth</SectionTitle>
      <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', padding: '24px 0 16px' }}>
        {DEPTHS.map(({ token, desc }) => (
          <div key={token} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 100,
              height: 100,
              borderRadius: 12,
              backgroundColor: 'var(--atom-surface-1)',
              border: '1px solid var(--atom-border-primary)',
              boxShadow: `var(${token})`,
            }} />
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 12, fontFamily: 'monospace', color: 'var(--atom-text-secondary)' }}>{token}</div>
              <div style={{ fontSize: 11, color: 'var(--atom-text-tertiary)', marginTop: 2 }}>{desc}</div>
            </div>
          </div>
        ))}
      </div>
    </Page>
  ),
};
