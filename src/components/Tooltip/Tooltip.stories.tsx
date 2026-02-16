import type { Meta, StoryObj } from '@storybook/react';
import { Info, Question } from '@phosphor-icons/react';
import { Tooltip } from './Tooltip';
import { Button } from '../Button';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
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

export const Documentation: Story = {
  parameters: {
    layout: 'fullscreen',
  },
  render: () => (
    <div style={{ padding: '40px', maxWidth: '900px' }}>
      {/* Header */}
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '8px' }}>Tooltip</h1>
        <p style={{ fontSize: '16px', color: '#666' }}>
          A tooltip that appears on hover to provide additional information.
        </p>
      </div>

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
            <Info size={24} style={{ cursor: 'pointer', color: '#666' }} />
          </Tooltip>
          
          <Tooltip content="Need help?" placement="right">
            <Question size={24} style={{ cursor: 'pointer', color: '#666' }} />
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
        <p style={{ fontSize: '14px', color: '#333', textAlign: 'center', padding: '24px' }}>
          Hover over the{' '}
          <Tooltip content="This is a helpful hint!" placement="top">
            <span style={{ textDecoration: 'underline', cursor: 'pointer', color: '#5327D7' }}>
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
              <td style={{ padding: '12px 0', color: '#666' }}>Trigger element</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
              <td style={{ padding: '12px 16px 12px 0' }}><code>content</code></td>
              <td style={{ padding: '12px 16px 12px 0', color: '#666' }}>ReactNode</td>
              <td style={{ padding: '12px 16px 12px 0' }}>required</td>
              <td style={{ padding: '12px 0', color: '#666' }}>Tooltip content</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
              <td style={{ padding: '12px 16px 12px 0' }}><code>placement</code></td>
              <td style={{ padding: '12px 16px 12px 0', color: '#666' }}>'top' | 'bottom' | 'left' | 'right'</td>
              <td style={{ padding: '12px 16px 12px 0' }}><code>'top'</code></td>
              <td style={{ padding: '12px 0', color: '#666' }}>Position relative to trigger</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
              <td style={{ padding: '12px 16px 12px 0' }}><code>delay</code></td>
              <td style={{ padding: '12px 16px 12px 0', color: '#666' }}>number</td>
              <td style={{ padding: '12px 16px 12px 0' }}><code>0</code></td>
              <td style={{ padding: '12px 0', color: '#666' }}>Delay before showing (ms)</td>
            </tr>
            <tr>
              <td style={{ padding: '12px 16px 12px 0' }}><code>disabled</code></td>
              <td style={{ padding: '12px 16px 12px 0', color: '#666' }}>boolean</td>
              <td style={{ padding: '12px 16px 12px 0' }}><code>false</code></td>
              <td style={{ padding: '12px 0', color: '#666' }}>Disable the tooltip</td>
            </tr>
          </tbody>
        </table>
      </Section>
    </div>
  ),
};
