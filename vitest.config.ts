import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  plugins: [vue()],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
      '@pages': fileURLToPath(new URL('./src/pages', import.meta.url)),
      '@stores': fileURLToPath(new URL('./src/stores', import.meta.url)),
      '@router': fileURLToPath(new URL('./src/router', import.meta.url)),
      '@assets/*': fileURLToPath(new URL('./src/assets', import.meta.url)),
      '@types/*': fileURLToPath(new URL('./src/types', import.meta.url)),
      '@utils/*': fileURLToPath(new URL('./src/utils', import.meta.url)),
    },
  },

  test: {
    globals: true,
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,ts,jsx,tsx,vue}'],
  },
});
