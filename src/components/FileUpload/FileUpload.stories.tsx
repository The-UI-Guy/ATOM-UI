import { useState, useEffect } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FileUpload } from './FileUpload';

const meta: Meta<typeof FileUpload> = {
  title: 'Components/FileUpload',
  component: FileUpload,
  parameters: {
    layout: 'centered',
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

// Interactive demo with simulated upload
const UploadDemo = () => {
  const [progress, setProgress] = useState<number | undefined>(undefined);
  const [status, setStatus] = useState<string>('');

  const handleFileSelect = (files: FileList) => {
    setStatus(`Selected: ${files[0].name}`);
    setProgress(0);
    
    // Simulate upload progress
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.random() * 15;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);
        setTimeout(() => {
          setProgress(undefined);
          setStatus(`Uploaded: ${files[0].name}`);
        }, 500);
      }
      setProgress(Math.round(currentProgress));
    }, 200);
  };

  return (
    <div style={{ width: '400px' }}>
      <FileUpload
        onFileSelect={handleFileSelect}
        accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
        acceptedTypesLabel="JPEG, Doc, PDF, PNG"
        progress={progress}
      />
      {status && (
        <p style={{ marginTop: '12px', fontSize: '14px', color: '#666' }}>{status}</p>
      )}
    </div>
  );
};

// Animated progress demo
const AnimatedProgressDemo = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 0;
        return prev + 1;
      });
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ width: '400px' }}>
      <FileUpload
        acceptedTypesLabel="JPEG, Doc, PDF, PNG"
        progress={progress}
      />
    </div>
  );
};

export const Documentation: Story = {
  parameters: {
    layout: 'fullscreen',
  },
  render: () => (
    <div style={{ padding: '40px', maxWidth: '900px' }}>
      {/* Header */}
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '8px' }}>FileUpload</h1>
        <p style={{ fontSize: '16px', color: '#666' }}>
          A dropzone component for uploading files via drag-and-drop or click.
        </p>
      </div>

      {/* Interactive Demo */}
      <Section title="Interactive Demo" description="Try dragging a file or clicking to upload. Shows simulated progress.">
        <UploadDemo />
      </Section>

      {/* States */}
      <Section title="States" description="The four states of the FileUpload component.">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <div style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>Default</div>
            <div style={{ width: '400px' }}>
              <FileUpload
                acceptedTypesLabel="JPEG, Doc, PDF, PNG"
              />
            </div>
          </div>

          <div>
            <div style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>Hover/Drag (hover over to see)</div>
            <div style={{ width: '400px' }}>
              <FileUpload
                acceptedTypesLabel="JPEG, Doc, PDF, PNG"
              />
            </div>
          </div>

          <div>
            <div style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>Uploading (animated)</div>
            <AnimatedProgressDemo />
          </div>

          <div>
            <div style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>Disabled</div>
            <div style={{ width: '400px' }}>
              <FileUpload
                acceptedTypesLabel="JPEG, Doc, PDF, PNG"
                disabled
              />
            </div>
          </div>
        </div>
      </Section>

      {/* Custom Labels */}
      <Section title="Custom Labels" description="Customize the text content.">
        <div style={{ width: '400px' }}>
          <FileUpload
            clickLabel="Drop files"
            description="here or click to browse"
            acceptedTypesLabel="Images only (PNG, JPG, GIF)"
            accept="image/*"
          />
        </div>
      </Section>

      {/* Multiple Files */}
      <Section title="Multiple Files" description="Allow selecting multiple files at once.">
        <div style={{ width: '400px' }}>
          <FileUpload
            multiple
            acceptedTypesLabel="Any file type"
            description="to upload your files or drag"
          />
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
              <td style={{ padding: '12px 16px 12px 0' }}><code>onFileSelect</code></td>
              <td style={{ padding: '12px 16px 12px 0', color: '#666' }}>(files: FileList) =&gt; void</td>
              <td style={{ padding: '12px 16px 12px 0' }}>-</td>
              <td style={{ padding: '12px 0', color: '#666' }}>Callback when files are selected</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
              <td style={{ padding: '12px 16px 12px 0' }}><code>accept</code></td>
              <td style={{ padding: '12px 16px 12px 0', color: '#666' }}>string</td>
              <td style={{ padding: '12px 16px 12px 0' }}><code>'*'</code></td>
              <td style={{ padding: '12px 0', color: '#666' }}>Accepted file types (e.g., ".jpg,.png")</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
              <td style={{ padding: '12px 16px 12px 0' }}><code>acceptedTypesLabel</code></td>
              <td style={{ padding: '12px 16px 12px 0', color: '#666' }}>string</td>
              <td style={{ padding: '12px 16px 12px 0' }}><code>'All file types'</code></td>
              <td style={{ padding: '12px 0', color: '#666' }}>Display text for accepted types</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
              <td style={{ padding: '12px 16px 12px 0' }}><code>multiple</code></td>
              <td style={{ padding: '12px 16px 12px 0', color: '#666' }}>boolean</td>
              <td style={{ padding: '12px 16px 12px 0' }}><code>false</code></td>
              <td style={{ padding: '12px 0', color: '#666' }}>Allow multiple file selection</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
              <td style={{ padding: '12px 16px 12px 0' }}><code>progress</code></td>
              <td style={{ padding: '12px 16px 12px 0', color: '#666' }}>number</td>
              <td style={{ padding: '12px 16px 12px 0' }}>-</td>
              <td style={{ padding: '12px 0', color: '#666' }}>Upload progress (0-100). Shows progress bar when set.</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
              <td style={{ padding: '12px 16px 12px 0' }}><code>disabled</code></td>
              <td style={{ padding: '12px 16px 12px 0', color: '#666' }}>boolean</td>
              <td style={{ padding: '12px 16px 12px 0' }}><code>false</code></td>
              <td style={{ padding: '12px 0', color: '#666' }}>Disable the dropzone</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
              <td style={{ padding: '12px 16px 12px 0' }}><code>clickLabel</code></td>
              <td style={{ padding: '12px 16px 12px 0', color: '#666' }}>string</td>
              <td style={{ padding: '12px 16px 12px 0' }}><code>'Click here'</code></td>
              <td style={{ padding: '12px 0', color: '#666' }}>Custom label text (primary color)</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
              <td style={{ padding: '12px 16px 12px 0' }}><code>description</code></td>
              <td style={{ padding: '12px 16px 12px 0', color: '#666' }}>string</td>
              <td style={{ padding: '12px 16px 12px 0' }}><code>'to upload your file or drag'</code></td>
              <td style={{ padding: '12px 0', color: '#666' }}>Description text after label</td>
            </tr>
            <tr>
              <td style={{ padding: '12px 16px 12px 0' }}><code>className</code></td>
              <td style={{ padding: '12px 16px 12px 0', color: '#666' }}>string</td>
              <td style={{ padding: '12px 16px 12px 0' }}><code>''</code></td>
              <td style={{ padding: '12px 0', color: '#666' }}>Additional CSS classes</td>
            </tr>
          </tbody>
        </table>
      </Section>
    </div>
  ),
};
