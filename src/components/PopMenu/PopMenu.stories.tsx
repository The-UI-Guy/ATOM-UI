import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Bag,
  ArrowsSplit,
  Microphone,
  ArrowsLeftRight,
  Rocket,
  Pause,
  PencilSimple,
  CopySimple,
  PaintRoller,
  TrashSimple,
  Folder,
  Star,
  Gear,
  Share,
  Eye,
  SortAscending,
} from '@phosphor-icons/react';
import { PopMenu } from './PopMenu';
import { ListItem } from '../ListItem/ListItem';
import { Divider } from '../Divider/Divider';
import { Checkbox } from '../Checkbox/Checkbox';
import { Radio } from '../Radio/Radio';
import { StoryPage, StoryHeader, Section, PropsTable } from '../../stories/StoryComponents';

const meta: Meta<typeof PopMenu> = {
  title: 'Components/PopMenu',
  component: PopMenu,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const group = (children: React.ReactNode) => (
  <div style={{ paddingLeft: 8, paddingRight: 8, display: 'flex', flexDirection: 'column', gap: 4 }}>
    {children}
  </div>
);

// Figma reference menu (Pop Menu/2)
const FigmaMenu = () => {
  const [active, setActive] = useState<string | null>('Splice');
  return (
    <PopMenu>
      {group(<>
        <ListItem icon={<Bag />} shortcut="⌘⇧H" active={active === 'Hold'} onClick={() => setActive('Hold')}>Hold</ListItem>
        <ListItem icon={<ArrowsSplit />} shortcut="⌘⇧D" active={active === 'Splice'} onClick={() => setActive('Splice')}>Splice</ListItem>
        <ListItem icon={<Microphone />} shortcut="⌘⇧D" active={active === 'Extract Audio'} onClick={() => setActive('Extract Audio')}>Extract Audio</ListItem>
        <ListItem icon={<ArrowsLeftRight />} shortcut="⌘⇧D" active={active === 'Extend'} onClick={() => setActive('Extend')}>Extend</ListItem>
      </>)}
      <Divider paddingY="1" />
      {group(<>
        <ListItem icon={<Rocket />} shortcut="⌘⇧D" active={active === 'Deploy'} onClick={() => setActive('Deploy')}>Deploy</ListItem>
        <ListItem icon={<Pause />} shortcut="⌘⇧D" active={active === 'Pause'} onClick={() => setActive('Pause')}>Pause</ListItem>
        <ListItem icon={<PencilSimple />} shortcut="⌘⇧D" active={active === 'Edit'} onClick={() => setActive('Edit')}>Edit</ListItem>
      </>)}
      <Divider paddingY="1" />
      {group(<>
        <ListItem icon={<CopySimple />} shortcut="⌘⇧C" active={active === 'Copy'} onClick={() => setActive('Copy')}>Copy</ListItem>
        <ListItem icon={<PaintRoller />} shortcut="⌘⇧P" active={active === 'Paste'} onClick={() => setActive('Paste')}>Paste</ListItem>
        <ListItem icon={<TrashSimple />} shortcut="DEL" active={active === 'Delete'} onClick={() => setActive('Delete')}>Delete</ListItem>
      </>)}
    </PopMenu>
  );
};

// Multi-select menu with checkboxes
const CheckboxMenu = () => {
  const [options, setOptions] = useState({ Grid: true, Rulers: false, Guides: true, 'Snap to grid': false });
  const toggle = (key: keyof typeof options) => setOptions(prev => ({ ...prev, [key]: !prev[key] }));
  return (
    <PopMenu>
      {group(
        (Object.keys(options) as (keyof typeof options)[]).map(key => (
          <ListItem
            key={key}
            icon={
              <span style={{ pointerEvents: 'none' }}>
                <Checkbox checked={options[key]} onChange={() => {}} size="md" />
              </span>
            }
            onClick={() => toggle(key)}
          >
            {key}
          </ListItem>
        ))
      )}
    </PopMenu>
  );
};

// Single-select menu with radios
const RadioMenu = () => {
  const [view, setView] = useState('List');
  const views = ['List', 'Grid', 'Columns', 'Gallery'];
  return (
    <PopMenu>
      {group(
        views.map(v => (
          <ListItem
            key={v}
            icon={
              <span style={{ pointerEvents: 'none' }}>
                <Radio checked={view === v} onChange={() => {}} size="md" name="view-mode" />
              </span>
            }
            onClick={() => setView(v)}
          >
            {v}
          </ListItem>
        ))
      )}
    </PopMenu>
  );
};

export const Documentation: Story = {
  parameters: { layout: 'fullscreen' },
  render: () => (
    <StoryPage>
      <StoryHeader
        title="Pop Menu"
        description={<>A floating context menu panel composed of <code>ListItem</code> rows and <code>Divider</code> separators. Used for right-click menus, action dropdowns, and command palettes.</>}
      />

      <Section
        title="Figma Reference"
        description="Exact recreation of the Pop Menu/2 design from Figma. Click any item to set it as active."
      >
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <FigmaMenu />
        </div>
      </Section>

      <Section title="With Checkboxes" description="Multi-select options menu. Clicking a row toggles its checkbox.">
        <div style={{ display: 'flex', justifyContent: 'center', gap: 24 }}>
          <div>
            <p style={{ fontSize: '12px', color: 'var(--atom-text-tertiary)', marginBottom: '8px', textAlign: 'center' }}>View options</p>
            <CheckboxMenu />
          </div>
        </div>
      </Section>

      <Section title="With Radios" description="Single-select options menu. Clicking a row selects it exclusively.">
        <div style={{ display: 'flex', justifyContent: 'center', gap: 24 }}>
          <div>
            <p style={{ fontSize: '12px', color: 'var(--atom-text-tertiary)', marginBottom: '8px', textAlign: 'center' }}>View mode</p>
            <RadioMenu />
          </div>
        </div>
      </Section>

      <Section title="Simple Menu" description="A minimal menu without grouping.">
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <PopMenu>
            {group(<>
              <ListItem icon={<CopySimple />} shortcut="⌘C">Copy</ListItem>
              <ListItem icon={<PaintRoller />} shortcut="⌘V">Paste</ListItem>
              <ListItem icon={<PencilSimple />} shortcut="⌘E">Edit</ListItem>
              <ListItem icon={<TrashSimple />} shortcut="DEL">Delete</ListItem>
            </>)}
          </PopMenu>
        </div>
      </Section>

      <Section title="With Submenus" description="Use hasSubmenu on items that open nested menus.">
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <PopMenu>
            {group(<>
              <ListItem icon={<Folder />} hasSubmenu>Open in…</ListItem>
              <ListItem icon={<Share />} hasSubmenu>Share with…</ListItem>
              <ListItem icon={<Star />} hasSubmenu>Add to…</ListItem>
            </>)}
            <Divider paddingY="1" />
            {group(<>
              <ListItem icon={<Gear />} shortcut="⌘,">Preferences</ListItem>
            </>)}
          </PopMenu>
        </div>
      </Section>

      <Section title="Mixed — Icons, Checks, Radios" description="Groups can combine different start item types separated by dividers.">
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <MixedMenu />
        </div>
      </Section>

      <Section title="With Disabled Items" description="Non-interactive items are visually muted.">
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <PopMenu>
            {group(<>
              <ListItem icon={<CopySimple />} shortcut="⌘C">Copy</ListItem>
              <ListItem icon={<PaintRoller />} shortcut="⌘V" disabled>Paste (nothing to paste)</ListItem>
              <ListItem icon={<PencilSimple />} shortcut="⌘E">Edit</ListItem>
              <ListItem icon={<TrashSimple />} shortcut="DEL" disabled>Delete (read-only)</ListItem>
            </>)}
          </PopMenu>
        </div>
      </Section>

      {/* API Reference */}
      <Section title="API Reference">
        <PropsTable rows={[
          ['children', 'ReactNode', '—', 'ListItems and Dividers (required)'],
          ['width', 'number', '264', 'Width of the panel in pixels'],
          ['className', 'string', '""', 'Additional CSS classes'],
        ]} />
      </Section>
    </StoryPage>
  ),
};

// Mixed menu combining icons, checkboxes, and radios
const MixedMenu = () => {
  const [checks, setChecks] = useState({ Grid: true, Rulers: false });
  const [sort, setSort] = useState('Name');
  const toggleCheck = (key: keyof typeof checks) => setChecks(prev => ({ ...prev, [key]: !prev[key] }));
  return (
    <PopMenu>
      {group(<>
        <ListItem icon={<Eye />} hasSubmenu>View</ListItem>
        <ListItem icon={<Share />} shortcut="⌘⇧S">Share</ListItem>
      </>)}
      <Divider paddingY="1" />
      {group(<>
        {(Object.keys(checks) as (keyof typeof checks)[]).map(key => (
          <ListItem
            key={key}
            icon={<span style={{ pointerEvents: 'none' }}><Checkbox checked={checks[key]} onChange={() => {}} size="md" /></span>}
            onClick={() => toggleCheck(key)}
          >{key}</ListItem>
        ))}
      </>)}
      <Divider paddingY="1" />
      {group(<>
        {['Name', 'Date', 'Size'].map(opt => (
          <ListItem
            key={opt}
            icon={<span style={{ pointerEvents: 'none' }}><Radio checked={sort === opt} onChange={() => {}} size="md" name="sort" /></span>}
            onClick={() => setSort(opt)}
          >{opt}</ListItem>
        ))}
      </>)}
      <Divider paddingY="1" />
      {group(<>
        <ListItem icon={<SortAscending />}>Sort ascending</ListItem>
      </>)}
    </PopMenu>
  );
};
