import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Check } from '@phosphor-icons/react';
import { Switch } from './Switch';

const meta: Meta<typeof Switch> = {
  title: 'Components/Switch',
  component: Switch,
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
    <div style={{ padding: '40px', maxWidth: '900px' }}>
      {/* Header */}
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '8px' }}>Switch</h1>
        <p style={{ fontSize: '16px', color: '#666' }}>
          A toggle switch for binary on/off states. Supports labels, icons, two sizes, and hover states.
        </p>
      </div>

    {/* Interactive Demo */}
<Section title="Interactive Demo" description="Click to toggle the switches.">
  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
    <div>
      <div style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>Medium (md)</div>
      <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
        <BasicSwitchDemo size="md" />
        <LabelSwitchDemo size="md" />
        <IconSwitchDemo size="md" />
        <IconLabelSwitchDemo size="md" />
      </div>
    </div>
    <div>
      <div style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>Small (sm)</div>
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
              <th style={{ fontSize: '12px', color: '#666', fontWeight: 500, textAlign: 'left' }}>Size</th>
              <th style={{ fontSize: '12px', color: '#666', fontWeight: 500, textAlign: 'center' }}>Basic</th>
              <th style={{ fontSize: '12px', color: '#666', fontWeight: 500, textAlign: 'center' }}>With Icon</th>
              <th style={{ fontSize: '12px', color: '#666', fontWeight: 500, textAlign: 'center' }}>With Label</th>
              <th style={{ fontSize: '12px', color: '#666', fontWeight: 500, textAlign: 'center' }}>Icon + Label</th>
            </tr>
          </thead>
          <tbody>
            {/* Medium - Checked */}
            <tr>
              <td style={{ fontSize: '13px', color: '#666', fontWeight: 500 }}>md (on)</td>
              <td style={{ textAlign: 'center' }}><Switch size="md" checked /></td>
              <td style={{ textAlign: 'center' }}><Switch size="md" checked icon={<Check />} /></td>
              <td style={{ textAlign: 'center' }}><Switch size="md" checked label="Label" /></td>
              <td style={{ textAlign: 'center' }}><Switch size="md" checked label="Label" icon={<Check />} /></td>
            </tr>
            {/* Medium - Unchecked */}
            <tr>
              <td style={{ fontSize: '13px', color: '#666', fontWeight: 500 }}>md (off)</td>
              <td style={{ textAlign: 'center' }}><Switch size="md" /></td>
              <td style={{ textAlign: 'center' }}><Switch size="md" icon={<Check />} /></td>
              <td style={{ textAlign: 'center' }}><Switch size="md" label="Label" /></td>
              <td style={{ textAlign: 'center' }}><Switch size="md" label="Label" icon={<Check />} /></td>
            </tr>
            {/* Small - Checked */}
            <tr>
              <td style={{ fontSize: '13px', color: '#666', fontWeight: 500 }}>sm (on)</td>
              <td style={{ textAlign: 'center' }}><Switch size="sm" checked /></td>
              <td style={{ textAlign: 'center' }}><Switch size="sm" checked icon={<Check />} /></td>
              <td style={{ textAlign: 'center' }}><Switch size="sm" checked label="Label" /></td>
              <td style={{ textAlign: 'center' }}><Switch size="sm" checked label="Label" icon={<Check />} /></td>
            </tr>
            {/* Small - Unchecked */}
            <tr>
              <td style={{ fontSize: '13px', color: '#666', fontWeight: 500 }}>sm (off)</td>
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
            <div style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>md (24px)</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Switch size="sm" checked />
            <div style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>sm (16px)</div>
          </div>
        </div>
      </Section>

      {/* States */}
      <Section title="States" description="Hover over switches to see halo effect.">
        <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <Switch checked={false} />
            <div style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>Off</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Switch checked={true} />
            <div style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>On</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Switch checked={false} disabled />
            <div style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>Disabled (off)</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Switch checked={true} disabled />
            <div style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>Disabled (on)</div>
          </div>
        </div>
      </Section>

      {/* With Content */}
      <Section title="With Content" description="Switches can display an icon, label, or both when active.">
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ textAlign: 'center' }}>
            <Switch checked icon={<Check />} />
            <div style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>Icon only</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Switch checked label="Active" />
            <div style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>Label only</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Switch checked label="Active" icon={<Check />} />
            <div style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>Icon + Label</div>
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
              <td style={{ padding: '12px 16px 12px 0' }}><code>checked</code></td>
              <td style={{ padding: '12px 16px 12px 0', color: '#666' }}>boolean</td>
              <td style={{ padding: '12px 16px 12px 0' }}><code>false</code></td>
              <td style={{ padding: '12px 0', color: '#666' }}>Whether switch is on</td>
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
              <td style={{ padding: '12px 0', color: '#666' }}>Size (16px or 24px height)</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
              <td style={{ padding: '12px 16px 12px 0' }}><code>label</code></td>
              <td style={{ padding: '12px 16px 12px 0', color: '#666' }}>string</td>
              <td style={{ padding: '12px 16px 12px 0' }}>-</td>
              <td style={{ padding: '12px 0', color: '#666' }}>Label text (shown when on)</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
              <td style={{ padding: '12px 16px 12px 0' }}><code>icon</code></td>
              <td style={{ padding: '12px 16px 12px 0', color: '#666' }}>ReactNode</td>
              <td style={{ padding: '12px 16px 12px 0' }}>-</td>
              <td style={{ padding: '12px 0', color: '#666' }}>Icon (shown when on)</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
              <td style={{ padding: '12px 16px 12px 0' }}><code>disabled</code></td>
              <td style={{ padding: '12px 16px 12px 0', color: '#666' }}>boolean</td>
              <td style={{ padding: '12px 16px 12px 0' }}><code>false</code></td>
              <td style={{ padding: '12px 0', color: '#666' }}>Disable the switch</td>
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
