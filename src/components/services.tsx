'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

import { Reveal } from '@/components/reveal';
import { Sticker } from '@/components/sticker';
import { stickers } from '@/lib/stickers';

const services = [
  {
    n: '01',
    title: 'Sitios web',
    lead: 'La cara de tu negocio, hecha a medida y rápida de verdad.',
    body: 'Diseño e implementación completa: identidad digital, arquitectura de contenido, SEO y GEO técnico y un panel para que edites sin llamarnos.',
    deliverables: ['Diseño UI', 'Desarrollo', 'CMS / panel', 'SEO técnico'],
    tone: 'bg-pumpkin text-ink',
  },
  {
    n: '02',
    title: 'Aplicaciones',
    lead: 'Web o escritorio, para tu equipo o para tus clientes.',
    body: 'Del prototipo al producto: definimos el alcance real, lo construimos por partes y te mostramos algo funcionando cada semana.',
    deliverables: ['Web app', 'IOS', 'Android', 'Escritorio', 'Integraciones'],
    tone: 'bg-klein text-paper',
  },
  {
    n: '03',
    title: 'Sistemas a medida',
    lead: 'Ese proceso que hoy vive en diez planillas.',
    body: 'Relevamos cómo trabajás, modelamos los datos y armamos el sistema que sustituye el Excel: usuarios, permisos, reportes y exportaciones.',
    deliverables: ['Relevamiento', 'Modelo de datos', 'Backoffice', 'Reportes'],
    tone: 'bg-berry text-mustard',
  },
  {
    n: '04',
    title: 'Datos y automatización',
    lead: 'Que los números lleguen solos y las tareas repetidas dejen de existir.',
    body: 'Conectamos tus fuentes de datos, armamos el tablero que mira tu equipo todos los días y automatizamos lo que hoy alguien hace a mano: reportes, alertas, cargas y sincronizaciones entre sistemas.',
    deliverables: ['Dashboards', 'Automatizaciones', 'Pipelines de datos', 'Modelos predictivos'],
    tone: 'bg-mustard text-ink',
  },
];

export function Services() {
  const [open, setOpen] = useState<string | null>('01');

  return (
    <section id="servicios" className="scroll-mt-24 px-4 py-24 sm:px-6 sm:py-32">
      <div className="mx-auto max-w-[84rem]">
        <Reveal className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow mb-4 text-ink/40">Servicios</p>
            <h2 className="display max-w-[14ch] text-[clamp(2.2rem,5.4vw,4.6rem)]">
              Cuatro formas de<span className="text-pumpkin"> empezar</span>
            </h2>
          </div>
        </Reveal>

        <div className="border-t border-ink/12">
          {services.map((service, i) => {
            const isOpen = open === service.n;
            return (
              <Reveal key={service.n} delay={i * 0.06}>
                <div
                  className={`group relative overflow-hidden border-b border-ink/12 transition-colors duration-300 ease-hover ${
                    isOpen ? service.tone : 'hover:bg-ink/4'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : service.n)}
                    aria-expanded={isOpen}
                    className="flex w-full cursor-pointer items-baseline gap-5 px-2 py-7 text-left sm:gap-10 sm:px-6 sm:py-9"
                  >
                    <span
                      className={`eyebrow shrink-0 tabular-nums transition-opacity duration-500 ${
                        isOpen ? 'opacity-70' : 'opacity-35'
                      }`}
                    >
                      {service.n}
                    </span>
                    <span className="display flex-1 text-[clamp(1.8rem,4.4vw,3.4rem)]">
                      {service.title}
                    </span>
                    <span
                      className={`hidden max-w-[30ch] text-sm transition-opacity duration-500 lg:block ${
                        isOpen ? 'opacity-80' : 'opacity-55'
                      }`}
                    >
                      {service.lead}
                    </span>
                    <span
                      className="shrink-0 transform-gpu text-2xl leading-none transition-transform duration-500 ease-hover"
                      style={{ transform: `rotate(${isOpen ? 45 : 0}deg)` }}
                      aria-hidden
                    >
                      +
                    </span>
                  </button>

                  <motion.div
                    initial={false}
                    animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="flex flex-col gap-6 px-2 pb-9 sm:flex-row sm:items-end sm:justify-between sm:px-6 sm:pl-[calc(1.5rem+3.6rem)]">
                      <p className="max-w-[52ch] text-sm leading-relaxed opacity-85 sm:text-base">
                        {service.body}
                      </p>
                      <ul className="flex flex-wrap gap-2">
                        {service.deliverables.map((item) => (
                          <li
                            key={item}
                            className="rounded-full border border-current/25 px-3 py-1.5 text-[0.7rem] tracking-[0.1em] uppercase opacity-80"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.1} className="mt-12 flex flex-wrap items-center justify-center gap-6 text-[0.95rem]">
          <Sticker tone="klein" tilt={-4}>
            {stickers.cleanCode.text}
          </Sticker>
          <Sticker tone="pumpkin" tilt={3}>
            {stickers.escala.text}
          </Sticker>
          <Sticker tone="berry" tilt={-2}>
            {stickers.builtToLast.text}
          </Sticker>
        </Reveal>
      </div>
    </section>
  );
}
