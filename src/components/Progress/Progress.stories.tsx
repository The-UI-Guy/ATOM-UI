import { useState, useEffect } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ProgressBar } from './ProgressBar';
import { ProgressWheel } from './ProgressWheel';
import { StoryPage, StoryHeader, Section, Row } from '../../stories/StoryComponents';

const meta: Meta = {
  title: 'Components/Progress',
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof meta>;

const PRIMES = [7, 11, 13, 17, 19, 23];

function useLoopingValue() {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let stepIdx = 0;
    let current = 0;
    let atMax = false;

    const id = setInterval(() => {
      if (atMax) {
        current = 0;
        atMax = false;
        setValue(0);
        return;
      }
      current = Math.min(100, current + PRIMES[stepIdx % PRIMES.length]);
      stepIdx++;
      atMax = current === 100;
      setValue(current);
    }, 1000);

    return () => clearInterval(id);
  }, []);
  return value;
}

function BarDemo() {
  const value = useLoopingValue();
  return (
    <div style={{ maxWidth: 400 }}>
      <ProgressBar value={value} label="Uploading files" showDescription />
    </div>
  );
}

function WheelDemo() {
  const value = useLoopingValue();
  return (
    <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
      <ProgressWheel value={value} size={48} />
      <ProgressWheel value={value} size={64} />
      <ProgressWheel value={value} size={96} />
    </div>
  );
}

export const Documentation: Story = {
  render: () => (
    <StoryPage>
      <StoryHeader
        title="Progress"
        description="Two components for communicating progress: a linear bar and a circular wheel. Both animate on mount and on value change."
      />

      <Section title="Progress bar">
        <BarDemo />
      </Section>

      <Section title="Bar variants">
        <Row label="Label + description">
          <ProgressBar value={60} label="Processing" showDescription />
        </Row>
        <Row label="Label only">
          <ProgressBar value={40} label="Loading" />
        </Row>
        <Row label="Bare">
          <ProgressBar value={80} />
        </Row>
      </Section>

      <Section title="Progress wheel">
        <WheelDemo />
      </Section>
    </StoryPage>
  ),
};
