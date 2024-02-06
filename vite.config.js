import path from 'path';
import { defineConfig } from 'vite';
import viteCompression from 'vite-plugin-compression';

import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: tag => ['swiper-slide', 'swiper-container'].includes(tag),
        },
      },
    }),
    viteCompression(),
  ],
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, './src/components'),
      '@views': path.resolve(__dirname, './src/views'),
      '@form': path.resolve(__dirname, './src/components/Form'),
      '@utils': path.resolve(__dirname, './src/utils'),
    },
  },
  build: {
    outDir: 'build',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: id => {
          if (id.indexOf('node_modules') !== -1)
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
        },
      },
    },
  },
});
