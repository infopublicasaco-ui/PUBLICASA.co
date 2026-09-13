export const metadata = {
  title: "Aviso Legal | PUBLICASA.co",
  description: "Condiciones de acceso y uso general del sitio web PUBLICASA.co",
};

export default function AvisoLegalPage() {
  return (
    <div className="prose prose-sm max-w-none">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Aviso Legal</h1>
      <p className="text-gray-600 mb-8">Condiciones de acceso y uso general del sitio web PUBLICASA.co</p>

      <section className="mb-8">
        <p>
          <strong>www.publicasa.co</strong> autoriza al usuario a tener acceso al presente sitio web, siempre que acepte
          en su totalidad los términos, condiciones, advertencias y avisos legales contenidos en el mismo. El solo acceso
          al portal implica la aceptación plena y sin reservas de estas condiciones.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Titular del sitio</h2>
        <p>
          PUBLICASA.co es una plataforma digital de intermediación inmobiliaria operada en la República de Colombia. Su
          función es facilitar la publicación, búsqueda y gestión de anuncios relacionados con la compra, venta y
          arrendamiento de bienes inmuebles.
        </p>
        <div className="bg-gray-100 p-4 rounded mt-4 space-y-2 text-sm">
          <p>
            <strong>Razón social:</strong> PUBLICASA.co SAS
          </p>
          <p>
            <strong>Correo de contacto:</strong> legal@publicasa.co
          </p>
          <p>
            <strong>País:</strong> Colombia
          </p>
          <p>
            <strong>Sitio web:</strong> www.publicasa.co
          </p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Exención de responsabilidad</h2>
        <p>
          <strong>www.publicasa.co</strong> no otorga garantía directa ni indirecta en relación con la exactitud,
          confiabilidad u oportunidad de la información o del material incluido en el portal. Las decisiones que con base
          en el sitio adopte el usuario serán de su exclusiva responsabilidad y a su propio riesgo.
        </p>
        <p className="mt-4">
          Para efectos de toma de decisiones de compra, venta o arrendamiento, PUBLICASA.co recomienda contar con la
          asesoría jurídica, financiera e inmobiliaria que se requiera en cada caso. Los precios, características y
          condiciones de los inmuebles publicados son responsabilidad exclusiva de quien publica el anuncio.
        </p>
        <p className="mt-4">
          PUBLICASA.co actúa como plataforma de intermediación y no es parte contratante en ninguna negociación entre
          usuarios. En consecuencia, no asume responsabilidad por el incumplimiento de contratos celebrados entre
          compradores, vendedores o arrendadores.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Propiedad intelectual</h2>
        <p>
          Todos los contenidos del sitio web —textos, imágenes, logotipos, diseños, código fuente y arquitectura de la
          plataforma— son propiedad exclusiva de PUBLICASA.co o de sus proveedores de contenido, y están protegidos por
          la legislación colombiana e internacional de propiedad intelectual.
        </p>
        <p className="mt-4">
          Queda expresamente prohibida su reproducción, distribución, comunicación pública o transformación sin
          autorización escrita del titular, salvo en los casos previstos por la ley.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Medición y análisis</h2>
        <p>
          Este sitio utiliza herramientas de análisis web como Google Analytics. Dichas soluciones emplean etiquetas en
          páginas y cookies anónimas para analizar el comportamiento de navegación y mejorar la experiencia del usuario.
          Para mayor información sobre la política de privacidad de esta herramienta, puede consultar la{" "}
          <a
            href="https://support.google.com/analytics/answer/6004245"
            target="_blank"
            rel="noopener"
            className="text-brand-blue hover:underline"
          >
            Política de Protección de Datos de Google Analytics
          </a>
          .
        </p>
      </section>

      <div className="bg-brand-blue/10 border-l-4 border-brand-blue p-4 mt-8">
        <p className="text-sm text-gray-900">
          El acceso y uso de este portal implica la aceptación plena del presente Aviso Legal y de todos los demás
          documentos legales publicados en este Centro de Información. PUBLICASA.co se reserva el derecho de modificar
          estos términos en cualquier momento, siendo responsabilidad del usuario revisar periódicamente este apartado.
        </p>
      </div>
    </div>
  );
}
