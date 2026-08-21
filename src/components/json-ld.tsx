/**
 * Inyecta un grafo JSON-LD. Se renderiza en el server, así que el dato ya está
 * en el HTML que reciben los crawlers y los modelos (no depende de JS).
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // `</script>` dentro de un string cerraría la etiqueta: lo escapamos.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}
