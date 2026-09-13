export const metadata = {
  title: "Recomendaciones | PUBLICASA.co",
  description: "Recomendaciones para compra, venta y arriendo de inmuebles",
};

export default function RecomendacionesPage() {
  return (
    <div className="prose prose-sm max-w-none">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Recomendaciones para Compra, Venta y Arriendo</h1>
      <p className="text-gray-600 mb-8">Orientaciones para negociaciones inmobiliarias seguras en Colombia</p>

      <div className="bg-yellow-50 border border-yellow-200 p-4 rounded mb-8">
        <p className="text-sm text-gray-900"><strong>⚠️ Aviso:</strong> PUBLICASA.co es intermediaria. Estas recomendaciones son informativas y no reemplazan asesoría profesional legal, financiera e inmobiliaria.</p>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Para Compradores</h2>
        <ul className="space-y-3">
          <li><strong>Verifique estado jurídico:</strong> Solicite estudio de títulos y revise Registro de Instrumentos Públicos</li>
          <li><strong>Exija documentación:</strong> Escritura pública, certificado de tradición, paz y salvos, planos, licencia</li>
          <li><strong>Inspeccione en persona:</strong> No confíe solo en fotos virtuales</li>
          <li><strong>Planifique costos totales:</strong> Incluya escrituración, registro, notaría, timbre (3-5% del valor)</li>
          <li><strong>Consulte avalúo:</strong> Verifique en IGAC o Lonja de Propiedad Raíz</li>
          <li><strong>Obtenga preaprobación bancaria</strong> antes de hacer ofertas</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Para Vendedores</h2>
        <ul className="space-y-3">
          <li><strong>Precio de mercado:</strong> Contrate avalúo comercial con perito certificado</li>
          <li><strong>Fotos de calidad:</strong> Fotografías profesionales aumentan contactos</li>
          <li><strong>Documentación lista:</strong> Tenga todo en orden antes de publicar</li>
          <li><strong>Define bien los términos:</strong> Qué bienes se incluyen en la venta</li>
          <li><strong>Pagos seguros:</strong> Cheque gerencia, transferencia o fiducia</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Para Arrendadores y Arrendatarios</h2>
        <ul className="space-y-3">
          <li><strong>Contrato escrito:</strong> Incluir canon, depósito, término, obligaciones</li>
          <li><strong>Verifique referencias:</strong> Identidad, crédito, historial laboral</li>
          <li><strong>Inventario detallado:</strong> Fotográfico y escrito del estado inicial</li>
          <li><strong>Conozca la Ley 820 de 2003:</strong> Regula arrendamiento de vivienda urbana</li>
          <li><strong>Canon máximo:</strong> 1% del valor comercial mensual</li>
          <li><strong>Incrementos:</strong> Máximo IPC del año anterior (DANE)</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Seguridad General</h2>
        <ul className="space-y-2 text-sm">
          <li>✓ Nunca realice pagos anticipados sin verificar identidad y estado del inmueble</li>
          <li>✓ Desconfíe de negocios solo digitales sin posibilidad de visita</li>
          <li>✓ Reporte fraudes a Superintendencia de Notariado y Registro</li>
          <li>✓ Use canales seguros de PUBLICASA.co para comunicación inicial</li>
          <li>✓ Verifique que agentes estén inscritos en Lonja de Propiedad Raíz</li>
        </ul>
      </section>

      <div className="bg-brand-blue/10 border-l-4 border-brand-blue p-4 mt-8">
        <p className="text-sm text-gray-900"><strong>Recomendación:</strong> Siempre contrate asesoría profesional en derecho, finanzas e ingeniería para proteger su patrimonio.</p>
      </div>
    </div>
  );
}
