import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Slider } from './Slider';
import { StoryPage, StoryHeader, Section, PropsTable } from '../../stories/StoryComponents';

const meta: Meta<typeof Slider> = {
  title: 'Components/Slider',
  component: Slider,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Interactive single slider demo
const SingleSliderDemo = ({ showLabels = true }: { showLabels?: boolean }) => {
  const [value, setValue] = useState(50);
  return (
    <div style={{ width: '300px' }}>
      <Slider value={value} onChange={(v) => setValue(v as number)} showLabels={showLabels} />
    </div>
  );
};

// Interactive range slider demo
const RangeSliderDemo = ({ showLabels = true }: { showLabels?: boolean }) => {
  const [value, setValue] = useState<[number, number]>([33, 66]);
  return (
    <div style={{ width: '300px' }}>
      <Slider value={value} onChange={(v) => setValue(v as [number, number])} showLabels={showLabels} />
    </div>
  );
};

// Custom range demo
const CustomRangeDemo = () => {
  const [value, setValue] = useState(500);
  return (
    <div style={{ width: '300px' }}>
      <Slider
        value={value}
        onChange={(v) => setValue(v as number)}
        min={0}
        max={1000}
        step={50}
        showLabels
        formatLabel={(v) => `$${v}`}
      />
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
        title="Slider"
        description="A slider input for selecting a single value or a range of values. Supports custom min/max, step increments, and value labels."
      />

      {/* Single Slider */}
      <Section title="Single Slider" description="Drag the handle to select a value.">
        <SingleSliderDemo />
      </Section>

      {/* Range Slider */}
      <Section title="Range Slider" description="Drag either handle to select a range.">
        <RangeSliderDemo />
      </Section>

      {/* Custom Range & Step */}
      <Section title="Custom Range & Step" description="Slider with custom min/max, step, and label format.">
        <CustomRangeDemo />
      </Section>

      {/* Without Labels */}
      <Section title="Without Labels" description="Sliders can be used without value labels.">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '300px' }}>
          <SingleSliderDemo showLabels={false} />
          <RangeSliderDemo showLabels={false} />
        </div>
      </Section>

      {/* Disabled State */}
      <Section title="Disabled" description="Disabled sliders cannot be interacted with.">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '300px' }}>
          <Slider value={50} showLabels disabled />
          <Slider value={[25, 75]} showLabels disabled />
        </div>
      </Section>

      {/* API Reference */}
      <Section title="API Reference">
        <PropsTable rows={[
          ['value', 'number | [number, number]', 'required', 'Current value (single) or range (array)'],
          ['onChange', '(value) => void', '-', 'Called when value changes'],
          ['min', 'number', '0', 'Minimum value'],
          ['max', 'number', '100', 'Maximum value'],
          ['step', 'number', '1', 'Step increment'],
          ['disabled', 'boolean', 'false', 'Disable the slider'],
          ['showLabels', 'boolean', 'false', 'Show value labels'],
          ['formatLabel', '(value) => string', "(v) => `${v}%`", 'Format label display'],
        ]} />
      </Section>
    </StoryPage>
  ),
};
