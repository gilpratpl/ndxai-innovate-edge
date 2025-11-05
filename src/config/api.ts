// Configuració de l'API segons l'entorn
export const API_CONFIG = {
  // En producció (GitHub Pages), usa la URL de Railway
  // En desenvolupament local, usa la variable d'entorn o Railway per defecte
  baseURL: import.meta.env.VITE_BACKEND_URL || 'https://ndxai-chatbot-api-production.up.railway.app'
};
