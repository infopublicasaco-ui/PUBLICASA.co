export const metadata = {
  title: "Política de Cookies | PUBLICASA.co",
  description: "Información sobre uso de cookies",
};

export default function CookiesPage() {
  return (
    <div className="prose prose-sm max-w-none">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Política de Cookies</h1>
      <p className="text-gray-600 mb-8">Información sobre el uso de cookies en PUBLICASA.co</p>
      
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">¿Qué son las cookies?</h2>
        <p>Las cookies son pequeños archivos almacenados en el dispositivo que sirven para recordar preferencias, mantener sesiones y analizar comportamiento.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Tipos de cookies</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-800">Esenciales</h3>
            <p>Imprescindibles para funcionamiento: autenticación, sesión, seguridad.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">Analíticas</h3>
            <p>Google Analytics para medir tráfico y mejorar rendimiento.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">Funcionales</h3>
            <p>Recordar preferencias y configuraciones del usuario.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">Publicidad</h3>
            <p>Mostrar anuncios relevantes basados en intereses.</p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Gestión de cookies</h2>
        <p>Puedes gestionar cookies desde la configuración de tu navegador. Visita:</p>
        <ul className="mt-2 space-y-1 text-sm">
          <li><a href="https://support.google.com/chrome" target="_blank" className="text-brand-blue hover:underline">Google Chrome</a></li>
          <li><a href="https://support.mozilla.org" target="_blank" className="text-brand-blue hover:underline">Mozilla Firefox</a></li>
          <li><a href="https://support.apple.com" target="_blank" className="text-brand-blue hover:underline">Apple Safari</a></li>
          <li><a href="https://support.microsoft.com" target="_blank" className="text-brand-blue hover:underline">Microsoft Edge</a></li>
        </ul>
      </section>

      <div className="bg-blue-50 border border-blue-200 p-4 rounded mt-8">
        <p className="text-sm text-gray-900">Desactivar cookies esenciales puede impedir funcionamiento de la plataforma.</p>
      </div>
    </div>
  );
}
