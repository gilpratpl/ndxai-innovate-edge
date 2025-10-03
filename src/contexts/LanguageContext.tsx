import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'es' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  es: {
    // Navbar
    'nav.home': 'Inicio',
    'nav.services': 'Servicios',
    'nav.about': 'Nosotros',
    'nav.contact': 'Contacto',
    
    // Hero
    'hero.title': 'Transformamos la Industria con',
    'hero.titleHighlight': 'Inteligencia Artificial',
    'hero.subtitle': 'Desarrollamos soluciones de IA personalizadas que optimizan procesos industriales, aumentan la eficiencia y reducen costes operativos.',
    'hero.cta': 'Solicitar Demo',
    'hero.ctaSecondary': 'Ver Servicios',
    
    // Services
    'services.title': 'Nuestros Servicios',
    'services.subtitle': 'Soluciones de IA diseñadas para la industria moderna',
    'services.predictive.title': 'Mantenimiento Predictivo',
    'services.predictive.desc': 'Anticipa fallos en maquinaria con IA, reduciendo tiempos de inactividad y costes de mantenimiento.',
    'services.automation.title': 'Automatización Inteligente',
    'services.automation.desc': 'Optimiza procesos productivos con sistemas de automatización basados en machine learning.',
    'services.quality.title': 'Control de Calidad',
    'services.quality.desc': 'Sistemas de visión artificial para detección de defectos en tiempo real.',
    'services.optimization.title': 'Optimización de Procesos',
    'services.optimization.desc': 'Analiza y mejora la eficiencia operativa mediante algoritmos avanzados de IA.',
    'services.analytics.title': 'Analítica Avanzada',
    'services.analytics.desc': 'Transforma datos industriales en insights accionables con dashboards inteligentes.',
    'services.digital.title': 'Gemelo Digital',
    'services.digital.desc': 'Crea réplicas virtuales de tus procesos para simulación y optimización continua.',
    
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
    
    // Hero
    'hero.title': 'Transforming Industry with',
    'hero.titleHighlight': 'Artificial Intelligence',
    'hero.subtitle': 'We develop custom AI solutions that optimize industrial processes, increase efficiency, and reduce operational costs.',
    'hero.cta': 'Request Demo',
    'hero.ctaSecondary': 'View Services',
    
    // Services
    'services.title': 'Our Services',
    'services.subtitle': 'AI solutions designed for modern industry',
    'services.predictive.title': 'Predictive Maintenance',
    'services.predictive.desc': 'Anticipate machinery failures with AI, reducing downtime and maintenance costs.',
    'services.automation.title': 'Intelligent Automation',
    'services.automation.desc': 'Optimize production processes with machine learning-based automation systems.',
    'services.quality.title': 'Quality Control',
    'services.quality.desc': 'Computer vision systems for real-time defect detection.',
    'services.optimization.title': 'Process Optimization',
    'services.optimization.desc': 'Analyze and improve operational efficiency through advanced AI algorithms.',
    'services.analytics.title': 'Advanced Analytics',
    'services.analytics.desc': 'Transform industrial data into actionable insights with intelligent dashboards.',
    'services.digital.title': 'Digital Twin',
    'services.digital.desc': 'Create virtual replicas of your processes for simulation and continuous optimization.',
    
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
  const [language, setLanguage] = useState<Language>('es');

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
