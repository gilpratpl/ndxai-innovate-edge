import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'es' | 'en' | 'ca';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  ca: {
    // Navbar
    'nav.home': 'Inici',
    'nav.services': 'Serveis',
    'nav.about': 'Nosaltres',
    'nav.contact': 'Contacte',
    'nav.blog': 'Blog',
    
    // Hero
    'hero.title': 'Transformem la Indústria amb',
    'hero.titleHighlight': 'Intel·ligència Artificial',
    'hero.subtitle': 'Desenvolupem solucions d\'IA personalitzades que optimitzen processos industrials, augmenten l\'eficiència i redueixen costos operatius.',
    'hero.cta': 'Sol·licitar Demo',
    'hero.ctaSecondary': 'Veure Serveis',
    
    // Services
    'services.title': 'Els Nostres Serveis',
    'services.subtitle': 'Solucions d\'IA dissenyades per a la indústria moderna',
    'services.learnMore': 'Més informació',
    'services.predictive.title': 'Manteniment Predictiu',
    'services.predictive.desc': 'Anticipa fallades en maquinària amb IA, reduint temps d\'inactivitat i costos de manteniment.',
    'services.predictive.detail': 'El nostre sistema de manteniment predictiu utilitza algoritmes avançats de machine learning per analitzar dades de sensors en temps real. Detectem patrons anomals abans que esdevinguin fallades crítiques, permetent una planificació proactiva del manteniment i reduint fins a un 40% els costos operatius.',
    'services.automation.title': 'Automatització Intel·ligent',
    'services.automation.desc': 'Optimitza processos productius amb sistemes d\'automatització basats en machine learning.',
    'services.automation.detail': 'Implementem solucions d\'automatització intel·ligent que aprenen i s\'adapten als teus processos. Des de la robòtica col·laborativa fins a l\'optimització de cadenes de producció, les nostres solucions augmenten la productivitat mentre mantenen la flexibilitat necessària per adaptar-se a canvis en la demanda.',
    'services.quality.title': 'Control de Qualitat',
    'services.quality.desc': 'Sistemes de visió artificial per a detecció de defectes en temps real.',
    'services.quality.detail': 'Els nostres sistemes de visió artificial inspeccionen productes amb precisió superior a la humana. Utilitzem xarxes neuronals profundes per detectar defectes microscòpics, garantint estàndards de qualitat consistents i reduint el rebuig de productes fins a un 90%.',
    'services.optimization.title': 'Optimització de Processos',
    'services.optimization.desc': 'Analitza i millora l\'eficiència operativa mitjançant algoritmes avançats d\'IA.',
    'services.optimization.detail': 'Analitzem tots els aspectes de les teves operacions per identificar oportunitats d\'optimització. Els nostres models d\'IA simulen milers d\'escenaris per trobar la configuració òptima que maximitzi l\'eficiència, redueixi el consum energètic i millori els marges operatius.',
    'services.analytics.title': 'Analítica Avançada',
    'services.analytics.desc': 'Transforma dades industrials en insights accionables amb dashboards intel·ligents.',
    'services.analytics.detail': 'Convertim les teves dades en avantatge competitiu. Les nostres plataformes d\'analítica utilitzen IA per descobrir patrons ocults, predir tendències i proporcionar recomanacions accionables a través d\'interfícies intuïtives que faciliten la presa de decisions basades en dades.',
    'services.digital.title': 'Bessó Digital',
    'services.digital.desc': 'Crea rèpliques virtuals dels teus processos per a simulació i optimització contínua.',
    'services.digital.detail': 'Els bessos digitals són rèpliques virtuals exactes de les teves operacions físiques. Permet simular canvis, testar millores i predir resultats sense interrompre la producció. Aquesta tecnologia revolucionària redueix riscos i accelera la innovació en els teus processos industrials.',
    
    // About
    'about.title': 'Sobre NdxAI',
    'about.subtitle': 'Experts en IA Industrial',
    'about.text': 'Som un equip especialitzat en desenvolupar solucions d\'intel·ligència artificial per a empreses industrials. Amb anys d\'experiència al sector, ajudem els nostres clients a digitalitzar i optimitzar les seves operacions mitjançant tecnologia d\'avantguarda.',
    'about.cta': 'Conèixer més',
    
    // Contact
    'contact.title': 'Contacta amb Nosaltres',
    'contact.subtitle': 'Som aquí per ajudar-te a transformar la teva empresa',
    'contact.name': 'Nom',
    'contact.email': 'Email',
    'contact.company': 'Empresa',
    'contact.message': 'Missatge',
    'contact.send': 'Enviar Missatge',
    'contact.namePlaceholder': 'El teu nom',
    'contact.emailPlaceholder': 'el_teu@email.com',
    'contact.companyPlaceholder': 'La teva empresa',
    'contact.messagePlaceholder': 'Explica\'ns sobre el teu projecte...',
    'contact.success': 'Missatge enviat amb èxit!',
    
    // Blog
    'blog.title': 'Últimes Notícies',
    'blog.subtitle': 'Mantén-te informat sobre les novetats en IA industrial',
    'blog.readMore': 'Llegir més',
    'blog.linkedin': 'Segueix-nos a LinkedIn',
    
    // Footer
    'footer.tagline': 'Transformant la indústria amb IA',
    'footer.rights': 'Tots els drets reservats',
    'footer.quick': 'Enllaços ràpids',
    'footer.legal': 'Legal',
    'footer.privacy': 'Privacitat',
    'footer.terms': 'Termes',
  },
  es: {
    // Navbar
    'nav.home': 'Inicio',
    'nav.services': 'Servicios',
    'nav.about': 'Nosotros',
    'nav.contact': 'Contacto',
    'nav.blog': 'Blog',
    
    // Hero
    'hero.title': 'Transformamos la Industria con',
    'hero.titleHighlight': 'Inteligencia Artificial',
    'hero.subtitle': 'Desarrollamos soluciones de IA personalizadas que optimizan procesos industriales, aumentan la eficiencia y reducen costes operativos.',
    'hero.cta': 'Solicitar Demo',
    'hero.ctaSecondary': 'Ver Servicios',
    
    // Services
    'services.title': 'Nuestros Servicios',
    'services.subtitle': 'Soluciones de IA diseñadas para la industria moderna',
    'services.learnMore': 'Más información',
    'services.predictive.title': 'Mantenimiento Predictivo',
    'services.predictive.desc': 'Anticipa fallos en maquinaria con IA, reduciendo tiempos de inactividad y costes de mantenimiento.',
    'services.predictive.detail': 'Nuestro sistema de mantenimiento predictivo utiliza algoritmos avanzados de machine learning para analizar datos de sensores en tiempo real. Detectamos patrones anómalos antes de que se conviertan en fallos críticos, permitiendo una planificación proactiva del mantenimiento y reduciendo hasta un 40% los costes operativos.',
    'services.automation.title': 'Automatización Inteligente',
    'services.automation.desc': 'Optimiza procesos productivos con sistemas de automatización basados en machine learning.',
    'services.automation.detail': 'Implementamos soluciones de automatización inteligente que aprenden y se adaptan a tus procesos. Desde robótica colaborativa hasta optimización de cadenas de producción, nuestras soluciones aumentan la productividad mientras mantienen la flexibilidad necesaria para adaptarse a cambios en la demanda.',
    'services.quality.title': 'Control de Calidad',
    'services.quality.desc': 'Sistemas de visión artificial para detección de defectos en tiempo real.',
    'services.quality.detail': 'Nuestros sistemas de visión artificial inspeccionan productos con precisión superior a la humana. Utilizamos redes neuronales profundas para detectar defectos microscópicos, garantizando estándares de calidad consistentes y reduciendo el rechazo de productos hasta un 90%.',
    'services.optimization.title': 'Optimización de Procesos',
    'services.optimization.desc': 'Analiza y mejora la eficiencia operativa mediante algoritmos avanzados de IA.',
    'services.optimization.detail': 'Analizamos todos los aspectos de tus operaciones para identificar oportunidades de optimización. Nuestros modelos de IA simulan miles de escenarios para encontrar la configuración óptima que maximice la eficiencia, reduzca el consumo energético y mejore los márgenes operativos.',
    'services.analytics.title': 'Analítica Avanzada',
    'services.analytics.desc': 'Transforma datos industriales en insights accionables con dashboards inteligentes.',
    'services.analytics.detail': 'Convertimos tus datos en ventaja competitiva. Nuestras plataformas de analítica utilizan IA para descubrir patrones ocultos, predecir tendencias y proporcionar recomendaciones accionables a través de interfaces intuitivas que facilitan la toma de decisiones basadas en datos.',
    'services.digital.title': 'Gemelo Digital',
    'services.digital.desc': 'Crea réplicas virtuales de tus procesos para simulación y optimización continua.',
    'services.digital.detail': 'Los gemelos digitales son réplicas virtuales exactas de tus operaciones físicas. Permite simular cambios, testear mejoras y predecir resultados sin interrumpir la producción. Esta tecnología revolucionaria reduce riesgos y acelera la innovación en tus procesos industriales.',
    
    // About
    'about.title': 'Sobre NdxAI',
    'about.subtitle': 'Expertos en IA Industrial',
    'about.text': 'Somos un equipo especializado en desarrollar soluciones de inteligencia artificial para empresas industriales. Con años de experiencia en el sector, ayudamos a nuestros clientes a digitalizar y optimizar sus operaciones mediante tecnología de vanguardia.',
    'about.cta': 'Conocer más',
    
    // Contact
    'contact.title': 'Contacta con Nosotros',
    'contact.subtitle': 'Estamos aquí para ayudarte a transformar tu empresa',
    'contact.name': 'Nombre',
    'contact.email': 'Email',
    'contact.company': 'Empresa',
    'contact.message': 'Mensaje',
    'contact.send': 'Enviar Mensaje',
    'contact.namePlaceholder': 'Tu nombre',
    'contact.emailPlaceholder': 'tu@email.com',
    'contact.companyPlaceholder': 'Tu empresa',
    'contact.messagePlaceholder': 'Cuéntanos sobre tu proyecto...',
    'contact.success': '¡Mensaje enviado con éxito!',
    
    // Blog
    'blog.title': 'Últimas Noticias',
    'blog.subtitle': 'Mantente informado sobre las novedades en IA industrial',
    'blog.readMore': 'Leer más',
    'blog.linkedin': 'Síguenos en LinkedIn',
    
    // Footer
    'footer.tagline': 'Transformando la industria con IA',
    'footer.rights': 'Todos los derechos reservados',
    'footer.quick': 'Enlaces rápidos',
    'footer.legal': 'Legal',
    'footer.privacy': 'Privacidad',
    'footer.terms': 'Términos',
  },
  en: {
    // Navbar
    'nav.home': 'Home',
    'nav.services': 'Services',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.blog': 'Blog',
    
    // Hero
    'hero.title': 'Transforming Industry with',
    'hero.titleHighlight': 'Artificial Intelligence',
    'hero.subtitle': 'We develop custom AI solutions that optimize industrial processes, increase efficiency, and reduce operational costs.',
    'hero.cta': 'Request Demo',
    'hero.ctaSecondary': 'View Services',
    
    // Services
    'services.title': 'Our Services',
    'services.subtitle': 'AI solutions designed for modern industry',
    'services.learnMore': 'Learn more',
    'services.predictive.title': 'Predictive Maintenance',
    'services.predictive.desc': 'Anticipate machinery failures with AI, reducing downtime and maintenance costs.',
    'services.predictive.detail': 'Our predictive maintenance system uses advanced machine learning algorithms to analyze sensor data in real-time. We detect anomalous patterns before they become critical failures, enabling proactive maintenance planning and reducing operational costs by up to 40%.',
    'services.automation.title': 'Intelligent Automation',
    'services.automation.desc': 'Optimize production processes with machine learning-based automation systems.',
    'services.automation.detail': 'We implement intelligent automation solutions that learn and adapt to your processes. From collaborative robotics to production chain optimization, our solutions increase productivity while maintaining the flexibility needed to adapt to changing demand.',
    'services.quality.title': 'Quality Control',
    'services.quality.desc': 'Computer vision systems for real-time defect detection.',
    'services.quality.detail': 'Our computer vision systems inspect products with superhuman precision. We use deep neural networks to detect microscopic defects, ensuring consistent quality standards and reducing product rejection by up to 90%.',
    'services.optimization.title': 'Process Optimization',
    'services.optimization.desc': 'Analyze and improve operational efficiency through advanced AI algorithms.',
    'services.optimization.detail': 'We analyze all aspects of your operations to identify optimization opportunities. Our AI models simulate thousands of scenarios to find the optimal configuration that maximizes efficiency, reduces energy consumption, and improves operating margins.',
    'services.analytics.title': 'Advanced Analytics',
    'services.analytics.desc': 'Transform industrial data into actionable insights with intelligent dashboards.',
    'services.analytics.detail': 'We turn your data into competitive advantage. Our analytics platforms use AI to uncover hidden patterns, predict trends, and provide actionable recommendations through intuitive interfaces that facilitate data-driven decision making.',
    'services.digital.title': 'Digital Twin',
    'services.digital.desc': 'Create virtual replicas of your processes for simulation and continuous optimization.',
    'services.digital.detail': 'Digital twins are exact virtual replicas of your physical operations. They allow you to simulate changes, test improvements, and predict results without disrupting production. This revolutionary technology reduces risks and accelerates innovation in your industrial processes.',
    
    // About
    'about.title': 'About NdxAI',
    'about.subtitle': 'Industrial AI Experts',
    'about.text': 'We are a team specialized in developing artificial intelligence solutions for industrial companies. With years of experience in the sector, we help our clients digitize and optimize their operations through cutting-edge technology.',
    'about.cta': 'Learn More',
    
    // Contact
    'contact.title': 'Contact Us',
    'contact.subtitle': "We're here to help transform your business",
    'contact.name': 'Name',
    'contact.email': 'Email',
    'contact.company': 'Company',
    'contact.message': 'Message',
    'contact.send': 'Send Message',
    'contact.namePlaceholder': 'Your name',
    'contact.emailPlaceholder': 'your@email.com',
    'contact.companyPlaceholder': 'Your company',
    'contact.messagePlaceholder': 'Tell us about your project...',
    'contact.success': 'Message sent successfully!',
    
    // Blog
    'blog.title': 'Latest News',
    'blog.subtitle': 'Stay informed about industrial AI developments',
    'blog.readMore': 'Read more',
    'blog.linkedin': 'Follow us on LinkedIn',
    
    // Footer
    'footer.tagline': 'Transforming industry with AI',
    'footer.rights': 'All rights reserved',
    'footer.quick': 'Quick Links',
    'footer.legal': 'Legal',
    'footer.privacy': 'Privacy',
    'footer.terms': 'Terms',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('ca');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.es] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
