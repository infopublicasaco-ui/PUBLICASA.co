export const metadata = {
  title: "Términos y Condiciones | PUBLICASA.co",
  description: "Términos y condiciones generales de uso de la plataforma",
};

export default function TerminosPage() {
  return (
    <div className="prose prose-sm max-w-none">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Términos y Condiciones Generales de Uso</h1>
      <p className="text-gray-600 mb-8">Condiciones que regulan el acceso, registro y utilización de todos los servicios de PUBLICASA.co</p>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Objeto</h2>
        <p>
          Los presentes Términos y Condiciones regulan el acceso y uso de la plataforma PUBLICASA.co, incluyendo
          sus servicios de publicación de inmuebles, herramientas de búsqueda, mensajería entre usuarios, gestión
          de avisos y demás funcionalidades disponibles en el portal y sus aplicaciones asociadas.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">2. Usuarios</h2>
        <p className="mb-4">Para los efectos de estos términos, se entiende por Usuario toda persona natural o jurídica que acceda, navegue o utilice la plataforma PUBLICASA.co. Existen tres tipos de usuarios:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Usuario visitante:</strong> accede al sitio sin registrarse y puede consultar avisos publicados.</li>
          <li><strong>Usuario registrado:</strong> ha creado una cuenta y puede publicar inmuebles, guardar búsquedas, contactar anunciantes y acceder a funcionalidades adicionales.</li>
          <li><strong>Usuario anunciante:</strong> usuario registrado que publica uno o más inmuebles en el portal, ya sea como persona natural o como agencia o inmobiliaria.</li>
        </ul>
        <p className="mt-4">
          El registro en la plataforma es gratuito e implica la aceptación íntegra de estos Términos y de la Política
          de Tratamiento de Datos Personales. Para registrarse se requiere ser mayor de 18 años o contar con representación legal.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">3. Registro y cuenta de usuario</h2>
        <p>
          El usuario se compromete a proporcionar información veraz, exacta y actualizada durante el proceso de registro.
          PUBLICASA.co se reserva el derecho de verificar la información suministrada y de suspender o cancelar cuentas que
          no cumplan con los requisitos establecidos.
        </p>
        <p className="mt-4">
          El usuario es responsable de mantener la confidencialidad de sus credenciales de acceso y de todas las actividades
          realizadas bajo su cuenta. Ante cualquier uso no autorizado deberá notificar inmediatamente a PUBLICASA.co a través
          de los canales de soporte disponibles.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">4. Publicación de inmuebles</h2>

        <h3 className="text-lg font-semibold text-gray-800 mt-4 mb-2">4.1 Condiciones de los avisos</h3>
        <p className="mb-4">
          Los avisos publicados deben corresponder a inmuebles reales y existentes. El anunciante garantiza que tiene
          plena facultad para ofrecer en venta o arrendamiento el inmueble publicado, ya sea como propietario, apoderado
          o intermediario autorizado.
        </p>
        <p className="font-semibold text-gray-900 mb-2">Cada aviso debe contener, como mínimo:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Tipo, área y ubicación aproximada del inmueble.</li>
          <li>Precio de venta o canon de arrendamiento.</li>
          <li>Al menos una fotografía real del inmueble.</li>
          <li>Datos de contacto válidos del anunciante.</li>
        </ul>

        <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">4.2 Contenidos prohibidos</h3>
        <p className="mb-2">Queda prohibida la publicación de avisos que:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Sean falsos, engañosos o induzcan a error sobre las condiciones del inmueble.</li>
          <li>Correspondan a inmuebles inexistentes o proyectos sin licencia de construcción vigente.</li>
          <li>Dupliquen avisos ya publicados para obtener mayor visibilidad.</li>
          <li>Incluyan información de contacto de terceros no autorizados.</li>
          <li>Promuevan negocios distintos a la compra, venta o arrendamiento de inmuebles.</li>
          <li>Vulneren derechos de propiedad intelectual de terceros.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Tarifas y planes de publicación</h2>
        <p>
          PUBLICASA.co ofrece planes de publicación gratuitos y planes de pago con funcionalidades adicionales como
          destacados, avisos premium y herramientas de gestión. Los precios, condiciones y beneficios de cada plan se
          encuentran detallados en la sección de Precios de la plataforma y pueden modificarse con previo aviso.
        </p>
        <p className="mt-4">
          Los pagos realizados por planes o servicios no son reembolsables, salvo en casos de error técnico comprobable
          imputable a PUBLICASA.co.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">6. Conductas prohibidas</h2>
        <p className="mb-2">El usuario se compromete a no:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Utilizar la plataforma para fines distintos a los establecidos en estos términos.</li>
          <li>Intentar acceder de manera no autorizada a sistemas o cuentas ajenas.</li>
          <li>Introducir virus, malware o cualquier código dañino en la plataforma.</li>
          <li>Realizar scraping, extracción masiva de datos o automatización no autorizada.</li>
          <li>Publicar contenido que incite a la discriminación, el odio o la violencia.</li>
          <li>Suplantar la identidad de terceros o de PUBLICASA.co.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">7. Modificación y terminación</h2>
        <p>
          PUBLICASA.co se reserva el derecho de modificar, suspender o cancelar, en cualquier momento y sin previo aviso,
          el acceso al portal o a cualquiera de sus servicios, cuando se detecte incumplimiento de estos términos o cuando
          razones técnicas, legales o de negocio así lo requieran.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">8. Ley aplicable y jurisdicción</h2>
        <p>
          Los presentes Términos y Condiciones se rigen por las leyes de la República de Colombia. Para cualquier controversia
          derivada del uso de la plataforma, las partes se someten a la jurisdicción de los jueces y tribunales competentes de
          la ciudad de Bogotá D.C., con renuncia expresa a cualquier otro fuero que pudiera corresponderles.
        </p>
      </section>

      <div className="bg-brand-blue/10 border-l-4 border-brand-blue p-4 mt-8">
        <p className="text-sm text-gray-900">
          El acceso y uso de este portal implica la aceptación plena de estos Términos y Condiciones.
        </p>
      </div>
    </div>
  );
}
