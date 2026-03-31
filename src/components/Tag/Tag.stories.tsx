import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { File, Star, User, Heart, Tag as TagIcon } from '@phosphor-icons/react';
import { Tag } from './Tag';
import { StoryPage, StoryHeader, Section, PropsTable } from '../../stories/StoryComponents';

const meta: Meta<typeof Tag> = {
  title: 'Components/Tag',
  component: Tag,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Interactive checkable demo
const CheckableDemo = () => {
  const [selections, setSelections] = useState<Record<string, boolean>>({
    react: true,
    vue: false,
    angular: false,
  });

  const toggle = (key: string) => {
    setSelections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <Tag size="sm" checkable checked={selections.react} onCheckedChange={() => toggle('react')}>React</Tag>
      <Tag size="sm" checkable checked={selections.vue} onCheckedChange={() => toggle('vue')}>Vue</Tag>
      <Tag size="sm" checkable checked={selections.angular} onCheckedChange={() => toggle('angular')}>Angular</Tag>
    </div>
  );
};

// Interactive deletable demo
const DeletableDemo = () => {
  const [tags, setTags] = useState(['Design', 'Development', 'Marketing', 'Sales']);

  const removeTag = (tag: string) => {
    setTags(prev => prev.filter(t => t !== tag));
  };

  const reset = () => {
    setTags(['Design', 'Development', 'Marketing', 'Sales']);
  };

  return (
    <div>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
        {tags.map(tag => (
          <Tag key={tag} size="sm" deletable onDelete={() => removeTag(tag)} itemStart={<TagIcon />}>
            {tag}
          </Tag>
        ))}
        {tags.length === 0 && (
          <span style={{ color: 'var(--atom-text-secondary)', fontSize: '14px' }}>All tags removed</span>
        )}
      </div>
      {tags.length < 4 && (
        <button
          onClick={reset}
          style={{
            fontSize: '14px',
            color: 'var(--atom-primary-main)',
            background: 'none',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          Reset tags
        </button>
      )}
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
        title="Tag"
        description="A versatile tag/chip component for labels, filters, and selections."
      />

      {/* Variants */}
      <Section title="Variants" description="Three visual variants: primary, outline, and neutral.">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <Tag variant="primary" itemStart={<File />} size="sm">Label</Tag>
            <Tag variant="primary" itemStart={<File />}>Label</Tag>
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <Tag variant="outline" itemStart={<File />} size="sm">Label</Tag>
            <Tag variant="outline" itemStart={<File />}>Label</Tag>
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <Tag variant="neutral" itemStart={<File />} size="sm">Label</Tag>
            <Tag variant="neutral" itemStart={<File />}>Label</Tag>
          </div>
        </div>
      </Section>

      {/* Sizes */}
      <Section title="Sizes" description="Small (24px) and medium (32px) sizes.">
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <Tag size="sm" itemStart={<Star />}>Small</Tag>
          <Tag size="md" itemStart={<Star />}>Medium</Tag>
        </div>
      </Section>

      {/* With Icons */}
      <Section title="With Icons" description="Add icons at the start or end.">
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <Tag size="sm" itemStart={<File />}>Item Start</Tag>
          <Tag size="sm" itemEnd={<Star />}>Item End</Tag>
          <Tag size="sm" itemStart={<User />} itemEnd={<Heart />}>Both</Tag>
        </div>
      </Section>

      {/* With Counter */}
      <Section title="With Counter" description="Add a counter badge with customizable colors.">
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <Tag size="sm" itemStart={<File />} counter={{ count: 5 }}>Documents</Tag>
          <Tag size="sm" itemStart={<File />} counter={{ count: 12, color: 'neutral' }}>Neutral</Tag>
          <Tag size="sm" itemStart={<File />} counter={{ count: 3, color: 'success' }}>Success</Tag>
          <Tag size="sm" itemStart={<File />} counter={{ count: 1, color: 'warning' }}>Warning</Tag>
          <Tag size="sm" itemStart={<File />} counter={{ count: 99, color: 'error' }}>Error</Tag>
        </div>
      </Section>

      {/* Checkable */}
      <Section title="Checkable" description="Add a checkbox for multi-select functionality.">
        <CheckableDemo />
      </Section>

      {/* Deletable */}
      <Section title="Deletable" description="Add a delete button to remove tags.">
        <DeletableDemo />
      </Section>

      {/* Clickable */}
      <Section title="Clickable" description="Tags can have click handlers for navigation or actions.">
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <Tag size="sm" variant="outline" onClick={() => alert('Clicked!')}>Click me</Tag>
          <Tag size="sm" variant="primary" onClick={() => alert('Clicked!')}>Click me</Tag>
          <Tag size="sm" variant="neutral" onClick={() => alert('Clicked!')}>Click me</Tag>
        </div>
      </Section>

      {/* Custom Color */}
      <Section title="Custom Color" description="Override the primary color with a custom value.">
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <Tag size="sm" variant="primary" color="#E91E63" itemStart={<Heart />}>Pink</Tag>
          <Tag size="sm" variant="primary" color="#4CAF50" itemStart={<Star />}>Green</Tag>
          <Tag size="sm" variant="primary" color="#FF9800" itemStart={<File />}>Orange</Tag>
        </div>
      </Section>

      {/* Disabled */}
      <Section title="Disabled" description="Disabled state for all variants.">
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <Tag size="sm" disabled itemStart={<File />}>Disabled</Tag>
          <Tag size="sm" disabled checkable>Checkable</Tag>
          <Tag size="sm" disabled deletable>Deletable</Tag>
        </div>
      </Section>

      {/* Combined Features */}
      <Section title="Combined Features" description="Combine multiple features together.">
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <Tag
            size="sm"
            variant="outline"
            itemStart={<User />}
            counter={{ count: 3 }}
            deletable
          >
            Team Members
          </Tag>
          <Tag
            size="sm"
            variant="primary"
            checkable
            checked
            itemEnd={<Star />}
          >
            Favorite
          </Tag>
        </div>
      </Section>

      {/* API Reference */}
      <Section title="API Reference">
        <PropsTable rows={[
          ['children', 'ReactNode', 'required', 'Tag label text'],
          ['size', "'sm' | 'md'", "'md'", 'Size variant (24px or 32px)'],
          ['variant', "'primary' | 'outline' | 'neutral'", "'outline'", 'Visual variant'],
          ['color', 'string', '-', 'Custom color (for primary variant)'],
          ['itemStart', 'ReactNode', '-', 'Element at start (icon, avatar)'],
          ['itemEnd', 'ReactNode', '-', 'Element at end (icon, avatar)'],
          ['counter', 'TagCounterProps', '-', '{ count, color? } for badge'],
          ['checkable', 'boolean', 'false', 'Show checkbox for multi-select'],
          ['checked', 'boolean', 'false', 'Checked state (when checkable)'],
          ['onCheckedChange', '(checked: boolean) => void', '-', 'Callback when checked changes'],
          ['deletable', 'boolean', 'false', 'Show delete button'],
          ['onDelete', '() => void', '-', 'Callback when delete clicked'],
          ['onClick', '() => void', '-', 'Click handler for the tag'],
          ['disabled', 'boolean', 'false', 'Disable the tag'],
        ]} />
      </Section>
    </StoryPage>
  ),
};
