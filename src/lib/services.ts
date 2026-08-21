/**
 * Los cuatro servicios. Los consume la sección <Services /> y el OfferCatalog
 * del JSON-LD, así lo que se indexa es exactamente lo que está en pantalla.
 */
export type Service = {
  n: string;
  /** Ancla de la sección, para poder linkear un servicio puntual */
  slug: string;
  title: string;
  lead: string;
  body: string;
  deliverables: string[];
  tone: string;
};

export const services: Service[] = [
  {
    n: '01',
    slug: 'sitios-web',
    title: 'Sitios web',
    lead: 'La cara de tu negocio, hecha a medida y rápida de verdad.',
    body: 'Diseño e implementación completa: identidad digital, arquitectura de contenido, SEO y GEO técnico y un panel para que edites sin llamarnos.',
    deliverables: ['Diseño UI', 'Desarrollo', 'CMS / panel', 'SEO técnico'],
    tone: 'bg-pumpkin text-ink',
  },
  {
    n: '02',
    slug: 'aplicaciones',
    title: 'Aplicaciones',
    lead: 'Web o escritorio, para tu equipo o para tus clientes.',
    body: 'Del prototipo al producto: definimos el alcance real, lo construimos por partes y te mostramos algo funcionando cada semana.',
    deliverables: ['Web app', 'IOS', 'Android', 'Escritorio', 'Integraciones'],
    tone: 'bg-klein text-paper',
  },
  {
    n: '03',
    slug: 'sistemas-a-medida',
    title: 'Sistemas a medida',
    lead: 'Ese proceso que hoy vive en diez planillas.',
    body: 'Relevamos cómo trabajás, modelamos los datos y armamos el sistema que sustituye el Excel: usuarios, permisos, reportes y exportaciones.',
    deliverables: ['Relevamiento', 'Modelo de datos', 'Backoffice', 'Reportes'],
    tone: 'bg-berry text-mustard',
  },
  {
    n: '04',
    slug: 'datos-y-automatizacion',
    title: 'Datos y automatización',
    lead: 'Que los números lleguen solos y las tareas repetidas dejen de existir.',
    body: 'Conectamos tus fuentes de datos, armamos el tablero que mira tu equipo todos los días y automatizamos lo que hoy alguien hace a mano: reportes, alertas, cargas y sincronizaciones entre sistemas.',
    deliverables: ['Dashboards', 'Automatizaciones', 'Pipelines de datos', 'Modelos predictivos'],
    tone: 'bg-mustard text-ink',
  },
];
