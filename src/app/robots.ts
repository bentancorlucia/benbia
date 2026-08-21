import type { MetadataRoute } from 'next';

import { site } from '@/lib/site';

/**
 * Todo abierto menos la API.
 *
 * Los crawlers de IA (GPTBot, ClaudeBot, PerplexityBot y compañía) entran por
 * la regla `*`: para que el estudio aparezca citado en las respuestas de esos
 * modelos hay que dejarlos leer, no bloquearlos. Si algún día se quiere cortar
 * el entrenamiento sin perder las citas, se agrega un bloque por user-agent.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
