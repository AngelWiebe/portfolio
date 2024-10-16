/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom', // Use jsdom for DOM-related tests
    setupFiles: './setupTests.ts', // Reference your setup file here
    globals: true, // Make Vitest globals available
  },
});
