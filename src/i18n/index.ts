import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import ca from '../locales/ca/common.json';
import es from '../locales/es/common.json';
import en from '../locales/en/common.json';

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: { ca: { translation: ca }, es: { translation: es }, en: { translation: en } },
    fallbackLng: 'ca',
    supportedLngs: ['ca', 'es', 'en'],
    interpolation: { escapeValue: false },
    detection: { order: ['localStorage', 'navigator'], caches: ['localStorage'] },
  });

export default i18n;


