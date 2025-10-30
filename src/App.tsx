import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const SuspenseLoader = () => {
  // Detectamos dark/light dinámico desde <html>
  let bg = '#fff';
  let fg = '#111827';
  if (typeof window !== 'undefined') {
    const root = window.document.documentElement;
    if (root.classList.contains('dark')) {
      bg = '#111827';
      fg = '#f9fafb';
    }
  }
  return (
    <div style={{
      minHeight: '100vh',
      background: bg,
      color: fg,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 24,
      width: '100vw',
      transition: 'background 0.2s',
    }}>
      Cargando...
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <HashRouter>
          <Suspense fallback={<SuspenseLoader />}>
            <Routes>
              <Route path="/" element={<Index />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </HashRouter>
      </TooltipProvider>
  </QueryClientProvider>
);

export default App;
