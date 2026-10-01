import type { ReactNode } from 'react';
import { ChevronRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ChatBot from '@/components/ChatBotWithBackend';

export interface Crumb {
  label: string;
  href?: string;
}

// Marc comú de les subpàgines (serveis i legals): menú, fil d'Ariadna, peu i xat.
const PageLayout = ({ crumbs, children }: { crumbs: Crumb[]; children: ReactNode }) => (
  <div className="min-h-screen flex flex-col">
    <Navbar />
    <main className="flex-1 pt-28">
      <nav aria-label="Breadcrumb" className="container mx-auto px-4 max-w-4xl mb-8">
        <ol className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
          {crumbs.map((c, i) => (
            <li key={c.label} className="flex items-center gap-1">
              {i > 0 && <ChevronRight className="h-4 w-4" aria-hidden="true" />}
              {c.href ? (
                <a href={c.href} className="hover:text-primary transition-colors">
                  {c.label}
                </a>
              ) : (
                <span aria-current="page" className="text-foreground">
                  {c.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
      {children}
    </main>
    <Footer />
    <ChatBot />
  </div>
);

export default PageLayout;
