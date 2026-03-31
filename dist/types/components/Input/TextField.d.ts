import React from 'react';
import type { TextFieldProps } from './Input.types';
/**
 * TextField Component
 *
 * A standard text input with label, helper text, and icon support.
 *
 * @example
 * <TextField
 *   label="Email"
 *   placeholder="Enter your email"
 *   iconLeft={<EnvelopeIcon />}
 * />
 */
export declare const TextField: React.ForwardRefExoticComponent<TextFieldProps & React.RefAttributes<HTMLInputElement>>;
