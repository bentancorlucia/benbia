import type { CSSProperties, ReactNode } from 'react';

type Tone = 'pumpkin' | 'mustard' | 'berry' | 'klein';

const tones: Record<Tone, { bg: string; fg: string }> = {
  pumpkin: { bg: 'var(--color-pumpkin)', fg: 'var(--color-paper)' },
  mustard: { bg: 'var(--color-mustard)', fg: 'var(--color-pumpkin)' },
  berry: { bg: 'var(--color-berry)', fg: 'var(--color-mustard)' },
  klein: { bg: 'var(--color-klein)', fg: 'var(--color-paper)' },
};

export type StickerProps = {
  children?: ReactNode;
  /** Estampita de varios pisos: cada renglón es su propia cápsula y el
      contorno se funde alrededor de todas. */
  lines?: string[];
  tone?: Tone;
  /** Inclinación en grados */
  tilt?: number;
  /** Color del borde exterior: el del fondo sobre el que se pega */
  edge?: string;
  /** Despegue al hover en desktop. Se apaga donde el contenedor ya anima la
      estampita por su cuenta (la ficha de proyecto, por ejemplo). */
  lift?: boolean;
  className?: string;
  style?: CSSProperties;
};

export function Sticker({
  children,
  lines,
  tone = 'pumpkin',
  tilt = -4,
  edge,
  lift = true,
  className = '',
  style,
}: StickerProps) {
  const { bg, fg } = tones[tone];
  const stacked = Boolean(lines?.length);

  return (
    <span
      className={`sticker ${stacked ? 'sticker--stack' : ''} ${lift ? 'sticker--lift' : ''} ${className}`}
      style={
        {
          '--sticker-bg': bg,
          '--sticker-fg': fg,
          '--sticker-edge': edge ?? 'var(--color-paper)',
          /* La inclinación viaja como variable, no como transform inline: así
             el hover de CSS puede recomponer el transform entero sin pelearse
             con el estilo del elemento. */
          '--sticker-tilt': `${tilt}deg`,
          ...style,
        } as CSSProperties
      }
    >
      {stacked
        ? lines!.map((line) => (
            <span key={line} className="sticker__line">
              {line}
            </span>
          ))
        : children}
    </span>
  );
}
