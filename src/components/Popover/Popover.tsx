import React, { createContext, useContext } from 'react';
import * as RadixPopover from '@radix-ui/react-popover';
import { Checkbox } from '../Checkbox';
import { Radio } from '../Radio';
import { ListItem } from '../ListItem';
import type {
  PopoverProps,
  PopoverItemProps,
  PopoverCheckboxItemProps,
  PopoverRadioItemProps,
  PopoverRadioGroupProps,
  PopoverSeparatorProps,
  PopoverHeaderProps,
} from './Popover.types';

// ==========================================
// CONTEXT FOR RADIO GROUP
// ==========================================
interface RadioGroupContextValue {
  value: string;
  onValueChange: (value: string) => void;
}

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

// ==========================================
// POPOVER ROOT
// ==========================================
/**
 * Popover Component
 * 
 * A flexible popover primitive for building dropdowns, menus, and selects.
 * Uses ListItem internally for consistent styling across the UI library.
 * 
 * @example
 * <Popover trigger={<Button>Open</Button>}>
 *   <Popover.Item onClick={handleClick}>Option 1</Popover.Item>
 *   <Popover.Item onClick={handleClick}>Option 2</Popover.Item>
 * </Popover>
 */
export const Popover = ({
  trigger,
  children,
  side = 'bottom',
  align = 'start',
  sideOffset = 4,
  open,
  onOpenChange,
  minWidth = 200,
  maxHeight,
  className = '',
  matchTriggerWidth = false,
}: PopoverProps) => {
  const contentStyles: React.CSSProperties = {
    minWidth: matchTriggerWidth ? undefined : minWidth,
    maxHeight: maxHeight,
    overflowY: maxHeight ? 'auto' : undefined,
    backgroundColor: 'var(--atom-surface-1)',
    border: '1px solid var(--atom-border-primary)',
    borderRadius: 'var(--atom-radius-md)',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
    padding: 4,
    zIndex: 50,
  };

  return (
    <RadixPopover.Root open={open} onOpenChange={onOpenChange}>
      <RadixPopover.Trigger asChild>
        {trigger}
      </RadixPopover.Trigger>

      <RadixPopover.Portal>
        <RadixPopover.Content
          side={side}
          align={align}
          sideOffset={sideOffset}
          className={className}
          style={contentStyles}
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          {children}
        </RadixPopover.Content>
      </RadixPopover.Portal>
    </RadixPopover.Root>
  );
};

// ==========================================
// POPOVER ITEM (uses ListItem)
// ==========================================
const PopoverItem = ({
  children,
  icon,
  value,
  disabled = false,
  selected = false,
  onClick,
  className = '',
}: PopoverItemProps) => {
  return (
    <ListItem
      itemStart={icon}
      endText={typeof value === 'string' || typeof value === 'number' ? String(value) : undefined}
      disabled={disabled}
      selected={selected}
      onClick={onClick}
      className={className}
      size="md"
    >
      {children}
    </ListItem>
  );
};

// ==========================================
// POPOVER CHECKBOX ITEM (uses ListItem + Checkbox)
// ==========================================
const PopoverCheckboxItem = ({
  children,
  checked,
  onCheckedChange,
  disabled = false,
  className = '',
}: PopoverCheckboxItemProps) => {
  return (
    <ListItem
      itemStart={
        <Checkbox
          checked={checked}
          onCheckedChange={onCheckedChange}
          disabled={disabled}
          size="sm"
        />
      }
      disabled={disabled}
      onClick={() => !disabled && onCheckedChange(!checked)}
      className={className}
      size="md"
    >
      {children}
    </ListItem>
  );
};

// ==========================================
// POPOVER RADIO GROUP
// ==========================================
const PopoverRadioGroup = ({
  children,
  value,
  onValueChange,
}: PopoverRadioGroupProps) => {
  return (
    <RadioGroupContext.Provider value={{ value, onValueChange }}>
      <div role="radiogroup">
        {children}
      </div>
    </RadioGroupContext.Provider>
  );
};

// ==========================================
// POPOVER RADIO ITEM (uses ListItem + Radio)
// ==========================================
const PopoverRadioItem = ({
  children,
  value,
  disabled = false,
  className = '',
}: PopoverRadioItemProps) => {
  const context = useContext(RadioGroupContext);
  
  if (!context) {
    console.warn('PopoverRadioItem must be used within PopoverRadioGroup');
    return null;
  }

  const { value: selectedValue, onValueChange } = context;
  const isSelected = selectedValue === value;

  return (
    <ListItem
      itemStart={
        <Radio
          checked={isSelected}
          onCheckedChange={() => !disabled && onValueChange(value)}
          disabled={disabled}
          size="sm"
        />
      }
      disabled={disabled}
      selected={isSelected}
      onClick={() => !disabled && onValueChange(value)}
      className={className}
      size="md"
    >
      {children}
    </ListItem>
  );
};

// ==========================================
// POPOVER SEPARATOR
// ==========================================
const PopoverSeparator = ({ className = '' }: PopoverSeparatorProps) => (
  <div
    className={className}
    style={{
      height: 1,
      backgroundColor: 'var(--atom-border-primary)',
      margin: '4px 0',
    }}
  />
);

// ==========================================
// POPOVER HEADER
// ==========================================
const PopoverHeader = ({ children, className = '' }: PopoverHeaderProps) => (
  <div
    className={`font-atom font-atom-medium ${className}`}
    style={{
      padding: '8px 12px',
      fontSize: 12,
      color: 'var(--atom-text-tertiary)',
    }}
  >
    {children}
  </div>
);

// ==========================================
// ATTACH SUBCOMPONENTS
// ==========================================
Popover.Item = PopoverItem;
Popover.CheckboxItem = PopoverCheckboxItem;
Popover.RadioGroup = PopoverRadioGroup;
Popover.RadioItem = PopoverRadioItem;
Popover.Separator = PopoverSeparator;
Popover.Header = PopoverHeader;

Popover.displayName = 'Popover';
PopoverItem.displayName = 'Popover.Item';
PopoverCheckboxItem.displayName = 'Popover.CheckboxItem';
PopoverRadioGroup.displayName = 'Popover.RadioGroup';
PopoverRadioItem.displayName = 'Popover.RadioItem';
PopoverSeparator.displayName = 'Popover.Separator';
PopoverHeader.displayName = 'Popover.Header';
