import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { NAV_ITEMS, onSectionLinkClick, sectionHref } from '@/lib/sections';
import type { AboutServiceItem } from '@/lib/about';
import { LEGAL_IDS, pagePath, type ServiceId } from '@/lib/pages';
import { currentPagePath } from '@/lib/route';
import { OPEN_CONSENT_EVENT } from '@/lib/consent';
import { LANGS, LANG_STORAGE_KEY, type Lang } from '@/lib/seo';
import logo from '@/assets/logo_white.svg';
import logoDark from '@/assets/logo_blue.svg';

const LEGAL_LABELS = { privacy: 'footer.privacy', notice: 'footer.terms' } as const;
const linkClass = 'text-muted-foreground hover:text-primary transition-all duration-200 text-sm group flex items-center';

const Footer = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as Lang;
  const services = t('aboutPage.what.items', { returnObjects: true }) as AboutServiceItem[];
  const currentYear = new Date().getFullYear();
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [theme, setTheme] = useState<'light' | 'dark'>(prefersDark ? 'dark' : 'light');

  useEffect(() => {
    // Listen to theme changes
    const observer = new MutationObserver(() => {
      const root = window.document.documentElement;
      const isDark = root.classList.contains('dark');
      setTheme(isDark ? 'dark' : 'light');
    });

    observer.observe(window.document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    // Set initial theme
    const root = window.document.documentElement;
    const isDark = root.classList.contains('dark');
    setTheme(isDark ? 'dark' : 'light');

    return () => observer.disconnect();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-gradient-to-br from-card via-card to-muted/20 border-t border-border/50 backdrop-blur-sm">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-primary/10 pointer-events-none" />

      <div className="container mx-auto px-4 py-8 relative">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">
          {/* Logo y tagline */}
          <div className="col-span-1 md:col-span-5">
            <div className="mb-6">
              <button
                type="button"
                onClick={scrollToTop}
                aria-label="Scroll to top"
                className="mb-4"
              >
                <img
                  src={theme === 'dark' ? logo : logoDark}
                  alt="NdxAI Logo"
                  className="h-14 w-auto transition-transform hover:scale-105 duration-300 cursor-pointer"
                />
              </button>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
              {t('footer.tagline')}
            </p>
          </div>

          {/* Enlaces rápidos */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="font-semibold text-foreground mb-6 text-sm uppercase tracking-wider">
              {t('footer.quick')}
            </h3>
            <ul className="space-y-3">
              {NAV_ITEMS.map(({ key, id }) => (
                <li key={key}>
                  <a
                    href={sectionHref(id)}
                    onClick={onSectionLinkClick(id)}
                    className={linkClass}
                  >
                    <span className="w-0 h-px bg-primary transition-all duration-300 group-hover:w-4 mr-0 group-hover:mr-2" />
                    {t(`nav.${key}`)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Una pàgina pròpia per servei */}
          <div className="col-span-1 md:col-span-3">
            <h3 className="font-semibold text-foreground mb-6 text-sm uppercase tracking-wider">
              {t('footer.services')}
            </h3>
            <ul className="space-y-3">
              {services.map((s) => (
                <li key={s.id}>
                  <a href={pagePath(lang, { kind: 'service', id: s.id as ServiceId })} className={linkClass}>
                    <span className="w-0 h-px bg-primary transition-all duration-300 group-hover:w-4 mr-0 group-hover:mr-2" />
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Enlaces legales */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="font-semibold text-foreground mb-6 text-sm uppercase tracking-wider">
              {t('footer.legal')}
            </h3>
            <ul className="space-y-3">
              {LEGAL_IDS.map((id) => (
                <li key={id}>
                  <a href={pagePath(lang, { kind: 'legal', id })} className={linkClass}>
                    <span className="w-0 h-px bg-primary transition-all duration-300 group-hover:w-4 mr-0 group-hover:mr-2" />
                    {t(LEGAL_LABELS[id])}
                  </a>
                </li>
              ))}
              <li>
                <button type="button" onClick={() => window.dispatchEvent(new Event(OPEN_CONSENT_EVENT))} className={linkClass}>
                  <span className="w-0 h-px bg-primary transition-all duration-300 group-hover:w-4 mr-0 group-hover:mr-2" />
                  {t('footer.cookies')}
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright con gradiente */}
        <div className="pt-8 border-t border-border/50">
          <div className="text-center">
            {/* Enllaços d'idioma visibles i rastrejables (el desplegable del menú no ho és) */}
            <nav aria-label={t('seo.switchLabel')} className="mb-4">
              <ul className="flex justify-center gap-4 text-sm">
                {LANGS.map((l) => (
                  <li key={l}>
                    <a
                      href={currentPagePath(l)}
                      hrefLang={l}
                      lang={l}
                      aria-current={l === lang ? 'true' : undefined}
                      onClick={() => {
                        try {
                          localStorage.setItem(LANG_STORAGE_KEY, l);
                        } catch {
                          // localStorage no disponible
                        }
                      }}
                      className={l === lang ? 'text-primary font-medium' : 'text-muted-foreground hover:text-primary transition-colors'}
                    >
                      {t('seo.languageName', { lng: l })}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <p className="text-muted-foreground text-sm">
              © {currentYear} <span className="font-semibold bg-gradient-primary bg-clip-text text-transparent">NDXai</span>. {t('footer.rights')}.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
