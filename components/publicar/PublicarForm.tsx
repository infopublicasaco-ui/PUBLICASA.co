"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

type Tipo = "CASA" | "APARTAMENTO" | "LOTE" | "LOCAL";
type Operacion = "VENTA" | "ARRIENDO";

const inputClass = "mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm";
const labelClass = "text-sm font-medium text-gray-700";

const SECTOR_OPCIONES = [
  { key: "transporte_publico", label: "Transporte público cercano" },
  { key: "colegios_cercanos", label: "Colegios cercanos" },
  { key: "universidades_cercanas", label: "Universidades cercanas" },
  { key: "supermercados_cercanos", label: "Supermercados cercanos" },
  { key: "centros_comerciales_cercanos", label: "Centros comerciales cercanos" },
  { key: "parques_cercanos", label: "Parques cercanos" },
  { key: "hospitales_cercanos", label: "Hospitales cercanos" },
  { key: "restaurantes_cercanos", label: "Restaurantes cercanos" },
  { key: "vias_principales", label: "Cerca a vías principales" },
  { key: "zonas_verdes", label: "Zonas verdes" },
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

function CheckboxGrid({
  opciones,
  values,
  onToggle,
}: {
  opciones: { key: string; label: string }[];
  values: Record<string, boolean>;
  onToggle: (key: string) => void;
}) {
  return (
    <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
      {opciones.map((o) => (
        <label key={o.key} className="flex items-center gap-2 text-sm text-gray-700">
          <input type="checkbox" checked={Boolean(values[o.key])} onChange={() => onToggle(o.key)} />
          {o.label}
        </label>
      ))}
    </div>
  );
}

export function PublicarForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [tipo, setTipo] = useState<Tipo>("APARTAMENTO");
  const [operacion, setOperacion] = useState<Operacion>("VENTA");
  const [precio, setPrecio] = useState("");

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

  const [ascensor, setAscensor] = useState(false);
  const [amoblado, setAmoblado] = useState(false);
  const [tieneBalcon, setTieneBalcon] = useState(false);
  const [tieneTerraza, setTieneTerraza] = useState(false);
  const [tienePatio, setTienePatio] = useState(false);
  const [tieneEstudio, setTieneEstudio] = useState(false);
  const [tieneDeposito, setTieneDeposito] = useState(false);
  const [tieneZonaLavanderia, setTieneZonaLavanderia] = useState(false);

  const [ciudad, setCiudad] = useState("");
  const [departamento, setDepartamento] = useState("");
  const [localidad, setLocalidad] = useState("");
  const [barrio, setBarrio] = useState("");
  const [direccion, setDireccion] = useState("");
  const [latitud, setLatitud] = useState("");
  const [longitud, setLongitud] = useState("");

  const [sector, setSector] = useState<Record<string, boolean>>({});
  const [descripcionSector, setDescripcionSector] = useState("");
  const [adicionales, setAdicionales] = useState<Record<string, boolean>>({});

  const [fotosTexto, setFotosTexto] = useState("");

  const esLote = tipo === "LOTE";

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (!titulo || !descripcion || !precio || !ciudad || !barrio || !direccion || !latitud || !longitud) {
      setError(
        "Completa los campos obligatorios: título, descripción, precio, ciudad, barrio, dirección y ubicación."
      );
      return;
    }

    setLoading(true);

    const fotos = fotosTexto
      .split("\n")
      .map((u) => u.trim())
      .filter(Boolean);

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
        ascensor: !esLote && ascensor,
        amoblado,
        tieneBalcon,
        tieneTerraza,
        tienePatio,
        tieneEstudio,
        tieneDeposito,
        tieneZonaLavanderia,
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
      }),
    });

    setLoading(false);

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "No se pudo publicar el inmueble.");
      return;
    }

    const data = await res.json();
    router.push(`/propiedades/${data.id}`);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

      <fieldset className="flex flex-col gap-4">
        <legend className="text-lg font-semibold text-gray-900">Información básica</legend>

        <div>
          <label className={labelClass}>Título *</label>
          <input
            type="text"
            required
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className={inputClass}
            placeholder="Ej: Apartamento moderno en Chapinero con vista a la ciudad"
          />
        </div>

        <div>
          <label className={labelClass}>Descripción *</label>
          <textarea
            required
            rows={4}
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className={inputClass}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Tipo de inmueble</label>
            <select value={tipo} onChange={(e) => setTipo(e.target.value as Tipo)} className={inputClass}>
              <option value="CASA">Casa</option>
              <option value="APARTAMENTO">Apartamento</option>
              <option value="LOTE">Lote</option>
              <option value="LOCAL">Local</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Operación</label>
            <select
              value={operacion}
              onChange={(e) => setOperacion(e.target.value as Operacion)}
              className={inputClass}
            >
              <option value="VENTA">Venta</option>
              <option value="ARRIENDO">Arriendo</option>
            </select>
          </div>
        </div>

        <div>
          <label className={labelClass}>Precio (COP) *</label>
          <input
            type="number"
            required
            min={0}
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            className={inputClass}
          />
        </div>
      </fieldset>

      <fieldset className="flex flex-col gap-4">
        <legend className="text-lg font-semibold text-gray-900">Características físicas</legend>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          <div>
            <label className={labelClass}>Área construida (m²)</label>
            <input
              type="number"
              min={0}
              value={areaConstruidaM2}
              onChange={(e) => setAreaConstruidaM2(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Área privada (m²)</label>
            <input
              type="number"
              min={0}
              value={areaPrivadaM2}
              onChange={(e) => setAreaPrivadaM2(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Estrato</label>
            <input
              type="number"
              min={1}
              max={6}
              value={estrato}
              onChange={(e) => setEstrato(e.target.value)}
              className={inputClass}
            />
          </div>

          {!esLote && (
            <>
              <div>
                <label className={labelClass}>Habitaciones</label>
                <input
                  type="number"
                  min={0}
                  value={habitaciones}
                  onChange={(e) => setHabitaciones(e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Baños</label>
                <input
                  type="number"
                  min={0}
                  value={banos}
                  onChange={(e) => setBanos(e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Parqueaderos</label>
                <input
                  type="number"
                  min={0}
                  value={parqueaderos}
                  onChange={(e) => setParqueaderos(e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Piso</label>
                <input
                  type="number"
                  min={0}
                  value={piso}
                  onChange={(e) => setPiso(e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Total de pisos del edificio</label>
                <input
                  type="number"
                  min={0}
                  value={totalPisos}
                  onChange={(e) => setTotalPisos(e.target.value)}
                  className={inputClass}
                />
              </div>
            </>
          )}

          <div>
            <label className={labelClass}>Antigüedad (años)</label>
            <input
              type="number"
              min={0}
              value={antiguedadAnios}
              onChange={(e) => setAntiguedadAnios(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Administración (COP/mes)</label>
            <input
              type="number"
              min={0}
              value={administracion}
              onChange={(e) => setAdministracion(e.target.value)}
              className={inputClass}
            />
          </div>
        </div>

        {!esLote && (
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input type="checkbox" checked={ascensor} onChange={(e) => setAscensor(e.target.checked)} />
              Ascensor
            </label>
            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input type="checkbox" checked={amoblado} onChange={(e) => setAmoblado(e.target.checked)} />
              Amoblado
            </label>
            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input type="checkbox" checked={tieneBalcon} onChange={(e) => setTieneBalcon(e.target.checked)} />
              Balcón
            </label>
            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input type="checkbox" checked={tieneTerraza} onChange={(e) => setTieneTerraza(e.target.checked)} />
              Terraza
            </label>
            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input type="checkbox" checked={tienePatio} onChange={(e) => setTienePatio(e.target.checked)} />
              Patio
            </label>
            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input type="checkbox" checked={tieneEstudio} onChange={(e) => setTieneEstudio(e.target.checked)} />
              Estudio
            </label>
            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input type="checkbox" checked={tieneDeposito} onChange={(e) => setTieneDeposito(e.target.checked)} />
              Depósito
            </label>
            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={tieneZonaLavanderia}
                onChange={(e) => setTieneZonaLavanderia(e.target.checked)}
              />
              Zona de lavandería
            </label>
          </div>
        )}
      </fieldset>

      <fieldset>
        <legend className="text-lg font-semibold text-gray-900">Otras características</legend>
        <p className="text-sm text-gray-500">Marca las que apliquen.</p>
        <CheckboxGrid
          opciones={ADICIONALES_OPCIONES}
          values={adicionales}
          onToggle={(key) => setAdicionales((prev) => ({ ...prev, [key]: !prev[key] }))}
        />
      </fieldset>

      <fieldset>
        <legend className="text-lg font-semibold text-gray-900">El sector</legend>
        <p className="text-sm text-gray-500">Marca lo que haya cerca del inmueble.</p>
        <CheckboxGrid
          opciones={SECTOR_OPCIONES}
          values={sector}
          onToggle={(key) => setSector((prev) => ({ ...prev, [key]: !prev[key] }))}
        />
        <div className="mt-3">
          <label className={labelClass}>Descripción del sector</label>
          <textarea
            rows={2}
            value={descripcionSector}
            onChange={(e) => setDescripcionSector(e.target.value)}
            className={inputClass}
          />
        </div>
      </fieldset>

      <fieldset className="flex flex-col gap-4">
        <legend className="text-lg font-semibold text-gray-900">Ubicación</legend>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Ciudad *</label>
            <input
              type="text"
              required
              value={ciudad}
              onChange={(e) => setCiudad(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Departamento</label>
            <input
              type="text"
              value={departamento}
              onChange={(e) => setDepartamento(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Localidad</label>
            <input
              type="text"
              value={localidad}
              onChange={(e) => setLocalidad(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Barrio *</label>
            <input
              type="text"
              required
              value={barrio}
              onChange={(e) => setBarrio(e.target.value)}
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label className={labelClass}>Dirección *</label>
          <input
            type="text"
            required
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
            className={inputClass}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Latitud *</label>
            <input
              type="number"
              step="any"
              required
              value={latitud}
              onChange={(e) => setLatitud(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Longitud *</label>
            <input
              type="number"
              step="any"
              required
              value={longitud}
              onChange={(e) => setLongitud(e.target.value)}
              className={inputClass}
            />
          </div>
        </div>
        <p className="text-xs text-gray-400">
          Tip: busca la dirección en Google Maps, haz clic derecho sobre el punto exacto y copia las
          coordenadas que aparecen arriba.
        </p>
      </fieldset>

      <fieldset>
        <legend className="text-lg font-semibold text-gray-900">Fotos</legend>
        <p className="text-sm text-gray-500">
          Pega un link de imagen por línea. La primera foto será la portada.
        </p>
        <textarea
          rows={4}
          value={fotosTexto}
          onChange={(e) => setFotosTexto(e.target.value)}
          className={`${inputClass} font-mono text-xs`}
          placeholder={"https://ejemplo.com/foto1.jpg\nhttps://ejemplo.com/foto2.jpg"}
        />
      </fieldset>

      <button
        type="submit"
        disabled={loading}
        className="rounded-lg bg-gray-900 px-4 py-3 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-50"
      >
        {loading ? "Publicando..." : "Publicar inmueble"}
      </button>
    </form>
  );
}
