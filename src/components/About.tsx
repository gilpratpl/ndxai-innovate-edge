import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Target, Users, Lightbulb, Award } from 'lucide-react';

const About = () => {
  const { t } = useLanguage();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const values = [
    { icon: Target, label: 'Precisión' },
    { icon: Users, label: 'Colaboración' },
    { icon: Lightbulb, label: 'Innovación' },
    { icon: Award, label: 'Excelencia' },
  ];

  return (
    <section id="about" className="py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              {t('about.title')}
            </h2>
            <p className="text-xl text-muted-foreground mb-4">
              {t('about.subtitle')}
            </p>
            <p className="text-lg text-muted-foreground mb-8">
              {t('about.text')}
            </p>
            <Button
              size="lg"
              variant="default"
              onClick={() => scrollToSection('contact')}
            >
              {t('about.cta')}
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className="p-6 rounded-lg bg-card border border-border hover:border-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
                >
                  <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold">{value.label}</h3>
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
