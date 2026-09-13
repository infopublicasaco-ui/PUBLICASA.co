export const metadata = {
  title: "Política de Datos Personales | PUBLICASA.co",
  description: "Cumplimiento de la Ley 1581 de 2012 sobre protección de datos personales en Colombia",
};

export default function DatosPersonalesPage() {
  return (
    <div className="prose prose-sm max-w-none">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Política de Tratamiento de Datos Personales</h1>
      <p className="text-gray-600 mb-8">Cumplimiento de la Ley Estatutaria 1581 de 2012 y el Decreto 1377 de 2013 sobre protección de datos personales en Colombia</p>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Responsable del tratamiento</h2>
        <div className="bg-gray-100 p-4 rounded text-sm space-y-2">
          <p><strong>Razón social:</strong> PUBLICASA.co SAS</p>
          <p><strong>Domicilio:</strong> República de Colombia</p>
          <p><strong>Correo electrónico:</strong> datospersonales@publicasa.co</p>
          <p><strong>Sitio web:</strong> www.publicasa.co</p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">2. Datos recopilados</h2>
        <p className="mb-4">PUBLICASA.co recopila y trata las siguientes categorías de datos personales:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Datos de identificación:</strong> nombre completo, número de documento de identidad, fecha de nacimiento.</li>
          <li><strong>Datos de contacto:</strong> correo electrónico, número de teléfono, ciudad y departamento de residencia.</li>
          <li><strong>Datos de uso de la plataforma:</strong> búsquedas realizadas, avisos guardados, mensajes enviados, historial de publicaciones.</li>
          <li><strong>Datos técnicos:</strong> dirección IP, tipo de navegador, sistema operativo, dispositivo y páginas visitadas.</li>
          <li><strong>Datos de pago:</strong> información necesaria para procesar transacciones (procesada por pasarelas de pago certificadas; PUBLICASA.co no almacena datos de tarjetas de crédito o débito).</li>
          <li><strong>Datos del inmueble:</strong> información sobre propiedades publicadas por el usuario anunciante.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">3. Finalidades del tratamiento</h2>
        <p className="mb-4">Los datos personales son tratados con las siguientes finalidades:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Permitir el registro, autenticación y gestión de la cuenta del usuario.</li>
          <li>Facilitar la publicación, edición y gestión de avisos inmobiliarios.</li>
          <li>Poner en contacto a compradores, arrendatarios y anunciantes.</li>
          <li>Procesar pagos por planes y servicios contratados.</li>
          <li>Enviar comunicaciones relacionadas con el servicio: notificaciones de mensajes, actualizaciones de avisos, alertas de búsqueda.</li>
          <li>Enviar comunicaciones comerciales y de marketing (únicamente con autorización previa del titular).</li>
          <li>Mejorar la plataforma mediante el análisis estadístico del comportamiento de los usuarios.</li>
          <li>Cumplir con obligaciones legales y requerimientos de autoridades competentes.</li>
          <li>Prevenir y detectar fraudes o usos indebidos de la plataforma.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">4. Derechos del titular</h2>
        <p className="mb-4">De conformidad con la Ley 1581 de 2012, el titular de los datos personales tiene derecho a:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Conocer los datos personales que PUBLICASA.co trata sobre su persona.</li>
          <li>Actualizar y rectificar sus datos cuando estén desactualizados o sean inexactos.</li>
          <li>Solicitar la supresión de sus datos cuando no sean necesarios para la finalidad del tratamiento.</li>
          <li>Revocar la autorización de tratamiento de sus datos en cualquier momento.</li>
          <li>Presentar quejas ante la Superintendencia de Industria y Comercio por infracciones a la ley.</li>
          <li>Acceder gratuitamente a sus datos personales al menos una vez al mes.</li>
          <li>No ser objeto de decisiones automatizadas que afecten sus derechos.</li>
        </ul>
        <p className="mt-4">
          Para ejercer cualquiera de estos derechos, el titular puede enviar una solicitud al correo{" "}
          <a href="mailto:datospersonales@publicasa.co" className="text-brand-blue hover:underline">
            datospersonales@publicasa.co
          </a>
          . PUBLICASA.co dará respuesta en un plazo máximo de diez (10) días hábiles para consultas y quince (15) días
          hábiles para reclamos, contados a partir de la recepción de la solicitud.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Autorización</h2>
        <p>
          El tratamiento de datos personales se realiza previa autorización expresa del titular, otorgada al momento de
          registro en la plataforma o al momento de proporcionar sus datos. Esta autorización puede ser revocada en
          cualquier momento sin efecto retroactivo.
        </p>
        <p className="mt-4">
          En los casos en que la ley lo permita, PUBLICASA.co podrá tratar datos personales sin autorización previa del
          titular (por ejemplo, datos de acceso público, datos necesarios para cumplir obligaciones legales o datos
          necesarios para la ejecución del contrato con el usuario).
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">6. Conservación y seguridad</h2>
        <p>
          Los datos personales se conservarán durante el tiempo que el usuario mantenga una cuenta activa en PUBLICASA.co
          y, una vez cancelada la cuenta, durante el período adicional que exijan las obligaciones legales o contractuales vigentes.
        </p>
        <p className="mt-4">
          PUBLICASA.co implementa medidas técnicas, administrativas y físicas para proteger los datos personales contra
          acceso no autorizado, pérdida, alteración o destrucción, en cumplimiento de los estándares de seguridad aplicables.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">7. Transferencia y transmisión de datos</h2>
        <p>
          PUBLICASA.co puede compartir datos personales con terceros encargados del tratamiento (proveedores de servicios
          tecnológicos, pasarelas de pago, herramientas de análisis) bajo contratos que garantizan un nivel de protección
          equivalente al establecido en la Ley 1581 de 2012. No se realizarán transferencias internacionales de datos sin
          cumplir con los requisitos legales aplicables.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">8. Vigencia</h2>
        <p>
          La presente política entra en vigor a partir de su publicación en el sitio web y estará vigente hasta tanto sea
          modificada o derogada por PUBLICASA.co. Los cambios sustanciales serán comunicados a los titulares con al menos
          10 días hábiles de anticipación.
        </p>
        <p className="mt-4">
          Para mayor información sobre sus derechos y el tratamiento de sus datos, o para presentar consultas y reclamos,
          contáctenos en{" "}
          <a href="mailto:datospersonales@publicasa.co" className="text-brand-blue hover:underline">
            datospersonales@publicasa.co
          </a>
          .
        </p>
      </section>

      <div className="bg-brand-blue/10 border-l-4 border-brand-blue p-4 mt-8">
        <p className="text-sm text-gray-900">
          Para ejercer sus derechos de acceso, actualización, rectificación, supresión y revocación de autorización,
          contáctenos a través de los canales indicados en esta política.
        </p>
      </div>
    </div>
  );
}
