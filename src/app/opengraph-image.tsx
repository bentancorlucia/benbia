import { ogCard, ogContentType, ogSize } from '@/lib/og';
import { site } from '@/lib/site';

const TITLE = 'Pensamos, diseñamos y construimos el software que tu negocio necesita.';

export const alt = `${site.name} — ${TITLE}`;
export const size = ogSize;
export const contentType = ogContentType;

export default function OpengraphImage() {
  return ogCard(TITLE);
}
