import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom', // Needed for DOM-based tests
    globals: true, // Optional: allows using 'describe', 'it', 'expect' without imports
  },
});
