'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState } from 'react';

import { Sticker } from '@/components/sticker';
import type { Project } from '@/lib/projects';

const toneToSticker = {
  pumpkin: 'pumpkin',
  mustard: 'mustard',
  berry: 'berry',
  klein: 'klein',
} as const;

const toneToFrame: Record<Project['tone'], string> = {
  pumpkin: 'bg-pumpkin/12',
  mustard: 'bg-mustard/25',
  berry: 'bg-berry/10',
  klein: 'bg-klein/10',
};

/* Cortina de color que sube al pasar el mouse */
const toneToTint: Record<Project['tone'], string> = {
  pumpkin: 'bg-pumpkin',
  mustard: 'bg-mustard',
  berry: 'bg-berry',
  klein: 'bg-klein',
};

/* Color de la flecha sobre cada cortina */
const toneToOn: Record<Project['tone'], string> = {
  pumpkin: 'text-ink',
  mustard: 'text-ink',
  berry: 'text-paper',
  klein: 'text-paper',
};

export function ProjectCard({
  project,
  priority = false,
  dark = false,
}: {
  project: Project;
  priority?: boolean;
  /** true cuando la card vive sobre fondo oscuro */
  dark?: boolean;
}) {
  const [hover, setHover] = useState(false);
  const Wrapper = project.href ? 'a' : 'div';

  const pill = dark
    ? 'border-paper/25 text-paper/75 group-hover:border-paper/45'
    : 'border-ink/20 text-ink/70 group-hover:border-ink/40';
  const frame = dark ? 'border-paper/10' : 'border-ink/10';

  return (
    <Wrapper
      {...(project.href
        ? {
            href: project.href,
            target: '_blank',
            // `noopener` protege la pestaña; `noreferrer` de más cortaba el
            // referrer que le dice a Analytics que la visita vino de acá.
            rel: 'noopener',
            'aria-label': `${project.name} — ${project.kind}. Visitar ${project.label}`,
          }
        : {})}
      className="group block"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="relative">
        <div
          className={`relative isolate aspect-[16/10] overflow-hidden rounded-xl border ${frame} ${toneToFrame[project.tone]}`}
        >
          <Image
            src={project.image}
            alt={`${project.name}: captura del ${project.kind.toLowerCase()} desarrollado por BENBIA`}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, 50vw"
            className="transform-gpu object-cover object-top transition-transform duration-700 ease-hover will-change-transform group-hover:scale-[1.035]"
          />

          {/* Cortina sólida que sube desde abajo */}
          <div
            className={`pointer-events-none absolute inset-0 z-10 origin-bottom scale-y-0 transition-transform duration-500 ease-hover group-hover:scale-y-100 ${toneToTint[project.tone]}`}
          />

          {project.href && (
            <div
              className={`pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center gap-4 opacity-0 transition-opacity duration-300 ease-hover group-hover:opacity-100 group-hover:delay-200 ${toneToOn[project.tone]}`}
            >
              <span className="flex h-16 w-16 items-center justify-center rounded-full border border-current sm:h-20 sm:w-20">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                  className="h-7 w-7 sm:h-8 sm:w-8"
                >
                  <path d="M7 17 17 7" />
                  <path d="M8 7h9v9" />
                </svg>
              </span>
              <span className="text-[0.7rem] tracking-[0.16em] uppercase">Visitar sitio</span>
            </div>
          )}
        </div>

        {project.sticker && (
          <motion.div
            className="absolute -left-1 -top-4 z-20 text-[0.8rem] sm:-left-2 sm:-top-5 sm:text-[0.95rem]"
            initial={false}
            animate={{ rotate: hover ? 0 : -6, scale: hover ? 1.06 : 1 }}
            transition={{ type: 'spring', stiffness: 240, damping: 20, mass: 0.6 }}
          >
            <Sticker
              tone={toneToSticker[project.tone]}
              tilt={0}
              lift={false}
              edge={dark ? 'var(--color-ink)' : 'var(--color-paper)'}
            >
              {project.sticker}
            </Sticker>
          </motion.div>
        )}
      </div>

      {/* Título largo: nombre y frase corren juntos, como una sola línea editorial */}
      <h3 className="display mt-7 max-w-[22ch] text-[clamp(1.45rem,2.3vw,2.05rem)] leading-[1.1]">
        {project.name}. {project.hook}
      </h3>

      <ul className="mt-6 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <li
            key={tag}
            className={`rounded-full border px-4 py-2 text-[0.78rem] transition-colors duration-300 ease-hover ${pill}`}
          >
            {tag}
          </li>
        ))}
      </ul>
    </Wrapper>
  );
}
