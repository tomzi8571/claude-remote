import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Served from https://<user>.github.io/claude-remote/ on GitHub Pages.
export default defineConfig({
  base: '/claude-remote/',
  plugins: [react()],
});
