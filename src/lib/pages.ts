// Subpàgines amb URL pròpia per idioma: una per servei i les legals.
// Els slugs viuen aquí (fan de taula de rutes); el text, a src/locales/{ca,es,en}/pages.json.
// Sense React ni àlies "@/": també ho fan servir vite.config.ts i src/lib/seo-build.ts.
import type { AboutFaqItem, AboutServiceItem } from './about';
import { LANGS, ORG, SITE_URL, langFromPath, langPath, type Lang } from './seo';

// Mateixos ids que aboutPage.what.items als JSON d'idiomes
export const SERVICE_IDS = ['predictive', 'vision', 'digital', 'bots', 'analytics', 'optimization'] as const;
export type ServiceId = (typeof SERVICE_IDS)[number];

export const LEGAL_IDS = ['privacy', 'notice'] as const;
export type LegalId = (typeof LEGAL_IDS)[number];

export const PAGE_SLUGS: Record<ServiceId | LegalId, Record<Lang, string>> = {
  predictive: { es: 'mantenimiento-predictivo', ca: 'manteniment-predictiu', en: 'predictive-maintenance' },
  vision: { es: 'vision-artificial', ca: 'visio-artificial', en: 'computer-vision' },
  digital: { es: 'gemelo-digital', ca: 'besso-digital', en: 'digital-twin' },
  bots: { es: 'agentes-de-ia', ca: 'agents-ia', en: 'ai-agents' },
  analytics: { es: 'analitica-avanzada', ca: 'analitica-avancada', en: 'advanced-analytics' },
  optimization: { es: 'automatizacion-inteligente', ca: 'automatitzacio-intelligent', en: 'intelligent-automation' },
  privacy: { es: 'privacidad', ca: 'privacitat', en: 'privacy' },
  notice: { es: 'aviso-legal', ca: 'avis-legal', en: 'legal-notice' },
};

export type PageRef =
  | { kind: 'home' }
  | { kind: 'service'; id: ServiceId }
  | { kind: 'legal'; id: LegalId };

export const HOME: PageRef = { kind: 'home' };

export const ALL_PAGES: PageRef[] = [
  HOME,
  ...SERVICE_IDS.map((id): PageRef => ({ kind: 'service', id })),
  ...LEGAL_IDS.map((id): PageRef => ({ kind: 'legal', id })),
];

export const pagePath = (lang: Lang, page: PageRef) =>
  page.kind === 'home' ? langPath(lang) : `${langPath(lang)}${PAGE_SLUGS[page.id][lang]}/`;
export const pageUrl = (lang: Lang, page: PageRef) => `${SITE_URL}${pagePath(lang, page)}`;

// Qualsevol ruta desconeguda es tracta com la portada de l'idioma (GitHub Pages ja serveix 404.html)
export const pageFromPath = (pathname: string): { lang: Lang; page: PageRef } => {
  const lang = langFromPath(pathname);
  const segments = pathname.split('/').filter((s) => s && s !== 'index.html');
  const slug = (LANGS as readonly string[]).includes(segments[0]) ? segments[1] : segments[0];
  const serviceId = SERVICE_IDS.find((id) => PAGE_SLUGS[id][lang] === slug);
  if (serviceId) return { lang, page: { kind: 'service', id: serviceId } };
  const legalId = LEGAL_IDS.find((id) => PAGE_SLUGS[id][lang] === slug);
  if (legalId) return { lang, page: { kind: 'legal', id: legalId } };
  return { lang, page: HOME };
};

export interface ServicePageContent {
  seoTitle: string;
  seoDescription: string;
  h1: string;
  problems: string[];
  approach: string[];
  cases: string[];
  faq: AboutFaqItem[];
}

export interface LegalPageContent {
  title: string;
  seoDescription: string;
  updated: string;
  intro: string;
  sections: { title: string; body: string[] }[];
}

export interface PagesContent {
  ui: {
    problemsTitle: string;
    approachTitle: string;
    casesTitle: string;
    faqTitle: string;
    otherTitle: string;
    cta: string;
    updated: string;
    identityTitle: string;
    identity: { legalName: string; taxId: string; registry: string; address: string; email: string; phone: string };
  };
  services: Record<ServiceId, ServicePageContent>;
  legal: Record<LegalId, LegalPageContent>;
}

// Dades identificatives del titular (LSSI art. 10). Els camps buits d'ORG no es mostren.
export const orgIdentityRows = (ui: PagesContent['ui']): { label: string; value: string }[] =>
  [
    { label: ui.identity.legalName, value: ORG.legalName },
    { label: ui.identity.taxId, value: ORG.taxId },
    { label: ui.identity.registry, value: ORG.registry },
    { label: ui.identity.address, value: `${ORG.street}, ${ORG.postalCode} ${ORG.locality} (${ORG.region})` },
    { label: ui.identity.email, value: ORG.email },
    { label: ui.identity.phone, value: ORG.phoneDisplay },
  ].filter((r) => r.value.trim() !== '');

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** HTML semàntic de la pàgina d'un servei, idèntic en contingut al que pinta React (per a crawlers sense JS). */
export function renderServiceStaticHtml(
  lang: Lang,
  service: AboutServiceItem,
  others: AboutServiceItem[],
  pages: PagesContent,
): string {
  const p = pages.services[service.id as ServiceId];
  const list = (items: string[], tag: 'ul' | 'ol') =>
    `<${tag}>${items.map((i) => `<li>${esc(i)}</li>`).join('')}</${tag}>`;
  return [
    `<article><h1>${esc(p.h1)}</h1>`,
    ...service.text.split('\n').map((para) => `<p>${esc(para)}</p>`),
    `<h2>${esc(pages.ui.problemsTitle)}</h2>${list(p.problems, 'ul')}`,
    `<h2>${esc(pages.ui.approachTitle)}</h2>${list(p.approach, 'ol')}`,
    `<h2>${esc(pages.ui.casesTitle)}</h2>${list(p.cases, 'ul')}`,
    `<h2>${esc(pages.ui.faqTitle)}</h2>`,
    ...p.faq.map((f) => `<h3>${esc(f.q)}</h3><p>${esc(f.a)}</p>`),
    `<h2>${esc(pages.ui.otherTitle)}</h2><ul>`,
    ...others.map(
      (o) => `<li><a href="${pagePath(lang, { kind: 'service', id: o.id as ServiceId })}">${esc(o.title)}</a></li>`,
    ),
    `</ul></article>`,
  ].join('');
}

/** HTML semàntic d'una pàgina legal (per a crawlers sense JS). */
export function renderLegalStaticHtml(id: LegalId, pages: PagesContent): string {
  const p = pages.legal[id];
  return [
    `<article><h1>${esc(p.title)}</h1>`,
    `<p>${esc(pages.ui.updated)}: <time datetime="${esc(p.updated)}">${esc(p.updated)}</time></p>`,
    `<p>${esc(p.intro)}</p>`,
    `<h2>${esc(pages.ui.identityTitle)}</h2><dl>`,
    ...orgIdentityRows(pages.ui).map((r) => `<dt>${esc(r.label)}</dt><dd>${esc(r.value)}</dd>`),
    `</dl>`,
    ...p.sections.map((s) => `<h2>${esc(s.title)}</h2>${s.body.map((b) => `<p>${esc(b)}</p>`).join('')}`),
    `</article>`,
  ].join('');
}
