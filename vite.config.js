import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  base: '/news-portal/',  // ✅ GitHub Pages path

  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      workbox: {
        inlineWorkboxRuntime: true,
        sourcemap: false,
        terser: false          // ❌ disables minify to prevent Termux crash
      },
      devOptions: {
        enabled: false          // ❌ disables PWA in dev mode
      },
      manifest: {
        name: 'DailyNews Portal',
        short_name: 'DailyNews',
        description: 'Live news portal with dark mode and search',
        theme_color: '#d60000',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/news-portal/',
        icons: [
          { src: 'logo192.png', sizes: '192x192', type: 'image/png' },
          { src: 'logo512.png', sizes: '512x512', type: 'image/png' }
        ]
      }
    })
  ]
});