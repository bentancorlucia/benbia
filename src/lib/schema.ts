/**
 * JSON-LD del sitio.
 *
 * Sirve para dos cosas distintas:
 *  - SEO: Google entiende quiénes somos, dónde estamos y qué hacemos, y puede
 *    mostrar rich results (FAQ, breadcrumbs, sitelinks).
 *  - GEO: ChatGPT, Perplexity y los AI Overviews leen esto para citar el
 *    estudio con datos correctos en vez de inventarlos a partir del diseño.
 *
 * Los `@id` son fijos a propósito: permiten que los nodos se referencien entre
 * sí (una página "es parte de" el sitio, que "pertenece a" la organización) en
 * vez de repetir la organización entera en cada página.
 */
import { faqs } from '@/lib/faqs';
import { projects } from '@/lib/projects';
import { services } from '@/lib/services';
import { site, socialProfiles } from '@/lib/site';

export const ids = {
  organization: `${site.url}/#organization`,
  website: `${site.url}/#website`,
  home: `${site.url}/#webpage`,
  works: `${site.url}/trabajos#webpage`,
} as const;

const ref = (id: string) => ({ '@id': id });

/** La organización: el nodo del que cuelga todo lo demás. */
export function organizationSchema() {
  return {
    '@type': ['Organization', 'ProfessionalService'],
    '@id': ids.organization,
    name: site.name,
    legalName: site.legalName,
    alternateName: 'Benbia',
    url: site.url,
    email: site.email,
    description: site.about,
    slogan: site.tagline,
    // Google pide el logo cuadrado y en raster para el rich result de marca;
    // `image` en cambio es la representativa, y ahí sirve la tarjeta social.
    logo: {
      '@type': 'ImageObject',
      '@id': `${site.url}/#logo`,
      url: `${site.url}/icon-512.png`,
      contentUrl: `${site.url}/icon-512.png`,
      width: 512,
      height: 512,
      caption: site.name,
    },
    image: `${site.url}/opengraph-image`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: site.city,
      addressCountry: site.countryCode,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: site.geo.lat,
      longitude: site.geo.lng,
    },
    areaServed: site.areaServed.map((name) => ({ '@type': 'AdministrativeArea', name })),
    knowsAbout: [...site.knowsAbout],
    knowsLanguage: ['es', 'en'],
    // Sin local a la calle: se atiende y se trabaja en remoto.
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      email: site.email,
      areaServed: [...site.areaServed],
      availableLanguage: ['es', 'en'],
      url: site.calLink,
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Servicios de BENBIA',
      itemListElement: services.map((service) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: service.title,
          description: `${service.lead} ${service.body}`,
          serviceType: service.title,
          provider: ref(ids.organization),
          areaServed: [...site.areaServed],
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: service.title,
            itemListElement: service.deliverables.map((item) => ({
              '@type': 'Offer',
              itemOffered: { '@type': 'Service', name: item },
            })),
          },
        },
      })),
    },
    ...(socialProfiles.length > 0 && { sameAs: socialProfiles.map((item) => item.href) }),
  };
}

export function websiteSchema() {
  return {
    '@type': 'WebSite',
    '@id': ids.website,
    url: site.url,
    name: site.name,
    description: site.description,
    inLanguage: site.lang,
    publisher: ref(ids.organization),
  };
}

export function webPageSchema({
  id,
  url,
  name,
  description,
  type = 'WebPage',
  breadcrumb,
}: {
  id: string;
  url: string;
  name: string;
  description: string;
  type?: 'WebPage' | 'CollectionPage' | 'AboutPage';
  breadcrumb?: string;
}) {
  return {
    '@type': type,
    '@id': id,
    url,
    name,
    description,
    inLanguage: site.lang,
    isPartOf: ref(ids.website),
    about: ref(ids.organization),
    ...(breadcrumb && { breadcrumb: ref(breadcrumb) }),
  };
}

/** Un rich result que Google todavía muestra y que los modelos citan textual. */
export function faqSchema() {
  return {
    '@type': 'FAQPage',
    '@id': `${site.url}/#faq`,
    inLanguage: site.lang,
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  };
}

export function breadcrumbSchema(id: string, trail: { name: string; path: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    '@id': id,
    itemListElement: trail.map((step, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: step.name,
      item: `${site.url}${step.path}`,
    })),
  };
}

/** El portfolio como lista de trabajos, cada uno con su cliente y su stack. */
export function worksSchema(id: string) {
  return {
    '@type': 'ItemList',
    '@id': id,
    name: 'Trabajos de BENBIA',
    numberOfItems: projects.length,
    itemListElement: projects.map((project, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'CreativeWork',
        '@id': `${site.url}/trabajos#${project.slug}`,
        name: project.name,
        headline: `${project.name} — ${project.kind}`,
        description: project.summary,
        ...(project.href && { url: project.href }),
        image: `${site.url}${project.image}`,
        dateCreated: project.year,
        inLanguage: site.lang,
        creator: ref(ids.organization),
        provider: ref(ids.organization),
        about: project.sector,
        genre: project.kind,
        keywords: [...project.tags, ...project.stack].join(', '),
        locationCreated: { '@type': 'Place', name: `${project.place}, ${site.country}` },
      },
    })),
  };
}

/** Todo el grafo en un solo <script>: menos nodos sueltos, más contexto junto. */
export function graph(...nodes: object[]) {
  return { '@context': 'https://schema.org', '@graph': nodes };
}
