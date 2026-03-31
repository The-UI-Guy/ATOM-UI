import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Upload, CloudCheck } from '@phosphor-icons/react';
import { Alert } from './Alert';
import { Button } from '../Button';
import type { AlertPosition, AlertIntent } from './Alert.types';
import { StoryPage, StoryHeader, Section, PropsTable } from '../../stories/StoryComponents';

const meta: Meta<typeof Alert> = {
  title: 'Components/Alert',
  component: Alert,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Interactive Position Demo Component - Standalone full-page version
const PositionDemoFullPage = () => {
  const [alerts, setAlerts] = useState<{ id: number; position: AlertPosition; intent: AlertIntent }[]>([]);

  const showAlert = (position: AlertPosition) => {
    const intents: AlertIntent[] = ['default', 'success', 'warning', 'error'];
    const randomIntent = intents[Math.floor(Math.random() * intents.length)];

    setAlerts(prev => [...prev, { id: Date.now(), position, intent: randomIntent }]);
  };

  const removeAlert = (id: number) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--atom-surface-2)',
      padding: '24px'
    }}>
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '8px' }}>Position Demo</h2>
        <p style={{ fontSize: '14px', color: 'var(--atom-text-secondary)' }}>
          Click a button to show an alert in that corner. Alerts auto-dismiss after 5 seconds.
        </p>
      </div>

      {/* Button Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '16px',
        maxWidth: '300px',
      }}>
        <Button variant="outline" onClick={() => showAlert('top-left')}>
          Top Left
        </Button>
        <Button variant="outline" onClick={() => showAlert('top-right')}>
          Top Right
        </Button>
        <Button variant="outline" onClick={() => showAlert('bottom-left')}>
          Bottom Left
        </Button>
        <Button variant="outline" onClick={() => showAlert('bottom-right')}>
          Bottom Right
        </Button>
      </div>

      {/* Render positioned alerts */}
      {alerts.map(alert => (
        <Alert
          key={alert.id}
          intent={alert.intent}
          position={alert.position}
          title={`Alert: ${alert.position}`}
          description="This alert will auto-dismiss in 5 seconds."
          timer={5}
          closable
          onClose={() => removeAlert(alert.id)}
        />
      ))}
    </div>
  );
};

export const Documentation: Story = {
  render: () => (
    <StoryPage>
      <StoryHeader
        title="Alert"
        description="The Alert component displays important messages, confirmations, and notifications. It supports multiple intents, orientations, positions, and can include buttons for user actions."
      />

      {/* Position Demo Note */}
      <Section title="Position Demo" description="See the 'Position Demo' story in the sidebar to test alerts appearing in screen corners.">
        <p style={{ fontSize: '14px', color: 'var(--atom-text-secondary)' }}>
          The position prop allows alerts to be fixed to viewport corners: <code>top-left</code>, <code>top-right</code>, <code>bottom-left</code>, <code>bottom-right</code>.
        </p>
      </Section>

      {/* Overview */}
      <Section title="Overview" description="All alert intents with action buttons.">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '450px' }}>
          <Alert
            intent="default"
            title="Information"
            description="This is a default alert with some helpful information."
            cancelLabel="Dismiss"
            confirmLabel="Learn More"
          />
          <Alert
            intent="success"
            title="Success"
            description="Your changes have been saved successfully."
            cancelLabel="Undo"
            confirmLabel="View Changes"
          />
          <Alert
            intent="warning"
            title="Warning"
            description="Please review your input before continuing."
            cancelLabel="Cancel"
            confirmLabel="Continue"
          />
          <Alert
            intent="error"
            title="Error"
            description="Something went wrong. Please try again."
            cancelLabel="Cancel"
            confirmLabel="Retry"
          />
        </div>
      </Section>

      {/* Intents */}
      <Section title="Intents" description="Alerts have four intent types to communicate different message severities. Each shown in vertical and horizontal orientation.">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          <div>
            <div style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 500 }}>Default</div>
            <div style={{ fontSize: '13px', color: 'var(--atom-text-secondary)', marginBottom: '12px' }}>For general information and neutral messages.</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ maxWidth: '450px' }}>
                <Alert intent="default" title="New feature available" description="Check out the new dashboard with improved analytics." />
              </div>
              <Alert intent="default" orientation="horizontal" title="New feature available" description="Check out the new dashboard." />
            </div>
          </div>
          <div>
            <div style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 500 }}>Success</div>
            <div style={{ fontSize: '13px', color: 'var(--atom-text-secondary)', marginBottom: '12px' }}>For successful operations and positive confirmations.</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ maxWidth: '450px' }}>
                <Alert intent="success" title="Upload complete" description="All 1,234 files have been uploaded successfully." />
              </div>
              <Alert intent="success" orientation="horizontal" title="Upload complete" description="All 1,234 files uploaded." />
            </div>
          </div>
          <div>
            <div style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 500 }}>Warning</div>
            <div style={{ fontSize: '13px', color: 'var(--atom-text-secondary)', marginBottom: '12px' }}>For cautionary messages that need attention.</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ maxWidth: '450px' }}>
                <Alert intent="warning" title="Storage almost full" description="You're using 90% of your storage. Consider upgrading your plan." />
              </div>
              <Alert intent="warning" orientation="horizontal" title="Storage almost full" description="You're using 90% of your storage." />
            </div>
          </div>
          <div>
            <div style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 500 }}>Error</div>
            <div style={{ fontSize: '13px', color: 'var(--atom-text-secondary)', marginBottom: '12px' }}>For error messages and critical issues.</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ maxWidth: '450px' }}>
                <Alert intent="error" title="Connection failed" description="Unable to connect to the server. Please check your internet connection." />
              </div>
              <Alert intent="error" orientation="horizontal" title="Connection failed" description="Unable to connect to the server." />
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
            <div style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 500 }}>Timer animation (looping demo - hover to pause)</div>
            <div style={{ maxWidth: '450px' }}>
              <Alert
                intent="success"
                title="1000 contacts uploaded"
                description="Changes will be applied automatically."
                timer={5}
                loopTimer
                cancelLabel="Revert"
                confirmLabel="View"
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
        <PropsTable rows={[
          ['intent', "'default' | 'success' | 'warning' | 'error'", "'default'", 'Color scheme of the alert'],
          ['orientation', "'vertical' | 'horizontal'", "'vertical'", 'Layout direction'],
          ['position', "'inline' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'", "'inline'", 'Where to display the alert'],
          ['title', 'string', 'required', 'Alert title'],
          ['description', 'string', '-', 'Alert description text'],
          ['children', 'ReactNode', '-', 'Custom content'],
          ['icon', 'ReactNode', 'Auto', 'Custom icon (auto-selects based on intent)'],
          ['showIcon', 'boolean', 'true', 'Show or hide the icon'],
          ['closable', 'boolean', 'false', 'Show X close button'],
          ['onClose', '() => void', '-', 'Called when closed'],
          ['timer', 'number', '-', 'Auto-dismiss after X seconds'],
          ['cancelLabel', 'string', '-', 'Secondary button text'],
          ['onCancel', '() => void', '-', 'Secondary button callback'],
          ['confirmLabel', 'string', '-', 'Primary button text'],
          ['onConfirm', '() => void', '-', 'Primary button callback'],
        ]} />
      </Section>
    </StoryPage>
  ),
};

// Separate full-page story for Position Demo
export const PositionDemo: Story = {
  parameters: {
    layout: 'fullscreen',
  },
  render: () => <PositionDemoFullPage />,
};
