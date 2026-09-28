import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import viteImagemin from "unplugin-imagemin/vite";
import fs from "fs";
import { localizeHtml, renderLlmsTxt, renderSitemap, type Locales } from "./src/lib/seo-build";
import { LANGS, langFromPath, langPath } from "./src/lib/seo";

const loadLocales = (): Locales =>
  Object.fromEntries(
    LANGS.map((l) => [
      l,
      JSON.parse(fs.readFileSync(path.resolve(__dirname, `src/locales/${l}/common.json`), "utf8")),
    ]),
  ) as Locales;

// SEO multiidioma: una URL per idioma (/, /ca/, /en/), cadascuna amb el seu <head>
// (títol, descripció, canonical, hreflang, Open Graph, JSON-LD) i el contingut en HTML
// estàtic dins de #root per als crawlers que no executen JS. També genera sitemap.xml i llms.txt.
const seoPlugin = (): Plugin => {
  let outDir = "dist";
  let isBuild = false;
  return {
    name: "seo",
    configResolved(config) {
      outDir = path.resolve(config.root, config.build.outDir);
      isBuild = config.command === "build";
    },
    transformIndexHtml(html, ctx) {
      // En build es deixa la plantilla intacta; closeBundle en fa una còpia per idioma
      return isBuild ? html : localizeHtml(html, langFromPath(ctx.originalUrl ?? "/"), loadLocales());
    },
    closeBundle() {
      if (!isBuild) return;
      const locales = loadLocales();
      const templatePath = path.join(outDir, "index.html");
      const template = fs.readFileSync(templatePath, "utf8");
      for (const lang of LANGS) {
        const file = path.join(outDir, langPath(lang), "index.html");
        fs.mkdirSync(path.dirname(file), { recursive: true });
        fs.writeFileSync(file, localizeHtml(template, lang, locales));
      }
      fs.writeFileSync(path.join(outDir, "sitemap.xml"), renderSitemap(new Date().toISOString().slice(0, 10)));
      fs.writeFileSync(path.join(outDir, "llms.txt"), renderLlmsTxt(locales));
    },
  };
};

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
    seoPlugin(),
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