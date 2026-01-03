# Atom UI

A themeable React UI Component Library built with Tailwind CSS.

## Features

- 🎨 **Themeable** - Crystal (light) and Obsidian (dark) themes out of the box
- 🎯 **Customizable** - Override CSS variables to match your brand
- 📦 **Tree-shakeable** - Only import what you use
- 💪 **TypeScript** - Full type support
- 🎨 **Tailwind CSS** - Built with Tailwind v4

## Installation

```bash
npm install atom-ui
```

## Usage

### 1. Import the styles

In your app's entry point (e.g., `main.tsx` or `App.tsx`):

```tsx
import 'atom-ui/styles.css';
```

### 2. Use components

```tsx
import { Button } from 'atom-ui';

function App() {
  return (
    <Button variant="primary">
      Click me
    </Button>
  );
}
```

### 3. Switch themes

Add `data-theme` attribute to switch between themes:

```tsx
// Light theme (default)
<div data-theme="crystal">
  <App />
</div>

// Dark theme
<div data-theme="obsidian">
  <App />
</div>
```

## Customization

Override CSS variables to customize the theme:

```css
:root {
  /* Change the primary brand color */
  --atom-primary-main: #your-brand-color;
  
  /* Adjust border radius */
  --atom-radius-md: 8px;
  
  /* Change the font */
  --atom-font-family: 'Your Font', sans-serif;
}
```

## Available Components

- 🔲 Button (coming soon)
- 🔲 Input (coming soon)
- 🔲 Alert (coming soon)
- 🔲 Avatar (coming soon)
- 🔲 Tag (coming soon)
- 🔲 Tabs (coming soon)
- ... and more!

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build the library
npm run build

# Type check
npm run typecheck
```

## License

MIT © Miles Walker
