import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Contact from '@/components/Contact';
import Blog from '@/components/Blog';
import Footer from '@/components/Footer';
import ChatBot from '@/components/ChatBotWithBackend';
import NotFound from './NotFound';
import { SECTION_IDS } from '@/lib/sections';

const Index = () => {
  // /#faq, /#contact... (enllaç directe o obert en una pestanya nova) → scroll a la secció
  const { section } = useParams();
  const isSection = !section || SECTION_IDS.has(section);

  useEffect(() => {
    if (section && isSection) document.getElementById(section)?.scrollIntoView();
  }, [section, isSection]);

  if (!isSection) return <NotFound />;

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Contact />
        <Blog />
      </main>
      <Footer />
      <ChatBot />
    </div>
  );
};

export default Index;
