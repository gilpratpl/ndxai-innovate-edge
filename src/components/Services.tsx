import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Cog, Zap, Eye, TrendingUp, BarChart, Box } from 'lucide-react';

const Services = () => {
  const { t } = useLanguage();

  const services = [
    {
      icon: Cog,
      title: t('services.predictive.title'),
      description: t('services.predictive.desc'),
    },
    {
      icon: Zap,
      title: t('services.automation.title'),
      description: t('services.automation.desc'),
    },
    {
      icon: Eye,
      title: t('services.quality.title'),
      description: t('services.quality.desc'),
    },
    {
      icon: TrendingUp,
      title: t('services.optimization.title'),
      description: t('services.optimization.desc'),
    },
    {
      icon: BarChart,
      title: t('services.analytics.title'),
      description: t('services.analytics.desc'),
    },
    {
      icon: Box,
      title: t('services.digital.title'),
      description: t('services.digital.desc'),
    },
  ];

  return (
    <section id="services" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t('services.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('services.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card
                key={index}
                className="border-border hover:border-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
              >
                <CardHeader>
                  <div className="w-14 h-14 rounded-lg bg-gradient-primary flex items-center justify-center mb-4">
                    <Icon className="h-7 w-7 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-2xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
