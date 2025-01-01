import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'happy-dom',
    setupFiles: ['test/setup.ts'],
    server: {
      deps: {
        inline: ['vitest-canvas-mock'],
      },
    },
    coverage: {
      reporter: ['lcovonly', 'text'],
    },
  },
});
