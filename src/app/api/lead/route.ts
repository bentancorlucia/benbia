import { NextResponse } from 'next/server';
import { Resend } from 'resend';

import { site } from '@/lib/site';

type Lead = {
  need?: string[];
  stage?: string;
  budget?: string;
  timing?: string;
  name?: string;
  email?: string;
  company?: string;
  message?: string;
};

const escape = (value: string) =>
  value.replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] as string,
  );

export async function POST(request: Request) {
  let lead: Lead;
  try {
    lead = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'JSON inválido' }, { status: 400 });
  }

  if (!lead.name || !lead.email) {
    return NextResponse.json({ ok: false, error: 'Faltan nombre o email' }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Sin API key el formulario sigue funcionando: la persona igual llega a Cal.com.
    console.warn('[lead] RESEND_API_KEY no configurada, no se envió el mail:', lead.email);
    return NextResponse.json({ ok: true, delivered: false });
  }

  const rows: [string, string][] = [
    ['Nombre', lead.name],
    ['Email', lead.email],
    ['Empresa', lead.company || '—'],
    ['Necesita', lead.need?.join(', ') || '—'],
    ['Etapa', lead.stage || '—'],
    ['Presupuesto', lead.budget || '—'],
    ['Plazo', lead.timing || '—'],
    ['Mensaje', lead.message || '—'],
  ];

  const html = `
    <div style="font-family:ui-sans-serif,system-ui,sans-serif;color:#171412">
      <h2 style="margin:0 0 16px">Nueva consulta desde ${site.domain}</h2>
      <table cellpadding="6" style="border-collapse:collapse;font-size:14px">
        ${rows
          .map(
            ([label, value]) =>
              `<tr><td style="color:#8a8580;vertical-align:top">${label}</td><td><strong>${escape(value)}</strong></td></tr>`,
          )
          .join('')}
      </table>
    </div>`;

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: process.env.LEAD_FROM ?? 'BENBIA <onboarding@resend.dev>',
      to: process.env.LEAD_TO ?? site.email,
      replyTo: lead.email,
      subject: `Consulta de ${lead.name}${lead.company ? ` · ${lead.company}` : ''}`,
      html,
    });
    return NextResponse.json({ ok: true, delivered: true });
  } catch (error) {
    console.error('[lead] fallo el envío', error);
    return NextResponse.json({ ok: true, delivered: false });
  }
}
