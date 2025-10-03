import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Cog, Zap, Eye, TrendingUp, BarChart, Box } from 'lucide-react';

const Services = () => {
  const { t } = useLanguage();
  const [selectedService, setSelectedService] = useState<number | null>(null);

  const services = [
    {
      icon: Cog,
      title: t('services.predictive.title'),
      description: t('services.predictive.desc'),
      detail: t('services.predictive.detail'),
    },
    {
      icon: Zap,
      title: t('services.automation.title'),
      description: t('services.automation.desc'),
      detail: t('services.automation.detail'),
    },
    {
      icon: Eye,
      title: t('services.quality.title'),
      description: t('services.quality.desc'),
      detail: t('services.quality.detail'),
    },
    {
      icon: TrendingUp,
      title: t('services.optimization.title'),
      description: t('services.optimization.desc'),
      detail: t('services.optimization.detail'),
    },
    {
      icon: BarChart,
      title: t('services.analytics.title'),
      description: t('services.analytics.desc'),
      detail: t('services.analytics.detail'),
    },
    {
      icon: Box,
      title: t('services.digital.title'),
      description: t('services.digital.desc'),
      detail: t('services.digital.detail'),
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
                className="border-border hover:border-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 cursor-pointer"
                onClick={() => setSelectedService(index)}
              >
                <CardHeader>
                  <div className="w-14 h-14 rounded-lg bg-gradient-primary flex items-center justify-center mb-4">
                    <Icon className="h-7 w-7 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-2xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base mb-4">
                    {service.description}
                  </CardDescription>
                  <Button variant="ghost" className="p-0 h-auto text-primary hover:text-primary/80">
                    {t('services.learnMore')} →
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      <Dialog open={selectedService !== null} onOpenChange={() => setSelectedService(null)}>
        <DialogContent className="max-w-2xl">
          {selectedService !== null && (
            <>
              <DialogHeader>
                <div className="w-16 h-16 rounded-lg bg-gradient-primary flex items-center justify-center mb-4">
                  {(() => {
                    const Icon = services[selectedService].icon;
                    return <Icon className="h-8 w-8 text-primary-foreground" />;
                  })()}
                </div>
                <DialogTitle className="text-3xl">
                  {services[selectedService].title}
                </DialogTitle>
                <DialogDescription className="text-base pt-4">
                  {services[selectedService].detail}
                </DialogDescription>
              </DialogHeader>
              <div className="mt-6">
                <Button 
                  variant="hero" 
                  onClick={() => {
                    setSelectedService(null);
                    const element = document.getElementById('contact');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  Solicitar consulta
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Services;
