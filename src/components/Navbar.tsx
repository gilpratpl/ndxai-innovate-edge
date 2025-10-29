import { useState, useEffect } from 'react';
import { Moon, Sun, Globe, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTranslation } from 'react-i18next';

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

  const handleLanguageChange = (lang: 'es' | 'en' | 'ca') => i18n.changeLanguage(lang);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false); // close mobile menu after click
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/70 backdrop-blur-xl border-b border-border/50 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src={theme === 'dark' ? logo : logoDark} alt="NdxAI Logo" className="h-12 w-30 transition-transform hover:scale-105 duration-300" />
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {['home', 'services', 'about', 'contact', 'blog'].map((id) => (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              className="relative text-foreground hover:text-primary transition-colors duration-300 group"
            >
              <span>{t(`nav.${id}`)}</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-primary transition-all duration-300 group-hover:w-full" />
            </button>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Language Dropdown */}
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Globe className="h-5 w-5" />
                <span className="sr-only">Change language</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleLanguageChange('es')}>
                Español {i18n.language?.startsWith('es') && '✓'}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleLanguageChange('ca')}>
                Català {i18n.language?.startsWith('ca') && '✓'}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleLanguageChange('en')}>
                English {i18n.language?.startsWith('en') && '✓'}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Theme Toggle */}
          <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full">
            {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            <span className="sr-only">Toggle theme</span>
          </Button>

          {/* Hamburger for mobile */}
          <Button variant="ghost" size="icon" className="md:hidden rounded-full" onClick={toggleMobileMenu}>
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="sr-only">Menu</span>
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background border-t border-border flex flex-col items-center py-4 space-y-2">
          {['home', 'services', 'about', 'contact', 'blog'].map((id) => (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              className="text-foreground hover:text-primary transition-colors"
            >
              {t(`nav.${id}`)}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
