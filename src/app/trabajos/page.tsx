import type { Metadata } from 'next';

import { JsonLd } from '@/components/json-ld';
import { WorksIndex } from '@/components/works-index';
import { breadcrumbSchema, graph, ids, webPageSchema, worksSchema } from '@/lib/schema';
import { site } from '@/lib/site';

const url = `${site.url}/trabajos`;
const title = 'Trabajos: sitios, apps y sistemas a medida';
const description =
  'Portfolio de BENBIA: sitios web, aplicaciones y sistemas de gestión a medida para asociaciones, clubes, estudios y equipos de Uruguay. Cada proyecto con su rubro, su año y su stack.';

export const metadata: Metadata = {
  title,
  description,
  // Sin esto heredaría el canonical del layout ("/") y Google trataría a esta
  // página como una copia del home.
  alternates: { canonical: '/trabajos' },
  openGraph: {
    // Este objeto reemplaza al del layout (Next no lo mergea en profundidad):
    // por eso siteName y locale se repiten acá.
    type: 'website',
    url,
    siteName: site.name,
    locale: site.locale,
    title: `${title} · ${site.name}`,
    description,
  },
  twitter: { title: `${title} · ${site.name}`, description },
};

export default function TrabajosPage() {
  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({
            id: ids.works,
            url,
            name: title,
            description,
            type: 'CollectionPage',
            breadcrumb: `${url}#breadcrumb`,
          }),
          breadcrumbSchema(`${url}#breadcrumb`, [
            { name: 'Inicio', path: '/' },
            { name: 'Trabajos', path: '/trabajos' },
          ]),
          worksSchema(`${url}#lista`),
        )}
      />
      <WorksIndex />
    </>
  );
}
