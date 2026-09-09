import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getPropertyById } from "@/lib/db/properties";
import { formatCOP, OPERACION_LABEL, TIPO_LABEL } from "@/lib/format";
import { ContactForm } from "@/components/ContactForm";

export const revalidate = 60;

type Props = { params: { id: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const property = await getPropertyById(params.id);
  if (!property) return {};

  return {
    title: `${property.titulo} | PUBLICASA.co`,
    description: property.descripcion.slice(0, 155),
    // Un inmueble sin aprobar sigue siendo visible por enlace directo (el
    // propietario cae aquí tras publicar), pero no debe entrar a Google.
    ...(property.estado !== "ACTIVO" && { robots: { index: false, follow: false } }),
  };
}

export default async function PropertyDetailPage({ params }: Props) {
  const property = await getPropertyById(params.id);
  if (!property) notFound();

  const portada = property.fotos.find((f) => f.esPortada) ?? property.fotos[0];
  const restoFotos = property.fotos.filter((f) => f.id !== portada?.id);

  const caracteristicas = [
    property.habitaciones != null && `${property.habitaciones} habitaciones`,
    property.banos != null && `${property.banos} baños`,
    property.parqueaderos != null && `${property.parqueaderos} parqueaderos`,
    property.areaConstruidaM2 != null && `${property.areaConstruidaM2} m² construidos`,
    property.areaPrivadaM2 != null && `${property.areaPrivadaM2} m² privados`,
    property.estrato != null && `Estrato ${property.estrato}`,
    property.antiguedadAnios != null && `${property.antiguedadAnios} años de antigüedad`,
    property.piso != null && `Piso ${property.piso}${property.totalPisos ? ` de ${property.totalPisos}` : ""}`,
  ].filter((v): v is string => Boolean(v));

  const amenidades = [
    property.ascensor && "Ascensor",
    property.amoblado && "Amoblado",
    property.tieneBalcon && "Balcón",
    property.tieneTerraza && "Terraza",
    property.tienePatio && "Patio",
    property.tieneEstudio && "Estudio",
    property.tieneDeposito && "Depósito",
    property.tieneZonaLavanderia && "Zona de lavandería",
  ].filter((v): v is string => Boolean(v));

  const sector = (property.caracteristicasSector ?? {}) as Record<string, unknown>;
  const adicionales = (property.caracteristicasAdicionales ?? {}) as Record<string, unknown>;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: property.titulo,
    description: property.descripcion,
    datePosted: property.createdAt.toISOString(),
    address: {
      "@type": "PostalAddress",
      streetAddress: property.direccion,
      addressLocality: property.barrio,
      addressRegion: property.departamento ?? property.ciudad,
      addressCountry: "CO",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: property.latitud,
      longitude: property.longitud,
    },
    offers: {
      "@type": "Offer",
      price: property.precio.toNumber(),
      priceCurrency: "COP",
    },
  };

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {property.estado === "PENDIENTE_REVISION" && (
        <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 p-4">
          <p className="font-medium text-amber-900">En revisión</p>
          <p className="mt-1 text-sm text-amber-800">
            Un administrador revisará esta publicación antes de que aparezca en las búsquedas.
            Mientras tanto solo es visible con este enlace.
          </p>
        </div>
      )}

      {property.estado === "RECHAZADO" && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4">
          <p className="font-medium text-red-900">Publicación rechazada</p>
          {property.motivoRechazo && (
            <p className="mt-1 text-sm text-red-800">{property.motivoRechazo}</p>
          )}
        </div>
      )}

      <div className="mb-6">
        <span className="inline-block rounded-full bg-gray-900 px-3 py-1 text-xs font-medium text-white">
          {OPERACION_LABEL[property.operacion]} · {TIPO_LABEL[property.tipo]}
        </span>
        <h1 className="mt-3 text-2xl font-bold text-gray-900 sm:text-3xl">{property.titulo}</h1>
        <p className="mt-1 text-gray-500">
          {property.direccion} · {property.barrio}, {property.ciudad}
        </p>
      </div>

      {portada && (
        <div className="mb-6 grid grid-cols-4 gap-2">
          <div className="relative col-span-4 h-80 w-full overflow-hidden rounded-xl sm:col-span-3">
            <Image
              src={portada.url}
              alt={property.titulo}
              fill
              sizes="(min-width: 640px) 75vw, 100vw"
              className="object-cover"
              priority
            />
          </div>
          <div className="col-span-4 grid grid-cols-4 gap-2 sm:col-span-1 sm:grid-cols-1">
            {restoFotos.slice(0, 3).map((foto) => (
              <div key={foto.id} className="relative h-20 w-full overflow-hidden rounded-lg sm:h-24">
                <Image src={foto.url} alt="" fill sizes="200px" className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <p className="text-3xl font-bold text-gray-900">{formatCOP(property.precio.toNumber())}</p>
          {property.administracion != null && (
            <p className="text-sm text-gray-500">
              + {formatCOP(property.administracion.toNumber())} administración
            </p>
          )}

          <h2 className="mt-8 text-lg font-semibold text-gray-900">Características</h2>
          <ul className="mt-3 grid grid-cols-2 gap-2 text-sm text-gray-700 sm:grid-cols-3">
            {caracteristicas.map((c) => (
              <li key={c} className="rounded-lg bg-gray-50 px-3 py-2">
                {c}
              </li>
            ))}
          </ul>

          {amenidades.length > 0 && (
            <>
              <h2 className="mt-8 text-lg font-semibold text-gray-900">Comodidades</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {amenidades.map((a) => (
                  <span key={a} className="rounded-full border border-gray-200 px-3 py-1 text-sm text-gray-700">
                    {a}
                  </span>
                ))}
              </div>
            </>
          )}

          {Object.entries(adicionales).filter(([, v]) => v === true).length > 0 && (
            <>
              <h2 className="mt-8 text-lg font-semibold text-gray-900">Otras características</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {Object.entries(adicionales)
                  .filter(([, v]) => v === true)
                  .map(([k]) => (
                    <span key={k} className="rounded-full border border-gray-200 px-3 py-1 text-sm text-gray-700">
                      {k.replace(/_/g, " ")}
                    </span>
                  ))}
              </div>
            </>
          )}

          <h2 className="mt-8 text-lg font-semibold text-gray-900">Descripción</h2>
          <p className="mt-3 whitespace-pre-line text-gray-700">{property.descripcion}</p>

          {Object.keys(sector).length > 0 && (
            <>
              <h2 className="mt-8 text-lg font-semibold text-gray-900">El sector</h2>
              {typeof sector.descripcion_sector === "string" && (
                <p className="mt-2 text-gray-700">{sector.descripcion_sector}</p>
              )}
              <div className="mt-3 flex flex-wrap gap-2">
                {Object.entries(sector)
                  .filter(([k, v]) => k !== "descripcion_sector" && v === true)
                  .map(([k]) => (
                    <span key={k} className="rounded-full bg-blue-50 px-3 py-1 text-sm text-blue-700">
                      {k.replace(/_/g, " ")}
                    </span>
                  ))}
              </div>
            </>
          )}

          <a
            href={`https://www.google.com/maps?q=${property.latitud},${property.longitud}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-block text-sm font-medium text-blue-600 hover:underline"
          >
            Ver ubicación en Google Maps →
          </a>
        </div>

        <aside className="h-fit rounded-xl border border-gray-200 p-5">
          <h2 className="text-lg font-semibold text-gray-900">Contactar al propietario</h2>
          <p className="mt-1 text-sm text-gray-500">{property.propietario.nombre}</p>
          <div className="mt-4 flex flex-col gap-2">
            {property.propietario.whatsapp && (
              <a
                href={`https://wa.me/57${property.propietario.whatsapp.replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-green-600 px-4 py-2 text-center text-sm font-medium text-white hover:bg-green-700"
              >
                WhatsApp
              </a>
            )}
            {property.propietario.telefono && (
              <a
                href={`tel:${property.propietario.telefono}`}
                className="rounded-lg border border-gray-300 px-4 py-2 text-center text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Llamar
              </a>
            )}
          </div>

          {property.estado === "ACTIVO" && (
            <div className="mt-5 border-t border-gray-100 pt-5">
              <p className="mb-3 text-sm text-gray-500">O envíale un mensaje:</p>
              <ContactForm propertyId={property.id} tituloInmueble={property.titulo} />
            </div>
          )}
        </aside>
      </div>
    </main>
  );
}
