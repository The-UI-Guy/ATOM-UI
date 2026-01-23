import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
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
        <h1 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '8px' }}>Badge</h1>
        <p style={{ fontSize: '16px', color: '#666' }}>
          A small status indicator that displays a count or a simple dot. Used to show notifications, status, or quantities.
        </p>
      </div>

      {/* Overview */}
      <Section title="Overview" description="Badge types and intents at a glance.">
        <table style={{ borderCollapse: 'separate', borderSpacing: '24px 16px' }}>
          <thead>
            <tr>
              <th style={{ fontSize: '12px', color: '#666', fontWeight: 500, textAlign: 'left' }}>Intent</th>
              <th style={{ fontSize: '12px', color: '#666', fontWeight: 500, textAlign: 'center' }}>Dot</th>
              <th style={{ fontSize: '12px', color: '#666', fontWeight: 500, textAlign: 'center' }}>Count</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ fontSize: '13px', color: '#666' }}>neutral</td>
              <td style={{ textAlign: 'center' }}><Badge type="dot" intent="neutral" /></td>
              <td style={{ textAlign: 'center' }}><Badge type="count" intent="neutral" count={5} /></td>
            </tr>
            <tr>
              <td style={{ fontSize: '13px', color: '#666' }}>primary</td>
              <td style={{ textAlign: 'center' }}><Badge type="dot" intent="primary" /></td>
              <td style={{ textAlign: 'center' }}><Badge type="count" intent="primary" count={5} /></td>
            </tr>
            <tr>
              <td style={{ fontSize: '13px', color: '#666' }}>success</td>
              <td style={{ textAlign: 'center' }}><Badge type="dot" intent="success" /></td>
              <td style={{ textAlign: 'center' }}><Badge type="count" intent="success" count={5} /></td>
            </tr>
            <tr>
              <td style={{ fontSize: '13px', color: '#666' }}>warning</td>
              <td style={{ textAlign: 'center' }}><Badge type="dot" intent="warning" /></td>
              <td style={{ textAlign: 'center' }}><Badge type="count" intent="warning" count={5} /></td>
            </tr>
            <tr>
              <td style={{ fontSize: '13px', color: '#666' }}>error</td>
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
            <div style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>Status indicator</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ marginBottom: '12px', fontSize: '13px', fontWeight: 500 }}>Count</div>
            <Badge type="count" intent="error" count={12} />
            <div style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>Notification count</div>
          </div>
        </div>
      </Section>

      {/* Intents */}
      <Section title="Intents" description="Five color schemes to communicate different statuses.">
        <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <Badge type="count" intent="neutral" count={8} />
            <div style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>Neutral</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Badge type="count" intent="primary" count={8} />
            <div style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>Primary</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Badge type="count" intent="success" count={8} />
            <div style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>Success</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Badge type="count" intent="warning" count={8} />
            <div style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>Warning</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Badge type="count" intent="error" count={8} />
            <div style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>Error</div>
          </div>
        </div>
      </Section>

      {/* Count Variations */}
      <Section title="Count Variations" description="Badges handle various count values gracefully.">
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <Badge type="count" count={1} />
            <div style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>Single digit</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Badge type="count" count={25} />
            <div style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>Double digit</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Badge type="count" count={99} />
            <div style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>Max (99)</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Badge type="count" count={150} max={99} />
            <div style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>Over max (99+)</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Badge type="count" count={0} showZero />
            <div style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>Zero (showZero)</div>
          </div>
        </div>
      </Section>

      {/* Custom Max */}
      <Section title="Custom Max" description="Set a custom maximum value before showing the '+' indicator.">
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <Badge type="count" count={15} max={10} />
            <div style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>max=10, count=15</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Badge type="count" count={500} max={99} />
            <div style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>max=99, count=500</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Badge type="count" count={1500} max={999} />
            <div style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>max=999, count=1500</div>
          </div>
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
              <td style={{ padding: '12px 16px 12px 0' }}><code>type</code></td>
              <td style={{ padding: '12px 16px 12px 0', color: '#666' }}>'dot' | 'count'</td>
              <td style={{ padding: '12px 16px 12px 0' }}><code>'dot'</code></td>
              <td style={{ padding: '12px 0', color: '#666' }}>Badge display type</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
              <td style={{ padding: '12px 16px 12px 0' }}><code>intent</code></td>
              <td style={{ padding: '12px 16px 12px 0', color: '#666' }}>'neutral' | 'primary' | 'success' | 'warning' | 'error'</td>
              <td style={{ padding: '12px 16px 12px 0' }}><code>'primary'</code></td>
              <td style={{ padding: '12px 0', color: '#666' }}>Color scheme</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
              <td style={{ padding: '12px 16px 12px 0' }}><code>count</code></td>
              <td style={{ padding: '12px 16px 12px 0', color: '#666' }}>number</td>
              <td style={{ padding: '12px 16px 12px 0' }}><code>0</code></td>
              <td style={{ padding: '12px 0', color: '#666' }}>Number to display (for type="count")</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
              <td style={{ padding: '12px 16px 12px 0' }}><code>max</code></td>
              <td style={{ padding: '12px 16px 12px 0', color: '#666' }}>number</td>
              <td style={{ padding: '12px 16px 12px 0' }}><code>99</code></td>
              <td style={{ padding: '12px 0', color: '#666' }}>Max value before showing "+"</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
              <td style={{ padding: '12px 16px 12px 0' }}><code>showZero</code></td>
              <td style={{ padding: '12px 16px 12px 0', color: '#666' }}>boolean</td>
              <td style={{ padding: '12px 16px 12px 0' }}><code>false</code></td>
              <td style={{ padding: '12px 0', color: '#666' }}>Show badge when count is 0</td>
            </tr>
            <tr>
              <td style={{ padding: '12px 16px 12px 0' }}><code>className</code></td>
              <td style={{ padding: '12px 16px 12px 0', color: '#666' }}>string</td>
              <td style={{ padding: '12px 16px 12px 0' }}>-</td>
              <td style={{ padding: '12px 0', color: '#666' }}>Additional CSS classes</td>
            </tr>
          </tbody>
        </table>
      </Section>
    </div>
  ),
};