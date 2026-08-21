import Link from 'next/link';

import { ProjectCard } from '@/components/project-card';
import { Reveal } from '@/components/reveal';
import { projects } from '@/lib/projects';

export function Works() {
  return (
    <section aria-labelledby="trabajos-titulo" id="trabajos" className="scroll-mt-24 bg-ink px-4 py-24 text-paper sm:px-6 sm:py-32">
      <div className="mx-auto max-w-[84rem]">
        <Reveal className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow mb-4 text-paper/40">Trabajos recientes</p>
            <h2 id="trabajos-titulo" className="display max-w-[16ch] text-[clamp(2.2rem,5.4vw,4.6rem)]">
              Ideas que ya salieron<span className="text-pumpkin"> a la cancha</span>
            </h2>
          </div>
          <Link
            href="/trabajos"
            className="group flex w-fit transform-gpu items-center gap-3 rounded-full border border-paper/25 px-6 py-3 text-sm transition-[color,background-color,border-color,transform] duration-300 ease-hover hover:-translate-y-0.5 hover:border-pumpkin hover:bg-pumpkin hover:text-ink"
          >
            Ver todos
            <span className="transition-transform duration-300 ease-hover group-hover:translate-x-1">
              →
            </span>
          </Link>
        </Reveal>

        <div className="grid gap-x-10 gap-y-20 md:grid-cols-2">
          {projects.map((project, i) => (
            <Reveal key={project.slug} delay={(i % 2) * 0.08}>
              <ProjectCard project={project} priority={i === 0} dark />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
