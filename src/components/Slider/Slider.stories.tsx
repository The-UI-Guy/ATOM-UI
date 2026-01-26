import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Slider } from './Slider';

const meta: Meta<typeof Slider> = {
  title: 'Components/Slider',
  component: Slider,
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

// Interactive single slider demo
const SingleSliderDemo = ({ showLabels = true }: { showLabels?: boolean }) => {
  const [value, setValue] = useState(50);
  return (
    <div style={{ width: '300px' }}>
      <Slider value={value} onChange={(v) => setValue(v as number)} showLabels={showLabels} />
    </div>
  );
};

// Interactive range slider demo
const RangeSliderDemo = ({ showLabels = true }: { showLabels?: boolean }) => {
  const [value, setValue] = useState<[number, number]>([33, 66]);
  return (
    <div style={{ width: '300px' }}>
      <Slider value={value} onChange={(v) => setValue(v as [number, number])} showLabels={showLabels} />
    </div>
  );
};

// Custom range demo
const CustomRangeDemo = () => {
  const [value, setValue] = useState(500);
  return (
    <div style={{ width: '300px' }}>
      <Slider 
        value={value} 
        onChange={(v) => setValue(v as number)} 
        min={0}
        max={1000}
        step={50}
        showLabels
        formatLabel={(v) => `$${v}`}
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
        <h1 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '8px' }}>Slider</h1>
        <p style={{ fontSize: '16px', color: '#666' }}>
          A slider input for selecting a single value or a range of values. Supports custom min/max, step increments, and value labels.
        </p>
      </div>

      {/* Single Slider */}
      <Section title="Single Slider" description="Drag the handle to select a value.">
        <SingleSliderDemo />
      </Section>

      {/* Range Slider */}
      <Section title="Range Slider" description="Drag either handle to select a range.">
        <RangeSliderDemo />
      </Section>

      {/* Custom Range & Step */}
      <Section title="Custom Range & Step" description="Slider with custom min/max, step, and label format.">
        <CustomRangeDemo />
      </Section>

      {/* Without Labels */}
      <Section title="Without Labels" description="Sliders can be used without value labels.">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '300px' }}>
            <SingleSliderDemo showLabels={false} />
    <RangeSliderDemo showLabels={false} />
        </div>
      </Section>

      {/* Disabled State */}
      <Section title="Disabled" description="Disabled sliders cannot be interacted with.">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '300px' }}>
          <Slider value={50} showLabels disabled />
          <Slider value={[25, 75]} showLabels disabled />
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
              <td style={{ padding: '12px 16px 12px 0' }}><code>value</code></td>
              <td style={{ padding: '12px 16px 12px 0', color: '#666' }}>number | [number, number]</td>
              <td style={{ padding: '12px 16px 12px 0' }}>required</td>
              <td style={{ padding: '12px 0', color: '#666' }}>Current value (single) or range (array)</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
              <td style={{ padding: '12px 16px 12px 0' }}><code>onChange</code></td>
              <td style={{ padding: '12px 16px 12px 0', color: '#666' }}>(value) =&gt; void</td>
              <td style={{ padding: '12px 16px 12px 0' }}>-</td>
              <td style={{ padding: '12px 0', color: '#666' }}>Called when value changes</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
              <td style={{ padding: '12px 16px 12px 0' }}><code>min</code></td>
              <td style={{ padding: '12px 16px 12px 0', color: '#666' }}>number</td>
              <td style={{ padding: '12px 16px 12px 0' }}><code>0</code></td>
              <td style={{ padding: '12px 0', color: '#666' }}>Minimum value</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
              <td style={{ padding: '12px 16px 12px 0' }}><code>max</code></td>
              <td style={{ padding: '12px 16px 12px 0', color: '#666' }}>number</td>
              <td style={{ padding: '12px 16px 12px 0' }}><code>100</code></td>
              <td style={{ padding: '12px 0', color: '#666' }}>Maximum value</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
              <td style={{ padding: '12px 16px 12px 0' }}><code>step</code></td>
              <td style={{ padding: '12px 16px 12px 0', color: '#666' }}>number</td>
              <td style={{ padding: '12px 16px 12px 0' }}><code>1</code></td>
              <td style={{ padding: '12px 0', color: '#666' }}>Step increment</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
              <td style={{ padding: '12px 16px 12px 0' }}><code>disabled</code></td>
              <td style={{ padding: '12px 16px 12px 0', color: '#666' }}>boolean</td>
              <td style={{ padding: '12px 16px 12px 0' }}><code>false</code></td>
              <td style={{ padding: '12px 0', color: '#666' }}>Disable the slider</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
              <td style={{ padding: '12px 16px 12px 0' }}><code>showLabels</code></td>
              <td style={{ padding: '12px 16px 12px 0', color: '#666' }}>boolean</td>
              <td style={{ padding: '12px 16px 12px 0' }}><code>false</code></td>
              <td style={{ padding: '12px 0', color: '#666' }}>Show value labels</td>
            </tr>
            <tr>
              <td style={{ padding: '12px 16px 12px 0' }}><code>formatLabel</code></td>
              <td style={{ padding: '12px 16px 12px 0', color: '#666' }}>(value) =&gt; string</td>
              <td style={{ padding: '12px 16px 12px 0' }}><code>{`(v) => \`\${v}%\``}</code></td>
              <td style={{ padding: '12px 0', color: '#666' }}>Format label display</td>
            </tr>
          </tbody>
        </table>
      </Section>
    </div>
  ),
};
