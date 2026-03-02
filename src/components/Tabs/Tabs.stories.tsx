import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { User, Users, Gear, MapPin, Star, Image, Hammer, Wrench } from '@phosphor-icons/react';
import { Tabs } from './Tabs';
import * as RadixTabs from '@radix-ui/react-tabs';

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

// Working Segment Demo
const SegmentDemo = () => {
  const [value, setValue] = useState('account');
  return (
    <RadixTabs.Root value={value} onValueChange={setValue}>
      <Tabs
        variant="segment"
        value={value}
        onValueChange={setValue}
        items={[
          { value: 'account', label: 'Account', icon: <User /> },
          { value: 'settings', label: 'Settings', icon: <Gear /> },
          { value: 'notifications', label: 'Notifications', counter: 3 },
        ]}
      />
      <RadixTabs.Content value="account" style={{ marginTop: 16, padding: 16, background: 'white', borderRadius: 8, border: '1px solid #e0e0e0' }}>
        <h3 style={{ margin: '0 0 8px', fontSize: 16, fontWeight: 600 }}>Account Settings</h3>
        <p style={{ margin: 0, color: '#666', fontSize: 14 }}>Manage your account details, profile information, and preferences.</p>
      </RadixTabs.Content>
      <RadixTabs.Content value="settings" style={{ marginTop: 16, padding: 16, background: 'white', borderRadius: 8, border: '1px solid #e0e0e0' }}>
        <h3 style={{ margin: '0 0 8px', fontSize: 16, fontWeight: 600 }}>General Settings</h3>
        <p style={{ margin: 0, color: '#666', fontSize: 14 }}>Configure application settings, themes, and display options.</p>
      </RadixTabs.Content>
      <RadixTabs.Content value="notifications" style={{ marginTop: 16, padding: 16, background: 'white', borderRadius: 8, border: '1px solid #e0e0e0' }}>
        <h3 style={{ margin: '0 0 8px', fontSize: 16, fontWeight: 600 }}>Notifications</h3>
        <p style={{ margin: 0, color: '#666', fontSize: 14 }}>You have 3 unread notifications. Manage your notification preferences here.</p>
      </RadixTabs.Content>
    </RadixTabs.Root>
  );
};

// Working Underline Demo
const UnderlineDemo = () => {
  const [value, setValue] = useState('users');
  return (
    <RadixTabs.Root value={value} onValueChange={setValue}>
      <Tabs
        variant="underline"
        value={value}
        onValueChange={setValue}
        items={[
          { value: 'users', label: 'Users', icon: <User />, counter: 234 },
          { value: 'teams', label: 'Teams', icon: <Users /> },
          { value: 'roles', label: 'Roles', icon: <Gear /> },
        ]}
      />
      <RadixTabs.Content value="users" style={{ marginTop: 16, padding: 16, background: 'white', borderRadius: 8, border: '1px solid #e0e0e0' }}>
        <h3 style={{ margin: '0 0 8px', fontSize: 16, fontWeight: 600 }}>Users</h3>
        <p style={{ margin: 0, color: '#666', fontSize: 14 }}>234 users in your organization. Add, remove, or manage user permissions.</p>
      </RadixTabs.Content>
      <RadixTabs.Content value="teams" style={{ marginTop: 16, padding: 16, background: 'white', borderRadius: 8, border: '1px solid #e0e0e0' }}>
        <h3 style={{ margin: '0 0 8px', fontSize: 16, fontWeight: 600 }}>Teams</h3>
        <p style={{ margin: 0, color: '#666', fontSize: 14 }}>Organize users into teams for better collaboration and access control.</p>
      </RadixTabs.Content>
      <RadixTabs.Content value="roles" style={{ marginTop: 16, padding: 16, background: 'white', borderRadius: 8, border: '1px solid #e0e0e0' }}>
        <h3 style={{ margin: '0 0 8px', fontSize: 16, fontWeight: 600 }}>Roles</h3>
        <p style={{ margin: 0, color: '#666', fontSize: 14 }}>Define roles and permissions to control access across your application.</p>
      </RadixTabs.Content>
    </RadixTabs.Root>
  );
};

// Working Vertical Demo
const VerticalDemo = () => {
  const [value, setValue] = useState('setup');
  return (
    <RadixTabs.Root value={value} onValueChange={setValue} orientation="vertical" style={{ display: 'flex', gap: 16 }}>
      <Tabs
        variant="underline"
        orientation="vertical"
        value={value}
        onValueChange={setValue}
        items={[
          { value: 'setup', label: 'Setup' },
          { value: 'users', label: 'Users', counter: 12 },
          { value: 'billing', label: 'Billing' },
        ]}
      />
      <div style={{ flex: 1 }}>
        <RadixTabs.Content value="setup" style={{ padding: 16, background: 'white', borderRadius: 8, border: '1px solid #e0e0e0' }}>
          <h3 style={{ margin: '0 0 8px', fontSize: 16, fontWeight: 600 }}>Setup</h3>
          <p style={{ margin: 0, color: '#666', fontSize: 14 }}>Initial configuration and onboarding steps.</p>
        </RadixTabs.Content>
        <RadixTabs.Content value="users" style={{ padding: 16, background: 'white', borderRadius: 8, border: '1px solid #e0e0e0' }}>
          <h3 style={{ margin: '0 0 8px', fontSize: 16, fontWeight: 600 }}>Users</h3>
          <p style={{ margin: 0, color: '#666', fontSize: 14 }}>12 users need your attention.</p>
        </RadixTabs.Content>
        <RadixTabs.Content value="billing" style={{ padding: 16, background: 'white', borderRadius: 8, border: '1px solid #e0e0e0' }}>
          <h3 style={{ margin: '0 0 8px', fontSize: 16, fontWeight: 600 }}>Billing</h3>
          <p style={{ margin: 0, color: '#666', fontSize: 14 }}>Manage your subscription and payment methods.</p>
        </RadixTabs.Content>
      </div>
    </RadixTabs.Root>
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

      {/* Working Demos */}
      <Section title="Interactive Demos" description="Click tabs to see content change.">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          <div>
            <div style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>Segment variant</div>
            <SegmentDemo />
          </div>
          <div>
            <div style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>Underline variant</div>
            <UnderlineDemo />
          </div>
          <div>
            <div style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>Vertical variant</div>
            <VerticalDemo />
          </div>
        </div>
      </Section>

      {/* Segment - All Sizes */}
      <Section title="Segment Variant - All Sizes" description="Comparing small and medium sizes.">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Plain text */}
          <div>
            <div style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>Plain text - Small</div>
            <Tabs
              variant="segment"
              size="sm"
              items={[
                { value: 'account', label: 'Account' },
                { value: 'library', label: 'Library' },
                { value: 'settings', label: 'Settings' },
              ]}
              defaultValue="account"
            />
          </div>
          <div>
            <div style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>Plain text - Medium</div>
            <Tabs
              variant="segment"
              size="md"
              items={[
                { value: 'account', label: 'Account' },
                { value: 'library', label: 'Library' },
                { value: 'settings', label: 'Settings' },
              ]}
              defaultValue="account"
            />
          </div>

          {/* Text and icon */}
          <div>
            <div style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>Text + Icon - Small</div>
            <Tabs
              variant="segment"
              size="sm"
              items={[
                { value: 'users', label: 'Users', icon: <User /> },
                { value: 'teams', label: 'Teams', icon: <Users /> },
                { value: 'settings', label: 'Settings', icon: <Gear /> },
              ]}
              defaultValue="users"
            />
          </div>
          <div>
            <div style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>Text + Icon - Medium</div>
            <Tabs
              variant="segment"
              size="md"
              items={[
                { value: 'users', label: 'Users', icon: <User /> },
                { value: 'teams', label: 'Teams', icon: <Users /> },
                { value: 'settings', label: 'Settings', icon: <Gear /> },
              ]}
              defaultValue="users"
            />
          </div>

          {/* Text + Icon + Counter */}
          <div>
            <div style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>Text + Icon + Counter - Small</div>
            <Tabs
              variant="segment"
              size="sm"
              items={[
                { value: 'users', label: 'Users', icon: <User />, counter: 12 },
                { value: 'teams', label: 'Teams', icon: <Users />, counter: 5 },
                { value: 'settings', label: 'Settings', icon: <Gear /> },
              ]}
              defaultValue="users"
            />
          </div>
          <div>
            <div style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>Text + Icon + Counter - Medium</div>
            <Tabs
              variant="segment"
              size="md"
              items={[
                { value: 'users', label: 'Users', icon: <User />, counter: 12 },
                { value: 'teams', label: 'Teams', icon: <Users />, counter: 5 },
                { value: 'settings', label: 'Settings', icon: <Gear /> },
              ]}
              defaultValue="users"
            />
          </div>

          {/* Icon only */}
          <div>
            <div style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>Icon only - Small</div>
            <Tabs
              variant="segment"
              size="sm"
              items={[
                { value: 'location', icon: <MapPin /> },
                { value: 'favorites', icon: <Star /> },
                { value: 'images', icon: <Image /> },
                { value: 'settings', icon: <Gear /> },
              ]}
              defaultValue="location"
            />
          </div>
          <div>
            <div style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>Icon only - Medium</div>
            <Tabs
              variant="segment"
              size="md"
              items={[
                { value: 'location', icon: <MapPin /> },
                { value: 'favorites', icon: <Star /> },
                { value: 'images', icon: <Image /> },
                { value: 'settings', icon: <Gear /> },
              ]}
              defaultValue="location"
            />
          </div>

          {/* Icon + Counter */}
          <div>
            <div style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>Icon + Counter - Small</div>
            <Tabs
              variant="segment"
              size="sm"
              items={[
                { value: 'location', icon: <MapPin />, counter: 3 },
                { value: 'favorites', icon: <Star />, counter: 12 },
                { value: 'images', icon: <Image /> },
                { value: 'settings', icon: <Gear /> },
              ]}
              defaultValue="location"
            />
          </div>
          <div>
            <div style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>Icon + Counter - Medium</div>
            <Tabs
              variant="segment"
              size="md"
              items={[
                { value: 'location', icon: <MapPin />, counter: 3 },
                { value: 'favorites', icon: <Star />, counter: 12 },
                { value: 'images', icon: <Image /> },
                { value: 'settings', icon: <Gear /> },
              ]}
              defaultValue="location"
            />
          </div>
        </div>
      </Section>

      {/* Underline - All Sizes */}
      <Section title="Underline Variant - All Sizes" description="Comparing small and medium sizes.">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Plain text */}
          <div>
            <div style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>Plain text - Small</div>
            <Tabs
              variant="underline"
              size="sm"
              items={[
                { value: 'setup', label: 'Setup' },
                { value: 'users', label: 'Users' },
                { value: 'assignment', label: 'Assignment' },
              ]}
              defaultValue="setup"
            />
          </div>
          <div>
            <div style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>Plain text - Medium</div>
            <Tabs
              variant="underline"
              size="md"
              items={[
                { value: 'setup', label: 'Setup' },
                { value: 'users', label: 'Users' },
                { value: 'assignment', label: 'Assignment' },
              ]}
              defaultValue="setup"
            />
          </div>

          {/* Text + Counter */}
          <div>
            <div style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>Text + Counter - Small</div>
            <Tabs
              variant="underline"
              size="sm"
              items={[
                { value: 'setup', label: 'Setup' },
                { value: 'users', label: 'Users', counter: 234 },
                { value: 'assignment', label: 'Assignment' },
              ]}
              defaultValue="setup"
            />
          </div>
          <div>
            <div style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>Text + Counter - Medium</div>
            <Tabs
              variant="underline"
              size="md"
              items={[
                { value: 'setup', label: 'Setup' },
                { value: 'users', label: 'Users', counter: 234 },
                { value: 'assignment', label: 'Assignment' },
              ]}
              defaultValue="setup"
            />
          </div>

          {/* Text + Icon */}
          <div>
            <div style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>Text + Icon - Small</div>
            <Tabs
              variant="underline"
              size="sm"
              items={[
                { value: 'config', label: 'Config', icon: <Gear /> },
                { value: 'builds', label: 'Builds', icon: <Hammer /> },
                { value: 'agents', label: 'Agents', icon: <Users /> },
                { value: 'tools', label: 'Tools', icon: <Wrench /> },
              ]}
              defaultValue="config"
            />
          </div>
          <div>
            <div style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>Text + Icon - Medium</div>
            <Tabs
              variant="underline"
              size="md"
              items={[
                { value: 'config', label: 'Config', icon: <Gear /> },
                { value: 'builds', label: 'Builds', icon: <Hammer /> },
                { value: 'agents', label: 'Agents', icon: <Users /> },
                { value: 'tools', label: 'Tools', icon: <Wrench /> },
              ]}
              defaultValue="config"
            />
          </div>

          {/* Text + Icon + Counter */}
          <div>
            <div style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>Text + Icon + Counter - Small</div>
            <Tabs
              variant="underline"
              size="sm"
              items={[
                { value: 'config', label: 'Config', icon: <Gear /> },
                { value: 'builds', label: 'Builds', icon: <Hammer />, counter: 5 },
                { value: 'agents', label: 'Agents', icon: <Users />, counter: 12 },
              ]}
              defaultValue="config"
            />
          </div>
          <div>
            <div style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>Text + Icon + Counter - Medium</div>
            <Tabs
              variant="underline"
              size="md"
              items={[
                { value: 'config', label: 'Config', icon: <Gear /> },
                { value: 'builds', label: 'Builds', icon: <Hammer />, counter: 5 },
                { value: 'agents', label: 'Agents', icon: <Users />, counter: 12 },
              ]}
              defaultValue="config"
            />
          </div>
        </div>
      </Section>

      {/* Vertical - Both Sizes */}
      <Section title="Vertical Orientation - All Sizes" description="Vertical tabs in both variants and sizes.">
        <div style={{ display: 'flex', gap: '48px', flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>Underline - Small</div>
            <Tabs
              variant="underline"
              orientation="vertical"
              size="sm"
              items={[
                { value: 'setup', label: 'Setup' },
                { value: 'users', label: 'Users', counter: 234 },
                { value: 'assignment', label: 'Assignment' },
              ]}
              defaultValue="setup"
            />
          </div>
          <div>
            <div style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>Underline - Medium</div>
            <Tabs
              variant="underline"
              orientation="vertical"
              size="md"
              items={[
                { value: 'setup', label: 'Setup' },
                { value: 'users', label: 'Users', counter: 234 },
                { value: 'assignment', label: 'Assignment' },
              ]}
              defaultValue="setup"
            />
          </div>
          <div>
            <div style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>Segment - Small</div>
            <Tabs
              variant="segment"
              orientation="vertical"
              size="sm"
              items={[
                { value: 'account', label: 'Account' },
                { value: 'library', label: 'Library' },
                { value: 'settings', label: 'Settings' },
              ]}
              defaultValue="account"
            />
          </div>
          <div>
            <div style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>Segment - Medium</div>
            <Tabs
              variant="segment"
              orientation="vertical"
              size="md"
              items={[
                { value: 'account', label: 'Account' },
                { value: 'library', label: 'Library' },
                { value: 'settings', label: 'Settings' },
              ]}
              defaultValue="account"
            />
          </div>
        </div>
      </Section>

      {/* Disabled Tabs */}
      <Section title="Disabled Tabs" description="Individual tabs can be disabled.">
        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
          <Tabs
            variant="segment"
            size="sm"
            items={[
              { value: 'active', label: 'Active' },
              { value: 'disabled', label: 'Disabled', disabled: true },
              { value: 'another', label: 'Another' },
            ]}
            defaultValue="active"
          />
          <Tabs
            variant="underline"
            size="sm"
            items={[
              { value: 'active', label: 'Active' },
              { value: 'disabled', label: 'Disabled', disabled: true },
              { value: 'another', label: 'Another' },
            ]}
            defaultValue="active"
          />
        </div>
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
            <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
              <td style={{ padding: '12px 16px 12px 0' }}><code>size</code></td>
              <td style={{ padding: '12px 16px 12px 0', color: '#666' }}>'sm' | 'md'</td>
              <td style={{ padding: '12px 16px 12px 0' }}><code>'md'</code></td>
              <td style={{ padding: '12px 0', color: '#666' }}>Size variant (12px or 14px font)</td>
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