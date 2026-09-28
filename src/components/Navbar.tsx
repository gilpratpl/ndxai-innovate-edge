import { useState, useEffect, type MouseEvent } from 'react';
import { Moon, Sun, Globe, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTranslation } from 'react-i18next';
import { NAV_ITEMS, onSectionLinkClick } from '@/lib/sections';
import { LANGS, LANG_STORAGE_KEY, langPath, type Lang } from '@/lib/seo';

import logo from '@/assets/logo_white.svg';
import logoDark from '@/assets/logo_blue.svg';

const Navbar = () => {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [theme, setTheme] = useState<'light' | 'dark'>(prefersDark ? 'dark' : 'light');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { i18n, t } = useTranslation();

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  // Cada idioma té la seva URL: canviar d'idioma és navegar-hi (i recordar l'elecció)
  const currentLang = i18n.language as Lang;
  const rememberLanguage = (lang: Lang) => {
    try {
      localStorage.setItem(LANG_STORAGE_KEY, lang);
    } catch {
      // localStorage no disponible
    }
  };

  const handleNavClick = (id: string) => (e: MouseEvent<HTMLAnchorElement>) => {
    onSectionLinkClick(id)(e);
    setMobileMenuOpen(false); // close mobile menu after click
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/70 backdrop-blur-xl border-b border-border/50 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">

        {/* Logo */}
        <a href={langPath(currentLang)} onClick={handleNavClick('home')} className="flex items-center gap-2" aria-label={`NDXai – ${t('nav.home')}`}>
          <img src={theme === 'dark' ? logo : logoDark} alt="NDXai – Neural Dynamics AI" className="h-12 w-30 transition-transform hover:scale-105 duration-300" />
        </a>

        {/* Desktop Menu: mateix ordre que les seccions de la pàgina */}
        <nav aria-label={t('nav.label')} className="hidden md:block">
          <ul className="flex items-center gap-6 lg:gap-8">
            {NAV_ITEMS.map(({ key, id }) => (
              <li key={key}>
                <a
                  href={`#${id}`}
                  onClick={handleNavClick(id)}
                  className="relative text-foreground hover:text-primary transition-colors duration-300 group"
                >
                  <span>{t(`nav.${key}`)}</span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-primary transition-all duration-300 group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Language Dropdown */}
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="rounded-full gap-2 px-3">
                <Globe className="h-5 w-5" />
                <span className="text-sm font-medium">
                  {currentLang.toUpperCase()}
                </span>
                <span className="sr-only">{t('seo.switchLabel')}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {LANGS.map((lang) => (
                <DropdownMenuItem key={lang} asChild>
                  <a
                    href={langPath(lang) + window.location.hash}
                    hrefLang={lang}
                    lang={lang}
                    onClick={() => rememberLanguage(lang)}
                    aria-current={lang === currentLang ? 'true' : undefined}
                  >
                    {t('seo.languageName', { lng: lang })} {lang === currentLang && '✓'}
                  </a>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Theme Toggle */}
          <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full">
            {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            <span className="sr-only">Toggle theme</span>
          </Button>

          {/* Hamburger for mobile */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden rounded-full"
            onClick={toggleMobileMenu}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="sr-only">Menu</span>
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <nav id="mobile-menu" aria-label={t('nav.label')} className="md:hidden bg-background border-t border-border py-4">
          <ul className="flex flex-col items-center space-y-2">
            {NAV_ITEMS.map(({ key, id }) => (
              <li key={key}>
                <a href={`#${id}`} onClick={handleNavClick(id)} className="text-foreground hover:text-primary transition-colors">
                  {t(`nav.${key}`)}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
