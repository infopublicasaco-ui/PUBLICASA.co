export const metadata = {
  title: "Política de Cookies | PUBLICASA.co",
  description: "Información sobre el uso de cookies y tecnologías de rastreo",
};

export default function CookiesPage() {
  return (
    <div className="prose prose-sm max-w-none">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Política de Cookies</h1>
      <p className="text-gray-600 mb-8">Información sobre el uso de cookies y tecnologías de rastreo en PUBLICASA.co</p>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">¿Qué son las cookies?</h2>
        <p>
          Las cookies son pequeños archivos de texto que los sitios web almacenan en el dispositivo del usuario durante
          la navegación. Sirven para recordar preferencias, mantener sesiones activas, analizar el comportamiento de los
          visitantes y mejorar la experiencia en el sitio.
        </p>
        <p className="mt-4">
          PUBLICASA.co utiliza cookies propias y de terceros con las finalidades descritas en esta política. El usuario
          puede configurar su navegador para rechazar todas las cookies o para ser notificado cuando se instala una, sin
          que esto impida necesariamente el acceso al portal, aunque puede afectar algunas funcionalidades.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Tipos de cookies que utilizamos</h2>

        <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Esenciales — Cookies técnicas y de sesión</h3>
        <p className="mb-3">
          Son imprescindibles para el funcionamiento básico del sitio. Permiten la navegación y el uso de funciones
          esenciales como el inicio de sesión, la gestión del carrito de servicios y el acceso a áreas protegidas. No
          pueden desactivarse.
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li>Autenticación y mantenimiento de sesión de usuario.</li>
          <li>Preferencias de idioma y región.</li>
          <li>Seguridad: tokens CSRF y protección contra ataques.</li>
        </ul>

        <h3 className="text-lg font-semibold text-gray-800 mb-3">Analíticas — Cookies de medición</h3>
        <p className="mb-3">
          Nos permiten contar visitas y fuentes de tráfico para medir y mejorar el rendimiento del sitio. Toda la
          información recopilada es agregada y anónima.
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li>Google Analytics: análisis de comportamiento, páginas visitadas, tiempo de sesión y tasas de conversión.</li>
          <li>Métricas propias de la plataforma: número de búsquedas, clics en avisos y contactos generados.</li>
        </ul>

        <h3 className="text-lg font-semibold text-gray-800 mb-3">Funcionales — Cookies de preferencias</h3>
        <p className="mb-6">
          Permiten que el sitio recuerde información que cambia la forma en que se comporta o se ve, como su ciudad de
          preferencia, los filtros de búsqueda guardados o los inmuebles marcados como favoritos.
        </p>

        <h3 className="text-lg font-semibold text-gray-800 mb-3">Publicidad — Cookies de marketing</h3>
        <p>
          Pueden ser establecidas por nuestros socios publicitarios. Sirven para crear un perfil de intereses del usuario
          y mostrar anuncios relevantes en PUBLICASA.co y en otros sitios. No almacenan datos personales directamente
          identificables.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Cookies de terceros</h2>
        <p className="mb-4">PUBLICASA.co utiliza servicios de terceros que pueden instalar sus propias cookies:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Google Analytics / Google Tag Manager — análisis de tráfico.</li>
          <li>Meta Pixel — medición de campañas publicitarias en redes sociales.</li>
          <li>Google Maps — visualización de ubicaciones de inmuebles.</li>
          <li>Pasarelas de pago — seguridad en transacciones.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">¿Cómo gestionar las cookies?</h2>
        <p className="mb-4">
          El usuario puede gestionar, deshabilitar o eliminar las cookies a través del panel de preferencias disponible
          en el sitio o directamente desde la configuración de su navegador. A continuación, los enlaces de configuración
          de los navegadores más comunes:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li>
            <a
              href="https://support.google.com/chrome/answer/95647"
              target="_blank"
              rel="noopener"
              className="text-brand-blue hover:underline"
            >
              Google Chrome
            </a>
          </li>
          <li>
            <a
              href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias"
              target="_blank"
              rel="noopener"
              className="text-brand-blue hover:underline"
            >
              Mozilla Firefox
            </a>
          </li>
          <li>
            <a
              href="https://support.apple.com/es-co/guide/safari/sfri11471/mac"
              target="_blank"
              rel="noopener"
              className="text-brand-blue hover:underline"
            >
              Apple Safari
            </a>
          </li>
          <li>
            <a
              href="https://support.microsoft.com/es-es/microsoft-edge/eliminar-las-cookies-en-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
              target="_blank"
              rel="noopener"
              className="text-brand-blue hover:underline"
            >
              Microsoft Edge
            </a>
          </li>
        </ul>

        <p className="bg-yellow-50 border border-yellow-200 p-4 rounded text-sm">
          <strong>Nota:</strong> La desactivación de cookies esenciales puede impedir el correcto funcionamiento de
          algunas partes de la plataforma, como el inicio de sesión o la publicación de avisos. Las cookies analíticas y
          de marketing pueden desactivarse sin afectar la funcionalidad principal del sitio.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Actualizaciones de esta política</h2>
        <p>
          PUBLICASA.co puede actualizar esta Política de Cookies periódicamente. Los cambios relevantes serán notificados
          a través del banner de cookies o mediante aviso en el sitio web. La fecha de última actualización se indica al
          pie de este documento.
        </p>
      </section>

      <div className="bg-brand-blue/10 border-l-4 border-brand-blue p-4 mt-8">
        <p className="text-sm text-gray-900">
          Para más información sobre nuestra política de cookies o para gestionar sus preferencias, contáctenos a través
          de los canales de soporte disponibles en PUBLICASA.co.
        </p>
      </div>
    </div>
  );
}
