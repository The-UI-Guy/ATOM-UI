import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Radio } from './Radio';
import { StoryPage, StoryHeader, Section, PropsTable } from '../../stories/StoryComponents';

const meta: Meta<typeof Radio> = {
  title: 'Components/Radio',
  component: Radio,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

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
    <StoryPage>
      <StoryHeader
        title="Radio"
        description="A radio input for selecting a single option from a group. Supports two sizes and disabled state."
      />

      {/* Interactive */}
      <Section title="Interactive Demo" description="Click to select an option.">
        <InteractiveDemo />
      </Section>

      {/* Overview */}
      <Section title="Overview" description="All radio states at both sizes.">
        <table style={{ borderCollapse: 'separate', borderSpacing: '32px 16px' }}>
          <thead>
            <tr>
              <th style={{ fontSize: '12px', color: 'var(--atom-text-secondary)', fontWeight: 500, textAlign: 'left' }}>Size</th>
              <th style={{ fontSize: '12px', color: 'var(--atom-text-secondary)', fontWeight: 500, textAlign: 'center' }}>Default</th>
              <th style={{ fontSize: '12px', color: 'var(--atom-text-secondary)', fontWeight: 500, textAlign: 'center' }}>Selected</th>
              <th style={{ fontSize: '12px', color: 'var(--atom-text-secondary)', fontWeight: 500, textAlign: 'center' }}>Disabled</th>
              <th style={{ fontSize: '12px', color: 'var(--atom-text-secondary)', fontWeight: 500, textAlign: 'center' }}>Disabled Selected</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ fontSize: '13px', color: 'var(--atom-text-secondary)', fontWeight: 500 }}>md (20px)</td>
              <td style={{ textAlign: 'center' }}><Radio size="md" /></td>
              <td style={{ textAlign: 'center' }}><Radio size="md" checked /></td>
              <td style={{ textAlign: 'center' }}><Radio size="md" disabled /></td>
              <td style={{ textAlign: 'center' }}><Radio size="md" checked disabled /></td>
            </tr>
            <tr>
              <td style={{ fontSize: '13px', color: 'var(--atom-text-secondary)', fontWeight: 500 }}>sm (14px)</td>
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
            <div style={{ marginTop: '8px', fontSize: '12px', color: 'var(--atom-text-secondary)' }}>Default</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Radio size="md" checked />
            <div style={{ marginTop: '8px', fontSize: '12px', color: 'var(--atom-text-secondary)' }}>Selected</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Radio size="md" disabled />
            <div style={{ marginTop: '8px', fontSize: '12px', color: 'var(--atom-text-secondary)' }}>Disabled</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Radio size="md" checked disabled />
            <div style={{ marginTop: '8px', fontSize: '12px', color: 'var(--atom-text-secondary)' }}>Disabled Selected</div>
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
        <PropsTable rows={[
          ['checked', 'boolean', 'false', 'Whether radio is selected'],
          ['onChange', '(checked: boolean) => void', '-', 'Called when selection changes'],
          ['size', "'sm' | 'md'", "'md'", 'Size (14px or 20px)'],
          ['disabled', 'boolean', 'false', 'Disable the radio'],
          ['label', 'string', '-', 'Label text'],
          ['id', 'string', 'auto', 'ID for input element'],
          ['name', 'string', '-', 'Name for grouping radios'],
          ['value', 'string', '-', 'Value for form submission'],
        ]} />
      </Section>
    </StoryPage>
  ),
};
