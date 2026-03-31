import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Envelope, Question, Lock } from '@phosphor-icons/react';
import { TextField } from './TextField';
import { SelectField } from './SelectField';
import { PasswordField } from './PasswordField';
import { SearchField } from './SearchField';
import { StoryPage, StoryHeader, Section, PropsTable } from '../../stories/StoryComponents';

const meta: Meta = {
  title: 'Components/Input',
  parameters: {
    layout: 'centered',
  },
};

export default meta;

// Interactive TextField demo
const TextFieldDemo = () => {
  const [value, setValue] = useState('');
  return (
    <TextField
      label="Label"
      placeholder="Example"
      helperText="Hint! Use your head..."
      iconLeft={<Envelope />}
      iconRight={<Question />}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

// Interactive SelectField demo
const SelectFieldDemo = () => {
  const [value, setValue] = useState('');
  return (
    <SelectField
      label="Label"
      placeholder="Example"
      helperText="Hint! Use your head..."
      iconLeft={<Envelope />}
      value={value}
      onChange={setValue}
      options={[
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
        { value: 'option3', label: 'Option 3' },
      ]}
    />
  );
};

// Interactive PasswordField demo
const PasswordFieldDemo = () => {
  const [value, setValue] = useState('');
  return (
    <PasswordField
      label="Label"
      placeholder="Enter Password"
      helperText="Hint! Use your head..."
      iconLeft={<Envelope />}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

// Interactive SearchField demo
const SearchFieldDemo = () => {
  const [value, setValue] = useState('');
  return (
    <SearchField
      placeholder="Example"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export const Documentation: StoryObj = {
  parameters: {
    layout: 'fullscreen',
  },
  render: () => (
    <StoryPage>
      <StoryHeader
        title="Input Components"
        description="A collection of input components including TextField, SelectField, PasswordField, and SearchField."
      />

      {/* TextField */}
      <Section title="TextField" description="Standard text input with label, helper text, and icon support.">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '320px' }}>
          <TextFieldDemo />

          <TextField
            label="Without icons"
            placeholder="Type something..."
            helperText="This is helper text"
          />

          <TextField
            label="Error state"
            placeholder="Enter email"
            error
            errorMessage="This email is invalid"
            iconLeft={<Envelope />}
          />

          <TextField
            label="Disabled"
            placeholder="Can't edit this"
            disabled
            iconLeft={<Envelope />}
          />
        </div>
      </Section>

      {/* SelectField */}
      <Section title="SelectField" description="Dropdown select with label, helper text, and left icon support.">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '320px' }}>
          <SelectFieldDemo />

          <SelectField
            label="Without left icon"
            placeholder="Select an option"
            helperText="Choose wisely"
            options={[
              { value: 'a', label: 'Option A' },
              { value: 'b', label: 'Option B' },
              { value: 'c', label: 'Option C' },
            ]}
          />

          <SelectField
            label="Disabled"
            placeholder="Can't select"
            disabled
            options={[
              { value: 'a', label: 'Option A' },
            ]}
          />
        </div>
      </Section>

      {/* PasswordField */}
      <Section title="PasswordField" description="Password input with visibility toggle.">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '320px' }}>
          <PasswordFieldDemo />

          <PasswordField
            label="Without left icon"
            placeholder="Enter password"
            helperText="Must be at least 8 characters"
          />

          <PasswordField
            label="Error state"
            placeholder="Enter password"
            error
            errorMessage="Password is too weak"
            iconLeft={<Lock />}
          />
        </div>
      </Section>

      {/* SearchField */}
      <Section title="SearchField" description="Minimal search input with search icon. No label or helper text.">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '320px' }}>
          <SearchFieldDemo />

          <SearchField
            placeholder="Search products..."
          />

          <SearchField
            placeholder="Disabled search"
            disabled
          />
        </div>
      </Section>

      {/* Sizes */}
      <Section title="Sizes" description="All input components support sm, md, and lg sizes.">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '320px' }}>
          <div>
            <div style={{ fontSize: '12px', color: 'var(--atom-text-secondary)', marginBottom: '8px' }}>Small (sm)</div>
            <TextField
              size="sm"
              placeholder="Small input"
              iconLeft={<Envelope />}
            />
          </div>
          <div>
            <div style={{ fontSize: '12px', color: 'var(--atom-text-secondary)', marginBottom: '8px' }}>Medium (md) - default</div>
            <TextField
              size="md"
              placeholder="Medium input"
              iconLeft={<Envelope />}
            />
          </div>
          <div>
            <div style={{ fontSize: '12px', color: 'var(--atom-text-secondary)', marginBottom: '8px' }}>Large (lg)</div>
            <TextField
              size="lg"
              placeholder="Large input"
              iconLeft={<Envelope />}
            />
          </div>
        </div>
      </Section>

      {/* Full Width */}
      <Section title="Full Width" description="Use fullWidth prop to make inputs span their container.">
        <div style={{ width: '100%' }}>
          <TextField
            label="Full width input"
            placeholder="This spans the full width"
            fullWidth
            iconLeft={<Envelope />}
          />
        </div>
      </Section>

      {/* API Reference */}
      <Section title="API Reference">
        <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '12px' }}>Shared Props (TextField, SelectField, PasswordField)</h3>
        <PropsTable rows={[
          ['label', 'string', '-', 'Label text above input'],
          ['helperText', 'string', '-', 'Helper text below input'],
          ['error', 'boolean', 'false', 'Show error state'],
          ['errorMessage', 'string', '-', 'Error message (replaces helperText)'],
          ['size', "'sm' | 'md' | 'lg'", "'md'", 'Size variant'],
          ['fullWidth', 'boolean', 'false', 'Span full container width'],
          ['iconLeft', 'ReactNode', '-', 'Icon on left side'],
        ]} />

        <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '12px', marginTop: '24px' }}>TextField Specific</h3>
        <PropsTable
          columns={['Prop', 'Type', 'Description']}
          rows={[
            ['iconRight', 'ReactNode', 'Icon on right side'],
          ]}
        />

        <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '12px', marginTop: '24px' }}>SelectField Specific</h3>
        <PropsTable
          columns={['Prop', 'Type', 'Description']}
          rows={[
            ['options', 'SelectOption[]', 'Array of { value, label, disabled? }'],
            ['placeholder', 'string', 'Placeholder when no option selected'],
          ]}
        />

        <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '12px', marginTop: '24px' }}>SearchField</h3>
        <p style={{ fontSize: '14px', color: 'var(--atom-text-secondary)' }}>
          SearchField only has <code>size</code>, <code>fullWidth</code>, and standard input props (placeholder, value, onChange, etc.). No label, helper text, or custom icons.
        </p>
      </Section>
    </StoryPage>
  ),
};
