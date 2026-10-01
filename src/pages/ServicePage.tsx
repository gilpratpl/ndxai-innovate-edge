import { useTranslation } from 'react-i18next';
import { ArrowRight, CheckCircle2, ChevronDown, Cog } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageLayout from '@/components/PageLayout';
import Contact from '@/components/Contact';
import { serviceIcons } from '@/components/serviceIcons';
import { usePagesContent } from '@/hooks/use-pages-content';
import { ABOUT_SECTION_IDS, type AboutServiceItem } from '@/lib/about';
import { pagePath, type ServiceId } from '@/lib/pages';
import { currentLang } from '@/lib/route';
import { scrollToSection, sectionHref } from '@/lib/sections';
import { langPath } from '@/lib/seo';

const H2 = ({ children }: { children: string }) => (
  <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-6">{children}</h2>
);

// Pàgina pròpia d'un servei. El mateix contingut surt en HTML estàtic a dist/ (src/lib/pages.ts).
const ServicePage = ({ id }: { id: ServiceId }) => {
  const { t } = useTranslation();
  const pages = usePagesContent();
  const services = t('aboutPage.what.items', { returnObjects: true }) as AboutServiceItem[];
  const service = services.find((s) => s.id === id)!;
  const Icon = serviceIcons[id] ?? Cog;
  const p = pages?.services[id];

  return (
    <PageLayout
      crumbs={[
        { label: t('nav.home'), href: langPath(currentLang) },
        { label: t('nav.services'), href: sectionHref(ABOUT_SECTION_IDS.what) },
        { label: service.title },
      ]}
    >
      {pages && p && (
        <>
          <article className="container mx-auto px-4 max-w-4xl space-y-16 pb-8">
            <header>
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-primary shadow-lg shadow-primary/25">
                <Icon className="h-7 w-7 text-primary-foreground" aria-hidden="true" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">{p.h1}</h1>
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                {service.text.split('\n').map((para) => (
                  <p key={para}>{para}</p>
                ))}
              </div>
              <Button size="lg" variant="hero" onClick={() => scrollToSection('contact')} className="group mt-8">
                {pages.ui.cta}
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </header>

            <section>
              <H2>{pages.ui.problemsTitle}</H2>
              <ul className="grid gap-4 md:grid-cols-2">
                {p.problems.map((item) => (
                  <li key={item} className="flex gap-3 items-start rounded-xl bg-muted/40 p-4">
                    <CheckCircle2 className="h-5 w-5 mt-0.5 shrink-0 text-primary" aria-hidden="true" />
                    <span className="text-foreground/90 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <H2>{pages.ui.approachTitle}</H2>
              <ol className="space-y-4">
                {p.approach.map((step, i) => (
                  <li key={step} className="flex gap-4 rounded-2xl border border-border/60 bg-card/60 p-5">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-primary text-sm font-bold text-primary-foreground">
                      {i + 1}
                    </span>
                    <span className="text-foreground/90 leading-relaxed">{step}</span>
                  </li>
                ))}
              </ol>
            </section>

            <section>
              <H2>{pages.ui.casesTitle}</H2>
              <ul className="grid gap-4 md:grid-cols-2">
                {p.cases.map((item) => (
                  <li
                    key={item}
                    className="rounded-2xl border border-border/60 bg-card/60 p-5 text-foreground/90 leading-relaxed"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <H2>{pages.ui.faqTitle}</H2>
              <div className="space-y-3">
                {p.faq.map((f) => (
                  <details
                    key={f.q}
                    className="group rounded-2xl border border-border/60 bg-card/60 open:border-primary/40 open:shadow-lg transition-all"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 [&::-webkit-details-marker]:hidden">
                      <h3 className="text-base md:text-lg font-semibold">{f.q}</h3>
                      <ChevronDown
                        className="h-5 w-5 shrink-0 text-primary transition-transform duration-300 group-open:rotate-180"
                        aria-hidden="true"
                      />
                    </summary>
                    <p className="px-5 pb-5 text-muted-foreground leading-relaxed">{f.a}</p>
                  </details>
                ))}
              </div>
            </section>

            <section>
              <H2>{pages.ui.otherTitle}</H2>
              <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {services
                  .filter((s) => s.id !== id)
                  .map((s) => {
                    const OtherIcon = serviceIcons[s.id] ?? Cog;
                    return (
                      <li key={s.id}>
                        <a
                          href={pagePath(currentLang, { kind: 'service', id: s.id as ServiceId })}
                          className="flex items-center gap-3 rounded-xl border border-border/60 bg-card/60 p-4 font-medium transition-all hover:border-primary/50 hover:text-primary"
                        >
                          <OtherIcon className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                          {s.title}
                        </a>
                      </li>
                    );
                  })}
              </ul>
            </section>
          </article>
          <Contact />
        </>
      )}
    </PageLayout>
  );
};

export default ServicePage;
