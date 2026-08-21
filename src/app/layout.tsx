import type { Metadata, Viewport } from 'next';
import { Cal_Sans, Fustat, Instrument_Serif } from 'next/font/google';

import { JsonLd } from '@/components/json-ld';
import { SmoothScroll } from '@/components/smooth-scroll';
import { SideRail } from '@/components/side-rail';
import { Nav } from '@/components/nav';
import { SafeAreaDebug } from '@/components/safe-area-debug';
import { Footer } from '@/components/footer';
import { graph, organizationSchema, websiteSchema } from '@/lib/schema';
import { site } from '@/lib/site';
import './globals.css';

// Titulares en Cal Sans, cuerpo en Fustat (light por defecto) y
// estampitas en Instrument Serif itálica.
const display = Cal_Sans({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-cal-sans',
  display: 'swap',
});

const body = Fustat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-fustat',
  display: 'swap',
});

const sticker = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: 'italic',
  variable: '--font-instrument-serif',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    // El título de marca sola ("benbia.") no dice nada en un resultado de
    // búsqueda: el default nombra el rubro y el país.
    default: `${site.name} — Estudio de software en Uruguay | Webs, apps y sistemas a medida`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  category: 'technology',
  keywords: [
    'estudio de software Uruguay',
    'desarrollo web Montevideo',
    'agencia de desarrollo web Uruguay',
    'diseño y desarrollo de sitios web',
    'aplicaciones a medida',
    'sistemas de gestión a medida',
    'software a medida Uruguay',
    'automatización de procesos',
    'dashboards y reportes',
    'desarrollo Next.js',
  ],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: site.locale,
    url: site.url,
    siteName: site.name,
    title: `${site.name} — El futuro de tu negocio, más cerca`,
    description: site.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} — Estudio uruguayo de software`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      // Sin esto Google recorta el snippet y muestra la miniatura chica, que
      // es justo lo que no queremos en un sitio de portfolio.
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  formatDetection: { telephone: false, address: false, email: false },
};

// Sin viewport-fit=cover a propósito. Con cover, iOS Safari estira el contenido
// que scrollea hasta el borde físico pero deja los elementos fijos anclados más
// abajo, así que por la franja del status bar se veía pasar la página y el
// header no llegaba a taparla (medido en un iPhone 17 Pro: env(safe-area-inset-top)
// devuelve 0 y los fijos se recortan al viewport). Sin cover esa franja la pinta
// Safari muestreando el color de arriba de la página, que es el theme-color.
export const viewport: Viewport = {
  themeColor: '#fbf9ef',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={site.lang} className={`${display.variable} ${body.variable} ${sticker.variable}`}>
      <body className="grain">
        {/* Quién es BENBIA y qué es este sitio: va en el layout porque vale
            para todas las páginas; cada página agrega sus propios nodos. */}
        <JsonLd data={graph(organizationSchema(), websiteSchema())} />
        <SmoothScroll />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:rounded-full focus:bg-ink focus:px-5 focus:py-2 focus:text-paper"
        >
          Saltar al contenido
        </a>
        <Nav />
        <SafeAreaDebug />
        <SideRail />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
