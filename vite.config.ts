import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import viteImagemin from "unplugin-imagemin/vite";

// https://vitejs.dev/config/
/*
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
*/
export default defineConfig({
  plugins: [
    react(),
    viteImagemin({
      mozjpeg: { quality: 75, progressive: true },
      webp: { quality: 75 },
    } as any),
    {
      name: 'defer-css-load',
      apply: 'build',
      transformIndexHtml(html) {
        // Convert blocking stylesheet links to preload+onload pattern with noscript fallback
        return html.replace(
          /<link([^>]*?)rel="stylesheet"([^>]*?)>/g,
          (_m, pre, post) =>
            `<link${pre}rel="preload" as="style"${post} onload="this.onload=null;this.rel='stylesheet'">
<noscript><link${pre}rel="stylesheet"${post}></noscript>`
        );
      },
    },
  ],
  build: {
    target: 'es2020',
    minify: 'esbuild',
    cssCodeSplit: true,
  },
  esbuild: {
    drop: ['console', 'debugger'],
  },
    resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  }
})