import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { File, Star, User, Heart, Tag as TagIcon } from '@phosphor-icons/react';
import { Tag } from './Tag';

const meta: Meta<typeof Tag> = {
  title: 'Components/Tag',
  component: Tag,
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
          <span style={{ color: '#666', fontSize: '14px' }}>All tags removed</span>
        )}
      </div>
      {tags.length < 4 && (
        <button 
          onClick={reset}
          style={{ 
            fontSize: '14px', 
            color: '#5327D7', 
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
    <div style={{ padding: '40px', maxWidth: '900px' }}>
      {/* Header */}
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '8px' }}>Tag</h1>
        <p style={{ fontSize: '16px', color: '#666' }}>
          A versatile tag/chip component for labels, filters, and selections.
        </p>
      </div>

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
              <td style={{ padding: '12px 0', color: '#666' }}>Tag label text</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
              <td style={{ padding: '12px 16px 12px 0' }}><code>size</code></td>
              <td style={{ padding: '12px 16px 12px 0', color: '#666' }}>'sm' | 'md'</td>
              <td style={{ padding: '12px 16px 12px 0' }}><code>'md'</code></td>
              <td style={{ padding: '12px 0', color: '#666' }}>Size variant (24px or 32px)</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
              <td style={{ padding: '12px 16px 12px 0' }}><code>variant</code></td>
              <td style={{ padding: '12px 16px 12px 0', color: '#666' }}>'primary' | 'outline' | 'neutral'</td>
              <td style={{ padding: '12px 16px 12px 0' }}><code>'outline'</code></td>
              <td style={{ padding: '12px 0', color: '#666' }}>Visual variant</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
              <td style={{ padding: '12px 16px 12px 0' }}><code>color</code></td>
              <td style={{ padding: '12px 16px 12px 0', color: '#666' }}>string</td>
              <td style={{ padding: '12px 16px 12px 0' }}>-</td>
              <td style={{ padding: '12px 0', color: '#666' }}>Custom color (for primary variant)</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
              <td style={{ padding: '12px 16px 12px 0' }}><code>itemStart</code></td>
              <td style={{ padding: '12px 16px 12px 0', color: '#666' }}>ReactNode</td>
              <td style={{ padding: '12px 16px 12px 0' }}>-</td>
              <td style={{ padding: '12px 0', color: '#666' }}>Element at start (icon, avatar)</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
              <td style={{ padding: '12px 16px 12px 0' }}><code>itemEnd</code></td>
              <td style={{ padding: '12px 16px 12px 0', color: '#666' }}>ReactNode</td>
              <td style={{ padding: '12px 16px 12px 0' }}>-</td>
              <td style={{ padding: '12px 0', color: '#666' }}>Element at end (icon, avatar)</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
              <td style={{ padding: '12px 16px 12px 0' }}><code>counter</code></td>
              <td style={{ padding: '12px 16px 12px 0', color: '#666' }}>TagCounterProps</td>
              <td style={{ padding: '12px 16px 12px 0' }}>-</td>
              <td style={{ padding: '12px 0', color: '#666' }}>{`{ count, color? }`} for badge</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
              <td style={{ padding: '12px 16px 12px 0' }}><code>checkable</code></td>
              <td style={{ padding: '12px 16px 12px 0', color: '#666' }}>boolean</td>
              <td style={{ padding: '12px 16px 12px 0' }}><code>false</code></td>
              <td style={{ padding: '12px 0', color: '#666' }}>Show checkbox for multi-select</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
              <td style={{ padding: '12px 16px 12px 0' }}><code>checked</code></td>
              <td style={{ padding: '12px 16px 12px 0', color: '#666' }}>boolean</td>
              <td style={{ padding: '12px 16px 12px 0' }}><code>false</code></td>
              <td style={{ padding: '12px 0', color: '#666' }}>Checked state (when checkable)</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
              <td style={{ padding: '12px 16px 12px 0' }}><code>onCheckedChange</code></td>
              <td style={{ padding: '12px 16px 12px 0', color: '#666' }}>(checked: boolean) =&gt; void</td>
              <td style={{ padding: '12px 16px 12px 0' }}>-</td>
              <td style={{ padding: '12px 0', color: '#666' }}>Callback when checked changes</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
              <td style={{ padding: '12px 16px 12px 0' }}><code>deletable</code></td>
              <td style={{ padding: '12px 16px 12px 0', color: '#666' }}>boolean</td>
              <td style={{ padding: '12px 16px 12px 0' }}><code>false</code></td>
              <td style={{ padding: '12px 0', color: '#666' }}>Show delete button</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
              <td style={{ padding: '12px 16px 12px 0' }}><code>onDelete</code></td>
              <td style={{ padding: '12px 16px 12px 0', color: '#666' }}>() =&gt; void</td>
              <td style={{ padding: '12px 16px 12px 0' }}>-</td>
              <td style={{ padding: '12px 0', color: '#666' }}>Callback when delete clicked</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
              <td style={{ padding: '12px 16px 12px 0' }}><code>onClick</code></td>
              <td style={{ padding: '12px 16px 12px 0', color: '#666' }}>() =&gt; void</td>
              <td style={{ padding: '12px 16px 12px 0' }}>-</td>
              <td style={{ padding: '12px 0', color: '#666' }}>Click handler for the tag</td>
            </tr>
            <tr>
              <td style={{ padding: '12px 16px 12px 0' }}><code>disabled</code></td>
              <td style={{ padding: '12px 16px 12px 0', color: '#666' }}>boolean</td>
              <td style={{ padding: '12px 16px 12px 0' }}><code>false</code></td>
              <td style={{ padding: '12px 0', color: '#666' }}>Disable the tag</td>
            </tr>
          </tbody>
        </table>
      </Section>
    </div>
  ),
};