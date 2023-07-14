/* eslint-disable import/default */
import { defineConfig } from 'vite';
import analyze from 'rollup-plugin-analyzer';
import eslintPlugin from 'vite-plugin-eslint';
import path from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      plugins: [analyze()],
    },
  },
  plugins: [
    eslintPlugin({
      cache: false,
      include: ['./src/**/*.ts'],
      exclude: [],
    }),
  ],
  resolve: {
    alias: {
      src: path.resolve(__dirname, './src'),
      components: path.resolve(__dirname, './src/components'),
      actions: path.resolve(__dirname, './src/actions'),
      lib: path.resolve(__dirname, './src/lib'),
      stores: path.resolve(__dirname, './src/stores'),
      utils: path.resolve(__dirname, './src/utils'),
    },
  },
});
