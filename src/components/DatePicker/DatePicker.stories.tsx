import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DatePicker } from './DatePicker';
import { StoryPage, StoryHeader, Section, PropsTable } from '../../stories/StoryComponents';

const meta: Meta<typeof DatePicker> = {
  title: 'Components/DatePicker',
  component: DatePicker,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const formatDate = (d: Date | null | undefined) =>
  d ? d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : '—';

const SingleDemo = () => {
  const [value, setValue] = useState<Date | null>(null);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 16 }}>
      <DatePicker value={value} onChange={setValue} />
      <p style={{ margin: 0, fontSize: 13, color: 'var(--atom-text-tertiary)', fontFamily: 'Inter, sans-serif' }}>
        Selected: <span style={{ color: 'var(--atom-text-primary)', fontWeight: 500 }}>{formatDate(value)}</span>
      </p>
    </div>
  );
};

const RangeDemo = () => {
  const [start, setStart] = useState<Date | null>(null);
  const [end, setEnd] = useState<Date | null>(null);
  const handleRangeChange = (s: Date | null, e: Date | null) => {
    setStart(s);
    setEnd(e);
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 16 }}>
      <DatePicker variant="range" startDate={start} endDate={end} onRangeChange={handleRangeChange} />
      <p style={{ margin: 0, fontSize: 13, color: 'var(--atom-text-tertiary)', fontFamily: 'Inter, sans-serif' }}>
        {end
          ? <>Range: <span style={{ color: 'var(--atom-text-primary)', fontWeight: 500 }}>{formatDate(start)} → {formatDate(end)}</span></>
          : start
          ? <>Start: <span style={{ color: 'var(--atom-text-primary)', fontWeight: 500 }}>{formatDate(start)}</span> — pick an end date</>
          : 'Click a start date, then an end date'}
      </p>
    </div>
  );
};

export const Documentation: Story = {
  parameters: { layout: 'fullscreen' },
  render: () => (
    <StoryPage>
      <StoryHeader
        title="Date Picker"
        description="A calendar-based date picker supporting single date selection and date range selection across two months."
      />

      <Section
        title="Single"
        description="Pick a single date. Click a day to select it; click again to change selection. Use the month/year buttons to navigate via PopMenu dropdowns."
      >
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <SingleDemo />
        </div>
      </Section>

      <Section
        title="Range"
        description="Pick a date range across two months. Click a start date, then an end date. Hover previews the span. Click anywhere to start a new range."
      >
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <RangeDemo />
        </div>
      </Section>

      <Section title="API Reference">
        <PropsTable rows={[
          ['variant', "'single' | 'range'", "'single'", 'Single date or range selection'],
          ['value', 'Date | null', '—', 'Selected date (single mode)'],
          ['startDate', 'Date | null', '—', 'Range start (range mode)'],
          ['endDate', 'Date | null', '—', 'Range end — null while selecting (range mode)'],
          ['onChange', '(date: Date) => void', '—', 'Called on day click (single mode)'],
          ['onRangeChange', '(start, end) => void', '—', 'Called on range change; end is null while selecting'],
          ['className', 'string', "''", 'Additional CSS classes on the root element'],
        ]} />
      </Section>
    </StoryPage>
  ),
};
