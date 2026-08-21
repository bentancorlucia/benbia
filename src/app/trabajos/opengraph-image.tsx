import { ogCard, ogContentType, ogSize } from '@/lib/og';
import { site } from '@/lib/site';

const TITLE = 'Sitios, apps y sistemas a medida que ya están en producción.';

export const alt = `Trabajos de ${site.name} — ${TITLE}`;
export const size = ogSize;
export const contentType = ogContentType;

export default function TrabajosOpengraphImage() {
  return ogCard(TITLE);
}
