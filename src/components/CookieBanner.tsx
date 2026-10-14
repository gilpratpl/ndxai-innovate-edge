import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { OPEN_CONSENT_EVENT, getConsent, setConsent, type Consent } from '@/lib/consent';
import { pagePath } from '@/lib/pages';
import { currentLang } from '@/lib/route';

// Bàner de cookies: surt si encara no s'ha triat i quan es clica "Cookies" al peu.
// Acceptar i rebutjar tenen el mateix pes visual (criteri de l'AEPD).
const CookieBanner = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(() => getConsent() === null);

  useEffect(() => {
    const show = () => setOpen(true);
    window.addEventListener(OPEN_CONSENT_EVENT, show);
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, show);
  }, []);

  if (!open) return null;

  const choose = (value: Consent) => {
    setConsent(value);
    setOpen(false);
  };

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label={t('cookies.title')}
      className="fixed inset-x-0 bottom-0 z-[60] p-4 sm:inset-x-auto sm:left-6 sm:bottom-6 sm:max-w-md sm:p-0"
    >
      <div className="rounded-2xl border border-border bg-card p-5 shadow-2xl">
        <p className="font-semibold text-foreground mb-2">{t('cookies.title')}</p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {t('cookies.text')}{' '}
          <a href={pagePath(currentLang, { kind: 'legal', id: 'privacy' })} className="text-primary underline underline-offset-2">
            {t('cookies.more')}
          </a>
        </p>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <Button variant="outline" onClick={() => choose('denied')}>
            {t('cookies.reject')}
          </Button>
          <Button variant="outline" onClick={() => choose('granted')}>
            {t('cookies.accept')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
