'use client';

import { useEffect, useState } from 'react';

/* TEMPORAL — panel de diagnóstico para la franja de arriba en iOS.
   Se activa solo con ?debug=1 en la URL; sin el parámetro no renderiza nada.
   Existe porque el comportamiento de Safari en el dispositivo real no se
   reproduce en el simulador. Borrar junto con su import en layout.tsx
   cuando esté resuelto. */
export function SafeAreaDebug() {
  const [lines, setLines] = useState<string[] | null>(null);

  useEffect(() => {
    if (!new URLSearchParams(window.location.search).has('debug')) return;

    // Sonda: un elemento cuya altura ES el inset, para leer el valor real que
    // resuelve env() en este navegador (no se puede leer de otra forma).
    const probe = document.createElement('div');
    probe.style.cssText =
      'position:fixed;top:0;left:0;width:1px;visibility:hidden;pointer-events:none;height:env(safe-area-inset-top,0px)';
    document.body.appendChild(probe);

    const read = () => {
      const header = document.querySelector('header');
      const box = header?.getBoundingClientRect();
      const cs = header ? getComputedStyle(header) : null;
      setLines([
        `inset-top real: ${probe.getBoundingClientRect().height}px`,
        `header top: ${box ? Math.round(box.top) : '?'}px   alto: ${box ? Math.round(box.height) : '?'}px`,
        `header padding-top: ${cs?.paddingTop ?? '?'}`,
        `header bg: ${cs?.backgroundColor ?? '?'}`,
        `innerHeight: ${window.innerHeight}   screen: ${window.screen.height}`,
        `scrollY: ${Math.round(window.scrollY)}`,
      ]);
    };

    read();
    window.addEventListener('scroll', read, { passive: true });
    return () => {
      window.removeEventListener('scroll', read);
      probe.remove();
    };
  }, []);

  if (!lines) return null;

  return (
    <>
      {/* El contorno muestra dónde empieza de verdad la caja del header */}
      <style>{'header{outline:2px solid #ff00ff !important;outline-offset:-2px}'}</style>
      <div
        style={{
          position: 'fixed',
          left: 8,
          right: 8,
          bottom: 96,
          zIndex: 100,
          padding: '8px 10px',
          borderRadius: 8,
          background: 'rgba(0,0,0,0.88)',
          color: '#4ade80',
          font: '11px ui-monospace, SFMono-Regular, monospace',
          lineHeight: 1.55,
          whiteSpace: 'pre-wrap',
        }}
      >
        {lines.join('\n')}
      </div>
    </>
  );
}
