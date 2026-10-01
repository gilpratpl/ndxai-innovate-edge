import { useEffect, useState } from 'react';
import type { PagesContent } from '@/lib/pages';
import { pagesContent } from '@/lib/route';

// Text de les subpàgines (src/locales/<idioma>/pages.json); null mentre es descarrega
export function usePagesContent(): PagesContent | null {
  const [content, setContent] = useState<PagesContent | null>(null);

  useEffect(() => {
    let cancelled = false;
    void pagesContent?.then((c) => {
      if (!cancelled) setContent(c);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return content;
}
