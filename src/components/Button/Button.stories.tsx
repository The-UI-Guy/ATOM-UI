import type { Meta, StoryObj } from '@storybook/react';
import { Heart, ShoppingCart, ArrowRight, Plus, MagnifyingGlass, Trash } from '@phosphor-icons/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Section wrapper component for consistent styling
const Section = ({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) => (
  <div style={{ marginBottom: '48px' }}>
    <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '8px', color: '#111' }}>{title}</h2>
    {description && <p style={{ fontSize: '14px', color: '#666', marginBottom: '16px' }}>{description}</p>}
    <div style={{ padding: '24px', background: '#fafafa', borderRadius: '8px' }}>
      {children}
    </div>
  </div>
);

// Row wrapper for displaying items horizontally
const Row = ({ label, description, children }: { label?: string; description?: string; children: React.ReactNode }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '16px' }}>
    {label && (
      <div style={{ width: '120px', flexShrink: 0 }}>
        <strong style={{ fontSize: '14px' }}>{label}</strong>
        {description && <div style={{ fontSize: '12px', color: '#666' }}>{description}</div>}
      </div>
    )}
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
      {children}
    </div>
  </div>
);

export const Documentation: Story = {
  render: () => (
    <div style={{ padding: '40px', maxWidth: '900px', fontFamily: 'system-ui, sans-serif' }}>
      {/* Header */}
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '8px' }}>Button</h1>
        <p style={{ fontSize: '16px', color: '#666' }}>
          The Button component is used to trigger actions or events. It supports multiple variants, sizes, and icon configurations.
        </p>
      </div>

      {/* Overview */}
      <Section title="Overview" description="All button variants shown in small, medium, and large sizes.">
        <Row label="Primary" description="Main actions">
          <Button variant="primary" size="sm">Button</Button>
          <Button variant="primary" size="md">Button</Button>
          <Button variant="primary" size="lg">Button</Button>
        </Row>
        <Row label="Outline" description="Secondary actions">
          <Button variant="outline" size="sm">Button</Button>
          <Button variant="outline" size="md">Button</Button>
          <Button variant="outline" size="lg">Button</Button>
        </Row>
        <Row label="Text" description="Tertiary actions">
          <Button variant="text" size="sm">Button</Button>
          <Button variant="text" size="md">Button</Button>
          <Button variant="text" size="lg">Button</Button>
        </Row>
        <Row label="Destructive" description="Dangerous actions">
          <Button variant="destructive" size="sm">Delete</Button>
          <Button variant="destructive" size="md">Delete</Button>
          <Button variant="destructive" size="lg">Delete</Button>
        </Row>
        <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #eee', fontSize: '12px', color: '#999' }}>
          Sizes: <strong>Small (28px)</strong>, <strong>Medium (40px)</strong>, <strong>Large (48px)</strong>
        </div>
      </Section>

      {/* Variants */}
      <Section title="Variants">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <div style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 500 }}>Primary</div>
            <div style={{ fontSize: '13px', color: '#666', marginBottom: '12px' }}>Use for the main call-to-action on a page.</div>
            <Button variant="primary">Primary Button</Button>
          </div>
          <div>
            <div style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 500 }}>Outline</div>
            <div style={{ fontSize: '13px', color: '#666', marginBottom: '12px' }}>Use for secondary actions or when you need less visual emphasis.</div>
            <Button variant="outline">Outline Button</Button>
          </div>
          <div>
            <div style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 500 }}>Text</div>
            <div style={{ fontSize: '13px', color: '#666', marginBottom: '12px' }}>Use for tertiary actions or link-like buttons.</div>
            <Button variant="text">Text Button</Button>
          </div>
          <div>
            <div style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 500 }}>Destructive</div>
            <div style={{ fontSize: '13px', color: '#666', marginBottom: '12px' }}>Use for dangerous or irreversible actions like delete.</div>
            <Button variant="destructive">Delete</Button>
          </div>
        </div>
      </Section>

      {/* Sizes */}
      <Section title="Sizes" description="Buttons come in three sizes to fit different contexts.">
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <Button variant="primary" size="sm">Small</Button>
          <Button variant="primary" size="md">Medium</Button>
          <Button variant="primary" size="lg">Large</Button>
        </div>
      </Section>

      {/* With Icons */}
      <Section title="With Icons" description="Buttons can include icons at the start, end, or both positions.">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <div style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 500 }}>Icon Start</div>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Button variant="primary" iconStart={<ShoppingCart size={18} />}>Add to Cart</Button>
              <Button variant="outline" iconStart={<Heart size={18} />}>Wishlist</Button>
              <Button variant="text" iconStart={<Plus size={18} />}>Add Item</Button>
              <Button variant="destructive" iconStart={<Trash size={18} />}>Delete</Button>
            </div>
          </div>
          <div>
            <div style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 500 }}>Icon End</div>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Button variant="primary" iconEnd={<ArrowRight size={18} />}>Continue</Button>
              <Button variant="outline" iconEnd={<ArrowRight size={18} />}>Learn More</Button>
              <Button variant="text" iconEnd={<ArrowRight size={18} />}>View All</Button>
            </div>
          </div>
          <div>
            <div style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 500 }}>Both Icons</div>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Button variant="primary" iconStart={<Heart size={18} />} iconEnd={<Plus size={18} />}>Wishlist</Button>
              <Button variant="outline" iconStart={<Heart size={18} />} iconEnd={<Plus size={18} />}>Wishlist</Button>
            </div>
          </div>
        </div>
      </Section>

      {/* Icon Only */}
      <Section title="Icon Only" description="Square buttons for compact icon-only actions. Pass the icon as children and set iconOnly to true.">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <div style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 500 }}>Variants</div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <Button variant="primary" iconOnly aria-label="Add"><Plus size={20} /></Button>
              <Button variant="outline" iconOnly aria-label="Search"><MagnifyingGlass size={20} /></Button>
              <Button variant="text" iconOnly aria-label="Favorite"><Heart size={20} /></Button>
              <Button variant="destructive" iconOnly aria-label="Delete"><Trash size={20} /></Button>
            </div>
          </div>
          <div>
            <div style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 500 }}>Sizes</div>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <Button variant="primary" size="sm" iconOnly aria-label="Add"><Plus size={16} /></Button>
              <Button variant="primary" size="md" iconOnly aria-label="Add"><Plus size={20} /></Button>
              <Button variant="primary" size="lg" iconOnly aria-label="Add"><Plus size={24} /></Button>
            </div>
          </div>
        </div>
      </Section>

      {/* States */}
      <Section title="States" description="Buttons have different states for user feedback.">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <div style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 500 }}>Disabled</div>
            <div style={{ fontSize: '13px', color: '#666', marginBottom: '12px' }}>Disabled buttons cannot be clicked and have reduced opacity.</div>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Button variant="primary" disabled>Primary</Button>
              <Button variant="outline" disabled>Outline</Button>
              <Button variant="text" disabled>Text</Button>
              <Button variant="destructive" disabled>Destructive</Button>
            </div>
          </div>
          <div>
            <div style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 500 }}>Loading</div>
            <div style={{ fontSize: '13px', color: '#666', marginBottom: '12px' }}>Loading buttons show a spinner and are automatically disabled.</div>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Button variant="primary" loading>Primary</Button>
              <Button variant="outline" loading>Outline</Button>
              <Button variant="text" loading>Text</Button>
              <Button variant="destructive" loading>Destructive</Button>
            </div>
          </div>
        </div>
      </Section>

      {/* API Reference */}
      <Section title="API Reference">
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #e0e0e0', textAlign: 'left' }}>
              <th style={{ padding: '12px 16px 12px 0', fontWeight: 600 }}>Prop</th>
              <th style={{ padding: '12px 16px 12px 0', fontWeight: 600 }}>Type</th>
              <th style={{ padding: '12px 16px 12px 0', fontWeight: 600 }}>Default</th>
              <th style={{ padding: '12px 0', fontWeight: 600 }}>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
              <td style={{ padding: '12px 16px 12px 0' }}><code>variant</code></td>
              <td style={{ padding: '12px 16px 12px 0', color: '#666' }}>'primary' | 'outline' | 'text' | 'destructive'</td>
              <td style={{ padding: '12px 16px 12px 0' }}><code>'primary'</code></td>
              <td style={{ padding: '12px 0', color: '#666' }}>The visual style of the button</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
              <td style={{ padding: '12px 16px 12px 0' }}><code>size</code></td>
              <td style={{ padding: '12px 16px 12px 0', color: '#666' }}>'sm' | 'md' | 'lg'</td>
              <td style={{ padding: '12px 16px 12px 0' }}><code>'md'</code></td>
              <td style={{ padding: '12px 0', color: '#666' }}>The size of the button</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
              <td style={{ padding: '12px 16px 12px 0' }}><code>iconStart</code></td>
              <td style={{ padding: '12px 16px 12px 0', color: '#666' }}>ReactNode</td>
              <td style={{ padding: '12px 16px 12px 0' }}>-</td>
              <td style={{ padding: '12px 0', color: '#666' }}>Icon to display before the text</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
              <td style={{ padding: '12px 16px 12px 0' }}><code>iconEnd</code></td>
              <td style={{ padding: '12px 16px 12px 0', color: '#666' }}>ReactNode</td>
              <td style={{ padding: '12px 16px 12px 0' }}>-</td>
              <td style={{ padding: '12px 0', color: '#666' }}>Icon to display after the text</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
              <td style={{ padding: '12px 16px 12px 0' }}><code>iconOnly</code></td>
              <td style={{ padding: '12px 16px 12px 0', color: '#666' }}>boolean</td>
              <td style={{ padding: '12px 16px 12px 0' }}><code>false</code></td>
              <td style={{ padding: '12px 0', color: '#666' }}>Renders as a square icon button</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
              <td style={{ padding: '12px 16px 12px 0' }}><code>loading</code></td>
              <td style={{ padding: '12px 16px 12px 0', color: '#666' }}>boolean</td>
              <td style={{ padding: '12px 16px 12px 0' }}><code>false</code></td>
              <td style={{ padding: '12px 0', color: '#666' }}>Shows a loading spinner</td>
            </tr>
            <tr>
              <td style={{ padding: '12px 16px 12px 0' }}><code>disabled</code></td>
              <td style={{ padding: '12px 16px 12px 0', color: '#666' }}>boolean</td>
              <td style={{ padding: '12px 16px 12px 0' }}><code>false</code></td>
              <td style={{ padding: '12px 0', color: '#666' }}>Disables the button</td>
            </tr>
          </tbody>
        </table>
      </Section>
    </div>
  ),
};
