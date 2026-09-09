"use client";

import dynamic from "next/dynamic";

const MapBackground = dynamic(
  () => import("./MapBackground").then((mod) => mod.MapBackground),
  { ssr: false, loading: () => <div className="h-full w-full bg-gray-100" /> }
);

export function MapBackgroundLoader() {
  return <MapBackground />;
}
