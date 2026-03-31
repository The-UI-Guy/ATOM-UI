import { useState, useEffect } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FileUpload } from './FileUpload';
import { StoryPage, StoryHeader, Section, PropsTable } from '../../stories/StoryComponents';

const meta: Meta<typeof FileUpload> = {
  title: 'Components/FileUpload',
  component: FileUpload,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

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
        <p style={{ marginTop: '12px', fontSize: '14px', color: 'var(--atom-text-secondary)' }}>{status}</p>
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
    <StoryPage>
      <StoryHeader
        title="FileUpload"
        description="A dropzone component for uploading files via drag-and-drop or click."
      />

      {/* Interactive Demo */}
      <Section title="Interactive Demo" description="Try dragging a file or clicking to upload. Shows simulated progress.">
        <UploadDemo />
      </Section>

      {/* States */}
      <Section title="States" description="The four states of the FileUpload component.">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <div style={{ fontSize: '12px', color: 'var(--atom-text-secondary)', marginBottom: '8px' }}>Default</div>
            <div style={{ width: '400px' }}>
              <FileUpload
                acceptedTypesLabel="JPEG, Doc, PDF, PNG"
              />
            </div>
          </div>

          <div>
            <div style={{ fontSize: '12px', color: 'var(--atom-text-secondary)', marginBottom: '8px' }}>Hover/Drag (hover over to see)</div>
            <div style={{ width: '400px' }}>
              <FileUpload
                acceptedTypesLabel="JPEG, Doc, PDF, PNG"
              />
            </div>
          </div>

          <div>
            <div style={{ fontSize: '12px', color: 'var(--atom-text-secondary)', marginBottom: '8px' }}>Uploading (animated)</div>
            <AnimatedProgressDemo />
          </div>

          <div>
            <div style={{ fontSize: '12px', color: 'var(--atom-text-secondary)', marginBottom: '8px' }}>Disabled</div>
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
        <PropsTable rows={[
          ['onFileSelect', '(files: FileList) => void', '-', 'Callback when files are selected'],
          ['accept', 'string', "'*'", 'Accepted file types (e.g., ".jpg,.png")'],
          ['acceptedTypesLabel', 'string', "'All file types'", 'Display text for accepted types'],
          ['multiple', 'boolean', 'false', 'Allow multiple file selection'],
          ['progress', 'number', '-', 'Upload progress (0-100). Shows progress bar when set.'],
          ['disabled', 'boolean', 'false', 'Disable the dropzone'],
          ['clickLabel', 'string', "'Click here'", 'Custom label text (primary color)'],
          ['description', 'string', "'to upload your file or drag'", 'Description text after label'],
          ['className', 'string', "''", 'Additional CSS classes'],
        ]} />
      </Section>
    </StoryPage>
  ),
};
