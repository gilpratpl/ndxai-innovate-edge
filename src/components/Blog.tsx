import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Linkedin, Calendar, TrendingUp } from 'lucide-react';

const Blog = () => {
  const { t, language } = useLanguage();

  const newsItems = {
    es: [
      {
        title: 'La IA revoluciona el mantenimiento predictivo en la industria 4.0',
        excerpt: 'Nuevos algoritmos de machine learning están transformando cómo las empresas industriales gestionan el mantenimiento de maquinaria, reduciendo costes hasta un 40%.',
        date: '15 Mar 2025',
        trending: true,
        link: 'https://www.linkedin.com/company/neural-dynamics-ai',
      },
      {
        title: 'Automatización inteligente: El futuro de la manufactura',
        excerpt: 'Descubre cómo los robots colaborativos equipados con IA están revolucionando las líneas de producción en Europa.',
        date: '10 Mar 2025',
        trending: false,
        link: 'https://www.linkedin.com/company/neural-dynamics-ai',
      },
      {
        title: 'Visión artificial en control de calidad: Casos de éxito',
        excerpt: 'Análisis de implementaciones exitosas de sistemas de visión artificial que han mejorado la calidad del producto en un 90%.',
        date: '5 Mar 2025',
        trending: true,
        link: 'https://www.linkedin.com/company/neural-dynamics-ai',
      },
    ],
    ca: [
      {
        title: 'La IA revoluciona el manteniment predictiu en la indústria 4.0',
        excerpt: 'Nous algoritmes de machine learning estan transformant com les empreses industrials gestionen el manteniment de maquinària, reduint costos fins a un 40%.',
        date: '15 Mar 2025',
        trending: true,
        link: 'https://www.linkedin.com/company/neural-dynamics-ai',
      },
      {
        title: 'Automatització intel·ligent: El futur de la manufactura',
        excerpt: 'Descobreix com els robots col·laboratius equipats amb IA estan revolucionant les línies de producció a Europa.',
        date: '10 Mar 2025',
        trending: false,
        link: 'https://www.linkedin.com/company/neural-dynamics-ai',
      },
      {
        title: 'Visió artificial en control de qualitat: Casos d\'èxit',
        excerpt: 'Anàlisi d\'implementacions reeixides de sistemes de visió artificial que han millorat la qualitat del producte en un 90%.',
        date: '5 Mar 2025',
        trending: true,
        link: 'https://www.linkedin.com/company/neural-dynamics-ai',
      },
    ],
    en: [
      {
        title: 'AI revolutionizes predictive maintenance in Industry 4.0',
        excerpt: 'New machine learning algorithms are transforming how industrial companies manage machinery maintenance, reducing costs by up to 40%.',
        date: 'Mar 15, 2025',
        trending: true,
        link: 'https://www.linkedin.com/company/neural-dynamics-ai',
      },
      {
        title: 'Intelligent automation: The future of manufacturing',
        excerpt: 'Discover how AI-equipped collaborative robots are revolutionizing production lines across Europe.',
        date: 'Mar 10, 2025',
        trending: false,
        link: 'https://www.linkedin.com/company/neural-dynamics-ai',
      },
      {
        title: 'Computer vision in quality control: Success stories',
        excerpt: 'Analysis of successful implementations of computer vision systems that have improved product quality by 90%.',
        date: 'Mar 5, 2025',
        trending: true,
        link: 'https://www.linkedin.com/company/neural-dynamics-ai',
      },
    ],
  };

  const currentNews = newsItems[language] || newsItems.es;

  return (
    <section id="blog" className="py-24 bg-gradient-to-b from-background via-muted/10 to-background relative overflow-hidden">
      {/* Decoraciones */}
      <div className="absolute top-0 right-1/4 w-72 h-72 bg-secondary/10 rounded-full blur-3xl" />

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
