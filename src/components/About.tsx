import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  BarChart,
  Bot,
  Box,
  CheckCircle2,
  ChevronDown,
  Cog,
  Eye,
  Linkedin,
  Mail,
  TrendingUp,
  type LucideIcon,
} from 'lucide-react';
import { ABOUT_SECTION_IDS as IDS, visibleFacts, type AboutContent } from '@/lib/about';
import member1 from '@/assets/team/member-1.webp';
import member2 from '@/assets/team/member-2.webp';
import member3 from '@/assets/team/member-3.webp';
import member4 from '@/assets/team/member-4.webp';
import member5 from '@/assets/team/member-5.webp';

// Les fotos van per ordre, igual que aboutPage.team.members als JSON d'idiomes
const memberImages = [member1, member2, member3, member4, member5];

const serviceIcons: Record<string, LucideIcon> = {
  predictive: Cog,
  vision: Eye,
  digital: Box,
  bots: Bot,
  analytics: BarChart,
  optimization: TrendingUp,
};

const scrollToSection = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
};

const SubHeading = ({ id, children }: { id: string; children: ReactNode }) => (
  <h2 id={id} className="scroll-mt-28 text-3xl md:text-4xl font-bold tracking-tight mb-8">
    {children}
  </h2>
);

const About = () => {
  const { t } = useTranslation();
  const c = t('aboutPage', { returnObjects: true }) as AboutContent;
  const facts = visibleFacts(c.facts.rows);

  return (
    <section id="about" className="pt-24 pb-16 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10 max-w-6xl space-y-24">
        {/* 1. Proposta de valor */}
        <header className="text-center max-w-4xl mx-auto animate-fade-in">
          <span className="inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1 text-sm font-medium text-primary mb-6">
            {c.eyebrow}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">{c.title}</h2>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10">{c.valueProp}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="hero" onClick={() => scrollToSection('contact')} className="group">
              {c.ctaPrimary}
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button size="lg" variant="heroOutline" onClick={() => scrollToSection(IDS.facts)}>
              {c.ctaSecondary}
            </Button>
          </div>

          <dl className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {c.highlights.map((h) => (
              <div key={h.label} className="rounded-2xl border border-border/60 bg-card/60 p-6 backdrop-blur-sm">
                <dt className="sr-only">{h.label}</dt>
                <dd className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">{h.value}</dd>
                <dd className="mt-1 text-sm text-muted-foreground">{h.label}</dd>
              </div>
            ))}
          </dl>
        </header>

        {/* 2. Què fa NDXai */}
        <div>
          <SubHeading id={IDS.what}>{c.what.title}</SubHeading>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {c.what.items.map((s) => {
              const Icon = serviceIcons[s.id] ?? Cog;
              return (
                <article
                  key={s.id}
                  className="group rounded-2xl border border-border/60 bg-card/60 p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:-translate-y-1"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-primary shadow-lg shadow-primary/25">
                    <Icon className="h-6 w-6 text-primary-foreground" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.text}</p>
                </article>
              );
            })}
          </div>
        </div>

        {/* 3. Què ens fa diferents */}
        <div>
          <SubHeading id={IDS.different}>{c.different.title}</SubHeading>
          <ol className="grid gap-6 md:grid-cols-2">
            {c.different.items.map((d, i) => (
              <li key={d.title} className="flex gap-5 rounded-2xl border border-border/60 bg-card/60 p-6">
                <span
                  className="shrink-0 text-3xl font-bold leading-none bg-gradient-primary bg-clip-text text-transparent tabular-nums"
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="text-lg font-semibold mb-2">{d.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{d.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* 4. Qui treballa amb NDXai */}
        <div>
          <SubHeading id={IDS.who}>{c.who.title}</SubHeading>
          <ul className="grid gap-4 md:grid-cols-2">
            {c.who.items.map((w) => (
              <li key={w} className="flex gap-3 items-start rounded-xl bg-muted/40 p-4">
                <CheckCircle2 className="h-5 w-5 mt-0.5 shrink-0 text-primary" aria-hidden="true" />
                <span className="text-foreground/90 leading-relaxed">{w}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 5. L'equip */}
        <div>
          <SubHeading id={IDS.team}>{c.team.title}</SubHeading>
          {(c.team.story || c.team.composition) && (
            <div className="max-w-3xl space-y-4 mb-10 text-lg text-muted-foreground leading-relaxed">
              {c.team.story && <p>{c.team.story}</p>}
              {c.team.composition && <p>{c.team.composition}</p>}
            </div>
          )}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {c.team.members.map((m, i) => (
              <article
                key={m.name}
                className="group flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card/60 transition-all duration-300 hover:border-primary/50 hover:shadow-xl"
              >
                <div className="aspect-[4/3] lg:aspect-square overflow-hidden bg-muted/30">
                  <img
                    src={memberImages[i]}
                    alt={`${m.name}, ${m.role}`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-base font-semibold">{m.name}</h3>
                  <p className="text-xs font-medium text-primary mb-3">{m.role}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1">{m.bio}</p>
                  {m.linkedin && (
                    <a
                      href={m.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${c.team.linkedinLabel} ${m.name}`}
                      className="mt-4 inline-flex items-center gap-2 text-sm text-primary hover:underline"
                    >
                      <Linkedin className="h-4 w-4" aria-hidden="true" />
                      LinkedIn
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* 6. Com treballem */}
        <div>
          <SubHeading id={IDS.how}>{c.how.title}</SubHeading>
          <ol className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {c.how.steps.map((s, i) => (
              <li key={s.title} className="relative rounded-2xl border border-border/60 bg-card/60 p-6">
                <span className="mb-4 flex h-9 w-9 items-center justify-center rounded-full bg-gradient-primary text-sm font-bold text-primary-foreground">
                  {i + 1}
                </span>
                <h3 className="text-lg font-semibold mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.text}</p>
              </li>
            ))}
          </ol>
          <p className="mt-6 flex gap-3 items-start rounded-xl bg-primary/5 border border-primary/20 p-5 text-foreground/90 leading-relaxed">
            <Mail className="h-5 w-5 mt-0.5 shrink-0 text-primary" aria-hidden="true" />
            <span>{c.how.channels}</span>
          </p>
        </div>

        {/* 7. Dades clau: <dl> rastrejable, clau per a la cerca amb IA */}
        <div>
          <SubHeading id={IDS.facts}>{c.facts.title}</SubHeading>
          <dl className="overflow-hidden rounded-2xl border border-border/60 bg-card/60 divide-y divide-border/60">
            {facts.map((r) => (
              <div key={r.key} className="grid gap-1 px-6 py-4 sm:grid-cols-[220px_1fr] sm:gap-6">
                <dt className="text-sm font-semibold text-muted-foreground">{r.label}</dt>
                <dd className="text-foreground">
                  {r.href ? (
                    <a href={r.href} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      {r.value}
                    </a>
                  ) : (
                    r.value
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* 8. Preguntes freqüents */}
        <div>
          <SubHeading id={IDS.faq}>{c.faq.title}</SubHeading>
          <div className="space-y-3">
            {c.faq.items.map((f) => (
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
        </div>
      </div>
    </section>
  );
};

export default About;
