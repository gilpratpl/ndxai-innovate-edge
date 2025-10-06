import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import logo from '@/assets/logo_white.svg';
import logoDark from '@/assets/logo_blue.svg';

const Footer = () => {
  const { t } = useLanguage();
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

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <img src={theme === 'dark' ? logo : logoDark} alt="NdxAI Logo" className="h-12 w-30" />
            </div>
            <p className="text-muted-foreground mb-4">
              {t('footer.tagline')}
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">{t('footer.quick')}</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollToSection('home')}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {t('nav.home')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('services')}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {t('nav.services')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('about')}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {t('nav.about')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {t('nav.contact')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('blog')}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {t('nav.blog')}
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">{t('footer.legal')}</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  {t('footer.privacy')}
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  {t('footer.terms')}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border text-center text-muted-foreground">
          <p>© {currentYear} NdxAI. {t('footer.rights')}.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
