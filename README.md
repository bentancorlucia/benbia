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
src/lib/site.ts     mail, link de Cal.com, redes
src/lib/projects.ts los proyectos (cards, filtros y estampitas)
public/portfolio/   capturas de los proyectos
```

## Cosas que vas a querer tocar

| Qué | Dónde |
| --- | --- |
| Link de Cal.com, mail, redes | `src/lib/site.ts` |
| Proyectos, rubros, años, estampitas | `src/lib/projects.ts` |
| Palabras que rotan en el hero | `closers` en `src/components/hero.tsx` |
| Estampitas del hero | `stickers` en `src/components/hero.tsx` |
| Servicios | `services` en `src/components/services.tsx` |
| Preguntas frecuentes | `faqs` en `src/components/faq.tsx` |
| Preguntas del formulario | `choiceSteps` en `src/components/contact.tsx` |

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
