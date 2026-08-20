import Link from 'next/link';

import { site } from '@/lib/site';

export function Footer() {
  return (
    <footer className="bg-ink px-4 pt-16 pb-28 text-paper sm:px-6 lg:pb-16">
      <div className="mx-auto max-w-[84rem]">
        <div className="flex flex-col gap-10 border-b border-paper/12 pb-10 md:flex-row md:items-end md:justify-between">
          <p className="display max-w-[16ch] text-4xl sm:text-5xl">
            ¿Lo hacemos<span className="text-pumpkin"> juntos?</span>
          </p>
          <div className="flex flex-col gap-2 text-sm">
            <a
              href={`mailto:${site.email}`}
              className="link-underline w-fit text-paper/80 transition-colors duration-300 ease-hover hover:text-mustard"
            >
              {site.email}
            </a>
            <a
              href={site.calLink}
              target="_blank"
              rel="noreferrer"
              className="link-underline w-fit text-paper/80 transition-colors duration-300 ease-hover hover:text-mustard"
            >
              Agendar 30 minutos
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-6 pt-8 text-[0.7rem] tracking-[0.14em] uppercase md:flex-row md:items-center md:justify-between">
          <p className="text-paper/45">
            © {new Date().getFullYear()} {site.name} · Montevideo, Uruguay
          </p>
          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            <Link href="/trabajos" className="text-paper/70 transition-colors duration-300 ease-hover hover:text-pumpkin">
              Trabajos
            </Link>
            {site.social.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="text-paper/70 transition-colors duration-300 ease-hover hover:text-pumpkin"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
