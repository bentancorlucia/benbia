export type Tone = 'pumpkin' | 'mustard' | 'berry' | 'klein';

export type Project = {
  slug: string;
  name: string;
  /** Dominio o tipo de producto, se lee bajo el nombre */
  label: string;
  href?: string;
  year: string;
  /** Rubro, se usa como filtro en /trabajos */
  sector: string;
  place: string;
  kind: string;
  hook: string;
  summary: string;
  /** Pills de la card: rubro + servicios */
  tags: string[];
  tone: Tone;
  image: string;
  /** Texto de la estampita que se pega sobre la card */
  sticker?: string;
  stack: string[];
};

export const projects: Project[] = [
  {
    slug: 'viandas-hotel-del-prado',
    name: 'Viandas Hotel del Prado',
    label: 'viandashoteldelprado.uy',
    href: 'https://viandashoteldelprado.uy/',
    year: '2026',
    sector: 'Gastronomía',
    place: 'Montevideo',
    kind: 'Rediseño Frontend',
    hook: 'Rediseño completo.',
    summary:
      'Rediseño completo del sitio de viandas a domicilio del Hotel del Prado: desde la homepage hasta el armado del pedido paso a paso, más de 200 combinaciones filtradas por dieta, cuenta de usuario, planes para empresas y pago en línea.',
    tags: ['Gastronomía', 'Rediseño web'],
    tone: 'mustard',
    image: '/portfolio/vhp-desktop.webp',
    sticker: 'Armá tu pedido',
    stack: ['React', 'TypeScript', 'PayExpress', 'SEO técnico'],
  },
  {
    slug: 'club-seminario',
    name: 'Club Seminario',
    label: 'clubseminario.com.uy',
    href: 'https://www.clubseminario.com.uy/',
    year: '2025',
    sector: 'Clubes deportivos',
    place: 'Uruguay',
    kind: 'Sitio + tienda en línea + gestión de socios',
    hook: 'Gestión de socios, cuotas y tienda online, todo en el mismo lugar.',
    summary:
      'Sitio del club con tienda en línea, panel de administración y un gestor de socios y tesorería: altas, cuotas, pagos y estado de cuenta sin una sola planilla de por medio.',
    tags: ['Clubes deportivos', 'Tienda en línea', 'Gestión de socios', 'Panel Admin', 'Gestión de tesorería'],
    tone: 'berry',
    image: '/portfolio/cs-desktop.webp',
    sticker: 'Tienda Online',
    stack: ['Next.js', 'Supabase'],
  },
  {
    slug: 'atri',
    name: 'ATRI',
    label: 'atri.com.uy',
    href: 'https://atri.com.uy',
    year: '2022',
    sector: 'Asociaciones',
    place: 'Uruguay',
    kind: 'Sitio institucional + Panel Admin',
    hook: 'Sitio Web Institucional con gestión de eventos y panel admin.',
    summary:
      'Sitio institucional con panel administrativo y micrositios por evento. Cada congreso se arma solo, con bloques editables desde el navegador.',
    tags: ['Asociaciones', 'Sitio Web', 'Panel Admin', 'Eventos'],
    tone: 'pumpkin',
    image: '/portfolio/atri-desktop.webp',
    sticker: 'Con Pop-Ups!',
    stack: ['Next.js 15', 'TypeScript', 'Tailwind', 'Supabase', 'Vercel'],
  },
  {
    slug: 'aup',
    name: 'AUP',
    label: 'aupsicomotricidad.org',
    href: 'https://aupsicomotricidad.org/',
    year: '2023',
    sector: 'Asociaciones',
    place: 'Uruguay',
    kind: 'Sitio institucional + Panel Admin',
    hook: 'Sitio Web Institucional con gestión de eventos, geolocalización y panel admin.',
    summary:
      'Directorio de profesionales habilitados, biblioteca especializada, membresía, geolocalización y agenda de eventos para la Asociación Uruguaya de Psicomotricidad.',
    tags: ['Asociaciones', 'Sitio web', 'Panel Admin', 'Geolocalización'],
    tone: 'klein',
    image: '/portfolio/aup-desktop.webp',
    sticker: 'A Medida',
    stack: ['Next.js', 'Arquitectura de contenido', 'Diseño responsive'],
  },
  
];

export const sectors = Array.from(new Set(projects.map((p) => p.sector))).sort();
export const years = Array.from(new Set(projects.map((p) => p.year))).sort().reverse();
