# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Marketing site for NDXai (Neural Dynamics AI), a React + Vite + TypeScript app (one-page home plus a page per service and two legal pages) styled with Tailwind and shadcn/ui. Served at `www.ndxai.eu` (`public/CNAME`) via GitHub Pages. Originally scaffolded with Lovable; the README still points there.

## Commands

```sh
npm i              # install (package-lock.json and bun.lockb both exist; npm is the documented path)
npm run dev        # Vite dev server
npm run build      # production build -> dist/
npm run build:dev  # build in development mode
npm run lint       # ESLint (flat config, eslint.config.js)
npm run preview    # serve dist/ locally
npm run deploy     # publish dist/ to the gh-pages branch (run build first)
```

There is no test suite and no typecheck script; use `npx tsc -p tsconfig.app.json --noEmit` to typecheck.

## Architecture

- **Home page, hash routing.** `src/App.tsx` uses `HashRouter` (required for GitHub Pages) with `/`, `/:section` (so `/#faq` deep links scroll to a known section id instead of 404ing) and a catch-all `NotFound`. `src/pages/Index.tsx` stacks the section components (`Navbar`, `Hero`, `About`, `Contact`, `Blog`, `Footer`) plus the floating `ChatBotWithBackend`; services live in the "what" block of `About`. Navigation is by real `<a href="#id">` anchors whose order and targets come from `NAV_ITEMS` in `src/lib/sections.ts`. `public/404.html` is `noindex` and redirects to `/`.
- **Subpages (pathname routing).** Each service and the two legal pages (privacy, legal notice) have their own URL per language, e.g. `/ca/manteniment-predictiu/`, `/mantenimiento-predictivo/`, `/en/predictive-maintenance/`. Slugs are the route table in `PAGE_SLUGS` (`src/lib/pages.ts`); `src/lib/route.ts` resolves `window.location.pathname` to `currentPage`, and `App.tsx` renders `pages/ServicePage.tsx` or `pages/LegalPage.tsx` (lazy chunks, outside `HashRouter`) instead of the home. Every page is a real HTML file in `dist/`, so moving between pages or languages is a full navigation. On subpages, section links point to the home (`sectionHref` in `src/lib/sections.ts`). Subpage copy lives in `src/locales/{ca,es,en}/pages.json`, loaded on demand for the current language only (the home never downloads it); service titles and intro text are reused from `aboutPage.what.items` in `common.json`.
- **i18n and language URLs.** `src/i18n/index.ts` (imported in `main.tsx`) sets up i18next with Catalan, Spanish and English, loaded from `src/locales/{ca,es,en}/common.json`. **The URL decides the language**: `/` is Spanish (also `x-default`), `/ca/` Catalan, `/en/` English (`src/lib/seo.ts`). Browser language is deliberately ignored (Googlebot browses in English); the language switcher navigates to the other URL and stores the choice, which is only honoured on `/`. All user-facing copy should go through `t('...')` (or `pages.json` for subpages), and each new key must be added to **all three** locale files.
- **Chatbot.** `ChatBotWithBackend.tsx` POSTs `{ messages, language }` to `${API_CONFIG.baseURL}/api/chat` and expects `{ content }` back, with a special case for 429. The backend lives in a separate service; `src/config/api.ts` reads `VITE_BACKEND_URL` and falls back to `https://ndxai-chatbot-api.onrender.com`. No API keys belong in this client.
- **UI kit.** Only a trimmed set of shadcn components lives in `src/components/ui/` (button, card, dialog, dropdown-menu). Add others via shadcn (`components.json`) and install the matching Radix package. Use `cn()` from `src/lib/utils.ts` for class merging. Theme tokens and custom animations (e.g. `bg-gradient-primary`) are defined in `src/index.css` and `tailwind.config.ts`. The `@/` alias maps to `src/`.
- **Build tweaks (`vite.config.ts`).** `unplugin-imagemin` compresses JPEG and WebP. A custom plugin rewrites stylesheet `<link>`s into preload+onload with a `<noscript>` fallback. esbuild **drops all `console` and `debugger` calls** in builds, so don't rely on console output in production. Performance matters here: App.tsx deliberately removed providers to shrink the bundle.
- **SEO.** `index.html` is a template: the `seo` plugin in `vite.config.ts` uses `src/lib/seo-build.ts` to fill `<!--app-head-->` (title, description, canonical, hreflang, Open Graph, JSON-LD `@graph`) and `#root` (static semantic HTML of the page for crawlers without JS) per language and page, writing `dist/index.html`, `dist/ca/index.html`, `dist/en/index.html` and one `<slug>/index.html` per subpage and language. Service pages get their own title/description (`seoTitle`/`seoDescription` in `pages.json`) and `Service`, `BreadcrumbList` and `FAQPage` JSON-LD. Anything rendered by React on a subpage must also be added to the static renderers in `src/lib/pages.ts`. It also generates `dist/sitemap.xml` (with hreflang, lastmod = build date) and `dist/llms.txt`. Titles and descriptions live under the `seo` key of each locale. Company NAP data (address, phone, email) lives in `ORG` in `src/lib/seo.ts`; `ORG.taxId` and `ORG.registry` feed the legal pages and are hidden while empty. `robots.txt` is maintained by hand.
- **`dist/` is committed** (it is not in `.gitignore`). Rebuild if a change should appear there.

Code comments are a mix of Catalan, Spanish and English.
