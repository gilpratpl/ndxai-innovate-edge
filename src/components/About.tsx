import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import member1 from '@/assets/team/member-1.jpg';
import member2 from '@/assets/team/member-2.jpg';
import member3 from '@/assets/team/member-3.jpg';
import member4 from '@/assets/team/member-4.jpg';
import member5 from '@/assets/team/member-5.jpg';

const About = () => {
  const { t } = useLanguage();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const teamMembers = [
    { 
      image: member1, 
      name: t('about.member1.name'),
      role: t('about.member1.role'),
      desc: t('about.member1.desc')
    },
    { 
      image: member2, 
      name: t('about.member2.name'),
      role: t('about.member2.role'),
      desc: t('about.member2.desc')
    },
    { 
      image: member3, 
      name: t('about.member3.name'),
      role: t('about.member3.role'),
      desc: t('about.member3.desc')
    },
    { 
      image: member4, 
      name: t('about.member4.name'),
      role: t('about.member4.role'),
      desc: t('about.member4.desc')
    },
    { 
      image: member5, 
      name: t('about.member5.name'),
      role: t('about.member5.role'),
      desc: t('about.member5.desc')
    },
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

          <div className="flex flex-nowrap overflow-x-auto gap-4 pb-4 -mx-4 px-4 scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="group rounded-2xl bg-gradient-to-br from-card to-card/50 border border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-xl hover:-translate-y-2 backdrop-blur-sm animate-fade-in overflow-hidden flex flex-col min-w-[200px] w-[200px]"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-full h-40 overflow-hidden flex items-center justify-center bg-muted/30">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <h3 className="text-base font-semibold mb-1 group-hover:text-primary transition-colors">{member.name}</h3>
                  <p className="text-xs text-primary font-medium mb-2">{member.role}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed flex-1">{member.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
