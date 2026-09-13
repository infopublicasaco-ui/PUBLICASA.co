export const metadata = {
  title: "Política de Datos Personales | PUBLICASA.co",
  description: "Política de tratamiento de datos personales",
};

export default function DatosPersonalesPage() {
  return (
    <div className="prose prose-sm max-w-none">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Política de Tratamiento de Datos Personales</h1>
      <p className="text-gray-600 mb-8">Cumplimiento de Ley 1581 de 2012 sobre protección de datos en Colombia</p>
      
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Responsable del tratamiento</h2>
        <div className="bg-gray-100 p-4 rounded text-sm">
          <p><strong>Razón social:</strong> PUBLICASA.co SAS</p>
          <p><strong>País:</strong> Colombia</p>
          <p><strong>Email:</strong> datospersonales@publicasa.co</p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">2. Datos recopilados</h2>
        <ul className="space-y-2">
          <li><strong>Identificación:</strong> nombre, documento, fecha de nacimiento</li>
          <li><strong>Contacto:</strong> email, teléfono, ciudad</li>
          <li><strong>Uso:</strong> búsquedas, avisos guardados, mensajes</li>
          <li><strong>Técnicos:</strong> IP, navegador, dispositivo</li>
          <li><strong>Pago:</strong> procesado por terceros certificados</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">3. Derechos del titular</h2>
        <ul className="space-y-2">
          <li>Conocer los datos personales que PUBLICASA.co trata</li>
          <li>Actualizar y rectificar información desactuali zada</li>
          <li>Solicitar supresión de datos</li>
          <li>Revocar autorización en cualquier momento</li>
          <li>Presentar quejas ante la Superintendencia de Industria y Comercio</li>
        </ul>
      </section>

      <div className="bg-brand-blue/10 border-l-4 border-brand-blue p-4 mt-8">
        <p className="text-sm text-gray-900">Para ejercer derechos: datospersonales@publicasa.co</p>
      </div>
    </div>
  );
}
