// Pàgina actual segons la URL (només navegador). Cada pàgina és un HTML propi a dist/,
// així que canviar de pàgina o d'idioma és sempre una navegació completa.
import { pageFromPath, pagePath, type PagesContent } from './pages';
import type { Lang } from './seo';

export const { lang: currentLang, page: currentPage } = pageFromPath(window.location.pathname);
export const isHome = currentPage.kind === 'home';

// La mateixa pàgina en un altre idioma (per als selectors d'idioma)
export const currentPagePath = (lang: Lang) => pagePath(lang, currentPage);

// El text de les subpàgines va en un chunk a part per idioma: la portada no el descarrega
const loaders = import.meta.glob<PagesContent>('../locales/*/pages.json', { import: 'default' });
export const pagesContent: Promise<PagesContent> | null = isHome
  ? null
  : loaders[`../locales/${currentLang}/pages.json`]();
