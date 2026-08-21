/**
 * Fuente única de verdad del estudio: de acá salen los metadatos, el JSON-LD,
 * el sitemap y el /llms.txt. Si un dato cambia, cambia acá y en ningún lado más.
 */
export const site = {
  name: 'BENBIA',
  legalName: 'BENBIA',
  domain: 'benbia.dev',
  url: 'https://benbia.dev',
  email: 'benbiadeveloping@gmail.com',
  /** Reunión de 30 minutos. Cambiar acá si cambia el evento. */
  calLink: 'https://cal.com/lucia-bentancor/30min',
  tagline: 'Estudio uruguayo de software.',

  /** ≤ 160 caracteres: es la que sale en Google y en las respuestas de IA. */
  description:
    'Estudio uruguayo de software. Diseñamos y desarrollamos sitios web, aplicaciones, sistemas a medida y automatizaciones para empresas de Uruguay y la región.',

  /** Párrafo largo, pensado para que un modelo lo cite entero. */
  about:
    'BENBIA es un estudio de software con base en Montevideo, Uruguay. Diseña y desarrolla sitios web, aplicaciones web y móviles, sistemas de gestión a medida, paneles de administración, dashboards y automatizaciones de procesos. Trabaja con asociaciones, clubes, estudios profesionales y equipos que necesitan reemplazar planillas por software propio, con entregas semanales y todo el proceso en remoto.',

  city: 'Montevideo',
  country: 'Uruguay',
  countryCode: 'UY',
  locale: 'es_UY',
  lang: 'es',

  /** Coordenadas de Montevideo: alimentan el LocalBusiness del JSON-LD. */
  geo: { lat: -34.9011, lng: -56.1645 },

  /** Dónde presta servicio, en orden de relevancia. */
  areaServed: ['Uruguay', 'Montevideo', 'Argentina', 'América Latina'],

  /** Términos que describen al estudio; se usan en `knowsAbout` del schema. */
  knowsAbout: [
    'Desarrollo web',
    'Diseño UX/UI',
    'Aplicaciones web',
    'Aplicaciones móviles',
    'Sistemas de gestión a medida',
    'Paneles de administración',
    'Dashboards y visualización de datos',
    'Automatización de procesos',
    'Integraciones y APIs',
    'SEO técnico',
    'Next.js',
    'React',
    'TypeScript',
    'Supabase',
  ],

  /**
   * Redes del estudio. Dejar el `href` vacío mientras el perfil no exista:
   * un link a `linkedin.com/` sin usuario es un link roto para la persona y
   * le dice a Google que BENBIA "es" LinkedIn. Apenas se completa la URL, el
   * perfil aparece solo en el footer y en el `sameAs` del JSON-LD.
   */
  social: [
    { label: 'Instagram', href: 'https://www.instagram.com/benbia.dev/' },
    { label: 'LinkedIn', href: '' },
    { label: 'GitHub', href: '' },
  ],
} as const;

/** Los que ya tienen perfil: es lo único que se muestra y lo único que se indexa. */
export const socialProfiles: { label: string; href: string }[] = site.social.filter(
  (item) => item.href.length > 0,
);
