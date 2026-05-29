# ATOM-UI — AI Builder Instructions

## Component sizing inside Table cells

Table rows are 40px tall. Always use the **small (`sm`) size variant** for any component rendered inside a table cell. Using default or medium sizes will overflow the row height and look wrong.

| Component | Table cell prop |
|-----------|----------------|
| `Tag` | `size="sm"` |
| `Avatar` | `size="sm"` |
| `Badge` | `size="sm"` |
| `Checkbox` | `size="sm"` (header/row selection uses `md` — handled internally by Table) |
| `Button` | `size="sm"` |

Example — status tag in a column `render`:
```tsx
render: (value) => <Tag size="sm" color={colorMap[value]}>{value}</Tag>
```

Example — avatar in a column `render`:
```tsx
render: (_, row) => <Avatar size="sm" type="text" name={row.name} />
```

## Spacing scale

`--spacing: 8px` is set in the global `@theme` block. Every Tailwind spacing utility (`h-*`, `w-*`, `px-*`, `gap-*`, etc.) multiplies by **8px**, not 4px. Always use explicit pixel values when a specific size is required:

```
h-[28px]   not  h-7
px-[16px]  not  px-4
gap-[8px]  not  gap-2
```

## Dropdowns

Never use native `<select>`. All dropdowns must use:
- `SelectField` for form inputs (wraps PopMenu internally)
- `PopMenu` + `ListItem` for menus, filters, and custom pickers

## Animations

Do not add CSS transitions, keyframes, or motion effects without explicit instruction from the user.
