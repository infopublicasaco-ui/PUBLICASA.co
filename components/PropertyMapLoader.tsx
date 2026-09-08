"use client";

import dynamic from "next/dynamic";
import type { MapProperty } from "./PropertyMap";

const PropertyMap = dynamic(
  () => import("./PropertyMap").then((mod) => mod.PropertyMap),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center bg-gray-100 text-sm text-gray-400">
        Cargando mapa...
      </div>
    ),
  }
);

export function PropertyMapLoader({ properties }: { properties: MapProperty[] }) {
  return <PropertyMap properties={properties} />;
}
