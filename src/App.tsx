// Removed unused Toaster, Sonner, TooltipProvider, and react-query provider to reduce bundle size
import { lazy, Suspense } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { currentPage } from "./lib/route";

// Les subpàgines (serveis i legals) van en chunks a part: la portada no les descarrega
const ServicePage = lazy(() => import("./pages/ServicePage"));
const LegalPage = lazy(() => import("./pages/LegalPage"));

const App = () => {
  // La pàgina la decideix el pathname (cada una és un HTML propi); el hash només fa scroll dins la portada
  if (currentPage.kind !== "home") {
    return (
      <Suspense fallback={null}>
        {currentPage.kind === "service" ? <ServicePage id={currentPage.id} /> : <LegalPage id={currentPage.id} />}
      </Suspense>
    );
  }

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/:section" element={<Index />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
