/**
 * Las preguntas frecuentes viven acá porque se usan en dos lados: la sección
 * <Faq /> y el FAQPage del JSON-LD. Una sola fuente evita que el texto que
 * lee Google (o un modelo) diga algo distinto al que ve la persona.
 *
 * Respuestas cortas y autocontenidas: así se pueden citar sin contexto.
 */
export type Faq = { q: string; a: string };

export const faqs: Faq[] = [
  {
    q: '¿Cuánto sale un proyecto?',
    a: 'Todo se cotiza después de una reunión de relevamiento, porque el precio depende del alcance real. La reunión dura 30 minutos, es sin costo y de ahí sale un presupuesto cerrado.',
  },
  {
    q: '¿Cuánto tarda un proyecto?',
    a: 'Aunque todo depende de la escala, un sitio suele llevar entre dos y seis semanas; una app entre seis y doce. Lo importante es que te mostramos avances cada semana, para que no haya sorpresas ni demoras injustificadas.',
  },
  {
    q: '¿El código queda mío?',
    a: 'Dependerá de lo acordado. En general ofrecemos nuestros servicios de mantenimiento y soporte, pero si querés que el código quede en tu poder, lo hacemos sin problemas.',
  },
  {
    q: 'Ya tengo un sitio, ¿lo pueden mejorar?',
    a: 'Sí. Empezamos con una auditoría corta: qué se puede rescatar, qué conviene rehacer y qué está frenando el negocio. A veces la respuesta es un rediseño y a veces es pensarlo desde cero.',
  },
  {
    q: '¿Puedo editar el contenido después?',
    a: 'Esa es la idea. Salvo que pidas lo contrario, todo proyecto sale con un panel personalizado para que puedas tener un contenido dinámico y actualizado sin depender de nadie.',
  },
  {
    q: '¿Trabajan con gente de afuera de Uruguay?',
    a: 'Sí, todo el proceso funciona en remoto: reuniones por videollamada, entregas semanales y comunicación asincrónica. La zona horaria no es problema.',
  },
];
