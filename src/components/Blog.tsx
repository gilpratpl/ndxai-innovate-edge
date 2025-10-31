import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Linkedin, Calendar, TrendingUp } from 'lucide-react';

const Blog = () => {
  const { t, i18n } = useTranslation();

const newsItems = {
  es: [
    {
      title: 'La IA optimiza la predicción de la demanda en logística 4.0',
      excerpt: 'La inteligencia artificial permite a las empresas anticipar la demanda en tiempo real, mejorando la eficiencia de la cadena de suministro y reduciendo costes operativos.',
      date: '20 Oct 2025',
      trending: true,
      link: 'https://thelogisticsworld.com/tecnologia/logistica-4-0-como-la-ia-optimiza-la-prediccion-de-la-demanda-en-tiempo-real/',
    },
    {
      title: 'La IA revoluciona el mantenimiento predictivo en la industria 4.0',
      excerpt: 'La combinación de gemelos digitales, IoT y aprendizaje automático está mejorando la precisión y eficiencia del mantenimiento, reduciendo costes hasta un 30%.',
      date: '2 Oct 2025',
      trending: true,
      link: 'https://www.computerweekly.com/es/noticias/366632086/El-mantenimiento-predictivo-basado-en-IA-gana-terreno',
    },
    {
      title: 'Visión artificial transforma la industria de precisión',
      excerpt: 'Sistemas de visión artificial están incrementando la calidad y eficiencia en procesos industriales, permitiendo un control más preciso y consistente.',
      date: '18 Oct 2025',
      trending: true,
      link: 'https://www.automaticaeinstrumentacion.com/texto-diario/mostrar/4894678/vision-artificial-transforma-industria-precision-eficiencia-precedentes',
    },
  ],
  ca: [
    {
      title: 'La IA optimitza la predicció de la demanda en logística 4.0',
      excerpt: 'La intel·ligència artificial permet a les empreses anticipar la demanda en temps real, millorant l’eficiència de la cadena de subministrament i reduint costos operatius.',
      date: '20 Oct 2025',
      trending: true,
      link: 'https://thelogisticsworld.com/tecnologia/logistica-4-0-como-la-ia-optimiza-la-prediccion-de-la-demanda-en-tiempo-real/',
    },
    {
      title: 'La IA revoluciona el manteniment predictiu en la indústria 4.0',
      excerpt: 'La combinació de bessons digitals, IoT i aprenentatge automàtic està millorant la precisió i eficiència del manteniment, reduint costos fins al 30%.',
      date: '2 Oct 2025',
      trending: true,
      link: 'https://www.computerweekly.com/es/noticias/366632086/El-mantenimiento-predictivo-basado-en-IA-gana-terreno',
    },
    {
      title: 'Visió artificial transforma la indústria de precisió',
      excerpt: 'Els sistemes de visió artificial incrementen la qualitat i eficiència en processos industrials, permetent un control més precís i consistent.',
      date: '18 Oct 2025',
      trending: true,
      link: 'https://www.automaticaeinstrumentacion.com/texto-diario/mostrar/4894678/vision-artificial-transforma-industria-precision-eficiencia-precedentes',
    },
  ],
  en: [
    {
      title: 'AI optimizes demand forecasting in Logistics 4.0',
      excerpt: 'Artificial intelligence enables companies to anticipate demand in real-time, enhancing supply chain efficiency and reducing operational costs.',
      date: 'Oct 20, 2025',
      trending: true,
      link: 'https://thelogisticsworld.com/tecnologia/logistica-4-0-como-la-ia-optimiza-la-prediccion-de-la-demanda-en-tiempo-real/',
    },
    {
      title: 'AI revolutionizes predictive maintenance in Industry 4.0',
      excerpt: 'The combination of digital twins, IoT, and machine learning is improving maintenance accuracy and efficiency, reducing costs by up to 30%.',
      date: 'Oct 2, 2025',
      trending: true,
      link: 'https://www.computerweekly.com/es/noticias/366632086/El-mantenimiento-predictivo-basado-en-IA-gana-terreno',
    },
    {
      title: 'Computer vision transforms precision industry',
      excerpt: 'Computer vision systems are increasing quality and efficiency in industrial processes, enabling more precise and consistent control.',
      date: 'Oct 18, 2025',
      trending: true,
      link: 'https://www.automaticaeinstrumentacion.com/texto-diario/mostrar/4894678/vision-artificial-transforma-industria-precision-eficiencia-precedentes',
    },
  ],
};


  const lang = (i18n.language || 'ca').split('-')[0] as 'ca' | 'es' | 'en';
  const currentNews = newsItems[lang] || newsItems.ca;

  return (
    <section id="blog" className="pt-24 pb-12 bg-gradient-to-b from-background via-muted/10 to-background relative overflow-hidden">
      {/* Decoraciones 
      <div className="absolute top-0 right-1/4 w-72 h-72 bg-secondary/10 rounded-full blur-3xl" />
*/}
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t('blog.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('blog.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {currentNews.map((item, index) => (
            <Card
              key={index}
              className="group border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-xl hover:-translate-y-2 backdrop-blur-sm bg-card/50 hover:bg-card animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                  <Calendar className="h-4 w-4" />
                  <span>{item.date}</span>
                  {item.trending && (
                    <>
                      <div className="ml-auto flex items-center gap-1 px-2 py-1 rounded-full bg-primary/10 text-primary">
                        <TrendingUp className="h-3 w-3" />
                        <span className="text-xs font-medium">Trending</span>
                      </div>
                    </>
                  )}
                </div>
                <CardTitle className="text-xl leading-tight group-hover:text-primary transition-colors">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base mb-4 leading-relaxed">
                  {item.excerpt}
                </CardDescription>
                <Button 
                  variant="ghost" 
                  className="p-0 h-auto text-primary hover:text-primary/80 group-hover:translate-x-1 transition-transform"
                  onClick={() => window.open(item.link, '_blank')}
                >
                  {t('blog.readMore')} →
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <Button
            variant="hero"
            size="lg"
            onClick={() => window.open('https://www.linkedin.com/company/neural-dynamics-ai', '_blank')}
            className="group"
          >
            <Linkedin className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
            {t('blog.linkedin')}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Blog;
