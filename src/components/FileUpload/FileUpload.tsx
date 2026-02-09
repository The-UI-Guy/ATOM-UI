import React, { useState, useRef, DragEvent, ChangeEvent } from 'react';
import { FileArrowUp } from '@phosphor-icons/react';
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
export const FileUpload = ({
  onFileSelect,
  accept = '*',
  acceptedTypesLabel = 'All file types',
  multiple = false,
  progress,
  disabled = false,
  clickLabel = 'Click here',
  description = 'to upload your file or drag',
  className = '',
}: FileUploadProps) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const isUploading = progress !== undefined && progress >= 0 && progress < 100;
  const isActive = (isDragOver || isHovered) && !disabled && !isUploading;

  // ==========================================
  // EVENT HANDLERS
  // ==========================================
  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled && !isUploading) {
      setIsDragOver(true);
    }
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    if (disabled || isUploading) return;

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      onFileSelect?.(files);
    }
  };

  const handleClick = () => {
    if (!disabled && !isUploading) {
      inputRef.current?.click();
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onFileSelect?.(files);
    }
    // Reset input so same file can be selected again
    e.target.value = '';
  };

  // ==========================================
  // DYNAMIC STYLES (only what Tailwind can't handle)
  // ==========================================
  const dynamicStyles: React.CSSProperties = {
    borderStyle: isActive ? 'solid' : 'dashed',
    boxShadow: isActive ? '0 0 0 4px var(--atom-halo-primary)' : 'none',
  };

  return (
    <div
      className={`
        relative
        border
        rounded-atom-lg
        transition-all duration-150
        ${disabled 
          ? 'bg-atom-surface-2 border-atom-border-primary cursor-not-allowed' 
          : 'bg-atom-surface-1 cursor-pointer'
        }
        ${isActive 
          ? 'border-atom-primary-main' 
          : 'border-atom-border-primary'
        }
        ${className}
      `}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onMouseEnter={() => !disabled && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      style={dynamicStyles}
    >
      {/* Hidden file input */}
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleFileChange}
        disabled={disabled}
        className="hidden"
      />

      {/* Content */}
      <div className="flex flex-col items-center justify-center py-3 px-6">
        {/* Drag indicator (hand icon) - only when dragging */}
        {isDragOver && !disabled && !isUploading && (
          <div className="absolute left-8 top-1/2 -translate-y-1/2">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M18 11V6a2 2 0 0 0-2-2 2 2 0 0 0-2 2v1M14 10V4a2 2 0 0 0-2-2 2 2 0 0 0-2 2v6M10 10.5V6a2 2 0 0 0-2-2 2 2 0 0 0-2 2v8" />
              <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.9-5.9-2.4L3.7 17a1.9 1.9 0 0 1-.1-2.6 2 2 0 0 1 2.6-.3L8 15.5V6" />
            </svg>
          </div>
        )}

        {/* Upload icon */}
        <div 
          className={`
            flex items-center justify-center w-5 h-5 mb-1 rounded-full
            ${disabled ? 'bg-atom-neutral-transparent' : 'bg-atom-primary-transparent'}
          `}
        >
          <FileArrowUp 
            size={24} 
            className={disabled ? 'text-atom-text-tertiary' : 'text-atom-primary-main'}
          />
        </div>

        {/* Text */}
        <p className={`text-center font-atom text-md font-atom-medium ${disabled ? 'text-atom-text-tertiary' : 'text-atom-text-primary'}`}>
          <span className={disabled ? '' : 'text-atom-primary-main font-atom-medium'}>
            {clickLabel}
          </span>
          {' '}{description}
        </p>

        {/* Accepted file types */}
        <p className={`mt-1 text-sm font-atom ${disabled ? 'text-atom-text-tertiary' : 'text-atom-text-secondary'}`}>
          Accepted file types {acceptedTypesLabel}
        </p>

        {/* Progress bar */}
        {isUploading && (
          <div className="w-full mt-4">
            {/* Track */}
            <div className="w-full h-1 rounded-full overflow-hidden bg-atom-neutral-two">
              {/* Fill */}
              <div 
                className="h-full rounded-full bg-atom-primary-main transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            {/* Percentage */}
            <p className="mt-2 text-center text-sm font-atom text-atom-text-secondary">
              {progress}% complete
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

FileUpload.displayName = 'FileUpload';