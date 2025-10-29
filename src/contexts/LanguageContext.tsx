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
    'hero.title': 'Transformem la indústria amb',
    'hero.titleHighlight': 'Intel·ligència Artificial',
    'hero.subtitle':
      "Desenvolupem solucions d'IA personalitzades que optimitzen processos industrials, augmenten l'eficiència i redueixen els costos operatius.",
    'hero.cta': 'Sol·licita una demo',
    'hero.ctaSecondary': 'Veure serveis',

    // Services
    'services.title': 'Els nostres serveis',
    'services.subtitle': "Solucions d'IA dissenyades per a la indústria moderna",
    'services.learnMore': 'Més informació',

    'services.predictive.title': 'Manteniment predictiu',
    'services.predictive.desc':
      "Cada parada per avaria és una pèrdua irrecuperable de temps i recursos. \n Amb dades històriques i models d'IA, anticipem fallades abans que passin, reduint costos i augmentant la fiabilitat de les operacions.",
    'services.predictive.detail':
      "Cada parada per avaria és una pèrdua irrecuperable de temps i recursos. \n Amb dades històriques i models d'IA, anticipem fallades abans que passin, reduint costos i augmentant la fiabilitat de les operacions.",

    'services.vision.title': 'Visió artificial',
    'services.vision.desc':
      "Els models de visió per computador inspeccionen productes amb una precisió superior a la humana. Mitjançant xarxes neuronals profundes, detectem defectes microscòpics i assegurem uns estàndards de qualitat constants.",
    'services.vision.detail':
      "Els models de visió per computador inspeccionen productes amb una precisió superior a la humana. Mitjançant xarxes neuronals profundes, detectem defectes microscòpics i assegurem uns estàndards de qualitat constants.",

    'services.bots.title': 'Bots i assistents IA',
    'services.bots.desc':
      "Desenvolupem assistents virtuals intel·ligents per a diferents necessitats: integració en webs o apps, bots per consultar informació interna o per donar suport a clients, automatitzant tasques repetitives i millorant l'experiència d'usuari.",
    'services.bots.detail':
      "Desenvolupem assistents virtuals intel·ligents per a diferents necessitats: integració en webs o apps, bots per consultar informació interna o per donar suport a clients, automatitzant tasques repetitives i millorant l'experiència d'usuari.",

    'services.optimization.title': 'Automatització intel·ligent',
    'services.optimization.desc':
      "Implementem sistemes d'IA que automatitzen processos repetitius i administratius, reduint errors i alliberant temps valuós perquè el teu equip es pugui centrar en tasques d'alt valor estratègic.",
    'services.optimization.detail':
      "Implementem sistemes d'IA que automatitzen processos repetitius i administratius, reduint errors i alliberant temps valuós perquè el teu equip es pugui centrar en tasques d'alt valor estratègic.",

    'services.analytics.title': 'Analítica avançada',
    'services.analytics.desc':
      "Convertim les dades de la teva empresa en un avantatge competitiu mitjançant tècniques d'IA i aprenentatge automàtic. Creem models que permeten preveure vendes, optimitzar estocs i millorar la presa de decisions.",
    'services.analytics.detail':
      "Convertim les dades de la teva empresa en un avantatge competitiu mitjançant tècniques d'IA i aprenentatge automàtic. Creem models que permeten preveure vendes, optimitzar estocs i millorar la presa de decisions.",

    'services.digital.title': 'Bessó digital',
    'services.digital.desc':
      "Els bessons digitals són rèpliques virtuals exactes de les teves operacions físiques. Permeten simular canvis, provar millores i predir resultats sense aturar la producció, reduint riscos i accelerant la innovació.",
    'services.digital.detail':
      "Els bessons digitals són rèpliques virtuals exactes de les teves operacions físiques. Permeten simular canvis, provar millores i predir resultats sense aturar la producció, reduint riscos i accelerant la innovació.",

    // About
    'about.title': 'El nostre equip',
    'about.subtitle': 'Experts en IA industrial',
    'about.text':
      "El nostre equip compta amb una àmplia experiència en Intel·ligència Artificial, Big Data i tecnologies digitals. Combinen coneixements tècnics amb visió de negoci per identificar les millors oportunitats de millora i generar valor real a les empreses.",
    'about.cta': 'Descobreix més',

    'about.member1.name': 'Sergi Masó',
    'about.member1.role': 'Data Analyst',
    'about.member1.desc':
      "Especialista en analitzar reptes empresarials i traduir-los en solucions pràctiques. Aplica la IA per resoldre problemes reals, combinant coneixement tècnic i visió global per connectar tecnologia i negoci.",

    'about.member2.name': 'Iker Reina',
    'about.member2.role': 'Arquitecte de Ciberseguretat i Infraestructura Cloud',
    'about.member2.desc':
      "Especialista en seguretat Cloud i IA amb experiència internacional, liderant implementacions a gran escala a Europa i Amèrica. Expert en serveis d'IA d'AWS i solucions de seguretat.",

    'about.member3.name': 'Gil Prat',
    'about.member3.role': 'Enginyer Full Stack',
    'about.member3.desc':
      "Especialista en el desenvolupament de solucions completes, combinant back-end, front-end i bases de dades, amb experiència en integració de tecnologia IoT i lideratge tècnic.",

    'about.member4.name': 'David Torres',
    'about.member4.role': 'Enginyer de Machine Learning',
    'about.member4.desc':
      "Expert en automatització intel·ligent i optimització de processos industrials. Desenvolupa sistemes que redueixen costos i milloren l'eficiència operativa.",

    'about.member5.name': 'Anna Rovira',
    'about.member5.role': 'Analista de Business Intelligence',
    'about.member5.desc':
      "Especialista en analítica avançada i visualització de dades. Transforma dades complexes en informació accionable per a la presa de decisions.",

    // Contact
    'contact.title': 'Contacta amb nosaltres',
    'contact.subtitle': 'Som aquí per ajudar-te a transformar la teva empresa',
    'contact.phone': 'Telèfon',
    'contact.location': 'Ubicació',
    'contact.emailDesc': "Envia'ns un correu electrònic",
    'contact.phoneDesc': "Truca'ns directament",
    'contact.locationDesc': 'Vine a visitar-nos',
    'contact.linkedinDesc': 'Connecta amb nosaltres',

    // Blog
    'blog.title': 'Últimes notícies',
    'blog.subtitle': 'Mantén-te informat sobre les novetats en IA industrial',
    'blog.readMore': 'Llegeix més',
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

    'hero.title': 'Transformamos la industria con',
    'hero.titleHighlight': 'Inteligencia Artificial',
    'hero.subtitle':
      'Desarrollamos soluciones de IA personalizadas que optimizan procesos industriales, aumentan la eficiencia y reducen los costes operativos.',
    'hero.cta': 'Solicita una demo',
    'hero.ctaSecondary': 'Ver servicios',

    'services.title': 'Nuestros servicios',
    'services.subtitle': 'Soluciones de IA diseñadas para la industria moderna',
    'services.learnMore': 'Más información',

    'services.predictive.title': 'Mantenimiento predictivo',
    'services.predictive.desc':
      'Cada parada por avería supone una pérdida irrecuperable de tiempo y recursos. Con datos históricos y modelos de IA anticipamos fallos antes de que ocurran, reduciendo costes y aumentando la fiabilidad operativa.',
    'services.predictive.detail':
      'Cada parada por avería supone una pérdida irrecuperable de tiempo y recursos. Con datos históricos y modelos de IA anticipamos fallos antes de que ocurran, reduciendo costes y aumentando la fiabilidad operativa.',

    'services.vision.title': 'Visión artificial',
    'services.vision.desc':
      'Los modelos de visión por computador inspeccionan productos con una precisión superior a la humana. Con redes neuronales profundas, detectamos defectos microscópicos y garantizamos estándares de calidad constantes.',
    'services.vision.detail':
      'Los modelos de visión por computador inspeccionan productos con una precisión superior a la humana. Con redes neuronales profundas, detectamos defectos microscópicos y garantizamos estándares de calidad constantes.',

    'services.bots.title': 'Bots y asistentes IA',
    'services.bots.desc':
      'Desarrollamos asistentes virtuales inteligentes para diversas necesidades: integración en webs o apps, bots para consultar información interna o atención al cliente, automatizando tareas repetitivas y mejorando la experiencia de usuario.',
    'services.bots.detail':
      'Desarrollamos asistentes virtuales inteligentes para diversas necesidades: integración en webs o apps, bots para consultar información interna o atención al cliente, automatizando tareas repetitivas y mejorando la experiencia de usuario.',

    'services.optimization.title': 'Automatización inteligente',
    'services.optimization.desc':
      'Implementamos sistemas de IA que automatizan procesos repetitivos y administrativos, reduciendo errores y liberando tiempo valioso para que tu equipo se centre en tareas de mayor valor estratégico.',
    'services.optimization.detail':
      'Implementamos sistemas de IA que automatizan procesos repetitivos y administrativos, reduciendo errores y liberando tiempo valioso para que tu equipo se centre en tareas de mayor valor estratégico.',

    'services.analytics.title': 'Analítica avanzada',
    'services.analytics.desc':
      'Convertimos los datos de tu empresa en una ventaja competitiva mediante IA y aprendizaje automático. Creamos modelos que predicen ventas, optimizan inventarios y mejoran la toma de decisiones.',
    'services.analytics.detail':
      'Convertimos los datos de tu empresa en una ventaja competitiva mediante IA y aprendizaje automático. Creamos modelos que predicen ventas, optimizan inventarios y mejoran la toma de decisiones.',

    'services.digital.title': 'Gemelo digital',
    'services.digital.desc':
      'Los gemelos digitales son réplicas virtuales exactas de tus operaciones físicas. Permiten simular cambios, probar mejoras y predecir resultados sin detener la producción, reduciendo riesgos y acelerando la innovación.',
    'services.digital.detail':
      'Los gemelos digitales son réplicas virtuales exactas de tus operaciones físicas. Permiten simular cambios, probar mejoras y predecir resultados sin detener la producción, reduciendo riesgos y acelerando la innovación.',

    'about.title': 'Nuestro equipo',
    'about.subtitle': 'Expertos en IA industrial',
    'about.text':
      'Nuestro equipo cuenta con una amplia experiencia en Inteligencia Artificial, Big Data y tecnologías digitales. Combinamos conocimientos técnicos con visión de negocio para identificar oportunidades y generar valor real en las empresas.',
    'about.cta': 'Descubre más',

    'about.member1.name': 'Sergi Masó',
    'about.member1.role': 'Data Analyst',
    'about.member1.desc':
      'Especialista en analizar los retos empresariales y traducirlos en soluciones prácticas. Aplica la IA para resolver problemas reales, combinando conocimiento técnico y visión global para conectar tecnología y negocio.',

    'about.member2.name': 'Iker Reina',
    'about.member2.role': 'Arquitecto de Ciberseguridad e Infraestructura Cloud',
    'about.member2.desc':
      'Especialista en seguridad Cloud e IA con experiencia internacional, liderando implementaciones a gran escala en Europa y América. Experto en servicios de IA de AWS y soluciones de seguridad.',

    'about.member3.name': 'Gil Prat',
    'about.member3.role': 'Ingeniero Full Stack',
    'about.member3.desc':
      'Especialista en el desarrollo de soluciones completas, combinando back-end, front-end y bases de datos, con experiencia en integración de tecnología IoT y liderazgo técnico.',

    'about.member4.name': 'David Torres',
    'about.member4.role': 'Ingeniero de Machine Learning',
    'about.member4.desc':
      'Experto en automatización inteligente y optimización de procesos industriales. Desarrolla sistemas que reducen costes y mejoran la eficiencia operativa.',

    'about.member5.name': 'Anna Rovira',
    'about.member5.role': 'Analista de Business Intelligence',
    'about.member5.desc':
      'Especialista en analítica avanzada y visualización de datos. Transforma datos complejos en información accionable para la toma de decisiones.',

    'contact.title': 'Contáctanos',
    'contact.subtitle': 'Estamos aquí para ayudarte a transformar tu empresa',
    'contact.phone': 'Teléfono',
    'contact.location': 'Ubicación',
    'contact.emailDesc': 'Envíanos un correo electrónico',
    'contact.phoneDesc': 'Llámanos directamente',
    'contact.locationDesc': 'Ven a visitarnos',
    'contact.linkedinDesc': 'Conecta con nosotros',

    'blog.title': 'Últimas noticias',
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

    'hero.title': 'Transforming industry with',
    'hero.titleHighlight': 'Artificial Intelligence',
    'hero.subtitle':
      "We develop customized AI solutions that optimize industrial processes, increase efficiency, and reduce operational costs.",
    'hero.cta': 'Request a demo',
    'hero.ctaSecondary': 'View services',

    'services.title': 'Our services',
    'services.subtitle': 'AI solutions designed for modern industry',
    'services.learnMore': 'Learn more',

    'services.predictive.title': 'Predictive maintenance',
    'services.predictive.desc':
      'Every breakdown represents a loss of time and resources. Using historical data and AI models, we predict failures before they occur, reducing costs and increasing operational reliability.',
    'services.predictive.detail':
      'Every breakdown represents a loss of time and resources. Using historical data and AI models, we predict failures before they occur, reducing costs and increasing operational reliability.',

    'services.vision.title': 'Computer vision',
    'services.vision.desc':
      'AI vision models inspect products with accuracy superior to humans. Through deep neural networks, we detect microscopic defects and ensure consistent quality standards.',
    'services.vision.detail':
      'AI vision models inspect products with accuracy superior to humans. Through deep neural networks, we detect microscopic defects and ensure consistent quality standards.',

    'services.bots.title': 'AI bots and assistants',
    'services.bots.desc':
      'We develop intelligent virtual assistants for multiple needs: website or app integration, internal data query bots, or customer support assistants that automate repetitive tasks and enhance user experience.',
    'services.bots.detail':
      'We develop intelligent virtual assistants for multiple needs: website or app integration, internal data query bots, or customer support assistants that automate repetitive tasks and enhance user experience.',

    'services.optimization.title': 'Intelligent automation',
    'services.optimization.desc':
      'We implement AI systems that automate repetitive and administrative tasks, reducing errors and freeing valuable time so your team can focus on high-value strategic work.',
    'services.optimization.detail':
      'We implement AI systems that automate repetitive and administrative tasks, reducing errors and freeing valuable time so your team can focus on high-value strategic work.',

    'services.analytics.title': 'Advanced analytics',
    'services.analytics.desc':
      "We turn your company's data into a competitive advantage using AI and machine learning. We create models that predict sales, optimize inventory, and improve decision-making.",
    'services.analytics.detail':
      "We turn your company's data into a competitive advantage using AI and machine learning. We create models that predict sales, optimize inventory, and improve decision-making.",

    'services.digital.title': 'Digital twin',
    'services.digital.desc':
      'Digital twins are exact virtual replicas of your physical operations. They allow simulation of changes, testing improvements, and predicting outcomes without halting production—reducing risk and accelerating innovation.',
    'services.digital.detail':
      'Digital twins are exact virtual replicas of your physical operations. They allow simulation of changes, testing improvements, and predicting outcomes without halting production—reducing risk and accelerating innovation.',

    'about.title': 'Our team',
    'about.subtitle': 'Industrial AI experts',
    'about.text':
      'Our team brings extensive experience in Artificial Intelligence, Big Data, and digital technologies. We combine technical expertise with business vision to identify opportunities and deliver measurable value to companies.',
    'about.cta': 'Learn more',

    'about.member1.name': 'Sergi Masó',
    'about.member1.role': 'Data Analyst',
    'about.member1.desc':
      'Specialist in analyzing business challenges and translating them into practical solutions. Applies AI to solve real problems, combining technical expertise and global vision to connect technology and business.',

    'about.member2.name': 'Iker Reina',
    'about.member2.role': 'Cybersecurity and Cloud Infrastructure Architect',
    'about.member2.desc':
      'Cloud Security and AI specialist with international experience, leading large-scale implementations across Europe and the Americas. Expert in AWS AI services and security solutions.',

    'about.member3.name': 'Gil Prat',
    'about.member3.role': 'Full Stack Engineer',
    'about.member3.desc':
      'Specialist in full-stack development combining back-end, front-end, and databases, with experience integrating IoT technology and leading technical teams.',

    'about.member4.name': 'David Torres',
    'about.member4.role': 'Machine Learning Engineer',
    'about.member4.desc':
      'Expert in intelligent automation and process optimization. Develops systems that reduce operational costs and increase efficiency.',

    'about.member5.name': 'Anna Rovira',
    'about.member5.role': 'Business Intelligence Analyst',
    'about.member5.desc':
      'Specialist in advanced analytics and data visualization. Transforms complex data into actionable insights for better decision-making.',

    'contact.title': 'Contact us',
    'contact.subtitle': "We're here to help you transform your business",
    'contact.phone': 'Phone',
    'contact.location': 'Location',
    'contact.emailDesc': 'Send us an email',
    'contact.phoneDesc': 'Call us directly',
    'contact.locationDesc': 'Visit us',
    'contact.linkedinDesc': 'Connect with us',

    'blog.title': 'Latest news',
    'blog.subtitle': 'Stay informed on industrial AI trends and innovations',
    'blog.readMore': 'Read more',
    'blog.linkedin': 'Follow us on LinkedIn',

    'footer.tagline': 'Transforming industry with AI',
    'footer.rights': 'All rights reserved',
    'footer.quick': 'Quick links',
    'footer.legal': 'Legal',
    'footer.privacy': 'Privacy',
    'footer.terms': 'Terms',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('ca');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
};
