import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'es' | 'en' | 'ca';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
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
    'hero.subtitle':
      "Desenvolupem solucions d'IA personalitzades que optimitzen processos industrials, augmenten l'eficiència i redueixen costos operatius.",
    'hero.cta': 'Sol·licitar Demo',
    'hero.ctaSecondary': 'Veure Serveis',

    // Services
    'services.title': 'Els Nostres Serveis',
    'services.subtitle': "Solucions d'IA dissenyades per a la indústria moderna",
    'services.learnMore': 'Més informació',

    'services.predictive.title': 'Manteniment Predictiu',
    'services.predictive.desc':
      "Cada parada per avaria és una pèrdua irrecuperable de temps i recursos. Amb sistemes basats en dades històriques i models d'IA, anticipem fallades abans que passin, reduint costos i augmentant la fiabilitat de les operacions.",
    'services.predictive.detail':
      "Cada parada per avaria és una pèrdua irrecuperable de temps i recursos. Amb sistemes basats en dades històriques i models d'IA, anticipem fallades abans que passin, reduint costos i augmentant la fiabilitat de les operacions.",

    'services.vision.title': 'Visió Artificial',
    'services.vision.desc':
      'Models basats en visió per computador inspeccionen productes amb una precisió superior a la humana. Mitjançant xarxes neuronals profundes, detectem defectes microscòpics, assegurant estàndards de qualitat consistents i minimitzant el rebuig de productes.',
    'services.vision.detail':
      'Models basats en visió per computador inspeccionen productes amb una precisió superior a la humana. Mitjançant xarxes neuronals profundes, detectem defectes microscòpics, assegurant estàndards de qualitat consistents i minimitzant el rebuig de productes.',

    'services.bots.title': 'Bots i Assistents IA',
    'services.bots.desc':
      "Desenvolupem assistents virtuals intel·ligents per a diferents necessitats, com integració en webs o apps, bots personalitzats per consultar informació interna, o atenció al client, tot agilitzant tasques repetitives, millorant l'eficiència i oferint respostes ràpides i precises.",
    'services.bots.detail':
      "Desenvolupem assistents virtuals intel·ligents per a diferents necessitats, com integració en webs o apps, bots personalitzats per consultar informació interna, o atenció al client, tot agilitzant tasques repetitives, millorant l'eficiència i oferint respostes ràpides i precises.",

    'services.optimization.title': 'Automatització Intel·ligent',
    'services.optimization.desc':
      'Implementem sistemes d\'IA que automatitzen tasques repetitives, reduint errors i alliberant temps valuós per al teu equip. Això permet centrar-se en activitats de més valor i augmentar l\'eficiència global dels processos empresarials.',
    'services.optimization.detail':
      'Implementem sistemes d\'IA que automatitzen tasques repetitives, reduint errors i alliberant temps valuós per al teu equip. Això permet centrar-se en activitats de més valor i augmentar l\'eficiència global dels processos empresarials.',

    'services.analytics.title': 'Analítica Avançada',
    'services.analytics.desc':
      "Convertim les dades de la teva empresa en un avantatge competitiu mitjançant Intel·ligència Artificial, creant models que permeten preveure vendes i stocks, segmentar clients o definir preus dinàmics, tot generant recomanacions útils per millorar les decisions i l'eficiència empresarial.",
    'services.analytics.detail':
      "Convertim les dades de la teva empresa en un avantatge competitiu mitjançant Intel·ligència Artificial, creant models que permeten preveure vendes i stocks, segmentar clients o definir preus dinàmics, tot generant recomanacions útils per millorar les decisions i l'eficiència empresarial.",

    'services.digital.title': 'Bessó Digital',
    'services.digital.desc':
      'Els bessons digitals són rèpliques virtuals exactes de les teves operacions físiques. Permeten simular canvis, provar millores i predir resultats sense interrompre la producció, reduint riscos i accelerant la innovació en els processos industrials.',
    'services.digital.detail':
      'Els bessons digitals són rèpliques virtuals exactes de les teves operacions físiques. Permeten simular canvis, provar millores i predir resultats sense interrompre la producció, reduint riscos i accelerant la innovació en els processos industrials.',

    // About
    'about.title': 'El nostre equip',
    'about.subtitle': 'Experts en IA Industrial',
    'about.text':
      'Tot i ser una empresa de nova creació, els membres que composen el nostre equip tenen una llarga experiència treballant amb Intel·ligència Artificial, big data i altres tecnologies IT. Combinen coneixements tècnics i visió de negoci per oferir solucions innovadores, eficients i adaptades a les necessitats de cada empresa.',
    'about.cta': 'Conèixer més',
    
    'about.member1.name': 'Sergi Masó',
    'about.member1.role': 'Data Analyst',
    'about.member1.desc': 'Especialista en analitzar els reptes de les empreses i traduir-los en solucions pràctiques. Aplica la intel·ligència artificial per resoldre problemes reals, combinant visió transversal i coneixement tècnic per connectar tecnologia i negoci i generar valor tangible.',
    
    'about.member2.name': 'Laura Martínez',
    'about.member2.role': 'AI Engineer',
    'about.member2.desc': 'Especialista en visió per computador i deep learning. Lidera projectes de control de qualitat automàtic amb precisió superior al 99%.',
    
    'about.member3.name': 'Gil Prat',
    'about.member3.role': 'Full Stack Engineer',
    'about.member3.desc': 'Especialista en desenvolupar solucions completes, combinant back-end, front-end i bases de dades. Capacitat per integrar tecnologia IoT i xarxes, liderar equips tècnics i transformar requisits complexos en solucions funcionals i escalables.',
    
    'about.member4.name': 'David Torres',
    'about.member4.role': 'ML Engineer',
    'about.member4.desc': 'Expert en automatització intel·ligent i optimització de processos. Desenvolupa sistemes que redueixen costos operatius significativament.',
    
    'about.member5.name': 'Anna Rovira',
    'about.member5.role': 'Business Intelligence Analyst',
    'about.member5.desc': 'Especialista en analítica avançada i visualització de dades. Transforma dades complexes en insights accionables per a la presa de decisions.',

    // Contact
    'contact.title': 'Contacta amb Nosaltres',
    'contact.subtitle': 'Som aquí per ajudar-te a transformar la teva empresa',
    'contact.phone': 'Telèfon',
    'contact.location': 'Ubicació',
    'contact.emailDesc': "Envia'ns un correu electrònic",
    'contact.phoneDesc': "Truca'ns directament",
    'contact.locationDesc': 'Vine a visitar-nos',
    'contact.linkedinDesc': 'Connecta amb nosaltres',

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
    'nav.home': 'Inicio',
    'nav.services': 'Servicios',
    'nav.about': 'Nosotros',
    'nav.contact': 'Contacto',
    'nav.blog': 'Blog',

    'hero.title': 'Transformamos la Industria con',
    'hero.titleHighlight': 'Inteligencia Artificial',
    'hero.subtitle':
      'Desarrollamos soluciones de IA personalizadas que optimizan procesos industriales, aumentan la eficiencia y reducen costes operativos.',
    'hero.cta': 'Solicitar Demo',
    'hero.ctaSecondary': 'Ver Servicios',

    'services.title': 'Nuestros Servicios',
    'services.subtitle': 'Soluciones de IA diseñadas para la industria moderna',
    'services.learnMore': 'Más información',

    'services.predictive.title': 'Mantenimiento Predictivo',
    'services.predictive.desc':
      'Cada parada por avería es una pérdida irrecuperable de tiempo y recursos. Con sistemas basados en datos históricos y modelos de IA, anticipamos fallos antes de que ocurran, reduciendo costes y aumentando la fiabilidad de las operaciones.',
    'services.predictive.detail':
      'Cada parada por avería es una pérdida irrecuperable de tiempo y recursos. Con sistemas basados en datos históricos y modelos de IA, anticipamos fallos antes de que ocurran, reduciendo costes y aumentando la fiabilidad de las operaciones.',

    'services.vision.title': 'Visión Artificial',
    'services.vision.desc':
      'Modelos basados en visión por computador inspeccionan productos con una precisión superior a la humana. Mediante redes neuronales profundas, detectamos defectos microscópicos, asegurando estándares de calidad consistentes y minimizando el rechazo de productos.',
    'services.vision.detail':
      'Modelos basados en visión por computador inspeccionan productos con una precisión superior a la humana. Mediante redes neuronales profundas, detectamos defectos microscópicos, asegurando estándares de calidad consistentes y minimizando el rechazo de productos.',

    'services.bots.title': 'Bots y Asistentes IA',
    'services.bots.desc':
      'Desarrollamos asistentes virtuales inteligentes para diferentes necesidades, como integración en webs o apps, bots personalizados para consultar información interna o atención al cliente, agilizando tareas repetitivas, mejorando la eficiencia y ofreciendo respuestas rápidas y precisas.',
    'services.bots.detail':
      'Desarrollamos asistentes virtuales inteligentes para diferentes necesidades, como integración en webs o apps, bots personalizados para consultar información interna o atención al cliente, agilizando tareas repetitivas, mejorando la eficiencia y ofreciendo respuestas rápidas y precisas.',

    'services.optimization.title': 'Automatización Inteligente',
    'services.optimization.desc':
      'Implementamos sistemas de IA que automatizan tareas repetitivas, reduciendo errores y liberando tiempo valioso para tu equipo. Esto permite centrarse en actividades de mayor valor y aumentar la eficiencia global de los procesos empresariales.',
    'services.optimization.detail':
      'Implementamos sistemas de IA que automatizan tareas repetitivas, reduciendo errores y liberando tiempo valioso para tu equipo. Esto permite centrarse en actividades de mayor valor y aumentar la eficiencia global de los procesos empresariales.',

    'services.analytics.title': 'Analítica Avanzada',
    'services.analytics.desc':
      'Convertimos los datos de tu empresa en una ventaja competitiva mediante Inteligencia Artificial, creando modelos que permiten prever ventas y stocks, segmentar clientes o definir precios dinámicos, generando recomendaciones útiles para mejorar las decisiones y la eficiencia empresarial.',
    'services.analytics.detail':
      'Convertimos los datos de tu empresa en una ventaja competitiva mediante Inteligencia Artificial, creando modelos que permiten prever ventas y stocks, segmentar clientes o definir precios dinámicos, generando recomendaciones útiles para mejorar las decisiones y la eficiencia empresarial.',

    'services.digital.title': 'Gemelo Digital',
    'services.digital.desc':
      'Los gemelos digitales son réplicas virtuales exactas de tus operaciones físicas. Permiten simular cambios, probar mejoras y predecir resultados sin interrumpir la producción, reduciendo riesgos y acelerando la innovación en los procesos industriales.',
    'services.digital.detail':
      'Los gemelos digitales son réplicas virtuales exactas de tus operaciones físicas. Permiten simular cambios, probar mejoras y predecir resultados sin interrumpir la producción, reduciendo riesgos y acelerando la innovación en los procesos industriales.',

    'about.title': 'Nuestro Equipo',
    'about.subtitle': 'Expertos en IA Industrial',
    'about.text':
      'Aunque somos una empresa de nueva creación, los miembros que componen nuestro equipo tienen una larga experiencia trabajando con Inteligencia Artificial, big data y otras tecnologías IT. Combinan conocimientos técnicos y visión de negocio para ofrecer soluciones innovadoras, eficientes y adaptadas a las necesidades de cada empresa.',
    'about.cta': 'Conocer más',
    
        'about.member1.name': 'Sergi Masó',
    'about.member1.role': 'Data Analyst',
    'about.member1.desc': 'Especialista en analitzar els reptes de les empreses i traduir-los en solucions pràctiques. Aplica la intel·ligència artificial per resoldre problemes reals, combinant visió transversal i coneixement tècnic per connectar tecnologia i negoci i generar valor tangible.',
    
    
    'about.member2.name': 'Laura Martínez',
    'about.member2.role': 'AI Engineer',
    'about.member2.desc': 'Especialista en visión por computador y deep learning. Lidera proyectos de control de calidad automático con precisión superior al 99%.',
    
    'about.member3.name': 'Gil Prat',
    'about.member3.role': 'Full Stack Engineer',
    'about.member3.desc': 'Especialista en desenvolupar solucions completes, combinant back-end, front-end i bases de dades. Capacitat per integrar tecnologia IoT i xarxes, liderar equips tècnics i transformar requisits complexos en solucions funcionals i escalables.',
    
    'about.member4.name': 'David Torres',
    'about.member4.role': 'ML Engineer',
    'about.member4.desc': 'Experto en automatización inteligente y optimización de procesos. Desarrolla sistemas que reducen costos operativos significativamente.',
    
    'about.member5.name': 'Anna Rovira',
    'about.member5.role': 'Business Intelligence Analyst',
    'about.member5.desc': 'Especialista en analítica avanzada y visualización de datos. Transforma datos complejos en insights accionables para la toma de decisiones.',

    'contact.title': 'Contáctanos',
    'contact.subtitle': 'Estamos aquí para ayudarte a transformar tu empresa',
    'contact.phone': 'Teléfono',
    'contact.location': 'Ubicación',
    'contact.emailDesc': 'Envíanos un correo electrónico',
    'contact.phoneDesc': 'Llámanos directamente',
    'contact.locationDesc': 'Ven a visitarnos',
    'contact.linkedinDesc': 'Conecta con nosotros',

    'blog.title': 'Últimas Noticias',
    'blog.subtitle': 'Mantente informado sobre las novedades en IA industrial',
    'blog.readMore': 'Leer más',
    'blog.linkedin': 'Síguenos en LinkedIn',

    'footer.tagline': 'Transformando la industria con IA',
    'footer.rights': 'Todos los derechos reservados',
    'footer.quick': 'Enlaces rápidos',
    'footer.legal': 'Legal',
    'footer.privacy': 'Privacidad',
    'footer.terms': 'Términos',
  },

  en: {
    'nav.home': 'Home',
    'nav.services': 'Services',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.blog': 'Blog',

    'hero.title': 'Transforming Industry with',
    'hero.titleHighlight': 'Artificial Intelligence',
    'hero.subtitle':
      'We develop customized AI solutions that optimize industrial processes, increase efficiency, and reduce operational costs.',
    'hero.cta': 'Request Demo',
    'hero.ctaSecondary': 'View Services',

    'services.title': 'Our Services',
    'services.subtitle': 'AI solutions designed for modern industry',
    'services.learnMore': 'Learn more',

    'services.predictive.title': 'Predictive Maintenance',
    'services.predictive.desc':
      'Every breakdown means lost time and resources. Using historical data and AI models, we predict failures before they occur, reducing costs and increasing operational reliability.',
    'services.predictive.detail':
      'Every breakdown means lost time and resources. Using historical data and AI models, we predict failures before they occur, reducing costs and increasing operational reliability.',

    'services.vision.title': 'Computer Vision',
    'services.vision.desc':
      'AI vision models inspect products with accuracy superior to humans. Through deep neural networks, we detect microscopic defects, ensuring consistent quality standards and minimizing product rejection.',
    'services.vision.detail':
      'AI vision models inspect products with accuracy superior to humans. Through deep neural networks, we detect microscopic defects, ensuring consistent quality standards and minimizing product rejection.',

    'services.bots.title': 'AI Bots and Assistants',
    'services.bots.desc':
      'We develop intelligent virtual assistants for various needs, such as web or app integration, custom bots for internal data queries, or customer support—streamlining repetitive tasks, improving efficiency, and delivering fast and accurate responses.',
    'services.bots.detail':
      'We develop intelligent virtual assistants for various needs, such as web or app integration, custom bots for internal data queries, or customer support—streamlining repetitive tasks, improving efficiency, and delivering fast and accurate responses.',

    'services.optimization.title': 'Intelligent Automation',
    'services.optimization.desc':
      'We implement AI systems that automate repetitive tasks, reducing errors and freeing valuable time for your team. This allows focus on high-value activities and increases overall business process efficiency.',
    'services.optimization.detail':
      'We implement AI systems that automate repetitive tasks, reducing errors and freeing valuable time for your team. This allows focus on high-value activities and increases overall business process efficiency.',

    'services.analytics.title': 'Advanced Analytics',
    'services.analytics.desc':
      'We turn your company\'s data into a competitive advantage through Artificial Intelligence—creating models that predict sales and stock, segment customers, or define dynamic pricing, generating useful recommendations to improve decisions and efficiency.',
    'services.analytics.detail':
      'We turn your company\'s data into a competitive advantage through Artificial Intelligence—creating models that predict sales and stock, segment customers, or define dynamic pricing, generating useful recommendations to improve decisions and efficiency.',

    'services.digital.title': 'Digital Twin',
    'services.digital.desc':
      'Digital twins are exact virtual replicas of your physical operations. They allow you to simulate changes, test improvements, and predict results without disrupting production, reducing risks and accelerating innovation in industrial processes.',
    'services.digital.detail':
      'Digital twins are exact virtual replicas of your physical operations. They allow you to simulate changes, test improvements, and predict results without disrupting production, reducing risks and accelerating innovation in industrial processes.',

    'about.title': 'Our Team',
    'about.subtitle': 'Industrial AI Experts',
    'about.text':
      'Although a newly founded company, our team members have extensive experience working with Artificial Intelligence, big data, and other IT technologies. They combine technical knowledge and business vision to deliver innovative, efficient, and tailored solutions to each company\'s needs.',
    'about.cta': 'Learn More',
    
    'about.member1.name': 'Sergi Masó',
    'about.member1.role': 'Data Analyst',
    'about.member1.desc': 'Especialista en analitzar els reptes de les empreses i traduir-los en solucions pràctiques. Aplica la intel·ligència artificial per resoldre problemes reals, combinant visió transversal i coneixement tècnic per connectar tecnologia i negoci i generar valor tangible.',
    
    
    'about.member2.name': 'Laura Martínez',
    'about.member2.role': 'AI Engineer',
    'about.member2.desc': 'Specialist in computer vision and deep learning. Leads automated quality control projects with over 99% precision.',
    
    'about.member3.name': 'Gil Prat',
    'about.member3.role': 'Full Stack Engineer',
    'about.member3.desc': 'Especialista en desenvolupar solucions completes, combinant back-end, front-end i bases de dades. Capacitat per integrar tecnologia IoT i xarxes, liderar equips tècnics i transformar requisits complexos en solucions funcionals i escalables.',
    
    'about.member4.name': 'David Torres',
    'about.member4.role': 'ML Engineer',
    'about.member4.desc': 'Expert in intelligent automation and process optimization. Develops systems that significantly reduce operational costs.',
    
    'about.member5.name': 'Anna Rovira',
    'about.member5.role': 'Business Intelligence Analyst',
    'about.member5.desc': 'Specialist in advanced analytics and data visualization. Transforms complex data into actionable insights for decision-making.',

    'contact.title': 'Contact Us',
    'contact.subtitle': "We\'re here to help you transform your business",
    'contact.phone': 'Phone',
    'contact.location': 'Location',
    'contact.emailDesc': 'Send us an email',
    'contact.phoneDesc': 'Call us directly',
    'contact.locationDesc': 'Visit us',
    'contact.linkedinDesc': 'Connect with us',

    'blog.title': 'Latest News',
    'blog.subtitle': 'Stay informed about industrial AI developments',
    'blog.readMore': 'Read more',
    'blog.linkedin': 'Follow us on LinkedIn',

    'footer.tagline': 'Transforming industry with AI',
    'footer.rights': 'All rights reserved',
    'footer.quick': 'Quick Links',
    'footer.legal': 'Legal',
    'footer.privacy': 'Privacy',
    'footer.terms': 'Terms',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const getBrowserLanguage = (): Language => {
    const browserLang = navigator.language.split('-')[0].toLowerCase();
    if (browserLang === 'ca' || browserLang === 'es' || browserLang === 'en') {
      return browserLang as Language;
    }
    return 'en'; // Fallback a anglès si no és cap dels idiomes suportats
  };

  const [language, setLanguage] = useState<Language>(getBrowserLanguage());
  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};
