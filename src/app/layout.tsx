import type { Metadata, Viewport } from 'next';
import { Cal_Sans, Fustat, Instrument_Serif } from 'next/font/google';

import { SmoothScroll } from '@/components/smooth-scroll';
import { SideRail } from '@/components/side-rail';
import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';
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
    default: 'benbia.',
    template: `%s · ${site.name}`,
  },
  description: site.description,
  openGraph: {
    type: 'website',
    locale: 'es_UY',
    siteName: site.name,
    title: `${site.name} — El futuro de tu negocio, más cerca`,
    description: site.description,
  },
  twitter: { card: 'summary_large_image' },
};

export const viewport: Viewport = {
  themeColor: '#fbf9ef',
  // La página llega hasta los bordes físicos: así la nav pinta también la
  // franja del status bar en vez de dejarla al navegador. Lo que queda debajo
  // del notch se aparta con --safe-* (globals.css).
  viewportFit: 'cover',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${display.variable} ${body.variable} ${sticker.variable}`}>
      <body className="grain">
        <SmoothScroll />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:rounded-full focus:bg-ink focus:px-5 focus:py-2 focus:text-paper"
        >
          Saltar al contenido
        </a>
        <Nav />
        <SideRail />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
