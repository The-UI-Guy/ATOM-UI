import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from './Avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
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

// Sample images for demos
const sampleImages = {
  male: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
  female: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face',
};

export const Documentation: Story = {
  parameters: {
    layout: 'fullscreen',
  },
  render: () => (
    <div style={{ padding: '40px', maxWidth: '900px' }}>
      {/* Header */}
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '8px' }}>Avatar</h1>
        <p style={{ fontSize: '16px', color: '#666' }}>
          The Avatar component displays a user representation as an image, initials, or icon. It supports multiple sizes and shapes.
        </p>
      </div>

      {/* Overview Grid - Matching the Figma layout */}
      <Section title="Overview" description="All avatar variants organized by size, type, and shape.">
        <table style={{ borderCollapse: 'separate', borderSpacing: '24px' }}>
          <thead>
            <tr>
              <th style={{ fontSize: '12px', color: '#666', fontWeight: 500, textAlign: 'left', paddingBottom: '8px' }}>Size</th>
              <th colSpan={3} style={{ fontSize: '12px', color: '#666', fontWeight: 500, textAlign: 'center', paddingBottom: '8px' }}>Round</th>
              <th colSpan={3} style={{ fontSize: '12px', color: '#666', fontWeight: 500, textAlign: 'center', paddingBottom: '8px' }}>Square</th>
            </tr>
            <tr>
              <th></th>
              <th style={{ fontSize: '11px', color: '#999', fontWeight: 400, textAlign: 'center' }}>Text</th>
              <th style={{ fontSize: '11px', color: '#999', fontWeight: 400, textAlign: 'center' }}>Icon</th>
              <th style={{ fontSize: '11px', color: '#999', fontWeight: 400, textAlign: 'center' }}>Image</th>
              <th style={{ fontSize: '11px', color: '#999', fontWeight: 400, textAlign: 'center' }}>Text</th>
              <th style={{ fontSize: '11px', color: '#999', fontWeight: 400, textAlign: 'center' }}>Icon</th>
              <th style={{ fontSize: '11px', color: '#999', fontWeight: 400, textAlign: 'center' }}>Image</th>
            </tr>
          </thead>
          <tbody>
            {/* Large */}
            <tr>
              <td style={{ fontSize: '13px', color: '#666', fontWeight: 500 }}>lg</td>
              <td style={{ textAlign: 'center' }}><Avatar type="text" size="lg" shape="round"  name="Millicent Bullstrode" /></td>
              <td style={{ textAlign: 'center' }}><Avatar type="icon" size="lg" shape="round" /></td>
              <td style={{ textAlign: 'center' }}><Avatar type="image" size="lg" shape="round" src={sampleImages.male} alt="User" /></td>
              <td style={{ textAlign: 'center' }}><Avatar type="text" size="lg" shape="square" name="Millicent Bullstrode"/></td>
              <td style={{ textAlign: 'center' }}><Avatar type="icon" size="lg" shape="square" /></td>
              <td style={{ textAlign: 'center' }}><Avatar type="image" size="lg" shape="square" src={sampleImages.male} alt="User" /></td>
            </tr>
            {/* Medium */}
            <tr>
              <td style={{ fontSize: '13px', color: '#666', fontWeight: 500 }}>md</td>
              <td style={{ textAlign: 'center' }}><Avatar type="text" size="md" shape="round" name="Millicent Bullstrode"/></td>
              <td style={{ textAlign: 'center' }}><Avatar type="icon" size="md" shape="round" /></td>
              <td style={{ textAlign: 'center' }}><Avatar type="image" size="md" shape="round" src={sampleImages.female} alt="User" /></td>
              <td style={{ textAlign: 'center' }}><Avatar type="text" size="md" shape="square" name="Millicent Bullstrode"/></td>
              <td style={{ textAlign: 'center' }}><Avatar type="icon" size="md" shape="square" /></td>
              <td style={{ textAlign: 'center' }}><Avatar type="image" size="md" shape="square" src={sampleImages.female} alt="User" /></td>
            </tr>
            {/* Small */}
            <tr>
              <td style={{ fontSize: '13px', color: '#666', fontWeight: 500 }}>sm</td>
              <td style={{ textAlign: 'center' }}><Avatar type="text" size="sm" shape="round" name="Millicent Bullstrode" /></td>
              <td style={{ textAlign: 'center' }}><Avatar type="icon" size="sm" shape="round" /></td>
              <td style={{ textAlign: 'center' }}><Avatar type="image" size="sm" shape="round" src={sampleImages.female} alt="User" /></td>
              <td style={{ textAlign: 'center' }}><Avatar type="text" size="sm" shape="square" name="Millicent Bullstrode" /></td>
              <td style={{ textAlign: 'center' }}><Avatar type="icon" size="sm" shape="square" /></td>
              <td style={{ textAlign: 'center' }}><Avatar type="image" size="sm" shape="square" src={sampleImages.female} alt="User" /></td>
            </tr>
            {/* Extra Small */}
            <tr>
              <td style={{ fontSize: '13px', color: '#666', fontWeight: 500 }}>xs</td>
              <td style={{ textAlign: 'center' }}><Avatar type="text" size="xs" shape="round" name="Millicent Bullstrode" /></td>
              <td style={{ textAlign: 'center' }}><Avatar type="icon" size="xs" shape="round" /></td>
              <td style={{ textAlign: 'center' }}><Avatar type="image" size="xs" shape="round" src={sampleImages.female} alt="User" /></td>
              <td style={{ textAlign: 'center' }}><Avatar type="text" size="xs" shape="square" name="Millicent Bullstrode"/></td>
              <td style={{ textAlign: 'center' }}><Avatar type="icon" size="xs" shape="square" /></td>
              <td style={{ textAlign: 'center' }}><Avatar type="image" size="xs" shape="square" src={sampleImages.female} alt="User" /></td>
            </tr>
          </tbody>
        </table>
      </Section>

      {/* Types */}
      <Section title="Types" description="Avatars can display an image, text initials, or an icon.">
        <div style={{ display: 'flex', gap: '48px', alignItems: 'flex-start' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ marginBottom: '12px', fontSize: '13px', fontWeight: 500 }}>Image</div>
            <Avatar type="image" size="lg" src={sampleImages.male} alt="John Doe" />
            <div style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>User photo</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ marginBottom: '12px', fontSize: '13px', fontWeight: 500 }}>Text</div>
            <Avatar type="text" size="lg" name="John Doe" />
            <div style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>Initials from name</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ marginBottom: '12px', fontSize: '13px', fontWeight: 500 }}>Icon</div>
            <Avatar type="icon" size="lg" />
            <div style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>Default user icon</div>
          </div>
        </div>
      </Section>

      {/* Sizes */}
      <Section title="Sizes" description="Four sizes available to fit different UI contexts.">
        <div style={{ display: 'flex', gap: '32px', alignItems: 'flex-end' }}>
          <div style={{ textAlign: 'center' }}>
            <Avatar type="text" size="lg" name="Large Size" />
            <div style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>lg (40px)</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Avatar type="text" size="md" name="Medium Size" />
            <div style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>md (32px)</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Avatar type="text" size="sm" name="Small" />
            <div style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>sm (24px)</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Avatar type="text" size="xs" name="XSmall" />
            <div style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>xs (16px)</div>
          </div>
        </div>
      </Section>

      {/* Shapes */}
      <Section title="Shapes" description="Round (circle) or square with rounded corners.">
        <div style={{ display: 'flex', gap: '48px', alignItems: 'flex-start' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ marginBottom: '12px', fontSize: '13px', fontWeight: 500 }}>Round</div>
            <div style={{ display: 'flex', gap: '16px' }}>
              <Avatar type="text" size="lg" shape="round" name="John Smith" />
              <Avatar type="icon" size="lg" shape="round" />
              <Avatar type="image" size="lg" shape="round" src={sampleImages.male} alt="User" />
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ marginBottom: '12px', fontSize: '13px', fontWeight: 500 }}>Square</div>
            <div style={{ display: 'flex', gap: '16px' }}>
              <Avatar type="text" size="lg" shape="square" name="Jon oe" />
              <Avatar type="icon" size="lg" shape="square" />
              <Avatar type="image" size="lg" shape="square" src={sampleImages.male} alt="User" />
            </div>
          </div>
        </div>
      </Section>

      {/* Auto Initials */}
      <Section title="Auto-generated Initials" description="Pass a name to automatically generate initials.">
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <Avatar type="text" size="md" name="John Dillinger" />
            <div style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>"John" → J</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Avatar type="text" size="md" name="John Doe" />
            <div style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>"John Doe" → JD</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Avatar type="text" size="md" name="John Middle Doe" />
            <div style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>"John Middle Doe" → JD</div>
          </div>
        </div>
      </Section>
         {/* With Badge */}
      <Section title="With Badge" description="Avatars can display a badge for status indicators or notification counts.">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {/* Dot badges */}
          <div>
            <div style={{ marginBottom: '12px', fontSize: '13px', fontWeight: 500 }}>Dot Badge (Status)</div>
            <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
              <Avatar type="image" size="lg" src={sampleImages.male} alt="User" badge={true} />
              <Avatar type="image" size="lg" src={sampleImages.female} alt="User" badge={{ type: 'dot', intent: 'success' }} />
              <Avatar type="image" size="lg" src={sampleImages.male} alt="User" badge={{ type: 'dot', intent: 'warning' }} />
              <Avatar type="image" size="lg" src={sampleImages.female} alt="User" badge={{ type: 'dot', intent: 'error' }} />
              <Avatar type="image" size="lg" src={sampleImages.male} alt="User" badge={{ type: 'dot', intent: 'neutral' }} />
            </div>
          </div>
          {/* Count badges */}
          <div>
            <div style={{ marginBottom: '12px', fontSize: '13px', fontWeight: 500 }}>Count Badge (Notifications)</div>
            <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
              <Avatar type="image" size="lg" src={sampleImages.male} alt="User" badge={{ type: 'count', count: 3 }} />
              <Avatar type="image" size="lg" src={sampleImages.female} alt="User" badge={{ type: 'count', count: 12, intent: 'error' }} />
              <Avatar type="image" size="lg" src={sampleImages.male} alt="User" badge={{ type: 'count', count: 99, intent: 'success' }} />
              <Avatar type="image" size="lg" src={sampleImages.female} alt="User" badge={{ type: 'count', count: 150, max: 99, intent: 'warning' }} />
            </div>
          </div>
          {/* Different sizes with badge */}
          <div>
            <div style={{ marginBottom: '12px', fontSize: '13px', fontWeight: 500 }}>Badges at Different Sizes</div>
            <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-end' }}>
              <Avatar type="text" size="lg" name="LG" badge={{ type: 'dot', intent: 'success' }} />
              <Avatar type="text" size="md" name="MD" badge={{ type: 'dot', intent: 'success' }} />
              <Avatar type="text" size="sm" name="SM" badge={{ type: 'dot', intent: 'success' }} />
              <Avatar type="text" size="xs" name="XS" badge={{ type: 'dot', intent: 'success' }} />
            </div>
          </div>
        </div>
      </Section>

          {/* Custom Colors */}
      <Section title="Custom Colors" description="Use className to override default colors with any Tailwind classes.">
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ textAlign: 'center' }}>
            <Avatar 
              type="text" 
              size="lg" 
              name="Abi Dabi" 
              className="bg-green-100 text-green-600 border-green-500"
            />
            <div style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>Green</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Avatar 
              type="text" 
              size="lg" 
              name="Cody Dabi" 
              className="bg-amber-100 text-amber-600 border-amber-500"
            />
            <div style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>Amber</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Avatar 
              type="text" 
              size="lg" 
              name="Eve Dabi" 
              className="bg-red-100 text-red-600 border-red-500"
            />
            <div style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>Red</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Avatar 
              type="text" 
              size="lg" 
              name="Gabe Habi" 
              className="bg-blue-100 text-blue-600 border-blue-500"
            />
            <div style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>Blue</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Avatar 
              type="text" 
              size="lg" 
              name="Ivy Jabi" 
              className="bg-pink-100 text-pink-600 border-pink-500"
            />
            <div style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>Pink</div>
          </div>
        </div>
      </Section>

      {/* Avatar Group Example */}
      <Section title="Avatar Stack" description="Avatars can be stacked to show multiple users.">
        <div style={{ display: 'flex' }}>
          <Avatar type="image" size="md" shape="round" src={sampleImages.male} alt="User 1" className="-mr-3 ring-2 ring-white" />
          <Avatar type="image" size="md" shape="round" src={sampleImages.female} alt="User 2" className="-mr-3 ring-2 ring-white" />
          <Avatar type="text" size="md" shape="round" name="JD" className="-mr-3 ring-2 ring-white" />
          <Avatar type="icon" size="md" shape="round" className="ring-2 ring-white" />
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
              <td style={{ padding: '12px 16px 12px 0', color: '#666' }}>'image' | 'text' | 'icon'</td>
              <td style={{ padding: '12px 16px 12px 0' }}><code>'icon'</code></td>
              <td style={{ padding: '12px 0', color: '#666' }}>Content type to display</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
              <td style={{ padding: '12px 16px 12px 0' }}><code>size</code></td>
              <td style={{ padding: '12px 16px 12px 0', color: '#666' }}>'xs' | 'sm' | 'md' | 'lg'</td>
              <td style={{ padding: '12px 16px 12px 0' }}><code>'md'</code></td>
              <td style={{ padding: '12px 0', color: '#666' }}>Avatar size</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
              <td style={{ padding: '12px 16px 12px 0' }}><code>shape</code></td>
              <td style={{ padding: '12px 16px 12px 0', color: '#666' }}>'round' | 'square'</td>
              <td style={{ padding: '12px 16px 12px 0' }}><code>'round'</code></td>
              <td style={{ padding: '12px 0', color: '#666' }}>Avatar shape</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
              <td style={{ padding: '12px 16px 12px 0' }}><code>src</code></td>
              <td style={{ padding: '12px 16px 12px 0', color: '#666' }}>string</td>
              <td style={{ padding: '12px 16px 12px 0' }}>-</td>
              <td style={{ padding: '12px 0', color: '#666' }}>Image URL (for type="image")</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
              <td style={{ padding: '12px 16px 12px 0' }}><code>alt</code></td>
              <td style={{ padding: '12px 16px 12px 0', color: '#666' }}>string</td>
              <td style={{ padding: '12px 16px 12px 0' }}>-</td>
              <td style={{ padding: '12px 0', color: '#666' }}>Alt text for image</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
              <td style={{ padding: '12px 16px 12px 0' }}><code>initials</code></td>
              <td style={{ padding: '12px 16px 12px 0', color: '#666' }}>string</td>
              <td style={{ padding: '12px 16px 12px 0' }}>-</td>
              <td style={{ padding: '12px 0', color: '#666' }}>Text initials (for type="text")</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
              <td style={{ padding: '12px 16px 12px 0' }}><code>name</code></td>
              <td style={{ padding: '12px 16px 12px 0', color: '#666' }}>string</td>
              <td style={{ padding: '12px 16px 12px 0' }}>-</td>
              <td style={{ padding: '12px 0', color: '#666' }}>User name (auto-generates initials)</td>
            </tr>
            <tr>
              <td style={{ padding: '12px 16px 12px 0' }}><code>icon</code></td>
              <td style={{ padding: '12px 16px 12px 0', color: '#666' }}>ReactNode</td>
              <td style={{ padding: '12px 16px 12px 0' }}>User icon</td>
              <td style={{ padding: '12px 0', color: '#666' }}>Custom icon (for type="icon")</td>
            </tr>
          </tbody>
        </table>
      </Section>
    </div>
  ),
};