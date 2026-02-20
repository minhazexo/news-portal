import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

const isProd = process.env.NODE_ENV === 'production';

export default defineConfig({
  base: isProd ? '/news-portal/' : '/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      workbox: { inlineWorkboxRuntime: true }, // ✅ removed terser
      devOptions: { enabled: false },
      manifest: {
        name: 'DailyNews Portal',
        short_name: 'DailyNews',
        description: 'Live news portal with dark mode and search',
        theme_color: '#d60000',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: isProd ? '/news-portal/' : '/',
        icons: [
          { src: '/logo192.png', sizes: '192x192', type: 'image/png' },
          { src: '/logo512.png', sizes: '512x512', type: 'image/png' }
        ]
      }
    })
  ]
});
