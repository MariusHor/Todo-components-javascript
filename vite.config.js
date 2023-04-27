import { defineConfig } from 'vite';
import eslint from 'vite-plugin-eslint';
const path = require('path');

export default defineConfig({
  resolve: {
    alias: {
      src: path.resolve(__dirname, './src'),
      actions: path.resolve(__dirname, './src/actions'),
      lib: path.resolve(__dirname, './src/lib'),
      store: path.resolve(__dirname, './src/store'),
      utils: path.resolve(__dirname, './src/utils'),
    },
  },
  plugins: [eslint()],
});
