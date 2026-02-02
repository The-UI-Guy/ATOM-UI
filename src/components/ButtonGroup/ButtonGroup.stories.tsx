import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TextAlignLeft, TextAlignCenter, TextAlignRight, List, GridFour, Rows } from '@phosphor-icons/react';
import { ButtonGroup } from './ButtonGroup';
import { Button } from '../Button';

const meta: Meta<typeof ButtonGroup> = {
  title: 'Components/ButtonGroup',
  component: ButtonGroup,
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

// Interactive demo with selection state
const SelectableIconGroupDemo = () => {
  const [selected, setSelected] = useState('list');
  return (
    <ButtonGroup>
      <Button 
        variant="outline" 
        iconOnly
        onClick={() => setSelected('list')}
        className={selected === 'list' ? 'bg-atom-neutral-one' : ''}
      >
        <List />
      </Button>
      <Button 
        variant="outline" 
        iconOnly
        onClick={() => setSelected('grid')}
        className={selected === 'grid' ? 'bg-atom-neutral-one' : ''}
      >
        <GridFour />
      </Button>
      <Button 
        variant="outline" 
        iconOnly
        onClick={() => setSelected('rows')}
        className={selected === 'rows' ? 'bg-atom-neutral-one' : ''}
      >
        <Rows />
      </Button>
    </ButtonGroup>
  );
};

const SelectableTextGroupDemo = () => {
  const [selected, setSelected] = useState('week');
  return (
    <ButtonGroup>
      <Button 
        variant="outline" 
        onClick={() => setSelected('day')}
        className={selected === 'day' ? 'bg-atom-neutral-one' : ''}
      >
        Day
      </Button>
      <Button 
        variant="outline" 
        onClick={() => setSelected('week')}
        className={selected === 'week' ? 'bg-atom-neutral-one' : ''}
      >
        Week
      </Button>
      <Button 
        variant="outline" 
        onClick={() => setSelected('month')}
        className={selected === 'month' ? 'bg-atom-neutral-one' : ''}
      >
        Month
      </Button>
    </ButtonGroup>
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
        <h1 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '8px' }}>ButtonGroup</h1>
        <p style={{ fontSize: '16px', color: '#666' }}>
          A wrapper that groups Button components together with seamless styling. 
          Buttons retain their own sizing - ButtonGroup only modifies borders and radius.
        </p>
      </div>

      {/* Interactive Demo */}
      <Section title="Interactive Demo" description="Click to select an option.">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <SelectableIconGroupDemo />
          <SelectableTextGroupDemo />
        </div>
      </Section>

      {/* Icon Only */}
      <Section title="Icon Only" description="Button groups with icons only.">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <ButtonGroup>
            <Button variant="outline" iconOnly><TextAlignLeft /></Button>
            <Button variant="outline" iconOnly><TextAlignCenter /></Button>
            <Button variant="outline" iconOnly><TextAlignRight /></Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button variant="outline" iconOnly><List /></Button>
            <Button variant="outline" iconOnly><GridFour /></Button>
            <Button variant="outline" iconOnly><Rows /></Button>
          </ButtonGroup>
        </div>
      </Section>

      {/* Text Only */}
      <Section title="Text Only" description="Button groups with text labels.">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <ButtonGroup>
            <Button variant="outline">Button</Button>
            <Button variant="outline">Button</Button>
            <Button variant="outline">Button</Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button variant="outline">Left</Button>
            <Button variant="outline">Center</Button>
            <Button variant="outline">Right</Button>
          </ButtonGroup>
        </div>
      </Section>

      {/* Icon + Text */}
      <Section title="Icon + Text" description="Button groups with both icons and text.">
        <ButtonGroup>
          <Button variant="outline" iconStart={<List />}>List</Button>
          <Button variant="outline" iconStart={<GridFour />}>Grid</Button>
          <Button variant="outline" iconStart={<Rows />}>Rows</Button>
        </ButtonGroup>
      </Section>

      {/* Sizes */}
      <Section title="Sizes" description="Buttons retain their size - pass size prop to each Button.">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start' }}>
          <div>
            <div style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>Small (sm)</div>
            <ButtonGroup>
              <Button variant="outline" size="sm">Button</Button>
              <Button variant="outline" size="sm">Button</Button>
              <Button variant="outline" size="sm">Button</Button>
            </ButtonGroup>
          </div>
          <div>
            <div style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>Medium (md)</div>
            <ButtonGroup>
              <Button variant="outline" size="md">Button</Button>
              <Button variant="outline" size="md">Button</Button>
              <Button variant="outline" size="md">Button</Button>
            </ButtonGroup>
          </div>
          <div>
            <div style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>Large (lg)</div>
            <ButtonGroup>
              <Button variant="outline" size="lg">Button</Button>
              <Button variant="outline" size="lg">Button</Button>
              <Button variant="outline" size="lg">Button</Button>
            </ButtonGroup>
          </div>
        </div>
      </Section>

      {/* Two Buttons */}
      <Section title="Two Buttons" description="Groups can have just two buttons.">
        <div style={{ display: 'flex', gap: '16px' }}>
          <ButtonGroup>
            <Button variant="outline">Yes</Button>
            <Button variant="outline">No</Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button variant="outline" iconOnly><List /></Button>
            <Button variant="outline" iconOnly><GridFour /></Button>
          </ButtonGroup>
        </div>
      </Section>

      {/* Disabled */}
      <Section title="Disabled" description="Individual buttons can be disabled.">
        <ButtonGroup>
          <Button variant="outline">Active</Button>
          <Button variant="outline" disabled>Disabled</Button>
          <Button variant="outline">Active</Button>
        </ButtonGroup>
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
              <td style={{ padding: '12px 0', color: '#666' }}>Button components to group</td>
            </tr>
            <tr>
              <td style={{ padding: '12px 16px 12px 0' }}><code>className</code></td>
              <td style={{ padding: '12px 16px 12px 0', color: '#666' }}>string</td>
              <td style={{ padding: '12px 16px 12px 0' }}>''</td>
              <td style={{ padding: '12px 0', color: '#666' }}>Additional CSS classes</td>
            </tr>
          </tbody>
        </table>
      </Section>
    </div>
  ),
};