// Generació en temps de build (només l'importa vite.config.ts): <head> per idioma i pàgina,
// JSON-LD, HTML estàtic per a crawlers sense JS, sitemap.xml i llms.txt.
import { renderAboutStaticHtml, visibleFacts, type AboutContent } from './about';
import {
  ALL_PAGES,
  LEGAL_IDS,
  pagePath,
  pageUrl,
  renderLegalStaticHtml,
  renderServiceStaticHtml,
  type PageRef,
  type PagesContent,
  type ServiceId,
} from './pages';
import { DEFAULT_LANG, LANGS, MAPS_URL, ORG, SITE_URL, langPath, langUrl, type Lang } from './seo';

export interface SeoMeta {
  title: string;
  description: string;
  ogLocale: string;
  languageName: string;
  switchLabel: string;
}

// "pages" és el contingut de src/locales/<idioma>/pages.json (vite.config.ts l'hi afegeix)
export type Locale = { seo: SeoMeta; aboutPage: AboutContent; pages: PagesContent } & Record<string, unknown>;
export type Locales = Record<Lang, Locale>;

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const str = (loc: Locale, key: string) => String(loc[key] ?? '');

const jsonLdScript = (data: unknown) =>
  `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`;

const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

const AREA_SERVED = [
  { '@type': 'AdministrativeArea', name: 'Catalunya' },
  { '@type': 'Country', name: 'España' },
];

const serviceOf = (loc: Locale, id: string) => loc.aboutPage.what.items.find((s) => s.id === id)!;

/** Títol i descripció de cada pàgina. */
export function pageMeta(loc: Locale, page: PageRef): { title: string; description: string } {
  if (page.kind === 'service') {
    const p = loc.pages.services[page.id];
    return { title: p.seoTitle, description: p.seoDescription };
  }
  if (page.kind === 'legal') {
    const p = loc.pages.legal[page.id];
    return { title: `${p.title} | ${ORG.name}`, description: p.seoDescription };
  }
  return { title: loc.seo.title, description: loc.seo.description };
}

// A les subpàgines n'hi ha prou amb les dades bàsiques; el node complet és a la portada
const orgSummaryNode = () => ({
  '@type': 'ProfessionalService',
  '@id': ORG_ID,
  name: ORG.name,
  legalName: ORG.legalName,
  url: `${SITE_URL}/`,
  logo: { '@type': 'ImageObject', url: ORG.logo, width: 512, height: 512 },
  email: ORG.email,
  telephone: ORG.phone,
  address: {
    '@type': 'PostalAddress',
    streetAddress: ORG.street,
    postalCode: ORG.postalCode,
    addressLocality: ORG.locality,
    addressRegion: ORG.region,
    addressCountry: ORG.country,
  },
  sameAs: [ORG.linkedin],
});

const orgNode = (lang: Lang, loc: Locale) => {
  const c = loc.aboutPage;
  const founded = c.facts.rows.find((r) => r.key === 'founded')?.value.trim();
  return {
    '@type': 'ProfessionalService',
    '@id': ORG_ID,
    name: ORG.name,
    legalName: ORG.legalName,
    alternateName: ['Neural Dynamics AI', 'NDXai - Neural Dynamics AI'],
    url: `${SITE_URL}/`,
    logo: { '@type': 'ImageObject', url: ORG.logo, width: 512, height: 512 },
    image: [`${SITE_URL}/og/og-${lang}.png`, ORG.logo],
    description: c.valueProp,
    email: ORG.email,
    telephone: ORG.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: ORG.street,
      postalCode: ORG.postalCode,
      addressLocality: ORG.locality,
      addressRegion: ORG.region,
      addressCountry: ORG.country,
    },
    geo: { '@type': 'GeoCoordinates', latitude: ORG.latitude, longitude: ORG.longitude },
    hasMap: MAPS_URL,
    areaServed: AREA_SERVED,
    knowsLanguage: ['ca', 'es', 'en'],
    knowsAbout: c.what.items.map((s) => s.title),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: c.what.title,
      itemListElement: c.what.items.map((s) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: s.title,
          description: s.text.replace(/\n/g, ' '),
          url: pageUrl(lang, { kind: 'service', id: s.id as ServiceId }),
          provider: { '@id': ORG_ID },
        },
      })),
    },
    founder: c.team.members.map((m) => ({
      '@type': 'Person',
      name: m.name,
      jobTitle: m.role,
      ...(m.linkedin ? { sameAs: [m.linkedin] } : {}),
    })),
    ...(founded ? { foundingDate: founded } : {}),
    numberOfEmployees: { '@type': 'QuantitativeValue', value: c.team.members.length },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: ORG.email,
      telephone: ORG.phone,
      availableLanguage: ['ca', 'es', 'en'],
      areaServed: 'ES',
    },
    sameAs: [ORG.linkedin],
  };
};

const faqNode = (url: string, lang: Lang, items: { q: string; a: string }[]) => ({
  '@type': 'FAQPage',
  '@id': `${url}#faq`,
  inLanguage: lang,
  isPartOf: { '@id': `${url}#webpage` },
  mainEntity: items.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
});

export function buildJsonLd(lang: Lang, page: PageRef, loc: Locale) {
  const url = pageUrl(lang, page);
  const meta = pageMeta(loc, page);
  const isHome = page.kind === 'home';

  const graph: Record<string, unknown>[] = [
    isHome ? orgNode(lang, loc) : orgSummaryNode(),
    {
      '@type': 'WebSite',
      '@id': WEBSITE_ID,
      url: `${SITE_URL}/`,
      name: ORG.name,
      alternateName: 'Neural Dynamics AI',
      inLanguage: [...LANGS],
      publisher: { '@id': ORG_ID },
    },
    {
      '@type': 'WebPage',
      '@id': `${url}#webpage`,
      url,
      name: meta.title,
      description: meta.description,
      inLanguage: lang,
      isPartOf: { '@id': WEBSITE_ID },
      about: { '@id': page.kind === 'service' ? `${url}#service` : ORG_ID },
      ...(isHome ? {} : { breadcrumb: { '@id': `${url}#breadcrumb` } }),
    },
  ];

  if (isHome) graph.push(faqNode(url, lang, loc.aboutPage.faq.items));

  if (!isHome) {
    const name = page.kind === 'service' ? serviceOf(loc, page.id).title : loc.pages.legal[page.id].title;
    graph.push({
      '@type': 'BreadcrumbList',
      '@id': `${url}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: ORG.name, item: langUrl(lang) },
        { '@type': 'ListItem', position: 2, name, item: url },
      ],
    });
  }

  if (page.kind === 'service') {
    const service = serviceOf(loc, page.id);
    graph.push(
      {
        '@type': 'Service',
        '@id': `${url}#service`,
        name: service.title,
        serviceType: service.title,
        description: service.text.replace(/\n/g, ' '),
        url,
        provider: { '@id': ORG_ID },
        areaServed: AREA_SERVED,
      },
      faqNode(url, lang, loc.pages.services[page.id].faq),
    );
  }

  return { '@context': 'https://schema.org', '@graph': graph };
}

export function renderHead(lang: Lang, page: PageRef, locales: Locales): string {
  const loc = locales[lang];
  const url = pageUrl(lang, page);
  const { title, description } = pageMeta(loc, page);
  const tags = [
    `<title>${esc(title)}</title>`,
    `<meta name="description" content="${esc(description)}" />`,
    `<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />`,
    `<link rel="canonical" href="${url}" />`,
    ...LANGS.map((l) => `<link rel="alternate" hreflang="${l}" href="${pageUrl(l, page)}" />`),
    `<link rel="alternate" hreflang="x-default" href="${pageUrl(DEFAULT_LANG, page)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${ORG.name}" />`,
    `<meta property="og:title" content="${esc(title)}" />`,
    `<meta property="og:description" content="${esc(description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${SITE_URL}/og/og-${lang}.png" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${esc(loc.seo.title)}" />`,
    `<meta property="og:locale" content="${loc.seo.ogLocale}" />`,
    ...LANGS.filter((l) => l !== lang).map(
      (l) => `<meta property="og:locale:alternate" content="${locales[l].seo.ogLocale}" />`,
    ),
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:image" content="${SITE_URL}/og/og-${lang}.png" />`,
    `<meta name="twitter:title" content="${esc(title)}" />`,
    `<meta name="twitter:description" content="${esc(description)}" />`,
    jsonLdScript(buildJsonLd(lang, page, loc)),
  ];
  return tags.map((t) => `  ${t}`).join('\n');
}

const contactStaticHtml = (loc: Locale) =>
  [
    `<section id="contact"><h2>${esc(str(loc, 'contact.title'))}</h2><p>${esc(str(loc, 'contact.subtitle'))}</p><ul>`,
    `<li>Email: <a href="mailto:${ORG.email}">${ORG.email}</a></li>`,
    `<li>${esc(str(loc, 'contact.phone'))}: <a href="tel:${ORG.phone}">${ORG.phoneDisplay}</a></li>`,
    `<li>${esc(str(loc, 'contact.location'))}: <a href="${esc(MAPS_URL)}">${ORG.street}, ${ORG.postalCode} ${ORG.locality} (${ORG.region})</a></li>`,
    `<li>LinkedIn: <a href="${ORG.linkedin}">Neural Dynamics AI</a></li>`,
    `</ul></section>`,
  ].join('');

/**
 * Tota la pàgina en HTML semàntic i sense estils, en l'idioma de la URL.
 * Va dins de <div id="root"> perquè la llegeixin els crawlers que no executen JS
 * (GPTBot, ClaudeBot, PerplexityBot...). React la substitueix en muntar-se.
 */
export function renderStaticBody(lang: Lang, page: PageRef, locales: Locales): string {
  const loc = locales[lang];
  const c = loc.aboutPage;
  const home = langPath(lang);
  // A la portada són ancoratges; des d'una subpàgina porten a la portada de l'idioma
  const anchor = (id: string) => (page.kind === 'home' ? `#${id}` : `${home}#${id}`);
  const navIds: [string, string][] = [
    ['nav.about', 'about'],
    ['nav.services', 'about-what'],
    ['nav.team', 'about-team'],
    ['nav.faq', 'faq'],
    ['nav.contact', 'contact'],
  ];
  const langLinks = LANGS.map(
    (l) =>
      `<li><a href="${pagePath(l, page)}" hreflang="${l}" lang="${l}">${esc(locales[l].seo.languageName)}</a></li>`,
  ).join('');
  const serviceLinks = c.what.items
    .map((s) => `<li><a href="${pagePath(lang, { kind: 'service', id: s.id as ServiceId })}">${esc(s.title)}</a></li>`)
    .join('');
  const legalLabels = { privacy: 'footer.privacy', notice: 'footer.terms' } as const;
  const legalLinks = LEGAL_IDS.map(
    (id) => `<li><a href="${pagePath(lang, { kind: 'legal', id })}">${esc(str(loc, legalLabels[id]))}</a></li>`,
  ).join('');

  let main: string[];
  if (page.kind === 'service') {
    const service = serviceOf(loc, page.id);
    main = [
      renderServiceStaticHtml(lang, service, c.what.items.filter((s) => s.id !== page.id), loc.pages),
      contactStaticHtml(loc),
    ];
  } else if (page.kind === 'legal') {
    main = [renderLegalStaticHtml(page.id, loc.pages)];
  } else {
    main = [
      `<section id="home"><h1>${esc(str(loc, 'hero.title'))} ${esc(str(loc, 'hero.titleHighlight'))}</h1>`,
      `<p>${esc(str(loc, 'hero.subtitle'))}</p></section>`,
      renderAboutStaticHtml(c, (id) => pagePath(lang, { kind: 'service', id: id as ServiceId })),
      contactStaticHtml(loc),
    ];
  }

  const parts = [
    `<header><a href="${home}">${ORG.name} – Neural Dynamics AI</a>`,
    `<nav aria-label="${esc(str(loc, 'nav.label'))}"><ul>`,
    ...navIds.map(([k, id]) => `<li><a href="${anchor(id)}">${esc(str(loc, k))}</a></li>`),
    `</ul></nav>`,
    `<nav aria-label="${esc(loc.seo.switchLabel)}"><ul>${langLinks}</ul></nav></header>`,
    `<main>`,
    ...main,
    `</main>`,
    `<footer><nav aria-label="${esc(str(loc, 'footer.services'))}"><ul>${serviceLinks}</ul></nav>`,
    `<nav aria-label="${esc(str(loc, 'footer.legal'))}"><ul>${legalLinks}</ul></nav>`,
    `<p>© ${ORG.legalName}</p></footer>`,
  ];
  return (
    '<div style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap">' +
    parts.join('') +
    '</div>'
  );
}

/** Aplica l'idioma i la pàgina a la plantilla index.html (marcadors <!--app-head--> i <div id="root">). */
export function localizeHtml(template: string, lang: Lang, page: PageRef, locales: Locales): string {
  return template
    .replace(/<html lang="[^"]*">/, () => `<html lang="${lang}">`)
    .replace('<!--app-head-->', () => renderHead(lang, page, locales).trimStart())
    .replace('<div id="root"></div>', () => `<div id="root">${renderStaticBody(lang, page, locales)}</div>`);
}

export function renderSitemap(lastmod: string): string {
  const urls = ALL_PAGES.flatMap((page) => {
    const alternates = [
      ...LANGS.map((l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${pageUrl(l, page)}" />`),
      `    <xhtml:link rel="alternate" hreflang="x-default" href="${pageUrl(DEFAULT_LANG, page)}" />`,
    ].join('\n');
    return LANGS.map(
      (l) => `  <url>\n    <loc>${pageUrl(l, page)}</loc>\n    <lastmod>${lastmod}</lastmod>\n${alternates}\n  </url>`,
    );
  }).join('\n');
  return (
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n' +
    `${urls}\n</urlset>\n`
  );
}

/** Resum en Markdown per a assistents d'IA (https://llmstxt.org). */
export function renderLlmsTxt(locales: Locales): string {
  const en = locales.en;
  const c = en.aboutPage;
  const lines = [
    `# ${ORG.name} (Neural Dynamics AI)`,
    '',
    `> ${c.valueProp}`,
    '',
    '## Website',
    '',
    ...LANGS.map((l) => `- [${locales[l].seo.languageName}](${langUrl(l)}): ${locales[l].seo.title}`),
    '',
    `## ${c.what.title}`,
    '',
    ...c.what.items.map(
      (s) =>
        `- [${s.title}](${pageUrl('en', { kind: 'service', id: s.id as ServiceId })}): ${s.text.replace(/\n/g, ' ')}`,
    ),
    '',
    `## ${c.different.title}`,
    '',
    ...c.different.items.map((d) => `- **${d.title}**: ${d.text}`),
    '',
    `## ${c.team.title}`,
    '',
    ...c.team.members.map((m) => `- **${m.name}**, ${m.role}. ${m.bio}`),
    '',
    `## ${c.facts.title}`,
    '',
    ...visibleFacts(c.facts.rows).map((r) => `- ${r.label}: ${r.value}`),
    '',
    `## ${c.faq.title}`,
    '',
    ...c.faq.items.flatMap((f) => [`### ${f.q}`, '', f.a, '']),
    '## Contact',
    '',
    `- Email: ${ORG.email}`,
    `- Phone: ${ORG.phoneDisplay}`,
    `- Address: ${ORG.street}, ${ORG.postalCode} ${ORG.locality} (${ORG.region}), Spain`,
    `- LinkedIn: ${ORG.linkedin}`,
    '',
  ];
  return lines.join('\n');
}
