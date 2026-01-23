import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
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

// Interactive demo
const InteractiveDemo = () => {
  const [checked, setChecked] = useState(false);
  return <Checkbox checked={checked} onChange={setChecked} label="Click me" />;
};

export const Documentation: Story = {
  parameters: {
    layout: 'fullscreen',
  },
  render: () => (
    <div style={{ padding: '40px', maxWidth: '900px' }}>
      {/* Header */}
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '8px' }}>Checkbox</h1>
        <p style={{ fontSize: '16px', color: '#666' }}>
          A checkbox input for selecting one or multiple options. Supports two sizes and disabled state.
        </p>
      </div>

      {/* Interactive */}
      <Section title="Interactive Demo" description="Click to toggle the checkbox.">
        <InteractiveDemo />
      </Section>

      {/* Overview */}
      <Section title="Overview" description="All checkbox states at both sizes.">
        <table style={{ borderCollapse: 'separate', borderSpacing: '32px 16px' }}>
          <thead>
            <tr>
              <th style={{ fontSize: '12px', color: '#666', fontWeight: 500, textAlign: 'left' }}>Size</th>
              <th style={{ fontSize: '12px', color: '#666', fontWeight: 500, textAlign: 'center' }}>Default</th>
              <th style={{ fontSize: '12px', color: '#666', fontWeight: 500, textAlign: 'center' }}>Checked</th>
              <th style={{ fontSize: '12px', color: '#666', fontWeight: 500, textAlign: 'center' }}>Disabled</th>
              <th style={{ fontSize: '12px', color: '#666', fontWeight: 500, textAlign: 'center' }}>Disabled Checked</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ fontSize: '13px', color: '#666', fontWeight: 500 }}>md (20px)</td>
              <td style={{ textAlign: 'center' }}><Checkbox size="md" /></td>
              <td style={{ textAlign: 'center' }}><Checkbox size="md" checked /></td>
              <td style={{ textAlign: 'center' }}><Checkbox size="md" disabled /></td>
              <td style={{ textAlign: 'center' }}><Checkbox size="md" checked disabled /></td>
            </tr>
            <tr>
              <td style={{ fontSize: '13px', color: '#666', fontWeight: 500 }}>sm (14px)</td>
              <td style={{ textAlign: 'center' }}><Checkbox size="sm" /></td>
              <td style={{ textAlign: 'center' }}><Checkbox size="sm" checked /></td>
              <td style={{ textAlign: 'center' }}><Checkbox size="sm" disabled /></td>
              <td style={{ textAlign: 'center' }}><Checkbox size="sm" checked disabled /></td>
            </tr>
          </tbody>
        </table>
      </Section>

      {/* With Labels */}
      <Section title="With Labels" description="Checkboxes with label text.">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Checkbox size="md" label="Medium checkbox with label" />
          <Checkbox size="md" label="Medium checked" checked />
          <Checkbox size="sm" label="Small checkbox with label" />
          <Checkbox size="sm" label="Small checked" checked />
        </div>
      </Section>

      {/* States */}
      <Section title="States" description="Hover over checkboxes to see hover states.">
        <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <Checkbox size="md" />
            <div style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>Default</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Checkbox size="md" checked />
            <div style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>Checked</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Checkbox size="md" disabled />
            <div style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>Disabled</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Checkbox size="md" checked disabled />
            <div style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>Disabled Checked</div>
          </div>
        </div>
      </Section>

      {/* Checkbox Group Example */}
      <Section title="Checkbox Group" description="Multiple checkboxes for selecting options.">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Checkbox label="Option 1" checked />
          <Checkbox label="Option 2" />
          <Checkbox label="Option 3" checked />
          <Checkbox label="Option 4 (disabled)" disabled />
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
              <td style={{ padding: '12px 16px 12px 0' }}><code>checked</code></td>
              <td style={{ padding: '12px 16px 12px 0', color: '#666' }}>boolean</td>
              <td style={{ padding: '12px 16px 12px 0' }}><code>false</code></td>
              <td style={{ padding: '12px 0', color: '#666' }}>Whether checkbox is checked</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
              <td style={{ padding: '12px 16px 12px 0' }}><code>onChange</code></td>
              <td style={{ padding: '12px 16px 12px 0', color: '#666' }}>(checked: boolean) =&gt; void</td>
              <td style={{ padding: '12px 16px 12px 0' }}>-</td>
              <td style={{ padding: '12px 0', color: '#666' }}>Called when state changes</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
              <td style={{ padding: '12px 16px 12px 0' }}><code>size</code></td>
              <td style={{ padding: '12px 16px 12px 0', color: '#666' }}>'sm' | 'md'</td>
              <td style={{ padding: '12px 16px 12px 0' }}><code>'md'</code></td>
              <td style={{ padding: '12px 0', color: '#666' }}>Size (14px or 20px)</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
              <td style={{ padding: '12px 16px 12px 0' }}><code>disabled</code></td>
              <td style={{ padding: '12px 16px 12px 0', color: '#666' }}>boolean</td>
              <td style={{ padding: '12px 16px 12px 0' }}><code>false</code></td>
              <td style={{ padding: '12px 0', color: '#666' }}>Disable the checkbox</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
              <td style={{ padding: '12px 16px 12px 0' }}><code>label</code></td>
              <td style={{ padding: '12px 16px 12px 0', color: '#666' }}>string</td>
              <td style={{ padding: '12px 16px 12px 0' }}>-</td>
              <td style={{ padding: '12px 0', color: '#666' }}>Label text</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
              <td style={{ padding: '12px 16px 12px 0' }}><code>id</code></td>
              <td style={{ padding: '12px 16px 12px 0', color: '#666' }}>string</td>
              <td style={{ padding: '12px 16px 12px 0' }}>auto</td>
              <td style={{ padding: '12px 0', color: '#666' }}>ID for input element</td>
            </tr>
            <tr>
              <td style={{ padding: '12px 16px 12px 0' }}><code>name</code></td>
              <td style={{ padding: '12px 16px 12px 0', color: '#666' }}>string</td>
              <td style={{ padding: '12px 16px 12px 0' }}>-</td>
              <td style={{ padding: '12px 0', color: '#666' }}>Name for form submission</td>
            </tr>
          </tbody>
        </table>
      </Section>
    </div>
  ),
};