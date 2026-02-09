/**
 * FileUpload component props
 */
export interface FileUploadProps {
  /**
   * Callback when files are selected/dropped
   */
  onFileSelect?: (files: FileList) => void;

  /**
   * Accepted file types (e.g., "image/*", ".pdf,.doc,.docx")
   * @default "*"
   */
  accept?: string;

  /**
   * Display text for accepted file types
   * @default "All file types"
   */
  acceptedTypesLabel?: string;

  /**
   * Allow multiple file selection
   * @default false
   */
  multiple?: boolean;

  /**
   * Upload progress (0-100). When set, shows progress bar.
   */
  progress?: number;

  /**
   * Whether the dropzone is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Custom label text (the "Click here" part)
   * @default "Click here"
   */
  clickLabel?: string;

  /**
   * Custom description text (after "Click here")
   * @default "to upload your file or drag"
   */
  description?: string;

  /**
   * Additional CSS classes
   */
  className?: string;
}
