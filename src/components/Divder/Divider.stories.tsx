import type { Meta, StoryObj } from '@storybook/react';
import { Divider } from './Divider';
import { StoryPage, StoryHeader, Section, PropsTable, DemoBox } from '../../stories/StoryComponents';

const meta: Meta<typeof Divider> = {
  title: 'Components/Divider',
  component: Divider,
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
        title="Divider"
        description="A horizontal divider line with configurable style, color, and padding."
      />

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
        <div style={{ width: '300px', background: 'var(--atom-surface-1)', padding: '16px', borderRadius: '8px' }}>
          <h3 style={{ margin: '0 0 8px', fontSize: '16px' }}>Section One</h3>
          <p style={{ margin: 0, fontSize: '14px', color: 'var(--atom-text-secondary)' }}>Some content here.</p>

          <Divider paddingY="2" />

          <h3 style={{ margin: '0 0 8px', fontSize: '16px' }}>Section Two</h3>
          <p style={{ margin: 0, fontSize: '14px', color: 'var(--atom-text-secondary)' }}>More content here.</p>

          <Divider type="dashed" color="secondary" paddingY="2" />

          <h3 style={{ margin: '0 0 8px', fontSize: '16px' }}>Section Three</h3>
          <p style={{ margin: 0, fontSize: '14px', color: 'var(--atom-text-secondary)' }}>Even more content.</p>
        </div>
      </Section>

      {/* API Reference */}
      <Section title="API Reference">
        <PropsTable rows={[
          ['type', "'solid' | 'dashed'", "'solid'", 'Line style'],
          ['color', "'primary' | 'secondary' | 'tertiary'", "'primary'", 'Line color (uses border tokens)'],
          ['paddingY', 'DividerSpacing', "'none'", 'Shorthand for top and bottom padding'],
          ['paddingX', 'DividerSpacing', "'none'", 'Shorthand for left and right padding'],
          ['paddingTop', 'DividerSpacing', "'none'", 'Top padding (overrides paddingY)'],
          ['paddingBottom', 'DividerSpacing', "'none'", 'Bottom padding (overrides paddingY)'],
          ['paddingLeft', 'DividerSpacing', "'none'", 'Left padding (overrides paddingX)'],
          ['paddingRight', 'DividerSpacing', "'none'", 'Right padding (overrides paddingX)'],
          ['className', 'string', "''", 'Additional CSS classes'],
        ]} />

        <h3 style={{ fontSize: '16px', fontWeight: 600, marginTop: '24px', marginBottom: '12px' }}>DividerSpacing Values</h3>
        <PropsTable
          columns={['Value', 'Size']}
          rows={[
            ["'none'", '0px'],
            ["'half'", '4px'],
            ["'1'", '8px'],
            ["'2'", '16px'],
            ["'3'", '24px'],
            ["'4'", '32px'],
            ["'5' - '10'", '40px - 80px'],
          ]}
        />
      </Section>
    </StoryPage>
  ),
};
