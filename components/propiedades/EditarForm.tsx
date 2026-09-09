"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import type { Property, PropertyPhoto } from "@prisma/client";

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

export function EditarForm({ propiedad }: { propiedad: Property & { fotos: PropertyPhoto[] } }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [titulo, setTitulo] = useState(propiedad.titulo);
  const [descripcion, setDescripcion] = useState(propiedad.descripcion);
  const [tipo, setTipo] = useState<Tipo>(propiedad.tipo as Tipo);
  const [operacion, setOperacion] = useState<Operacion>(propiedad.operacion as Operacion);
  const [precio, setPrecio] = useState(String(propiedad.precio));

  const [areaConstruidaM2, setAreaConstruidaM2] = useState(propiedad.areaConstruidaM2 ? String(propiedad.areaConstruidaM2) : "");
  const [areaPrivadaM2, setAreaPrivadaM2] = useState(propiedad.areaPrivadaM2 ? String(propiedad.areaPrivadaM2) : "");
  const [habitaciones, setHabitaciones] = useState(propiedad.habitaciones ? String(propiedad.habitaciones) : "");
  const [banos, setBanos] = useState(propiedad.banos ? String(propiedad.banos) : "");
  const [parqueaderos, setParqueaderos] = useState(propiedad.parqueaderos ? String(propiedad.parqueaderos) : "");
  const [estrato, setEstrato] = useState(propiedad.estrato ? String(propiedad.estrato) : "");
  const [antiguedadAnios, setAntiguedadAnios] = useState(propiedad.antiguedadAnios ? String(propiedad.antiguedadAnios) : "");
  const [piso, setPiso] = useState(propiedad.piso ? String(propiedad.piso) : "");
  const [totalPisos, setTotalPisos] = useState(propiedad.totalPisos ? String(propiedad.totalPisos) : "");
  const [administracion, setAdministracion] = useState(propiedad.administracion ? String(propiedad.administracion) : "");

  const [ascensor, setAscensor] = useState(propiedad.ascensor);
  const [amoblado, setAmoblado] = useState(propiedad.amoblado);
  const [tieneBalcon, setTieneBalcon] = useState(propiedad.tieneBalcon);
  const [tieneTerraza, setTieneTerraza] = useState(propiedad.tieneTerraza);
  const [tienePatio, setTienePatio] = useState(propiedad.tienePatio);
  const [tieneEstudio, setTieneEstudio] = useState(propiedad.tieneEstudio);
  const [tieneDeposito, setTieneDeposito] = useState(propiedad.tieneDeposito);
  const [tieneZonaLavanderia, setTieneZonaLavanderia] = useState(propiedad.tieneZonaLavanderia);

  const [ciudad, setCiudad] = useState(propiedad.ciudad);
  const [departamento, setDepartamento] = useState(propiedad.departamento || "");
  const [localidad, setLocalidad] = useState(propiedad.localidad || "");
  const [barrio, setBarrio] = useState(propiedad.barrio);
  const [direccion, setDireccion] = useState(propiedad.direccion);
  const [latitud, setLatitud] = useState(String(propiedad.latitud));
  const [longitud, setLongitud] = useState(String(propiedad.longitud));

  const [sector, setSector] = useState<Record<string, boolean>>(
    (propiedad.caracteristicasSector as Record<string, boolean>) || {}
  );
  const [descripcionSector, setDescripcionSector] = useState(
    ((propiedad.caracteristicasSector as any)?.descripcion_sector as string) || ""
  );
  const [adicionales, setAdicionales] = useState<Record<string, boolean>>(
    (propiedad.caracteristicasAdicionales as Record<string, boolean>) || {}
  );

  const [fotosTexto, setFotosTexto] = useState(propiedad.fotos.map((f) => f.url).join("\n"));

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

    const res = await fetch(`/api/propiedades/${propiedad.id}`, {
      method: "PATCH",
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
      setError(data.error ?? "No se pudo guardar los cambios.");
      return;
    }

    router.push(`/propiedades/${propiedad.id}`);
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
              <input type="checkbox" checked={tieneZonaLavanderia} onChange={(e) => setTieneZonaLavanderia(e.target.checked)} />
              Zona lavandería
            </label>
          </div>
        )}
      </fieldset>

      <fieldset className="flex flex-col gap-4">
        <legend className="text-lg font-semibold text-gray-900">Ubicación</legend>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          <div className="sm:col-span-2">
            <label className={labelClass}>Dirección *</label>
            <input
              type="text"
              required
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
              className={inputClass}
              placeholder="Calle 50 # 10-20"
            />
          </div>
          <div>
            <label className={labelClass}>Departamento</label>
            <input
              type="text"
              value={departamento}
              onChange={(e) => setDepartamento(e.target.value)}
              className={inputClass}
              placeholder="Cundinamarca"
            />
          </div>

          <div>
            <label className={labelClass}>Ciudad *</label>
            <input
              type="text"
              required
              value={ciudad}
              onChange={(e) => setCiudad(e.target.value)}
              className={inputClass}
              placeholder="Bogotá"
            />
          </div>
          <div>
            <label className={labelClass}>Localidad</label>
            <input
              type="text"
              value={localidad}
              onChange={(e) => setLocalidad(e.target.value)}
              className={inputClass}
              placeholder="Usaquén"
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
              placeholder="Chapinero"
            />
          </div>

          <div>
            <label className={labelClass}>Latitud *</label>
            <input
              type="number"
              required
              step="0.000001"
              value={latitud}
              onChange={(e) => setLatitud(e.target.value)}
              className={inputClass}
              placeholder="4.7"
            />
          </div>
          <div>
            <label className={labelClass}>Longitud *</label>
            <input
              type="number"
              required
              step="0.000001"
              value={longitud}
              onChange={(e) => setLongitud(e.target.value)}
              className={inputClass}
              placeholder="-74.05"
            />
          </div>
        </div>
      </fieldset>

      <fieldset className="flex flex-col gap-4">
        <legend className="text-lg font-semibold text-gray-900">Características del sector</legend>

        <div>
          <label className={labelClass}>Descripción</label>
          <textarea
            rows={3}
            value={descripcionSector}
            onChange={(e) => setDescripcionSector(e.target.value)}
            className={inputClass}
            placeholder="Describe cómo es el barrio, qué lo hace especial..."
          />
        </div>

        <CheckboxGrid
          opciones={SECTOR_OPCIONES}
          values={sector}
          onToggle={(k) => setSector((s) => ({ ...s, [k]: !s[k] }))}
        />
      </fieldset>

      <fieldset className="flex flex-col gap-4">
        <legend className="text-lg font-semibold text-gray-900">Características adicionales</legend>

        <CheckboxGrid
          opciones={ADICIONALES_OPCIONES}
          values={adicionales}
          onToggle={(k) => setAdicionales((a) => ({ ...a, [k]: !a[k] }))}
        />
      </fieldset>

      <fieldset className="flex flex-col gap-4">
        <legend className="text-lg font-semibold text-gray-900">Fotos</legend>

        <div>
          <label className={labelClass}>URLs de fotos (una por línea)</label>
          <textarea
            rows={4}
            value={fotosTexto}
            onChange={(e) => setFotosTexto(e.target.value)}
            className={inputClass}
            placeholder="https://ejemplo.com/foto1.jpg&#10;https://ejemplo.com/foto2.jpg"
          />
          <p className="mt-2 text-xs text-gray-500">
            Pega las URLs directas a las fotos. En el futuro podrás subirlas directamente desde tu dispositivo.
          </p>
        </div>
      </fieldset>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 rounded-lg bg-brand-blue px-4 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Guardando..." : "Guardar cambios"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="flex-1 rounded-lg border border-gray-300 px-4 py-2 font-medium text-gray-700 hover:bg-gray-50"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
