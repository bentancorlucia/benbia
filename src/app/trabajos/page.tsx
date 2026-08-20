import type { Metadata } from 'next';

import { WorksIndex } from '@/components/works-index';

export const metadata: Metadata = {
  title: 'Trabajos',
  description:
    'Sitios, apps y sistemas a medida construidos por BENBIA para asociaciones, estudios y equipos de Uruguay.',
};

export default function TrabajosPage() {
  return <WorksIndex />;
}
