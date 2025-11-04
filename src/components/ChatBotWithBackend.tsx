import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { X, Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { API_CONFIG } from '@/config/api';
import robotLogo from '@/assets/logos/NDXAI_robot.png';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

// Aquesta versió del ChatBot usa un backend per fer les crides a l'API
// Més segur per a producció perquè no exposa la API key al client
const ChatBotWithBackend = () => {
  const { i18n, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Mensaje de bienvenida según el idioma
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: Message = {
        role: 'assistant',
        content: t('chatbot.welcome'),
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, t, messages.length]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // URL del backend (configurada segons l'entorn)
      const BACKEND_URL = API_CONFIG.baseURL;
      
      const response = await fetch(`${BACKEND_URL}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            ...messages.filter(m => m.role !== 'assistant' || messages.indexOf(m) > 0),
            userMessage
          ],
          language: i18n.language.split('-')[0] // 'ca', 'es', o 'en'
        }),
      });

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error('Too many requests');
        }
        throw new Error('Error en la respuesta del servidor');
      }

      const data = await response.json();
      const assistantMessage: Message = {
        role: 'assistant',
        content: data.content,
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: t('chatbot.error'),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Botón flotante con el robot de NdxAI */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-lg hover:scale-110 transition-transform duration-300 z-50 bg-gradient-primary overflow-hidden"
          size="icon"
        >
          <img src={robotLogo} alt="NdxAI ChatBot" className="h-full w-full object-cover" />
        </Button>
      )}

      {/* Ventana del chat */}
      {isOpen && (
        <div className="fixed bottom-0 right-0 sm:bottom-9 sm:right-9 w-full sm:w-[380px] h-[100vh] sm:h-[600px] sm:max-h-[80vh] bg-card border-l sm:border border-border sm:rounded-2xl shadow-2xl flex flex-col z-50 animate-fade-in">
          {/* Header con el robot de NdxAI */}
          <div className="bg-gradient-primary text-primary-foreground p-4 sm:rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <img src={robotLogo} alt="NdxAI" className="h-full w-full object-contain" />
              </div>
              <div>
                <h3 className="font-semibold">{t('chatbot.title')}</h3>
                <p className="text-xs text-white/80">{t('chatbot.subtitle')}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20 rounded-full"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Mensajes */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl ${
                    message.role === 'user'
                      ? 'bg-gradient-primary text-primary-foreground'
                      : 'bg-muted text-foreground'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-muted p-3 rounded-2xl">
                  <Loader2 className="h-5 w-5 animate-spin text-primary" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={t('chatbot.placeholder')}
                className="flex-1 px-4 py-2 rounded-full border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                disabled={isLoading}
              />
              <Button
                onClick={sendMessage}
                disabled={!input.trim() || isLoading}
                size="icon"
                className="rounded-full bg-gradient-primary"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBotWithBackend;
