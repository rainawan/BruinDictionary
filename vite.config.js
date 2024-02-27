import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import eslint from 'vite-plugin-eslint';
import { VitePluginFonts } from 'vite-plugin-fonts';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    eslint(),
    VitePluginFonts({
      google: {
        families: [
          {
            name: 'Lora',
            styles: 'ital,wght@0,400;0,700;1,400;1,700'
          },
          {
            name: 'Source Sans 3',
            styles: 'ital,wght@0,400;0,700;1,400;1,700'
          }
        ]
      }
    })
  ],
  server: { open: true }
});
