/*
 * ============================================
 * ATOM UI - Main Entry Point
 * ============================================
 * 
 * This file exports everything from the library.
 * When users write: import { Button } from 'atom-ui'
 * They're importing from this file.
 */

// Import and export styles
// Users need to import this in their app: import 'atom-ui/styles'
import './styles/globals.css';

// ============================================
// COMPONENTS
// Export components as we build them
// ============================================

export { Button } from './components/Button';
export type { ButtonProps, ButtonVariant, ButtonSize } from './components/Button';

export { Alert } from './components/Alert';
export type { AlertProps, AlertIntent, AlertOrientation } from './components/Alert';

// ============================================
// HOOKS
// Export any custom hooks
// ============================================

// Example:
// export { useTheme } from './hooks/useTheme';

// ============================================
// UTILITIES
// Export utility functions
// ============================================

// Example:
// export { cn } from './utils/cn';

// ============================================
// TYPES
// Export shared types
// ============================================

// Example:
// export type { ThemeMode, ColorVariant } from './types';

// Temporary export to prevent empty module error
export const ATOM_UI_VERSION = '0.1.0';
