import React from 'react';
import type { PasswordFieldProps } from './Input.types';
/**
 * PasswordField Component
 *
 * A password input with visibility toggle, label, helper text, and icon support.
 *
 * @example
 * <PasswordField
 *   label="Password"
 *   placeholder="Enter your password"
 *   helperText="Must be at least 8 characters"
 * />
 */
export declare const PasswordField: React.ForwardRefExoticComponent<PasswordFieldProps & React.RefAttributes<HTMLInputElement>>;
