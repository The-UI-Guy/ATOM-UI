/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';

// https://vitejs.dev/config/
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';
const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  plugins: [tailwindcss(), react()],
  build: {
    // Library mode configuration
    lib: {
      // Entry point for the library
      entry: resolve(__dirname, 'src/index.ts'),
      // Name of the library (used for UMD builds)
      name: 'AtomUI',
      // Output file naming
      // This generates: atom-ui.es.js and atom-ui.umd.js
      fileName: format => `atom-ui.${format}.js`
    },
    rollupOptions: {
      // Externalize dependencies that shouldn't be bundled
      // These are peer dependencies - users must have them installed
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        // Global variables for UMD build
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'jsxRuntime'
        },
        // Preserve module structure for tree-shaking
        preserveModules: false
      }
    },
    // Generate sourcemaps for debugging
    sourcemap: true,
    // Empty the output directory before building
    emptyOutDir: true
  },
  test: {
    projects: [{
      extends: true,
      plugins: [
      // The plugin will run tests for the stories defined in your Storybook config
      // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
      storybookTest({
        configDir: path.join(dirname, '.storybook')
      })],
      test: {
        name: 'storybook',
        browser: {
          enabled: true,
          headless: true,
          provider: playwright({}),
          instances: [{
            browser: 'chromium'
          }]
        },
        setupFiles: ['.storybook/vitest.setup.ts']
      }
    }]
  }
});