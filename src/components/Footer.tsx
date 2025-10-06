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
    <footer className="relative bg-gradient-to-br from-card via-card to-muted/20 border-t border-border/50 backdrop-blur-sm">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-primary/10 pointer-events-none" />
      
      <div className="container mx-auto px-4 py-16 relative">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">
          {/* Logo y tagline */}
          <div className="col-span-1 md:col-span-5">
            <div className="mb-6">
              <img 
                src={theme === 'dark' ? logo : logoDark} 
                alt="NdxAI Logo" 
                className="h-14 w-auto mb-4 transition-transform hover:scale-105 duration-300" 
              />
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
              {t('footer.tagline')}
            </p>
          </div>

          {/* Enlaces rápidos */}
          <div className="col-span-1 md:col-span-3">
            <h3 className="font-semibold text-foreground mb-6 text-sm uppercase tracking-wider">
              {t('footer.quick')}
            </h3>
            <ul className="space-y-3">
              {[
                { label: t('nav.home'), section: 'home' },
                { label: t('nav.services'), section: 'services' },
                { label: t('nav.about'), section: 'about' },
                { label: t('nav.contact'), section: 'contact' },
                { label: t('nav.blog'), section: 'blog' },
              ].map((item) => (
                <li key={item.section}>
                  <button
                    onClick={() => scrollToSection(item.section)}
                    className="text-muted-foreground hover:text-primary transition-all duration-200 text-sm group flex items-center"
                  >
                    <span className="w-0 h-px bg-primary transition-all duration-300 group-hover:w-4 mr-0 group-hover:mr-2" />
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Enlaces legales */}
          <div className="col-span-1 md:col-span-4">
            <h3 className="font-semibold text-foreground mb-6 text-sm uppercase tracking-wider">
              {t('footer.legal')}
            </h3>
            <ul className="space-y-3">
              <li>
                <a 
                  href="#" 
                  className="text-muted-foreground hover:text-primary transition-all duration-200 text-sm group flex items-center"
                >
                  <span className="w-0 h-px bg-primary transition-all duration-300 group-hover:w-4 mr-0 group-hover:mr-2" />
                  {t('footer.privacy')}
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-muted-foreground hover:text-primary transition-all duration-200 text-sm group flex items-center"
                >
                  <span className="w-0 h-px bg-primary transition-all duration-300 group-hover:w-4 mr-0 group-hover:mr-2" />
                  {t('footer.terms')}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright con gradiente */}
        <div className="pt-8 border-t border-border/50">
          <div className="text-center">
            <p className="text-muted-foreground text-sm">
              © {currentYear} <span className="font-semibold bg-gradient-primary bg-clip-text text-transparent">NdxAI</span>. {t('footer.rights')}.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
