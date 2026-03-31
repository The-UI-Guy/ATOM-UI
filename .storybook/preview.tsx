import React from 'react';
import '../src/styles/globals.css';

import type { Preview } from '@storybook/react';

const preview: Preview = {
  // ============================================
  // GLOBAL TOOLBAR — Theme toggle
  // ============================================
  globalTypes: {
    theme: {
      description: 'Design system theme',
      defaultValue: 'crystal',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: [
          { value: 'crystal', icon: 'sun', title: 'Crystal (Light)' },
          { value: 'obsidian', icon: 'moon', title: 'Obsidian (Dark)' },
        ],
        dynamicTitle: true,
      },
    },
  },

  // ============================================
  // DECORATOR — Applies data-theme to every story
  // ============================================
  decorators: [
    (Story, context) => {
      const theme = (context.globals.theme as string) || 'crystal';

      // Apply data-theme to <html> so Tailwind's @theme CSS variables
      // (--color-atom-*) resolve correctly — they live at :root, which
      // is the html element, so the theme must be set there.
      React.useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
      }, [theme]);

      return (
        <div style={{ backgroundColor: 'var(--atom-surface-1)', minHeight: '100vh' }}>
          <Story />
        </div>
      );
    },
  ],

  parameters: {
    docs: {
      argTypes: {
        table: { disable: true },
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
