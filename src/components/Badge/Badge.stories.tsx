import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';
import { StoryPage, StoryHeader, Section, PropsTable } from '../../stories/StoryComponents';

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
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
        title="Badge"
        description="A small status indicator that displays a count or a simple dot. Used to show notifications, status, or quantities."
      />

      {/* Overview */}
      <Section title="Overview" description="Badge types and intents at a glance.">
        <table style={{ borderCollapse: 'separate', borderSpacing: '24px 16px' }}>
          <thead>
            <tr>
              <th style={{ fontSize: '12px', color: 'var(--atom-text-secondary)', fontWeight: 500, textAlign: 'left' }}>Intent</th>
              <th style={{ fontSize: '12px', color: 'var(--atom-text-secondary)', fontWeight: 500, textAlign: 'center' }}>Dot</th>
              <th style={{ fontSize: '12px', color: 'var(--atom-text-secondary)', fontWeight: 500, textAlign: 'center' }}>Count</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ fontSize: '13px', color: 'var(--atom-text-secondary)' }}>neutral</td>
              <td style={{ textAlign: 'center' }}><Badge type="dot" intent="neutral" /></td>
              <td style={{ textAlign: 'center' }}><Badge type="count" intent="neutral" count={5} /></td>
            </tr>
            <tr>
              <td style={{ fontSize: '13px', color: 'var(--atom-text-secondary)' }}>primary</td>
              <td style={{ textAlign: 'center' }}><Badge type="dot" intent="primary" /></td>
              <td style={{ textAlign: 'center' }}><Badge type="count" intent="primary" count={5} /></td>
            </tr>
            <tr>
              <td style={{ fontSize: '13px', color: 'var(--atom-text-secondary)' }}>success</td>
              <td style={{ textAlign: 'center' }}><Badge type="dot" intent="success" /></td>
              <td style={{ textAlign: 'center' }}><Badge type="count" intent="success" count={5} /></td>
            </tr>
            <tr>
              <td style={{ fontSize: '13px', color: 'var(--atom-text-secondary)' }}>warning</td>
              <td style={{ textAlign: 'center' }}><Badge type="dot" intent="warning" /></td>
              <td style={{ textAlign: 'center' }}><Badge type="count" intent="warning" count={5} /></td>
            </tr>
            <tr>
              <td style={{ fontSize: '13px', color: 'var(--atom-text-secondary)' }}>error</td>
              <td style={{ textAlign: 'center' }}><Badge type="dot" intent="error" /></td>
              <td style={{ textAlign: 'center' }}><Badge type="count" intent="error" count={5} /></td>
            </tr>
          </tbody>
        </table>
      </Section>

      {/* Types */}
      <Section title="Types" description="Badges can be a simple dot or display a count.">
        <div style={{ display: 'flex', gap: '48px', alignItems: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ marginBottom: '12px', fontSize: '13px', fontWeight: 500 }}>Dot</div>
            <Badge type="dot" intent="error" />
            <div style={{ marginTop: '8px', fontSize: '12px', color: 'var(--atom-text-secondary)' }}>Status indicator</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ marginBottom: '12px', fontSize: '13px', fontWeight: 500 }}>Count</div>
            <Badge type="count" intent="error" count={12} />
            <div style={{ marginTop: '8px', fontSize: '12px', color: 'var(--atom-text-secondary)' }}>Notification count</div>
          </div>
        </div>
      </Section>

      {/* Intents */}
      <Section title="Intents" description="Five color schemes to communicate different statuses.">
        <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <Badge type="count" intent="neutral" count={8} />
            <div style={{ marginTop: '8px', fontSize: '12px', color: 'var(--atom-text-secondary)' }}>Neutral</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Badge type="count" intent="primary" count={8} />
            <div style={{ marginTop: '8px', fontSize: '12px', color: 'var(--atom-text-secondary)' }}>Primary</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Badge type="count" intent="success" count={8} />
            <div style={{ marginTop: '8px', fontSize: '12px', color: 'var(--atom-text-secondary)' }}>Success</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Badge type="count" intent="warning" count={8} />
            <div style={{ marginTop: '8px', fontSize: '12px', color: 'var(--atom-text-secondary)' }}>Warning</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Badge type="count" intent="error" count={8} />
            <div style={{ marginTop: '8px', fontSize: '12px', color: 'var(--atom-text-secondary)' }}>Error</div>
          </div>
        </div>
      </Section>

      {/* Count Variations */}
      <Section title="Count Variations" description="Badges handle various count values gracefully.">
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <Badge type="count" count={1} />
            <div style={{ marginTop: '8px', fontSize: '12px', color: 'var(--atom-text-secondary)' }}>Single digit</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Badge type="count" count={25} />
            <div style={{ marginTop: '8px', fontSize: '12px', color: 'var(--atom-text-secondary)' }}>Double digit</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Badge type="count" count={99} />
            <div style={{ marginTop: '8px', fontSize: '12px', color: 'var(--atom-text-secondary)' }}>Max (99)</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Badge type="count" count={150} max={99} />
            <div style={{ marginTop: '8px', fontSize: '12px', color: 'var(--atom-text-secondary)' }}>Over max (99+)</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Badge type="count" count={0} showZero />
            <div style={{ marginTop: '8px', fontSize: '12px', color: 'var(--atom-text-secondary)' }}>Zero (showZero)</div>
          </div>
        </div>
      </Section>

      {/* Custom Max */}
      <Section title="Custom Max" description="Set a custom maximum value before showing the '+' indicator.">
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <Badge type="count" count={15} max={10} />
            <div style={{ marginTop: '8px', fontSize: '12px', color: 'var(--atom-text-secondary)' }}>max=10, count=15</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Badge type="count" count={500} max={99} />
            <div style={{ marginTop: '8px', fontSize: '12px', color: 'var(--atom-text-secondary)' }}>max=99, count=500</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Badge type="count" count={1500} max={999} />
            <div style={{ marginTop: '8px', fontSize: '12px', color: 'var(--atom-text-secondary)' }}>max=999, count=1500</div>
          </div>
        </div>
      </Section>

      {/* API Reference */}
      <Section title="API Reference">
        <PropsTable rows={[
          ['type', "'dot' | 'count'", "'dot'", 'Badge display type'],
          ['intent', "'neutral' | 'primary' | 'success' | 'warning' | 'error'", "'primary'", 'Color scheme'],
          ['count', 'number', '0', 'Number to display (for type="count")'],
          ['max', 'number', '99', 'Max value before showing "+"'],
          ['showZero', 'boolean', 'false', 'Show badge when count is 0'],
          ['className', 'string', '-', 'Additional CSS classes'],
        ]} />
      </Section>
    </StoryPage>
  ),
};
