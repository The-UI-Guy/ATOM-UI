import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Check } from '@phosphor-icons/react';
import { Switch } from './Switch';
import { StoryPage, StoryHeader, Section, PropsTable } from '../../stories/StoryComponents';

const meta: Meta<typeof Switch> = {
  title: 'Components/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Interactive demos
const BasicSwitchDemo = ({ size = 'md' }: { size?: 'sm' | 'md' }) => {
  const [checked, setChecked] = useState(false);
  return <Switch checked={checked} onChange={setChecked} size={size} />;
};

const LabelSwitchDemo = ({ size = 'md' }: { size?: 'sm' | 'md' }) => {
  const [checked, setChecked] = useState(true);
  return <Switch checked={checked} onChange={setChecked} label="Label" size={size} />;
};

const IconSwitchDemo = ({ size = 'md' }: { size?: 'sm' | 'md' }) => {
  const [checked, setChecked] = useState(true);
  return <Switch checked={checked} onChange={setChecked} icon={<Check />} size={size} />;
};

const IconLabelSwitchDemo = ({ size = 'md' }: { size?: 'sm' | 'md' }) => {
  const [checked, setChecked] = useState(true);
  return <Switch checked={checked} onChange={setChecked} label="Label" icon={<Check />} size={size} />;
};

export const Documentation: Story = {
  parameters: {
    layout: 'fullscreen',
  },
  render: () => (
    <StoryPage>
      <StoryHeader
        title="Switch"
        description="A toggle switch for binary on/off states. Supports labels, icons, two sizes, and hover states."
      />

      {/* Interactive Demo */}
      <Section title="Interactive Demo" description="Click to toggle the switches.">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <div style={{ fontSize: '12px', color: 'var(--atom-text-secondary)', marginBottom: '8px' }}>Medium (md)</div>
            <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
              <BasicSwitchDemo size="md" />
              <LabelSwitchDemo size="md" />
              <IconSwitchDemo size="md" />
              <IconLabelSwitchDemo size="md" />
            </div>
          </div>
          <div>
            <div style={{ fontSize: '12px', color: 'var(--atom-text-secondary)', marginBottom: '8px' }}>Small (sm)</div>
            <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
              <BasicSwitchDemo size="sm" />
              <LabelSwitchDemo size="sm" />
              <IconSwitchDemo size="sm" />
              <IconLabelSwitchDemo size="sm" />
            </div>
          </div>
        </div>
      </Section>

      {/* Overview */}
      <Section title="Overview" description="All switch variants at both sizes.">
        <table style={{ borderCollapse: 'separate', borderSpacing: '24px 16px' }}>
          <thead>
            <tr>
              <th style={{ fontSize: '12px', color: 'var(--atom-text-secondary)', fontWeight: 500, textAlign: 'left' }}>Size</th>
              <th style={{ fontSize: '12px', color: 'var(--atom-text-secondary)', fontWeight: 500, textAlign: 'center' }}>Basic</th>
              <th style={{ fontSize: '12px', color: 'var(--atom-text-secondary)', fontWeight: 500, textAlign: 'center' }}>With Icon</th>
              <th style={{ fontSize: '12px', color: 'var(--atom-text-secondary)', fontWeight: 500, textAlign: 'center' }}>With Label</th>
              <th style={{ fontSize: '12px', color: 'var(--atom-text-secondary)', fontWeight: 500, textAlign: 'center' }}>Icon + Label</th>
            </tr>
          </thead>
          <tbody>
            {/* Medium - Checked */}
            <tr>
              <td style={{ fontSize: '13px', color: 'var(--atom-text-secondary)', fontWeight: 500 }}>md (on)</td>
              <td style={{ textAlign: 'center' }}><Switch size="md" checked /></td>
              <td style={{ textAlign: 'center' }}><Switch size="md" checked icon={<Check />} /></td>
              <td style={{ textAlign: 'center' }}><Switch size="md" checked label="Label" /></td>
              <td style={{ textAlign: 'center' }}><Switch size="md" checked label="Label" icon={<Check />} /></td>
            </tr>
            {/* Medium - Unchecked */}
            <tr>
              <td style={{ fontSize: '13px', color: 'var(--atom-text-secondary)', fontWeight: 500 }}>md (off)</td>
              <td style={{ textAlign: 'center' }}><Switch size="md" /></td>
              <td style={{ textAlign: 'center' }}><Switch size="md" icon={<Check />} /></td>
              <td style={{ textAlign: 'center' }}><Switch size="md" label="Label" /></td>
              <td style={{ textAlign: 'center' }}><Switch size="md" label="Label" icon={<Check />} /></td>
            </tr>
            {/* Small - Checked */}
            <tr>
              <td style={{ fontSize: '13px', color: 'var(--atom-text-secondary)', fontWeight: 500 }}>sm (on)</td>
              <td style={{ textAlign: 'center' }}><Switch size="sm" checked /></td>
              <td style={{ textAlign: 'center' }}><Switch size="sm" checked icon={<Check />} /></td>
              <td style={{ textAlign: 'center' }}><Switch size="sm" checked label="Label" /></td>
              <td style={{ textAlign: 'center' }}><Switch size="sm" checked label="Label" icon={<Check />} /></td>
            </tr>
            {/* Small - Unchecked */}
            <tr>
              <td style={{ fontSize: '13px', color: 'var(--atom-text-secondary)', fontWeight: 500 }}>sm (off)</td>
              <td style={{ textAlign: 'center' }}><Switch size="sm" /></td>
              <td style={{ textAlign: 'center' }}><Switch size="sm" icon={<Check />} /></td>
              <td style={{ textAlign: 'center' }}><Switch size="sm" label="Label" /></td>
              <td style={{ textAlign: 'center' }}><Switch size="sm" label="Label" icon={<Check />} /></td>
            </tr>
          </tbody>
        </table>
      </Section>

      {/* Sizes */}
      <Section title="Sizes" description="Two sizes available.">
        <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <Switch size="md" checked />
            <div style={{ marginTop: '8px', fontSize: '12px', color: 'var(--atom-text-secondary)' }}>md (24px)</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Switch size="sm" checked />
            <div style={{ marginTop: '8px', fontSize: '12px', color: 'var(--atom-text-secondary)' }}>sm (16px)</div>
          </div>
        </div>
      </Section>

      {/* States */}
      <Section title="States" description="Hover over switches to see halo effect.">
        <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <Switch checked={false} />
            <div style={{ marginTop: '8px', fontSize: '12px', color: 'var(--atom-text-secondary)' }}>Off</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Switch checked={true} />
            <div style={{ marginTop: '8px', fontSize: '12px', color: 'var(--atom-text-secondary)' }}>On</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Switch checked={false} disabled />
            <div style={{ marginTop: '8px', fontSize: '12px', color: 'var(--atom-text-secondary)' }}>Disabled (off)</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Switch checked={true} disabled />
            <div style={{ marginTop: '8px', fontSize: '12px', color: 'var(--atom-text-secondary)' }}>Disabled (on)</div>
          </div>
        </div>
      </Section>

      {/* With Content */}
      <Section title="With Content" description="Switches can display an icon, label, or both when active.">
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ textAlign: 'center' }}>
            <Switch checked icon={<Check />} />
            <div style={{ marginTop: '8px', fontSize: '12px', color: 'var(--atom-text-secondary)' }}>Icon only</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Switch checked label="Active" />
            <div style={{ marginTop: '8px', fontSize: '12px', color: 'var(--atom-text-secondary)' }}>Label only</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Switch checked label="Active" icon={<Check />} />
            <div style={{ marginTop: '8px', fontSize: '12px', color: 'var(--atom-text-secondary)' }}>Icon + Label</div>
          </div>
        </div>
      </Section>

      {/* API Reference */}
      <Section title="API Reference">
        <PropsTable rows={[
          ['checked', 'boolean', 'false', 'Whether switch is on'],
          ['onChange', '(checked: boolean) => void', '-', 'Called when state changes'],
          ['size', "'sm' | 'md'", "'md'", 'Size (16px or 24px height)'],
          ['label', 'string', '-', 'Label text (shown when on)'],
          ['icon', 'ReactNode', '-', 'Icon (shown when on)'],
          ['disabled', 'boolean', 'false', 'Disable the switch'],
          ['id', 'string', 'auto', 'ID for input element'],
          ['name', 'string', '-', 'Name for form submission'],
        ]} />
      </Section>
    </StoryPage>
  ),
};
