import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Trash } from '@phosphor-icons/react';
import { Dialog } from './Dialog';
import { Button } from '../Button/Button';
import { TextField } from '../Input';
import { StoryPage, StoryHeader, Section, Row } from '../../stories/StoryComponents';

const meta: Meta<typeof Dialog> = {
  title: 'Components/Dialog',
  component: Dialog,
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Helpers ────────────────────────────────────────────────────────────────

function Demo({
  label,
  description: desc,
  dialogTitle,
  dialogDescription,
  size,
  children,
  actions,
  footer,
  showClose,
  closeOnBackdrop,
}: {
  label: string;
  description?: string;
  dialogTitle: string;
  dialogDescription?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  children?: React.ReactNode;
  actions?: React.ComponentProps<typeof Dialog>['actions'];
  footer?: React.ReactNode;
  showClose?: boolean;
  closeOnBackdrop?: boolean;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--atom-text-primary)' }}>{label}</div>
      {desc && <div style={{ fontSize: 13, color: 'var(--atom-text-tertiary)', marginTop: -4 }}>{desc}</div>}
      <div>
        <Button variant="outline" size="md" onClick={() => setOpen(true)}>
          Open dialog
        </Button>
      </div>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        title={dialogTitle}
        description={dialogDescription}
        size={size}
        actions={actions}
        footer={footer}
        showClose={showClose}
        closeOnBackdrop={closeOnBackdrop}
      >
        {children}
      </Dialog>
    </div>
  );
}

// ─── Story ──────────────────────────────────────────────────────────────────

export const Documentation: Story = {
  render: () => (
    <StoryPage>
      <StoryHeader
        title="Dialog"
        description="A modal dialog that interrupts the user with critical information or a required decision. Traps focus, closes on Escape, and optionally on backdrop click."
      />

      <Section title="Anatomy" description="Header (title + description + close), scrollable body, footer (actions or custom slot).">
        <Demo
          label="Full anatomy"
          dialogTitle="Dialog title"
          dialogDescription="Supporting text that gives the user a little more context about what this dialog is asking them to do."
          size="md"
          actions={[
            { label: 'Cancel', variant: 'outline', onClick: () => {} },
            { label: 'Confirm', variant: 'primary', onClick: () => {} },
          ]}
        >
          <p style={{ margin: 0 }}>
            This is the body of the dialog. You can put any content here — forms, lists, rich
            text, or composed components. The body scrolls independently if it overflows.
          </p>
        </Demo>
      </Section>

      <Section title="Sizes" description="Four widths to suit different content densities.">
        <Row label="">
          {(['sm', 'md', 'lg', 'xl'] as const).map((s) => (
            <Demo
              key={s}
              label={`size="${s}"`}
              dialogTitle={`${s.toUpperCase()} dialog`}
              dialogDescription={`Max-width: ${{ sm: 400, md: 520, lg: 640, xl: 800 }[s]}px`}
              size={s}
              actions={[
                { label: 'Cancel', variant: 'outline', onClick: () => {} },
                { label: 'OK', variant: 'primary', onClick: () => {} },
              ]}
            >
              <p style={{ margin: 0 }}>Body content for the {s} dialog.</p>
            </Demo>
          ))}
        </Row>
      </Section>

      <Section title="Common patterns">

        {/* Confirmation */}
        <div style={{ marginBottom: 32 }}>
          <ConfirmationDemo />
        </div>

        {/* Form */}
        <div style={{ marginBottom: 32 }}>
          <FormDemo />
        </div>

        {/* Info / no footer */}
        <Demo
          label="Informational — no footer"
          dialogTitle="How pagination works"
          dialogDescription="Read-only information that doesn't require an action."
          size="sm"
        >
          <p style={{ margin: 0 }}>
            Pagination splits large data sets into pages so the interface stays responsive.
            Use the page size selector to control how many rows appear per page.
          </p>
        </Demo>
      </Section>

      <Section title="Behaviour options">
        <Row label="">
          <Demo
            label="closeOnBackdrop={false}"
            description="Clicking outside the panel does not close it"
            dialogTitle="Sticky dialog"
            dialogDescription="You must use the button or Escape to close this one."
            closeOnBackdrop={false}
            actions={[{ label: 'Got it', variant: 'primary', onClick: () => {} }]}
          >
            <p style={{ margin: 0 }}>The backdrop click is disabled.</p>
          </Demo>

          <Demo
            label="showClose={false}"
            description="No × button in the header"
            dialogTitle="No close button"
            showClose={false}
            actions={[
              { label: 'Cancel', variant: 'outline', onClick: () => {} },
              { label: 'Confirm', variant: 'primary', onClick: () => {} },
            ]}
          >
            <p style={{ margin: 0 }}>The header × is hidden.</p>
          </Demo>
        </Row>
      </Section>

      <Section title="Custom footer" description="Pass footer={<ReactNode>} to replace the action buttons entirely.">
        <Demo
          label="Custom footer slot"
          dialogTitle="Custom footer"
          footer={
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
              <span style={{ fontSize: 13, color: 'var(--atom-text-tertiary)' }}>Last saved 2 min ago</span>
              <div style={{ display: 'flex', gap: 8 }}>
                <Button variant="outline" size="md" onClick={() => {}}>Discard</Button>
                <Button variant="primary" size="md" onClick={() => {}}>Save changes</Button>
              </div>
            </div>
          }
        >
          <p style={{ margin: 0 }}>The footer slot accepts any ReactNode, giving you full control over layout and actions.</p>
        </Demo>
      </Section>

      <Section title="Scrolling body" description="The body scrolls independently when content exceeds 85vh.">
        <Demo
          label="Long content"
          dialogTitle="Terms and conditions"
          size="md"
          actions={[
            { label: 'Decline', variant: 'outline', onClick: () => {} },
            { label: 'Accept', variant: 'primary', onClick: () => {} },
          ]}
        >
          {Array.from({ length: 20 }, (_, i) => (
            <p key={i} style={{ margin: '0 0 12px' }}>
              Paragraph {i + 1}: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Pellentesque habitant morbi tristique senectus et netus et malesuada fames.
            </p>
          ))}
        </Demo>
      </Section>

    </StoryPage>
  ),
};

// ─── Pattern components ──────────────────────────────────────────────────────

function ConfirmationDemo() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 1500);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--atom-text-primary)' }}>Destructive confirmation</div>
      <div style={{ fontSize: 13, color: 'var(--atom-text-tertiary)' }}>
        High-stakes action with a loading state on confirm
      </div>
      <div>
        <Button variant="destructive" size="md" iconStart={<Trash size={16} />} onClick={() => setOpen(true)}>
          Delete account
        </Button>
      </div>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        title="Delete account"
        description="This action cannot be undone. All your data will be permanently removed."
        size="sm"
        actions={[
          { label: 'Cancel', variant: 'outline', onClick: () => setOpen(false) },
          { label: 'Delete', variant: 'destructive', onClick: handleDelete, loading },
        ]}
      />
    </div>
  );
}

function FormDemo() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--atom-text-primary)' }}>Form dialog</div>
      <div style={{ fontSize: 13, color: 'var(--atom-text-tertiary)' }}>
        Body contains form fields; footer has the submit action
      </div>
      <div>
        <Button variant="primary" size="md" onClick={() => setOpen(true)}>
          Invite member
        </Button>
      </div>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        title="Invite team member"
        description="They'll receive an email with a link to join your workspace."
        size="sm"
        actions={[
          { label: 'Cancel', variant: 'outline', onClick: () => setOpen(false) },
          { label: 'Send invite', variant: 'primary', onClick: () => setOpen(false), disabled: !name || !email },
        ]}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <TextField
            label="Full name"
            placeholder="Jane Smith"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Email address"
            placeholder="jane@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </Dialog>
    </div>
  );
}
