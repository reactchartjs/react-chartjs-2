import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['test/setup.js'],
    deps: {
      inline: ['vitest-canvas-mock'],
    },
    coverage: {
      reporter: ['lcovonly', 'text'],
    },
  },
});
