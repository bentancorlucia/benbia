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
  className?: string;
  style?: CSSProperties;
};

export function Sticker({
  children,
  lines,
  tone = 'pumpkin',
  tilt = -4,
  edge,
  className = '',
  style,
}: StickerProps) {
  const { bg, fg } = tones[tone];
  const stacked = Boolean(lines?.length);

  return (
    <span
      className={`sticker ${stacked ? 'sticker--stack' : ''} ${className}`}
      style={
        {
          '--sticker-bg': bg,
          '--sticker-fg': fg,
          '--sticker-edge': edge ?? 'var(--color-paper)',
          transform: `rotate(${tilt}deg)`,
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
