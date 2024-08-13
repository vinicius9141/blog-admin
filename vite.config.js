import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    global: 'window', // Adiciona o polyfill para `global`
  },
  server: {
    hmr: {
      overlay: false, // Desativa a sobreposição de erros no HMR
    },
  },
});
