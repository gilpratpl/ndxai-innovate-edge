// Consentiment de cookies. Google Analytics només es carrega si l'usuari l'accepta.
// L'elecció es desa en aquest navegador i es torna a demanar al cap de 12 mesos.

const GA_ID = 'G-15LJF6RVRK';
const CONSENT_KEY = 'ndxai.consent';
const MAX_AGE_MS = 365 * 24 * 60 * 60 * 1000;
// Event per tornar a obrir el bàner (enllaç "Cookies" del peu)
export const OPEN_CONSENT_EVENT = 'ndxai:open-consent';

export type Consent = 'granted' | 'denied';

export function getConsent(): Consent | null {
  try {
    const saved = JSON.parse(localStorage.getItem(CONSENT_KEY) ?? 'null') as { value: Consent; at: number } | null;
    if (!saved || Date.now() - saved.at > MAX_AGE_MS) return null;
    return saved.value === 'granted' || saved.value === 'denied' ? saved.value : null;
  } catch {
    return null;
  }
}

let loaded = false;

function loadAnalytics() {
  (window as unknown as Record<string, unknown>)[`ga-disable-${GA_ID}`] = false;
  if (loaded) return;
  loaded = true;
  const w = window as unknown as { dataLayer: unknown[]; gtag: (...args: unknown[]) => void };
  w.dataLayer = w.dataLayer || [];
  w.gtag = function gtag() {
    // gtag.js espera l'objecte arguments, no un array
    // eslint-disable-next-line prefer-rest-params
    w.dataLayer.push(arguments);
  };
  w.gtag('js', new Date());
  w.gtag('config', GA_ID);
  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(s);
}

// Atura Analytics i esborra les seves cookies (_ga, _ga_<id>) si l'usuari retira el consentiment
function stopAnalytics() {
  (window as unknown as Record<string, unknown>)[`ga-disable-${GA_ID}`] = true;
  const host = location.hostname;
  const domains = ['', host, `.${host}`, `.${host.replace(/^www\./, '')}`];
  for (const name of document.cookie.split(';').map((c) => c.split('=')[0].trim())) {
    if (name !== '_ga' && !name.startsWith('_ga_')) continue;
    for (const d of domains) {
      document.cookie = `${name}=; Max-Age=0; path=/${d ? `; domain=${d}` : ''}`;
    }
  }
}

export function setConsent(value: Consent) {
  try {
    localStorage.setItem(CONSENT_KEY, JSON.stringify({ value, at: Date.now() }));
  } catch {
    // Sense localStorage l'elecció només val per a aquesta visita
  }
  if (value === 'granted') loadAnalytics();
  else stopAnalytics();
}

/** Es crida en arrencar: carrega Analytics només si ja s'havia acceptat. */
export function initConsent() {
  if (getConsent() === 'granted') loadAnalytics();
}
