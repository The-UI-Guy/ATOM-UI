import type { Meta, StoryObj } from '@storybook/react';
import { Info, Question } from '@phosphor-icons/react';
import { Tooltip } from './Tooltip';
import { Button } from '../Button';
import { StoryPage, StoryHeader, Section, PropsTable } from '../../stories/StoryComponents';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Documentation: Story = {
  parameters: {
    layout: 'fullscreen',
  },
  render: () => (
    <StoryPage>
      <StoryHeader
        title="Tooltip"
        description="A tooltip that appears on hover to provide additional information."
      />

      {/* Placements */}
      <Section title="Placements" description="Tooltips can appear from four directions.">
        <div style={{ display: 'flex', gap: '48px', justifyContent: 'center', padding: '48px' }}>
          <Tooltip content="Click here to save your changes" placement="top">
            <Button variant="outline">Top</Button>
          </Tooltip>

          <Tooltip content="Click here to save your changes" placement="bottom">
            <Button variant="outline">Bottom</Button>
          </Tooltip>

          <Tooltip content="Click here to save your changes" placement="left">
            <Button variant="outline">Left</Button>
          </Tooltip>

          <Tooltip content="Click here to save your changes" placement="right">
            <Button variant="outline">Right</Button>
          </Tooltip>
        </div>
      </Section>

      {/* With Icons */}
      <Section title="With Icons" description="Tooltips work great with icon triggers.">
        <div style={{ display: 'flex', gap: '32px', justifyContent: 'center', padding: '24px' }}>
          <Tooltip content="More information">
            <Info size={24} style={{ cursor: 'pointer', color: 'var(--atom-text-secondary)' }} />
          </Tooltip>

          <Tooltip content="Need help?" placement="right">
            <Question size={24} style={{ cursor: 'pointer', color: 'var(--atom-text-secondary)' }} />
          </Tooltip>
        </div>
      </Section>

      {/* With Delay */}
      <Section title="With Delay" description="Add a delay before showing the tooltip.">
        <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', padding: '24px' }}>
          <Tooltip content="No delay" placement="top">
            <Button variant="outline">Instant</Button>
          </Tooltip>

          <Tooltip content="500ms delay" placement="top" delay={500}>
            <Button variant="outline">Delayed (500ms)</Button>
          </Tooltip>
        </div>
      </Section>

      {/* Complex Content */}
      <Section title="Complex Content" description="Tooltip content can be any React node.">
        <div style={{ display: 'flex', justifyContent: 'center', padding: '24px' }}>
          <Tooltip
            content={
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Info size={16} />
                <span>Rich content with icons</span>
              </div>
            }
            placement="top"
          >
            <Button variant="outline">Hover for rich tooltip</Button>
          </Tooltip>
        </div>
      </Section>

      {/* On Text */}
      <Section title="On Text" description="Wrap inline text for contextual hints.">
        <p style={{ fontSize: '14px', color: 'var(--atom-text-primary)', textAlign: 'center', padding: '24px' }}>
          Hover over the{' '}
          <Tooltip content="This is a helpful hint!" placement="top">
            <span style={{ textDecoration: 'underline', cursor: 'pointer', color: 'var(--atom-primary-main)' }}>
              underlined text
            </span>
          </Tooltip>
          {' '}to see a tooltip.
        </p>
      </Section>

      {/* Disabled */}
      <Section title="Disabled" description="Tooltips can be disabled programmatically.">
        <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', padding: '24px' }}>
          <Tooltip content="This will show" placement="top">
            <Button variant="outline">Enabled</Button>
          </Tooltip>

          <Tooltip content="This won't show" placement="top" disabled>
            <Button variant="outline">Disabled tooltip</Button>
          </Tooltip>
        </div>
      </Section>

      {/* API Reference */}
      <Section title="API Reference">
        <PropsTable rows={[
          ['children', 'ReactNode', 'required', 'Trigger element'],
          ['content', 'ReactNode', 'required', 'Tooltip content'],
          ['placement', "'top' | 'bottom' | 'left' | 'right'", "'top'", 'Position relative to trigger'],
          ['delay', 'number', '0', 'Delay before showing (ms)'],
          ['disabled', 'boolean', 'false', 'Disable the tooltip'],
        ]} />
      </Section>
    </StoryPage>
  ),
};
