'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

import { Sticker, type StickerProps } from '@/components/sticker';
import { site } from '@/lib/site';
import { stickers } from '@/lib/stickers';

/** Lo único que cambia del titular: qué construimos, siempre en naranja.
    El resto de la frase queda fijo. */
const necesidades = ['el software', 'la web', 'la app', 'la automatización'];

// useLayoutEffect avisa en SSR: en el server no hay nada que medir.
const useIsoLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

/* `lines` arma la estampita de dos pisos; `scale` la agranda sobre el
   tamaño base para que no todas pesen igual. */
type HeroSticker = Pick<StickerProps, 'tone' | 'lines'> & {
  text: string;
  tilt: number;
  scale: number;
  className: string;
};

const heroStickers: HeroSticker[] = [
  {
    ...stickers.medida,
    tone: 'berry',
    tilt: -7,
    scale: 1.12,
    className: 'left-[7%] top-[19%] xl:left-[12%]',
  },
  {
    ...stickers.shipItFast,
    tone: 'klein',
    tilt: 6,
    scale: 1,
    className: 'right-[6%] top-[14%] xl:right-[11%]',
  },
  {
    ...stickers.dashboards,
    tone: 'mustard',
    tilt: -4,
    scale: 1.22,
    className: 'left-[2%] top-[45%] xl:left-[6%]',
  },
  {
    ...stickers.goodDesign,
    tone: 'berry',
    tilt: 5,
    scale: 1.05,
    className: 'right-[1%] top-[50%] xl:right-[5%]',
  },
  {
    ...stickers.ia,
    tone: 'pumpkin',
    tilt: -5,
    scale: 1.15,
    className: 'left-[18%] bottom-[10%] xl:left-[23%]',
  },
  {
    ...stickers.pixelPerfect,
    tone: 'mustard',
    tilt: 4,
    scale: 1.08,
    className: 'right-[15%] bottom-[11%] xl:right-[20%]',
  },
];

const rise = {
  hidden: { opacity: 0, y: 26 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] as const, delay: 0.15 + i * 0.09 },
  }),
};

export function Hero() {
  const [index, setIndex] = useState(0);
  const [widths, setWidths] = useState<number[]>([]);
  const measureRef = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % necesidades.length), 2800);
    return () => clearInterval(id);
  }, [reduced]);

  /* Medimos cada frase en su tipografía real para poder animar el ancho:
     así el "para crecer." se corre suave en vez de saltar. */
  useIsoLayoutEffect(() => {
    const el = measureRef.current;
    if (!el) return;

    const measure = () => {
      const next = Array.from(el.children).map((child) => child.getBoundingClientRect().width);
      setWidths((prev) =>
        prev.length === next.length && prev.every((w, i) => Math.abs(w - next[i]) < 0.5) ? prev : next,
      );
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    // Las webfonts entran después del primer paint y cambian los anchos.
    document.fonts?.ready.then(measure);
    return () => observer.disconnect();
  }, []);

  const frase = necesidades[index];
  const medido = widths.length === necesidades.length;

  return (
    <section className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-4 pt-24 pb-16 text-center sm:px-6">
      {/* Estampitas alrededor del título */}
      <div className="pointer-events-none absolute inset-0 hidden select-none sm:block">
        {heroStickers.map((item, i) => (
          <motion.div
            key={item.text}
            className={`absolute text-[clamp(0.95rem,1.55vw,1.6rem)] ${item.className}`}
            initial={{ opacity: 0, scale: 0.7, rotate: item.tilt * 2.2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{
              duration: 0.75,
              ease: [0.16, 1, 0.3, 1],
              delay: 0.55 + i * 0.08,
            }}
          >
            <motion.div
              animate={reduced ? undefined : { y: [0, -7, 0] }}
              transition={{ duration: 5 + i * 0.6, repeat: Infinity, ease: 'easeInOut' }}
              /* La estampita lleva un filtro caro: la promovemos a capa propia
                 para que el filtro se rasterice una vez y no en cada frame.
                 pointer-events vuelve acá porque el contenedor las apaga para
                 no comerse el texto del título, y sin eso no hay hover. */
              className="pointer-events-auto"
              style={{ willChange: 'transform', transform: 'translateZ(0)' }}
            >
              <Sticker
                tone={item.tone}
                tilt={item.tilt}
                lines={item.lines}
                style={{ fontSize: `${item.scale}em` }}
              >
                {item.text}
              </Sticker>
            </motion.div>
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-[74rem]">
        <motion.p
          custom={0}
          variants={rise}
          initial="hidden"
          animate="show"
          className="eyebrow mb-7 text-ink/45"
        >
          {site.tagline}
        </motion.p>

        <motion.h1
          custom={1}
          variants={rise}
          initial="hidden"
          animate="show"
          className="display text-[clamp(1.9rem,5.1vw,4.1rem)]"
        >
          {/* El espacio explícito no se ve (los dos span son block) pero evita
              que un extractor de texto plano lea "construimosel software". */}
          <span className="block">Pensamos, diseñamos y construimos</span>{' '}
          <span className="relative block">
            <motion.span
              className="relative inline-block align-baseline"
              initial={false}
              animate={medido ? { width: widths[index] } : undefined}
              transition={{ duration: reduced ? 0 : 0.62, ease: [0.16, 1, 0.3, 1] }}
            >
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={frase}
                  initial={{ opacity: 0, y: '0.3em' }}
                  animate={{ opacity: 1, y: '0em' }}
                  exit={{ opacity: 0, y: '-0.28em' }}
                  transition={{
                    duration: reduced ? 0 : 0.55,
                    ease: [0.16, 1, 0.3, 1],
                    opacity: { duration: reduced ? 0 : 0.34 },
                  }}
                  className="inline-block transform-gpu whitespace-nowrap text-pumpkin"
                >
                  {frase}
                </motion.span>
              </AnimatePresence>
            </motion.span>{' '}
            {/* En mobile el cierre baja de renglón: así el corte de línea no
                depende del ancho de la palabra que rota. */}
            <span className="block sm:inline">
              que tu negocio
              <br className="hidden sm:inline" />{' '}
              necesita para crecer.
            </span>
          </span>
        </motion.h1>

        {/* Regla invisible: mide cada frase en la tipografía real del titular.
            Vive fuera del <h1> a propósito: adentro, su texto se sumaba al del
            titular y el H1 que leían Google y los modelos terminaba en
            "...para crecer.el softwarela webla appla automatización". */}
        <span
          ref={measureRef}
          aria-hidden
          className="display pointer-events-none absolute top-0 left-0 flex h-0 overflow-hidden text-[clamp(1.9rem,5.1vw,4.1rem)] opacity-0"
        >
          {necesidades.map((item) => (
            <span key={item} className="whitespace-nowrap">
              {item}
            </span>
          ))}
        </span>

        <motion.p
          custom={2}
          variants={rise}
          initial="hidden"
          animate="show"
          className="mt-7 text-base text-ink/60 sm:text-lg"
        >
          Hecho a medida.
        </motion.p>

        <motion.div
          custom={3}
          variants={rise}
          initial="hidden"
          animate="show"
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href="#contacto"
            className="group transform-gpu rounded-full bg-ink px-7 py-3.5 text-sm font-medium text-paper transition-[color,background-color,translate,box-shadow] duration-300 ease-hover hover:-translate-y-0.5 hover:bg-pumpkin hover:text-ink hover:shadow-[0_0.5rem_1.2rem_rgba(23,20,18,0.14)]"
          >
            Contanos tu idea
            <span className="ml-2 inline-block transition-transform duration-300 ease-hover group-hover:translate-x-1">
              →
            </span>
          </a>
          <a
            href="#trabajos"
            className="transform-gpu rounded-full border border-ink/20 px-7 py-3.5 text-sm font-medium transition-[border-color,background-color,translate] duration-300 ease-hover hover:-translate-y-0.5 hover:border-ink hover:bg-ink/5"
          >
            Ver trabajos
          </a>
        </motion.div>
        {/* En mobile no hay lugar alrededor del título: van debajo */}
        <motion.div
          custom={4}
          variants={rise}
          initial="hidden"
          animate="show"
          className="mt-12 flex flex-wrap items-center justify-center gap-4 text-[1rem] sm:hidden"
        >
          {heroStickers.slice(0, 3).map((item) => (
            <Sticker key={item.text} tone={item.tone} tilt={item.tilt}>
              {item.text}
            </Sticker>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 lg:block"
      >
        <motion.span
          animate={reduced ? undefined : { y: [0, 8, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          className="eyebrow block text-ink/35"
        >
          Scroll
        </motion.span>
      </motion.div>
    </section>
  );
}
