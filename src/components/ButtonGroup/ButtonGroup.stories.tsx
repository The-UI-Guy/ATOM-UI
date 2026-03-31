import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TextAlignLeft, TextAlignCenter, TextAlignRight, List, GridFour, Rows } from '@phosphor-icons/react';
import { ButtonGroup } from './ButtonGroup';
import { Button } from '../Button';
import { StoryPage, StoryHeader, Section, PropsTable } from '../../stories/StoryComponents';

const meta: Meta<typeof ButtonGroup> = {
  title: 'Components/ButtonGroup',
  component: ButtonGroup,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

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
    <StoryPage>
      <StoryHeader
        title="ButtonGroup"
        description="A wrapper that groups Button components together with seamless styling. Buttons retain their own sizing - ButtonGroup only modifies borders and radius."
      />

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
            <div style={{ fontSize: '12px', color: 'var(--atom-text-secondary)', marginBottom: '8px' }}>Small (sm)</div>
            <ButtonGroup>
              <Button variant="outline" size="sm">Button</Button>
              <Button variant="outline" size="sm">Button</Button>
              <Button variant="outline" size="sm">Button</Button>
            </ButtonGroup>
          </div>
          <div>
            <div style={{ fontSize: '12px', color: 'var(--atom-text-secondary)', marginBottom: '8px' }}>Medium (md)</div>
            <ButtonGroup>
              <Button variant="outline" size="md">Button</Button>
              <Button variant="outline" size="md">Button</Button>
              <Button variant="outline" size="md">Button</Button>
            </ButtonGroup>
          </div>
          <div>
            <div style={{ fontSize: '12px', color: 'var(--atom-text-secondary)', marginBottom: '8px' }}>Large (lg)</div>
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
        <PropsTable rows={[
          ['children', 'ReactNode', 'required', 'Button components to group'],
          ['className', 'string', "''", 'Additional CSS classes'],
        ]} />
      </Section>
    </StoryPage>
  ),
};
