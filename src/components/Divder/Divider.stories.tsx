import type { Meta, StoryObj } from '@storybook/react';
import { Divider } from './Divider';

const meta: Meta<typeof Divider> = {
  title: 'Components/Divider',
  component: Divider,
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

// Demo box to show padding
const DemoBox = ({ children, label }: { children: React.ReactNode; label?: string }) => (
  <div style={{ width: '300px', background: '#fff', border: '1px solid #e0e0e0', borderRadius: '4px', marginBottom: '16px' }}>
    {label && <div style={{ fontSize: '12px', color: '#666', padding: '8px 8px 0' }}>{label}</div>}
    {children}
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
        <h1 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '8px' }}>Divider</h1>
        <p style={{ fontSize: '16px', color: '#666' }}>
          A horizontal divider line with configurable style, color, and padding.
        </p>
      </div>

      {/* Basic */}
      <Section title="Basic" description="Default solid divider with primary border color.">
        <DemoBox>
          <div style={{ padding: '16px' }}>Content above</div>
          <Divider />
          <div style={{ padding: '16px' }}>Content below</div>
        </DemoBox>
      </Section>

      {/* Types */}
      <Section title="Types" description="Solid and dashed line styles.">
        <DemoBox label="solid (default)">
          <Divider paddingY="2" paddingX="1" />
        </DemoBox>
        <DemoBox label="dashed">
          <Divider type="dashed" paddingY="2" paddingX="1" />
        </DemoBox>
      </Section>

      {/* Colors */}
      <Section title="Colors" description="Three border color options.">
        <DemoBox label="primary (default)">
          <Divider color="primary" paddingY="2" paddingX="1" />
        </DemoBox>
        <DemoBox label="secondary">
          <Divider color="secondary" paddingY="2" paddingX="1" />
        </DemoBox>
        <DemoBox label="tertiary">
          <Divider color="tertiary" paddingY="2" paddingX="1" />
        </DemoBox>
      </Section>

      {/* Padding Y */}
      <Section title="Vertical Padding (paddingY)" description="Add equal padding above and below the line.">
        <DemoBox label="paddingY='none'">
          <Divider paddingY="none" />
        </DemoBox>
        <DemoBox label="paddingY='1' (8px)">
          <Divider paddingY="1" />
        </DemoBox>
        <DemoBox label="paddingY='2' (16px)">
          <Divider paddingY="2" />
        </DemoBox>
        <DemoBox label="paddingY='4' (32px)">
          <Divider paddingY="4" />
        </DemoBox>
      </Section>

      {/* Padding X */}
      <Section title="Horizontal Padding (paddingX)" description="Add equal padding on left and right.">
        <DemoBox label="paddingX='none'">
          <Divider paddingX="none" paddingY="1" />
        </DemoBox>
        <DemoBox label="paddingX='2' (16px)">
          <Divider paddingX="2" paddingY="1" />
        </DemoBox>
        <DemoBox label="paddingX='4' (32px)">
          <Divider paddingX="4" paddingY="1" />
        </DemoBox>
      </Section>

      {/* Individual Padding */}
      <Section title="Individual Padding" description="Control each side independently.">
        <DemoBox label="paddingTop='4' paddingBottom='1'">
          <Divider paddingTop="4" paddingBottom="1" />
        </DemoBox>
        <DemoBox label="paddingLeft='4' paddingRight='1'">
          <Divider paddingLeft="4" paddingRight="1" paddingY="1" />
        </DemoBox>
      </Section>

      {/* Use Case Example */}
      <Section title="Use Case Example" description="Separating content sections.">
        <div style={{ width: '300px', background: '#fff', padding: '16px', borderRadius: '8px' }}>
          <h3 style={{ margin: '0 0 8px', fontSize: '16px' }}>Section One</h3>
          <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>Some content here.</p>
          
          <Divider paddingY="2" />
          
          <h3 style={{ margin: '0 0 8px', fontSize: '16px' }}>Section Two</h3>
          <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>More content here.</p>
          
          <Divider type="dashed" color="secondary" paddingY="2" />
          
          <h3 style={{ margin: '0 0 8px', fontSize: '16px' }}>Section Three</h3>
          <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>Even more content.</p>
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
              <td style={{ padding: '12px 16px 12px 0', color: '#666' }}>'solid' | 'dashed'</td>
              <td style={{ padding: '12px 16px 12px 0' }}><code>'solid'</code></td>
              <td style={{ padding: '12px 0', color: '#666' }}>Line style</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
              <td style={{ padding: '12px 16px 12px 0' }}><code>color</code></td>
              <td style={{ padding: '12px 16px 12px 0', color: '#666' }}>'primary' | 'secondary' | 'tertiary'</td>
              <td style={{ padding: '12px 16px 12px 0' }}><code>'primary'</code></td>
              <td style={{ padding: '12px 0', color: '#666' }}>Line color (uses border tokens)</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
              <td style={{ padding: '12px 16px 12px 0' }}><code>paddingY</code></td>
              <td style={{ padding: '12px 16px 12px 0', color: '#666' }}>DividerSpacing</td>
              <td style={{ padding: '12px 16px 12px 0' }}><code>'none'</code></td>
              <td style={{ padding: '12px 0', color: '#666' }}>Shorthand for top and bottom padding</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
              <td style={{ padding: '12px 16px 12px 0' }}><code>paddingX</code></td>
              <td style={{ padding: '12px 16px 12px 0', color: '#666' }}>DividerSpacing</td>
              <td style={{ padding: '12px 16px 12px 0' }}><code>'none'</code></td>
              <td style={{ padding: '12px 0', color: '#666' }}>Shorthand for left and right padding</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
              <td style={{ padding: '12px 16px 12px 0' }}><code>paddingTop</code></td>
              <td style={{ padding: '12px 16px 12px 0', color: '#666' }}>DividerSpacing</td>
              <td style={{ padding: '12px 16px 12px 0' }}><code>'none'</code></td>
              <td style={{ padding: '12px 0', color: '#666' }}>Top padding (overrides paddingY)</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
              <td style={{ padding: '12px 16px 12px 0' }}><code>paddingBottom</code></td>
              <td style={{ padding: '12px 16px 12px 0', color: '#666' }}>DividerSpacing</td>
              <td style={{ padding: '12px 16px 12px 0' }}><code>'none'</code></td>
              <td style={{ padding: '12px 0', color: '#666' }}>Bottom padding (overrides paddingY)</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
              <td style={{ padding: '12px 16px 12px 0' }}><code>paddingLeft</code></td>
              <td style={{ padding: '12px 16px 12px 0', color: '#666' }}>DividerSpacing</td>
              <td style={{ padding: '12px 16px 12px 0' }}><code>'none'</code></td>
              <td style={{ padding: '12px 0', color: '#666' }}>Left padding (overrides paddingX)</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
              <td style={{ padding: '12px 16px 12px 0' }}><code>paddingRight</code></td>
              <td style={{ padding: '12px 16px 12px 0', color: '#666' }}>DividerSpacing</td>
              <td style={{ padding: '12px 16px 12px 0' }}><code>'none'</code></td>
              <td style={{ padding: '12px 0', color: '#666' }}>Right padding (overrides paddingX)</td>
            </tr>
            <tr>
              <td style={{ padding: '12px 16px 12px 0' }}><code>className</code></td>
              <td style={{ padding: '12px 16px 12px 0', color: '#666' }}>string</td>
              <td style={{ padding: '12px 16px 12px 0' }}><code>''</code></td>
              <td style={{ padding: '12px 0', color: '#666' }}>Additional CSS classes</td>
            </tr>
          </tbody>
        </table>

        <h3 style={{ fontSize: '16px', fontWeight: 600, marginTop: '24px', marginBottom: '12px' }}>DividerSpacing Values</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #e0e0e0', textAlign: 'left' }}>
              <th style={{ padding: '12px 16px 12px 0', fontWeight: 600 }}>Value</th>
              <th style={{ padding: '12px 0', fontWeight: 600 }}>Size</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
              <td style={{ padding: '12px 16px 12px 0' }}><code>'none'</code></td>
              <td style={{ padding: '12px 0', color: '#666' }}>0px</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
              <td style={{ padding: '12px 16px 12px 0' }}><code>'half'</code></td>
              <td style={{ padding: '12px 0', color: '#666' }}>4px</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
              <td style={{ padding: '12px 16px 12px 0' }}><code>'1'</code></td>
              <td style={{ padding: '12px 0', color: '#666' }}>8px</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
              <td style={{ padding: '12px 16px 12px 0' }}><code>'2'</code></td>
              <td style={{ padding: '12px 0', color: '#666' }}>16px</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
              <td style={{ padding: '12px 16px 12px 0' }}><code>'3'</code></td>
              <td style={{ padding: '12px 0', color: '#666' }}>24px</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
              <td style={{ padding: '12px 16px 12px 0' }}><code>'4'</code></td>
              <td style={{ padding: '12px 0', color: '#666' }}>32px</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
              <td style={{ padding: '12px 16px 12px 0' }}><code>'5' - '10'</code></td>
              <td style={{ padding: '12px 0', color: '#666' }}>40px - 80px</td>
            </tr>
          </tbody>
        </table>
      </Section>
    </div>
  ),
};