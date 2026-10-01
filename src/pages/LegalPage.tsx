import { useTranslation } from 'react-i18next';
import PageLayout from '@/components/PageLayout';
import { usePagesContent } from '@/hooks/use-pages-content';
import { orgIdentityRows, type LegalId } from '@/lib/pages';
import { currentLang } from '@/lib/route';
import { langPath } from '@/lib/seo';

const LEGAL_LABELS = { privacy: 'footer.privacy', notice: 'footer.terms' } as const;

// Política de privacitat i avís legal. El mateix contingut surt en HTML estàtic a dist/ (src/lib/pages.ts).
const LegalPage = ({ id }: { id: LegalId }) => {
  const { t } = useTranslation();
  const pages = usePagesContent();
  const p = pages?.legal[id];

  return (
    <PageLayout crumbs={[{ label: t('nav.home'), href: langPath(currentLang) }, { label: t(LEGAL_LABELS[id]) }]}>
      {pages && p && (
        <article className="container mx-auto px-4 max-w-4xl pb-24">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">{p.title}</h1>
          <p className="text-sm text-muted-foreground mb-8">
            {pages.ui.updated}: <time dateTime={p.updated}>{new Date(p.updated).toLocaleDateString(currentLang, { dateStyle: 'long', timeZone: 'UTC' })}</time>
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">{p.intro}</p>

          <h2 className="text-2xl font-bold tracking-tight mt-12 mb-4">{pages.ui.identityTitle}</h2>
          <dl className="overflow-hidden rounded-2xl border border-border/60 bg-card/60 divide-y divide-border/60">
            {orgIdentityRows(pages.ui).map((r) => (
              <div key={r.label} className="grid gap-1 px-6 py-4 sm:grid-cols-[220px_1fr] sm:gap-6">
                <dt className="text-sm font-semibold text-muted-foreground">{r.label}</dt>
                <dd className="text-foreground">{r.value}</dd>
              </div>
            ))}
          </dl>

          {p.sections.map((s) => (
            <section key={s.title}>
              <h2 className="text-2xl font-bold tracking-tight mt-12 mb-4">{s.title}</h2>
              <div className="space-y-4 text-foreground/90 leading-relaxed">
                {s.body.map((para) => (
                  <p key={para}>{para}</p>
                ))}
              </div>
            </section>
          ))}
        </article>
      )}
    </PageLayout>
  );
};

export default LegalPage;
