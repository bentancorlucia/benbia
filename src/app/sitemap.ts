import type { MetadataRoute } from 'next';

import { site } from '@/lib/site';

/**
 * Sitemap del sitio. Son dos URLs reales: el home y el índice de trabajos.
 * Las secciones de la home (#servicios, #trabajos, #faq) no van: son anclas de
 * la misma página y meterlas duplicaría contenido.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: site.url,
      lastModified,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${site.url}/trabajos`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];
}
