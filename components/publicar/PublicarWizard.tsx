"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ChipGroup } from "./ChipGroup";
import { ToggleGroup } from "./ToggleGroup";
import { CurrencyInput } from "./CurrencyInput";
import { StepperInput } from "./StepperInput";
import { LocationPicker } from "./LocationPicker";
import { WizardProgress } from "./WizardProgress";
import { PhotoUploader } from "@/components/shared/PhotoUploader";

type Tipo = "CASA" | "APARTAMENTO" | "LOTE" | "LOCAL";
type Operacion = "VENTA" | "ARRIENDO";

const SECTOR_OPCIONES = [
  { key: "transporte_publico", label: "Transporte público" },
  { key: "colegios_cercanos", label: "Colegios" },
  { key: "universidades_cercanas", label: "Universidades" },
  { key: "supermercados_cercanos", label: "Supermercados" },
  { key: "centros_comerciales_cercanos", label: "Centros comerciales" },
  { key: "parques_cercanos", label: "Parques" },
  { key: "hospitales_cercanos", label: "Hospitales" },
  { key: "restaurantes_cercanos", label: "Restaurantes" },
  { key: "vias_principales", label: "Vías principales" },
  { key: "zonas_verdes", label: "Zonas verdes" },
];

const AMENIDADES_OPCIONES = [
  { key: "ascensor", label: "Ascensor" },
  { key: "amoblado", label: "Amoblado" },
  { key: "tieneBalcon", label: "Balcón" },
  { key: "tieneTerraza", label: "Terraza" },
  { key: "tienePatio", label: "Patio" },
  { key: "tieneEstudio", label: "Estudio" },
  { key: "tieneDeposito", label: "Depósito" },
  { key: "tieneZonaLavanderia", label: "Lavandería" },
];

const ADICIONALES_OPCIONES = [
  { key: "piscina", label: "Piscina" },
  { key: "jacuzzi", label: "Jacuzzi" },
  { key: "gimnasio", label: "Gimnasio" },
  { key: "salon_social", label: "Salón social" },
  { key: "vigilancia", label: "Vigilancia" },
  { key: "conjunto_cerrado", label: "Conjunto cerrado" },
  { key: "cancha", label: "Cancha deportiva" },
  { key: "chimenea", label: "Chimenea" },
  { key: "zona_bbq", label: "Zona BBQ" },
  { key: "cocina_integral", label: "Cocina integral" },
];

const STEPS = [
  { id: 1, label: "Información básica" },
  { id: 2, label: "Características" },
  { id: 3, label: "Ubicación" },
  { id: 4, label: "Sector y adicionales" },
  { id: 5, label: "Fotos y publicar" },
];

type PublicarWizardProps = {
  initialTelefono?: string;
  initialWhatsapp?: string;
};

export function PublicarWizard({ initialTelefono = "", initialWhatsapp = "" }: PublicarWizardProps) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Paso 1
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [tipo, setTipo] = useState<Tipo>("APARTAMENTO");
  const [operacion, setOperacion] = useState<Operacion>("VENTA");
  const [precio, setPrecio] = useState("");

  // Paso 2
  const [areaConstruidaM2, setAreaConstruidaM2] = useState("");
  const [areaPrivadaM2, setAreaPrivadaM2] = useState("");
  const [habitaciones, setHabitaciones] = useState("");
  const [banos, setBanos] = useState("");
  const [parqueaderos, setParqueaderos] = useState("");
  const [estrato, setEstrato] = useState("");
  const [antiguedadAnios, setAntiguedadAnios] = useState("");
  const [piso, setPiso] = useState("");
  const [totalPisos, setTotalPisos] = useState("");
  const [administracion, setAdministracion] = useState("");
  const [amenidades, setAmenidades] = useState<Record<string, boolean>>({});

  // Paso 3
  const [ciudad, setCiudad] = useState("");
  const [departamento, setDepartamento] = useState("");
  const [localidad, setLocalidad] = useState("");
  const [barrio, setBarrio] = useState("");
  const [direccion, setDireccion] = useState("");
  const [latitud, setLatitud] = useState("");
  const [longitud, setLongitud] = useState("");

  // Paso 4
  const [sector, setSector] = useState<Record<string, boolean>>({});
  const [descripcionSector, setDescripcionSector] = useState("");
  const [adicionales, setAdicionales] = useState<Record<string, boolean>>({});

  // Paso 5
  const [fotos, setFotos] = useState<string[]>([]);
  const [telefono, setTelefono] = useState(initialTelefono);
  const [whatsapp, setWhatsapp] = useState(initialWhatsapp);

  const esLote = tipo === "LOTE";

  const validateStep = () => {
    setError(null);
    switch (currentStep) {
      case 1:
        if (!titulo || !descripcion || !precio) {
          setError("Completa título, descripción y precio");
          return false;
        }
        return true;
      case 2:
        return true;
      case 3:
        if (!ciudad || !barrio || !direccion || !latitud || !longitud) {
          setError("Completa ciudad, barrio, dirección y ubicación");
          return false;
        }
        return true;
      case 4:
        return true;
      case 5:
        if (!telefono.trim() && !whatsapp.trim()) {
          setError("Agrega un teléfono o WhatsApp de contacto para que los interesados puedan escribirte.");
          return false;
        }
        return true;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (validateStep()) {
      setCurrentStep((s) => Math.min(s + 1, STEPS.length));
    }
  };

  const handlePrev = () => {
    setCurrentStep((s) => Math.max(s - 1, 1));
  };

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validateStep()) return;

    setLoading(true);
    setError(null);

    const sectorEntries = Object.entries(sector).filter(([, v]) => v);
    const caracteristicasSector =
      sectorEntries.length > 0 || descripcionSector
        ? {
            ...Object.fromEntries(sectorEntries),
            ...(descripcionSector ? { descripcion_sector: descripcionSector } : {}),
          }
        : undefined;

    const adicionalesEntries = Object.entries(adicionales).filter(([, v]) => v);
    const caracteristicasAdicionales =
      adicionalesEntries.length > 0 ? Object.fromEntries(adicionalesEntries) : undefined;

    const amenidadesAMap = AMENIDADES_OPCIONES.reduce(
      (acc, opt) => {
        acc[opt.key as keyof typeof acc] = amenidades[opt.key] || false;
        return acc;
      },
      {
        ascensor: false,
        amoblado: false,
        tieneBalcon: false,
        tieneTerraza: false,
        tienePatio: false,
        tieneEstudio: false,
        tieneDeposito: false,
        tieneZonaLavanderia: false,
      }
    );

    const res = await fetch("/api/propiedades", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        titulo,
        descripcion,
        tipo,
        operacion,
        precio: Number(precio),
        areaConstruidaM2: areaConstruidaM2 ? Number(areaConstruidaM2) : null,
        areaPrivadaM2: areaPrivadaM2 ? Number(areaPrivadaM2) : null,
        habitaciones: !esLote && habitaciones ? Number(habitaciones) : null,
        banos: !esLote && banos ? Number(banos) : null,
        parqueaderos: !esLote && parqueaderos ? Number(parqueaderos) : null,
        estrato: estrato ? Number(estrato) : null,
        antiguedadAnios: antiguedadAnios ? Number(antiguedadAnios) : null,
        piso: !esLote && piso ? Number(piso) : null,
        totalPisos: !esLote && totalPisos ? Number(totalPisos) : null,
        administracion: administracion ? Number(administracion) : null,
        ...amenidadesAMap,
        ciudad,
        departamento: departamento || null,
        localidad: localidad || null,
        barrio,
        direccion,
        latitud: Number(latitud),
        longitud: Number(longitud),
        caracteristicasSector,
        caracteristicasAdicionales,
        fotos,
        telefono: telefono.trim() || null,
        whatsapp: whatsapp.trim() || null,
      }),
    });

    setLoading(false);

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "No se pudo publicar");
      return;
    }

    const data = await res.json();
    router.push(`/propiedades/${data.id}`);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        <WizardProgress steps={STEPS} currentStep={currentStep} />

        {error && (
          <div className="mb-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700 border border-red-200">
            {error}
          </div>
        )}

        {/* Paso 1 */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Información básica</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Título *
                  </label>
                  <input
                    type="text"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-brand-blue focus:ring-1 focus:ring-brand-blue"
                    placeholder="Ej: Apartamento moderno en Chapinero"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Descripción *
                  </label>
                  <textarea
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    rows={4}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-brand-blue focus:ring-1 focus:ring-brand-blue"
                    placeholder="Describe el inmueble en detalle"
                    required
                  />
                </div>

                <div>
                  <ToggleGroup
                    label="Tipo de inmueble"
                    options={[
                      { value: "CASA", label: "Casa" },
                      { value: "APARTAMENTO", label: "Apartamento" },
                      { value: "LOTE", label: "Lote" },
                      { value: "LOCAL", label: "Local" },
                    ]}
                    value={tipo}
                    onChange={(v) => setTipo(v as Tipo)}
                  />
                </div>

                <div>
                  <ToggleGroup
                    label="¿Qué tipo de operación?"
                    options={[
                      { value: "VENTA", label: "Venta" },
                      { value: "ARRIENDO", label: "Arriendo" },
                    ]}
                    value={operacion}
                    onChange={(v) => setOperacion(v as Operacion)}
                  />
                </div>

                <CurrencyInput
                  label="Precio (COP) *"
                  value={precio}
                  onChange={setPrecio}
                  required
                />
              </div>
            </div>
          </div>
        )}

        {/* Paso 2 */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Características</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Dimensiones</h3>
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                    <StepperInput
                      label="Área construida (m²)"
                      value={areaConstruidaM2}
                      onChange={setAreaConstruidaM2}
                    />
                    <StepperInput
                      label="Área privada (m²)"
                      value={areaPrivadaM2}
                      onChange={setAreaPrivadaM2}
                    />
                    <StepperInput
                      label="Estrato"
                      value={estrato}
                      onChange={setEstrato}
                      min={1}
                      max={6}
                    />
                  </div>
                </div>

                {!esLote && (
                  <>
                    <div>
                      <h3 className="text-sm font-medium text-gray-700 mb-3">Distribución</h3>
                      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                        <StepperInput
                          label="Habitaciones"
                          value={habitaciones}
                          onChange={setHabitaciones}
                        />
                        <StepperInput
                          label="Baños"
                          value={banos}
                          onChange={setBanos}
                        />
                        <StepperInput
                          label="Parqueaderos"
                          value={parqueaderos}
                          onChange={setParqueaderos}
                        />
                        <StepperInput
                          label="Piso"
                          value={piso}
                          onChange={setPiso}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                        <StepperInput
                          label="Total de pisos"
                          value={totalPisos}
                          onChange={setTotalPisos}
                        />
                        <StepperInput
                          label="Antigüedad (años)"
                          value={antiguedadAnios}
                          onChange={setAntiguedadAnios}
                        />
                        <CurrencyInput
                          label="Administración (mes)"
                          value={administracion}
                          onChange={setAdministracion}
                        />
                      </div>
                    </div>
                  </>
                )}

                {!esLote && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-3">Amenidades</h3>
                    <ChipGroup
                      items={AMENIDADES_OPCIONES}
                      selected={amenidades}
                      onChange={(key) =>
                        setAmenidades((a) => ({ ...a, [key]: !a[key] }))
                      }
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Paso 3 */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Ubicación</h2>
              <LocationPicker
                latitud={latitud}
                longitud={longitud}
                ciudad={ciudad}
                barrio={barrio}
                direccion={direccion}
                onLocationChange={(lat, lng) => {
                  setLatitud(String(lat));
                  setLongitud(String(lng));
                }}
                onUbicacionChange={(c, b, d) => {
                  setCiudad(c);
                  setBarrio(b);
                  setDireccion(d);
                }}
              />
              <div className="mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Departamento
                  </label>
                  <input
                    type="text"
                    value={departamento}
                    onChange={(e) => setDepartamento(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm"
                    placeholder="Cundinamarca"
                  />
                </div>
                <div className="mt-3">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Localidad
                  </label>
                  <input
                    type="text"
                    value={localidad}
                    onChange={(e) => setLocalidad(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm"
                    placeholder="Usaquén"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Paso 4 */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Sector y adicionales</h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Descripción del sector
                  </label>
                  <textarea
                    value={descripcionSector}
                    onChange={(e) => setDescripcionSector(e.target.value)}
                    rows={3}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm"
                    placeholder="Describe el sector, vías principales, servicios cercanos..."
                  />
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Características del sector</h3>
                  <ChipGroup
                    items={SECTOR_OPCIONES}
                    selected={sector}
                    onChange={(key) =>
                      setSector((s) => ({ ...s, [key]: !s[key] }))
                    }
                  />
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Otras características</h3>
                  <ChipGroup
                    items={ADICIONALES_OPCIONES}
                    selected={adicionales}
                    onChange={(key) =>
                      setAdicionales((a) => ({ ...a, [key]: !a[key] }))
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Paso 5 */}
        {currentStep === 5 && (
          <div className="space-y-6">
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Fotos</h2>

              <PhotoUploader photos={fotos} onChange={setFotos} />
            </div>

            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Datos de contacto</h2>
              <p className="text-sm text-gray-500 mb-6">
                Así te van a contactar los interesados en este inmueble. Necesitas al menos un teléfono o WhatsApp.
              </p>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Teléfono</label>
                  <input
                    type="tel"
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-brand-blue focus:ring-1 focus:ring-brand-blue"
                    placeholder="3001234567"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">WhatsApp</label>
                  <input
                    type="tel"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-brand-blue focus:ring-1 focus:ring-brand-blue"
                    placeholder="3001234567"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Botones de navegación */}
        <div className="mt-8 flex justify-between gap-3">
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentStep === 1}
            className="rounded-lg border border-gray-300 px-6 py-2 font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Atrás
          </button>

          {currentStep < STEPS.length ? (
            <button
              type="button"
              onClick={handleNext}
              className="rounded-lg bg-brand-blue px-6 py-2 font-medium text-white hover:bg-blue-700"
            >
              Siguiente
            </button>
          ) : (
            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-brand-blue px-6 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? "Publicando..." : "Publicar inmueble"}
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
