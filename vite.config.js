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
      actions: path.resolve(__dirname, './src/actions'),
      components: path.resolve(__dirname, './src/components'),
      lib: path.resolve(__dirname, './src/lib'),
      providers: path.resolve(__dirname, './src/providers'),
      routes: path.resolve(__dirname, './src/routes'),
      types: path.resolve(__dirname, './src/types'),
      utils: path.resolve(__dirname, './src/utils'),
    },
  },
});
