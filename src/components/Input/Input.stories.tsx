import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Envelope, Question, Lock } from '@phosphor-icons/react';
import { TextField } from './TextField';
import { SelectField } from './SelectField';
import { PasswordField } from './PasswordField';
import { SearchField } from './SearchField';

const meta: Meta = {
  title: 'Components/Input',
  parameters: {
    layout: 'centered',
  },
};

export default meta;

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
      onChange={(e) => setValue(e.target.value)}
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
    <div style={{ padding: '40px', maxWidth: '900px' }}>
      {/* Header */}
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '8px' }}>Input Components</h1>
        <p style={{ fontSize: '16px', color: '#666' }}>
          A collection of input components including TextField, SelectField, PasswordField, and SearchField.
        </p>
      </div>

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
            <div style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>Small (sm)</div>
            <TextField
              size="sm"
              placeholder="Small input"
              iconLeft={<Envelope />}
            />
          </div>
          <div>
            <div style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>Medium (md) - default</div>
            <TextField
              size="md"
              placeholder="Medium input"
              iconLeft={<Envelope />}
            />
          </div>
          <div>
            <div style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>Large (lg)</div>
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
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px', marginBottom: '24px' }}>
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
              <td style={{ padding: '12px 16px 12px 0' }}><code>label</code></td>
              <td style={{ padding: '12px 16px 12px 0', color: '#666' }}>string</td>
              <td style={{ padding: '12px 16px 12px 0' }}>-</td>
              <td style={{ padding: '12px 0', color: '#666' }}>Label text above input</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
              <td style={{ padding: '12px 16px 12px 0' }}><code>helperText</code></td>
              <td style={{ padding: '12px 16px 12px 0', color: '#666' }}>string</td>
              <td style={{ padding: '12px 16px 12px 0' }}>-</td>
              <td style={{ padding: '12px 0', color: '#666' }}>Helper text below input</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
              <td style={{ padding: '12px 16px 12px 0' }}><code>error</code></td>
              <td style={{ padding: '12px 16px 12px 0', color: '#666' }}>boolean</td>
              <td style={{ padding: '12px 16px 12px 0' }}><code>false</code></td>
              <td style={{ padding: '12px 0', color: '#666' }}>Show error state</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
              <td style={{ padding: '12px 16px 12px 0' }}><code>errorMessage</code></td>
              <td style={{ padding: '12px 16px 12px 0', color: '#666' }}>string</td>
              <td style={{ padding: '12px 16px 12px 0' }}>-</td>
              <td style={{ padding: '12px 0', color: '#666' }}>Error message (replaces helperText)</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
              <td style={{ padding: '12px 16px 12px 0' }}><code>size</code></td>
              <td style={{ padding: '12px 16px 12px 0', color: '#666' }}>'sm' | 'md' | 'lg'</td>
              <td style={{ padding: '12px 16px 12px 0' }}><code>'md'</code></td>
              <td style={{ padding: '12px 0', color: '#666' }}>Size variant</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
              <td style={{ padding: '12px 16px 12px 0' }}><code>fullWidth</code></td>
              <td style={{ padding: '12px 16px 12px 0', color: '#666' }}>boolean</td>
              <td style={{ padding: '12px 16px 12px 0' }}><code>false</code></td>
              <td style={{ padding: '12px 0', color: '#666' }}>Span full container width</td>
            </tr>
            <tr>
              <td style={{ padding: '12px 16px 12px 0' }}><code>iconLeft</code></td>
              <td style={{ padding: '12px 16px 12px 0', color: '#666' }}>ReactNode</td>
              <td style={{ padding: '12px 16px 12px 0' }}>-</td>
              <td style={{ padding: '12px 0', color: '#666' }}>Icon on left side</td>
            </tr>
          </tbody>
        </table>

        <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '12px' }}>TextField Specific</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px', marginBottom: '24px' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #e0e0e0', textAlign: 'left' }}>
              <th style={{ padding: '12px 16px 12px 0', fontWeight: 600 }}>Prop</th>
              <th style={{ padding: '12px 16px 12px 0', fontWeight: 600 }}>Type</th>
              <th style={{ padding: '12px 0', fontWeight: 600 }}>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '12px 16px 12px 0' }}><code>iconRight</code></td>
              <td style={{ padding: '12px 16px 12px 0', color: '#666' }}>ReactNode</td>
              <td style={{ padding: '12px 0', color: '#666' }}>Icon on right side</td>
            </tr>
          </tbody>
        </table>

        <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '12px' }}>SelectField Specific</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px', marginBottom: '24px' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #e0e0e0', textAlign: 'left' }}>
              <th style={{ padding: '12px 16px 12px 0', fontWeight: 600 }}>Prop</th>
              <th style={{ padding: '12px 16px 12px 0', fontWeight: 600 }}>Type</th>
              <th style={{ padding: '12px 0', fontWeight: 600 }}>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
              <td style={{ padding: '12px 16px 12px 0' }}><code>options</code></td>
              <td style={{ padding: '12px 16px 12px 0', color: '#666' }}>SelectOption[]</td>
              <td style={{ padding: '12px 0', color: '#666' }}>Array of {`{ value, label, disabled? }`}</td>
            </tr>
            <tr>
              <td style={{ padding: '12px 16px 12px 0' }}><code>placeholder</code></td>
              <td style={{ padding: '12px 16px 12px 0', color: '#666' }}>string</td>
              <td style={{ padding: '12px 0', color: '#666' }}>Placeholder when no option selected</td>
            </tr>
          </tbody>
        </table>

        <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '12px' }}>SearchField</h3>
        <p style={{ fontSize: '14px', color: '#666' }}>
          SearchField only has <code>size</code>, <code>fullWidth</code>, and standard input props (placeholder, value, onChange, etc.). No label, helper text, or custom icons.
        </p>
      </Section>
    </div>
  ),
};
