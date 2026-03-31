import type { Meta, StoryObj } from '@storybook/react';
import { Heart, ShoppingCart, ArrowRight, Plus, MagnifyingGlass, Trash } from '@phosphor-icons/react';
import { Button } from './Button';
import { StoryPage, StoryHeader, Section, PropsTable, Row } from '../../stories/StoryComponents';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Documentation: Story = {
  render: () => (
    <StoryPage>
      <StoryHeader
        title="Button"
        description="The Button component is used to trigger actions or events. It supports multiple variants, sizes, and icon configurations."
      />

      {/* Overview */}
      <Section title="Overview" description="All button variants shown in small, medium, and large sizes.">
        <Row label="Primary" description="Main actions">
          <Button variant="primary" size="sm">Button</Button>
          <Button variant="primary" size="md">Button</Button>
          <Button variant="primary" size="lg">Button</Button>
        </Row>
        <Row label="Outline" description="Secondary actions">
          <Button variant="outline" size="sm">Button</Button>
          <Button variant="outline" size="md">Button</Button>
          <Button variant="outline" size="lg">Button</Button>
        </Row>
        <Row label="Text" description="Tertiary actions">
          <Button variant="text" size="sm">Button</Button>
          <Button variant="text" size="md">Button</Button>
          <Button variant="text" size="lg">Button</Button>
        </Row>
        <Row label="Destructive" description="Dangerous actions">
          <Button variant="destructive" size="sm">Delete</Button>
          <Button variant="destructive" size="md">Delete</Button>
          <Button variant="destructive" size="lg">Delete</Button>
        </Row>
        <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--atom-border-primary)', fontSize: '12px', color: 'var(--atom-text-tertiary)' }}>
          Sizes: <strong>Small (28px)</strong>, <strong>Medium (40px)</strong>, <strong>Large (48px)</strong>
        </div>
      </Section>

      {/* Variants */}
      <Section title="Variants">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <div style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 500 }}>Primary</div>
            <div style={{ fontSize: '13px', color: 'var(--atom-text-secondary)', marginBottom: '12px' }}>Use for the main call-to-action on a page.</div>
            <Button variant="primary">Primary Button</Button>
          </div>
          <div>
            <div style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 500 }}>Outline</div>
            <div style={{ fontSize: '13px', color: 'var(--atom-text-secondary)', marginBottom: '12px' }}>Use for secondary actions or when you need less visual emphasis.</div>
            <Button variant="outline">Outline Button</Button>
          </div>
          <div>
            <div style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 500 }}>Text</div>
            <div style={{ fontSize: '13px', color: 'var(--atom-text-secondary)', marginBottom: '12px' }}>Use for tertiary actions or link-like buttons.</div>
            <Button variant="text">Text Button</Button>
          </div>
          <div>
            <div style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 500 }}>Destructive</div>
            <div style={{ fontSize: '13px', color: 'var(--atom-text-secondary)', marginBottom: '12px' }}>Use for dangerous or irreversible actions like delete.</div>
            <Button variant="destructive">Delete</Button>
          </div>
        </div>
      </Section>

      {/* Sizes */}
      <Section title="Sizes" description="Buttons come in three sizes to fit different contexts.">
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <Button variant="primary" size="sm">Small</Button>
          <Button variant="primary" size="md">Medium</Button>
          <Button variant="primary" size="lg">Large</Button>
        </div>
      </Section>

      {/* With Icons */}
      <Section title="With Icons" description="Buttons can include icons at the start, end, or both positions.">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <div style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 500 }}>Icon Start</div>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Button variant="primary" iconStart={<ShoppingCart size={18} />}>Add to Cart</Button>
              <Button variant="outline" iconStart={<Heart size={18} />}>Wishlist</Button>
              <Button variant="text" iconStart={<Plus size={18} />}>Add Item</Button>
              <Button variant="destructive" iconStart={<Trash size={18} />}>Delete</Button>
            </div>
          </div>
          <div>
            <div style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 500 }}>Icon End</div>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Button variant="primary" iconEnd={<ArrowRight size={18} />}>Continue</Button>
              <Button variant="outline" iconEnd={<ArrowRight size={18} />}>Learn More</Button>
              <Button variant="text" iconEnd={<ArrowRight size={18} />}>View All</Button>
            </div>
          </div>
          <div>
            <div style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 500 }}>Both Icons</div>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Button variant="primary" iconStart={<Heart size={18} />} iconEnd={<Plus size={18} />}>Wishlist</Button>
              <Button variant="outline" iconStart={<Heart size={18} />} iconEnd={<Plus size={18} />}>Wishlist</Button>
            </div>
          </div>
        </div>
      </Section>

      {/* Icon Only */}
      <Section title="Icon Only" description="Square buttons for compact icon-only actions. Pass the icon as children and set iconOnly to true.">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <div style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 500 }}>Variants</div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <Button variant="primary" iconOnly aria-label="Add"><Plus size={20} /></Button>
              <Button variant="outline" iconOnly aria-label="Search"><MagnifyingGlass size={20} /></Button>
              <Button variant="text" iconOnly aria-label="Favorite"><Heart size={20} /></Button>
              <Button variant="destructive" iconOnly aria-label="Delete"><Trash size={20} /></Button>
            </div>
          </div>
          <div>
            <div style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 500 }}>Sizes</div>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <Button variant="primary" size="sm" iconOnly aria-label="Add"><Plus size={16} /></Button>
              <Button variant="primary" size="md" iconOnly aria-label="Add"><Plus size={20} /></Button>
              <Button variant="primary" size="lg" iconOnly aria-label="Add"><Plus size={24} /></Button>
            </div>
          </div>
        </div>
      </Section>

      {/* States */}
      <Section title="States" description="Buttons have different states for user feedback.">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <div style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 500 }}>Disabled</div>
            <div style={{ fontSize: '13px', color: 'var(--atom-text-secondary)', marginBottom: '12px' }}>Disabled buttons cannot be clicked and have reduced opacity.</div>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Button variant="primary" disabled>Primary</Button>
              <Button variant="outline" disabled>Outline</Button>
              <Button variant="text" disabled>Text</Button>
              <Button variant="destructive" disabled>Destructive</Button>
            </div>
          </div>
          <div>
            <div style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 500 }}>Loading</div>
            <div style={{ fontSize: '13px', color: 'var(--atom-text-secondary)', marginBottom: '12px' }}>Loading buttons show a spinner and are automatically disabled.</div>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Button variant="primary" loading>Primary</Button>
              <Button variant="outline" loading>Outline</Button>
              <Button variant="text" loading>Text</Button>
              <Button variant="destructive" loading>Destructive</Button>
            </div>
          </div>
        </div>
      </Section>

      {/* API Reference */}
      <Section title="API Reference">
        <PropsTable rows={[
          ['variant', "'primary' | 'outline' | 'text' | 'destructive'", "'primary'", 'The visual style of the button'],
          ['size', "'sm' | 'md' | 'lg'", "'md'", 'The size of the button'],
          ['iconStart', 'ReactNode', '-', 'Icon to display before the text'],
          ['iconEnd', 'ReactNode', '-', 'Icon to display after the text'],
          ['iconOnly', 'boolean', 'false', 'Renders as a square icon button'],
          ['loading', 'boolean', 'false', 'Shows a loading spinner'],
          ['disabled', 'boolean', 'false', 'Disables the button'],
        ]} />
      </Section>
    </StoryPage>
  ),
};
