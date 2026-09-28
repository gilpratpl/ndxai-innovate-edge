import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ca from '../locales/ca/common.json';
import es from '../locales/es/common.json';
import en from '../locales/en/common.json';
import { DEFAULT_LANG, LANG_STORAGE_KEY, LANGS, langFromPath, langPath, type Lang } from '@/lib/seo';

// L'idioma el decideix la URL (/, /ca/, /en/), no el navegador: així cada URL
// té sempre el mateix contingut i Google indexa cada idioma per separat.
const lng = langFromPath(window.location.pathname);

// Si l'usuari ja havia triat un altre idioma amb el selector, a l'arrel el portem a la seva URL.
// No es fa per l'idioma del navegador: Googlebot navega en anglès i veuria sempre /en/.
if (lng === DEFAULT_LANG && window.location.pathname === '/') {
  try {
    const saved = localStorage.getItem(LANG_STORAGE_KEY) as Lang | null;
    if (saved && saved !== DEFAULT_LANG && (LANGS as readonly string[]).includes(saved)) {
      window.location.replace(langPath(saved) + window.location.hash);
    }
  } catch {
    // localStorage no disponible (mode privat, etc.)
  }
}

void i18n.use(initReactI18next).init({
  resources: { ca: { translation: ca }, es: { translation: es }, en: { translation: en } },
  lng,
  fallbackLng: DEFAULT_LANG,
  supportedLngs: [...LANGS],
  interpolation: { escapeValue: false },
});

document.documentElement.lang = lng;

export default i18n;
