import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Cog, Bot, Eye, TrendingUp, BarChart, Box } from 'lucide-react';

const Services = () => {
  const { t } = useTranslation();
  const [selectedService, setSelectedService] = useState<number | null>(null);

  const services = [
    {
      icon: Cog,
      title: t('services.predictive.title'),
      description: t('services.predictive.desc'),
      detail: t('services.predictive.detail'),
    },
    {
      icon: Eye,
      title: t('services.vision.title'),
      description: t('services.vision.desc'),
      detail: t('services.vision.detail'),
    },
    {
      icon: Box,
      title: t('services.digital.title'),
      description: t('services.digital.desc'),
      detail: t('services.digital.detail'),
    },
    {
      icon: Bot,
      title: t('services.bots.title'),
      description: t('services.bots.desc'),
      detail: t('services.bots.detail'),
    },
    {
      icon: BarChart,
      title: t('services.analytics.title'),
      description: t('services.analytics.desc'),
      detail: t('services.analytics.detail'),
    },
    {
      icon: TrendingUp,
      title: t('services.optimization.title'),
      description: t('services.optimization.desc'),
      detail: t('services.optimization.detail'),
    },

  ];

  return (
    <section id="services" className="pt-24 pb-12 bg-gradient-to-b from-background via-muted/20 to-background relative overflow-hidden">
      {/* Decoraciones de fondo 
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-secondary/10 rounded-full blur-3xl" />
      */}

      <div className="container mx-auto px-4 lg:px-24 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t('services.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('services.subtitle')}
          </p>
        </div>
       
<div
  className="
    flex overflow-x-auto snap-x snap-mandatory gap-6 pb-4
    md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8 md:pb-0
  "
>
  {services.map((service, index) => {
    const Icon = service.icon;
    return (
      <Card
        key={index}
        className="
          min-w-[80%] sm:min-w-[60%] md:min-w-0
          snap-start flex-shrink-0
          group border-border/100 hover:border-primary/50 transition-all duration-500 cursor-pointer
          backdrop-blur-sm bg-card/50 hover:bg-card hover:shadow-xl
        "
        onClick={() => setSelectedService(index)}
        style={{ animationDelay: `${index * 0.1}s` }}
      >
        <CardHeader>
          <CardTitle className="text-2xl group-hover:text-primary transition-colors">
            {service.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="lg:w-24 lg:h-24 w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-primary/25">
            <Icon className="lg:h-12 lg:w-12 h-8 w-8 text-primary-foreground" />
          </div>
          <Button
            variant="ghost"
            className="p-0 h-auto text-primary hover:text-primary/80 group-hover:translate-x-1 transition-transform"
          >
            {t('services.learnMore')} →
          </Button>
        </CardContent>
      </Card>
    );
  })}
</div>

 {/*
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card
                key={index}
                className="group border-border/50 hover:border-primary/50 transition-all duration-500 cursor-pointer backdrop-blur-sm bg-card/50 hover:bg-card hover:shadow-xl hover:-translate-y-2 animate-fade-in"
                onClick={() => setSelectedService(index)}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                      <CardTitle className="text-2xl group-hover:text-primary transition-colors">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                 <div className="lg:w-24 lg:h-24 w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-primary/25">
                    <Icon className="lg:h-12 lg:w-12 h-8 w-8 text-primary-foreground" />
                  </div>
                  <Button variant="ghost" className="p-0 h-auto text-primary hover:text-primary/80 group-hover:translate-x-1 transition-transform">
                    {t('services.learnMore')} →
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        */}
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
                  {t('services.requestConsultation')}
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
