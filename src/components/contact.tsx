'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useMemo, useState } from 'react';

import { Reveal } from '@/components/reveal';
import { Sticker } from '@/components/sticker';
import { site } from '@/lib/site';
import { stickers } from '@/lib/stickers';

type Answers = {
  need: string[];
  stage: string;
  budget: string;
  timing: string;
  name: string;
  email: string;
  company: string;
  message: string;
};

const empty: Answers = {
  need: [],
  stage: '',
  budget: '',
  timing: '',
  name: '',
  email: '',
  company: '',
  message: '',
};

const choiceSteps = [
  {
    key: 'need' as const,
    multi: true,
    title: '¿Qué necesitás?',
    hint: 'Podés marcar más de una.',
    options: ['Un sitio web', 'Una app', 'Un sistema a medida', 'Datos y automatización', 'Todavía no sé'],
  },
  {
    key: 'stage' as const,
    multi: false,
    title: '¿En qué punto estás?',
    hint: 'Para saber desde dónde arrancamos.',
    options: ['Es una idea', 'Tengo algo armado', 'Quiero rehacer lo que hay', 'Necesito ordenar un proceso'],
  },
  {
    key: 'budget' as const,
    multi: false,
    title: '¿Con qué presupuesto contás?',
    hint: 'En dólares. Sirve para proponerte un alcance realista.',
    options: ['Menos de 1.500', '1.500 a 4.000', '4.000 a 10.000', 'Más de 10.000', 'A definir juntos'],
  },
  {
    key: 'timing' as const,
    multi: false,
    title: '¿Para cuándo lo querés?',
    hint: 'Sin compromiso, es solo una referencia.',
    options: ['Lo antes posible', 'En 1 a 3 meses', 'Este año', 'Estoy averiguando'],
  },
];

const TOTAL = choiceSteps.length + 1;

export function Contact() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>(empty);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isLast = step === choiceSteps.length;
  const current = choiceSteps[step];

  const notes = useMemo(() => {
    return [
      `Necesita: ${answers.need.join(', ') || '—'}`,
      `Etapa: ${answers.stage || '—'}`,
      `Presupuesto: ${answers.budget || '—'}`,
      `Plazo: ${answers.timing || '—'}`,
      answers.company ? `Empresa: ${answers.company}` : null,
      answers.message ? `Nota: ${answers.message}` : null,
    ]
      .filter(Boolean)
      .join('\n');
  }, [answers]);

  const canAdvance = current
    ? current.multi
      ? answers.need.length > 0
      : Boolean(answers[current.key])
    : true;

  const pick = (value: string) => {
    if (!current) return;
    if (current.multi) {
      setAnswers((prev) => ({
        ...prev,
        need: prev.need.includes(value)
          ? prev.need.filter((v) => v !== value)
          : [...prev.need, value],
      }));
      return;
    }
    setAnswers((prev) => ({ ...prev, [current.key]: value }));
    // Con una sola opción no hace falta confirmar: avanza solo.
    setTimeout(() => setStep((s) => Math.min(s + 1, choiceSteps.length)), 260);
  };

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSending(true);
    setError(null);

    try {
      await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(answers),
      });
    } catch {
      // Si el mail falla igual lo mandamos a agendar: la reunión importa más.
    }

    const url = new URL(site.calLink);
    url.searchParams.set('name', answers.name);
    url.searchParams.set('email', answers.email);
    url.searchParams.set('notes', notes);
    window.location.href = url.toString();
  };

  return (
    <section id="contacto" className="scroll-mt-24 bg-klein px-4 py-24 text-paper sm:px-6 sm:py-32">
      <div className="mx-auto grid max-w-[84rem] gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
        <Reveal>
          <p className="eyebrow mb-4 text-paper/50">Contacto</p>
          <h2 className="display max-w-[13ch] text-[clamp(2.2rem,5.4vw,4.6rem)]">
            Contanos tu<span className="text-mustard"> idea</span>
          </h2>
          <p className="mt-6 max-w-[38ch] text-paper/70">
            Agendá una llamada con nosotros para darle forma a eso que tenés en mente.
          </p>

          <div className="mt-10 flex flex-wrap gap-5 text-[0.95rem]">
            <Sticker tone="mustard" tilt={-5} edge="var(--color-klein)">
              {stickers.shipItFast.text}
            </Sticker>
            <Sticker tone="pumpkin" tilt={4} edge="var(--color-klein)">
              {stickers.medida.text}
            </Sticker>
          </div>

          <a
            href={`mailto:${site.email}`}
            className="link-underline mt-10 inline-block text-sm text-paper/60 transition-colors duration-300 ease-hover hover:text-mustard"
          >
            ¿Preferís mail? {site.email}
          </a>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="rounded-3xl border border-paper/15 bg-paper p-6 text-ink sm:p-9">
            {/* Progreso */}
            <div className="mb-8 flex items-center gap-4">
              <div className="h-1 flex-1 overflow-hidden rounded-full bg-ink/10">
                <motion.div
                  className="h-full rounded-full bg-pumpkin"
                  initial={false}
                  animate={{ width: `${((step + 1) / TOTAL) * 100}%` }}
                  transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
              <span className="eyebrow shrink-0 text-ink/40 tabular-nums">
                {step + 1} / {TOTAL}
              </span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              >
                {!isLast && current && (
                  <div>
                    <h3 className="display text-[clamp(1.5rem,3vw,2.2rem)]">{current.title}</h3>
                    <p className="mt-2 text-sm text-ink/50">{current.hint}</p>

                    <div className="mt-7 flex flex-wrap gap-2.5">
                      {current.options.map((option) => {
                        const selected = current.multi
                          ? answers.need.includes(option)
                          : answers[current.key] === option;
                        return (
                          <button
                            key={option}
                            type="button"
                            onClick={() => pick(option)}
                            className={`cursor-pointer rounded-full border px-5 py-3 text-sm transform-gpu transition-[color,background-color,border-color,transform] duration-300 ease-hover hover:-translate-y-0.5 ${
                              selected
                                ? 'border-ink bg-ink text-paper'
                                : 'border-ink/20 hover:border-ink/50'
                            }`}
                          >
                            {option}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {isLast && (
                  <form onSubmit={submit}>
                    <h3 className="display text-[clamp(1.5rem,3vw,2.2rem)]">
                      Último paso: ¿quién sos?
                    </h3>
                    <p className="mt-2 text-sm text-ink/50">
                      Con esto llenamos la reserva por vos.
                    </p>

                    <div className="mt-7 grid gap-4 sm:grid-cols-2">
                      <Field
                        label="Nombre"
                        value={answers.name}
                        onChange={(v) => setAnswers((p) => ({ ...p, name: v }))}
                        required
                        autoComplete="name"
                      />
                      <Field
                        label="Email"
                        type="email"
                        value={answers.email}
                        onChange={(v) => setAnswers((p) => ({ ...p, email: v }))}
                        required
                        autoComplete="email"
                      />
                      <div className="sm:col-span-2">
                        <Field
                          label="Empresa o proyecto (opcional)"
                          value={answers.company}
                          onChange={(v) => setAnswers((p) => ({ ...p, company: v }))}
                          autoComplete="organization"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="eyebrow mb-2 block text-ink/45">
                          ¿Algo más que quieras contarnos?
                        </label>
                        <textarea
                          rows={3}
                          value={answers.message}
                          onChange={(e) => setAnswers((p) => ({ ...p, message: e.target.value }))}
                          className="w-full resize-none rounded-xl border border-ink/20 bg-transparent px-4 py-3 text-sm transition-colors duration-300 outline-none focus:border-ink"
                        />
                      </div>
                    </div>

                    {error && <p className="mt-4 text-sm text-berry">{error}</p>}

                    <button
                      type="submit"
                      disabled={sending}
                      className="group mt-7 w-full cursor-pointer rounded-full bg-pumpkin px-7 py-4 text-sm font-medium text-ink transform-gpu transition-[color,background-color,transform,box-shadow] duration-300 ease-hover hover:-translate-y-0.5 hover:bg-ink hover:text-paper hover:shadow-[0_0.5rem_1.2rem_rgba(23,20,18,0.16)] disabled:cursor-wait disabled:opacity-60"
                    >
                      {sending ? 'Un segundo…' : 'Elegir horario y enviar'}
                      <span className="ml-2 inline-block transition-transform duration-300 ease-hover group-hover:translate-x-1">
                        →
                      </span>
                    </button>
                    <p className="mt-3 text-center text-xs text-ink/40">
                      Te llevamos al calendario con todo pre-cargado.
                    </p>
                  </form>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navegación */}
            <div className="mt-8 flex items-center justify-between border-t border-ink/10 pt-5">
              <button
                type="button"
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                disabled={step === 0}
                className="cursor-pointer text-[0.7rem] tracking-[0.16em] text-ink/45 uppercase transition-colors duration-250 ease-hover hover:text-ink disabled:invisible"
              >
                ← Atrás
              </button>

              {!isLast && (
                <button
                  type="button"
                  onClick={() => setStep((s) => s + 1)}
                  disabled={!canAdvance}
                  className="cursor-pointer rounded-full bg-ink px-5 py-2.5 text-[0.7rem] tracking-[0.16em] text-paper uppercase transition-[color,background-color,opacity] duration-250 ease-hover hover:bg-pumpkin hover:text-ink disabled:opacity-25 disabled:hover:bg-ink disabled:hover:text-paper"
                >
                  Siguiente →
                </button>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  type = 'text',
  required = false,
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <div>
      <label className="eyebrow mb-2 block text-ink/45">{label}</label>
      <input
        type={type}
        value={value}
        required={required}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-ink/20 bg-transparent px-4 py-3 text-sm transition-colors duration-300 outline-none focus:border-ink"
      />
    </div>
  );
}
