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
      /* El -mt/+pt de 100px no es decorativo: en iOS Safari la página se pinta
         por detrás del status bar pero el viewport de layout empieza más abajo,
         así que `top: 0` no llega al borde real y por esa franja se veía pasar
         el contenido. env(safe-area-inset-top) ahí devuelve 0, medido en un
         iPhone 17 Pro, así que no hay inset con el cual compensar: se estira la
         caja hacia arriba y el padding devuelve el contenido a su lugar.
         Opaca y sin blur para que ese fondo estirado sea un color plano. */
      className={`fixed inset-x-0 top-0 z-50 -mt-[100px] pt-[calc(100px+var(--safe-top))] pr-[var(--safe-right)] pl-[var(--safe-left)] transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
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
