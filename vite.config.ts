import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/my-super-fast-site/', // This is the line to add
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
