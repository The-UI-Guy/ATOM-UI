import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from './Checkbox';
import { StoryPage, StoryHeader, Section, PropsTable } from '../../stories/StoryComponents';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

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
    <StoryPage>
      <StoryHeader
        title="Checkbox"
        description="A checkbox input for selecting one or multiple options. Supports two sizes and disabled state."
      />

      {/* Interactive */}
      <Section title="Interactive Demo" description="Click to toggle the checkbox.">
        <InteractiveDemo />
      </Section>

      {/* Overview */}
      <Section title="Overview" description="All checkbox states at both sizes.">
        <table style={{ borderCollapse: 'separate', borderSpacing: '32px 16px' }}>
          <thead>
            <tr>
              <th style={{ fontSize: '12px', color: 'var(--atom-text-secondary)', fontWeight: 500, textAlign: 'left' }}>Size</th>
              <th style={{ fontSize: '12px', color: 'var(--atom-text-secondary)', fontWeight: 500, textAlign: 'center' }}>Default</th>
              <th style={{ fontSize: '12px', color: 'var(--atom-text-secondary)', fontWeight: 500, textAlign: 'center' }}>Checked</th>
              <th style={{ fontSize: '12px', color: 'var(--atom-text-secondary)', fontWeight: 500, textAlign: 'center' }}>Disabled</th>
              <th style={{ fontSize: '12px', color: 'var(--atom-text-secondary)', fontWeight: 500, textAlign: 'center' }}>Disabled Checked</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ fontSize: '13px', color: 'var(--atom-text-secondary)', fontWeight: 500 }}>md (20px)</td>
              <td style={{ textAlign: 'center' }}><Checkbox size="md" /></td>
              <td style={{ textAlign: 'center' }}><Checkbox size="md" checked /></td>
              <td style={{ textAlign: 'center' }}><Checkbox size="md" disabled /></td>
              <td style={{ textAlign: 'center' }}><Checkbox size="md" checked disabled /></td>
            </tr>
            <tr>
              <td style={{ fontSize: '13px', color: 'var(--atom-text-secondary)', fontWeight: 500 }}>sm (14px)</td>
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
            <div style={{ marginTop: '8px', fontSize: '12px', color: 'var(--atom-text-secondary)' }}>Default</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Checkbox size="md" checked />
            <div style={{ marginTop: '8px', fontSize: '12px', color: 'var(--atom-text-secondary)' }}>Checked</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Checkbox size="md" disabled />
            <div style={{ marginTop: '8px', fontSize: '12px', color: 'var(--atom-text-secondary)' }}>Disabled</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Checkbox size="md" checked disabled />
            <div style={{ marginTop: '8px', fontSize: '12px', color: 'var(--atom-text-secondary)' }}>Disabled Checked</div>
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
        <PropsTable rows={[
          ['checked', 'boolean', 'false', 'Whether checkbox is checked'],
          ['onChange', '(checked: boolean) => void', '-', 'Called when state changes'],
          ['size', "'sm' | 'md'", "'md'", 'Size (14px or 20px)'],
          ['disabled', 'boolean', 'false', 'Disable the checkbox'],
          ['label', 'string', '-', 'Label text'],
          ['id', 'string', 'auto', 'ID for input element'],
          ['name', 'string', '-', 'Name for form submission'],
        ]} />
      </Section>
    </StoryPage>
  ),
};
