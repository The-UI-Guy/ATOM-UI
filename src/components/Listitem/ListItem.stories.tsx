import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Folder, Pencil, Trash, User, Gear, Star, Heart } from '@phosphor-icons/react';
import { ListItem } from './ListItem';
import { Checkbox } from '../Checkbox';
import { Radio } from '../Radio';
import { Avatar } from '../Avatar';

const meta: Meta<typeof ListItem> = {
  title: 'Primitives/ListItem',
  component: ListItem,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Section wrapper
const Section = ({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) => (
  <div style={{ marginBottom: '48px' }}>
    <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '8px', color: '#111' }}>{title}</h2>
    {description && <p style={{ fontSize: '14px', color: '#666', marginBottom: '16px' }}>{description}</p>}
    <div style={{ padding: '24px', background: '#fafafa', borderRadius: '8px' }}>
      {children}
    </div>
  </div>
);

// List container for demos
const ListContainer = ({ children, width = 300 }: { children: React.ReactNode; width?: number }) => (
  <div style={{ 
    width, 
    backgroundColor: 'var(--atom-surface-1)', 
    border: '1px solid var(--atom-border-primary)',
    borderRadius: 'var(--atom-radius-md)',
    padding: 4,
  }}>
    {children}
  </div>
);

// Basic Demo
const BasicDemo = () => (
  <div style={{ display: 'flex', gap: '24px' }}>
    <div>
      <div style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>Small</div>
      <ListContainer>
        <ListItem size="sm" onClick={() => alert('Clicked')}>List Item</ListItem>
        <ListItem size="sm" onClick={() => alert('Clicked')}>List Item</ListItem>
        <ListItem size="sm" onClick={() => alert('Clicked')}>List Item</ListItem>
      </ListContainer>
    </div>
    <div>
      <div style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>Medium</div>
      <ListContainer>
        <ListItem size="md" onClick={() => alert('Clicked')}>List Item</ListItem>
        <ListItem size="md" onClick={() => alert('Clicked')}>List Item</ListItem>
        <ListItem size="md" onClick={() => alert('Clicked')}>List Item</ListItem>
      </ListContainer>
    </div>
  </div>
);

// With Icons Demo
const WithIconsDemo = () => (
  <div style={{ display: 'flex', gap: '24px' }}>
    <div>
      <div style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>Start Icon</div>
      <ListContainer>
        <ListItem itemStart={<Folder />} onClick={() => {}}>Documents</ListItem>
        <ListItem itemStart={<Star />} onClick={() => {}}>Favorites</ListItem>
        <ListItem itemStart={<Gear />} onClick={() => {}}>Settings</ListItem>
      </ListContainer>
    </div>
    <div>
      <div style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>Start + End Icons</div>
      <ListContainer>
        <ListItem itemStart={<Folder />} itemEnd={<Folder />} onClick={() => {}}>List Item</ListItem>
        <ListItem itemStart={<Folder />} itemEnd={<Folder />} onClick={() => {}}>List Item</ListItem>
        <ListItem itemStart={<Folder />} itemEnd={<Folder />} onClick={() => {}}>List Item</ListItem>
      </ListContainer>
    </div>
  </div>
);

// With Shortcuts Demo
const WithShortcutsDemo = () => (
  <div style={{ display: 'flex', gap: '24px' }}>
    <div>
      <div style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>Icon + Shortcut</div>
      <ListContainer width={280}>
        <ListItem itemStart={<Pencil />} endText="⌘E" onClick={() => {}}>Edit</ListItem>
        <ListItem itemStart={<Folder />} endText="⌘⇧D" onClick={() => {}}>Duplicate</ListItem>
        <ListItem itemStart={<Trash />} endText="⌫" onClick={() => {}}>Delete</ListItem>
      </ListContainer>
    </div>
    <div>
      <div style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>Full - Icon + Shortcut + End Icon</div>
      <ListContainer width={320}>
        <ListItem itemStart={<Folder />} endText="⌘⇧D" itemEnd={<Folder />} onClick={() => {}}>List Item</ListItem>
        <ListItem itemStart={<Folder />} endText="⌘⇧D" itemEnd={<Folder />} selected onClick={() => {}}>List Item</ListItem>
        <ListItem itemStart={<Folder />} endText="⌘⇧D" itemEnd={<Folder />} onClick={() => {}}>List Item</ListItem>
      </ListContainer>
    </div>
  </div>
);

// With Checkbox Demo
const WithCheckboxDemo = () => {
  const [items, setItems] = useState([
    { id: '1', label: 'Option 1', checked: true },
    { id: '2', label: 'Option 2', checked: true },
    { id: '3', label: 'Option 3', checked: false },
    { id: '4', label: 'Option 4', checked: false },
  ]);

  const toggleItem = (id: string) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  return (
    <div style={{ display: 'flex', gap: '24px' }}>
      <div>
        <div style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>Small</div>
        <ListContainer>
          {items.map(item => (
            <ListItem
              key={item.id}
              size="sm"
              itemStart={
                <Checkbox 
                  size="sm" 
                  checked={item.checked} 
                  onCheckedChange={() => toggleItem(item.id)} 
                />
              }
              onClick={() => toggleItem(item.id)}
            >
              {item.label}
            </ListItem>
          ))}
        </ListContainer>
      </div>
      <div>
        <div style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>Medium</div>
        <ListContainer>
          {items.map(item => (
            <ListItem
              key={item.id}
              size="md"
              itemStart={
                <Checkbox 
                  size="md" 
                  checked={item.checked} 
                  onCheckedChange={() => toggleItem(item.id)} 
                />
              }
              onClick={() => toggleItem(item.id)}
            >
              {item.label}
            </ListItem>
          ))}
        </ListContainer>
      </div>
    </div>
  );
};

// With Radio Demo
const WithRadioDemo = () => {
  const [selected, setSelected] = useState('1');

  const items = [
    { id: '1', label: 'Option 1' },
    { id: '2', label: 'Option 2' },
    { id: '3', label: 'Option 3' },
    { id: '4', label: 'Option 4' },
  ];

  return (
    <div style={{ display: 'flex', gap: '24px' }}>
      <div>
        <div style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>Small</div>
        <ListContainer>
          {items.map(item => (
            <ListItem
              key={item.id}
              size="sm"
              selected={selected === item.id}
              itemStart={
                <Radio 
                  size="sm" 
                  checked={selected === item.id} 
                  onCheckedChange={() => setSelected(item.id)} 
                />
              }
              onClick={() => setSelected(item.id)}
            >
              {item.label}
            </ListItem>
          ))}
        </ListContainer>
      </div>
      <div>
        <div style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>Medium</div>
        <ListContainer>
          {items.map(item => (
            <ListItem
              key={item.id}
              size="md"
              selected={selected === item.id}
              itemStart={
                <Radio 
                  size="md" 
                  checked={selected === item.id} 
                  onCheckedChange={() => setSelected(item.id)} 
                />
              }
              onClick={() => setSelected(item.id)}
            >
              {item.label}
            </ListItem>
          ))}
        </ListContainer>
      </div>
    </div>
  );
};

// With Avatar Demo
const WithAvatarDemo = () => {
  const users = [
    { id: '1', name: 'John Doe', email: 'john@example.com', initials: 'JD' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', initials: 'JS' },
    { id: '3', name: 'Bob Wilson', email: 'bob@example.com', initials: 'BW' },
  ];

  return (
    <ListContainer width={320}>
      {users.map(user => (
        <ListItem
          key={user.id}
          itemStart={<Avatar type="initials" initials={user.initials} size="sm" />}
          onClick={() => alert(`Selected: ${user.name}`)}
        >
          <div>
            <div style={{ fontWeight: 500 }}>{user.name}</div>
            <div style={{ fontSize: 12, color: 'var(--atom-text-tertiary)' }}>{user.email}</div>
          </div>
        </ListItem>
      ))}
    </ListContainer>
  );
};

// States Demo
const StatesDemo = () => (
  <ListContainer width={280}>
    <ListItem itemStart={<Folder />} onClick={() => {}}>Default</ListItem>
    <ListItem itemStart={<Folder />} selected onClick={() => {}}>Selected</ListItem>
    <ListItem itemStart={<Folder />} disabled onClick={() => {}}>Disabled</ListItem>
  </ListContainer>
);

export const Documentation: Story = {
  parameters: {
    layout: 'fullscreen',
  },
  render: () => (
    <div style={{ padding: '40px', maxWidth: '900px' }}>
      {/* Header */}
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '8px' }}>ListItem</h1>
        <p style={{ fontSize: '16px', color: '#666' }}>
          A standardized list item component for menus, popovers, selects, and lists.
          Features flexible start/end slots for icons, checkboxes, radios, and avatars.
        </p>
      </div>

      {/* Basic */}
      <Section title="Basic" description="Simple list items in small and medium sizes.">
        <BasicDemo />
      </Section>

      {/* With Icons */}
      <Section title="With Icons" description="Items with start and/or end icons.">
        <WithIconsDemo />
      </Section>

      {/* With Shortcuts */}
      <Section title="With Shortcuts" description="Items with keyboard shortcut text and icons.">
        <WithShortcutsDemo />
      </Section>

      {/* With Checkbox */}
      <Section title="With Checkbox" description="Multi-select list using Checkbox component.">
        <WithCheckboxDemo />
      </Section>

      {/* With Radio */}
      <Section title="With Radio" description="Single-select list using Radio component.">
        <WithRadioDemo />
      </Section>

      {/* With Avatar */}
      <Section title="With Avatar" description="User list with avatars and secondary text.">
        <WithAvatarDemo />
      </Section>

      {/* States */}
      <Section title="States" description="Default, selected, and disabled states.">
        <StatesDemo />
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
              <td style={{ padding: '12px 16px 12px 0' }}><code>children</code></td>
              <td style={{ padding: '12px 16px 12px 0', color: '#666' }}>ReactNode</td>
              <td style={{ padding: '12px 16px 12px 0' }}>required</td>
              <td style={{ padding: '12px 0', color: '#666' }}>Main content/label</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
              <td style={{ padding: '12px 16px 12px 0' }}><code>itemStart</code></td>
              <td style={{ padding: '12px 16px 12px 0', color: '#666' }}>ReactNode</td>
              <td style={{ padding: '12px 16px 12px 0' }}>-</td>
              <td style={{ padding: '12px 0', color: '#666' }}>Start slot (icon, checkbox, radio, avatar)</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
              <td style={{ padding: '12px 16px 12px 0' }}><code>itemEnd</code></td>
              <td style={{ padding: '12px 16px 12px 0', color: '#666' }}>ReactNode</td>
              <td style={{ padding: '12px 16px 12px 0' }}>-</td>
              <td style={{ padding: '12px 0', color: '#666' }}>End slot (icon, checkbox, radio, avatar)</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
              <td style={{ padding: '12px 16px 12px 0' }}><code>endText</code></td>
              <td style={{ padding: '12px 16px 12px 0', color: '#666' }}>string</td>
              <td style={{ padding: '12px 16px 12px 0' }}>-</td>
              <td style={{ padding: '12px 0', color: '#666' }}>End text (shortcuts, counts)</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
              <td style={{ padding: '12px 16px 12px 0' }}><code>size</code></td>
              <td style={{ padding: '12px 16px 12px 0', color: '#666' }}>'sm' | 'md'</td>
              <td style={{ padding: '12px 16px 12px 0' }}><code>'md'</code></td>
              <td style={{ padding: '12px 0', color: '#666' }}>Size variant</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
              <td style={{ padding: '12px 16px 12px 0' }}><code>selected</code></td>
              <td style={{ padding: '12px 16px 12px 0', color: '#666' }}>boolean</td>
              <td style={{ padding: '12px 16px 12px 0' }}><code>false</code></td>
              <td style={{ padding: '12px 0', color: '#666' }}>Selected/active state</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
              <td style={{ padding: '12px 16px 12px 0' }}><code>disabled</code></td>
              <td style={{ padding: '12px 16px 12px 0', color: '#666' }}>boolean</td>
              <td style={{ padding: '12px 16px 12px 0' }}><code>false</code></td>
              <td style={{ padding: '12px 0', color: '#666' }}>Disabled state</td>
            </tr>
            <tr>
              <td style={{ padding: '12px 16px 12px 0' }}><code>onClick</code></td>
              <td style={{ padding: '12px 16px 12px 0', color: '#666' }}>() =&gt; void</td>
              <td style={{ padding: '12px 16px 12px 0' }}>-</td>
              <td style={{ padding: '12px 0', color: '#666' }}>Click handler</td>
            </tr>
          </tbody>
        </table>
      </Section>
    </div>
  ),
};
