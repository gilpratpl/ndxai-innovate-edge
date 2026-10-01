import type { MouseEvent } from 'react';
import { ABOUT_SECTION_IDS } from '@/lib/about';
import { currentLang, isHome } from '@/lib/route';
import { langPath } from '@/lib/seo';

// Enllaços del menú, en el mateix ordre en què apareixen les seccions a la pàgina.
// La clau és la de "nav.*" als JSON d'idiomes; l'id és l'ancoratge de la secció.
export const NAV_ITEMS = [
  { key: 'about', id: 'about' },
  { key: 'services', id: ABOUT_SECTION_IDS.what },
  { key: 'team', id: ABOUT_SECTION_IDS.team },
  { key: 'faq', id: ABOUT_SECTION_IDS.faq },
  { key: 'contact', id: 'contact' },
  { key: 'blog', id: 'blog' },
] as const;

// Tots els ancoratges vàlids. Amb HashRouter, /#faq arriba com a ruta "/faq";
// si és una d'aquestes seccions pintem la pàgina i hi fem scroll en lloc del 404.
export const SECTION_IDS = new Set<string>([
  'home',
  'about',
  'contact',
  'blog',
  ...Object.values(ABOUT_SECTION_IDS),
]);

export const scrollToSection = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
};

// A la portada les seccions són ancoratges; des d'una subpàgina porten a la portada de l'idioma.
export const sectionHref = (id: string) => (isHome ? `#${id}` : `${langPath(currentLang)}#${id}`);

// Per a <a href="#id">: fa scroll suau sense canviar la ruta de HashRouter.
export const onSectionLinkClick = (id: string) => (e: MouseEvent<HTMLAnchorElement>) => {
  if (!isHome) return; // subpàgina: navegació normal cap a la portada
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return; // nova pestanya: deixa fer el navegador
  e.preventDefault();
  scrollToSection(id);
};
