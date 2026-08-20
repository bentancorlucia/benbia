export type OfficialSticker = {
  text: string;
  /** Partido en renglones para las estampitas de varios pisos. */
  lines?: string[];
};

/** Estampitas oficiales de BENBIA. Toda cápsula del sitio sale de acá:
    si hay que cambiar una frase, se cambia en este archivo y nada más. */
export const stickers = {
  medida: { text: '100% a Medida' },
  ia: { text: 'IA Aplicada' },
  escala: { text: 'Escala contigo!' },
  shipItFast: { text: 'Ship it Fast' },
  cleanCode: { text: 'Clean Code' },
  builtToLast: { text: 'Built to last' },
  pixelPerfect: { text: 'PIXEL PERFECT', lines: ['PIXEL', 'PERFECT'] },
  goodDesign: {
    text: 'Good design, good results',
    lines: ['Good design,', 'good results'],
  },
  dashboards: { text: 'Hola, Dashboards!', lines: ['Hola,', 'Dashboards!'] },
} satisfies Record<string, OfficialSticker>;
