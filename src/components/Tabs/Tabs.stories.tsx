import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { User, Users, Gear, MapPin, Star, Image, Hammer, Wrench } from '@phosphor-icons/react';
import { Tabs } from './Tabs';

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
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

// Interactive controlled demo
const ControlledDemo = () => {
  const [value, setValue] = useState('account');
  return (
    <div>
      <Tabs
        variant="segment"
        value={value}
        onValueChange={setValue}
        items={[
          { value: 'account', label: 'Account' },
          { value: 'library', label: 'Library' },
          { value: 'settings', label: 'Settings' },
        ]}
      />
      <p style={{ marginTop: '16px', fontSize: '14px', color: '#666' }}>
        Selected: <strong>{value}</strong>
      </p>
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
        <h1 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '8px' }}>Tabs</h1>
        <p style={{ fontSize: '16px', color: '#666' }}>
          A tabbed interface with segment or underline variants. Supports horizontal and vertical orientations.
        </p>
      </div>

      {/* Segment Variant - Horizontal */}
      <Section title="Segment Variant - Horizontal" description="Tabs with a segmented background style.">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <div style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>Plain text</div>
            <Tabs
              variant="segment"
              items={[
                { value: 'account', label: 'Account' },
                { value: 'library', label: 'Library' },
                { value: 'settings', label: 'Settings' },
                { value: 'orders', label: 'Orders', counter: 1 },
                { value: 'invoices', label: 'Invoices' },
              ]}
              defaultValue="account"
            />
          </div>

          <div>
            <div style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>Text and icon</div>
            <Tabs
              variant="segment"
              items={[
                { value: 'users', label: 'Users', icon: <User />, counter: 1 },
                { value: 'teams', label: 'Teams', icon: <Users /> },
              ]}
              defaultValue="users"
            />
          </div>

          <div>
            <div style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>Icon only</div>
            <Tabs
              variant="segment"
              items={[
                { value: 'location', icon: <MapPin />, counter: 1 },
                { value: 'favorites', icon: <Star /> },
                { value: 'images', icon: <Image /> },
                { value: 'settings', icon: <Gear /> },
              ]}
              defaultValue="location"
            />
          </div>
        </div>
      </Section>

      {/* Underline Variant - Horizontal */}
      <Section title="Underline Variant - Horizontal" description="Tabs with an underline indicator.">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <div style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>Plain text</div>
            <Tabs
              variant="underline"
              items={[
                { value: 'setup', label: 'Setup' },
                { value: 'users', label: 'Users', counter: 234 },
                { value: 'assignment', label: 'Assignment' },
              ]}
              defaultValue="setup"
            />
          </div>

          <div>
            <div style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>Text and icon</div>
            <Tabs
              variant="underline"
              items={[
                { value: 'config', label: 'Config', icon: <Gear /> },
                { value: 'builds', label: 'Builds', icon: <Hammer /> },
                { value: 'agents', label: 'Agents', icon: <Users /> },
                { value: 'tools', label: 'Tools', icon: <Wrench /> },
              ]}
              defaultValue="config"
            />
          </div>
        </div>
      </Section>

      {/* Underline Variant - Vertical */}
      <Section title="Underline Variant - Vertical" description="Vertical tabs with left-side underline.">
        <Tabs
          variant="underline"
          orientation="vertical"
          items={[
            { value: 'setup', label: 'Setup' },
            { value: 'users', label: 'Users', counter: 234 },
            { value: 'assignment', label: 'Assignment' },
          ]}
          defaultValue="setup"
        />
      </Section>

      {/* Segment Variant - Vertical */}
      <Section title="Segment Variant - Vertical" description="Vertical segmented tabs.">
        <Tabs
          variant="segment"
          orientation="vertical"
          items={[
            { value: 'account', label: 'Account' },
            { value: 'library', label: 'Library' },
            { value: 'settings', label: 'Settings' },
          ]}
          defaultValue="account"
        />
      </Section>

      {/* Controlled */}
      <Section title="Controlled" description="Controlled tabs with external state.">
        <ControlledDemo />
      </Section>

      {/* Disabled Tabs */}
      <Section title="Disabled Tabs" description="Individual tabs can be disabled.">
        <Tabs
          variant="segment"
          items={[
            { value: 'active', label: 'Active' },
            { value: 'disabled', label: 'Disabled', disabled: true },
            { value: 'another', label: 'Another' },
          ]}
          defaultValue="active"
        />
      </Section>

      {/* API Reference */}
      <Section title="API Reference">
        <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '12px' }}>Tabs Props</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px', marginBottom: '24px' }}>
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
              <td style={{ padding: '12px 16px 12px 0' }}><code>items</code></td>
              <td style={{ padding: '12px 16px 12px 0', color: '#666' }}>TabItem[]</td>
              <td style={{ padding: '12px 16px 12px 0' }}>required</td>
              <td style={{ padding: '12px 0', color: '#666' }}>Array of tab configurations</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
              <td style={{ padding: '12px 16px 12px 0' }}><code>value</code></td>
              <td style={{ padding: '12px 16px 12px 0', color: '#666' }}>string</td>
              <td style={{ padding: '12px 16px 12px 0' }}>-</td>
              <td style={{ padding: '12px 0', color: '#666' }}>Controlled selected value</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
              <td style={{ padding: '12px 16px 12px 0' }}><code>defaultValue</code></td>
              <td style={{ padding: '12px 16px 12px 0', color: '#666' }}>string</td>
              <td style={{ padding: '12px 16px 12px 0' }}>first item</td>
              <td style={{ padding: '12px 0', color: '#666' }}>Default selected value</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
              <td style={{ padding: '12px 16px 12px 0' }}><code>onValueChange</code></td>
              <td style={{ padding: '12px 16px 12px 0', color: '#666' }}>(value: string) =&gt; void</td>
              <td style={{ padding: '12px 16px 12px 0' }}>-</td>
              <td style={{ padding: '12px 0', color: '#666' }}>Callback when tab changes</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
              <td style={{ padding: '12px 16px 12px 0' }}><code>variant</code></td>
              <td style={{ padding: '12px 16px 12px 0', color: '#666' }}>'segment' | 'underline'</td>
              <td style={{ padding: '12px 16px 12px 0' }}><code>'segment'</code></td>
              <td style={{ padding: '12px 0', color: '#666' }}>Visual variant</td>
            </tr>
            <tr>
              <td style={{ padding: '12px 16px 12px 0' }}><code>orientation</code></td>
              <td style={{ padding: '12px 16px 12px 0', color: '#666' }}>'horizontal' | 'vertical'</td>
              <td style={{ padding: '12px 16px 12px 0' }}><code>'horizontal'</code></td>
              <td style={{ padding: '12px 0', color: '#666' }}>Tab orientation</td>
            </tr>
          </tbody>
        </table>

        <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '12px' }}>TabItem Props</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #e0e0e0', textAlign: 'left' }}>
              <th style={{ padding: '12px 16px 12px 0', fontWeight: 600 }}>Prop</th>
              <th style={{ padding: '12px 16px 12px 0', fontWeight: 600 }}>Type</th>
              <th style={{ padding: '12px 0', fontWeight: 600 }}>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
              <td style={{ padding: '12px 16px 12px 0' }}><code>value</code></td>
              <td style={{ padding: '12px 16px 12px 0', color: '#666' }}>string</td>
              <td style={{ padding: '12px 0', color: '#666' }}>Unique identifier (required)</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
              <td style={{ padding: '12px 16px 12px 0' }}><code>label</code></td>
              <td style={{ padding: '12px 16px 12px 0', color: '#666' }}>string</td>
              <td style={{ padding: '12px 0', color: '#666' }}>Tab label text</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
              <td style={{ padding: '12px 16px 12px 0' }}><code>icon</code></td>
              <td style={{ padding: '12px 16px 12px 0', color: '#666' }}>ReactNode</td>
              <td style={{ padding: '12px 0', color: '#666' }}>Tab icon</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
              <td style={{ padding: '12px 16px 12px 0' }}><code>counter</code></td>
              <td style={{ padding: '12px 16px 12px 0', color: '#666' }}>number</td>
              <td style={{ padding: '12px 0', color: '#666' }}>Counter badge value</td>
            </tr>
            <tr>
              <td style={{ padding: '12px 16px 12px 0' }}><code>disabled</code></td>
              <td style={{ padding: '12px 16px 12px 0', color: '#666' }}>boolean</td>
              <td style={{ padding: '12px 0', color: '#666' }}>Disable this tab</td>
            </tr>
          </tbody>
        </table>
      </Section>
    </div>
  ),
};
