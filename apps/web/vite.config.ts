import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Load env from apps/web/.env (not repo root) so `npm run dev` from the monorepo root still picks up keys.
const envDir = path.resolve(__dirname);

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, envDir, '');
  const googleMapsApiKey = env.VITE_GOOGLE_MAPS_API_KEY || env.GOOGLE_MAPS_API_KEY || '';

  return {
    envDir,
    define: {
      'import.meta.env.VITE_GOOGLE_MAPS_API_KEY': JSON.stringify(googleMapsApiKey),
    },
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    optimizeDeps: {
      exclude: ['lucide-react'],
      include: ['react', 'react-dom', 'react-router-dom'],
    },
    server: {
      // Expose the dev server on all network interfaces.
      // This enables access from external devices and cloud previews.
      host: true,

      // Keep the default dev port; CLI flags (e.g. `--port 5174`) will override this in CI.
      port: 5173,
      strictPort: true,

      // Allow known preview hostnames to pass Vite's host check when tunneling or in cloud IDEs.
      // Set to `true` to disable checks entirely, but we prefer an allowlist for safety.
      allowedHosts: ['localhost', '127.0.0.1', '.repl.co', '.id.repl.co'],

      // Optional: set DEV_PROXY_VERCEL (e.g. http://127.0.0.1:3000) when `npx vercel dev` runs from repo root.
      ...(env.DEV_PROXY_VERCEL
        ? {
            proxy: {
              '/api': {
                target: env.DEV_PROXY_VERCEL,
                changeOrigin: true,
              },
            },
          }
        : {}),
    },
    // Set base to root for deployment
    base: '/',
    preview: {
      port: 4173,
      host: true,
    },
    build: {
      // Ensure assets are properly copied and optimized
      assetsDir: 'assets',
      // Enable CSS code splitting for better performance
      cssCodeSplit: true,
      // Improve chunk size for better loading performance
      chunkSizeWarningLimit: 1000,
      // Enable minification for smaller bundles
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
          pure_funcs: ['console.log', 'console.info'],
        },
      },
      // Enable source maps for production debugging (optional, can be disabled for smaller builds)
      sourcemap: false,
      rollupOptions: {
        output: {
          // Manual chunk splitting for better code splitting and caching
          manualChunks: (id) => {
            // Separate vendor chunks for better caching
            if (id.includes('node_modules')) {
              if (
                id.includes('react') ||
                id.includes('react-dom') ||
                id.includes('react-router-dom')
              ) {
                return 'react-vendor';
              }
              if (id.includes('framer-motion') || id.includes('motion')) {
                return 'animation-vendor';
              }
              if (id.includes('lucide-react')) {
                return 'icons-vendor';
              }
              if (id.includes('gsap')) {
                return 'graphics-vendor';
              }
              if (id.includes('@datadog')) {
                return 'datadog-vendor';
              }
              // All other node_modules go into a common vendor chunk
              return 'vendor';
            }
          },
          // Optimize chunk file names for better caching
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: (assetInfo) => {
            const info = assetInfo.name.split('.');
            const ext = info[info.length - 1];
            if (
              /png|jpe?g|svg|gif|tiff|bmp|ico|mp4|webm|ogg|mp3|wav|flac|aac|woff|woff2|eot|ttf|otf/i.test(
                ext
              )
            ) {
              return `assets/[name]-[hash][extname]`;
            }
            return `assets/[name]-[hash][extname]`;
          },
        },
      },
    },
  };
});
