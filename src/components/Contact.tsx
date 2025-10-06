import { useLanguage } from '@/contexts/LanguageContext';
import { Mail, Phone, MapPin, Linkedin } from 'lucide-react';

const Contact = () => {
  const { t } = useLanguage();

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email',
      value: 'contact@ndxai.com',
      link: 'mailto:contact@ndxai.com',
      description: t('contact.emailDesc'),
    },
    {
      icon: Phone,
      title: t('contact.phone'),
      value: '+34 900 123 456',
      link: 'tel:+34900123456',
      description: t('contact.phoneDesc'),
    },
    {
      icon: MapPin,
      title: t('contact.location'),
      value: 'Barcelona, Catalunya',
      link: 'https://maps.google.com/?q=Barcelona',
      description: t('contact.locationDesc'),
    },
    {
      icon: Linkedin,
      title: 'LinkedIn',
      value: '@ndxai',
      link: 'https://www.linkedin.com/company/ndxai',
      description: t('contact.linkedinDesc'),
    },
  ];

  return (
    <section id="contact" className="py-24 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            {t('contact.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {contactMethods.map((method, index) => {
            const Icon = method.icon;
            return (
              <a
                key={index}
                href={method.link}
                target={method.link.startsWith('http') ? '_blank' : undefined}
                rel={method.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="group relative p-8 rounded-2xl bg-card border border-border hover:border-primary transition-all duration-300 hover:shadow-elegant hover:-translate-y-1"
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-xl bg-gradient-primary flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                      {method.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {method.description}
                    </p>
                    <p className="font-medium text-foreground">
                      {method.value}
                    </p>
                  </div>
                </div>
                <div className="absolute inset-0 rounded-2xl bg-gradient-primary opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Contact;
