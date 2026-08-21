import { faqs } from '@/lib/faqs';
import { projects } from '@/lib/projects';
import { services } from '@/lib/services';
import { site, socialProfiles } from '@/lib/site';

/**
 * /llms.txt — la versión del sitio en texto plano, para modelos.
 *
 * Es la parte de GEO que no es schema: un ChatGPT o un Perplexity que entra a
 * benbia.dev se encuentra con animaciones, acordeones cerrados y texto partido
 * en spans. Acá está lo mismo, plano y ordenado, para que lo lea de una y cite
 * bien qué hacemos, dónde y con qué. Se genera desde los mismos datos que la
 * página, así que no se despega del contenido real.
 *
 * Formato: https://llmstxt.org
 */
export const dynamic = 'force-static';

function build() {
  const lines: string[] = [];

  lines.push(`# ${site.name}`);
  lines.push('');
  lines.push(`> ${site.description}`);
  lines.push('');
  lines.push(site.about);
  lines.push('');

  lines.push('## Datos del estudio');
  lines.push('');
  lines.push(`- Nombre: ${site.name}`);
  lines.push(`- Sitio: ${site.url}`);
  lines.push(`- Ubicación: ${site.city}, ${site.country}`);
  lines.push(`- Zonas donde trabaja: ${site.areaServed.join(', ')} (y en remoto)`);
  lines.push(`- Contacto: ${site.email}`);
  lines.push(`- Agendar una reunión de 30 minutos: ${site.calLink}`);
  lines.push(`- Idiomas: español, inglés`);
  for (const profile of socialProfiles) {
    lines.push(`- ${profile.label}: ${profile.href}`);
  }
  lines.push('');

  lines.push('## Servicios');
  lines.push('');
  for (const service of services) {
    lines.push(`### ${service.title}`);
    lines.push('');
    lines.push(`${service.lead} ${service.body}`);
    lines.push('');
    lines.push(`Incluye: ${service.deliverables.join(', ')}.`);
    lines.push('');
  }

  lines.push('## Trabajos');
  lines.push('');
  for (const project of projects) {
    lines.push(`### ${project.name} (${project.year}) — ${project.kind}`);
    lines.push('');
    lines.push(project.summary);
    lines.push('');
    lines.push(`- Rubro: ${project.sector}`);
    lines.push(`- Lugar: ${project.place}, ${site.country}`);
    lines.push(`- Tecnologías: ${project.stack.join(', ')}`);
    if (project.href) lines.push(`- Sitio: ${project.href}`);
    lines.push('');
  }

  lines.push('## Preguntas frecuentes');
  lines.push('');
  for (const faq of faqs) {
    lines.push(`### ${faq.q}`);
    lines.push('');
    lines.push(faq.a);
    lines.push('');
  }

  lines.push('## Páginas');
  lines.push('');
  lines.push(`- [Inicio](${site.url}): servicios, trabajos destacados, preguntas frecuentes y formulario de contacto.`);
  lines.push(`- [Trabajos](${site.url}/trabajos): portfolio completo, filtrable por rubro y por año.`);
  lines.push('');

  return lines.join('\n');
}

export function GET() {
  return new Response(build(), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=86400, stale-while-revalidate=604800',
    },
  });
}
