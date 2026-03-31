import type { FileUploadProps } from './FileUpload.types';
/**
 * FileUpload Component
 *
 * A dropzone for uploading files via drag-and-drop or click.
 *
 * @example
 * <FileUpload
 *   onFileSelect={(files) => console.log(files)}
 *   accept=".jpg,.png,.pdf"
 *   acceptedTypesLabel="JPEG, PNG, PDF"
 * />
 *
 * @example
 * // With progress
 * <FileUpload progress={25} />
 */
export declare const FileUpload: {
    ({ onFileSelect, accept, acceptedTypesLabel, multiple, progress, disabled, clickLabel, description, className, }: FileUploadProps): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
