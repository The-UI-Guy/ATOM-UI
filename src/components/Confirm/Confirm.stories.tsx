import type { Meta, StoryObj } from '@storybook/react';
import { Trash } from '@phosphor-icons/react';
import { Confirm } from './Confirm';
import { Button } from '../Button/Button';
import { StoryPage, StoryHeader, Section, Row } from '../../stories/StoryComponents';

const meta: Meta<typeof Confirm> = {
  title: 'Components/Confirm',
  component: Confirm,
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Documentation: Story = {
  render: () => (
    <StoryPage>
      <StoryHeader
        title="Confirm"
        description="A small popover that asks the user to confirm a destructive or irreversible action before it executes."
      />

      <Section title="Positions">
        <div style={{ display: 'flex', gap: 48, flexWrap: 'wrap', paddingTop: 80, paddingBottom: 80 }}>
          <Confirm
            trigger={<Button variant="outline" size="sm">Top (default)</Button>}
            title="Delete item"
            description="This action cannot be undone."
            position="top"
            onConfirm={() => {}}
          />

          <Confirm
            trigger={<Button variant="outline" size="sm">Bottom</Button>}
            title="Delete item"
            description="This action cannot be undone."
            position="bottom"
            onConfirm={() => {}}
          />

          <Confirm
            trigger={<Button variant="outline" size="sm">Left</Button>}
            title="Delete item"
            description="This action cannot be undone."
            position="left"
            onConfirm={() => {}}
          />

          <Confirm
            trigger={<Button variant="outline" size="sm">Right</Button>}
            title="Delete item"
            description="This action cannot be undone."
            position="right"
            onConfirm={() => {}}
          />
        </div>
      </Section>

      <Section title="Custom labels">
        <Row>
          <Confirm
            trigger={
              <Button variant="destructive" size="sm" iconStart={<Trash size={14} />}>
                Remove
              </Button>
            }
            title="Remove member"
            description="They will lose access to this workspace."
            confirmLabel="Remove"
            cancelLabel="Keep"
            onConfirm={() => {}}
          />
        </Row>
      </Section>

      <Section title="Title only">
        <Row>
          <Confirm
            trigger={<Button variant="outline" size="sm">Delete</Button>}
            title="Are you sure?"
            onConfirm={() => {}}
          />
        </Row>
      </Section>
    </StoryPage>
  ),
};
