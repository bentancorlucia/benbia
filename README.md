# BENBIA

Sitio del estudio, en Next.js 15 (App Router) + Tailwind v4.

## Correr el proyecto

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
```

## Estructura

```
src/app/            layout, home, /trabajos y el endpoint /api/lead
src/components/     secciones de la home + piezas compartidas
src/lib/site.ts     mail, link de Cal.com, redes y datos del estudio
src/lib/projects.ts los proyectos (cards, filtros y estampitas)
src/lib/services.ts los cuatro servicios
src/lib/faqs.ts     las preguntas frecuentes
src/lib/schema.ts   el JSON-LD (organización, sitio, FAQ, portfolio)
src/lib/og.tsx      la tarjeta que se ve al compartir un link
public/portfolio/   capturas de los proyectos
```

## Cosas que vas a querer tocar

| Qué | Dónde |
| --- | --- |
| Link de Cal.com, mail, redes | `src/lib/site.ts` |
| Proyectos, rubros, años, estampitas | `src/lib/projects.ts` |
| Palabras que rotan en el hero | `closers` en `src/components/hero.tsx` |
| Estampitas del hero | `stickers` en `src/components/hero.tsx` |
| Servicios | `src/lib/services.ts` |
| Preguntas frecuentes | `src/lib/faqs.ts` |
| Preguntas del formulario | `choiceSteps` en `src/components/contact.tsx` |

## SEO y GEO

Los servicios, las preguntas frecuentes y los proyectos viven en `src/lib/`
justamente porque se usan dos veces: los renderiza la página **y** alimentan
los metadatos. Si editás el texto en un solo lado, no hay forma de que lo que
lee Google diga algo distinto a lo que ve la persona.

Lo que se genera solo a partir de esos datos:

| Ruta | Qué es |
| --- | --- |
| `/sitemap.xml` | Las dos URLs reales del sitio (`src/app/sitemap.ts`) |
| `/robots.txt` | Todo abierto menos `/api` (`src/app/robots.ts`) |
| `/manifest.webmanifest` | Iconos y colores para instalar desde el celular |
| `/opengraph-image` | La tarjeta del home al compartir el link |
| `/trabajos/opengraph-image` | La misma tarjeta, con el titular de trabajos |
| `/llms.txt` | El sitio en texto plano, para ChatGPT y compañía |

Y en el `<head>` de cada página va un `<script type="application/ld+json">` con
el grafo de `src/lib/schema.ts`: quién es BENBIA, dónde está, qué servicios
ofrece, las preguntas frecuentes y el portfolio con su stack. Es lo que hace
que un modelo responda "BENBIA es un estudio de Montevideo que hace X" en vez
de inventarlo.

Las tarjetas sociales se dibujan en build con `next/og` y bajan Cal Sans y
Fustat de Google Fonts. Si el build corre sin red, la imagen igual sale con la
tipografía por defecto: no rompe el deploy.

En `site.social`, los perfiles sin URL (hoy LinkedIn y GitHub) no se pintan en
el footer ni entran al `sameAs` del JSON-LD: un link a `linkedin.com/` sin
usuario es un link roto para la persona y le dice a Google que BENBIA "es"
LinkedIn. Completá el `href` en `src/lib/site.ts` y aparecen solos en los tres
lados.

## Tipografías

- **Cal Sans** — titulares (`.display`)
- **Fustat** — textos, en light (300) por defecto
- **Instrument Serif Italic** — estampitas

Las tres vienen de Google Fonts vía `next/font`, así que no hay archivos que
cargar ni licencias que comprar.

## Formulario de contacto

Son cuatro preguntas + datos, y termina mandando a Cal.com con nombre, mail y
un resumen de las respuestas pre-cargados.

En paralelo hace `POST /api/lead`, que manda un mail con las respuestas usando
[Resend](https://resend.com). **Sin `RESEND_API_KEY` el formulario igual
funciona** (la persona llega al calendario), solo que no te llega el mail.

```bash
cp .env.example .env.local
# y completá RESEND_API_KEY
```
