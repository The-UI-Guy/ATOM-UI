import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Rocket,
  PencilSimple,
  CopySimple,
  TrashSimple,
  Folder,
  CaretRight,
  Star,
  Gear,
} from '@phosphor-icons/react';
import { ListItem } from './ListItem';
import { Checkbox } from '../Checkbox/Checkbox';
import { Radio } from '../Radio/Radio';
import { StoryPage, StoryHeader, Section, PropsTable } from '../../stories/StoryComponents';

const meta: Meta<typeof ListItem> = {
  title: 'Components/ListItem',
  component: ListItem,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Interactive checkbox demo
const CheckboxDemo = () => {
  const [checked, setChecked] = useState({ grid: true, snap: false, rulers: true, guides: false });
  return (
    <div style={{ width: 248, display: 'flex', flexDirection: 'column', gap: 4 }}>
      {(Object.keys(checked) as (keyof typeof checked)[]).map(key => (
        <ListItem
          key={key}
          icon={
            <span style={{ pointerEvents: 'none' }}>
              <Checkbox checked={checked[key]} onChange={() => {}} size="md" />
            </span>
          }
          onClick={() => setChecked(prev => ({ ...prev, [key]: !prev[key] }))}
        >
          {key.charAt(0).toUpperCase() + key.slice(1)}
        </ListItem>
      ))}
    </div>
  );
};

// Interactive radio demo
const RadioDemo = () => {
  const [selected, setSelected] = useState('list');
  const options = ['list', 'grid', 'columns', 'gallery'];
  return (
    <div style={{ width: 248, display: 'flex', flexDirection: 'column', gap: 4 }}>
      {options.map(option => (
        <ListItem
          key={option}
          icon={
            <span style={{ pointerEvents: 'none' }}>
              <Radio checked={selected === option} onChange={() => {}} size="md" name="view" />
            </span>
          }
          onClick={() => setSelected(option)}
        >
          {option.charAt(0).toUpperCase() + option.slice(1)}
        </ListItem>
      ))}
    </div>
  );
};

export const Documentation: Story = {
  parameters: { layout: 'fullscreen' },
  render: () => (
    <StoryPage maxWidth={800}>
      <StoryHeader
        title="List Item"
        description={<>A single interactive row used inside a <code>PopMenu</code>. Supports a start icon, label, keyboard shortcut hint, and an optional end icon or submenu indicator.</>}
      />

      <Section title="Default" description="Standard list item with an icon and shortcut.">
        <div style={{ width: 248, display: 'flex', flexDirection: 'column', gap: 4 }}>
          <ListItem icon={<Rocket />} shortcut="⌘⇧D">Deploy</ListItem>
          <ListItem icon={<PencilSimple />} shortcut="⌘E">Edit</ListItem>
          <ListItem icon={<CopySimple />} shortcut="⌘C">Copy</ListItem>
          <ListItem icon={<TrashSimple />} shortcut="DEL">Delete</ListItem>
        </div>
      </Section>

      <Section title="With Checkbox" description="Clicking anywhere on the row toggles the checkbox. Useful for multi-select option menus.">
        <CheckboxDemo />
      </Section>

      <Section title="With Radio" description="Clicking a row selects it exclusively. Useful for single-select option menus.">
        <RadioDemo />
      </Section>

      <Section title="Active State" description="An item in the active/selected state.">
        <div style={{ width: 248, display: 'flex', flexDirection: 'column', gap: 4 }}>
          <ListItem icon={<Rocket />} shortcut="⌘⇧D">Deploy</ListItem>
          <ListItem icon={<PencilSimple />} shortcut="⌘E" active>Edit (active)</ListItem>
          <ListItem icon={<CopySimple />} shortcut="⌘C">Copy</ListItem>
        </div>
      </Section>

      <Section title="With Submenu Indicator" description="Use hasSubmenu to show a caret at the end, or provide a custom endIcon.">
        <div style={{ width: 248, display: 'flex', flexDirection: 'column', gap: 4 }}>
          <ListItem icon={<Folder />} hasSubmenu>Open in…</ListItem>
          <ListItem icon={<Star />} hasSubmenu>Add to…</ListItem>
          <ListItem icon={<Gear />} endIcon={<CaretRight />}>Settings</ListItem>
        </div>
      </Section>

      <Section title="Disabled State" description="Disabled items are non-interactive and visually muted.">
        <div style={{ width: 248, display: 'flex', flexDirection: 'column', gap: 4 }}>
          <ListItem icon={<Rocket />} shortcut="⌘⇧D">Deploy</ListItem>
          <ListItem icon={<PencilSimple />} shortcut="⌘E" disabled>Edit (disabled)</ListItem>
          <ListItem icon={<TrashSimple />} shortcut="DEL" disabled>Delete (disabled)</ListItem>
        </div>
      </Section>

      {/* API Reference */}
      <Section title="API Reference">
        <PropsTable rows={[
          ['children', 'ReactNode', '—', 'Label text for the item (required)'],
          ['icon', 'ReactNode', 'undefined', 'Start slot — icon, Checkbox, or Radio'],
          ['shortcut', 'string', 'undefined', 'Keyboard shortcut label e.g. "⌘⇧H"'],
          ['endIcon', 'ReactNode', 'undefined', 'Custom icon at the end'],
          ['hasSubmenu', 'boolean', 'false', 'Shows a CaretRight to indicate a submenu'],
          ['active', 'boolean', 'false', 'Selected state background'],
          ['disabled', 'boolean', 'false', 'Non-interactive, muted appearance'],
          ['onClick', '() => void', 'undefined', 'Click handler'],
          ['className', 'string', '""', 'Additional CSS classes'],
        ]} />
      </Section>
    </StoryPage>
  ),
};
