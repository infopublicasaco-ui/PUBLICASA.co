export const metadata = {
  title: "Recomendaciones | PUBLICASA.co",
  description: "Recomendaciones para compra, venta y arriendo de inmuebles en Colombia",
};

export default function RecomendacionesPage() {
  return (
    <div className="prose prose-sm max-w-none">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Recomendaciones para Compra, Venta y Arriendo de Inmuebles</h1>
      <p className="text-gray-600 mb-8">Orientaciones generales para que su negociación inmobiliaria sea segura, informada y exitosa en Colombia</p>

      <div className="bg-yellow-50 border border-yellow-200 p-4 rounded mb-8">
        <p className="text-sm text-gray-900">
          <strong>⚠️ Aviso importante:</strong> PUBLICASA.co actúa como plataforma de intermediación. Las siguientes
          recomendaciones tienen carácter informativo y no reemplazan la asesoría legal, financiera o inmobiliaria
          profesional, la cual es indispensable en toda transacción inmobiliaria.
        </p>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">🔍 Para compradores</h2>

        <h3 className="text-lg font-semibold text-gray-800 mb-3">Verifique el estado jurídico del inmueble</h3>
        <p>
          Solicite un estudio de títulos que cubra al menos los últimos 20 años y revise la tradición del bien. Verifique
          en la Oficina de Registro de Instrumentos Públicos que el inmueble no tenga embargos, hipotecas, condiciones
          resolutorias o litigios pendientes.
        </p>

        <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Exija la documentación completa</h3>
        <p>
          Solicite escritura pública de dominio, certificado de tradición y libertad actualizado, paz y salvo de impuesto
          predial, paz y salvo de administración (si aplica), planos aprobados y licencia de construcción.
        </p>

        <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Inspeccione el inmueble en persona</h3>
        <p>
          No tome decisiones únicamente con base en fotos o visitas virtuales. Visite el inmueble con un profesional que
          pueda evaluar el estado de la construcción, instalaciones hidráulicas, eléctricas y acabados.
        </p>

        <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Planifique los costos totales</h3>
        <p className="mb-2">
          Incluya en su presupuesto gastos de escrituración, registro, notaría, impuesto de timbre (si aplica), honorarios
          de abogado, avalúo comercial, estudio de crédito y cuota inicial. Estos pueden representar entre el 3% y el 5%
          del valor del inmueble.
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            Consulte el avalúo catastral del inmueble en el IGAC o la Lonja de Propiedad Raíz para tener un punto de
            referencia del valor de mercado.
          </li>
          <li>Si va a adquirir con crédito hipotecario, obtenga preaprobación del banco antes de hacer ofertas formales.</li>
          <li>
            Firme promesa de compraventa solo con asesoría legal y asegúrese de que incluya cláusulas de arras y
            condiciones resolutorias claras.
          </li>
          <li>Desconfíe de precios muy por debajo del mercado o de vendedores que presionen para cerrar el negocio con urgencia inusual.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">📊 Para vendedores</h2>

        <h3 className="text-lg font-semibold text-gray-800 mb-3">Establezca un precio de mercado</h3>
        <p>
          Consulte los precios de inmuebles similares en la misma zona y contrate un avalúo comercial con un perito
          certificado. Un precio ajustado al mercado reduce el tiempo de venta y evita negociaciones desfavorables.
        </p>

        <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Presente su inmueble con calidad</h3>
        <p className="mb-2">
          Las fotografías de calidad profesional y una descripción detallada y veraz aumentan significativamente las
          probabilidades de contacto. Incluya área total, área construida, número de habitaciones, baños, parqueaderos y
          características especiales.
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Tenga toda la documentación del inmueble en orden antes de publicar: certificado de tradición, paz y salvos y planos actualizados.</li>
          <li>Si el inmueble está en copropiedad horizontal, verifique el reglamento y las restricciones que apliquen a la venta.</li>
          <li>Para el pago del impuesto de ganancia ocasional, consulte con un contador o asesor tributario el costo fiscal del inmueble.</li>
          <li>En la promesa de compraventa, defina claramente los bienes que se incluyen en la venta (enchapes, muebles empotrados, electrodomésticos, etc.).</li>
          <li>Exija que el pago se realice mediante instrumentos seguros: cheque de gerencia, transferencia bancaria o fiducia.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">📝 Para arrendadores y arrendatarios</h2>

        <h3 className="text-lg font-semibold text-gray-800 mb-3">Formalice el contrato por escrito</h3>
        <p>
          El contrato de arrendamiento debe constar por escrito aunque la ley colombiana no lo exija en todos los casos.
          Debe incluir: canon mensual, depósito, término del contrato, obligaciones de cada parte y condición del inmueble
          al momento de entrega.
        </p>

        <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Verifique referencias e identidad</h3>
        <p>
          Como arrendador, verifique la identidad del arrendatario, su historial crediticio en centrales de riesgo
          (DataCrédito / TransUnion) y solicite referencias laborales y personales comprobables.
        </p>

        <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Realice un inventario detallado</h3>
        <p>
          Al momento de la entrega, elabore un inventario fotográfico y escrito del estado de cada espacio, instalación y
          elemento del inmueble. Este documento firmado por ambas partes es clave para evitar disputas al finalizar el
          contrato.
        </p>

        <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Conozca sus derechos y deberes</h3>
        <p className="mb-2">
          La Ley 820 de 2003 regula el arrendamiento de vivienda urbana en Colombia. El arrendador debe entregar el
          inmueble en condiciones habitables; el arrendatario debe pagar el canon oportunamente y conservar el inmueble en
          buen estado.
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>El canon de arrendamiento de vivienda urbana no puede exceder el 1% del valor comercial del inmueble, según la Ley 820 de 2003.</li>
          <li>
            Los incrementos anuales del arriendo están limitados al IPC (Índice de Precios al Consumidor) del año anterior,
            certificado por el DANE.
          </li>
          <li>El depósito o garantía no puede exceder el valor de dos (2) cánones de arrendamiento.</li>
          <li>Para inmuebles comerciales, las condiciones son negociables y están reguladas por el Código de Comercio.</li>
          <li>
            Ante incumplimientos, acuda a los mecanismos de conciliación disponibles en los Centros de Conciliación del
            Ministerio de Justicia o inicie el proceso judicial correspondiente.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">🛡️ Recomendaciones de seguridad general</h2>
        <ul className="list-disc pl-6 space-y-3">
          <li>
            <strong>Nunca realice pagos anticipados</strong> (arras, reservas, cánones) antes de verificar la identidad del
            propietario o intermediario y el estado jurídico del inmueble.
          </li>
          <li>
            <strong>Desconfíe de negocios</strong> que se gestionen exclusivamente por medios digitales sin posibilidad de
            visita presencial.
          </li>
          <li>
            <strong>Ante sospechas de fraude inmobiliario,</strong> repórtelo a la Superintendencia de Notariado y Registro
            o a las autoridades competentes.
          </li>
          <li>
            <strong>Utilice los canales seguros</strong> de mensajería de PUBLICASA.co para las comunicaciones iniciales;
            tenga precaución al compartir información personal con anunciantes no verificados.
          </li>
          <li>
            <strong>Si contrata los servicios</strong> de una inmobiliaria o agente, verifique que esté inscrito ante la
            Lonja de Propiedad Raíz de su ciudad y cuente con las autorizaciones pertinentes.
          </li>
        </ul>
      </section>

      <div className="bg-brand-blue/10 border-l-4 border-brand-blue p-4 mt-8">
        <p className="text-gray-900">
          <strong>Recomendación final:</strong> PUBLICASA.co recomienda siempre contar con la asesoría de profesionales
          calificados en derecho, finanzas e ingeniería antes de formalizar cualquier negociación inmobiliaria. Una
          transacción bien asesorada protege su patrimonio y garantiza la seguridad jurídica de la operación.
        </p>
      </div>
    </div>
  );
}
