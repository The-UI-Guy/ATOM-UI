import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { User, Users, Gear, MapPin, Star, Image, Hammer, Wrench } from '@phosphor-icons/react';
import { Tabs } from './Tabs';
import * as RadixTabs from '@radix-ui/react-tabs';
import { StoryPage, StoryHeader, Section, PropsTable } from '../../stories/StoryComponents';

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

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
      <RadixTabs.Content value="account" style={{ marginTop: 16, padding: 16, background: 'var(--atom-surface-1)', borderRadius: 8, border: '1px solid var(--atom-border-primary)' }}>
        <h3 style={{ margin: '0 0 8px', fontSize: 16, fontWeight: 600 }}>Account Settings</h3>
        <p style={{ margin: 0, color: 'var(--atom-text-secondary)', fontSize: 14 }}>Manage your account details, profile information, and preferences.</p>
      </RadixTabs.Content>
      <RadixTabs.Content value="settings" style={{ marginTop: 16, padding: 16, background: 'var(--atom-surface-1)', borderRadius: 8, border: '1px solid var(--atom-border-primary)' }}>
        <h3 style={{ margin: '0 0 8px', fontSize: 16, fontWeight: 600 }}>General Settings</h3>
        <p style={{ margin: 0, color: 'var(--atom-text-secondary)', fontSize: 14 }}>Configure application settings, themes, and display options.</p>
      </RadixTabs.Content>
      <RadixTabs.Content value="notifications" style={{ marginTop: 16, padding: 16, background: 'var(--atom-surface-1)', borderRadius: 8, border: '1px solid var(--atom-border-primary)' }}>
        <h3 style={{ margin: '0 0 8px', fontSize: 16, fontWeight: 600 }}>Notifications</h3>
        <p style={{ margin: 0, color: 'var(--atom-text-secondary)', fontSize: 14 }}>You have 3 unread notifications. Manage your notification preferences here.</p>
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
      <RadixTabs.Content value="users" style={{ marginTop: 16, padding: 16, background: 'var(--atom-surface-1)', borderRadius: 8, border: '1px solid var(--atom-border-primary)' }}>
        <h3 style={{ margin: '0 0 8px', fontSize: 16, fontWeight: 600 }}>Users</h3>
        <p style={{ margin: 0, color: 'var(--atom-text-secondary)', fontSize: 14 }}>234 users in your organization. Add, remove, or manage user permissions.</p>
      </RadixTabs.Content>
      <RadixTabs.Content value="teams" style={{ marginTop: 16, padding: 16, background: 'var(--atom-surface-1)', borderRadius: 8, border: '1px solid var(--atom-border-primary)' }}>
        <h3 style={{ margin: '0 0 8px', fontSize: 16, fontWeight: 600 }}>Teams</h3>
        <p style={{ margin: 0, color: 'var(--atom-text-secondary)', fontSize: 14 }}>Organize users into teams for better collaboration and access control.</p>
      </RadixTabs.Content>
      <RadixTabs.Content value="roles" style={{ marginTop: 16, padding: 16, background: 'var(--atom-surface-1)', borderRadius: 8, border: '1px solid var(--atom-border-primary)' }}>
        <h3 style={{ margin: '0 0 8px', fontSize: 16, fontWeight: 600 }}>Roles</h3>
        <p style={{ margin: 0, color: 'var(--atom-text-secondary)', fontSize: 14 }}>Define roles and permissions to control access across your application.</p>
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
        <RadixTabs.Content value="setup" style={{ padding: 16, background: 'var(--atom-surface-1)', borderRadius: 8, border: '1px solid var(--atom-border-primary)' }}>
          <h3 style={{ margin: '0 0 8px', fontSize: 16, fontWeight: 600 }}>Setup</h3>
          <p style={{ margin: 0, color: 'var(--atom-text-secondary)', fontSize: 14 }}>Initial configuration and onboarding steps.</p>
        </RadixTabs.Content>
        <RadixTabs.Content value="users" style={{ padding: 16, background: 'var(--atom-surface-1)', borderRadius: 8, border: '1px solid var(--atom-border-primary)' }}>
          <h3 style={{ margin: '0 0 8px', fontSize: 16, fontWeight: 600 }}>Users</h3>
          <p style={{ margin: 0, color: 'var(--atom-text-secondary)', fontSize: 14 }}>12 users need your attention.</p>
        </RadixTabs.Content>
        <RadixTabs.Content value="billing" style={{ padding: 16, background: 'var(--atom-surface-1)', borderRadius: 8, border: '1px solid var(--atom-border-primary)' }}>
          <h3 style={{ margin: '0 0 8px', fontSize: 16, fontWeight: 600 }}>Billing</h3>
          <p style={{ margin: 0, color: 'var(--atom-text-secondary)', fontSize: 14 }}>Manage your subscription and payment methods.</p>
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
    <StoryPage>
      <StoryHeader
        title="Tabs"
        description="A tabbed interface with segment or underline variants. Supports horizontal and vertical orientations."
      />

      {/* Working Demos */}
      <Section title="Interactive Demos" description="Click tabs to see content change.">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          <div>
            <div style={{ fontSize: '12px', color: 'var(--atom-text-secondary)', marginBottom: '8px' }}>Segment variant</div>
            <SegmentDemo />
          </div>
          <div>
            <div style={{ fontSize: '12px', color: 'var(--atom-text-secondary)', marginBottom: '8px' }}>Underline variant</div>
            <UnderlineDemo />
          </div>
          <div>
            <div style={{ fontSize: '12px', color: 'var(--atom-text-secondary)', marginBottom: '8px' }}>Vertical variant</div>
            <VerticalDemo />
          </div>
        </div>
      </Section>

      {/* Segment - All Sizes */}
      <Section title="Segment Variant - All Sizes" description="Comparing small and medium sizes.">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Plain text */}
          <div>
            <div style={{ fontSize: '12px', color: 'var(--atom-text-secondary)', marginBottom: '8px' }}>Plain text - Small</div>
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
            <div style={{ fontSize: '12px', color: 'var(--atom-text-secondary)', marginBottom: '8px' }}>Plain text - Medium</div>
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
            <div style={{ fontSize: '12px', color: 'var(--atom-text-secondary)', marginBottom: '8px' }}>Text + Icon - Small</div>
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
            <div style={{ fontSize: '12px', color: 'var(--atom-text-secondary)', marginBottom: '8px' }}>Text + Icon - Medium</div>
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
            <div style={{ fontSize: '12px', color: 'var(--atom-text-secondary)', marginBottom: '8px' }}>Text + Icon + Counter - Small</div>
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
            <div style={{ fontSize: '12px', color: 'var(--atom-text-secondary)', marginBottom: '8px' }}>Text + Icon + Counter - Medium</div>
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
            <div style={{ fontSize: '12px', color: 'var(--atom-text-secondary)', marginBottom: '8px' }}>Icon only - Small</div>
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
            <div style={{ fontSize: '12px', color: 'var(--atom-text-secondary)', marginBottom: '8px' }}>Icon only - Medium</div>
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
            <div style={{ fontSize: '12px', color: 'var(--atom-text-secondary)', marginBottom: '8px' }}>Icon + Counter - Small</div>
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
            <div style={{ fontSize: '12px', color: 'var(--atom-text-secondary)', marginBottom: '8px' }}>Icon + Counter - Medium</div>
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
            <div style={{ fontSize: '12px', color: 'var(--atom-text-secondary)', marginBottom: '8px' }}>Plain text - Small</div>
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
            <div style={{ fontSize: '12px', color: 'var(--atom-text-secondary)', marginBottom: '8px' }}>Plain text - Medium</div>
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
            <div style={{ fontSize: '12px', color: 'var(--atom-text-secondary)', marginBottom: '8px' }}>Text + Counter - Small</div>
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
            <div style={{ fontSize: '12px', color: 'var(--atom-text-secondary)', marginBottom: '8px' }}>Text + Counter - Medium</div>
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
            <div style={{ fontSize: '12px', color: 'var(--atom-text-secondary)', marginBottom: '8px' }}>Text + Icon - Small</div>
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
            <div style={{ fontSize: '12px', color: 'var(--atom-text-secondary)', marginBottom: '8px' }}>Text + Icon - Medium</div>
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
            <div style={{ fontSize: '12px', color: 'var(--atom-text-secondary)', marginBottom: '8px' }}>Text + Icon + Counter - Small</div>
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
            <div style={{ fontSize: '12px', color: 'var(--atom-text-secondary)', marginBottom: '8px' }}>Text + Icon + Counter - Medium</div>
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
            <div style={{ fontSize: '12px', color: 'var(--atom-text-secondary)', marginBottom: '8px' }}>Underline - Small</div>
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
            <div style={{ fontSize: '12px', color: 'var(--atom-text-secondary)', marginBottom: '8px' }}>Underline - Medium</div>
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
            <div style={{ fontSize: '12px', color: 'var(--atom-text-secondary)', marginBottom: '8px' }}>Segment - Small</div>
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
            <div style={{ fontSize: '12px', color: 'var(--atom-text-secondary)', marginBottom: '8px' }}>Segment - Medium</div>
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
        <PropsTable rows={[
          ['items', 'TabItem[]', 'required', 'Array of tab configurations'],
          ['value', 'string', '-', 'Controlled selected value'],
          ['defaultValue', 'string', 'first item', 'Default selected value'],
          ['onValueChange', '(value: string) => void', '-', 'Callback when tab changes'],
          ['variant', "'segment' | 'underline'", "'segment'", 'Visual variant'],
          ['size', "'sm' | 'md'", "'md'", 'Size variant (12px or 14px font)'],
          ['orientation', "'horizontal' | 'vertical'", "'horizontal'", 'Tab orientation'],
        ]} />

        <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '12px', marginTop: '24px' }}>TabItem Props</h3>
        <PropsTable
          columns={['Prop', 'Type', 'Description']}
          rows={[
            ['value', 'string', 'Unique identifier (required)'],
            ['label', 'string', 'Tab label text'],
            ['icon', 'ReactNode', 'Tab icon'],
            ['counter', 'number', 'Counter badge value'],
            ['disabled', 'boolean', 'Disable this tab'],
          ]}
        />
      </Section>
    </StoryPage>
  ),
};
