// URLs per idioma i dades de l'empresa (NAP). Sense React ni àlies "@/":
// també ho fan servir vite.config.ts i src/lib/seo-build.ts en temps de build.

export const SITE_URL = 'https://www.ndxai.eu';

// L'idioma el decideix la URL: / = castellà (x-default), /ca/ = català, /en/ = anglès.
export const LANGS = ['es', 'ca', 'en'] as const;
export type Lang = (typeof LANGS)[number];
export const DEFAULT_LANG: Lang = 'es';

export const langPath = (lang: Lang) => (lang === DEFAULT_LANG ? '/' : `/${lang}/`);
export const langUrl = (lang: Lang) => `${SITE_URL}${langPath(lang)}`;

export const langFromPath = (pathname: string): Lang => {
  const first = pathname.split('/').filter(Boolean)[0];
  return (LANGS as readonly string[]).includes(first) ? (first as Lang) : DEFAULT_LANG;
};

// Preferència explícita (triada al selector d'idioma). Només es desa quan l'usuari tria.
export const LANG_STORAGE_KEY = 'ndxai.lang';

// Nom, adreça i telèfon: han de ser idèntics a tot arreu (web, JSON-LD, Google Business).
export const ORG = {
  name: 'NDXai',
  legalName: 'Neural Dynamics AI S.L.',
  email: 'info@ndxai.eu',
  phone: '+34651590000',
  phoneDisplay: '+34 651 590 000',
  street: 'Carrer Assemblea de Catalunya 9',
  postalCode: '08500',
  locality: 'Vic',
  region: 'Barcelona',
  country: 'ES',
  latitude: 41.9301,
  longitude: 2.2549,
  linkedin: 'https://www.linkedin.com/company/neural-dynamics-ai',
  logo: `${SITE_URL}/android-chrome-512x512.png`,
} as const;

export const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${ORG.street}, ${ORG.postalCode} ${ORG.locality}`,
)}`;
