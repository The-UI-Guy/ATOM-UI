import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Stepper } from './Stepper';
import { Step } from './Step';
import { Badge } from '../Badge/Badge';
import { Button } from '../Button/Button';
import { StoryPage, StoryHeader, Section } from '../../stories/StoryComponents';

const meta: Meta<typeof Stepper> = {
  title: 'Components/Stepper',
  component: Stepper,
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof meta>;

const NavButtons = ({ step, max, onChange }: { step: number; max: number; onChange: (n: number) => void }) => (
  <div style={{ display: 'flex', gap: 8 }}>
    <Button variant="outline" size="sm" disabled={step === 0} onClick={() => onChange(step - 1)}>Back</Button>
    <Button variant="outline" size="sm" disabled={step === max} onClick={() => onChange(step + 1)}>Next</Button>
  </div>
);

function HorizontalDemo() {
  const [step, setStep] = useState(1);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
      <Stepper currentStep={step} onStepClick={setStep}>
        <Step label="Personal details" subLabel="Name & email" />
        <Step label="Payment" subLabel="Card details" />
        <Step label="Review" subLabel="Check your order" />
        <Step label="Confirm" />
      </Stepper>
      <NavButtons step={step} max={3} onChange={setStep} />
    </div>
  );
}

function VerticalDemo() {
  const [step, setStep] = useState(1);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
      <Stepper currentStep={step} orientation="vertical" onStepClick={setStep}>
        <Step label="Personal details" subLabel="Name & email" />
        <Step label="Payment" subLabel="Card details" />
        <Step label="Review" subLabel="Check your order" />
        <Step label="Confirm" />
      </Stepper>
      <NavButtons step={step} max={3} onChange={setStep} />
    </div>
  );
}

function BadgeDemo() {
  const [step, setStep] = useState(1);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
      <Stepper currentStep={step} onStepClick={setStep}>
        <Step label="Cart" subLabel="3 items">
          <Badge type="count" intent="neutral" count={3} />
        </Step>
        <Step label="Shipping" />
        <Step label="Payment" />
        <Step label="Confirm" />
      </Stepper>
      <NavButtons step={step} max={3} onChange={setStep} />
    </div>
  );
}

export const Documentation: Story = {
  render: () => (
    <StoryPage>
      <StoryHeader
        title="Stepper"
        description="Shows progress through a linear sequence of steps. Completed steps are clickable when onStepClick is provided."
      />

      <Section title="Horizontal">
        <HorizontalDemo />
      </Section>

      <Section title="Vertical">
        <VerticalDemo />
      </Section>

      <Section title="With badge extras">
        <BadgeDemo />
      </Section>

      <Section title="Non-navigable (no onStepClick)">
        <Stepper currentStep={1}>
          <Step label="Details" subLabel="Completed" />
          <Step label="Payment" subLabel="In progress" />
          <Step label="Confirm" />
        </Stepper>
      </Section>
    </StoryPage>
  ),
};
