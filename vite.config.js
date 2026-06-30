import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Spline's runtime is heavy; split it into its own chunk so the rest of the
// app stays light and the hero can lazy-load it on its own.
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          spline: ['@splinetool/react-spline', '@splinetool/runtime'],
          motion: ['framer-motion'],
        },
      },
    },
  },
});
