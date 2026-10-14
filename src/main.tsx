import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import CookieBanner from "./components/CookieBanner";
import { initConsent } from "./lib/consent";
import "./index.css";
import "./i18n";

// Google Analytics només es carrega si ja s'havia acceptat (src/lib/consent.ts)
initConsent();

createRoot(document.getElementById("root")!).render(
  <>
    <App />
    <CookieBanner />
  </>,
);
// Removed unused Toaster, Sonner, TooltipProvider, and react-query provider to reduce bundle size
