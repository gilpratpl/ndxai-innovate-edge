import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Target, Users, Lightbulb, Award, ArrowRight } from 'lucide-react';

const About = () => {
  const { t } = useLanguage();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const values = [
    { icon: Target, label: t('about.precision') },
    { icon: Users, label: t('about.colaboration') },
    { icon: Lightbulb, label: t('about.innovation') },
    { icon: Award, label: t('about.excelence') },
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Decoración de fondo */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              {t('about.title')}
            </h2>
            <p className="text-xl text-muted-foreground mb-4 leading-relaxed">
              {t('about.subtitle')}
            </p>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              {t('about.text')}
            </p>
            <Button
              size="lg"
              variant="hero"
              onClick={() => scrollToSection('contact')}
              className="group"
            >
              {t('about.cta')}
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className="group p-8 rounded-2xl bg-gradient-to-br from-card to-card/50 border border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-xl hover:-translate-y-2 backdrop-blur-sm animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-14 h-14 rounded-xl bg-gradient-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-primary/25">
                    <Icon className="h-7 w-7 text-primary-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">{value.label}</h3>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
