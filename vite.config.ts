import * as path from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig(async ({ mode }) => {
  return {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  };
});
