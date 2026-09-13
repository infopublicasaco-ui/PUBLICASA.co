export const metadata = {
  title: "Términos y Condiciones | PUBLICASA.co",
  description: "Términos y condiciones de uso",
};

export default function TerminosPage() {
  return (
    <div className="prose prose-sm max-w-none">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Términos y Condiciones</h1>
      <p className="text-gray-600 mb-8">Condiciones que regulan el acceso y uso de PUBLICASA.co</p>
      
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Objeto</h2>
        <p>Los presentes Términos regulan el acceso y uso de la plataforma PUBLICASA.co, incluyendo servicios de publicación, búsqueda y gestión de inmuebles.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">2. Responsabilidades del usuario</h2>
        <p>El usuario es responsable de la información que proporciona y del contenido que publica en la plataforma.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">3. Limitaciones de responsabilidad</h2>
        <p>PUBLICASA.co actúa como plataforma de intermediación y no es responsable por transacciones entre usuarios.</p>
      </section>

      <div className="bg-brand-blue/10 border-l-4 border-brand-blue p-4 mt-8">
        <p className="text-sm text-gray-900">El acceso implica aceptación integral de estos términos.</p>
      </div>
    </div>
  );
}
