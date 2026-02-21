import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

const isDev = process.env.NODE_ENV !== 'production'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },

    proxy: isDev ? {
                // local dev cf wrangler for GTM
                // https://developers.cloudflare.com/pages/functions/
                // https://developers.cloudflare.com/workers/wrangler/configuration/
                '/api/lead': {target: 'http://127.0.0.1:8788', changeOrigin: true},
            } : undefined
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
