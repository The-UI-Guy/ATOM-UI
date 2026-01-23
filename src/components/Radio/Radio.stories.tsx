import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Radio } from './Radio';

const meta: Meta<typeof Radio> = {
  title: 'Components/Radio',
  component: Radio,
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
  const [selected, setSelected] = useState('option1');
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Radio 
        name="demo" 
        value="option1" 
        label="Option 1" 
        checked={selected === 'option1'} 
        onChange={() => setSelected('option1')} 
      />
      <Radio 
        name="demo" 
        value="option2" 
        label="Option 2" 
        checked={selected === 'option2'} 
        onChange={() => setSelected('option2')} 
      />
      <Radio 
        name="demo" 
        value="option3" 
        label="Option 3" 
        checked={selected === 'option3'} 
        onChange={() => setSelected('option3')} 
      />
    </div>
  );
};

export const Documentation: Story = {
  parameters: {
    layout: 'fullscreen',
  },
  render: () => (
    <div style={{ padding: '40px', maxWidth: '900px' }}>
      {/* Header */}
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '8px' }}>Radio</h1>
        <p style={{ fontSize: '16px', color: '#666' }}>
          A radio input for selecting a single option from a group. Supports two sizes and disabled state.
        </p>
      </div>

      {/* Interactive */}
      <Section title="Interactive Demo" description="Click to select an option.">
        <InteractiveDemo />
      </Section>

      {/* Overview */}
      <Section title="Overview" description="All radio states at both sizes.">
        <table style={{ borderCollapse: 'separate', borderSpacing: '32px 16px' }}>
          <thead>
            <tr>
              <th style={{ fontSize: '12px', color: '#666', fontWeight: 500, textAlign: 'left' }}>Size</th>
              <th style={{ fontSize: '12px', color: '#666', fontWeight: 500, textAlign: 'center' }}>Default</th>
              <th style={{ fontSize: '12px', color: '#666', fontWeight: 500, textAlign: 'center' }}>Selected</th>
              <th style={{ fontSize: '12px', color: '#666', fontWeight: 500, textAlign: 'center' }}>Disabled</th>
              <th style={{ fontSize: '12px', color: '#666', fontWeight: 500, textAlign: 'center' }}>Disabled Selected</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ fontSize: '13px', color: '#666', fontWeight: 500 }}>md (20px)</td>
              <td style={{ textAlign: 'center' }}><Radio size="md" /></td>
              <td style={{ textAlign: 'center' }}><Radio size="md" checked /></td>
              <td style={{ textAlign: 'center' }}><Radio size="md" disabled /></td>
              <td style={{ textAlign: 'center' }}><Radio size="md" checked disabled /></td>
            </tr>
            <tr>
              <td style={{ fontSize: '13px', color: '#666', fontWeight: 500 }}>sm (14px)</td>
              <td style={{ textAlign: 'center' }}><Radio size="sm" /></td>
              <td style={{ textAlign: 'center' }}><Radio size="sm" checked /></td>
              <td style={{ textAlign: 'center' }}><Radio size="sm" disabled /></td>
              <td style={{ textAlign: 'center' }}><Radio size="sm" checked disabled /></td>
            </tr>
          </tbody>
        </table>
      </Section>

      {/* With Labels */}
      <Section title="With Labels" description="Radio buttons with label text.">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Radio size="md" label="Medium radio with label" />
          <Radio size="md" label="Medium selected" checked />
          <Radio size="sm" label="Small radio with label" />
          <Radio size="sm" label="Small selected" checked />
        </div>
      </Section>

      {/* States */}
      <Section title="States" description="Hover over radios to see hover states.">
        <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <Radio size="md" />
            <div style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>Default</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Radio size="md" checked />
            <div style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>Selected</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Radio size="md" disabled />
            <div style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>Disabled</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Radio size="md" checked disabled />
            <div style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>Disabled Selected</div>
          </div>
        </div>
      </Section>

      {/* Radio Group Example */}
      <Section title="Radio Group" description="Use the same 'name' attribute to group radios.">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Radio name="plan" value="free" label="Free Plan" />
          <Radio name="plan" value="pro" label="Pro Plan" checked />
          <Radio name="plan" value="enterprise" label="Enterprise Plan" />
          <Radio name="plan" value="custom" label="Custom Plan (disabled)" disabled />
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
              <td style={{ padding: '12px 0', color: '#666' }}>Whether radio is selected</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
              <td style={{ padding: '12px 16px 12px 0' }}><code>onChange</code></td>
              <td style={{ padding: '12px 16px 12px 0', color: '#666' }}>(checked: boolean) =&gt; void</td>
              <td style={{ padding: '12px 16px 12px 0' }}>-</td>
              <td style={{ padding: '12px 0', color: '#666' }}>Called when selection changes</td>
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
              <td style={{ padding: '12px 0', color: '#666' }}>Disable the radio</td>
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
            <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
              <td style={{ padding: '12px 16px 12px 0' }}><code>name</code></td>
              <td style={{ padding: '12px 16px 12px 0', color: '#666' }}>string</td>
              <td style={{ padding: '12px 16px 12px 0' }}>-</td>
              <td style={{ padding: '12px 0', color: '#666' }}>Name for grouping radios</td>
            </tr>
            <tr>
              <td style={{ padding: '12px 16px 12px 0' }}><code>value</code></td>
              <td style={{ padding: '12px 16px 12px 0', color: '#666' }}>string</td>
              <td style={{ padding: '12px 16px 12px 0' }}>-</td>
              <td style={{ padding: '12px 0', color: '#666' }}>Value for form submission</td>
            </tr>
          </tbody>
        </table>
      </Section>
    </div>
  ),
};
