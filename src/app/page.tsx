import type { Metadata } from 'next';

import { Contact } from '@/components/contact';
import { Faq } from '@/components/faq';
import { Hero } from '@/components/hero';
import { JsonLd } from '@/components/json-ld';
import { Services } from '@/components/services';
import { Works } from '@/components/works';
import { faqSchema, graph, ids, webPageSchema, worksSchema } from '@/lib/schema';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  // El home usa el título default del layout (marca + rubro + país), que es
  // el que mejor funciona para la query "benbia" y para "software Uruguay".
  description: site.description,
  alternates: { canonical: '/' },
  // Ojo: `openGraph` no se mergea con el del layout, lo pisa entero. Si hace
  // falta tocarlo acá, hay que repetir siteName/locale/type o se pierden.
};

export default function Home() {
  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({
            id: ids.home,
            url: site.url,
            name: `${site.name} — Estudio de software en ${site.country}`,
            description: site.about,
          }),
          faqSchema(),
          worksSchema(`${site.url}/#trabajos-destacados`),
        )}
      />
      <Hero />
      <Services />
      <Works />
      <Faq />
      <Contact />
    </>
  );
}
