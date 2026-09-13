"use client";

import dynamic from "next/dynamic";

const MapClient = dynamic(() => import("./PropertyDetailMapClient"), {
  ssr: false,
  loading: () => <div className="w-full h-80 bg-gray-100 flex items-center justify-center text-gray-600">Cargando mapa...</div>,
});

interface PropertyDetailMapProps {
  latitud: number;
  longitud: number;
  titulo: string;
  ciudad: string;
  barrio: string;
}

export function PropertyDetailMap({ latitud, longitud, titulo, ciudad, barrio }: PropertyDetailMapProps) {
  return (
    <MapClient
      latitud={latitud}
      longitud={longitud}
      titulo={titulo}
      ciudad={ciudad}
      barrio={barrio}
    />
  );
}
