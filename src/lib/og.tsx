import { ImageResponse } from 'next/og';

import { site } from '@/lib/site';

/**
 * La tarjeta que se ve al compartir un link del sitio en WhatsApp, LinkedIn o
 * Slack. Antes había `summary_large_image` declarado pero ninguna imagen: el
 * link salía como un rectángulo gris.
 *
 * Vive acá para que cada página pueda tener su propio titular sin repetir el
 * layout. Se genera en build (las rutas son estáticas), así que el fetch de las
 * fuentes pasa una sola vez y no en cada request.
 */
export const ogSize = { width: 1200, height: 630 };
export const ogContentType = 'image/png';

const C = {
  ink: '#171412',
  paper: '#fbf9ef',
  pumpkin: '#ff7722',
  mustard: '#ffdd47',
  klein: '#3d2fa9',
};

const EYEBROW = site.tagline;
const FOOT = `${site.domain} · ${site.city}, ${site.country}`;

/** Baja el TTF/WOFF de una familia de Google Fonts, subseteado al texto usado. */
async function googleFont(family: string, text: string) {
  const params = new URLSearchParams({ family, text });
  const css = await fetch(`https://fonts.googleapis.com/css2?${params}`, {
    headers: {
      // Sin un UA "viejo" Google devuelve woff2, que satori no sabe leer.
      'User-Agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/534.30 (KHTML, like Gecko) Version/5.1 Safari/534.30',
    },
  }).then((res) => res.text());

  // Google sirve woff, ttf u otf según el UA; satori lee las tres (woff2 no).
  const url = css.match(/src: url\((.+?)\) format\('(?:woff|opentype|truetype)'\)/)?.[1];
  if (!url) throw new Error(`No se pudo resolver la fuente ${family}`);

  return fetch(url).then((res) => res.arrayBuffer());
}

async function loadFonts(title: string) {
  try {
    const [cal, fustat] = await Promise.all([
      googleFont('Cal Sans', `${title}${site.name.toLowerCase()}.`),
      // El subset se pide por caracteres: el eyebrow va en mayúsculas por CSS,
      // así que hay que pedir también esos glifos o no vienen en el archivo.
      googleFont('Fustat', `${EYEBROW}${EYEBROW.toUpperCase()}${FOOT}`),
    ]);
    return [
      { name: 'Cal Sans', data: cal, style: 'normal' as const, weight: 400 as const },
      { name: 'Fustat', data: fustat, style: 'normal' as const, weight: 400 as const },
    ];
  } catch {
    // Si el build corre sin red la imagen igual sale: next/og cae a su fuente
    // por defecto en vez de romper el deploy entero.
    return undefined;
  }
}

export async function ogCard(title: string) {
  const fonts = await loadFonts(title);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: C.paper,
          color: C.ink,
          padding: '72px 80px',
          fontFamily: 'Fustat, sans-serif',
          position: 'relative',
        }}
      >
        {/* Manchas de color de la paleta, apenas insinuadas */}
        <div
          style={{
            position: 'absolute',
            top: -250,
            right: -140,
            width: 500,
            height: 500,
            borderRadius: 500,
            background: C.mustard,
            opacity: 0.55,
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -260,
            left: -170,
            width: 420,
            height: 420,
            borderRadius: 420,
            background: C.klein,
            opacity: 0.13,
          }}
        />

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div
            style={{
              display: 'flex',
              fontFamily: 'Cal Sans, sans-serif',
              fontSize: 46,
              letterSpacing: '-0.05em',
            }}
          >
            {site.name.toLowerCase()}
            <span style={{ color: C.pumpkin }}>.</span>
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 20,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              opacity: 0.45,
            }}
          >
            {EYEBROW}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            fontFamily: 'Cal Sans, sans-serif',
            fontSize: 74,
            lineHeight: 1.08,
            maxWidth: 960,
            letterSpacing: '-0.02em',
          }}
        >
          {title}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{ display: 'flex', width: 56, height: 8, background: C.pumpkin }} />
          <div style={{ display: 'flex', fontSize: 26, opacity: 0.6 }}>{FOOT}</div>
        </div>
      </div>
    ),
    { ...ogSize, ...(fonts && { fonts }) },
  );
}
