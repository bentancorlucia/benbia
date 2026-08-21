'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion, type Variants } from 'framer-motion';
import { useEffect, useState } from 'react';

type IconName = 'home' | 'services' | 'works' | 'faq' | 'mail';

type RailItem = {
  label: string;
  href: string;
  icon: IconName;
};

/* Iconos de trazo, 24x24, heredan currentColor. */
const icons: Record<IconName, React.ReactNode> = {
  home: (
    <>
      <path d="M4 10.5 12 4l8 6.5" />
      <path d="M6 10v9h12v-9" />
    </>
  ),
  services: (
    <>
      <rect x="4" y="4" width="7" height="7" rx="1.6" />
      <rect x="13" y="4" width="7" height="7" rx="1.6" />
      <rect x="4" y="13" width="7" height="7" rx="1.6" />
      <rect x="13" y="13" width="7" height="7" rx="1.6" />
    </>
  ),
  works: (
    <>
      <rect x="3" y="7" width="18" height="13" rx="2.2" />
      <path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7" />
    </>
  ),
  faq: (
    <>
      <path d="M4 5.5A1.5 1.5 0 0 1 5.5 4h13A1.5 1.5 0 0 1 20 5.5v9a1.5 1.5 0 0 1-1.5 1.5H9l-5 4z" />
      <path d="M9.6 8.4a2.4 2.4 0 1 1 2.9 2.4v1.1" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2.2" />
      <path d="m3.8 7 7.2 5.4a1.7 1.7 0 0 0 2 0L20.2 7" />
    </>
  ),
};

function RailIcon({ name, className = '' }: { name: IconName; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={`h-[1.35rem] w-[1.35rem] ${className}`}
    >
      {icons[name]}
    </svg>
  );
}

/* Chip claro con borde suave: se lee igual sobre papel que sobre las
   secciones oscuras, porque no cambia de color con el fondo.

   El hover lo maneja framer y no CSS: la regla global de
   prefers-reduced-motion aplasta toda transición CSS con !important, así que
   por CSS el hover se veía instantáneo. Con springs además el movimiento
   arranca y frena solo, sin el corte seco de una curva fija. */
const CHIP_REST = '#e9e7dd'; // = color-mix(in oklab, ink 7%, paper)
const CHIP_HOVER = '#ff7722'; // pumpkin

const spring = { type: 'spring', stiffness: 260, damping: 24, mass: 0.9 } as const;
const colorTween = { type: 'tween', duration: 0.45, ease: [0.33, 1, 0.68, 1] } as const;

const chipVariants: Variants = {
  rest: {
    y: 0,
    scale: 1,
    backgroundColor: CHIP_REST,
    borderColor: 'rgba(23,20,18,0.10)',
    boxShadow: '0 0.15rem 0.5rem 0rem rgba(23,20,18,0.08)',
    transition: { ...spring, backgroundColor: colorTween, borderColor: colorTween, boxShadow: colorTween },
  },
  hover: {
    y: -5,
    scale: 1.06,
    backgroundColor: CHIP_HOVER,
    borderColor: 'rgba(255,119,34,0.55)',
    boxShadow: '0 0.7rem 1.3rem -0.2rem rgba(23,20,18,0.22)',
    transition: { ...spring, backgroundColor: colorTween, borderColor: colorTween, boxShadow: colorTween },
  },
  tap: { scale: 0.95, y: 0, transition: { type: 'spring' as const, stiffness: 500, damping: 30 } },
};

const iconVariants: Variants = {
  rest: { scale: 1, transition: spring },
  hover: { scale: 1.12, transition: spring },
};

/* El cartelito entra un pelín después del chip y sale enseguida: así se lee
   encadenado con el botón y no como dos animaciones sueltas. */
const labelVariants: Variants = {
  rest: {
    opacity: 0,
    x: -10,
    scale: 0.94,
    transition: { duration: 0.18, ease: [0.33, 1, 0.68, 1] as const },
  },
  hover: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { type: 'spring' as const, stiffness: 300, damping: 26, delay: 0.06 },
  },
};

const chip =
  'group pointer-events-auto relative flex h-14 w-14 transform-gpu items-center justify-center rounded-[1.15rem] border text-ink outline-none';

const MotionLink = motion.create(Link);

function RailButton({ item, index }: { item: RailItem; index: number }) {
  const motionProps = {
    initial: { opacity: 0, x: -24 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -24 },
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const, delay: index * 0.06 },
  };

  const interaction = {
    variants: chipVariants,
    initial: 'rest' as const,
    animate: 'rest' as const,
    whileHover: 'hover' as const,
    whileFocus: 'hover' as const,
    whileTap: 'tap' as const,
    className: chip,
    'aria-label': item.label,
  };

  const content = (
    <>
      <motion.span variants={iconVariants} className="flex">
        <RailIcon name={item.icon} />
      </motion.span>
      <motion.span
        variants={labelVariants}
        className="pointer-events-none absolute left-[calc(100%+0.6rem)] origin-left rounded-full bg-ink px-3 py-1.5 text-[0.62rem] font-medium tracking-[0.16em] whitespace-nowrap text-paper uppercase"
      >
        {item.label}
      </motion.span>
    </>
  );

  // La animación de entrada vive en el wrapper: separada del hover, ninguna
  // de las dos le pisa el transform a la otra.
  return (
    <motion.div {...motionProps} className="pointer-events-auto">
      {item.href.startsWith('#') ? (
        <motion.a href={item.href} {...interaction}>
          {content}
        </motion.a>
      ) : (
        <MotionLink href={item.href} {...interaction}>
          {content}
        </MotionLink>
      )}
    </motion.div>
  );
}

export function SideRail() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [visible, setVisible] = useState(!isHome);

  useEffect(() => {
    if (!isHome) {
      setVisible(true);
      return;
    }
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.55);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isHome]);

  const items: RailItem[] = isHome
    ? [
        { label: 'Servicios', href: '#servicios', icon: 'services' },
        { label: 'Trabajos', href: '/trabajos', icon: 'works' },
        { label: 'Preguntas', href: '#faq', icon: 'faq' },
        { label: 'Contacto', href: '#contacto', icon: 'mail' },
      ]
    : [
        { label: 'Inicio', href: '/', icon: 'home' },
        { label: 'Servicios', href: '/#servicios', icon: 'services' },
        { label: 'Preguntas', href: '/#faq', icon: 'faq' },
        { label: 'Contacto', href: '/#contacto', icon: 'mail' },
      ];

  return (
    <>
      {/* Rail de iconos, pegado al borde izquierdo */}
      <div className="pointer-events-none fixed top-1/2 left-[calc(0.75rem+var(--safe-left))] z-50 hidden -translate-y-1/2 flex-col gap-2.5 lg:flex">
        <AnimatePresence>
          {visible && items.map((item, i) => <RailButton key={item.label} item={item} index={i} />)}
        </AnimatePresence>
      </div>

      {/* En mobile el rail se vuelve una barra abajo */}
      <div className="fixed right-[calc(0.75rem+var(--safe-right))] bottom-[calc(0.75rem+var(--safe-bottom))] left-[calc(0.75rem+var(--safe-left))] z-50 flex gap-2 lg:hidden">
        <AnimatePresence>
          {visible && (
            <motion.nav
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 24 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex w-full gap-1 rounded-full border border-paper/18 bg-ink/95 p-1 backdrop-blur"
            >
              {items.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  aria-label={item.label}
                  className="flex flex-1 transform-gpu items-center justify-center rounded-full py-3 text-paper transition-[background-color,color,transform] duration-[420ms] ease-out-expo hover:scale-[1.03] hover:bg-pumpkin hover:text-ink hover:duration-250 hover:ease-hover active:scale-[0.97] active:bg-pumpkin active:text-ink active:duration-100 motion-reduce:transform-none motion-reduce:transition-none"
                >
                  <RailIcon name={item.icon} />
                </Link>
              ))}
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
