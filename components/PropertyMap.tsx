"use client";

import { useEffect, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import Link from "next/link";
import Image from "next/image";
import "leaflet/dist/leaflet.css";
import { formatCOPCompact } from "@/lib/format";

const BOGOTA_CENTER: [number, number] = [4.711, -74.0721];

export type MapProperty = {
  id: string;
  titulo: string;
  precio: number;
  latitud: number;
  longitud: number;
  barrio: string;
  ciudad: string;
  fotoUrl: string | null;
};

function priceIcon(label: string) {
  return L.divIcon({
    className: "border-none bg-transparent",
    html: `<div class="-translate-x-1/2 -translate-y-full whitespace-nowrap rounded-full border border-white bg-gray-900 px-2.5 py-1 text-xs font-bold text-white shadow-lg">${label}</div>`,
    iconSize: [0, 0],
  });
}

function FitBounds({ properties }: { properties: MapProperty[] }) {
  const map = useMap();

  useEffect(() => {
    if (properties.length === 0) return;
    const frame = requestAnimationFrame(() => {
      map.invalidateSize();
      const bounds = L.latLngBounds(properties.map((p) => [p.latitud, p.longitud] as [number, number]));
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 15 });
    });
    return () => cancelAnimationFrame(frame);
  }, [properties, map]);

  return null;
}

export function PropertyMap({ properties }: { properties: MapProperty[] }) {
  const center = useMemo<[number, number]>(() => {
    if (properties.length === 0) return BOGOTA_CENTER;
    const lat = properties.reduce((sum, p) => sum + p.latitud, 0) / properties.length;
    const lng = properties.reduce((sum, p) => sum + p.longitud, 0) / properties.length;
    return [lat, lng];
  }, [properties]);

  return (
    <MapContainer center={center} zoom={12} scrollWheelZoom className="h-full w-full">
      <FitBounds properties={properties} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {properties.map((property) => (
        <Marker
          key={property.id}
          position={[property.latitud, property.longitud]}
          icon={priceIcon(formatCOPCompact(property.precio))}
        >
          <Popup>
            <Link href={`/propiedades/${property.id}`} className="block w-48">
              {property.fotoUrl && (
                <div className="relative mb-2 h-24 w-full overflow-hidden rounded">
                  <Image
                    src={property.fotoUrl}
                    alt={property.titulo}
                    fill
                    sizes="192px"
                    className="object-cover"
                  />
                </div>
              )}
              <p className="text-sm font-semibold text-gray-900">{formatCOPCompact(property.precio)}</p>
              <p className="truncate text-xs text-gray-600">{property.titulo}</p>
              <p className="text-xs text-gray-500">
                {property.barrio}, {property.ciudad}
              </p>
            </Link>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
