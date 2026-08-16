import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
const { PORT = 3000} = process.env;

export default defineConfig({
  plugins: [react()],
  
  server:{
    proxy:{
        '/api':{
            target:`http://localhost:${PORT}`,
            changeOrigin: true,
        },
        '/auth': {
            target:`http://localhost:${PORT}`,
            changeOrigin: true,
        },
    },
},
test: {
  globals: true,
  environment: 'jsdom',
  setupFiles: './src/setup.js',
  include: ['**/*.{test,spec}.{js,jsx}'],   // scan everything
},
build: {
  manifest: true,
  rollupOptions: {
    input: {
      main: './index.html',
    },
  },
},
});
