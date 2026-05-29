import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Trash, Copy } from '@phosphor-icons/react';
import { Table } from './Table';
import { Avatar } from '../Avatar/Avatar';
import { Tag } from '../Tag/Tag';
import { PopMenu } from '../PopMenu/PopMenu';
import { ListItem } from '../Listitem/ListItem';
import { Divider } from '../Divider/Divider';
import { StoryPage, StoryHeader, Section } from '../../stories/StoryComponents';

const meta: Meta = {
  title: 'Components/Table',
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj<typeof meta>;

// ─── Sample data ──────────────────────────────────────────────────────────────

type Person = {
  id: number;
  name: string;
  avatar: string;
  role: string;
  status: 'active' | 'away' | 'offline';
  birthday: string;
};

const PEOPLE: Person[] = [
  { id: 1,  name: 'Jenna Marbles',      avatar: '',  role: 'Product Owner',      status: 'active',  birthday: '21/11/1991' },
  { id: 2,  name: 'Jennifer Jillikers', avatar: '',  role: 'UI Designer',         status: 'away',    birthday: '22/03/2003' },
  { id: 3,  name: 'Harry Bently',       avatar: '',  role: 'Junior Developer',    status: 'active',  birthday: '21/04/1987' },
  { id: 4,  name: 'Junior Javed',       avatar: '',  role: 'Senior Developer',    status: 'offline', birthday: '15/06/1995' },
  { id: 5,  name: 'Muhammad Asad',      avatar: '',  role: 'UX Designer',         status: 'away',    birthday: '13/04/2001' },
  { id: 6,  name: 'Benjamin Broughton', avatar: '',  role: 'UI Designer',         status: 'active',  birthday: '18/09/1999' },
  { id: 7,  name: 'Daniel James',       avatar: '',  role: 'Product Owner',       status: 'active',  birthday: '21/07/1994' },
  { id: 8,  name: 'Julia Abdu',         avatar: '',  role: 'Product Manager',     status: 'away',    birthday: '13/04/2006' },
  { id: 9,  name: 'Sally Smith',        avatar: '',  role: 'Support Engineer',    status: 'offline', birthday: '18/05/2005' },
  { id: 10, name: 'Anna Kanjo',         avatar: '',  role: 'Full Stack Developer',status: 'active',  birthday: '22/07/1988' },
];

const STATUS_COLORS: Record<Person['status'], 'green' | 'yellow' | 'grey'> = {
  active: 'green',
  away: 'yellow',
  offline: 'grey',
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

function usePagedData<T>(allData: T[], initialPageSize = 5) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const start = (page - 1) * pageSize;
  const pageData = allData.slice(start, start + pageSize);
  const totalPages = Math.ceil(allData.length / pageSize);

  return {
    pageData,
    pagination: {
      page,
      totalPages,
      pageSize,
      onPageChange: (p: number) => setPage(p),
      onPageSizeChange: (s: number) => { setPageSize(s); setPage(1); },
    },
  };
}

// ─── Stories ─────────────────────────────────────────────────────────────────

export const Documentation: Story = {
  render: () => (
    <StoryPage>
      <StoryHeader
        title="Table"
        description="A fully-featured data table. Supports column sorting, selection with bulk actions, in-place cell editing (auto-save or explicit Save button), a composable toolbar, and Pagination."
      />

      <Section title="Full-featured" description="Selection, editing, bulk actions, sort headers, toolbar with filter and CSV, pagination.">
        <FullFeaturedDemo />
      </Section>

      <Section title="Auto-save editing" description="Each cell saves immediately on blur — no Save button. Good for low-risk inline edits.">
        <AutoSaveDemo />
      </Section>

      <Section title="Read-only" description="No selection, no editing. onRowClick opens a row. Sortable columns.">
        <ReadOnlyDemo />
      </Section>

      <Section title="No dividers" description="dividers={false} removes row separator lines.">
        <Table<Person>
          columns={[
            { key: 'name', header: 'Name', sortable: true, width: 200 },
            {
              key: 'avatar',
              header: 'Avatar',
              width: 72,
              render: (_: unknown, row: Person) => (
                <Avatar type="text" name={row.name} size="sm" shape="round" />
              ),
            },
            { key: 'role', header: 'Role' },
            {
              key: 'status',
              header: 'Status',
              render: (value: unknown) => (
                <Tag size="sm" color={STATUS_COLORS[value as Person['status']]}>
                  {String(value)}
                </Tag>
              ),
            },
            { key: 'birthday', header: 'Birthday', width: 140 },
          ]}
          data={PEOPLE.slice(0, 5)}
          rowKey="id"
          dividers={false}
        />
      </Section>

      <Section title="Empty state">
        <Table
          columns={[
            { key: 'name', header: 'Name' },
            { key: 'role', header: 'Role' },
            { key: 'birthday', header: 'Birthday' },
          ]}
          data={[]}
          rowKey="id"
        />
      </Section>
    </StoryPage>
  ),
};

// ─── Full-featured demo ───────────────────────────────────────────────────────

function FullFeaturedDemo() {
  const [people, setPeople] = useState(PEOPLE);
  const { pageData, pagination } = usePagedData(people);
  const [savedMsg, setSavedMsg] = useState('');

  const columns = [
    {
      key: 'name',
      header: 'Name',
      sortable: true,
      editable: true,
      width: 200,
    },
    {
      key: 'avatar',
      header: 'Avatar',
      width: 72,
      render: (_: unknown, row: Person) => (
        <Avatar type="text" name={row.name} size="sm" shape="round" />
      ),
    },
    {
      key: 'role',
      header: 'Role',
      sortable: true,
      editable: true,
      width: 220,
    },
    {
      key: 'status',
      header: 'Status',
      width: 120,
      render: (value: unknown) => (
        <Tag size="sm" color={STATUS_COLORS[value as Person['status']]}>
          {String(value)}
        </Tag>
      ),
      renderEdit: (value: unknown, _row: Person, onChange: (v: unknown) => void) => (
        <div style={{ position: 'relative' }}>
          <PopMenu width={140}>
            {(['active', 'away', 'offline'] as Person['status'][]).map((s) => (
              <ListItem
                key={s}
                active={s === value}
                onClick={() => onChange(s)}
              >
                {s}
              </ListItem>
            ))}
          </PopMenu>
        </div>
      ),
      editable: true,
    },
    {
      key: 'birthday',
      header: 'Birthday',
      width: 140,
      editable: true,
    },
  ];

  const handleRowSave = (original: Person, changes: Partial<Person>) => {
    setPeople((prev) =>
      prev.map((p) => (p.id === original.id ? { ...p, ...changes } : p))
    );
    setSavedMsg(`Saved changes for ${changes.name ?? original.name}`);
    setTimeout(() => setSavedMsg(''), 2500);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {savedMsg && (
        <div
          style={{
            padding: '8px 14px',
            background: 'var(--atom-halo-success)',
            border: '1px solid var(--atom-success-main)',
            borderRadius: 6,
            fontSize: 13,
            fontFamily: 'var(--atom-font-family)',
            color: 'var(--atom-text-primary)',
          }}
        >
          {savedMsg}
        </div>
      )}
      <Table<Person>
        columns={columns as any}
        data={pageData}
        rowKey="id"
        selectable
        bulkActions={[
          {
            label: 'Delete',
            icon: <Trash size={14} />,
            variant: 'destructive',
            onClick: (rows) =>
              setPeople((prev) => prev.filter((p) => !rows.some((r) => r.id === p.id))),
          },
          {
            label: 'Duplicate',
            icon: <Copy size={14} />,
            variant: 'outline',
            onClick: (rows) =>
              setPeople((prev) => [
                ...prev,
                ...rows.map((r) => ({ ...r, id: Date.now() + Math.random(), name: `${r.name} (copy)` })),
              ]),
          },
        ]}
        onRowSave={handleRowSave}
        toolbar={{
          filter: (open, onClose) =>
            open && (
              <div style={{ position: 'absolute', top: '100%', left: 0, marginTop: 4, zIndex: 20 }}>
                <PopMenu width={220}>
                  <div style={{ padding: '4px 8px 4px', fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--atom-text-tertiary)', fontFamily: 'var(--atom-font-family)' }}>
                    Filter by status
                  </div>
                  {(['active', 'away', 'offline'] as Person['status'][]).map((s) => (
                    <ListItem key={s} onClick={onClose}>{s}</ListItem>
                  ))}
                  <Divider />
                  <ListItem onClick={onClose}>Clear filters</ListItem>
                </PopMenu>
              </div>
            ),
          columns: true,
          csv: () => alert('Export CSV'),
          search: { placeholder: 'Search people…' },
        }}
        onSearch={(q) => console.log('search', q)}
        onSort={(key, dir) => console.log('sort', key, dir)}
        pagination={pagination}
      />
    </div>
  );
}

// ─── Auto-save demo ───────────────────────────────────────────────────────────

function AutoSaveDemo() {
  const [people, setPeople] = useState(PEOPLE.slice(0, 5));

  return (
    <Table<Person>
      columns={[
        { key: 'name', header: 'Name', editable: true, width: 200 },
        {
          key: 'avatar',
          header: 'Avatar',
          width: 72,
          render: (_: unknown, row: Person) => (
            <Avatar type="text" name={row.name} size="sm" />
          ),
        },
        { key: 'role', header: 'Role', editable: true },
        { key: 'birthday', header: 'Birthday', editable: true, width: 140 },
      ]}
      data={people}
      rowKey="id"
      autoSave
      onCellChange={(row, key, value) => {
        setPeople((prev) =>
          prev.map((p) => (p.id === row.id ? { ...p, [key]: value } : p))
        );
      }}
    />
  );
}

// ─── Read-only demo ───────────────────────────────────────────────────────────

function ReadOnlyDemo() {
  const { pageData, pagination } = usePagedData(PEOPLE);
  const [clicked, setClicked] = useState('');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {clicked && (
        <div style={{ fontSize: 13, color: 'var(--atom-text-tertiary)', fontFamily: 'var(--atom-font-family)' }}>
          Opened row: <strong style={{ color: 'var(--atom-text-primary)' }}>{clicked}</strong>
        </div>
      )}
      <Table<Person>
        columns={[
          {
            key: 'name',
            header: 'Name',
            sortable: true,
            onClick: (_value, row) => setClicked(row.name),
          },
          {
            key: 'avatar',
            header: 'Avatar',
            width: 72,
            render: (_: unknown, row: Person) => (
              <Avatar type="text" name={row.name} size="sm" />
            ),
          },
          { key: 'role', header: 'Role', sortable: true },
          {
            key: 'status',
            header: 'Status',
            render: (value: unknown) => (
              <Tag size="sm" color={STATUS_COLORS[value as Person['status']]}>
                {String(value)}
              </Tag>
            ),
          },
          { key: 'birthday', header: 'Birthday' },
        ]}
        data={pageData}
        rowKey="id"
        onSort={(key, dir) => console.log('sort', key, dir)}
        pagination={pagination}
      />
    </div>
  );
}
