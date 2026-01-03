import type { Meta, StoryObj } from '@storybook/react';
import { Upload, Trash, CloudCheck } from '@phosphor-icons/react';
import { Alert } from './Alert';

const meta: Meta<typeof Alert> = {
  title: 'Components/Alert',
  component: Alert,
  parameters: {
    layout: 'fullscreen',
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
  render: () => (
    <div style={{ padding: '40px', maxWidth: '900px', fontFamily: 'system-ui, sans-serif' }}>
      {/* Header */}
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '8px' }}>Alert</h1>
        <p style={{ fontSize: '16px', color: '#666' }}>
          The Alert component displays important messages, confirmations, and notifications. It supports multiple intents, orientations, and can include buttons for user actions.
        </p>
      </div>

      {/* Overview */}
      <Section title="Overview" description="All alert intents in vertical orientation.">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '450px' }}>
          <Alert 
            intent="default" 
            title="Information" 
            description="This is a default alert with some helpful information."
          />
          <Alert 
            intent="success" 
            title="Success" 
            description="Your changes have been saved successfully."
          />
          <Alert 
            intent="warning" 
            title="Warning" 
            description="Please review your input before continuing."
          />
          <Alert 
            intent="error" 
            title="Error" 
            description="Something went wrong. Please try again."
          />
        </div>
      </Section>

      {/* Intents */}
      <Section title="Intents" description="Alerts have four intent types to communicate different message severities.">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <div style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 500 }}>Default</div>
            <div style={{ fontSize: '13px', color: '#666', marginBottom: '12px' }}>For general information and neutral messages.</div>
            <div style={{ maxWidth: '450px' }}>
              <Alert intent="default" title="New feature available" description="Check out the new dashboard with improved analytics." />
            </div>
          </div>
          <div>
            <div style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 500 }}>Success</div>
            <div style={{ fontSize: '13px', color: '#666', marginBottom: '12px' }}>For successful operations and positive confirmations.</div>
            <div style={{ maxWidth: '450px' }}>
              <Alert intent="success" title="Upload complete" description="All 1,234 files have been uploaded successfully." />
            </div>
          </div>
          <div>
            <div style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 500 }}>Warning</div>
            <div style={{ fontSize: '13px', color: '#666', marginBottom: '12px' }}>For cautionary messages that need attention.</div>
            <div style={{ maxWidth: '450px' }}>
              <Alert intent="warning" title="Storage almost full" description="You're using 90% of your storage. Consider upgrading your plan." />
            </div>
          </div>
          <div>
            <div style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 500 }}>Error</div>
            <div style={{ fontSize: '13px', color: '#666', marginBottom: '12px' }}>For error messages and critical issues.</div>
            <div style={{ maxWidth: '450px' }}>
              <Alert intent="error" title="Connection failed" description="Unable to connect to the server. Please check your internet connection." />
            </div>
          </div>
        </div>
      </Section>

      {/* Orientation */}
      <Section title="Orientation" description="Alerts can be displayed vertically (stacked) or horizontally (inline).">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <div style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 500 }}>Vertical (Default)</div>
            <div style={{ maxWidth: '450px' }}>
              <Alert 
                intent="success" 
                orientation="vertical"
                title="1000 contacts uploaded" 
                description="Your contacts are now available in the address book."
                cancelLabel="Revert"
                confirmLabel="Close"
              />
            </div>
          </div>
          <div>
            <div style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 500 }}>Horizontal</div>
            <Alert 
              intent="success" 
              orientation="horizontal"
              title="1000 contacts uploaded" 
              description="Your contacts are now available in the address book."
              cancelLabel="Revert"
              confirmLabel="Close"
            />
          </div>
        </div>
      </Section>

      {/* With Buttons */}
      <Section title="With Buttons" description="Alerts can include action buttons for user decisions.">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <div style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 500 }}>Confirm & Cancel</div>
            <div style={{ maxWidth: '450px' }}>
              <Alert 
                intent="default" 
                title="Confirm your action" 
                description="Are you sure you want to proceed with this operation?"
                cancelLabel="Cancel"
                confirmLabel="Confirm"
              />
            </div>
          </div>
          <div>
            <div style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 500 }}>Destructive Action</div>
            <div style={{ maxWidth: '450px' }}>
              <Alert 
                intent="error" 
                title="Delete this item?" 
                description="This action cannot be undone. All associated data will be permanently removed."
                cancelLabel="Cancel"
                confirmLabel="Delete"
              />
            </div>
          </div>
          <div>
            <div style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 500 }}>Single Button</div>
            <div style={{ maxWidth: '450px' }}>
              <Alert 
                intent="success" 
                title="Payment successful" 
                description="Your order #12345 has been confirmed."
                confirmLabel="View Order"
              />
            </div>
          </div>
        </div>
      </Section>

      {/* With Timer */}
      <Section title="With Timer" description="Alerts can auto-dismiss after a set time. A progress bar shows remaining time. Hover to pause.">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <div style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 500 }}>Auto-dismiss in 10 seconds (hover to pause)</div>
            <div style={{ maxWidth: '450px' }}>
              <Alert 
                intent="success" 
                title="1000 contacts uploaded" 
                description="Changes will be applied automatically."
                timer={10}
                cancelLabel="Revert"
              />
            </div>
          </div>
        </div>
      </Section>

      {/* Closable */}
      <Section title="Closable" description="Alerts can have a close button for manual dismissal.">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '450px' }}>
          <Alert 
            intent="default" 
            title="Tip of the day" 
            description="Press Ctrl+K to open the command palette."
            closable
          />
          <Alert 
            intent="warning" 
            orientation="horizontal"
            title="Your session will expire soon" 
            closable
          />
        </div>
      </Section>

      {/* Custom Icon */}
      <Section title="Custom Icon" description="Override the default icon with a custom one.">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '450px' }}>
          <Alert 
            intent="success" 
            title="Backup complete" 
            description="Your data has been securely backed up to the cloud."
            icon={<CloudCheck size={24} />}
          />
          <Alert 
            intent="default" 
            title="File uploaded" 
            description="document.pdf has been added to your files."
            icon={<Upload size={24} />}
          />
        </div>
      </Section>

      {/* Custom Children */}
      <Section title="Custom Content" description="Pass custom content as children for complete flexibility.">
        <div style={{ maxWidth: '450px' }}>
          <Alert intent="warning" title="Items to review">
            <ul style={{ margin: '8px 0 0 0', paddingLeft: '20px' }}>
              <li>3 items require approval</li>
              <li>2 items have conflicts</li>
              <li>1 item is missing data</li>
            </ul>
          </Alert>
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
              <td style={{ padding: '12px 16px 12px 0' }}><code>intent</code></td>
              <td style={{ padding: '12px 16px 12px 0', color: '#666' }}>'default' | 'success' | 'warning' | 'error'</td>
              <td style={{ padding: '12px 16px 12px 0' }}><code>'default'</code></td>
              <td style={{ padding: '12px 0', color: '#666' }}>Color scheme of the alert</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
              <td style={{ padding: '12px 16px 12px 0' }}><code>orientation</code></td>
              <td style={{ padding: '12px 16px 12px 0', color: '#666' }}>'vertical' | 'horizontal'</td>
              <td style={{ padding: '12px 16px 12px 0' }}><code>'vertical'</code></td>
              <td style={{ padding: '12px 0', color: '#666' }}>Layout direction</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
              <td style={{ padding: '12px 16px 12px 0' }}><code>title</code></td>
              <td style={{ padding: '12px 16px 12px 0', color: '#666' }}>string</td>
              <td style={{ padding: '12px 16px 12px 0' }}>required</td>
              <td style={{ padding: '12px 0', color: '#666' }}>Alert title</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
              <td style={{ padding: '12px 16px 12px 0' }}><code>description</code></td>
              <td style={{ padding: '12px 16px 12px 0', color: '#666' }}>string</td>
              <td style={{ padding: '12px 16px 12px 0' }}>-</td>
              <td style={{ padding: '12px 0', color: '#666' }}>Alert description text</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
              <td style={{ padding: '12px 16px 12px 0' }}><code>children</code></td>
              <td style={{ padding: '12px 16px 12px 0', color: '#666' }}>ReactNode</td>
              <td style={{ padding: '12px 16px 12px 0' }}>-</td>
              <td style={{ padding: '12px 0', color: '#666' }}>Custom content</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
              <td style={{ padding: '12px 16px 12px 0' }}><code>icon</code></td>
              <td style={{ padding: '12px 16px 12px 0', color: '#666' }}>ReactNode</td>
              <td style={{ padding: '12px 16px 12px 0' }}>Auto</td>
              <td style={{ padding: '12px 0', color: '#666' }}>Custom icon (auto-selects based on intent)</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
              <td style={{ padding: '12px 16px 12px 0' }}><code>showIcon</code></td>
              <td style={{ padding: '12px 16px 12px 0', color: '#666' }}>boolean</td>
              <td style={{ padding: '12px 16px 12px 0' }}><code>true</code></td>
              <td style={{ padding: '12px 0', color: '#666' }}>Show or hide the icon</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
              <td style={{ padding: '12px 16px 12px 0' }}><code>closable</code></td>
              <td style={{ padding: '12px 16px 12px 0', color: '#666' }}>boolean</td>
              <td style={{ padding: '12px 16px 12px 0' }}><code>false</code></td>
              <td style={{ padding: '12px 0', color: '#666' }}>Show X close button</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
              <td style={{ padding: '12px 16px 12px 0' }}><code>onClose</code></td>
              <td style={{ padding: '12px 16px 12px 0', color: '#666' }}>() =&gt; void</td>
              <td style={{ padding: '12px 16px 12px 0' }}>-</td>
              <td style={{ padding: '12px 0', color: '#666' }}>Called when closed</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
              <td style={{ padding: '12px 16px 12px 0' }}><code>timer</code></td>
              <td style={{ padding: '12px 16px 12px 0', color: '#666' }}>number</td>
              <td style={{ padding: '12px 16px 12px 0' }}>-</td>
              <td style={{ padding: '12px 0', color: '#666' }}>Auto-dismiss after X seconds</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
              <td style={{ padding: '12px 16px 12px 0' }}><code>cancelLabel</code></td>
              <td style={{ padding: '12px 16px 12px 0', color: '#666' }}>string</td>
              <td style={{ padding: '12px 16px 12px 0' }}>-</td>
              <td style={{ padding: '12px 0', color: '#666' }}>Secondary button text</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
              <td style={{ padding: '12px 16px 12px 0' }}><code>onCancel</code></td>
              <td style={{ padding: '12px 16px 12px 0', color: '#666' }}>() =&gt; void</td>
              <td style={{ padding: '12px 16px 12px 0' }}>-</td>
              <td style={{ padding: '12px 0', color: '#666' }}>Secondary button callback</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
              <td style={{ padding: '12px 16px 12px 0' }}><code>confirmLabel</code></td>
              <td style={{ padding: '12px 16px 12px 0', color: '#666' }}>string</td>
              <td style={{ padding: '12px 16px 12px 0' }}>-</td>
              <td style={{ padding: '12px 0', color: '#666' }}>Primary button text</td>
            </tr>
            <tr>
              <td style={{ padding: '12px 16px 12px 0' }}><code>onConfirm</code></td>
              <td style={{ padding: '12px 16px 12px 0', color: '#666' }}>() =&gt; void</td>
              <td style={{ padding: '12px 16px 12px 0' }}>-</td>
              <td style={{ padding: '12px 0', color: '#666' }}>Primary button callback</td>
            </tr>
          </tbody>
        </table>
      </Section>
    </div>
  ),
};
