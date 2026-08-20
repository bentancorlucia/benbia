'use client';

import Image from 'next/image';
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion';
import { useState } from 'react';

import { ProjectCard } from '@/components/project-card';
import { Sticker } from '@/components/sticker';
import { projects, sectors, years } from '@/lib/projects';
import type { Project } from '@/lib/projects';
import { stickers } from '@/lib/stickers';

type View = 'grid' | 'list';

const ALL = 'Todos';

export function WorksIndex() {
  const [view, setView] = useState<View>('grid');
  const [sector, setSector] = useState(ALL);
  const [year, setYear] = useState(ALL);
  const [hovered, setHovered] = useState<Project | null>(null);

  // La miniatura del modo lista sigue al cursor con un poco de inercia.
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const smoothX = useSpring(x, { stiffness: 260, damping: 32, mass: 0.6 });
  const smoothY = useSpring(y, { stiffness: 260, damping: 32, mass: 0.6 });

  const filtered = projects.filter(
    (p) => (sector === ALL || p.sector === sector) && (year === ALL || p.year === year),
  );

  return (
    <section className="px-4 pt-32 pb-24 sm:px-6 sm:pt-40 sm:pb-32">
      <div className="mx-auto max-w-[84rem]">
        <header className="relative">
          <p className="eyebrow mb-4 text-ink/40">Trabajos</p>
          <h1 className="display max-w-[14ch] text-[clamp(2.6rem,7.5vw,6.5rem)]">
            Todo lo que hicimos,<span className="text-pumpkin"> en un lugar</span>
          </h1>
          <p className="mt-6 max-w-[46ch] text-ink/60">
            Sitios, apps y sistemas a medida para asociaciones, estudios y equipos que
            necesitaban dejar de pelearse con planillas.
          </p>
          <div className="mt-8 flex flex-wrap gap-5 text-[0.95rem]">
            <Sticker tone="mustard" tilt={-4}>
              {stickers.pixelPerfect.text}
            </Sticker>
            <Sticker tone="klein" tilt={5}>
              {stickers.dashboards.text}
            </Sticker>
          </div>
        </header>

        {/* Filtros + cambio de vista */}
        <div className="mt-16 flex flex-col gap-5 border-y border-ink/12 py-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <FilterGroup label="Rubro" value={sector} options={[ALL, ...sectors]} onChange={setSector} />
            <FilterGroup label="Año" value={year} options={[ALL, ...years]} onChange={setYear} />
          </div>

          <div className="flex items-center gap-1 self-start rounded-full border border-ink/15 p-1 md:self-auto">
            {(['grid', 'list'] as View[]).map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setView(option)}
                className="relative cursor-pointer rounded-full px-4 py-1.5 text-[0.68rem] tracking-[0.14em] uppercase"
              >
                {view === option && (
                  <motion.span
                    layoutId="view-pill"
                    className="absolute inset-0 rounded-full bg-ink"
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  />
                )}
                <span className={`relative ${view === option ? 'text-paper' : 'text-ink/55'}`}>
                  {option === 'grid' ? 'Grilla' : 'Lista'}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Resultados */}
        <div className="relative mt-14">
          <AnimatePresence mode="wait">
            {view === 'grid' ? (
              <motion.div
                key="grid"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="grid gap-x-10 gap-y-20 md:grid-cols-2"
              >
                {filtered.map((project, i) => (
                  <motion.div
                    key={project.slug}
                    layout
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.06 }}
                  >
                    <ProjectCard project={project} priority={i < 2} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="list"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                onMouseMove={(event) => {
                  x.set(event.clientX + 28);
                  y.set(event.clientY - 90);
                }}
                className="border-t border-ink/12"
              >
                {filtered.map((project, i) => {
                  const Row = project.href ? 'a' : 'div';
                  return (
                    <motion.div
                      key={project.slug}
                      layout
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: i * 0.05 }}
                    >
                      <Row
                        {...(project.href
                          ? { href: project.href, target: '_blank', rel: 'noreferrer' }
                          : {})}
                        onMouseEnter={() => setHovered(project)}
                        onMouseLeave={() => setHovered(null)}
                        className="group grid grid-cols-[1fr_auto] items-baseline gap-x-6 gap-y-1 border-b border-ink/12 py-7 transition-colors duration-300 ease-hover hover:bg-ink/4 sm:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_auto_2.5rem] sm:px-3"
                      >
                        <span className="display text-[clamp(1.5rem,3.4vw,2.6rem)] transform-gpu transition-transform duration-400 ease-hover group-hover:translate-x-2">
                          {project.name}
                        </span>
                        <span className="col-span-2 text-sm text-ink/55 sm:col-span-1">
                          {project.kind}
                        </span>
                        <span className="text-[0.7rem] tracking-[0.14em] text-ink/40 uppercase tabular-nums">
                          {project.year}
                        </span>
                        <span className="hidden text-right text-ink/35 transition-[color,transform] duration-400 ease-hover group-hover:translate-x-1 group-hover:text-pumpkin sm:block">
                          {project.href ? '↗' : '·'}
                        </span>
                      </Row>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>

          {filtered.length === 0 && (
            <p className="py-20 text-center text-ink/45">
              No hay proyectos con ese filtro todavía.
            </p>
          )}
        </div>
      </div>

      {/* Miniatura flotante del modo lista */}
      <AnimatePresence>
        {view === 'list' && hovered && (
          <motion.div
            className="pointer-events-none fixed left-0 top-0 z-40 hidden lg:block"
            style={{ x: smoothX, y: smoothY }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative h-[13rem] w-[19rem] overflow-hidden rounded-xl border border-ink/12 shadow-[0.4rem_0.6rem_0_rgba(23,20,18,0.12)]">
              <Image
                src={hovered.image}
                alt=""
                fill
                sizes="19rem"
                className="object-cover object-top"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function FilterGroup({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: readonly string[];
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="eyebrow mr-1 text-ink/35">{label}</span>
      {options.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => onChange(option)}
          className={`cursor-pointer rounded-full px-3 py-1.5 text-[0.7rem] tracking-[0.08em] uppercase transition-colors duration-250 ease-hover ${
            value === option ? 'bg-ink text-paper' : 'text-ink/50 hover:bg-ink/6 hover:text-ink'
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
