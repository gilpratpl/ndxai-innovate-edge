import { useTranslation } from 'react-i18next';
import { Mail, Phone, MapPin, Linkedin } from 'lucide-react';

const Contact = () => {
  const { t } = useTranslation();

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email',
      value: 'info@ndxai.eu',
      link: 'mailto:info@ndxai.eu',
      description: t('contact.emailDesc'),
    },
    {
      icon: Phone,
      title: t('contact.phone'),
      value: '+34 696978421',
      link: 'tel:+34696978421',
      description: t('contact.phoneDesc'),
    },
       {
      icon: MapPin,
      title: t('contact.location'),
      value: 'Vic, Barcelona',
      link: 'https://maps.google.com/?q=Vic',
      description: t('contact.locationDesc'),
    },
    {
      icon: Linkedin,
      title: 'LinkedIn',
      value: '@neural-dynamics-ai',
      link: 'https://www.linkedin.com/company/neural-dynamics-ai',
      description: t('contact.linkedinDesc'),
    },
  ];

  return (
    <section id="contact" className="pt-24 pb-12 bg-gradient-to-b from-background via-muted/20 to-background relative overflow-hidden">
      {/* Decoraciones 
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
*/}
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t('contact.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>

       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {contactMethods.map((method, index) => {
            const Icon = method.icon;
            return (
              <a
                key={index}
                href={method.link}
                target={method.link.startsWith('http') ? '_blank' : undefined}
                rel={method.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="group p-8 rounded-2xl bg-gradient-to-br from-card to-card/50 border border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-xl hover:-translate-y-2 text-center backdrop-blur-sm animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-primary/25">
                  <Icon className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">{method.title}</h3>
                <p className="text-muted-foreground text-sm mb-3 leading-relaxed">{method.description}</p>
                <p className="text-foreground font-medium group-hover:text-primary transition-colors">
                  {method.value}
                </p>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Contact;
