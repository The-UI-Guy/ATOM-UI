import '../src/styles/globals.css';

import type { Preview } from '@storybook/react';

const preview: Preview = {
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