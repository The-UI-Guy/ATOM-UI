import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Folder, Pencil, Trash, User, Gear, Bell } from '@phosphor-icons/react';
import { Popover } from './Popover';
import { Button } from '../Button';
import { SearchField } from '../Input';

const meta: Meta<typeof Popover> = {
  title: 'Primitives/Popover',
  component: Popover,
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

// Basic Items Demo
const BasicItemsDemo = () => (
  <Popover trigger={<Button variant="outline">Basic Items</Button>}>
    <Popover.Item onClick={() => alert('Edit')}>Edit</Popover.Item>
    <Popover.Item onClick={() => alert('Duplicate')}>Duplicate</Popover.Item>
    <Popover.Item onClick={() => alert('Share')}>Share</Popover.Item>
    <Popover.Separator />
    <Popover.Item onClick={() => alert('Delete')}>Delete</Popover.Item>
  </Popover>
);

// With Icons Demo
const WithIconsDemo = () => (
  <Popover trigger={<Button variant="outline">With Icons</Button>}>
    <Popover.Item icon={<Pencil />} onClick={() => alert('Edit')}>Edit</Popover.Item>
    <Popover.Item icon={<User />} onClick={() => alert('Profile')}>Profile</Popover.Item>
    <Popover.Item icon={<Gear />} onClick={() => alert('Settings')}>Settings</Popover.Item>
    <Popover.Separator />
    <Popover.Item icon={<Trash />} onClick={() => alert('Delete')}>Delete</Popover.Item>
  </Popover>
);

// With Shortcuts Demo
const WithShortcutsDemo = () => (
  <Popover trigger={<Button variant="outline">With Shortcuts</Button>} minWidth={240}>
    <Popover.Item icon={<Folder />} value="⌘⇧D" onClick={() => {}}>List Item</Popover.Item>
    <Popover.Item icon={<Folder />} value="⌘⇧D" onClick={() => {}}>List Item</Popover.Item>
    <Popover.Item icon={<Folder />} value="⌘⇧D" onClick={() => {}}>List Item</Popover.Item>
  </Popover>
);

// Checkbox Demo
const CheckboxDemo = () => {
  const [items, setItems] = useState([
    { id: '1', label: 'List Item', checked: true },
    { id: '2', label: 'List Item', checked: true },
    { id: '3', label: 'List Item', checked: false },
    { id: '4', label: 'List Item', checked: false },
  ]);

  const toggleItem = (id: string) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  return (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Popover trigger={<Button variant="outline">Checkbox Items</Button>}>
        {items.map(item => (
          <Popover.CheckboxItem 
            key={item.id}
            checked={item.checked} 
            onCheckedChange={() => toggleItem(item.id)}
          >
            {item.label}
          </Popover.CheckboxItem>
        ))}
      </Popover>
      <span style={{ fontSize: '14px', color: '#666' }}>
        Selected: {items.filter(i => i.checked).length}
      </span>
    </div>
  );
};

// Radio Demo
const RadioDemo = () => {
  const [selected, setSelected] = useState('item2');

  return (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Popover trigger={<Button variant="outline">Radio Items</Button>}>
        <Popover.RadioGroup value={selected} onValueChange={setSelected}>
          <Popover.RadioItem value="item1">List Item</Popover.RadioItem>
          <Popover.RadioItem value="item2">List Item</Popover.RadioItem>
          <Popover.RadioItem value="item3">List Item</Popover.RadioItem>
          <Popover.RadioItem value="item4">List Item</Popover.RadioItem>
        </Popover.RadioGroup>
      </Popover>
      <span style={{ fontSize: '14px', color: '#666' }}>
        Selected: {selected}
      </span>
    </div>
  );
};

// Value Items Demo
const ValueItemsDemo = () => (
  <Popover trigger={<Button variant="outline">Value Items</Button>} minWidth={220}>
    <Popover.Item value={20} onClick={() => {}}>Interactions</Popover.Item>
    <Popover.Item value={150} onClick={() => {}}>Tickets</Popover.Item>
    <Popover.Item value="-" disabled>Users</Popover.Item>
    <Popover.Item value={5} onClick={() => {}}>List Item</Popover.Item>
  </Popover>
);

// Custom Content Demo
const CustomContentDemo = () => {
  const [search, setSearch] = useState('');

  return (
    <Popover trigger={<Button variant="outline">Custom Content</Button>} minWidth={280}>
      <div style={{ padding: '8px 8px 4px' }}>
        <SearchField 
          placeholder="Search..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          fullWidth
          size="sm"
        />
      </div>
      <Popover.Separator />
      <Popover.Item icon={<User />} onClick={() => {}}>John Doe</Popover.Item>
      <Popover.Item icon={<User />} onClick={() => {}}>Jane Smith</Popover.Item>
      <Popover.Item icon={<User />} onClick={() => {}}>Bob Wilson</Popover.Item>
    </Popover>
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
        <h1 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '8px' }}>Popover</h1>
        <p style={{ fontSize: '16px', color: '#666' }}>
          A flexible popover primitive for building dropdowns, menus, selects, and more.
          Uses ListItem internally for consistent styling.
        </p>
      </div>

      {/* Basic */}
      <Section title="Basic Items" description="Simple clickable items.">
        <BasicItemsDemo />
      </Section>

      {/* With Icons */}
      <Section title="With Icons" description="Items with start icons.">
        <WithIconsDemo />
      </Section>

      {/* With Shortcuts */}
      <Section title="With Shortcuts" description="Items with keyboard shortcut text.">
        <WithShortcutsDemo />
      </Section>

      {/* Checkbox */}
      <Section title="Checkbox Items" description="Multi-select with checkboxes (uses ATOM UI Checkbox).">
        <CheckboxDemo />
      </Section>

      {/* Radio */}
      <Section title="Radio Items" description="Single-select with radios (uses ATOM UI Radio).">
        <RadioDemo />
      </Section>

      {/* Value Items */}
      <Section title="Value Items" description="Items with values on the right.">
        <ValueItemsDemo />
      </Section>

      {/* Custom Content */}
      <Section title="Custom Content" description="Popover accepts any content - search, custom layouts, etc.">
        <CustomContentDemo />
      </Section>

      {/* Positioning */}
      <Section title="Positioning" description="Popover can be positioned on different sides.">
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          {(['bottom', 'top', 'left', 'right'] as const).map(side => (
            <Popover key={side} trigger={<Button variant="outline">{side}</Button>} side={side}>
              <Popover.Item onClick={() => {}}>Option 1</Popover.Item>
              <Popover.Item onClick={() => {}}>Option 2</Popover.Item>
            </Popover>
          ))}
        </div>
      </Section>
    </div>
  ),
};
