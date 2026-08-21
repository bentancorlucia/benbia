'use client';

import Link from 'next/link';
import { motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { useState } from 'react';

import { Sticker } from '@/components/sticker';
import { site } from '@/lib/site';

export function Nav() {
  const { scrollY } = useScroll();
  const [tucked, setTucked] = useState(false);

  useMotionValueEvent(scrollY, 'change', (value) => {
    setTucked(value > 80);
  });

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      /* En mobile no hay barra: las dos piezas flotan sueltas y cada una se
         pinta sola, así que no necesitan fondo detrás. De paso desaparece el
         borde superior sucio de iOS, donde el contenido pasa por detrás del
         status bar y ningún elemento fijo llega a taparlo.
         De sm para arriba sí hay barra, con su vidrio esmerilado de siempre: el
         problema del fondo translúcido era solo de iOS y ahí ya no hay barra. */
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        tucked ? 'sm:bg-paper/75 sm:backdrop-blur-md' : ''
      }`}
    >
      <div
        className={`mx-auto flex items-center justify-between gap-4 px-4 py-2.5 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] sm:px-6 ${
          tucked ? 'sm:py-3' : 'sm:py-5'
        }`}
      >
        {/* En mobile, estampita clara: mismo filo y misma sombra dura que las
            del hero, pero con la letra de la marca en vez de la serif. De sm
            para arriba se apaga todo y vuelve a ser texto pelado. */}
        <Link
          href="/"
          className="display rounded-[0.9em] bg-paper px-3.5 py-2 text-xl leading-none tracking-[-0.05em] shadow-[0_0_0_0.16em_var(--color-paper),0_0_0_0.19em_var(--sticker-line),0.22em_0.3em_0_-0.02em_var(--sticker-drop)] transition-transform duration-250 ease-hover active:scale-[0.97] sm:rounded-none sm:bg-transparent sm:px-0 sm:py-0 sm:text-2xl sm:shadow-none sm:active:scale-100"
          aria-label={`${site.name} — inicio`}
        >
          benbia<span className="text-pumpkin">.</span>
        </Link>

        {/* Mobile: estampita naranja, de la misma familia que las del hero */}
        <a
          href="/#contacto"
          className="inline-block transform-gpu transition-transform duration-250 ease-hover active:scale-[0.96] sm:hidden"
        >
          <Sticker tone="pumpkin" tilt={-4} className="text-[0.95rem]">
            Empecemos
          </Sticker>
        </a>

        {/* Desktop: el par de siempre dentro de su cápsula */}
        <div
          className={`hidden items-center gap-1 rounded-full border px-1 py-1 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] sm:flex ${
            tucked ? 'border-ink/10' : 'border-transparent'
          }`}
        >
          <Link
            href="/trabajos"
            className="rounded-full px-4 py-2 text-[0.7rem] font-medium tracking-[0.16em] uppercase transition-colors duration-250 ease-hover hover:bg-ink/6"
          >
            Trabajos
          </Link>
          <a
            href="/#contacto"
            className="rounded-full bg-ink px-4 py-2 text-[0.7rem] font-medium tracking-[0.16em] text-paper uppercase transition-[color,background-color,transform] duration-250 ease-hover hover:-translate-y-px hover:bg-pumpkin hover:text-ink"
          >
            Empecemos
          </a>
        </div>
      </div>
    </motion.header>
  );
}
