'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

import { Reveal } from '@/components/reveal';
import { faqs } from '@/lib/faqs';

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section aria-labelledby="faq-titulo" id="faq" className="scroll-mt-24 px-4 py-24 sm:px-6 sm:py-32">
      <div className="mx-auto grid max-w-[84rem] gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
        <Reveal>
          <p className="eyebrow mb-4 text-ink/40">Preguntas</p>
          <h2 id="faq-titulo" className="display max-w-[12ch] text-[clamp(2.2rem,5vw,4.2rem)]">
            Lo que todos<span className="text-pumpkin"> preguntan</span>
          </h2>
          <p className="mt-6 max-w-[36ch] text-ink/60">
            Si tu duda no está acá, escribinos: contestamos rápido!
          </p>
        </Reveal>

        <div className="border-t border-ink/12">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={faq.q} delay={i * 0.04}>
                <div className="border-b border-ink/12">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full cursor-pointer items-start justify-between gap-6 py-6 text-left"
                  >
                    <span className="display max-w-[28ch] text-[clamp(1.1rem,2.1vw,1.6rem)]">
                      {faq.q}
                    </span>
                    <span
                      className="mt-1 shrink-0 transform-gpu text-xl leading-none transition-transform duration-500 ease-hover"
                      style={{ transform: `rotate(${isOpen ? 45 : 0}deg)` }}
                      aria-hidden
                    >
                      +
                    </span>
                  </button>
                  <motion.div
                    initial={false}
                    animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                    transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="max-w-[58ch] pb-7 text-sm leading-relaxed text-ink/65 sm:text-base">
                      {faq.a}
                    </p>
                  </motion.div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
