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
      },
      {
        title: 'Automatización inteligente: El futuro de la manufactura',
        excerpt: 'Descubre cómo los robots colaborativos equipados con IA están revolucionando las líneas de producción en Europa.',
        date: '10 Mar 2025',
        trending: false,
      },
      {
        title: 'Visión artificial en control de calidad: Casos de éxito',
        excerpt: 'Análisis de implementaciones exitosas de sistemas de visión artificial que han mejorado la calidad del producto en un 90%.',
        date: '5 Mar 2025',
        trending: true,
      },
    ],
    ca: [
      {
        title: 'La IA revoluciona el manteniment predictiu en la indústria 4.0',
        excerpt: 'Nous algoritmes de machine learning estan transformant com les empreses industrials gestionen el manteniment de maquinària, reduint costos fins a un 40%.',
        date: '15 Mar 2025',
        trending: true,
      },
      {
        title: 'Automatització intel·ligent: El futur de la manufactura',
        excerpt: 'Descobreix com els robots col·laboratius equipats amb IA estan revolucionant les línies de producció a Europa.',
        date: '10 Mar 2025',
        trending: false,
      },
      {
        title: 'Visió artificial en control de qualitat: Casos d\'èxit',
        excerpt: 'Anàlisi d\'implementacions reeixides de sistemes de visió artificial que han millorat la qualitat del producte en un 90%.',
        date: '5 Mar 2025',
        trending: true,
      },
    ],
    en: [
      {
        title: 'AI revolutionizes predictive maintenance in Industry 4.0',
        excerpt: 'New machine learning algorithms are transforming how industrial companies manage machinery maintenance, reducing costs by up to 40%.',
        date: 'Mar 15, 2025',
        trending: true,
      },
      {
        title: 'Intelligent automation: The future of manufacturing',
        excerpt: 'Discover how AI-equipped collaborative robots are revolutionizing production lines across Europe.',
        date: 'Mar 10, 2025',
        trending: false,
      },
      {
        title: 'Computer vision in quality control: Success stories',
        excerpt: 'Analysis of successful implementations of computer vision systems that have improved product quality by 90%.',
        date: 'Mar 5, 2025',
        trending: true,
      },
    ],
  };

  const currentNews = newsItems[language] || newsItems.es;

  return (
    <section id="blog" className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
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
              className="border-border hover:border-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
            >
              <CardHeader>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <Calendar className="h-4 w-4" />
                  <span>{item.date}</span>
                  {item.trending && (
                    <>
                      <TrendingUp className="h-4 w-4 ml-2 text-primary" />
                      <span className="text-primary">Trending</span>
                    </>
                  )}
                </div>
                <CardTitle className="text-xl">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base mb-4">
                  {item.excerpt}
                </CardDescription>
                <Button variant="ghost" className="p-0 h-auto text-primary hover:text-primary/80">
                  {t('blog.readMore')} →
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button
            variant="hero"
            size="lg"
            onClick={() => window.open('https://www.linkedin.com/company/ndxai', '_blank')}
          >
            <Linkedin className="mr-2 h-5 w-5" />
            {t('blog.linkedin')}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Blog;
