import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Pagination } from './Pagination';
import { StoryPage, StoryHeader, Section } from '../../stories/StoryComponents';

const meta: Meta<typeof Pagination> = {
  title: 'Components/Pagination',
  component: Pagination,
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof meta>;

function Demo({
  label,
  description,
  initialPage = 1,
  totalPages = 10,
  initialPageSize = 10,
  hidePageSize = false,
}: {
  label: string;
  description?: string;
  initialPage?: number;
  totalPages?: number;
  initialPageSize?: number;
  hidePageSize?: boolean;
}) {
  const [page, setPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--atom-text-primary)' }}>{label}</div>
      {description && (
        <div style={{ fontSize: 13, color: 'var(--atom-text-tertiary)' }}>{description}</div>
      )}
      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
        pageSize={pageSize}
        onPageSizeChange={setPageSize}
        hidePageSize={hidePageSize}
      />
      <div style={{ fontSize: 12, color: 'var(--atom-text-tertiary)' }}>
        Page {page} of {totalPages} · {pageSize} per page
      </div>
    </div>
  );
}

export const Documentation: Story = {
  render: () => (
    <StoryPage>
      <StoryHeader
        title="Pagination"
        description="Navigation controls for paged data. Combines previous/next arrows, a page number range, and an optional page size selector. Used as a standalone component and composed inside Table."
      />

      <Section title="Page range" description="The visible page window adapts as you navigate. Click through to see it shift.">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          <Demo label="Start — page 1" initialPage={1} totalPages={10} />
          <Demo label="Middle — page 5" initialPage={5} totalPages={10} />
          <Demo label="End — page 10" initialPage={10} totalPages={10} />
          <Demo label="Few pages — no ellipsis" initialPage={3} totalPages={6} />
          <Demo label="Large set — 50 pages" initialPage={24} totalPages={50} />
        </div>
      </Section>

      <Section title="Page size selector" description="Changing page size fires onPageSizeChange. The component stays uncontrolled for page state.">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          <Demo label="Default options (10 / 20 / 50 / 100)" initialPage={1} initialPageSize={10} />
          <Demo label="hidePageSize — nav only" initialPage={1} hidePageSize />
        </div>
      </Section>

      <Section title="Edge cases">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          <Demo label="Single page" initialPage={1} totalPages={1} />
          <Demo label="Two pages" initialPage={1} totalPages={2} />
          <Demo label="Seven pages — boundary before ellipsis appears" initialPage={4} totalPages={7} />
        </div>
      </Section>
    </StoryPage>
  ),
};
