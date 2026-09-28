// Generació en temps de build (només l'importa vite.config.ts): <head> per idioma,
// JSON-LD, HTML estàtic per a crawlers sense JS, sitemap.xml i llms.txt.
import { renderAboutStaticHtml, visibleFacts, type AboutContent } from './about';
import { DEFAULT_LANG, LANGS, MAPS_URL, ORG, SITE_URL, langPath, langUrl, type Lang } from './seo';

export interface SeoMeta {
  title: string;
  description: string;
  ogLocale: string;
  languageName: string;
  switchLabel: string;
}

export type Locale = { seo: SeoMeta; aboutPage: AboutContent } & Record<string, unknown>;
export type Locales = Record<Lang, Locale>;

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const str = (loc: Locale, key: string) => String(loc[key] ?? '');

const jsonLdScript = (data: unknown) =>
  `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`;

export function buildJsonLd(lang: Lang, loc: Locale) {
  const c = loc.aboutPage;
  const url = langUrl(lang);
  const orgId = `${SITE_URL}/#organization`;
  const websiteId = `${SITE_URL}/#website`;
  const founded = c.facts.rows.find((r) => r.key === 'founded')?.value.trim();

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfessionalService',
        '@id': orgId,
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
        areaServed: [
          { '@type': 'AdministrativeArea', name: 'Catalunya' },
          { '@type': 'Country', name: 'España' },
        ],
        knowsLanguage: ['ca', 'es', 'en'],
        knowsAbout: c.what.items.map((s) => s.title),
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: c.what.title,
          itemListElement: c.what.items.map((s) => ({
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: s.title, description: s.text, provider: { '@id': orgId } },
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
      },
      {
        '@type': 'WebSite',
        '@id': websiteId,
        url: `${SITE_URL}/`,
        name: ORG.name,
        alternateName: 'Neural Dynamics AI',
        inLanguage: [...LANGS],
        publisher: { '@id': orgId },
      },
      {
        '@type': 'WebPage',
        '@id': `${url}#webpage`,
        url,
        name: loc.seo.title,
        description: loc.seo.description,
        inLanguage: lang,
        isPartOf: { '@id': websiteId },
        about: { '@id': orgId },
      },
      {
        '@type': 'FAQPage',
        '@id': `${url}#faq`,
        inLanguage: lang,
        isPartOf: { '@id': `${url}#webpage` },
        mainEntity: c.faq.items.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    ],
  };
}

export function renderHead(lang: Lang, locales: Locales): string {
  const loc = locales[lang];
  const url = langUrl(lang);
  const tags = [
    `<title>${esc(loc.seo.title)}</title>`,
    `<meta name="description" content="${esc(loc.seo.description)}" />`,
    `<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />`,
    `<link rel="canonical" href="${url}" />`,
    ...LANGS.map((l) => `<link rel="alternate" hreflang="${l}" href="${langUrl(l)}" />`),
    `<link rel="alternate" hreflang="x-default" href="${langUrl(DEFAULT_LANG)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${ORG.name}" />`,
    `<meta property="og:title" content="${esc(loc.seo.title)}" />`,
    `<meta property="og:description" content="${esc(loc.seo.description)}" />`,
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
    `<meta name="twitter:title" content="${esc(loc.seo.title)}" />`,
    `<meta name="twitter:description" content="${esc(loc.seo.description)}" />`,
    jsonLdScript(buildJsonLd(lang, loc)),
  ];
  return tags.map((t) => `  ${t}`).join('\n');
}

/**
 * Tota la pàgina en HTML semàntic i sense estils, en l'idioma de la URL.
 * Va dins de <div id="root"> perquè la llegeixin els crawlers que no executen JS
 * (GPTBot, ClaudeBot, PerplexityBot...). React la substitueix en muntar-se.
 */
export function renderStaticBody(lang: Lang, locales: Locales): string {
  const loc = locales[lang];
  const c = loc.aboutPage;
  const navIds: [string, string][] = [
    ['nav.about', 'about'],
    ['nav.services', 'about-what'],
    ['nav.team', 'about-team'],
    ['nav.faq', 'faq'],
    ['nav.contact', 'contact'],
  ];
  const langLinks = LANGS.map(
    (l) => `<li><a href="${langPath(l)}" hreflang="${l}" lang="${l}">${esc(locales[l].seo.languageName)}</a></li>`,
  ).join('');

  const parts = [
    `<header><a href="${langPath(lang)}">${ORG.name} – Neural Dynamics AI</a>`,
    `<nav aria-label="${esc(str(loc, 'nav.label'))}"><ul>`,
    ...navIds.map(([k, id]) => `<li><a href="#${id}">${esc(str(loc, k))}</a></li>`),
    `</ul></nav>`,
    `<nav aria-label="${esc(loc.seo.switchLabel)}"><ul>${langLinks}</ul></nav></header>`,
    `<main>`,
    `<section id="home"><h1>${esc(str(loc, 'hero.title'))} ${esc(str(loc, 'hero.titleHighlight'))}</h1>`,
    `<p>${esc(str(loc, 'hero.subtitle'))}</p></section>`,
    renderAboutStaticHtml(c),
    `<section id="contact"><h2>${esc(str(loc, 'contact.title'))}</h2><p>${esc(str(loc, 'contact.subtitle'))}</p><ul>`,
    `<li>Email: <a href="mailto:${ORG.email}">${ORG.email}</a></li>`,
    `<li>${esc(str(loc, 'contact.phone'))}: <a href="tel:${ORG.phone}">${ORG.phoneDisplay}</a></li>`,
    `<li>${esc(str(loc, 'contact.location'))}: <a href="${esc(MAPS_URL)}">${ORG.street}, ${ORG.postalCode} ${ORG.locality} (${ORG.region})</a></li>`,
    `<li>LinkedIn: <a href="${ORG.linkedin}">Neural Dynamics AI</a></li>`,
    `</ul></section>`,
    `</main>`,
    `<footer><p>© ${ORG.legalName}</p></footer>`,
  ];
  return (
    '<div style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap">' +
    parts.join('') +
    '</div>'
  );
}

/** Aplica l'idioma a la plantilla index.html (marcadors <!--app-head--> i <div id="root">). */
export function localizeHtml(template: string, lang: Lang, locales: Locales): string {
  return template
    .replace(/<html lang="[^"]*">/, () => `<html lang="${lang}">`)
    .replace('<!--app-head-->', () => renderHead(lang, locales).trimStart())
    .replace('<div id="root"></div>', () => `<div id="root">${renderStaticBody(lang, locales)}</div>`);
}

export function renderSitemap(lastmod: string): string {
  const alternates = [
    ...LANGS.map((l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${langUrl(l)}" />`),
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${langUrl(DEFAULT_LANG)}" />`,
  ].join('\n');
  const urls = LANGS.map(
    (l) => `  <url>\n    <loc>${langUrl(l)}</loc>\n    <lastmod>${lastmod}</lastmod>\n${alternates}\n  </url>`,
  ).join('\n');
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
    ...c.what.items.map((s) => `- **${s.title}**: ${s.text}`),
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
