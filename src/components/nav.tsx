'use client';

import Link from 'next/link';
import { motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { useState } from 'react';

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
      /* Pegada va opaca y sin blur a propósito: iOS Safari pinta la franja del
         status bar muestreando el color de arriba de la página. Con un fondo
         semitransparente ese color cambiaba según la sección de atrás y quedaba
         una costura; con paper sólido siempre da el mismo #fbf9ef. */
      className={`fixed inset-x-0 top-0 z-50 pt-[var(--safe-top)] pr-[var(--safe-right)] pl-[var(--safe-left)] transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        tucked ? 'bg-paper' : ''
      }`}
    >
      <div
        className={`mx-auto flex items-center justify-between gap-4 px-4 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] sm:px-6 ${
          tucked ? 'py-2 sm:py-3' : 'py-2.5 sm:py-5'
        }`}
      >
        <Link
          href="/"
          className="display text-xl leading-none tracking-[-0.05em] sm:text-2xl"
          aria-label={`${site.name} — inicio`}
        >
          benbia<span className="text-pumpkin">.</span>
        </Link>

        <div
          className={`flex items-center gap-1 rounded-full border px-1 py-1 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            tucked ? 'border-ink/10' : 'border-transparent'
          }`}
        >
          <Link
            href="/trabajos"
            className="hidden rounded-full px-4 py-2 text-[0.7rem] font-medium tracking-[0.16em] uppercase transition-colors duration-250 ease-hover hover:bg-ink/6 sm:block"
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
