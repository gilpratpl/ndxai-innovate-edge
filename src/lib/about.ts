// Contingut estructurat de la secció "Sobre NDXai".
// Les dades viuen a src/locales/{ca,es,en}/common.json sota la clau "aboutPage".
// Qualsevol camp buit ("") no es mostra ni a la web ni a l'HTML estàtic.
// Aquest fitxer no importa res de React: també el fa servir vite.config.ts
// per injectar l'HTML estàtic i el JSON-LD a index.html (per a crawlers sense JS).

export interface AboutItem { title: string; text: string }
export interface AboutServiceItem extends AboutItem { id: string }
export interface AboutMember { name: string; role: string; bio: string; linkedin?: string }
export interface AboutFactRow { key: string; label: string; value: string; href?: string }
export interface AboutFaqItem { q: string; a: string }

export interface AboutContent {
  eyebrow: string;
  title: string;
  valueProp: string;
  ctaPrimary: string;
  ctaSecondary: string;
  highlights: { value: string; label: string }[];
  what: { title: string; showMore: string; showLess: string; items: AboutServiceItem[] };
  different: { title: string; items: AboutItem[] };
  who: { title: string; items: string[] };
  team: { title: string; story: string; composition: string; linkedinLabel: string; members: AboutMember[] };
  how: { title: string; steps: AboutItem[]; channels: string };
  facts: { title: string; rows: AboutFactRow[] };
  faq: { title: string; items: AboutFaqItem[] };
}

export const ABOUT_SECTION_IDS = {
  what: 'about-what',
  different: 'about-different',
  who: 'about-who',
  team: 'about-team',
  how: 'about-how',
  facts: 'key-facts',
  faq: 'faq',
} as const;

export const visibleFacts = (rows: AboutFactRow[]) => rows.filter((r) => r.value && r.value.trim() !== '');

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/**
 * HTML semàntic i sense estils de la secció, idèntic en contingut al que pinta React.
 * Es posa dins de <div id="root"> perquè els crawlers que no executen JavaScript
 * (GPTBot, ClaudeBot, PerplexityBot...) el puguin llegir. React el substitueix en muntar-se.
 */
export function renderAboutStaticHtml(c: AboutContent): string {
  const id = ABOUT_SECTION_IDS;
  const parts: string[] = [];
  parts.push(`<section id="about-static" aria-label="${esc(c.eyebrow)}">`);
  parts.push(`<h2>${esc(c.title)}</h2><p>${esc(c.valueProp)}</p>`);

  parts.push(`<h2 id="${id.what}">${esc(c.what.title)}</h2>`);
  for (const s of c.what.items) {
    parts.push(`<h3>${esc(s.title)}</h3>`);
    for (const para of s.text.split('\n')) parts.push(`<p>${esc(para)}</p>`);
  }

  parts.push(`<h2 id="${id.different}">${esc(c.different.title)}</h2>`);
  for (const d of c.different.items) parts.push(`<h3>${esc(d.title)}</h3><p>${esc(d.text)}</p>`);

  parts.push(`<h2 id="${id.who}">${esc(c.who.title)}</h2><ul>`);
  for (const w of c.who.items) parts.push(`<li>${esc(w)}</li>`);
  parts.push('</ul>');

  parts.push(`<h2 id="${id.team}">${esc(c.team.title)}</h2>`);
  if (c.team.story) parts.push(`<p>${esc(c.team.story)}</p>`);
  if (c.team.composition) parts.push(`<p>${esc(c.team.composition)}</p>`);
  for (const m of c.team.members) {
    parts.push(`<h3>${esc(m.name)}</h3><p>${esc(m.role)}. ${esc(m.bio)}</p>`);
    if (m.linkedin) parts.push(`<p><a href="${esc(m.linkedin)}">LinkedIn</a></p>`);
  }

  parts.push(`<h2 id="${id.how}">${esc(c.how.title)}</h2><ol>`);
  for (const s of c.how.steps) parts.push(`<li><strong>${esc(s.title)}</strong>: ${esc(s.text)}</li>`);
  parts.push(`</ol><p>${esc(c.how.channels)}</p>`);

  parts.push(`<h2 id="${id.facts}">${esc(c.facts.title)}</h2><dl>`);
  for (const r of visibleFacts(c.facts.rows)) {
    const v = r.href ? `<a href="${esc(r.href)}">${esc(r.value)}</a>` : esc(r.value);
    parts.push(`<dt>${esc(r.label)}</dt><dd>${v}</dd>`);
  }
  parts.push('</dl>');

  parts.push(`<h2 id="${id.faq}">${esc(c.faq.title)}</h2>`);
  for (const f of c.faq.items) parts.push(`<h3>${esc(f.q)}</h3><p>${esc(f.a)}</p>`);

  parts.push('</section>');
  return parts.join('');
}
